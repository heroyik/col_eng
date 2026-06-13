# Card Interaction Specification: Flip Animation & Swipe Gestures

**Project:** COL_ENG (Colloquial English)
**Date:** 2026-06-09
**Status:** Specification
**Goal:** Design optimal card flip/reveal animation and 4-way swipe gesture system for mobile commute learning

---

## Executive Summary

This specification defines the technical implementation for card interactions in the COL_ENG SRS learning app. The system uses **CSS 3D transforms** for card flip animations and **Framer Motion + @use-gesture** for swipe detection, optimized for one-handed mobile use during subway/bus commutes.

**Key Design Decisions:**
- **Card Flip:** CSS 3D transforms (perspective + rotateY) for 60fps performance
- **Swipe Detection:** Framer Motion `drag` + `@use-gesture` for precise threshold control
- **Visual Feedback:** Card tilt, color reveal, icon overlay during swipe
- **Haptic Feedback:** `navigator.vibrate()` with short patterns (20-50ms)
- **Accessibility:** `prefers-reduced-motion` support, alternative tap interaction

---

## 1. Architecture Overview

### 1.1 Technology Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Card Flip | CSS 3D Transforms | GPU-accelerated, 0KB bundle, native browser support |
| Swipe Gestures | Framer Motion + @use-gesture | Declarative API, physics-based animations, excellent mobile support |
| Animation Engine | Framer Motion | Handles spring physics, layout animations, gesture tracking |
| Accessibility | CSS `prefers-reduced-motion` | WCAG compliance |

### 1.2 Bundle Size Impact

```
Framer Motion: ~59 KB gzipped
@use-gesture: ~5 KB gzipped
Total: ~64 KB gzipped
```

**Alternative (lighter):** React Spring (~20 KB) + custom gesture handling, but requires more code.

**Recommendation:** Use Framer Motion for better DX and built-in gesture support.

---

## 2. Card Flip Animation (CSS 3D Transforms)

### 2.1 3D Space Setup

```css
/* Container establishes 3D perspective */
.card-scene {
  perspective: 1000px;
  perspective-origin: center center;
  
  /* Card dimensions */
  width: 100%;
  max-width: 400px;
  height: auto;
  min-height: 300px;
  
  /* Prevent content overflow */
  overflow: visible;
}

/* Inner container rotates in 3D space */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
  
  /* Critical for 3D children to exist in same space */
  transform-style: preserve-3d;
  
  /* Smooth rotation animation */
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* GPU acceleration hint */
  will-change: transform;
}

/* Flipped state */
.card-inner.is-flipped {
  transform: rotateY(180deg);
}

/* Front and back faces */
.card-front,
.card-back {
  position: absolute;
  inset: 0;
  
  /* Hide backface when facing away */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  
  /* Glass styling */
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: clamp(1.5rem, 5vw, 2.5rem);
  
  /* Flexbox for content centering */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Back face needs to be pre-rotated */
.card-back {
  transform: rotateY(180deg);
}
```

### 2.2 Perspective Variations

| Perspective | Effect | Use Case |
|-------------|--------|----------|
| `800px` | Deep 3D, dramatic | Desktop hover effects |
| `1000px` | Balanced depth | **Recommended for mobile** |
| `1200px` | Subtle 3D | Conservative, less disorienting |
| `1500px` | Almost flat | Accessibility-first |

