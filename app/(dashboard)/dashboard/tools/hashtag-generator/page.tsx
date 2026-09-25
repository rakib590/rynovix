"use client";

import { useEffect, useState } from "react";

import {
  Wand2,
  Copy,
  RefreshCcw,
  Sparkles,
  Heart,
} from "lucide-react";

import ToolLayout from "@/components/ai-tools/ToolLayout";

import {
  buildHashtagPrompt,
  buildHashtagRegeneratePrompt,
} from "@/lib/prompts/hashtags";

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
  hashtags?: unknown;
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

  const [hashtagCount, setHashtagCount] =
    useState("10");

  const [creativity, setCreativity] = useState(70);

  const [results, setResults] = useState<
    HashtagResult[]
  >([]);

  const [copiedIndex, setCopiedIndex] =
    useState<number | null>(null);

  const [copiedAll, setCopiedAll] =
    useState(false);

  const [credits, setCredits] =
    useState<number | null>(null);

  // =========================================================
  // LOAD CREDITS
  // =========================================================

  useEffect(() => {
    async function loadCredits() {
      try {
        const response = await fetch(
          "/api/credits"
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (
          typeof data.credits === "number"
        ) {
          setCredits(data.credits);
        }
      } catch (error) {
        console.error(
          "Failed to load credits:",
          error
        );
      }
    }

    loadCredits();
  }, []);

  // =========================================================
  // CREDIT COST
  // =========================================================

  function getGenerateCreditCost() {
    const count = Number(hashtagCount);

    const costs: Record<number, number> = {
      10: 2,
      20: 4,
      30: 6,
      50: 10,
    };

    return costs[count] ?? 0;
  }

  // =========================================================
  // SANITIZE NUMBER
  // =========================================================

  function sanitizeNumber(
    value: unknown,
    min: number,
    max: number
  ): number {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return min;
    }

    return Math.min(
      max,
      Math.max(min, number)
    );
  }

  // =========================================================
  // CLEAN HASHTAGS
  // =========================================================

  function cleanHashtags(
    value: string,
    count: number
  ): string {
    const tags = value
      .split(/\s+/)
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) =>
        tag.startsWith("#")
          ? tag
          : `#${tag}`
      );

    const uniqueTags = Array.from(
      new Set(tags)
    );

    return uniqueTags
      .slice(0, count)
      .join(" ");
  }

  // =========================================================
  // REGENERATE ONE HASHTAG SET
  // =========================================================

  async function regenerateHashtag(
    index: number
  ) {
    const currentResult = results[index];

    if (!currentResult) {
      return;
    }

    setRegeneratingIndex(index);
    setError("");

    try {
      const prompt =
        buildHashtagRegeneratePrompt({
          topic,
          keywords,
          language,
          tone,
          category,
          hashtagCount:
            Number(hashtagCount),
          currentHashtag:
            currentResult.hashtags,
          creativity,
        });

      const response = await fetch(
        "/api/ai",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            json: true,
            toolId:
              "hashtag-generator",
            count: Number(
              hashtagCount
            ),
            action: "regenerate",
            prompt,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "AI request failed."
        );
      }

      if (
        typeof data.credits ===
        "number"
      ) {
        setCredits(data.credits);
      }

      const parsed = JSON.parse(
        data.result
      );

      if (
        !parsed ||
        !Array.isArray(
          parsed.hashtags
        ) ||
        parsed.hashtags.length !== 1
      ) {
        throw new Error(
          "AI returned an invalid regenerated hashtag response."
        );
      }

      const regenerated =
        parsed.hashtags[0];

      if (
        typeof regenerated !==
        "string" ||
        !regenerated.trim()
      ) {
        throw new Error(
          "AI returned an invalid regenerated hashtag."
        );
      }

      const cleanedHashtags =
        cleanHashtags(
          regenerated,
          Number(hashtagCount)
        );

      if (!cleanedHashtags) {
        throw new Error(
          "AI returned an empty hashtag set."
        );
      }

      const updatedResult: HashtagResult =
        {
          hashtags:
            cleanedHashtags,

          score: 0,

          ctr: 0,

          seo: 0,

          trending: 0,

          viral: 0,

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
      setRegeneratingIndex(
        null
      );
    }
  }

  // =========================================================
  // FAVORITE
  // =========================================================

  function toggleFavorite(
    index: number
  ) {
    setResults((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              favorite:
                !item.favorite,
            }
          : item
      )
    );
  }

  // =========================================================
  // COPY HASHTAGS
  // =========================================================

  async function copyHashtags(
    hashtags: string,
    index: number
  ) {
    try {
      await navigator.clipboard.writeText(
        hashtags
      );

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );

      setError(
        "Failed to copy hashtags."
      );
    }
  }

  // =========================================================
  // COPY ALL HASHTAGS
  // =========================================================

  async function copyAllHashtags() {
    if (results.length === 0) {
      return;
    }

    try {
      const allHashtags =
        results
          .map(
            (item) =>
              item.hashtags
          )
          .join("\n\n");

      await navigator.clipboard.writeText(
        allHashtags
      );

      setCopiedAll(true);

      setTimeout(() => {
        setCopiedAll(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy All Failed:",
        error
      );

      setError(
        "Failed to copy all hashtags."
      );
    }
  }

  // =========================================================
  // GENERATE HASHTAGS
  // =========================================================

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
      const prompt =
        buildHashtagPrompt({
          topic,
          keywords,
          language,
          tone,
          category,
          hashtagCount:
            Number(hashtagCount),
          creativity,
        });

      const response = await fetch(
        "/api/ai",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            json: true,
            toolId:
              "hashtag-generator",
            count: Number(
              hashtagCount
            ),
            prompt,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "AI request failed."
        );
      }

      if (
        typeof data.credits ===
        "number"
      ) {
        setCredits(data.credits);
      }

      const parsed = JSON.parse(
        data.result
      );

      if (
        !parsed ||
        !Array.isArray(
          parsed.hashtags
        )
      ) {
        throw new Error(
          "AI returned an invalid hashtag response."
        );
      }

      const requestedCount =
        Number(hashtagCount);

      const hashtagStrings =
        parsed.hashtags
          .filter(
            (
              item: unknown
            ): item is string =>
              typeof item ===
                "string" &&
              item.trim()
                .length > 0
          )
          .map(
            (item: string) =>
              cleanHashtags(
                item,
                requestedCount
              )
          )
          .filter(
            (item: string) =>
              item.length > 0
          );

      if (
        hashtagStrings.length ===
        0
      ) {
        throw new Error(
          "AI returned no valid hashtags."
        );
      }

      const newResults: HashtagResult[] =
        hashtagStrings.map(
          (
            hashtags: string
          ) => ({
            hashtags,

            score: 0,

            ctr: 0,

            seo: 0,

            trending: 0,

            viral: 0,

            favorite: false,
          })
        );

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

  // =========================================================
  // UI
  // =========================================================

  const generateCreditCost =
    getGenerateCreditCost();

  return (
    <ToolLayout
      title="AI Hashtag Generator"
      description="Generate high-ranking YouTube hashtags powered by AI."
    >
      <div className="grid min-w-0 gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">

        {/* ================= LEFT ================= */}

        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          {/* Generator Header + Credits */}

          <div className="mb-6 flex items-center justify-between gap-3">

            <h2 className="text-xl font-bold text-white">
              Generator
            </h2>

            {credits !== null && (
              <div className="shrink-0 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm">
                <span className="text-slate-400">
                  Credits:{" "}
                </span>

                <span className="font-semibold text-blue-400">
                  {credits}
                </span>
              </div>
            )}

          </div>

          {/* Error */}

          {error && (
            <div className="mb-5 break-words rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
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
                  setTopic(
                    e.target.value
                  );

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
                  setKeywords(
                    e.target.value
                  )
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
                    setLanguage(
                      e.target.value
                    )
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option>
                    🌐 Auto Detect
                  </option>
                  <option>
                    English
                  </option>
                  <option>
                    বাংলা
                  </option>
                  <option>
                    हिन्दी
                  </option>
                  <option>
                    Spanish
                  </option>
                  <option>
                    French
                  </option>
                  <option>
                    German
                  </option>
                  <option>
                    Arabic
                  </option>
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
                    setTone(
                      e.target.value
                    )
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option>
                    Professional
                  </option>
                  <option>
                    Trending
                  </option>
                  <option>
                    SEO Optimized
                  </option>
                  <option>
                    Viral
                  </option>
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
                    setLength(
                      e.target.value
                    )
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option>
                    Short
                  </option>
                  <option>
                    Medium
                  </option>
                  <option>
                    Long
                  </option>
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
                    setAudience(
                      e.target.value
                    )
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-blue-500"
                >
                  <option>
                    Everyone
                  </option>
                  <option>
                    Beginners
                  </option>
                  <option>
                    Students
                  </option>
                  <option>
                    Professionals
                  </option>
                  <option>
                    Kids
                  </option>
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
                    setCategory(
                      e.target.value
                    )
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-blue-500"
                >
                  <option>
                    Education
                  </option>
                  <option>
                    Technology
                  </option>
                  <option>
                    Gaming
                  </option>
                  <option>
                    Business
                  </option>
                  <option>
                    Entertainment
                  </option>
                  <option>
                    Lifestyle
                  </option>
                  <option>
                    Finance
                  </option>
                  <option>
                    Health
                  </option>
                </select>
              </div>

              {/* Hashtag Count */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Hashtag Count
                </label>

                <select
                  value={
                    hashtagCount
                  }
                  onChange={(e) =>
                    setHashtagCount(
                      e.target.value
                    )
                  }
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-blue-500"
                >
                  <option>
                    10
                  </option>
                  <option>
                    20
                  </option>
                  <option>
                    30
                  </option>
                  <option>
                    50
                  </option>
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
                  value={
                    creativity
                  }
                  onChange={(e) =>
                    setCreativity(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="w-full accent-blue-500"
                />

              </div>

            </div>

            {/* Generate Button */}

            <button
              type="button"
              onClick={
                generateHashtags
              }
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

                  {generateCreditCost >
                    0 && (
                    <span className="rounded-lg bg-white/15 px-2 py-1 text-xs font-bold">
                      {
                        generateCreditCost
                      }{" "}
                      Credits
                    </span>
                  )}
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

                {results.length >
                  0 && (
                  <span className="rounded-full bg-blue-500/20 px-2 py-1 text-[11px] font-semibold text-blue-400">
                    {results.length}{" "}
                    Results
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
                onClick={
                  copyAllHashtags
                }
                disabled={
                  results.length ===
                    0 ||
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
                onClick={
                  generateHashtags
                }
                disabled={
                  loading ||
                  topic.trim() ===
                    ""
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
                  result,
                  index
                ) => {

                  const isRegenerating =
                    regeneratingIndex ===
                    index;

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

                          </div>

                          {/* Hashtags */}

                          <p className="break-words text-sm leading-7 text-white sm:text-base">
                            {
                              result.hashtags
                            }
                          </p>

                          {/* Metrics */}

                          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">

                            {/* Hashtag Count */}

                            <span className="text-slate-400">
                              🏷{" "}
                              <span className="font-semibold text-yellow-400">
                                {
                                  result.hashtags
                                    .split(
                                      /\s+/
                                    )
                                    .filter(
                                      (
                                        tag
                                      ) =>
                                        tag.startsWith(
                                          "#"
                                        )
                                    )
                                    .length
                                }
                              </span>
                            </span>

                            {/* Status */}

                            <span className="text-slate-400">
                              ✨{" "}
                              <span className="font-semibold text-blue-400">
                                AI Generated
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
                              <Copy
                                size={18}
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
                              {copiedIndex ===
                              index
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