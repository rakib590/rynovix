"use client";

import {
  FileText,
  AlignLeft,
  Hash,
  Tags,
  Search,
  KeyRound,
  PenSquare,
  Clock3,
  Image,
  BarChart3,
  ImagePlus,
  Clapperboard,
} from "lucide-react";

const tools = [
  {
    title: "Title Generator",
    description: "Generate SEO friendly YouTube titles.",
    icon: FileText,
  },
  {
    title: "Description Generator",
    description: "Create engaging video descriptions.",
    icon: AlignLeft,
  },
  {
    title: "Hashtag Generator",
    description: "Find trending hashtags instantly.",
    icon: Hash,
  },
  {
    title: "Tags Generator",
    description: "Generate high-ranking YouTube tags.",
    icon: Tags,
  },
  {
    title: "SEO Checker",
    description: "Analyze your SEO score.",
    icon: Search,
  },
  {
    title: "Keyword Generator",
    description: "Discover high-volume keywords.",
    icon: KeyRound,
  },
  {
    title: "Script Writer",
    description: "Generate AI video scripts.",
    icon: PenSquare,
  },
  {
    title: "Best Upload Time",
    description: "Find the best publishing time.",
    icon: Clock3,
  },
  {
    title: "Thumbnail Title",
    description: "Create clickable thumbnail text.",
    icon: Image,
  },
  {
    title: "Analytics",
    description: "Track your AI usage & growth.",
    icon: BarChart3,
  },

  // Coming Soon
  {
    title: "Image Generator",
    description: "Create AI images from text.",
    icon: ImagePlus,
    comingSoon: true,
  },
  {
    title: "Video Generator",
    description: "Turn images into AI videos.",
    icon: Clapperboard,
    comingSoon: true,
  },
];

export default function ToolGrid() {
  return (
    <section className="mt-0.1">
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

  return (
    <button
      key={tool.title}
      disabled={tool.comingSoon}
      title={
        tool.comingSoon
          ? "Available in Version 2.0"
          : tool.title
      }
      className={`group relative rounded-2xl border p-6 text-left transition-all duration-300

      ${
        tool.comingSoon
          ? "cursor-not-allowed border-purple-500/30 bg-[#0B1220]/80 backdrop-blur-md hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
          : "border-white/10 bg-[#0B1220] hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
      }`}
    >
      {tool.comingSoon && (
        <span className="absolute right-4 top-4 rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
          Coming Soon
        </span>
      )}

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl

        ${
          tool.comingSoon
            ? "bg-purple-500/10"
            : "bg-blue-500/10"
        }`}
      >
        <Icon
          size={28}
          className={
            tool.comingSoon
              ? "text-purple-400 transition group-hover:scale-110"
              : "text-blue-400"
          }
        />
      </div>

      <h3
        className={`mt-5 text-lg font-semibold

        ${
          tool.comingSoon
            ? "text-white group-hover:text-purple-300"
            : "text-white group-hover:text-blue-400"
        }`}
      >
        {tool.title}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        {tool.description}
      </p>

      {tool.comingSoon && (
        <p className="mt-4 text-xs font-medium text-purple-300">
          Available in Version 2.0
        </p>
      )}
    </button>
  );
})}
      </div>
    </section>
  );
}