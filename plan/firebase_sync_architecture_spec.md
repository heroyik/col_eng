# Firebase Sync Architecture Specification: SRS Data

**Project:** COL_ENG (Colloquial English)
**Date:** 2026-06-09
**Status:** Specification
**Goal:** Design offline-first Firebase sync architecture for SRS learning data

---

## Executive Summary

This specification defines a **hybrid offline-first sync architecture** for the COL_ENG SRS learning app, using **localStorage as primary storage** and **Firebase Firestore as cloud backup/cross-device sync**. The system prioritizes subway/bus commute scenarios where connectivity is intermittent.

**Key Design Decisions:**
- **localStorage-first:** All SRS operations happen locally (zero-latency)
- **Debounced sync:** Batch changes every 30 seconds (not per-review)
- **Last-write-wins:** Simple conflict resolution for single-user data
- **User-scoped paths:** `users/{userId}/` for data isolation
- **Graceful degradation:** Full functionality offline, sync when possible

---

## 1. Architecture Overview

### 1.1 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    COL_ENG SRS Learning App                      │
│                                                                  │
│  ┌─────────────────────┐    ┌────────────────────────────────┐  │
│  │   localStorage      │    │   Firebase Firestore           │  │
│  │   (Primary Store)   │    │   (Cloud Backup)               │  │
│  │                     │    │                                │  │
│  │  - SRS Cards        │◄───│  users/{userId}/               │  │
│  │  - User Progress    │    │    progress: UserProgress       │  │
│  │  - Gamification     │    │    gamification: Gamification   │  │
│  │  - Learning Queue   │    │    cards/{exprId}: SRSCard      │  │
│  │  - Session State    │    │    session: SessionState        │  │
│  └─────────┬───────────┘    └──────────────┬─────────────────┘  │
│            │                               │                     │
│            └───────────────┬───────────────┘                     │
│                            ▼                                     │
│            ┌──────────────────────────────┐                      │
│            │   SyncManager                │                      │
│            │   - Debounced writes         │                      │
│            │   - Pending queue            │                      │
│            │   - Connectivity listener    │                      │
│            │   - On-exit flush            │                      │
│            └──────────────┬───────────────┘                      │
│                           ▼                                      │
│            └──── Periodic sync (30s) + On-exit ────┘             │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Storage Strategy

| Data Type | localStorage Key | Firebase Path | Sync Frequency |
|-----------|------------------|---------------|----------------|
| **SRS Cards** | `col_eng_srs_cards` | `users/{uid}/cards/{exprId}` | Every 30s (debounced) |
| **User Progress** | `col_eng_progress` | `users/{uid}/progress` | Every 30s (debounced) |
| **Gamification** | `col_eng_gamification` | `users/{uid}/gamification` | Every 30s (debounced) |
| **Learning Queue** | `col_eng_learning_queue` | `users/{uid}/session` | On exit only |
| **Settings** | `col_eng_settings` | `users/{uid}/progress` (nested) | On change |

**Why localStorage-first:**
- Zero-latency reads/writes (no network round-trip)
- Works offline (subway tunnels, airplane mode)
- No Firebase Auth required for core functionality
- Cross-origin safety (localStorage is origin-scoped)

**Why not IndexedDB:**
- localStorage is simpler and sufficient for ~90KB of compressed card data
- Synchronous API is acceptable for small payloads
- Better browser support (100% vs ~97%)

---

## 2. Firestore Document Structure

### 2.1 Collection Schema

```
firestore/
  users/
    {userId}/                          // Document ID = Firebase Auth UID
      ├── progress: UserProgress       // Single document (streak, stats, settings)
      ├── gamification: Gamification   // Single document (XP, badges, goals)
      ├── session: SessionState        // Single document (learning queue, current card)
      └── cards/
          └── {expressionId}: SRSCard  // One document per expression in SRS
```

### 2.2 Document Schemas

#### progress (UserProgress)
```typescript
interface UserProgress {
  // Streak (AUTHORITATIVE SOURCE - single source of truth)
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string;        // YYYY-MM-DD
    freezes: number;               // 0-5
    repairs: number;               // 0-3
    lastFreezeUsed: string | null;
    lastRepairUsed: string | null;
    preBreakStreak?: number;
    isPaused: boolean;
    pauseStartDate?: string;
    pauseEndDate?: string;
  };
  
  // Daily Stats (reset daily)
  today: {
    date: string;                  // YYYY-MM-DD
    reviewed: number;
    newIntroduced: number;
    xpEarned: number;
    goalMet: boolean;
  };
  
  // Lifetime Stats
  lifetime: {
    totalReviews: number;
    totalExpressionsLearned: number;
    totalXP: number;
    level: number;
    accuracy: number;              // 0-100
  };
  
  // Settings
  settings: {
    dailyGoal: 'casual' | 'moderate' | 'intensive';
    dailyNewLimit: number;         // 1-20
    dailyReviewLimit: number;      // 10-50
    notificationTime: string;      // HH:MM
    enableNotifications: boolean;
    theme: 'dark' | 'light' | 'system';
  };
  
  // Sync Metadata
  _sync: {
    lastSyncedAt: string;          // ISO timestamp (use serverTimestamp() for accuracy)
    deviceId: string;              // Unique per device
    version: number;               // Monotonic counter for conflict detection
  };
}
```

