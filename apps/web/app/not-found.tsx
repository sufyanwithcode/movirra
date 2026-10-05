import Link from "next/link";
import { buttonVariants } from "@movirra/ui";

export default function NotFound() {
  return (
    <div className="bg-theater grain flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">
        This scene isn&apos;t in the reel.
      </h1>
      <p className="mt-2 text-muted">
        The page you&apos;re looking for isn&apos;t in our library.
      </p>
      <Link href="/" className={`${buttonVariants()} mt-8`}>
        Back to home
      </Link>
    </div>
  );
}
