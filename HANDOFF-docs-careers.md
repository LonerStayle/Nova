# HANDOFF — Phase 8: Docs & Careers 페이지 신규

**작성일**: 2026-05-18
**대상**: 다음 세션 / 다음 ralph 세션
**범위**: `/docs` (개발 문서) + `/careers` (합류하기) 신규 페이지 2개 추가

---

## 1. 현재 상태

- **마지막 commit**: `76abe43 feat(spec): 2026.5 SOTA 점검 — 12 항목 일괄 상향`
- Phase 0~7 모두 `[x]` (Home 12 섹션, 6 페이지 i18n, SOTA 수치 정합성, 풍자 톤 분산 모두 완료)
- lint / typecheck / build 모두 exit 0
- dev server 백그라운드 task ID `bvj0bifni` (port 3956). 새 세션에서는 한 번 클린 재시작 권장 (`pkill -f "next dev" && rm -rf .next && npm run dev`)
- 토큰 한도로 인수인계 — 실제 구현은 새 세션에서 ralph-loop 으로 진행

---

## 2. 대표님 발화 (직접 인용)

> "와 이거 합류하기랑 문서보기도 되게 그럴듯하게 만들면 대박이겠다 문서 정말 복잡하고 그럴듯하게 하자 개발문서부터 시작해 빡세게해 여러 /context7 를 참고해서 gpt 나 클로드 나 제미나이 api 문서들 참고해서 보통 어떤지 알아보고 시작해 그다음 합류하기도 정말 그럴듯하게 해 위치는 강남으로 어딘가 실제 있을법한곳으로 잡아"

**핵심**:
- Docs **정말 복잡하고 그럴듯하게** — "개발문서부터 시작해 빡세게"
- context7 으로 **OpenAI / Anthropic / Google Gemini** API 문서 참고
- Careers **위치 강남 + 실제 있을법한 주소**

---

## 3. context7 조사 결과 (이미 수행 — OpenAI + Anthropic SDK)

### 3-1. OpenAI API Reference 패턴 (`/websites/developers_openai_api_reference`)

각 엔드포인트 페이지 표준 구조:
- **POST /v1/{endpoint}** (top heading)
- **Description** (1~2 단락)
- **Method** (`POST`)
- **Endpoint** (`/v1/chat/completions`)
- **Parameters** 섹션
  - **Path / Query / Headers** (있을 때)
  - **Request Body** — bullet list 형태:
    - `field_name` (type) - Required/Optional - Description
    - 중첩 객체는 indent
- **Request Example** (JSON code block)
- **Response** 섹션
  - **Success Response (200)** — bullet list
  - **Response Example** (JSON code block)
- **Error codes** 표 (400/401/403/429/500)

핵심 패턴: 모든 필드가 `(type) - Required - Description` 라인. 표/리스트 혼용 X, 일관된 indented bullet.

### 3-2. Anthropic Messages API 패턴 (`/anthropics/anthropic-sdk-typescript`)

추가로 차용할 패턴:
- SDK 코드 예제 **언어 탭** (TypeScript / Python / cURL / Go) — Anthropic 공식 docs 가 매우 강조
- **Streaming** 별도 페이지 — SSE event 종류 (`content_block_delta`, `message_stop`, etc.)
- **Tool use** 별도 페이지 — schema + 응답 형식
- **Vision** 별도 페이지 — base64 vs URL
- **MCP integration** (최신 트렌드 — Nexora 도 이거 차용 가능)
- **Beta features** 섹션 — `anthropic-beta: mcp-client-2025-04-04` 같은 헤더 패턴

### 3-3. Google Gemini (미조사 — 새 세션에서 보완 가능, 필수 아님)

다음 라이브러리 ID 추천:
- `/google-gemini/cookbook` (cookbook 패턴)
- `/googleapis/googleapis` (proto 정의)

Gemini 특유 패턴 차용 후보:
- "Get started in 5 minutes" prominent quickstart card
- Pricing 페이지의 토큰당 비용 + caching discount 표기 방식
- Multimodal capabilities 강조

### 3-4. 종합 — Nexora Docs 가 차용할 구조

```
/docs (Quickstart hero + 4 path cards)
  - Quickstart (5 분 안에 첫 API 호출)
  - Messages API (request/response 스키마 + cURL/TS/Python 탭)
  - Streaming (SSE event 종류 + 코드 예제)
  - Authentication & API keys
  - Rate limits (티어별 표)
  - Models (Nexora-1 / Pro / Ultra / K — 가격·context·latency 비교 표)
  - Errors (400/401/403/429/500 코드 + 풍자 메시지)
  - SDKs (Python / TypeScript / Go quickstart + install 명령)
  - Tool use (병렬 32 호출 + JSON schema)
  - Vision (4096×4096 이미지 + URL/base64)
  - Long context (3M tokens 가이드)
  - Agent workflows (Multi-Agent 호출 예시)
  - Changelog (분기별 — Roadmap 과 연동)
```

