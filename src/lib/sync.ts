import {
  doc,
  getDocsFromCache,
  getDocsFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  type Firestore,
  type Query,
  type Unsubscribe,
} from "firebase/firestore";
import type { Expression, RawExpression, SyncMetadata } from "../types";
import { normalizeExpression } from "./firestore";
import { getStorageItem, setStorageItem } from "./storage";

export const COOLDOWN_KEY = "col_eng_quota_cooldown";
export const LAST_SYNC_KEY = "col_eng_last_sync";
export const SYNC_CHANNEL_NAME = "col_eng_sync";
const MIN_DELTA_SYNC_INTERVAL_MS = 15 * 60 * 1000;
const MIN_USABLE_CACHED_EXPRESSIONS = 50;

export interface SyncCallbacks {
  onExpressionsChange?: (expressions: Expression[]) => void;
  onProgress?: (current: number, total: number) => void;
  onError?: (error: unknown) => void;
}

export interface SyncController {
  getExpressions: () => Expression[];
  removeExpression: (expressionId: number, docId?: string) => void;
  loadCachedExpressions: () => Promise<boolean>;
  loadStaticExpressions: () => Promise<boolean>;
  performDeltaSync: (options?: { force?: boolean; showLoading?: boolean }) => Promise<number>;
  setupMetadataListener: () => Unsubscribe | undefined;
  setupBroadcastChannel: () => () => void;
  cleanup: () => void;
}

export function getLocalMaxId(expressions: Expression[]): number {
  return expressions.reduce((max, expression) => {
    const numericId = Number(expression.id);
    return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
  }, 0);
}

export function markSyncComplete(): void {
  setStorageItem(LAST_SYNC_KEY, new Date().toISOString());
}

export function isInCooldown(): boolean {
  const cooldownUntil = Number(getStorageItem(COOLDOWN_KEY) || 0);
  return Boolean(cooldownUntil && Date.now() < cooldownUntil);
}

export function isRecentlySynced(): boolean {
  const lastSync = Date.parse(getStorageItem(LAST_SYNC_KEY) || "");
  return Number.isFinite(lastSync) && Date.now() - lastSync < MIN_DELTA_SYNC_INTERVAL_MS;
}

export function handleSyncError(error: unknown): void {
  const code = typeof error === "object" && error && "code" in error
    ? String((error as { code?: unknown }).code)
    : "";

  if (code === "resource-exhausted") {
    setStorageItem(COOLDOWN_KEY, String(Date.now() + 2 * 60 * 60 * 1000));
    return;
  }
}

