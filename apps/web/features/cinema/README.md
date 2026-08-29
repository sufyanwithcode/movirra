# features/cinema

The 3D "lobby" hero: original placeholder posters floating in a dark theater
under a projector beam, with dust motes and a grounded reflection plane.

## How it degrades (important)

`CinemaHero` is a light client component. Its copy is server-rendered (SEO),
then on the client it decides whether to upgrade to WebGL:

- `useReducedMotion` — `prefers-reduced-motion: reduce` → static hero.
- `useCanRender3D` — also requires WebGL, `deviceMemory >= 4`, `>= 4` cores, and
  not (coarse-pointer AND width < 768). Otherwise → static hero.
- Only then is `CinemaLobby` mounted via `dynamic(..., { ssr:false })`, so
  three.js never loads on the server or on low-end / mobile clients.
- `CanvasErrorBoundary` catches a runtime WebGL failure and falls back silently.

## Posters

The poster textures in `apps/web/public/posters/*.png` are ORIGINAL placeholder
artwork (invented titles) — no real, copyrighted film posters. Regenerate or
customise them with `python3 scripts/generate-posters.py` (needs DejaVu fonts).
In Phase 8 these get swapped for real licensed poster art via `useTexture`,
compressed to KTX2/Basis for GPU-friendly loading.

## Performance budget

- Pixel ratio capped: `dpr={[1, 1.5]}`.
- 10 posters, ~220 dust points, simple materials + emissive; `fog` for depth.
- No postprocessing (kept lean). Optional bloom can be added later via
  `@react-three/postprocessing` for extra glow.
- Animation is cheap per-frame `lerp`; disabled under reduced motion.
