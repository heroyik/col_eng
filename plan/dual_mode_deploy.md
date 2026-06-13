# Dual Mode Deployment Plan

**Project:** Colloquial English (COL_ENG)  
**Primary Constraint:** GitHub account is currently suspended  
**Immediate Target:** GitLab repository + GitLab CI/CD + GitLab Pages  
**Future Target:** Restore GitHub Pages deployment when GitHub account access returns  
**Long-Term Goal:** One codebase, two deploy providers, provider selected by CI environment  
**Date:** 2026-06-09

---

## 1. Objective

Move the project deployment path from GitHub Pages to GitLab Pages immediately, without making the project GitLab-only. The repository should support both:

- **GitLab mode:** active deployment path while GitHub is suspended.
- **GitHub mode:** standby deployment path that can be re-enabled when GitHub access is restored.

The deployment system must avoid provider-specific assumptions in application code. Provider-specific details belong in CI variables and deployment workflow files.

---

## 2. Current Repository State

### 2.1 Current Site

The repository currently contains a vanilla static site:

- `index.html`
- `admin.html`
- `app.js`
- `admin.js`
- `index.css`
- `admin.css`
- `initial_data.json`
- `env_config.js`

The current site can run as static files and is therefore compatible with both GitHub Pages and GitLab Pages.

### 2.2 Current GitHub Pages Workflow

Existing workflow:

- File: `.github/workflows/deploy.yml`
- Branch: `master`
- Upload path: `.`
- Deploy target: GitHub Pages

This workflow publishes the repository root directly. It is suitable for the current vanilla site, but it is not suitable for the planned Astro migration because Astro should publish the built `dist/` output.

### 2.3 Planned Framework Upgrade

The framework upgrade spec targets:

- Astro v6+
- React islands
- TypeScript
- Static output
- Firebase JS SDK v12+

Dual-mode deployment must support both phases:

- **Phase A:** current static root deployment.
- **Phase B:** Astro build deployment from `dist/`.

---

## 3. Deployment Strategy

### 3.1 Provider Matrix

| Provider | Current Status | Deployment System | Publish Directory | URL Shape |
|---|---:|---|---|---|
| GitLab Pages | Active | `.gitlab-ci.yml` | `public/` now, `dist/` after Astro | `https://heroyik.gitlab.io/col_eng/` |
| GitHub Pages | Standby | `.github/workflows/deploy.yml` | `.` now, `dist/` after Astro | `https://heroyik.gitlab.io/col_eng/` |

### 3.2 Operating Principle

Use provider-specific CI files, but keep the app provider-neutral:

- GitLab CI sets GitLab-specific `PUBLIC_SITE_URL` and `PUBLIC_BASE_PATH`.
- GitHub Actions sets GitHub-specific `PUBLIC_SITE_URL` and `PUBLIC_BASE_PATH`.
- Astro reads those values in `astro.config.mjs`.
- Firebase config is injected through the same `PUBLIC_FIREBASE_*` variable names on both providers.
- Admin authorization remains Firebase Auth + Firestore Rules, not CI secrets or bundled passwords.

### 3.3 Deployment Modes

| Mode | Trigger | Expected Use |
|---|---|---|
| `gitlab-active` | Push to GitLab default branch | Current production deployment |
| `github-standby` | Manual workflow or disabled push trigger | Kept ready while GitHub is suspended |
| `dual-publish` | Manual only | Temporary verification after GitHub access returns |
| `github-active` | Push to GitHub default branch | Final state if GitHub becomes primary again |

---

## 4. GitLab Repository Setup

### 4.1 Create GitLab Repository

Create a GitLab project named `col_eng`.

Recommended settings:

- Visibility: private initially, public only if the site must be public through project visibility.
- Default branch: `master` to match the existing repository, or rename both providers to `main` later as a separate cleanup.
- Pages access control: choose based on whether the site should be public.

### 4.2 Add GitLab Remote

Use a separate remote so GitHub can be restored later.

