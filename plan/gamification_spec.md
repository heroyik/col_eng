# Gamification System Specification: Colloquial English Expressions

**Project:** COL_ENG (Colloquial English)
**Date:** 2026-06-09
**Status:** Specification
**Goal:** Design engaging gamification system optimized for daily commute learning sessions

---

## Executive Summary

This specification defines a gamification system for the COL_ENG SRS learning app, designed to drive daily retention through **streaks**, **XP progression**, **badge achievements**, and **progress visualization**. The system balances motivation with anxiety reduction, leveraging loss aversion while providing forgiveness mechanisms.

**Key Design Decisions:**
- **XP System:** Simple, transparent formula with clear earning paths
- **Level Progression:** Moderate curve (not too fast, not too grindy)
- **Streaks:** Freeze + repair mechanisms to reduce anxiety
- **Badges:** Mix of quantity-based and meaningful milestones
- **Progress:** Heat maps + mastery indicators (not just counters)
- **Daily Goals:** Flexible targets (5/10/20 expressions/day)

---

## 1. XP (Experience Points) System

### 1.1 XP Earning Sources

| Action | XP Amount | Frequency | Rationale |
|--------|-----------|-----------|-----------|
| **Review expression (Good/Hard)** | +10 XP | Per review | Core learning activity |
| **Review expression (Easy)** | +15 XP | Per review | Bonus for mastery |
| **Review expression (Again)** | +0 XP | Per review | Failed recall, no XP |
| **Introduce new expression** | +20 XP | Per new card | Reward for learning new material |
| **Complete daily goal** | +50 XP | Once/day | Achievement reinforcement |
| **Maintain streak** | +10 XP × streak days | Daily | Streak multiplier bonus |
| **Perfect session (all Good/Easy)** | +25 XP | Per session | Accuracy bonus |
| **Review streak bonus (5+ reviews)** | +5 XP | Per 5 reviews | Batch review reward |

### 1.2 XP Calculation Formula

```typescript
function calculateSessionXP(
  reviews: Review[],
  isNewCard: boolean,
  dailyXPAlreadyEarned: number
): SessionXP {
  let baseXP = 0;
  let bonusXP = 0;
  let streakBonus = 0;
  
  // Base XP from reviews
  reviews.forEach(review => {
    switch (review.rating) {
      case 'easy':
        baseXP += 15;
        break;
      case 'good':
        baseXP += 10;
        break;
      case 'hard':
        baseXP += 10;
        break;
      case 'again':
        baseXP += 0;
        break;
    }
  });
  
  // New expression bonus
  if (isNewCard) {
    baseXP += 20;
  }
  
  // Perfect session bonus (no 'Again' ratings)
  const hasLapses = reviews.some(r => r.rating === 'again');
  if (!hasLapses && reviews.length >= 5) {
    bonusXP += 25;
  }
  
  // Review streak bonus (every 5 reviews)
  const reviewBonusCount = Math.floor(reviews.length / 5);
  bonusXP += reviewBonusCount * 5;
  
  // Daily streak bonus (once per day, not per session)
  const streakDays = getStreakDays();
  const todayAlreadyGotStreakBonus = dailyXPAlreadyEarned > 0 && hasStreakBonusToday();
  if (!todayAlreadyGotStreakBonus) {
    streakBonus = Math.min(50, streakDays * 10); // Max 50 XP streak bonus
  }
  
  // Calculate total
  let total = baseXP + bonusXP + streakBonus;
  
  // Enforce daily XP limit
  const dailyLimit = getDailyXPLimit(getUserGoalPreference());
  const remainingDailyXP = Math.max(0, dailyLimit - dailyXPAlreadyEarned);
  total = Math.min(total, remainingDailyXP);
  
  return {
    base: baseXP,
    bonus: bonusXP,
    streak: streakBonus,
    total,
    cappedByDailyLimit: total < (baseXP + bonusXP + streakBonus),
  };
}

interface SessionXP {
  base: number;      // XP from reviews
  bonus: number;     // XP from bonuses
  streak: number;    // XP from streak bonus
  total: number;     // Total XP earned (capped by daily limit)
  cappedByDailyLimit: boolean; // Whether XP was capped
}
```

### 1.3 Daily XP Limits

To prevent unhealthy binge sessions:

```typescript
const DAILY_XP_LIMITS = {
  casual: 200,      // ~20 reviews
  moderate: 400,    // ~40 reviews
  intensive: 600,   // ~60 reviews
};

function getDailyXPLimit(userPreference: 'casual' | 'moderate' | 'intensive'): number {
  return DAILY_XP_LIMITS[userPreference];
}

function isDailyXPLimitReached(todayXP: number, limit: number): boolean {
  return todayXP >= limit;
}
```

**Rationale:** Prevents "XP farming" that doesn't align with learning goals. Users can still review, but won't earn XP beyond daily limit.

---