**⚠️ IMPORTANT:** Streak data is defined ONLY in `progress` document. The `gamification` document does NOT have a `streak` field. This prevents duplication and sync conflicts.

#### gamification (Gamification)
```typescript
interface Gamification {
  // XP & Level
  xp: {
    total: number;
    today: number;
    todayDate: string;             // YYYY-MM-DD
    dailyLimit: number;
  };
  
  level: {
    current: number;
    title: string;
    badge: string;                 // Emoji
  };
  
  // Badges (ADDITIVE ARRAY - use arrayUnion for merging)
  badges: {
    id: string;
    unlockedAt: string;            // ISO timestamp
  }[];
  
  // History (for heat map, last 365 days)
  // KEYED BY DATE - merge by date, not overwrite
  history: {
    date: string;                  // YYYY-MM-DD (unique key)
    reviews: number;
    xp: number;
    goalMet: boolean;
  }[];
  
  // Sync Metadata
  _sync: {
    lastSyncedAt: string;
    deviceId: string;
    version: number;
  };
}
```

**⚠️ IMPORTANT:** No `streak` field here - streak lives in `progress` document only.

#### session (SessionState)
```typescript
interface SessionState {
  // Learning Queue (in-session cards)
  learningQueue: {
    expressionId: number;
    due: number;                   // Timestamp
    rating: 'again' | 'hard' | 'good' | 'easy';
  }[];
  
  // Current Card Position
  currentCardIndex: number;
  sessionStartTime: number;
  
  // Sync Metadata
  _sync: {
    lastSyncedAt: string;
    deviceId: string;
    version: number;
  };
}
```

#### cards/{expressionId} (SRSCard)
```typescript
interface SRSCard {
  // Identity
  expressionId: number;
  
  // SRS State
  state: 'NEW' | 'LEARNING' | 'REVIEW' | 'RELEARNING';
  easeFactor: number;              // 1.3 - 3.0
  interval: number;                // Days
  due: number;                     // Timestamp
  repetitions: number;
  lapses: number;
  
  // History
  lastReview: number | null;
  reviewCount: number;
  
  // Metadata
  createdAt: number;
  updatedAt: number;
  
  // Sync Metadata
  _sync: {
    lastSyncedAt: string;
    deviceId: string;
    version: number;
  };
}
```

### 2.3 Sync Metadata Explanation

Every document includes `_sync` metadata for conflict resolution:

```typescript
interface SyncMetadata {
  lastSyncedAt: string;  // When this document was last synced
  deviceId: string;      // Which device made this change
  version: number;       // Monotonic counter (incremented on each local change)
}
```

**Why version counter:**
- Enables detection of which device has newer data
- Simple integer comparison (no clock skew issues)
- Avoids complex vector clocks for single-user scenario

---

## 3. Offline Queue System

### 3.1 Pending Changes Queue

```typescript
interface PendingChange {
  id: string;                    // Unique change ID (crypto.randomUUID())
  collection: string;           // 'cards' | 'progress' | 'gamification' | 'session'
  documentId: string;           // Expression ID or document name
  operation: 'set' | 'update' | 'delete';
  data: Partial<SRSCard | UserProgress | Gamification | SessionState>;
  timestamp: number;            // When change was made locally
  retryCount: number;           // For exponential backoff
}

interface PendingQueue {
  changes: PendingChange[];
  lastFlushAttempt: number;     // Timestamp of last sync attempt
  deviceId: string;             // This device's unique ID
}
```

### 3.2 Queue Storage

```typescript
// localStorage key for pending queue
const PENDING_QUEUE_KEY = 'col_eng_pending_queue';

function getPendingQueue(): PendingQueue {
  const data = localStorage.getItem(PENDING_QUEUE_KEY);
  if (!data) {
    return {
      changes: [],
      lastFlushAttempt: 0,
      deviceId: getDeviceId(),
    };
  }
  return JSON.parse(data);
}

function savePendingQueue(queue: PendingQueue): void {
  localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(queue));
}

function getDeviceId(): string {
  const DEVICE_ID_KEY = 'col_eng_device_id';
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = `device_${crypto.randomUUID().slice(0, 8)}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}
```

### 3.3 Adding Changes to Queue

```typescript
const MAX_PENDING_CHANGES = 1000; // Max queue size before cleanup

