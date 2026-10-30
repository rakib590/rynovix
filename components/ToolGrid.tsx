"use client";

import {
  MessageCircle,
  Image as ImageIcon,
  Video,
  Mic,
  WandSparkles,
  Scissors,
  Maximize,
  UserRound,
  PanelsTopLeft,
  Palette,
  RefreshCw,
  Shapes,
  Sparkles,
  Shirt,
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
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Tool = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  secondaryImage?: string;
  href: string;
  beforeImage?: string;
  afterImage?: string;
  beforeVideo?: string;
  afterVideo?: string;
};

type ToolSection = {
  title: string;
  tools: Tool[];
};

const seo = "/dashboard/tools";
const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

// অপ্টিমাইজড সেকশন এবং টুলের ক্রম বিন্যাস
const sections: ToolSection[] = [
  {
    title: "AI Assistant & Generators",
    tools: [
      {
        title: "AI Chat Assistant",
        description: "Brainstorm ideas, get answers, and plan creative projects with AI.",
        icon: MessageCircle,
        image: "/images/tools/ai-chat-assistant.png",
         secondaryImage: "/images/tools/ai-chat-assistant-2.png",
        href: "/dashboard/tools/ai-chat-assistant",
      },
      {
        title: "AI Image Generator",
        description: "Turn your imagination into stunning visual concepts.",
        icon: ImageIcon,
        image: "/images/tools/ai-image-generator.png",
        secondaryImage: "/images/tools/ai-image-generator-2.png",
        href: "/dashboard/tools/ai-image-generator",
      },
      {
        title: "AI Video Generator",
        description: "Explore cinematic video ideas from text or image prompts.",
        icon: Video,
        image: "/images/tools/ai-video-generator.png",
        secondaryImage: "/images/tools/ai-video-generator-2.png",
        href: "/dashboard/tools/ai-video-generator",
      },
      {
        title: "AI Voice Generator",
        description: "Create natural-sounding voiceovers for your content.",
        icon: Mic,
        image: "/images/tools/ai-voice-generator.png",
        secondaryImage: "/images/tools/ai-voice-generator-2.png",
        href: "/dashboard/tools/ai-voice-generator",
      },
    ],
  },
  {
    title: "Image & Creative Tools",
    tools: [
      {
        title: "AI Image Editor",
        description: "Explore creative image editing and visual effects.",
        icon: WandSparkles,
        image: "/images/tools/ai-image-editor.png",
        href: "/dashboard/tools/ai-image-editor",
      },
      {
        title: "AI Background Remover",
        description: "Compare two visual samples using the interactive slider.",
        icon: Scissors,
        image: "/images/tools/background-remover-before.png",
        beforeImage: "/images/tools/background-remover-before.png",
        afterImage: "/images/tools/background-remover-after.png",
        href: "/dashboard/tools/ai-background-remover",
      },
      {
        title: "AI Photo Enhancer",
        description: "Compare photo samples with the interactive preview.",
        icon: Sparkles,
        image: "/images/tools/ai-photo-enhancer-after.png",
        beforeImage: "/images/tools/ai-photo-enhancer-before.png",
        afterImage: "/images/tools/ai-photo-enhancer-after.png",
        href: "/dashboard/tools/ai-photo-enhancer",
      },
      {
        title: "AI Clothes Changer",
        description: "Explore fashion styling concepts with a visual comparison.",
        icon: Shirt,
        image: "/images/tools/ai-clothes-changer.png",
        beforeImage: "/images/tools/ai-clothes-changer-before.png",
        afterImage: "/images/tools/ai-clothes-changer-after.png",
        href: "/dashboard/tools/ai-clothes-changer",
      },
      {
        title: "AI Image Upscaler",
        description: "Compare image samples and explore image clarity.",
        icon: Maximize,
        image: "/images/tools/ai-image-upscaler-after.png",
        beforeImage: "/images/tools/ai-image-upscaler-before.png",
        afterImage: "/images/tools/ai-image-upscaler-after.png",
        href: "/dashboard/tools/ai-image-upscaler",
      },
      {
        title: "AI Avatar Generator",
        description: "Explore avatar concepts for your online identity.",
        icon: UserRound,
        image: "/images/tools/ai-avatar-generator-after.png",
        beforeImage: "/images/tools/ai-avatar-generator-before.png",
        afterImage: "/images/tools/ai-avatar-generator-after.png",
        href: "/dashboard/tools/ai-avatar-generator",
      },
      {
        title: "AI UI Mockup Generator",
        description: "Discover concepts for modern app and website interfaces.",
        icon: PanelsTopLeft,
        image: "/images/tools/ai-ui-mockup-generator.png",
        href: "/dashboard/tools/ai-ui-mockup-generator",
      },
      {
        title: "AI Logo Generator",
        description: "Explore logo concepts for your brand.",
        icon: Shapes,
        image: "/images/tools/ai-logo-generator.png",
        href: "/dashboard/tools/ai-logo-generator",
      },
      {
        title: "AI Color Palette Generator",
        description: "Explore color combinations for design and branding.",
        icon: Palette,
        image: "/images/tools/ai-color-palette-generator.png",
        href: "/dashboard/tools/ai-color-palette-generator",
      },
      {
        title: "Image Converter",
        description: "Prepare images for different formats and workflows.",
        icon: RefreshCw,
        image: "/images/tools/image-converter.png",
        href: "/dashboard/tools/image-converter",
      },
    ],
  },
  {
    title: "Video Tools",
    tools: [
      {
        title: "AI Video Prompt Enhancer",
        description: "Develop detailed prompts from rough video ideas.",
        icon: WandSparkles,
        image: "/images/tools/ai-video-prompt-enhancer.png",
        href: "/dashboard/tools/ai-video-prompt-enhancer",
      },
      {
        title: "AI Video Hook Generator",
        description: "Explore attention-grabbing video opening ideas.",
        icon: Clapperboard,
        image: "/images/tools/ai-video-hook-generator.png",
        href: "/dashboard/tools/ai-video-hook-generator",
      },
      {
        title: "AI B-Roll Generator",
        description: "Discover supporting footage ideas for your videos.",
        icon: Video,
        image: "/images/tools/ai-b-roll-generator.png",
        href: "/dashboard/tools/ai-b-roll-generator",
      },
      {
        title: "AI Video Scene Splitter",
        description: "Explore a scene-by-scene video organization workflow.",
        icon: Scissors,
        image: "/images/tools/ai-video-scene-splitter.png",
        href: "/dashboard/tools/ai-video-scene-splitter",
      },
      {
        title: "AI Subtitle Generator",
        description: "Explore subtitles for more accessible videos.",
        icon: Captions,
        image: "/images/tools/ai-subtitle-generator.png",
        href: "/dashboard/tools/ai-subtitle-generator",
      },
      {
        title: "AI Voice Sync Tool",
        description: "Explore voice and video synchronization concepts.",
        icon: AudioLines,
        image: "/images/tools/ai-voice-sync-tool.png",
        href: "/dashboard/tools/ai-voice-sync",
      },
      {
        title: "AI Video Enhancer",
        description: "Compare sample footage in a visual preview.",
        icon: Sparkles,
        image: "/images/tools/video-enhancer-before.png",
        beforeVideo: "/images/tools/ai-video-enhancer-before.mp4",
        afterVideo: "/images/tools/ai-video-enhancer-after.mp4",
        href: "/dashboard/tools/ai-video-enhancer",
      },
      {
        title: "AI Video Workflow Automation",
        description: "Organize and streamline your video production workflow.",
        icon: Workflow,
        image: "/images/tools/ai-video-workflow-automation.png",
        href: "/dashboard/tools/ai-video-workflow-automation",
      },
    ],
  },
  {
    title: "YouTube SEO Tools",
    tools: [
      {
        title: "Title Generator",
        description:
          "Generate engaging titles for your YouTube videos.",
        icon: Trophy,
        image: "/images/tools/title-generator.png",
        href: `${seo}/title-generator`,
      },
      {
        title: "Description Generator",
        description:
          "Create SEO-friendly video descriptions.",
        icon: FileText,
        image: "/images/tools/description-generator.png",
        href: `${seo}/description-generator`,
      },
      {
        title: "Hashtag Generator",
        description:
          "Find relevant hashtags for your content.",
        icon: Hash,
        image: "/images/tools/hashtag-generator.png",
        href: `${seo}/hashtag-generator`,
      },
      {
        title: "Tags Generator",
        description:
          "Generate useful tags for video discoverability.",
        icon: Tags,
        image: "/images/tools/tags-generator.png",
        href: `${seo}/tags-generator`,
      },
      {
        title: "Script Writer",
        description:
          "Draft engaging scripts for your videos.",
        icon: PenLine,
        image: "/images/tools/script-writer.png",
        href: `${seo}/script-writer`,
      },
      {
        title: "Shorts Ideas",
        description:
          "Explore ideas for your next YouTube Short.",
        icon: Lightbulb,
        image: "/images/tools/shorts-ideas.png",
        href: `${seo}/shorts-ideas`,
      },
      {
        title: "Thumbnail Title",
        description:
          "Create compelling thumbnail titles.",
        icon: Target,
        image: "/images/tools/thumbnail-title.png",
        href: `${seo}/thumbnail-title`,
      },
      {
        title: "SEO Checker",
        description:
          "Review your video's SEO and discover improvements.",
        icon: TrendingUp,
        image: "/images/tools/seo-checker.png",
        href: `${seo}/seo-checker`,
      },
      {
        title: "Keyword Generator",
        description:
          "Discover keywords for your content strategy.",
        icon: Globe,
        image: "/images/tools/keyword-generator.png",
        href: `${seo}/keyword-generator`,
      },
      {
        title: "Best Upload Time",
        description:
          "Explore scheduling ideas for your videos.",
        icon: CalendarDays,
        image: "/images/tools/best-upload-time.png",
        href: `${seo}/best-upload-time`,
      },
    ],
  },
];



