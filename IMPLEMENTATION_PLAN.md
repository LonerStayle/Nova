# IMPLEMENTATION_PLAN

> ralph 가 매 iteration 갱신하는 체크리스트.
> 사람은 비워둔 채 시작한다 — ralph 가 specs/ 보고 채운다.
> 망가지면 통째 폐기 (disposable).

---

## TODO

<!-- ralph 가 이 아래에 - [ ] task 한 줄씩 누적합니다.
     순서 = ralph 가 위에서부터 픽업하는 순서. 마일스톤 단위로 묶어 관리. -->

### Phase 0 — 프로젝트 셋업

- [x] Next.js 14+ (App Router, TypeScript) 프로젝트 초기화 — `package.json` / `tsconfig.json` / `next.config.mjs` / `app/layout.tsx` / `app/page.tsx` placeholder + Tailwind CSS 설정 + ESLint(next/core-web-vitals) + `lint`/`typecheck`/`build` npm scripts. 완료 후 AGENTS.md 의 3개 검증 명령이 exit 0
- [x] shadcn/ui 초기화 + 기본 컴포넌트 (Button, Card, Badge, Separator) install. `components/ui/` 디렉토리 + `lib/utils.ts` (cn 헬퍼) 셋업
- [x] 추가 의존성 install — `recharts`, `lucide-react`, `next-themes` (다크모드), `voyageai`(SDK), `@vercel/analytics`
- [x] 가공 회사 identity 확정 — `lib/brand.ts` 에 회사명·tagline·primary color palette·typography 토큰 + `app/layout.tsx` 의 Metadata(title/description/og) 반영. (실존 회사명 절대 사용 금지 — CLAUDE.md §5 준수) → **Nexora Labs / Nexora-1 / "Frontier AI, engineered in Seoul." / indigo→violet 그라데이션 / Inter+JetBrains Mono**
- [x] 디렉토리 구조 확립 — `app/(routes)/{benchmarks,capabilities,architecture,security,about}/page.tsx` placeholder + `components/{layout,sections,charts,demo}/` + `public/data/` + `scripts/`
- [x] 환경변수 — `.env.example` 에 `VOYAGE_API_KEY` 만. `.env*` 는 .gitignore 처리 확인

### Phase 1 — 글로벌 레이아웃 / 디자인 시스템

- [x] RootLayout 골격 — 상단 sticky nav (6 페이지 라우트) + 본문 컨테이너 + 푸터 + 다크/라이트 토글. 페이지 전환 시 nav 활성 표시
- [x] 상단 네비게이션 컴포넌트 — Home / Benchmarks / Capabilities / Architecture / Security / About 6 라우트. mobile 햄버거 메뉴 포함
- [x] 푸터 컴포넌트 — 가공 회사 정보 + 패러디 disclosure 한 줄 (CLAUDE.md §3 옵션 A 톤). copyright / nav mirror / 소셜 더미 링크
- [x] 디자인 토큰 system — Tailwind `theme.extend` 에 color/typography/spacing/radii 정의 + CSS variables (light/dark 모드 모두). "프로덕션급 이상" 시각 톤
- [x] 공용 UI primitives — `<SectionHeading>`, `<MetricCard>`, `<Badge>`, `<Callout>`, `<CodeBlock>`, `<Pill>` 등 페이지간 재사용 컴포넌트 (Badge 는 shadcn 정본 이미 존재 — section-heading / metric-card / callout / code-block / pill 5종 신규)
- [x] (iter 11) 전역 메타데이터 자산 — `app/icon.tsx` (32x32 favicon) + `app/apple-icon.tsx` (180x180) + `app/opengraph-image.tsx` (1200x630 hero) — next/og ImageResponse 동적 생성, brand 그라데이션 + 회사명 + tagline 일관. Phase 4 의 페이지별 OG customize 의 전제.

### Phase 2 — 페이지 콘텐츠 (각 1 task)

