export const metadata = { title: "Admin" };

const kpis = ["Users", "Movies", "Views", "Storage"];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
          Admin
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted">
          User, movie, media and analytics management arrive in Phase 12.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {kpis.map((k) => (
            <div
              key={k}
              className="rounded-2xl border border-border bg-surface/50 p-6"
            >
              <p className="text-sm text-muted">{k}</p>
              <p className="mt-2 font-display text-2xl font-bold">—</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
