import Link from "next/link";

import { trustedCompanies } from "@/lib/data/trusted-companies";

export function TrustedBy() {
  return (
    <section className="border-y border-border/40 bg-muted/20">
      <div className="container mx-auto px-6 py-12">
        <p className="text-center font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          Trusted by builders at
          <sup className="ml-0.5 text-muted-foreground/50">*</sup>
        </p>
        <ul className="mt-7 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
          {trustedCompanies.map((company) => (
            <li key={company}>
              <span className="text-sm font-semibold text-muted-foreground/70 transition-colors hover:text-foreground/80">
                {company}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-7 text-center text-[10px] tracking-wide text-muted-foreground/45">
          <sup>*</sup> None of these companies are real. None of this is real,
          actually.{" "}
          <Link
            href="/about#disclosure"
            className="underline underline-offset-2 transition-colors hover:text-muted-foreground"
          >
            We can explain
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
