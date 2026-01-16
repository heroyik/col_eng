# Colloquial English Search Web App

A premium, high-performance web application designed to search and discover authentic English colloquial expressions. Built with a modern "glassmorphism" aesthetic and powered by Firebase Firestore.

> [!NOTE]
> Latest Update (2026-01-15): Enhanced API key security with GitHub Actions secret injection and added a manual fallback UI in the admin panel.

## 📂 Project Structure

- `app.js`: Main application logic.
- `index.html`: Entry point of the web app.
- `index.css`: Styling for the application.
- `initial_data.json`: Static bootstrap data (JSON) to minimize Firestore reads on initial load.
- `sources/`: Maintenance scripts.
  - `generate_initial_data.js`: Exports full Firestore data to `initial_data.json`.
  - `merge_local_data.js`: Merges local backup files into `initial_data.json`.
- `public/`: Assets and public files.
- `firebase.json`: Firebase configuration.
- `firestore.rules` & `firestore.indexes.json`: Security rules and index configuration.

## 💠 Quota Optimization (Hybrid Architecture)

To ensure high reliability and minimize costs, the application implements a **Hybrid Static + Delta Sync** architecture:

1. **Static Bootstrap**: Instead of downloading the entire database from Firestore (which can be 40,000+ reads), the app first loads `initial_data.json` via a standard HTTP request (0 Firestore cost).
2. **Delta Sync**: After loading the static data, the app performs a targeted query to Firestore to download only those records added *after* the static file was generated.
3. **Metadata-based Sync**: The app reads a single `SystemMetadata/sync` document to detect updates, reducing "initial check" operations by 99%+.
4. **Automatic Quota Cooldown**: If a `429 Resource Exhausted` error is encountered, the app automatically enters a **2-hour cooldown**, relying on local IndexedDB and the static bundle.
5. **Optimized Search**: All search operations are performed client-side on the cached dataset.

### 🛠️ Automatic Synchronization & Auto-Reload

To ensure all users see the latest data without manual intervention:

1.  **Smart Versioning**: The app tracks a `APP_VERSION` (e.g., `2026.01.16.21`).
2.  **Auto-Reload**: When a user visits the site, the app checks if the version has changed. If a new version is detected, it automatically clears all local caches (Service Workers, Cache API, Firestore Persistence) and reloads the page to fetch fresh data.
3.  **Automatic Data Sync**: Administrators can update `initial_data.json` by running `node download_data.mjs`. This script fetches the latest data from Firestore and updates the static file.


### 🛠️ Data Maintenance & Backup

To keep the static bootstrap data up to date and maintain backups:

1. **Backup from Firestore**: Run the following to download the current production data:

   ```bash
   node download_data.mjs
   ```

   This script fetches all records in throttled batches to avoid quota issues and saves them with the current date (e.g., `2026-01-13_fixed.json`).

2. **Generate Full Snapshot (Legacy)**:

   ```bash
   node sources/generate_initial_data.js
   ```

3. **Deploy**: Update `initial_data.json` if needed, then commit and push to GitHub.

> [!NOTE]
> On 2026-01-13, a comprehensive typo check was performed, and 10 records (including ID 28, 41, 44, etc.) were corrected directly in Firestore to fix apostrophe issues and grammatical errors.

## 🔍 Search Logic & UI Architecture

This app uses a refined client-side filtering strategy for performance:

1. **Hybrid Load**: Data is loaded from IndexedDB -> `initial_data.json` -> Firestore Delta.
2. **Multi-Field Filtering**: Matches query against `primary`, `meaning`, `similar`, and `example` fields.
3. **Wildcard Search**: Type `*` in the search box to view all expressions.

## ✨ Features

- **Expression of the Day**: A random expression is featured daily.
- **Multi-language Support**: Japanese, Chinese, Vietnamese, and Spanish.
- **Offline Capable**: Works fully offline after the first load.
- **Data Export**: Download the entire dataset as JSON from the UI.

## 🔐 Security & Configuration
 
The application prioritizes security by separating sensitive configuration from the codebase.
 
### 1. API Key Management (`config.js`)
- **Configuration File**: All Firebase and API configurations are managed in `config.js`.
- **Dynamic Loading**: `app.js` and `admin.js` dynamically load settings from `window.COL_ENG_CONFIG`.
- **Restriction Required**: Since the API Key is visible in client-side code, it **MUST** be restricted in the Google Cloud Console:
    - **Application restrictions**: Limit to `https://your-domain.github.io/*` and `http://localhost/*`.
    - **API restrictions**: Limit to `Identity Toolkit API`, `Cloud Firestore API`, and `Firebase AI Logic API`.
 
### 2. Vertex AI Integration
- **Gemini 3 Pro**: The app uses Vertex AI for Firebase to access premium models without exposing direct API keys.
- **App Check**: Integrated with Firebase App Check for additional security.

## 🛠️ Maintenance Scripts

- `githero.sh`: Script to install or update dependencies. Ensure you have `GITHUB_TOKEN` set in your environment if needed.
- `download_data.mjs`: Fetches production data from Firestore.

## 🤝 Credits

Maintained by [heroyik@gmail.com](mailto:heroyik@gmail.com).

Based on the investment strategy and learning tools designed by nIcK.
- 2026-01-17: Fix ReferenceError in app.js and bump versions to .04
