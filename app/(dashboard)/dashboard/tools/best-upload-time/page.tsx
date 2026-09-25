"use client";

import { useEffect, useState } from "react";
import {
  Wand2,
  Copy,
  RefreshCcw,
  Sparkles,
  Heart,
  Clock,
  CalendarDays,
  Target,
  TrendingUp,
} from "lucide-react";
import ToolLayout from "@/components/ai-tools/ToolLayout";
import {
  buildUploadTimePrompt,
  type UploadTimePromptOptions,
} from "@/lib/prompts/uploadTime";

type UploadTimeResult = {
  day: string;
  time: string;
  timezone: string;
  score: number;
  audienceActivity: number;
  competition: number;
  reason: string;
  recommendation: string;
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

const audiences = [
  "Everyone",
  "Kids",
  "Teens",
  "Young Adults",
  "Adults",
  "Professionals",
  "Students",
  "Content Creators",
];

const timezones = [
  "Auto Detect",
  "Asia/Dhaka",
  "Asia/Kolkata",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Singapore",
  "Australia/Sydney",
];

const uploadCounts = ["5", "7", "10"];

const REGENERATE_CREDIT_COST = 2;

// ============================================================
// CREDIT COST
// Must match lib/billing/credits.ts
// ============================================================

const getUploadTimeCreditCost = (count: string): number => {
  switch (count) {
    case "5":
      return 2;

    case "7":
      return 3;

    case "10":
      return 5;

    default:
      return 3;
  }
};

// ============================================================
// HELPERS
// ============================================================

const clampScore = (value: unknown): number => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(number)));
};

const normalizeRecommendation = (
  day: string,
  time: string,
  timezone: string
): string => {
  return `${day}|${time}|${timezone}`
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
};

// ============================================================
// PAGE
// ============================================================