function enqueueChange(
  collection: string,
  documentId: string,
  operation: 'set' | 'update' | 'delete',
  data: Partial<SRSCard | UserProgress | Gamification | SessionState>
): void {
  const queue = getPendingQueue();
  
  // Check for duplicate changes (same collection + documentId)
  const existingIndex = queue.changes.findIndex(
    c => c.collection === collection && c.documentId === documentId
  );
  
  if (existingIndex >= 0) {
    // DEEP merge with existing change (preserve nested _sync metadata)
    queue.changes[existingIndex].data = deepMerge(
      queue.changes[existingIndex].data as any,
      data as any
    );
    queue.changes[existingIndex].timestamp = Date.now();
  } else {
    // Add new change
    queue.changes.push({
      id: crypto.randomUUID(),
      collection,
      documentId,
      operation,
      data,
      timestamp: Date.now(),
      retryCount: 0,
    });
  }
  
  // Enforce queue size limit
  if (queue.changes.length > MAX_PENDING_CHANGES) {
    // Keep only the most recent changes
    queue.changes = queue.changes
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, MAX_PENDING_CHANGES);
    console.warn(`[Sync] Queue exceeded ${MAX_PENDING_CHANGES}, trimmed`);
  }
  
  savePendingQueue(queue);
  
  // Schedule debounced flush
  scheduleSyncFlush();
}
```

### 3.4 Debounced Sync Flush

```typescript
let syncFlushTimer: number | null = null;
const SYNC_FLUSH_INTERVAL = 30_000; // 30 seconds
const MAX_RETRY_DELAY = 5 * 60 * 1000; // 5 minutes max

function scheduleSyncFlush(): void {
  if (syncFlushTimer) return; // Already scheduled
  
  syncFlushTimer = window.setTimeout(async () => {
    syncFlushTimer = null;
    await flushPendingQueue();
  }, SYNC_FLUSH_INTERVAL);
}

async function flushPendingQueue(): Promise<void> {
  const queue = getPendingQueue();
  if (queue.changes.length === 0) return;
  
  // Check connectivity
  if (!navigator.onLine) {
    console.log('[Sync] Offline, skipping flush');
    return;
  }
  
  // Check cooldown (after 429 error)
  const cooldownUntil = Number(localStorage.getItem('col_eng_sync_cooldown') || 0);
  if (Date.now() < cooldownUntil) {
    console.log('[Sync] In cooldown, skipping flush');
    return;
  }
  
  try {
    // Process changes in batches of 500 (Firestore limit)
    const batchSize = 500;
    const batches = [];
    for (let i = 0; i < queue.changes.length; i += batchSize) {
      batches.push(queue.changes.slice(i, i + batchSize));
    }
    
    for (const batch of batches) {
      await flushBatch(batch);
    }
    
    // Clear successful changes
    queue.changes = [];
    queue.lastFlushAttempt = Date.now();
    savePendingQueue(queue);
    
    console.log(`[Sync] Flushed ${queue.changes.length} changes`);
  } catch (error) {
    console.error('[Sync] Flush failed:', error);
    
    // Increment retry count
    queue.changes.forEach(c => c.retryCount++);
    
    // Exponential backoff
    const maxRetry = Math.max(...queue.changes.map(c => c.retryCount));
    const backoffDelay = Math.min(
      1000 * Math.pow(2, maxRetry),
      MAX_RETRY_DELAY
    );
    
    // Schedule retry
    setTimeout(() => flushPendingQueue(), backoffDelay);
    
    savePendingQueue(queue);
  }
}
```

### 3.5 Batch Flush Implementation

```typescript
async function flushBatch(changes: PendingChange[]): Promise<void> {
  const userId = getCurrentUserId();
  if (!userId) {
    console.warn('[Sync] No userId, cannot sync');
    return;
  }
  
  const batch = writeBatch(db);
  
  for (const change of changes) {
    let docRef;
    
    switch (change.collection) {
      case 'cards':
        docRef = doc(db, `users/${userId}/cards`, change.documentId);
        break;
      case 'progress':
        docRef = doc(db, `users/${userId}/progress`);
        break;
      case 'gamification':
        docRef = doc(db, `users/${userId}/gamification`);
        break;
      case 'session':
        docRef = doc(db, `users/${userId}/session`);
        break;
      default:
        throw new Error(`Unknown collection: ${change.collection}`);
    }
    
    // Add sync metadata
    const dataWithSync = {
      ...change.data,
      _sync: {
        lastSyncedAt: new Date().toISOString(),
        deviceId: getDeviceId(),
        version: (change.data as any)?._sync?.version ?? 0,
      },
    };
    
    switch (change.operation) {
      case 'set':
        batch.set(docRef, dataWithSync, { merge: true });
        break;
      case 'update':
        batch.update(docRef, dataWithSync);
        break;
      case 'delete':
        batch.delete(docRef);
        break;
    }
  }
  
  await batch.commit();
}
```

---

## 4. Conflict Resolution Strategy

### 4.1 Last-Write-Wins (LWW)

For single-user, multi-device scenarios, **last-write-wins** is the simplest and most appropriate strategy:

```typescript
interface ConflictResolution {
  strategy: 'lww' | 'merge' | 'manual';
  explanation: string;
}

