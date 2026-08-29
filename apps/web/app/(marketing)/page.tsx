import CinemaHero from "@/features/cinema/CinemaHero";
import Link from "next/link";

const frames = [
  {
    tag: "EXPERIENCE",
    title: "A lobby, not a grid",
    body: "Step into a 3D space instead of scrolling a wall of thumbnails.",
  },
  {
    tag: "PLAYBACK",
    title: "Plays anywhere, smoothly",
    body: "Adaptive streaming that adjusts to your connection in real time.",
  },
  {
    tag: "LICENSING",
    title: "Only what's cleared",
    body: "Every title is public-domain, Creative Commons, or properly licensed.",
  },
];

export default function LandingPage() {
  return (
    <main className="bg-theater grain relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-border" />

      <CinemaHero />

      <section className="relative z-10 mx-auto grid max-w-5xl gap-4 px-6 pb-24 md:grid-cols-3">
        {frames.map((f) => (
          <article
            key={f.title}
            className="rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-primary/40"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
              {f.tag}
            </span>
            <h3 className="mt-3 font-display text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
          </article>
        ))}
      </section>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <span className="font-display text-sm font-bold tracking-tight">
            MOV<span className="text-primary">I</span>RRA
          </span>
          <span className="font-mono text-[11px] text-muted">
            MIT · SufyanWithCode · v0.0.1
          </span>
        </div>
      </footer>
    </main>
  );
}
