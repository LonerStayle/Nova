import { brand } from "@/lib/brand";

export default function HomePage() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center px-6 py-24 sm:py-32">
      <div className="max-w-2xl space-y-4 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {brand.company.location}
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          {brand.company.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          {brand.tagline.primary}
        </p>
        <p className="pt-6 text-xs text-muted-foreground/70">
          Bootstrap placeholder — 다음 iter 에서 hero · 핵심 KPI · &quot;Try the
          demo&quot; CTA · 가공 로고 슬라이더로 교체됩니다.
        </p>
      </div>
    </main>
  );
}
