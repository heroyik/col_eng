# Final Consolidated Upgrade Plan

**Project:** Colloquial English (COL_ENG)
**Date:** 2026-06-09
**Source Plans:**
- [`plan/framework-upgrade-spec.md`](./framework-upgrade-spec.md) — Astro + React + TypeScript migration
- [`plan/async_data.md`](./async_data.md) — Real-time async data sync (replaces GitHub Actions pipeline)

## 0. Execution Status

Implemented and deployed:

- Phase 0 async metadata/delta sync validated on the vanilla app.
- Astro + React + TypeScript project structure added.
- Search and admin pages ported to React islands.
- GitLab Pages switched to Astro `dist` deployment.
- GitHub Pages workflow kept as manual standby and switched to the same Astro build.
- Firestore Rules deployed: public reads for `EnglishExpressions`/`metadata`, admin-only writes, deny all other collections.
- Legacy raw static app files and GitHub dispatch sync function removed.
- README updated for the current architecture.
- Smoke tests added via Playwright.
- Theme toggle added with dark as the default.

Remaining operational checks:

- Re-authenticate GitHub CLI after the suspended GitHub account is restored, then run the manual standby deploy.
- Confirm Firebase Auth authorized domains in Firebase Console.
- Perform one signed-in production admin save test and verify search-page delta sync.

---

## 1. Conflict Resolution Summary

The following 7 conflicts between the two plans were identified and resolved:

| # | Area | Framework Spec | Async Data Spec | Resolution |
|---|------|---------------|-----------------|------------|
| 1 | **Cloud Function** | `functions/` → "Keep as-is (not deployed)" | `functions/index.js` → **Remove** | ⚠️ Do not delete blindly. First disable/replace the GitHub dispatch behavior, then remove the deployed function only after async metadata sync is validated. |
| 2 | **Version check** | Port `APP_VERSION` cache invalidation to `sync.ts` | Remove `APP_VERSION` entirely — use `metadata/sync.lastId` | ❌ Use async data approach. No version checking. |
| 3 | **forcedownload** | "Keep behavior" ported to React | Change to hidden `performDeltaSync()` fallback | ❌ Hidden fallback. Same `performDeltaSync()` call. |
| 4 | **Metadata listener** | Listen on `metadata/current_config` (version) | Listen on `metadata/sync` (lastId) | ❌ Use `metadata/sync` with lastId tracking. |
| 5 | **Collection name** | Reads from `expressions` collection | Reads from `EnglishExpressions` collection | ❌ Consolidate to `EnglishExpressions` for both. |
| 6 | **Firestore Rules** | Requires auth for `EnglishExpressions` reads | `allow read, write: if true` (permissive) | ❌ Must allow public read on `EnglishExpressions` since web app reads without auth. |
| 7 | **Deploy workflow** | New Astro-based deploy | Remove old `sync_data.yml` | ✅ Compatible, but GitLab Pages is active. Convert `.gitlab-ci.yml` to Astro `dist` publish first; keep GitHub Actions as standby. |

---

## 2. Full Implementation Order

### Phase 0: Pre-Migration — Apply Async Data Changes (Temporary Validation on Vanilla JS)

**IMPORTANT:** This phase applies async data changes to the current vanilla JS codebase (`app.js`, `admin.js`) **temporarily** to validate the sync mechanism before the framework migration adds complexity. All changes in this phase will be **discarded and replaced** by TypeScript React components in Phase 2. Do not polish the vanilla JS beyond what's needed for validation.

**Step 0.1 → Update `admin.js`**
- [ ] Add BroadcastChannel setup and `postMessage` on save
- [ ] Change metadata write from `SystemMetadata/sync` → `metadata/sync` (fields: `lastId`, `updatedAt`)
- [ ] Remove \"Type 'forcedownload' to sync\" message
- [ ] Keep dual-write to `SystemMetadata/sync` temporarily (rollback safety)
- [ ] **Keep all existing AI/Vertex AI logic unchanged**

