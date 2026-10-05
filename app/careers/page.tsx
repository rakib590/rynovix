"use client";

import Link from "next/link";
import {
ArrowRight,
BriefcaseBusiness,
CheckCircle2,
ChevronRight,
Code2,
Heart,
Lightbulb,
MapPin,
Rocket,
Sparkles,
Users,
Zap,
} from "lucide-react";

const VALUES = [
{
icon: Rocket,
title: "Build With Purpose",
description:
"We focus on building useful AI products that help creators work smarter, faster, and with more confidence.",
},
{
icon: Lightbulb,
title: "Think Creatively",
description:
"Great products start with curiosity. We encourage new ideas, experimentation, and better ways to solve problems.",
},
{
icon: Users,
title: "Grow Together",
description:
"We believe strong teams communicate openly, support each other, and celebrate progress together.",
},
{
icon: Zap,
title: "Move Fast",
description:
"We value focused execution, quick learning, and continuous improvement without sacrificing quality.",
},
];

const OPEN_ROLES = [
{
title: "Frontend Developer",
department: "Engineering",
type: "Full-time",
location: "Remote",
icon: Code2,
},
{
title: "AI Product Engineer",
department: "AI & Engineering",
type: "Full-time",
location: "Remote",
icon: Sparkles,
},
{
title: "Product Designer",
department: "Design",
type: "Full-time",
location: "Remote",
icon: Heart,
},
];

export default function CareersPage() {
return ( <main className="min-h-screen bg-[#050814] text-white">
{/* Background Glow */} <div className="pointer-events-none fixed inset-0 overflow-hidden"> <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[130px]" /> <div className="absolute right-[-180px] top-[180px] h-[420px] w-[420px] rounded-full bg-purple-600/10 blur-[130px]" /> <div className="absolute bottom-[-180px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[140px]" /> </div>

```
  {/* Header */}
  <header className="relative z-10 border-b border-white/5 bg-[#050814]/80 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-[0_0_30px_rgba(59,130,246,0.12)]">
          <Sparkles className="h-5 w-5 text-blue-300" />
        </div>

        <span className="text-xl font-bold tracking-tight">
          RYNOVIX
        </span>
      </Link>

      <Link
        href="/"
        className="group flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
      >
        Back to Home
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </header>

  {/* Hero */}
  <section className="relative z-10 overflow-hidden">
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/15 bg-blue-500/5 px-4 py-2 text-sm font-medium text-blue-300">
          <BriefcaseBusiness className="h-4 w-4" />
          Careers at RYNOVIX
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
          Build the Future of
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            AI-Powered Creation
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          Join RYNOVIX and help us build powerful AI tools that make
          content creation simpler, faster, and more accessible for
          creators everywhere.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#open-positions"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] hover:shadow-blue-600/30"
          >
            View Open Positions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >
            Explore RYNOVIX
          </Link>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
        {[
          ["Remote Friendly", "Work from anywhere"],
          ["Creator Focused", "Build for real users"],
          ["AI First", "Shape the next generation"],
        ].map(([title, description]) => (
          <div
            key={title}
            className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 text-center backdrop-blur-xl"
          >
            <p className="font-semibold text-white">{title}</p>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Why RYNOVIX */}
  <section className="relative z-10 border-y border-white/5 bg-white/[0.015]">
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
          Why RYNOVIX
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Do meaningful work with a team that cares.
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          We are building technology for the next generation of creators.
          Every feature we ship should solve a real problem and make the
          creative process better.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {VALUES.map((value) => {
          const Icon = value.icon;

          return (
            <div
              key={value.title}
              className="group rounded-2xl border border-white/8 bg-[#080d1d]/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0a1022]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10">
                  <Icon className="h-5 w-5 text-blue-300" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  {/* Open Positions */}
  <section
    id="open-positions"
    className="relative z-10"
  >
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-400">
          Join the Team
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Open Positions
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
          We are growing our team and looking for talented people who want
          to build the future of AI-powered creation.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-4">
        {OPEN_ROLES.map((role) => {
          const Icon = role.icon;

          return (
            <div
              key={role.title}
              className="group rounded-2xl border border-white/8 bg-[#080d1d]/80 p-5 transition-all duration-300 hover:border-blue-400/20 hover:bg-[#0a1022] sm:p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-400/15 bg-purple-500/10">
                    <Icon className="h-5 w-5 text-purple-300" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {role.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                      <span>{role.department}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{role.type}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {role.location}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-500"
                >
                  Apply
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* No application system notice */}
      <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-blue-400/10 bg-blue-500/[0.04] p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />

          <div>
            <p className="font-medium text-slate-200">
              Applications are opening soon.
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Our application process is currently being prepared. Check
              back soon for available positions and application details.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Culture CTA */}
  <section className="relative z-10 px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/[0.08] via-white/[0.025] to-purple-500/[0.08] p-8 text-center sm:p-12 lg:p-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
        <Users className="h-6 w-6 text-blue-300" />
      </div>

      <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Don&apos;t see your role?
      </h2>

      <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
        We&apos;re always interested in meeting talented people who are
        excited about AI, creativity, and building great products.
      </p>

      <div className="mt-8">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#050814] transition-all hover:bg-slate-100"
        >
          Contact RYNOVIX
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="relative z-10 border-t border-white/5 bg-[#040711]">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-center text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">
      <p>© 2026 RYNOVIX. All rights reserved.</p>

      <div className="flex items-center justify-center gap-5">
        <Link
          href="/about"
          className="transition-colors hover:text-white"
        >
          About
        </Link>

        <Link
          href="/contact"
          className="transition-colors hover:text-white"
        >
          Contact
        </Link>

        <Link
          href="/privacy"
          className="transition-colors hover:text-white"
        >
          Privacy
        </Link>
      </div>
    </div>
  </footer>
</main>
);
}