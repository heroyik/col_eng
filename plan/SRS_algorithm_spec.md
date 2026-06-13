# SRS Algorithm Specification: Colloquial English Expressions

**Project:** COL_ENG (Colloquial English)
**Date:** 2026-06-09
**Status:** Specification
**Goal:** Design SRS algorithm optimized for multi-word colloquial expressions used in mobile commute learning

---

## Executive Summary

This specification defines a **hybrid SRS algorithm** combining SM-2's simplicity with FSRS-inspired phrase-level optimizations. The system is designed for **colloquial English expressions** (phrasal verbs, idioms, slang) used by Korean learners in mobile commute scenarios (subway/bus).

**Key Design Decisions:**
- **4-level feedback:** Easy/Good/Hard/Again (swipe gestures)
- **Phrase-optimized intervals:** Shorter initial cycles for multi-word expressions
- **Daily review budget:** 10-20 expressions per session (2-5 minutes)
- **Graceful degradation:** Handle missed days without punishing users
- **Offline-first:** localStorage + Firebase sync architecture

---

## 1. Core Algorithm: SM-2 Phrase Variant

### 1.1 Mathematical Foundation

Based on SuperMemo's SM-2 algorithm with modifications for phrase-level learning.

#### Variables

| Variable | Symbol | Initial Value | Description |
|----------|--------|---------------|-------------|
| Ease Factor | `EF` | 2.5 | Multiplier for interval growth (range: 1.3 - 3.0) |
| Interval | `I` | 0 | Days until next review |
| Repetition Count | `n` | 0 | Number of successful reviews in a row |
| Lapse Count | `L` | 0 | Number of times card was "failed" (Again) |
| Due Date | `due` | Now | Timestamp when card is next due |
| State | `state` | NEW | Card state (NEW, LEARNING, REVIEW, RELEARNING) |
| Last Review | `lastReview` | null | Timestamp of last review |
| Review Count | `reviewCount` | 0 | Total number of reviews (for statistics) |

#### Card States

```
NEW → LEARNING → REVIEW → RELEARNING → REVIEW
  ↑       ↓          ↓           ↓
  └───────┴──────────┴───────────┘ (on "Again")
```

- **NEW:** Never reviewed (0 reviews)
- **LEARNING:** In initial short-term cycle (first 1-3 reviews)
- **REVIEW:** Graduated to long-term schedule
- **RELEARNING:** Failed after graduation, re-entering learning cycle

---

### 1.2 Rating System (4-Level Feedback)

Map swipe gestures to SM-2 quality ratings:

| Gesture | Rating | SM-2 Quality | Description |
|---------|--------|--------------|-------------|
| ← Left | Again | 1 | Failed recall, need to review again soon |
| ↓ Down | Hard | 3 | Recalled with difficulty, shorter interval |
| → Right | Good | 4 | Recalled normally, standard interval |
| ↑ Up | Easy | 5 | Recalled effortlessly, extended interval |

**Why this mapping:**
- **Left = Again:** Intuitive "go back" gesture
- **Down = Hard:** "Heavy" feeling, struggle
- **Right = Good:** "Moving forward" gesture
- **Up = Easy:** "Light" feeling, mastered

---

### 1.3 Interval Calculation

#### Learning Phase (n < 3)

Initial short-term cycles for phrase encoding:

```
Learning Steps: 10m → 1d → 3d
```

| Rating | Next Step | Rationale |
|--------|-----------|-----------|
| Again | 10 minutes | Re-encode immediately (within session) |
| Hard | 1 day | Quick re-encounter |
| Good | 3 days | Standard initial interval |
| Easy | 7 days | Skip to review phase |

**Graduation Criteria:** Card moves from LEARNING → REVIEW state when:
- `repetitions >= 3` (3 successful reviews), AND
- Current rating is Good or Easy