function resolveConflict(
  localData: SRSCard,
  remoteData: SRSCard
): { resolved: SRSCard; strategy: ConflictResolution } {
  
  // Compare version counters (PRIMARY)
  const localVersion = localData._sync?.version ?? 0;
  const remoteVersion = remoteData._sync?.version ?? 0;
  
  if (remoteVersion > localVersion) {
    return {
      resolved: remoteData,
      strategy: {
        strategy: 'lww',
        explanation: `Remote version (${remoteVersion}) > local version (${localVersion})`,
      },
    };
  }
  
  if (localVersion > remoteVersion) {
    return {
      resolved: localData,
      strategy: {
        strategy: 'lww',
        explanation: `Local version (${localVersion}) > remote version (${remoteVersion})`,
      },
    };
  }
  
  // Same version: use server timestamp (FALLBACK)
  // Note: Client clocks can skew, so prefer version counter above
  // If versions are truly equal, the data is identical (no conflict)
  return {
    resolved: localData,
    strategy: {
      strategy: 'lww',
      explanation: 'Same version - data identical, no conflict',
    },
  };
}
```

**⚠️ Clock Skew Mitigation:** Use `FieldValue.serverTimestamp()` for `_sync.lastSyncedAt` in Firebase writes. This ensures the server timestamp is authoritative, not the client clock. For conflict resolution, always prefer version counter over timestamp.

### 4.2 Why Not CRDTs or Operational Transforms

| Approach | Pros | Cons | Our Use Case Fit |
|----------|------|------|------------------|
| **LWW** | Simple, fast, predictable | Can lose data on conflicts | ✅ Perfect (single user) |
| **CRDTs** | Always merges correctly | Complex, memory overhead | ❌ Overkill |
| **OT** | Preserves all changes | Requires central server | ❌ Overkill |

**Rationale:**
- SRS data is **user-specific** (no collaboration)
- Conflicts only occur on **same user's multiple devices**
- User rarely edits same card on two devices simultaneously
- Simple integer version counter is sufficient

### 4.3 Merge Strategy for Nested Objects

For documents with nested structures (e.g., `progress.streak`), use deep merge with special handling for arrays:

```typescript
function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key of Object.keys(source) as (keyof T)[]) {
    const sourceValue = source[key];
    const targetValue = target[key];
    
    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
    ) {
      // Deep merge nested objects
      (result as any)[key] = deepMerge(targetValue, sourceValue);
    } else if (
      Array.isArray(sourceValue) &&
      Array.isArray(targetValue)
    ) {
      // Special array handling based on field name
      (result as any)[key] = mergeArrayField(key as string, targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      // Overwrite primitives
      (result as any)[key] = sourceValue;
    }
  }
  
  return result;
}

function mergeArrayField(
  fieldName: string,
  localArray: any[],
  remoteArray: any[]
): any[] {
  switch (fieldName) {
    case 'badges':
      // ADDITIVE: Union of badges (don't lose any)
      return mergeAdditiveArrays(localArray, remoteArray, 'id');
    
    case 'history':
      // KEYED BY DATE: Merge by date field
      return mergeHistoryArrays(localArray, remoteArray);
    
    case 'learningQueue':
      // DEDUPLICATE: By expressionId, keep latest
      return mergeLearningQueues(localArray, remoteArray);
    
    default:
      // Default: Remote wins (LWW)
      return remoteArray;
  }
}

function mergeAdditiveArrays(
  local: any[],
  remote: any[],
  keyField: string
): any[] {
  const merged = new Map<string, any>();
  
  // Add all local items
  for (const item of local) {
    merged.set(String(item[keyField]), item);
  }
  
  // Add remote items (newer timestamps win for same key)
  for (const item of remote) {
    const key = String(item[keyField]);
    const existing = merged.get(key);
    if (!existing || item.unlockedAt > existing.unlockedAt) {
      merged.set(key, item);
    }
  }
  
  return Array.from(merged.values());
}

function mergeHistoryArrays(
  local: any[],
  remote: any[]): any[] {
  const merged = new Map<string, any>();
  
  // Add all local entries
  for (const entry of local) {
    merged.set(entry.date, entry);
  }
  
  // Add remote entries (higher review count wins for same date)
  for (const entry of remote) {
    const existing = merged.get(entry.date);
    if (!existing || entry.reviews > existing.reviews) {
      merged.set(entry.date, entry);
    }
  }
  
  return Array.from(merged.values());
}

function mergeLearningQueues(
  local: any[],
  remote: any[]): any[] {
  const merged = new Map<number, any>();
  
  // Add all local items
  for (const item of local) {
    merged.set(item.expressionId, item);
  }
  
  // Add remote items (newer due time wins for same expression)
  for (const item of remote) {
    const existing = merged.get(item.expressionId);
    if (!existing || item.due > existing.due) {
      merged.set(item.expressionId, item);
    }
  }
  
  return Array.from(merged.values());
}

// Usage in sync
async function syncDocument<T>(
  collection: string,
  documentId: string,
  localData: T,
  remoteData: T
): Promise<T> {
  const { resolved } = resolveConflict(
    localData as any,
    remoteData as any
  );
  
  // For nested documents, deep merge
  if (collection === 'progress' || collection === 'gamification') {
    return deepMerge(remoteData, localData);
  }
  
  return resolved;
}
```

---

## 5. Parallel Sync Strategy

### 5.1 Sync Priority Levels

```typescript
type SyncPriority = 'critical' | 'high' | 'medium' | 'low';

