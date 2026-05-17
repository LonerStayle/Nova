import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const handleI18nRouting = createIntlMiddleware(routing);

/**
 * locale 자동 감지 우선순위 (높을수록 우선):
 *   1. `NEXT_LOCALE` cookie  — 사용자가 LocaleToggle 로 명시 선택한 경우
 *   2. Geo IP country         — Vercel `x-vercel-ip-country` 또는 Cloudflare `cf-ipcountry`
 *                                "KR" 이면 ko, 그 외는 영어 (한국 IP 면 한국어, 외국 IP 면 영어)
 *   3. `Accept-Language` 헤더 — `ko*` 시작이면 ko, 그 외 en (브라우저 설정 fallback)
 *   4. `routing.defaultLocale` — 위 모두 없으면 영어
 *
 * 구현 방식:
 *   - cookie 가 있으면 next-intl 가 알아서 사용 → 우리는 손대지 않는다
 *   - country 가 KR 이면 Accept-Language 헤더를 ko 로 prefix 하여 next-intl detection 을 속인다
 *   - 그 외는 원래 Accept-Language 가 next-intl 에 그대로 흘러간다
 *
 * 결과: 한국 IP 방문자는 첫 진입에 자동으로 /ko 로 redirect, 그 외는 /en.
 *       사용자가 KR/EN 토글로 cookie 를 셋팅하면 이후 항상 cookie 가 우선.
 */
export default function middleware(request: NextRequest): NextResponse {
  const cookie = request.cookies.get("NEXT_LOCALE");

  // cookie 있으면 변조 불필요 — next-intl 이 알아서 처리
  if (cookie) {
    return handleI18nRouting(request);
  }

  // country 헤더 — Vercel / Cloudflare 양쪽 fallback
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  if (country.toUpperCase() === "KR") {
    // 한국 IP — Accept-Language 헤더를 ko 로 prefix 하여 next-intl detection 이 ko 를 고르게 유도
    const headers = new Headers(request.headers);
    const original = headers.get("accept-language") || "";
    headers.set("accept-language", `ko,${original}`);

    const modified = new NextRequest(request, {
      headers,
    });
    return handleI18nRouting(modified);
  }

  // 그 외 — 브라우저 Accept-Language 가 ko* 면 ko, 아니면 en (next-intl 기본 동작)
  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
