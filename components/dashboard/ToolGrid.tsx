
"use client";

import { useEffect, useMemo, useState } from "react";
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
  ArrowUpDown,
  ArrowRight,
  SlidersHorizontal,
  X,
} from "lucide-react";

type Tool = {
  title: string;
  description: string;
  icon: typeof ImageIcon;
  href: string;
  category: string;
  image: string;
  secondaryImage?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeVideo?: string;
  afterVideo?: string;
  popularity: number;
  newest: number;
};

const tools: Tool[] = [
  // AI Assistant & Generators
  {
    title: "AI Chat Assistant",
    description: "Brainstorm ideas, get answers, and plan creative projects with AI.",
    icon: MessageCircle,
    href: "/dashboard/tools/ai-chat-assistant",
    category: "AI Assistant & Generators",
    image: "/images/tools/ai-chat-assistant.png",
    secondaryImage: "/images/tools/ai-chat-assistant-2.png",
    popularity: 1,
    newest: 1,
  },
  {
    title: "AI Image Generator",
    description: "Turn your imagination into stunning visual concepts.",
    icon: ImageIcon,
    href: "/dashboard/tools/ai-image-generator",
    category: "AI Assistant & Generators",
    image: "/images/tools/ai-image-generator.png",
    secondaryImage: "/images/tools/ai-image-generator-2.png",
    popularity: 2,
    newest: 2,
  },
  {
    title: "AI Video Generator",
    description: "Explore cinematic video ideas from text or image prompts.",
    icon: Video,
    href: "/dashboard/tools/ai-video-generator",
    category: "AI Assistant & Generators",
    image: "/images/tools/ai-video-generator.png",
    secondaryImage: "/images/tools/ai-video-generator-2.png",
    popularity: 3,
    newest: 3,
  },
  {
    title: "AI Voice Generator",
    description: "Create natural-sounding voiceovers for your content.",
    icon: Mic,
    href: "/dashboard/tools/ai-voice-generator",
    category: "AI Assistant & Generators",
    image: "/images/tools/ai-voice-generator.png",
    secondaryImage: "/images/tools/ai-voice-generator-2.png",
    popularity: 4,
    newest: 4,
  },

  // Image & Creative Tools
  {
    title: "AI Image Editor",
    description: "Explore creative image editing and visual effects.",
    icon: WandSparkles,
    href: "/dashboard/tools/ai-image-editor",
    category: "Image & Creative Tools",
    image: "/images/tools/ai-image-editor.png",
    popularity: 5,
    newest: 5,
  },
  {
    title: "AI Background Remover",
    description: "Compare two visual samples using the interactive slider.",
    icon: Scissors,
    href: "/dashboard/tools/ai-background-remover",
    category: "Image & Creative Tools",
    image: "/images/tools/background-remover-before.png",
    beforeImage: "/images/tools/background-remover-before.png",
    afterImage: "/images/tools/background-remover-after.png",
    popularity: 6,
    newest: 6,
  },
  {
    title: "AI Photo Enhancer",
    description: "Compare photo samples with the interactive preview.",
    icon: Sparkles,
    href: "/dashboard/tools/ai-photo-enhancer",
    category: "Image & Creative Tools",
    image: "/images/tools/ai-photo-enhancer-after.png",
    beforeImage: "/images/tools/ai-photo-enhancer-before.png",
    afterImage: "/images/tools/ai-photo-enhancer-after.png",
    popularity: 7,
    newest: 7,
  },
  {
    title: "AI Clothes Changer",
    description: "Explore fashion styling concepts with a visual comparison.",
    icon: Shirt,
    href: "/dashboard/tools/ai-clothes-changer",
    category: "Image & Creative Tools",
    image: "/images/tools/ai-clothes-changer.png",
    beforeImage: "/images/tools/ai-clothes-changer-before.png",
    afterImage: "/images/tools/ai-clothes-changer-after.png",
    popularity: 8,
    newest: 8,
  },
  {
    title: "AI Image Upscaler",
    description: "Compare image samples and explore image clarity.",
    icon: Maximize,
    href: "/dashboard/tools/ai-image-upscaler",
    category: "Image & Creative Tools",
    image: "/images/tools/ai-image-upscaler-after.png",
    beforeImage: "/images/tools/ai-image-upscaler-before.png",
    afterImage: "/images/tools/ai-image-upscaler-after.png",
    popularity: 9,
    newest: 9,
  },
  {
    title: "AI Avatar Generator",
    description: "Explore avatar concepts for your online identity.",
    icon: UserRound,
    href: "/dashboard/tools/ai-avatar-generator",
    category: "Image & Creative Tools",
    image: "/images/tools/ai-avatar-generator-after.png",
    beforeImage: "/images/tools/ai-avatar-generator-before.png",
    afterImage: "/images/tools/ai-avatar-generator-after.png",
    popularity: 10,
    newest: 10,
  },
  {
    title: "AI UI Mockup Generator",
    description: "Discover concepts for modern app and website interfaces.",
    icon: PanelsTopLeft,
    href: "/dashboard/tools/ai-ui-mockup-generator",
    category: "Image & Creative Tools",
    image: "/images/tools/ai-ui-mockup-generator.png",
    popularity: 11,
    newest: 11,
  },
  {
    title: "AI Logo Generator",
    description: "Explore logo concepts for your brand.",
    icon: Shapes,
    href: "/dashboard/tools/ai-logo-generator",
    category: "Image & Creative Tools",
    image: "/images/tools/ai-logo-generator.png",
    popularity: 12,
    newest: 12,
  },
  {
    title: "AI Color Palette Generator",
    description: "Explore color combinations for design and branding.",
    icon: Palette,
    href: "/dashboard/tools/ai-color-palette-generator",
    category: "Image & Creative Tools",
    image: "/images/tools/ai-color-palette-generator.png",
    popularity: 13,
    newest: 13,
  },
  {
    title: "Image Converter",
    description: "Prepare images for different formats and workflows.",
    icon: RefreshCw,
    href: "/dashboard/tools/image-converter",
    category: "Image & Creative Tools",
    image: "/images/tools/image-converter.png",
    popularity: 14,
    newest: 14,
  },

  // Video Tools
  {
    title: "AI Video Prompt Enhancer",
    description: "Develop detailed prompts from rough video ideas.",
    icon: WandSparkles,
    href: "/dashboard/tools/ai-video-prompt-enhancer",
    category: "Video Tools",
    image: "/images/tools/ai-video-prompt-enhancer.png",
    popularity: 15,
    newest: 15,
  },
  {
    title: "AI Video Hook Generator",
    description: "Explore attention-grabbing video opening ideas.",
    icon: Clapperboard,
    href: "/dashboard/tools/ai-video-hook-generator",
    category: "Video Tools",
    image: "/images/tools/ai-video-hook-generator.png",
    popularity: 16,
    newest: 16,
  },
  {
    title: "AI B-Roll Generator",
    description: "Discover supporting footage ideas for your videos.",
    icon: Video,
    href: "/dashboard/tools/ai-b-roll-generator",
    category: "Video Tools",
    image: "/images/tools/ai-b-roll-generator.png",
    popularity: 17,
    newest: 17,
  },
  {
    title: "AI Video Scene Splitter",
    description: "Explore a scene-by-scene video organization workflow.",
    icon: Scissors,
    href: "/dashboard/tools/ai-video-scene-splitter",
    category: "Video Tools",
    image: "/images/tools/ai-video-scene-splitter.png",
    popularity: 18,
    newest: 18,
  },
  {
    title: "AI Subtitle Generator",
    description: "Explore subtitles for more accessible videos.",
    icon: Captions,
    href: "/dashboard/tools/ai-subtitle-generator",
    category: "Video Tools",
    image: "/images/tools/ai-subtitle-generator.png",
    popularity: 19,
    newest: 19,
  },
  {
    title: "AI Voice Sync Tool",
    description: "Explore voice and video synchronization concepts.",
    icon: AudioLines,
    href: "/dashboard/tools/ai-voice-sync",
    category: "Video Tools",
    image: "/images/tools/ai-voice-sync-tool.png",
    popularity: 20,
    newest: 20,
  },
  {
    title: "AI Video Enhancer",
    description: "Compare sample footage in a visual preview.",
    icon: Sparkles,
    href: "/dashboard/tools/ai-video-enhancer",
    category: "Video Tools",
    image: "/images/tools/video-enhancer-before.png",
    beforeVideo: "/images/tools/ai-video-enhancer-before.mp4",
    afterVideo: "/images/tools/ai-video-enhancer-after.mp4",
    popularity: 21,
    newest: 21,
  },
  {
    title: "AI Video Workflow Automation",
    description: "Organize and streamline your video production workflow.",
    icon: Workflow,
    href: "/dashboard/tools/ai-video-workflow-automation",
    category: "Video Tools",
    image: "/images/tools/ai-video-workflow-automation.png",
    popularity: 22,
    newest: 22,
  },

  // YouTube SEO Tools
  {
    title: "Title Generator",
    description: "Generate engaging titles for your YouTube videos.",
    icon: Trophy,
    href: "/dashboard/tools/title-generator",
    category: "YouTube SEO Tools",
    image: "/images/tools/title-generator.png",
    popularity: 23,
    newest: 23,
  },
  {
    title: "Description Generator",
    description: "Create SEO-friendly video descriptions.",
    icon: FileText,
    href: "/dashboard/tools/description-generator",
    category: "YouTube SEO Tools",
    image: "/images/tools/description-generator.png",
    popularity: 24,
    newest: 24,
  },
  {
    title: "Hashtag Generator",
    description: "Find relevant hashtags for your content.",
    icon: Hash,
    href: "/dashboard/tools/hashtag-generator",
    category: "YouTube SEO Tools",
    image: "/images/tools/hashtag-generator.png",
    popularity: 25,
    newest: 25,
  },
  {
    title: "Tags Generator",
    description: "Generate useful tags for video discoverability.",
    icon: Tags,
    href: "/dashboard/tools/tags-generator",
    category: "YouTube SEO Tools",
    image: "/images/tools/tags-generator.png",
    popularity: 26,
    newest: 26,
  },
  {
    title: "Script Writer",
    description: "Draft engaging scripts for your videos.",
    icon: PenLine,
    href: "/dashboard/tools/script-writer",
    category: "YouTube SEO Tools",
    image: "/images/tools/script-writer.png",
    popularity: 27,
    newest: 27,
  },
  {
    title: "Shorts Ideas",
    description: "Explore ideas for your next YouTube Short.",
    icon: Lightbulb,
    href: "/dashboard/tools/shorts-ideas",
    category: "YouTube SEO Tools",
    image: "/images/tools/shorts-ideas.png",
    popularity: 28,
    newest: 28,
  },
  {
    title: "Thumbnail Title",
    description: "Create compelling thumbnail titles.",
    icon: Target,
    href: "/dashboard/tools/thumbnail-title",
    category: "YouTube SEO Tools",
    image: "/images/tools/thumbnail-title.png",
    popularity: 29,
    newest: 29,
  },
  {
    title: "SEO Checker",
    description: "Review your video's SEO and discover improvements.",
    icon: TrendingUp,
    href: "/dashboard/tools/seo-checker",
    category: "YouTube SEO Tools",
    image: "/images/tools/seo-checker.png",
    popularity: 30,
    newest: 30,
  },
  {
    title: "Keyword Generator",
    description: "Discover keywords for your content strategy.",
    icon: Globe,
    href: "/dashboard/tools/keyword-generator",
    category: "YouTube SEO Tools",
    image: "/images/tools/keyword-generator.png",
    popularity: 31,
    newest: 31,
  },
  {
    title: "Best Upload Time",
    description: "Explore scheduling ideas for your videos.",
    icon: CalendarDays,
    href: "/dashboard/tools/best-upload-time",
    category: "YouTube SEO Tools",
    image: "/images/tools/best-upload-time.png",
    popularity: 32,
    newest: 32,
  },
];

