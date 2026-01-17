# Sync Firestore with GitHub Pages and Client Cache - Walkthrough

This document walked through the successful implementation of the automated synchronization pipeline.

## 1. Automated Data Sync
We've established a server-side synchronization flow using Firebase Cloud Functions (v2).

- **Source:** Firestore `EnglishExpressions` collection.
- **Trigger:** `onDocumentWritten` trigger in `functions/index.js`.
- **Action:** Sends a `repository_dispatch` event to the GitHub repository.
- **Authentication:** Uses the `GITHUB_TOKEN` stored securely in **Firebase Secrets**.

## 2. GitHub Actions Deployment
The GitHub workflow (`.github/workflows/deploy.yml` and `sync_data.yml`) performs the following steps upon receiving the trigger:

1. **Fetches Data:** Executes `download_data.mjs` to update `initial_data.json`.
2. **Updates Version:** Increments `APP_VERSION` in `app.js` and `admin.js` with a unique timestamp.
3. **Deploys:** Pushes the updated data and code to the `master` branch, triggering GitHub Pages deployment.
4. **Notifies Clients:** Updates the `metadata/current_config` document in Firestore with the new version.

## 3. Real-time Cache Invalidation
Clients (mobile and PC) now stay in sync without manual refreshes:

- **Listener:** `app.js` maintains a real-time listener on the Firestore `metadata/current_config` document.
- **Detection:** When a new version is detected, the app prompts the user to refresh.
- **Hard Reset:** The app performs a thorough cache clear (Service Workers, Cache Storage, IndexedDB, and LocalStorage) upon refresh to ensure the latest `initial_data.json` is loaded.

## 4. Final Verification
The system has been verified by deploying the Cloud Function on the **Blaze plan** and ensuring the CLI configuration matches the project directory structure.

> [!IMPORTANT]
> To enable the GitHub Action to update Firestore metadata, please ensure you have added the `FIREBASE_SERVICE_ACCOUNT_KEY` to your **GitHub Repository Secrets**.
