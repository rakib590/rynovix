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

const SUPPORT_EMAIL = "[rynovix.support@gmail.com](mailto:rynovix.support@gmail.com)";

const highlights = [
{
icon: WandSparkles,
title: "AI-Powered Creation",
description:
"AI tools designed to help creators generate content and streamline their creative workflows.",
},
{
icon: Zap,
title: "Built for Speed",
description:
"Spend less time on repetitive tasks and more time creating, publishing, and improving your content.",
},
{
icon: Target,
title: "Creator Focused",
description:
"RYNOVIX focuses on the practical needs of content creators and YouTube workflows.",
},
];

const values = [
{
icon: Lightbulb,
title: "Simplicity",
description:
"AI should be powerful without being complicated. We aim to make our tools straightforward and easy to use.",
},
{
icon: Rocket,
title: "Continuous Improvement",
description:
"We work to improve the platform and explore practical ways AI can help creators work more efficiently.",
},
{
icon: Bot,
title: "Useful AI",
description:
"We focus on practical AI features that support real content creation tasks.",
},
];

export default function AboutPage() {
return ( <main className="min-h-screen bg-[#030712] text-white">
{/* Background Glow */} <div className="pointer-events-none fixed inset-0 overflow-hidden"> <div className="absolute left-[-180px] top-[-140px] h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[140px]" /> <div className="absolute right-[-180px] top-[25%] h-[450px] w-[450px] rounded-full bg-purple-600/15 blur-[140px]" /> <div className="absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[140px]" /> </div>

```
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
        RYNOVIX is an independent AI software platform focused on tools
        for content creators and YouTube workflows. Our platform brings
        together AI-powered tools for content ideas, titles, scripts,
        descriptions, keywords, and other creator-focused tasks.
      </p>
    </section>

    {/* About RYNOVIX */}
    <section className="mx-auto mt-20 max-w-6xl">
      <div className="rounded-3xl border border-white/10 bg-[#070d1f]/90 p-8 shadow-2xl shadow-blue-950/20 backdrop-blur-xl md:p-12">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            About RYNOVIX
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Building practical tools for creators
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
            RYNOVIX is an independent AI software platform focused on
            tools for content creators and YouTube workflows. It is
            designed to help YouTubers and other creators with tasks
            such as generating ideas, writing content, developing video
            titles, and improving their content creation workflow.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            Our goal is to make useful AI capabilities easier to access
            through a straightforward online platform. We continue to
            develop RYNOVIX step by step, with a focus on practical
            creator needs and improvements to the user experience.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            RYNOVIX provides an online software service. Available
            features, plan pricing, subscription terms, and applicable
            policies can be reviewed on our website before purchasing
            a paid subscription.
          </p>
        </div>
      </div>
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
              Our mission is to make practical AI tools accessible to
              creators without making the creative process unnecessarily
              complicated.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              We want creators to spend more time thinking, creating,
              and connecting with their audience—and less time handling
              repetitive content tasks.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 p-8">
            <div className="relative">
              <p className="text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
                Build faster.
                <br />
                Create smarter.
                <br />
                Grow bigger with AI.
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
          Tools for smarter content creation
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
          RYNOVIX brings practical AI capabilities together to support
          different parts of the content creation workflow.
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
            Every part of RYNOVIX is guided by a simple goal: make AI
            more useful for the people who create.
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

    {/* Our Vision */}
    <section className="mx-auto mt-20 max-w-6xl">
      <div className="overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-600/10 via-[#080e22] to-blue-600/10 p-8 text-center md:p-12">
        <div className="mx-auto max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
            Our Vision
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Making AI useful for creators
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
            We believe AI can support creativity and help people
            accomplish more with less repetitive work. Our focus is
            on developing useful tools for content ideation, writing,
            and optimization within the creator workflow.
          </p>
        </div>
      </div>
    </section>

    {/* Business Information */}
    <section className="mx-auto mt-20 max-w-6xl">
      <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#070d1f] to-purple-600/10 p-8 shadow-2xl shadow-blue-950/10 md:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Business Information
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Clear information. Direct support.
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
            RYNOVIX is an independent AI software platform focused on
            tools for content creators and YouTube workflows. The
            platform provides online AI-powered tools to assist with
            content ideas, video titles, scripts, descriptions,
            keywords, and related creator tasks.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            If you have questions about our services, subscriptions,
            billing, or refunds, you can contact our support team using
            the email address below.
          </p>

          <div className="mt-7 rounded-2xl border border-white/10 bg-[#050814]/70 p-5">
            <p className="text-sm text-slate-400">
              Customer Support
            </p>

            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=RYNOVIX%20Support%20Request`}
              className="mt-2 inline-block break-all font-medium text-blue-400 underline decoration-blue-400/40 underline-offset-4 transition hover:text-blue-300"
            >
              {SUPPORT_EMAIL}
            </a>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              For customer support and business inquiries, please contact
              us by email.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
            >
              Contact RYNOVIX
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Transparency */}
    <section className="mx-auto mt-20 max-w-6xl">
      <div className="rounded-3xl border border-white/10 bg-[#070d1f]/80 p-8 md:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Transparency
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Clear terms and ongoing improvement
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
            We aim to explain our services, available plans, and
            applicable policies clearly. Before purchasing a paid plan,
            review the relevant pricing and policy information so you
            can make an informed decision.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/terms"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500/30 hover:text-white"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500/30 hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/refund"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500/30 hover:text-white"
            >
              Refund Policy
            </Link>
          </div>
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
            RYNOVIX will continue to develop practical AI tools and
            improve the creator experience based on the needs of its
            users and the direction of the platform.
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
              href="/#all-tools"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
            >
              Explore AI Tools
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
);
}
