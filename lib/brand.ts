/**
 * Nexora Labs — 가공 회사 identity (단일 출처)
 *
 * ⚠️  PARODY DISCLOSURE
 *     이 사이트의 모든 회사·모델·인물·벤치마크·기술 명세는 풍자 목적의 가공 정보입니다.
 *     실존 기업·연구진·제품·논문과 무관하며, 사이트의 모든 페이지 푸터와 /about 페이지에
 *     명시적 패러디 disclosure 가 함께 노출됩니다.
 *
 * 이 파일은 풍자 사이트 전반에서 참조하는 single source of truth.
 * 회사명·tagline·팔레트·타이포·소셜·법인명까지 한 곳에서 변경하면 사이트 전체 반영됩니다.
 *
 * 변경 시 주의: CLAUDE.md §5 (실존 회사·임원·제품명 직접 모사 금지) 준수 필수.
 */

export const brand = {
  // 회사 식별자
  company: {
    name: "Nexora Labs",
    nameKr: "넥소라 랩스",
    legalName: "Nexora Cognitive Systems, Inc.",
    legalNameKr: "(주)넥소라 코그니티브 시스템즈",
    domain: "nexora.ai",
    founded: 2024,
    location: "Seoul, Republic of Korea",
    locationKr: "대한민국 서울",
  },

  // tagline / 핵심 메시지
  tagline: {
    primary: "Frontier AI, engineered in Seoul.",
    primaryKr: "서울에서 만든 프론티어 AI",
    secondary:
      "Multimodal reasoning. Agentic workflows. Frontier-grade safety.",
    secondaryKr:
      "멀티모달 추론, 에이전트 워크플로, 프론티어급 안전성",
  },

  // 모델 라인업 (가공)
  model: {
    flagship: "Nexora-1",
    series: ["Nexora-1", "Nexora-1 Pro", "Nexora-1 Ultra", "Nexora-K"],
    description:
      "Frontier-grade multimodal foundation model with agentic reasoning, ultra-long-context understanding, and constitutional safety alignment.",
    descriptionKr:
      "에이전트 추론·초장기 컨텍스트·constitutional 안전성을 갖춘 프론티어급 멀티모달 파운데이션 모델",
    releaseDate: "2026-Q2",
  },

  // 색상 팔레트 — globals.css 의 shadcn HSL tokens 와 별개로 브랜드 hero/CTA 강조용
  palette: {
    // primary — deep indigo (브랜드 메인)
    primary: {
      hsl: "244 71% 28%",
      hex: "#1e1b4b",
    },
    // accent — electric violet (CTA / 강조)
    accent: {
      hsl: "270 91% 65%",
      hex: "#a855f7",
    },
    // gradient — primary → accent 대각선
    gradient:
      "linear-gradient(135deg, hsl(244 71% 28%) 0%, hsl(270 91% 65%) 100%)",
  },

  // typography (실제 font 로딩은 RootLayout 의 next/font/google 에서)
  typography: {
    sans: "Inter",
    mono: "JetBrains Mono",
    display: "Inter",
  },

  // 가공 외부 링크 (실제 라우팅은 후속 task — 모두 외부 도메인 placeholder)
  social: {
    twitter: "@nexora_ai",
    github: "nexora-labs",
    research: "research.nexora.ai",
    careers: "careers.nexora.ai",
  },

  // 패러디 disclosure — 푸터 한 줄 + About 페이지 한 단락에서 참조
  disclosure: {
    short:
      "이 사이트는 한국 AI 업계의 출시 톤과 벤치마크 차트 문법을 풍자하는 패러디 작품입니다. 실존 기업·인물·제품과 무관합니다.",
    shortEn:
      "This site is a parody work satirizing the launch tone and benchmark chart conventions of the Korean AI industry. No real companies, individuals, or products are referenced.",
    fullPath: "/about#disclosure",
  },
} as const;

export type Brand = typeof brand;
