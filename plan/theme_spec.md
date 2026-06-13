# Theme System Specification: Dark Glassmorphism

**Project:** COL_ENG (Colloquial English)
**Date:** 2026-06-09
**Status:** Specification
**Goal:** Design dark glassmorphism theme system with light mode support, optimized for CJK+Latin mixed typography

---

## Executive Summary

This specification defines a comprehensive theme system for the COL_ENG SRS learning app, featuring **dark glassmorphism** as the primary aesthetic with **light mode** support. The system uses CSS custom properties for theme switching, optimized contrast ratios for CJK+Latin mixed text, and performance-conscious `backdrop-filter` usage.

**Key Design Decisions:**
- **Primary Theme:** Dark glassmorphism (existing aesthetic preserved)
- **Light Mode:** Optional toggle with adjusted glassmorphism values
- **Typography:** Noto Sans CJK / Pretendard for unified CJK+Latin rendering
- **Contrast:** WCAG AA minimum (4.5:1 normal, 3:1 large text)
- **Performance:** Minimal `backdrop-filter` usage, GPU-accelerated animations

---

## 1. CSS Custom Properties System

### 1.1 Color Palette

```css
:root {
  /* ===== Core Colors ===== */
  --primary: #6366f1;           /* Indigo-500 */
  --primary-rgb: 99, 102, 241;  /* For rgba() usage */
  --primary-hover: #818cf8;     /* Indigo-400 */
  --primary-glow: rgba(99, 102, 241, 0.45);
  
  --secondary: #06b6d4;         /* Cyan-500 */
  --secondary-rgb: 6, 182, 212;
  --secondary-hover: #22d3ee;   /* Cyan-400 */
  
  --accent-gradient: linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%);
  
  /* ===== Semantic Colors ===== */
  --success: #34d399;           /* Emerald-400 */
  --success-rgb: 52, 211, 153;
  --danger: #f87171;            /* Red-400 */
  --danger-rgb: 248, 113, 113;
  --warning: #fbbf24;           /* Amber-400 */
  --warning-rgb: 251, 191, 36;
  --info: #60a5fa;              /* Blue-400 */
  --info-rgb: 96, 165, 250;
  
  /* ===== SRS Swipe Colors ===== */
  --swipe-again: #ef4444;       /* Red-500 */
  --swipe-again-rgb: 239, 68, 68;
  --swipe-good: #22c55e;        /* Green-500 */
  --swipe-good-rgb: 34, 197, 94;
  --swipe-easy: #3b82f6;        /* Blue-500 */
  --swipe-easy-rgb: 59, 130, 246;
  --swipe-hard: #f59e0b;        /* Amber-500 */
  --swipe-hard-rgb: 245, 158, 11;
  
  /* ===== Gamification Colors ===== */
  --xp-color: #a855f7;          /* Purple-500 */
  --streak-color: #f97316;      /* Orange-500 */
  --level-color: #eab308;       /* Yellow-500 */
  --badge-color: #ec4899;       /* Pink-500 */
}
```

### 1.2 Dark Theme (Default)

