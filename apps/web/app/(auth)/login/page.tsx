export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">
        The sign-in form is wired in Phase 7 (Authentication).
      </p>
      <div className="mt-6 space-y-3" aria-hidden>
        <div className="h-11 rounded-lg border border-border bg-surface-2/50" />
        <div className="h-11 rounded-lg border border-border bg-surface-2/50" />
        <div className="h-11 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
