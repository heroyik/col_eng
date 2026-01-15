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

The application uses Google AI Studio (Gemini) API keys for generating expressions. You can configure this in two ways:

1.  **GitHub Secrets (Recommended for Production)**:
    -   Go to your repository **Settings** > **Secrets and variables** > **Actions**.
    -   Add a new repository secret named `GEMINI_API_KEY`.
    -   The GitHub Action will automatically inject this key into the application on every deployment.
2.  **Local Storage (For Maintenance)**:
    -   Open the `admin.html` page.
    -   Enter your API key in the **Manual API Key** field.
    -   The key will be saved securely in your browser's local storage and used as a fallback if the GitHub Secret is not available.

## 🛠️ Maintenance Scripts

- `githero.sh`: Script to install or update dependencies. Ensure you have `GITHUB_TOKEN` set in your environment if needed.
- `download_data.mjs`: Fetches production data from Firestore.

## 🤝 Credits

Maintained by [heroyik@gmail.com](mailto:heroyik@gmail.com).

Based on the investment strategy and learning tools designed by nIcK.