---

## 4. 권장 페이지 구조

### 4-1. `/docs` — 개발 문서 (메인)

**라우트**: `app/[locale]/(routes)/docs/page.tsx` + 옵션으로 sub-route 가능
**디자인 패턴**: 좌측 sidebar nav + 우측 콘텐츠 (Anthropic / OpenAI / Vercel docs 톤)

**MVP 구성** (단일 페이지로 시작, sub-route 는 나중에):
1. **Hero** — "Nexora-1 Developer Documentation" + tagline + Quickstart CTA
2. **Quickstart card** — 5 분 안에 첫 호출 (cURL + TypeScript + Python 탭)
3. **API Reference 섹션** (가장 빡세게)
   - POST `/v1/messages` 엔드포인트 (Anthropic Messages API 풍자 mirror)
   - Request body 스키마 (model / max_tokens / messages / system / tools / stream / temperature / top_p / metadata)
   - Response 스키마 (id / object / model / content / stop_reason / usage)
   - cURL / TypeScript / Python 코드 예제 탭 컴포넌트
4. **Streaming** 섹션 — SSE event 종류 (`content_block_delta`, `message_delta`, `message_stop`) + 코드 예제
5. **Models** 표 — Nexora-1 / Pro / Ultra / K — context window (3M) / output (64K) / 가격 ($1.20/$3.50/?/$0.40 per 1M) / latency
6. **Rate limits** 표 — Free 5 RPM / Production 1K RPM / Pro 10K RPM
7. **Error codes** — 400 (Validation) / 401 (Auth) / 403 (Forbidden) / 429 (Rate limit) / 500 (Server) — 각 풍자 메시지
8. **Tool use** 섹션 — schema 정의 + 32 병렬 호출 예제
9. **Authentication** — `Authorization: Bearer ...` 헤더 패턴
10. **Footer** — "Built with the official Nexora Receipts mode (fictional)" 류 dry humor

**풍자 코드 박을 곳**:
- Error 메시지 — `"the model is having a thoughtful moment / 모델이 사색 중입니다"` 같은 위트
- Pricing footnote — "All prices verified by our fictional finance team / 가공 재무팀 검증"
- Quickstart 마지막 "If this returned 200, congratulations — you have just queried a model that may or may not exist."

### 4-2. `/careers` — 합류하기

**라우트**: `app/[locale]/(routes)/careers/page.tsx`

**구성**:
1. **Hero** — "Join us in Seoul" + mission tagline
2. **Why Nexora** — 3~4 가치 카드 (Frontier research · Korean-first · Small team big leverage · Constitutional safety)
3. **Open roles** — 6~10 가공 포지션 카드 (Research Engineer / ML Infra / Frontend / Safety Researcher / DevRel / Product · Korean·English 이중 게시)
4. **Office** — 강남 실제 있을법한 주소 + 지도 placeholder + 사진 placeholder
5. **Benefits** — 4~6 카드 (Stock options / Apple equipment / Learning budget / Korea/global flex / Childcare)
6. **Hiring process** — 5 단계 timeline (Application → Recruiter call → Technical → On-site → Offer)
7. **Final CTA** — "Apply" + "Refer someone" + recruiting@nexora.ai

**강남 주소 후보** (실제 있을법 + 가공 — 한국 주소 표기 패턴 따름):
- "서울특별시 강남구 테헤란로 521, 파르나스타워 35F"
- "서울특별시 강남구 영동대로 511, 트레이드타워 28F"
- "서울특별시 강남구 봉은사로 524, 코엑스 32F"
- "서울특별시 강남구 강남대로 396, 강남빌딩 17F"

각각 실제 빌딩명이지만 실제 입주 여부는 임의 (확인 후 사용 — 만약 실존 회사가 입주 중이라면 다른 빌딩 선택). 권장: **테헤란로 521 파르나스타워** (랜드마크 + 실제 가능한 톤). 또는 의도적으로 가공한 빌딩명 (예: "강남구 테헤란로 521 Nexora Tower 32F") 도 안전한 옵션.

**풍자 코드 박을 곳**:
- Benefits 마지막에 "Unlimited PTO (we'll know if you take it)" / "무제한 휴가 (다 알고 있어요)"
- Hiring process "Final on-site: 4 hours of conversation, 1 hour of awkward small talk, free lunch"
- Office 사진 caption "Actual photo. Probably."

