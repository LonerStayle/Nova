import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-display-md">
          {t("title")}
        </h1>
        <p className="mt-6 text-base text-muted-foreground">{t("body")}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">{t("primary")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about#disclosure">{t("secondary")}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
