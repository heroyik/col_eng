# COL_ENG UI/UX Implementation Plan

**Date:** 2026-06-09  
**Status:** Current-codebase migration plan  
**Goal:** Expand the existing COL_ENG search/admin app into a responsive learning experience without breaking the current GitLab Pages deployment, Firebase sync, admin intake, or future GitHub Pages fallback.

---

## 0. Current Baseline

The app is already an Astro + React + TypeScript static site.

Existing production surfaces:
- Landing/search page: `src/components/search/SearchApp.tsx`
- Admin page: `src/components/admin/AdminPanel.tsx`
- Shared theme toggle: `src/components/shared/ThemeToggle.tsx`
- Shared footer/repo link: `src/components/shared/RepoFooter.tsx`
- Firebase/env setup: `src/lib/firebase.ts`
- Expression sync/cache: `src/lib/sync.ts`
- Search behavior: `src/lib/search.ts`
- Types: `src/types/index.ts`
- Styles:
  - landing/search: `src/styles/global.css`
  - admin: `src/styles/admin.css`

Do not restart from a greenfield plan. Every phase below must preserve:
- GitLab Pages deployment at `https://heroyik.gitlab.io/col_eng/`
- Future GitHub Pages compatibility
- Firebase authorized domain compatibility
- Existing search, wildcard `*`, `forcedownload`, and delta sync behavior
- Existing admin Google login, Vertex AI generation, validation, save, and metadata sync flow
- Existing light/dark theme behavior

---

## 1. Non-Negotiable Responsive Standard

The app remains mobile-first, but every landing and admin change must also be responsive on tablet and PC.

Required viewport matrix:

| Class | Width | Required Pages |
|---|---:|---|
| Small mobile | 320px | landing, admin |
| Common mobile | 375px | landing, admin |
| Large mobile | 430px | landing, admin |
| Tablet | 768px | landing, admin |
| Small desktop | 1024px | landing, admin |
| Desktop | 1365px | landing, admin |
| Wide desktop | 1440px+ | landing, admin |

Responsive acceptance criteria:
- No horizontal page scroll.
- No clipped text in header, cards, controls, footer, status boxes, or buttons.
- Footer message and repo logo must remain visible on every viewport.
- Touch targets are at least 44px on mobile.
- Admin cards must remain readable and operational on mobile, tablet, and desktop.
- Search result cards must not overlap, shift unpredictably, or hide long expression text.
- Light and dark modes must pass visual inspection on landing and admin.
- The first viewport must show useful app UI, not a marketing-only screen.

Verification gate for every UI phase:
- `npm run build`
- `npx tsc --noEmit`
- `npm run test:smoke`
- Playwright visual/snapshot checks on the viewport matrix above.
- Deployed GitLab Pages check after push for any CSS/layout change.

---

## 2. Phase 1: Stabilize Existing UI Foundations

**Objective:** Make the current search/admin app structurally ready for learning features.

Files to inspect before editing:
- `src/components/search/SearchApp.tsx`
- `src/components/search/ResultsGrid.tsx`
- `src/components/search/DailyExpression.tsx`
- `src/components/search/SearchInput.tsx`
- `src/components/admin/AdminPanel.tsx`
- `src/components/shared/RepoFooter.tsx`
- `src/styles/global.css`
- `src/styles/admin.css`

Implementation tasks:
1. Normalize shared layout primitives only where duplication is already causing bugs:
   - shared footer style contract
   - shared responsive container constraints
   - shared focus-visible/button/touch target treatment
2. Keep `global.css` and `admin.css` separate unless a shared stylesheet is introduced deliberately.
3. Add explicit responsive comments or utility classes only if they reduce repeated breakpoints.
4. Add Playwright assertions for:
   - no horizontal overflow on landing/admin
   - footer repo link visible
   - theme toggle visible
   - admin cards have equal expected widths at desktop/tablet breakpoints

Do not:
- Rewrite the current app shell.
- Replace current Firebase initialization.
- Remove existing fallback search/download commands.

Deliverable:
- Existing UI remains visually stable and responsive across the full viewport matrix.

---

## 3. Phase 2: Learning Data Model

**Objective:** Add SRS state without changing existing expression documents.

Files to modify/create:
- `src/types/index.ts`
- `src/lib/srs.ts`
- `src/lib/learningStorage.ts`
- `src/lib/learningDefaults.ts`

Data strategy:
- Keep `EnglishExpressions` as the canonical public expression collection.
- Store user learning state separately.
- Do not mutate expression records for SRS progress.

Recommended local-first model:

```ts
export type SrsRating = "again" | "hard" | "good" | "easy";
export type SrsState = "new" | "learning" | "review" | "relearning";

export interface LearningCard {
  expressionId: number;
  state: SrsState;
  easeFactor: number;
  intervalDays: number;
  dueAt: string;
  repetitions: number;
  lapses: number;
  lastReviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewEvent {
  id: string;
  expressionId: number;
  rating: SrsRating;
  reviewedAt: string;
  previousDueAt: string | null;
  nextDueAt: string;
}
```