**Why 1000px:** Provides clear 3D depth without being disorienting on mobile screens (5-7").

### 2.3 Flip Animation Timing

```css
/* Standard flip */
.card-inner {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Faster flip (for rapid reviews) */
.card-inner.fast-flip {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Reduced motion (accessibility) */
@media (prefers-reduced-motion: reduce) {
  .card-inner {
    transition: transform 0.01ms !important;
  }
}
```

**Timing Rationale:**
- **0.6s:** Comfortable for first-time users, allows visual tracking
- **0.3s:** For power users who want rapid reviews
- **Cubic-bezier(0.4, 0, 0.2, 1):** Material Design standard easing (ease-out)

### 2.4 Content Height Handling

Cards have variable content (short expressions vs. long examples):

```css
.card-scene {
  /* Allow card to grow with content */
  height: auto;
  min-height: 300px;
  max-height: 80vh;
}

.card-inner {
  /* Match scene height */
  min-height: inherit;
}

/* Back face scrolling for long content */
.card-back {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  
  /* Custom scrollbar (minimal) */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.card-back::-webkit-scrollbar {
  width: 4px;
}

.card-back::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}
```

**Strategy:**
1. Front face: Fixed height (expression only, always fits)
2. Back face: Auto height with scroll if content exceeds 80vh
3. Card container: Grows to fit content, capped at 80vh

---

## 3. Swipe Gesture System (Framer Motion + @use-gesture)

### 3.1 Architecture

```
┌─────────────────────────────────────┐
│         Gesture Layer               │
│    (@use-gesture useDrag)           │
├─────────────────────────────────────┤
│         Animation Layer             │
│    (Framer Motion useMotionValue)   │
├─────────────────────────────────────┤
│         Card Component              │
│    (React + CSS 3D transforms)      │
└─────────────────────────────────────┘
```

### 3.2 Swipe Direction Mapping

| Gesture | Direction | SRS Rating | Visual Feedback | Haptic |
|---------|-----------|------------|-----------------|--------|
| ← Left | Horizontal (-X) | Again | Red overlay, "🔄" icon | Short buzz (20ms) |
| → Right | Horizontal (+X) | Good | Green overlay, "✅" icon | Double buzz (20+20ms) |
| ↑ Up | Vertical (-Y) | Easy | Blue overlay, "⬆️" icon | Long buzz (50ms) |
| ↓ Down | Vertical (+Y) | Hard | Amber overlay, "⬇️" icon | Triple buzz (20+20+20ms) |

### 3.3 Gesture Detection Implementation

```typescript
import { useDrag } from '@use-gesture/react';
import { useMotionValue, useTransform, animate } from 'framer-motion';

interface SwipeConfig {
  distanceThreshold: number;    // px to trigger action
  velocityThreshold: number;    // px/ms for "flick"
  maxRotation: number;          // degrees tilt during swipe
}

const DEFAULT_CONFIG: SwipeConfig = {
  distanceThreshold: 100,       // 50% of card width (200px card)
  velocityThreshold: 0.5,       // 0.5 px/ms
  maxRotation: 15,              // 15 degrees max tilt
};

export function useCardSwipe(
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void,
  config: SwipeConfig = DEFAULT_CONFIG
) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Derived values for visual feedback
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const distance = Math.sqrt(latestX * latestX + latestY * latestY);
      return Math.min(1, distance / config.distanceThreshold);
    }
  );
  
  // Determine swipe direction
  const getDirection = (deltaX: number, deltaY: number): 'left' | 'right' | 'up' | 'down' => {
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    if (absX > absY) {
      return deltaX < 0 ? 'left' : 'right';
    } else {
      return deltaY < 0 ? 'up' : 'down';
    }
  };
  
  // Check if swipe meets threshold
  const shouldTrigger = (
    deltaX: number,
    deltaY: number,
    velocityX: number,
    velocityY: number
  ): boolean => {
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    
    return (
      distance >= config.distanceThreshold ||
      velocity >= config.velocityThreshold
    );
  };
  
  const bind = useDrag(
    ({ movement: [mx, my], velocity: [vx, vy], direction: [dx, dy], cancel, active }) => {
      if (active) {
        // Update motion values for visual feedback
        x.set(mx);
        y.set(my);
      } else {
        // Released - check if swipe should trigger
        if (shouldTrigger(mx, my, vx, vy)) {
          const direction = getDirection(mx, my);
          
          // Animate card off-screen
          const exitX = direction === 'left' ? -500 : direction === 'right' ? 500 : 0;
          const exitY = direction === 'up' ? -500 : direction === 'down' ? 500 : 0;
          
          animate(x, exitX, { type: 'spring', stiffness: 300, damping: 30 });
          animate(y, exitY, { type: 'spring', stiffness: 300, damping: 30 });
          
          // Trigger callback after animation
          setTimeout(() => onSwipe(direction), 300);
        } else {
          // Snap back to center
          animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
          animate(y, 0, { type: 'spring', stiffness: 500, damping: 30 });
        }
      }
    },
    {
      axis: undefined,           // Allow 4-way movement
      filterTaps: true,          // Ignore accidental taps
      threshold: 10,             // Minimum movement before drag starts
    }
  );
  
  return { bind, x, y, rotate, opacity };
}
```

### 3.4 Threshold Configuration

| Threshold | Value | Rationale |
|-----------|-------|-----------|
| **Distance** | 100px (50% of 200px card) | Clear intent, prevents accidental swipes |
| **Velocity** | 0.5 px/ms | "Flick" gesture detection for quick reviews |
| **Dead Zone** | 10px | Ignore micro-movements before drag starts |
| **Max Rotation** | 15° | Visual feedback without disorientation |

### 3.5 Gesture Conflict Resolution

**Problem:** Browser gestures (scroll, swipe-to-back) conflict with card swipes.

**Solution:**

```css
.card-container {
  /* Disable all browser touch actions on card */
  touch-action: none;
  
  /* Prevent text selection during swipe */
  user-select: none;
  -webkit-user-select: none;
  
  /* Prevent iOS bounce */
  overscroll-behavior: none;
}

/* Re-enable scrolling outside card area */
.scroll-container {
  touch-action: pan-y;
  overflow-y: auto;
}
```

**Edge Case Handling:**
- **Left edge swipe (back navigation):** Reserve first 20px from left edge for browser back
- **Top edge swipe (pull-to-refresh):** Reserve first 40px from top for browser refresh
- **Vertical scroll:** Only allow within `.scroll-container`, not on card

---

## 4. Visual Feedback System

### 4.1 Swipe State Colors

```typescript
const SWIPE_COLORS = {
  left: {
    overlay: 'rgba(239, 68, 68, 0.3)',   // Red-500 with alpha
    icon: '🔄',
    label: 'Again',
  },
  right: {
    overlay: 'rgba(34, 197, 94, 0.3)',   // Green-500 with alpha
    icon: '✅',
    label: 'Good',
  },
  up: {
    overlay: 'rgba(59, 130, 246, 0.3)',  // Blue-500 with alpha
    icon: '⬆️',
    label: 'Easy',
  },
  down: {
    overlay: 'rgba(245, 158, 11, 0.3)',  // Amber-500 with alpha
    icon: '⬇️',
    label: 'Hard',
  },
} as const;
```

### 4.2 Overlay Component

```tsx
interface SwipeOverlayProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  config: typeof SWIPE_COLORS;
}

export function SwipeOverlay({ x, y, config }: SwipeOverlayProps) {
  // Calculate dominant direction
  const direction = useTransform([x, y], ([latestX, latestY]) => {
    const absX = Math.abs(latestX);
    const absY = Math.abs(latestY);
    
    if (absX > absY) {
      return latestX < 0 ? 'left' : 'right';
    } else {
      return latestY < 0 ? 'up' : 'down';
    }
  });
  
  // Calculate opacity based on distance
  const opacity = useTransform([x, y], ([latestX, latestY]) => {
    const distance = Math.sqrt(latestX * latestX + latestY * latestY);
    return Math.min(0.8, distance / 150);
  });
  
  // Render overlays (only one visible at a time)
  return (
    <>
      {Object.entries(config).map(([dir, { overlay, icon, label }]) => (
        <motion.div
          key={dir}
          style={{
            position: 'absolute',
            inset: 0,
            background: overlay,
            borderRadius: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: useTransform(direction, (d) => d === dir ? opacity : 0),
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: '3rem' }}>{icon}</span>
          <span style={{ 
            color: 'white', 
            fontWeight: 600,
            fontSize: '1.25rem',
            marginTop: '0.5rem'
          }}>
            {label}
          </span>
        </motion.div>
      ))}
    </>
  );
}
```

### 4.3 Card Tilt During Swipe

```tsx
interface CardTiltProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  maxRotation?: number;
  children: React.ReactNode;
}

export function CardTilt({ x, y, maxRotation = 15, children }: CardTiltProps) {
  // Calculate rotation based on horizontal movement
  const rotateZ = useTransform(x, [-200, 0, 200], [-maxRotation, 0, maxRotation]);
  
  // Calculate scale based on vertical movement (slight zoom when swiping up)
  const scale = useTransform(y, [-200, 0, 200], [1.05, 1, 0.95]);
  
  return (
    <motion.div
      style={{
        rotateZ,
        scale,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </motion.div>
  );
}
```

### 4.4 Exit Animation

When swipe is committed (threshold exceeded):

```typescript
function animateExit(
  x: MotionValue<number>,
  y: MotionValue<number>,
  direction: 'left' | 'right' | 'up' | 'down'
) {
  const exits = {
    left: { x: -500, y: 0 },
    right: { x: 500, y: 0 },
    up: { x: 0, y: -500 },
    down: { x: 0, y: 500 },
  };
  
  const { x: exitX, y: exitY } = exits[direction];
  
  // Spring animation for natural feel
  animate(x, exitX, {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });
  
  animate(y, exitY, {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });
}
```

---

## 5. Haptic Feedback

### 5.1 Implementation

```typescript
type HapticPattern = 'again' | 'good' | 'easy' | 'hard' | 'tap' | 'success';

const HAPTIC_PATTERNS: Record<HapticPattern, number[]> = {
  again: [20],                    // Single short buzz
  good: [20, 50, 20],            // Double buzz
  easy: [50],                     // Single long buzz
  hard: [20, 30, 20, 30, 20],    // Triple buzz
  tap: [10],                      // Very short tap
  success: [20, 100, 20, 100, 20], // Celebration pattern
};

function triggerHaptic(pattern: HapticPattern): void {
  // Check for support
  if (!navigator.vibrate) {
    console.log('Haptic feedback not supported');
    return;
  }
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  
  if (prefersReducedMotion) {
    // Still provide feedback, but shorter
    navigator.vibrate([10]);
    return;
  }
  
  // Trigger pattern
  navigator.vibrate(HAPTIC_PATTERNS[pattern]);
}

// Usage in swipe handler
function handleSwipeComplete(direction: string) {
  triggerHaptic(direction as HapticPattern);
}
```

### 5.2 Platform Considerations

| Platform | Support | Notes |
|----------|---------|-------|
| Android Chrome | ✅ Full | All patterns work |
| Android Firefox | ✅ Full | All patterns work |
| iOS Safari | ⚠️ Limited | Only works in response to user gesture, no custom patterns |
| iOS Chrome | ⚠️ Limited | Same as Safari |
| Desktop | ❌ None | `navigator.vibrate` undefined |

**Fallback:** Visual feedback is primary; haptic is enhancement only.

---

## 6. Card Component Structure

### 6.1 React Component

```tsx
import { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { Expression } from '@/types';

interface ExpressionCardProps {
  expression: Expression;
  onSwipe: (direction: 'again' | 'good' | 'hard' | 'easy') => void;
  isFlipped: boolean;
  onFlip: () => void;
}

export function ExpressionCard({
  expression,
  onSwipe,
  isFlipped,
  onFlip,
}: ExpressionCardProps) {
  const [exitDirection, setExitDirection] = useState<string | null>(null);
  
  // Motion values for gesture tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Gesture binding
  const bind = useDrag(
    ({ movement: [mx, my], velocity: [vx, vy], active, cancel }) => {
      if (active) {
        x.set(mx);
        y.set(my);
      } else {
        // Released
        const distance = Math.sqrt(mx * mx + my * my);
        const velocity = Math.sqrt(vx * vx + vy * vy);
        
        if (distance > 100 || velocity > 0.5) {
          // Determine direction
          const direction = getDirection(mx, my);
          setExitDirection(direction);
          
          // Trigger haptic
          triggerHaptic(direction);
          
          // Animate exit
          animateExit(x, y, direction);
          
          // Callback after animation
          setTimeout(() => {
            onSwipe(direction);
          }, 300);
        } else {
          // Snap back
          animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
          animate(y, 0, { type: 'spring', stiffness: 500, damping: 30 });
        }
      }
    },
    { filterTaps: true, threshold: 10 }
  );
  
  return (
    <div className="card-scene" onClick={onFlip}>
      <motion.div
        className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}
        style={{ x, y }}
        {...bind()}
      >
        {/* Front Face */}
        <div className="card-front">
          <h2 className="expression-primary">{expression.primary}</h2>
          <p className="tap-hint">Tap to reveal</p>
        </div>
        
        {/* Back Face */}
        <div className="card-back">
          <h3 className="expression-meaning">{expression.meaning}</h3>
          
          <div className="similar-expressions">
            {expression.similar.map((sim, i) => (
              <span key={i} className="similar-tag">{sim}</span>
            ))}
          </div>
          
          <div className="example-box">
            <p className="example-text">{expression.example}</p>
          </div>
          
          <div className="translations">
            {expression.japanese && (
              <div className="translation">
                <span className="lang">JP</span>
                <span>{expression.japanese}</span>
              </div>
            )}
            {expression.chinese && (
              <div className="translation">
                <span className="lang">CN</span>
                <span>{expression.chinese}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Swipe Overlay */}
        <SwipeOverlay x={x} y={y} config={SWIPE_COLORS} />
      </motion.div>
    </div>
  );
}
```

### 6.2 Card States

```
┌─────────────────────────────────────┐
│          Card States                │
├─────────────────────────────────────┤
│ 1. FRONT (not flipped)             │
│    - Shows English expression       │
│    - "Tap to reveal" hint           │
│    - Swipe gestures active          │
├─────────────────────────────────────┤
│ 2. BACK (flipped)                  │
│    - Shows Korean meaning           │
│    - Similar expressions            │
│    - Example dialogue               │
│    - Translations                   │
│    - Swipe gestures active          │
├─────────────────────────────────────┤
│ 3. EXITING (swipe committed)       │
│    - Card animates off-screen       │
│    - Next card enters               │
│    - No user interaction            │
└─────────────────────────────────────┘
```

---

## 7. Card Stack & Transitions

### 7.1 Stack Layout

```css
.card-stack {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 400px;
  
  /* Center stack */
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-stack .card-scene {
  position: absolute;
  
  /* Stack order */
  z-index: var(--stack-index, 0);
  
  /* Scale for depth effect */
  transform: scale(calc(1 - var(--stack-index) * 0.05));
  
  /* Opacity for depth effect */
  opacity: calc(1 - var(--stack-index) * 0.1);
}
```

### 7.2 Card Transition Animation

When current card exits, next card enters:

```tsx
import { AnimatePresence, motion } from 'framer-motion';

function CardStack({ cards, currentIndex }: CardStackProps) {
  return (
    <div className="card-stack">
      <AnimatePresence mode="popLayout">
        {cards.slice(currentIndex, currentIndex + 3).map((card, index) => (
          <motion.div
            key={card.id}
            className="card-scene"
            style={{ '--stack-index': index } as React.CSSProperties}
            
            // Entry animation
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            
            // Animate to position
            animate={{ 
              scale: 1 - index * 0.05,
              opacity: 1 - index * 0.1,
              y: index * 10,
            }}
            
            // Exit animation
            exit={{ 
              x: exitDirection === 'left' ? -500 : exitDirection === 'right' ? 500 : 0,
              y: exitDirection === 'up' ? -500 : exitDirection === 'down' ? 500 : 0,
              opacity: 0,
              transition: { type: 'spring', stiffness: 300, damping: 30 }
            }}
            
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ExpressionCard
              expression={card}
              onSwipe={handleSwipe}
              isFlipped={false}
              onFlip={handleFlip}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
```

### 7.3 Preloading Strategy

```typescript
// Preload next 2 cards for smooth transitions
function preloadNextCards(cards: Expression[], currentIndex: number): void {
  const nextCards = cards.slice(currentIndex + 1, currentIndex + 3);
  
  nextCards.forEach(card => {
    // Preload images if any
    if (card.imageUrl) {
      const img = new Image();
      img.src = card.imageUrl;
    }
  });
}
```

---

## 8. Accessibility

### 8.1 Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable 3D flip, use simple fade */
  .card-inner {
    transition: opacity 0.2s ease !important;
    transform: none !important;
  }
  
  .card-inner.is-flipped {
    transform: none !important;
  }
  
  /* Show both faces with opacity toggle */
  .card-front {
    opacity: var(--front-opacity, 1);
    transition: opacity 0.2s ease;
  }
  
  .card-back {
    opacity: var(--back-opacity, 0);
    transition: opacity 0.2s ease;
    transform: none !important;
  }
  
  /* Disable swipe animations */
  .card-scene {
    transform: none !important;
  }
}
```

```tsx
// React: Check for reduced motion preference
function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return reducedMotion;
}
```

### 8.2 Alternative Interaction (Tap)

For users who cannot use swipe gestures:

```tsx
// Tap to cycle through ratings
function useTapRating(onRate: (rating: string) => void) {
  const [tapCount, setTapCount] = useState(0);
  
  const ratings = ['good', 'easy', 'hard', 'again'];
  
  const handleTap = () => {
    const rating = ratings[tapCount % ratings.length];
    setTapCount(tapCount + 1);
    onRate(rating);
  };
  
  return handleTap;
}

