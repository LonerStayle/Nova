/**
 * Nexora Labs — 가공 회사 identity (단일 출처)
 *
 * ⚠️  PARODY DISCLOSURE
 *     이 사이트의 모든 회사·모델·인물·벤치마크·기술 명세는 풍자 목적의 가공 정보입니다.
 *     실존 기업·연구진·제품·논문과 무관하며, 사이트의 모든 페이지 푸터와 /about 페이지에
 *     명시적 패러디 disclosure 가 함께 노출됩니다.
 *
 * 이 파일은 풍자 사이트 전반에서 참조하는 single source of truth.
 *
 * i18n 정책 (Phase 6.11 정리):
 *   - 사용자 가시 텍스트는 모두 `messages/{en,ko}.json` 으로 이동
 *   - 이 파일은 locale-invariant identifier (회사명·모델명·도메인·팔레트·소셜) + OG 이미지가
 *     직접 참조하는 영문/한국어 fallback (tagline·location·secondary) 만 보유
 *   - Hero / Footer / Mission / SectionHeading 등은 모두 t() 호출로 messages 참조
 *
 * 변경 시 주의: CLAUDE.md §5 (실존 회사·임원·제품명 직접 모사 금지) 준수 필수.
 */

export const brand = {
  // 회사 식별자 (locale-invariant)
  company: {
    name: "Nexora Labs",
    legalName: "Nexora Cognitive Systems, Inc.",
    domain: "nexora.ai",
    founded: 2024,
    location: "Seoul, Republic of Korea",
    locationKr: "대한민국 서울",
  },

  // tagline / 핵심 메시지 — 주로 OG 이미지 (Satori, server-only) 가 직접 참조.
  // 페이지 컴포넌트는 messages 의 brand.tagline 을 사용한다.
  tagline: {
    primary: "Frontier AI, engineered in Seoul.",
    primaryKr: "서울에서 만든 프론티어 AI",
    secondary:
      "Multimodal reasoning. Agentic workflows. Frontier-grade safety.",
    secondaryKr:
      "멀티모달 추론. 에이전트 워크플로. 프론티어급 안전성.",
  },

  // 모델 라인업 (가공) — locale-invariant
  model: {
    flagship: "Nexora-1",
  },

  // 색상 팔레트 — light mode 기준값
  //
  // ⚠️ globals.css 의 --brand-primary / --brand-accent CSS variables 와 동기화 필수.
  //    dark mode 에서는 globals.css 의 .dark 블록이 한 단계 밝은 값으로 override.
  //    Tailwind utility: `bg-brand-primary` / `text-brand-accent` / `bg-brand-gradient` / `bg-brand-gradient-h`
  //    런타임 색은 항상 CSS variables 가 ground truth — 아래 hex 는 ImageResponse 등
  //    빌드타임 정적 자산에서만 직접 참조.
  palette: {
    primary: {
      hsl: "244 71% 28%",
      hex: "#1e1b4b",
    },
    accent: {
      hsl: "270 91% 65%",
      hex: "#a855f7",
    },
    gradient:
      "linear-gradient(135deg, hsl(244 71% 28%) 0%, hsl(270 91% 65%) 100%)",
  },

  // 가공 외부 링크 (실제 라우팅은 후속 task — 모두 외부 도메인 placeholder)
  social: {
    twitter: "@nexora_ai",
    github: "nexora-labs",
    research: "research.nexora.ai",
    careers: "careers.nexora.ai",
  },
} as const;

export type Brand = typeof brand;
