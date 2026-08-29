export const metadata = { title: "Home" };

const rows = ["Trending now", "Continue watching", "New on MOVIRRA"];

export default function HomePage() {
  return (
    <div className="bg-theater grain min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-bold">Your library</h1>
        <p className="mt-2 text-muted">
          Movie rails arrive in Phase 8 (Catalogue).
        </p>

        <div className="mt-10 space-y-10">
          {rows.map((row) => (
            <section key={row}>
              <h2 className="mb-3 font-display text-lg font-bold">{row}</h2>
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[2/3] w-40 shrink-0 rounded-xl border border-border bg-surface-2/50"
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