## 2. Level Progression System

### 2.1 Level Table

```typescript
const LEVEL_TABLE: LevelConfig[] = [
  // Level 1-10: Beginner (1-2 weeks)
  { level: 1, xpRequired: 0, title: 'Beginner', badge: '🌱' },
  { level: 2, xpRequired: 100, title: 'Learner', badge: '📚' },
  { level: 3, xpRequired: 300, title: 'Student', badge: '✏️' },
  { level: 4, xpRequired: 600, title: 'Explorer', badge: '🗺️' },
  { level: 5, xpRequired: 1000, title: 'Adventurer', badge: '🎒' },
  { level: 6, xpRequired: 1500, title: 'Scholar', badge: '🎓' },
  { level: 7, xpRequired: 2100, title: 'Practitioner', badge: '💼' },
  { level: 8, xpRequired: 2800, title: 'Expert', badge: '🎯' },
  { level: 9, xpRequired: 3600, title: 'Specialist', badge: '🔬' },
  { level: 10, xpRequired: 4500, title: 'Master', badge: '🏆' },
  
  // Level 11-20: Intermediate (1-2 months)
  { level: 11, xpRequired: 5500, title: 'Linguist', badge: '🗣️' },
  { level: 12, xpRequired: 6600, title: 'Wordsmith', badge: '✍️' },
  { level: 13, xpRequired: 7800, title: 'Conversationalist', badge: '💬' },
  { level: 14, xpRequired: 9100, title: 'Fluent', badge: '🌊' },
  { level: 15, xpRequired: 10500, title: 'Articulate', badge: '📢' },
  { level: 16, xpRequired: 12000, title: 'Eloquent', badge: '🎤' },
  { level: 17, xpRequired: 13600, title: 'Orator', badge: '🗣️' },
  { level: 18, xpRequired: 15300, title: 'Diplomat', badge: '🤝' },
  { level: 19, xpRequired: 17100, title: 'Negotiator', badge: '⚖️' },
  { level: 20, xpRequired: 19000, title: 'Strategist', badge: '♟️' },
  
  // Level 21-30: Advanced (3-6 months)
  { level: 21, xpRequired: 21000, title: 'Virtuoso', badge: '🎭' },
  { level: 22, xpRequired: 23100, title: 'Maestro', badge: '🎼' },
  { level: 23, xpRequired: 25300, title: 'Sage', badge: '🦉' },
  { level: 24, xpRequired: 27600, title: 'Savant', badge: '🧩' },
  { level: 25, xpRequired: 30000, title: 'Genius', badge: '💡' },
  { level: 26, xpRequired: 32500, title: 'Prodigy', badge: '⚡' },
  { level: 27, xpRequired: 35100, title: 'Visionary', badge: '🔮' },
  { level: 28, xpRequired: 37800, title: 'Luminary', badge: '🌟' },
  { level: 29, xpRequired: 40600, title: 'Icon', badge: '👑' },
  { level: 30, xpRequired: 43500, title: 'Legend', badge: '🏅' },
  
  // Level 31-50: Expert (6-12 months)
  { level: 31, xpRequired: 46500, title: 'Transcendent', badge: '🚀' },
  { level: 32, xpRequired: 49600, title: 'Celestial', badge: '🌌' },
  { level: 33, xpRequired: 52800, title: 'Divine', badge: '✨' },
  { level: 34, xpRequired: 56100, title: 'Ethereal', badge: '🌈' },
  { level: 35, xpRequired: 59500, title: 'Mythical', badge: '🐉' },
  { level: 36, xpRequired: 63000, title: 'Legendary', badge: '⚡' },
  { level: 37, xpRequired: 66600, title: 'Immortal', badge: '♾️' },
  { level: 38, xpRequired: 70300, title: 'Cosmic', badge: '🪐' },
  { level: 39, xpRequired: 74100, title: 'Infinite', badge: '∞' },
  { level: 40, xpRequired: 78000, title: 'Omniscient', badge: '🧠' },
];

interface LevelConfig {
  level: number;
  xpRequired: number;
  title: string;
  badge: string;
}
```

### 2.2 XP Curve Analysis

| Level Range | XP to Next Level | Total XP | Time to Level (at 200 XP/day) |
|-------------|------------------|----------|-------------------------------|
| 1-10 | 100 → 900 | 4,500 | ~22 days |
| 11-20 | 1,100 → 1,900 | 14,500 | ~72 days |
| 21-30 | 2,100 → 2,900 | 24,500 | ~122 days |
| 31-40 | 3,100 → 3,900 | 34,500 | ~172 days |

**Curve Design Rationale:**
- **Levels 1-10:** Quick progression to hook new users (2-3 weeks)
- **Levels 11-20:** Moderate grind, rewards consistent learners (2-3 months)
- **Levels 21-30:** Slower progression, demonstrates mastery (3-6 months)
- **Levels 31-40:** Prestige levels, for dedicated power users (6-12 months)