Storage choice:
- Start with localStorage only for MVP if the stored data remains small.
- Add a hard `checkLearningStorageUsage()` guard.
- If projected data exceeds localStorage safety limits, move SRS state to IndexedDB before adding gamification/history.

Conflict/sync posture:
- Prefer append-only `ReviewEvent` records for future sync.
- Derived card state can be recalculated from review events if conflicts appear.
- Avoid last-write-wins for streak, XP, or review history.

Deliverable:
- SRS logic is testable without UI.
- Existing search/admin behavior is unchanged.

Tests:
- SRS interval calculation.
- Rating state transitions.
- Due queue ordering.
- Storage load/save/migration fallback.

---

## 4. Phase 3: Learning Entry Point

**Objective:** Add a learning mode to the landing page without replacing search.

Files to modify/create:
- `src/components/search/SearchApp.tsx`
- `src/components/learning/LearningHome.tsx`
- `src/components/learning/DailyQueueSummary.tsx`
- `src/components/learning/LearningCard.tsx`
- `src/components/learning/LearningSession.tsx`
- `src/styles/global.css`

UX rules:
- The first screen must remain usable.
- Search remains available.
- Learning mode can be introduced as a tab/segmented control:
  - `Learn`
  - `Search`
- Default can be `Learn` only after learning state exists; otherwise search/daily expression remains safe.

Responsive behavior:
- Mobile: single-column, one-handed controls, card centered.
- Tablet: card and session summary may sit side-by-side if it improves scanning.
- Desktop: constrained content width, no stretched card wider than comfortable reading.

Deliverable:
- User can start a daily review session from the landing page.
- User can still search expressions as before.

Verification:
- Landing page at 320/375/430/768/1024/1365/1440.
- Theme toggle and footer remain visible.
- Search input and learning controls do not overlap.

---

## 5. Phase 4: Card Interaction

**Objective:** Implement card reveal and rating interactions safely.

Files to create:
- `src/components/learning/StudyCard.tsx`
- `src/components/learning/RatingControls.tsx`
- `src/components/learning/useCardSwipe.ts`
- `src/components/learning/SwipeOverlay.tsx`
- `src/lib/haptics.ts`

Interaction model:
- Tap/click reveals the back of the card.
- Four explicit rating buttons are always available after reveal:
  - Again
  - Hard
  - Good
  - Easy
- Swipe gestures are progressive enhancement, not the only path.

Swipe mapping:

| Gesture | Rating |
|---|---|
| Left | Again |
| Down | Hard |
| Right | Good |
| Up | Easy |

Accessibility:
- Keyboard support:
  - `Space` / `Enter`: reveal
  - Arrow keys: rate after reveal
- Screen reader announcement for reveal/rating state.
- `prefers-reduced-motion` disables flip/swipe animations.

Responsive requirements:
- Rating buttons must fit at 320px without clipping.
- Cards must use stable dimensions with `min()`, `max-width`, and `aspect-ratio`.
- Long Korean/English/Vietnamese/Chinese/Spanish text must wrap inside the card.

Deliverable:
- One complete review can be performed without gestures.
- Swipe gestures work on touch devices as enhancement.

---

## 6. Phase 5: Search-to-Learn Integration

**Objective:** Let users add expressions from search results into their learning queue.

Files to modify:
- `src/components/search/ResultsGrid.tsx`
- `src/components/search/ExpressionCard.tsx` or current card component used by results
- `src/lib/learningStorage.ts`

Tasks:
1. Add `Add to Review` / `In Review` state on search result cards.
2. Avoid duplicate SRS cards for the same expression ID.
3. Keep wildcard `*` performant.
4. Preserve existing highlighting and translation rendering.

Responsive requirements:
- Result card action buttons must not overflow on 320px.
- Result grid should be:
  - 1 column on mobile
  - 2 columns on tablet where space allows
  - 3 columns max on desktop if cards stay readable

Deliverable:
- Search can seed the SRS deck.
- Existing search behavior remains intact.

---

## 7. Phase 6: Progress, Streak, and Lightweight Motivation

**Objective:** Add useful progress feedback without building a large gamification system first.

Files to create:
- `src/lib/progress.ts`
- `src/components/learning/DailyProgress.tsx`
- `src/components/learning/StreakSummary.tsx`

MVP scope:
- Daily reviewed count.
- Due count.
- New count.
- Current streak.
- Total reviewed.

Defer:
- Large badge system.
- XP economy.
- Heat maps.
- Streak repair/freeze mechanics.

Reason:
- The current app needs a reliable learning loop before adding game systems.
- XP/streak repair creates more state and sync complexity than the first release needs.

