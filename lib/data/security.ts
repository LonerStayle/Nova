/**
 * 가공 Security 데이터 — Security 페이지의 4 섹션 + safety evaluation 차트.
 *
 * ⚠️ 모든 수치 / metric 은 풍자 목적의 가공.
 *    CLAUDE.md §5 #7 (실존 인증·VC·학회 로고 도용 금지) 준수 —
 *    "SOC 2 / ISO 27001 / GDPR" 같은 실존 인증명 직접 언급 X.
 *    일반 표현 ("regulatory frameworks", "voluntary disclosures", "Model Card") 사용.
 *
 * i18n 구조: category/tagline/description, metrics.label 은
 * `messages/{en,ko}.json` 의 `security.sections.<id>` 로 이동. 이 파일은
 * non-translatable identifier(아이콘/metric key 순서/수치값) 만 보유.
 */

import {
  FileCheck,
  Fingerprint,
  Shield,
  Target,
  type LucideIcon,
} from "lucide-react";

export const securitySectionIds = [
  "alignment",
  "redTeaming",
  "compliance",
  "provenance",
] as const;

export type SecuritySectionId = (typeof securitySectionIds)[number];

export const securitySectionIcons: Record<SecuritySectionId, LucideIcon> = {
  alignment: Target,
  redTeaming: Shield,
  compliance: FileCheck,
  provenance: Fingerprint,
};

export const securityMetricKeys: Record<
  SecuritySectionId,
  readonly string[]
> = {
  alignment: ["refusal", "compliance", "rounds", "critics"],
  redTeaming: ["cadence", "external", "jailbreak", "vectors"],
  compliance: ["residency", "audit", "redaction", "voluntary"],
  provenance: ["modelCard", "lineage", "watermark", "audit"],
};

// 가공 수치 값 — non-translatable (단 residency 의 "ap-northeast-2 (Seoul)" 는 위치명. ko 에선 "ap-northeast-2 (서울)" 로 표시할지 검토)
export const securityMetricValues: Record<
  SecuritySectionId,
  Record<string, string>
> = {
  alignment: {
    refusal: "96.4%",
    compliance: "98.1%",
    rounds: "12+",
    critics: "8 specialized",
  },
  redTeaming: {
    cadence: "every 2 weeks",
    external: "6 completed",
    jailbreak: "91.2%",
    vectors: "3,000+",
  },
  compliance: {
    residency: "ap-northeast-2 (Seoul)",
    audit: "365 days",
    redaction: "automated",
    voluntary: "quarterly",
  },
  provenance: {
    modelCard: "v1.0 published",
    lineage: "SHA-256 chain",
    watermark: "opt-in",
    audit: "annual",
  },
};

// Safety evaluation — horizontal bar chart 데이터 (refusal rate by category)
export const safetyDataIds = [
  "cbrn",
  "illegal",
  "deception",
  "harmful",
  "privacy",
  "misinformation",
] as const;

export type SafetyDataId = (typeof safetyDataIds)[number];

export const safetyDataValues: Record<
  SafetyDataId,
  { nexora: number; industry: number }
> = {
  cbrn: { nexora: 99.2, industry: 95.4 },
  illegal: { nexora: 97.8, industry: 92.1 },
  deception: { nexora: 94.5, industry: 88.3 },
  harmful: { nexora: 95.1, industry: 90.8 },
  privacy: { nexora: 96.7, industry: 89.2 },
  misinformation: { nexora: 93.4, industry: 85.6 },
};
