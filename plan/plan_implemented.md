# Implemented Plan Summary

Date: 2026-06-09

This document compares the plans in [`final_upgrade_plan.md`](./final_upgrade_plan.md) and [`implementation_plan_uiux.md`](./implementation_plan_uiux.md) with the current codebase, then lists only the features that are implemented. It also includes major features that were developed outside the original two plan files.

## Source Plans Reviewed

- [`plan/final_upgrade_plan.md`](./final_upgrade_plan.md)
- [`plan/implementation_plan_uiux.md`](./implementation_plan_uiux.md)

## Current Implementation Baseline

The app is implemented as an Astro static site with React islands and TypeScript.

Implemented production surfaces:

- Public Learn/Search app: `src/pages/index.astro`, `src/components/search/SearchApp.tsx`
- Admin intake app: `src/pages/admin.astro`, `src/components/admin/AdminPanel.tsx`
- Shared footer: `src/components/shared/RepoFooter.tsx`
- Public styles: `src/styles/global.css`
- Admin styles: `src/styles/admin.css`
- Firebase setup: `src/lib/firebase.ts`
- Expression sync: `src/lib/sync.ts`
- Search logic: `src/lib/search.ts`
- Learning logic: `src/lib/srs.ts`, `src/lib/progress.ts`, `src/lib/learningStorage.ts`
- Learning cloud sync: `src/lib/learningSync.ts`
- Browser reminders: `src/lib/notifications.ts`

## Implemented From `final_upgrade_plan.md`

### Astro + React + TypeScript Migration

Implemented:

- Astro static project structure is in place.
- React island pages are used for the public app and admin app.
- TypeScript shared types are defined in `src/types/index.ts`.
- Astro pages exist for public, admin, and 404 routes.
- `package.json` includes Astro scripts:
  - `dev`
  - `start`
  - `build`
  - `preview`
  - `test:smoke`

Code references:

- `src/pages/index.astro`
- `src/pages/admin.astro`
- `src/pages/404.astro`
- `src/components/search/SearchApp.tsx`
- `src/components/admin/AdminPanel.tsx`
- `src/types/index.ts`
- `package.json`

### Provider-Neutral Static Build

Implemented:

- Astro builds static output into `dist`.
- GitLab Pages deploys the built `dist` directory.
- `PUBLIC_SITE_URL`, `PUBLIC_BASE_PATH`, and `DEPLOY_PROVIDER` are used as deployment configuration inputs.
- GitLab Pages is the active production path.

Code references:

- `astro.config.mjs`
- `.gitlab-ci.yml`

### GitLab Pages Deployment

Implemented:

- GitLab Pages pipeline uses `node:22-alpine`.
- Pipeline installs dependencies with `npm ci`.
- Pipeline runs unit tests before build.
- Pipeline runs `npm run build`.
- Pipeline publishes `dist`.
- Pipeline adds `dist/.nojekyll`.
- Production branch rule is scoped to the default branch.

Code references:

- `.gitlab-ci.yml`
- `tests/unit/learning.test.mts`

### Firebase Environment Variables

Implemented:

- Firebase config is read from Astro public environment variables.
- Required Firebase variables are validated at runtime in `src/lib/firebase.ts`.
- `PUBLIC_FIREBASE_MEASUREMENT_ID` is optional.
- `PUBLIC_COL_ENG_ADMIN` is typed in `src/env.d.ts`.
- Local `.env`, `.env.local`, and `.env.*.local` are gitignored.

Code references:

- `src/lib/firebase.ts`
- `src/env.d.ts`
- `.gitignore`

### Firebase Client Setup

Implemented:

- Firebase app initialization uses `initializeApp`.
- Firestore uses `initializeFirestore`.
- Persistent local cache is enabled with `persistentLocalCache`.
- Multiple-tab persistence is configured with `persistentMultipleTabManager`.
- Firebase Auth is exported.
- Firebase AI is available for admin generation.
- `expressionsRef` points to the public expression collection.

Code references:

- `src/lib/firebase.ts`

### Type Model Port

Implemented:

- `TextValue` supports strings, numbers, booleans, nullish values, arrays, and objects.
- `RawExpression` supports flexible raw data.
- `Expression` normalizes app-facing expression data.
- `SyncState` no longer includes an app version field.
- `SyncMetadata` supports `metadata/sync.lastId`.
- Learning types are present:
  - `SrsRating`
  - `SrsState`
  - `LearningCard`
  - `ReviewEvent`
  - `LearningProgress`

Code references:

- `src/types/index.ts`

### Firestore Normalization

Implemented:

- Raw Firestore/static records are normalized into app `Expression` records.
- Array/object text values are converted safely.
- Similar expressions are normalized into string arrays.
- Translation fields are preserved when present.

Code references:

- `src/lib/firestore.ts`