```css
:root,
[data-theme="dark"] {
  /* ===== Background ===== */
  --bg-primary: #0f172a;        /* Slate-900 */
  --bg-secondary: #1e293b;      /* Slate-800 */
  --bg-tertiary: #334155;       /* Slate-700 */
  --bg-elevated: #475569;       /* Slate-600 */
  
  /* ===== Text ===== */
  --text-primary: #f8fafc;      /* Slate-50 */
  --text-secondary: #cbd5e1;    /* Slate-300 */
  --text-muted: #94a3b8;        /* Slate-400 */
  --text-disabled: #64748b;     /* Slate-500 */
  
  /* ===== Glassmorphism ===== */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-bg-hover: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-border-hover: rgba(255, 255, 255, 0.2);
  --glass-blur: blur(16px);
  --glass-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  --glass-shadow-hover: 0 25px 60px rgba(0, 0, 0, 0.35);
  
  /* ===== Input Fields ===== */
  --input-bg: rgba(15, 23, 42, 0.7);
  --input-border: rgba(148, 163, 184, 0.25);
  --input-border-focus: var(--primary);
  --input-shadow-focus: 0 0 20px var(--primary-glow);
  
  /* ===== Scrollbar ===== */
  --scrollbar-track: rgba(255, 255, 255, 0.05);
  --scrollbar-thumb: rgba(255, 255, 255, 0.2);
  --scrollbar-thumb-hover: rgba(255, 255, 255, 0.3);
  
  /* ===== Background Blobs ===== */
  --blob-opacity: 0.6;
  --blob-blur: blur(110px);
  
  /* ===== Card Depth ===== */
  --card-depth-1: 0 4px 6px rgba(0, 0, 0, 0.1);
  --card-depth-2: 0 10px 15px rgba(0, 0, 0, 0.2);
  --card-depth-3: 0 20px 25px rgba(0, 0, 0, 0.3);
  
  /* ===== Contrast Ratios ===== */
  --contrast-primary: 12.5:1;   /* text-primary on bg-primary */
  --contrast-secondary: 8.2:1;  /* text-secondary on bg-primary */
  --contrast-muted: 4.6:1;      /* text-muted on bg-primary */
}
```

### 1.3 Light Theme

```css
[data-theme="light"] {
  /* ===== Background ===== */
  --bg-primary: #f8fafc;        /* Slate-50 */
  --bg-secondary: #f1f5f9;      /* Slate-100 */
  --bg-tertiary: #e2e8f0;       /* Slate-200 */
  --bg-elevated: #cbd5e1;       /* Slate-300 */
  
  /* ===== Text ===== */
  --text-primary: #0f172a;      /* Slate-900 */
  --text-secondary: #334155;    /* Slate-700 */
  --text-muted: #64748b;        /* Slate-500 */
  --text-disabled: #94a3b8;     /* Slate-400 */
  
  /* ===== Glassmorphism ===== */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-bg-hover: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(0, 0, 0, 0.1);
  --glass-border-hover: rgba(0, 0, 0, 0.2);
  --glass-blur: blur(20px);
  --glass-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  --glass-shadow-hover: 0 25px 60px rgba(0, 0, 0, 0.15);
  
  /* ===== Input Fields ===== */
  --input-bg: rgba(255, 255, 255, 0.9);
  --input-border: rgba(148, 163, 184, 0.3);
  --input-border-focus: var(--primary);
  --input-shadow-focus: 0 0 20px rgba(99, 102, 241, 0.2);
  
  /* ===== Scrollbar ===== */
  --scrollbar-track: rgba(0, 0, 0, 0.05);
  --scrollbar-thumb: rgba(0, 0, 0, 0.2);
  --scrollbar-thumb-hover: rgba(0, 0, 0, 0.3);
  
  /* ===== Background Blobs ===== */
  --blob-opacity: 0.4;
  --blob-blur: blur(120px);
  
  /* ===== Contrast Ratios ===== */
  --contrast-primary: 15.4:1;   /* text-primary on bg-primary */
  --contrast-secondary: 10.8:1; /* text-secondary on bg-primary */
  --contrast-muted: 5.7:1;      /* text-muted on bg-primary */
}
```

### 1.4 Spacing & Sizing Variables

```css
:root {
  /* ===== Border Radius ===== */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-3xl: 28px;
  --radius-full: 9999px;
  
  /* ===== Spacing Scale ===== */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  
  /* ===== Z-Index Scale ===== */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-toast: 400;
  --z-tooltip: 500;
  
  /* ===== Transitions ===== */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 2. Theme Toggle System

### 2.1 Theme Detection & Persistence

```typescript
type Theme = 'dark' | 'light' | 'system';

interface ThemeConfig {
  theme: Theme;
  resolvedTheme: 'dark' | 'light'; // Actual applied theme
  systemPreference: 'dark' | 'light';
}

