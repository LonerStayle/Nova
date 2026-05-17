/**
 * /api/embed — Voyage API 키 프록시 (POST).
 *
 * 이 함수는 CLAUDE.md §8 의 "백엔드 = 정확히 키 보호 프록시 1함수" 그 함수다.
 * 외부 노출 없이 server-only env (VOYAGE_API_KEY) 로 Voyage REST API 호출,
 * embedding 만 반환. 클라이언트 hybrid retrieval 의 쿼리 측 임베딩 전용.
 *
 * Request:
 *   POST /api/embed
 *   Content-Type: application/json
 *   { "input": "user query string" }
 *
 * Response (200):
 *   { "model": "voyage-4", "dim": 1024, "embedding": [...], "usage": <int|null> }
 *
 * 에러:
 *   400 — invalid body / input length out of range
 *   429 — rate limit exceeded
 *   500 — server not configured (key missing)
 *   502 — upstream Voyage API failure
 */

import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const VOYAGE_API_URL = "https://api.voyageai.com/v1/embeddings";
const MODEL = "voyage-4";
const MAX_INPUT_CHARS = 2000;

// --- 가벼운 in-memory rate limit (per IP, sliding 1-min window) ---
// Vercel Edge 에서 region-local 인스턴스간 격리됨 — 글로벌 rate limit 이 아니라 *가벼운 보호*.
// 본격적인 운영 단계엔 Vercel KV / Redis 같은 외부 store 로 교체 권장.
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT_PER_IP = 10;

const ipRequestLog = new Map<string, number[]>();

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const log = ipRequestLog.get(ip) ?? [];
  const recent = log.filter((t) => t > windowStart);

  if (recent.length >= RATE_LIMIT_PER_IP) {
    ipRequestLog.set(ip, recent);
    return false;
  }

  recent.push(now);
  ipRequestLog.set(ip, recent);
  return true;
}

// --- 핸들러 ---

export async function POST(req: NextRequest): Promise<NextResponse> {
  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json(
      { error: "Server is not configured (VOYAGE_API_KEY missing)." },
      { status: 500 },
    );
  }

  const ip = clientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please retry shortly." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const input = (body as { input?: unknown })?.input;
  if (typeof input !== "string") {
    return NextResponse.json(
      { error: "Body must include `input` as a string." },
      { status: 400 },
    );
  }
  if (input.length === 0 || input.length > MAX_INPUT_CHARS) {
    return NextResponse.json(
      {
        error: `Input length must be between 1 and ${MAX_INPUT_CHARS} characters.`,
      },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(VOYAGE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: [input],
        model: MODEL,
      }),
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to reach upstream embedding API.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    return NextResponse.json(
      {
        error: "Upstream embedding API error.",
        upstream: upstream.status,
        detail: errText.slice(0, 300),
      },
      { status: 502 },
    );
  }

  const json = (await upstream.json().catch(() => null)) as {
    data?: { embedding?: number[] }[];
    usage?: { total_tokens?: number };
  } | null;

  const embedding = json?.data?.[0]?.embedding;
  if (!Array.isArray(embedding) || embedding.length === 0) {
    return NextResponse.json(
      { error: "Upstream returned an empty embedding." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    model: MODEL,
    dim: embedding.length,
    embedding,
    usage: json?.usage?.total_tokens ?? null,
  });
}