---

## 5. 대표님 결정 필요 사항 (새 세션 시작 전)

| # | 결정 항목 | 옵션 | 권장 |
|---|----------|------|------|
| 1 | 페이지 cap 8 로 확장 (CLAUDE.md §7) | 6 → 8 | **8 확장** — Phase 8 의 핵심 전제 |
| 2 | Docs sidebar nav 형태 | (A) 단일 long page + section anchor / (B) sub-route 다층 | **A 단일 페이지** — 빌드 단순, 풍자 사이트로서 깊이는 콘텐츠 양으로 표현. sub-route 는 launch 후 보완 |
| 3 | 강남 주소 | 위 4 후보 중 1 | **테헤란로 521 파르나스타워 35F** — 단 실존 입주사 확인 필요. 안전선택은 "Nexora Tower" 같은 가공 빌딩명 |
| 4 | 가짜 API 도메인 | (A) `api.nexora.ai` / (B) docs 안 cURL 예제만 보여주고 실제 작동 X 명시 | **A** — 이미 `app/api/embed/route.ts` 가 있는 도메인이고 풍자 일관성 |
| 5 | SDK 패키지명 | (A) `@nexora/sdk` / (B) `nexora` / (C) `nexora-ai` | **A `@nexora/sdk`** — Anthropic `@anthropic-ai/sdk` 패턴 따름 |
| 6 | 회사 헤드카운트 | About 페이지에 "60명" 명시되어 있음 | 그대로 60명 유지 + Careers 의 "We're a team of 60 building..." 라인 |
| 7 | Nexora-1 Ultra 가격 | 현재 미정 (Pro $3.50, Ultra 는 가격 명시 X) | **Ultra $10/1M tokens** — Claude Opus / GPT-5 톤 |

---

## 6. Plan 보강 가이드 (새 세션 ralph 첫 iter 가이드)

### 6-1. `CLAUDE.md` 갱신

§7 의 페이지 cap 한 줄:
```
| 페이지 수 | **6개** (Home / Benchmarks / Capabilities / Architecture / Security / About). 추가 증식 금지 |
```
→ 다음과 같이 갱신:
```
| 페이지 수 | **8개** (Home / Benchmarks / Capabilities / Architecture / Security / About / Docs / Careers). 추가 증식 금지 |
```

### 6-2. `IMPLEMENTATION_PLAN.md` — Phase 8 sub-task 추가

마지막 Phase 7 `[x]` 다음에 추가:

```markdown
### Phase 8 — Docs & Careers 페이지 신규 (대표님 추가 요구사항, 2026-05-18)

> 대표님 발화: "합류하기랑 문서보기도 되게 그럴듯하게... 문서 정말 복잡하고 그럴듯하게... 빡세게... 강남으로 어딘가 실제 있을법한곳으로".
> 자세한 사양·결정사항·구조 권장·context7 조사 결과는 **`HANDOFF-docs-careers.md`** 참조.
> 페이지 cap 6 → 8 로 확장 (CLAUDE.md §7).

- [ ] 8.1 — `CLAUDE.md` §7 페이지 cap 8 갱신 + Plan 미세조정 (HANDOFF §5 의 결정사항 7 항목 확정 반영)
- [ ] 8.2 — `/docs` 라우트 셋업 (`app/[locale]/(routes)/docs/page.tsx`) + nav 에 "Docs" 추가 + 기본 hero + sidebar layout
- [ ] 8.3 — Docs Quickstart 섹션 — cURL/TypeScript/Python 탭 컴포넌트 + 첫 호출 예제
- [ ] 8.4 — Docs API Reference 섹션 — POST /v1/messages 전체 스키마 (Anthropic Messages API mirror, Request body + Response + Error codes 표)
- [ ] 8.5 — Docs Streaming + Tool use 섹션 — SSE event 종류 + 32 병렬 tool call 예제
- [ ] 8.6 — Docs Models + Rate limits + Authentication 표 (4 모델 비교 표, 4 티어 RPM 표, Bearer token 패턴)
- [ ] 8.7 — Docs Errors + 풍자 코드 분산 + Korean/English bilingual examples (5 error code + dry humor)
- [ ] 8.8 — `/careers` 라우트 셋업 + Hero + Why Nexora + Open roles 6~10 카드
- [ ] 8.9 — Careers Office (강남 주소 + 지도 placeholder) + Benefits + Hiring process timeline + Final CTA
- [ ] 8.10 — site-nav 의 6 → 8 라우트 확장 (mobile menu 도) + footer 의 nav mirror 갱신 + FinalCTA 의 "Read docs"/"Join us" link 가 새 라우트 가리키도록
- [ ] 8.11 — sitemap.ts locale 별 URL 양산 (`/en/docs` `/ko/docs` `/en/careers` `/ko/careers`) + 각 페이지 `opengraph-image.tsx` (locale 별 분기) + generateMetadata
- [ ] 8.12 — 풍자 톤 한·영 양방향 점검 + messages 키 parity + lint/typecheck/build 모두 exit 0 → `<promise>PROJECT_DONE</promise>`
```

