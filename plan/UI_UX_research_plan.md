# UI/UX Research Plan: Daily Colloquial English Expression App

**Project:** COL_ENG (Colloquial English)
**Date:** 2026-06-09
**Status:** Research Plan
**Goal:** Optimize UI/UX for a mobile-first daily expression learning app during Astro + React migration

---

## Executive Summary

This research plan outlines the investigation needed to transform COL_ENG from a search-focused reference tool into an engaging daily learning app optimized for **mobile commute use** (subway/bus). The app will evolve into a **SRS-powered flashcard system** with gamification, while maintaining the existing dark glassmorphism aesthetic.

**Key Transformation:**
- **From:** Search-first reference app with "Expression of the Day" as secondary feature
- **To:** Daily learning-first app with search as supplementary reference tool
- **Primary Use Case:** 지하철/버스에서 계속 refresh하면서 임의의 표현을 반복 복습하고, 필요하면 검색해서 유관 표현을 복습하는 방식

---

## User Profile

### Primary Audience
- **Target:** 한국인 영어 학습자 (Korean English learners)
- **Korean meaning is primary** (한국어 meaning이 메인)
- Other translations (Japanese, Chinese, Vietnamese, Spanish) are supplementary
- Learning casual/colloquial English expressions used in NYC

### Device & Context
- **Primary Device:** Mobile (스마트폰) - Mobile First design
- **Usage Context:** 지하철/버스 (subway/bus) commute
- **Interaction Style:** One-handed operation with swipe gestures
- **Session Length:** Short micro-learning sessions (2-5 minutes)

### Core User Flow
1. Open app → See today's expression (card front: English expression only)
2. Swipe or tap to reveal → See Korean meaning + similar expressions + example dialogue
3. Provide SRS feedback (Easy/Good/Hard/Again) via 4-way swipe
4. Repeat with next expression (auto or manual skip)
5. Optionally search for related expressions when needed

---

## Research Areas & Tasks

### 1. SRS (Spaced Repetition System) Algorithm Research

**Objective:** Design a lightweight SRS algorithm optimized for colloquial expressions (not vocabulary words)

#### Research Questions
- What SRS algorithm works best for **phrases/sentences** vs. single words?
- How to handle the **4-level feedback** (Easy/Good/Hard/Again) effectively?
- What review intervals are optimal for daily commuters?
- How to balance **new expressions** vs. **reviewing old ones**?

#### Tasks
- [ ] Research Anki's SM-2 algorithm and modern variants (FSRS, etc.)
- [ ] Investigate how language apps (Duolingo, Memrise) handle phrase-level SRS
- [ ] Design custom SRS intervals:
  - Again: 1 minute → 10 minutes → 1 hour → 1 day
  - Hard: 10 minutes → 1 hour → 1 day → 3 days
  - Good: 1 hour → 1 day → 3 days → 7 days
  - Easy: 1 day → 3 days → 7 days → 14 days
