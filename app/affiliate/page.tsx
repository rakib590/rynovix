"use client";

import Link from "next/link";
import {
ArrowRight,
CheckCircle2,
ChevronDown,
ChevronRight,
Gift,
Globe2,
Handshake,
Megaphone,
Rocket,
ShieldCheck,
Sparkles,
TrendingUp,
Users,
WalletCards,
Zap,
} from "lucide-react";
import { useState } from "react";

const BENEFITS = [
{
icon: WalletCards,
title: "Earn Rewards",
description:
"Earn commissions when people join RYNOVIX through your unique affiliate link.",
},
{
icon: Globe2,
title: "Share Worldwide",
description:
"Promote RYNOVIX to creators, marketers, businesses, and AI enthusiasts around the world.",
},
{
icon: Megaphone,
title: "Simple Promotion",
description:
"Share your link through content, social media, communities, tutorials, or your own audience.",
},
{
icon: TrendingUp,
title: "Grow With Us",
description:
"As RYNOVIX grows, your opportunity to introduce more creators to our AI tools grows with it.",
},
];

const STEPS = [
{
number: "01",
icon: Rocket,
title: "Join the Program",
description:
"Apply to become a RYNOVIX affiliate and get ready to share our AI-powered creator tools.",
},
{
number: "02",
icon: Gift,
title: "Get Your Link",
description:
"Approved affiliates will receive a unique referral link that can be shared with their audience.",
},
{
number: "03",
icon: Users,
title: "Share RYNOVIX",
description:
"Recommend RYNOVIX through content, social platforms, tutorials, websites, or creator communities.",
},
{
number: "04",
icon: WalletCards,
title: "Earn Rewards",
description:
"When eligible referrals convert through your link, you can earn according to the affiliate program terms.",
},
];

const REQUIREMENTS = [
"Create genuine and useful content around AI, content creation, or creator tools.",
"Promote RYNOVIX honestly and avoid misleading claims.",
"Use your assigned affiliate link when referring new users.",
"Follow applicable laws, advertising requirements, and platform policies.",
"Respect the RYNOVIX brand and never engage in spam or deceptive promotion.",
];

const FAQS = [
{
question: "Who can become a RYNOVIX affiliate?",
answer:
"Creators, educators, bloggers, marketers, website owners, community builders, and other people with an audience interested in AI and content creation may be eligible to join.",
},
{
question: "How does the affiliate program work?",
answer:
"Approved affiliates receive a unique referral link. When eligible users discover RYNOVIX through that link and complete a qualifying action, the affiliate may receive a commission according to the program's current terms.",
},
{
question: "How much commission can affiliates earn?",
answer:
"Affiliate commission rates and qualifying conditions will be announced when the program officially launches. We do not want to publish a rate before the program terms are finalized.",
},
{
question: "When will the affiliate program launch?",
answer:
"The RYNOVIX affiliate program is currently being prepared. The application process, commission structure, and payout details will be published once the program is officially available.",
},
{
question: "Can I promote RYNOVIX on social media?",
answer:
"Yes. Once approved, affiliates can promote RYNOVIX through appropriate social media content, provided the promotion follows our affiliate terms and the platform's rules.",
},
];

