# Sync Firestore with GitHub Pages and Client Cache

This plan implements an automated synchronization flow between Firestore and the static GitHub Pages site, ensuring data freshness and robust cache-busting across all client devices.

## User Review Required

> [!IMPORTANT]
> A **GitHub Personal Access Token (PAT)** with `repo` scope is required to allow Firebase Cloud Functions to trigger GitHub Actions. You will need to add this token to Firebase Secrets.
> **Command to add secret:** `firebase functions:secrets:set GITHUB_TOKEN`

> [!NOTE]
> We will use the `EnglishExpressions` collection as the source of truth, as it is used by the admin panel and existing data download scripts.

## Proposed Changes

### [Cloud Functions] (Firebase)

#### [NEW] [index.js](file:///c:/Users/heroy/antigravity/col_eng/functions/index.js)
Implement a Firestore trigger (v2) that listens to changes in the `EnglishExpressions` collection and sends a `repository_dispatch` event to GitHub.

```javascript
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const axios = require("axios");

exports.synctogithub = onDocumentWritten("EnglishExpressions/{docId}", async (event) => {
    // ... triggering GitHub Action ...
});
```

### [GitHub Actions]

#### [NEW] [sync_data.yml](file:///c:/Users/heroy/antigravity/col_eng/.github/workflows/sync_data.yml)
Create a workflow that responds to the `sync_data` event.
- Fetches the latest data using `download_data.mjs`.
- Updates `APP_VERSION` in `app.js` with a new timestamp.
- Commits and pushes changes to the `master` branch.
- Optionally updates a `metadata/version` document in Firestore to notify connected clients.

### [Client-side]

#### [MODIFY] [app.js](file:///c:/Users/heroy/antigravity/col_eng/app.js)
Add a real-time listener to Firestore `metadata/current_version`.
- When the version changes, notify the user or trigger the existing `APP_VERSION` mismatch logic.
- This ensures that users with the app already open (on mobile or PC) will see the update immediately.

## Verification Plan

### Automated Tests
- Trigger the Cloud Function manually (via Firebase Console) and verify the GitHub Action starts.
- Run the GitHub Action and verify `initial_data.json` and `app.js` are updated in the repository.

### Manual Verification
1. Add a new expression via the Admin panel.
2. Wait for ~2-3 minutes for the GitHub Action to complete and GitHub Pages to deploy.
3. Observe the web browser on PC/Mobile for an update notification or automatic refresh.
4. Verify the new expression appears in the search results.