Responsive requirements:
- Progress widgets can wrap into multiple rows on mobile.
- Desktop can show compact summary panels, but no nested-card layout.

Deliverable:
- User understands today's learning progress.

---

## 8. Phase 7: Optional Cloud Sync for Learning State

**Objective:** Sync learning state across devices only after local learning is stable.

Files to create/modify:
- `src/lib/learningSync.ts`
- `src/lib/auth.ts`
- `firestore.rules`

Recommended model:
- Anonymous auth for general users.
- Admin Google auth remains separate and unchanged.
- User-scoped paths:
  - `users/{uid}/learningCards/{expressionId}`
  - `users/{uid}/reviewEvents/{eventId}`
  - `users/{uid}/progress/summary`

Conflict strategy:
- Review events are append-only.
- Card/progress summaries are derived or versioned.
- Avoid last-write-wins for review history.

Security rules:
- Users can read/write only their own learning documents.
- Admin intake rules remain unchanged.

Responsive impact:
- Sync status UI must fit in mobile header/footer or a compact status line.
- Do not add blocking modals for sync.

Deliverable:
- Learning state syncs across devices without affecting public expression sync.

---

## 9. Phase 8: Admin Page Preservation and Enhancements

**Objective:** Keep admin reliable while learning features expand.

Files to protect:
- `src/components/admin/AdminPanel.tsx`
- `src/components/admin/AuthCard.tsx`
- `src/components/admin/ExpressionEditor.tsx`
- `src/components/admin/StatusBox.tsx`
- `src/lib/admin.ts`
- `src/lib/firebase.ts`

Allowed enhancements:
- Responsive layout improvements.
- Better status copy.
- Safer JSON validation display.
- Save-flow smoke test coverage.

Do not:
- Mix general user anonymous auth into admin auth flow.
- Change admin authorized email behavior without explicit approval.
- Change Firestore collection names.
- Change metadata sync behavior without regression tests.

Responsive requirements:
- 320px: single column, no clipped fields/buttons.
- 768px: readable two-column layout if space allows.
- 1024px+: admin/settings and primary-expression cards align cleanly; Generated JSON and Status maintain consistent widths.

Deliverable:
- Admin remains operational after every learning UI change.

---

## 10. Phase 9: Notifications and Advanced Gamification

**Objective:** Add only after the core learning loop and sync are stable.

Notifications:
- Web Push on static hosting requires service worker, permission UX, and a push provider decision.
- Do not add notification prompts on first page load.
- Ask only after a successful review session.

Gamification:
- Add XP/badges only when progress data is stable.
- Keep badges lightweight and explainable.
- Avoid large decorative UI that weakens the operational learning flow.

Deliverable:
- Optional motivation features that do not block learning.

---

## 11. Testing Plan

Current required commands:

```sh
npm run build
npx tsc --noEmit
npm run test:smoke
```

Add tests in this order:
1. Unit tests for SRS algorithm.
2. Unit tests for learning storage migration and duplicate prevention.
3. Playwright tests for learning session:
   - reveal card
   - rate with button
   - rate with keyboard
   - session persists after reload
4. Playwright responsive tests:
   - landing and admin at 320/375/430/768/1024/1365/1440
   - no horizontal overflow
   - footer message and repo logo visible
   - controls visible and clickable
5. Optional visual screenshots:
   - dark/light mode
   - landing/admin
   - mobile/tablet/desktop

Deployment verification after push:
- Check latest GitLab pipeline success.
- Open deployed GitLab Pages URL with cache-busting query string.
- Verify landing and admin at representative mobile/tablet/desktop sizes.

---

## 12. Implementation Order

| Step | Scope | Output |
|---:|---|---|
| 1 | Existing UI foundation | Responsive-safe landing/admin baseline |
| 2 | SRS model + storage | Testable learning state without UI disruption |
| 3 | Learning entry point | Learn/Search flow on landing |
| 4 | Card reveal + rating controls | Accessible review session |
| 5 | Swipe enhancement | Touch gesture support without blocking keyboard/buttons |
| 6 | Search-to-learn | Add expressions to review from search |
| 7 | Progress MVP | Daily due/review/streak summary |
| 8 | Learning sync | Optional user-scoped Firestore sync |
| 9 | Admin preservation | Regression coverage and responsive checks |
| 10 | Notifications/gamification | Optional polish after stability |

---

## 13. Completion Criteria

The UI/UX upgrade is complete only when:
- Search remains functional.
- Admin save flow remains functional.
- Learning session works without gestures.
- Learning session works with gestures on touch devices.
- User progress persists after refresh.
- Landing and admin are responsive on mobile, tablet, and PC.
- No viewport in the required matrix has horizontal overflow or clipped footer/logo.
- GitLab Pages deploy succeeds.
- Future GitHub Pages deploy remains supported by the same code path.