// Visual indicator for tap mode
<div className="tap-rating-indicator">
  <span className={tapCount % 4 === 0 ? 'active' : ''}>✅ Good</span>
  <span className={tapCount % 4 === 1 ? 'active' : ''}>⬆️ Easy</span>
  <span className={tapCount % 4 === 2 ? 'active' : ''}>⬇️ Hard</span>
  <span className={tapCount % 4 === 3 ? 'active' : ''}>🔄 Again</span>
</div>
```

### 8.3 Keyboard Navigation

```tsx
// Keyboard shortcuts for desktop
function useKeyboardShortcuts(onSwipe: (direction: string) => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onSwipe('left');
          break;
        case 'ArrowRight':
          onSwipe('right');
          break;
        case 'ArrowUp':
          onSwipe('up');
          break;
        case 'ArrowDown':
          onSwipe('down');
          break;
        case ' ':
        case 'Enter':
          onFlip();
          break;
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSwipe, onFlip]);
}
```

### 8.4 ARIA Attributes

```tsx
<div
  className="card-scene"
  role="button"
  aria-label={`Expression: ${expression.primary}. Tap to reveal meaning.`}
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onFlip();
    }
  }}
>
  {/* Card content */}
</div>
```

---

## 9. Performance Optimization

### 9.1 GPU Acceleration

```css
/* Promote card to GPU layer */
.card-scene {
  will-change: transform;
  transform: translateZ(0); /* Force GPU layer */
}