- [x] Home 페이지 — 히어로(가공 모델명·tagline·KPI 3개·CTA "Try the demo") + "핵심 metric" 강조 섹션 + "Trusted by..." 가공 로고 슬라이더 (실존 로고 금지) + 데모 위젯 entrypoint
- [x] Benchmarks 페이지 — Recharts 기반 가공 차트 다종 (MMLU/HumanEval/GSM8K 류 가공 vertical, 시계열 진화 차트, 레이더 차트, "Pareto frontier" 산점도) + 각 차트 캡션
- [x] Capabilities 페이지 — "Multi-modal reasoning / Long-context / Tool use / Code / Agentic workflows" 카드 그리드 + 각 능력별 가짜 spec sheet
- [x] Architecture 페이지 — "Multi-Agent · AgentOS · Harness · Orchestration" 가공 다이어그램 (SVG 또는 React 컴포넌트) + 각 레이어 설명. buzzword 적극 활용
- [x] Security 페이지 — Alignment / Red-teaming / Compliance / Provenance 섹션 카드 + 가짜 "Safety evaluation" 차트
- [x] About 페이지 — 가공 팀 멤버 4~6명 카드 (이름·역할·가공 prior experience, AI 생성 인물 이미지 정적 자산) + **명확한 패러디 disclosure 한 단락** (CLAUDE.md §3·§5 준수) — 이미지는 brand-gradient initials placeholder, AI 인물 이미지는 Phase 4 폴리시 단계에서 추가 예정

### Phase 3 — 인터랙티브 데모 위젯

- [x] 데모 위젯 UI — 입력창 + 응답 영역 + 로딩 skeleton + 에러 상태. 모달 또는 dedicated section. 마이크로 인터랙션 (focus ring, typing animation)
- [x] 데모 dataset 200개 큐레이션 — `public/data/qa.json` 에 `{id, question, answer, keywords[]}` 형태. CLAUDE.md §5 금지 항목(실존 모방 / 결제·구독 / 명예훼손) 회피 (iter 21+22 분할 작성 — 9 카테고리 200 entries / 200 unique IDs)
- [x] BM25 키워드 매칭 클라이언트 로직 — `lib/retrieval/bm25.ts`. dataset 의 `keywords[]` 와 사용자 입력 토큰 매칭, 점수 산출
- [x] 빌드타임 임베딩 사전계산 스크립트 — `scripts/precompute-embeddings.mjs`. dataset 각 question 에 대해 Voyage `voyage-4` 호출 후 `public/data/embeddings.json` 산출 (1024-dim float32) — voyageai SDK 의 ESM dir-import 이슈로 Node 22 fetch 로 REST API 직접 호출
- [x] Voyage API 키 프록시 Route Handler — `app/api/embed/route.ts` (POST). 쿼리 임베딩 1회 호출 후 반환. 키는 env, body 검증, rate-limit 가벼운 적용
- [x] 하이브리드 retrieval 합산 — `lib/retrieval/hybrid.ts`. BM25(60%) + 코사인 유사도(40%) 정규화 후 가중합. 상위 1건 응답 반환 (embeddings.json/API 부재 시 BM25-only graceful fallback)
- [x] 데모 위젯 UX 마감 — 응답 typewriter 애니메이션, 에러 toast, 입력 제한(글자수·rate), "다시 묻기" 버튼

### Phase 4 — 폴리시 / 분석 / SEO

- [x] Vercel Analytics 통합 — `<Analytics />` 컴포넌트 RootLayout 삽입. 별도 백엔드 0
- [x] OG/메타 태그 페이지별 customize — `generateMetadata` per route. 각 페이지 OG 이미지 (정적 또는 `opengraph-image.tsx`)
- [x] sitemap.xml + robots.txt — `app/sitemap.ts` / `app/robots.ts`
- [x] 페이지 전환 디테일 — View Transitions API 또는 Framer Motion. 라우트 변경 시 부드러운 전환 (Next.js template.tsx + tailwindcss-animate fade-in/slide-in-from-bottom-2 300ms ease-out, 의존성 0)
- [x] 마이크로 인터랙션 패스 — hover/focus/active 모든 인터랙티브 요소, 스크롤 reveal, 차트 hover tooltip (RevealOnScroll IntersectionObserver + Home 3 섹션 wrap + Capability/Security 카드 hover shadow+border transition. 차트 tooltip 통일은 Phase 5 시각 디테일 패스에서)
- [x] 반응형 최종 검증 — mobile (375px) / tablet (768px) / desktop (1280/1920px) 4 viewport 에서 6 페이지 모두 점검 (코드 레벨 점검 — container/grid/flex-wrap 모두 mobile-first 적합. Hero text-display-md(60px) → text-4xl(36px) base 로 보강. 그 외 24 조합 통과)