**Step 0.2 → Update `app.js`**
- [ ] Switch collection ref from `expressions` → `EnglishExpressions`
- [ ] Add `getLocalMaxId()` helper function
- [ ] Add `performDeltaSync()` with full error handling (429 cooldown, offline detection)
- [ ] Replace `setupVersionListener()` with `setupMetadataListener()` (tracks `lastId` on `metadata/sync`)
- [ ] Add `setupBroadcastChannel()` for instant cross-tab notification
- [ ] Attach listeners in `fetchAllExpressions().finally(() => { ... })` (race condition guard)
- [ ] Simplify `forcedownload` to call `performDeltaSync()` only (hidden fallback)
- [ ] Remove `APP_VERSION` version-check cache-busting block
- [ ] Remove `window.hardReset` / `window.hardResetManual`
- [ ] Remove `CACHE_DATE_KEY`, `VERSION_KEY`, `LOCAL_ID_KEY` localStorage keys
- [ ] Keep `COOLDOWN_KEY` localStorage key
- [ ] Add `LAST_SYNC_KEY = "col_eng_last_sync"` for stats display
- [ ] Update `renderEmptyState()` to show last sync time ("1,483 expressions (synced 2m ago)")

**Step 0.2.5 → Rebuild `initial_data.json` from `EnglishExpressions`**
- [ ] Run `node download_data.mjs` to pull all records from `EnglishExpressions` collection
- [ ] Confirm the exported data includes all existing expressions (IDs 1–1483+)
- [ ] Replace `initial_data.json` with the freshly exported data
- _Why: The web app will now read from `EnglishExpressions` instead of `expressions`. The static bundle must match this collection to avoid delta sync fetching all records on first load._

**Step 0.3 → Disable Old Rebuild Pipeline Safely**
- [ ] Do not delete the deployed Firebase Function until async metadata sync is validated in production.
- [ ] Stop depending on GitHub `repository_dispatch` for production because GitLab Pages is the active deploy target.
- [ ] If `.github/workflows/sync_data.yml` exists, disable or delete it after confirming no active GitHub rebuild path depends on it.
- [ ] Keep `.gitlab-ci.yml` as the active raw-file Pages deployment during Phase 0.
- [ ] Keep `.github/workflows/deploy.yml` as standby only; do not make GitHub the active deployment path while GitLab Pages is production.
- [ ] After validation, either remove `functions/index.js` from source and deploy Firebase Functions removal, or replace it with a provider-agnostic trigger for GitLab/GitHub.

**Step 0.4 → Test**
- [ ] Save test expression via admin → verify `metadata/sync` appears in Firestore console
- [ ] Open web app in another tab → verify auto-sync within seconds
- [ ] Verify search, forcedownload, daily expression still work
- [ ] Verify 429 cooldown path (can simulate by setting localStorage quota)

---

### Phase 1: Astro Project Setup (Framework Spec §12.1)

**Step 1.1 → Initialize Astro**
- [ ] `npm create astro@latest` with TypeScript + React
- [ ] Install `@astrojs/react`
- [ ] Configure `astro.config.mjs`:
  - `site: process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321'`
  - `base: process.env.PUBLIC_BASE_PATH ?? ''`
  - `output: 'static'`
  - React integration
  - Vite chunk splitting for Firebase

**Step 1.2 → Create Project Structure**
```
col_eng/
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── initial_data.json     # Keep (cold-start, 0 reads)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── search/
│   │   │   ├── SearchApp.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── ResultsGrid.tsx
│   │   │   ├── ExpressionCard.tsx
│   │   │   └── DailyExpression.tsx
│   │   ├── admin/
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── AuthCard.tsx
│   │   │   ├── ExpressionEditor.tsx
│   │   │   └── StatusBox.tsx
│   │   └── shared/
│   │       ├── ThemeToggle.tsx
│   │       ├── Footer.tsx
│   │       └── LoadingSpinner.tsx
│   ├── lib/
│   │   ├── firebase.ts        # Firebase init (Astro env vars)
│   │   ├── firestore.ts        # Firestore operations
│   │   ├── auth.ts             # Auth functions
│   │   ├── search.ts           # Search logic
│   │   └── sync.ts             # ⚠️ See §3 below
│   ├── types/
│   │   └── index.ts            # Expression, SyncState types
│   ├── pages/
│   │   ├── index.astro         # Search page
│   │   ├── admin.astro         # Admin page
│   │   └── 404.astro           # GitHub Pages fallback
│   └── styles/
│       └── global.css          # CSS variables, themes
├── db/                         # Keep (not deployed)
├── sources/                    # Keep (not deployed)
├── firestore.rules             # ⚠️ See §6 below
├── firestore.indexes.json
└── .firebaserc
```

