#!/usr/bin/env node
/**
 * scripts/precompute-embeddings.mjs
 *
 * 빌드타임에 1회 실행 — qa.json 의 200 questions 를 Voyage `voyage-4` 로 임베딩 후
 * public/data/embeddings.json 으로 저장. 클라이언트 hybrid retrieval (Phase 3) 에서 정적 fetch.
 *
 * 실행:    npm run precompute:embeddings
 * 사전조건: .env.local 에 VOYAGE_API_KEY 설정
 *
 * 비용:   200 entries × 평균 ~15 tokens = ~3,000 tokens / 실행 — Voyage 200M 평생 무료 한도 안.
 *
 * 구현 노트:
 *   voyageai npm SDK 는 ESM dir-import 이슈 (ERR_UNSUPPORTED_DIR_IMPORT) 가 있어
 *   Node 22 내장 fetch 로 Voyage REST API (POST /v1/embeddings) 를 직접 호출한다.
 *   의존성 0, ESM/CJS 호환 문제 없음.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const QA_PATH = path.join(ROOT, "public", "data", "qa.json");
const OUT_PATH = path.join(ROOT, "public", "data", "embeddings.json");

const API_URL = "https://api.voyageai.com/v1/embeddings";
const MODEL = "voyage-4";
const BATCH_SIZE = 128;

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

async function embedBatch(apiKey, inputs) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: inputs,
      model: MODEL,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(
      `Voyage API ${response.status} ${response.statusText}: ${errText.slice(0, 400)}`,
    );
  }

  return await response.json();
}

async function main() {
  // 1) API key 체크
  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    console.error("❌ VOYAGE_API_KEY is not set.");
    console.error("   Setup:");
    console.error("     cp .env.example .env.local");
    console.error("     # then edit .env.local and fill in VOYAGE_API_KEY");
    console.error("   Get a free key at https://dash.voyageai.com");
    process.exit(1);
  }

  // 2) qa.json 로드
  let entries;
  try {
    const raw = await fs.readFile(QA_PATH, "utf-8");
    entries = JSON.parse(raw);
  } catch (err) {
    fail(`failed to load ${QA_PATH}: ${err.message}`);
  }
  if (!Array.isArray(entries) || entries.length === 0) {
    fail(`qa.json is empty or not an array`);
  }
  console.log(
    `📦 Loaded ${entries.length} QA entries from ${path.relative(ROOT, QA_PATH)}`,
  );

  // 3) 배치 임베딩
  console.log(`🚀 Embedding with ${MODEL} in batches of ${BATCH_SIZE}...`);

  const out = [];
  let totalTokens = 0;
  const batchCount = Math.ceil(entries.length / BATCH_SIZE);

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    const inputs = batch.map((e) => {
      if (typeof e.question !== "string" || e.question.length === 0) {
        fail(`entry ${e.id} has empty/invalid question`);
      }
      return e.question;
    });
    const batchIndex = i / BATCH_SIZE + 1;

    console.log(
      `  → batch ${batchIndex}/${batchCount}: ${inputs.length} questions`,
    );

    let response;
    try {
      response = await embedBatch(apiKey, inputs);
    } catch (err) {
      fail(`Voyage API call failed (batch ${batchIndex}): ${err.message}`);
    }

    const data = response?.data;
    if (!Array.isArray(data) || data.length !== batch.length) {
      fail(
        `Voyage response shape mismatch — expected ${batch.length} embeddings, got ${data?.length}`,
      );
    }

    // 인덱스 필드가 있으면 정렬 (대부분의 OpenAI-compatible API 가 index 보존)
    const sortedData = [...data].sort(
      (a, b) => (a.index ?? 0) - (b.index ?? 0),
    );

    for (let j = 0; j < batch.length; j++) {
      const embedding = sortedData[j].embedding;
      if (!Array.isArray(embedding) || embedding.length === 0) {
        fail(`empty embedding for entry ${batch[j].id}`);
      }
      out.push({ id: batch[j].id, embedding });
    }

    const tokens =
      response?.usage?.total_tokens ?? response?.usage?.totalTokens ?? 0;
    totalTokens += tokens;
  }

  if (out.length !== entries.length) {
    fail(`final count mismatch: ${out.length} vs ${entries.length}`);
  }

  // 4) embeddings.json 저장
  const dim = out[0].embedding.length;
  const payload = {
    model: MODEL,
    dim,
    count: out.length,
    generatedAt: new Date().toISOString(),
    embeddings: out,
  };

  await fs.writeFile(OUT_PATH, JSON.stringify(payload));
  const stat = await fs.stat(OUT_PATH);

  console.log(
    `✓ Generated ${out.length} embeddings, dim=${dim}, ~${totalTokens} tokens billed`,
  );
  console.log(
    `✓ Wrote ${path.relative(ROOT, OUT_PATH)} (${(stat.size / 1024).toFixed(1)} KB)`,
  );
}

main().catch((err) => {
  console.error(
    "❌ precompute-embeddings failed:",
    err.stack ?? err.message ?? err,
  );
  process.exit(1);
});