- [ ] Determine optimal **daily review queue size** (10-20 expressions?)
- [ ] Research **streak forgiveness** mechanisms (Duolingo's streak freeze, etc.)

#### Deliverables
- SRS algorithm specification
- Review interval schedule table
- Daily review queue logic

---

### 2. Card Interaction & Gesture UX Research

**Objective:** Design optimal swipe-based interaction for one-handed commute use

#### Research Questions
- What 4-way swipe gestures map naturally to Easy/Good/Hard/Again?
- How to provide **haptic/visual feedback** on swipe completion?
- What's the optimal **swipe threshold** (distance to trigger action)?
- How to handle **accidental swipes** (undo mechanism)?
- Should the card have **snap-back** animation if swipe is incomplete?

#### Tasks
- [ ] Research swipe gesture patterns in learning apps (AnkiDroid, Quizlet)
- [ ] Investigate **gesture conflicts** with browser/system gestures
- [ ] Design swipe directions:
  - Right → Good (✅ positive reinforcement)
  - Left → Again (🔄 review again soon)
  - Up → Easy (⬆️ mastered, long interval)
  - Down → Hard (⬇️ struggled, shorter interval)
- [ ] Research **visual feedback** during swipe (color change, icon reveal)
- [ ] Investigate **haptic feedback** options (vibration on swipe completion)
- [ ] Design **undo mechanism** (shake to undo, or undo button?)

#### Deliverables
- Swipe gesture specification with thresholds
- Visual feedback design (swipe states, completion animations)
- Haptic feedback implementation guide
- Undo mechanism design

---

### 3. Card Flip/Reveal Animation Research

**Objective:** Design smooth 1-step reveal animation for card content

#### Research Questions
- What animation style works best (3D flip, slide, fade)?
- How to handle **content height variation** (some cards have more text)?
- Should the reveal be **tap-based** or **swipe-based**?
- How to indicate the card is tappable/reveals content?

#### Tasks
- [ ] Research card flip animations (CSS 3D transforms, React Spring, Framer Motion)
- [ ] Investigate **progressive content loading** (show meaning first, then examples)
- [ ] Design reveal states:
  - **Front:** English expression only (large, centered)
  - **Back:** Korean meaning + similar expressions + example dialogue + translations
- [ ] Research **content height handling** (auto-height, scroll, truncated preview)
- [ ] Investigate **micro-interactions** (subtle bounce, glow, particle effects)

#### Deliverables
- Card flip animation specification
- Content layout design (front/back)
- Responsive height handling approach

---

### 4. Gamification System Research

**Objective:** Design engaging gamification elements (streaks, progress, badges, leveling)

#### Research Questions
- What gamification mechanics drive **daily retention** in language apps?
- How to balance **motivation vs. anxiety** (streak pressure)?
- What's the optimal **XP/point system** for expression learning?
- How to design **meaningful badges** (not just数量-based)?

#### Tasks
- [ ] Research Duolingo's gamification system (streaks, XP, leagues, hearts)
- [ ] Investigate **streak design best practices**:
  - Streak freeze mechanism
  - Streak repair tokens
  - Streak milestones (7 days, 30 days, 100 days)
- [ ] Research **progress visualization**:
  - Daily progress bar (expressions reviewed today / target)
  - Weekly/monthly heat maps
  - Mastery levels per expression (New → Learning → Review → Mastered)
- [ ] Investigate **badge/achievement system**:
  - Expression milestones (10, 50, 100, 500, 1000 expressions learned)
  - Streak milestones (7, 30, 100, 365 days)
  - Accuracy badges (90%+ Easy rate)
  - Search mastery badges
- [ ] Research **leveling system**:
  - XP sources (review expression +10 XP, easy bonus +5 XP, daily streak +50 XP)
  - Level thresholds (exponential growth?)
  - Level rewards (cosmetic badges, title unlocks)

#### Deliverables
- Gamification system specification
- XP/point calculation table
- Badge/achievement list with unlock conditions
- Streak system design (freeze, repair, milestones)

---

### 5. Dark Glassmorphism UI Research

**Objective:** Enhance existing dark theme with modern glassmorphism patterns

#### Research Questions
- How to improve **glassmorphism readability** on mobile?
- What **contrast ratios** are needed for accessibility (WCAG AA/AAA)?
- How to handle **light text on glass cards** without eye strain?
- What **blur/opacity values** work best for daily reading?

#### Tasks
- [ ] Research modern dark mode glassmorphism examples (Stripe, Linear, Raycast)
- [ ] Investigate **contrast optimization** for CJK + Latin text mixing
- [ ] Research **glow effects** for interactive elements (cards, buttons)
- [ ] Investigate **depth layering** (z-index, shadows, blur hierarchy)
- [ ] Research **color palette** for gamification (success green, warning amber, error red)
- [ ] Investigate **animation performance** on mobile (60fps, GPU acceleration)

#### Deliverables
- Enhanced dark theme specification
- Color palette with contrast ratios
- Glassmorphism component guidelines
- Performance optimization checklist

---

### 6. Swipe Navigation & Card Stack Research

**Objective:** Design smooth card-to-card navigation (swipe or tap to next)

#### Research Questions
- How to indicate **next card availability**?
- Should cards **stack** (like Tinder) or **slide** (like carousel)?
- How to show **daily progress** (card 5/20)?
- What animation works best for card transitions?

#### Tasks
- [ ] Research card stack patterns (Tinder, Bumble, learning apps)
- [ ] Investigate **card transition animations** (slide left, slide up, fade)
- [ ] Research **progress indicators** (dots, counter, progress bar)
- [ ] Investigate **card preloading** (preload next 2-3 cards for smooth transitions)
- [ ] Research **gesture conflicts** with card navigation vs. reveal gesture

#### Deliverables
- Card navigation flow specification
- Transition animation design
- Progress indicator design
- Preloading strategy

---

### 7. Search UX Research (Minimal Enhancement)

**Objective:** Maintain simple search UX while integrating with daily learning flow

#### Research Questions
- How to **surface search** without disrupting daily learning habit?
- Should search results have **SRS integration** (learn from search results)?
- How to show **"related expressions"** from search?

#### Tasks
- [ ] Research search UX in language apps (minimal, non-intrusive)
- [ ] Investigate **search entry point** (top bar, floating button, swipe down)
- [ ] Research **search result card design** (same as daily cards? simplified?)
- [ ] Investigate **"Add to Review"** from search results
- [ ] Research **search history** and **recently viewed** expressions

#### Deliverables
- Search UX specification (minimal integration)
- Search result card design
- "Add to Review" flow

---

### 8. Data Persistence & Sync Research

**Objective:** Design hybrid storage (localStorage + Firebase) for SRS data

#### Research Questions
- What data structure works best for SRS scheduling?
- How to sync localStorage → Firebase without conflicts?
- How to handle **offline-first** with eventual consistency?
- What's the optimal **sync frequency** (on every review? periodic?)

#### Tasks
- [ ] Research localStorage vs. IndexedDB for SRS data
- [ ] Investigate **Firebase sync patterns** (write-through, write-back, periodic)
- [ ] Design **data schema** for SRS:
  - expression_id, last_reviewed, next_review, interval, ease_factor, review_count
  - streak_count, last_streak_date, total_xp, level
  - bookmarks[], completed_expressions[]
- [ ] Research **conflict resolution** (last-write-wins, merge strategies)
- [ ] Investigate **offline queue** for pending reviews

#### Deliverables
- Data schema specification
- Sync architecture diagram
- Conflict resolution strategy
- Offline-first implementation guide

---

### 9. Notification System Research

**Objective:** Design web push + email notifications for daily reminders

#### Research Questions
- What **notification timing** works best for commuters?
- How to write **engaging notification copy** (not generic)?
- How to handle **notification permissions** gracefully?
- What's the optimal **email digest frequency** (daily? weekly?)

#### Tasks
- [ ] Research Web Push Notification best practices (permission prompts, timing)
- [ ] Investigate **personalized notification timing** (user selects study time)
- [ ] Research **notification copy examples**:
  - "🔥 Your expression of the day is waiting!"
  - "Don't break your 7-day streak! Review now"
  - "3 expressions to review today"
- [ ] Investigate **email digest design** (weekly summary, daily expression)
- [ ] Research **notification opt-in flow** (when to ask, how to explain value)

#### Deliverables
- Notification timing specification
- Notification copy templates
- Email digest design
- Permission request flow

---

### 10. Onboarding & First-Time User Experience Research

**Objective:** Design smooth onboarding for new users

#### Research Questions
- How to explain **swipe gestures** without lengthy tutorial?
- How to **set daily goals** during onboarding?
- How to request **notification permissions** at the right time?
- How to show **value quickly** (first expression in <5 seconds)?

#### Tasks
- [ ] Research onboarding patterns in language apps (Duolingo, Busuu)
- [ ] Investigate **gesture tutorial** (interactive walkthrough, tooltip hints)
- [ ] Research **daily goal setting** (5 expressions/day, 10, 20?)
- [ ] Investigate **permission request timing** (after first review? after streak?)
- [ ] Research **quick win** design (show first expression immediately)

#### Deliverables
- Onboarding flow specification
- Gesture tutorial design
- Daily goal selection UI
- Permission request timing strategy

---

## Implementation Priority

### Phase 1: Core Learning Experience (Week 1-2)
1. Card flip/reveal animation (1-step reveal)
2. SRS algorithm implementation (4-level feedback)
3. Swipe gesture interaction (4-way)
4. Dark glassmorphism polish

### Phase 2: Gamification (Week 3)
5. Streak system
6. Progress visualization (daily/weekly)
7. XP/leveling system

### Phase 3: Engagement (Week 4)
8. Badge/achievement system
9. Notification system (web push + email)
10. Onboarding flow

### Phase 4: Polish (Week 5)
11. Data persistence & sync
12. Search UX integration
13. Performance optimization
14. Accessibility audit

---

## Success Metrics

### Learning Effectiveness
- **Daily Active Users (DAU)** increase by 30%
- **Average session length** increase to 3-5 minutes
- **7-day retention rate** > 40%
- **30-day retention rate** > 20%

### Engagement
- **Average expressions reviewed per day** > 10
- **Streak maintenance rate** > 50% (users keep streaks alive)
- **Badge unlock rate** > 30% (users earn at least 1 badge)

### Performance
- **Initial load time** < 2 seconds
- **Card flip animation** 60fps
- **Swipe gesture response** < 100ms
- **Offline functionality** 100% (localStorage)

---

## Competitive Analysis

### Apps to Study
1. **AnkiDroid** - SRS algorithm, gesture-based review
2. **Duolingo** - Gamification, streaks, notifications
3. **Memrise** - Mnemonics, spaced repetition
4. **Quizlet** - Flashcard design, study modes
5. **Busuu** - Daily goals, progress tracking

### Key Features to Benchmark
- Card flip animations (AnkiDroid)
- Streak system (Duolingo)
- Gesture feedback (Anki mobile)
- Progress visualization (Memrise)
- Onboarding flow (Busuu)

---

## Technical Constraints

### Framework
- **Astro + React** (migration in progress)
- **Firebase** (Firestore, Auth, Cloud Messaging)
- **TypeScript** (type safety)

### Performance
- **Static-first** (Astro SSG)
- **Client-side SRS** (no server calls for reviews)
- **Offline-first** (localStorage + Firebase sync)

### Compatibility
- **Mobile browsers** (Chrome, Safari, Samsung Internet)
- **Desktop browsers** (Chrome, Firefox, Safari, Edge)
- **PWA support** (optional future enhancement)

---

## Open Questions for Further Research

1. **SRS Algorithm Tuning:** How to optimize intervals specifically for **colloquial phrases** vs. single vocabulary words?

2. **Gesture Accessibility:** How to provide **alternative input** for users who cannot use swipe gestures (motor disabilities)?

3. **Multi-Language Support:** How to handle **5 translation fields** (Korean, Japanese, Chinese, Vietnamese, Spanish) in card layout without clutter?

4. **Expression Difficulty:** How to determine if an expression is "hard" or "easy" for **SRS scheduling** (user-dependent vs. global)?

5. **Social Features:** Should users be able to **share expressions** or **compete with friends** (leaderboards)?

---

## Research Timeline

| Week | Focus Area | Deliverable |
|------|------------|-------------|
| Week 1 | SRS Algorithm + Card Flip | SRS spec, animation design |
| Week 2 | Swipe Gestures + Dark Theme | Gesture spec, theme guidelines |
| Week 3 | Gamification | Streak/XP/badge system spec |
| Week 4 | Notifications + Onboarding | Notification spec, onboarding flow |
| Week 5 | Data Sync + Polish | Sync architecture, performance checklist |

---

## References

### Academic Research
- Ebbinghaus Forgetting Curve
- Leitner System (SRS intervals)
- Active Recall vs. Passive Review

### Industry Best Practices
- Duolingo Gamification Case Study
- Anki Algorithm Documentation
- Firebase Offline Persistence Guide

### Design Resources
- Material Design 3 (Motion, Gestures)
- Apple Human Interface Guidelines (Haptics)
- WCAG 2.1 AA Contrast Requirements

---

## Next Steps

1. **Validate research plan** with stakeholder review
2. **Prioritize research areas** based on implementation timeline
3. **Assign research tasks** to team members
4. **Set up research tools** (Figma, user testing platforms)
5. **Begin Phase 1 research** (SRS + Card Flip)

---

*This research plan will be updated as findings emerge and implementation progresses.*