### 2.3 Level-Up Mechanics

```typescript
function checkLevelUp(currentXP: number, currentLevel: number): LevelUpResult | null {
  const nextLevelConfig = LEVEL_TABLE.find(l => l.level === currentLevel + 1);
  
  if (!nextLevelConfig) {
    // Max level reached
    return null;
  }
  
  if (currentXP >= nextLevelConfig.xpRequired) {
    return {
      newLevel: nextLevelConfig.level,
      newTitle: nextLevelConfig.title,
      newBadge: nextLevelConfig.badge,
      xpToNext: currentLevel + 2 <= 40 
        ? LEVEL_TABLE.find(l => l.level === currentLevel + 2)?.xpRequired - currentXP ?? 0
        : 0,
    };
  }
  
  return null;
}

interface LevelUpResult {
  newLevel: number;
  newTitle: string;
  newBadge: string;
  xpToNext: number;
}
```

---

## 3. Streak System

### 3.1 Streak Mechanics

```typescript
interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;        // YYYY-MM-DD
  streakFreezes: number;         // 0-5 (earned through milestones)
  streakRepairs: number;         // 0-3 (earned through milestones)
  lastFreezeUsed: string | null; // YYYY-MM-DD
  lastRepairUsed: string | null; // YYYY-MM-DD
  preBreakStreak?: number;       // Streak value before break (for repair)
  isPaused: boolean;             // Whether streak is paused
  pauseStartDate?: string;       // YYYY-MM-DD
  pauseEndDate?: string;         // YYYY-MM-DD
}

function updateStreak(
  streakData: StreakData,
  today: string
): StreakUpdateResult {
  
  const daysSinceLastActive = getDaysBetween(streakData.lastActiveDate, today);
  
  // Same day - no change
  if (daysSinceLastActive === 0) {
    return { ...streakData, updated: false };
  }
  
  // Consecutive day - increment streak
  if (daysSinceLastActive === 1) {
    const newStreak = streakData.currentStreak + 1;
    return {
      ...streakData,
      currentStreak: newStreak,
      longestStreak: Math.max(streakData.longestStreak, newStreak),
      lastActiveDate: today,
      updated: true,
      event: 'streak_increment',
    };
  }
  
  // Missed 1 day - check for freeze
  if (daysSinceLastActive === 2 && streakData.streakFreezes > 0) {
    return {
      ...streakData,
      streakFreezes: streakData.streakFreezes - 1,
      lastFreezeUsed: today,
      lastActiveDate: today,
      updated: true,
      event: 'streak_freeze_used',
    };
  }
  
  // Missed 2+ days or no freezes - streak breaks
  return {
    ...streakData,
    currentStreak: 1, // Reset to 1 (today counts)
    lastActiveDate: today,
    streakFreezes: Math.min(2, streakData.streakFreezes + 1), // Consolation freeze
    updated: true,
    event: 'streak_broken',
    // Store pre-break streak for potential repair
    preBreakStreak: streakData.currentStreak,
  };
}

interface StreakUpdateResult extends StreakData {
  updated: boolean;
  event?: 'streak_increment' | 'streak_freeze_used' | 'streak_broken';
}
```

### 3.2 Streak Freeze Mechanics

**How Freezes Work:**
1. User starts with **0 freezes**
2. Earn freezes through milestones:
   - 7-day streak → earn 1 freeze
   - 30-day streak → earn 2 freezes
   - 100-day streak → earn 3 freezes
   - 365-day streak → earn 5 freezes
3. Maximum freeze count: **5**
4. Freezes are used **automatically** when user misses a day
5. Freezes are **consumed** (not equipped like Duolingo)

**Why Automatic (Not Equipped):**
- Reduces cognitive load (no need to "remember to equip")
- Prevents anxiety about "wasting" freezes
- More forgiving for casual users

### 3.3 Streak Repair Mechanics

**How Repairs Work:**
1. User starts with **0 repairs**
2. Earn repairs through milestones:
   - 50-day streak → earn 1 repair
   - 100-day streak → earn 1 repair
   - 200-day streak → earn 2 repairs
   - 365-day streak → earn 3 repairs
3. Repairs are **manual** (user chooses to use one)
4. Repairs restore streak to **before it broke**
5. Maximum repair count: **3**

**Repair Flow:**
```typescript
function useStreakRepair(
  streakData: StreakData,
  brokenDate: string
): StreakUpdateResult | null {
  
  if (streakData.streakRepairs <= 0) {
    return null; // No repairs available
  }
  
  // Restore to pre-break streak value
  const restoredStreak = streakData.preBreakStreak ?? streakData.currentStreak;
  
  return {
    ...streakData,
    currentStreak: restoredStreak,
    longestStreak: Math.max(streakData.longestStreak, restoredStreak),
    streakRepairs: streakData.streakRepairs - 1,
    lastRepairUsed: brokenDate,
    lastActiveDate: streakData.lastActiveDate, // Keep original active date
    preBreakStreak: undefined, // Clear after repair
    updated: true,
    event: 'streak_repaired',
  };
}
```

