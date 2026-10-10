
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
      "RYNOVIX is an AI platform designed to help creators generate and optimize content with easy-to-use tools for titles, descriptions, hashtags, scripts, SEO, and more.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. Our Free plan includes 100 AI Credits per month and access to 10 AI creator tools at no cost. No credit card is required to get started.",
  },
  {
    question: "Which AI tools are included?",
    answer:
      "RYNOVIX includes 10 AI creator tools covering title generation, descriptions, hashtags, tags, script writing, Shorts ideas, thumbnail titles, SEO checks, keyword generation, and upload-time suggestions. Tool usage consumes credits according to each tool's credit cost.",
  },
  {
    question: "Can I use it for YouTube?",
    answer:
      "Absolutely. RYNOVIX is designed with YouTube creators in mind, helping with content ideas, titles, descriptions, tags, hashtags, thumbnails, and SEO.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We take data privacy and security seriously. Please review our Privacy Policy for details about how RYNOVIX handles and protects your information.",
  },
  {
    question: "When are new AI tools coming?",
    answer:
      "We plan to improve RYNOVIX and introduce additional tools over time. New tools and features will be announced through our Updates page when they become available.",
  },
  {
    question: "How do I upgrade?",
    answer:
      "You can choose a Pro or Business plan from the Pricing page. Sign in when prompted and follow the checkout instructions to complete your upgrade. Subscription terms are presented during checkout.",
  },
  {
    question: "Do you offer support?",
    answer:
      "Free users can access community support. Pro and Business users may receive priority support according to the features included in their selected plan. Visit our Help Center or Contact page for assistance.",
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