**Note:** "Again" ratings do NOT increment `repetitions`. A card that gets Good-Again-Good-Good has `repetitions = 3` and graduates. A card that gets Again-Good-Good-Good has `repetitions = 3` but only graduates on the 3rd Good (total 4 reviews).

**State Transitions:**
```
NEW → (first review) → LEARNING
LEARNING → (n >= 3 && Good/Easy) → REVIEW
REVIEW → (Again) → RELEARNING
RELEARNING → (n >= 2 && Good/Easy) → REVIEW
```

#### Review Phase (n ≥ 3)

Long-term interval expansion:

```typescript
function calculateReviewInterval(
  currentInterval: number,
  easeFactor: number,
  rating: 'again' | 'hard' | 'good' | 'easy',
  lapseCount: number
): { interval: number; newEF: number } {
  
  let newEF = easeFactor;
  let newInterval = currentInterval;
  
  switch (rating) {
    case 'again':
      // Failed: Reset to learning, penalize EF
      newEF = Math.max(1.3, newEF - 0.2);
      newInterval = 1; // 1 day (relearning)
      break;
      
    case 'hard':
      // Struggled: Shorter interval, slight EF penalty
      newEF = Math.max(1.3, newEF - 0.15);
      newInterval = Math.max(1, Math.round(currentInterval * 1.2));
      break;
      
    case 'good':
      // Normal: Standard interval, stable EF
      newEF = newEF; // No change
      newInterval = Math.max(1, Math.round(currentInterval * easeFactor));
      break;
      
    case 'easy':
      // Mastered: Extended interval, EF bonus
      newEF = Math.min(3.0, newEF + 0.15);
      newInterval = Math.max(1, Math.round(currentInterval * easeFactor * 1.3));
      break;
  }
  
  return { interval: newInterval, newEF: newEF };
}
```

#### Phrase-Specific Adjustments

For colloquial expressions (multi-word units), apply these modifiers:

1. **Initial Learning Steps:** Shorter than vocabulary (10m vs 1m)
   - Rationale: Phrases need immediate reinforcement to "chunk" as single unit
   
2. **Maximum Interval Cap:** 365 days (1 year)
   - Rationale: Slang/colloquial expressions may become outdated
   
3. **Lapse Penalty:** +0.1 EF penalty per lapse (cumulative)
   - Rationale: Phrase lapses indicate deeper encoding issues

---

### 1.4 Interval Progression Examples

#### Example 1: Easy Expression

| Review | Rating | Interval | EF | Due Date |
|--------|--------|----------|-----|----------|
| 1 (NEW) | Good | 3 days | 2.5 | +3d |
| 2 | Good | 8 days | 2.5 | +8d |
| 3 | Easy | 26 days | 2.65 | +26d |
| 4 | Good | 69 days | 2.65 | +69d |
| 5 | Easy | 120 days | 2.8 | +120d |

#### Example 2: Hard Expression

| Review | Rating | Interval | EF | Due Date |
|--------|--------|----------|-----|----------|
| 1 (NEW) | Hard | 1 day | 2.5 | +1d |
| 2 | Good | 3 days | 2.5 | +3d |
| 3 | Hard | 4 days | 2.35 | +4d |
| 4 | Again | 1 day | 2.15 | +1d (relearning) |
| 5 | Good | 3 days | 2.15 | +3d |
| 6 | Good | 6 days | 2.15 | +6d |

#### Example 3: Very Hard Expression (Multiple Lapses)

| Review | Rating | Interval | EF | Due Date |
|--------|--------|----------|-----|----------|
| 1 (NEW) | Again | 10 min | 2.5 | +10m |
| 2 | Again | 10 min | 2.5 | +10m |
| 3 | Good | 3 days | 2.5 | +3d |
| 4 | Again | 1 day | 2.3 | +1d (lapse 1) |
| 5 | Hard | 1 day | 2.15 | +1d |
| 6 | Again | 1 day | 2.0 | +1d (lapse 2) |
| 7 | Good | 2 days | 2.0 | +2d |