### 3.4 Streak Milestones & Rewards

| Streak | Reward | Rationale |
|--------|--------|-----------|
| 3 days | +50 XP | Early momentum |
| 7 days | +100 XP, 1 Freeze | First week achievement |
| 14 days | +200 XP | Two-week commitment |
| 30 days | +500 XP, 2 Freezes, 1 Repair | Monthly milestone |
| 50 days | +1000 XP, 1 Repair | Major commitment |
| 100 days | +2000 XP, 3 Freezes, 1 Repair | Century club |
| 200 days | +5000 XP, 2 Repairs | Elite streak |
| 365 days | +10000 XP, 5 Freezes, 3 Repairs | Year-long mastery |

### 3.5 Streak Anxiety Mitigation

**Design Strategies:**

1. **Automatic Freezes:** No need to "equip" - reduces decision fatigue
2. **Consolation Freezes:** Get 1 freeze when streak breaks (softens blow)
3. **Weekly Goals Alternative:** Allow "4 days/week" as alternative to daily
4. **Streak Pause:** Can "pause" streak for up to 7 days (preserves streak)
5. **Recovery Focus:** "You were at 99%! Start fresh and beat your record"

```typescript
interface StreakPause {
  isPaused: boolean;
  pauseStartDate: string | null;
  pauseEndDate: string | null;
  maxPauseDays: number;
}

function startStreakPause(
  streakData: StreakData,
  pauseDays: number = 7
): StreakData {
  return {
    ...streakData,
    isPaused: true,
    pauseStartDate: new Date().toISOString().split('T')[0],
    pauseEndDate: addDays(new Date().toISOString().split('T')[0], pauseDays),
  };
}

function pauseStreak(
  streakData: StreakData
): StreakData {
  
  if (!streakData.isPaused || !streakData.pauseStartDate) {
    return streakData;
  }
  
  const pauseDays = getDaysBetween(streakData.pauseStartDate, new Date().toISOString().split('T')[0]);
  
  if (pauseDays > 7) {
    // Pause expired, streak breaks
    return {
      ...streakData,
      isPaused: false,
      pauseStartDate: undefined,
      pauseEndDate: undefined,
      currentStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
  }
  
  // Pause still active, streak preserved
  return streakData;
}
```

---

## 4. Badge/Achievement System

### 4.1 Badge Categories

#### Category 1: Expression Mastery (Quantity)

| Badge | Icon | Requirement | XP Bonus |
|-------|------|-------------|----------|
| First Steps | 👣 | Review 1 expression | +10 XP |
| Getting Started | 🌱 | Review 10 expressions | +25 XP |
| Vocabulary Builder | 🧱 | Review 50 expressions | +100 XP |
| Word Collector | 📚 | Review 100 expressions | +200 XP |
| Expression Expert | 🎓 | Review 500 expressions | +500 XP |
| Vocabulary Master | 🏆 | Review 1000 expressions | +1000 XP |
| Lexicon Legend | 📖 | Review 1500 expressions (all) | +2000 XP |

#### Category 2: Streak Achievements

| Badge | Icon | Requirement | XP Bonus |
|-------|------|-------------|----------|
| On Fire | 🔥 | 3-day streak | +50 XP |
| Week Warrior | ⚔️ | 7-day streak | +100 XP |
| Fortnight Fighter | 🛡️ | 14-day streak | +200 XP |
| Monthly Master | 📅 | 30-day streak | +500 XP |
| Half Century | 💯 | 50-day streak | +1000 XP |
| Century Club | 🎯 | 100-day streak | +2000 XP |
| Year Legend | 👑 | 365-day streak | +10000 XP |

#### Category 3: Accuracy Achievements

| Badge | Icon | Requirement | XP Bonus |
|-------|------|-------------|----------|
| Sharpshooter | 🎯 | 90%+ accuracy in session | +25 XP |
| Perfectionist | ✨ | 100% accuracy in session (10+ reviews) | +50 XP |
| Consistent Learner | 📊 | 85%+ accuracy over 100 reviews | +200 XP |
| Accuracy Ace | 🥇 | 90%+ accuracy over 500 reviews | +500 XP |

#### Category 4: Speed Achievements

| Badge | Icon | Requirement | XP Bonus |
|-------|------|-------------|----------|
| Quick Draw | ⚡ | Complete session in <2 minutes | +25 XP |
| Speed Demon | 💨 | Complete 20 reviews in <5 minutes | +50 XP |
| Express Lane | 🚀 | Complete 50 reviews in <10 minutes | +100 XP |

#### Category 5: Special Achievements

