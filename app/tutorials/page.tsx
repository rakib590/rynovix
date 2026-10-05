import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clapperboard,
  FileText,
  Globe,
  Hash,
  PlayCircle,
  Sparkles,
  Tags,
  Target,
  Trophy,
  TrendingUp,
  Wand2,
} from "lucide-react";

const TUTORIALS = [
  {
    title: "How to Use AI Title Generator",
    description:
      "Learn how to generate engaging, SEO-friendly YouTube titles that can help improve your video's click potential.",
    category: "Title Generator",
    level: "Beginner",
    icon: Trophy,
    youtubeUrl: "#",
  },
  {
    title: "How to Use AI Description Generator",
    description:
      "Learn how to create clear, engaging, and SEO-optimized YouTube descriptions with AI in seconds.",
    category: "Description Generator",
    level: "Beginner",
    icon: FileText,
    youtubeUrl: "#",
  },
  {
    title: "How to Use AI Hashtag Generator",
    description:
      "Discover how to generate relevant YouTube hashtags based on your video topic and target audience.",
    category: "Hashtag Generator",
    level: "Beginner",
    icon: Hash,
    youtubeUrl: "#",
  },
  {
    title: "How to Use AI Tags Generator",
    description:
      "Learn how to generate relevant YouTube tags and use them to better describe and organize your video content.",
    category: "Tags Generator",
    level: "Beginner",
    icon: Tags,
    youtubeUrl: "#",
  },
  {
    title: "How to Use AI Script Writer",
    description:
      "Learn how to create engaging video scripts with stronger hooks, structure, storytelling, and audience-focused content.",
    category: "Script Writer",
    level: "Intermediate",
    icon: Sparkles,
    youtubeUrl: "#",
  },
  {
    title: "How to Generate YouTube Shorts Ideas",
    description:
      "Discover how to generate creative Shorts ideas quickly and find new content concepts for your YouTube channel.",
    category: "Shorts Ideas",
    level: "Beginner",
    icon: Clapperboard,
    youtubeUrl: "#",
  },
  {
    title: "How to Create Click-Worthy Thumbnail Titles",
    description:
      "Learn how to create short, powerful thumbnail titles designed to grab attention and support better CTR.",
    category: "Thumbnail Title",
    level: "Beginner",
    icon: Target,
    youtubeUrl: "#",
  },
  {
    title: "How to Use YouTube SEO Checker",
    description:
      "Learn how to analyze your video's SEO and identify practical ways to improve your overall optimization.",
    category: "SEO Checker",
    level: "Intermediate",
    icon: TrendingUp,
    youtubeUrl: "#",
  },
  {
    title: "How to Find YouTube Keywords with AI",
    description:
      "Learn how to discover relevant keywords and search terms that can help you find better content opportunities.",
    category: "Keyword Generator",
    level: "Intermediate",
    icon: Globe,
    youtubeUrl: "#",
  },
  {
    title: "How to Find the Best Time to Upload",
    description:
      "Learn how to use RYNOVIX to find better upload times and build a more consistent YouTube publishing schedule.",
    category: "Best Upload Time",
    level: "Beginner",
    icon: CalendarDays,
    youtubeUrl: "#",
  },
];

export default function TutorialsPage() {
  return (
    <main className="min-h-screen bg-[#050814] text-white">
      {/* Header */}
      <section className="border-b border-white/10 bg-[#070d1f]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-wide text-white transition-colors hover:text-blue-400"
          >
            RYNOVIX
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-600/10 hover:text-white"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
            <BookOpen size={16} />
            RYNOVIX Tutorials
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Learn. Create.
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Grow with AI.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Step-by-step tutorials to help you get more from RYNOVIX and
            create better content with AI.
          </p>
        </div>
      </section>

      {/* Tutorials */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <PlayCircle className="text-purple-400" size={24} />

              <div>
                <h2 className="text-2xl font-bold text-white">
                  RYNOVIX Tool Tutorials
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Learn how to use every RYNOVIX AI creator tool.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TUTORIALS.map((tutorial) => {
              const Icon = tutorial.icon;

              return (
                <a
                  key={tutorial.title}
                  href={tutorial.youtubeUrl}
                  target={
                    tutorial.youtubeUrl !== "#" ? "_blank" : undefined
                  }
                  rel={
                    tutorial.youtubeUrl !== "#"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={`Watch ${tutorial.title}`}
                  className="group block cursor-pointer rounded-2xl border border-white/10 bg-[#080d1f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-[#0a1026] hover:shadow-2xl hover:shadow-purple-950/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-300 transition-all duration-300 group-hover:border-purple-500/40 group-hover:bg-purple-500/15">
                      <Icon size={22} />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                      {tutorial.level}
                    </span>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">
                      {tutorial.category}
                    </p>

                    <h3 className="mt-2 text-xl font-bold leading-7 text-white transition-colors duration-300 group-hover:text-purple-300">
                      {tutorial.title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      {tutorial.description}
                    </p>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors duration-300 group-hover:text-purple-400">
                    Watch Tutorial

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-transparent p-8 text-center sm:p-12">
          <Wand2 className="mx-auto mb-5 text-purple-400" size={30} />

          <h2 className="text-3xl font-bold text-white">
            Ready to Create with AI?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Explore the RYNOVIX AI creator tools and start turning your ideas
            into better content today.
          </p>

          <Link
            href="/#all-tools"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-600/20"
          >
            Explore AI Tools
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center sm:px-8 lg:px-12">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} RYNOVIX. All rights reserved.
        </p>
      </footer>
    </main>
  );
}