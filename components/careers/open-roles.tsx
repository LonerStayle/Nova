import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

type DepartmentKey =
  | "research"
  | "engineering"
  | "safety"
  | "product"
  | "operations";

type LocationKey = "seoulHybrid" | "seoulOnsite" | "remoteKst";
type EmploymentKey = "fullTime" | "contract";

type RoleKey =
  | "researchEng"
  | "mlInfra"
  | "agentResearch"
  | "safety"
  | "frontend"
  | "devrel"
  | "platformPM"
  | "design"
  | "recruiter";

type Role = {
  key: RoleKey;
  department: DepartmentKey;
  location: LocationKey;
  employment: EmploymentKey;
};

const roles: Role[] = [
  {
    key: "researchEng",
    department: "research",
    location: "seoulOnsite",
    employment: "fullTime",
  },
  {
    key: "agentResearch",
    department: "research",
    location: "seoulHybrid",
    employment: "fullTime",
  },
  {
    key: "mlInfra",
    department: "engineering",
    location: "seoulOnsite",
    employment: "fullTime",
  },
  {
    key: "frontend",
    department: "engineering",
    location: "seoulHybrid",
    employment: "fullTime",
  },
  {
    key: "safety",
    department: "safety",
    location: "seoulHybrid",
    employment: "fullTime",
  },
  {
    key: "platformPM",
    department: "product",
    location: "seoulHybrid",
    employment: "fullTime",
  },
  {
    key: "design",
    department: "product",
    location: "remoteKst",
    employment: "fullTime",
  },
  {
    key: "devrel",
    department: "engineering",
    location: "remoteKst",
    employment: "fullTime",
  },
  {
    key: "recruiter",
    department: "operations",
    location: "seoulHybrid",
    employment: "contract",
  },
];

const departmentToneClass: Record<DepartmentKey, string> = {
  research:
    "border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  engineering:
    "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  safety:
    "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  product:
    "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  operations:
    "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

export async function OpenRoles() {
  const t = await getTranslations("careers.openRoles");
  const tDepts = await getTranslations("careers.openRoles.departments");
  const tLocs = await getTranslations("careers.openRoles.locations");
  const tEmp = await getTranslations("careers.openRoles.employmentTypes");
  const tRoles = await getTranslations("careers.openRoles.roles");

  return (
    <section
      id="open-roles"
      className="scroll-mt-24 border-y border-border/40 bg-muted/10"
    >
      <div className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("body")}
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-foreground/70">
            {t("headcountNote")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {roles.map((role) => (
            <article
              key={role.key}
              className="group rounded-xl border border-border/60 bg-background/60 p-5 transition-colors hover:border-[hsl(var(--brand-accent)/0.5)] hover:bg-background"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${departmentToneClass[role.department]}`}
                >
                  {tDepts(role.department)}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                  · {tEmp(role.employment)}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {tRoles(`${role.key}.title`)}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tRoles(`${role.key}.summary`)}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {tLocs(role.location)}
                </span>
                <Link
                  href={`mailto:hiring@nexora.ai?subject=${encodeURIComponent(tRoles(`${role.key}.title`))}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-[hsl(var(--brand-accent))]"
                >
                  {t("ctaApply")}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
