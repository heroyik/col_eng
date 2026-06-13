# Sync Firestore with GitLab Pages and Client Cache

*This plan documents the original GitHub-based pipeline that has since been migrated to GitLab CI/CD.*

## Original Architecture (Migrated)

This plan originally implemented an automated synchronization flow between Firestore and the static GitHub Pages site. After migration to GitLab, the architecture now uses:

- **GitLab CI/CD** for static Pages deployment
- **Firestore real-time listener** for data sync (replacing the Cloud Function → GitHub Action pipeline)
- **BroadcastChannel** for instant cross-tab notification

### [GitLab CI]

The GitLab job responds to pushes on the default branch:
- Fetches the latest data using `download_data.mjs`.
- Updates `APP_VERSION` in `app.js` with a new timestamp.
- Commits and pushes changes to the default branch.
- Publishes static `dist/` to GitLab Pages.

### [Client-side]

Adds a real-time listener to Firestore `metadata/sync`.
- When `lastId` increases, triggers a delta sync fetching only new documents.
- Uses BroadcastChannel for zero-cost cross-tab notifications.
- This ensures that users with the app already open (on mobile or PC) will see the update immediately.

## Verification Plan

### Automated Tests
- Push to default branch and verify the GitLab CI pipeline completes.
- Verify `initial_data.json` and `app.js` are updated in the repository.

### Manual Verification
1. Add a new expression via the Admin panel.
2. Wait for the GitLab CI pipeline to complete and GitLab Pages to deploy.
3. Observe the web browser on PC/Mobile for an update notification or automatic refresh.
4. Verify the new expression appears in the search results.
