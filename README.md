# MOVIRRA

An original, legally-sourced, production-grade movie streaming platform.
Full-stack + AWS + DevOps portfolio project by **SufyanWithCode**.

> Architecture blueprint: see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Quick start (local)

```bash
cp .env.example .env          # then fill JWT secrets: openssl rand -base64 32
pnpm install
docker compose up -d          # postgres + redis
```

## Monorepo layout

- `apps/web` — Next.js frontend (public site + user app)
- `apps/admin` — admin dashboard
- `apps/api` — NestJS backend (REST + WebSockets)
- `apps/worker` — BullMQ background jobs (transcode, email, indexing)
- `packages/*` — shared ui / types / config / database / eslint-config
- `infrastructure/` — Terraform, Kubernetes, Helm
- `docker/`, `nginx/`, `scripts/`, `docs/`, `tests/`

## Build phases

Tracked in `ARCHITECTURE.md` §26. Currently: **Phase 2 — Repository Setup**.

## License

MIT © SufyanWithCode
test
