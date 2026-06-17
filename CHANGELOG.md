# Changelog

All notable changes to Colloquial English are documented here.

This project follows semantic versioning for app releases.

## 2.0.12 - 2026-06-17

### Added

- Added a redirect landing page for GitHub Pages (under `DEPLOY_PROVIDER=github`) that redirects to the new GitLab Pages URL (`https://heroyik.gitlab.io/col_eng/`) after 10 seconds or instantly on button click.
- Updated build-time Firebase validation to bypass checks for GitHub-targeted redirect builds.

## 2.0.11 - 2026-06-13

### Fixed

- Fixed Review tab not scrolling on mobile (Android, iPhone) due to `touch-action: none` on study cards.
- Refined swipe gesture handling: horizontal swipes (left/right) rate the card (Again/Good), vertical swipes scroll the page naturally.
- Changed card touch-action to `manipulation` to allow scrolling and remove 300ms tap delay on mobile.

## 2.0.10 - 2026-06-13

### Changed

- The public app now enters the ready state as soon as Firestore cache or the static `initial_data.json` bundle has loaded.
- Initial Firestore delta sync no longer blocks the landing page; it now runs as a best-effort background task.
- Manual `forcedownload` sync now returns the UI to ready state even when Firestore is slow or unavailable.
- Local preference, learning, reminder, and sync state now go through a safe storage wrapper instead of direct `localStorage` calls.

### Fixed

- Fixed Safari/WebKit loading hang where the progress bar reached 100% but the app stayed on the loading screen.
- Fixed the same 100% loading hang reported in iPhone KakaoTalk and MacBook Safari.
- Prevented Safari private browsing, iOS WebKit storage restrictions, or embedded browser storage failures from breaking initial render.
- Prevented stalled Firestore server delta reads from blocking the static phrase bundle.

### Added

- `src/lib/storage.ts` for guarded localStorage reads, writes, removals, and availability probing.
- 5-second timeout for initial background Firestore delta sync.
- 12-second timeout for manual forced Firestore delta sync.
- User-facing fallback message when manual update checks time out.

### Verified

- `npm run build` completed successfully for version `2.0.10`.
- Local preview rendered the Learn screen instead of remaining on the loading state.
- Playwright console check reported 0 warnings and 0 errors.
- GitLab `master` was updated with commit `1deeac7`.

## 2.0.7 - 2026-06-12

### Added

- Enter key shortcut in admin ExpressionEditor to trigger Check Database.
- Auto-scroll in admin StatusBox to follow the latest status line.
- Empty state placeholder when no status lines exist yet.
- Progress header with label and animated percentage badge.
- Shimmer animation on the progress bar during active loads.
- Distinct gradient style when the load completes.

## 2.0.6 - 2026-06-11

### Added

- Admin-only delete control for Expression of the Day.
- Firestore deletion helper for expression documents with sync metadata updates.
- BroadcastChannel delete events so open tabs remove deleted expressions locally.

### Changed

- Daily expression deletion now clears the expression from local state, display history, review cards, review events, and the active review queue.

## 2.0.5 - 2026-06-11

### Added

- Build-time validation for Firebase public environment variables used by Google login.

### Changed

- Firebase Auth initialization now requires the full public web config.

### Fixed

- CI/CD builds now fail early when required `PUBLIC_FIREBASE_*` variables are missing.

## 2.0.4 - 2026-06-11

### Added

- Badge controls next to Expression of the Day for adding the current expression to Review.
- Previous and next daily-expression navigation with local display history.

### Changed

- Daily-expression next navigation now replays existing forward history after going back before choosing a new random expression.
- New random daily expressions exclude expressions already shown in the current history.

### Fixed

- Partial Firestore cache loads now fall back to the static expression bundle when too few cached expressions are available.
- Daily-expression controls no longer get stuck on a single cached expression with disabled navigation.

## 2.0.0 - 2026-06-09

### Added

- Learn-first public app experience centered on Expression of the Day.
- Compact Learn/Search segmented control in the public header.
- Search input inside the Learn flow, directly below the daily expression card.
- Spaced review system with local review cards and append-only review events.
- Review session UI with reveal, rating buttons, keyboard shortcuts, and swipe rating gestures.
- Search-to-learn flow that lets users add result cards into review.
- Learning progress summary for due today, reviewed today, new available, in review, total reviews, and day streak.
- Main-app Options panel for account, appearance, learning, and data controls.
- Google sign-in in the public app through Firebase Auth.
- Popup sign-in with redirect fallback for blocked or closed popups.
- Per-account option persistence keyed by Firebase user ID.
- Google avatar display with fallback initial.
- Admin badge and admin page link for the account configured by `PUBLIC_COL_ENG_ADMIN`.
- Cloud sync toggle for signed-in users.
- User-scoped learning cloud sync for review cards, review events, and sync metadata.
- Browser reminder toggle with Notification API permission handling.
- JSON export action for the currently loaded expression dataset.
- Minimal footer version display.
- Root repository documentation:
  - `LICENSE`
  - `CHANGELOG.md`
  - `CONTRIBUTING.md`
  - `SECURITY.md`
  - `plan/plan_implemented.md`

### Changed

- Public app now defaults to Learn mode.
- Expression of the Day is the dominant first-screen signal.
- Learning stats were redesigned as compact badge-style UI.
- Theme control moved from the main screen into Options.
- Dark and light modes now share the Options panel.
- Landing headline and subtitle are centered.
- Header controls were tightened so the tabs and Options button use less vertical space.
- Options panel is responsive:
  - desktop side panel
  - mobile bottom sheet
  - small-height full-panel fallback
- Example usage highlight colors were adjusted for dark and light readability.
- README was rewritten for the final 2.0.0 architecture and user flows.
- App metadata was set to `2.0.0` in `package.json` and `package-lock.json`.
- GitLab Pages pipeline now runs unit tests before build.

### Removed

- Google Fonts network loading from public and admin Astro page heads.
- Direct `Outfit` and `Playfair Display` CSS references.
- Main-screen theme toggle from the public app.

### Fixed

- Google sign-in setup errors now show more specific messages.
- Cloud sync toggle is disabled until Google sign-in is available.
- Cloud sync ON/OFF and reminder ON/OFF states now have separate visual labels.
- Google avatar rendering uses `referrerPolicy="no-referrer"` and a fallback.
- `.env`, `.env.local`, and `.env.*.local` are ignored by git.
- Public admin gate uses `PUBLIC_COL_ENG_ADMIN`.

### Verified

- `npm run build` completed successfully for the 2.0.0 codebase.
- GitLab `master` was updated with commit `2adf74b53cd01b9704bdafb9f00508186f23470e`.
- GitLab pipeline `2586790330` completed successfully.

## Before 2.0.0

Earlier work established the Astro, React, TypeScript, Firebase, Firestore
delta-sync, admin intake, GitLab Pages deployment, and smoke test baseline.
Detailed migration status is preserved in:

- [`plan/final_upgrade_plan.md`](plan/final_upgrade_plan.md)
- [`plan/implementation_plan_uiux.md`](plan/implementation_plan_uiux.md)
- [`plan/plan_implemented.md`](plan/plan_implemented.md)
