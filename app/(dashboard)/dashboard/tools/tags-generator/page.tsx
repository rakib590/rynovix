"use client";

import { useState } from "react";

import {
  Wand2,
  Copy,
  RefreshCcw,
  Sparkles,
  Heart,
} from "lucide-react";

import ToolLayout from "@/components/ai-tools/ToolLayout";

type TagResult = {
  tags: string;
  score: number;
  ctr: number;
  seo: number;
  trending: number;
  viral: number;
  favorite: boolean;
};

export default function TagGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");

  const [language, setLanguage] =
    useState("🌐 Auto Detect");

  const [tone, setTone] =
    useState("Professional");

  const [length, setLength] =
    useState("Medium");

  const [loading, setLoading] =
    useState(false);

  const [regeneratingIndex, setRegeneratingIndex] =
    useState<number | null>(null);

  const [error, setError] = useState("");

  const [audience, setAudience] =
    useState("Everyone");

  const [category, setCategory] =
    useState("Education");

  const [tagCount, setTagCount] =
    useState(20);

  const [creativity, setCreativity] =
    useState(70);

  const [results, setResults] =
    useState<TagResult[]>([]);

  const [copiedIndex, setCopiedIndex] =
    useState<number | null>(null);

  const [copiedAll, setCopiedAll] =
    useState(false);

  // =========================================================
  // Helper
  // =========================================================

  function sanitizeNumber(
    value: unknown,
    min: number,
    max: number
  ) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return min;
    }

    return Math.min(
      max,
      Math.max(min, number)
    );
  }

  function cleanTagString(value: string) {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) =>
        tag.replace(/^#+/, "")
      )
      .filter(Boolean)
      .join(", ");
  }

  // =========================================================
  // Regenerate One Tag Set
  // =========================================================

  async function regenerateTag(index: number) {
    const currentResult = results[index];

    if (!currentResult) {
      return;
    }

    setRegeneratingIndex(index);
    setError("");

    try {
      const autoDetectInstruction =
        language === "🌐 Auto Detect"
          ? "Automatically detect the language from the Video Topic and generate YouTube tags in the same language."
          : `Generate tags in ${language}.`;

      const response = await fetch("/api/ai", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          json: true,

          prompt: `
You are an expert YouTube SEO specialist, keyword strategist, and YouTube search optimization expert.

Create ONE improved YouTube tag set.

Video Topic:
${topic}

Keywords:
${keywords || "None"}

Language:
${language}

Language Instruction:
${autoDetectInstruction}

Tone:
${tone}

Length:
${length}

Audience:
${audience}

Category:
${category}

Tags Per Set:
${tagCount}

Creativity:
${creativity}%

Current Tag Set:
${currentResult.tags}

TAG REQUIREMENTS:

- Generate exactly ${tagCount} YouTube tags.
- Tags must be comma separated.
- Do NOT use hashtags.
- Do NOT start tags with #.
- Do NOT number the tags.
- Do NOT add explanations.
- Do NOT return markdown.
- Every tag must be unique.
- Keep every tag highly relevant to the video topic.
- Mix broad, niche, specific, long-tail, and search-intent keywords.
- Naturally include the provided keywords when relevant.
- Optimize the tag set for YouTube search discoverability.
- Follow the requested language.
- Follow the requested audience.
- Follow the requested category.
- Respect the requested creativity level.
- Avoid irrelevant keywords.
- Avoid keyword stuffing.
- Do not make misleading claims.
- Improve the current tag set instead of simply copying it.

SCORING REQUIREMENTS:

score:
Estimated overall tag quality from 0 to 100.

Consider:
- Relevance
- Keyword quality
- Topic coverage
- Search discoverability
- Variety
- Audience relevance
- Overall SEO quality

ctr:
Estimated CTR potential from 0.0 to 10.0.

IMPORTANT:
This is an AI estimate, NOT actual YouTube Analytics CTR.

Consider:
- Topic relevance
- Search intent
- Audience appeal
- Discoverability

seo:
Estimated SEO optimization score from 0 to 100.

Consider:
- Keyword relevance
- Search intent
- Topic coverage
- Search-friendly tags
- Natural keyword usage

trending:
Estimated trend potential from 0 to 100.

IMPORTANT:
This is an AI estimate based on topic relevance and general trend potential. It is NOT real-time platform trend data.

Consider:
- Topic relevance
- Popularity potential
- Broad audience interest
- Timeliness

viral:
Estimated viral potential from 0 to 100.

IMPORTANT:
This is an AI estimate, NOT a guarantee of virality.

Consider:
- Broad appeal
- Shareability
- Curiosity
- Audience reach
- Potential interest

IMPORTANT:

Do NOT generate random scores.

The scores must reflect the actual quality of the generated tag set.

Return ONLY valid JSON.

Return exactly this JSON structure:

{
  "tags": "youtube seo, youtube growth, ai tools",
  "score": 94,
  "ctr": 8.7,
  "seo": 96,
  "trending": 91,
  "viral": 89
}

Rules:

- tags must contain exactly ${tagCount} tags.
- tags must be comma separated.
- tags must not contain #.
- score must be a number between 0 and 100.
- ctr must be a number between 0 and 10.
- seo must be a number between 0 and 100.
- trending must be a number between 0 and 100.
- viral must be a number between 0 and 100.
- Return valid JSON only.
          `,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "AI request failed."
        );
      }

      let parsed;

      try {
        parsed =
          typeof data.result === "string"
            ? JSON.parse(data.result)
            : data.result;
      } catch {
        throw new Error(
          "AI returned invalid JSON. Please try again."
        );
      }

      if (
        !parsed ||
        typeof parsed.tags !== "string" ||
        !parsed.tags.trim()
      ) {
        throw new Error(
          "AI returned an invalid tag set."
        );
      }

      const cleanTags =
        cleanTagString(parsed.tags);

      if (!cleanTags) {
        throw new Error(
          "No valid tags were generated."
        );
      }

      const updatedResult: TagResult = {
        tags: cleanTags,

        score: Math.round(
          sanitizeNumber(
            parsed.score,
            0,
            100
          )
        ),

        ctr: Number(
          sanitizeNumber(
            parsed.ctr,
            0,
            10
          ).toFixed(1)
        ),

        seo: Math.round(
          sanitizeNumber(
            parsed.seo,
            0,
            100
          )
        ),

        trending: Math.round(
          sanitizeNumber(
            parsed.trending,
            0,
            100
          )
        ),

        viral: Math.round(
          sanitizeNumber(
            parsed.viral,
            0,
            100
          )
        ),

        favorite:
          currentResult.favorite,
      };

      setResults((prev) =>
        prev.map((item, i) =>
          i === index
            ? updatedResult
            : item
        )
      );
    } catch (error: any) {
      console.error(
        "Regenerate tags failed:",
        error
      );

      setError(
        error?.message ||
          "Unable to regenerate tags. Please try again."
      );
    } finally {
      setRegeneratingIndex(null);
    }
  }

  // =========================================================
  // Favorite
  // =========================================================

  function toggleFavorite(index: number) {
    setResults((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              favorite: !item.favorite,
            }
          : item
      )
    );
  }

  // =========================================================
  // Copy Tags
  // =========================================================

  async function copyTags(
    tags: string,
    index: number
  ) {
    try {
      await navigator.clipboard.writeText(tags);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy tags failed:",
        error
      );

      setError("Failed to copy tags.");
    }
  }

  // =========================================================
  // Copy All
  // =========================================================

  async function copyAllTags() {
    if (results.length === 0) {
      return;
    }

    try {
      const allTags = results
        .map((item) => item.tags)
        .join("\n\n");

      await navigator.clipboard.writeText(
        allTags
      );

      setCopiedAll(true);

      setTimeout(() => {
        setCopiedAll(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy all tags failed:",
        error
      );

      setError("Failed to copy all tags.");
    }
  }

  // =========================================================
  // Generate Tags
  // =========================================================

  async function generateTags() {
    if (!topic.trim()) {
      setError(
        "Please enter a video topic first."
      );
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const autoDetectInstruction =
        language === "🌐 Auto Detect"
          ? "Automatically detect the language from the Video Topic and generate YouTube tags in the same language."
          : `Generate tags in ${language}.`;

      const response = await fetch("/api/ai", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          json: true,

          prompt: `
You are an expert YouTube SEO specialist, keyword strategist, and YouTube search optimization expert.

Generate 5 high-quality YouTube tag sets.

VIDEO INFORMATION

Video Topic:
${topic}

Keywords:
${keywords || "None"}

Language:
${language}

Language Instruction:
${autoDetectInstruction}

Tone:
${tone}

Length:
${length}

Audience:
${audience}

Category:
${category}

Tags Per Set:
${tagCount}

Creativity:
${creativity}%

Number of Tag Sets:
5

TAG REQUIREMENTS:

- Generate exactly 5 unique tag sets.
- Each tag set MUST contain exactly ${tagCount} YouTube tags.
- Tags MUST be comma separated.
- Do NOT use hashtags.
- Do NOT start tags with #.
- Do NOT number tags.
- Do NOT add explanations.
- Do NOT return markdown.
- Every tag must be unique within each set.
- Make every tag highly relevant to the Video Topic.
- Naturally use the provided Keywords when relevant.
- Mix broad, niche, specific, long-tail, and search-intent tags.
- Optimize every tag set for YouTube SEO.
- Follow the requested language.
- Follow the requested audience.
- Follow the requested category.
- Respect the requested creativity level.
- Avoid irrelevant keywords.
- Avoid keyword stuffing.
- Do not make misleading claims.
- Each tag set should be meaningfully different from the others.
- Do not return any text outside the JSON object.

SCORING REQUIREMENTS:

For every tag set calculate:

1. score

Estimated overall tag quality score from 0 to 100.

Consider:
- Relevance
- Keyword quality
- Topic coverage
- Search discoverability
- Variety
- Audience relevance
- Overall SEO quality

2. ctr

Estimated CTR potential from 0.0 to 10.0.

IMPORTANT:
This is an AI estimate, NOT actual YouTube Analytics CTR.

Consider:
- Topic relevance
- Search intent
- Audience appeal
- Discoverability

3. seo

Estimated SEO optimization score from 0 to 100.

Consider:
- Keyword relevance
- Search intent
- Topic coverage
- Search-friendly tags
- Natural keyword usage

4. trending

Estimated trend potential from 0 to 100.

IMPORTANT:
This is an AI estimate based on topic relevance and general trend potential. It is NOT real-time platform trend data.

Consider:
- Topic relevance
- Popularity potential
- Broad audience interest
- Timeliness

5. viral

Estimated viral potential from 0 to 100.

IMPORTANT:
This is an AI estimate, NOT a guarantee of virality.

Consider:
- Broad appeal
- Shareability
- Curiosity
- Audience reach
- Potential interest

IMPORTANT:

Do NOT give random scores.

Scores must reflect the actual quality of each individual tag set.

A stronger tag set should receive higher scores than a weaker tag set.

Return ONLY this JSON structure:

{
  "results": [
    {
      "tags": "youtube seo, youtube growth, ai tools",
      "score": 94,
      "ctr": 8.7,
      "seo": 96,
      "trending": 91,
      "viral": 89
    }
  ]
}

IMPORTANT RULES:

- The "results" array MUST contain exactly 5 objects.
- Every object must contain tags, score, ctr, seo, trending, and viral.
- Each tags string MUST contain exactly ${tagCount} tags.
- Tags must be comma separated.
- Tags must not contain #.
- score must be a number between 0 and 100.
- ctr must be a number between 0 and 10.
- seo must be a number between 0 and 100.
- trending must be a number between 0 and 100.
- viral must be a number between 0 and 100.
- Return valid JSON only.
          `,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "AI request failed."
        );
      }

      let parsed;

      try {
        parsed =
          typeof data.result === "string"
            ? JSON.parse(data.result)
            : data.result;
      } catch {
        throw new Error(
          "AI returned invalid JSON. Please try again."
        );
      }

      if (
        !parsed ||
        !Array.isArray(parsed.results)
      ) {
        throw new Error(
          "AI returned an invalid tag response."
        );
      }

      const newResults: TagResult[] =
        parsed.results
          .slice(0, 5)
          .filter(
            (item: any) =>
              item &&
              typeof item.tags === "string" &&
              item.tags.trim().length > 0
          )
          .map((item: any) => {
            const cleanTags =
              cleanTagString(item.tags);

            return {
              tags: cleanTags,

              score: Math.round(
                sanitizeNumber(
                  item.score,
                  0,
                  100
                )
              ),

              ctr: Number(
                sanitizeNumber(
                  item.ctr,
                  0,
                  10
                ).toFixed(1)
              ),

              seo: Math.round(
                sanitizeNumber(
                  item.seo,
                  0,
                  100
                )
              ),

              trending: Math.round(
                sanitizeNumber(
                  item.trending,
                  0,
                  100
                )
              ),

              viral: Math.round(
                sanitizeNumber(
                  item.viral,
                  0,
                  100
                )
              ),

              favorite: false,
            };
          })
          .filter(
            (item: TagResult) =>
              item.tags.length > 0
          );

      if (newResults.length === 0) {
        throw new Error(
          "AI returned no valid tag sets."
        );
      }

      setResults(newResults);
    } catch (error: any) {
      console.error(
        "Generate tags failed:",
        error
      );

      setError(
        error?.message ||
          "Unable to generate tags. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <ToolLayout
      title="AI Tags Generator"
      description="Generate high-ranking YouTube tags powered by AI."
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">

        {/* =================================================
            LEFT PANEL
        ================================================= */}

        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          <h2 className="mb-6 text-xl font-bold text-white">
            Generator
          </h2>

          {/* Error */}

          {error && (
            <div className="mb-5 break-words rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-5">

            {/* =================================================
                VIDEO TOPIC
            ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Video Topic
              </label>

              <textarea
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                rows={5}
                placeholder={`Describe your video topic...

Examples:
• YouTube Growth Tips
• AI Video Editing
• Free SEO Tools
• Travel Vlog in Bangladesh`}
                className="min-h-[130px] w-full resize-y rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            {/* =================================================
                KEYWORDS
            ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Keywords
              </label>

              <input
                value={keywords}
                onChange={(e) =>
                  setKeywords(e.target.value)
                }
                placeholder="youtube, shorts, seo, ai"
                className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            {/* =================================================
                LANGUAGE / TONE / LENGTH
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* Language */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Language
                </label>

                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none transition focus:border-blue-500"
                >
                  <option>
                    🌐 Auto Detect
                  </option>
                  <option>English</option>
                  <option>বাংলা</option>
                  <option>हिन्दी</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Arabic</option>
                </select>
              </div>

              {/* Tone */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Tone
                </label>

                <select
                  value={tone}
                  onChange={(e) =>
                    setTone(e.target.value)
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none transition focus:border-blue-500"
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Casual</option>
                  <option>Engaging</option>
                  <option>Viral</option>
                </select>
              </div>

              {/* Length */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Length
                </label>

                <select
                  value={length}
                  onChange={(e) =>
                    setLength(e.target.value)
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none transition focus:border-blue-500"
                >
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Long</option>
                </select>
              </div>

            </div>

            {/* =================================================
                AUDIENCE / CATEGORY
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Audience */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Target Audience
                </label>

                <input
                  value={audience}
                  onChange={(e) =>
                    setAudience(e.target.value)
                  }
                  placeholder="e.g. beginners, creators"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              {/* Category */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
                >
                  <option>General</option>
                  <option>Technology</option>
                  <option>Education</option>
                  <option>Gaming</option>
                  <option>Entertainment</option>
                  <option>Business</option>
                  <option>Lifestyle</option>
                  <option>News</option>
                  <option>How To & Style</option>
                </select>
              </div>

            </div>

            {/* =================================================
                TAG COUNT
            ================================================= */}

            <div>

              <div className="mb-2 flex items-center justify-between gap-3">

                <label className="text-sm font-medium text-slate-300">
                  Tags Per Set
                </label>

                <span className="shrink-0 text-sm font-semibold text-blue-400">
                  {tagCount} Tags
                </span>

              </div>

              <input
                type="range"
                min="10"
                max="50"
                step="10"
                value={tagCount}
                onChange={(e) =>
                  setTagCount(
                    Number(e.target.value)
                  )
                }
                className="w-full accent-blue-500"
              />

              <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
              </div>

            </div>

            {/* =================================================
                CREATIVITY
            ================================================= */}

            <div>

              <div className="mb-2 flex items-center justify-between gap-3">

                <label className="text-sm font-medium text-slate-300">
                  Creativity
                </label>

                <span className="shrink-0 text-sm font-semibold text-purple-400">
                  {creativity}%
                </span>

              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={creativity}
                onChange={(e) =>
                  setCreativity(
                    Number(e.target.value)
                  )
                }
                className="w-full accent-purple-500"
              />

            </div>

            {/* =================================================
                GENERATE BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={generateTags}
              disabled={
                loading ||
                topic.trim() === ""
              }
              className="mt-2 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCcw
                    size={18}
                    className="animate-spin"
                  />

                  Generating...
                </>
              ) : (
                <>
                  <Wand2 size={18} />

                  Generate Tags
                </>
              )}
            </button>

          </div>
        </div>

        {/* =================================================
            RIGHT PANEL
        ================================================= */}

        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Title */}

            <div className="min-w-0">

              <div className="flex min-w-0 flex-wrap items-center gap-3">

                <h2 className="text-xl font-bold text-white">
                  Generated Tags
                </h2>

                {results.length > 0 && (
                  <span className="shrink-0 rounded-full bg-blue-500/20 px-2 py-1 text-[11px] font-semibold text-blue-400">
                    {results.length} Results
                  </span>
                )}

              </div>

              <p className="mt-1 break-words text-sm text-slate-400">
                AI generated SEO optimized YouTube tags
              </p>

            </div>

            {/* Header Actions */}

            <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto sm:gap-3">

              {/* Copy All */}

              <button
                type="button"
                onClick={copyAllTags}
                disabled={
                  results.length === 0 ||
                  loading
                }
                className="
                  flex min-h-[46px]
                  flex-1 sm:flex-none
                  items-center justify-center gap-2
                  rounded-xl
                  border border-white/10
                  bg-[#0B1220]
                  px-3 sm:px-4
                  py-3
                  text-xs sm:text-sm
                  font-medium
                  text-slate-300
                  transition
                  hover:border-blue-500
                  hover:text-blue-400
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Copy size={16} />

                {copiedAll
                  ? "Copied!"
                  : "Copy All"}
              </button>

              {/* Generate Again */}

              <button
                type="button"
                onClick={generateTags}
                disabled={
                  loading ||
                  topic.trim() === ""
                }
                className="
                  flex
                  min-h-[46px]
                  min-w-[46px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border border-white/10
                  bg-[#0B1220]
                  p-3
                  text-slate-400
                  transition
                  hover:border-blue-500/40
                  hover:text-white
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                title="Generate Again"
              >
                <RefreshCcw
                  size={18}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>

            </div>
          </div>

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {results.length === 0 ? (

            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 py-10 sm:h-[420px]">

              <Sparkles
                size={42}
                className="text-blue-400"
              />

              <h3 className="mt-5 text-center text-xl font-semibold text-white">
                No Tags Yet
              </h3>

              <p className="mt-2 max-w-md text-center text-sm leading-6 text-slate-400">
                Enter your topic and click
                <br />
                Generate Tags
              </p>

            </div>

          ) : (

            /* =================================================
               RESULTS
            ================================================= */

            <div className="space-y-4">

              {results.map(
                (result, index) => {

                  const maxScore =
                    Math.max(
                      ...results.map(
                        (r) => r.score
                      )
                    );

                  const isBest =
                    result.score > 0 &&
                    result.score ===
                      maxScore;

                  const isRegenerating =
                    regeneratingIndex ===
                    index;

                  return (

                    <div
                      key={`${index}-${result.tags}`}
                      className="
                        min-w-0
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#0B1220]
                        p-4
                        sm:px-6
                        sm:pt-3
                        sm:pb-3
                        transition-all
                        duration-300
                        hover:border-blue-500/40
                        hover:shadow-lg
                        hover:shadow-blue-500/10
                      "
                    >

                      {/* Result Row */}

                      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        {/* =================================================
                            RESULT CONTENT
                        ================================================= */}

                        <div className="min-w-0 flex-1">

                          {/* Header */}

                          <div className="mb-2 flex flex-wrap items-center gap-3">

                            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                              Tag Set{" "}
                              {index + 1}
                            </p>

                            {isBest && (
                              <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-400">
                                🏆 BEST
                              </span>
                            )}

                          </div>

                          {/* Tags */}

                          <p className="break-words text-sm leading-7 text-white sm:text-base">
                            {result.tags}
                          </p>

                          {/* AI Score */}

                          <p className="mt-4 text-sm font-semibold text-emerald-400">
                            AI Score{" "}
                            {result.score > 0
                              ? `${result.score}%`
                              : "Analyzing..."}
                          </p>

                          {/* Metrics */}

                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">

                            {/* CTR */}

                            <span className="text-slate-400">
                              📈{" "}
                              <span className="font-semibold text-cyan-400">
                                Estimated CTR{" "}
                                {result.ctr > 0
                                  ? `${result.ctr}/10`
                                  : "Analyzing..."}
                              </span>
                            </span>

                            {/* Viral */}

                            <span className="text-slate-400">
                              🔥{" "}
                              <span className="font-semibold text-pink-400">
                                Viral{" "}
                                {result.viral}%
                              </span>
                            </span>

                            {/* Trending */}

                            <span className="text-slate-400">
                              📊{" "}
                              <span className="font-semibold text-sky-400">
                                Trending{" "}
                                {result.trending}%
                              </span>
                            </span>

                            {/* SEO */}

                            <span className="text-slate-400">
                              🔍{" "}
                              <span className="font-semibold text-green-400">
                                SEO{" "}
                                {result.seo}/100
                              </span>
                            </span>

                            {/* Tag Count */}

                            <span className="text-slate-400">
                              🏷{" "}
                              <span className="font-semibold text-yellow-400">
                                {
                                  result.tags
                                    .split(",")
                                    .filter(
                                      (tag) =>
                                        tag.trim()
                                          .length >
                                        0
                                    ).length
                                }
                              </span>
                            </span>

                          </div>

                        </div>

                        {/* =================================================
                            ACTION BUTTONS
                        ================================================= */}

                        <div className="flex shrink-0 items-center justify-end gap-2 sm:pt-1">

                          {/* Copy */}

                          <div className="group relative">

                            <button
                              type="button"
                              onClick={() =>
                                copyTags(
                                  result.tags,
                                  index
                                )
                              }
                              disabled={
                                isRegenerating
                              }
                              className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/10
                                bg-[#050814]
                                text-slate-400
                                transition
                                hover:border-blue-500
                                hover:text-blue-400
                                active:scale-95
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                              "
                              aria-label="Copy tags"
                            >
                              <Copy size={18} />
                            </button>

                            <span
                              className="
                                pointer-events-none
                                absolute
                                bottom-full
                                left-1/2
                                z-20
                                mb-2
                                -translate-x-1/2
                                translate-y-1
                                whitespace-nowrap
                                rounded-lg
                                bg-slate-900
                                px-3
                                py-1
                                text-xs
                                text-white
                                opacity-0
                                shadow-lg
                                transition-all
                                duration-200
                                group-hover:translate-y-0
                                group-hover:opacity-100
                              "
                            >
                              {copiedIndex ===
                              index
                                ? "Copied!"
                                : "Copy Tags"}
                            </span>

                          </div>

                          {/* Favorite */}

                          <div className="group relative">

                            <button
                              type="button"
                              onClick={() =>
                                toggleFavorite(
                                  index
                                )
                              }
                              disabled={
                                isRegenerating
                              }
                              className={`
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                border
                                bg-[#050814]
                                transition
                                active:scale-95
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                ${
                                  result.favorite
                                    ? "border-pink-500 text-pink-500"
                                    : "border-white/10 text-slate-400 hover:border-pink-500 hover:text-pink-400"
                                }
                              `}
                              aria-label={
                                result.favorite
                                  ? "Remove favorite"
                                  : "Add favorite"
                              }
                            >
                              <Heart
                                size={18}
                                className={
                                  result.favorite
                                    ? "fill-current"
                                    : ""
                                }
                              />
                            </button>

                            <span
                              className="
                                pointer-events-none
                                absolute
                                bottom-full
                                left-1/2
                                z-20
                                mb-2
                                -translate-x-1/2
                                translate-y-1
                                whitespace-nowrap
                                rounded-lg
                                bg-slate-900
                                px-3
                                py-1
                                text-xs
                                text-white
                                opacity-0
                                shadow-lg
                                transition-all
                                duration-200
                                group-hover:translate-y-0
                                group-hover:opacity-100
                              "
                            >
                              {result.favorite
                                ? "Remove Favorite"
                                : "Add Favorite"}
                            </span>

                          </div>

                          {/* Regenerate */}

                          <div className="group relative">

                            <button
                              type="button"
                              onClick={() =>
                                regenerateTag(
                                  index
                                )
                              }
                              disabled={
                                loading ||
                                isRegenerating
                              }
                              className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/10
                                bg-[#050814]
                                text-slate-400
                                transition
                                hover:border-green-500
                                hover:text-green-400
                                active:scale-95
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                              "
                              aria-label="Generate again"
                            >
                              <RefreshCcw
                                size={18}
                                className={
                                  isRegenerating
                                    ? "animate-spin"
                                    : "transition-transform duration-300 group-hover:rotate-180"
                                }
                              />
                            </button>

                            <span
                              className="
                                pointer-events-none
                                absolute
                                bottom-full
                                right-0
                                z-20
                                mb-2
                                translate-y-1
                                whitespace-nowrap
                                rounded-lg
                                bg-slate-900
                                px-3
                                py-1
                                text-xs
                                text-white
                                opacity-0
                                shadow-lg
                                transition-all
                                duration-200
                                group-hover:translate-y-0
                                group-hover:opacity-100
                              "
                            >
                              {isRegenerating
                                ? "Regenerating..."
                                : "Generate Again"}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>
      </div>
    </ToolLayout>
  );
}