```bash
git remote rename origin github
git remote add gitlab git@gitlab.com:<namespace>/col_eng.git
git remote -v
```

If `origin` must point to the active provider, use:

```bash
git remote set-url origin git@gitlab.com:<namespace>/col_eng.git
git remote add github git@github.com:heroyik/col_eng.git
```

Recommended long-term remote names:

- `gitlab`: active while GitHub is suspended.
- `github`: preserved for future recovery.

### 4.3 Initial Push

```bash
git push gitlab master
git push gitlab --tags
```

Do not delete the GitHub workflow. Keep it as standby deployment infrastructure.

---

## 5. CI/CD Variables

### 5.1 Shared Variable Names

Use the same variable names in GitLab CI/CD variables and GitHub Actions secrets.

| Variable | Public Client Variable | Required | Notes |
|---|---|---:|---|
| `PUBLIC_FIREBASE_API_KEY` | yes | yes | Firebase web API key. Not a server secret. Restrict in Google Cloud. |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | yes | yes | Usually `<project>.firebaseapp.com`. |
| `PUBLIC_FIREBASE_PROJECT_ID` | yes | yes | Firebase project ID. |
| `PUBLIC_FIREBASE_STORAGE_BUCKET` | yes | yes | Firebase storage bucket. |
| `PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | yes | yes | Firebase sender ID. |
| `PUBLIC_FIREBASE_APP_ID` | yes | yes | Firebase app ID. |
| `PUBLIC_FIREBASE_MEASUREMENT_ID` | yes | optional | Include if analytics is used. |
| `PUBLIC_SITE_URL` | yes | yes | Provider domain without base path. |
| `PUBLIC_BASE_PATH` | yes | yes | `/col_eng` for project pages. |
| `DEPLOY_PROVIDER` | yes | optional | `gitlab` or `github`; useful for diagnostics. |

### 5.2 GitLab Values

For readable namespace/project GitLab Pages URL shape:

```env
PUBLIC_SITE_URL=https://heroyik.gitlab.io
PUBLIC_BASE_PATH=/col_eng
DEPLOY_PROVIDER=gitlab
```

This requires disabling GitLab Pages unique domains for the project.

If a custom domain is later attached directly to the project root, change to:

```env
PUBLIC_SITE_URL=https://<custom-domain>
PUBLIC_BASE_PATH=
DEPLOY_PROVIDER=gitlab
```

### 5.3 GitHub Values

For GitHub Pages project deployment:

```env
PUBLIC_SITE_URL=https://heroyik.gitlab.io
PUBLIC_BASE_PATH=/col_eng
DEPLOY_PROVIDER=github
```

If a custom domain is later attached directly to the project root, change to:

```env
PUBLIC_SITE_URL=https://<custom-domain>
PUBLIC_BASE_PATH=
DEPLOY_PROVIDER=github
```

### 5.4 Secrets Policy

Do not add admin passwords for client-side auth. GitLab Pages and GitHub Pages are static hosts. Any value used by browser code must be treated as public.

Admin access must be enforced by:

- Firebase Auth
- Firestore Rules
- Optional callable Cloud Functions for privileged operations

---

## 6. Phase A: Immediate GitLab Pages Deployment for Current Static Site

This phase keeps the current vanilla site working with minimum change.

### 6.1 Required File

Add `.gitlab-ci.yml`:

```yaml
stages:
  - deploy