const categories = [
  "All Tools",
  "AI Assistant & Generators",
  "Image & Creative Tools",
  "Video Tools",
  "YouTube SEO Tools",
];

function RotatingPreview({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [images]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111827]">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {images.map((src, index) => (
          <span
            key={src}
            className={`h-1.5 rounded-full transition-all ${
              activeIndex === index
                ? "w-5 bg-white"
                : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ImageComparison({
  beforeImage,
  afterImage,
  title,
}: {
  beforeImage: string;
  afterImage: string;
  title: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111827]">
      <img
        src={beforeImage}
        alt={`${title} before`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <img
        src={afterImage}
        alt={`${title} after`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      <span className="absolute left-3 top-3 rounded-md bg-black/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded-md bg-blue-600/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-lg">
          <span className="text-sm">↔</span>
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        onClick={(event) => event.preventDefault()}
        aria-label={`Compare before and after for ${title}`}
        className="absolute inset-x-0 bottom-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

function VideoComparison({
  beforeVideo,
  afterVideo,
}: {
  beforeVideo: string;
  afterVideo: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111827]">
      <video
        src={beforeVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <video
        src={afterVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      <span className="absolute left-3 top-3 rounded-md bg-black/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded-md bg-blue-600/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-lg">
          <span className="text-sm">↔</span>
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Compare video before and after"
        className="absolute inset-x-0 bottom-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

function ToolPreview({ tool }: { tool: Tool }) {
  if (tool.beforeVideo && tool.afterVideo) {
    return (
      <VideoComparison
        beforeVideo={tool.beforeVideo}
        afterVideo={tool.afterVideo}
      />
    );
  }

  if (tool.beforeImage && tool.afterImage) {
    return (
      <ImageComparison
        beforeImage={tool.beforeImage}
        afterImage={tool.afterImage}
        title={tool.title}
      />
    );
  }

  if (tool.secondaryImage) {
    return (
      <RotatingPreview
        images={[tool.image, tool.secondaryImage]}
        alt={tool.title}
      />
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111827]">
      <img
        src={tool.image}
        alt={tool.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    </div>
  );
}

export default function ToolGrid() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Tools");
  const [sortBy, setSortBy] = useState("default");

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = tools.filter((tool) => {
      const matchesSearch =
        !query ||
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Tools" || tool.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "az") {
      return [...filtered].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sortBy === "popular") {
      return [...filtered].sort((a, b) => a.popularity - b.popularity);
    }

    if (sortBy === "newest") {
      return [...filtered].sort((a, b) => b.newest - a.newest);
    }

    return filtered;
  }, [search, category, sortBy]);

  return (
    <section className="w-full">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              AI Toolbox
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Explore AI tools for images, videos, creativity, and YouTube SEO.
            </p>
          </div>

          <span className="text-sm font-medium text-gray-400">
            {filteredTools.length} of {tools.length} tools
          </span>
        </div>
      </div>

      {/* Search and sorting */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search all AI tools..."
            aria-label="Search AI tools"
            className="h-12 w-full rounded-xl border border-white/10 bg-[#0B1220] pl-11 pr-10 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="relative sm:w-52">
          <ArrowUpDown
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort tools"
            className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#0B1220] pl-9 pr-4 text-sm text-gray-200 outline-none transition focus:border-blue-500/60"
          >
            <option value="default">Default order</option>
            <option value="popular">Popular</option>
            <option value="az">Name: A–Z</option>
            <option value="newest">Newest first</option>
          </select>
        </div>
      </div>

      {/* Category filters */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => {
          const active = category === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/15"
                  : "border-white/10 bg-[#0B1220] text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Tool cards */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="relative">
                  <ToolPreview tool={tool} />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />

                  <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors group-hover:border-blue-400/40 group-hover:bg-blue-600/80">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="flex h-[174px] flex-col p-4">
                  <h3 className="text-base font-semibold text-white transition-colors group-hover:text-blue-400">
                    {tool.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-400">
                    {tool.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 text-sm font-semibold text-blue-400">
                    <span>Open Tool</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0B1220] px-5 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-gray-400">
            <SlidersHorizontal size={22} />
          </div>

          <h3 className="text-lg font-semibold text-white">
            No tools found
          </h3>

          <p className="mt-2 max-w-sm text-sm text-gray-400">
            Try another search term or select a different category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All Tools");
              setSortBy("default");
            }}
            className="mt-5 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-blue-500/50 hover:bg-blue-500/10"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
