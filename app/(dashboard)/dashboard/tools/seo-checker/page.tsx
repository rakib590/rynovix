"use client";

import { useState } from "react";
import {
  Copy,
  RefreshCcw,
  Sparkles,
  Search,
  Check,
  AlertCircle,
  TrendingUp,
  FileText,
  Target,
  BarChart3,
} from "lucide-react";
import ToolLayout from "@/components/ai-tools/ToolLayout";

type SEOResult = {
  overallScore: number;
  titleScore: number;
  descriptionScore: number;
  keywordScore: number;
  searchIntentScore: number;
  readabilityScore: number;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
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

const clamp = (value: number) =>
  Math.max(0, Math.min(100, Number(value) || 0));

const sanitizeResult = (item: any): SEOResult => ({
  overallScore: clamp(item?.overallScore),
  titleScore: clamp(item?.titleScore),
  descriptionScore: clamp(item?.descriptionScore),
  keywordScore: clamp(item?.keywordScore),
  searchIntentScore: clamp(item?.searchIntentScore),
  readabilityScore: clamp(item?.readabilityScore),

  strengths: Array.isArray(item?.strengths)
    ? item.strengths
        .map((value: any) => String(value).trim())
        .filter(Boolean)
    : [],

  improvements: Array.isArray(item?.improvements)
    ? item.improvements
        .map((value: any) => String(value).trim())
        .filter(Boolean)
    : [],

  recommendations: Array.isArray(item?.recommendations)
    ? item.recommendations
        .map((value: any) => String(value).trim())
        .filter(Boolean)
    : [],
});

export default function SEOCheckerPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const [language, setLanguage] = useState("🌐 Auto Detect");
  const [category, setCategory] = useState("General");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [result, setResult] = useState<SEOResult | null>(null);
  const [copied, setCopied] = useState(false);

  const buildPrompt = () => {
    return `
You are an expert YouTube SEO strategist and content optimization consultant.

Analyze the user's YouTube video information and provide a detailed SEO evaluation.

USER INPUT

Video Title:
${title.trim() || "Not provided"}

Video Description:
${description.trim() || "Not provided"}

Keywords:
${keywords.trim() || "Not provided"}

Language:
${language}

Category:
${category}

IMPORTANT LANGUAGE RULES:
1. If Language is "🌐 Auto Detect", detect the primary language of the user's input.
2. If a specific Language is selected, write recommendations primarily in that language.
3. বাংলা must use Bengali script.
4. हिन्दी must use Devanagari script.
5. English must be natural fluent English.
6. Spanish, French, German and Arabic must be natural and fluent.
7. Do not translate word-for-word.
8. Recommendations should sound natural for the selected language.

SEO ANALYSIS REQUIREMENTS:

Analyze these areas:

1. Overall SEO Score
Give an estimated overall SEO quality score from 0–100.

2. Title Score
Evaluate:
- Keyword relevance
- Search intent
- Clarity
- Topic alignment
- Natural wording
- Potential discoverability
- Appropriate title length

3. Description Score
Evaluate:
- Keyword usage
- Topic relevance
- Natural language
- Useful information
- Search context
- Readability
- Description structure

4. Keyword Score
Evaluate:
- Keyword relevance
- Keyword coverage
- Search intent
- Specificity
- Long-tail keyword opportunities
- Natural keyword usage

5. Search Intent Score
Evaluate whether the title, description and keywords clearly match what a viewer may search for.

6. Readability Score
Evaluate:
- Clarity
- Simplicity
- Sentence structure
- Easy scanning
- Natural wording

IMPORTANT:
- Do NOT claim access to YouTube's private analytics.
- Do NOT claim real-time YouTube search volume.
- Do NOT claim exact ranking positions.
- Do NOT guarantee views, clicks or rankings.
- These are AI-based SEO estimates only.
- Do not invent real-time statistics.
- Be practical and useful.
- Avoid keyword stuffing.
- Avoid misleading clickbait.

STRENGTHS:
Provide 3–5 specific strengths.

IMPROVEMENTS:
Provide 3–5 specific areas that could be improved.

RECOMMENDATIONS:
Provide 5–8 practical recommendations.
Recommendations should be specific to the user's actual title, description and keywords.

IMPORTANT:
Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside JSON.

Required JSON format:

{
  "overallScore": 85,
  "titleScore": 88,
  "descriptionScore": 82,
  "keywordScore": 84,
  "searchIntentScore": 90,
  "readabilityScore": 86,
  "strengths": [
    "Clear and relevant video title",
    "Strong topic alignment",
    "Natural keyword usage"
  ],
  "improvements": [
    "Add a stronger primary keyword",
    "Improve the opening of the description",
    "Use more specific long-tail keywords"
  ],
  "recommendations": [
    "Place the primary keyword naturally near the beginning of the title",
    "Make the first two lines of the description more informative",
    "Add relevant long-tail keyword variations",
    "Avoid repeating the same keyword too often",
    "Make the title closely match the viewer's search intent"
  ]
}
`;
  };

  const checkSEO = async () => {
    if (!title.trim() && !description.trim() && !keywords.trim()) {
      setError("Please enter a title, description or keywords first.");
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: buildPrompt(),
          json: true,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to analyze SEO.");
      }

      let parsed: any;

      try {
        parsed =
          typeof data.result === "string"
            ? JSON.parse(data.result)
            : data.result;
      } catch {
        throw new Error("AI returned invalid JSON. Please try again.");
      }

      const seoResult = sanitizeResult(parsed);

      setResult(seoResult);
    } catch (err: any) {
      console.error("SEO CHECKER ERROR:", err);
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Needs Improvement";
    return "Needs Work";
  };

  const copyReport = async () => {
    if (!result) return;

    try {
      const report = `
RYNOVIX AI SEO CHECKER REPORT

Overall SEO Score: ${result.overallScore}/100
Status: ${getScoreLabel(result.overallScore)}

Title SEO: ${result.titleScore}/100
Description SEO: ${result.descriptionScore}/100
Keyword Optimization: ${result.keywordScore}/100
Search Intent: ${result.searchIntentScore}/100
Readability: ${result.readabilityScore}/100

STRENGTHS
${result.strengths
  .map((item, index) => `${index + 1}. ${item}`)
  .join("\n")}

IMPROVEMENTS
${result.improvements
  .map((item, index) => `${index + 1}. ${item}`)
  .join("\n")}

RECOMMENDATIONS
${result.recommendations
  .map((item, index) => `${index + 1}. ${item}`)
  .join("\n")}

Note:
SEO scores are AI estimates and are not real-time YouTube analytics,
search volume data, ranking positions, or guarantees.
      `.trim();

      await navigator.clipboard.writeText(report);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setError("Failed to copy SEO report.");
    }
  };

  const getScoreBarClass = (score: number) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 75) return "bg-blue-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <ToolLayout
      title="AI SEO Checker"
      description="Analyze your YouTube title, description and keywords with AI-powered SEO insights."
    >
      <div className="grid min-w-0 gap-6 sm:gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
        {/* =========================================================
            LEFT - SEO INPUT
        ========================================================== */}
        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">
          <h2 className="mb-6 text-xl font-bold text-white">
            SEO Checker
          </h2>

          {/* Title */}
          <div className="min-w-0">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Video Title
            </label>

            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 10 Best AI Tools for YouTube Creators"
              rows={3}
              className="box-border w-full min-w-0 resize-none rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 placeholder:text-slate-600"
            />

            <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-600">
              <span>Keep your title clear and relevant</span>
              <span>{title.length} chars</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5 min-w-0">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Video Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste your YouTube video description here..."
              rows={7}
              className="box-border w-full min-w-0 resize-none rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 placeholder:text-slate-600"
            />

            <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-600">
              <span>Use natural and useful information</span>
              <span>{description.length} chars</span>
            </div>
          </div>

          {/* Keywords */}
          <div className="mt-5 min-w-0">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Keywords
            </label>

            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. AI tools, YouTube AI, AI tools for creators"
              className="box-border w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 placeholder:text-slate-600"
            />
          </div>

          {/* Language */}
          <div className="mt-5 min-w-0">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Language
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="box-border w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500/60"
            >
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="mt-5 min-w-0">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="box-border w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500/60"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 flex min-w-0 gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span className="min-w-0 break-words">
                {error}
              </span>
            </div>
          )}

          {/* Check Button */}
          <button
            onClick={checkSEO}
            disabled={
              loading ||
              (!title.trim() &&
                !description.trim() &&
                !keywords.trim())
            }
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
                <Search size={18} />
                Check SEO
              </>
            )}
          </button>
        </div>

        {/* =========================================================
            RIGHT - RESULTS
        ========================================================== */}
        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">
          {/* Results Header */}
          <div className="mb-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-white">
                SEO Analysis
              </h2>

              <p className="mt-1 break-words text-sm text-slate-500">
                AI-powered optimization insights for your video
              </p>
            </div>

            {result && (
              <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
                <button
                  onClick={copyReport}
                  className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white sm:flex-none"
                >
                  {copied ? (
                    <Check size={15} />
                  ) : (
                    <Copy size={15} />
                  )}

                  <span className="truncate">
                    {copied ? "Copied" : "Copy Report"}
                  </span>
                </button>

                <button
                  onClick={checkSEO}
                  disabled={loading}
                  title="Check Again"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white disabled:opacity-50"
                >
                  <RefreshCcw
                    size={16}
                    className={
                      loading ? "animate-spin" : ""
                    }
                  />
                </button>
              </div>
            )}
          </div>

          {/* Empty State */}
          {!result ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 py-12 sm:h-[600px]">
              <Search
                size={42}
                className="text-blue-400"
              />

              <h3 className="mt-5 text-center text-xl font-semibold text-white">
                No SEO Analysis Yet
              </h3>

              <p className="mt-2 max-w-md text-center text-sm leading-6 text-slate-400">
                Enter your video title, description or
                keywords and click Check SEO.
              </p>
            </div>
          ) : (
            <div className="min-w-0 space-y-5">
              {/* =====================================================
                  Overall Score
              ====================================================== */}
              <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0B1220] p-5 sm:p-6">
                <div className="flex min-w-0 flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 text-center sm:text-left">
                    <p className="text-sm font-medium text-slate-500">
                      Overall SEO Score
                    </p>

                    <div className="mt-2 flex items-end justify-center gap-3 sm:justify-start">
                      <span className="text-5xl font-black text-white">
                        {result.overallScore}
                      </span>

                      <span className="mb-2 text-sm text-slate-500">
                        / 100
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-blue-400">
                      {getScoreLabel(result.overallScore)}
                    </p>
                  </div>

                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-8 border-blue-500/20 bg-blue-500/10 sm:h-28 sm:w-28">
                    <div className="text-center">
                      <TrendingUp
                        size={22}
                        className="mx-auto text-blue-400"
                      />

                      <span className="mt-1 block text-xs font-semibold text-blue-300">
                        SEO
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getScoreBarClass(
                      result.overallScore
                    )}`}
                    style={{
                      width: `${result.overallScore}%`,
                    }}
                  />
                </div>
              </div>

              {/* =====================================================
                  Score Cards
              ====================================================== */}
              <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                {/* Title Score */}
                <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0B1220] p-5">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                        <Sparkles
                          size={19}
                          className="text-blue-400"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          Title SEO
                        </p>

                        <p className="truncate text-xs text-slate-600">
                          Title optimization
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-lg font-bold text-blue-400">
                      {result.titleScore}
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${getScoreBarClass(
                        result.titleScore
                      )}`}
                      style={{
                        width: `${result.titleScore}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Description Score */}
                <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0B1220] p-5">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                        <FileText
                          size={19}
                          className="text-purple-400"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          Description SEO
                        </p>

                        <p className="truncate text-xs text-slate-600">
                          Description optimization
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-lg font-bold text-purple-400">
                      {result.descriptionScore}
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${getScoreBarClass(
                        result.descriptionScore
                      )}`}
                      style={{
                        width: `${result.descriptionScore}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Keyword Score */}
                <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0B1220] p-5">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                        <Target
                          size={19}
                          className="text-emerald-400"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          Keyword Optimization
                        </p>

                        <p className="truncate text-xs text-slate-600">
                          Keyword relevance
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-lg font-bold text-emerald-400">
                      {result.keywordScore}
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${getScoreBarClass(
                        result.keywordScore
                      )}`}
                      style={{
                        width: `${result.keywordScore}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Search Intent */}
                <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0B1220] p-5">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                        <Search
                          size={19}
                          className="text-cyan-400"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          Search Intent
                        </p>

                        <p className="truncate text-xs text-slate-600">
                          Query alignment
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-lg font-bold text-cyan-400">
                      {result.searchIntentScore}
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${getScoreBarClass(
                        result.searchIntentScore
                      )}`}
                      style={{
                        width: `${result.searchIntentScore}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Readability */}
                <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0B1220] p-5 sm:col-span-2">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                        <BarChart3
                          size={19}
                          className="text-amber-400"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          Readability
                        </p>

                        <p className="truncate text-xs text-slate-600">
                          Clarity and easy scanning
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-lg font-bold text-amber-400">
                      {result.readabilityScore}
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${getScoreBarClass(
                        result.readabilityScore
                      )}`}
                      style={{
                        width: `${result.readabilityScore}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* =====================================================
                  Strengths
              ====================================================== */}
              <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0B1220] p-5 sm:p-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Check
                      size={20}
                      className="text-emerald-400"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white">
                      SEO Strengths
                    </h3>

                    <p className="text-xs text-slate-600">
                      What is already working well
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {result.strengths.length > 0 ? (
                    result.strengths.map((item, index) => (
                      <div
                        key={`${index}-${item}`}
                        className="flex min-w-0 gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3"
                      >
                        <Check
                          size={17}
                          className="mt-0.5 shrink-0 text-emerald-400"
                        />

                        <p className="min-w-0 break-words text-sm leading-6 text-slate-300">
                          {item}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No specific strengths were returned.
                    </p>
                  )}
                </div>
              </div>

              {/* =====================================================
                  Improvements
              ====================================================== */}
              <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0B1220] p-5 sm:p-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <AlertCircle
                      size={20}
                      className="text-amber-400"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white">
                      Areas to Improve
                    </h3>

                    <p className="text-xs text-slate-600">
                      SEO issues worth improving
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {result.improvements.length > 0 ? (
                    result.improvements.map((item, index) => (
                      <div
                        key={`${index}-${item}`}
                        className="flex min-w-0 gap-3 rounded-xl border border-amber-500/10 bg-amber-500/5 px-4 py-3"
                      >
                        <AlertCircle
                          size={17}
                          className="mt-0.5 shrink-0 text-amber-400"
                        />

                        <p className="min-w-0 break-words text-sm leading-6 text-slate-300">
                          {item}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No specific improvements were returned.
                    </p>
                  )}
                </div>
              </div>

              {/* =====================================================
                  Recommendations
              ====================================================== */}
              <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0B1220] p-5 sm:p-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                    <TrendingUp
                      size={20}
                      className="text-blue-400"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white">
                      SEO Recommendations
                    </h3>

                    <p className="text-xs text-slate-600">
                      Practical ways to improve your content
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {result.recommendations.length > 0 ? (
                    result.recommendations.map((item, index) => (
                      <div
                        key={`${index}-${item}`}
                        className="flex min-w-0 gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-400">
                          {index + 1}
                        </div>

                        <p className="min-w-0 break-words text-sm leading-6 text-slate-300">
                          {item}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No recommendations were returned.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          {result && (
            <p className="mt-5 px-2 text-center text-xs leading-5 text-slate-600">
              SEO scores are AI estimates based on the provided
              content. They are not real-time YouTube analytics,
              search-volume data, ranking positions, or guarantees.
            </p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}