interface SyncSchedule {
  priority: SyncPriority;
  interval: number;           // Milliseconds
  debounce: boolean;
  requireAuth: boolean;
}

const SYNC_SCHEDULE: Record<string, SyncSchedule> = {
  // Critical: Sync immediately (on exit)
  session: {
    priority: 'critical',
    interval: 0,
    debounce: false,
    requireAuth: true,
  },
  
  // High: Sync every 30 seconds (debounced)
  cards: {
    priority: 'high',
    interval: 30_000,
    debounce: true,
    requireAuth: true,
  },
  
  // High: Sync every 30 seconds (debounced)
  progress: {
    priority: 'high',
    interval: 30_000,
    debounce: true,
    requireAuth: true,
  },
  
  // Medium: Sync every 60 seconds (debounced)
  gamification: {
    priority: 'medium',
    interval: 60_000,
    debounce: true,
    requireAuth: true,
  },
  
  // Low: Sync on change only
  settings: {
    priority: 'low',
    interval: 0,
    debounce: false,
    requireAuth: false,  // Settings can sync without auth
  },
};
```

### 5.2 Sync Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    App Lifecycle Events                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. App Launch                                                   │
│     ├── Load from localStorage (instant)                        │
│     ├── Attach Firestore listeners (if authenticated)           │
│     └── Schedule periodic sync                                  │
│                                                                  │
│  2. During Session                                               │
│     ├── Every review → enqueue change → schedule flush           │
│     ├── Every 30s → flush pending queue (if online)             │
│     └── Every 5min → check for remote changes                   │
│                                                                  │
│  3. App Background/Close                                         │
│     ├── Flush all pending changes (critical priority)           │
│     ├── Wait for Firestore writes to complete                   │
│     └── Detach listeners                                        │
│                                                                  │
│  4. Reconnection                                                 │
│     ├── Flush pending queue (retry failed changes)              │
│     ├── Check for remote changes (pull)                         │
│     └── Resume periodic sync                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Periodic Sync Implementation

```typescript
class SRSSyncManager {
  private periodicSyncInterval: number | null = null;
  private isOnline: boolean = navigator.onLine;
  private isAuthenticated: boolean = false;
  
  constructor() {
    // Listen for connectivity changes
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Listen for visibility changes (background/foreground)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.handleForeground();
      } else {
        this.handleBackground();
      }
    });
    
    // Listen for beforeunload (page close)
    window.addEventListener('beforeunload', () => this.handleUnload());
  }
  
  start(userId: string): void {
    this.isAuthenticated = true;
    
    // Start periodic sync
    this.periodicSyncInterval = window.setInterval(
      () => this.periodicSync(),
      30_000 // 30 seconds
    );
    
    // Initial sync
    this.periodicSync();
  }
  
  stop(): void {
    this.isAuthenticated = false;
    
    if (this.periodicSyncInterval) {
      clearInterval(this.periodicSyncInterval);
      this.periodicSyncInterval = null;
    }
  }
  
  private async periodicSync(): Promise<void> {
    if (!this.isOnline || !this.isAuthenticated) return;
    
    // Flush pending changes
    await flushPendingQueue();
    
    // Check for remote changes
    await this.pullRemoteChanges();
  }
  
  private async pullRemoteChanges(): Promise<void> {
    const userId = getCurrentUserId();
    if (!userId) return;
    
    const localProgress = loadProgress();
    if (!localProgress?._sync?.lastSyncedAt) return;
    
    // Query for changes since last sync
    const progressRef = doc(db, `users/${userId}/progress`);
    const remoteSnapshot = await getDoc(progressRef);
    
    if (!remoteSnapshot.exists()) return;
    
    const remoteData = remoteSnapshot.data() as UserProgress;
    const localVersion = localProgress._sync?.version ?? 0;
    const remoteVersion = remoteData._sync?.version ?? 0;
    
    if (remoteVersion > localVersion) {
      // Remote has newer data, pull it
      const merged = deepMerge(localProgress, remoteData);
      saveProgress(merged);
      
      console.log(`[Sync] Pulled remote changes (v${remoteVersion} > v${localVersion})`);
    }
  }
  
  private handleOnline(): void {
    this.isOnline = true;
    console.log('[Sync] Back online, flushing queue');
    this.periodicSync();
  }
  
  private handleOffline(): void {
    this.isOnline = false;
    console.log('[Sync] Gone offline');
  }
  
  private handleForeground(): void {
    if (this.isOnline && this.isAuthenticated) {
      console.log('[Sync] App foregrounded, syncing');
      this.periodicSync();
    }
  }
  
  private handleBackground(): void {
    console.log('[Sync] App backgrounded');
    // Don't flush here - wait for beforeunload
  }
  
  private async handleUnload(): Promise<void> {
    console.log('[Sync] Page unloading, flushing critical queue');
    
    // Flush session data immediately (critical priority)
    const queue = getPendingQueue();
    const sessionChanges = queue.changes.filter(c => c.collection === 'session');
    
    if (sessionChanges.length > 0) {
      try {
        await flushBatch(sessionChanges);
      } catch (error) {
        console.error('[Sync] Failed to flush session on unload:', error);
      }
    }
  }
}
```

---

## 6. Auth Integration

### 6.1 Anonymous Auth (No-Login Mode)

For users who don't want to create an account:

```typescript
// Anonymous auth - no email/password required
async function signInAnonymouslyIfNeeded(): Promise<string | null> {
  const user = auth.currentUser;
  
  if (user) {
    return user.uid;
  }
  
  // Check if we have a saved anonymous UID
  const savedUid = localStorage.getItem('col_eng_anonymous_uid');
  if (savedUid) {
    // Can't restore anonymous sessions, must re-auth
    // For now, return null (no sync)
    return null;
  }
  
  // Sign in anonymously
  const credential = await signInAnonymously(auth);
  const uid = credential.user.uid;
  
  localStorage.setItem('col_eng_anonymous_uid', uid);
  return uid;
}
```

### 6.2 Auth State Listener

```typescript
let currentUserId: string | null = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId = user.uid;
    console.log(`[Auth] Signed in as ${user.uid}`);
    
    // Start sync manager
    syncManager.start(user.uid);
  } else {
    currentUserId = null;
    console.log('[Auth] Signed out');
    
    // Stop sync manager
    syncManager.stop();
  }
});

