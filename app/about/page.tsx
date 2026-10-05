import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  WandSparkles,
  Zap,
} from "lucide-react";

const highlights = [
  {
    icon: WandSparkles,
    title: "AI-Powered Creation",
    description:
      "Powerful AI tools designed to help creators generate high-quality content faster.",
  },
  {
    icon: Zap,
    title: "Built for Speed",
    description:
      "Spend less time on repetitive tasks and more time creating, publishing, and growing.",
  },
  {
    icon: Target,
    title: "Creator Focused",
    description:
      "RYNOVIX is designed around the real needs of modern content creators and digital teams.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Simplicity",
    description:
      "AI should be powerful without being complicated. We build tools that are easy to understand and use.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description:
      "We continuously improve our platform and explore new ways AI can help creators work smarter.",
  },
  {
    icon: Bot,
    title: "Useful AI",
    description:
      "We focus on practical AI features that solve real creator problems instead of adding unnecessary complexity.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-140px] h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="absolute right-[-180px] top-[25%] h-[450px] w-[450px] rounded-full bg-purple-600/15 blur-[140px]" />
        <div className="absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Hero */}
        <section className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            <Sparkles className="h-4 w-4" />
            About RYNOVIX
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            AI that helps you{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              create smarter.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            RYNOVIX is an AI-powered creator platform built to make content
            creation faster, easier, and more efficient. From ideas and
            scripts to titles, SEO, and optimization, we bring useful AI tools
            together in one simple platform.
          </p>
        </section>

        {/* Mission */}
        <section className="mx-auto mt-20 max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#070d1f]/90 p-8 shadow-2xl shadow-blue-950/20 backdrop-blur-xl md:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <Target className="h-6 w-6" />
                </div>

                <h2 className="mt-6 text-3xl font-bold text-white">
                  Our Mission
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                  Our mission is simple: make powerful AI accessible to
                  creators without making the creative process complicated.
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                  We want creators to spend more time thinking, creating, and
                  connecting with their audience — and less time dealing with
                  repetitive tasks.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 p-8">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

                <div className="relative">
                  <p className="text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
                    “Build faster.
                    <br />
                    Create smarter.
                    <br />
                    Grow bigger with AI.”
                  </p>

                  <div className="mt-7 h-px w-20 bg-gradient-to-r from-blue-500 to-purple-500" />

                  <p className="mt-4 text-sm text-slate-500">
                    The idea behind RYNOVIX
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Build */}
        <section className="mx-auto mt-20 max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              What We Build
            </span>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              One platform for smarter creation
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              RYNOVIX brings practical AI capabilities together so creators can
              handle more of their workflow from one place.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-[#070d1f]/90 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#0a1024] hover:shadow-xl hover:shadow-blue-950/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition group-hover:border-blue-500/40 group-hover:bg-blue-500/15">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto mt-20 max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-[#070d1f]/80 p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
                What We Believe
              </span>

              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Built around creators
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Every part of RYNOVIX is guided by a simple goal: make AI more
                useful for the people who create.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {values.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <Icon className="h-6 w-6 text-purple-400" />

                    <h3 className="mt-5 text-lg font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Future */}
        <section className="mx-auto mt-20 max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#080e22] to-purple-600/10 p-8 text-center md:p-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="relative">
              <Rocket className="mx-auto h-10 w-10 text-blue-400" />

              <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                We&apos;re just getting started.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                RYNOVIX will continue evolving with new AI tools, smarter
                workflows, and features designed to help creators achieve
                more with less effort.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:from-blue-500 hover:to-purple-500"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
                >
                  Explore RYNOVIX
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}