**Step 1.3 → Environment Variables**
- [ ] Create `.env` for local dev with `PUBLIC_FIREBASE_*` vars
- [ ] Keep GitLab CI/CD variables as the active production source:
  - `PUBLIC_SITE_URL=https://heroyik.gitlab.io`
  - `PUBLIC_BASE_PATH=/col_eng`
  - `DEPLOY_PROVIDER=gitlab`
  - `PUBLIC_FIREBASE_*`
- [ ] Update GitHub Actions secrets only for standby/recovery mode.
- [ ] **Delete** `env_config.js` (replaced by Astro env vars)

---

### Phase 2: Port Async Data Logic to TypeScript (Framework Spec §12.2 + §12.3)

This is the critical merge. The vanilla JS changes from Phase 0 are ported to TypeScript React components. **Do not re-implement the old version-based sync.**

**Step 2.1 → `src/lib/sync.ts` (NEW — replaces app.js sync logic)**

Port the **new** async data approach (not the old version-based approach):

```typescript
// Features:
// - getLocalMaxId() - max id from loaded expressions
// - performDeltaSync() - fetch docs with id > lastKnownId
// - setupMetadataListener() - onSnapshot on metadata/sync (lastId tracking)
// - setupBroadcastChannel() - cross-tab instant notification
// - Cold start via initial_data.json (0 reads)
// - 429 cooldown handling
// - Debounce for rapid saves
// - Last sync time tracking (localStorage)

// Do NOT include:
// - APP_VERSION checks
// - Version-based cache invalidation
// - forcedownload (kept as hidden fallback in SearchInput)
// - window.hardReset
// - CACHE_DATE_KEY, VERSION_KEY, LOCAL_ID_KEY
```

**Step 2.2 → `src/types/index.ts`**

```typescript
export type TextValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | TextValue[]
  | { [key: string]: TextValue };

export interface RawExpression {
  id: number;
  primary: TextValue;
  meaning: TextValue;
  similar: TextValue;
  example: TextValue;
  japanese?: TextValue;
  chinese?: TextValue;
  spanish?: TextValue;
  vietnamese?: TextValue;
}

export interface Expression {
  id: number;
  primary: string;
  meaning: string;
  similar: string[];
  example: string;
  japanese?: string;
  chinese?: string;
  spanish?: string;
  vietnamese?: string;
}

// NOTE: SyncState no longer needs appVersion field
// (removed — replaced by metadata/sync.lastId tracking)
export interface SyncState {
  lastId: number;
  lastSyncDate: string;
}
```

**Step 2.3 → `src/lib/firestore.ts`**
- [ ] Port `normalizeExpression()` — with the latest `valueToText()` improvements from current `app.js`
- [ ] Port `getSearchableText()` — for multi-field search
- [ ] Accept `RawExpression` input and return normalized `Expression`
- [ ] Preserve support for array/object text values. Current data includes array `example` and array `japanese` values.
- [ ] Reference `EnglishExpressions` collection (not `expressions`)

**Step 2.4 → `src/lib/search.ts`**
- [ ] Port `searchExpressions()` — pure function, no UI
- [ ] Port `highlightKeywords()` — with `valueToText()` safety

**Step 2.5 → `src/lib/firebase.ts`**
- [ ] Initialize Firebase with Astro `import.meta.env.PUBLIC_FIREBASE_*`
- [ ] Initialize `persistentLocalCache({ tabManager: persistentMultipleTabManager() })`
- [ ] Export `db`, `auth`, `expressionsRef` (pointing to `EnglishExpressions`)

**Step 2.6 → React Components: Search**

| Component | Port From | Sync-Related Changes |
|-----------|-----------|---------------------|
| `SearchApp.tsx` | `app.js` top-level | Calls `setupMetadataListener()` + `setupBroadcastChannel()` after cold start |
| `SearchInput.tsx` | Search input + forcedownload | Keep hidden `forcedownload` → calls `performDeltaSync()` |
| `ResultsGrid.tsx` | Results rendering | Loading, empty, error states |
| `ExpressionCard.tsx` | `createExpressionCardHTML()` | React JSX instead of string HTML |
| `DailyExpression.tsx` | Daily expression logic | Random pick from loaded array |

