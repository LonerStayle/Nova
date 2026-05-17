/**
 * 가공 팀 멤버 — About 페이지 6 카드.
 *
 * ⚠️ 전원 가공 인물. 모든 이름·역할·이력은 풍자 목적.
 *    CLAUDE.md §5 #2 (실존 인물 사진·이름 금지) 준수.
 *    prior 회사명은 trusted-companies.ts 의 가공 회사 풀에서 재사용 — 사이트 내 일관성.
 *    학교명 / 학회 / 논문 인용 0 — 실존 신뢰 신호 위조 회피.
 */

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const team: readonly TeamMember[] = [
  {
    name: "Jiwon Park",
    role: "CEO · Co-founder",
    bio: "Previously led applied research at Quantum Holdings. 12+ years in foundation model alignment.",
    initials: "JP",
  },
  {
    name: "Daniel Choi",
    role: "CTO · Co-founder",
    bio: "Architect of the AgentOS scheduler. Previously distinguished engineer at Helix Compute.",
    initials: "DC",
  },
  {
    name: "Min-jae Seo",
    role: "Head of Research",
    bio: "Long-context attention research lead. PhD in Machine Learning, 30+ publications.",
    initials: "MS",
  },
  {
    name: "Hae-won Kim",
    role: "VP of Safety",
    bio: "Constitutional alignment program lead. Previously safety lead at Aurora Cognitive.",
    initials: "HK",
  },
  {
    name: "Soobin Lee",
    role: "Head of Engineering",
    bio: "Inference runtime & FP8 kernel author. Previously infrastructure lead at Vermilion Labs.",
    initials: "SL",
  },
  {
    name: "Tae-yang Oh",
    role: "VP of Product",
    bio: "Demo & developer experience. Previously product lead at Aetheron AI.",
    initials: "TO",
  },
] as const;
