"use client";

import { useState } from "react";
import {
  Copy,
  RefreshCcw,
  Sparkles,
  Heart,
  Lightbulb,
  Check,
} from "lucide-react";
import ToolLayout from "@/components/ai-tools/ToolLayout";

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

export default function ShortsIdeasPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState("🌐 Auto Detect");
  const [tone, setTone] = useState("Engaging");
  const [audience, setAudience] = useState("Everyone");
  const [category, setCategory] = useState("General");
  const [ideaCount, setIdeaCount] = useState("5");
  const [creativity, setCreativity] = useState(70);

  const [loading, setLoading] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(
    null
  );
  const [error, setError] = useState("");
  const [results, setResults] = useState<ShortsIdeaResult[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const clamp = (value: number) =>
    Math.max(0, Math.min(100, Number(value) || 0));

  const sanitizeResult = (item: any): ShortsIdeaResult => ({
    title: String(item?.title || "Untitled Shorts Idea").trim(),
    hook: String(item?.hook || "").trim(),
    concept: String(item?.concept || "").trim(),
    structure: String(item?.structure || "").trim(),
    cta: String(item?.cta || "").trim(),
    score: clamp(item?.score),
    viral: clamp(item?.viral),
    engagement: clamp(item?.engagement),
    favorite: false,
  });

  const buildPrompt = (count: number) => {
    return `
You are an expert YouTube Shorts content strategist.

Generate exactly ${count} UNIQUE and practical YouTube Shorts ideas.

USER INPUT
Topic: ${topic.trim()}
Keywords: ${keywords.trim() || "None"}
Language: ${language}
Tone: ${tone}
Target Audience: ${audience}
Category: ${category}
Creativity Level: ${creativity}/100

IMPORTANT LANGUAGE RULES:
1. If Language is "🌐 Auto Detect", detect the primary language of the user's Topic and Keywords.
2. If a specific Language is selected, use ONLY that selected language for the main content.
3. English = natural fluent English.
4. বাংলা = natural Bengali using Bengali script.
5. हिन्दी = natural Hindi using Devanagari script.
6. Spanish = natural fluent Spanish.
7. French = natural fluent French.
8. German = natural fluent German.
9. Arabic = natural fluent Arabic.
10. If the user's input naturally mixes languages, preserve natural mixed-language expressions where appropriate.
11. Do NOT translate word-for-word.
12. Make every idea sound natural and creator-friendly.
13. Common technical terms may remain in English when that sounds natural.

SHORTS REQUIREMENTS:
- Ideas must be specifically suitable for YouTube Shorts.
- Prioritize a strong first 1–2 second hook.
- Make concepts easy to understand quickly.
- Prioritize curiosity, fast payoff, visual potential, and strong retention.
- Use loopability when appropriate.
- Make each idea meaningfully different.
- Avoid repetitive variations of the same idea.
- Avoid misleading clickbait.
- Ideas should be realistic for a creator to produce.
- Do NOT write full scripts.
- Keep the structure concise and actionable.
- CTA should be short and natural.

FIELD DEFINITIONS:
- title = the name/title of the Shorts idea.
- hook = a powerful first 1–2 second opening hook.
- concept = what the Short is about and what happens.
- structure = concise beginning-to-end flow of the Short.
- cta = a natural ending call-to-action.

SCORE DEFINITIONS:
- score = estimated overall idea quality from 0–100.
- viral = estimated viral potential from 0–100. This is NOT a guarantee and is NOT real-time trend data.
- engagement = estimated audience engagement potential from 0–100.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside JSON.

Required JSON format:
{
  "results": [
    {
      "title": "Shorts idea title",
      "hook": "Strong first 1-2 second hook",
      "concept": "What happens in the Short",
      "structure": "Brief beginning-to-end structure",
      "cta": "Short natural CTA",
      "score": 95,
      "viral": 93,
      "engagement": 94
    }
  ]
}
`;
  };

  const generateIdeas = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    setLoading(true);
    setError("");
    setCopiedIndex(null);
    setCopiedAll(false);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: buildPrompt(Number(ideaCount)),
          json: true,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to generate Shorts ideas.");
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

      if (!Array.isArray(parsed?.results)) {
        throw new Error("AI returned an unexpected result format.");
      }

      const ideas = parsed.results
        .slice(0, Number(ideaCount))
        .map(sanitizeResult);

      if (!ideas.length) {
        throw new Error("No Shorts ideas were generated.");
      }

      setResults(ideas);
    } catch (err: any) {
      console.error("SHORTS IDEAS ERROR:", err);
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const regenerateIdea = async (index: number) => {
    if (!topic.trim()) return;

    setRegeneratingIndex(index);
    setError("");

    try {
      const prompt = `
You are an expert YouTube Shorts content strategist.

Create ONE completely new YouTube Shorts idea.

Topic: ${topic.trim()}
Keywords: ${keywords.trim() || "None"}
Language: ${language}
Tone: ${tone}
Target Audience: ${audience}
Category: ${category}
Creativity: ${creativity}/100

The new idea MUST be different from these existing ideas:
${results.map((item, i) => `${i + 1}. ${item.title}`).join("\n")}

Language rules:
- If Language is "🌐 Auto Detect", detect the primary language of the Topic and Keywords.
- If a specific language is selected, use ONLY that language for the main content.
- বাংলা must use Bengali script.
- हिन्दी must use Devanagari script.
- Keep natural mixed-language expressions when appropriate.

Return ONLY valid JSON in this exact format:
{
  "title": "Shorts idea title",
  "hook": "Strong first 1-2 second hook",
  "concept": "What happens in the Short",
  "structure": "Brief beginning-to-end structure",
  "cta": "Short natural CTA",
  "score": 95,
  "viral": 93,
  "engagement": 94
}

Do not write a full script.
Do not use markdown.
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
        throw new Error(data?.error || "Failed to regenerate idea.");
      }

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
        current.map((item, i) => (i === index ? newIdea : item))
      );
    } catch (err: any) {
      console.error("REGENERATE SHORTS IDEA ERROR:", err);
      setError(err?.message || "Failed to regenerate idea.");
    } finally {
      setRegeneratingIndex(null);
    }
  };

  const toggleFavorite = (index: number) => {
    setResults((current) =>
      current.map((item, i) =>
        i === index ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const formatIdea = (idea: ShortsIdeaResult, index: number) => {
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

  const copyIdea = async (idea: ShortsIdeaResult, index: number) => {
    try {
      await navigator.clipboard.writeText(formatIdea(idea, index));

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex((current) => (current === index ? null : current));
      }, 1800);
    } catch {
      setError("Failed to copy idea.");
    }
  };

  const copyAllIdeas = async () => {
    if (!results.length) return;

    try {
      const text = results
        .map((idea, index) => formatIdea(idea, index))
        .join("\n\n------------------------------\n\n");

      await navigator.clipboard.writeText(text);

      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1800);
    } catch {
      setError("Failed to copy all ideas.");
    }
  };

  const bestScore =
    results.length > 0
      ? Math.max(...results.map((result) => result.score))
      : -1;

  return (
    <ToolLayout
      title="Shorts Ideas Generator"
      description="Generate engaging and viral-ready YouTube Shorts ideas powered by AI."
    >
      <div className="grid min-w-0 gap-5 sm:gap-6 lg:gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
        {/* =========================================
            LEFT — GENERATOR
        ========================================= */}

        <div className="min-w-0 rounded-2xl border border-white/10 bg-[#050814] p-4 sm:rounded-3xl sm:p-6">
          <h2 className="mb-5 text-lg font-bold text-white sm:mb-6 sm:text-xl">
            Generator
          </h2>

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
              onChange={(e) => setKeywords(e.target.value)}
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

          {/* TONE */}

          <div className="mt-4 sm:mt-5">
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

          {/* AUDIENCE */}

          <div className="mt-4 sm:mt-5">
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

          {/* CATEGORY */}

          <div className="mt-4 sm:mt-5">
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

          {/* IDEA COUNT */}

          <div className="mt-4 sm:mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Idea Count
            </label>

            <select
              value={ideaCount}
              onChange={(e) => setIdeaCount(e.target.value)}
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
              onChange={(e) => setCreativity(Number(e.target.value))}
              className="w-full accent-blue-500"
            />

            <div className="mt-2 flex justify-between text-xs text-slate-600">
              <span>Focused</span>
              <span>Creative</span>
            </div>
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
            disabled={loading || !topic.trim()}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:mt-6"
          >
            {loading ? (
              <>
                <RefreshCcw size={18} className="shrink-0 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} className="shrink-0" />
                Generate Ideas
              </>
            )}
          </button>
        </div>

        {/* =========================================
            RIGHT — RESULTS
        ========================================= */}

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
                  {copiedAll ? <Check size={15} /> : <Copy size={15} />}

                  {copiedAll ? "Copied" : "Copy All"}
                </button>

                <button
                  type="button"
                  onClick={generateIdeas}
                  disabled={loading}
                  title="Generate Again"
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

          {/* EMPTY STATE */}

          {results.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 py-10 sm:min-h-[520px]">
              <Lightbulb size={40} className="text-blue-400 sm:h-[42px] sm:w-[42px]" />

              <h3 className="mt-5 text-lg font-semibold text-white sm:text-xl">
                No Ideas Yet
              </h3>

              <p className="mt-2 max-w-md text-center text-xs leading-5 text-slate-400 sm:text-sm">
                Enter your topic and click Generate Ideas.
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {results.map((result, index) => {
                const isBest = result.score === bestScore;
                const isRegenerating = regeneratingIndex === index;

                return (
                  <div
                    key={`${index}-${result.title}`}
                    className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] p-4 transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 sm:p-6"
                  >
                    {/* CARD HEADER */}

                    <div className="flex min-w-0 flex-col gap-3">
                      {/* NUMBER + BEST */}

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

                      {/* SCORE BADGES */}

                      <div className="flex min-w-0 flex-wrap gap-2">
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-400 sm:px-3 sm:text-xs">
                          AI Score {result.score}%
                        </div>

                        <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-purple-400 sm:px-3 sm:text-xs">
                          Viral {result.viral}/100
                        </div>

                        <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-blue-400 sm:px-3 sm:text-xs">
                          Engagement {result.engagement}/100
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
                      {/* CONCEPT */}

                      <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#080D18] p-3.5 sm:p-4">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-blue-400 sm:text-xs">
                          Concept
                        </p>

                        <p className="break-words text-sm leading-6 text-slate-300">
                          {result.concept}
                        </p>
                      </div>

                      {/* STRUCTURE */}

                      <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#080D18] p-3.5 sm:p-4">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-cyan-400 sm:text-xs">
                          Structure
                        </p>

                        <p className="break-words text-sm leading-6 text-slate-300">
                          {result.structure}
                        </p>
                      </div>

                      {/* CTA */}

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
                        onClick={() => copyIdea(result, index)}
                        disabled={isRegenerating}
                        title="Copy Idea"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {copiedIndex === index ? (
                          <Check size={17} />
                        ) : (
                          <Copy size={17} />
                        )}
                      </button>

                      {/* FAVORITE */}

                      <button
                        type="button"
                        onClick={() => toggleFavorite(index)}
                        disabled={isRegenerating}
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
                          fill={result.favorite ? "currentColor" : "none"}
                        />
                      </button>

                      {/* REGENERATE */}

                      <button
                        type="button"
                        onClick={() => regenerateIdea(index)}
                        disabled={isRegenerating}
                        title="Regenerate Idea"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <RefreshCcw
                          size={17}
                          className={
                            isRegenerating ? "animate-spin" : ""
                          }
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* DISCLAIMER */}

          {results.length > 0 && (
            <p className="mt-4 px-2 text-center text-[10px] leading-5 text-slate-600 sm:mt-5 sm:text-xs">
              Viral Potential and Engagement are AI estimates, not real-time
              analytics or guarantees.
            </p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}