pages:
  image: alpine:3.20
  stage: deploy
  script:
    - rm -rf public
    - mkdir public
    - cp index.html public/
    - cp admin.html public/
    - cp app.js public/
    - cp admin.js public/
    - cp index.css public/
    - cp admin.css public/
    - cp initial_data.json public/
    - cp .nojekyll public/ 2>/dev/null || true
    - cp -r db public/db 2>/dev/null || true
    - cp -r previews public/previews 2>/dev/null || true
    - |
      cat > public/env_config.js <<'EOF'
      window.COL_ENG_CONFIG = {
        FIREBASE_CONFIG: {
          apiKey: "$PUBLIC_FIREBASE_API_KEY",
          authDomain: "$PUBLIC_FIREBASE_AUTH_DOMAIN",
          projectId: "$PUBLIC_FIREBASE_PROJECT_ID",
          storageBucket: "$PUBLIC_FIREBASE_STORAGE_BUCKET",
          messagingSenderId: "$PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
          appId: "$PUBLIC_FIREBASE_APP_ID",
          measurementId: "$PUBLIC_FIREBASE_MEASUREMENT_ID"
        },
        DEPLOY_PROVIDER: "gitlab",
        SITE_URL: "$PUBLIC_SITE_URL",
        BASE_PATH: "$PUBLIC_BASE_PATH"
      };
      EOF
  pages: true
  artifacts:
    paths:
      - public
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
```

### 6.2 Important Correction

The heredoc above must allow shell variable expansion. In the actual file, use `EOF` without single quotes:

```sh
cat > public/env_config.js <<EOF
...
EOF
```

Do not use `<<'EOF'` if CI variables should be substituted.

### 6.3 Safer Script Variant

Prefer a Node script for generating `env_config.js` to avoid shell quoting mistakes:

```yaml
pages:
  image: node:22-alpine
  stage: deploy
  script:
    - rm -rf public
    - mkdir public
    - cp index.html admin.html app.js admin.js index.css admin.css initial_data.json public/
    - node scripts/write-env-config.mjs public/env_config.js
  pages: true
  artifacts:
    paths:
      - public
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
```

Then add `scripts/write-env-config.mjs`:

```js
import fs from 'node:fs';

const output = process.argv[2] ?? 'public/env_config.js';