**Note:** Lapse count increases EF penalty, making future intervals shorter.

---

## 2. Daily Review Queue Logic

### 2.1 Queue Composition

Daily session consists of two queues:

```
┌─────────────────────────────────────┐
│         Daily Session Queue         │
├─────────────────────────────────────┤
│ 1. Review Queue (due cards)         │
│    - Cards with due date ≤ today    │
│    - Sorted by: due date (oldest)   │
│    - Limit: 15 cards max            │
├─────────────────────────────────────┤
│ 2. New Queue (new expressions)      │
│    - Cards with state = NEW         │
│    - Sorted by: random              │
│    - Limit: 5 cards max             │
└─────────────────────────────────────┘
Total: 20 cards max per session
```

**Why this ratio (15:5):**
- **15 reviews:** Ensure existing knowledge is maintained
- **5 new:** Gradual introduction without overwhelming
- **Total 20:** Fits in 2-5 minute commute session

### 2.2 Queue Selection Algorithm

```typescript
interface DailyQueue {
  reviews: Card[];    // Due cards (max 15)
  newCards: Card[];   // New cards (max 5)
  total: number;      // Total cards in session
}

function buildDailyQueue(
  allCards: Card[],
  dailyNewLimit: number = 5,
  dailyReviewLimit: number = 15
): DailyQueue {
  
  const now = Date.now();
  
  // 1. Get due cards (sorted by due date, oldest first)
  const dueCards = allCards
    .filter(card => 
      card.state !== 'NEW' && 
      card.due <= now &&
      card.state !== 'LEARNING' // Exclude learning cards (handled separately)
    )
    .sort((a, b) => a.due - b.due)
    .slice(0, dailyReviewLimit);
  
  // 2. Get new cards (random selection)
  const newCards = allCards
    .filter(card => card.state === 'NEW')
    .sort(() => Math.random() - 0.5) // Shuffle
    .slice(0, dailyNewLimit);
  
  // 3. Interleave: New cards after first 5 reviews
  // (Don't start with new cards - warm up with familiar ones)
  const queue: Card[] = [];
  let reviewIndex = 0;
  let newIndex = 0;
  
  for (let i = 0; i < dueCards.length + newCards.length; i++) {
    if (i < 5 && reviewIndex < dueCards.length) {
      // First 5: reviews only
      queue.push(dueCards[reviewIndex++]);
    } else if (newIndex < newCards.length && (i % 3 === 0)) {
      // Every 3rd card: inject new card
      queue.push(newCards[newIndex++]);
    } else if (reviewIndex < dueCards.length) {
      // Otherwise: reviews
      queue.push(dueCards[reviewIndex++]);
    } else if (newIndex < newCards.length) {
      // Remaining new cards
      queue.push(newCards[newIndex++]);
    }
  }
  
  return {
    reviews: dueCards,
    newCards: newCards,
    total: queue.length
  };
}
```

### 2.3 Learning Queue (In-Session)

Cards rated "Again" during the session enter a **learning queue**:

```typescript
interface LearningQueue {
  cards: Card[];           // Cards due within session
  nextReviewTime: number;  // When to show next learning card
}

function addToLearningQueue(card: Card): void {
  // Card will be shown again in 10 minutes
  card.state = 'LEARNING';
  card.due = Date.now() + (10 * 60 * 1000); // 10 minutes
  learningQueue.cards.push(card);
  
  // Persist to localStorage for app restart
  saveLearningQueueToStorage(learningQueue.cards);
}

function checkLearningQueue(): Card | null {
  const now = Date.now();
  const dueCard = learningQueue.cards.find(c => c.due <= now);
  
  if (dueCard) {
    // Remove from queue, will be re-added if rated "Again" again
    learningQueue.cards = learningQueue.cards.filter(c => c.id !== dueCard.id);
    saveLearningQueueToStorage(learningQueue.cards); // Persist update
    return dueCard;
  }
  
  return null; // No learning cards due yet
}

// Persist learning queue to localStorage
function saveLearningQueueToStorage(cards: Card[]): void {
  localStorage.setItem(STORAGE_KEYS.LEARNING_QUEUE, JSON.stringify(cards));
}

function loadLearningQueueFromStorage(): Card[] {
  const data = localStorage.getItem(STORAGE_KEYS.LEARNING_QUEUE);
  return data ? JSON.parse(data) : [];
}
```

