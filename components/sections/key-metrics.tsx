import { MetricCard } from "@/components/ui/metric-card";
import { homepageMetrics } from "@/lib/data/metrics";

export function KeyMetrics() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-center font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          Performance Snapshot
        </p>
        <h2 className="mt-3 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Frontier results across standard evaluations.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {homepageMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              delta={metric.delta}
              deltaTrend={metric.deltaTrend}
              caption={metric.caption}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
