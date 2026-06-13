# Framework Upgrade Specification

**Project:** Colloquial English (COL_ENG)  
**Current State:** Vanilla JS + Firebase SDK  
**Target State:** Astro + React Islands + TypeScript  
**Date:** 2026-06-07  

---

## Table of Contents

1. [Overview](#1-overview)
2. [Current Architecture](#2-current-architecture)
3. [Target Architecture](#3-target-architecture)
4. [Framework Choices](#4-framework-choices)
5. [Project Structure](#5-project-structure)
6. [Component Architecture](#6-component-architecture)
7. [Data Layer](#7-data-layer)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [Search Implementation](#9-search-implementation)
10. [Styling System](#10-styling-system)
11. [Build & Deployment](#11-build--deployment)
12. [Migration Strategy](#12-migration-strategy)
13. [Edge Cases & Considerations](#13-edge-cases--considerations)
14. [Testing Strategy](#14-testing-strategy)
15. [Performance Targets](#15-performance-targets)

---

## 1. Overview

### 1.1 Objective
Upgrade the COL_ENG project from vanilla JavaScript to a modern framework (Astro + React) while maintaining feature parity, improving developer experience, and ensuring GitHub Pages compatibility.

### 1.2 Key Decisions
- **Framework:** Astro v6+ (static-first, island architecture)
- **Interactive Islands:** React (for search UI, admin panel)
- **Language:** TypeScript
- **Styling:** Scoped CSS (Astro built-in)
- **Firebase SDK:** Official Firebase JS SDK (v12+)
- **Deployment:** GitHub Actions → GitHub Pages
- **Theme:** Dark mode + Light mode toggle
- **Fonts:** System font stack

### 1.3 Non-Goals
- No server-side rendering (SSR)
- No backend changes (Firebase services remain unchanged)
- No database migration
- No changes to Firebase Firestore schema

---

## 2. Current Architecture

### 2.1 Pages
| Page | File | Purpose |
|------|------|---------|
| Search | `index.html` + `app.js` | User-facing search UI |
| Admin | `admin.html` + `admin.js` | Content management, AI generation |

### 2.2 Dependencies
- Firebase App v11.10.0 (search) / v12.14.0 (admin)
- Firebase Firestore (offline persistence + delta sync)
- Firebase Auth (anonymous for search, Google for admin)
- Firebase AI Logic / Vertex AI (generation)
- Vanilla JS (ES modules)
- Google Fonts CDN (Outfit, Playfair Display)

### 2.3 Data Flow
```
┌─────────────────────────────────────────────────────────────┐
│                     Static Bundle                           │
│              (initial_data.json, ~1400 records)              │
└─────────────────────┬───────────────────────────────────────┘
                      │ fetch()
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   Firestore Cache                           │
│          (IndexedDB, persistentLocalCache)                  │
└─────────────────────┬───────────────────────────────────────┘
                      │ Delta Sync
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   Firestore Server                          │
│          (where("id", ">", lastId), limit(500))             │
└─────────────────────────────────────────────────────────────┘
```

### 2.4 Key Features
- Delta sync (only fetch new records)
- Offline persistence (IndexedDB)
- Version-based cache invalidation
- `forcedownload` magic command
- Real-time version listener
- Google Fonts CDN
- Dark theme only

---

## 3. Target Architecture

### 3.1 Astro Island Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Astro Static Shell                        │
│              (HTML, CSS, fonts, metadata)                    │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  React Island: SearchApp (client:load)                │  │
│  │  - Search input                                       │  │
│  │  - Results grid                                       │  │
│  │  - Daily expression                                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  React Island: AdminPanel (client:load, auth-gated)   │  │
│  │  - Auth controls                                      │  │
│  │  - Expression editor                                  │  │
│  │  - AI generation                                      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Routing
- `/` → Search page (public)
- `/admin/` → Admin panel (Firebase Auth protected)
- `/404.html` → Static fallback page for GitHub Pages

### 3.3 Key Differences from Current
| Aspect | Current | Target |
|--------|---------|--------|
| Auth (search) | Firebase Anonymous | None unless Firestore rules require it |
| Auth (admin) | Google OAuth | Firebase Auth + Firestore Rules |
| Theme | Dark only | Dark + Light toggle |
| Fonts | Google CDN | System font stack |
| Bundle | Vanilla JS | Astro + React |
| Build | None (direct HTML) | Vite (Astro) |

---

## 4. Framework Choices

### 4.1 Astro (v6+)
**Why Astro?**
- Static-first: outputs pure HTML/CSS/JS by default
- Island architecture: interactive components only where needed
- Perfect for GitHub Pages (no server required)
- Built-in TypeScript support
- Scoped CSS out of the box
- Fast: zero JS by default, ships only what's needed

**Key Features Used:**
- `client:load` directive for React islands
- `import.meta.env` for environment variables
- Scoped `<style>` for component CSS
- `Astro.glob()` for build-time data (if needed)

### 4.2 React (v19+)
**Why React?**
- Component-based UI
- Huge ecosystem
- Great for complex interactive UIs
- TypeScript support
- Firebase SDK has official React hooks (optional)

**Usage:**
- SearchApp component (public)
- AdminPanel component (auth-gated)
- Shared components (cards, buttons, modals)

### 4.3 TypeScript
**Benefits:**
- Type safety for Firebase data models
- Better IDE support
- Catch errors at compile time
- Document component props

---

## 5. Project Structure

### 5.1 New Directory Layout
```
col_eng/
├── astro.config.mjs          # Astro configuration
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies
├── public/                   # Static assets (copied as-is)
│   ├── initial_data.json     # Static bundle (optimized)
│   └── favicon.svg
├── src/
│   ├── components/           # React components
│   │   ├── search/
│   │   │   ├── SearchApp.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── ResultsGrid.tsx
│   │   │   ├── ExpressionCard.tsx
│   │   │   └── DailyExpression.tsx
│   │   ├── admin/
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── AuthCard.tsx
│   │   │   ├── ExpressionEditor.tsx
│   │   │   └── StatusBox.tsx
│   │   └── shared/
│   │       ├── ThemeToggle.tsx
│   │       ├── Footer.tsx
│   │       └── LoadingSpinner.tsx
│   ├── lib/                  # Utilities & Firebase config
│   │   ├── firebase.ts       # Firebase initialization
│   │   ├── firestore.ts      # Firestore operations
│   │   ├── auth.ts           # Auth functions
│   │   ├── search.ts         # Search logic
│   │   └── sync.ts           # Delta sync logic
│   ├── types/                # TypeScript types
│   │   └── index.ts          # Expression, Config, etc.
│   ├── pages/                # Astro pages
│   │   ├── index.astro       # Search page
│   │   ├── admin.astro       # Admin page
│   │   └── 404.astro         # GitHub Pages SPA routing
│   └── styles/               # Global styles
│       └── global.css        # CSS variables, theme
├── db/                       # Keep as-is (not deployed)
├── functions/                # Keep as-is (not deployed)
└── sources/                  # Keep as-is (not deployed)
```

### 5.2 Files to Keep As-Is
- `db/` - Database scripts (not deployed)
- `functions/` - Firebase Functions (not deployed)
- `sources/` - Source data (not deployed)
- `firestore.rules` - Firestore rules
- `firestore.indexes.json` - Firestore indexes
- `.firebaserc` - Firebase project config

### 5.3 Files to Migrate
- `app.js` → `src/components/search/SearchApp.tsx`
- `admin.js` → `src/components/admin/AdminPanel.tsx`
- `index.css` → Scoped CSS in components
- `admin.css` → Scoped CSS in components
- `initial_data.json` → `public/initial_data.json`

### 5.4 Files to Delete
- **`env_config.js`** — Replaced by Astro environment variables (`import.meta.env`). This file is auto-injected by GitHub Actions in the current setup, but Astro handles env vars natively at build time. Remove this file from the repo after migration.
- `index.html` — Replaced by `src/pages/index.astro`
- `admin.html` — Replaced by `src/pages/admin.astro`
- `app.js` — Ported to React component
- `admin.js` — Ported to React component
- `index.css` — Replaced by scoped CSS
- `admin.css` — Replaced by scoped CSS

### 5.5 Firebase Functions (Not Deployed to GitHub Pages)

**Important:** The `functions/` directory contains server-side Node.js code (Cloud Functions) that **cannot run on GitHub Pages**. These functions remain on Firebase Hosting / Firebase infrastructure only.

**Deployment split after migration:**
- **GitHub Pages:** Astro-generated `dist/` output (`index.html`, `admin/index.html`, static assets)
- **Firebase Functions / Cloud Functions:** `functions/` server-side logic
- **Firebase project config:** Firestore rules, indexes, Auth providers, and security config remain managed by Firebase CLI / Firebase Console

**Note:** If Firebase Functions are currently deployed via `firebase deploy`, they will continue to work independently of the GitHub Pages migration. No changes needed to `functions/` directory.

---

## 6. Component Architecture

### 6.1 Search Components

#### SearchApp.tsx
```typescript
// Root component for search page
// Handles: data loading, search state, theme

interface SearchAppProps {
  initialData?: Expression[];
}

// Features:
// - Delta sync logic (ported from app.js)
// - Search state management
// - Daily expression selection
// - `forcedownload` magic command
```

#### SearchInput.tsx
```typescript
interface SearchInputProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

// Features:
// - Debounced input
// - Loading state
// - Success message display
```

#### ResultsGrid.tsx
```typescript
interface ResultsGridProps {
  results: Expression[];
  searchQuery: string;
  isLoading: boolean;
}

// Features:
// - Responsive grid layout
// - Loading states (spinner, progress bar)
// - Empty states (no results, error)
```

#### ExpressionCard.tsx
```typescript
interface ExpressionCardProps {
  expression: Expression;
  highlightQuery?: string;
}

// Features:
// - Card display with hover effects
// - Keyword highlighting
// - Translation display
// - Similar expressions tags
```

### 6.2 Admin Components

#### AdminPanel.tsx
```typescript
// Root component for admin page
// Features:
// - Firebase Auth state handling
// - Expression editor
// - AI generation (Vertex AI)
// - Status logging
```

#### AuthCard.tsx
```typescript
interface AuthCardProps {
  user: User | null;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  isAuthorized: boolean;
}

// Features:
// - Google sign-in/sign-out
// - Unauthorized state display
// - Auth loading state
```

#### ExpressionEditor.tsx
```typescript
interface ExpressionEditorProps {
  onSave: (expression: Expression) => void;
  onGenerate: (primary: string) => void;
}

// Features:
// - Primary expression input
// - Check for duplicates
// - Generate JSON via AI
// - Validate and save
```

### 6.3 Shared Components

#### ThemeToggle.tsx
```typescript
interface ThemeToggleProps {
  onToggle: () => void;
  currentTheme: 'dark' | 'light';
}

// Features:
// - Toggle button
// - System preference detection
// - localStorage persistence
```

---

## 7. Data Layer

### 7.1 Firebase Configuration

#### src/lib/firebase.ts
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Use Astro env vars
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 7.2 Delta Sync Logic

#### src/lib/sync.ts
Port existing logic from `app.js`:

```typescript
// Key functions to port:
// - fetchAllExpressions()
// - Delta sync with where("id", ">", lastId)
// - Cache invalidation (version check)
// - `forcedownload` command handling

// Changes:
// - Remove anonymous auth (public access)
// - Use Astro env vars for config
// - TypeScript types for all data
```

### 7.3 Data Models

#### src/types/index.ts
```typescript
export interface Expression {
  id: number;
  primary: string;
  meaning: string;
  similar: string[];
  example: string;
  japanese?: string;
  chinese?: string;
  spanish?: string;
  vietnamese?: string;
}

export interface SyncState {
  lastId: number;
  lastSyncDate: string;
  appVersion: string;
}

export interface SearchFilters {
  query: string;
  fields: ('primary' | 'meaning' | 'similar' | 'example')[];
}
```

### 7.4 Static Bundle Optimization

**Current:** `initial_data.json` (~1400 records, ~500KB)

**Optimization Strategy:**
1. Keep as static file in `public/`
2. Compress with gzip (Astro handles this)
3. Lazy load after initial render
4. Cache aggressively (immutable hash)

**Loading Strategy:**
```
1. Show loading skeleton (instant)
2. Fetch static bundle (parallel with page load)
3. Render expressions
4. Delta sync in background (if needed)
```

---

## 8. Authentication & Authorization

### 8.1 Search Page (Public)

**Current:** Firebase Anonymous Auth  
**Target:** No auth required

**Changes:**
- Remove `signInAnonymously()` call
- Update Firestore rules to allow public read access
- Keep Firestore security rules for write operations

**Firestore Rules Update:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for expressions
    match /expressions/{doc} {
      allow read: if true;
      allow write: if false; // Admin only via admin SDK
    }
    
    // Admin-only for EnglishExpressions
    match /EnglishExpressions/{doc} {
      allow read: if request.auth != null;
      allow write: if false; // Admin SDK only
    }
  }
}
```

### 8.2 Admin Panel (Firebase Auth)

**Current:** Google OAuth via Firebase Auth  
**Target:** Firebase Auth with explicit write authorization

GitHub Pages is a static host and cannot keep server-side secrets. Do not validate an admin password in client-side code and do not ship an admin secret through Astro environment variables. Client-side password checks are only UI gates and do not protect Firestore writes.

#### Recommended: Firebase Auth + Firestore Rules
```typescript
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function signInAdmin() {
  return signInWithPopup(auth, provider);
}
```

Authorization must be enforced by Firebase, not by the React UI:

- Keep Google OAuth for the admin route.
- Restrict write access in Firestore Rules by UID, email allowlist, or custom claims.
- Use the UI auth state only to show/hide admin controls.
- If stronger separation is needed, move admin writes and AI generation behind callable Cloud Functions.

#### Optional: Firebase Custom Claims
```typescript
// Firestore Rules can check request.auth.token.admin == true.
// Claims must be assigned by a trusted server or Firebase Admin SDK script.
```

**Admin Panel Flow:**
```
1. User visits /admin
2. App observes Firebase Auth state
3. If signed out, show Google sign-in
4. If signed in, Firestore Rules decide whether reads/writes are allowed
5. If unauthorized, show read-only/denied state
6. If authorized, show admin UI
```

---

## 9. Search Implementation

### 9.1 Client-Side Search (Keep Current)

**Current Logic:**
```typescript
// From app.js
function performSearch(searchTerm: string) {
  const results = expressions.filter(item => {
    const inPrimary = item.primary?.toLowerCase().includes(searchTerm);
    const inMeaning = item.meaning?.toLowerCase().includes(searchTerm);
    const inSimilar = item.similar?.some(s => 
      s.toLowerCase().includes(searchTerm)
    );
    const inExample = item.example?.toLowerCase().includes(searchTerm);
    
    return inPrimary || inMeaning || inSimilar || inExample;
  });
  
  renderResults(results);
}
```

**Port to TypeScript:**
```typescript
export function searchExpressions(
  expressions: Expression[],
  query: string
): Expression[] {
  const lowerQuery = query.toLowerCase();
  
  return expressions.filter(item => {
    // Search in primary
    if (item.primary?.toLowerCase().includes(lowerQuery)) return true;
    
    // Search in meaning
    if (item.meaning?.toLowerCase().includes(lowerQuery)) return true;
    
    // Search in similar expressions
    if (item.similar?.some(s => 
      s.toLowerCase().includes(lowerQuery)
    )) return true;
    
    // Search in example
    if (item.example?.toLowerCase().includes(lowerQuery)) return true;
    
    return false;
  });
}
```

### 9.2 `forcedownload` Magic Command

**Current Behavior:**
- Type `forcedownload` in search input
- Triggers full data refresh
- Shows download progress

**New Implementation:**
```typescript
// In SearchInput.tsx
const handleSearch = (term: string) => {
  if (term === 'forcedownload') {
    onForceDownload();
    return;
  }
  
  // Normal search
  onSearch(term);
};
```

### 9.3 Keyword Highlighting

**Port existing `highlightKeywords()` function:**
```typescript
export function highlightKeywords(
  text: string,
  keywords: string[]
): string {
  // Sort by length (longest first)
  const sorted = keywords
    .filter(k => k && typeof k === 'string')
    .sort((a, b) => b.length - a.length);
  
  // Escape regex special chars
  const escape = (s: string) => 
    s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create single regex
  const pattern = new RegExp(
    `(${sorted.map(escape).join('|')})`,
    'gi'
  );
  
  return text.replace(pattern, '<span class="highlight">$1</span>');
}
```

---

## 10. Styling System

### 10.1 Scoped CSS (Astro Built-in)

**Current:** Global CSS files (`index.css`, `admin.css`)  
**Target:** Scoped CSS per component

**Example:**
```astro
---
// ExpressionCard.astro
interface Props {
  expression: Expression;
}

const { expression } = Astro.props;
---

<article class="expression-card">
  <h3>{expression.primary}</h3>
  <p class="meaning">{expression.meaning}</p>
  <!-- ... -->
</article>

<style>
  .expression-card {
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 28px;
    padding: clamp(1.5rem, 5vw, 2.5rem);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .expression-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  .meaning {
    color: var(--secondary);
    font-size: 1rem;
  }
</style>
```

### 10.2 Theme System (Dark + Light)

**CSS Variables:**
```css
/* src/styles/global.css */
:root {
  /* Dark theme (default) */
  --bg-dark: #0f172a;
  --card-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.1);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
}

[data-theme="light"] {
  --bg-dark: #f8fafc;
  --card-bg: rgba(0, 0, 0, 0.03);
  --glass-border: rgba(0, 0, 0, 0.1);
  --text-main: #0f172a;
  --text-muted: #64748b;
}
```

**Theme Toggle Component:**
```typescript
// src/components/shared/ThemeToggle.tsx
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    
    // Check localStorage
    const saved = localStorage.getItem('theme') as 'dark' | 'light';
    
    setTheme(saved || (prefersDark ? 'dark' : 'light'));
  }, []);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return (
    <button 
      onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

### 10.3 System Font Stack

**Replace Google Fonts with:**
```css
:root {
  --font-sans: 
    -apple-system, 
    BlinkMacSystemFont, 
    "Segoe UI", 
    Roboto, 
    "Helvetica Neue", 
    Arial, 
    sans-serif;
  
  --font-serif: 
    Georgia, 
    "Times New Roman", 
    serif;
}

body {
  font-family: var(--font-sans);
}

h1, h2, h3 {
  font-family: var(--font-serif);
}
```

---

## 11. Build & Deployment

### 11.1 Astro Configuration

#### astro.config.mjs
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  // GitHub Pages site URL
  site: 'https://heroyik.gitlab.io',

  // GitHub Pages base path
  base: '/col_eng',

  // Output: static (default)
  output: 'static',
  
  // Integrations
  integrations: [
    react(),
  ],
  
  // Build options
  build: {
    // Inline small assets
    inlineStylesheets: 'auto',
  },
  
  // Vite config
  vite: {
    build: {
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            firebase: ['firebase/app', 'firebase/firestore'],
          },
        },
      },
    },
  },
});
```

### 11.2 GitHub Actions Workflow

#### .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Install, build, and upload site
        uses: withastro/action@v6
        env:
          PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
          PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
          PUBLIC_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

### 11.3 Package.json Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

### 11.4 Environment Variables

**Astro uses `import.meta.env.PUBLIC_*` for client-side vars:**

```env
# .env (local development)
PUBLIC_FIREBASE_API_KEY=xxx
PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
PUBLIC_FIREBASE_PROJECT_ID=xxx
PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
PUBLIC_FIREBASE_APP_ID=xxx
```

**GitHub Secrets (for CI/CD):**
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

**Do not add admin passwords as GitHub Secrets for client-side auth.** GitHub Pages has no server runtime that can validate them securely.

---

## 12. Migration Strategy

### 12.1 Phase 1: Setup (Days 1-2)
1. Initialize Astro project
2. Configure TypeScript
3. Set up React integration
4. Configure GitHub Actions
5. Test basic build and deployment

### 12.2 Phase 2: Search Page (Days 3-5)
1. Port search UI components
2. Port Firebase data layer
3. Port delta sync logic
4. Port search functionality
5. Test public search (no auth)

### 12.3 Phase 3: Admin Page (Days 6-7)
1. Port admin UI components
2. Preserve Firebase Auth flow
3. Port expression editor
4. Port AI generation (Vertex AI)
5. Test admin functionality

### 12.4 Phase 4: Polish (Days 8-9)
1. Implement theme toggle
2. Optimize static bundle
3. Performance testing
4. Cross-browser testing
5. Mobile responsiveness

### 12.5 Phase 5: Deploy (Day 10)
1. Configure GitHub Secrets
2. Test CI/CD pipeline
3. Deploy to GitHub Pages
4. Verify all features
5. Update documentation

---

## 13. Edge Cases & Considerations

### 13.1 Offline Support
**Current:** Firebase offline persistence (IndexedDB)  
**Target:** Keep as-is

**Consideration:** Firebase SDK handles offline automatically. No changes needed.

### 13.2 `forcedownload` Command
**Current:** Magic command in search input  
**Target:** Keep behavior

**Edge Case:** What if user types `forcedownload` while offline?
- Show error message
- Retry when online

### 13.3 Version Listener
**Current:** Real-time Firestore listener  
**Target:** Keep as-is

**Edge Case:** What if version changes during session?
- Show confirmation dialog
- Refresh page to sync

### 13.4 Large Dataset Performance
**Current:** ~1400 expressions  
**Target:** Same

**Optimization:**
- Virtual scrolling (if > 1000 results)
- Lazy loading for large result sets
- Debounced search (300ms)

### 13.5 Theme Persistence
**Edge Case:** User toggles theme, refreshes page
- Save to localStorage
- Restore on page load
- Respect system preference initially

### 13.6 Admin Auth Security
**Edge Case:** Admin UI is shipped as static client code
- Do not rely on hidden routes, client passwords, or bundled secrets
- Enforce authorization in Firestore Rules and/or callable Cloud Functions
- Show unauthorized state when Firebase rejects reads/writes

---

## 14. Testing Strategy

### 14.1 Unit Tests
- Search logic (`searchExpressions`)
- Keyword highlighting (`highlightKeywords`)
- Data transformation functions

### 14.2 Component Tests
- SearchInput component
- ExpressionCard component
- ThemeToggle component

### 14.3 Integration Tests
- Firebase data loading
- Delta sync flow
- Admin authentication

### 14.4 E2E Tests
- Search flow (type → results)
- Admin flow (auth → edit → save)
- Theme toggle persistence

### 14.5 Performance Tests
- Initial load time (< 2s)
- Search response time (< 100ms)
- Bundle size (< 200KB gzipped)

---

## 15. Performance Targets

| Metric | Current | Target |
|--------|---------|--------|
| Initial Load | ~3s | < 2s |
| First Contentful Paint | ~1s | < 0.5s |
| Time to Interactive | ~3s | < 1.5s |
| Bundle Size (gzipped) | ~150KB | < 200KB |
| Search Response | ~50ms | < 100ms |

---

## Appendix A: Firebase SDK Version Migration

### Current → Target

| Package | Current | Target |
|---------|---------|--------|
| firebase/app | 11.10.0 / 12.14.0 | 12.14.0 |
| firebase/firestore | 11.10.0 / 12.14.0 | 12.14.0 |
| firebase/auth | 11.10.0 / 12.14.0 | 12.14.0 |
| firebase/ai | - | 12.14.0 |

**Note:** Admin panel already uses v12.14.0. Search app will be upgraded.

---

## Appendix B: GitHub Pages Limitations

1. **No server-side code** → All logic client-side
2. **Static only** → No SSR, no API routes
3. **Sub-path hosting** → `/col_eng/` base path
4. **Fallback routing** → Use `404.html` only if client-side routing needs unknown-path fallback
5. **Build timeout** → 10 minutes max
6. **Repository size** → < 1GB recommended

---

## Appendix C: Checklist

- [ ] Initialize Astro project
- [ ] Configure TypeScript
- [ ] Set up React integration
- [ ] Create project structure
- [ ] Port Firebase config
- [ ] Port delta sync logic
- [ ] Port search components
- [ ] Port admin components
- [ ] Preserve Firebase Auth and Firestore authorization
- [ ] Implement theme toggle
- [ ] Optimize static bundle
- [ ] Configure GitHub Actions
- [ ] Set up GitHub Secrets
- [ ] Test build locally
- [ ] Deploy to GitHub Pages
- [ ] Verify all features
- [ ] Update documentation
- [ ] Remove old files (app.js, admin.js, etc.)
