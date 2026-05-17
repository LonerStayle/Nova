"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** ms delay before fade/slide kicks in after element enters viewport */
  delayMs?: number;
  /** intersection threshold (0..1) */
  threshold?: number;
}

/**
 * IntersectionObserver 기반 스크롤 reveal — viewport 진입 시 fade-in + slide-up.
 * 한 번만 fire (single fire) — 다시 viewport 밖으로 나가도 visible 유지.
 *
 * 사용 예:
 *   <RevealOnScroll>
 *     <KeyMetrics />
 *   </RevealOnScroll>
 */
export function RevealOnScroll({
  children,
  className,
  delayMs = 0,
  threshold = 0.15,
}: RevealOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // 이미 viewport 안에 있으면 (SSR 후 첫 렌더 시 hero 다음 섹션 등) 즉시 visible
    if (typeof window !== "undefined" && window.IntersectionObserver) {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold,
          rootMargin: "0px 0px -64px 0px",
        },
      );
      observer.observe(node);
      return () => observer.disconnect();
    }

    // Fallback — IntersectionObserver 미지원 환경에서는 즉시 visible
    setVisible(true);
    return undefined;
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={cn(
        "transition-all duration-700 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