**Learning Flow:**
1. User rates card "Again"
2. Card enters learning queue with 10-minute due time
3. After 10 minutes (or next session), card reappears
4. If rated "Good" or better, exits learning queue
5. If rated "Again" again, re-enters queue (cumulative penalty)

---

## 3. New Expression Introduction

### 3.1 New Card Limit Algorithm

```typescript
function calculateDailyNewLimit(
  currentStreak: number,
  unseenCount: number,  // Expressions not yet in SRS
  userPreference: 'conservative' | 'moderate' | 'aggressive'
): number {
  
  const baseLimits = {
    conservative: 3,
    moderate: 5,
    aggressive: 10
  };
  
  let limit = baseLimits[userPreference];
  
  // Streak bonus: +1 new card per 7-day streak (max +5)
  const streakBonus = Math.min(5, Math.floor(currentStreak / 7));
  limit += streakBonus;
  
  // Review load adjustment: If too many reviews pending, reduce new cards
  const pendingReviews = getPendingReviewCount();
  if (pendingReviews > 50) {
    limit = Math.max(1, limit - 2);
  } else if (pendingReviews > 30) {
    limit = Math.max(2, limit - 1);
  }
  
  // Never exceed 20% of unseen expressions
  const maxNew = Math.floor(unseenCount * 0.2);
  limit = Math.min(limit, maxNew);
  
  // Never introduce more than are available
  limit = Math.min(limit, unseenCount);
  
  return limit;
}
```

### 3.2 New Card Selection

When selecting new expressions to introduce:

```typescript
function selectNewExpressions(
  availableExpressions: Expression[],
  limit: number,
  recentlyViewed: Set<number>
): Expression[] {
  
  return availableExpressions
    // Exclude recently viewed (last 20 expressions)
    .filter(expr => !recentlyViewed.has(expr.id))
    // Exclude already in SRS (have card data)
    .filter(expr => !hasCardData(expr.id))
    // Random shuffle
    .sort(() => Math.random() - 0.5)
    // Take limit
    .slice(0, limit);
}
```

**Why exclude recently viewed:**
- Prevents "re-introducing" expressions user just saw in search
- Reduces cognitive interference
- Ensures fresh material

---

## 4. Overdue Card Handling

### 4.1 Missed Day Recovery

When user returns after missing days:

```typescript
function handleOverdueCards(cards: Card[]): { today: Card[]; rescheduled: Card[] } {
  const now = Date.now();
  
  const overdueCards = cards
    .filter(card => card.due < now && card.state !== 'NEW')
    .sort((a, b) => a.due - b.due); // Oldest first
  
  // Show at most 30 overdue cards per session
  const today = overdueCards.slice(0, 30);
  const rescheduled = overdueCards.slice(30).map((card, index) => {
    // Spread remaining over next 7 days
    const spreadDays = Math.floor(index / 10);
    return { ...card, due: now + (spreadDays * 24 * 60 * 60 * 1000) };
  });
  
  return { today, rescheduled };
}
```

### 4.2 Streak Forgiveness

Implement "streak freeze" mechanism:

```typescript
interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  streakFreezes: number;  // Max 2 freezes
  lastFreezeUsed: string | null;
}

function updateStreak(
  streakData: StreakData,
  today: string
): StreakData {
  
  const yesterday = getYesterday(today);
  const daysSinceLastActive = getDaysBetween(streakData.lastActiveDate, today);
  
  if (daysSinceLastActive === 0) {
    // Same day - no change
    return streakData;
  }
  
  if (daysSinceLastActive === 1) {
    // Consecutive day - increment streak
    return {
      ...streakData,
      currentStreak: streakData.currentStreak + 1,
      longestStreak: Math.max(streakData.longestStreak, streakData.currentStreak + 1),
      lastActiveDate: today
    };
  }
  
  if (daysSinceLastActive === 2 && streakData.streakFreezes > 0) {
    // Missed 1 day, use freeze
    return {
      ...streakData,
      streakFreezes: streakData.streakFreezes - 1,
      lastFreezeUsed: today,
      lastActiveDate: today
      // Streak continues!
    };
  }
  
  // Missed 2+ days or no freezes - streak breaks
  return {
    ...streakData,
    currentStreak: 1, // Reset to 1 (today counts)
    lastActiveDate: today,
    // Award a free freeze on streak break (consolation)
    streakFreezes: Math.min(2, streakData.streakFreezes + 1)
  };
}
```

---

## 5. Data Structures

### 5.1 Card Schema

```typescript
interface SRSCard {
  // Identity
  expressionId: number;        // References Expression.id
  
  // SRS State
  state: 'NEW' | 'LEARNING' | 'REVIEW' | 'RELEARNING';
  easeFactor: number;          // 1.3 - 3.0, initial 2.5
  interval: number;            // Days until next review
  due: number;                 // Timestamp when card is due
  repetitions: number;         // Successful reviews in a row
  lapses: number;              // Times rated "Again"
  
  // History
  lastReview: number | null;   // Timestamp of last review
  reviewCount: number;         // Total reviews ever
  
  // Metadata
  createdAt: number;           // When card was created
  updatedAt: number;           // Last modification
}
```

### 5.2 User Progress Schema

```typescript
interface UserProgress {
  // Streak
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string;    // YYYY-MM-DD
    freezes: number;           // 0-2
    lastFreezeUsed: string | null;
  };
  
  // Daily Stats
  today: {
    date: string;              // YYYY-MM-DD
    reviewed: number;          // Expressions reviewed today
    newIntroduced: number;     // New expressions introduced
    xpEarned: number;          // XP earned today
  };
  
  // Lifetime Stats
  lifetime: {
    totalReviews: number;
    totalExpressionsLearned: number;
    totalXP: number;
    level: number;
    accuracy: number;          // Percentage of Good/Easy ratings
  };
  
  // Settings
  settings: {
    dailyNewLimit: number;     // 1-20, default 5
    dailyReviewLimit: number;  // 10-50, default 15
    notificationTime: string;  // HH:MM format
    enableNotifications: boolean;
  };
}
```

### 5.3 localStorage Keys

```typescript
const STORAGE_KEYS = {
  // SRS Cards
  CARDS: 'col_eng_srs_cards',
  CARD_INDEX: 'col_eng_card_index', // expressionId → card lookup
  
  // User Progress
  PROGRESS: 'col_eng_progress',
  
  // Session State
  SESSION: 'col_eng_session',
  CURRENT_CARD_INDEX: 'col_eng_current_card',
  LEARNING_QUEUE: 'col_eng_learning_queue',
  
  // Settings
  SETTINGS: 'col_eng_settings',
  
  // Sync
  LAST_SYNC: 'col_eng_last_sync',
  PENDING_REVIEWS: 'col_eng_pending_reviews' // For offline → Firebase sync
} as const;
```

---

## 6. Firebase Sync Schema

### 6.1 Firestore Document Structure

```
users/
  {userId}/
    progress: UserProgress
    cards/
      {expressionId}: SRSCard
```

### 6.2 Sync Strategy

**Offline-first with periodic sync:**