export default function AffiliatePage() {
const [openFaq, setOpenFaq] = useState<number | null>(0);

return ( <main className="min-h-screen bg-[#050814] text-white">
{/* Background Glow */} <div className="pointer-events-none fixed inset-0 overflow-hidden"> <div className="absolute left-[-180px] top-[-160px] h-[430px] w-[430px] rounded-full bg-blue-600/10 blur-[140px]" /> <div className="absolute right-[-180px] top-[160px] h-[430px] w-[430px] rounded-full bg-purple-600/10 blur-[140px]" /> <div className="absolute bottom-[-180px] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[140px]" /> </div>

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
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple-400/15 bg-purple-500/5 px-4 py-2 text-sm font-medium text-purple-300">
          <Handshake className="h-4 w-4" />
          RYNOVIX Affiliate Program
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
          Grow With
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            RYNOVIX
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          Share powerful AI tools with your audience and become part of the
          RYNOVIX creator ecosystem. Help more people create better content
          while building an opportunity for yourself.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#how-it-works"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] hover:shadow-blue-600/30"
          >
            Learn How It Works
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

      {/* Hero Highlights */}
      <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 text-center backdrop-blur-xl">
          <Sparkles className="mx-auto h-6 w-6 text-blue-300" />
          <p className="mt-4 font-semibold text-white">
            AI-Powered Tools
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Promote tools built for modern creators.
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 text-center backdrop-blur-xl">
          <Users className="mx-auto h-6 w-6 text-purple-300" />
          <p className="mt-4 font-semibold text-white">
            Creator Community
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Connect your audience with useful AI workflows.
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 text-center backdrop-blur-xl">
          <Zap className="mx-auto h-6 w-6 text-cyan-300" />
          <p className="mt-4 font-semibold text-white">
            Simple to Share
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Recommend RYNOVIX wherever your audience is.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Benefits */}
  <section className="relative z-10 border-y border-white/5 bg-white/[0.015]">
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
          Affiliate Benefits
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Why become a RYNOVIX affiliate?
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          Build your audience around useful AI tools and unlock a new way
          to grow alongside RYNOVIX.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="group rounded-2xl border border-white/8 bg-[#080d1d]/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0a1022]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10">
                <Icon className="h-5 w-5 text-blue-300" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                {benefit.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  {/* How It Works */}
  <section
    id="how-it-works"
    className="relative z-10"
  >
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-400">
            How It Works
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Start sharing in four simple steps.
          </h2>

          <p className="mt-5 leading-7 text-slate-400">
            Our goal is to make affiliate promotion simple, transparent,
            and useful for both affiliates and the people they refer.
          </p>

          <div className="mt-8 rounded-2xl border border-purple-400/10 bg-purple-500/[0.04] p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-purple-300" />

              <p className="text-sm leading-6 text-slate-400">
                Affiliate terms, commission rates, qualifying actions, and
                payout rules will be published before the program officially
                launches.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group rounded-2xl border border-white/8 bg-[#080d1d]/80 p-5 transition-all duration-300 hover:border-purple-400/20 hover:bg-[#0a1022] sm:p-6"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-400/15 bg-purple-500/10">
                    <Icon className="h-5 w-5 text-purple-300" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-[0.2em] text-purple-400">
                        {step.number}
                      </span>

                      <h3 className="font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>

  {/* Requirements */}
  <section className="relative z-10 border-y border-white/5 bg-white/[0.015]">
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Program Guidelines
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built around trust and quality.
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            We want our affiliate ecosystem to provide genuine value to
            creators and audiences.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/8 bg-[#080d1d]/80 p-6 sm:p-8">
          <div className="space-y-5">
            {REQUIREMENTS.map((requirement) => (
              <div
                key={requirement}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />

                <p className="text-sm leading-6 text-slate-300">
                  {requirement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* FAQ */}
  <section className="relative z-10">
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
          FAQ
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Affiliate Program Questions
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
          Everything you need to know before the RYNOVIX Affiliate Program
          officially launches.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openFaq === index;

          return (
            <div
              key={faq.question}
              className={`overflow-hidden rounded-2xl border transition-all ${
                isOpen
                  ? "border-blue-400/20 bg-blue-500/[0.035]"
                  : "border-white/8 bg-[#080d1d]/70"
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenFaq(isOpen ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-white">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-blue-400" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-7 text-slate-400 sm:px-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  {/* Coming Soon CTA */}
  <section className="relative z-10 px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/[0.08] via-white/[0.025] to-purple-500/[0.08] p-8 text-center sm:p-12 lg:p-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
        <Handshake className="h-6 w-6 text-blue-300" />
      </div>

      <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        The Affiliate Program is coming soon.
      </h2>

      <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
        We&apos;re preparing the affiliate dashboard, application process,
        commission structure, and payout system. More details will be
        available when the program officially launches.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#050814] transition-all hover:bg-slate-100"
        >
          Contact RYNOVIX
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-white/20 hover:bg-white/[0.06]"
        >
          Explore Tools
          <ChevronRight className="h-4 w-4" />
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
