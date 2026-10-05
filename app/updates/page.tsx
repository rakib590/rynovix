"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bug,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  Megaphone,
  MessageCircle,
  Rocket,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

type UpdateType = {
  label: string;
  icon: React.ElementType;
  className: string;
};

type UpdateItem = {
  date: string;
  version: string;
  title: string;
  description: string;
  type: UpdateType;
  features: string[];
};

const UPDATES: UpdateItem[] = [
  {
    date: "October 2026",
    version: "v1.0",
    title: "RYNOVIX AI Tools Launch",
    description:
      "RYNOVIX launches its first collection of AI-powered tools built for modern creators and YouTube workflows.",
    type: {
      label: "Launch",
      icon: Rocket,
      className:
        "border-blue-400/15 bg-blue-500/10 text-blue-300",
    },
    features: [
      "AI Title Generator",
      "AI Description Generator",
      "AI Hashtag Generator",
      "AI Tags Generator",
      "AI Script Writer",
      "Shorts Ideas Generator",
      "Thumbnail Title Generator",
      "YouTube SEO Checker",
      "Keyword Generator",
      "Best Upload Time",
    ],
  },
  {
    date: "October 2026",
    version: "Improvement",
    title: "Better Creator Workflow",
    description:
      "The RYNOVIX experience has been refined to make AI generation faster, clearer, and easier to use.",
    type: {
      label: "Improvement",
      icon: Sparkles,
      className:
        "border-purple-400/15 bg-purple-500/10 text-purple-300",
    },
    features: [
      "Cleaner AI tool interfaces",
      "Improved generation controls",
      "Better result presentation",
      "More consistent dark UI",
    ],
  },
  {
    date: "October 2026",
    version: "UX Update",
    title: "Improved Navigation & Resources",
    description:
      "New resource pages make it easier to learn about RYNOVIX, find answers, and discover helpful creator workflows.",
    type: {
      label: "Update",
      icon: Megaphone,
      className:
        "border-cyan-400/15 bg-cyan-500/10 text-cyan-300",
    },
    features: [
      "Tutorials",
      "Help Center",
      "Community",
      "Product Updates",
    ],
  },
];

const UPCOMING = [
  {
    icon: Code2,
    title: "More AI Features",
    description:
      "New creator-focused AI capabilities and workflow improvements are planned for future releases.",
  },
  {
    icon: Wrench,
    title: "Performance Improvements",
    description:
      "Continued improvements to generation speed, reliability, and overall platform performance.",
  },
  {
    icon: Sparkles,
    title: "Smarter Creator Tools",
    description:
      "More powerful tools designed to help creators plan, optimize, and produce content.",
  },
];

