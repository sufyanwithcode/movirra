"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="bg-theater grain flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl font-extrabold text-primary">500</p>
      <h1 className="mt-4 font-display text-2xl font-bold">
        The projector jammed.
      </h1>
      <p className="mt-2 text-muted">
        Something went wrong on our end. Try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-glow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Try again
      </button>
    </div>
  );
}
