"use client";

import { useState } from "react";
import {
  Wand2,
  Copy,
  RefreshCcw,
  Sparkles,
  Heart,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";
import ToolLayout from "@/components/ai-tools/ToolLayout";

type KeywordResult = {
  keyword: string;
  score: number;
  searchIntent: number;
  relevance: number;
  opportunity: number;
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

const searchIntents = [
  "All Intents",
  "Informational",
  "Navigational",
  "Commercial",
  "Transactional",
];

const keywordCounts = ["10", "20", "30", "50"];

const clamp = (value: any) =>
  Math.max(0, Math.min(100, Number(value) || 0));

export default function KeywordGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [seedKeywords, setSeedKeywords] = useState("");
  const [language, setLanguage] = useState("🌐 Auto Detect");
  const [searchIntent, setSearchIntent] = useState("All Intents");
  const [category, setCategory] = useState("General");
  const [keywordCount, setKeywordCount] = useState("20");
  const [creativity, setCreativity] = useState(70);

  const [results, setResults] = useState<KeywordResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  const generateKeywords = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const prompt = `
You are an expert YouTube SEO keyword research assistant.

Generate exactly ${keywordCount} unique YouTube keywords based on the following information.

Topic:
${topic.trim()}

Seed Keywords:
${seedKeywords.trim() || "None"}

Language:
${language}

Search Intent:
${searchIntent}

Category:
${category}

Creativity:
${creativity}/100

Requirements:
- Generate exactly ${keywordCount} keywords.
- Keywords must be highly relevant to the topic.
- Mix broad keywords, niche keywords, specific keywords, long-tail keywords, and search-intent keywords.
- Keep keywords natural and useful for YouTube content.
- Avoid duplicate or nearly identical keywords.
- Do not add hashtags (#).
- Do not number the keywords.
- Do not add explanations.
- Do not claim real-time search volume.
- Do not claim actual YouTube ranking data.
- Search intent should match the selected intent when possible.
- Keywords should be written in the selected language.
- If Auto Detect is selected, determine the most appropriate language from the topic and seed keywords.
- Higher opportunity means the keyword appears to have better SEO potential based on relevance, specificity, and likely usefulness.
- This is an AI estimate, NOT real search data.

Return ONLY valid JSON in this exact structure:

{
  "results": [
    {
      "keyword": "example keyword",
      "score": 95,
      "searchIntent": 90,
      "relevance": 96,
      "opportunity": 88
    }
  ]
}

Scoring rules:
- score: overall AI keyword quality score from 70 to 99
- searchIntent: how well the keyword matches useful search intent, from 70 to 99
- relevance: topic relevance from 70 to 99
- opportunity: estimated SEO opportunity from 70 to 99
`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          json: true,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Keyword generation failed."
        );
      }

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

      const rawResults = Array.isArray(parsed?.results)
        ? parsed.results
        : [];

      const keywords: KeywordResult[] = rawResults
        .slice(0, Number(keywordCount))
        .map((item: any) => ({
          keyword: String(item?.keyword || "").trim(),
          score: clamp(item?.score),
          searchIntent: clamp(item?.searchIntent),
          relevance: clamp(item?.relevance),
          opportunity: clamp(item?.opportunity),
          favorite: false,
        }))
        .filter(
          (item: KeywordResult) =>
            item.keyword.length > 0
        )
        .sort(
          (a: KeywordResult, b: KeywordResult) =>
            b.score - a.score
        );

      if (!keywords.length) {
        throw new Error(
          "No keywords were returned. Please try again."
        );
      }

      setResults(keywords);
    } catch (error: any) {
      console.error("Keyword Generator Error:", error);
      setError(
        error?.message ||
          "Failed to generate keywords. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const regenerateKeyword = async (index: number) => {
    if (loading) return;

    const currentKeyword = results[index]?.keyword;

    if (!currentKeyword) return;

    setLoading(true);
    setError("");

    try {
      const prompt = `
Generate ONE alternative YouTube SEO keyword.

Topic:
${topic.trim()}

Seed Keywords:
${seedKeywords.trim() || "None"}

Language:
${language}

Search Intent:
${searchIntent}

Category:
${category}

Current Keyword:
${currentKeyword}

Requirements:
- Generate one completely different keyword.
- Keep it highly relevant to the topic.
- Do not duplicate the current keyword.
- Do not use hashtags.
- Prefer a useful niche, specific, long-tail, or search-intent keyword.
- Do not claim real-time search volume.
- All scores are AI estimates only.

Return ONLY valid JSON:

{
  "keyword": "new keyword",
  "score": 95,
  "searchIntent": 92,
  "relevance": 96,
  "opportunity": 90
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
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Regeneration failed."
        );
      }

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

      const keyword = String(
        parsed?.keyword || ""
      ).trim();

      if (!keyword) {
        throw new Error(
          "No alternative keyword was returned."
        );
      }

      const newKeyword: KeywordResult = {
        keyword,
        score: clamp(parsed?.score),
        searchIntent: clamp(parsed?.searchIntent),
        relevance: clamp(parsed?.relevance),
        opportunity: clamp(parsed?.opportunity),
        favorite: results[index]?.favorite || false,
      };

      setResults((current) => {
        const updated = current.map((item, i) =>
          i === index ? newKeyword : item
        );

        return updated.sort(
          (a, b) => b.score - a.score
        );
      });
    } catch (error: any) {
      console.error(
        "Regenerate Keyword Error:",
        error
      );

      setError(
        error?.message ||
          "Failed to regenerate keyword."
      );
    } finally {
      setLoading(false);
    }
  };

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

  const copyKeyword = async (
    keyword: string,
    index: number
  ) => {
    try {
      await navigator.clipboard.writeText(keyword);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
      setError("Failed to copy keyword.");
    }
  };

  const copyAllKeywords = async () => {
    if (!results.length) return;

    const text = results
      .map((item) => item.keyword)
      .join("\n");

    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(-1);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1800);
    } catch (error) {
      console.error("Copy all failed:", error);
      setError("Failed to copy keywords.");
    }
  };

  const bestIndex = results.length > 0 ? 0 : -1;

  return (
    <ToolLayout
      title="AI Keyword Generator"
      description="Generate relevant, high-potential YouTube keywords powered by AI."
    >
      <div className="grid min-w-0 gap-6 sm:gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
        {/* LEFT SIDE */}
        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">
          <h2 className="mb-5 text-lg font-bold text-white sm:mb-6 sm:text-xl">
            Keyword Generator
          </h2>

          {/* Topic */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Topic
            </label>

            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. AI tools for YouTube creators"
              rows={4}
              className="w-full resize-none rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder:text-slate-600"
            />
          </div>

          {/* Seed Keywords */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Seed Keywords
            </label>

            <input
              type="text"
              value={seedKeywords}
              onChange={(e) =>
                setSeedKeywords(e.target.value)
              }
              placeholder="e.g. AI tools, YouTube AI, creator tools"
              className="w-full rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder:text-slate-600"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Separate multiple keywords with commas.
            </p>
          </div>

          {/* Language */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Language
            </label>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            >
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Search Intent */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Search Intent
            </label>

            <select
              value={searchIntent}
              onChange={(e) =>
                setSearchIntent(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            >
              {searchIntents.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
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
                setCategory(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Keyword Count */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Keyword Count
            </label>

            <select
              value={keywordCount}
              onChange={(e) =>
                setKeywordCount(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            >
              {keywordCounts.map((item) => (
                <option key={item} value={item}>
                  {item} Keywords
                </option>
              ))}
            </select>
          </div>

          {/* Creativity */}
          <div className="mb-6">
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
              value={creativity}
              onChange={(e) =>
                setCreativity(Number(e.target.value))
              }
              className="w-full accent-blue-500"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-xs leading-5 text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateKeywords}
            disabled={!topic.trim() || loading}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:from-blue-500 hover:to-purple-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
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
                Generate Keywords
              </>
            )}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">
          {/* Header */}
          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Generated Keywords
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                AI-powered keyword suggestions for your
                content.
              </p>
            </div>

            {results.length > 0 && (
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <button
                  onClick={copyAllKeywords}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500/40 hover:text-white sm:flex-none sm:px-4 sm:text-sm"
                >
                  {copiedIndex === -1 ? (
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

                <button
                  onClick={generateKeywords}
                  disabled={loading}
                  title="Generate Again"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B1220] text-slate-300 transition hover:border-blue-500/40 hover:text-white disabled:opacity-50"
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
          {results.length === 0 && !loading && (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 text-center sm:min-h-[520px]">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20">
                <Search
                  size={30}
                  className="text-blue-400"
                />
              </div>

              <h3 className="text-lg font-semibold text-white sm:text-xl">
                No Keywords Yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Enter your topic and click Generate
                Keywords to create AI-powered keyword
                ideas.
              </p>
            </div>
          )}

          {/* Loading */}
          {loading && results.length === 0 && (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 text-center sm:min-h-[520px]">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 ring-1 ring-purple-500/20">
                <Sparkles
                  size={30}
                  className="animate-pulse text-purple-400"
                />
              </div>

              <h3 className="text-lg font-semibold text-white sm:text-xl">
                Generating Keywords...
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                AI is researching keyword opportunities
                for your topic.
              </p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((item, index) => {
                const isBest = index === bestIndex;

                return (
                  <div
                    key={`${item.keyword}-${index}`}
                    className={`min-w-0 overflow-hidden rounded-2xl border bg-[#0B1220] p-4 transition-all duration-300 sm:p-5 ${
                      isBest
                        ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                        : "border-white/10 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
                    }`}
                  >
                    {/* Top */}
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          {isBest && (
                            <span className="rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-400 ring-1 ring-blue-500/20">
                              BEST
                            </span>
                          )}

                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                            Keyword #{index + 1}
                          </span>
                        </div>

                        <h3 className="break-words text-base font-semibold leading-6 text-white sm:text-lg sm:leading-7">
                          {item.keyword}
                        </h3>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
                        <button
                          onClick={() =>
                            copyKeyword(
                              item.keyword,
                              index
                            )
                          }
                          title={
                            copiedIndex === index
                              ? "Copied!"
                              : "Copy Keyword"
                          }
                          aria-label="Copy keyword"
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white active:bg-white/10"
                        >
                          {copiedIndex === index ? (
                            <span className="text-[9px] font-semibold text-emerald-400">
                              Copied
                            </span>
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            toggleFavorite(index)
                          }
                          title={
                            item.favorite
                              ? "Remove Favorite"
                              : "Add Favorite"
                          }
                          aria-label="Favorite keyword"
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-pink-400 active:bg-white/10"
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

                        <button
                          onClick={() =>
                            regenerateKeyword(index)
                          }
                          disabled={loading}
                          title="Regenerate Keyword"
                          aria-label="Regenerate keyword"
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-blue-400 active:bg-white/10 disabled:opacity-50"
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
                    </div>

                    {/* Score Cards */}
                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-4 sm:gap-3">
                      {/* AI Score */}
                      <div className="min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3">
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] leading-4 text-slate-500 sm:text-xs">
                          <Sparkles
                            size={12}
                            className="shrink-0"
                          />
                          <span className="truncate">
                            AI Score
                          </span>
                        </div>

                        <div className="text-lg font-bold text-blue-400">
                          {item.score}
                        </div>
                      </div>

                      {/* Search Intent */}
                      <div className="min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3">
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] leading-4 text-slate-500 sm:text-xs">
                          <Target
                            size={12}
                            className="shrink-0"
                          />
                          <span className="truncate">
                            Search Intent
                          </span>
                        </div>

                        <div className="text-lg font-bold text-purple-400">
                          {item.searchIntent}
                        </div>
                      </div>

                      {/* Relevance */}
                      <div className="min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3">
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] leading-4 text-slate-500 sm:text-xs">
                          <Search
                            size={12}
                            className="shrink-0"
                          />
                          <span className="truncate">
                            Relevance
                          </span>
                        </div>

                        <div className="text-lg font-bold text-emerald-400">
                          {item.relevance}
                        </div>
                      </div>

                      {/* Opportunity */}
                      <div className="min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3">
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] leading-4 text-slate-500 sm:text-xs">
                          <TrendingUp
                            size={12}
                            className="shrink-0"
                          />
                          <span className="truncate">
                            Opportunity
                          </span>
                        </div>

                        <div className="text-lg font-bold text-cyan-400">
                          {item.opportunity}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Disclaimer */}
              <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/5 px-4 py-4 sm:px-5">
                <p className="text-xs leading-5 text-slate-500">
                  <span className="font-semibold text-yellow-400">
                    Note:
                  </span>{" "}
                  Keyword scores, search intent, relevance,
                  and opportunity are AI-generated estimates.
                  They are not real-time YouTube search
                  volume, competition, ranking data, or
                  guaranteed SEO results.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}