/* Only animate transform and opacity */
.card-inner {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  /* Do NOT animate: width, height, top, left, margin, padding */
}
```

### 9.2 Throttle Gesture Updates

```typescript
// Framer Motion handles this automatically, but for custom implementations:
import { throttle } from 'lodash';

const throttledUpdate = throttle((x: number, y: number) => {
  // Update motion values
  motionValueX.set(x);
  motionValueY.set(y);
}, 16); // 60fps = 16ms per frame

// Use in gesture handler
const bind = useDrag(({ movement: [mx, my] }) => {
  throttledUpdate(mx, my);
});
```

### 9.3 Memory Management

```typescript
// Cleanup motion values on unmount
useEffect(() => {
  return () => {
    x.destroy();
    y.destroy();
    rotate.destroy();
    opacity.destroy();
  };
}, []);
```

### 9.4 Bundle Size Optimization

```typescript
// Import only what you need
import { motion, useMotionValue, animate } from 'framer-motion';
import { useDrag } from '@use-gesture/react';

// Avoid importing entire library
// ❌ import * as FramerMotion from 'framer-motion';
// ❌ import * as Gesture from '@use-gesture/react';
```

---

## 10. Testing Strategy

### 10.1 Unit Tests

```typescript
describe('Card Flip Animation', () => {
  test('card flips on tap', async () => {
    render(<ExpressionCard expression={mockExpression} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    await waitFor(() => {
      expect(card.querySelector('.card-inner')).toHaveClass('is-flipped');
    });
  });
  
  test('reduced motion disables 3D flip', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    
    render(<ExpressionCard expression={mockExpression} />);
    
    const cardInner = screen.getByRole('button').querySelector('.card-inner');
    expect(cardInner).toHaveStyle({ transition: 'opacity 0.2s ease' });
  });
});