const config = {
  FIREBASE_CONFIG: {
    apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  DEPLOY_PROVIDER: process.env.DEPLOY_PROVIDER ?? 'gitlab',
  SITE_URL: process.env.PUBLIC_SITE_URL,
  BASE_PATH: process.env.PUBLIC_BASE_PATH ?? '',
};

fs.writeFileSync(
  output,
  `window.COL_ENG_CONFIG = ${JSON.stringify(config, null, 2)};\n`,
);
```

### 6.4 Phase A Acceptance Criteria

- GitLab pipeline runs on default branch.
- GitLab Pages URL opens the search page.
- `env_config.js` exists in the deployed artifact.
- Firebase reads work.
- Admin Google sign-in opens.
- Firestore write attempts are controlled by rules.
- `initial_data.json` is served.
- No GitHub workflow is required for production deployment.

---

## 7. Phase B: Astro Dual-Mode Deployment

After the framework upgrade, both providers should deploy the same Astro output.

### 7.1 Provider-Neutral Astro Config

Use environment variables for `site` and `base`.

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const site = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';
const base = process.env.PUBLIC_BASE_PATH ?? '';

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [react()],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          },
        },
      },
    },
  },
});
```

### 7.2 Base Path Rules

| Deployment | `PUBLIC_SITE_URL` | `PUBLIC_BASE_PATH` |
|---|---|---|
| GitLab namespace/project pages | `https://heroyik.gitlab.io` | `/col_eng` |
| GitLab unique Pages domain | `https://col-eng-03e8ee.gitlab.io` | empty string |
| GitHub project pages | `https://heroyik.gitlab.io` | `/col_eng` |
| Custom root domain | `https://<domain>` | empty string |
| Local dev | unset or `http://localhost:4321` | empty string |

Application links should avoid hardcoded `/col_eng`. Use Astro-generated paths or helper functions.

### 7.3 GitLab CI for Astro

Use GitLab Pages `pages.publish: dist`.

```yaml
image: node:22

stages:
  - test
  - deploy

cache:
  key:
    files:
      - package-lock.json
  paths:
    - .npm/

before_script:
  - npm ci --cache .npm --prefer-offline

test:
  stage: test
  script:
    - npm run typecheck
    - npm run test -- --run
  rules:
    - if: '$CI_COMMIT_BRANCH'

pages:
  stage: deploy
  script:
    - npm run build
  pages:
    publish: dist
  artifacts:
    paths:
      - dist
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
  environment:
    name: production/gitlab-pages
    url: $PUBLIC_SITE_URL$PUBLIC_BASE_PATH/
```

If tests are not ready at migration time, replace the `test` job with:

```yaml
test:
  stage: test
  script:
    - npm run build
  rules:
    - if: '$CI_COMMIT_BRANCH'
```

### 7.4 GitHub Actions for Astro Standby

Keep `.github/workflows/deploy.yml`, but update it for Astro output.

```yaml
name: Deploy to GitHub Pages

on:
  workflow_dispatch:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
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
          DEPLOY_PROVIDER: github
          PUBLIC_SITE_URL: https://heroyik.gitlab.io
          PUBLIC_BASE_PATH: /col_eng
          PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
          PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
          PUBLIC_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
          PUBLIC_FIREBASE_MEASUREMENT_ID: ${{ secrets.FIREBASE_MEASUREMENT_ID }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

While the GitHub account is suspended, consider removing the `push` trigger and keeping only `workflow_dispatch` to avoid noisy failures after mirroring resumes.

---

## 8. Repository Synchronization

### 8.1 During GitHub Suspension

GitLab is the source of truth for active deployment.

Recommended workflow:

```bash
git checkout master
git pull gitlab master
git push gitlab master
```

Do not depend on GitHub Actions during suspension.

### 8.2 When GitHub Access Returns

First, inspect remote state:

```bash
git fetch github
git fetch gitlab
git log --oneline --decorate --graph --all -n 30
```

If GitLab is ahead and GitHub has no independent changes:

```bash
git push github master
git push github --tags
```

If both remotes changed independently:

```bash
git checkout -b reconcile-dual-deploy gitlab/master
git merge github/master
```

Resolve conflicts locally, then push to both remotes.

### 8.3 Optional Mirroring

After GitHub access returns, choose one source of truth:

- **GitLab primary:** GitLab pushes mirror to GitHub.
- **GitHub primary:** GitHub remains canonical; GitLab mirror exists for backup deployment.
- **No automatic mirror:** manually push to both remotes for releases.

Avoid bidirectional automatic mirroring unless branch protection and conflict ownership are clear.

---

## 9. Firebase and Domain Configuration

### 9.1 Firebase Auth Authorized Domains

Add both deployment domains in Firebase Console:

- `<namespace>.gitlab.io`
- `heroyik.gitlab.io`
- any custom domain used later

Without this, Google sign-in can fail even if the site loads correctly.

### 9.2 Google Cloud API Key Restrictions

Firebase web API keys are public identifiers, but they should still be restricted.

Allowed HTTP referrers should include:

- `https://<namespace>.gitlab.io/*`
- `https://<namespace>.gitlab.io/col_eng/*`
- `https://heroyik.gitlab.io/*`
- `https://heroyik.gitlab.io/col_eng/*`
- local dev origins if needed

### 9.3 Firestore Rules

Rules must not depend on deployment provider. They should depend on authenticated user identity.

Recommended pattern:

- Public read only where needed for the search app.
- Admin writes allowed only for approved UID/email/custom claim.
- Deny all unspecified writes.

---

## 10. URL and Routing Plan

### 10.1 Static Routes

Astro should generate:

- `/`
- `/admin/`
- `/404.html`

With `base: '/col_eng'`, the effective GitLab and GitHub project URLs are:

- GitLab: `https://heroyik.gitlab.io/col_eng/`
- GitLab admin: `https://heroyik.gitlab.io/col_eng/admin/`
- GitHub: `https://heroyik.gitlab.io/col_eng/`
- GitHub admin: `https://heroyik.gitlab.io/col_eng/admin/`

### 10.2 Avoid Hardcoded Absolute Paths

Avoid:

```js
fetch('/initial_data.json')
location.href = '/admin'
```

Use base-aware paths:

```ts
const base = import.meta.env.BASE_URL;
fetch(`${base}initial_data.json`);
```

For navigation, prefer Astro links generated with the configured base or a shared helper.

### 10.3 404 Behavior

GitLab Pages and GitHub Pages are static hosts. Do not require server rewrites.

Preferred approach:

- Generate real static routes for known pages.
- Use `404.astro` only as a fallback.
- Avoid SPA-only routing unless there is a strong product reason.

---

## 11. Data and Cache Invalidation

### 11.1 Static Data

`initial_data.json` should be copied into the deployment artifact:

- Current site: copy root `initial_data.json` into GitLab Pages `public/`.
- Astro site: move to Astro `public/initial_data.json`.

### 11.2 Delta Sync

Firestore delta sync remains provider-neutral. The same Firebase project can serve both GitLab and GitHub deployments.

### 11.3 Version Listener

The existing version listener mentions GitHub Pages delay. Generalize wording and behavior:

- Replace GitHub-specific messaging with "static host".
- Keep a short refresh delay after server version changes.
- Do not assume which provider deployed the new static artifact.

### 11.4 Cloud Function Dispatch

Current Cloud Function name `synctogithub` and GitHub dispatch logic are provider-specific.

Plan:

1. Rename conceptually to `syncStaticHost` during backend cleanup.
2. While GitHub is suspended, disable GitHub repository dispatch if it causes failures.
3. Add GitLab pipeline trigger only if automatic data-driven site rebuild is still required.
4. Prefer a provider-agnostic function that can trigger either GitLab or GitHub based on config.

GitLab trigger option:

- Use GitLab Pipeline Trigger Token.
- Store token as Firebase Function secret.
- Trigger GitLab default branch pipeline after Firestore data changes.

Do not implement this until the active deployment path is stable.

---

## 12. Migration Steps

### Step 1: Prepare GitLab

- Create GitLab project.
- Add `gitlab` remote.
- Push `master` and tags.
- Add GitLab CI/CD variables.
- Add Firebase Auth authorized domain for GitLab Pages.
- Add Google Cloud API key referrer restrictions.

### Step 2: Add Current-Site GitLab Pages CI

- Add `.gitlab-ci.yml` for current static site.
- Generate `env_config.js` from CI variables.
- Publish `public/` artifact.
- Verify search page and admin page.

### Step 3: Freeze GitHub Deployment

- Keep `.github/workflows/deploy.yml` in repository.
- Optionally change it to manual-only while the account is suspended.
- Do not remove GitHub Pages configuration from the codebase.

### Step 4: Implement Astro Upgrade

- Follow `plan/framework-upgrade-spec.md`.
- Use provider-neutral `astro.config.mjs`.
- Move static assets into Astro `public/`.
- Replace hardcoded absolute paths with base-aware paths.
- Preserve Firebase Auth + Firestore authorization.

### Step 5: Switch GitLab CI to Astro

- Replace current-site copy job with `npm ci` + `npm run build`.
- Publish `dist` through `pages.publish`.
- Verify route URLs and static assets under `/col_eng/`.

### Step 6: Restore GitHub Mode Later

When GitHub account access returns:

- Push GitLab state to GitHub.
- Restore GitHub Pages workflow if disabled.
- Add/update GitHub Actions secrets.
- Run manual GitHub Pages deployment.
- Compare GitLab and GitHub outputs.

### Step 7: Decide Primary Provider

After both providers work:

- Keep GitLab primary if GitHub reliability remains uncertain.
- Return GitHub as primary if desired.
- Keep the other provider as standby disaster recovery.

---

## 13. Validation Checklist

### GitLab Current-Site Mode

- [ ] GitLab repo exists.
- [ ] `gitlab` remote is configured.
- [ ] `.gitlab-ci.yml` exists.
- [ ] GitLab pipeline succeeds.
- [ ] GitLab Pages URL opens.
- [ ] `env_config.js` is generated from GitLab CI variables.
- [ ] Search loads `initial_data.json`.
- [ ] Firestore reads work.
- [ ] Admin sign-in domain is authorized in Firebase.

### Astro Dual Mode

- [ ] `astro.config.mjs` reads `PUBLIC_SITE_URL`.
- [ ] `astro.config.mjs` reads `PUBLIC_BASE_PATH`.
- [ ] GitLab CI deploys `dist`.
- [ ] GitHub Actions deploys `dist`.
- [ ] No application code hardcodes `github.io`.
- [ ] No application code hardcodes `gitlab.io`.
- [ ] No application code hardcodes `/col_eng` except config/defaults.
- [ ] Firebase config uses the same `PUBLIC_FIREBASE_*` names on both providers.
- [ ] Admin auth uses Firebase Auth.
- [ ] Firestore Rules enforce write authorization.

### Recovery to GitHub

- [ ] GitHub account access restored.
- [ ] GitHub remote fetch works.
- [ ] GitLab state pushed to GitHub.
- [ ] GitHub Actions secrets exist.
- [ ] GitHub Pages workflow succeeds.
- [ ] GitHub Pages URL passes smoke test.
- [ ] Provider switch documented in README.

---

## 14. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| GitLab Pages URL differs from GitHub Pages URL | Broken assets or links | Use `PUBLIC_SITE_URL` and `PUBLIC_BASE_PATH`. |
| Firebase Google sign-in rejects GitLab domain | Admin cannot sign in | Add GitLab Pages domain to Firebase Auth authorized domains. |
| API key referrer restrictions block GitLab | Firebase calls fail | Add GitLab referrers in Google Cloud. |
| CI variables leak into client bundle | Public config exposure | Treat all `PUBLIC_*` values as public; no admin secrets. |
| Hardcoded `/col_eng` paths break custom domains | Bad links after domain change | Use `import.meta.env.BASE_URL` or shared path helper. |
| GitHub and GitLab branches diverge | Conflicts during recovery | Keep GitLab as source of truth during suspension; reconcile before dual publish. |
| Cloud Function still triggers GitHub | Failed dispatch logs | Disable or generalize provider dispatch after GitLab deploy is live. |
| Current root deploy includes unwanted files | Exposes source/admin data | In GitLab Phase A, copy only required static files into `public/`. |

---

## 15. Recommended Initial Implementation Order

1. Add GitLab remote and push repository.
2. Add Firebase/GCP domain allowances for GitLab Pages.
3. Add `.gitlab-ci.yml` for current static site.
4. Generate `env_config.js` in CI instead of committing provider-specific config.
5. Verify GitLab Pages production URL.
6. Update README with active deployment provider.
7. Continue Astro upgrade using provider-neutral config.
8. Convert GitLab CI from current-site copy mode to Astro `dist` publish.
9. Keep GitHub workflow manual-only until account suspension is resolved.
10. Re-enable GitHub Pages and test dual publish when available.

---

## 16. Open Decisions

1. **GitLab namespace:** determine the final `<namespace>` for `https://<namespace>.gitlab.io/col_eng/`.
2. **Default branch:** keep `master` for continuity or rename to `main` across both providers.
3. **Visibility:** decide whether GitLab project and Pages should be public or access-controlled.
4. **Custom domain:** decide whether to use a custom domain to make provider switching invisible to users.
5. **Automatic data-triggered rebuild:** decide whether Firestore changes should trigger GitLab pipelines immediately or remain manual.

---

## 17. Final Target State

The final system should have:

- One source tree.
- Provider-neutral Astro app.
- `.gitlab-ci.yml` for active GitLab Pages deployment.
- `.github/workflows/deploy.yml` for standby or restored GitHub Pages deployment.
- Same Firebase project and Firestore Rules for both providers.
- Same CI variable names across providers.
- No client-side secrets.
- No hardcoded provider domain in application code.
- Clear runbook for switching primary deployment provider.