### 6-3. 새 컴포넌트 후보 (`components/sections/docs/...`)

- `components/sections/docs/quickstart.tsx`
- `components/sections/docs/api-reference.tsx`
- `components/sections/docs/code-tabs.tsx` (cURL / TS / Python 탭 — `Tabs` 컴포넌트 신규)
- `components/sections/docs/error-codes.tsx`
- `components/sections/docs/models-table.tsx`
- `components/sections/docs/rate-limits-table.tsx`
- `components/sections/docs/sidebar.tsx` (단일 페이지 anchor sidebar)
- `components/sections/careers/hero.tsx`
- `components/sections/careers/why-nexora.tsx`
- `components/sections/careers/open-roles.tsx`
- `components/sections/careers/office.tsx`
- `components/sections/careers/benefits.tsx`
- `components/sections/careers/hiring-process.tsx`

총 ~13 신규 컴포넌트. 각자 한·영 messages 키 분리.

### 6-4. 새 messages 키 트리

```
home.* (기존)
nav.docs / nav.careers (신규 nav 라벨)
footer.groups.* (기존 — research 그룹 안에 docs link 추가 검토)
docs.{hero,quickstart,apiRef,streaming,toolUse,models,rateLimits,authentication,errors,sdks}
careers.{hero,whyNexora,openRoles.roles.[id]*10,office,benefits.[id]*6,hiringProcess.steps.[id]*5,finalCta}
```

예상 신규 messages 키 ~200 개 (현재 388 → 약 580). en/ko parity 유지 필수.

### 6-5. SOTA 수치 일관성 (이미 반영된 값 활용)

Docs 페이지 작성 시 다음 수치 인용 (이미 commit 됨):
- Context window: **3M tokens** (input) / **64K tokens** (output)
- Models: Nexora-1 ($1.20/1M) / Nexora-1 Pro ($3.50/1M) / Nexora-1 Ultra ($10/1M — 결정 7번) / Nexora-K ($0.40/1M)
- Parallel tool calls: **32**
- Generation rate: **350 tok/s** median
- TTFT: 380ms (Nexora-1) / 220ms (Nexora-K)
- Image: 4096×4096 / Audio: 12 hr / Video: 180 min
- HumanEval 94.1% / SWE-Bench 82.4% / MMLU 92.4% / MATH 85.4% / GSM8K 95.7%
- Rate limits: Free 5 RPM / Production 1,000 RPM / Pro 10,000 RPM
- Languages: 80+
- Region: ap-northeast-2 (Seoul) 주, us-east-1 / eu-west-1 / ap-southeast-1 보조

### 6-6. 풍자 톤 보존 mandate (HANDOFF-i18n.md §6 패턴 유지)

- Error code 메시지 dry humor (한·영 둘 다)
- Quickstart 끝 "If you got 200, congratulations / 200 받으셨다면 축하합니다 — 가공 모델 응답입니다" 라인
- Careers benefits dry humor ("무제한 휴가 — 다 알고 있어요")
- Office caption ("Actual photo. Probably. / 실제 사진. 아마도.")
- API model `claude-sonnet-4-5-20250929` 같은 SOTA 식별자 mirror 풍자 — `nexora-1-2026-05` 식

---

## 7. CLAUDE.md §5 (금지 항목) 재확인

Docs / Careers 페이지 작성 시:
1. **실존 회사 API mirror** — OpenAI/Anthropic/Google docs 구조·톤만 차용, 그대로 복붙 X. 엔드포인트 URL 도 `api.nexora.ai` 만.
2. **실존 인물·기자·매체** — Careers 의 팀 멤버는 About 페이지 가공 인물 (Jiwon Park CEO 등) 만 인용. Press 섹션 같이 가공 매체 외 추가 매체 X.
3. **실존 한국 기업 주소 모사** — 강남 주소가 실제 빌딩명 사용 시 입주사 확인 필요. 안전선택은 가공 빌딩명 ("Nexora Tower"). 권장: 가공 빌딩명 + 실제 도로명 (예: "서울특별시 강남구 테헤란로 521, Nexora Tower 35F").
4. **결제·구독 페이지 금지** — Docs 의 pricing 표는 정보 표기 OK, 결제 CTA 또는 카드 입력 폼 X. "Contact sales" 라우팅 만.
5. **실존 인증** — Authentication 페이지에 "ISO 27001 certified" 류 실존 인증명 직접 언급 금지. 일반 표현 ("regulatory frameworks compliant") 사용.

