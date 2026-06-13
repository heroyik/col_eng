# Colloquial English

Version 2.0.10

Colloquial English is an Astro, React, TypeScript, and Firebase web app for learning authentic English expressions used in New York City. The app is built around a daily expression, fast phrase search, spaced review, Google account options, optional cloud sync, and an admin intake workflow for adding new expressions to Firestore.

Production URL:

```text
https://heroyik.gitlab.io/col_eng/
```

Admin URL:

```text
https://heroyik.gitlab.io/col_eng/admin/
```

## Repository Documents

- [Implemented plan summary](plan/plan_implemented.md)
- [Changelog](CHANGELOG.md)
- [Contributing guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [License](LICENSE)

## What This App Does

The main experience starts in Learn mode. The first screen focuses on Expression of the Day, then gives users a compact search box and lightweight learning stats. The compact header exposes Learn, Search, and Review entry points. Search mode uses the same app shell but focuses on finding expressions from the full local and synced dataset.

The app supports:

- Expression of the Day as the primary first-screen content.
- Learn, Search, and Review tabs with a shared compact header.
- Search across English expressions, Korean meaning, similar expressions, example dialogue, and multilingual translations.
- `*` search to show all locally available expressions.
- Hidden `forcedownload` search command to force a Firestore delta sync.
- Expression of the Day navigation with previous/next badges, ordered history replay, and no repeats for already shown expressions.
- Expression of the Day review badge for adding the current daily expression directly to Review.
- Admin-only Expression of the Day delete badge that removes the expression from Firestore and local app state.
- Add-to-review flow from search results.
- Spaced review session with local review cards and review events.
- Randomized review introductions so new sessions do not always start from the lowest expression ID.
- Review cards show multilingual translations after reveal when Daily translations is ON.
- Review rating controls use compact visual badges for Again, Hard, Good, and Easy.
- Learning summary badges for due items, reviewed today, new available, cards in review, total reviews, and streak.
- Google sign-in from the Options panel.
- Per-account options stored separately after Google sign-in.
- Dark and light modes moved out of the main screen into Options.
- Optional cloud sync for review cards and learning history.
- Optional browser notification reminders.
- Daily Expression of the Day translation display toggle, default ON.
- JSON export of the currently loaded expression dataset.
- Admin-only intake page for checking duplicates, generating structured expression JSON with Firebase AI, validating data, and writing to Firestore.

## User Experience

### Learn Mode

Learn mode is the default app mode. It is designed to keep the daily expression visually dominant and reduce dashboard noise.

Learn mode includes:

- A compact top bar with Learn, Search, Review, and Options.
- Centered landing copy: `Colloquial English` and `Search and discover authentic English expressions used in NYC.`
- Expression of the Day card.
- Badge controls for adding the current expression to Review and moving through previous/next daily expressions.
- Admin-only delete badge for removing the current daily expression from Firestore, local expression state, review cards, and review events.
- Six small stats badges:
  - due today
  - reviewed today
  - new available
  - in review
  - total reviews
  - day streak

Review starts from the header Review tab.

### Search Mode

Search mode is for direct lookup. It reuses the same app shell as Learn mode and shows result cards after a query is entered.

Search behavior:

- Typing a non-empty query switches the app into Search mode.
- Search runs with a short debounce.
- Pressing Enter or using immediate search triggers the same lookup.
- Search results can be added to the review system.
- If no query is active, Search mode shows the current Expression of the Day and dataset sync status.
- If no match exists, the UI shows a concise empty state.

### Expression Cards

Expression cards present the primary phrase, Korean meaning, similar expressions, example usage, and translations. The UI uses app-local CSS and system fonts only. Google Fonts are intentionally not loaded.

Translation fields supported by the data model:

- Japanese
- Chinese
- Spanish
- Vietnamese

### Review Sessions

The review system stores learning state in the browser by default.

Local learning data includes:

- Review cards.
- Review events.
- Daily progress.
- Streak data.
- Lifetime review counts.

The review queue is generated from local learning cards plus the expression dataset. Current limits are:

- Up to 5 new expressions per daily queue.
- Up to 20 review expressions per daily queue.

New review introductions are randomized before the daily limit is applied.

Review card behavior:

- The front card uses the colloquial reveal label `Hit it`.
- Revealed cards show Korean meaning, similar expressions, example dialogue, and rating controls.
- If Daily translations is ON, revealed cards also show Vietnamese, Japanese, Chinese, and Spanish translations when available.
- Rating controls use small badges: Again, Hard, Good, and Easy.

## Options Panel

The Options panel replaces scattered main-screen controls. It is opened from the top-right Options button and is responsive:

- Desktop: right-side panel.
- Mobile: bottom sheet.
- Small-height screens: full-height sheet.
- Escape key closes the panel.
- Clicking outside closes the panel.

Options are grouped into account, appearance, learning, and data sections.

### Google Account

Users can sign in with Google from the Options panel.

The account section shows:

- Google avatar when available.
- Fallback initial when the avatar cannot load.
- Display name or email.
- Sign in with Google button when signed out.
- Sign out button when signed in.
- Admin badge when the signed-in email matches `PUBLIC_COL_ENG_ADMIN`.
- Open admin button only for the admin account.

Google sign-in uses Firebase Auth:

- Popup sign-in is attempted first.
- Redirect sign-in is used as a fallback for blocked, closed, or cancelled popups.
- Auth errors are mapped to user-facing setup messages for common Firebase configuration problems.

### Per-Account Options

After Google sign-in, account-specific options are stored under localStorage keys scoped by Firebase user ID.

Saved per account:

- Theme.
- Cloud sync preference.
- Reminder preference.
- Daily Expression of the Day translation display preference.

First login behavior:

- If no saved account options exist, defaults are created.
- Cloud sync defaults to ON.
- Reminders default to ON.
- Daily translations default to ON.
- Theme defaults to the current or previously saved theme.

Signed-out behavior:

- Theme falls back to local device preference stored in localStorage.
- Cloud sync is disabled after sign-out.
- Account-scoped settings are not applied until a Google user signs in again.

### Theme

Theme options:

- Dark.
- Light.

Theme is no longer displayed as a main-screen control. It lives in Options and is applied through `document.documentElement.dataset.theme`.

### Cloud Sync

Cloud sync backs up review cards and recent review events to Firestore under the signed-in user's document tree.

Cloud sync behavior:

- Requires Google sign-in.
- The toggle is disabled while signed out.
- The Options panel explains that Google sign-in is required.
- Turning it ON writes current learning cards and review history to Firestore once.
- Subsequent changes are synced with a short debounce only when the local learning fingerprint changes.
- Repeated mobile pull-down page refreshes skip cloud writes when learning data has not changed.
- Changed learning cards and recent review events are written dirty-only instead of re-uploading the full local state.
- Cloud sync enters a local cooldown after Firestore `resource-exhausted` and will not start more writes until the cooldown expires.
- Turning it OFF removes local opt-in state and stops future sync writes.
- The visual toggle has separate ON and OFF icons.

Cloud sync writes:

```text
users/{uid}/learningCards/{expressionId}
users/{uid}/reviewEvents/{eventId}
users/{uid}/metadata/learningSync
```

Current sync limits:

- Up to 450 learning card writes per batch.
- Up to 200 recent review events per sync.
- Automatic sync writes only changed cards/events after the first cloud sync.
- Repeated unchanged refreshes produce 0 cloud-sync writes.

### Reminders

Reminders use the browser Notification API.

Reminder behavior:

- The toggle is available from Options.
- If browser permission is already granted, enabling reminders stores the opt-in and shows a preview notification.
- If permission has not been requested, enabling reminders requests browser permission.
- If permission is denied, the UI reports that reminders are blocked.
- If the browser does not support notifications, the UI reports that reminders are unavailable.
- The visual toggle has separate ON and OFF icons.

Current reminder implementation is an opt-in and preview notification layer. It does not install a service-worker-based scheduled notification system.

### Daily Translations

The Daily translations option controls translation display on Expression of the Day and revealed Review cards.

Daily translation behavior:

- Default is ON.
- When ON, Expression of the Day shows Japanese, Chinese, Vietnamese, and Spanish translations when available.
- When ON, revealed Review cards show Vietnamese, Japanese, Chinese, and Spanish translations when available.
- When OFF, Expression of the Day and revealed Review cards hide their translation blocks.
- Search result cards continue to show translations independently.

### Data Export

The Options panel includes a data export action labeled:

```text
Grab the whole phrase stash
```

It downloads the currently loaded expression dataset as JSON. Exported fields:

- primary
- meaning
- similar
- example
- japanese
- chinese
- vietnamese
- spanish

Filename format:

```text
YYYYMMDD_COL_ENG_{count}.json
```

## Data Loading And Sync

The public app is a static Astro build that uses Firebase client SDKs at runtime.

Initial load order:

1. Try Firestore local cache.
2. Fall back to `initial_data.json`.
3. Mark the app ready as soon as cache or static data is available.
4. Perform Firestore delta sync in the background unless the dataset was synced in the last 15 minutes.
5. Subscribe to `metadata/sync`.
6. Listen for same-browser-tab sync hints through BroadcastChannel.

The initial screen does not block on Firestore server reads. This is intentional:
Safari, iOS WebKit, and embedded browsers can delay or stall IndexedDB-backed
Firestore persistence or server reads. The app therefore treats Firestore delta
sync as a best-effort background update and keeps the static bundle usable.

Static bootstrap:

```text
static/initial_data.json
```

Firestore collection:

```text
EnglishExpressions
```

Sync metadata document:

```text
metadata/sync
```

Delta sync fetches only expressions with an `id` greater than the largest locally loaded numeric ID. Batches are limited to 500 documents.

If Firestore returns `resource-exhausted`, the app stores a two-hour local cooldown and avoids repeated reads during that window.

Current timeout behavior:

- Initial background Firestore delta sync times out after 5 seconds.
- Manual `forcedownload` delta sync times out after 12 seconds.
- If manual sync times out, the app returns to the ready state and continues using the local phrase bundle.
- Timed-out background sync attempts are logged as warnings but do not show an error screen.

Browser storage behavior:

- App preferences and learning state use a safe localStorage wrapper.
- The wrapper probes storage availability before reads and writes.
- Storage failures are ignored for non-critical preference writes.
- Safari private browsing, WebKit storage limits, and embedded browser storage restrictions should not prevent the app from rendering.

## Admin Intake

The admin page is a separate Astro route:

```text
/admin/
```

Only the configured admin email can generate and save expression data.

Admin authorization sources:

- Main app admin button: `PUBLIC_COL_ENG_ADMIN`.
- Admin page write flow: `ADMIN_EMAIL` constant in `src/lib/admin.ts`.
- Firestore Rules should enforce admin-only writes independently.

Admin workflow:

1. Sign in with Google.
2. Enter a primary English expression.
3. Load existing primary expressions from Firestore.
4. Check exact and fuzzy-similar duplicates.
5. Generate structured JSON with Firebase AI.
6. Run a consistency review pass.
7. Sanitize common formatting problems.
8. Validate the payload.
9. Save the expression to Firestore.
10. Update sync metadata and notify open search tabs.

Main-app admin deletion:

- When signed in as `PUBLIC_COL_ENG_ADMIN`, Expression of the Day shows a delete badge.
- Delete removes the expression document from `EnglishExpressions`.
- The app immediately removes the expression from local state, daily-expression history, review cards, review events, and active review queue.
- Open tabs receive an `expression-deleted` BroadcastChannel event and remove the same expression locally.

Generated payload requirements:

- `primary` must match the input exactly.
- `meaning` must be Korean only and include Hangul.
- `similar` must contain exactly 5 strings.
- `example` must contain exactly 6 dialogue lines starting with `A:` or `B:`.
- `japanese` must contain exactly 2 expressions separated by ` / `.
- `chinese` must contain exactly 2 expressions separated by ` / ` and include pinyin.
- `spanish` must contain exactly 2 expressions separated by ` / `.
- `vietnamese` must contain exactly 2 expressions separated by ` / `.

Default admin model:

```text
gemini-3.5-flash
```

## Tech Stack

- Astro 5
- React 19
- TypeScript 5
- Firebase JS SDK 12
- Firebase Auth
- Firestore
- Firebase AI / Vertex AI backend
- Playwright smoke tests
- GitLab Pages deployment

The app uses CSS modules by convention through global CSS files:

```text
src/styles/global.css
src/styles/admin.css
```

No Google Fonts are loaded. Font rendering uses system font stacks defined in CSS variables.

## Project Structure

```text
src/pages/index.astro                Public app shell
src/pages/admin.astro                Admin app shell
src/pages/404.astro                  Not-found page

src/components/search/SearchApp.tsx  Main public React app
src/components/search/DailyExpression.tsx
src/components/search/ExpressionCard.tsx
src/components/search/ResultsGrid.tsx
src/components/search/SearchInput.tsx

src/components/learning/LearningHome.tsx
src/components/learning/LearningSession.tsx
src/components/learning/StudyCard.tsx

src/components/admin/AdminPanel.tsx
src/components/admin/AuthCard.tsx
src/components/admin/ExpressionEditor.tsx
src/components/admin/StatusBox.tsx

src/lib/firebase.ts                  Firebase app, Auth, Firestore, Firebase AI
src/lib/sync.ts                      Static bootstrap and Firestore delta sync
src/lib/search.ts                    Search matching and highlighting
src/lib/srs.ts                       Review queue/card creation
src/lib/progress.ts                  Learning summary calculation
src/lib/learningStorage.ts           Local learning persistence
src/lib/learningSync.ts              Optional cloud sync
src/lib/notifications.ts             Browser notification opt-in
src/lib/storage.ts                   Safe localStorage access for Safari/WebKit
src/lib/admin.ts                     Admin generation, validation, save helpers

src/types/index.ts                   Shared app data types
static/initial_data.json             Static expression bootstrap dataset
tests/unit/learning.test.mts         Unit tests for learning logic
tests/smoke/*.spec.ts                Playwright smoke/responsive tests
```

## Environment Variables

Create `.env.local` for local development. This file is ignored by git.

Required Firebase public variables:

```text
PUBLIC_FIREBASE_API_KEY=
PUBLIC_FIREBASE_AUTH_DOMAIN=
PUBLIC_FIREBASE_PROJECT_ID=
PUBLIC_FIREBASE_STORAGE_BUCKET=
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
PUBLIC_FIREBASE_APP_ID=
```

Optional Firebase public variable:

```text
PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Admin UI variable:

```text
PUBLIC_COL_ENG_ADMIN=
```

Deployment path variables:

```text
PUBLIC_SITE_URL=
PUBLIC_BASE_PATH=
DEPLOY_PROVIDER=
```

Example local values:

```text
PUBLIC_FIREBASE_API_KEY=your-api-key
PUBLIC_FIREBASE_AUTH_DOMAIN=engdb-11b7f.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=engdb-11b7f
PUBLIC_FIREBASE_STORAGE_BUCKET=engdb-11b7f.firebasestorage.app
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=221994477836
PUBLIC_FIREBASE_APP_ID=1:221994477836:web:2344c5b5230a266dd4c129
PUBLIC_FIREBASE_MEASUREMENT_ID=G-QCHLDW446Y
PUBLIC_COL_ENG_ADMIN=admin@example.com
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_BASE_PATH=
DEPLOY_PROVIDER=local
```

## Firebase Setup Checklist

Firebase Auth:

- Enable Google provider.
- Add local development domains.
- Add production domains.
- Make sure the Firebase web API key belongs to the configured Firebase project.

Common authorized domains:

```text
localhost
127.0.0.1
heroyik.gitlab.io
engdb-11b7f.firebaseapp.com
```

Google Cloud API key restrictions should allow the production and local HTTP referrers used by the app.

Common referrer patterns:

```text
http://localhost/*
http://127.0.0.1/*
https://heroyik.gitlab.io/*
https://engdb-11b7f.firebaseapp.com/*
```

## Local Development

Install dependencies:

```bash
npm ci
```

Start the dev server:

```bash
npm run dev
```

Astro normally serves the app at:

```text
http://localhost:4321/
```

Build static output:

```bash
npm run build
```

Preview the built app:

```bash
npm run preview
```

Run smoke tests:

```bash
npm run test:smoke
```

Run unit tests used by GitLab CI:

```bash
node --experimental-strip-types --test tests/unit/*.test.mts
```

Optional TypeScript check:

```bash
npx tsc --noEmit
```

## Deployment

GitLab Pages is the active production deployment target.

CI file:

```text
.gitlab-ci.yml
```

GitLab Pages pipeline:

1. Use `node:22-alpine`.
2. Install dependencies with `npm ci`.
3. Run unit tests.
4. Build the Astro static site.
5. Add `dist/.nojekyll`.
6. Publish `dist` through GitLab Pages.

GitLab CI variables currently expected by the app:

```text
PUBLIC_FIREBASE_API_KEY
PUBLIC_FIREBASE_AUTH_DOMAIN
PUBLIC_FIREBASE_PROJECT_ID
PUBLIC_FIREBASE_STORAGE_BUCKET
PUBLIC_FIREBASE_MESSAGING_SENDER_ID
PUBLIC_FIREBASE_APP_ID
PUBLIC_FIREBASE_MEASUREMENT_ID
PUBLIC_COL_ENG_ADMIN
```

The CI file also sets:

```text
DEPLOY_PROVIDER=gitlab
PUBLIC_SITE_URL=https://heroyik.gitlab.io
PUBLIC_BASE_PATH=/col_eng
```

## Firestore Rules

The app expects public reads for expression data and admin-only writes for protected data.

Recommended rule intent:

- `EnglishExpressions`: public read, admin-only write.
- `metadata`: public read, admin-only write.
- `users/{uid}/learningCards`: authenticated owner read/write.
- `users/{uid}/reviewEvents`: authenticated owner read/write.
- `users/{uid}/metadata`: authenticated owner read/write.
- Everything else denied by default.

Deploy rules with the Firebase CLI from a configured Firebase project:

```bash
firebase deploy --only firestore:rules --project engdb-11b7f
```

## Data Maintenance

The public app can run from the static bootstrap file and then pull Firestore deltas. When the static dataset needs to be refreshed, update:

```text
static/initial_data.json
```

Then verify:

```bash
npm run build
```

The app export button can also download the currently loaded browser dataset as JSON for inspection or backup.

## Troubleshooting

### Google sign-in failed: invalid API key

Check:

- `PUBLIC_FIREBASE_API_KEY` exists in `.env.local` and GitLab CI variables.
- The key belongs to the same Firebase project as `PUBLIC_FIREBASE_PROJECT_ID`.
- The key is not restricted in a way that blocks the current domain.
- The deployed build actually received the variable during `npm run build`.

### Google sign-in failed: unauthorized domain

Add the current host in Firebase Console:

```text
Authentication > Settings > Authorized domains
```

### Google sign-in popup disappears

The app falls back to redirect sign-in for popup-blocked, popup-closed, and cancelled-popup-request errors. If redirect also fails, check Firebase Auth provider setup and authorized domains.

### Cloud sync toggle is disabled

Cloud sync requires a signed-in Google account. Sign in from Options first.

### Reminders do not appear

Check:

- Browser supports the Notification API.
- Browser permission is granted.
- Site is served from a secure context, except localhost.
- OS notification settings are not blocking the browser.

### New Firestore expressions do not appear

Try:

- Wait for metadata listener delta sync.
- Open another tab and confirm BroadcastChannel sync.
- Type `forcedownload` in search to force a delta sync.
- Check Firestore read quota and local cooldown state.

### Safari, iPhone KakaoTalk, or Chrome on iOS stays at 100% loading

Expected behavior in version 2.0.10 and later:

- The app should leave the loading screen immediately after Firestore cache or `initial_data.json` loads.
- A stalled Firestore server delta sync should not keep the landing page at 100%.
- If Firestore is slow, the app should still open with the local phrase bundle.

If the symptom returns, check:

- Browser console warnings for `Initial Firestore delta sync timed out`.
- Whether `static/initial_data.json` is reachable from the deployed GitLab Pages URL.
- Whether the deployed bundle is actually version `2.0.10` or later in the footer.
- Firebase/Firestore availability and API key referrer restrictions.
- Safari private browsing or storage restrictions, although those should now degrade gracefully.

## Version History

### 2.0.10

- Fixed Safari/WebKit landing-page loading hang where progress reached 100% but the app never entered the ready state.
- Changed startup so Firestore cache or `initial_data.json` is enough to render the Learn screen.
- Moved initial Firestore delta sync to a best-effort background task with a 5-second timeout.
- Added a 12-second timeout for manual `forcedownload` sync so the UI returns to ready even when Firestore is slow.
- Added safe localStorage helpers for Safari private browsing, iOS WebKit, and embedded browser storage restrictions.
- Updated learning storage, learning sync, reminders, expression sync, and search app preferences to use safe storage access.
- Bumped app version to `2.0.10`.

### 2.0.7

- Added Enter key shortcut in admin ExpressionEditor to trigger Check Database.
- Enhanced admin StatusBox with auto-scroll, empty state, animated progress badge, and shimmer loading effect.

### 2.0.6

- Added admin-only delete control to Expression of the Day.
- Deleting a daily expression removes it from Firestore and local app state.
- Removed deleted expressions from local review cards, review events, and active review queue.
- Broadcast deleted expressions to other open tabs so they are removed locally without a reload.

### 2.0.5

- Added build-time validation for Firebase public environment variables used by Google login.
- Firebase Auth now initializes only when all required web config values are present.
- CI/CD must provide the `PUBLIC_FIREBASE_*` variables before running the production build.

### 2.0.4

- Added badge controls next to Expression of the Day for Review add, previous, and next.
- Updated daily expression navigation so next replays already shown history in order after going back.
- Prevented next from selecting expressions already shown in the current daily-expression history.
- Fixed partial Firestore cache fallback so a one-item cached dataset does not lock the daily expression UI.

### 2.0.3

- Reduced Firestore I/O during mobile pull-down page refreshes.
- Added learning cloud-sync fingerprints so unchanged refreshes skip writes.
- Added dirty-only learning sync writes for changed cards and recent review events.
- Added local cooldown handling for learning cloud-sync quota errors.
- Added a 15-minute minimum interval for non-forced expression delta sync.

### 2.0.0

- Learn-first home screen centered on Expression of the Day.
- Compact Learn/Search header.
- Search input moved under the daily expression card in Learn mode.
- Options panel for account, theme, sync, reminders, and export.
- Google sign-in in the main app.
- Per-account option persistence.
- Admin-only option badge and admin page link.
- Cloud sync gated behind Google sign-in.
- Browser reminder toggle with ON/OFF visual states.
- Dark/light theme support moved into Options.
- Improved light/dark readability for example usage highlights.
- Responsive Options panel.
- GitLab Pages production environment variables.
- Google Fonts removed in favor of system fonts.

## Maintainer

Maintained by:

```text
heroyik@gmail.com
```