**Step 2.7 → React Components: Admin**

| Component | Port From | Sync-Related Changes |
|-----------|-----------|---------------------|
| `AdminPanel.tsx` | `admin.js` top-level | Add BroadcastChannel + metadata write on save |
| `AuthCard.tsx` | Auth UI | Unchanged |
| `ExpressionEditor.tsx` | Editor + generate + validate | Unchanged (AI logic same) |
| `StatusBox.tsx` | Status log UI | Timestamped lines, progress bar |

---

### Phase 3: Theme & Styling (Framework Spec §10)

**Step 3.1 → Global CSS**
- [ ] Port `index.css` glassmorphism styles to `src/styles/global.css`
- [ ] Convert to CSS variables for dark + light theme support
- [ ] Replace Google Fonts CDN with system font stack
- [ ] Keep blob background animation

**Step 3.2 → Theme Toggle**
- [ ] Implement `ThemeToggle.tsx` React component
- [ ] System preference detection (`prefers-color-scheme`)
- [ ] `localStorage` persistence
- [ ] **Reconcile with existing theme**: Current app has only dark mode. The toggle should default to dark (to not surprise existing users).

---

### Phase 4: Firestore Security Rules (CRITICAL — Cross-Plan Conflict #6)

The framework spec proposed strict rules requiring auth for `EnglishExpressions` reads. But the async data spec requires public read access since the web app no longer uses anonymous auth.

**Recommended Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Web app reads expressions without auth
    match /EnglishExpressions/{doc} {
      allow read: if true;
      // Writes are enforced by Firestore Rules, not by client UI state.
      // Prefer UID or custom claims in production if the admin identity changes.
      allow write: if request.auth != null
        && request.auth.token.email == 'heroyik@gmail.com';
    }

    // Metadata document: readable by anyone, writable by admin
    match /metadata/{doc} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == 'heroyik@gmail.com';
    }

    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Changes from current rules:**
- ❌ Remove `match /{document=**} { allow read, write: if true; }` (too permissive)
- ✅ Restrict `EnglishExpressions` writes by Firebase Auth identity
- ✅ Allow public reads on `EnglishExpressions` (web app needs this)
- ✅ Add explicit rule for `metadata/{doc}` (admin writes, public reads)
- ✅ Deny all other collections

**Security note:** Client-side checks are only UX. The write boundary must be Firestore Rules or callable Cloud Functions. Email checks are acceptable for this migration, but UID or custom claims are safer long-term.

---

### Phase 5: Build & Deploy (GitLab Active, GitHub Standby)

**Step 5.1 → Astro Configuration**
- [ ] `astro.config.mjs` must be provider-neutral:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const site = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';
const base = process.env.PUBLIC_BASE_PATH ?? '';

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [react()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          },
        },
      },
    },
  },
});
```

- [ ] `package.json` with Astro scripts (`dev`, `build`, `preview`)

**Step 5.2 → GitLab Pages Workflow (Active Production)**

Replace the current raw-file `.gitlab-ci.yml` with an Astro `dist` publish workflow:

```yaml
image: node:22

stages:
  - test
  - deploy

cache:
  key:
    files:
      - package-lock.json
  paths:
    - .npm/

before_script:
  - npm ci --cache .npm --prefer-offline

test:
  stage: test
  script:
    - npm run build
  rules:
    - if: '$CI_COMMIT_BRANCH'

pages:
  stage: deploy
  script:
    - npm run build
  pages:
    publish: dist
  artifacts:
    paths:
      - dist
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
  environment:
    name: production/gitlab-pages
    url: $PUBLIC_SITE_URL$PUBLIC_BASE_PATH/
```

Required GitLab CI/CD variables:

- `PUBLIC_SITE_URL=https://heroyik.gitlab.io`
- `PUBLIC_BASE_PATH=/col_eng`
- `DEPLOY_PROVIDER=gitlab`
- `PUBLIC_FIREBASE_API_KEY`
- `PUBLIC_FIREBASE_AUTH_DOMAIN`
- `PUBLIC_FIREBASE_PROJECT_ID`
- `PUBLIC_FIREBASE_STORAGE_BUCKET`
- `PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `PUBLIC_FIREBASE_APP_ID`
- `PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

