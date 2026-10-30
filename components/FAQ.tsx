
"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};


const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is RYNOVIX?",
    answer:
      "RYNOVIX is an AI-powered creator platform featuring 32 AI tools designed to help creators generate content, improve SEO, discover ideas, and streamline their creative workflow.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. RYNOVIX offers a Free plan with 100 AI Credits per month, giving creators an easy way to get started with AI-powered content creation.",
  },
  {
    question: "How many AI tools does RYNOVIX offer?",
    answer:
      "RYNOVIX provides 32 AI creator tools. All 32 tools are available to help you create content, generate ideas, improve SEO, and work more efficiently.",
  },
  {
    question: "Which AI tools are included?",
    answer:
      "RYNOVIX offers 32 AI tools covering content writing, title and description generation, hashtags, tags, script writing, Shorts ideas, thumbnail titles, SEO optimization, keyword research, creative generation, and other creator workflows.",
  },
  {
    question: "Can I use RYNOVIX for YouTube?",
    answer:
      "Absolutely! RYNOVIX is designed to support YouTube creators with video ideas, titles, descriptions, scripts, tags, hashtags, thumbnails, keywords, SEO optimization, and content planning.",
  },
  {
    question: "Are all 32 AI tools available?",
    answer:
      "Yes. All 32 AI tools are available on RYNOVIX. You can explore the available tools and choose the ones that best fit your content creation workflow.",
  },
  {
    question: "Do AI tools use credits?",
    answer:
      "AI generation uses credits according to the selected tool and action. Your available credit balance and the applicable usage costs determine how much you can generate.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We take data privacy and security seriously. Please review our Privacy Policy for details about how RYNOVIX handles and protects your information.",
  },
  {
    question: "Can RYNOVIX help improve my content?",
    answer:
      "Yes. RYNOVIX helps you brainstorm ideas, create engaging content, optimize titles and descriptions, discover relevant keywords, and improve your content workflow using AI-powered tools.",
  },
  {
    question: "How do I upgrade my plan?",
    answer:
      "Visit the Pricing section to compare the Free, Pro, and Business plans. Choose the plan that fits your needs and follow the checkout instructions to complete your subscription.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "If you need help using RYNOVIX, visit the available Help Center or Contact page for assistance. Support options may vary depending on your selected plan.",
  },
];


function FaqCard({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 ${
        open
          ? "border-blue-500/50 bg-[#111834] shadow-[0_0_30px_-8px_rgba(59,130,246,0.5)]"
          : "border-[#252B45] bg-[#0d1329] hover:border-blue-500/40 hover:shadow-[0_0_25px_-10px_rgba(99,102,241,0.6)]"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-slate-100 md:text-base">
          {item.question}
        </span>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-hover:text-blue-400 ${
            open ? "rotate-180 text-blue-400" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-[#080c1c] px-4 py-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-[#252B45] bg-[#0a0f24]/60 px-6 py-14 shadow-[0_0_60px_-20px_rgba(59,130,246,0.35)] md:px-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#252B45] bg-[#111834] px-4 py-1.5 text-xs font-medium text-slate-300">
            <Sparkles
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
            FAQ
          </span>

          <h2 className="mt-5 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-2xl font-bold uppercase tracking-wide text-transparent text-balance sm:text-3xl md:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-sm text-slate-400 text-pretty md:text-base">
            Everything you need to know about RYNOVIX and how it works.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {FAQ_ITEMS.map((item) => (
            <FaqCard key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}