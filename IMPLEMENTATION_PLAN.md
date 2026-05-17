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
- [ ] 상단 네비게이션 컴포넌트 — Home / Benchmarks / Capabilities / Architecture / Security / About 6 라우트. mobile 햄버거 메뉴 포함
- [ ] 푸터 컴포넌트 — 가공 회사 정보 + 패러디 disclosure 한 줄 (CLAUDE.md §3 옵션 A 톤). copyright / nav mirror / 소셜 더미 링크
- [ ] 디자인 토큰 system — Tailwind `theme.extend` 에 color/typography/spacing/radii 정의 + CSS variables (light/dark 모드 모두). "프로덕션급 이상" 시각 톤
- [ ] 공용 UI primitives — `<SectionHeading>`, `<MetricCard>`, `<Badge>`, `<Callout>`, `<CodeBlock>`, `<Pill>` 등 페이지간 재사용 컴포넌트

### Phase 2 — 페이지 콘텐츠 (각 1 task)

- [ ] Home 페이지 — 히어로(가공 모델명·tagline·KPI 3개·CTA "Try the demo") + "핵심 metric" 강조 섹션 + "Trusted by..." 가공 로고 슬라이더 (실존 로고 금지) + 데모 위젯 entrypoint
- [ ] Benchmarks 페이지 — Recharts 기반 가공 차트 다종 (MMLU/HumanEval/GSM8K 류 가공 vertical, 시계열 진화 차트, 레이더 차트, "Pareto frontier" 산점도) + 각 차트 캡션
- [ ] Capabilities 페이지 — "Multi-modal reasoning / Long-context / Tool use / Code / Agentic workflows" 카드 그리드 + 각 능력별 가짜 spec sheet
- [ ] Architecture 페이지 — "Multi-Agent · AgentOS · Harness · Orchestration" 가공 다이어그램 (SVG 또는 React 컴포넌트) + 각 레이어 설명. buzzword 적극 활용
- [ ] Security 페이지 — Alignment / Red-teaming / Compliance / Provenance 섹션 카드 + 가짜 "Safety evaluation" 차트
- [ ] About 페이지 — 가공 팀 멤버 4~6명 카드 (이름·역할·가공 prior experience, AI 생성 인물 이미지 정적 자산) + **명확한 패러디 disclosure 한 단락** (CLAUDE.md §3·§5 준수)

### Phase 3 — 인터랙티브 데모 위젯

- [ ] 데모 위젯 UI — 입력창 + 응답 영역 + 로딩 skeleton + 에러 상태. 모달 또는 dedicated section. 마이크로 인터랙션 (focus ring, typing animation)
- [ ] 데모 dataset 200개 큐레이션 — `public/data/qa.json` 에 `{id, question, answer, keywords[]}` 형태. CLAUDE.md §5 금지 항목(실존 모방 / 결제·구독 / 명예훼손) 회피
- [ ] BM25 키워드 매칭 클라이언트 로직 — `lib/retrieval/bm25.ts`. dataset 의 `keywords[]` 와 사용자 입력 토큰 매칭, 점수 산출
- [ ] 빌드타임 임베딩 사전계산 스크립트 — `scripts/precompute-embeddings.mjs`. dataset 각 question 에 대해 Voyage `voyage-4` 호출 후 `public/data/embeddings.json` 산출 (1024-dim float32)
- [ ] Voyage API 키 프록시 Route Handler — `app/api/embed/route.ts` (POST). 쿼리 임베딩 1회 호출 후 반환. 키는 env, body 검증, rate-limit 가벼운 적용
- [ ] 하이브리드 retrieval 합산 — `lib/retrieval/hybrid.ts`. BM25(60%) + 코사인 유사도(40%) 정규화 후 가중합. 상위 1건 응답 반환
- [ ] 데모 위젯 UX 마감 — 응답 typewriter 애니메이션, 에러 toast, 입력 제한(글자수·rate), "다시 묻기" 버튼

### Phase 4 — 폴리시 / 분석 / SEO

- [ ] Vercel Analytics 통합 — `<Analytics />` 컴포넌트 RootLayout 삽입. 별도 백엔드 0
- [ ] OG/메타 태그 페이지별 customize — `generateMetadata` per route. 각 페이지 OG 이미지 (정적 또는 `opengraph-image.tsx`)
- [ ] sitemap.xml + robots.txt — `app/sitemap.ts` / `app/robots.ts`
- [ ] 페이지 전환 디테일 — View Transitions API 또는 Framer Motion. 라우트 변경 시 부드러운 전환
- [ ] 마이크로 인터랙션 패스 — hover/focus/active 모든 인터랙티브 요소, 스크롤 reveal, 차트 hover tooltip
- [ ] 반응형 최종 검증 — mobile (375px) / tablet (768px) / desktop (1280/1920px) 4 viewport 에서 6 페이지 모두 점검

### Phase 5 — 배포 준비 + launch

- [ ] Vercel 배포 설정 — `vercel.json` (env var 매핑, region) + 프로덕션 `npm run build` exit 0 + 미리보기 배포 1회 성공
- [ ] Lighthouse 점수 — Performance / Accessibility / SEO 각 95+ 도달 (Best Practices 별도 기준)
- [ ] 최종 시각 디테일 패스 — 한 페이지씩 끝까지 다듬기. CLAUDE.md §3 🔥최우선 원칙 ("백엔드 없는 게 안 드러날 정도") 충족 자체 점검
- [ ] launch readiness 최종 — disclosure 문구 (About 한 단락 + 푸터 한 줄) 톤 최종 확정 + 모든 페이지 패러디 명시 일관성 검증

---

## DONE (참고용 로그)

<!-- 완료된 항목은 ralph 가 여기로 이동하거나, 그냥 위 TODO 에서 [x] 토글만 해도 무방. -->

- [x] (iter 1) IMPLEMENTATION_PLAN.md plan 보강 — vision(CLAUDE.md §1~§8) 기반 24 task 누적 + AGENTS.md 환경 사전조건 / 셋업 / 검증 명령 채움 + .gitignore Next.js·Vercel·ralph state 추가