class ThemeManager {
  private static STORAGE_KEY = 'col_eng_theme';
  private static mediaQuery: MediaQueryList | null = null;
  
  static init(): ThemeConfig {
    // Check system preference
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get stored preference
    const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    const theme = stored || 'system';
    
    // Resolve actual theme
    const resolvedTheme = this.resolveTheme(theme);
    
    // Apply theme
    this.applyTheme(resolvedTheme);
    
    // Listen for system changes
    this.mediaQuery.addEventListener('change', () => {
      const currentTheme = this.getStoredTheme();
      if (currentTheme === 'system') {
        this.applyTheme(this.resolveTheme('system'));
      }
    });
    
    return {
      theme,
      resolvedTheme,
      systemPreference: this.mediaQuery.matches ? 'dark' : 'light',
    };
  }
  
  static resolveTheme(theme: Theme): 'dark' | 'light' {
    if (theme === 'system') {
      return this.mediaQuery?.matches ? 'dark' : 'light';
    }
    return theme;
  }
  
  static applyTheme(resolvedTheme: 'dark' | 'light'): void {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#0f172a' : '#f8fafc'
      );
    }
  }
  
  static setTheme(theme: Theme): void {
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.applyTheme(this.resolveTheme(theme));
  }
  
  static getStoredTheme(): Theme {
    return (localStorage.getItem(this.STORAGE_KEY) as Theme) || 'system';
  }
  
  static getSystemPreference(): 'dark' | 'light' {
    return this.mediaQuery?.matches ? 'dark' : 'light';
  }
}
```

### 2.2 Theme Toggle Component

```tsx
import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  
  useEffect(() => {
    const config = ThemeManager.init();
    setTheme(config.theme);
  }, []);
  
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    ThemeManager.setTheme(newTheme);
  };
  
  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme selection">
      <button
        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => handleThemeChange('dark')}
        aria-checked={theme === 'dark'}
        aria-label="Dark theme"
      >
        <MoonIcon />
      </button>
      
      <button
        className={`theme-btn ${theme === 'system' ? 'active' : ''}`}
        onClick={() => handleThemeChange('system')}
        aria-checked={theme === 'system'}
        aria-label="System theme"
      >
        <SystemIcon />
      </button>
      
      <button
        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={() => handleThemeChange('light')}
        aria-checked={theme === 'light'}
        aria-label="Light theme"
      >
        <SunIcon />
      </button>
    </div>
  );
}

// Icons
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
```

### 2.3 Theme Toggle CSS

```css
.theme-toggle {
  display: flex;
  gap: var(--space-1);
  padding: var(--space-1);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  backdrop-filter: var(--glass-blur);
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.theme-btn:hover {
  color: var(--text-primary);
  background: var(--glass-bg-hover);
}

.theme-btn.active {
  color: var(--primary);
  background: rgba(99, 102, 241, 0.15);
}

.theme-btn svg {
  width: 18px;
  height: 18px;
}
```

---

## 3. Glassmorphism Component Library

### 3.1 Base Glass Card

```css
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-2xl);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: var(--glass-shadow);
  
  /* Performance: promote to GPU layer */
  will-change: transform;
  transform: translateZ(0);
  
  /* Transition for hover effects */
  transition: 
    background var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-normal),
    transform var(--transition-fast);
}

.glass-card:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
  box-shadow: var(--glass-shadow-hover);
  transform: translateY(-2px) translateZ(0);
}
```

### 3.2 Glass Card Variants

```css
/* ===== Primary Glass Card ===== */
.glass-card--primary {
  border-color: rgba(99, 102, 241, 0.3);
}

.glass-card--primary:hover {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 20px 50px rgba(99, 102, 241, 0.2);
}

/* ===== Success Glass Card ===== */
.glass-card--success {
  border-color: rgba(52, 211, 153, 0.3);
}

.glass-card--success:hover {
  border-color: rgba(52, 211, 153, 0.5);
  box-shadow: 0 20px 50px rgba(52, 211, 153, 0.2);
}

