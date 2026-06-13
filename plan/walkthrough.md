# Sync Firestore with GitLab Pages and Client Cache - Walkthrough

*This document describes the original GitHub-based synchronization pipeline that has since been migrated to GitLab CI/CD.*

## 1. Automated Data Sync (Original Architecture)

The original pipeline used Firebase Cloud Functions (v2) for synchronization:

- **Source:** Firestore `EnglishExpressions` collection.
- **Trigger:** `onDocumentWritten` trigger in `functions/index.js`.
- **Action:** Triggered a GitLab CI pipeline.

After migration, the sync is handled via:
- **Firestore `metadata/sync` document listener** for real-time change detection
- **BroadcastChannel** for instant cross-tab notifications
- **Delta sync queries** (`where("id", ">", lastKnownId)`) for minimal Firestore reads

## 2. GitLab CI Deployment
The GitLab CI pipeline performs the following steps on push:

1. **Fetches Data:** Executes `download_data.mjs` to update `initial_data.json`.
2. **Updates Version:** Increments `APP_VERSION` in `app.js` and `admin.js` with a unique timestamp.
3. **Deploys:** Pushes updates and publishes `dist/` to GitLab Pages.
4. **Notifies Clients:** Updates the `metadata/sync` document in Firestore with new `lastId`.

## 3. Real-time Data Sync
Clients (mobile and PC) now stay in sync without manual refreshes:

- **Listener:** `app.js` maintains a real-time listener on the Firestore `metadata/sync` document.
- **Detection:** When `lastId` increases, the app triggers a delta sync to fetch only new documents.
- **Cross-tab:** BroadcastChannel provides instant notification with zero Firestore reads.

## 4. Final Verification
The system has been verified with GitLab CI pipeline completing successfully.

> [!IMPORTANT]
> For GitLab CI to deploy correctly, ensure Firebase environment variables are configured in **GitLab CI/CD Variables**.
