# Contributing to MOVIRRA

## Branching
- `main` — protected, always deployable.
- `feat/<name>`, `fix/<name>`, `chore/<name>` — short-lived branches → PR into `main`.

## Commits
Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.

## Before opening a PR
```bash
pnpm lint
pnpm typecheck
pnpm test
```

## Never commit
Real secrets, `.env` files, AWS keys, or copyrighted media.