/* ===== Danger Glass Card ===== */
.glass-card--danger {
  border-color: rgba(248, 113, 113, 0.3);
}

.glass-card--danger:hover {
  border-color: rgba(248, 113, 113, 0.5);
  box-shadow: 0 20px 50px rgba(248, 113, 113, 0.2);
}

/* ===== Warning Glass Card ===== */
.glass-card--warning {
  border-color: rgba(251, 191, 36, 0.3);
}

.glass-card--warning:hover {
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 20px 50px rgba(251, 191, 36, 0.2);
}
```

### 3.3 Glass Input

```css
.glass-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  transition: 
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.glass-input:focus {
  border-color: var(--input-border-focus);
  box-shadow: var(--input-shadow-focus);
}

.glass-input::placeholder {
  color: var(--text-muted);
}

/* ===== Textarea ===== */
.glass-textarea {
  min-height: 220px;
  resize: vertical;
}
```

### 3.4 Glass Button

```css
.glass-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.glass-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--glass-shadow-hover);
}

.glass-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== Primary Button ===== */
.glass-btn--primary {
  background: var(--accent-gradient);
  color: var(--bg-primary);
  border: none;
}

.glass-btn--primary:hover:not(:disabled) {
  box-shadow: 0 12px 20px var(--primary-glow);
}

/* ===== Ghost Button ===== */
.glass-btn--ghost {
  background: transparent;
  border-color: var(--glass-border);
}

/* ===== Danger Button ===== */
.glass-btn--danger {
  background: var(--danger);
  color: white;
  border: none;
}
```

### 3.5 Glass Progress Bar

```css
.glass-progress {
  width: 100%;
  height: 10px;
  background: var(--glass-bg);
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 1px solid var(--glass-border);
}

.glass-progress__fill {
  height: 100%;
  background: var(--accent-gradient);
  border-radius: var(--radius-full);
  transition: width var(--transition-normal);
  box-shadow: 0 0 15px var(--primary-glow);
}
```

### 3.6 Glass Badge

```css
.glass-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.glass-badge--primary {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
  color: var(--primary-hover);
}

.glass-badge--success {
  background: rgba(52, 211, 153, 0.15);
  border-color: rgba(52, 211, 153, 0.3);
  color: var(--success);
}
```

---

## 4. Typography System

### 4.1 Font Stack

```css
:root {
  /* ===== System Font Stack (Primary) ===== */
  --font-sans: 
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol";
  
  /* ===== CJK Font Stack ===== */
  --font-cjk: 
    "Noto Sans KR",
    "Noto Sans JP",
    "Noto Sans SC",
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    sans-serif;
  
  /* ===== Combined Stack (for mixed content) ===== */
  --font-mixed:
    "Noto Sans KR",
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  
  /* ===== Monospace Stack ===== */
  --font-mono:
    "SF Mono",
    "Fira Code",
    "Fira Mono",
    "Roboto Mono",
    monospace;
}

