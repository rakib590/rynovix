"use client";

import { useState } from "react";
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

type UploadTimeResult = {
  day: string;
  time: string;
  timezone: string;
  score: number;
  audience: number;
  engagement: number;
  reason: string;
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

export default function BestUploadTimePage() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("🌐 Auto Detect");
  const [category, setCategory] = useState("General");
  const [audience, setAudience] = useState("Everyone");
  const [timezone, setTimezone] = useState("Auto Detect");
  const [uploadCount, setUploadCount] = useState("7");
  const [creativity, setCreativity] = useState(60);

  const [results, setResults] = useState<UploadTimeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUploadTimes = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);

    try {
      const prompt = `
You are an expert YouTube content strategy assistant.

Analyze the following YouTube content information and generate exactly ${uploadCount} recommended upload time slots.

Topic:
${topic}

Language:
${language}

Category:
${category}

Target Audience:
${audience}

Timezone:
${timezone}

Creativity:
${creativity}/100

Requirements:
- Generate exactly ${uploadCount} unique upload time recommendations.
- Include different days and useful time slots.
- Recommend realistic YouTube publishing times based on audience behavior and content category.
- Consider when the target audience is most likely to be available.
- If timezone is Auto Detect, use a sensible timezone based on the topic/language/context. Prefer Asia/Dhaka when the context strongly suggests Bangladesh.
- Use 12-hour time format such as "7:30 PM".
- The timezone field must clearly state the timezone used.
- Do not claim access to the user's actual YouTube Analytics.
- Do not claim these are guaranteed best times.
- These are AI estimates based on general audience behavior.
- Give a short practical reason for each recommendation.
- Avoid duplicate day/time combinations.
- Higher score means a stronger AI-estimated upload opportunity.

Return ONLY valid JSON in exactly this structure:

{
  "results": [
    {
      "day": "Monday",
      "time": "7:30 PM",
      "timezone": "Asia/Dhaka",
      "score": 95,
      "audience": 92,
      "engagement": 94,
      "reason": "Evening viewers are more likely to be available after work and study."
    }
  ]
}

Scoring:
- score: overall upload opportunity from 70 to 99
- audience: estimated audience availability from 70 to 99
- engagement: estimated engagement potential from 70 to 99
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
          data?.error || "Upload time generation failed."
        );
      }

      const parsed =
        typeof data.result === "string"
          ? JSON.parse(data.result)
          : data.result;

      const rawResults = Array.isArray(parsed?.results)
        ? parsed.results
        : [];

      const uploadTimes: UploadTimeResult[] = rawResults
        .slice(0, Number(uploadCount))
        .map((item: any) => ({
          day: String(item?.day || "").trim(),
          time: String(item?.time || "").trim(),
          timezone: String(
            item?.timezone || timezone || "Auto Detect"
          ).trim(),
          score: Math.max(
            0,
            Math.min(100, Number(item?.score) || 0)
          ),
          audience: Math.max(
            0,
            Math.min(100, Number(item?.audience) || 0)
          ),
          engagement: Math.max(
            0,
            Math.min(100, Number(item?.engagement) || 0)
          ),
          reason: String(item?.reason || "").trim(),
          favorite: false,
        }))
        .filter(
          (item: UploadTimeResult) =>
            item.day.length > 0 && item.time.length > 0
        )
        .sort(
          (a: UploadTimeResult, b: UploadTimeResult) =>
            b.score - a.score
        );

      setResults(uploadTimes);
    } catch (error: any) {
      console.error("Best Upload Time Error:", error);
      alert(
        error?.message || "Failed to generate upload times."
      );
    } finally {
      setLoading(false);
    }
  };

  const regenerateUploadTime = async (index: number) => {
    if (loading) return;

    const current = results[index];

    if (!current) return;

    setLoading(true);

    try {
      const prompt = `
Generate ONE alternative YouTube upload time recommendation.

Topic:
${topic}

Language:
${language}

Category:
${category}

Target Audience:
${audience}

Timezone:
${timezone}

Current Recommendation:
${current.day} at ${current.time}

Requirements:
- Generate one different day/time combination.
- Do not repeat the current recommendation.
- Use a realistic YouTube publishing time.
- Consider target audience and category.
- Use 12-hour time format.
- Clearly state the timezone.
- Scores are AI estimates only.
- Do not claim access to actual YouTube Analytics.
- Do not guarantee performance.

Return ONLY valid JSON:

{
  "day": "Thursday",
  "time": "8:00 PM",
  "timezone": "Asia/Dhaka",
  "score": 94,
  "audience": 91,
  "engagement": 93,
  "reason": "Evening viewers are generally more available for entertainment and educational content."
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

      const parsed =
        typeof data.result === "string"
          ? JSON.parse(data.result)
          : data.result;

      const newResult: UploadTimeResult = {
        day: String(parsed?.day || "").trim(),
        time: String(parsed?.time || "").trim(),
        timezone: String(
          parsed?.timezone || timezone || "Auto Detect"
        ).trim(),
        score: Math.max(
          0,
          Math.min(100, Number(parsed?.score) || 0)
        ),
        audience: Math.max(
          0,
          Math.min(100, Number(parsed?.audience) || 0)
        ),
        engagement: Math.max(
          0,
          Math.min(100, Number(parsed?.engagement) || 0)
        ),
        reason: String(parsed?.reason || "").trim(),
        favorite: current.favorite,
      };

      if (!newResult.day || !newResult.time) {
        throw new Error(
          "AI returned an invalid upload time. Please try again."
        );
      }

      setResults((currentResults) => {
        const updated = currentResults.map((item, i) =>
          i === index ? newResult : item
        );

        return updated.sort(
          (a: UploadTimeResult, b: UploadTimeResult) =>
            b.score - a.score
        );
      });
    } catch (error: any) {
      console.error(
        "Regenerate Upload Time Error:",
        error
      );

      alert(
        error?.message || "Failed to regenerate upload time."
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

  const copyResult = async (
    item: UploadTimeResult,
    index: number
  ) => {
    const text = `${item.day} — ${item.time} (${item.timezone})
Score: ${item.score}
Audience Availability: ${item.audience}
Engagement Potential: ${item.engagement}
Reason: ${item.reason}`;

    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const copyAllResults = async () => {
    if (!results.length) return;

    const text = results
      .map(
        (item, index) =>
          `${index + 1}. ${item.day} — ${item.time} (${item.timezone})
Score: ${item.score}
Audience Availability: ${item.audience}
Engagement Potential: ${item.engagement}
Reason: ${item.reason}`
      )
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);

      alert("All upload times copied!");
    } catch (error) {
      console.error("Copy all failed:", error);
    }
  };

  const bestIndex = results.length > 0 ? 0 : -1;

  return (
    <ToolLayout
      title="AI Best Upload Time"
      description="Find the best estimated YouTube upload times for your audience powered by AI."
    >
      <div className="grid min-w-0 gap-5 sm:gap-6 lg:gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
        {/* LEFT SIDE */}
        <div className="min-w-0 rounded-2xl border border-white/10 bg-[#050814] p-4 sm:rounded-3xl sm:p-6">
          <h2 className="mb-5 text-lg font-bold text-white sm:mb-6 sm:text-xl">
            Upload Time Analyzer
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
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            />
          </div>

          {/* Language */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Language
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            >
              {languages.map((item) => (
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
              onChange={(e) => setCategory(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Audience */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Target Audience
            </label>

            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            >
              {audiences.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Timezone */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Timezone
            </label>

            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            >
              {timezones.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Recommendation Count */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Recommendation Count
            </label>

            <select
              value={uploadCount}
              onChange={(e) => setUploadCount(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 sm:rounded-2xl sm:px-4"
            >
              {uploadCounts.map((item) => (
                <option key={item} value={item}>
                  {item} Recommendations
                </option>
              ))}
            </select>
          </div>

          {/* Creativity */}
          <div className="mb-6">
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
                setCreativity(Number(e.target.value))
              }
              className="w-full accent-blue-500"
            />
          </div>

          {/* Generate */}
          <button
            onClick={generateUploadTimes}
            disabled={!topic.trim() || loading}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:from-blue-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-2xl"
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
                Find Best Times
              </>
            )}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="min-w-0 rounded-2xl border border-white/10 bg-[#050814] p-4 sm:rounded-3xl sm:p-6">
          {/* Header */}
          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Recommended Upload Times
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                AI-estimated publishing opportunities for your
                audience.
              </p>
            </div>

            {results.length > 0 && (
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <button
                  onClick={copyAllResults}
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500/40 hover:text-white sm:flex-none sm:px-4 sm:text-sm"
                >
                  <Copy size={15} />
                  Copy All
                </button>

                <button
                  onClick={generateUploadTimes}
                  disabled={loading}
                  title="Generate Again"
                  aria-label="Generate Again"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B1220] text-slate-300 transition hover:border-blue-500/40 hover:text-white disabled:opacity-50"
                >
                  <RefreshCcw
                    size={17}
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
            <div className="flex min-h-[420px] flex-col items-center justify-center px-4 text-center sm:min-h-[520px]">
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
                Enter your topic and click Find Best Times
                to get AI-estimated upload recommendations.
              </p>
            </div>
          )}

          {/* Loading */}
          {loading && results.length === 0 && (
            <div className="flex min-h-[420px] flex-col items-center justify-center px-4 text-center sm:min-h-[520px]">
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
                AI is analyzing your audience, category, and
                content topic.
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
                    key={`${item.day}-${item.time}-${index}`}
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
                            Recommendation #{index + 1}
                          </span>
                        </div>

                        {/* Day + Time */}
                        <div className="flex min-w-0 flex-col items-start gap-3 xs:flex-row xs:flex-wrap xs:items-center">
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
                          Timezone: {item.timezone}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center justify-end gap-1">
                        <button
                          onClick={() =>
                            copyResult(item, index)
                          }
                          title={
                            copiedIndex === index
                              ? "Copied!"
                              : "Copy Recommendation"
                          }
                          aria-label={
                            copiedIndex === index
                              ? "Copied"
                              : "Copy Recommendation"
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white"
                        >
                          {copiedIndex === index ? (
                            <span className="text-[9px] font-semibold text-emerald-400">
                              Copied!
                            </span>
                          ) : (
                            <Copy size={17} />
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

                        <button
                          onClick={() =>
                            regenerateUploadTime(index)
                          }
                          disabled={loading}
                          title="Regenerate Time"
                          aria-label="Regenerate Time"
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-blue-400 disabled:opacity-50"
                        >
                          <RefreshCcw
                            size={17}
                            className={
                              loading ? "animate-spin" : ""
                            }
                          />
                        </button>
                      </div>
                    </div>

                    {/* Scores */}
                    <div className="mt-5 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-3">
                      <div className="min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3">
                        <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                          <Sparkles size={13} />
                          <span>AI Score</span>
                        </div>

                        <div className="text-lg font-bold text-blue-400">
                          {item.score}
                        </div>
                      </div>

                      <div className="min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3">
                        <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                          <Target size={13} />
                          <span>Audience</span>
                        </div>

                        <div className="text-lg font-bold text-purple-400">
                          {item.audience}
                        </div>
                      </div>

                      <div className="min-w-0 rounded-xl border border-white/5 bg-[#070C16] p-3 min-[360px]:col-span-2 sm:col-span-1">
                        <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                          <TrendingUp size={13} />
                          <span>Engagement</span>
                        </div>

                        <div className="text-lg font-bold text-emerald-400">
                          {item.engagement}
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
                  </div>
                );
              })}

              {/* Disclaimer */}
              <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/5 px-4 py-4 sm:px-5">
                <p className="break-words text-[11px] leading-5 text-slate-500 sm:text-xs">
                  <span className="font-semibold text-yellow-400">
                    Note:
                  </span>{" "}
                  Upload time scores are AI-generated estimates
                  based on general audience behavior, content
                  category, and target audience. They are not
                  based on your actual YouTube Analytics and do
                  not guarantee higher views, engagement, or
                  rankings. For the most accurate timing, compare
                  these recommendations with your YouTube
                  Analytics data.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}