function getCurrentUserId(): string | null {
  return currentUserId;
}
```

---

## 7. Error Handling & Recovery

### 7.1 Error Types

```typescript
type SyncErrorType = 
  | 'network'          // Offline or network error
  | 'auth'             // Not authenticated
  | 'quota'            // Firestore quota exceeded (429)
  | 'permission'       // Security rules denied
  | 'conflict'         // Data conflict (rare with LWW)
  | 'unknown';         // Unexpected error

interface SyncError {
  type: SyncErrorType;
  message: string;
  retryable: boolean;
  retryAfter?: number;  // Milliseconds
}
```

### 7.2 Error Handling Logic

```typescript
function handleSyncError(error: unknown): SyncError {
  const code = typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: unknown }).code)
    : '';
  
  const message = error instanceof Error ? error.message : String(error);
  
  switch (code) {
    case 'resource-exhausted':
      return {
        type: 'quota',
        message: 'Firestore quota exceeded',
        retryable: true,
        retryAfter: 2 * 60 * 60 * 1000, // 2 hours
      };
    
    case 'unauthenticated':
    case 'permission-denied':
      return {
        type: 'auth',
        message: 'Not authenticated or permission denied',
        retryable: false,
      };
    
    case 'unavailable':
    case 'failed-precondition':
      return {
        type: 'network',
        message: 'Network unavailable',
        retryable: true,
        retryAfter: 30_000, // 30 seconds
      };
    
    case 'already-exists':
      return {
        type: 'conflict',
        message: 'Document already exists',
        retryable: false,
      };
    
    default:
      return {
        type: 'unknown',
        message,
        retryable: true,
        retryAfter: 60_000, // 1 minute
      };
  }
}
```

### 7.3 Cooldown Mechanism

```typescript
const COOLDOWN_KEY = 'col_eng_sync_cooldown';
const COOLDOWN_DURATION = 2 * 60 * 60 * 1000; // 2 hours

function enterCooldown(): void {
  localStorage.setItem(COOLDOWN_KEY, String(Date.now() + COOLDOWN_DURATION));
  console.log('[Sync] Entered cooldown for 2 hours');
}

function isInCooldown(): boolean {
  const cooldownUntil = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
  return Date.now() < cooldownUntil;
}

function getCooldownRemaining(): number {
  const cooldownUntil = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
  return Math.max(0, cooldownUntil - Date.now());
}
```

---

## 8. Storage Optimization

### 8.1 localStorage Size Management

```typescript
const MAX_LOCALSTORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit
const WARNING_THRESHOLD = 4 * 1024 * 1024; // 4MB warning

function checkStorageUsage(): { used: number; percentage: number; warning: boolean } {
  let totalSize = 0;
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key) || '';
      totalSize += key.length + value.length;
    }
  }
  
  // Estimate in bytes (UTF-16 = 2 bytes per char)
  const usedBytes = totalSize * 2;
  const percentage = (usedBytes / MAX_LOCALSTORAGE_SIZE) * 100;
  
  return {
    used: usedBytes,
    percentage,
    warning: usedBytes > WARNING_THRESHOLD,
  };
}

function cleanupOldHistory(): void {
  const gamification = loadGamification();
  if (!gamification?.history) return;
  
  // Keep only last 365 days
  const oneYearAgo = new Date();
  oneYearAgo.setDate(oneYearAgo.getDate() - 365);
  const cutoffDate = oneYearAgo.toISOString().split('T')[0];
  
  gamification.history = gamification.history.filter(
    day => day.date >= cutoffDate
  );
  
  saveGamification(gamification);
}
```

### 8.2 Card Data Compression

```typescript
// Already defined in SRS spec, but here's the sync-optimized version
interface CompressedSRSCard {
  e: number;    // expressionId
  s: string;    // state (N/L/R/RL)
  ef: number;   // easeFactor
  i: number;    // interval
  d: number;    // due (seconds since epoch)
  r: number;    // repetitions
  l: number;    // lapses
  lr: number;   // lastReview (seconds since epoch)
  rc: number;   // reviewCount
  v: number;    // version (for conflict detection)
}