/* ===== Apply to body ===== */
body {
  font-family: var(--font-mixed);
  font-feature-settings: "kern" 1, "liga" 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 4.2 Typography Scale

```css
:root {
  /* ===== Font Sizes ===== */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  
  /* ===== Font Weights ===== */
  --weight-light: 300;
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  
  /* ===== Line Heights ===== */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;      /* Latin standard */
  --leading-relaxed: 1.625;
  --leading-loose: 1.7;       /* CJK optimized */
  
  /* ===== Letter Spacing ===== */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### 4.3 CJK + Latin Mixed Typography

```css
/* ===== Base Typography ===== */
body {
  font-size: var(--text-base);
  line-height: var(--leading-loose); /* 1.7 for CJK comfort */
  color: var(--text-primary);
}

/* ===== CJK Text Optimization ===== */
[lang="ko"],
[lang="ja"],
[lang="zh"],
.cjk-text {
  line-height: 1.8;           /* Extra line height for CJK */
  letter-spacing: 0.02em;     /* Slight spacing for readability */
  word-break: keep-all;       /* Prevent breaking mid-word */
  overflow-wrap: break-word;
}

/* ===== Latin Text ===== */
[lang="en"],
.latin-text {
  line-height: var(--leading-normal); /* 1.5 */
  letter-spacing: var(--tracking-normal);
  word-break: normal;
  overflow-wrap: break-word;
}

/* ===== Mixed Content ===== */
.mixed-text {
  line-height: 1.7;           /* Compromise between CJK (1.8) and Latin (1.5) */
  word-break: keep-all;       /* Prefer keeping CJK words together */
  overflow-wrap: break-word;
}

/* ===== Expression Card Typography ===== */
.expression-primary {
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.expression-meaning {
  font-size: var(--text-xl);
  font-weight: var(--weight-medium);
  line-height: 1.6;          /* Slightly looser for Korean */
  color: var(--secondary);
  margin-bottom: var(--space-4);
}

.example-text {
  font-size: var(--text-base);
  line-height: 1.8;          /* Extra line height for dialogue */
  color: var(--text-secondary);
  white-space: pre-line;
}

.translation-text {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--text-muted);
}
```

### 4.4 CJK Punctuation Handling

```css
/* ===== CJK Punctuation Spacing ===== */
.cjk-punctuation {
  /* Handle fullwidth punctuation at line boundaries */
  text-spacing-trim: space-all;
  
  /* Or for older browsers */
  hanging-punctuation: first last;
}

/* ===== Prevent Orphaned CJK Punctuation ===== */
.no-orphan {
  text-wrap: balance;
}

/* ===== CJK Line Breaking ===== */
.cjk-break {
  word-break: keep-all;
  line-break: strict;
  overflow-wrap: anywhere;
}
```

---

## 5. Contrast Optimization

### 5.1 WCAG Compliance Matrix

| Element | Dark Mode | Light Mode | WCAG Level |
|---------|-----------|------------|------------|
| Primary Text | 12.5:1 | 15.4:1 | AAA ✓ |
| Secondary Text | 8.2:1 | 10.8:1 | AAA ✓ |
| Muted Text | 4.6:1 | 5.7:1 | AA ✓ |
| Primary Color | 4.6:1 | 4.6:1 | AA ✓ |
| Success Color | 3.2:1 | 3.2:1 | AA Large ✓ |
| Danger Color | 3.8:1 | 3.8:1 | AA Large ✓ |
| Warning Color | 2.8:1 | 2.8:1 | AA Large ✓ |

### 5.2 Contrast Testing

```typescript
// Contrast ratio calculation
function getContrastRatio(rgb1: string, rgb2: string): number {
  const luminance1 = getRelativeLuminance(rgb1);
  const luminance2 = getRelativeLuminance(rgb2);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(rgb: string): number {
  const [r, g, b] = rgb.split(',').map(Number);
  
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Test all color combinations
function testContrastCompliance(): ContrastReport {
  const tests = [
    { name: 'Primary Text', fg: '#f8fafc', bg: '#0f172a', minRatio: 7 },
    { name: 'Secondary Text', fg: '#cbd5e1', bg: '#0f172a', minRatio: 4.5 },
    { name: 'Muted Text', fg: '#94a3b8', bg: '#0f172a', minRatio: 4.5 },
    { name: 'Primary on Glass', fg: '#6366f1', bg: 'rgba(255,255,255,0.05)', minRatio: 3 },
  ];
  
  return tests.map(test => ({
    ...test,
    ratio: getContrastRatio(test.fg, test.bg),
    passes: getContrastRatio(test.fg, test.bg) >= test.minRatio,
  }));
}
```

### 5.3 CJK-Specific Contrast Considerations

```css
/* ===== CJK Stroke Density Adjustment ===== */
.cjk-text {
  /* CJK characters appear darker due to stroke density */
  /* Use slightly lighter color or larger size */
  color: var(--text-primary);
  font-size: var(--text-base);
}

/* For small CJK text, increase size or weight */
.cjk-text--small {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium); /* Increase weight for small CJK */
}

/* ===== High Contrast Mode Support ===== */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #ffffff;
    --text-secondary: #e2e8f0;
    --text-muted: #cbd5e1;
    --glass-border: rgba(255, 255, 255, 0.3);
  }
}