| Badge | Icon | Requirement | XP Bonus |
|-------|------|-------------|----------|
| Weekend Warrior | 🎪 | Study on both Saturday and Sunday | +50 XP |
| Consistent Learner | 📅 | Study 5+ days in a week | +100 XP |
| Comeback Kid | 🔄 | Return after 7+ day break | +100 XP |
| Perfect Week | 🌟 | Complete daily goal every day for 7 days | +200 XP |
| Streak Saver | 🧊 | Use a streak freeze | +25 XP |
| Phoenix Rising | 🔥 | Use a streak repair | +100 XP |

### 4.2 Badge Unlock Logic

```typescript
interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'expression' | 'streak' | 'accuracy' | 'speed' | 'special';
  requirement: string;
  xpBonus: number;
  unlockedAt?: string; // ISO date
}

function checkBadgeUnlocks(
  userStats: UserStats,
  sessionStats: SessionStats
): Badge[] {
  
  const newBadges: Badge[] = [];
  
  // Expression badges
  if (userStats.totalReviews >= 1 && !hasBadge('first_steps')) {
    newBadges.push(BADGES.first_steps);
  }
  if (userStats.totalReviews >= 10 && !hasBadge('getting_started')) {
    newBadges.push(BADGES.getting_started);
  }
  // ... more expression badges
  
  // Streak badges
  if (userStats.currentStreak >= 3 && !hasBadge('on_fire')) {
    newBadges.push(BADGES.on_fire);
  }
  // ... more streak badges
  
  // Accuracy badges
  if (sessionStats.accuracy >= 0.9 && sessionStats.totalReviews >= 5 && !hasBadge('sharpshooter')) {
    newBadges.push(BADGES.sharpshooter);
  }
  // ... more accuracy badges
  
  // Speed badges
  if (sessionStats.duration < 60 && sessionStats.totalReviews >= 5 && !hasBadge('quick_draw')) {
    newBadges.push(BADGES.quick_draw);
  }
  // ... more speed badges
  
  return newBadges;
}

function hasBadge(badgeId: string): boolean {
  const unlockedBadges = loadUnlockedBadges();
  return unlockedBadges.some(b => b.id === badgeId);
}
```

### 4.3 Badge Display

```typescript
interface BadgeDisplayProps {
  badge: Badge;
  isUnlocked: boolean;
  unlockedAt?: string;
}

function BadgeDisplay({ badge, isUnlocked, unlockedAt }: BadgeDisplayProps) {
  return (
    <div className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
      <span className="badge-icon">{badge.icon}</span>
      <span className="badge-name">{badge.name}</span>
      {isUnlocked && unlockedAt && (
        <span className="badge-date">
          Unlocked {formatDate(unlockedAt)}
        </span>
      )}
      {!isUnlocked && (
        <span className="badge-requirement">
          {badge.requirement}
        </span>
      )}
    </div>
  );
}
```

---

## 5. Daily Goals System

### 5.1 Goal Options

```typescript
type DailyGoal = 'casual' | 'moderate' | 'intensive';

const DAILY_GOALS: Record<DailyGoal, DailyGoalConfig> = {
  casual: {
    target: 5,
    label: 'Casual',
    description: '5 expressions/day',
    icon: '🌱',
    xpMultiplier: 1.0,
  },
  moderate: {
    target: 10,
    label: 'Moderate',
    description: '10 expressions/day',
    icon: '📚',
    xpMultiplier: 1.2,
  },
  intensive: {
    target: 20,
    label: 'Intensive',
    description: '20 expressions/day',
    icon: '🔥',
    xpMultiplier: 1.5,
  },
};

interface DailyGoalConfig {
  target: number;
  label: string;
  description: string;
  icon: string;
  xpMultiplier: number;
}
```

### 5.2 Goal Completion Logic

```typescript
function checkDailyGoalCompletion(
  reviewsToday: number,
  goal: DailyGoal
): GoalCompletionResult {
  
  const config = DAILY_GOALS[goal];
  const isComplete = reviewsToday >= config.target;
  const progress = Math.min(1, reviewsToday / config.target);
  
  return {
    isComplete,
    progress,
    reviewsDone: reviewsToday,
    reviewsNeeded: Math.max(0, config.target - reviewsToday),
    xpMultiplier: isComplete ? config.xpMultiplier : 1.0,
  };
}

interface GoalCompletionResult {
  isComplete: boolean;
  progress: number;        // 0-1
  reviewsDone: number;
  reviewsNeeded: number;
  xpMultiplier: number;
}
```

### 5.3 Goal Adjustment

Users can change their daily goal, but with safeguards:

