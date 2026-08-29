import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-theater grain flex min-h-screen flex-col items-center justify-center px-6">
      <Link
        href="/"
        className="mb-8 font-display text-2xl font-extrabold tracking-tight"
      >
        MOV<span className="text-primary">I</span>RRA
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface/60 p-8">
        {children}
      </div>
    </div>
  );
}
