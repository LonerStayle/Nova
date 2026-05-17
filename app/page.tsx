import { brand } from "@/lib/brand";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-8">
      <div className="max-w-2xl space-y-4 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {brand.company.location}
        </p>
        <h1 className="text-5xl font-bold tracking-tight">
          {brand.company.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          {brand.tagline.primary}
        </p>
        <p className="pt-6 text-xs text-muted-foreground/70">
          Bootstrap placeholder — 다음 iter 에서 글로벌 레이아웃 · hero 디자인 · 6 페이지
          네비게이션으로 교체됩니다.
        </p>
      </div>
    </main>
  );
}