**Step 5.3 → GitHub Actions Workflow (Standby/Recovery)**

Keep `.github/workflows/deploy.yml` as a standby workflow for when GitHub is available again. It should use the same provider-neutral Astro config, but set GitHub-specific environment values:

```yaml
env:
  DEPLOY_PROVIDER: github
  PUBLIC_SITE_URL: https://heroyik.gitlab.io
  PUBLIC_BASE_PATH: /col_eng
```

GitHub secrets required for standby:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

**Notes:**
- ❌ `sync_data.yml` removed or disabled only after async metadata sync is validated.
- ✅ GitLab Pages is the active production deploy.
- ✅ GitHub Pages remains a standby deploy path.
- ✅ Astro build replaces the old raw-file deployment on both providers.
- ✅ `PUBLIC_FIREBASE_*` env vars are injected at build time.

---

### Phase 6: Cleanup

**Step 6.1 → Delete Old Files**
- [ ] `index.html` → replaced by `src/pages/index.astro`
- [ ] `admin.html` → replaced by `src/pages/admin.astro`
- [ ] `env_config.js` → replaced by Astro env vars
- [ ] `app.js` → ported to React components + lib modules
- [ ] `admin.js` → ported to React components + lib modules
- [ ] `index.css` → ported to `src/styles/global.css`
- [ ] `admin.css` → ported to scoped CSS in admin components
- [ ] `SECURITY.md` → already deleted
- [ ] `firebase.json` → keep (needed for Firestore rules/indexes, not for hosting)

**Step 6.2 → Documentation**
- [ ] Update `README.md` — remove pipeline docs, add new architecture docs
- [ ] Remove old `plan/framework-upgrade-spec.md` or update with status
- [ ] `plan/async_data.md` → keep as async data reference
- [ ] `plan/final_upgrade_plan.md` → this file (master plan)

---

## 3. `src/lib/sync.ts` — Detailed Contract

This is the most critical file — it bridges the framework migration and the async data sync.

```typescript
// src/lib/sync.ts

// CONSTANTS
const COOLDOWN_KEY = "col_eng_quota_cooldown";
const LAST_SYNC_KEY = "col_eng_last_sync";

// STATE
let expressions: Expression[] = [];
let dailyExpression: Expression | null = null;
let deltaSyncTimer: ReturnType<typeof setTimeout> | null = null;

// HELPERS
export function getLocalMaxId(): number { /* ... */ }
export function normalizeExpression(item: any): Expression { /* ... */ }

// COLD START
export async function fetchAllExpressions(): Promise<void> {
  // 1. Try IndexedDB cache first
  // 2. Fallback to initial_data.json (0 reads)
  // 3. DO NOT check APP_VERSION (removed)
  // 4. DO NOT check CACHE_DATE_KEY (removed)
  // 5. Attach listeners in .finally()
}

// DELTA SYNC
export async function performDeltaSync(): Promise<void> {
  // 1. Cooldown check (COOLDOWN_KEY)
  // 2. getLocalMaxId() → q = where("id", ">", lastId)
  // 3. Paginated fetch (BATCH_SIZE = 500)
  // 4. Dedup via existingIds Set
  // 5. Append to expressions[]
  // 6. Update dailyExpression
  // 7. Write LAST_SYNC_KEY to localStorage
  // 8. Error handling: 429 → cooldown, offline → retry later
}

// METADATA LISTENER (attached after cold start)
export function setupMetadataListener(): () => void {
  // onSnapshot on metadata/sync
  // if data.lastId > getLocalMaxId() → performDeltaSync()
  // Returns unsubscribe function
}

// BROADCAST CHANNEL (instant cross-tab)
export function setupBroadcastChannel(): () => void {
  // new BroadcastChannel('col_eng_sync')
  // onmessage → performDeltaSync() (with debounce)
  // Returns cleanup function
}

// UI CALLBACKS (set by React components)
export function setRefreshViewCallback(fn: () => void): void { /* ... */ }
```

---

## 4. Testing Strategy (Cross-Plan Gap)

Neither spec fully covers testing. This consolidated plan adds:

### 4.1 Phase 0 Testing (Vanilla JS)
- Manual: Open admin tab + search tab → verify auto-sync
- Manual: Close all tabs → open search → verify delta sync on cold start
- Edge: Rapid save 3 expressions → verify debounce works (only 1 delta query)

### 4.2 Phase 2 Testing (React Port)
- Unit: `getLocalMaxId()` with known array
- Unit: `performDeltaSync()` mock with fixture data
- Unit: `searchExpressions()` with known expressions
- Component: `SearchInput.tsx` with hidden forcedownload
- Component: `ExpressionCard.tsx` renders known Expression

### 4.3 Integration Testing
- Firebase emulator: Test metadata listener + delta sync locally
- Cross-tab: Open 2 browser tabs → verify BroadcastChannel notification
- Offline: Disconnect network → verify 429 cooldown behavior

---

## 5. Timeline (Merged)

| Phase | Days | Description |
|-------|------|-------------|
| **Phase 0** | 1–2 | Apply async data changes to vanilla JS (admin.js + app.js) |
| **Phase 1** | 1 | Initialize Astro project, create structure |
| **Phase 2** | 3–4 | Port async data logic + search components to TypeScript React |
| **Phase 3** | 1 | Port admin components + AI generation to TypeScript React |
| **Phase 4** | 0.5 | Theme + styling migration |
| **Phase 5** | 0.5 | Firestore rules update |
| **Phase 6** | 1 | Build, deploy, cleanup |
| **Testing** | 1 | Integration testing + bug fixes |
| **Total** | **8–10 days** | |

---

## 6. Files to Delete (Final State)

| File | Reason | Phase |
|------|--------|-------|
| `index.html` | Replaced by `src/pages/index.astro` | Phase 6 |
| `admin.html` | Replaced by `src/pages/admin.astro` | Phase 6 |
| `env_config.js` | Replaced by Astro `import.meta.env.PUBLIC_*` | Phase 1 |
| `app.js` | Ported to `src/lib/sync.ts` + React components | Phase 2 |
| `admin.js` | Ported to React admin components | Phase 3 |
| `index.css` | Ported to `src/styles/global.css` | Phase 4 |
| `admin.css` | Ported to scoped CSS in admin components | Phase 4 |
| `functions/index.js` | Remove only after deployed GitHub dispatch function is disabled/replaced and async metadata sync is validated | Phase 0/6 |
| `.github/workflows/sync_data.yml` | Remove or disable after confirming no active rebuild path depends on it | Phase 0 |
| `SECURITY.md` | Already deleted | — |
| `public/index.html` | Firebase Hosting entry point — no longer needed after Astro migration | Phase 6 |
| `plan/framework-upgrade-spec.md` | Keep as reference unless the team explicitly retires older plan docs | optional |

---

## 7. Files to Keep (Unchanged)

| File | Reason |
|------|--------|
| `firestore.rules` | Updated in Phase 4, not deleted |
| `firestore.indexes.json` | No changes needed |
| `.firebaserc` | Firebase project config |
| `firebase.json` | Firestore rules/indexes only (hosting config unused after migration) |
| `initial_data.json` | Cold-start static bundle |
| `db/` | Dev scripts (not deployed) |
| `sources/` | Raw source data (not deployed) |
| `download_data.mjs` | Keep as manual backup/export tool (fix content as separate cleanup task) |
| `.gitlab-ci.yml` | Active GitLab Pages deploy; convert to Astro `dist` publish |
| `.github/workflows/deploy.yml` | Updated for Astro build (keep) |

---

## 8. Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Phase 0 breaks search during deployment | Users see no expressions | No staging environment for vanilla app — deploy during low-traffic period; rollback = revert to previous deploy |
| BroadcastChannel cross-tab test fails locally | Dev cannot verify | Use `--host` flag to test on same origin |
| Astro migration conflicts with existing GitHub Pages config | Deploy fails | Test Astro build locally before merging to master |
| Firestore rules change blocks admin writes | Cannot add expressions | Deploy rules AFTER verifying admin auth still works |
| `initial_data.json` collection mismatch | Delta sync fetches all records | Do a one-time rebuild of `initial_data.json` from `EnglishExpressions` before deploying Phase 0 |
