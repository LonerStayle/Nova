/**
 * 가공 Security 데이터 — Security 페이지의 4 섹션 + safety evaluation 차트.
 *
 * ⚠️ 모든 수치 / metric 은 풍자 목적의 가공.
 *    CLAUDE.md §5 #7 (실존 인증·VC·학회 로고 도용 금지) 준수 —
 *    "SOC 2 / ISO 27001 / GDPR" 같은 실존 인증명 직접 언급 X.
 *    일반 표현 ("regulatory frameworks", "voluntary disclosures", "Model Card") 사용.
 */

import {
  FileCheck,
  Fingerprint,
  Shield,
  Target,
  type LucideIcon,
} from "lucide-react";

export interface SecurityMetric {
  label: string;
  value: string;
}

export interface SecuritySection {
  category: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  metrics: readonly SecurityMetric[];
}

export const securitySections: readonly SecuritySection[] = [
  {
    category: "Alignment",
    tagline: "Constitutional AI + RLHF + value alignment",
    description:
      "Multi-objective alignment with explicit constitutional principles, supervised by both human raters and automated critic agents through a 12-round training schedule.",
    icon: Target,
    metrics: [
      { label: "Refusal accuracy", value: "96.4%" },
      { label: "Constitutional compliance", value: "98.1%" },
      { label: "Training rounds", value: "12+" },
      { label: "Critic agents", value: "8 specialized" },
    ],
  },
  {
    category: "Red-teaming",
    tagline: "Continuous adversarial evaluation",
    description:
      "Internal red-team operates on a 2-week cadence. External red-team partners conducted 6 independent assessments before the public release of Nexora-1.",
    icon: Shield,
    metrics: [
      { label: "Internal cadence", value: "every 2 weeks" },
      { label: "External assessments", value: "6 completed" },
      { label: "Jailbreak resistance", value: "91.2%" },
      { label: "Attack vectors covered", value: "3,000+" },
    ],
  },
  {
    category: "Compliance",
    tagline: "Privacy, data handling & regulatory frameworks",
    description:
      "Designed to align with major regulatory frameworks for AI safety, data protection, and audit transparency — supported by ongoing voluntary disclosures.",
    icon: FileCheck,
    metrics: [
      { label: "Data residency", value: "ap-northeast-2 (Seoul)" },
      { label: "Audit log retention", value: "365 days" },
      { label: "PII redaction", value: "automated" },
      { label: "Voluntary disclosures", value: "quarterly" },
    ],
  },
  {
    category: "Provenance",
    tagline: "Model cards, training audits & output traceability",
    description:
      "Every model release ships with a public Model Card, dataset lineage hash chain, and (opt-in) cryptographic output watermarking for downstream attribution.",
    icon: Fingerprint,
    metrics: [
      { label: "Model Card", value: "v1.0 published" },
      { label: "Dataset lineage", value: "SHA-256 chain" },
      { label: "Output watermark", value: "opt-in" },
      { label: "Training set audit", value: "annual" },
    ],
  },
] as const;

// Safety evaluation — horizontal bar chart 데이터 (refusal rate by category)
export const safetyData = [
  { category: "CBRN & weapons", "Nexora-1": 99.2, "Industry avg": 95.4 },
  { category: "Illegal acts", "Nexora-1": 97.8, "Industry avg": 92.1 },
  { category: "Deception attempts", "Nexora-1": 94.5, "Industry avg": 88.3 },
  { category: "Harmful content", "Nexora-1": 95.1, "Industry avg": 90.8 },
  { category: "Privacy violations", "Nexora-1": 96.7, "Industry avg": 89.2 },
  { category: "Misinformation", "Nexora-1": 93.4, "Industry avg": 85.6 },
] as const;
