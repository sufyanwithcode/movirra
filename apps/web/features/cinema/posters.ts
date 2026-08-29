export interface Poster {
  id: string;
  /** Original placeholder poster art (public/posters). Real licensed art lands in Phase 8. */
  image: string;
  /** Fallback tint. */
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
}

// Tune the look here: arc width, spacing, recede depth.
const COLORS = [
  "#E8A33D", "#C9532F", "#9B4576", "#D98324", "#6E7FB0",
  "#B7472A", "#E0B15A", "#4E8D7C", "#A34E3B", "#D2691E",
];

const ARC_HALF_WIDTH = 5; // posters span x ∈ [-5, 5]

export const POSTERS: Poster[] = COLORS.map((color, i) => {
  const t = COLORS.length === 1 ? 0 : i / (COLORS.length - 1);
  const x = -ARC_HALF_WIDTH + t * (ARC_HALF_WIDTH * 2);
  const z = -Math.abs(x) * 0.4;
  const y = i % 2 === 0 ? 0.22 : -0.2;
  return {
    id: `p${i}`,
    image: `/posters/p${i}.png`,
    color,
    position: [x, y, z],
    rotation: [0, -x * 0.05, 0],
  };
});
