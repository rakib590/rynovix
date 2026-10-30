
"use client";

import Link from "next/link";
import {
  MessageCircle,
  Image as ImageIcon,
  Video,
  Mic,
  WandSparkles,
  Scissors,
  Sparkles,
  Shirt,
  Maximize,
  UserRound,
  PanelsTopLeft,
  Shapes,
  Palette,
  RefreshCw,
  Clapperboard,
  Captions,
  AudioLines,
  Workflow,
  Trophy,
  FileText,
  Hash,
  Tags,
  PenLine,
  Lightbulb,
  Target,
  TrendingUp,
  Globe,
  CalendarDays,
  Search,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import SearchTools from "./SearchTools";
import ToolCategories from "./ToolCategories";

type ToolCategory =
  | "AI Assistant & Generators"
  | "Image & Creative Tools"
  | "Video Tools"
  | "YouTube SEO Tools";

type Tool = {
  order: number;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  image: string;
  secondaryImage?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeVideo?: string;
  afterVideo?: string;
  category: ToolCategory;
};

const tools: Tool[] = [
  // 1–4: AI Assistant & Generators
  {
    order: 1,
    title: "AI Chat Assistant",
    description: "Brainstorm ideas, get answers, and plan creative projects with AI.",
    icon: MessageCircle,
    image: "/images/tools/ai-chat-assistant.png",
    secondaryImage: "/images/tools/ai-chat-assistant-2.png",
    href: "/dashboard/tools/ai-chat-assistant",
    category: "AI Assistant & Generators",
  },
  {
    order: 2,
    title: "AI Image Generator",
    description: "Turn your imagination into stunning visual concepts.",
    icon: ImageIcon,
    image: "/images/tools/ai-image-generator.png",
    secondaryImage: "/images/tools/ai-image-generator-2.png",
    href: "/dashboard/tools/ai-image-generator",
    category: "AI Assistant & Generators",
  },
  {
    order: 3,
    title: "AI Video Generator",
    description: "Explore cinematic video ideas from text or image prompts.",
    icon: Video,
    image: "/images/tools/ai-video-generator.png",
    secondaryImage: "/images/tools/ai-video-generator-2.png",
    href: "/dashboard/tools/ai-video-generator",
    category: "AI Assistant & Generators",
  },
  {
    order: 4,
    title: "AI Voice Generator",
    description: "Create natural-sounding voiceovers for your content.",
    icon: Mic,
    image: "/images/tools/ai-voice-generator.png",
    secondaryImage: "/images/tools/ai-voice-generator-2.png",
    href: "/dashboard/tools/ai-voice-generator",
    category: "AI Assistant & Generators",
  },

  // 5–14: Image & Creative Tools
  {
    order: 5,
    title: "AI Image Editor",
    description: "Explore creative image editing and visual effects.",
    icon: WandSparkles,
    image: "/images/tools/ai-image-editor.png",
    href: "/dashboard/tools/ai-image-editor",
    category: "Image & Creative Tools",
  },
  {
    order: 6,
    title: "AI Background Remover",
    description: "Compare the original image with the background-removed result.",
    icon: Scissors,
    image: "/images/tools/background-remover-before.png",
    beforeImage: "/images/tools/background-remover-before.png",
    afterImage: "/images/tools/background-remover-after.png",
    href: "/dashboard/tools/ai-background-remover",
    category: "Image & Creative Tools",
  },
  {
    order: 7,
    title: "AI Photo Enhancer",
    description: "Compare photo samples with the enhanced preview.",
    icon: Sparkles,
    image: "/images/tools/ai-photo-enhancer-after.png",
    beforeImage: "/images/tools/ai-photo-enhancer-before.png",
    afterImage: "/images/tools/ai-photo-enhancer-after.png",
    href: "/dashboard/tools/ai-photo-enhancer",
    category: "Image & Creative Tools",
  },
  {
    order: 8,
    title: "AI Clothes Changer",
    description: "Explore fashion styling concepts with a visual comparison.",
    icon: Shirt,
    image: "/images/tools/ai-clothes-changer.png",
    beforeImage: "/images/tools/ai-clothes-changer-before.png",
    afterImage: "/images/tools/ai-clothes-changer-after.png",
    href: "/dashboard/tools/ai-clothes-changer",
    category: "Image & Creative Tools",
  },
  {
    order: 9,
    title: "AI Image Upscaler",
    description: "Compare image samples and explore image clarity.",
    icon: Maximize,
    image: "/images/tools/ai-image-upscaler-after.png",
    beforeImage: "/images/tools/ai-image-upscaler-before.png",
    afterImage: "/images/tools/ai-image-upscaler-after.png",
    href: "/dashboard/tools/ai-image-upscaler",
    category: "Image & Creative Tools",
  },
  {
    order: 10,
    title: "AI Avatar Generator",
    description: "Explore avatar concepts for your online identity.",
    icon: UserRound,
    image: "/images/tools/ai-avatar-generator-after.png",
    beforeImage: "/images/tools/ai-avatar-generator-before.png",
    afterImage: "/images/tools/ai-avatar-generator-after.png",
    href: "/dashboard/tools/ai-avatar-generator",
    category: "Image & Creative Tools",
  },
  {
    order: 11,
    title: "AI UI Mockup Generator",
    description: "Discover concepts for modern app and website interfaces.",
    icon: PanelsTopLeft,
    image: "/images/tools/ai-ui-mockup-generator.png",
    href: "/dashboard/tools/ai-ui-mockup-generator",
    category: "Image & Creative Tools",
  },
  {
    order: 12,
    title: "AI Logo Generator",
    description: "Explore logo concepts for your brand.",
    icon: Shapes,
    image: "/images/tools/ai-logo-generator.png",
    href: "/dashboard/tools/ai-logo-generator",
    category: "Image & Creative Tools",
  },
  {
    order: 13,
    title: "AI Color Palette Generator",
    description: "Explore color combinations for design and branding.",
    icon: Palette,
    image: "/images/tools/ai-color-palette-generator.png",
    href: "/dashboard/tools/ai-color-palette-generator",
    category: "Image & Creative Tools",
  },
  {
    order: 14,
    title: "Image Converter",
    description: "Prepare images for different formats and workflows.",
    icon: RefreshCw,
    image: "/images/tools/image-converter.png",
    href: "/dashboard/tools/image-converter",
    category: "Image & Creative Tools",
  },

  // 15–22: Video Tools
  {
    order: 15,
    title: "AI Video Prompt Enhancer",
    description: "Develop detailed prompts from rough video ideas.",
    icon: WandSparkles,
    image: "/images/tools/ai-video-prompt-enhancer.png",
    href: "/dashboard/tools/ai-video-prompt-enhancer",
    category: "Video Tools",
  },
  {
    order: 16,
    title: "AI Video Hook Generator",
    description: "Explore attention-grabbing video opening ideas.",
    icon: Clapperboard,
    image: "/images/tools/ai-video-hook-generator.png",
    href: "/dashboard/tools/ai-video-hook-generator",
    category: "Video Tools",
  },
  {
    order: 17,
    title: "AI B-Roll Generator",
    description: "Discover supporting footage ideas for your videos.",
    icon: Video,
    image: "/images/tools/ai-b-roll-generator.png",
    href: "/dashboard/tools/ai-b-roll-generator",
    category: "Video Tools",
  },
  {
    order: 18,
    title: "AI Video Scene Splitter",
    description: "Explore a scene-by-scene video organization workflow.",
    icon: Scissors,
    image: "/images/tools/ai-video-scene-splitter.png",
    href: "/dashboard/tools/ai-video-scene-splitter",
    category: "Video Tools",
  },
  {
    order: 19,
    title: "AI Subtitle Generator",
    description: "Explore subtitles for more accessible videos.",
    icon: Captions,
    image: "/images/tools/ai-subtitle-generator.png",
    href: "/dashboard/tools/ai-subtitle-generator",
    category: "Video Tools",
  },
  {
    order: 20,
    title: "AI Voice Sync Tool",
    description: "Explore voice and video synchronization concepts.",
    icon: AudioLines,
    image: "/images/tools/ai-voice-sync-tool.png",
    href: "/dashboard/tools/ai-voice-sync",
    category: "Video Tools",
  },
  {
    order: 21,
    title: "AI Video Enhancer",
    description: "Compare sample footage in a visual preview.",
    icon: Sparkles,
    image: "/images/tools/video-enhancer-before.png",
    beforeVideo: "/images/tools/ai-video-enhancer-before.mp4",
    afterVideo: "/images/tools/ai-video-enhancer-after.mp4",
    href: "/dashboard/tools/ai-video-enhancer",
    category: "Video Tools",
  },
  {
    order: 22,
    title: "AI Video Workflow Automation",
    description: "Organize and streamline your video production workflow.",
    icon: Workflow,
    image: "/images/tools/ai-video-workflow-automation.png",
    href: "/dashboard/tools/ai-video-workflow-automation",
    category: "Video Tools",
  },

  // 23–32: YouTube SEO Tools
  {
    order: 23,
    title: "Title Generator",
    description: "Generate engaging titles for your YouTube videos.",
    icon: Trophy,
    image: "/images/tools/title-generator.png",
    href: "/dashboard/tools/title-generator",
    category: "YouTube SEO Tools",
  },
  {
    order: 24,
    title: "Description Generator",
    description: "Create SEO-friendly video descriptions.",
    icon: FileText,
    image: "/images/tools/description-generator.png",
    href: "/dashboard/tools/description-generator",
    category: "YouTube SEO Tools",
  },
  {
    order: 25,
    title: "Hashtag Generator",
    description: "Find relevant hashtags for your content.",
    icon: Hash,
    image: "/images/tools/hashtag-generator.png",
    href: "/dashboard/tools/hashtag-generator",
    category: "YouTube SEO Tools",
  },
  {
    order: 26,
    title: "Tags Generator",
    description: "Generate useful tags for video discoverability.",
    icon: Tags,
    image: "/images/tools/tags-generator.png",
    href: "/dashboard/tools/tags-generator",
    category: "YouTube SEO Tools",
  },
  {
    order: 27,
    title: "Script Writer",
    description: "Draft engaging scripts for your videos.",
    icon: PenLine,
    image: "/images/tools/script-writer.png",
    href: "/dashboard/tools/script-writer",
    category: "YouTube SEO Tools",
  },
  {
    order: 28,
    title: "Shorts Ideas",
    description: "Explore ideas for your next YouTube Short.",
    icon: Lightbulb,
    image: "/images/tools/shorts-ideas.png",
    href: "/dashboard/tools/shorts-ideas",
    category: "YouTube SEO Tools",
  },
  {
    order: 29,
    title: "Thumbnail Title",
    description: "Create compelling thumbnail titles.",
    icon: Target,
    image: "/images/tools/thumbnail-title.png",
    href: "/dashboard/tools/thumbnail-title",
    category: "YouTube SEO Tools",
  },
  {
    order: 30,
    title: "SEO Checker",
    description: "Review your video's SEO and discover improvements.",
    icon: TrendingUp,
    image: "/images/tools/seo-checker.png",
    href: "/dashboard/tools/seo-checker",
    category: "YouTube SEO Tools",
  },
  {
    order: 31,
    title: "Keyword Generator",
    description: "Discover keywords for your content strategy.",
    icon: Globe,
    image: "/images/tools/keyword-generator.png",
    href: "/dashboard/tools/keyword-generator",
    category: "YouTube SEO Tools",
  },
  {
    order: 32,
    title: "Best Upload Time",
    description: "Explore scheduling ideas for your videos.",
    icon: CalendarDays,
    image: "/images/tools/best-upload-time.png",
    href: "/dashboard/tools/best-upload-time",
    category: "YouTube SEO Tools",
  },
];

const categories = [
  "All Tools",
  "AI Assistant & Generators",
  "Image & Creative Tools",
  "Video Tools",
  "YouTube SEO Tools",
];

function RotatingPreview({ tool }: { tool: Tool }) {
  const [showSecondary, setShowSecondary] = useState(false);

  useEffect(() => {
    if (!tool.secondaryImage) return;

    const interval = window.setInterval(() => {
      setShowSecondary((current) => !current);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [tool.secondaryImage]);

  const src =
    showSecondary && tool.secondaryImage
      ? tool.secondaryImage
      : tool.image;

  return (
    <img
      src={src}
      alt={tool.title}
      loading={tool.order <= 4 ? "eager" : "lazy"}
      className="h-full w-full object-cover transition-opacity duration-500"
    />
  );
}

function ImageComparison({ tool }: { tool: Tool }) {
  const [position, setPosition] = useState(50);

  if (!tool.beforeImage || !tool.afterImage) return null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-900">
      <img
        src={tool.afterImage}
        alt={`${tool.title} result`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={tool.beforeImage}
          alt={`${tool.title} original`}
          loading="lazy"
          className="absolute inset-y-0 left-0 h-full max-w-none object-cover"
          style={{ width: `${10000 / position}%` }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-slate-950/80 text-xs text-white">
          ↔
        </span>
      </div>

      <span className="absolute left-2 top-2 z-20 rounded-md bg-black/65 px-2 py-1 text-[10px] font-semibold text-white">
        BEFORE
      </span>
      <span className="absolute right-2 top-2 z-20 rounded-md bg-blue-600/90 px-2 py-1 text-[10px] font-semibold text-white">
        AFTER
      </span>

      <input
        aria-label={`Compare ${tool.title} before and after`}
        type="range"
        min="1"
        max="99"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-x-2 bottom-2 z-30 w-[calc(100%-1rem)] cursor-ew-resize accent-white"
      />
    </div>
  );
}

function VideoComparison({ tool }: { tool: Tool }) {
  if (!tool.beforeVideo || !tool.afterVideo) return null;

  return (
    <div className="grid h-full w-full grid-cols-2 gap-0.5 bg-slate-950">
      <div className="relative min-w-0 overflow-hidden">
        <video
          src={tool.beforeVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-1 text-[9px] font-bold text-white">
          BEFORE
        </span>
      </div>
      <div className="relative min-w-0 overflow-hidden">
        <video
          src={tool.afterVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-1.5 top-1.5 rounded bg-blue-600/90 px-1.5 py-1 text-[9px] font-bold text-white">
          AFTER
        </span>
      </div>
    </div>
  );
}

function ToolPreview({ tool }: { tool: Tool }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-slate-900">
      {tool.beforeVideo && tool.afterVideo ? (
        <VideoComparison tool={tool} />
      ) : tool.beforeImage && tool.afterImage ? (
        <ImageComparison tool={tool} />
      ) : (
        <RotatingPreview tool={tool} />
      )}

      <span className="absolute bottom-2 right-2 z-20 rounded-md border border-white/15 bg-black/60 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
        {String(tool.order).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function ToolGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Tools");
  const [sort, setSort] = useState("popular");

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tools
      .filter((tool) => {
        const matchesSearch =
          !query ||
          tool.title.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query);

        const matchesCategory =
          activeCategory === "All Tools" ||
          tool.category === activeCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === "az") return a.title.localeCompare(b.title);
        if (sort === "newest") return b.order - a.order;
        return a.order - b.order;
      });
  }, [search, activeCategory, sort]);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-3">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1 overflow-x-auto">
            <ToolCategories
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <SearchTools
              search={search}
              onSearchChange={setSearch}
              sort={sort}
              onSortChange={setSort}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredTools.length}
          </span>{" "}
          of {tools.length} tools
        </p>
        <p className="text-xs text-gray-500">
          Select a card to open its tool
        </p>
      </div>

      {filteredTools.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#0B1220] py-16 text-center">
          <Search size={40} className="mx-auto text-gray-600" />
          <h3 className="mt-4 text-lg font-semibold text-white">
            No Tools Found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Try a different search or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveCategory("All Tools");
              setSort("popular");
            }}
            className="mt-5 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/5"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] transition duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <ToolPreview tool={tool} />

                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10 text-blue-300">
                      <Icon size={20} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-base font-semibold text-white transition group-hover:text-blue-300">
                        {tool.title}
                      </h3>
                      <p className="mt-1 text-[11px] text-gray-500">
                        {tool.category}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
                    {tool.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-sm font-semibold text-blue-400">
                    <span>Explore Tool</span>
                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
