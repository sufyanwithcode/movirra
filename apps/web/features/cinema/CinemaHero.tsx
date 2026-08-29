"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { buttonVariants } from "@movirra/ui";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { useCanRender3D } from "./useCanRender3D";
import { useReducedMotion } from "./useReducedMotion";

// three.js only enters the bundle when this actually renders (capable clients).
const CinemaLobby = dynamic(() => import("./CinemaLobby"), { ssr: false });

const sources = ["Public domain", "Creative Commons", "Licensed"];

export default function CinemaHero() {
  const canRender3D = useCanRender3D();
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[92vh] flex-col overflow-hidden">
      {/* 3D layer (capable clients) — static backdrop shows through otherwise */}
      <div className="absolute inset-0 z-0">
        {canRender3D ? (
          <CanvasErrorBoundary>
            <CinemaLobby reduced={reduced} />
          </CanvasErrorBoundary>
        ) : null}
      </div>

      {/* readability scrims (inline styles resolve the CSS vars reliably) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 22%, transparent, hsl(var(--background) / 0.72))",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />

      {/* nav */}
      <header className="pointer-events-auto relative z-[2] mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight">
          MOV<span className="text-primary">I</span>RRA
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Link href="/register" className={buttonVariants({ size: "sm" })}>
            Get started
          </Link>
        </nav>
      </header>

      {/* hero copy (non-interactive parts pass pointer events to the scene) */}
      <div className="pointer-events-none relative z-[2] mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-7 flex flex-wrap items-center justify-center gap-2">
          {sources.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted backdrop-blur-sm"
            >
              {s}
            </span>
          ))}
        </div>

        <h1 className="text-balance font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
          A streaming theater for
          <span className="text-primary"> films worth keeping.</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
          MOVIRRA is a cinematic home for public-domain, Creative Commons, and
          licensed movies — with adaptive playback and a 3D lobby you actually
          want to walk through.
        </p>

        <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/register" className={buttonVariants({ size: "lg" })}>
            Start watching
          </Link>
          <Link
            href="/home"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Browse the library
          </Link>
        </div>
      </div>
    </section>
  );
}