export default function BestUploadTimePage() {
  // ============================================================
  // FORM STATE
  // ============================================================

  const [topic, setTopic] = useState("");

  const [language, setLanguage] =
    useState("🌐 Auto Detect");

  const [category, setCategory] =
    useState("General");

  const [audience, setAudience] =
    useState("Everyone");

  const [timezone, setTimezone] =
    useState("Auto Detect");

  const [uploadCount, setUploadCount] =
    useState("7");

  const [creativity, setCreativity] =
    useState(60);

  // ============================================================
  // CREDIT STATE
  // ============================================================

  const [credits, setCredits] = useState(0);

  // ============================================================
  // RESULT STATE
  // ============================================================

  const [results, setResults] =
    useState<UploadTimeResult[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [regeneratingIndex, setRegeneratingIndex] =
    useState<number | null>(null);

  const [copiedIndex, setCopiedIndex] =
    useState<number | null>(null);

  const [error, setError] = useState("");

  // ============================================================
  // CURRENT GENERATION COST
  // ============================================================

  const generationCreditCost =
    getUploadTimeCreditCost(uploadCount);

  // ============================================================
  // LOAD CREDITS
  // ============================================================

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const response = await fetch("/api/credits", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (response.ok && data?.success) {
          setCredits(Number(data.credits ?? 0));
        }
      } catch (error) {
        console.error(
          "Failed to load credits:",
          error
        );
      }
    };

    loadCredits();
  }, []);

  // ============================================================
  // UPDATE CREDITS FROM API RESPONSE
  // ============================================================

  const updateCreditsFromResponse = (
    data: any
  ) => {
    if (
      typeof data?.credits === "number" &&
      Number.isFinite(data.credits)
    ) {
      setCredits(data.credits);
    }
  };

  // ============================================================
  // GENERATE UPLOAD TIMES
  // ============================================================

  const generateUploadTimes = async () => {
    if (!topic.trim() || loading) {
      return;
    }

    if (credits < generationCreditCost) {
      setError(
        `You need ${generationCreditCost} credits to generate ${uploadCount} upload time recommendations, but you only have ${credits}.`
      );
      return;
    }

    setLoading(true);
    setError("");
    setCopiedIndex(null);
    setResults([]);

    try {
      const count = Number(uploadCount);

      const promptOptions: UploadTimePromptOptions = {
        topic,
        category,
        audience,
        language,
        timezone,
        count,
      };

      const prompt =
        buildUploadTimePrompt(
          promptOptions
        );

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          json: true,
          toolId: "best-upload-time",
          count,
          action: "generate",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error ||
            "Upload time generation failed."
        );
      }

      // Server is authoritative for credits.
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

      const rawResults = Array.isArray(
        parsed?.results
      )
        ? parsed.results
        : [];

      const seen = new Set<string>();

      const uploadTimes: UploadTimeResult[] =
        rawResults
          .map((item: any) => {
            const day = String(
              item?.day ?? ""
            ).trim();

            const time = String(
              item?.time ?? ""
            ).trim();

            const resultTimezone = String(
              item?.timezone ??
                timezone ??
                "Auto Detect"
            ).trim();

            return {
              day,
              time,
              timezone: resultTimezone,

              score: clampScore(
                item?.score
              ),

              audienceActivity: clampScore(
                item?.audienceActivity
              ),

              competition: clampScore(
                item?.competition
              ),

              reason: String(
                item?.reason ?? ""
              ).trim(),

              recommendation: String(
                item?.recommendation ?? ""
              ).trim(),

              favorite: false,
            };
          })
          .filter(
            (item: UploadTimeResult) => {
              if (
                !item.day ||
                !item.time
              ) {
                return false;
              }

              const normalized =
                normalizeRecommendation(
                  item.day,
                  item.time,
                  item.timezone
                );

              if (seen.has(normalized)) {
                return false;
              }

              seen.add(normalized);

              return true;
            }
          )
          .slice(0, count)
          .sort(
            (
              a: UploadTimeResult,
              b: UploadTimeResult
            ) => b.score - a.score
          );

      if (!uploadTimes.length) {
        throw new Error(
          "No upload time recommendations were returned. Please try again."
        );
      }

      if (uploadTimes.length < count) {
        throw new Error(
          `AI returned only ${uploadTimes.length} unique recommendations instead of ${count}. Please try again.`
        );
      }

      // Replace results only after successful generation.
      setResults(uploadTimes);
    } catch (error: any) {
      console.error(
        "Best Upload Time Error:",
        error
      );

      setError(
        error?.message ||
          "Failed to generate upload times. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // REGENERATE SINGLE UPLOAD TIME
  // Cost = 2 Credits
  // ============================================================

  const regenerateUploadTime = async (
    index: number
  ) => {
    if (
      loading ||
      regeneratingIndex !== null
    ) {
      return;
    }

    const current = results[index];

    if (!current) {
      return;
    }

    if (
      credits <
      REGENERATE_CREDIT_COST
    ) {
      setError(
        `You need ${REGENERATE_CREDIT_COST} credits to regenerate an upload time, but you only have ${credits}.`
      );
      return;
    }

    setRegeneratingIndex(index);
    setError("");
    setCopiedIndex(null);

    try {
      const existingRecommendations =
        results
          .map(
            (item) =>
              `${item.day} at ${item.time} (${item.timezone})`
          )
          .join(", ");

      const prompt = `
Generate ONE alternative YouTube upload time recommendation.

Topic:
${topic.trim()}

Language:
${language}

Category:
${category}

Target Audience:
${audience}

Timezone:
${timezone}

Current Recommendation:
${current.day} at ${current.time} (${current.timezone})

Other Existing Recommendations:
${existingRecommendations}

Requirements:

1. Generate exactly ONE alternative recommendation.
2. The new day/time combination MUST be different from the current recommendation.
3. Do not duplicate any existing recommendation.
4. Use a realistic YouTube publishing time.
5. Consider the target audience.
6. Consider the content category.
7. Use 12-hour time format.
8. Clearly state the timezone.
9. Scores are AI estimates only.
10. Do not claim access to actual YouTube Analytics.
11. Do not guarantee performance.
12. score must be a JSON number from 70 to 99.
13. audienceActivity must be a JSON number from 70 to 99.
14. competition must be a JSON number from 1 to 100.
15. reason must be a string.
16. recommendation must be a string.
17. Do not add extra fields.
18. Do not use markdown.
19. Do not add explanations outside JSON.

Return ONLY valid JSON.

Use exactly this structure:

{
  "day": "Thursday",
  "time": "8:00 PM",
  "timezone": "Asia/Dhaka",
  "score": 94,
  "audienceActivity": 91,
  "competition": 55,
  "reason": "Evening viewers are generally more available for this type of content.",
  "recommendation": "A strong estimated publishing window for the target audience."
}
`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          json: true,
          toolId: "best-upload-time",
          count: 1,
          action: "regenerate",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error ||
            "Regeneration failed."
        );
      }

      // Server is authoritative for credits.
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

      const newResult: UploadTimeResult = {
        day: String(
          parsed?.day ?? ""
        ).trim(),

        time: String(
          parsed?.time ?? ""
        ).trim(),

        timezone: String(
          parsed?.timezone ??
            timezone ??
            "Auto Detect"
        ).trim(),

        score: clampScore(
          parsed?.score
        ),

        audienceActivity: clampScore(
          parsed?.audienceActivity
        ),

        competition: clampScore(
          parsed?.competition
        ),

        reason: String(
          parsed?.reason ?? ""
        ).trim(),

        recommendation: String(
          parsed?.recommendation ?? ""
        ).trim(),

        favorite: current.favorite,
      };

      if (
        !newResult.day ||
        !newResult.time
      ) {
        throw new Error(
          "AI returned an invalid upload time. Please try again."
        );
      }

      const normalizedNew =
        normalizeRecommendation(
          newResult.day,
          newResult.time,
          newResult.timezone
        );

      const duplicate = results.some(
        (item, i) => {
          if (i === index) {
            return false;
          }

          const normalizedExisting =
            normalizeRecommendation(
              item.day,
              item.time,
              item.timezone
            );

          return (
            normalizedExisting ===
            normalizedNew
          );
        }
      );

      if (duplicate) {
        throw new Error(
          "AI returned an existing upload time. Please try again."
        );
      }

      setResults((currentResults) => {
        const updated =
          currentResults.map(
            (item, i) =>
              i === index
                ? newResult
                : item
          );

        return [...updated].sort(
          (
            a: UploadTimeResult,
            b: UploadTimeResult
          ) => b.score - a.score
        );
      });
    } catch (error: any) {
      console.error(
        "Regenerate Upload Time Error:",
        error
      );

      setError(
        error?.message ||
          "Failed to regenerate upload time. Please try again."
      );
    } finally {
      setRegeneratingIndex(null);
    }
  };

  // ============================================================
  // FAVORITE
  // ============================================================

  const toggleFavorite = (
    index: number
  ) => {
    setResults((current) =>
      current.map((item, i) =>
        i === index
          ? {
              ...item,
              favorite:
                !item.favorite,
            }
          : item
      )
    );
  };

  // ============================================================
  // COPY SINGLE RESULT
  // ============================================================

  const copyResult = async (
    item: UploadTimeResult,
    index: number
  ) => {
    const text = `${item.day} — ${item.time} (${item.timezone})
Score: ${item.score}
Audience Activity: ${item.audienceActivity}
Competition: ${item.competition}
Reason: ${item.reason}
Recommendation: ${item.recommendation}`;

    try {
      await navigator.clipboard.writeText(
        text
      );

      setCopiedIndex(index);
      setError("");

      setTimeout(() => {
        setCopiedIndex((current) =>
          current === index
            ? null
            : current
        );
      }, 1800);
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );

      setError(
        "Failed to copy recommendation."
      );
    }
  };

  // ============================================================
  // COPY ALL RESULTS
  // ============================================================

  const copyAllResults = async () => {
    if (!results.length) {
      return;
    }

    const text = results
      .map(
        (item, index) =>
          `${index + 1}. ${item.day} — ${item.time} (${item.timezone})
Score: ${item.score}
Audience Activity: ${item.audienceActivity}
Competition: ${item.competition}
Reason: ${item.reason}
Recommendation: ${item.recommendation}`
      )
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(
        text
      );

      setCopiedIndex(-1);
      setError("");

      setTimeout(() => {
        setCopiedIndex((current) =>
          current === -1
            ? null
            : current
        );
      }, 1800);
    } catch (error) {
      console.error(
        "Copy all failed:",
        error
      );

      setError(
        "Failed to copy upload times."
      );
    }
  };

  // ============================================================
  // BEST RESULT
  // Results are already sorted by score.
  // ============================================================

  const bestIndex =
    results.length > 0 ? 0 : -1;

  // ============================================================
  // UI
  // ============================================================

  return (
    <ToolLayout
      title="AI Best Upload Time"
      description="Find the best estimated YouTube upload times for your audience powered by AI."
    >
      <div className="grid min-w-0 gap-5 sm:gap-6 lg:gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">

        {/* ======================================================
            LEFT SIDE
        ====================================================== */}

        <div className="min-w-0 rounded-2xl border border-white/10 bg-[#050814] p-4 sm:rounded-3xl sm:p-6">

          {/* Header */}

          <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Upload Time Analyzer
            </h2>

            <span className="shrink-0 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
              {credits} Credits
            </span>
          </div>

          {/* Topic */}

          <div className="mb-5">
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
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder:text-slate-600 sm:rounded-2xl sm:px-4"
            />
          </div>

          {/* Language */}

          <div className="mb-5">
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
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            >
              {languages.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Category */}

          <div className="mb-5">
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
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            >
              {categories.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Audience */}

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Target Audience
            </label>

            <select
              value={audience}
              onChange={(e) =>
                setAudience(
                  e.target.value
                )
              }
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            >
              {audiences.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Timezone */}

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Timezone
            </label>

            <select
              value={timezone}
              onChange={(e) =>
                setTimezone(
                  e.target.value
                )
              }
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            >
              {timezones.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Recommendation Count */}

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Recommendation Count
            </label>

            <select
              value={uploadCount}
              onChange={(e) => {
                setUploadCount(
                  e.target.value
                );

                if (error) {
                  setError("");
                }
              }}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            >
              {uploadCounts.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item} Recommendations •{" "}
                    {getUploadTimeCreditCost(
                      item
                    )} Credits
                  </option>
                )
              )}
            </select>
          </div>

          {/* Creativity */}

          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between gap-3">
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
              value={creativity}
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

          {/* Credit Info */}

          <div className="mb-5 rounded-xl border border-blue-500/10 bg-blue-500/[0.04] px-3.5 py-3 text-xs leading-5 text-slate-400">
            {uploadCount} recommendations ={" "}
            <span className="font-semibold text-blue-400">
              {generationCreditCost} credits
            </span>

            <br />

            Single regeneration ={" "}
            <span className="font-semibold text-blue-400">
              {REGENERATE_CREDIT_COST} credits
            </span>
          </div>

          {/* Error */}

          {error && (
            <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="break-words text-xs leading-5 text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Generate */}

          <button
            type="button"
            onClick={
              generateUploadTimes
            }
            disabled={
              !topic.trim() ||
              loading ||
              regeneratingIndex !==
                null ||
              credits <
                generationCreditCost
            }
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:from-blue-500 hover:to-purple-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-2xl"
          >
            {loading ? (
              <>
                <RefreshCcw
                  size={18}
                  className="animate-spin"
                />

                Analyzing...
              </>
            ) : (
              <>
                <Wand2 size={18} />

                Find Best Times •{" "}
                {generationCreditCost} Credits
              </>
            )}
          </button>
        </div>

        {/* ======================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="min-w-0 rounded-2xl border border-white/10 bg-[#050814] p-4 sm:rounded-3xl sm:p-6">

          {/* Header */}

          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Recommended Upload Times
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                AI-estimated publishing opportunities for your audience.
              </p>
            </div>

            {results.length > 0 && (
              <div className="flex w-full items-center gap-2 sm:w-auto">

                {/* Copy All */}

                <button
                  type="button"
                  onClick={
                    copyAllResults
                  }
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500/40 hover:text-white sm:flex-none sm:px-4 sm:text-sm"
                >
                  {copiedIndex ===
                  -1 ? (
                    <span className="text-emerald-400">
                      Copied!
                    </span>
                  ) : (
                    <>
                      <Copy size={15} />
                      Copy All
                    </>
                  )}
                </button>

                {/* Generate Again */}

                <button
                  type="button"
                  onClick={
                    generateUploadTimes
                  }
                  disabled={
                    loading ||
                    regeneratingIndex !==
                      null ||
                    credits <
                      generationCreditCost
                  }
                  title={`Generate Again • ${generationCreditCost} Credits`}
                  aria-label="Generate Again"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B1220] text-slate-300 transition hover:border-blue-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCcw
                    size={17}
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

          {/* Error */}

          {error && results.length > 0 && (
            <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="break-words text-xs leading-5 text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Empty State */}

          {results.length === 0 &&
            !loading && (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-4 text-center sm:min-h-[520px]">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 sm:h-16 sm:w-16">
                  <Clock
                    size={28}
                    className="text-blue-400 sm:h-[30px] sm:w-[30px]"
                  />
                </div>

                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  No Upload Times Yet
                </h3>

                <p className="mt-2 max-w-md text-xs leading-6 text-slate-500 sm:text-sm">
                  Enter your topic and click Find Best Times to get AI-estimated upload recommendations.
                </p>
              </div>
            )}

          {/* Loading */}

          {loading &&
            results.length === 0 && (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-4 text-center sm:min-h-[520px]">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 ring-1 ring-purple-500/20 sm:h-16 sm:w-16">
                  <Sparkles
                    size={28}
                    className="animate-pulse text-purple-400 sm:h-[30px] sm:w-[30px]"
                  />
                </div>

                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  Analyzing Best Times...
                </h3>

                <p className="mt-2 max-w-md text-xs leading-6 text-slate-500 sm:text-sm">
                  AI is analyzing your audience, category, and content topic.
                </p>
              </div>
            )}

          {/* Results */}

          {results.length > 0 && (
            <div className="space-y-4">

              {results.map(
                (item, index) => {
                  const isBest =
                    index === bestIndex;

                  const isRegenerating =
                    regeneratingIndex ===
                    index;

                  return (
                    <div
                      key={`${item.day}-${item.time}-${item.timezone}-${index}`}
                      className={`min-w-0 overflow-hidden rounded-2xl border bg-[#0B1220] p-4 transition-all duration-300 sm:p-5 ${
                        isBest
                          ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                          : "border-white/10 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
                      }`}
                    >

                      {/* Top */}

                      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div className="min-w-0 flex-1">

                          <div className="mb-3 flex flex-wrap items-center gap-2">

                            {isBest && (
                              <span className="rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-400 ring-1 ring-blue-500/20 sm:text-[11px]">
                                BEST
                              </span>
                            )}

                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-400 sm:text-[11px]">
                              Recommendation #
                              {index + 1}
                            </span>
                          </div>

                          {/* Day + Time */}

                          <div className="flex min-w-0 flex-col items-start gap-3 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center">

                            <div className="flex min-w-0 items-center gap-2">
                              <CalendarDays
                                size={19}
                                className="shrink-0 text-blue-400"
                              />

                              <h3 className="break-words text-lg font-bold text-white sm:text-xl">
                                {item.day}
                              </h3>
                            </div>

                            <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2">
                              <Clock
                                size={16}
                                className="shrink-0 text-blue-400"
                              />

                              <span className="break-words text-base font-bold text-blue-400 sm:text-lg">
                                {item.time}
                              </span>
                            </div>
                          </div>

                          <p className="mt-2 break-words text-[11px] leading-5 text-slate-500 sm:text-xs">
                            Timezone:{" "}
                            {item.timezone}
                          </p>
                        </div>

                        {/* Actions */}

                        <div className="flex shrink-0 items-center justify-end gap-1">

                          {/* Copy */}

                          <button
                            type="button"
                            onClick={() =>
                              copyResult(
                                item,
                                index
                              )
                            }
                            title={
                              copiedIndex ===
                              index
                                ? "Copied!"
                                : "Copy Recommendation"
                            }
                            aria-label="Copy Recommendation"
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white"
                          >
                            {copiedIndex ===
                            index ? (
                              <span className="text-[9px] font-semibold text-emerald-400">
                                Copied
                              </span>
                            ) : (
                              <Copy
                                size={17}
                              />
                            )}
                          </button>

                          {/* Favorite */}

                          <button
                            type="button"
                            onClick={() =>
                              toggleFavorite(
                                index
                              )
                            }
                            title={
                              item.favorite
                                ? "Remove Favorite"
                                : "Add Favorite"
                            }
                            aria-label={
                              item.favorite
                                ? "Remove Favorite"
                                : "Add Favorite"
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-pink-400"
                          >
                            <Heart
                              size={17}
                              className={
                                item.favorite
                                  ? "fill-pink-500 text-pink-500"
                                  : ""
                              }
                            />
                          </button>

                          {/* Regenerate */}

                          <button
                            type="button"
                            onClick={() =>
                              regenerateUploadTime(
                                index
                              )
                            }
                            disabled={
                              loading ||
                              regeneratingIndex !==
                                null ||
                              credits <
                                REGENERATE_CREDIT_COST
                            }
                            title={`Regenerate Time • ${REGENERATE_CREDIT_COST} Credits`}
                            aria-label="Regenerate Time"
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
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

                      {/* Scores */}

                      <div className="mt-5 grid grid-cols-1 gap-3 min-[360px]:grid-cols-3">

                        <div className="min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3">
                          <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                            <Sparkles size={13} />

                            <span>
                              AI Score
                            </span>
                          </div>

                          <div className="text-lg font-bold text-blue-400">
                            {item.score}
                          </div>
                        </div>

                        <div className="min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3">
                          <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                            <Target size={13} />

                            <span>
                              Audience Activity
                            </span>
                          </div>

                          <div className="text-lg font-bold text-purple-400">
                            {item.audienceActivity}
                          </div>
                        </div>

                        <div className="min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3">
                          <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                            <TrendingUp size={13} />

                            <span>
                              Competition
                            </span>
                          </div>

                          <div className="text-lg font-bold text-emerald-400">
                            {item.competition}
                          </div>
                        </div>
                      </div>

                      {/* Reason */}

                      <div className="mt-4 min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3.5 sm:p-4">
                        <p className="break-words text-xs leading-6 text-slate-400 sm:text-sm">
                          <span className="font-semibold text-slate-300">
                            Why this time:
                          </span>{" "}
                          {item.reason}
                        </p>
                      </div>

                      {/* Recommendation */}

                      {item.recommendation && (
                        <div className="mt-3 min-w-0 rounded-xl border border-blue-500/10 bg-blue-500/[0.04] p-3.5 sm:p-4">
                          <p className="break-words text-xs leading-6 text-slate-400 sm:text-sm">
                            <span className="font-semibold text-blue-400">
                              Recommendation:
                            </span>{" "}
                            {item.recommendation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                }
              )}

              {/* Disclaimer */}

              <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/5 px-4 py-4 sm:px-5">
                <p className="break-words text-[11px] leading-5 text-slate-500 sm:text-xs">
                  <span className="font-semibold text-yellow-400">
                    Note:
                  </span>{" "}
                  Upload time scores are AI-generated estimates based on general audience behavior, content category, and target audience. They are not based on your actual YouTube Analytics and do not guarantee higher views, engagement, or rankings. For the most accurate timing, compare these recommendations with your YouTube Analytics data.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}