```typescript
function canChangeGoal(
  currentGoal: DailyGoal,
  newGoal: DailyGoal,
  streakDays: number
): { allowed: boolean; reason?: string } {
  
  // Can always increase goal
  const goalOrder = ['casual', 'moderate', 'intensive'];
  const currentIndex = goalOrder.indexOf(currentGoal);
  const newIndex = goalOrder.indexOf(newGoal);
  
  if (newIndex > currentIndex) {
    return { allowed: true };
  }
  
  // Can decrease goal if streak < 7 days
  if (streakDays < 7) {
    return { allowed: true };
  }
  
  // Cannot decrease goal if streak >= 7 days
  return {
    allowed: false,
    reason: 'Cannot decrease goal during active streak. Complete your streak first.',
  };
}
```

---

## 6. Progress Visualization

### 6.1 Heat Map (GitHub-style)

```typescript
interface HeatMapDay {
  date: string;        // YYYY-MM-DD
  reviews: number;     // Number of reviews
  xp: number;          // XP earned
  goalMet: boolean;    // Whether daily goal was met
}

function generateHeatMap(
  history: HeatMapDay[],
  startDate: string,
  endDate: string
): HeatMapDay[] {
  
  const days: HeatMapDay[] = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  while (currentDate <= end) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayData = history.find(h => h.date === dateStr);
    
    days.push({
      date: dateStr,
      reviews: dayData?.reviews ?? 0,
      xp: dayData?.xp ?? 0,
      goalMet: dayData?.goalMet ?? false,
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
}

// Color coding for heat map
function getHeatMapColor(reviews: number, goalMet: boolean): string {
  if (goalMet) return '#22c55e';      // Green-500
  if (reviews >= 5) return '#86efac'; // Green-300
  if (reviews >= 1) return '#bbf7d0'; // Green-100
  return '#1e293b';                   // Slate-800 (no reviews)
}
```

### 6.2 Mastery Progress

```typescript
interface MasteryLevel {
  name: string;
  minReviews: number;
  icon: string;
  color: string;
}

const MASTERY_LEVELS: MasteryLevel[] = [
  { name: 'New', minReviews: 0, icon: '🆕', color: '#94a3b8' },
  { name: 'Learning', minReviews: 1, icon: '📖', color: '#60a5fa' },
  { name: 'Familiar', minReviews: 3, icon: '👀', color: '#a78bfa' },
  { name: 'Practiced', minReviews: 5, icon: '💪', color: '#f472b6' },
  { name: 'Skilled', minReviews: 10, icon: '🎯', color: '#fb923c' },
  { name: 'Expert', minReviews: 20, icon: '🏆', color: '#facc15' },
  { name: 'Mastered', minReviews: 50, icon: '👑', color: '#22c55e' },
];

function getMasteryLevel(reviewCount: number): MasteryLevel {
  return MASTERY_LEVELS.reduce((highest, level) => 
    reviewCount >= level.minReviews ? level : highest
  );
}
```

### 6.3 Progress Dashboard

```typescript
interface ProgressDashboard {
  // Daily Progress
  today: {
    reviews: number;
    goal: DailyGoalConfig;
    xpEarned: number;
    streakDays: number;
  };
  
  // Weekly Progress
  thisWeek: {
    reviews: number;
    daysActive: number;
    xpEarned: number;
    goalMetDays: number;
  };
  
  // Lifetime Stats
  lifetime: {
    totalReviews: number;
    totalXP: number;
    level: number;
    longestStreak: number;
    badgesUnlocked: number;
    masteryDistribution: Record<string, number>;
  };
  
  // Heat Map Data
  heatMap: HeatMapDay[];
}
```

### 6.4 Progress Bar Components

```tsx
function DailyProgressBar({ progress }: { progress: GoalCompletionResult }) {
  return (
    <div className="daily-progress">
      <div className="progress-header">
        <span className="progress-label">Today's Goal</span>
        <span className="progress-count">
          {progress.reviewsDone}/{DAILY_GOALS.casual.target}
        </span>
      </div>
      
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress.progress * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
      
      {progress.isComplete && (
        <motion.div
          className="goal-complete"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          🎉 Goal Complete! +{50 * DAILY_GOALS.casual.xpMultiplier} XP
        </motion.div>
      )}
    </div>
  );
}

function XPProgress({ currentXP, level }: { currentXP: number; level: number }) {
  const currentLevelConfig = LEVEL_TABLE.find(l => l.level === level);
  const nextLevelConfig = LEVEL_TABLE.find(l => l.level === level + 1);
  
  if (!currentLevelConfig || !nextLevelConfig) {
    return <div className="xp-progress">Max Level!</div>;
  }
  
  const xpInLevel = currentXP - currentLevelConfig.xpRequired;
  const xpNeeded = nextLevelConfig.xpRequired - currentLevelConfig.xpRequired;
  const progress = xpInLevel / xpNeeded;
  
  return (
    <div className="xp-progress">
      <div className="xp-header">
        <span className="xp-level">
          {currentLevelConfig.badge} Level {level}
        </span>
        <span className="xp-title">{currentLevelConfig.title}</span>
      </div>
      
      <div className="xp-track">
        <motion.div
          className="xp-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
      
      <div className="xp-numbers">
        <span>{xpInLevel} XP</span>
        <span>{xpNeeded} XP to next level</span>
      </div>
    </div>
  );
}
```

