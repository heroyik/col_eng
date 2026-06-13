# Security Policy

## Supported Versions

Only the current major release is supported for security fixes.

| Version | Supported |
| --- | --- |
| 2.x | Yes |
| < 2.0.0 | No |

## Reporting A Vulnerability

Do not open a public issue for security problems.

Report vulnerabilities privately to:

```text
heroyik@gmail.com
```

Include:

- A short summary.
- Affected URL or file.
- Reproduction steps.
- Expected impact.
- Browser and platform if relevant.
- Whether credentials, Firebase data, or admin access are involved.

Expected response:

- Initial acknowledgement when the report is reviewed.
- Follow-up questions if reproduction is unclear.
- Fix, mitigation, or documented rejection depending on impact.

## Security Boundaries

### Public App

The public app is a static Astro build served by GitLab Pages. It reads public
expression data and metadata from Firestore.

Expected public read paths:

```text
EnglishExpressions
metadata/sync
```

### Admin App

The admin route is client-rendered, but client-side checks are only UI. The real
write boundary must be Firebase Auth plus Firestore Rules or an equivalent
server-side boundary.

Admin-sensitive behavior:

- Google sign-in.
- Primary expression duplicate checks.
- Firebase AI generation and review.
- Firestore writes to `EnglishExpressions`.
- Writes to `metadata/sync`.

### Learning Cloud Sync

Learning cloud sync is optional and user-scoped.

Expected user paths:

```text
users/{uid}/learningCards/{expressionId}
users/{uid}/reviewEvents/{eventId}
users/{uid}/metadata/learningSync
```

Users should only be able to read and write their own learning documents.

## Secrets Policy

Never commit:

- `.env`
- `.env.local`
- `.env.*.local`
- Firebase Admin service account JSON
- private API keys
- OAuth client secrets
- exported private Firestore backups
- local credential helper files

The app uses `PUBLIC_FIREBASE_*` variables because Firebase web app config is
client-side configuration. Those variables still need correct domain and API key
restrictions in Firebase and Google Cloud.

## Recommended Firebase Controls

Firebase Auth:

- Google provider enabled only when needed.
- Authorized domains kept tight.
- Admin account reviewed before release.

Firestore:

- Public reads only for intended public collections.
- Admin-only writes for expression and metadata documents.
- User-owned rules for `users/{uid}` learning sync data.
- Deny-by-default fallback.

Google Cloud API key:

- Restrict by HTTP referrer.
- Include local development only when needed.
- Include GitLab Pages production domain.

## Dependency Security

For dependency review:

```bash
npm audit
```

For deterministic verification:

```bash
npm ci
npm run build
node --experimental-strip-types --test tests/unit/*.test.mts
```

## Known Risk Areas

- Firebase Auth domain misconfiguration can break sign-in.
- API key restrictions can break deployed auth if GitLab Pages referrers are missing.
- Firestore Rules must be deployed separately from the static app.
- Browser notifications depend on user permission and secure contexts.
- Admin client UI must not be treated as the only write protection.
