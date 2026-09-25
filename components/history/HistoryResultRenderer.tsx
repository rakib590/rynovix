"use client";

import {
  Trophy,
  FileText,
  Hash,
  Tags,
  ScrollText,
  Lightbulb,
  Image,
  Search,
  KeyRound,
  Clock3,
  Target,
  TrendingUp,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

type TitleResult = {
  title: string;
  score: number;
  ctr: number;
  seo: number;
};

type DescriptionResult = {
  description: string;
  score: number;
  seo: number;
  engagement: number;
};

type TagsResult = {
  tags: string;
  score: number;
  ctr: number;
  seo: number;
  trending: number;
  viral: number;
};

type ScriptResult = {
  title: string;
  hook: string;
  script: string;
  score: number;
  engagement: number;
  structure: number;
};

type ShortsResult = {
  title: string;
  hook: string;
  concept: string;
  structure: string;
  cta: string;
  score: number;
  viral: number;
  engagement: number;
};

type ThumbnailResult = {
  title: string;
  score: number;
  ctr: number;
  curiosity: number;
  engagement: number;
};

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

type KeywordResult = {
  keyword: string;
  score: number;
  searchIntent: number;
  relevance: number;
  opportunity: number;
};

type UploadTimeResult = {
  day: string;
  time: string;
  score: number;
  reason: string;
  audienceActivity: number;
  competition: number;
  recommendation: string;
};

interface HistoryResultRendererProps {
  toolId: string;
  result: any;
}

export default function HistoryResultRenderer({
  toolId,
  result,
}: HistoryResultRendererProps) {
  function parseResult() {
    if (typeof result === "string") {
      try {
        return JSON.parse(result);
      } catch {
        return result;
      }
    }

    return result;
  }

  const parsedResult = parseResult();

  // ======================================================
  // TITLE GENERATOR
  // ======================================================

  if (toolId === "title-generator") {
    const titles: TitleResult[] =
      parsedResult &&
      Array.isArray(parsedResult.titles)
        ? parsedResult.titles
        : [];

    if (titles.length === 0) {
      return <FallbackResult result={result} />;
    }

    const bestScore = Math.max(
      ...titles.map((item) =>
        Number(item.score) || 0
      )
    );

    return (
      <div className="space-y-4">
        {titles.map((item, index) => {
          const isBest =
            Number(item.score) === bestScore;

          return (
            <div
              key={index}
              className={`rounded-2xl border p-5 transition-all duration-300 ${
                isBest
                  ? "border-yellow-500/30 bg-yellow-500/[0.04] shadow-lg shadow-yellow-500/5"
                  : "border-white/10 bg-[#050814] hover:border-blue-500/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                    isBest
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-base font-semibold leading-7 text-white">
                      {item.title}
                    </h3>

                    {isBest && (
                      <div className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
                        <Trophy size={13} />
                        Best Title
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 sm:max-w-md">
                    <MetricCard
                      label="Score"
                      value={item.score}
                    />

                    <MetricCard
                      label="CTR"
                      value={item.ctr}
                    />

                    <MetricCard
                      label="SEO"
                      value={item.seo}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ======================================================
  // DESCRIPTION GENERATOR
  // ======================================================

  if (toolId === "description-generator") {
    const descriptions: DescriptionResult[] =
      parsedResult &&
      Array.isArray(parsedResult.descriptions)
        ? parsedResult.descriptions
        : [];

    if (descriptions.length === 0) {
      return <FallbackResult result={result} />;
    }

    const bestScore = Math.max(
      ...descriptions.map((item) =>
        Number(item.score) || 0
      )
    );

    return (
      <div className="space-y-4">
        {descriptions.map((item, index) => {
          const isBest =
            Number(item.score) === bestScore;

          return (
            <div
              key={index}
              className={`rounded-2xl border p-5 transition-all duration-300 ${
                isBest
                  ? "border-yellow-500/30 bg-yellow-500/[0.04] shadow-lg shadow-yellow-500/5"
                  : "border-white/10 bg-[#050814] hover:border-blue-500/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    isBest
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {isBest ? (
                    <Trophy size={18} />
                  ) : (
                    <FileText size={18} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Description {index + 1}
                  </p>

                  {isBest && (
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
                      <Trophy size={13} />
                      Best Description
                    </div>
                  )}

                  <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-gray-200">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <MetricCard
                      label="Score"
                      value={item.score}
                    />

                    <MetricCard
                      label="SEO"
                      value={item.seo}
                    />

                    <MetricCard
                      label="Engagement"
                      value={item.engagement}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ======================================================
  // HASHTAG GENERATOR
  // ======================================================

  if (toolId === "hashtag-generator") {
    const hashtags: string[] =
      parsedResult &&
      Array.isArray(parsedResult.hashtags)
        ? parsedResult.hashtags
        : [];

    if (hashtags.length === 0) {
      return <FallbackResult result={result} />;
    }

    return (
      <div className="rounded-2xl border border-white/10 bg-[#050814] p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <Hash size={20} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Generated Hashtags
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {hashtags.length} hashtags saved from this generation
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {hashtags.map((hashtag, index) => (
            <div
              key={`${hashtag}-${index}`}
              className="rounded-xl border border-purple-500/20 bg-purple-500/[0.06] px-4 py-2.5 text-sm font-medium text-purple-300 transition hover:border-purple-500/40 hover:bg-purple-500/10"
            >
              {hashtag}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ======================================================
  // TAGS GENERATOR
  // ======================================================

  if (toolId === "tags-generator") {
    const tagsResults: TagsResult[] =
      parsedResult &&
      Array.isArray(parsedResult.results)
        ? parsedResult.results
        : [];

    if (tagsResults.length === 0) {
      return <FallbackResult result={result} />;
    }

    const bestScore = Math.max(
      ...tagsResults.map((item) =>
        Number(item.score) || 0
      )
    );

    return (
      <div className="space-y-4">
        {tagsResults.map((item, index) => {
          const isBest =
            Number(item.score) === bestScore;

          return (
            <div
              key={index}
              className={`rounded-2xl border p-6 transition-all duration-300 ${
                isBest
                  ? "border-yellow-500/30 bg-yellow-500/[0.04] shadow-lg shadow-yellow-500/5"
                  : "border-white/10 bg-[#050814] hover:border-blue-500/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    isBest
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-cyan-500/10 text-cyan-400"
                  }`}
                >
                  {isBest ? (
                    <Trophy size={19} />
                  ) : (
                    <Tags size={19} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Tag Set {index + 1}
                      </p>

                      {isBest && (
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
                          <Trophy size={13} />
                          Best Tag Set
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-cyan-500/10 bg-cyan-500/[0.03] p-5">
                    <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-200">
                      {item.tags}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                    <MetricCard
                      label="Score"
                      value={item.score}
                    />

                    <MetricCard
                      label="CTR"
                      value={item.ctr}
                    />

                    <MetricCard
                      label="SEO"
                      value={item.seo}
                    />

                    <MetricCard
                      label="Trending"
                      value={item.trending}
                    />

                    <MetricCard
                      label="Viral"
                      value={item.viral}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ======================================================
  // SCRIPT WRITER
  // ======================================================

  if (toolId === "script-writer") {
    const scripts: ScriptResult[] =
      parsedResult &&
      Array.isArray(parsedResult.results)
        ? parsedResult.results
        : [];

    if (scripts.length === 0) {
      return <FallbackResult result={result} />;
    }

    const bestScore = Math.max(
      ...scripts.map((item) =>
        Number(item.score) || 0
      )
    );

    return (
      <div className="space-y-5">
        {scripts.map((item, index) => {
          const isBest =
            Number(item.score) === bestScore;

          return (
            <div
              key={index}
              className={`rounded-2xl border p-6 ${
                isBest
                  ? "border-yellow-500/30 bg-yellow-500/[0.04]"
                  : "border-white/10 bg-[#050814]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    isBest
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {isBest ? (
                    <Trophy size={19} />
                  ) : (
                    <ScrollText size={19} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Script {index + 1}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>

                    {isBest && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
                        <Trophy size={13} />
                        Best Script
                      </span>
                    )}
                  </div>

                  <div className="mt-5 rounded-xl border border-blue-500/10 bg-blue-500/[0.03] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Hook
                    </p>
                    <p className="mt-2 text-sm leading-7 text-gray-200">
                      {item.hook}
                    </p>
                  </div>

                  <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Complete Script
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-200">
                      {item.script}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <MetricCard
                      label="Score"
                      value={item.score}
                    />

                    <MetricCard
                      label="Engagement"
                      value={item.engagement}
                    />

                    <MetricCard
                      label="Structure"
                      value={item.structure}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ======================================================
  // SHORTS IDEAS
  // ======================================================

  if (toolId === "shorts-ideas") {
    const shorts: ShortsResult[] =
      parsedResult &&
      Array.isArray(parsedResult.results)
        ? parsedResult.results
        : [];

    if (shorts.length === 0) {
      return <FallbackResult result={result} />;
    }

    const bestScore = Math.max(
      ...shorts.map((item) =>
        Number(item.score) || 0
      )
    );

    return (
      <div className="space-y-5">
        {shorts.map((item, index) => {
          const isBest =
            Number(item.score) === bestScore;

          return (
            <div
              key={index}
              className={`rounded-2xl border p-6 ${
                isBest
                  ? "border-yellow-500/30 bg-yellow-500/[0.04]"
                  : "border-white/10 bg-[#050814]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    isBest
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-orange-500/10 text-orange-400"
                  }`}
                >
                  {isBest ? (
                    <Trophy size={19} />
                  ) : (
                    <Lightbulb size={19} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Shorts Idea {index + 1}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>

                    {isBest && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
                        <Trophy size={13} />
                        Best Idea
                      </span>
                    )}
                  </div>

                  <ContentBlock
                    label="Hook"
                    value={item.hook}
                  />

                  <ContentBlock
                    label="Concept"
                    value={item.concept}
                  />

                  <ContentBlock
                    label="Structure"
                    value={item.structure}
                  />

                  <ContentBlock
                    label="CTA"
                    value={item.cta}
                  />

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <MetricCard
                      label="Score"
                      value={item.score}
                    />

                    <MetricCard
                      label="Viral"
                      value={item.viral}
                    />

                    <MetricCard
                      label="Engagement"
                      value={item.engagement}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ======================================================
  // THUMBNAIL TITLE
  // ======================================================

  if (toolId === "thumbnail-title") {
    const thumbnails: ThumbnailResult[] =
      parsedResult &&
      Array.isArray(parsedResult.results)
        ? parsedResult.results
        : [];

    if (thumbnails.length === 0) {
      return <FallbackResult result={result} />;
    }

    const bestScore = Math.max(
      ...thumbnails.map((item) =>
        Number(item.score) || 0
      )
    );

    return (
      <div className="space-y-4">
        {thumbnails.map((item, index) => {
          const isBest =
            Number(item.score) === bestScore;

          return (
            <div
              key={index}
              className={`rounded-2xl border p-6 ${
                isBest
                  ? "border-yellow-500/30 bg-yellow-500/[0.04]"
                  : "border-white/10 bg-[#050814]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    isBest
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-pink-500/10 text-pink-400"
                  }`}
                >
                  {isBest ? (
                    <Trophy size={19} />
                  ) : (
                    <Image size={19} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Thumbnail Title {index + 1}
                  </p>

                  <div className="mt-3 rounded-xl border border-pink-500/10 bg-pink-500/[0.03] p-5">
                    <p className="text-xl font-bold leading-8 text-white">
                      {item.title}
                    </p>
                  </div>

                  {isBest && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
                      <Trophy size={13} />
                      Best Thumbnail Title
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <MetricCard
                      label="Score"
                      value={item.score}
                    />

                    <MetricCard
                      label="CTR"
                      value={item.ctr}
                    />

                    <MetricCard
                      label="Curiosity"
                      value={item.curiosity}
                    />

                    <MetricCard
                      label="Engagement"
                      value={item.engagement}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ======================================================
  // SEO CHECKER
  // ======================================================

  if (toolId === "seo-checker") {
    if (
      !parsedResult ||
      typeof parsedResult !== "object" ||
      typeof parsedResult.overallScore !== "number"
    ) {
      return <FallbackResult result={result} />;
    }

    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-blue-500/20 bg-blue-500/10">
              <span className="text-2xl font-bold text-blue-400">
                {parsedResult.overallScore}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Search
                  size={20}
                  className="text-blue-400"
                />
                <h3 className="text-xl font-bold text-white">
                  SEO Analysis
                </h3>
              </div>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Saved SEO analysis and optimization results.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <MetricCard
            label="Overall"
            value={parsedResult.overallScore}
          />

          <MetricCard
            label="Title"
            value={parsedResult.titleScore}
          />

          <MetricCard
            label="Description"
            value={parsedResult.descriptionScore}
          />

          <MetricCard
            label="Keyword"
            value={parsedResult.keywordScore}
          />

          <MetricCard
            label="Search Intent"
            value={parsedResult.searchIntentScore}
          />

          <MetricCard
            label="Readability"
            value={parsedResult.readabilityScore}
          />
        </div>

        <ListSection
          title="Strengths"
          items={parsedResult.strengths}
          icon={
            <CheckCircle2
              size={19}
              className="text-green-400"
            />
          }
          iconBg="bg-green-500/10"
        />

        <ListSection
          title="Improvements"
          items={parsedResult.improvements}
          icon={
            <AlertCircle
              size={19}
              className="text-orange-400"
            />
          }
          iconBg="bg-orange-500/10"
        />

        <ListSection
          title="Recommendations"
          items={parsedResult.recommendations}
          icon={
            <Sparkles
              size={19}
              className="text-purple-400"
            />
          }
          iconBg="bg-purple-500/10"
        />
      </div>
    );
  }

  // ======================================================
  // KEYWORD GENERATOR
  // ======================================================

  if (toolId === "keyword-generator") {
    const keywords: KeywordResult[] =
      parsedResult &&
      Array.isArray(parsedResult.results)
        ? parsedResult.results
        : [];

    if (keywords.length === 0) {
      return <FallbackResult result={result} />;
    }

    const bestScore = Math.max(
      ...keywords.map((item) =>
        Number(item.score) || 0
      )
    );

    return (
      <div className="space-y-4">
        {keywords.map((item, index) => {
          const isBest =
            Number(item.score) === bestScore;

          return (
            <div
              key={index}
              className={`rounded-2xl border p-5 ${
                isBest
                  ? "border-yellow-500/30 bg-yellow-500/[0.04]"
                  : "border-white/10 bg-[#050814]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    isBest
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {isBest ? (
                    <Trophy size={19} />
                  ) : (
                    <KeyRound size={19} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      {item.keyword}
                    </h3>

                    {isBest && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
                        <Trophy size={13} />
                        Best Keyword
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <MetricCard
                      label="Score"
                      value={item.score}
                    />

                    <MetricCard
                      label="Search Intent"
                      value={item.searchIntent}
                    />

                    <MetricCard
                      label="Relevance"
                      value={item.relevance}
                    />

                    <MetricCard
                      label="Opportunity"
                      value={item.opportunity}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ======================================================
  // BEST UPLOAD TIME
  // ======================================================

  if (toolId === "best-upload-time") {
    const uploadTimes: UploadTimeResult[] =
      parsedResult &&
      Array.isArray(parsedResult.results)
        ? parsedResult.results
        : [];

    if (uploadTimes.length === 0) {
      return <FallbackResult result={result} />;
    }

    const bestScore = Math.max(
      ...uploadTimes.map((item) =>
        Number(item.score) || 0
      )
    );

    return (
      <div className="space-y-4">
        {uploadTimes.map((item, index) => {
          const isBest =
            Number(item.score) === bestScore;

          return (
            <div
              key={index}
              className={`rounded-2xl border p-6 ${
                isBest
                  ? "border-yellow-500/30 bg-yellow-500/[0.04]"
                  : "border-white/10 bg-[#050814]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    isBest
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-violet-500/10 text-violet-400"
                  }`}
                >
                  {isBest ? (
                    <Trophy size={19} />
                  ) : (
                    <Clock3 size={19} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Upload Time {index + 1}
                      </p>

                      <h3 className="mt-2 text-xl font-bold text-white">
                        {item.day} — {item.time}
                      </h3>
                    </div>

                    {isBest && (
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
                        <Trophy size={13} />
                        Best Time
                      </span>
                    )}
                  </div>

                  <div className="mt-5 rounded-xl border border-violet-500/10 bg-violet-500/[0.03] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                      Why This Time
                    </p>

                    <p className="mt-2 text-sm leading-7 text-gray-200">
                      {item.reason}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <MetricCard
                      label="Score"
                      value={item.score}
                    />

                    <MetricCard
                      label="Audience Activity"
                      value={item.audienceActivity}
                    />

                    <MetricCard
                      label="Competition"
                      value={item.competition}
                    />
                  </div>

                  <div className="mt-4 rounded-xl border border-green-500/10 bg-green-500/[0.03] p-4">
                    <div className="flex items-start gap-3">
                      <Target
                        size={18}
                        className="mt-0.5 shrink-0 text-green-400"
                      />

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
                          Recommendation
                        </p>

                        <p className="mt-2 text-sm leading-6 text-gray-300">
                          {item.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ======================================================
  // FALLBACK
  // ======================================================

  return <FallbackResult result={result} />;
}

// ========================================================
// REUSABLE METRIC CARD
// ========================================================

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
}

// ========================================================
// CONTENT BLOCK
// ========================================================

function ContentBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>

      <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-200">
        {value}
      </p>
    </div>
  );
}

// ========================================================
// LIST SECTION
// ========================================================

function ListSection({
  title,
  items,
  icon,
  iconBg,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  iconBg: string;
}) {
  const safeItems = Array.isArray(items)
    ? items
    : [];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#050814] p-6">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>

        <h3 className="text-lg font-bold text-white">
          {title}
        </h3>
      </div>

      {safeItems.length > 0 ? (
        <div className="mt-5 space-y-3">
          {safeItems.map(
            (item, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
              >
                <p className="text-sm leading-6 text-gray-300">
                  {item}
                </p>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="mt-5 text-sm text-gray-500">
          No items available.
        </p>
      )}
    </div>
  );
}

// ========================================================
// FALLBACK RESULT
// ========================================================

function FallbackResult({
  result,
}: {
  result: any;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#050814] p-6">
      <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-gray-200">
        {typeof result === "string"
          ? result
          : JSON.stringify(
              result,
              null,
              2
            )}
      </pre>
    </div>
  );
}