function BeforeAfter({
  before,
  after,
  beforeVideo,
  afterVideo,
  title,
}: {
  before?: string;
  after?: string;
  beforeVideo?: string;
  afterVideo?: string;
  title: string;
}) {
  const [position, setPosition] = useState(50);
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);

  const videoComparison = Boolean(beforeVideo && afterVideo);

  useEffect(() => {
    if (!videoComparison) return;

    const beforeEl = beforeVideoRef.current;
    const afterEl = afterVideoRef.current;

    if (!beforeEl || !afterEl) return;

    let animationFrame = 0;
    let syncing = false;

    const syncVideos = () => {
      if (beforeEl.readyState >= 2 && afterEl.readyState >= 2) {
        const drift = Math.abs(beforeEl.currentTime - afterEl.currentTime);

        if (drift > 0.08 && !syncing) {
          syncing = true;
          afterEl.currentTime = beforeEl.currentTime;
          syncing = false;
        }

        if (beforeEl.paused && !afterEl.paused) {
          afterEl.pause();
        } else if (!beforeEl.paused && afterEl.paused) {
          void afterEl.play().catch(() => {});
        }
      }

      animationFrame = requestAnimationFrame(syncVideos);
    };

    const startTogether = async () => {
      try {
        await Promise.all([
          beforeEl.play(),
          afterEl.play(),
        ]);
      } catch {
        // Browser autoplay restrictions may prevent playback.
      }
    };

    const handleBeforeEnded = () => {
      if (beforeEl.loop && afterEl.duration > 0) {
        afterEl.currentTime = 0;
        void afterEl.play().catch(() => {});
      }
    };

    beforeEl.addEventListener("ended", handleBeforeEnded);

    void startTogether();
    animationFrame = requestAnimationFrame(syncVideos);

    return () => {
      cancelAnimationFrame(animationFrame);
      beforeEl.removeEventListener("ended", handleBeforeEnded);
    };
  }, [videoComparison, beforeVideo, afterVideo]);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1225]">
      {videoComparison ? (
        <video
          ref={beforeVideoRef}
          src={beforeVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={`${title} before video preview`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={before}
          alt={`${title} before preview`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />
      )}

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {videoComparison ? (
          <video
            ref={afterVideoRef}
            src={afterVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={`${title} after video preview`}
            className="absolute inset-0 h-full w-full max-w-none object-cover"
          />
        ) : (
          <img
            src={after}
            alt={`${title} after preview`}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 h-full w-full max-w-none select-none object-cover"
          />
        )}
      </div>

      <span className="pointer-events-none absolute left-2 top-2 z-10 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
        Before
      </span>

      <span className="pointer-events-none absolute right-2 top-2 z-10 rounded-md bg-indigo-600/90 px-2 py-1 text-[10px] font-bold text-white">
        After
      </span>

      <div
        className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-white"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-sm text-white shadow-lg">
          ↔
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        aria-label={`Compare before and after for ${title}`}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}



function RotatingToolImage({
  image,
  secondaryImage,
  title,
}: {
  image: string;
  secondaryImage: string;
  title: string;
}) {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setShowSecond((current) => !current);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1225]">
      <img
        src={image}
        alt={`${title} preview`}
        loading="lazy"
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out group-hover:scale-105 ${
          showSecond ? "opacity-0" : "opacity-100"
        }`}
      />

      <img
        src={secondaryImage}
        alt={`${title} alternate preview`}
        loading="lazy"
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out group-hover:scale-105 ${
          showSecond ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b18]/90 via-transparent to-transparent" />
    </div>
  );
}



function ToolCard({
  tool,
  number,
  onOpen,
}: {
  tool: Tool;
  number: number;
  onOpen: (href: string) => void;
}) {
  const Icon = tool.icon;

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={`Open ${tool.title}`}
      onClick={() => onOpen(tool.href)}
      onKeyDown={(event) => {
        if (
          (event.key === "Enter" || event.key === " ") &&
          !event.defaultPrevented
        ) {
          event.preventDefault();
          onOpen(tool.href);
        }
      }}
      className="group flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1021] transition duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-[0_12px_40px_rgba(79,70,229,0.16)] focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <div className="relative overflow-hidden">
        
{(
  (tool.beforeImage && tool.afterImage) ||
  (tool.beforeVideo && tool.afterVideo)
) ? (
  <BeforeAfter
    before={tool.beforeImage}
    after={tool.afterImage}
    beforeVideo={tool.beforeVideo}
    afterVideo={tool.afterVideo}
    title={tool.title}
  />
) : tool.secondaryImage ? (
  <RotatingToolImage
    image={tool.image}
    secondaryImage={tool.secondaryImage}
    title={tool.title}
  />
) : (
  <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1225]">
    <img
      src={tool.image}
      alt={tool.title}
      loading="lazy"
      draggable={false}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b18]/90 via-transparent to-transparent" />
  </div>
)}


        <div className="pointer-events-none absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#090e20]/90 text-indigo-300 shadow-lg backdrop-blur">
          <Icon size={21} aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-xs font-bold text-gray-400">
            {number}
          </span>

          <h3 className="text-base font-semibold leading-snug text-white">
            {tool.title}
          </h3>
        </div>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-gray-400 transition-colors group-hover:text-gray-300">
          {tool.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-sky-400">
          Explore Tool
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </article>
  );
}

export default function ToolGrid() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkUser() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (active) {
          setLoggedIn(Boolean(user));
        }
      } catch {
        if (active) {
          setLoggedIn(false);
        }
      } finally {
        if (active) {
          setAuthChecked(true);
        }
      }
    }

    void checkUser();

    return () => {
      active = false;
    };
  }, []);

  function openTool(href: string) {
    if (!authChecked) return;

    if (loggedIn) {
      router.push(href);
    } else {
      router.push(`/login?next=${encodeURIComponent(href)}`);
    }
  }

  let toolNumber = 0;

  return (
    <section
      id="all-tools"
      className="relative w-full overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 h-72 w-[min(700px,90vw)] -translate-x-1/2 rounded-full bg-indigo-600/[0.08] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            <span className="block bg-gradient-to-r from-fuchsia-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
              AI Creator Tools
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Everything creators need, all on one platform. More powerful tools
            are coming soon.
          </p>
        </header>

        <div className="space-y-14 sm:space-y-16">
          {sections.map((section) => (
            <section key={section.title}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {section.title}
                </h3>

                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
                  {section.tools.length} Tools
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.tools.map((tool) => {
                  toolNumber += 1;

                  return (
                    <ToolCard
                      key={tool.title}
                      tool={tool}
                      number={toolNumber}
                      onOpen={openTool}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