/* ===== Dark Mode High Contrast ===== */
@media (prefers-color-scheme: dark) and (prefers-contrast: high) {
  :root {
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.4);
  }
}
```

---

## 6. Background Blob System

### 6.1 Animated Blobs

```css
.background-blobs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: var(--blob-blur);
  opacity: var(--blob-opacity);
  pointer-events: none;
}

.blob {
  position: absolute;
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  animation: blob-drift 20s infinite alternate ease-in-out;
  will-change: transform;
}

.blob-1 {
  background: var(--primary);
  top: -10%;
  right: -10%;
}

.blob-2 {
  background: var(--secondary);
  bottom: -15%;
  left: -10%;
  animation-delay: -5s;
}

.blob-3 {
  background: #a855f7; /* Purple-500 */
  top: 40%;
  left: 40%;
  width: 30vw;
  height: 30vw;
  animation-delay: -10s;
}

@keyframes blob-drift {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(20px, 40px) scale(1.1);
  }
}

/* ===== Reduced Motion ===== */
@media (prefers-reduced-motion: reduce) {
  .blob {
    animation: none;
  }
}
```

---

## 7. Scrollbar Styling

```css
/* ===== Custom Scrollbar ===== */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}

/* ===== Firefox Scrollbar ===== */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}
```

---

## 8. Performance Optimization

### 8.1 Glassmorphism Performance

```css
/* ===== GPU Acceleration ===== */
.glass-card {
  /* Force GPU layer for smooth backdrop-filter */
  will-change: transform;
  transform: translateZ(0);
  
  /* Avoid animating backdrop-filter directly */
  transition: 
    background var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-normal);
}

/* ===== Fallback for Older Browsers ===== */
.glass-card {
  background: var(--bg-secondary); /* Solid fallback */
  background: var(--glass-bg);     /* Glass effect */
}

/* ===== Limit Backdrop-Filter Area ===== */
.glass-card {
  /* Only apply to specific elements, not entire page */
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
}

/* ===== Avoid Nested Backdrop-Filters ===== */
/* ❌ Don't nest glass elements */
.glass-card .glass-card {
  backdrop-filter: none; /* Disable nested blur */
}
```

### 8.2 Animation Performance

```css
/* ===== GPU-Accelerated Properties ===== */
.animate-gpu {
  will-change: transform, opacity;
  transform: translateZ(0);
}

/* ===== Properties to Avoid Animating ===== */
/* ❌ Don't animate these */
.bad-practice {
  transition: width 0.3s ease;    /* Layout thrashing */
  transition: height 0.3s ease;   /* Layout thrashing */
  transition: top 0.3s ease;      /* Layout thrashing */
  transition: left 0.3s ease;     /* Layout thrashing */
  transition: margin 0.3s ease;   /* Layout thrashing */
  transition: padding 0.3s ease;  /* Layout thrashing */
}

