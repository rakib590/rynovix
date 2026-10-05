"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleHelp,
  Clock3,
  Heart,
  MessageCircle,
  MessagesSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Wand2,
  Zap,
} from "lucide-react";

type Discussion = {
  category: string;
  title: string;
  description: string;
  replies: number;
  likes: number;
  time: string;
  icon: React.ElementType;
};

const DISCUSSIONS: Discussion[] = [
  {
    category: "AI Tools",
    title: "Best AI tool for YouTube growth?",
    description:
      "Share which RYNOVIX tool helps you most with titles, descriptions, keywords, or SEO.",
    replies: 24,
    likes: 58,
    time: "2 hours ago",
    icon: Wand2,
  },
  {
    category: "Tips & Tricks",
    title: "How are you improving your YouTube CTR?",
    description:
      "Discuss title, thumbnail, SEO, and content strategies that are working for you.",
    replies: 18,
    likes: 41,
    time: "5 hours ago",
    icon: Sparkles,
  },
  {
    category: "Feature Requests",
    title: "What feature should RYNOVIX add next?",
    description:
      "Suggest new AI tools, improvements, and features you would like to see.",
    replies: 31,
    likes: 76,
    time: "1 day ago",
    icon: Rocket,
  },
  {
    category: "Help & Support",
    title: "Need help choosing the right AI tool",
    description:
      "Ask the community which RYNOVIX tool is best for your specific content workflow.",
    replies: 12,
    likes: 29,
    time: "1 day ago",
    icon: CircleHelp,
  },
];

const COMMUNITY_CATEGORIES = [
  {
    title: "AI Tools",
    description: "Discuss RYNOVIX tools, workflows, and AI generation.",
    icon: Wand2,
  },
  {
    title: "Tips & Tricks",
    description: "Share useful YouTube growth and content creation strategies.",
    icon: Sparkles,
  },
  {
    title: "Feature Requests",
    description: "Suggest new tools and improvements for RYNOVIX.",
    icon: Zap,
  },
  {
    title: "Help & Support",
    description: "Ask questions and get help from the community.",
    icon: CircleHelp,
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 top-56 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <Users className="h-4 w-4" />
              RYNOVIX Community
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Create. Learn.{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Grow Together.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Connect with creators, share ideas, discover better AI
              workflows, and learn how to get more from RYNOVIX.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/#all-tools"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:scale-[1.02] hover:from-blue-500 hover:to-purple-500"
              >
                Explore AI Tools
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/tutorials"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <BookOpen className="h-4 w-4" />
                View Tutorials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================== */}
      <section className="border-b border-white/5 bg-[#060b1a]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
          {[
            ["10+", "AI Tools"],
            ["24/7", "AI Access"],
            ["100%", "Creator Focused"],
            ["∞", "Ideas"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`px-5 py-8 text-center ${
                index > 0 ? "border-l border-white/5" : ""
              }`}
            >
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="mt-1 text-sm text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          COMMUNITY TOPICS
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-400">
            <MessagesSquare className="h-4 w-4" />
            Community Topics
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Explore the community
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Find the right place to learn, ask questions, share ideas, and
            discuss your creator journey.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY_CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group rounded-2xl border border-white/10 bg-[#080d1f] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0a1025]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-blue-400">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-slate-500">
                  Coming soon
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          DISCUSSIONS
      ========================================================== */}
      <section className="border-y border-white/5 bg-[#060b1a]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-purple-400">
                <MessageCircle className="h-4 w-4" />
                Community Discussions
              </div>

              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Popular discussions
              </h2>

              <p className="mt-3 max-w-2xl text-slate-400">
                See what creators will be able to discuss and share once the
                RYNOVIX community system launches.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400">
              <Clock3 className="h-4 w-4" />
              Coming soon
            </div>
          </div>

          <div className="space-y-4">
            {DISCUSSIONS.map((discussion) => {
              const Icon = discussion.icon;

              return (
                <div
                  key={discussion.title}
                  className="rounded-2xl border border-white/10 bg-[#080d1f] p-5 transition hover:border-white/15 hover:bg-[#0a1025] sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-400/10 bg-purple-500/10 text-purple-400 sm:flex">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-blue-400/10 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300">
                          {discussion.category}
                        </span>

                        <span className="text-xs text-slate-600">
                          {discussion.time}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-white">
                        {discussion.title}
                      </h3>

                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                        {discussion.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <MessageCircle className="h-3.5 w-3.5" />
                          {discussion.replies} replies
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <Heart className="h-3.5 w-3.5" />
                          {discussion.likes} likes
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-500">
                        Coming Soon
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-7 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-blue-400">
              <MessagesSquare className="h-6 w-6" />
            </div>

            <h3 className="mt-4 font-semibold text-white">
              Community discussions are coming soon
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
              The community system will let RYNOVIX members create posts,
              reply to discussions, react to posts, and share useful ideas
              with other creators.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          LEARN + SUPPORT
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <Link
            href="/tutorials"
            className="group rounded-2xl border border-white/10 bg-[#080d1f] p-7 transition hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0a1025]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <BookOpen className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Learn with Tutorials
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Learn how to use RYNOVIX AI tools and improve your content
              creation workflow.
            </p>

            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-400">
              Browse tutorials
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/help"
            className="group rounded-2xl border border-white/10 bg-[#080d1f] p-7 transition hover:-translate-y-1 hover:border-purple-400/20 hover:bg-[#0a1025]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <CircleHelp className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Need Help?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Find answers to common questions about tools, credits, accounts,
              billing, and troubleshooting.
            </p>

            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-purple-400">
              Visit Help Center
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/#all-tools"
            className="group rounded-2xl border border-white/10 bg-[#080d1f] p-7 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-[#0a1025]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Wand2 className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Try AI Tools
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Turn your ideas into better titles, descriptions, keywords,
              scripts, and more with RYNOVIX.
            </p>

            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-cyan-400">
              Explore tools
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* =========================================================
          COMMUNITY GUIDELINES
      ========================================================== */}
      <section className="border-t border-white/5 bg-[#060b1a]">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/10 bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
            Keep the community helpful
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Be respectful, share useful information, avoid spam, and help
            other creators whenever you can. RYNOVIX is built to make AI
            creation simpler for everyone.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Respect everyone",
              "Share useful ideas",
              "No spam",
              "Help other creators",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-500/10" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-purple-900/20">
            <Rocket className="h-7 w-7 text-white" />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Ready to create something amazing?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore RYNOVIX AI tools, learn new workflows, and start building
            better content today.
          </p>

          <Link
            href="/#all-tools"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-slate-100"
          >
            Start Creating
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <footer className="border-t border-white/5 bg-[#040711]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Zap className="h-4 w-4 text-white" />
              </div>

              <span className="text-lg font-bold text-white">RYNOVIX</span>
            </div>

            <p className="mt-2 text-xs text-slate-600">
              AI tools built for modern creators.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-xs text-slate-500 md:justify-end">
            <Link href="/help" className="transition hover:text-white">
              Help Center
            </Link>

            <Link href="/tutorials" className="transition hover:text-white">
              Tutorials
            </Link>

            <Link href="/pricing" className="transition hover:text-white">
              Pricing
            </Link>

            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 py-5 text-center text-xs text-slate-700">
          © {new Date().getFullYear()} RYNOVIX. All rights reserved.
        </div>
      </footer>
    </main>
  );
}