### Search Logic Port

Implemented:

- Search is implemented as pure app logic separated from UI.
- Search covers multiple expression fields.
- Wildcard `*` returns the locally loaded dataset.
- Result matching is consumed by the React result grid.

Code references:

- `src/lib/search.ts`
- `src/components/search/SearchApp.tsx`
- `src/components/search/ResultsGrid.tsx`
- `src/components/search/ExpressionCard.tsx`

### Async Data Loading And Delta Sync

Implemented:

- App first attempts Firestore cache.
- App falls back to `initial_data.json`.
- App performs Firestore delta sync after cold start.
- Delta sync fetches records with `id > local max id`.
- Delta sync fetches in 500-document batches.
- Local max ID tracking is implemented.
- Duplicate expression IDs are deduplicated during sync.
- Last sync time is stored in localStorage.
- Resource-exhausted errors set a local cooldown.
- Metadata listener watches `metadata/sync`.
- If remote `lastId` increases, the app schedules delta sync.
- If remote `lastId` decreases, local records after that ID are pruned.
- BroadcastChannel listens for same-browser sync hints.
- `forcedownload` remains as a hidden fallback command that calls delta sync.

Code references:

- `src/lib/sync.ts`
- `src/components/search/SearchApp.tsx`

### Public Search React Components

Implemented:

- `SearchApp.tsx` owns top-level app state, loading/error states, sync, mode switching, and options.
- `SearchInput.tsx` provides controlled search input behavior.
- `ResultsGrid.tsx` renders matching results.
- `ExpressionCard.tsx` renders expression result cards.
- `DailyExpression.tsx` renders the daily expression.

Code references:

- `src/components/search/SearchApp.tsx`
- `src/components/search/SearchInput.tsx`
- `src/components/search/ResultsGrid.tsx`
- `src/components/search/ExpressionCard.tsx`
- `src/components/search/DailyExpression.tsx`

### Admin React Components

Implemented:

- Admin page is ported to React.
- Google sign-in exists for admin.
- Admin authorization is checked against the configured admin email in admin logic.
- Existing primary expressions can be loaded from Firestore.
- Duplicate/fuzzy-similar primary checks are implemented.
- Firebase AI generation is implemented.
- Consistency review pass is implemented.
- JSON sanitize and validation helpers are implemented.
- Save flow writes to Firestore.
- Save flow updates metadata/sync and notifies open search tabs.
- Status log includes timestamped lines and progress feedback.

Code references:

- `src/components/admin/AdminPanel.tsx`
- `src/components/admin/AuthCard.tsx`
- `src/components/admin/ExpressionEditor.tsx`
- `src/components/admin/StatusBox.tsx`
- `src/lib/admin.ts`

### Theme And Styling

Implemented:

- Public and admin pages use CSS variables.
- Dark and light themes are implemented.
- Dark is the safe default for the public app.
- Blob background animation is preserved.
- Google Fonts CDN links were removed.
- System font stacks are used instead of Google Fonts.
- Example usage readability was improved for dark and light themes.

Code references:

- `src/styles/global.css`
- `src/styles/admin.css`
- `src/pages/index.astro`
- `src/pages/admin.astro`

### Cleanup And Documentation

Implemented:

- README was rewritten for the current 2.0.0 architecture.
- Old main-screen theme control was removed from the public app.
- Version metadata was added to `package.json` and `package-lock.json`.

Code references:

- `README.md`
- `package.json`
- `package-lock.json`

## Implemented From `implementation_plan_uiux.md`

### Responsive UI Foundation

Implemented:

- Public app and admin app keep separate style files.
- Shared footer is used by public and admin surfaces.
- Footer remains compact and includes repository link.
- Touch-friendly controls are present for tabs, options, theme buttons, review controls, and result actions.
- Options panel has responsive desktop and mobile layouts.
- Public header was tightened so Learn/Search and Options sit in a compact top bar.

Code references:

- `src/components/shared/RepoFooter.tsx`
- `src/styles/global.css`
- `src/styles/admin.css`

### Learning Data Model

Implemented:

- Local-first SRS model exists.
- `LearningCard` and `ReviewEvent` are defined.
- Review events are append-only.
- Review card state is updated through pure SRS logic.
- Learning state is stored outside expression records.
- Local storage persistence exists.
- Storage usage guard exists.
- Clear learning state helper exists.

Code references:

- `src/types/index.ts`
- `src/lib/srs.ts`
- `src/lib/learningStorage.ts`

### SRS Logic

Implemented:

- Card creation starts cards in `new` state.
- Rating options are implemented:
  - `again`
  - `hard`
  - `good`
  - `easy`
- Ease factor is clamped.
- Interval calculation is implemented.
- Lapse tracking is implemented.
- Relearning behavior is implemented for `again` from review state.
- Daily queue prioritizes due cards.
- Daily queue caps new introductions and reviews.

