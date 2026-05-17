import { trustedCompanies } from "@/lib/data/trusted-companies";

export function TrustedBy() {
  return (
    <section className="border-y border-border/40 bg-muted/20">
      <div className="container mx-auto px-6 py-12">
        <p className="text-center font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          Trusted by builders at
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
      </div>
    </section>
  );
}
