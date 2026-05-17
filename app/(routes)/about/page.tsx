import type { Metadata } from "next";

import { brand } from "@/lib/brand";
import { Callout } from "@/components/ui/callout";
import { SectionHeading } from "@/components/ui/section-heading";
import { TeamCard } from "@/components/sections/team-card";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "About",
  description: `About ${brand.company.name} — mission, research team, and the parody disclosure for this satirical work.`,
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <SectionHeading
        eyebrow="About"
        title={brand.company.name}
        description="Building frontier-grade AI from Seoul — multimodal reasoning, agentic workflows, and constitutional safety as one integrated stack."
      />

      {/* Mission */}
      <section className="mx-auto mt-16 max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          Mission
        </p>
        <p className="mt-4 text-lg leading-relaxed text-foreground/90">
          {brand.company.name} 은 안전한 frontier AI 를 한국에서 만든다.
          Multi-agent · AgentOS · constitutional 안전성을 단일 스택으로 통합하여,
          추론·코드·에이전트 워크플로의 새로운 frontier 를 세계로 가져온다.
        </p>
      </section>

      {/* Team */}
      <section className="mt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
            Team
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            The people behind {brand.model.flagship}.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              initials={member.initials}
            />
          ))}
        </div>
      </section>

      {/* Parody Disclosure — site's legal safe zone */}
      <section id="disclosure" className="mx-auto mt-24 max-w-3xl scroll-mt-24">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          Parody Disclosure
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          This entire site is a parody.
        </h2>
        <div className="mt-6 space-y-4">
          <Callout variant="accent" title="요약 (Summary)">
            <p className="leading-relaxed">
              이 사이트의 모든 콘텐츠 — {brand.company.name}, Nexora 모델
              시리즈, 모든 벤치마크 점수, 팀 멤버, 파트너, 기술 사양, 특허,
              인증 등 — 은 한국 AI 업계의 출시 톤과 벤치마크 차트 문법을 풍자
              하는 <strong>패러디 작품</strong>입니다.
            </p>
          </Callout>

          <div className="space-y-4 text-sm leading-relaxed text-foreground/85">
            <p>
              실존하는 어떤 기업·인물·제품·논문·평가 결과와도 무관합니다. 모든
              팀 멤버는 가공 인물이며, 모든 파트너는 placeholder 이거나 가공
              이고, 모든 성능 수치는 조작된 것이며, 모든 &ldquo;특허&rdquo; ·
              &ldquo;인증&rdquo; 표기는 풍자입니다.
            </p>
            <p>
              이 사이트를 진짜 AI 연구소라고 생각하셨다면 — 농담을 발견하신
              겁니다. 작품에 참여해 주셔서 감사합니다.
            </p>
            <p className="text-xs text-muted-foreground">
              All content on this website — including {brand.company.name},
              the Nexora model series, all benchmark scores, team members,
              partners, technical specifications, patents, and certifications
              — is a parody work satirizing the launch tone and benchmark
              chart conventions of the AI industry. No real company, person,
              product, paper, or evaluation result is referenced.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