function compressForSync(card: SRSCard): CompressedSRSCard {
  const stateMap: Record<string, string> = {
    'NEW': 'N',
    'LEARNING': 'L',
    'REVIEW': 'R',
    'RELEARNING': 'RL',
  };
  
  return {
    e: card.expressionId,
    s: stateMap[card.state] || 'N',
    ef: Math.round(card.easeFactor * 100) / 100,
    i: card.interval,
    d: Math.floor(card.due / 1000),
    r: card.repetitions,
    l: card.lapses,
    lr: card.lastReview ? Math.floor(card.lastReview / 1000) : 0,
    rc: card.reviewCount,
    v: card._sync?.version ?? 0,
  };
}

// Storage savings: ~200 bytes → ~60 bytes per card (70% reduction)
```

---

## 9. Security Rules

### 9.1 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // EnglishExpressions collection (admin panel writes, web app reads)
    match /EnglishExpressions/{docId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null; // Admin panel uses Firebase Auth
    }
    
    // Metadata collection (read-only for everyone)
    match /metadata/{docId} {
      allow read: if true;
      allow write: if false;
    }
    
    // SystemMetadata (legacy, read-only)
    match /SystemMetadata/{docId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

**⚠️ IMPORTANT:** `EnglishExpressions` write rule allows authenticated users (admin panel uses Firebase Auth with Google Sign-In). Do NOT set `allow write: if false` as it would break the admin panel.

### 9.2 Why User-Scoped Paths

```
✅ users/{userId}/cards/{expressionId}
✅ users/{userId}/progress
✅ users/{userId}/gamification

❌ cards/{expressionId}           // No user isolation
❌ global/user-progress/{userId}  // Flat structure, hard to query
```

**Benefits:**
- Natural security rules (user can only access own data)
- Easy to query (all user data in one subcollection)
- Scales well (no collection group queries needed)
- Firebase console UI shows data per-user

---

## 10. Testing Strategy

### 10.1 Unit Tests

```typescript
describe('PendingQueue', () => {
  test('enqueueChange adds change to queue', () => {
    const queue = getPendingQueue();
    expect(queue.changes).toHaveLength(0);
    
    enqueueChange('cards', '123', 'set', { expressionId: 123 });
    
    const updatedQueue = getPendingQueue();
    expect(updatedQueue.changes).toHaveLength(1);
  });
  
  test('enqueueChange merges duplicate changes', () => {
    enqueueChange('cards', '123', 'set', { expressionId: 123, interval: 1 });
    enqueueChange('cards', '123', 'set', { interval: 2 });
    
    const queue = getPendingQueue();
    expect(queue.changes).toHaveLength(1);
    expect(queue.changes[0].data.interval).toBe(2);
  });
});

describe('Conflict Resolution', () => {
  test('resolveConflict uses version counter', () => {
    const local = { _sync: { version: 1 } } as SRSCard;
    const remote = { _sync: { version: 2 } } as SRSCard;
    
    const { resolved, strategy } = resolveConflict(local, remote);
    expect(resolved).toBe(remote);
    expect(strategy.strategy).toBe('lww');
  });
  
  test('resolveConflict falls back to timestamp', () => {
    const local = { _sync: { version: 1, lastSyncedAt: '2026-06-09T12:00:00Z' } } as SRSCard;
    const remote = { _sync: { version: 1, lastSyncedAt: '2026-06-09T13:00:00Z' } } as SRSCard;
    
    const { resolved } = resolveConflict(local, remote);
    expect(resolved).toBe(remote);
  });
});
```

### 10.2 Integration Tests

```typescript
describe('SyncManager', () => {
  test('flushes queue on app close', async () => {
    enqueueChange('cards', '123', 'set', { expressionId: 123 });
    
    // Simulate beforeunload
    window.dispatchEvent(new Event('beforeunload'));
    
    // Wait for async flush
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const queue = getPendingQueue();
    expect(queue.changes).toHaveLength(0);
  });
  
  test('enters cooldown on 429 error', async () => {
    // Mock Firestore to return 429
    // ... test implementation
    
    expect(isInCooldown()).toBe(true);
    expect(getCooldownRemaining()).toBeGreaterThan(0);
  });
});
```

### 10.3 End-to-End Tests

```typescript
describe('Cross-Device Sync', () => {
  test('syncs SRS card between two devices', async () => {
    // Device 1: Review a card
    const card1 = reviewCard(mockCard, 'good');
    enqueueChange('cards', String(card1.expressionId), 'set', card1);
    await flushPendingQueue();
    
    // Device 2: Pull changes
    await syncManager.pullRemoteChanges();
    
    const card2 = loadCard(card1.expressionId);
    expect(card2.interval).toBe(card1.interval);
  });
});
```

---

## 11. Monitoring & Observability

### 11.1 Sync Metrics

```typescript
interface SyncMetrics {
  // Queue metrics
  pendingChanges: number;
  oldestPendingAge: number;     // Milliseconds
  