describe('Swipe Gestures', () => {
  test('swipe right triggers Good rating', async () => {
    const onSwipe = jest.fn();
    render(<ExpressionCard expression={mockExpression} onSwipe={onSwipe} />);
    
    const card = screen.getByRole('button');
    
    // Simulate swipe right
    fireEvent.pointerDown(card, { clientX: 100, clientY: 200 });
    fireEvent.pointerMove(card, { clientX: 250, clientY: 200 });
    fireEvent.pointerUp(card, { clientX: 250, clientY: 200 });
    
    await waitFor(() => {
      expect(onSwipe).toHaveBeenCalledWith('right');
    });
  });
  
  test('short swipe snaps back', async () => {
    const onSwipe = jest.fn();
    render(<ExpressionCard expression={mockExpression} onSwipe={onSwipe} />);
    
    const card = screen.getByRole('button');
    
    // Simulate short swipe (below threshold)
    fireEvent.pointerDown(card, { clientX: 100, clientY: 200 });
    fireEvent.pointerMove(card, { clientX: 120, clientY: 200 });
    fireEvent.pointerUp(card, { clientX: 120, clientY: 200 });
    
    await waitFor(() => {
      expect(onSwipe).not.toHaveBeenCalled();
    });
  });
});
```

### 10.2 Integration Tests

```typescript
describe('Card Stack Transitions', () => {
  test('next card enters after swipe', async () => {
    render(<CardStack cards={mockCards} />);
    
    const firstCard = screen.getByText('Expression 1');
    expect(firstCard).toBeInTheDocument();
    
    // Swipe first card
    fireEvent.pointerDown(firstCard, { clientX: 100, clientY: 200 });
    fireEvent.pointerMove(firstCard, { clientX: 300, clientY: 200 });
    fireEvent.pointerUp(firstCard, { clientX: 300, clientY: 200 });
    
    await waitFor(() => {
      const secondCard = screen.getByText('Expression 2');
      expect(secondCard).toBeInTheDocument();
    });
  });
});
```

### 10.3 Performance Tests

```typescript
describe('Performance', () => {
  test('card flip maintains 60fps', async () => {
    const { container } = render(<ExpressionCard expression={mockExpression} />);
    
    const card = container.querySelector('.card-inner');
    
    // Measure animation frames
    const frames = await measureAnimationFrames(() => {
      fireEvent.click(card);
    });
    
    // Should complete in ~36 frames (600ms at 60fps)
    expect(frames).toBeLessThanOrEqual(40);
  });
  
  test('swipe gesture responds within 100ms', async () => {
    const onSwipe = jest.fn();
    render(<ExpressionCard expression={mockExpression} onSwipe={onSwipe} />);
    
    const card = screen.getByRole('button');
    const startTime = performance.now();
    
    // Swipe
    fireEvent.pointerDown(card, { clientX: 100, clientY: 200 });
    fireEvent.pointerMove(card, { clientX: 300, clientY: 200 });
    fireEvent.pointerUp(card, { clientX: 300, clientY: 200 });
    
    await waitFor(() => {
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100);
    });
  });
});
```

---

## 11. Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS 3D Transforms | ✅ | ✅ | ✅ | ✅ |
| `perspective` | ✅ | ✅ | ✅ | ✅ |
| `transform-style: preserve-3d` | ✅ | ✅ | ✅ | ✅ |
| `backface-visibility` | ✅ | ✅ | ✅ (prefix) | ✅ |
| Pointer Events | ✅ | ✅ | ✅ | ✅ |
| `navigator.vibrate` | ✅ | ✅ | ❌ | ✅ |
| `prefers-reduced-motion` | ✅ | ✅ | ✅ | ✅ |

**Minimum Supported:**
- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+

---

## Appendix A: Alternative Approaches

### React Spring (Lighter Alternative)

```tsx
import { useSpring, animated } from '@react-spring/web';

