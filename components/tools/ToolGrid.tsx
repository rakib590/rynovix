"use client";

import Link from "next/link";
import {
  Type,
  FileText,
  Hash,
  Tags,
  Search,
  KeyRound,
  PenSquare,
  Clock3,
  Image,
  Lightbulb,
  ImagePlus,
  Clapperboard,
} from "lucide-react";

type Tool = {
  title: string;
  description: string;
  icon: typeof Type;
  href?: string;
  comingSoon?: boolean;
  image?: string;
};

const tools: Tool[] = [
  {
    title: "Title Generator",
    description: "Generate engaging YouTube titles using AI.",
    icon: Type,
    href: "/dashboard/tools/title-generator",
  },
  {
    title: "Description Generator",
    description: "Create SEO-friendly YouTube descriptions.",
    icon: FileText,
    href: "/dashboard/tools/description-generator",
  },
  {
    title: "Hashtag Generator",
    description: "Generate trending hashtags for your videos.",
    icon: Hash,
    href: "/dashboard/tools/hashtag-generator",
  },
  {
    title: "Tags Generator",
    description: "Generate optimized YouTube video tags.",
    icon: Tags,
    href: "/dashboard/tools/tags-generator",
  },
  {
    title: "Script Writer",
    description: "Write complete YouTube scripts with AI.",
    icon: PenSquare,
    href: "/dashboard/tools/script-writer",
  },
  {
    title: "Shorts Ideas",
    description: "Generate viral YouTube Shorts content ideas.",
    icon: Lightbulb,
    href: "/dashboard/tools/shorts-ideas",
  },
  {
    title: "Thumbnail Title",
    description: "Generate catchy thumbnail text instantly.",
    icon: Image,
    href: "/dashboard/tools/thumbnail-title",
  },
  {
    title: "SEO Checker",
    description: "Analyze and improve your YouTube SEO.",
    icon: Search,
    href: "/dashboard/tools/seo-checker",
  },
  {
    title: "Keyword Generator",
    description: "Find high-ranking keywords for YouTube.",
    icon: KeyRound,
    href: "/dashboard/tools/keyword-generator",
  },
  {
    title: "Best Upload Time",
    description: "Find the best upload time to maximize views.",
    icon: Clock3,
    href: "/dashboard/tools/best-upload-time",
  },

  // Coming Soon
  {
    title: "Image Generator",
    description: "Create AI images from text.",
    icon: ImagePlus,
    comingSoon: true,
    image: "/images/tools/image-generator.png",
  },
  {
    title: "Video Generator",
    description: "Turn images into AI videos.",
    icon: Clapperboard,
    comingSoon: true,
    image: "/images/tools/video-generator.png",
  },
];

export default function ToolGrid() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          AI Toolbox
        </h2>

        <p className="mt-1 text-gray-400">
          Choose an AI tool to get started.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;

          // Coming Soon tools
          if (tool.comingSoon) {
            return (
              <div
                key={tool.title}
                className="group relative cursor-not-allowed overflow-hidden rounded-2xl border border-purple-500/30 bg-[#0B1220]/80 backdrop-blur-md transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
              >
                {tool.image ? (
                  <>
                    {/* Coming Soon Badge */}
                    <span className="absolute right-4 top-4 z-20 rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                      Coming Soon
                    </span>

                    {/* Tool Image */}
                    <img
                      src={tool.image}
                      alt={tool.title}
                      className="block h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </>
                ) : (
                  <>
                    <span className="absolute right-4 top-4 z-10 rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Coming Soon
                    </span>

                    <div className="p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10">
                        <Icon
                          size={28}
                          className="text-purple-400 transition group-hover:scale-110"
                        />
                      </div>

                      <h3 className="mt-5 text-lg font-semibold text-white transition group-hover:text-purple-300">
                        {tool.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-400">
                        {tool.description}
                      </p>

                      <p className="mt-4 text-xs font-medium text-purple-300">
                        Coming Soon
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          }

          // Active tools
          if (tool.href) {
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="group relative block rounded-2xl border border-white/10 bg-[#0B1220] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
                  <Icon
                    size={28}
                    className="text-blue-400 transition group-hover:scale-110"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white transition group-hover:text-blue-400">
                  {tool.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {tool.description}
                </p>

                <div className="mt-5 flex items-center text-sm font-semibold text-blue-400">
                  Open Tool
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}