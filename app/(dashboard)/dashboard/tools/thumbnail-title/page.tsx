"use client";

import { useEffect, useState } from "react";
import {
  Copy,
  RefreshCcw,
  Sparkles,
  Heart,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import ToolLayout from "@/components/ai-tools/ToolLayout";
import {
  buildThumbnailPrompt,
  buildThumbnailRegeneratePrompt,
} from "@/lib/prompts/thumbnail";

type ThumbnailTitleResult = {
  title: string;
  score: number;
  ctr: number;
  curiosity: number;
  engagement: number;
  favorite: boolean;
};

const languages = [
  "🌐 Auto Detect",
  "English",
  "বাংলা",
  "हिन्दी",
  "Spanish",
  "French",
  "German",
  "Arabic",
];

const tones = [
  "Engaging",
  "Professional",
  "Friendly",
  "Casual",
  "Dramatic",
  "Funny",
  "Viral",
  "Curious",
];

const audiences = [
  "Everyone",
  "Beginners",
  "Students",
  "Professionals",
  "Kids",
];

const categories = [
  "General",
  "Technology",
  "Education",
  "Gaming",
  "Entertainment",
  "Business",
  "Lifestyle",
  "News",
  "How To & Style",
  "Travel",
  "Comedy",
];

const titleCounts = ["5", "10", "15", "20"];

// ============================================================
// CREDIT COSTS
// ============================================================

const THUMBNAIL_TITLE_CREDIT_COSTS: Record<number, number> = {
  5: 3,
  10: 6,
  15: 9,
  20: 12,
};

const REGENERATE_CREDIT_COST = 2;

// ============================================================
// PAGE
// ============================================================

export default function ThumbnailTitlePage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState("🌐 Auto Detect");
  const [tone, setTone] = useState("Engaging");
  const [audience, setAudience] = useState("Everyone");
  const [category, setCategory] = useState("General");
  const [titleCount, setTitleCount] = useState("5");
  const [creativity, setCreativity] = useState(70);

  const [credits, setCredits] = useState(0);

  const [loading, setLoading] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(
    null
  );

  const [error, setError] = useState("");
  const [results, setResults] = useState<ThumbnailTitleResult[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const selectedTitleCount = Number(titleCount);

  const generateCreditCost =
    THUMBNAIL_TITLE_CREDIT_COSTS[selectedTitleCount] ?? 0;

  // ============================================================
  // LOAD CREDITS
  // ============================================================

  useEffect(() => {
    async function loadCredits() {
      try {
        const response = await fetch("/api/credits");
        const data = await response.json();

        if (response.ok && data.success) {
          setCredits(Number(data.credits ?? 0));
        }
      } catch (error) {
        console.error("Failed to load credits:", error);
      }
    }

    loadCredits();
  }, []);

  // ============================================================
  // UPDATE CREDITS
  // ============================================================

  const updateCreditsFromResponse = (data: any) => {
    if (typeof data?.credits === "number") {
      setCredits(data.credits);
    } else if (typeof data?.remainingCredits === "number") {
      setCredits(data.remainingCredits);
    }
  };

  // ============================================================
  // CLAMP SCORE
  // ============================================================

  const clamp = (value: number) =>
    Math.max(0, Math.min(100, Number(value) || 0));

  // ============================================================
  // SANITIZE RESULT
  // ============================================================

  const sanitizeResult = (item: any): ThumbnailTitleResult => ({
    title: String(item?.title || "Untitled Thumbnail Title").trim(),
    score: clamp(item?.score),
    ctr: clamp(item?.ctr),
    curiosity: clamp(item?.curiosity),
    engagement: clamp(item?.engagement),
    favorite: false,
  });

  // ============================================================
  // GENERATE TITLES
  // ============================================================

  const generateTitles = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    if (credits < generateCreditCost) {
      setError(
        `You need ${generateCreditCost} credits to generate ${selectedTitleCount} titles.`
      );
      return;
    }

    setLoading(true);
    setError("");
    setCopiedIndex(null);
    setCopiedAll(false);

    try {
      const prompt = buildThumbnailPrompt({
        topic,
        keywords,
        language,
        tone,
        audience,
        category,
        creativity,
        count: selectedTitleCount,
      });

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          json: true,
          toolId: "thumbnail-title",
          count: selectedTitleCount,
          action: "generate",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Failed to generate thumbnail titles."
        );
      }

      updateCreditsFromResponse(data);

      let parsed: any;

      try {
        parsed =
          typeof data.result === "string"
            ? JSON.parse(data.result)
            : data.result;
      } catch {
        throw new Error("AI returned invalid JSON. Please try again.");
      }

      if (!Array.isArray(parsed?.results)) {
        throw new Error("AI returned an unexpected result format.");
      }

      const titles = parsed.results
        .slice(0, selectedTitleCount)
        .map(sanitizeResult)
        .sort(
          (a: ThumbnailTitleResult, b: ThumbnailTitleResult) =>
            b.score - a.score
        );

      if (!titles.length) {
        throw new Error("No thumbnail titles were generated.");
      }

      setResults(titles);
    } catch (err: any) {
      console.error("THUMBNAIL TITLE ERROR:", err);
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // REGENERATE ONE TITLE
  // ============================================================

  const regenerateTitle = async (index: number) => {
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    if (credits < REGENERATE_CREDIT_COST) {
      setError(
        `You need ${REGENERATE_CREDIT_COST} credits to regenerate a title.`
      );
      return;
    }

    setRegeneratingIndex(index);
    setError("");

    try {
      const prompt = buildThumbnailRegeneratePrompt({
        topic,
        keywords,
        language,
        tone,
        audience,
        category,
        creativity,
        existingTitles: results.map((item) => item.title),
      });

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          json: true,
          toolId: "thumbnail-title",
          count: 1,
          action: "regenerate",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Failed to regenerate thumbnail title."
        );
      }

      updateCreditsFromResponse(data);

      let parsed: any;

      try {
        parsed =
          typeof data.result === "string"
            ? JSON.parse(data.result)
            : data.result;
      } catch {
        throw new Error("AI returned invalid JSON.");
      }

      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("AI returned an unexpected result format.");
      }

      const newTitle = sanitizeResult(parsed);

      setResults((current) =>
        current.map((item, i) =>
          i === index
            ? {
                ...newTitle,
                favorite: item.favorite,
              }
            : item
        )
      );
    } catch (err: any) {
      console.error("REGENERATE THUMBNAIL TITLE ERROR:", err);
      setError(err?.message || "Failed to regenerate title.");
    } finally {
      setRegeneratingIndex(null);
    }
  };

  // ============================================================
  // FAVORITE
  // ============================================================

  const toggleFavorite = (index: number) => {
    setResults((current) =>
      current.map((item, i) =>
        i === index ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  // ============================================================
  // COPY ONE
  // ============================================================

  const copyTitle = async (title: string, index: number) => {
    try {
      await navigator.clipboard.writeText(title);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex((current) =>
          current === index ? null : current
        );
      }, 1800);
    } catch {
      setError("Failed to copy title.");
    }
  };

  // ============================================================
  // COPY ALL
  // ============================================================

  const copyAllTitles = async () => {
    if (!results.length) return;

    try {
      const text = results
        .map((item, index) => `${index + 1}. ${item.title}`)
        .join("\n");

      await navigator.clipboard.writeText(text);

      setCopiedAll(true);

      setTimeout(() => {
        setCopiedAll(false);
      }, 1800);
    } catch {
      setError("Failed to copy all titles.");
    }
  };

  // ============================================================
  // BEST TITLE
  // ============================================================

  const bestIndex = results.length > 0 ? 0 : -1;

  // ============================================================
  // UI
  // ============================================================

  return (
    <ToolLayout
      title="Thumbnail Title Generator"
      description="Generate short, powerful and high-CTR thumbnail text ideas powered by AI."
    >
      <div className="grid min-w-0 gap-6 sm:gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">

        {/* =========================================
            LEFT - GENERATOR
        ========================================= */}

        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          {/* Header */}

          <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Generator
            </h2>

            <span className="shrink-0 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
              {credits} Credits
            </span>
          </div>

          {/* Topic */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Topic
            </label>

            <textarea
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);

                if (error) {
                  setError("");
                }
              }}
              placeholder="e.g. Best AI tools for YouTube"
              rows={4}
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 placeholder:text-slate-600 sm:px-4"
            />
          </div>

          {/* Keywords */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Keywords
            </label>

            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. AI, YouTube, tools"
              className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 placeholder:text-slate-600 sm:px-4"
            />
          </div>

          {/* Language */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Language
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/60 sm:px-4"
            >
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Tone */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Tone
            </label>

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/60 sm:px-4"
            >
              {tones.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Audience */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Target Audience
            </label>

            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/60 sm:px-4"
            >
              {audiences.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/60 sm:px-4"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Title Count */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Title Count
            </label>

            <select
              value={titleCount}
              onChange={(e) => setTitleCount(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/60 sm:px-4"
            >
              {titleCounts.map((item) => (
                <option key={item} value={item}>
                  {item} Titles
                </option>
              ))}
            </select>
          </div>

          {/* Creativity */}

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <label className="text-sm font-medium text-slate-300">
                Creativity
              </label>

              <span className="shrink-0 text-sm font-semibold text-blue-400">
                {creativity}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={creativity}
              onChange={(e) =>
                setCreativity(Number(e.target.value))
              }
              className="w-full accent-blue-500"
            />

            <div className="mt-2 flex justify-between text-xs text-slate-600">
              <span>Focused</span>
              <span>Creative</span>
            </div>
          </div>

          {/* Credit Info */}

          <div className="mt-5 rounded-xl border border-blue-500/10 bg-blue-500/[0.04] px-3.5 py-3 text-xs text-slate-400">
            Generate {selectedTitleCount} titles ={" "}
            <span className="font-semibold text-blue-400">
              {generateCreditCost} credits
            </span>

            <br />

            Regenerate ={" "}
            <span className="font-semibold text-purple-400">
              {REGENERATE_CREDIT_COST} credits
            </span>
          </div>

          {/* Error */}

          {error && (
            <div className="mt-5 break-words rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-400">
              {error}
            </div>
          )}

          {/* Generate Button */}

          <button
            type="button"
            onClick={generateTitles}
            disabled={
              loading ||
              !topic.trim() ||
              credits < generateCreditCost
            }
            className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:px-5"
          >
            {loading ? (
              <>
                <RefreshCcw
                  size={18}
                  className="shrink-0 animate-spin"
                />
                Generating...
              </>
            ) : (
              <>
                <Sparkles
                  size={18}
                  className="shrink-0"
                />
                Generate Titles • {generateCreditCost} Credits
              </>
            )}
          </button>
        </div>

        {/* =========================================
            RIGHT - RESULTS
        ========================================= */}

        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          {/* Results Header */}

          <div className="mb-5 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="min-w-0">
              <h2 className="break-words text-lg font-bold text-white sm:text-xl">
                Generated Thumbnail Titles
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Short and powerful thumbnail text ideas
              </p>
            </div>

            {results.length > 0 && (
              <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">

                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
                  {results.length} Results
                </span>

                {/* Copy All */}

                <button
                  type="button"
                  onClick={copyAllTitles}
                  className="inline-flex min-h-[36px] items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
                >
                  {copiedAll ? (
                    <Check size={15} />
                  ) : (
                    <Copy size={15} />
                  )}

                  {copiedAll ? "Copied" : "Copy All"}
                </button>

                {/* Generate Again */}

                <button
                  type="button"
                  onClick={generateTitles}
                  disabled={
                    loading ||
                    !topic.trim() ||
                    credits < generateCreditCost
                  }
                  title={`Generate Again • ${generateCreditCost} Credits`}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCcw
                    size={16}
                    className={loading ? "animate-spin" : ""}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Empty State */}

          {results.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 py-10 sm:min-h-[520px]">

              <ImageIcon
                size={42}
                className="text-blue-400"
              />

              <h3 className="mt-5 text-center text-lg font-semibold text-white sm:text-xl">
                No Thumbnail Titles Yet
              </h3>

              <p className="mt-2 max-w-md text-center text-sm leading-6 text-slate-400">
                Enter your topic and click Generate Titles.
              </p>

            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">

              {results.map((result, index) => {
                const isBest = index === bestIndex;
                const isRegenerating =
                  regeneratingIndex === index;

                return (
                  <div
                    key={`${index}-${result.title}`}
                    className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] p-4 transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 sm:px-6 sm:py-5"
                  >

                    {/* Header */}

                    <div className="flex min-w-0 flex-col gap-3">

                      <div className="flex min-w-0 flex-wrap items-center gap-2">

                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
                          Title {index + 1}
                        </span>

                        {isBest && (
                          <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-300 sm:text-[10px]">
                            🏆 BEST
                          </span>
                        )}

                      </div>

                      {/* Score Badges */}

                      <div className="flex min-w-0 flex-wrap items-center gap-2">

                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-400 sm:px-3 sm:text-xs">
                          AI Score {result.score}%
                        </div>

                        <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-blue-400 sm:px-3 sm:text-xs">
                          CTR {result.ctr}/100
                        </div>

                        <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-purple-400 sm:px-3 sm:text-xs">
                          Curiosity {result.curiosity}/100
                        </div>

                        <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-cyan-400 sm:px-3 sm:text-xs">
                          Engagement {result.engagement}/100
                        </div>

                      </div>
                    </div>

                    {/* Title */}

                    <h3 className="mt-4 break-words text-xl font-bold leading-tight text-white sm:text-2xl">
                      {result.title}
                    </h3>

                    {/* Thumbnail Preview */}

                    <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0B1220] to-[#111827] sm:rounded-2xl">

                      <div className="flex min-h-[140px] items-center justify-center px-4 py-8 sm:min-h-[170px] sm:px-8 sm:py-10">

                        <h3 className="max-w-full break-words text-center text-2xl font-black uppercase leading-tight tracking-tight text-white drop-shadow-[0_0_18px_rgba(59,130,246,0.25)] sm:text-3xl md:text-4xl">
                          {result.title}
                        </h3>

                      </div>

                    </div>

                    {/* Info */}

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">

                      <span className="text-[11px] text-slate-600 sm:text-xs">
                        {result.title.length} characters
                      </span>

                      <span className="text-[11px] text-slate-600 sm:text-xs">
                        Thumbnail-ready text
                      </span>

                    </div>

                    {/* Actions */}

                    <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/5 pt-4">

                      {/* Copy */}

                      <button
                        type="button"
                        onClick={() =>
                          copyTitle(result.title, index)
                        }
                        disabled={isRegenerating}
                        title="Copy Title"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
                      >
                        {copiedIndex === index ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>

                      {/* Favorite */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleFavorite(index)
                        }
                        disabled={isRegenerating}
                        title={
                          result.favorite
                            ? "Remove Favorite"
                            : "Add to Favorites"
                        }
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10 ${
                          result.favorite
                            ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
                            : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400"
                        }`}
                      >
                        <Heart
                          size={16}
                          fill={
                            result.favorite
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      {/* Regenerate */}

                      <button
                        type="button"
                        onClick={() =>
                          regenerateTitle(index)
                        }
                        disabled={
                          isRegenerating ||
                          credits < REGENERATE_CREDIT_COST
                        }
                        title={`Regenerate Title • ${REGENERATE_CREDIT_COST} Credits`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
                      >
                        <RefreshCcw
                          size={16}
                          className={
                            isRegenerating
                              ? "animate-spin"
                              : ""
                          }
                        />
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Disclaimer */}

          {results.length > 0 && (
            <p className="mt-5 px-2 text-center text-[10px] leading-5 text-slate-600 sm:text-xs">
              CTR, Curiosity and Engagement are AI estimates, not real-time
              YouTube analytics or guarantees.
            </p>
          )}

        </div>
      </div>
    </ToolLayout>
  );
}