export function createSyncController(
  db: Firestore,
  expressionsQuery: Query,
  callbacks: SyncCallbacks = {}
): SyncController {
  let expressions: Expression[] = [];
  let deltaSyncTimer: number | undefined;
  let metadataUnsubscribe: Unsubscribe | undefined;
  let broadcastCleanup: (() => void) | undefined;

  function publish(nextExpressions: Expression[]): void {
    expressions = [...nextExpressions].sort((a, b) => Number(a.id) - Number(b.id));
    callbacks.onExpressionsChange?.(expressions);
  }

  function scheduleDeltaSync(): void {
    window.clearTimeout(deltaSyncTimer);
    deltaSyncTimer = window.setTimeout(() => {
      void controller.performDeltaSync({ force: true });
    }, 300);
  }

  function pruneExpressionsAfter(lastId: number): number {
    const beforeCount = expressions.length;
    const nextExpressions = expressions.filter((expression) => {
      const numericId = Number(expression.id);
      return Number.isFinite(numericId) && numericId <= lastId;
    });

    const removedCount = beforeCount - nextExpressions.length;
    if (removedCount > 0) {
      publish(nextExpressions);
      markSyncComplete();
    }

    return removedCount;
  }

  function removeExpression(expressionId: number, docId?: string): void {
    const beforeCount = expressions.length;
    const nextExpressions = expressions.filter((expression) => (
      expression.id !== expressionId && (!docId || expression.docId !== docId)
    ));

    if (nextExpressions.length !== beforeCount) {
      publish(nextExpressions);
      markSyncComplete();
    }
  }

  const controller: SyncController = {
    getExpressions: () => expressions,
    removeExpression,

    async loadCachedExpressions() {
      const snapshot = await getDocsFromCache(query(expressionsQuery, orderBy("id", "asc"))).catch(() => null);
      if (!snapshot || snapshot.empty) return false;

      const nextExpressions: Expression[] = [];
      snapshot.forEach((docSnap) => {
        nextExpressions.push(normalizeExpression({
          docId: docSnap.id,
          ...(docSnap.data() as RawExpression),
        }));
      });
      if (nextExpressions.length < MIN_USABLE_CACHED_EXPRESSIONS) return false;
      publish(nextExpressions);
      return true;
    },

    async loadStaticExpressions() {
      const response = await fetch(`${assetBaseUrl()}initial_data.json?t=${Date.now()}`);
      if (!response.ok) return false;

      const jsonData = await response.json() as RawExpression[];
      if (!Array.isArray(jsonData) || jsonData.length === 0) return false;

      const nextExpressions = jsonData.map((item) => normalizeExpression({
        docId: item.docId || `static_${item.id}`,
        ...item,
      }));
      publish(nextExpressions);
      callbacks.onProgress?.(nextExpressions.length, nextExpressions.length);
      return true;
    },

    async performDeltaSync(options = {}) {
      if (isInCooldown()) return 0;
      if (!options.force && isRecentlySynced()) return 0;

      try {
        let lastId = getLocalMaxId(expressions);
        const existingIds = new Set(expressions.map((expression) => Number(expression.id)));
        const nextExpressions = [...expressions];
        let fetchedCount = 0;

        while (true) {
          const snapshot = await getDocsFromServer(query(
            expressionsQuery,
            orderBy("id", "asc"),
            where("id", ">", lastId),
            limit(500)
          ));

          if (snapshot.empty) break;

          let batchMaxId = lastId;
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as RawExpression;
            const numericId = Number(data.id);
            if (Number.isFinite(numericId)) batchMaxId = Math.max(batchMaxId, numericId);

            if (!existingIds.has(numericId)) {
              nextExpressions.push(normalizeExpression({ docId: docSnap.id, ...data }));
              existingIds.add(numericId);
              fetchedCount += 1;
            }
          });

          if (batchMaxId <= lastId) break;
          lastId = batchMaxId;
          callbacks.onProgress?.(nextExpressions.length, Math.max(nextExpressions.length, lastId));
        }

        if (fetchedCount > 0) publish(nextExpressions);
        markSyncComplete();
        return fetchedCount;
      } catch (error) {
        handleSyncError(error);
        callbacks.onError?.(error);
        return 0;
      }
    },

    setupMetadataListener() {
      if (metadataUnsubscribe) return metadataUnsubscribe;

      metadataUnsubscribe = onSnapshot(doc(db, "metadata", "sync"), (docSnap) => {
        if (!docSnap.exists()) return;

        const data = docSnap.data() as SyncMetadata;
        const lastId = Number(data.lastId || 0);
        const localMaxId = getLocalMaxId(expressions);

        if (lastId > localMaxId) {
          scheduleDeltaSync();
        } else if (lastId > 0 && lastId < localMaxId) {
          pruneExpressionsAfter(lastId);
        }
      }, (error) => {
        callbacks.onError?.(error);
      });

      return metadataUnsubscribe;
    },

    setupBroadcastChannel() {
      if (broadcastCleanup || typeof BroadcastChannel === "undefined") {
        return broadcastCleanup || (() => undefined);
      }

      const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (event.data?.type === "expression-saved" || event.data?.type === "sync-needed") {
          scheduleDeltaSync();
        } else if (event.data?.type === "expression-deleted") {
          removeExpression(Number(event.data.deletedId), event.data.docId);
        }
      };
      broadcastCleanup = () => channel.close();
      return broadcastCleanup;
    },

    cleanup() {
      window.clearTimeout(deltaSyncTimer);
      metadataUnsubscribe?.();
      metadataUnsubscribe = undefined;
      broadcastCleanup?.();
      broadcastCleanup = undefined;
    },
  };

  return controller;
}

import { assetBaseUrl } from "./paths";