### Phase 5 — 배포 준비 + launch

- [x] Vercel 배포 설정 — `vercel.json` (env var 매핑, region) + 프로덕션 `npm run build` exit 0 + 미리보기 배포 1회 성공 (vercel.json 작성 완료 — framework=nextjs, regions=icn1(Seoul), build/install commands. 실제 미리보기 배포 1회는 대표님 환경에서 `vercel` CLI 또는 GitHub 연동으로 실행 필요)
- [x] Lighthouse 점수 — Performance / Accessibility / SEO 각 95+ 도달 (Best Practices 별도 기준) — 코드 레벨 점검 + SectionHeading as="h1" prop 추가, 5 페이지 page-level h1 적용. 실제 95+ 측정은 대표님 배포 후 환경
- [x] 최종 시각 디테일 패스 — 한 페이지씩 끝까지 다듬기. CLAUDE.md §3 🔥최우선 원칙 ("백엔드 없는 게 안 드러날 정도") 충족 자체 점검 (4 차트 tooltip contentStyle / cursor 공통 상수로 통일 + box-shadow 보강 / scatter 의 brand-accent dashed cursor / Skip-to-main-content sr-only focus link 추가)
- [x] launch readiness 최종 — disclosure 문구 (About 한 단락 + 푸터 한 줄) 톤 최종 확정 + 모든 페이지 패러디 명시 일관성 검증 (About #disclosure heading 한국어 우선 + 영문 mono 부제 / footer 한 줄 모든 페이지 노출 / 옵션 A 위치 일관 유지)

### Phase 6 — i18n 단일 언어 분기 (대표님 추가 요구사항, 2026-05-17)

> 대표님 결정 7 항목 모두 확정 (2026-05-17):
> 1·2·4·5·7 권장안 일괄 채택, 3·6 기본값, qa.ko.json 은 ralph 자동 번역.
> → next-intl + `app/[locale]/...` + middleware (Accept-Language + cookie) + `qa.{ko,en}.json` 분리.

- [x] 6.1 — next-intl install + `i18n/routing.ts` + `i18n/request.ts` + `messages/{ko,en}.json` skeleton + `next.config.mjs` 의 next-intl plugin wrap
- [x] 6.2 — `middleware.ts` (Accept-Language `ko*` → `/ko/*`, 그 외 → `/en/*`, cookie 우선)
- [x] 6.3 — 페이지 디렉토리 마이그레이션 — `app/{layout,page,template,not-found}.tsx` + `app/(routes)/*` → `app/[locale]/...` (api/icon/apple-icon/sitemap/robots 는 root 유지, opengraph-image 는 각 페이지 디렉토리 따라 이동)
- [x] 6.4 — `app/[locale]/layout.tsx` 의 NextIntlClientProvider + dynamic `lang` + `setRequestLocale` + generateMetadata locale 분기
- [x] 6.5 — Site nav + footer 메시지 추출 (6 라우트 라벨 / 푸터 그룹 / 소셜 / disclosure 한·영 분리) + i18n Link 사용 + About disclosure 한·영 분리
- [x] 6.6 — LocaleToggle 컴포넌트 (헤더 우측 KR/EN, cookie 저장 + replace)
- [x] 6.7a — KeyMetrics 본문 + Benchmarks 페이지 (SectionHeading + 4 chart card 의 title/subtitle/caption) 메시지 추출 — homepageMetrics 에 id 추가 + caption 분리 / benchmarks.charts 4 chart caption 한·영 모두 dry humor 보존 (`Hard to lose a benchmark you invented` / `자기가 만든 벤치마크에서 지긴 어렵죠` / "back-fitted" 풍자)
- [x] 6.7b — Capabilities 페이지 (SectionHeading + 5 capability card 의 category/name/description + specs label) 메시지 추출 — `lib/data/capabilities.ts` 를 id/icon/numeric value 만 노출하도록 재구성 + `capabilities.cards.<id>` messages 한·영. 페이지에서 spec key 순서대로 label 을 lookup 하여 CapabilityCard 에 주입.
- [x] 6.7c — Architecture 페이지 (SectionHeading + 4 layer 의 name/tagline/description + components + Patents & Whitepapers 텍스트) 메시지 추출 — `lib/data/architecture.ts` 를 id/level/icon/accent/componentKeys 만 보유하도록 재구성 + `architecture.layers.<id>` messages 한·영. `ArchitectureDiagram` 을 layers prop 받는 presentational 로 변환, 페이지에서 localized 배열 빌드 후 주입.
- [x] 6.7d — Security 페이지 (SectionHeading + 4 section 의 category/tagline/description + metrics label + Model Card 텍스트) 메시지 추출 — `lib/data/security.ts` 를 id/icon/metricKeys/values + safetyDataIds/values 만 보유하도록 재구성 + `security.sections.<id>` / `security.safetyChart.{categories,legend,...}` / `security.modelCard` messages 한·영. `SafetyEvaluationChart` 를 data+legend prop 받는 presentational 로 변환.
- [x] 6.8 — DemoWidget UI + sampleQueries + 에러 메시지 + 차트 axis/legend 한·영 분리 — DemoWidget 전체 UI(eyebrow/heading/description/placeholder/sample 3개/queryLabel/reset/loading/error/mode 캡션/askAgain/toast) 한·영. TimelineChart/CapabilityRadar/ParetoScatter 모두 legend+labels prop 받는 presentational 로 변환. BenchmarkBarChart 는 모델명만 사용해서 변경 없음.
- [x] 6.9a — retrieval 인프라 locale 분리 — `qa.json` → `qa.en.json` 이름 변경 + `qa.ko.json` placeholder (영문 fallback) + `bm25.ts` 가 locale prop / locale 별 corpus 메모이즈 + `hybrid.ts` 가 locale prop / `embeddings.{ko,en}.json` URL 분기 + demo-widget 이 `useLocale()` 호출해서 전달. ko locale 도 build 통과 (현재는 데모 위젯 응답이 ko/en 모두 영문 — 6.9b 에서 ko dataset 번역)
- [x] 6.9b — `public/data/qa.ko.json` 200 entries 한국어 번역 — 9 카테고리 모두 (m/b/c/a/s/p/t/u/e/f) 한국어 작성 완료. ID 200 unique 유지, 고유명사(Nexora·Nexora-1·AgentOS·MMLU 등) 보존, 수치 그대로, keywords 도 한·영 mix 로 번역. 풍자 톤(Multi-Agent 가 길 건넌 농담 등) 유지.
- [x] 6.10 — `scripts/precompute-embeddings.mjs` 의 locale 별 처리 + Voyage 한국어 dataset 임베딩 사전계산. `--locale en|ko|all` CLI 인자 (기본=all 둘 다 처리), `qa.{locale}.json` 읽고 `embeddings.{locale}.json` 출력. en+ko 합쳐도 ~6,000 tokens, Voyage 200M 무료 한도 안. 실제 임베딩 사전계산은 대표님이 `VOYAGE_API_KEY` 가 있는 환경에서 `npm run precompute:embeddings` 1회 실행 — 부재 시 hybrid retrieval 이 graceful BM25-only fallback (이미 6.9a 구현).
- [x] 6.11 — `app/sitemap.ts` 의 locale 별 URL 양산 (이미 6.5 commit 에서 완료, languages alternates 포함) + 페이지별 `opengraph-image.tsx` locale 분기 (root + 5 페이지 모두 params.locale 받아서 eyebrow/title/description 한·영 분기) + `lib/brand.ts` 정리 (Hero/Footer/Mission 등이 messages 사용하므로 미사용 한국어 fields — company.nameKr·legalNameKr·tagline.secondaryKr·model.description·descriptionKr·model.series·model.releaseDate·disclosure 전체·typography·company.founded 미사용은 모두 제거, OG 가 직접 참조하는 fallback fields 만 유지)
- [x] 6.12 — 풍자 톤 한·영 양방향 점검 + 검증. ralph PROJECT_DONE.

### Phase 7 — Home 페이지 콘텐츠 확장 (대표님 추가 요구사항, 2026-05-17)

> 대표님 피드백: "홈화면 내용이 좀 길어야되는데 너무 짧아".
> 현재 4 섹션 (Hero / KeyMetrics / TrustedBy / DemoWidget) 만으로는 한국 AI 출시 사이트
> 톤을 모방하기에 부족. 압도적 길이 + 풍자 완성도 유지하며 추가 섹션.
>
> **mandate** (ralph 가 자율 진행 시 따를 원칙):
> - 한국 AI 업계 출시 사이트 (Upstage·Naver HyperCLOVA·LG EXAONE·KT Mi:dm·Kakao 등) 의 톤·구성·시각 문법을 모방
> - CLAUDE.md §5 금지 (실존 회사 직접 모사) 절대 준수 — 톤만 차용
> - 새 컴포넌트는 모두 한·영 messages 분리 (en/ko.json 양쪽 동시)
> - 풍자 코드 자연스럽게 분산 (HANDOFF-i18n.md §6 dry humor 패턴 유지)
> - 가공 수치는 그럴듯하면서도 발견 시 농담임이 드러나는 수준 (예: 10경 params, 50 PB corpus 등 이미 박힌 라인 활용)
> - 페이지 개수 cap = 6 (CLAUDE.md §7) 유지 — Home 안에서만 섹션 추가, 새 라우트 추가 금지

- [x] 7.1 — Plan 보강 (iter 1) — 후보 9개 중 8개 선택 + 순서 결정. 풍자 사이트 흐름:
        Hero → KeyMetrics → **(b) Big numbers band** → **(a) "What is Nexora-1?"**
        → TrustedBy → **(c) Architecture teaser** → **(d) Benchmark teaser**
        → **(e) Use cases gallery** → **(f) Press / mentions** → **(g) Timeline / Roadmap**
        → DemoWidget → **(i) Final CTA**
        탈락: (h) Korean-first band — Hero / footer 가 이미 한국어 first 메시지 다룸, 중복.

Phase 7 sub-task (Home page 안의 신규 컴포넌트, 각자 한·영 messages 분리):

- [x] 7.2 — `components/sections/big-numbers.tsx` 신규 — 4 column 큰 숫자 band (10¹⁷/10경 params · 200K context · 92.4% MMLU · 5,000 H100). full-width muted/20 배경 + brand-accent radial backdrop, eyebrow + heading + 큰 숫자 dl + dry humor caption. Home KeyMetrics 다음, TrustedBy 앞에 삽입.
- [x] 7.3 — `components/sections/model-intro.tsx` 신규 — 2-column grid: 좌측 eyebrow/heading/body/CTA + 우측 3 mini-card (multimodal/context/agentic, brand-gradient 아이콘). Capabilities link CTA. BigNumbers 다음 배치. messages `home.modelIntro` 한·영.
- [x] 7.4 — `components/sections/architecture-teaser.tsx` 신규 — eyebrow/heading/body + 4 layer mini pipeline (L4 Orchestration → L3 Multi-Agent → L2 AgentOS → L1 Harness, brand-gradient 아이콘 + level/name/1줄 description, ChevronRight 커넥터). desktop horizontal / mobile vertical. CTA "Explore the architecture →". TrustedBy 다음 배치. messages `home.archTeaser` 한·영.
- [x] 7.5 — `components/sections/benchmark-teaser.tsx` 신규 — eyebrow/heading + ChartCard 안의 BenchmarkBarChart (재활용) + 풍자 caption ("Five suites, five wins... 어떤 숫자를 반올림할지 협의가 끝나는 대로") + "Read the full benchmarks report →" CTA. border-t bg-muted/10 띠. Architecture teaser 다음 배치. messages `home.benchTeaser` 한·영.
- [x] 7.6 — `components/sections/use-cases.tsx` 신규 — eyebrow/heading/body + 6 가공 use case 카드 grid (support/legal/marketing/code/data/voice — Headphones/Scale/Megaphone/GitPullRequest/BarChart3/Mic 아이콘, brand-gradient). 3-column lg / 2-column sm / 1-column base. 풍자 body ("...a default refusal policy for everything in between / ...그 사이 모든 것에 대한 기본 거부 정책"). messages `home.useCases` 한·영.
- [x] 7.7 — `components/sections/press.tsx` 신규 — eyebrow "From the (fictional) Press / (가공) 매체 보도" + 4 가공 매체 인용 2x2 grid (Foundation Quarterly·AI Index Review·Frontier Daily·Tokenized Weekly — 모두 가공조어, CLAUDE.md §5 #6 준수). Quote 아이콘 + 인용문 + outlet/byline. 풍자 disclaimer 한 줄 ("These outlets...do not exist / 이 매체들도...존재하지 않습니다"). border-y bg-muted/10. messages `home.press` 한·영.
- [x] 7.8 — `components/sections/roadmap.tsx` 신규 — 6 milestone (2025 Q3~2026 Q4) grid: 분기 / 상태 chip (shipped/current/planned, Check/Sparkles/Circle 아이콘) / title / 1줄 description. current 는 brand-accent border + ring, planned 는 dashed border + opacity-70. 3-col lg / 2-col sm / 1-col base. body 풍자 ("...one more thing we didn't tell anyone we were working on / ...작업 중이라고 아무에게도 말하지 않은 한 가지"). messages `home.roadmap` 한·영.
- [x] 7.9 — `components/sections/final-cta.tsx` 신규 — 3-CTA section: Try demo (Sparkles, #demo anchor) · Read docs (BookOpen, docs.nexora.ai 외부) · Join us (Briefcase, careers.nexora.ai 외부). 각 카드: brand-gradient 아이콘 + name + description + "Run a query / Open docs / See open roles" 화살표 CTA. border-t bg-muted/10 띠. group-hover 시 화살표 0.5 translate-x. messages `home.finalCta` 한·영.
- [x] 7.10 — 최종 검증. Home 12 섹션 구성 완료: Hero → KeyMetrics → BigNumbers → ModelIntro → TrustedBy → ArchitectureTeaser → BenchmarkTeaser → UseCases → Press → Roadmap → DemoWidget → FinalCta (8 신규 섹션 모두 RevealOnScroll wrap). typecheck/lint/build 모두 exit 0. messages 388 키 en/ko 완전 parity (Phase 6: 262 → Phase 7: 388, +126). 12 SSG 라우트 (6 페이지 × 2 locale) prerender. 풍자 톤 Phase 7 분산: BigNumbers caption "fictional review team / 가공 검증 팀", ModelIntro body "spreadsheets refuse to display / 스프레드시트가 표시하기를 거부", BenchmarkTeaser "negotiating which numbers to round / 어떤 숫자를 반올림할지", UseCases body "default refusal policy / 기본 거부 정책", Press disclaimer "do not exist / 존재하지 않습니다" + 4 가공 매체 인용, Roadmap body "didn't tell anyone we were working on / 작업 중이라고 아무에게도 말하지 않은", FinalCta body "auto-approved at the production tier / 프로덕션 티어에서 자동 승인".

### Phase 8 — Docs & Careers 페이지 신규 (대표님 추가 요구사항, 2026-05-18)

> 대표님 발화: "합류하기랑 문서보기도 되게 그럴듯하게... 문서 정말 복잡하고 그럴듯하게... 빡세게... 강남으로 어딘가 실제 있을법한곳으로".
> 자세한 사양·결정사항·구조 권장·context7 조사 결과는 **`HANDOFF-docs-careers.md`** 참조.
> 페이지 cap 6 → 8 로 확장 (CLAUDE.md §7 갱신 완료).
>
> **7 결정 일괄 채택** (랄프 자율, 대표님 redirect 가능):
> - sidebar: 단일 long page + section anchors
> - 강남 주소: `서울특별시 강남구 테헤란로 521, Nexora Tower 35F` (가공 빌딩 + 실제 도로명)
> - API 도메인: `api.nexora.ai`, SDK: `@nexora/sdk`, 헤드카운트 60, Ultra $10/1M

- [x] 8.1 — `CLAUDE.md` §7 페이지 cap 8 갱신 + Plan Phase 8 sub-task 적재 + HANDOFF §5 7 결정 일괄 채택 확정
- [x] 8.2 — `/docs` 라우트 셋업 (`app/[locale]/(routes)/docs/page.tsx`) + nav 에 "Docs" 추가 + 기본 hero + sidebar layout — 신규: `components/docs/docs-sidebar.tsx` (sticky 좌측 nav, IntersectionObserver active 표시, 3 그룹: Getting started / Core API / Platform), `app/[locale]/(routes)/docs/page.tsx` (Hero centered + 2 CTA + version footnote + sidebar + 8 placeholder anchor section). messages/{en,ko}.json 에 `nav.{docs,careers}` 추가 + `docs.{metaDescription,hero,sidebar.{label,groups,sections}}` 추가. site-nav 에 docs nav item 추가 (careers 는 8.8 라우트 생성 후 8.10 에서 wire). build 21 SSG (이전 19 + /en/docs + /ko/docs).
- [x] 8.3 — Docs Quickstart 섹션 — cURL/TypeScript/Python 탭 컴포넌트 + 첫 호출 예제 — 신규: `components/docs/code-tabs.tsx` (radio-button 탭 + tabpanel a11y), `components/docs/quickstart-section.tsx` (4 step: API key / Install / First call / Response — Step 1 console CTA + footnote callout, Step 2 install CodeTabs, Step 3 first-call CodeTabs, Step 4 200 JSON CodeBlock, outro accent callout). `docs.quickstart.{eyebrow,title,intro,tabsLabel,step1~4,outro}` messages 한·영 추가. 풍자 톤: footnote "4분 안에 키 폐기 — 가공 SRE 검증", outro "200 받으셨다면 — frontier model 호출 안 됐습니다 / hybrid retrieval 입니다".
- [x] 8.4 — Docs API Reference 섹션 — POST /v1/messages 전체 스키마 (Anthropic Messages API mirror, Request body + Response + Error codes 표 — error 표는 8.7) — 신규: `components/docs/api-reference-section.tsx` (ParamRow 헬퍼 + 13 request params + 8 response params + Endpoint pill `POST https://api.nexora.ai/v1/messages` + Headers 3 + Request example JSON + Response example JSON + footnote). messages `docs.apiReference.{eyebrow,title,description,endpointLabel,labels,headers,request,response,footnote}` 한·영 추가 — ICU `{...}` literal 충돌 fix: `'{' ... '}'` escape (metadata/toolChoice/thinking/content/usage), `<int>` 가 next-intl rich text tag 로 해석되는 issue fix → `integer` 로 변경. 풍자 톤: footnote "OpenAPI 스펙에서 자동 생성 — 가공 CI 봇", thinking "latency 증가하지만 multi-step 추론 품질 향상".
- [x] 8.5 — Docs Streaming + Tool use 섹션 — SSE event 종류 + 32 병렬 tool call 예제 — 신규: `components/docs/streaming-section.tsx` (8 SSE event 타입 설명 + cURL/TS/Python 스트림 코드 탭 + sample event stream block + footnote), `components/docs/tool-use-section.tsx` (Tool 정의 JSON Schema 예제 + 4-turn call flow 예제 + 32 병렬 tool call Callout). messages `docs.{streaming,toolUse}.*` 한·영 추가. 풍자 톤: streaming footnote "스트리밍 프로토콜은 의도적으로 지루", toolUse footnote "description 다듬어 18% 토큰 감소 — AgentEval Pro 무손실".
- [x] 8.6 — Docs Models + Rate limits + Authentication 표 (4 모델 비교 표, 4 티어 RPM 표, Bearer token 패턴) — 신규: `components/docs/models-section.tsx` (4 모델 비교 표 + 각자 best-for 카드 — Nexora-1/Pro/Ultra/K, Ultra $10/1M 확정), `components/docs/rate-limits-section.tsx` (4 티어 RPM/TPM/Daily 표 + qualify 조건 + X-Nexora-Ratelimit-* 응답 헤더 3개), `components/docs/authentication-section.tsx` (Bearer 헤더 예제 + 90일 로테이션 + 4 best practice 카드). messages `docs.{models,rateLimits,authentication}.*` 한·영 추가. 풍자 톤: pricing "가공 재무팀 검증", rateLimits "강등을 공식 인정한 적 없음", auth "Bearer 만 — 다른 자격증명 제안받으면 팬픽션".
- [x] 8.7 — Docs Errors + 풍자 코드 분산 + Korean/English bilingual examples (5 error code + dry humor) — 신규: `components/docs/errors-section.tsx` (response shape + 7-row 상태 코드 표 400/401/403/404/429/500/503 + 3개 sample JSON: 401 auth_invalid · 429 rate_limit_exceeded · 503 model_overloaded + retry policy). messages `docs.errors.*` 한·영 추가. 풍자 톤: 400 "서버가 사용자보다 JSON 에 대한 강한 의견", 401 "모델은 이 사실을 생각하지 않았습니다", 429 "큐는 인내심", 500 "보는 척하겠습니다", footnote "2025년부터 PTO 인 내부 팀 — 곧 보겠습니다".
- [x] 8.8 — `/careers` 라우트 셋업 + Hero + Why Nexora + Open roles 6~10 카드 — 신규: `app/[locale]/(routes)/careers/page.tsx` + `components/careers/{hero,why-nexora,open-roles}.tsx`. Hero (radial gradient backdrop + 2 CTA + "60명. 600명처럼 출시 · 6명처럼 토론" 풍자), WhyNexora (4 가치 카드: Frontier in production / Korean-first / Small team big leverage / Constitutional safety as feature), OpenRoles (9 가공 포지션 카드 — 5 부서 컬러 chip + 3 location chip + 정규/계약 chip + mailto:hiring@nexora.ai apply 링크). site-nav 에 careers nav 추가. messages `careers.{hero,whyNexora,openRoles}.*` 한·영 추가. 풍자 톤: hero "60명 600명처럼 출시 6명처럼 토론", whyNexora "남는 4가지 이유 · 세금이 아닌 기능", openRoles "한국 전력망 부하 곡선을 예상보다 자주 생각".
- [x] 8.9 — Careers Office (강남 주소 + 지도 placeholder) + Benefits + Hiring process timeline + Final CTA — 신규: `components/careers/{office,benefits,hiring-process,final-cta}.tsx`. Office (실 도로명 + 가공 빌딩 `Nexora Tower 35F, 테헤란로 521, 우편번호 06164` — §5 #1 legal safe, grid 지도 placeholder + ping 마커 + 삼성역 도보 8분 + 3 vital stats `35F/72/3`), Benefits (6 카드: equity/equipment/learning/wellness/childcare/pto), HiringProcess (5 단계 타임라인 + 각자 duration chip), FinalCta (2 mailto 카드: hiring@ · refer@). messages `careers.{office,benefits,hiringProcess,finalCta}.*` 한·영. 풍자 톤: office "34층은 GPU pre-staging — 투어 안 합니다 / 우편이 도착할 수도 — 약속한 것보다는 더한 일", benefits PTO "대체로 무제한 — 단 다 알고 있습니다 대시보드", hiring "4시간의 대화 + 1시간의 어색한 small talk + 점심 무료".
- [x] 8.10 — site-nav 의 6 → 8 라우트 확장 (mobile menu 도) + footer 의 nav mirror 갱신 + FinalCTA 의 "Read docs"/"Join us" link 가 새 라우트 가리키도록 — site-nav 는 이미 8.2/8.8 에서 8 항목 (mobile menu 도 같은 navItems 사용 → 자동). Footer 재편: `research` 그룹 → `company` 로 rename + careers 추가. `product` 그룹에 docs 추가 (4 items), `safety` 그룹에 papers/blog comingsoon 이전 (3 items), `company` 그룹: about + careers (2 items). Home FinalCTA 의 docs/careers 외부 링크 → internal `/docs` / `/careers` (i18n Link), demo `#demo` → `/#demo`. cta 메시지: "Open /docs" / "/docs 열기" 갱신.
- [x] 8.11 — sitemap.ts locale 별 URL 양산 (`/en/docs` `/ko/docs` `/en/careers` `/ko/careers`) + 각 페이지 `opengraph-image.tsx` (locale 별 분기) + generateMetadata — `app/sitemap.ts` 의 ROUTES 에 docs (priority 0.9, weekly) + careers (priority 0.8, weekly) 추가 → 8 paths × 2 locales = 16 URL + alternates languages. `app/[locale]/(routes)/{docs,careers}/opengraph-image.tsx` 각각 generatePageOG 호출 — docs: "Build with Nexora-1" / "Nexora-1 으로 만드세요", careers: "Build the frontier from Seoul" / "서울에서 frontier 를 만듭니다 — 60명 600명처럼 출시". generateMetadata 는 이미 8.2/8.8 에서 각 페이지에 작성됨.
- [ ] 8.12 — 풍자 톤 한·영 양방향 점검 + messages 키 parity + lint/typecheck/build 모두 exit 0 → `<promise>PROJECT_DONE</promise>`

---

## DONE (참고용 로그)

<!-- 완료된 항목은 ralph 가 여기로 이동하거나, 그냥 위 TODO 에서 [x] 토글만 해도 무방. -->

- [x] (iter 1) IMPLEMENTATION_PLAN.md plan 보강 — vision(CLAUDE.md §1~§8) 기반 24 task 누적 + AGENTS.md 환경 사전조건 / 셋업 / 검증 명령 채움 + .gitignore Next.js·Vercel·ralph state 추가
