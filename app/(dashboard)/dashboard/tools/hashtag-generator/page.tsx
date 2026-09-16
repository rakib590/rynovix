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

type HashtagResult = {
  hashtags: string;
  score: number;
  ctr: number;
  seo: number;
  trending: number;
  viral: number;
  favorite: boolean;
};

type AIHashtagItem = {
  hashtags: string;
  score?: unknown;
  ctr?: unknown;
  seo?: unknown;
  trending?: unknown;
  viral?: unknown;
};

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");

  const [language, setLanguage] = useState("🌐 Auto Detect");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");

  const [loading, setLoading] = useState(false);

  const [regeneratingIndex, setRegeneratingIndex] =
    useState<number | null>(null);

  const [error, setError] = useState("");

  const [audience, setAudience] = useState("Everyone");
  const [category, setCategory] = useState("Education");

  const [hashtagCount, setHashtagCount] = useState("10");
  const [creativity, setCreativity] = useState(70);

  const [results, setResults] = useState<HashtagResult[]>([]);
  const [copiedIndex, setCopiedIndex] =
    useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // ⭐ Sanitize AI Numbers
  function sanitizeNumber(
    value: unknown,
    min: number,
    max: number
  ) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return min;
    }

    return Math.min(max, Math.max(min, number));
  }

  // ⭐ Regenerate One Hashtag Set with AI
  async function regenerateHashtag(index: number) {
    const currentResult = results[index];

    if (!currentResult) {
      return;
    }

    setRegeneratingIndex(index);
    setError("");

    try {
      const autoDetectInstruction =
        language === "🌐 Auto Detect"
          ? "Automatically detect the language from the Video Topic and generate hashtags appropriate for the same language and audience."
          : `Generate hashtags appropriate for ${language}.`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          prompt: `
You are an expert YouTube hashtag strategist, SEO specialist, social media growth expert, and content discovery specialist.

Create ONE improved YouTube hashtag set.

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

Hashtag Count:
${hashtagCount}

Creativity:
${creativity}%

Current Hashtag Set:
${currentResult.hashtags}

HASHTAG REQUIREMENTS:

- Generate exactly ${hashtagCount} hashtags.
- Create ONE improved hashtag set.
- Every hashtag must be relevant to the video topic.
- Use a balanced mix of broad, niche, specific, and topic-focused hashtags.
- Naturally include relevant keywords when appropriate.
- Avoid irrelevant hashtags.
- Avoid excessive repetition.
- Avoid keyword stuffing.
- Avoid misleading or unrelated trending hashtags.
- Follow the requested language and audience.
- Make the hashtag set useful for YouTube discoverability.
- Do not number the hashtags.
- Return hashtags separated by single spaces.
- Every hashtag must begin with #.
- Do not add explanations.
- Do not return markdown.
- Return ONLY valid JSON.

SCORING REQUIREMENTS:

score:
Overall hashtag set quality from 0 to 100.

Consider:
- Relevance
- Keyword quality
- Topic coverage
- Search discoverability
- Variety
- Audience relevance
- Overall hashtag quality

ctr:
Estimated CTR potential from 0.0 to 10.0.

IMPORTANT:
This is an AI estimate, NOT actual YouTube Analytics CTR.

Consider:
- Relevance to viewers
- Topic clarity
- Discoverability
- Audience appeal

seo:
SEO optimization score from 0 to 100.

Consider:
- Keyword relevance
- Search intent
- Topic coverage
- Search-friendly hashtags
- Natural keyword usage

trending:
Estimated trend potential from 0 to 100.

IMPORTANT:
This is an AI estimate based on topic relevance and general trend potential. It is NOT real-time platform trend data.

Consider:
- Current topic relevance
- Potential popularity
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
- Emotional appeal
- Potential audience reach

IMPORTANT:

Do NOT generate random scores.

The scores must reflect the actual quality of the generated hashtag set.

Return exactly this JSON structure:

{
  "hashtags": "#ExampleOne #ExampleTwo #ExampleThree",
  "score": 94,
  "ctr": 8.7,
  "seo": 96,
  "trending": 91,
  "viral": 89
}

Rules:

- hashtags must contain exactly ${hashtagCount} hashtags.
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

      const parsed = JSON.parse(data.result);

      if (
        !parsed ||
        typeof parsed.hashtags !== "string" ||
        !parsed.hashtags.trim()
      ) {
        throw new Error(
          "AI returned an invalid hashtag set."
        );
      }

      const updatedResult: HashtagResult = {
        hashtags: parsed.hashtags.trim(),

        score: Math.round(
          sanitizeNumber(parsed.score, 0, 100)
        ),

        ctr: Number(
          sanitizeNumber(parsed.ctr, 0, 10).toFixed(1)
        ),

        seo: Math.round(
          sanitizeNumber(parsed.seo, 0, 100)
        ),

        trending: Math.round(
          sanitizeNumber(parsed.trending, 0, 100)
        ),

        viral: Math.round(
          sanitizeNumber(parsed.viral, 0, 100)
        ),

        favorite: currentResult.favorite,
      };

      setResults((prev) =>
        prev.map((item, i) =>
          i === index ? updatedResult : item
        )
      );
    } catch (error: unknown) {
      console.error(
        "Regenerate hashtag failed:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to generate a new hashtag set. Please try again."
      );
    } finally {
      setRegeneratingIndex(null);
    }
  }

  // ⭐ Favorite Toggle
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

  // ⭐ Copy Hashtags
  async function copyHashtags(
    hashtags: string,
    index: number
  ) {
    try {
      await navigator.clipboard.writeText(hashtags);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);

      setError("Failed to copy hashtags.");
    }
  }

  // ⭐ Copy All Hashtags
  async function copyAllHashtags() {
    if (results.length === 0) {
      return;
    }

    try {
      const allHashtags = results
        .map((item) => item.hashtags)
        .join("\n\n");

      await navigator.clipboard.writeText(allHashtags);

      setCopiedAll(true);

      setTimeout(() => {
        setCopiedAll(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy All Failed:",
        error
      );

      setError("Failed to copy all hashtags.");
    }
  }

  // ⭐ Generate Hashtags with AI
  async function generateHashtags() {
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
          ? "Automatically detect the language from the Video Topic and generate hashtags appropriate for the same language and audience."
          : `Generate hashtags appropriate for ${language}.`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          prompt: `
You are an expert YouTube hashtag strategist, SEO specialist, social media growth expert, and content discovery specialist.

Generate 5 high-quality YouTube hashtag sets.

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

Hashtags Per Set:
${hashtagCount}

Creativity:
${creativity}%

Number of Hashtag Sets:
5

HASHTAG REQUIREMENTS:

- Generate exactly 5 unique hashtag sets.
- Each hashtag set MUST contain exactly ${hashtagCount} hashtags.
- Every hashtag must be relevant to the video topic.
- Use a balanced mix of broad, niche, specific, and topic-focused hashtags.
- Naturally include relevant keywords when appropriate.
- Avoid irrelevant hashtags.
- Avoid excessive repetition.
- Avoid keyword stuffing.
- Avoid misleading or unrelated trending hashtags.
- Follow the requested language and audience.
- Make the hashtag sets useful for YouTube discoverability.
- Every hashtag must begin with #.
- Hashtags in each set must be separated by single spaces.
- Do not number the hashtags.
- Do not add explanations.
- Do not return markdown.
- Do not return any text outside the JSON object.

SCORING REQUIREMENTS:

For every hashtag set calculate:

1. score

Overall hashtag set quality score from 0 to 100.

Consider:
- Relevance
- Keyword quality
- Topic coverage
- Search discoverability
- Variety
- Audience relevance
- Overall hashtag quality

2. ctr

Estimated CTR potential from 0.0 to 10.0.

IMPORTANT:
This is an AI estimate, NOT actual YouTube Analytics CTR.

Consider:
- Relevance to viewers
- Topic clarity
- Discoverability
- Audience appeal

3. seo

SEO optimization score from 0 to 100.

Consider:
- Keyword relevance
- Search intent
- Topic coverage
- Search-friendly hashtags
- Natural keyword usage

4. trending

Estimated trend potential from 0 to 100.

IMPORTANT:
This is an AI estimate based on topic relevance and general trend potential. It is NOT real-time platform trend data.

Consider:
- Current topic relevance
- Potential popularity
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
- Emotional appeal
- Potential audience reach

IMPORTANT:

Do NOT give random scores.

Scores must reflect the actual quality of each individual hashtag set.

A stronger hashtag set should receive higher scores than a weaker set.

Return ONLY this JSON structure:

{
  "hashtags": [
    {
      "hashtags": "#ExampleOne #ExampleTwo #ExampleThree",
      "score": 94,
      "ctr": 8.7,
      "seo": 96,
      "trending": 91,
      "viral": 89
    }
  ]
}

IMPORTANT RULES:

- The "hashtags" array MUST contain exactly 5 objects.
- Every object must contain hashtags, score, ctr, seo, trending, and viral.
- Each hashtags string MUST contain exactly ${hashtagCount} hashtags.
- Every hashtag must start with #.
- score must be a number between 0 and 100.
- ctr must be a number between 0 and 10.
- seo must be a number between 0 and 100.
- trending must be a number between 0 and 100.
- viral must be a number between 0 and 100.
- Do not return numbering.
- Do not return explanations.
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

      const parsed = JSON.parse(data.result);

      if (
        !parsed ||
        !Array.isArray(parsed.hashtags)
      ) {
        throw new Error(
          "AI returned an invalid hashtag response."
        );
      }

      const newResults: HashtagResult[] =
        (parsed.hashtags as unknown[])
          .slice(0, 5)
          .filter(
            (item: unknown): item is AIHashtagItem => {
              if (
                !item ||
                typeof item !== "object"
              ) {
                return false;
              }

              const candidate =
                item as Record<string, unknown>;

              return (
                typeof candidate.hashtags ===
                  "string" &&
                candidate.hashtags.trim()
                  .length > 0
              );
            }
          )
          .map(
            (item: AIHashtagItem): HashtagResult => ({
              hashtags: item.hashtags.trim(),

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
            })
          );

      if (newResults.length === 0) {
        throw new Error(
          "AI returned no valid hashtag sets."
        );
      }

      setResults(newResults);
    } catch (error: unknown) {
      console.error(
        "Generate hashtags failed:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to generate hashtags. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolLayout
      title="AI Hashtag Generator"
      description="Generate high-ranking YouTube hashtags powered by AI."
    >
      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">

        {/* ================= LEFT ================= */}
        <div className="rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          <h2 className="mb-6 text-xl font-bold text-white">
            Generator
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-5">

            {/* Video Topic */}
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
                className="w-full resize-y rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            {/* Keywords */}
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
                className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            {/* Language / Tone / Length */}
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
                  <option>🌐 Auto Detect</option>
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
                  <option>Trending</option>
                  <option>SEO Optimized</option>
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

            {/* More Options */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Audience */}
              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Audience
                </label>

                <select
                  value={audience}
                  onChange={(e) =>
                    setAudience(e.target.value)
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-blue-500"
                >
                  <option>Everyone</option>
                  <option>Beginners</option>
                  <option>Students</option>
                  <option>Professionals</option>
                  <option>Kids</option>
                </select>
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
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-blue-500"
                >
                  <option>Education</option>
                  <option>Technology</option>
                  <option>Gaming</option>
                  <option>Business</option>
                  <option>Entertainment</option>
                  <option>Lifestyle</option>
                  <option>Finance</option>
                  <option>Health</option>
                </select>
              </div>

              {/* Hashtag Count */}
              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Hashtag Count
                </label>

                <select
                  value={hashtagCount}
                  onChange={(e) =>
                    setHashtagCount(e.target.value)
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-blue-500"
                >
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>50</option>
                </select>
              </div>

              {/* Creativity */}
              <div className="min-w-0">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">
                    Creativity
                  </label>

                  <span className="text-sm font-semibold text-blue-400">
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
                  className="w-full accent-blue-500"
                />
              </div>

            </div>

            {/* Generate Button */}
            <button
              type="button"
              onClick={generateHashtags}
              disabled={
                loading ||
                topic.trim() === ""
              }
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
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
                  Generate Hashtags
                </>
              )}
            </button>

          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-xl font-bold text-white">
                  Generated Hashtags
                </h2>

                {results.length > 0 && (
                  <span className="rounded-full bg-blue-500/20 px-2 py-1 text-[11px] font-semibold text-blue-400">
                    {results.length} Results
                  </span>
                )}

              </div>

              <p className="mt-1 text-sm text-slate-400">
                AI generated SEO optimized hashtags
              </p>

            </div>

            <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">

              {/* Copy All */}
              <button
                type="button"
                onClick={copyAllHashtags}
                disabled={
                  results.length === 0 ||
                  loading
                }
                className="
                  flex flex-1 items-center justify-center gap-2
                  rounded-xl
                  border border-white/10
                  bg-[#0B1220]
                  px-3 py-3
                  text-sm font-medium
                  text-slate-300
                  transition
                  hover:border-blue-500
                  hover:text-blue-400
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:flex-none
                  sm:px-4
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
                onClick={generateHashtags}
                disabled={
                  loading ||
                  topic.trim() === ""
                }
                className="
                  shrink-0
                  rounded-xl
                  border border-white/10
                  bg-[#0B1220]
                  p-3
                  text-slate-400
                  transition
                  hover:border-blue-500/40
                  hover:text-white
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

          {/* Empty State */}
          {results.length === 0 ? (

            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-4">

              <Sparkles
                size={42}
                className="text-blue-400"
              />

              <h3 className="mt-5 text-center text-xl font-semibold text-white">
                No Hashtags Yet
              </h3>

              <p className="mt-2 max-w-md text-center text-sm text-slate-400">
                Enter your topic and click
                <br />
                Generate Hashtags
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {results.map(
                (
                  result: HashtagResult,
                  index: number
                ) => {

                  const maxScore = Math.max(
                    ...results.map(
                      (r: HashtagResult) =>
                        r.score
                    )
                  );

                  const isBest =
                    result.score > 0 &&
                    result.score === maxScore;

                  const isRegenerating =
                    regeneratingIndex === index;

                  return (

                    <div
                      key={`${index}-${result.hashtags}`}
                      className="min-w-0 rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-4 transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 sm:px-6 sm:py-3"
                    >

                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                        {/* LEFT */}
                        <div className="min-w-0 flex-1">

                          {/* Header */}
                          <div className="mb-2 flex flex-wrap items-center gap-3">

                            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                              Hashtag Set{" "}
                              {index + 1}
                            </p>

                            {isBest && (
                              <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-400">
                                🏆 BEST
                              </span>
                            )}

                          </div>

                          {/* Hashtags */}
                          <p className="break-words text-sm leading-7 text-white sm:text-base">
                            {result.hashtags}
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

                            {/* Hashtag Count */}
                            <span className="text-slate-400">
                              🏷{" "}
                              <span className="font-semibold text-yellow-400">
                                {
                                  result.hashtags
                                    .split(/\s+/)
                                    .filter(
                                      (
                                        tag: string
                                      ) =>
                                        tag.startsWith(
                                          "#"
                                        )
                                    ).length
                                }
                              </span>
                            </span>

                          </div>

                        </div>

                        {/* RIGHT ACTIONS */}
                        <div className="flex shrink-0 items-center justify-end gap-2 lg:pt-1">

                          {/* Copy */}
                          <div className="group relative">

                            <button
                              type="button"
                              onClick={() =>
                                copyHashtags(
                                  result.hashtags,
                                  index
                                )
                              }
                              disabled={
                                isRegenerating
                              }
                              className="rounded-xl border border-white/10 bg-[#050814] p-3 text-slate-400 transition hover:border-blue-500 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
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
                              {copiedIndex === index
                                ? "Copied!"
                                : "Copy Hashtags"}
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
                              className={`rounded-xl border bg-[#050814] p-3 transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                result.favorite
                                  ? "border-pink-500 text-pink-500"
                                  : "border-white/10 text-slate-400 hover:border-pink-500 hover:text-pink-400"
                              }`}
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
                                regenerateHashtag(
                                  index
                                )
                              }
                              disabled={
                                loading ||
                                isRegenerating
                              }
                              className="rounded-xl border border-white/10 bg-[#050814] p-3 text-slate-400 transition hover:border-green-500 hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-50"
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