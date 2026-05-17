/**
 * "Trusted by ..." 섹션의 가공 회사 리스트.
 *
 * ⚠️ 모두 완전 가공조어. CLAUDE.md §5 #7 (실존 신뢰성 신호 위조 금지) 준수.
 *    텍스트만 사용 — 실존 / 가공 로고 이미지 일체 금지.
 *    검색 시 실존 회사와 충돌하지 않는 unique 한 이름들로 선정.
 */

export const trustedCompanies: readonly string[] = [
  "Halcyon Robotics",
  "Polaris Holdings",
  "Aurora Cognitive",
  "Stellaris Ventures",
  "Vermilion Labs",
  "Aetheron AI",
] as const;
