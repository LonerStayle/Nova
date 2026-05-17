import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          404 · Not Found
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-display-md">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Then again, neither does most of this website.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about#disclosure">Why am I here?</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