---

## 7. Firebase Sync Schema

### 7.1 Gamification Data Structure

```typescript
interface GamificationData {
  // XP & Level
  xp: {
    total: number;
    today: number;
    todayDate: string;        // YYYY-MM-DD
    dailyLimit: number;
  };
  
  level: {
    current: number;
    title: string;
    badge: string;
  };
  
  // Streak
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string;
    freezes: number;
    repairs: number;
    lastFreezeUsed: string | null;
    lastRepairUsed: string | null;
  };
  
  // Badges
  badges: Badge[];
  
  // Daily Goal
  goal: {
    type: DailyGoal;
    todayReviews: number;
    todayGoalMet: boolean;
  };
  
  // History (for heat map)
  history: HeatMapDay[];
}
```

### 7.2 Firestore Document Structure

```
users/
  {userId}/
    gamification: GamificationData
    progress: UserProgress
    cards/
      {expressionId}: SRSCard
```

### 7.3 Sync Strategy

```typescript
class GamificationSyncManager {
  private pendingChanges: Partial<GamificationData> = {};
  
  // Mark data as dirty
  markDirty(updates: Partial<GamificationData>): void {
    this.pendingChanges = { ...this.pendingChanges, ...updates };
  }
  
  // Sync to Firebase
  async sync(): Promise<void> {
    if (Object.keys(this.pendingChanges).length === 0) return;
    
    const gamificationRef = doc(db, `users/${userId}/gamification`);
    await setDoc(gamificationRef, this.pendingChanges, { merge: true });
    
    this.pendingChanges = {};
  }
  
  // Sync on app background/close
  async syncOnExit(): Promise<void> {
    await this.sync();
  }
}
```

---

## 8. Integration with SRS Algorithm

### 8.1 XP from SRS Reviews

```typescript
function handleSRSReview(
  card: SRSCard,
  rating: 'again' | 'good' | 'hard' | 'easy'
): SRSReviewResult {
  
  // Update SRS card state
  const updatedCard = updateSRSCard(card, rating);
  
  // Calculate XP
  let xp = 0;
  switch (rating) {
    case 'easy':
      xp = 15;
      break;
    case 'good':
    case 'hard':
      xp = 10;
      break;
    case 'again':
      xp = 0;
      break;
  }
  
  // Check for bonuses
  const sessionStats = getSessionStats();
  const perfectSession = !sessionStats.hasLapses && sessionStats.reviewCount >= 5;
  if (perfectSession) xp += 25;
  
  // Check for streak bonus
  const streakDays = getStreakDays();
  xp += Math.min(50, streakDays * 10);
  
  // Check for badge unlocks
  const newBadges = checkBadgeUnlocks(getUserStats(), sessionStats);
  
  return {
    card: updatedCard,
    xp,
    badges: newBadges,
    levelUp: checkLevelUp(getTotalXP() + xp, getCurrentLevel()),
  };
}

interface SRSReviewResult {
  card: SRSCard;
  xp: number;
  badges: Badge[];
  levelUp: LevelUpResult | null;
}
```

---

## 9. Edge Cases

### 9.1 Timezone Handling

```typescript
function getTodayInTimezone(timezone: string): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: timezone });
}

// Store timezone preference
interface TimezonePreference {
  timezone: string;        // IANA timezone
  autoDetect: boolean;     // Use system timezone
}
```

### 9.2 Multiple Sessions Per Day

```typescript
function handleMultipleSessions(
  todayStats: DailyStats,
  newSession: SessionStats
): DailyStats {
  
  return {
    date: todayStats.date,
    reviews: todayStats.reviews + newSession.reviews,
    xp: todayStats.xp + newSession.xp,
    goalMet: todayStats.reviews + newSession.reviews >= getDailyGoalTarget(),
  };
}
```

### 9.3 Data Migration

```typescript
function migrateGamificationData(
  oldData: OldGamificationFormat
): GamificationData {
  
  return {
    xp: {
      total: oldData.totalXP,
      today: oldData.todayXP,
      todayDate: oldData.lastActiveDate,
      dailyLimit: 200,
    },
    level: {
      current: calculateLevelFromXP(oldData.totalXP),
      title: getLevelTitle(calculateLevelFromXP(oldData.totalXP)),
      badge: getLevelBadge(calculateLevelFromXP(oldData.totalXP)),
    },
    streak: {
      current: oldData.streak,
      longest: oldData.longestStreak,
      lastActiveDate: oldData.lastActiveDate,
      freezes: oldData.freezes,
      repairs: oldData.repairs,
      lastFreezeUsed: oldData.lastFreezeUsed,
      lastRepairUsed: oldData.lastRepairUsed,
      preBreakStreak: undefined,
      isPaused: false,
    },
    badges: oldData.badges,
    goal: {
      type: oldData.goalType || 'moderate',
      todayReviews: oldData.todayReviews,
      todayGoalMet: oldData.todayGoalMet,
    },
    history: oldData.history.slice(-365), // Keep only last 365 days
  };
}
```