---

## 8. 새 세션 시작 가이드

### 8-1. 사전 작업 (대표님 명시 결정 필요)

대표님이 §5 의 7 결정 항목 중 다음만 명시:
- 결정 1 (페이지 cap 8 확장): **확정** — "랄프 시작" 발화 = 진행 의도
- 결정 3 (강남 주소): "실제 있을법한곳으로" — **권장: 가공 빌딩명 + 실제 도로명** (legal safe)
- 그 외 결정 (2/4/5/6/7): ralph 가 첫 iter 의 plan 보강 (8.1) 에서 권장안 자체 채택. 대표님이 commit 보고 후 부적절하면 알려주실 것.

### 8-2. 새 세션 첫 명령

새 Claude 세션 열고:

```
@HANDOFF-docs-careers.md 를 읽고 진행해줘
```

또는 바로 ralph-loop 시작:

```
/ralph-loop:ralph-loop "Read PROMPT.md and follow it." --completion-promise "PROJECT_DONE" --max-iterations 30
```

ralph 가 첫 iter 에서 `IMPLEMENTATION_PLAN.md` 의 첫 `[ ]` (= 8.1) 픽업하고 자율 진행.

### 8-3. context7 추가 조사 (선택)

새 세션이 시간 여유 있으면 Google Gemini docs 도 조사 권장:

```
mcp__plugin_context7_context7__resolve-library-id(libraryName="Google Gemini API")
mcp__plugin_context7_context7__query-docs(libraryId="...", query="...")
```

이미 OpenAI + Anthropic 패턴은 충분히 조사됨 (위 §3-1, §3-2). Gemini 는 옵션.

### 8-4. 완료 기준 (PROJECT_DONE 자격)

- `/en/docs` `/ko/docs` 단일 페이지로 12+ 섹션 prerender 통과
- `/en/careers` `/ko/careers` 단일 페이지로 7 섹션 prerender 통과
- 강남 주소 명시
- API Reference 가 진짜 API 처럼 보임 (OpenAI/Anthropic 톤)
- 풍자 코드 양 locale 모두 분산 (최소 5곳)
- messages parity zero asymmetry
- lint / typecheck / build exit 0
- sitemap 에 `/en/docs` `/ko/docs` `/en/careers` `/ko/careers` 추가
- OG image locale 분기 새 2 페이지
- nav / footer 의 8 라우트 모두 반영

---

## 9. 참고 — 진행 중 commit 들

```
76abe43 feat(spec): 2026.5 SOTA 점검 — 12 항목 일괄 상향  ← 최신
cfa2946 feat(spec): context 200K → 3M + H100 5K → 100K (SOTA 능가)
c036234 fix(home): BigNumbers MISSING_MESSAGE — items 모두에 unit 명시
bfc716f chore(plan): 7.10 — Phase 7 최종 검증, PROJECT_DONE
1229bd1 feat(home): 7.9 — FinalCTA 섹션 (3-CTA: demo · docs · careers)
cb4e7cf feat(home): 7.8 — Roadmap 섹션 (6 milestone, status chip)
26eb155 feat(home): 7.7 — Press 섹션 (가공 매체 4 인용)
75071cf feat(home): 7.6 — UseCases gallery (6 가공 use case 카드)
d480822 feat(home): 7.5 — BenchmarkTeaser (BenchmarkBarChart 재활용)
1901add feat(home): 7.4 — ArchitectureTeaser (4 layer mini pipeline)
6fa4611 feat(home): 7.3 — ModelIntro 섹션 ("Meet Nexora-1")
485fbf3 feat(home): 7.2 — BigNumbers band (10경 파라미터 + 3 KPI)
```

전체 history: `git log --oneline`.

---

## 10. 한 줄 요약

> **Phase 7 Home 12 섹션 완료 + SOTA 12 항목 일괄 상향까지 끝났고, Phase 8 = Docs + Careers 2 신규 페이지 추가. context7 으로 OpenAI / Anthropic 패턴 조사 끝났고 (§3-1, §3-2), 강남 주소는 가공 빌딩명 + 실제 도로명 권장. 새 세션이 받아서 ralph-loop 으로 자율 진행.**