  // Sync metrics
  lastSyncAttempt: string;      // ISO timestamp
  lastSyncSuccess: string;      // ISO timestamp
  syncErrors: number;           // Last 24 hours
  
  // Storage metrics
  localStorageUsed: number;     // Bytes
  localStoragePercentage: number;
  
  // Performance metrics
  averageSyncDuration: number;  // Milliseconds
  averageChangesPerSync: number;
}
```

### 11.2 Logging

```typescript
function logSyncEvent(event: string, data?: Record<string, unknown>): void {
  if (process.env.NODE_ENV !== 'production') return;
  
  // Send to analytics (e.g., Firebase Analytics)
  logEvent(analytics, event, data);
  
  // Also log to console in development
  console.log(`[Sync] ${event}`, data);
}

// Usage
logSyncEvent('sync_flush', { changes: 5, duration: 1200 });
logSyncEvent('sync_error', { type: 'quota', retryable: true });
logSyncEvent('conflict_resolved', { strategy: 'lww', versionDiff: 2 });
```

---

## 12. Session Management & Timeout

### 12.1 Session Timeout

Learning queue items have a 10-minute expiry. The session document must be cleaned up if the app is left open for hours:

```typescript
const SESSION_TIMEOUT_MS = 4 * 60 * 60 * 1000; // 4 hours
const SESSION_CHECK_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

function checkSessionTimeout(): void {
  const session = loadSession();
  if (!session) return;
  
  const elapsed = Date.now() - session.sessionStartTime;
  
  if (elapsed > SESSION_TIMEOUT_MS) {
    console.log('[Session] Timeout exceeded, resetting session');
    
    // Clear learning queue (items expired)
    session.learningQueue = [];
    session.currentCardIndex = 0;
    session.sessionStartTime = Date.now();
    
    saveSession(session);
  } else {
    // Remove expired learning queue items (10-minute window)
    const now = Date.now();
    session.learningQueue = session.learningQueue.filter(
      item => item.due > now
    );
    saveSession(session);
  }
}

// Start periodic session check
setInterval(checkSessionTimeout, SESSION_CHECK_INTERVAL_MS);
```

### 12.2 Daily Stats Reset

The `today` field in progress resets at midnight (KST timezone for Korean users):

```typescript
function checkDailyReset(): void {
  const progress = loadProgress();
  if (!progress) return;
  
  const today = getTodayInTimezone('Asia/Seoul'); // KST
  
  if (progress.today.date !== today) {
    // New day - reset daily stats
    progress.today = {
      date: today,
      reviewed: 0,
      newIntroduced: 0,
      xpEarned: 0,
      goalMet: false,
    };
    
    // Update streak
    progress.streak = updateStreak(progress.streak, today);
    
    saveProgress(progress);
  }
}

function getTodayInTimezone(timezone: string): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: timezone });
}
```

---

## Appendix A: localStorage Keys Summary

| Key | Type | Description |
|-----|------|-------------|
| `col_eng_srs_cards` | JSON | All SRS card data |
| `col_eng_card_index` | JSON | expressionId → card lookup map |
| `col_eng_progress` | JSON | User progress (streak, stats, settings) |
| `col_eng_gamification` | JSON | XP, badges, history |
| `col_eng_session` | JSON | Learning queue, current card |
| `col_eng_settings` | JSON | User preferences |
| `col_eng_pending_queue` | JSON | Pending sync changes |
| `col_eng_last_sync` | String | ISO timestamp of last successful sync |
| `col_eng_sync_cooldown` | Number | Cooldown expiry timestamp |
| `col_eng_device_id` | String | Unique device identifier |
| `col_eng_anonymous_uid` | String | Firebase anonymous auth UID |

## Appendix B: Firebase Collections Summary

| Collection | Document | Fields | Sync Priority |
|------------|----------|--------|---------------|
| `users/{uid}/` | `progress` | streak, today, lifetime, settings, _sync | High |
| `users/{uid}/` | `gamification` | xp, level, badges, history, _sync | Medium |
| `users/{uid}/` | `session` | learningQueue, currentCardIndex, _sync | Critical |
| `users/{uid}/cards/` | `{expressionId}` | SRSCard fields, _sync | High |

## Appendix C: Sync Cost Analysis

**Firestore Pricing (Blaze Plan):**
- Writes: $0.18 per 100,000
- Reads: $0.06 per 100,000
- Storage: $0.108 GiB/month

**Estimated Monthly Costs:**
- 20 reviews/day × 30 days = 600 reviews
- Each review updates 1 card document + 1 progress document = 2 writes
- Total: ~1,200 writes/month
- **Cost: ~$0.0002/month** (essentially free)

**Storage:**
- 1,500 compressed cards × 60 bytes = 90 KB
- Progress + gamification: ~5 KB
- **Total: ~95 KB per user** (well within free tier)

---

*This specification will be updated as implementation progresses and user testing feedback is gathered.*