function CardFlip({ isFlipped }: { isFlipped: boolean }) {
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(1000px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  
  return (
    <animated.div style={{ opacity: opacity.to(o => 1 - o), transform }}>
      {/* Front face */}
    </animated.div>
  );
}
```

**Pros:** Smaller bundle (~20KB), physics-based
**Cons:** More complex API, less gesture support

### Pure CSS + Custom Gestures

```css
/* Card flip with pure CSS */
.card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}
```

```typescript
// Custom gesture handling
function useSwipe(elementRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    let startX = 0;
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;
      
      if (Math.abs(deltaX) > 100 || Math.abs(deltaY) > 100) {
        // Trigger swipe
      }
    };
    
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
}
```

**Pros:** 0KB bundle, full control
**Cons:** More code, physics-based animations require manual implementation

---

## Appendix B: References

1. **Framer Motion Docs:** [motion.dev](https://motion.dev/)
2. **@use-gesture Docs:** [use-gesture.netlify.app](https://use-gesture.netlify.app/)
3. **CSS 3D Transforms:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms)
4. **Haptic Feedback:** [MDN Navigator.vibrate](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate)
5. **Accessibility:** [WCAG 2.1 - Animations](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)

---

*This specification will be updated as implementation progresses and user testing feedback is gathered.*
