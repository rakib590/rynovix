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
  buildTitlePrompt,
  buildTitleRegeneratePrompt,
} from "@/lib/prompts/title";

type TitleResult = {
  title: string;
  score: number;
  ctr: number;
  seo: number;
  favorite: boolean;
};

export default function TitleGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState("🌐 Auto Detect");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");

  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);

  const [regeneratingIndex, setRegeneratingIndex] =
    useState<number | null>(null);

  const [error, setError] = useState("");

  const [audience, setAudience] = useState("Everyone");
  const [category, setCategory] = useState("Education");
  const [titleCount, setTitleCount] = useState("5");
  const [creativity, setCreativity] = useState(70);

  const [results, setResults] = useState<TitleResult[]>([]);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadCredits() {
      try {
        const response = await fetch("/api/credits");

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (typeof data.credits === "number") {
          setCredits(data.credits);
        }
      } catch (error) {
        console.error("Failed to load credits:", error);
      }
    }

    loadCredits();
  }, []);

  // ============================================================
  // ⭐ REGENERATE ONE TITLE
  // ============================================================

  async function regenerateTitle(index: number) {
    const currentTitle = results[index];

    if (!currentTitle) {
      return;
    }

    setRegeneratingIndex(index);
    setError("");

    try {
      const prompt = buildTitleRegeneratePrompt({
        topic,
        keywords,
        language,
        tone,
        length,
        audience,
        category,
        currentTitle: currentTitle.title,
        creativity,
      });

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          toolId: "title-generator",
          count: 1,
          action: "regenerate",
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "AI request failed.");
      }

      if (typeof data.credits === "number") {
        setCredits(data.credits);
      }

      const parsed = JSON.parse(data.result);

      if (
        !parsed ||
        !Array.isArray(parsed.titles) ||
        parsed.titles.length !== 1
      ) {
        throw new Error(
          "AI returned an invalid regenerated title response."
        );
      }

      const regenerated = parsed.titles[0];

      if (
        !regenerated ||
        typeof regenerated.title !== "string" ||
        !regenerated.title.trim()
      ) {
        throw new Error("AI returned an invalid title.");
      }

      const sanitizeNumber = (
        value: unknown,
        min: number,
        max: number
      ) => {
        const number = Number(value);

        if (!Number.isFinite(number)) {
          return min;
        }

        return Math.min(max, Math.max(min, number));
      };

      const updatedTitle: TitleResult = {
        title: regenerated.title.trim(),

        score: Math.round(
          sanitizeNumber(
            regenerated.score,
            0,
            100
          )
        ),

        ctr: Number(
          sanitizeNumber(
            regenerated.ctr,
            0,
            10
          ).toFixed(1)
        ),

        seo: Math.round(
          sanitizeNumber(
            regenerated.seo,
            0,
            100
          )
        ),

        favorite: currentTitle.favorite,
      };

      setResults((prev) =>
        prev.map((item, i) =>
          i === index ? updatedTitle : item
        )
      );
    } catch (error: any) {
      console.error(
        "Regenerate title failed:",
        error
      );

      setError(
        error?.message ||
          "Unable to generate a new title. Please try again."
      );
    } finally {
      setRegeneratingIndex(null);
    }
  }

  // ============================================================
  // ⭐ FAVORITE TOGGLE
  // ============================================================

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

  // ============================================================
  // ⭐ COPY TITLE
  // ============================================================

  async function copyTitle(
    title: string,
    index: number
  ) {
    try {
      await navigator.clipboard.writeText(title);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);

      setError("Failed to copy title.");
    }
  }

  // ============================================================
  // ⭐ GENERATE TITLES
  // ============================================================

  async function generateTitles() {
    if (!topic.trim()) {
      setError("Please enter a video topic first.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const prompt = buildTitlePrompt({
        topic,
        keywords,
        language,
        tone,
        length,
        audience,
        category,
        titleCount: Number(titleCount),
        creativity,
      });

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: true,
          toolId: "title-generator",
          count: Number(titleCount),
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "AI request failed."
        );
      }

      if (typeof data.credits === "number") {
        setCredits(data.credits);
      }

      const parsed = JSON.parse(data.result);

      if (
        !parsed ||
        !Array.isArray(parsed.titles)
      ) {
        throw new Error(
          "AI returned an invalid title response."
        );
      }

      const sanitizeNumber = (
        value: unknown,
        min: number,
        max: number
      ) => {
        const number = Number(value);

        if (!Number.isFinite(number)) {
          return min;
        }

        return Math.min(
          max,
          Math.max(min, number)
        );
      };

      const newResults: TitleResult[] =
        parsed.titles
          .slice(0, Number(titleCount))
          .filter(
            (item: any) =>
              item &&
              typeof item.title === "string" &&
              item.title.trim().length > 0
          )
          .map((item: any) => ({
            title: item.title.trim(),

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

            favorite: false,
          }));

      if (
        newResults.length !==
        Number(titleCount)
      ) {
        throw new Error(
          `AI returned ${newResults.length} titles instead of ${titleCount}.`
        );
      }

      setResults(newResults);
    } catch (error: any) {
      console.error(
        "Generate titles failed:",
        error
      );

      setError(
        error?.message ||
          "Unable to generate titles. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolLayout
      title="AI Title Generator"
      description="Generate high-converting YouTube titles powered by AI."
    >
      {/* Generator + Results */}
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">

        {/* ================= LEFT — GENERATOR ================= */}
        <div className="rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-white">
              Generator
            </h2>

            {credits !== null && (
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm">
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
• How to Grow a YouTube Channel in 2026
• ২০২৬ সালে ইউটিউব চ্যানেল কীভাবে বড় করবেন?
• 2026 में YouTube चैनल कैसे Grow करें?`}
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
                placeholder="youtube, growth, seo"
                className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            {/* Language / Tone / Length */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* Language */}
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Language
                </label>

                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-white outline-none focus:border-blue-500"
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
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Tone
                </label>

                <select
                  value={tone}
                  onChange={(e) =>
                    setTone(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Funny</option>
                  <option>Bold</option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Length
                </label>

                <select
                  value={length}
                  onChange={(e) =>
                    setLength(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Long</option>
                </select>
              </div>

            </div>

            {/* More Options */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">

              {/* Audience */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Audience
                </label>

                <select
                  value={audience}
                  onChange={(e) =>
                    setAudience(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-blue-500"
                >
                  <option>Everyone</option>
                  <option>Beginners</option>
                  <option>Students</option>
                  <option>Professionals</option>
                  <option>Kids</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-blue-500"
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

              {/* Title Count */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Title Count
                </label>

                <select
                  value={titleCount}
                  onChange={(e) =>
                    setTitleCount(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-blue-500"
                >
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                </select>
              </div>

              {/* Creativity */}
              <div>
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
              onClick={generateTitles}
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
                  Generate Titles

                  <span className="ml-1 rounded-lg bg-white/15 px-2 py-1 text-xs font-medium">
                    {titleCount} Credit
                    {Number(titleCount) !== 1
                      ? "s"
                      : ""}
                  </span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* ================= RIGHT — RESULTS ================= */}
        <div className="rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-3">

            <div className="min-w-0">
              <h2 className="text-xl font-bold text-white">
                Generated Titles
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                AI generated high-converting titles
              </p>
            </div>

            <button
              type="button"
              onClick={generateTitles}
              disabled={
                loading ||
                topic.trim() === ""
              }
              className="shrink-0 rounded-xl border border-white/10 bg-[#0B1220] p-3 text-slate-400 transition hover:border-blue-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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

          {/* Empty State */}
          {results.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-4 sm:h-[420px]">

              <Sparkles
                size={42}
                className="text-blue-400"
              />

              <h3 className="mt-5 text-xl font-semibold text-white">
                No Titles Yet
              </h3>

              <p className="mt-2 max-w-md text-center text-sm text-slate-400">
                Enter your topic and click Generate Titles.
              </p>

            </div>
          ) : (
            <div className="space-y-4">

              {results.map((result, index) => {
                const maxScore = Math.max(
                  ...results.map(
                    (r: TitleResult) =>
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
                    key={`${index}-${result.title}`}
                    className="rounded-2xl border border-white/10 bg-[#0B1220] p-4 transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 sm:px-6 sm:pt-4 sm:pb-3"
                  >

                    {/* Card Content */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                      {/* LEFT — Title Information */}
                      <div className="min-w-0 flex-1">

                        {/* Top */}
                        <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">

                          <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                            Title {index + 1}
                          </p>

                          {isBest && (
                            <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-400">
                              🏆 BEST
                            </span>
                          )}

                        </div>

                        {/* Title */}
                        <h3 className="break-words text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[30px] lg:leading-[1.1]">
                          {result.title}
                        </h3>

                        {/* AI Score */}
                        <p className="mt-3 text-sm font-semibold text-emerald-400">
                          AI Score{" "}
                          {result.score > 0
                            ? `${result.score}%`
                            : "Analyzing..."}
                        </p>

                        {/* Metrics */}
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">

                          {/* Estimated CTR */}
                          <span className="text-slate-400">
                            📈{" "}
                            <span className="font-semibold text-cyan-400">
                              Estimated CTR{" "}
                              {result.ctr > 0
                                ? `${result.ctr}/10`
                                : "Analyzing..."}
                            </span>
                          </span>

                          {/* SEO */}
                          <span className="text-slate-400">
                            🔍{" "}
                            <span className="font-semibold text-green-400">
                              SEO{" "}
                              {result.seo > 0
                                ? `${result.seo}/100`
                                : "Analyzing..."}
                            </span>
                          </span>

                          {/* Character Count */}
                          <span className="text-slate-400">
                            ✍{" "}
                            <span className="font-semibold text-yellow-400">
                              {result.title.length} chars
                            </span>
                          </span>

                        </div>
                      </div>

                      {/* RIGHT — ACTION BUTTONS */}
                      <div className="flex shrink-0 items-center gap-2 sm:pt-1">

                        {/* Copy */}
                        <div className="group relative">

                          <button
                            type="button"
                            onClick={() =>
                              copyTitle(
                                result.title,
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
                              : "Copy Title"}
                          </span>

                        </div>

                        {/* Favorite */}
                        <div className="group relative">

                          <button
                            type="button"
                            onClick={() =>
                              toggleFavorite(index)
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
                              regenerateTitle(index)
                            }
                            disabled={
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
                              left-1/2
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
                            {isRegenerating
                              ? "Regenerating..."
                              : "Generate Again"}
                          </span>

                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </div>
      </div>
    </ToolLayout>
  );
}