```typescript
class SRSSyncManager {
  private syncInterval: NodeJS.Timeout | null = null;
  private pendingChanges: Map<number, SRSCard> = new Map();
  
  // Sync every 5 minutes if online
  startPeriodicSync(): void {
    this.syncInterval = setInterval(async () => {
      if (navigator.onLine && this.pendingChanges.size > 0) {
        await this.syncToFirebase();
      }
    }, 5 * 60 * 1000); // 5 minutes
  }
  
  // Sync on app close/background
  async syncOnExit(): Promise<void> {
    if (this.pendingChanges.size > 0) {
      await this.syncToFirebase();
    }
  }
  
  // Merge strategy: last-write-wins
  async syncToFirebase(): Promise<void> {
    const batch = writeBatch(db);
    
    for (const [expressionId, card] of this.pendingChanges) {
      const cardRef = doc(db, `users/${userId}/cards`, String(expressionId));
      batch.set(cardRef, card, { merge: true });
    }
    
    await batch.commit();
    this.pendingChanges.clear();
  }
  
  // Track changes
  markDirty(expressionId: number, card: SRSCard): void {
    this.pendingChanges.set(expressionId, card);
  }
  
  // Sync UserProgress (streak, XP, settings)
  async syncProgress(progress: UserProgress): Promise<void> {
    const progressRef = doc(db, `users/${userId}/progress`);
    await setDoc(progressRef, progress, { merge: true });
  }
}
```

---

## 7. Performance Optimizations

### 7.1 Card Loading

**Lazy loading strategy:**

```typescript
// Don't load all 1,500 cards at once
// Load only today's queue (20 cards)

function loadDailyCards(): SRSCard[] {
  const allCards = loadAllCardsFromStorage(); // ~1,500 cards
  
  // 1. Load persisted learning queue
  const learningQueue = loadLearningQueueFromStorage();
  const learningDue = learningQueue.filter(c => c.due <= Date.now());
  
  // 2. Build review queue (excluding learning cards)
  const dueCards = allCards
    .filter(c => c.due <= Date.now() && c.state !== 'NEW' && c.state !== 'LEARNING');
  const newCards = allCards.filter(c => c.state === 'NEW');
  
  // 3. Combine: learning cards first, then review queue
  const queue = [...learningDue, ...buildDailyQueue(dueCards, newCards)];
  
  return queue;
}
```

### 7.2 Memory Management

**Card data compression:**

```typescript
// Store cards in compressed format
interface CompressedCard {
  e: number;  // expressionId
  s: string;  // state (N/L/R/RL = NEW/LEARNING/REVIEW/RELEARNING)
  ef: number; // easeFactor (rounded to 2 decimals)
  i: number;  // interval (days)
  d: number;  // due (timestamp / 1000, stored as seconds)
  r: number;  // repetitions
  l: number;  // lapses
  lr: number; // lastReview (timestamp / 1000)
  rc: number; // reviewCount
}

function compressCard(card: SRSCard): CompressedCard {
  const stateMap: Record<SRSCard['state'], string> = {
    'NEW': 'N',
    'LEARNING': 'L',
    'REVIEW': 'R',
    'RELEARNING': 'RL'
  };
  
  return {
    e: card.expressionId,
    s: stateMap[card.state],
    ef: Math.round(card.easeFactor * 100) / 100,
    i: card.interval,
    d: Math.floor(card.due / 1000),
    r: card.repetitions,
    l: card.lapses,
    lr: card.lastReview ? Math.floor(card.lastReview / 1000) : 0,
    rc: card.reviewCount
  };
}

function decompressCard(compressed: CompressedCard): SRSCard {
  const stateMap: Record<string, SRSCard['state']> = {
    'N': 'NEW',
    'L': 'LEARNING',
    'R': 'REVIEW',
    'RL': 'RELEARNING'
  };
  
  return {
    expressionId: compressed.e,
    state: stateMap[compressed.s] || 'NEW',
    easeFactor: compressed.ef,
    interval: compressed.i,
    due: compressed.d * 1000,
    repetitions: compressed.r,
    lapses: compressed.l,
    lastReview: compressed.lr > 0 ? compressed.lr * 1000 : null,
    reviewCount: compressed.rc,
    createdAt: 0,
    updatedAt: 0,
    lastRating: null
  };
}
```