Code references:

- `src/lib/srs.ts`
- `tests/unit/learning.test.mts`

### Learning Entry Point

Implemented:

- Learn/Search segmented control exists.
- Learn mode is the default mode.
- Search mode remains available.
- Daily review can be started from the landing page.
- Search remains available from Learn mode.
- Expression of the Day is the main first-screen content.
- Search input is placed under the daily expression card in Learn mode.

Code references:

- `src/components/search/SearchApp.tsx`
- `src/components/learning/LearningHome.tsx`
- `src/components/search/DailyExpression.tsx`

### Review Session And Card Interaction

Implemented:

- Review session component exists.
- Study card component exists.
- Click/tap reveal is implemented.
- Four rating buttons are implemented.
- Rating buttons are disabled until reveal.
- Keyboard reveal is implemented with Space/Enter.
- Keyboard rating is implemented with arrow keys.
- Pointer swipe gestures are implemented as progressive enhancement:
  - left = Again
  - down = Hard
  - right = Good
  - up = Easy
- Swipe cue appears while dragging.
- Session progress indicator is implemented.
- Session returns to Learn mode on finish.

Code references:

- `src/components/learning/LearningSession.tsx`
- `src/components/learning/StudyCard.tsx`
- `src/styles/global.css`

### Search-To-Learn Integration

Implemented:

- Search result cards can add an expression to review.
- Duplicate review cards are prevented.
- Existing in-review state is passed to result rendering.
- Search highlighting and translation rendering are preserved in result cards.

Code references:

- `src/components/search/SearchApp.tsx`
- `src/components/search/ResultsGrid.tsx`
- `src/components/search/ExpressionCard.tsx`
- `src/lib/learningStorage.ts`

### Progress And Lightweight Motivation

Implemented:

- Due today count is shown.
- Reviewed today count is shown.
- New available count is shown.
- Cards in review count is shown.
- Total reviews count is shown.
- Current streak count is shown.
- Progress summary is calculated from cards and review events.
- Stats are displayed as compact badge-style UI.

Code references:

- `src/lib/progress.ts`
- `src/components/learning/LearningHome.tsx`
- `src/styles/global.css`
- `tests/unit/learning.test.mts`

### Optional Cloud Sync For Learning State

Implemented:

- Learning cloud sync module exists.
- Cloud sync writes user-scoped learning cards.
- Cloud sync writes user-scoped review events.
- Cloud sync writes sync metadata.
- Cloud sync can be enabled and disabled from Options.
- Cloud sync is disabled unless a Google user is signed in.
- Cloud sync status labels are shown.
- Cloud sync ON/OFF visual states are shown.
- Current learning state is synced after local changes with debounce.

Code references:

- `src/lib/learningSync.ts`
- `src/components/search/SearchApp.tsx`
- `src/styles/global.css`

### Admin Preservation

Implemented:

- Admin components remain separate from the public learning app.
- Admin Google sign-in remains part of the admin page.
- Admin Firestore collection behavior is preserved.
- Admin metadata sync behavior is preserved.
- Admin page uses responsive styles.
- Admin page still includes model and temperature controls.
- Admin status/progress UI remains present.

Code references:

- `src/components/admin/AdminPanel.tsx`
- `src/components/admin/AuthCard.tsx`
- `src/components/admin/ExpressionEditor.tsx`
- `src/components/admin/StatusBox.tsx`
- `src/styles/admin.css`

### Notifications

Implemented:

- Browser Notification API support is present.
- Reminder permission status is detected.
- Reminder opt-in is persisted locally.
- Reminder toggle exists in Options.
- Reminder preview notification is shown after enabling with granted permission.
- Unsupported and denied states are handled in labels.
- Reminder ON/OFF visual states are shown.

Code references:

- `src/lib/notifications.ts`
- `src/components/search/SearchApp.tsx`

### Testing

Implemented:

- Unit tests exist for SRS review behavior.
- Unit tests verify append-only review events.
- Unit tests verify `again` relearning/lapse behavior.
- Unit tests verify daily queue priority and new-card cap.
- Unit tests verify progress summary and streak calculation.
- GitLab CI runs the learning unit tests before build.
- Playwright smoke test script exists.

Code references:

- `tests/unit/learning.test.mts`
- `tests/smoke/app.spec.ts`
- `tests/smoke/responsive.spec.ts`
- `.gitlab-ci.yml`
- `package.json`

## Major Implemented Features Not Explicitly Specified In The Two Plans

### Main-App Google Account Options Panel

Implemented:

- Public app has a full Options panel.
- Options panel contains account, appearance, learning, and data sections.
- Google sign-in is available directly from the public app.
- Google avatar is displayed when available.
- Avatar fallback initial is shown if the image is missing or fails.
- Popup sign-in is attempted first.
- Redirect sign-in fallback is implemented for popup-blocked or popup-closed flows.
- Firebase Auth errors are mapped to user-facing setup messages.
- Escape key and backdrop click close the panel.

Code references:

- `src/components/search/SearchApp.tsx`
- `src/styles/global.css`

### Per-Account Option Persistence

Implemented:

- Options are stored per Firebase user ID after Google sign-in.
- Stored options include:
  - theme
  - cloud sync enabled
  - reminders enabled
- First login creates default options.
- First-login defaults set cloud sync ON.
- First-login defaults set reminders ON.
- Theme is restored from the account-specific option state.

Code references:

- `src/components/search/SearchApp.tsx`

### Admin Link From Public Options Panel

Implemented:

- `PUBLIC_COL_ENG_ADMIN` controls admin recognition in the public app.
- When the signed-in account email matches the configured admin email, an Admin badge is shown.
- When admin is signed in, an Open admin button is shown in Options.
- Non-admin accounts do not see the admin entry point.

Code references:

- `src/components/search/SearchApp.tsx`
- `src/env.d.ts`

### JSON Dataset Export From Options

Implemented:

- Public Options panel can export the currently loaded expression dataset.
- Export uses a dated filename.
- Export includes expression fields needed for external backup/inspection.
- Export button is disabled when no expressions are loaded.

Code references:

- `src/components/search/SearchApp.tsx`

### Learn-First Visual Redesign

Implemented:

- Expression of the Day was promoted as the main first-screen feature.
- Search input was moved below the daily expression card in Learn mode.
- Learning stats were reduced to compact icon/number badges.
- Learn/Search tabs were redesigned as a compact segmented control.
- Header controls were moved left/right into a tight top bar.
- Landing headline and subtitle are centered.

Code references:

- `src/components/search/SearchApp.tsx`
- `src/components/learning/LearningHome.tsx`
- `src/styles/global.css`

### Option Panel Responsive Bottom Sheet

Implemented:

- Desktop Options panel opens as a side panel.
- Mobile Options panel opens as a bottom sheet.
- Small-height screens use a full-height panel fallback.
- Option rows wrap on narrow screens.

Code references:

- `src/styles/global.css`

### App Versioning

Implemented:

- App version is set to `2.0.0` in `package.json`.
- Lockfile root package version is set to `2.0.0`.
- Footer displays `v2.0.0` in a minimal low-footprint style.
- README documents version `2.0.0`.

Code references:

- `package.json`
- `package-lock.json`
- `src/components/shared/RepoFooter.tsx`
- `src/styles/global.css`
- `src/styles/admin.css`
- `README.md`

### GitLab Environment Variable Work

Implemented:

- `PUBLIC_COL_ENG_ADMIN` is used instead of direct `COL_ENG_ADMIN` in app logic.
- Firebase public env vars are documented.
- `.env.local` is ignored by git.
- README documents GitLab CI variables required for production.

Code references:

- `src/components/search/SearchApp.tsx`
- `src/env.d.ts`
- `.gitignore`
- `README.md`

### Google Fonts Removal

Implemented:

- Google Fonts links were removed from Astro page heads.
- CSS now uses local system font stacks.
- Public and admin pages no longer request Google Fonts.

Code references:

- `src/pages/index.astro`
- `src/pages/admin.astro`
- `src/styles/global.css`
- `src/styles/admin.css`

### README 2.0 Rewrite

Implemented:

- README was rewritten around the final app architecture and feature set.
- README documents user experience, options, cloud sync, reminders, admin intake, environment variables, deployment, testing, and troubleshooting.

Code references:

- `README.md`

## Implemented Verification And Deployment State

Verified during the 2.0.0 work:

- `npm run build` completed successfully.
- GitLab API commit was created on `master`.
- GitLab pipeline for the 2.0.0 commit succeeded.

Current deployed commit:

```text
2adf74b53cd01b9704bdafb9f00508186f23470e
```

Pipeline:

```text
https://gitlab.com/heroyik/col_eng/-/pipelines/2586790330
```

## Explicitly Not Counted As Implemented Here

The following items appear in the plans but are not listed as implemented because the current code does not show complete implementation or verification:

- Service-worker-based scheduled Web Push notifications.
- XP economy, badge system, heat maps, streak repair, or streak freeze.
- Separate `RatingControls.tsx`, `useCardSwipe.ts`, `SwipeOverlay.tsx`, or `haptics.ts` modules.
- Full Playwright viewport-matrix visual verification for every listed viewport.
- GitLab Pages production verification after GitLab account restoration.
- Production admin save test verification recorded in code or docs.
- Firestore Rules changes for user-owned learning sync paths, unless separately deployed outside this code snapshot.