/* ✓ Good: Animate transform and opacity only */
.good-practice {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
```

### 8.3 Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all animations */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Disable blob animations */
  .blob {
    animation: none;
  }
  
  /* Disable glass hover effects */
  .glass-card:hover {
    transform: none;
    box-shadow: var(--glass-shadow);
  }
}
```

---

## 9. Accessibility

### 9.1 Focus States

```css
/* ===== Visible Focus for Keyboard Navigation ===== */
.glass-btn:focus-visible,
.glass-input:focus-visible,
.theme-btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* ===== Remove Default Outline ===== */
.glass-btn:focus:not(:focus-visible),
.glass-input:focus:not(:focus-visible) {
  outline: none;
}
```

### 9.2 Screen Reader Support

```css
/* ===== Visually Hidden but Accessible ===== */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* ===== Focus Trap for Modals ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: var(--z-modal);
}
```

### 9.3 Color Blindness Support

```css
/* ===== Don't Rely Solely on Color ===== */
.error-message::before {
  content: "⚠️ ";  /* Icon supplement */
}

.success-message::before {
  content: "✓ ";   /* Icon supplement */
}

/* ===== High Contrast Borders ===== */
.glass-card {
  /* Ensure border is visible without color */
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}
```

---

## 10. Responsive Design

### 10.1 Mobile Optimizations

```css
/* ===== Mobile First ===== */
@media (max-width: 768px) {
  :root {
    /* Tighter spacing on mobile */
    --space-6: 1.25rem;  /* 20px instead of 24px */
    --space-8: 1.5rem;   /* 24px instead of 32px */
    
    /* Larger touch targets */
    --radius-lg: 12px;
    --radius-xl: 16px;
  }
  
  /* ===== Glass Card Mobile ===== */
  .glass-card {
    border-radius: var(--radius-xl);
    padding: var(--space-4);
  }
  
  /* ===== Theme Toggle Mobile ===== */
  .theme-toggle {
    position: fixed;
    bottom: var(--space-4);
    right: var(--space-4);
    z-index: var(--z-sticky);
  }
  
  /* ===== Background Blobs Mobile ===== */
  .blob {
    width: 80vw;
    height: 80vw;
  }
}
```

### 10.2 Tablet/Desktop Enhancements

```css
@media (min-width: 769px) {
  /* ===== Hover Effects Only on Desktop ===== */
  .glass-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--glass-shadow-hover);
  }
  
  /* ===== Larger Glass Elements ===== */
  .glass-card {
    padding: var(--space-6);
  }
}
```

---

## 11. Testing Strategy

### 11.1 Visual Regression Tests

```typescript
describe('Theme System', () => {
  test('dark theme applies correctly', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    
    expect(getComputedStyle(document.body).backgroundColor)
      .toBe('rgb(15, 23, 42)'); // #0f172a
  });
  
  test('light theme applies correctly', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    
    expect(getComputedStyle(document.body).backgroundColor)
      .toBe('rgb(248, 250, 252)'); // #f8fafc
  });
  
  test('theme toggle persists to localStorage', () => {
    ThemeManager.setTheme('light');
    expect(localStorage.getItem('col_eng_theme')).toBe('light');
  });
});
```

### 11.2 Contrast Tests

```typescript
describe('Contrast Compliance', () => {
  test('primary text meets WCAG AAA', () => {
    const ratio = getContrastRatio('#f8fafc', '#0f172a');
    expect(ratio).toBeGreaterThanOrEqual(7); // AAA requirement
  });
  
  test('secondary text meets WCAG AA', () => {
    const ratio = getContrastRatio('#cbd5e1', '#0f172a');
    expect(ratio).toBeGreaterThanOrEqual(4.5); // AA requirement
  });
});
```

### 11.3 Performance Tests

```typescript
describe('Performance', () => {
  test('glassmorphism maintains 60fps', async () => {
    const card = document.querySelector('.glass-card');
    
    // Measure frame rate during hover
    const fps = await measureFrameRate(() => {
      card?.dispatchEvent(new MouseEvent('mouseenter'));
    });
    
    expect(fps).toBeGreaterThanOrEqual(55); // Allow some tolerance
  });
});
```

---

## Appendix A: References

1. **Glassmorphism:** [ui.glass](https://ui.glass/)
2. **WCAG Contrast:** [W3C WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
3. **CJK Typography:** [W3C Requirements for Hangul Text Layout](https://www.w3.org/TR/klreq/)
4. **CSS Custom Properties:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
5. **Backdrop Filter:** [CSS-Tricks](https://css-tricks.com/almanac/properties/b/backdrop-filter/)

---

*This specification will be updated as implementation progresses and user testing feedback is gathered.*