---

## 10. Testing Strategy

### 10.1 Unit Tests

```typescript
describe('XP System', () => {
  test('calculateSessionXP: Good review earns 10 XP', () => {
    const reviews = [{ rating: 'good' }];
    const result = calculateSessionXP(reviews, false);
    expect(result.base).toBe(10);
  });
  
  test('calculateSessionXP: Easy review earns 15 XP', () => {
    const reviews = [{ rating: 'easy' }];
    const result = calculateSessionXP(reviews, false);
    expect(result.base).toBe(15);
  });
  
  test('calculateSessionXP: Again review earns 0 XP', () => {
    const reviews = [{ rating: 'again' }];
    const result = calculateSessionXP(reviews, false);
    expect(result.base).toBe(0);
  });
  
  test('calculateSessionXP: New expression earns 20 XP', () => {
    const reviews = [{ rating: 'good' }];
    const result = calculateSessionXP(reviews, true);
    expect(result.base).toBe(30); // 10 + 20
  });
  
  test('calculateSessionXP: Perfect session bonus', () => {
    const reviews = Array(5).fill({ rating: 'good' });
    const result = calculateSessionXP(reviews, false);
    expect(result.bonus).toBe(25);
  });
});

describe('Streak System', () => {
  test('updateStreak: Consecutive day increments streak', () => {
    const streak = {
      currentStreak: 5,
      lastActiveDate: '2026-06-08',
    };
    const result = updateStreak(streak, '2026-06-09');
    expect(result.currentStreak).toBe(6);
  });
  
  test('updateStreak: Missed day uses freeze', () => {
    const streak = {
      currentStreak: 5,
      lastActiveDate: '2026-06-07',
      streakFreezes: 2,
    };
    const result = updateStreak(streak, '2026-06-09');
    expect(result.currentStreak).toBe(5); // Streak preserved
    expect(result.streakFreezes).toBe(1); // Freeze consumed
  });
  
  test('updateStreak: Missed day without freeze breaks streak', () => {
    const streak = {
      currentStreak: 5,
      lastActiveDate: '2026-06-07',
      streakFreezes: 0,
    };
    const result = updateStreak(streak, '2026-06-09');
    expect(result.currentStreak).toBe(1); // Reset to 1
  });
});

describe('Level System', () => {
  test('checkLevelUp: Triggers level up at threshold', () => {
    const result = checkLevelUp(100, 1);
    expect(result).not.toBeNull();
    expect(result?.newLevel).toBe(2);
  });
  
  test('checkLevelUp: No level up below threshold', () => {
    const result = checkLevelUp(50, 1);
    expect(result).toBeNull();
  });
});

describe('Badge System', () => {
  test('checkBadgeUnlocks: First Steps badge at 1 review', () => {
    const stats = { totalReviews: 1 };
    const badges = checkBadgeUnlocks(stats, {});
    expect(badges.some(b => b.id === 'first_steps')).toBe(true);
  });
  
  test('checkBadgeUnlocks: No duplicate badge unlocks', () => {
    const stats = { totalReviews: 10 };
    const badges = checkBadgeUnlocks(stats, {});
    // Should not include 'first_steps' if already unlocked
  });
});
```

### 10.2 Integration Tests

```typescript
describe('Gamification Integration', () => {
  test('Full session updates XP, streak, and badges', async () => {
    // Start session
    const initialStats = getUserStats();
    
    // Complete 5 reviews
    for (let i = 0; i < 5; i++) {
      await handleSRSReview(mockCard, 'good');
    }
    
    // Check final state
    const finalStats = getUserStats();
    
    expect(finalStats.xp.today).toBeGreaterThan(initialStats.xp.today);
    expect(finalStats.streak.current).toBeGreaterThanOrEqual(initialStats.streak.current);
    expect(finalStats.badges.length).toBeGreaterThanOrEqual(initialStats.badges.length);
  });
});
```

---

## Appendix A: References

1. **Duolingo Gamification:** [blog.duolingo.com](https://blog.duolingo.com/how-duolingo-streak-builds-habit/)
2. **Gamification Psychology:** [yukaichou.com](https://yukaichou.com/gamification-study/)
3. **Badge Design Framework:** [ResearchGate](https://www.researchgate.net/publication/333467793)
4. **Streak Design:** [Medium](https://medium.com/design-bootcamp/streaks-the-gamification-feature-everyone-gets-wrong-6506e46fa9ca)

---

*This specification will be updated as implementation progresses and user testing feedback is gathered.*