**Storage savings:**
- Uncompressed: ~200 bytes per card × 1,500 cards = **300 KB**
- Compressed: ~60 bytes per card × 1,500 cards = **90 KB**
- **Savings: 70% reduction**

---

## 8. Edge Cases

### 8.1 All Cards Due Today

**Scenario:** User returns after 30+ days, thousands of cards due.

**Solution:** Cap daily review limit, spread across multiple days:

```typescript
function handleOverdueBacklog(
  dueCards: SRSCard[],
  dailyReviewLimit: number
): { today: SRSCard[]; remaining: SRSCard[] } {
  
  // Sort by overdue amount (oldest first)
  const sorted = dueCards.sort((a, b) => a.due - b.due);
  
  // Take only daily limit
  const today = sorted.slice(0, dailyReviewLimit);
  const remaining = sorted.slice(dailyReviewLimit);
  
  // Reschedule remaining to spread over next 7 days
  remaining.forEach((card, index) => {
    const spreadDays = Math.floor(index / dailyReviewLimit);
    card.due = Date.now() + (spreadDays * 24 * 60 * 60 * 1000);
  });
  
  return { today, remaining };
}
```

### 8.2 No Expressions Loaded Yet

**Scenario:** Fresh install, no cards in localStorage.

**Solution:** Initialize with first 20 expressions:

```typescript
function initializeNewUser(allExpressions: Expression[]): SRSCard[] {
  // Take first 20 expressions as "starter deck"
  return allExpressions.slice(0, 20).map(expr => ({
    expressionId: expr.id,
    state: 'NEW' as const,
    easeFactor: 2.5,
    interval: 0,
    due: Date.now(),
    repetitions: 0,
    lapses: 0,
    lastReview: null,
    reviewCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    lastRating: null
  }));
}
```

### 8.3 Expression Deleted from Firestore

**Scenario:** Admin removes an expression that user has in SRS.

**Solution:** Graceful degradation:

```typescript
function validateCardAgainstExpressions(
  cards: SRSCard[],
  availableExpressions: Expression[]
): SRSCard[] {
  
  const availableIds = new Set(availableExpressions.map(e => e.id));
  
  return cards.filter(card => {
    if (!availableIds.has(card.expressionId)) {
      console.warn(`Card ${card.expressionId} not found in expressions, removing.`);
      return false;
    }
    return true;
  });
}
```

---

## 9. Testing Scenarios

### 9.1 Unit Tests

```typescript
describe('SRS Algorithm', () => {
  test('calculateReviewInterval: Good rating increases interval', () => {
    const result = calculateReviewInterval(10, 2.5, 'good', 0);
    expect(result.interval).toBe(25); // 10 * 2.5
  });
  
  test('calculateReviewInterval: Again rating resets to 1 day', () => {
    const result = calculateReviewInterval(100, 2.5, 'again', 0);
    expect(result.interval).toBe(1);
  });
  
  test('calculateReviewInterval: EF never goes below 1.3', () => {
    let ef = 2.5;
    for (let i = 0; i < 20; i++) {
      const result = calculateReviewInterval(10, ef, 'again', i);
      ef = result.newEF;
    }
    expect(ef).toBeGreaterThanOrEqual(1.3);
  });
});

describe('Daily Queue', () => {
  test('buildDailyQueue: Returns max 15 reviews + 5 new', () => {
    const queue = buildDailyQueue(mockCards, 5, 15);
    expect(queue.reviews.length).toBeLessThanOrEqual(15);
    expect(queue.newCards.length).toBeLessThanOrEqual(5);
  });
  
  test('buildDailyQueue: Interleaves new cards after first 5', () => {
    const queue = buildDailyQueue(mockCards, 5, 15);
    // First 5 should be reviews only
    expect(queue[0].state).not.toBe('NEW');
    expect(queue[4].state).not.toBe('NEW');
  });
});
```

