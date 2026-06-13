# Contributing

This repository is the source for Colloquial English, a GitLab Pages static app
for learning authentic English expressions. Contributions should preserve the
current production app, Firebase sync behavior, and admin intake flow.

## Current Product Shape

Before changing code, read:

- [`README.md`](README.md)
- [`CHANGELOG.md`](CHANGELOG.md)
- [`plan/plan_implemented.md`](plan/plan_implemented.md)

The current app has these major surfaces:

- Public Learn/Search app: `src/components/search/SearchApp.tsx`
- Learning components: `src/components/learning/`
- Admin intake app: `src/components/admin/`
- Firebase setup: `src/lib/firebase.ts`
- Expression sync: `src/lib/sync.ts`
- SRS logic: `src/lib/srs.ts`
- Learning storage: `src/lib/learningStorage.ts`
- Optional cloud sync: `src/lib/learningSync.ts`

## Development Setup

Install dependencies:

```bash
npm ci
```

Create `.env.local` with the required public Firebase variables:

```text
PUBLIC_FIREBASE_API_KEY=
PUBLIC_FIREBASE_AUTH_DOMAIN=
PUBLIC_FIREBASE_PROJECT_ID=
PUBLIC_FIREBASE_STORAGE_BUCKET=
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
PUBLIC_FIREBASE_APP_ID=
PUBLIC_FIREBASE_MEASUREMENT_ID=
PUBLIC_COL_ENG_ADMIN=
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_BASE_PATH=
DEPLOY_PROVIDER=local
```

Start local development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run unit tests used by GitLab CI:

```bash
node --experimental-strip-types --test tests/unit/*.test.mts
```

Run smoke tests:

```bash
npm run test:smoke
```

Optional TypeScript check:

```bash
npx tsc --noEmit
```

## Contribution Rules

### Preserve Production Behavior

Do not break:

- GitLab Pages deployment at `https://heroyik.gitlab.io/col_eng/`
- Astro static output to `dist`
- Firebase public env var loading
- Firestore `EnglishExpressions` collection usage
- `metadata/sync` delta sync behavior
- `*` wildcard search
- hidden `forcedownload` delta sync command
- admin Google login and save flow
- Expression of the Day first-screen behavior
- Learn/Search tab behavior
- Options panel account/theme/sync/reminder/export behavior

### Keep Learning State Separate

Expression records are canonical content and should not be mutated for SRS
progress. User learning state belongs in local storage and optional user-scoped
Firestore paths.

Current learning paths:

```text
users/{uid}/learningCards/{expressionId}
users/{uid}/reviewEvents/{eventId}
users/{uid}/metadata/learningSync
```

### Keep Admin Separate

Admin features live under:

```text
src/components/admin/
src/lib/admin.ts
src/pages/admin.astro
```

Do not mix general user account logic into the admin save boundary without a
clear security review.

### UI Standards

For UI changes:

- Keep the first viewport useful.
- Do not turn the public app into a marketing-only landing page.
- Avoid horizontal overflow at mobile widths.
- Keep controls touch-friendly.
- Keep the Options panel responsive.
- Check both dark and light themes.
- Keep footer content compact and visible.
- Do not re-add Google Fonts.

### Environment And Secrets

Never commit:

- `.env`
- `.env.local`
- `.env.*.local`
- Firebase service account JSON
- API keys outside intended public `PUBLIC_*` build variables
- exported private data backups

## Branch And Merge Request Flow

Use a focused branch name:

```text
feature/short-description
fix/short-description
docs/short-description
```

Merge requests should include:

- What changed.
- Why it changed.
- Screenshots for visible UI changes.
- Commands run.
- Any deployment or Firebase Console follow-up needed.

Use the default GitLab merge request template in:

```text
.gitlab/merge_request_templates/Default.md
```

## Testing Expectations

Minimum for code changes:

```bash
npm run build
node --experimental-strip-types --test tests/unit/*.test.mts
```

For UI changes, also run smoke tests when possible:

```bash
npm run test:smoke
```

For Firebase/Auth/Admin changes, manually verify:

- public app loads
- search works
- Learn mode works
- Options panel opens and closes
- Google sign-in flow gives expected state or clear error
- admin page still gates save actions to the admin account

## Documentation Expectations

Update documentation when behavior changes:

- `README.md` for current architecture and usage.
- `CHANGELOG.md` for release-visible changes.
- `plan/plan_implemented.md` when a planned feature becomes implemented.
- `SECURITY.md` when auth, Firestore Rules, or reporting policy changes.

## Release Checklist

Before a release:

1. Confirm `package.json` version.
2. Confirm footer version display.
3. Update `CHANGELOG.md`.
4. Run build and unit tests.
5. Push to GitLab `master`.
6. Confirm GitLab pipeline success.
7. Open the GitLab Pages URL with a cache-busting query string.
8. Smoke check public app and admin route.
