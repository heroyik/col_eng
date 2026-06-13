# Async Data Sync Specification

**Project:** Colloquial English (COL_ENG)
**Date:** 2026-06-09
**Status:** Draft

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Current Architecture](#2-current-architecture)
3. [Requirements](#3-requirements)
4. [Proposed Architecture: Metadata Signal + BroadcastChannel](#4-proposed-architecture)
5. [Data Flow](#5-data-flow)
6. [Component Changes](#6-component-changes)
7. [Cost Analysis](#7-cost-analysis)
8. [Migration Path](#8-migration-path)
9. [Key Function Contracts](#9-key-function-contracts)
10. [Edge Cases & Error Handling](#10-edge-cases--error-handling)
11. [UI Behavior After Auto-Sync](#11-ui-behavior-after-auto-sync)
12. [Rollout Plan](#12-rollout-plan)
13. [Appendix: Research Notes](#13-appendix-research-notes)
14. [Appendix A: File Change Summary](#appendix-a-file-change-summary)
15. [Appendix B: Key Design Decisions](#appendix-b-key-design-decisions)

---

## 1. Problem Statement

### 1.1 Core Issue

When an admin adds a new expression via `admin.html`, the data is saved to Firestore (`EnglishExpressions` collection) immediately, but the web app (`index.html`) cannot see it until:

1. The **Cloud Function** (`functions/index.js`) triggers a **GitLab CI pipeline**
2. The GitLab job rebuilds `initial_data.json`
3. The GitLab job bumps `APP_VERSION`
4. The new static bundle is deployed to GitLab Pages
5. The user refreshes the page (or is prompted to by the version listener)

This pipeline takes **1–5 minutes** at best, and — most critically — the static `initial_data.json` **must be rebuilt** before any new data reaches users.

### 1.2 Read Cost Issue

Even with the `forcedownload` magic command, the web app re-downloads the **entire dataset** from Firestore, consuming ~1,500 reads per forced refresh. On the Blaze plan (50K reads/day free, then $0.06/100K reads), 10 forcedownloads/day at 1,500 reads each = 15,000 reads = still within free tier. But as the dataset grows or more users trigger syncs, costs add up.

### 1.3 The Two-Collection Problem

Currently:
| Page | Collection | Purpose |
|------|-----------|---------|
| `app.js` (search) | `expressions` | Read-only, client-side search |
| `admin.js` (admin) | `EnglishExpressions` | Read/write, AI generation |

This means the web app's delta sync queries a **different collection** than where admin writes. Any new data added to `EnglishExpressions` must go through the full pipeline before it appears in `expressions`.

---

## 2. Current Architecture

### 2.1 Data Flow (Current)

```
Admin saves → EnglishExpressions
    ↓
Cloud Function (synctogitlab)
    ↓
GitLab CI pipeline
    ↓
rebuild initial_data.json + bump APP_VERSION
    ↓
commit + push → GitLab Pages deploy
    ↓
Firestore metadata/current_config.version updated
    ↓
Web app onSnapshot detects version change
    ↓
User prompted to refresh → page reload
    ↓
Web app loads fresh initial_data.json → delta sync
```

**Total estimated latency:** 1–5 minutes minimum
**Firestore reads per `forcedownload`:** ~1,500 (full dataset)
**GitLab CI minutes per save:** ~1–2 minutes

### 2.2 Key Files Involved

| File | Role |
|------|------|
| `admin.js` | Saves to `EnglishExpressions`, updates `SystemMetadata/sync` |
| `functions/index.js` | Cloud Function triggers GitLab pipeline |
| `.gitlab-ci.yml` | Builds and deploys to GitLab Pages |
| `app.js` | Reads from `expressions`, delta sync, version listener |
| `download_data.mjs` | Script to pull Firestore data (currently broken/unrelated content) |

---

## 3. Requirements

### 3.1 Functional Requirements

1. **Real-time sync:** When admin saves a new expression, it should appear in the web app within **seconds** (not minutes)
2. **Auto-notify:** When admin saves, all open web app tabs should automatically fetch new data (no `forcedownload` needed)
3. **Minimal reads:** The solution should minimize Firestore read consumption (free tier: 50K/day; Blaze: $0.06/100K reads beyond that)
4. **No pipeline dependency:** The sync should not depend on GitLab CI or Cloud Functions
5. **Offline-first:** First-time visitors still get `initial_data.json` (0 reads); only delta sync uses reads
6. **Single collection:** Admin and web app should use the **same Firestore collection** to avoid sync mismatch
7. **Cold start:** Users visiting fresh (no cache) still see all data
8. **Replace, not augment:** The new approach should **replace** the Cloud Function → GitLab CI → rebuild pipeline

### 3.2 Non-Goals

- No changes to Firestore data schema (`Expression` document structure stays the same)
- No changes to Firebase Auth or security rules
- No server-side infrastructure changes beyond removing the Cloud Function
- No changes to AI generation logic in admin
- `initial_data.json` can still exist for cold-start optimization but is no longer the sync mechanism

---

## 4. Proposed Architecture

### 4.1 Overview: Metadata Signal + BroadcastChannel

The core idea is to decouple **notification** from **data transfer**:

1. **Notification:** A lightweight Firestore `onSnapshot` listener on a dedicated metadata document + a `BroadcastChannel` for instant cross-tab signaling
2. **Data Transfer:** A targeted delta query (`where("id", ">", lastKnownId)`) that fetches **only new documents** (minimal reads)

```
┌─────────────────────────────────────────────────────────────────┐
│                         admin.html                               │
│                                                                  │
│  Save to Firestore (EnglishExpressions)                          │
│       │                                                          │
│       ├── 1) Firestore write → EnglishExpressions/{docId}       │
│       └── 2) Firestore write → metadata/sync (lastId, updatedAt) │
│       └── 3) BroadcastChannel.postMessage({ type: 'NEW_DATA' })  │
└─────────────────────────────────────────────────────────────────┘
                           │                  │
                           ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                        index.html (web app)                      │
│                                                                  │
│  ┌─────────────────────┐    ┌────────────────────────────────┐  │
│  │ BroadcastChannel     │    │ Firestore onSnapshot           │  │
│  │ onmessage handler    │◄───│ metadata/sync (1 read/change)  │  │
│  │ (instant, no reads)  │    │ (fallback if tab was closed)   │  │
│  └─────────┬───────────┘    └───────────────┬────────────────┘  │
│            │                                 │                   │
│            └────────────┬────────────────────┘                   │
│                         ▼                                        │
│            ┌──────────────────────────────┐                      │
│            │ Delta fetch:                 │                      │
│            │ where("id", ">", lastKnownId)│                      │
│            │ Only new documents (N reads) │                      │
│            └──────────────┬───────────────┘                      │
│                           ▼                                      │
│            └──── New expressions available ────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 The Metadata Document

A single Firestore document at `metadata/sync` acts as the signal source:

```json
{
  "lastId": 1484,
  "updatedAt": "2026-06-09T10:30:00.000Z"
}
```

**Why this is cheap:**
- `onSnapshot` on this single document costs **1 read** every time the document changes (plus 1 read for initial attach)
- No listener on the main collection (which would cost N reads for N documents)
- The document is tiny (~100 bytes) — negligible bandwidth

### 4.3 BroadcastChannel for Instant Notification

The `BroadcastChannel` API provides **zero-cost** same-origin cross-tab messaging:

```javascript
// Shared channel name
const channel = new BroadcastChannel('col_eng_sync');

// Admin tab: after saving
channel.postMessage({
  type: 'NEW_DATA',
  lastId: 1484,
  updatedAt: new Date().toISOString()
});

// Search tab: listen for updates
channel.onmessage = (event) => {
  if (event.data.type === 'NEW_DATA') {
    triggerDeltaSync(event.data.lastId);
  }
};
```

**Benefits:**
- **Instant:** No network round-trip — same-process messaging
- **Zero cost:** No Firestore reads, no API calls
- **Same origin works:** Both `admin.html` and `index.html` are served from the same GitLab Pages origin
- **No external dependencies:** Pure browser API

### 4.4 Collection Consolidation

**Recommendation:** Consolidate to a single collection: `EnglishExpressions`.

| Change | From | To |
|--------|------|----|
| Admin reads/writes | `EnglishExpressions` | `EnglishExpressions` (no change) |
| Web app reads | `expressions` | ✅ `EnglishExpressions` |
| Admin writes metadata to | `SystemMetadata/sync` | ✅ `metadata/sync` |
| Web app reads metadata from | `metadata/current_config` | ✅ `metadata/sync` |

**Why consolidate:**
- Eliminates the two-collection sync problem at its root
- Admin writes and web app reads the **same data**
- No need for a pipeline to copy data between collections
- Firestore rules remain simple (`read, write: if true`)

### 4.5 What Happens to the Pipeline?

The Cloud Function (`functions/index.js`) and GitHub Action (`sync_data.yml`) are **removed**:

| Component | Fate | Reason |
|-----------|------|--------|
| `functions/index.js` | Remove | No longer needed — no pipeline to trigger |
| `.github/workflows/sync_data.yml` | Remove | No longer needed |
| `download_data.mjs` | Keep (needs fix) | Manual backup script, currently contains unrelated English lesson text. Fix as a separate cleanup task. After pipeline removal, this script is just a dev tool — no production dependency. |
| `APP_VERSION` constant in JS | Keep (harmless) or Remove | The `?v=...` cache-busting on CSS/JS URLs (in HTML files) is **separate** from the `APP_VERSION` JS variable. Keep the URL params for HTTP cache; the JS constant becomes unused after version-check removal. |
| `APP_VERSION` bumping in sync_data.yml | Remove | No more `sed`-based version bumps in CI |
| `metadata/current_config.version` | Remove | Replaced by `metadata/sync.lastId` |
| `initial_data.json` | Keep | Still used for cold-start (0 reads for first load). No longer needs daily rebuild — weekly or on-demand is fine. |

**Note:** `initial_data.json` is still valuable for cold-start optimization, but it no longer needs to be perfectly up-to-date. It can be regenerated periodically (e.g., once a week) via a manual `node download_data.mjs` for performance.

### 4.6 Old `expressions` Collection — Orphaned Data

After switching the web app to `EnglishExpressions`, the old `expressions` collection (IDs 1–1483) is no longer read by either app.

| Option | Description | Recommendation |
|--------|-------------|----------------|
| **Ignore** | Leave the old collection in place. It consumes negligible storage (~1MB). | ✅ **Recommended** — no risk, no migration needed |
| **Delete** | Remove the `expressions` collection entirely after a cooldown period. | Future cleanup, not required for Phase 1 |
| **Dual-write** | Admin writes to both collections during a transitional period. | Overcomplicates the migration; not recommended |

**Action:** Document this orphan in the project README as an FYI. No code changes needed.

---

## 5. Data Flow

### 5.1 Admin Saves New Expression

```
Step 1: Admin clicks "Save to Firestore"
         ↓
Step 2: admin.js writes to EnglishExpressions/expression_{id}
         ↓
Step 2b: admin.js sets doc(metadata/sync).set({
           lastId: nextId,
           updatedAt: new Date().toISOString()
         }, { merge: true })
         ↓
Step 3: admin.js calls channel.postMessage({ type: 'NEW_DATA', lastId })
         ↓
Step 4: Admin sees "Saved successfully — data syncing to web app"
         (no more "Type 'forcedownload' to sync" message)
```

### 5.2 Web App Receives New Data

```
Scenario A: Search tab is open
         ↓
BroadcastChannel detects 'NEW_DATA' message (instant, 0 reads)
         ↓
app.js calls deltaSync(lastKnownId)
         ↓
Queries: where("id", ">", lastKnownId) on EnglishExpressions
         ↓
Fetches only new documents (N reads = N new expressions)
         ↓
Appends to local expressions array
         ↓
Re-renders search results / updates daily expression / updates stats
         ↓
✅ New data visible instantly

Scenario B: Search tab was closed, user opens it later
         ↓
app.js loads initial_data.json (cold start, 0 reads)
         ↓
Attaches onSnapshot to metadata/sync → detects lastId > cached lastId
         ↓
Delta sync fires → fetches only records where("id", ">", cachedLastId)
         ↓
New data appended
         ↓
✅ New data visible
```

### 5.3 Cold Start (First-Time Visitor)

```
User visits index.html for the first time
         ↓
fetch('initial_data.json') → 0 Firestore reads
         ↓
Render all 1,400+ expressions immediately
         ↓
Attach onSnapshot to metadata/sync → 1 read
         ↓
If metadata/sync.lastId > initial_data.json max ID
  → deltaQuery: where("id", ">", maxLocalId) → N reads
  → append new records
         ↓
✅ User sees all data with minimal reads
```

### 5.4 What Changes in Each File

#### admin.js Changes

| Change | Details |
|--------|---------|
| **Collection ref** | No change — already uses `EnglishExpressions` |
| **After save** | Update `metadata/sync` with `{ lastId, updatedAt }` |
| **After save** | `BroadcastChannel.postMessage({ type: 'NEW_DATA', lastId })` |
| **Remove** | `SystemMetadata/sync` update (deprecated) |
| **Remove** | "Type 'forcedownload' to sync" message |
| **Remove** | No Cloud Function dependency |

#### app.js Changes

| Change | Details |
|--------|---------|
| **Collection ref** | `expressions` → `EnglishExpressions` |
| **Metadata ref** | `metadata/current_config` → `metadata/sync` |
| **Version listener** | Replace with `onSnapshot` on `metadata/sync` tracking `lastId` |
| **Add** | `BroadcastChannel` listener for instant notification |
| **Remove** | `forcedownload` magic command (no longer needed — auto- sync) |
| **Remove** | `APP_VERSION` check and cache-busting logic |
| **Remove** | `setupVersionListener()` — replaced by metadata listener |
| **Remove** | `window.hardReset` / `window.hardResetManual` (removed) |
| **Keep** | `initial_data.json` cold start (0 reads) |
| **Keep** | `COOLDOWN_KEY` localStorage key |
| **Remove** | `CACHE_DATE_KEY`, `VERSION_KEY`, `LOCAL_ID_KEY` localStorage keys (unused) |
| **Keep** | Delta sync logic (`where("id", ">", lastId)`) — virtually unchanged |
| **Keep** | `normalizeExpression()`, search functions, UI rendering |

#### Files to Remove

| File | Reason |
|------|--------|
| `functions/index.js` | Cloud Function: no longer needed |
| `.github/workflows/sync_data.yml` | Pipeline: no longer needed |

#### Files to Keep (Optional)

| File | Reason |
|------|--------|
| `download_data.mjs` | Manual backup/export tool (fix the content; currently contains unrelated text) |

---

## 6. Component Changes

### 6.1 admin.js — Detailed Code Changes

#### After Save

Replace the current save handler's metadata update:

```javascript
// Current (to be removed):
await setDoc(doc(db, "SystemMetadata", "sync"), {
  totalCount: nextId,
  lastUpdatedAt: new Date().toISOString()
});

// New:
await setDoc(doc(db, "metadata", "sync"), {
  lastId: nextId,
  updatedAt: new Date().toISOString()
}, { merge: true });

// Broadcast to other tabs
const syncChannel = new BroadcastChannel('col_eng_sync');
syncChannel.postMessage({
  type: 'NEW_DATA',
  lastId: nextId,
  updatedAt: new Date().toISOString()
});
```

#### Remove the forcedownload Message

Replace:
```javascript
appendStatusLine(`데이터 동기화가 필요합니다. 입력창에 'forcedownload'를 입력하거나 Antigravity에게 'sync'를 요청하세요.`);
setStatusMessage(saveMessage, "Sync Required: Type 'forcedownload' to sync.", "success");
```

With:
```javascript
appendStatusLine(`데이터가 웹 앱에 실시간 동기화되었습니다.`);
setStatusMessage(saveMessage, "Saved successfully — syncing to web app.", "success");
```

### 6.2 app.js — Detailed Code Changes

#### Collection Reference

```javascript
// Current:
const expressionsRef = collection(db, "expressions");

// New:
const expressionsRef = collection(db, "EnglishExpressions");
```

#### Metadata Listener (attached after cold start)

Replace `setupVersionListener()` with a listener that is called AFTER `fetchAllExpressions()` completes:

```javascript
// Current: version-based listener
function setupVersionListener() {
  const metadataRef = doc(db, "metadata", "current_config");
  onSnapshot(metadataRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const serverVersion = data.version;
      if (serverVersion && serverVersion !== APP_VERSION) {
        // ... prompt refresh
      }
    }
  });
}

// New: lastId-based listener — attach ONLY after cold start completes
function setupMetadataListener() {
  const metadataRef = doc(db, "metadata", "sync");
  onSnapshot(metadataRef, (snapshot) => {
    if (!snapshot.exists()) return;
    const data = snapshot.data();
    if (data.lastId && data.lastId > getLocalMaxId()) {
      console.log(`New data detected: lastId=${data.lastId} > local max=${getLocalMaxId()}`);
      performDeltaSync();
    }
  });
}
```

**Call sites (bottom of app.js):**
```javascript
// Old (remove):
setupVersionListener();

// New:
fetchAllExpressions().finally(() => {
  setupMetadataListener();  // Wait for cold start to finish
  setupBroadcastChannel();  // Independent, can attach anytime
});
```

#### BroadcastChannel Listener

Add alongside the Firestore listener:

```javascript
function setupBroadcastChannel() {
  if (typeof BroadcastChannel === 'undefined') {
    console.log('BroadcastChannel not supported — relying on Firestore listener');
    return;
  }
  const syncChannel = new BroadcastChannel('col_eng_sync');
  syncChannel.onmessage = (event) => {
    if (event.data.type === 'NEW_DATA') {
      console.log('BroadcastChannel: new data detected, syncing...');
      refreshCurrentView(); // show a brief "2 new expressions" toast/indicator
      performDeltaSync();
    }
  };
}
```

#### `forcedownload` Handling (Hidden Fallback)

Keep the `forcedownload` keyword check in `performSearch()`, but:
- **Do not advertise it in the UI** — no help text, no status messages about it
- **Behavior change:** Instead of re-downloading everything from scratch, `forcedownload` now calls `performDeltaSync()` to fetch only newer records (same as auto-sync)
- No hard reset mechanism exists (previously `window.hardReset()` was removed). To force a full cache refresh, users can clear browser data or use `localStorage.clear(); location.reload()` from the console.

```javascript
// Simplified forcedownload — just triggers the same delta sync
if (lowerSearch === "forcedownload") {
  console.log("Force sync triggered via hidden command.");
  await performDeltaSync();
  searchInput.value = `${expressions.length} expressions loaded`;
  // ... revert after 3 seconds
  return;
}
```

#### Remove Version Check

The `APP_VERSION` check serves two purposes:
1. **Data sync signal** (`APP_VERSION` mismatched → refresh) → **replaced** by `metadata/sync.lastId` listener
2. **HTTP cache-busting** (the `?v=...` query string on JS/CSS tags) → **keep unchanged** — this is handled by the static HTML, not by `app.js` logic

The `cachedVersion !== APP_VERSION` block that clears IndexedDB, terminates Firestore, and reloads the page is **removed**. The `APP_VERSION` constant itself and the version log line can stay or go — they're harmless but no longer drive sync behavior.

### 6.3 index.html — No Changes Needed

The HTML structure stays the same. The only change is in `app.js` behavior.

### 6.4 admin.html — No Changes Needed

The HTML structure stays the same. The `APP_VERSION` cache-busting parameter on script tags can remain (harmless).

---

## 7. Cost Analysis

### 7.1 Firestore Read Cost Comparison

**Billing plan:** Blaze (first 50K reads/day free, then $0.06 per 100,000 reads, i.e., $0.0000006 per read)

| Scenario | Current | Proposed | Savings |
|----------|---------|----------|---------|
| **Cold start** (new user) | 1 read | 1 read (metadata onSnapshot) | Same |
| **Admin saves 1 expression** | ~1,500 reads | **2 reads** (metadata + 1 doc) | **~99.9%** |
| **10 expressions/day** | 10 × 1,500 = 15,000 reads ($0.009 if above free tier) | 10 × 2 = 20 reads ($0.000012) | **99.87%** |
| **Monthly cost (50 saves)** | ~75,000 reads ($0.015 after free tier) | ~100 reads ($0.00006) | **~$0.015/mo saved** |
| **Metadata listener (per tab)** | 0 (no persistent listener) | 1 read per metadata change | Negligible |

**Conclusion:** Even on Blaze, the cost savings are modest in absolute terms (~$0.02/month). The primary benefit is **performance**: sub-second sync vs. minutes-long pipeline, and no GitHub Actions dependency.

### 7.2 GitHub Actions Latency Comparison

| Resource | Current | Proposed | Savings |
|----------|---------|----------|---------|
| Workflow runs per save | 1 (sync_data.yml) + 1 (deploy.yml) | **0** | **100% reduction** |
| Compute minutes per save | ~2 minutes | 0 | **100% reduction** |
| Monthly cost (50 saves) | ~100 min (within free tier) | 0 | Negligible ($) |
| **Latency per save** | **1–5 minutes** | **< 2 seconds** | **~99.9% reduction** |

**Conclusion:** Removing the GitHub Actions pipeline eliminates the 1–5 minute wait for data to reach users. This is the primary benefit — cost savings are secondary since GitHub Actions has a free tier for private repos (300 min/month).

### 7.3 Bandwidth Comparison

| Scenario | Current | Proposed |
|----------|---------|----------|
| forcedownload | ~500KB (full initial_data.json) | 0 (removed) |
| Version refresh | ~500KB (full initial_data.json) | 0 (no version refresh needed) |
| Delta sync (1 new expr) | ~500KB (full reload) | **~2KB** (1 new document) |
| Delta sync (10 new expr) | ~500KB (full reload) | **~20KB** (10 new docs) |

---

## 8. Migration Path

### 8.1 Phase 1: Backend Changes (Admin Panel)

1. **Update `admin.js`:**
   - Add BroadcastChannel setup and postMessage on save
   - Change metadata write target from `SystemMetadata/sync` to `metadata/sync` (fields: `lastId`, `updatedAt`)
   - Update status messages (remove forcedownload prompt)
   - Remove `SystemMetadata/sync` write

2. **Test:** Save a new expression → verify `metadata/sync` document is created/updated in Firestore

### 8.2 Phase 2: Frontend Changes (Web App)

1. **Update `app.js`:**
   - Switch collection ref from `expressions` to `EnglishExpressions`
   - Replace `setupVersionListener()` with `setupMetadataListener()` (tracks `lastId`)
   - Add `setupBroadcastChannel()` for instant cross-tab notification
   - Remove `forcedownload` handler from search
   - Remove version-based cache invalidation / hard reset logic
   - Simplify the empty state / stats display (no longer need to show sync date)

2. **Test:** Open web app → open admin in another tab → save → verify web app updates within seconds

### 8.3 Phase 3: Remove Pipeline

1. **Delete `functions/index.js`** (or replace with a no-op / stub)
2. **Delete `.github/workflows/sync_data.yml`**
3. **Update `.github/workflows/deploy.yml`** — remove dependency on sync_data
4. **Update `README.md`** — remove pipeline documentation
5. **Update `plan/framework-upgrade-spec.md`** — reflect the new sync architecture

### 8.4 Phase 4: Cleanup (Optional)

1. **Fix `download_data.mjs`** — currently contains unrelated English lesson content
2. **Regenerate `initial_data.json`** from current Firestore state (to ensure cold-start has all data)
3. **Firestore cleanup:** Remove old `SystemMetadata/sync` and `metadata/current_config` documents (optional)

### 8.5 Rollback Plan

If the new approach has issues:

1. Revert `app.js` to use `expressions` collection
2. Revert `admin.js` to update `SystemMetadata/sync`
3. Restore `functions/index.js` and `sync_data.yml`
4. This restores the original pipeline behavior

The `metadata/sync` document can coexist with `SystemMetadata/sync` and `metadata/current_config` — they don't interfere.

---

## 9. Key Function Contracts

This section defines the new functions that replace or are extracted from the existing monolithic `fetchAllExpressions()`.

### 9.1 `getLocalMaxId()`

**Purpose:** Determine the highest expression `id` currently in the local `expressions` array.

**Contract:**
```javascript
function getLocalMaxId() {
  return expressions.reduce((max, e) => {
    const numericId = Number(e.id);
    return isNaN(numericId) ? max : Math.max(max, numericId);
  }, 0);
}
```

**Called by:** `setupMetadataListener()`, `performDeltaSync()`, and anywhere the sync threshold is needed.

### 9.2 `performDeltaSync()`

**Purpose:** Fetch documents from Firestore with `id > localMaxId`, normalize them, append to the local `expressions` array, and re-render the UI. Includes full error handling with 429 cooldown.

**Contract:**
```javascript
async function performDeltaSync() {
  // Cooldown check
  const cooldownUntil = localStorage.getItem(COOLDOWN_KEY);
  if (cooldownUntil && Date.now() < parseInt(cooldownUntil)) {
    console.warn('Delta sync skipped: quota cooldown active');
    return;
  }

  try {
    const lastId = getLocalMaxId();
    const BATCH_SIZE = 500;
    let fetchMore = true;

    while (fetchMore) {
      const q = query(
        expressionsRef,
        orderBy("id", "asc"),
        where("id", ">", lastId),
        limit(BATCH_SIZE)
      );
      const snapshot = await getDocsFromServer(q);
      if (snapshot.empty) {
        fetchMore = false;
        break;
      }

      const existingIds = new Set(expressions.map(e => e.id));
      let batchMaxId = lastId;

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.id > batchMaxId) batchMaxId = data.id;
        if (!existingIds.has(data.id)) {
          expressions.push(normalizeExpression({ docId: doc.id, ...data }));
          existingIds.add(data.id);
        }
      });

      lastId = batchMaxId;
      if (snapshot.size < BATCH_SIZE) {
        fetchMore = false;
      }
    }

    console.log(`Delta sync complete.`);
    dailyExpression = expressions[Math.floor(Math.random() * expressions.length)];
    refreshCurrentView();
  } catch (error) {
    if (error.code === 'resource-exhausted') {
      console.error('Quota exceeded (429). Entering 2-hour cooldown...');
      const cooldownUntil = Date.now() + (2 * 60 * 60 * 1000);
      localStorage.setItem(COOLDOWN_KEY, cooldownUntil.toString());
    } else if (error.code === 'failed-precondition' || error.code === 'unavailable') {
      console.warn('Delta sync failed (offline), will retry on next signal.');
    } else {
      console.error('Delta sync error:', error);
    }
  }
}
```

**Note:** The existing `fetchAllExpressions()` remains for cold-start (loading `initial_data.json` + IndexedDB cache). `performDeltaSync()` is only for incremental updates.

**Race condition guard:** The metadata listener MUST be attached AFTER `fetchAllExpressions()` completes to prevent the listener from firing before cold-start data is loaded (which would cause `getLocalMaxId()` to return 0 and fetch the entire dataset). Either:
- Call `setupMetadataListener()` inside the `fetchAllExpressions()` finally block, or
- Wrap listener attachment in a flag: `let coldStartDone = false;` set to `true` after cold start completes

### 9.3 `refreshCurrentView()`

**Purpose:** After new data is appended, refresh whatever the user is currently seeing (search results, daily expression, stats) without disrupting their flow.

**Contract (conceptual):**
- If user is viewing a search query → re-run the search on the updated `expressions` array
- If user is viewing the empty/default state → re-render the daily expression and stats count
- Show a subtle badge/toast like "✨ 2 new expressions added" for 3 seconds

### 9.4 Cold Start vs Delta Sync Separation

`fetchAllExpressions()` is refactored into two distinct paths:

| Path | When | Reads | Functions |
|------|------|-------|-----------|
| **Cold start** | Page load | 0 (static bundle) | `fetchAllExpressions()` stays — loads from `initial_data.json` + IndexedDB |
| **Delta sync** | After metadata signal | N = new docs | New `performDeltaSync()` — only fetches docs > lastKnownId |

## 10. Edge Cases & Error Handling

### 10.1 Multiple Admin Saves in Rapid Succession

**Scenario:** Admin saves 3 expressions in 10 seconds.

**Problem:** Each save triggers a BroadcastChannel message and a metadata write. The web app might start 3 delta queries in parallel, potentially fetching the same documents.

**Solution:** Debounce the delta sync in the web app:

```javascript
let deltaSyncTimer = null;
function onNewDataSignal() {
  clearTimeout(deltaSyncTimer);
  deltaSyncTimer = setTimeout(() => {
    performDeltaSync();
  }, 1000); // Wait 1 second after last signal
}
```

### 10.2 Admin Tab and Search Tab Are the Same Tab

**Scenario:** User uses admin panel in same tab, then switches to search in the same tab.

**Solution:** BroadcastChannel works within the same browsing context. If the user navigates from `admin.html` to `index.html` (or vice versa), the BroadcastChannel messages are received even within the same tab.

### 10.3 No Other Tabs Open When Admin Saves

**Scenario:** Admin saves but no search tab is open.

**Solution:** The `metadata/sync` document preserves the latest `lastId`. When a search tab opens later:
1. Cold start: `initial_data.json` loads
2. `onSnapshot` on `metadata/sync` fires (1 read) and detects `lastId` > local max
3. Delta query fetches new records
4. User sees all data

No data is lost because the canonical source is Firestore.

### 10.4 `onSnapshot` Fails or Quota Exceeded

**Scenario:** Firestore returns a 429 (quota exceeded) for the metadata listener.

**Solution:** Keep the existing cooldown mechanism. The web app continues to work with its local cache + `initial_data.json`. On the next page load (or after cooldown), the listener resumes and syncs.

### 10.5 User Has Multiple Search Tabs Open

**Scenario:** User has 3 tabs of `index.html` open.

**Solution:**
- Each tab attaches its own `onSnapshot` on `metadata/sync` → 1 read per tab per change = 3 reads
- **Optimization:** Use `persistentMultipleTabManager()` (already configured) to share Firestore cache across tabs
- The BroadcastChannel also fires for each tab simultaneously, but the delta sync logic is fast (single query)

### 10.6 Initial Metadata Document Doesn't Exist

**Scenario:** `metadata/sync` document has never been created (first admin save ever, or after Firestore reset).

**Solution:** The admin's save handler creates the document via `setDoc({ lastId, updatedAt }, { merge: true })`. The web app's `onSnapshot` handler should handle the case where the document doesn't exist gracefully:

```javascript
onSnapshot(metadataRef, (snapshot) => {
  if (!snapshot.exists()) return; // No sync data yet
  const data = snapshot.data();
  if (data.lastId && data.lastId > getLocalMaxId()) {
    performDeltaSync();
  }
});
```

### 10.7 BroadcastChannel Not Supported

**Scenario:** Older browser doesn't support `BroadcastChannel`.

**Browser Support:** BroadcastChannel is supported in:
- Chrome 54+ (2016)
- Firefox 38+ (2015)
- Safari 15.4+ (2022)
- Edge 79+ (2020)

**Fallback:** The `onSnapshot` listener on `metadata/sync` is the primary notification mechanism. BroadcastChannel is only a **performance optimization** (instant notification vs. waiting for Firestore to propagate the write). If BroadcastChannel is not supported, the listener will still pick up the metadata change within 1–2 seconds.

```javascript
function setupBroadcastChannel() {
  if (typeof BroadcastChannel === 'undefined') {
    console.log('BroadcastChannel not supported — relying on Firestore listener');
    return;
  }
  // ... setup channel
}
```

### 10.8 Web App Cache is Stale

**Scenario:** User hasn't visited for a week. `initial_data.json` has old data. The delta sync fetches all records with `id > lastKnownId`.

**Solution:** This works correctly — the delta query `where("id", ">", lastKnownId)` fetches exactly the records the user hasn't seen. The number of reads equals the number of new documents. If 50 new expressions were added in a week, that's 50 reads — much cheaper than re-downloading the full dataset.

### 10.9 Admin Edits or Deletes an Expression

**Scenario:** Admin modifies an existing expression (e.g., fixes a typo) or deletes one.

**Solution (edits):** The metadata `lastId` only tracks inserts, not edits. For edits:
- **Option A (simple):** Don't sync edits automatically. Admin can use `forcedownload` (keep as a hidden command) or wait for the periodic `initial_data.json` rebuild.
- **Option B (full):** Update `metadata/sync` with a `lastEditId` field that tracks the latest edited document's timestamp. The web app fetches the modified document and updates its cache.
- **Option C (future):** Use `onSnapshot` on the entire collection for full real-time sync (higher cost — only if quota allows).

**Recommendation:** Start with **Option A** (edits are rare — typo fixes happen once a month). `forcedownload` can be kept as a hidden (undocumented) power-user command.

---

## 11. UI Behavior After Auto-Sync

When the web app auto-syncs via BroadcastChannel or metadata listener while the user is interacting with the page:

### 11.1 If User Is Viewing Search Results

- `performDeltaSync()` appends new records to the in-memory `expressions` array
- If the user has a search query currently displayed → **auto-refresh** the results with the updated array
- If the user is just browsing (no active search) → update the `resultCount` label and daily expression silently

### 11.2 Notification to User

- Show a **brief, non-intrusive indicator**: a small animated badge or toast at the top of the results area
- Example: "✨ 2 new expressions added" that fades out after 3 seconds
- **Do not** use `alert()`, `confirm()`, or any modal that interrupts the user

### 11.3 If User Is Mid-Typing

- **Do not interrupt** the user's typing
- Defer the delta sync to complete in the background
- When the user finishes typing (debounce fires), the search will naturally include new records

### 11.4 Stats Display — "Last Sync Time"

The stats area (previously `statsDisplay`) now shows the last sync time instead of a static date:

**Format:** `"1,483 expressions (synced 2m ago)"`

**Implementation:**
- Add a new localStorage key: `LAST_SYNC_KEY = "col_eng_last_sync"`
- After each successful sync (both cold start and delta), write:
  ```javascript
  localStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
  ```
- In `renderEmptyState()`, read this key and format a relative time string:
  ```javascript
  const lastSync = localStorage.getItem(LAST_SYNC_KEY);
  let syncText = '';
  if (lastSync) {
    const diffMs = Date.now() - parseInt(lastSync);
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) syncText = 'synced just now';
    else if (diffMin < 60) syncText = `synced ${diffMin}m ago`;
    else syncText = `synced ${Math.floor(diffMin / 60)}h ago`;
  }
  statsDisplay.innerHTML = `<p class="stats-count">${expressions.length} expressions (${syncText})</p>`;
  ```

### 11.5 If User Is Viewing the Daily Expression

- Re-render the daily expression card only if the refreshed array results in a different random pick
- Update the stats display (expression count and last sync time)

---

## 12. Rollout Plan

### 12.1 Step 1: Deploy admin.js Changes

1. Update `admin.js` to write to `metadata/sync` and broadcast via `BroadcastChannel`
2. Keep the old `SystemMetadata/sync` write temporarily (dual-write)
3. Deploy to GitHub Pages
4. Save a test expression → verify `metadata/sync` appears in Firestore console

### 12.2 Step 2: Deploy app.js Changes

1. Update `app.js` with collection change, metadata listener, BroadcastChannel
2. Keep old version listener temporarily (dual-listen)
3. Add `getLocalMaxId()`, `performDeltaSync()`, and `refreshCurrentView()` helper functions
4. Deploy to GitHub Pages
5. Open web app → open admin → save → verify auto-sync

### 12.3 Step 3: Remove Old Code

1. Remove `SystemMetadata/sync` write from `admin.js`
2. Remove old version listener from `app.js`
3. Simplify `forcedownload` to just call `performDeltaSync()`
4. Remove Cloud Function and GitHub Action workflow
5. Deploy final version

### 12.4 Step 4: Monitor & Verify

- Firestore read count in Google Cloud Console → should drop dramatically
- User feedback on sync speed
- No regressions in search functionality

---

## 13. Appendix: Research Notes

### 13.1 Firestore onSnapshot Cost Model

- **Initial snapshot:** Charged for each document returned by the query
- **Subsequent updates:** Charged for each document that changes
- **Metadata document strategy:** A listener on a single small document (`metadata/sync`) costs **1 read per change**, regardless of how large the main collection is
- **Source:** Firebase documentation confirms: "You are charged one read for each document returned by the listener. If you listen to a single document, each change costs one read."

### 13.2 BroadcastChannel API

- **Purpose:** Same-origin cross-context messaging (tabs, windows, iframes, workers)
- **Zero cost:** No network requests, no server round-trips
- **Latency:** Sub-millisecond (same-process message passing)
- **Data:** Structured cloneable objects (JSON, arrays, primitives)
- **Browser support:** ~95% global coverage (Chrome, Firefox, Safari 15.4+, Edge)
- **Source:** MDN Web Docs — BroadcastChannel API

### 13.3 Delta Sync with where("id", ">", X)

- **Firestore query cost:** Charged only for documents returned by the query, not for the index scan
- **Efficiency:** If 5 new documents have been added since last check, the query costs 5 reads
- **Requires:** An index on the `id` field (already exists — current `orderBy("id", "asc")` queries depend on it)
- **Source:** Firebase documentation confirms: "You are billed for the number of documents returned by the query."

### 13.4 Collection Consolidation Strategy

- **Current state:** Two collections (`expressions` for search, `EnglishExpressions` for admin) with same schema
- **Target:** Single collection (`EnglishExpressions`) used by both
- **Reasoning:** Eliminates sync pipeline, simplifies architecture, reduces maintenance
- **Risk:** None — Firestore rules are permissive (`read, write: if true`), and there are no existing Security Rules that differentiate between the two collections

---

## Appendix A: File Change Summary

| File | Change Type | Details |
|------|-------------|---------|
| `admin.js` | ✏️ Edit | Add BroadcastChannel, change metadata target, remove forcedownload prompt |
| `app.js` | ✏️ Edit | Switch collection, add metadata onSnapshot, add BroadcastChannel, remove forcedownload, remove version check |
| `functions/index.js` | ❌ Delete | No longer needed |
| `.github/workflows/sync_data.yml` | ❌ Delete | No longer needed |
| `.github/workflows/deploy.yml` | ✏️ Edit | Optionally simplify (no sync dependency) |
| `README.md` | ✏️ Edit | Remove pipeline documentation |
| `plan/framework-upgrade-spec.md` | ✏️ Edit | Reflect new sync architecture |
| `plan/async_data.md` | ➕ New | This file |

## Appendix B: Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Notification mechanism | `metadata/sync` onSnapshot + BroadcastChannel | Dual approach: Firestore for reliability, BroadcastChannel for speed |
| Collection | EnglishExpressions (consolidated) | Eliminates the root cause of sync delays |
| Delta fetch | `where("id", ">", lastKnownId)` | Minimal reads — only fetches new documents |
| Cold start | `initial_data.json` (unchanged) | 0 reads for first load; delta fills gaps |
| Pipeline | Removed entirely | GitHub Actions minutes saved; real-time sync replaces batch sync |
| Edits / deletes | Not automatically synced (Phase 1) | Rare operations; can be added later if needed |
| forcedownload | Hidden / undocumented | Keep as emergency fallback for power users |