### 9.2 Integration Tests

```typescript
describe('Full Review Session', () => {
  test('Complete session updates card states correctly', async () => {
    // Load 20 cards
    const cards = loadDailyCards();
    
    // Simulate reviews
    for (const card of cards) {
      const rating = Math.random() > 0.3 ? 'good' : 'again';
      reviewCard(card, rating);
    }
    
    // Verify cards updated
    const updatedCards = loadAllCards();
    const reviewedCards = updatedCards.filter(c => c.reviewCount > 0);
    expect(reviewedCards.length).toBe(20);
  });
});
```

---

## 10. Future Enhancements

### 10.1 FSRS Integration (Optional)

For users who want more advanced scheduling, FSRS can be integrated as an alternative algorithm.

**Key Concepts:**
- **Difficulty (D):** Per-card difficulty rating (1-10), learned from review history
- **Stability (S):** Days until retention drops to 90%
- **Retrievability (R):** Current probability of recall (0-1)

**Implementation Note:** Full FSRS requires the [FSRS TypeScript library](https://github.com/open-spaced-repetition/fsrs) which handles the ML optimization internally. Do not attempt to implement FSRS manually.

**When to Consider:**
- After 500+ reviews (need sufficient history for ML optimization)
- When users report SM-2 intervals feel too long/short
- As a premium feature for advanced users

**Not implementing now** because:
- SM-2 Phrase Variant is sufficient for initial launch
- FSRS requires more compute (battery impact on mobile)
- Simpler debugging and maintenance

### 10.2 Adaptive Difficulty

Automatically adjust new card introduction based on retention:

```typescript
function calculateOptimalNewLimit(userHistory: ReviewHistory): number {
  const recentAccuracy = userHistory.last20Reviews.filter(r => 
    r.rating === 'good' || r.rating === 'easy'
  ).length / 20;
  
  if (recentAccuracy > 0.9) {
    return Math.min(10, userHistory.settings.dailyNewLimit + 1);
  } else if (recentAccuracy < 0.7) {
    return Math.max(1, userHistory.settings.dailyNewLimit - 1);
  }
  
  return userHistory.settings.dailyNewLimit;
}
```

---

## Appendix A: Algorithm Comparison

| Feature | SM-2 Original | Our SM-2 Phrase Variant | FSRS |
|---------|---------------|-------------------------|------|
| **Complexity** | Low | Low | High (ML) |
| **Phrase Optimization** | No | Yes (shorter initial steps) | Implicit (learned) |
| **Ease Factor** | Global | Global + phrase penalty | Per-card difficulty |
| **Interval Calculation** | Heuristic | Heuristic + caps | Mathematical model |
| **Offline Support** | Yes | Yes | Yes |
| **Battery Usage** | Minimal | Minimal | Moderate (ML inference) |
| **Recommendation** | ✅ | ✅ (our choice) | Phase 2 |

---

## Appendix B: References

1. **SM-2 Algorithm:** SuperMemo - [super-memory.com/english/ol/sm2.htm](https://super-memory.com/english/ol/sm2.htm)
2. **FSRS Algorithm:** GitHub - [open-spaced-repetition/fsrs](https://github.com/open-spaced-repetition/fsrs)
3. **FSRS Analysis:** Expertium Blog - [expertium.github.io/Algorithm.html](https://expertium.github.io/Algorithm.html)
4. **Memory Research:** Ebbinghaus Forgetting Curve studies
5. **Language Learning SRS:** Anki documentation, Duolingo research papers

---

*This specification will be updated as implementation progresses and user testing feedback is gathered.*
