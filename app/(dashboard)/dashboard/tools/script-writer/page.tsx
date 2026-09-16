"use client";

import { useState } from "react";

import {
  Wand2,
  Copy,
  RefreshCcw,
  Sparkles,
  Heart,
  FileText,
} from "lucide-react";

import ToolLayout from "@/components/ai-tools/ToolLayout";

type ScriptResult = {
  title: string;
  script: string;
  hook: string;
  score: number;
  engagement: number;
  structure: number;
  favorite: boolean;
};

export default function ScriptWriterPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");

  const [language, setLanguage] = useState("🌐 Auto Detect");
  const [tone, setTone] = useState("Engaging");
  const [length, setLength] = useState("Medium");
  const [audience, setAudience] = useState("Everyone");
  const [category, setCategory] = useState("General");
  const [scriptType, setScriptType] = useState("YouTube Video");
  const [creativity, setCreativity] = useState(70);

  const [loading, setLoading] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] =
    useState<number | null>(null);

  const [error, setError] = useState("");
  const [results, setResults] = useState<ScriptResult[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // =========================================
  // REGENERATE SINGLE SCRIPT
  // =========================================

  async function regenerateScript(index: number) {
    const currentScript = results[index];

    if (!currentScript || !topic.trim()) {
      return;
    }

    setRegeneratingIndex(index);
    setError("");

    try {
      const languageInstruction =
        language === "🌐 Auto Detect"
          ? `
Detect the primary language of the user's Topic and Keywords.
Write the complete new script in that same primary language.
`
          : `
Write the complete new script in ${language}.
`;

      const prompt = `
You are an expert professional YouTube script writer.

Create ONE completely new and improved script variation.

TOPIC:
${topic}

KEYWORDS:
${keywords || "None"}

SCRIPT TYPE:
${scriptType}

CATEGORY / NICHE:
${category}

TONE:
${tone}

TARGET AUDIENCE:
${audience}

VIDEO LENGTH:
${length}

CREATIVITY:
${creativity}/100

LANGUAGE:
${language}

LANGUAGE REQUIREMENTS:
${languageInstruction}

1. If Language is "🌐 Auto Detect", detect the primary language of the user's Topic and Keywords.
2. If Language is explicitly selected, use ONLY that selected language for the main script.
3. English → natural fluent English.
4. বাংলা → natural Bengali using Bengali script.
5. हिन्दी → natural Hindi using Devanagari script.
6. Spanish → natural fluent Spanish.
7. French → natural fluent French.
8. German → natural fluent German.
9. Arabic → natural fluent Arabic.
10. If the user's input naturally mixes languages, preserve natural mixed expressions where appropriate.
11. Do NOT translate word-for-word.
12. The script must sound natural for a native speaker.
13. The script must be ready for voice recording.
14. Common technical terms may remain in English when that sounds natural.

SCRIPT STRUCTURE:

For YouTube Video:
- Hook
- Introduction
- Main Content
- Natural Transitions
- Conclusion
- CTA

For Storytelling:
- Opening Hook
- Setup
- Story Development
- Turning Point
- Climax
- Ending
- CTA

For Tutorial:
- Hook
- Introduction
- What viewers will learn
- Step-by-step explanation
- Tips / mistakes to avoid
- Conclusion
- CTA

For Documentary:
- Strong opening
- Context
- Main story
- Important facts
- Developments
- Conclusion
- CTA

For Review:
- Hook
- Introduction
- Overview
- Key features
- Pros
- Cons
- Verdict
- CTA

For Shorts:
- Very strong first 1-2 seconds
- Fast-paced main content
- Strong ending
- Short CTA

For Promotional:
- Hook
- Problem
- Solution
- Benefits
- Value proposition
- CTA

For Comedy / Funny:
- Strong funny hook
- Setup
- Comedic development
- Punchlines
- Ending
- CTA

IMPORTANT:
- Create exactly ONE new script.
- Do not copy the current script.
- Make the new version meaningfully different.
- Do not create a random paragraph.
- Write a real usable video script.
- Use speaker-friendly sentences.
- Use natural pacing.
- Avoid repetitive sentences.
- Avoid generic filler.
- Make the opening hook highly engaging.
- Make the ending memorable.
- Match the selected Script Type.
- Match the selected Category.
- Match the selected Tone.
- Match the selected Audience.
- Match the selected Language.
- Keep the script practical for voice recording.

CURRENT SCRIPT TITLE:
${currentScript.title}

CURRENT SCRIPT:
${currentScript.script}

Return ONLY valid JSON.

JSON format:
{
  "title": "Short video title",
  "hook": "The strongest opening hook",
  "script": "Complete ready-to-record script",
  "score": 95,
  "engagement": 93,
  "structure": 94
}

SCORING:
score = estimated overall script quality from 0-100.
engagement = estimated viewer engagement potential from 0-100.
structure = estimated script structure quality from 0-100.

These are AI estimates, NOT actual YouTube analytics.

Do not return markdown.
Do not return explanations.
Return valid JSON only.
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

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to regenerate script."
        );
      }

      let parsed = data.result;

      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      if (
        !parsed ||
        typeof parsed.script !== "string" ||
        !parsed.script.trim()
      ) {
        throw new Error("AI returned an invalid script.");
      }

      const sanitizeScore = (value: unknown) => {
        const number = Number(value);

        if (!Number.isFinite(number)) {
          return 0;
        }

        return Math.round(
          Math.min(100, Math.max(0, number))
        );
      };

      const newResult: ScriptResult = {
        title:
          String(parsed.title || "Untitled Script").trim(),

        script: parsed.script.trim(),

        hook: String(parsed.hook || "").trim(),

        score: sanitizeScore(parsed.score),

        engagement: sanitizeScore(parsed.engagement),

        structure: sanitizeScore(parsed.structure),

        favorite: currentScript.favorite,
      };

      setResults((prev) =>
        prev.map((item, i) =>
          i === index ? newResult : item
        )
      );
    } catch (err: any) {
      console.error("Regenerate script failed:", err);

      setError(
        err?.message ||
          "Something went wrong while regenerating."
      );
    } finally {
      setRegeneratingIndex(null);
    }
  }

  // =========================================
  // FAVORITE
  // =========================================

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

  // =========================================
  // COPY SINGLE SCRIPT
  // =========================================

  async function copyScript(
    script: string,
    index: number
  ) {
    try {
      await navigator.clipboard.writeText(script);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error("Copy failed:", err);

      setError("Unable to copy script.");
    }
  }

  // =========================================
  // COPY ALL SCRIPTS
  // =========================================

  async function copyAllScripts() {
    if (!results.length) {
      return;
    }

    try {
      const text = results
        .map(
          (result, index) =>
            `SCRIPT ${index + 1}\n\n${result.title}\n\n${result.script}`
        )
        .join(
          "\n\n-----------------------------\n\n"
        );

      await navigator.clipboard.writeText(text);

      setCopiedAll(true);

      setTimeout(() => {
        setCopiedAll(false);
      }, 2000);
    } catch (err) {
      console.error("Copy all failed:", err);

      setError("Unable to copy scripts.");
    }
  }

  // =========================================
  // GENERATE SCRIPTS
  // =========================================

  async function generateScripts() {
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const languageInstruction =
        language === "🌐 Auto Detect"
          ? `
Detect the primary language of the user's Topic and Keywords.
Write all 5 scripts in that same primary language.
`
          : `
Write all 5 scripts in ${language}.
`;

      const prompt = `
You are an expert professional YouTube script writer.

Generate exactly 5 UNIQUE high-quality script variations.

TOPIC:
${topic}

KEYWORDS:
${keywords || "None"}

SCRIPT TYPE:
${scriptType}

CATEGORY / NICHE:
${category}

TONE:
${tone}

TARGET AUDIENCE:
${audience}

VIDEO LENGTH:
${length}

CREATIVITY:
${creativity}/100

LANGUAGE:
${language}

LANGUAGE REQUIREMENTS:
${languageInstruction}

1. If Language is "🌐 Auto Detect", detect the primary language of the user's Topic and Keywords.
2. If Language is explicitly selected, use ONLY that selected language for the main scripts.
3. English → natural fluent English.
4. বাংলা → natural Bengali using Bengali script.
5. हिन्दी → natural Hindi using Devanagari script.
6. Spanish → natural fluent Spanish.
7. French → natural fluent French.
8. German → natural fluent German.
9. Arabic → natural fluent Arabic.
10. If the user's input naturally mixes languages, preserve natural mixed expressions where appropriate.
11. Do NOT translate word-for-word.
12. All scripts must sound natural for native speakers.
13. All scripts must be ready for voice recording.
14. Common technical terms may remain in English when natural.

SCRIPT TYPE VS CATEGORY:
- Script Type describes the FORMAT of the video/script.
- Category describes the SUBJECT or NICHE of the video.
- Tone describes HOW the script should sound.
- Target Audience describes WHO the script is written for.

SCRIPT TYPES:
- YouTube Video
- Storytelling
- Tutorial
- Documentary
- Review
- Shorts
- Promotional
- Comedy / Funny

CATEGORIES:
- General
- Technology
- Education
- Gaming
- Entertainment
- Business
- Lifestyle
- News
- How To & Style
- Travel
- Comedy

TONES:
- Engaging
- Professional
- Friendly
- Casual
- Storytelling
- Dramatic
- Funny
- Viral

TARGET AUDIENCE:
- Everyone
- Beginners
- Students
- Professionals
- Kids

STRUCTURE:

For YouTube Video:
Hook
Introduction
Main Content
Natural Transitions
Conclusion
CTA

For Storytelling:
Opening Hook
Setup
Story Development
Turning Point
Climax
Ending
CTA

For Tutorial:
Hook
Introduction
What viewers will learn
Step-by-step explanation
Tips / mistakes to avoid
Conclusion
CTA

For Documentary:
Strong opening
Context
Main story
Important facts
Developments
Conclusion
CTA

For Review:
Hook
Introduction
Overview
Key features
Pros
Cons
Verdict
CTA

For Shorts:
Strong first 1-2 seconds
Fast-paced content
Strong ending
Short CTA

For Promotional:
Hook
Problem
Solution
Benefits
Value proposition
CTA

For Comedy / Funny:
Funny Hook
Setup
Comedic development
Punchlines
Ending
CTA

IMPORTANT:
- Generate exactly 5 unique scripts.
- Every script must feel like a real creator wrote it.
- Do not write generic essays.
- Do not make all 5 scripts almost identical.
- Give each variation a different hook.
- Give each variation a different presentation angle.
- Use natural spoken sentences.
- Avoid unnecessary filler.
- Make the first few lines extremely engaging.
- Make the ending memorable.
- Match the selected Script Type.
- Match the selected Category.
- Match the selected Tone.
- Match the selected Audience.
- Match the selected Language.
- Keep every script practical for recording.

Return ONLY valid JSON.

JSON format:
{
  "results": [
    {
      "title": "Video title",
      "hook": "Strong opening hook",
      "script": "Complete ready-to-record script",
      "score": 95,
      "engagement": 92,
      "structure": 94
    }
  ]
}

IMPORTANT:
- The "results" array MUST contain exactly 5 objects.
- Every object must contain title, hook, script, score, engagement, and structure.
- score must be a number between 0 and 100.
- engagement must be a number between 0 and 100.
- structure must be a number between 0 and 100.
- Do not return markdown.
- Do not return explanations.
- Return valid JSON only.

SCORING:
score = estimated overall script quality from 0-100.
engagement = estimated viewer engagement potential from 0-100.
structure = estimated script structure quality from 0-100.

These are AI estimates, NOT real YouTube analytics.
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

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to generate scripts."
        );
      }

      let parsed = data.result;

      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      if (!parsed || !Array.isArray(parsed.results)) {
        throw new Error(
          "AI returned an invalid script response."
        );
      }

      const sanitizeScore = (value: unknown) => {
        const number = Number(value);

        if (!Number.isFinite(number)) {
          return 0;
        }

        return Math.round(
          Math.min(100, Math.max(0, number))
        );
      };

      const formattedResults: ScriptResult[] =
        parsed.results
          .slice(0, 5)
          .filter(
            (item: any) =>
              item &&
              typeof item.script === "string" &&
              item.script.trim().length > 0
          )
          .map((item: any) => ({
            title:
              String(
                item.title || "Untitled Script"
              ).trim(),

            script: item.script.trim(),

            hook: String(
              item.hook || ""
            ).trim(),

            score: sanitizeScore(item.score),

            engagement: sanitizeScore(
              item.engagement
            ),

            structure: sanitizeScore(
              item.structure
            ),

            favorite: false,
          }));

      if (formattedResults.length === 0) {
        throw new Error(
          "AI returned no valid scripts."
        );
      }

      setResults(formattedResults);
    } catch (err: any) {
      console.error(
        "Generate scripts failed:",
        err
      );

      setError(
        err?.message ||
          "Something went wrong while generating scripts."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================
  // UI
  // =========================================

  return (
    <ToolLayout
      title="Script Writer"
      description="Create engaging AI-powered video scripts in seconds."
    >
      <div className="grid min-w-0 gap-6 sm:gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">

        {/* =========================================
            LEFT — GENERATOR
        ========================================= */}

        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          <h2 className="mb-5 text-xl font-bold text-white sm:mb-6">
            Generator
          </h2>

          {/* ERROR */}

          {error && (
            <div className="mb-5 break-words rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-5">

            {/* TOPIC */}

            <div className="min-w-0">
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
• How AI is changing YouTube in 2026
• ২০২৬ সালে AI কীভাবে YouTube বদলে দিচ্ছে?
• 2026 में AI YouTube को कैसे बदल रहा है?`}
                className="box-border block w-full max-w-full resize-none rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 sm:text-base"
              />
            </div>

            {/* KEYWORDS */}

            <div className="min-w-0">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Keywords
              </label>

              <input
                value={keywords}
                onChange={(e) =>
                  setKeywords(e.target.value)
                }
                placeholder="AI, YouTube, automation, growth"
                className="box-border block w-full max-w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 sm:text-base"
              />
            </div>

            {/* SCRIPT TYPE / CATEGORY */}

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">

              {/* SCRIPT TYPE */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Script Type
                </label>

                <select
                  value={scriptType}
                  onChange={(e) =>
                    setScriptType(e.target.value)
                  }
                  className="box-border block w-full max-w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option>YouTube Video</option>
                  <option>Storytelling</option>
                  <option>Tutorial</option>
                  <option>Documentary</option>
                  <option>Review</option>
                  <option>Shorts</option>
                  <option>Promotional</option>
                  <option>Comedy / Funny</option>
                </select>
              </div>

              {/* CATEGORY */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="box-border block w-full max-w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option>General</option>
                  <option>Technology</option>
                  <option>Education</option>
                  <option>Gaming</option>
                  <option>Entertainment</option>
                  <option>Business</option>
                  <option>Lifestyle</option>
                  <option>News</option>
                  <option>How To & Style</option>
                  <option>Travel</option>
                  <option>Comedy</option>
                </select>
              </div>

            </div>

            {/* TONE / LANGUAGE / LENGTH */}

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* TONE */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Tone
                </label>

                <select
                  value={tone}
                  onChange={(e) =>
                    setTone(e.target.value)
                  }
                  className="box-border block w-full max-w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option>Engaging</option>
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Casual</option>
                  <option>Storytelling</option>
                  <option>Dramatic</option>
                  <option>Funny</option>
                  <option>Viral</option>
                </select>
              </div>

              {/* LANGUAGE */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Language
                </label>

                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                  className="box-border block w-full max-w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
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

              {/* LENGTH */}

              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Length
                </label>

                <select
                  value={length}
                  onChange={(e) =>
                    setLength(e.target.value)
                  }
                  className="box-border block w-full max-w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Long</option>
                  <option>Very Long</option>
                </select>
              </div>

            </div>

            {/* AUDIENCE */}

            <div className="min-w-0">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Target Audience
              </label>

              <select
                value={audience}
                onChange={(e) =>
                  setAudience(e.target.value)
                }
                className="box-border block w-full max-w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              >
                <option>Everyone</option>
                <option>Beginners</option>
                <option>Students</option>
                <option>Professionals</option>
                <option>Kids</option>
              </select>
            </div>

            {/* CREATIVITY */}

            <div className="min-w-0">
              <div className="mb-2 flex items-center justify-between gap-3">

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
                step="1"
                value={creativity}
                onChange={(e) =>
                  setCreativity(
                    Number(e.target.value)
                  )
                }
                className="block w-full accent-blue-500"
              />
            </div>

            {/* GENERATE BUTTON */}

            <button
              type="button"
              onClick={generateScripts}
              disabled={
                loading ||
                topic.trim() === ""
              }
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:text-base"
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

                  Generate Scripts
                </>
              )}
            </button>

          </div>
        </div>

        {/* =========================================
            RIGHT — GENERATED SCRIPTS
        ========================================= */}

        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#050814] p-4 sm:p-6">

          {/* HEADER */}

          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">

              <div className="flex min-w-0 flex-wrap items-center gap-3">

                <h2 className="break-words text-xl font-bold text-white">
                  Generated Scripts
                </h2>

                {results.length > 0 && (
                  <span className="shrink-0 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                    {results.length} Results
                  </span>
                )}

              </div>

              <p className="mt-1 break-words text-sm text-slate-400">
                AI generated ready-to-record scripts
              </p>

            </div>

            <div className="flex w-full items-center gap-2 sm:w-auto">

              {/* COPY ALL */}

              {results.length > 0 && (
                <button
                  type="button"
                  onClick={copyAllScripts}
                  disabled={loading}
                  className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-sm text-slate-300 transition hover:border-blue-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-4"
                  title="Copy All Scripts"
                >
                  <Copy
                    size={17}
                    className="shrink-0"
                  />

                  <span className="truncate">
                    {copiedAll
                      ? "Copied!"
                      : "Copy All"}
                  </span>
                </button>
              )}

              {/* GENERATE AGAIN */}

              <button
                type="button"
                onClick={generateScripts}
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
          </div>

          {/* EMPTY STATE */}

          {results.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 text-center sm:min-h-[520px]">

              <FileText
                size={42}
                className="text-purple-400"
              />

              <h3 className="mt-5 text-xl font-semibold text-white">
                No Scripts Yet
              </h3>

              <p className="mt-2 max-w-md text-center text-sm leading-6 text-slate-400">
                Enter your topic and choose your
                script options, then click Generate
                Scripts.
              </p>

            </div>
          ) : (
            <div className="min-w-0 space-y-4">

              {results.map(
                (result, index) => {

                  const maxScore = Math.max(
                    ...results.map(
                      (r) => r.score
                    )
                  );

                  const isBest =
                    result.score > 0 &&
                    result.score ===
                      maxScore;

                  const isRegenerating =
                    regeneratingIndex ===
                    index;

                  return (
                    <div
                      key={`${index}-${result.title}`}
                      className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] px-4 pt-4 pb-3 transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 sm:px-6"
                    >

                      {/* CARD TOP */}

                      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">

                        {/* LEFT */}

                        <div className="min-w-0 flex-1">

                          <div className="mb-2 flex flex-wrap items-center gap-3">

                            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                              Script{" "}
                              {index + 1}
                            </p>

                            {isBest && (
                              <span className="shrink-0 rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-400">
                                🏆 BEST
                              </span>
                            )}

                          </div>

                          <h3 className="break-words text-xl font-bold leading-tight text-white sm:text-2xl md:text-[26px] md:leading-[1.15]">
                            {result.title}
                          </h3>

                          {/* SCORE */}

                          <p className="mt-2 text-sm font-semibold text-emerald-400">
                            AI Score{" "}
                            {result.score}%
                          </p>

                          {/* METRICS */}

                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:gap-x-4">

                            <span className="text-slate-400">
                              ⚡{" "}
                              <span className="font-semibold text-cyan-400">
                                Engagement{" "}
                                {
                                  result.engagement
                                }/100
                              </span>
                            </span>

                            <span className="text-slate-400">
                              🧩{" "}
                              <span className="font-semibold text-green-400">
                                Structure{" "}
                                {
                                  result.structure
                                }/100
                              </span>
                            </span>

                            <span className="text-slate-400">
                              ✍{" "}
                              <span className="font-semibold text-yellow-400">
                                {
                                  result.script
                                    .length
                                } chars
                              </span>
                            </span>

                          </div>
                        </div>

                        {/* RIGHT ACTIONS */}

                        <div className="flex shrink-0 items-center gap-2">

                          {/* COPY */}

                          <div className="group relative">

                            <button
                              type="button"
                              onClick={() =>
                                copyScript(
                                  result.script,
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
                              {copiedIndex ===
                              index
                                ? "Copied!"
                                : "Copy Script"}
                            </span>

                          </div>

                          {/* FAVORITE */}

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

                          {/* REGENERATE */}

                          <div className="group relative">

                            <button
                              type="button"
                              onClick={() =>
                                regenerateScript(
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
                              {isRegenerating
                                ? "Regenerating..."
                                : "Generate Again"}
                            </span>

                          </div>

                        </div>
                      </div>

                      {/* HOOK */}

                      {result.hook && (
                        <div className="mt-4 min-w-0 overflow-hidden rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 sm:p-4">

                          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-purple-400">
                            Hook
                          </div>

                          <p className="break-words text-sm leading-6 text-slate-200">
                            {result.hook}
                          </p>

                        </div>
                      )}

                      {/* SCRIPT */}

                      <div className="mt-4 min-w-0 max-w-full overflow-hidden rounded-xl border border-white/10 bg-[#050814] p-3 sm:p-5">

                        <pre className="m-0 max-w-full whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-sans text-sm leading-7 text-slate-200">
                          {result.script}
                        </pre>

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