# Security Policy

Full security architecture: `ARCHITECTURE.md` §14 and §30.

## Reporting
Report vulnerabilities privately to the maintainer (SufyanWithCode). Do not open a public issue for security reports.

## Principles
- No secrets in source. Local: `.env` (gitignored). Prod: AWS Secrets Manager.
- Argon2id password hashing only.
- Private S3 + signed CloudFront URLs for all media.
- IAM least privilege; OIDC in CI (no long-lived keys).
- Legal media only — no copyright / DRM / hotlink bypass.