export default function UpdatesPage() {
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
              <Zap className="h-4 w-4" />
              RYNOVIX Updates
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              What&apos;s{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                new?
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Follow the latest RYNOVIX features, improvements, fixes, and
              product updates as we continue building better AI tools for
              creators.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK STATS
      ========================================================== */}
      <section className="border-b border-white/5 bg-[#060b1a]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
          <div className="px-5 py-8 text-center">
            <div className="text-2xl font-bold text-white">10+</div>
            <div className="mt-1 text-sm text-slate-500">
              AI Tools
            </div>
          </div>

          <div className="border-l border-white/5 px-5 py-8 text-center">
            <div className="text-2xl font-bold text-white">v1.0</div>
            <div className="mt-1 text-sm text-slate-500">
              Current Release
            </div>
          </div>

          <div className="border-t border-white/5 px-5 py-8 text-center sm:border-l sm:border-t-0">
            <div className="text-2xl font-bold text-white">AI</div>
            <div className="mt-1 text-sm text-slate-500">
              Creator Focused
            </div>
          </div>

          <div className="border-l border-white/5 border-t px-5 py-8 text-center sm:border-t-0">
            <div className="text-2xl font-bold text-white">∞</div>
            <div className="mt-1 text-sm text-slate-500">
              Ideas Ahead
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LATEST UPDATES
      ========================================================== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-400">
            <Clock3 className="h-4 w-4" />
            Product Changelog
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Latest updates
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            A look at the latest things added and improved across RYNOVIX.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-3 hidden h-[calc(100%-24px)] w-px bg-gradient-to-b from-blue-500/40 via-purple-500/20 to-transparent md:block" />

          <div className="space-y-10">
            {UPDATES.map((update) => {
              const TypeIcon = update.type.icon;

              return (
                <article
                  key={update.title}
                  className="relative md:pl-14"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 hidden h-8 w-8 items-center justify-center rounded-full border border-blue-400/20 bg-[#080d1f] md:flex">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.7)]" />
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080d1f] transition duration-300 hover:border-white/15 hover:bg-[#0a1025]">
                    <div className="p-6 sm:p-7">
                      {/* Top */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-slate-500">
                              {update.date}
                            </span>

                            <span className="text-slate-700">
                              •
                            </span>

                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                              {update.version}
                            </span>
                          </div>

                          <h3 className="mt-3 text-2xl font-bold text-white">
                            {update.title}
                          </h3>
                        </div>

                        <div
                          className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${update.type.className}`}
                        >
                          <TypeIcon className="h-3.5 w-3.5" />
                          {update.type.label}
                        </div>
                      </div>

                      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                        {update.description}
                      </p>

                      {/* Features */}
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {update.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />

                            <span className="text-sm text-slate-400">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          UPCOMING
      ========================================================== */}
      <section className="border-y border-white/5 bg-[#060b1a]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-purple-400">
              <Rocket className="h-4 w-4" />
              What&apos;s Next
            </div>

            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              More is coming
            </h2>

            <p className="mt-4 text-slate-400">
              RYNOVIX is continuously evolving. Here are some areas we&apos;re
              working toward for future releases.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {UPCOMING.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-[#080d1f] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-[#0a1025]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/10 bg-purple-500/10 text-purple-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-purple-400">
                    In development
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          EXPLORE RESOURCES
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-cyan-400">
            <BookOpen className="h-4 w-4" />
            Explore RYNOVIX
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Keep learning
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Explore tutorials, get answers, and connect with the growing
            RYNOVIX creator ecosystem.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Link
            href="/tutorials"
            className="group rounded-2xl border border-white/10 bg-[#080d1f] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0a1025]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <BookOpen className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Tutorials
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Learn how to get better results from RYNOVIX AI tools.
            </p>

            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-400">
              View tutorials
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/help"
            className="group rounded-2xl border border-white/10 bg-[#080d1f] p-7 transition duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-[#0a1025]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <CircleHelp className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Help Center
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Find answers about tools, credits, billing, accounts, and more.
            </p>

            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-purple-400">
              Get help
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/community"
            className="group rounded-2xl border border-white/10 bg-[#080d1f] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-[#0a1025]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <MessageCircle className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Community
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Discover creator discussions, ideas, tips, and future community
              features.
            </p>

            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-cyan-400">
              Visit community
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* =========================================================
          BUG REPORT / FEEDBACK
      ========================================================== */}
      <section className="border-t border-white/5 bg-[#060b1a]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/10 bg-orange-500/10 text-orange-400">
            <Bug className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
            Found something that needs fixing?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            If you notice an issue while using RYNOVIX, visit the Help Center
            for troubleshooting guidance and available support options.
          </p>

          <Link
            href="/help"
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            Visit Help Center
            <ArrowRight className="h-4 w-4" />
          </Link>
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
            Build better content with RYNOVIX
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore the latest AI tools and start creating smarter, faster,
            and more effective content.
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

              <span className="text-lg font-bold text-white">
                RYNOVIX
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-600">
              AI tools built for modern creators.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-xs text-slate-500 md:justify-end">
            <Link
              href="/help"
              className="transition hover:text-white"
            >
              Help Center
            </Link>

            <Link
              href="/tutorials"
              className="transition hover:text-white"
            >
              Tutorials
            </Link>

            <Link
              href="/community"
              className="transition hover:text-white"
            >
              Community
            </Link>

            <Link
              href="/pricing"
              className="transition hover:text-white"
            >
              Pricing
            </Link>

            <Link
              href="/"
              className="transition hover:text-white"
            >
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