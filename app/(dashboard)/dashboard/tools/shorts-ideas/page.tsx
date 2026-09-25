"use client";

import { useEffect, useState } from "react";
import {
  Copy,
  RefreshCcw,
  Sparkles,
  Heart,
  Lightbulb,
  Check,
} from "lucide-react";

import ToolLayout from "@/components/ai-tools/ToolLayout";
import {
  buildShortsPrompt,
  buildShortsRegeneratePrompt,
} from "@/lib/prompts/shorts";

type ShortsIdeaResult = {
  title: string;
  hook: string;
  concept: string;
  structure: string;
  cta: string;
  score: number;
  viral: number;
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
  "Storytelling",
  "Dramatic",
  "Funny",
  "Viral",
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

const ideaCounts = ["5", "10", "15", "20"];

const SHORTS_CREDIT_COSTS: Record<number, number> = {
  5: 3,
  10: 6,
  15: 9,
  20: 12,
};

const REGENERATE_CREDIT_COST = 2;

export default function ShortsIdeasPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState("🌐 Auto Detect");
  const [tone, setTone] = useState("Engaging");
  const [audience, setAudience] = useState("Everyone");
  const [category, setCategory] = useState("General");
  const [ideaCount, setIdeaCount] = useState("5");
  const [creativity, setCreativity] = useState(70);

  const [credits, setCredits] = useState(0);

  const [loading, setLoading] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] =
    useState<number | null>(null);
  const [error, setError] = useState("");
  const [results, setResults] = useState<ShortsIdeaResult[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const selectedIdeaCount = Number(ideaCount);

  const generateCreditCost =
    SHORTS_CREDIT_COSTS[selectedIdeaCount] ?? 0;

  const clamp = (value: number) =>
    Math.max(0, Math.min(100, Number(value) || 0));

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
  // SANITIZE RESULT
  // ============================================================

  const sanitizeResult = (item: any): ShortsIdeaResult => ({
    title: String(
      item?.title || "Untitled Shorts Idea"
    ).trim(),

    hook: String(item?.hook || "").trim(),

    concept: String(item?.concept || "").trim(),

    structure: String(item?.structure || "").trim(),

    cta: String(item?.cta || "").trim(),

    score: clamp(item?.score),

    viral: clamp(item?.viral),

    engagement: clamp(item?.engagement),

    favorite: false,
  });

  // ============================================================
  // BUILD MAIN PROMPT
  // ============================================================

  const buildPrompt = (count: number) => {
    return buildShortsPrompt({
      topic,
      keywords,
      language,
      tone,
      audience,
      category,
      creativity,
      count,
    });
  };

  // ============================================================
  // GENERATE IDEAS
  // ============================================================

  const generateIdeas = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    if (credits < generateCreditCost) {
      setError(
        `You need ${generateCreditCost} credits to generate ${selectedIdeaCount} ideas.`
      );
      return;
    }

    setLoading(true);
    setError("");
    setCopiedIndex(null);
    setCopiedAll(false);
    setResults([]);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: buildPrompt(selectedIdeaCount),
          json: true,
          toolId: "shorts-ideas",
          count: selectedIdeaCount,
          action: "generate",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Failed to generate Shorts ideas."
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
        throw new Error(
          "AI returned invalid JSON. Please try again."
        );
      }

      if (!Array.isArray(parsed?.results)) {
        throw new Error(
          "AI returned an unexpected result format."
        );
      }

      const ideas = parsed.results
        .slice(0, selectedIdeaCount)
        .map(sanitizeResult);

      if (!ideas.length) {
        throw new Error(
          "No Shorts ideas were generated."
        );
      }

      setResults(ideas);
    } catch (err: any) {
      console.error("SHORTS IDEAS ERROR:", err);
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // GENERATE AGAIN
  // Same count-based credit cost as normal Generate
  // 5 = 3 | 10 = 6 | 15 = 9 | 20 = 12
  // ============================================================

  const generateAgain = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    if (credits < generateCreditCost) {
      setError(
        `You need ${generateCreditCost} credits to generate ${selectedIdeaCount} ideas again.`
      );
      return;
    }

    setLoading(true);
    setError("");
    setCopiedIndex(null);
    setCopiedAll(false);
    setResults([]);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: buildPrompt(selectedIdeaCount),
          json: true,
          toolId: "shorts-ideas",
          count: selectedIdeaCount,
          action: "generate",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Failed to generate ideas again."
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
        throw new Error(
          "AI returned invalid JSON. Please try again."
        );
      }

      if (!Array.isArray(parsed?.results)) {
        throw new Error(
          "AI returned an unexpected result format."
        );
      }

      const ideas = parsed.results
        .slice(0, selectedIdeaCount)
        .map(sanitizeResult);

      if (!ideas.length) {
        throw new Error(
          "No Shorts ideas were generated."
        );
      }

      setResults(ideas);
    } catch (err: any) {
      console.error("GENERATE AGAIN ERROR:", err);
      setError(
        err?.message || "Failed to generate ideas again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // REGENERATE INDIVIDUAL IDEA
  // Always 2 credits
  // ============================================================

  const regenerateIdea = async (index: number) => {
    if (!topic.trim()) return;

    if (credits < REGENERATE_CREDIT_COST) {
      setError(
        `You need ${REGENERATE_CREDIT_COST} credits to regenerate an idea.`
      );
      return;
    }

    setRegeneratingIndex(index);
    setError("");

    try {
      const prompt = buildShortsRegeneratePrompt({
        topic,
        keywords,
        language,
        tone,
        audience,
        category,
        creativity,
        existingTitles: results.map(
          (item) => item.title
        ),
      });

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          json: true,
          toolId: "shorts-ideas",
          count: 1,
          action: "regenerate",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Failed to regenerate idea."
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

      const newIdea = sanitizeResult(parsed);

      setResults((current) =>
        current.map((item, i) =>
          i === index ? newIdea : item
        )
      );
    } catch (err: any) {
      console.error(
        "REGENERATE SHORTS IDEA ERROR:",
        err
      );

      setError(
        err?.message || "Failed to regenerate idea."
      );
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
        i === index
          ? {
              ...item,
              favorite: !item.favorite,
            }
          : item
      )
    );
  };

  // ============================================================
  // FORMAT IDEA
  // ============================================================

  const formatIdea = (
    idea: ShortsIdeaResult,
    index: number
  ) => {
    return `Idea ${index + 1}

Title:
${idea.title}

Hook:
${idea.hook}

Concept:
${idea.concept}

Structure:
${idea.structure}

CTA:
${idea.cta}

AI Score: ${idea.score}/100
Viral Potential: ${idea.viral}/100
Engagement: ${idea.engagement}/100`;
  };

  // ============================================================
  // COPY IDEA
  // ============================================================

  const copyIdea = async (
    idea: ShortsIdeaResult,
    index: number
  ) => {
    try {
      await navigator.clipboard.writeText(
        formatIdea(idea, index)
      );

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex((current) =>
          current === index ? null : current
        );
      }, 1800);
    } catch {
      setError("Failed to copy idea.");
    }
  };

  // ============================================================
  // COPY ALL
  // ============================================================

  const copyAllIdeas = async () => {
    if (!results.length) return;

    try {
      const text = results
        .map((idea, index) =>
          formatIdea(idea, index)
        )
        .join(
          "\n\n------------------------------\n\n"
        );

      await navigator.clipboard.writeText(text);

      setCopiedAll(true);

      setTimeout(
        () => setCopiedAll(false),
        1800
      );
    } catch {
      setError("Failed to copy all ideas.");
    }
  };

  const bestScore =
    results.length > 0
      ? Math.max(
          ...results.map(
            (result) => result.score
          )
        )
      : -1;

  return (
    <ToolLayout
      title="Shorts Ideas Generator"
      description="Generate engaging and viral-ready YouTube Shorts ideas powered by AI."
    >
      <div className="grid min-w-0 gap-5 sm:gap-6 lg:gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
        {/* LEFT — GENERATOR */}

        <div className="min-w-0 rounded-2xl border border-white/10 bg-[#050814] p-4 sm:rounded-3xl sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Generator
            </h2>

            <span className="shrink-0 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
              {credits} Credits
            </span>
          </div>

          {/* TOPIC */}

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
              placeholder="e.g. AI tools for YouTube creators"
              rows={4}
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 sm:px-4"
            />
          </div>

          {/* KEYWORDS */}

          <div className="mt-4 sm:mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Keywords
            </label>

            <input
              value={keywords}
              onChange={(e) =>
                setKeywords(e.target.value)
              }
              placeholder="e.g. AI, YouTube, automation"
              className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 sm:px-4"
            />
          </div>

          {/* LANGUAGE */}

          <div className="mt-4 sm:mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Language
            </label>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/60 sm:px-4"
            >
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* TONE */}

          <div className="mt-4 sm:mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Tone
            </label>

            <select
              value={tone}
              onChange={(e) =>
                setTone(e.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/60 sm:px-4"
            >
              {tones.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* AUDIENCE */}

          <div className="mt-4 sm:mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Target Audience
            </label>

            <select
              value={audience}
              onChange={(e) =>
                setAudience(e.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/60 sm:px-4"
            >
              {audiences.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* CATEGORY */}

          <div className="mt-4 sm:mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/60 sm:px-4"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* IDEA COUNT */}

          <div className="mt-4 sm:mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Idea Count
            </label>

            <select
              value={ideaCount}
              onChange={(e) =>
                setIdeaCount(e.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/60 sm:px-4"
            >
              {ideaCounts.map((item) => (
                <option key={item} value={item}>
                  {item} Ideas
                </option>
              ))}
            </select>
          </div>

          {/* CREATIVITY */}

          <div className="mt-5 sm:mt-6">
            <div className="mb-2.5 flex items-center justify-between">
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

            <div className="mt-2 flex justify-between text-xs text-slate-600">
              <span>Focused</span>
              <span>Creative</span>
            </div>
          </div>

          {/* CREDIT INFO */}

          <div className="mt-4 rounded-xl border border-blue-500/10 bg-blue-500/[0.04] px-3.5 py-3 text-xs text-slate-400">
            Generate {selectedIdeaCount} ideas ={" "}
            <span className="font-semibold text-blue-400">
              {generateCreditCost} credits
            </span>

            <br />

            Generate Again ={" "}
            <span className="font-semibold text-purple-400">
              {generateCreditCost} credits
            </span>

            <br />

            Individual Regenerate ={" "}
            <span className="font-semibold text-emerald-400">
              {REGENERATE_CREDIT_COST} credits
            </span>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-5 break-words rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-400">
              {error}
            </div>
          )}

          {/* GENERATE BUTTON */}

          <button
            type="button"
            onClick={generateIdeas}
            disabled={
              loading ||
              !topic.trim() ||
              credits < generateCreditCost
            }
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:mt-6"
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
                Generate Ideas • {generateCreditCost} Credits
              </>
            )}
          </button>
        </div>

        {/* RIGHT — RESULTS */}

        <div className="min-w-0 rounded-2xl border border-white/10 bg-[#050814] p-4 sm:rounded-3xl sm:p-6">
          {/* HEADER */}

          <div className="mb-5 flex min-w-0 flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Generated Shorts Ideas
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                AI generated short-form content ideas
              </p>
            </div>

            {results.length > 0 && (
              <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
                  {results.length} Results
                </span>

                <button
                  type="button"
                  onClick={copyAllIdeas}
                  className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
                >
                  {copiedAll ? (
                    <Check size={15} />
                  ) : (
                    <Copy size={15} />
                  )}

                  {copiedAll
                    ? "Copied"
                    : "Copy All"}
                </button>

                {/* GENERATE AGAIN */}

                <button
                  type="button"
                  onClick={generateAgain}
                  disabled={
                    loading ||
                    credits < generateCreditCost
                  }
                  title={`Generate Again • ${generateCreditCost} Credits`}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCcw
                    size={16}
                    className={
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  />
                </button>
              </div>
            )}
          </div>

          {/* EMPTY STATE */}

          {results.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 py-10 sm:min-h-[520px]">
              <Lightbulb
                size={40}
                className="text-blue-400 sm:h-[42px] sm:w-[42px]"
              />

              <h3 className="mt-5 text-lg font-semibold text-white sm:text-xl">
                No Ideas Yet
              </h3>

              <p className="mt-2 max-w-md text-center text-xs leading-5 text-slate-400 sm:text-sm">
                Enter your topic and click Generate Ideas.
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {results.map(
                (result, index) => {
                  const isBest =
                    result.score === bestScore;

                  const isRegenerating =
                    regeneratingIndex === index;

                  return (
                    <div
                      key={`${index}-${result.title}`}
                      className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] p-4 transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 sm:p-6"
                    >
                      {/* CARD HEADER */}

                      <div className="flex min-w-0 flex-col gap-3">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
                            Idea {index + 1}
                          </span>

                          {isBest && (
                            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-300 sm:px-2.5 sm:text-[10px]">
                              🏆 BEST
                            </span>
                          )}
                        </div>

                        <div className="flex min-w-0 flex-wrap gap-2">
                          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-400 sm:px-3 sm:text-xs">
                            AI Score{" "}
                            {result.score}%
                          </div>

                          <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-purple-400 sm:px-3 sm:text-xs">
                            Viral {result.viral}/100
                          </div>

                          <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-blue-400 sm:px-3 sm:text-xs">
                            Engagement{" "}
                            {result.engagement}/100
                          </div>
                        </div>
                      </div>

                      {/* TITLE */}

                      <h3 className="mt-4 break-words text-xl font-bold leading-tight text-white sm:text-2xl">
                        {result.title}
                      </h3>

                      {/* HOOK */}

                      <div className="mt-4 overflow-hidden rounded-xl border border-purple-500/20 bg-purple-500/[0.06] p-3.5 sm:mt-5 sm:p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Sparkles
                            size={15}
                            className="shrink-0 text-purple-400"
                          />

                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 sm:text-xs">
                            Hook
                          </span>
                        </div>

                        <p className="break-words text-sm leading-6 text-slate-200">
                          {result.hook}
                        </p>
                      </div>

                      {/* CONTENT */}

                      <div className="mt-3 grid min-w-0 gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
                        <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#080D18] p-3.5 sm:p-4">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-blue-400 sm:text-xs">
                            Concept
                          </p>

                          <p className="break-words text-sm leading-6 text-slate-300">
                            {result.concept}
                          </p>
                        </div>

                        <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#080D18] p-3.5 sm:p-4">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-cyan-400 sm:text-xs">
                            Structure
                          </p>

                          <p className="break-words text-sm leading-6 text-slate-300">
                            {result.structure}
                          </p>
                        </div>

                        <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#080D18] p-3.5 sm:p-4 md:col-span-2">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400 sm:text-xs">
                            CTA
                          </p>

                          <p className="break-words text-sm leading-6 text-slate-300">
                            {result.cta}
                          </p>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/5 pt-3 sm:mt-5 sm:pt-4">
                        {/* COPY */}

                        <button
                          type="button"
                          onClick={() =>
                            copyIdea(
                              result,
                              index
                            )
                          }
                          disabled={
                            isRegenerating
                          }
                          title="Copy Idea"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {copiedIndex ===
                          index ? (
                            <Check size={17} />
                          ) : (
                            <Copy size={17} />
                          )}
                        </button>

                        {/* FAVORITE */}

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
                          title={
                            result.favorite
                              ? "Remove Favorite"
                              : "Add to Favorites"
                          }
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            result.favorite
                              ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
                              : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400"
                          }`}
                        >
                          <Heart
                            size={17}
                            fill={
                              result.favorite
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>

                        {/* INDIVIDUAL REGENERATE */}

                        <button
                          type="button"
                          onClick={() =>
                            regenerateIdea(
                              index
                            )
                          }
                          disabled={
                            isRegenerating ||
                            loading ||
                            credits <
                              REGENERATE_CREDIT_COST
                          }
                          title={`Regenerate Idea • ${REGENERATE_CREDIT_COST} Credits`}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <RefreshCcw
                            size={17}
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
                }
              )}
            </div>
          )}

          {/* DISCLAIMER */}

          {results.length > 0 && (
            <p className="mt-4 px-2 text-center text-[10px] leading-5 text-slate-600 sm:mt-5 sm:text-xs">
              Viral Potential and Engagement are AI estimates,
              not real-time analytics or guarantees.
            </p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}