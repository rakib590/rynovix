"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileText,
  LifeBuoy,
  MessageCircle,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wand2,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type HelpCategory = {
  title: string;
  description: string;
  icon: typeof BookOpen;
  articles: string;
  content: string[];
};

type PopularQuestion = {
  question: string;
  category: string;
  answer: string;
};

const HELP_CATEGORIES: HelpCategory[] = [
  {
    title: "Getting Started",
    description:
      "Learn the basics of RYNOVIX and get started with AI content creation.",
    icon: BookOpen,
    articles: "5 Articles",
    content: [
      "Create or sign in to your RYNOVIX account.",
      "Open the AI Tools section from your dashboard or the homepage.",
      "Choose the tool that matches your content creation needs.",
      "Enter your topic, keywords, or other required information.",
      "Click Generate and review the AI-generated result.",
    ],
  },
  {
    title: "AI Tools",
    description:
      "Learn how to use RYNOVIX AI tools to create better YouTube content.",
    icon: Sparkles,
    articles: "10 Articles",
    content: [
      "RYNOVIX currently provides 10 AI-powered creator tools.",
      "Title Generator helps you create YouTube titles.",
      "Description Generator creates optimized video descriptions.",
      "Hashtag Generator and Tags Generator help discover relevant metadata.",
      "Script Writer helps create structured video scripts.",
      "Shorts Ideas generates content ideas for YouTube Shorts.",
      "Thumbnail Title helps create short and attention-grabbing thumbnail text.",
      "SEO Checker analyzes your YouTube SEO.",
      "Keyword Generator helps discover relevant YouTube keywords.",
      "Best Upload Time helps you find suitable publishing times.",
    ],
  },
  {
    title: "Account & Profile",
    description:
      "Manage your account, profile settings, preferences, and security.",
    icon: UserRound,
    articles: "6 Articles",
    content: [
      "You can access your account from the RYNOVIX dashboard.",
      "Keep your account information up to date.",
      "Use a secure password and never share your login credentials.",
      "If you are signed out, use the Login page to access your account again.",
      "Account-related features can be expanded as your RYNOVIX account system grows.",
    ],
  },
  {
    title: "Credits & Billing",
    description:
      "Understand AI credits, plans, billing cycles, and subscription details.",
    icon: CreditCard,
    articles: "7 Articles",
    content: [
      "RYNOVIX uses AI credits to control AI generation usage.",
      "Different AI tools can use different amounts of credits.",
      "Your available credits can be checked from the dashboard billing area.",
      "Your plan determines the features and credit allowance available to you.",
      "When your credits are insufficient, you may need to wait for a renewal or upgrade your plan.",
      "Billing and subscription information can be managed from the Billing section.",
    ],
  },
  {
    title: "Troubleshooting",
    description:
      "Find solutions to common problems and issues while using RYNOVIX.",
    icon: Settings,
    articles: "8 Articles",
    content: [
      "If an AI generation fails, first check your internet connection.",
      "Refresh the page and try the generation again.",
      "Make sure the required input fields contain valid information.",
      "If a generation repeatedly fails, check whether you have enough AI credits.",
      "If the problem continues, contact RYNOVIX support with the error message.",
    ],
  },
  {
    title: "Safety & Privacy",
    description:
      "Learn how RYNOVIX protects your data, account, and generated content.",
    icon: ShieldCheck,
    articles: "4 Articles",
    content: [
      "Keep your RYNOVIX login credentials private.",
      "Do not share your account password with anyone.",
      "Avoid entering highly sensitive personal information into AI prompts.",
      "Review generated content before publishing it publicly.",
      "If you notice a security or privacy issue, contact RYNOVIX support.",
    ],
  },
];

const POPULAR_QUESTIONS: PopularQuestion[] = [
  {
    question: "How do I start using RYNOVIX AI tools?",
    category: "Getting Started",
    answer:
      "Sign in to your RYNOVIX account, open the AI Tools section, choose a tool, enter your topic or required information, and click Generate. Your AI-generated result will appear inside the tool.",
  },
  {
    question: "How many AI credits do I get with my plan?",
    category: "Credits & Billing",
    answer:
      "Your available AI credits depend on your current RYNOVIX plan. You can check your current credit balance and billing information from the Dashboard Billing section.",
  },
  {
    question: "How does the AI Title Generator work?",
    category: "AI Tools",
    answer:
      "Enter your video topic and choose your preferred options such as language, tone, length, audience, category, creativity, and number of titles. RYNOVIX then generates optimized YouTube title suggestions.",
  },
  {
    question: "What happens when I run out of AI credits?",
    category: "Credits & Billing",
    answer:
      "When you do not have enough credits for a generation, the AI request will not be completed. You can check your billing section for your available balance and plan information.",
  },
  {
    question: "How can I upgrade or change my plan?",
    category: "Credits & Billing",
    answer:
      "Open the RYNOVIX Pricing or Billing section to review the available plans and choose the plan that best matches your content creation needs.",
  },
  {
    question: "How do I manage my account settings?",
    category: "Account & Profile",
    answer:
      "Sign in to RYNOVIX and open your dashboard account or profile area. From there you can manage the account options currently available to you.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(
    null
  );

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedSearch) {
      return HELP_CATEGORIES;
    }

    return HELP_CATEGORIES.filter(
      (category) =>
        category.title.toLowerCase().includes(normalizedSearch) ||
        category.description.toLowerCase().includes(normalizedSearch) ||
        category.content.some((item) =>
          item.toLowerCase().includes(normalizedSearch)
        )
    );
  }, [normalizedSearch]);

  const filteredQuestions = useMemo(() => {
    if (!normalizedSearch) {
      return POPULAR_QUESTIONS;
    }

    return POPULAR_QUESTIONS.filter(
      (item) =>
        item.question.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch) ||
        item.answer.toLowerCase().includes(normalizedSearch)
    );
  }, [normalizedSearch]);

  function toggleCategory(title: string) {
    setSelectedCategory((current) =>
      current === title ? null : title
    );
    setSelectedQuestion(null);
  }

  function toggleQuestion(question: string) {
    setSelectedQuestion((current) =>
      current === question ? null : question
    );
    setSelectedCategory(null);
  }

  function clearSearch() {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedQuestion(null);
  }

  const totalSearchResults =
    filteredCategories.length + filteredQuestions.length;

  return (
    <main className="min-h-screen bg-[#050814] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#070d1f]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-lg font-bold tracking-wide text-white transition-colors duration-300 hover:text-blue-400"
          >
            RYNOVIX
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/tutorials"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-white sm:block"
            >
              Tutorials
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-600/10 hover:text-white"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            <LifeBuoy size={16} />
            RYNOVIX Help Center
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            How can we
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Find answers, learn how RYNOVIX works, and get the most out of
            your AI-powered content creation tools.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0a1023] px-5 py-4 shadow-2xl shadow-black/20 transition-all duration-300 focus-within:border-blue-500/40 focus-within:shadow-blue-950/20">
              <Search size={21} className="shrink-0 text-slate-500" />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSelectedCategory(null);
                  setSelectedQuestion(null);
                }}
                placeholder="Search help articles..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600 sm:text-base"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="shrink-0 text-xs font-medium text-slate-500 transition-colors hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {normalizedSearch && (
            <p className="mt-4 text-sm text-slate-500">
              Showing results for{" "}
              <span className="font-medium text-slate-300">
                "{searchQuery}"
              </span>
            </p>
          )}
        </div>
      </section>

      {/* Search Results */}
      {normalizedSearch && (
        <section className="border-b border-white/10 px-6 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">
                Search Results
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {totalSearchResults}{" "}
                {totalSearchResults === 1 ? "matching result" : "matching results"}{" "}
                found.
              </p>
            </div>

            {totalSearchResults === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#080d1f] px-6 py-14 text-center">
                <Search className="mx-auto text-slate-600" size={32} />

                <h3 className="mt-4 text-lg font-semibold text-white">
                  No results found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  We couldn't find anything matching your search.
                  Try another keyword.
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {/* Category Results */}
                {filteredCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected =
                    selectedCategory === category.title;

                  return (
                    <div key={category.title}>
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.title)}
                        className={`group flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                          isSelected
                            ? "border-blue-500/40 bg-[#0a1026]"
                            : "border-white/10 bg-[#080d1f] hover:border-blue-500/30 hover:bg-[#0a1026]"
                        }`}
                      >
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                            isSelected
                              ? "bg-blue-500/15 text-blue-300"
                              : "bg-blue-500/10 text-blue-300"
                          }`}
                        >
                          <Icon size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white">
                            {category.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {category.articles}
                          </p>
                        </div>

                        {isSelected ? (
                          <ChevronDown
                            size={18}
                            className="shrink-0 text-blue-400"
                          />
                        ) : (
                          <ChevronRight
                            size={18}
                            className="shrink-0 text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-400"
                          />
                        )}
                      </button>

                      {isSelected && (
                        <div className="mt-3 rounded-2xl border border-blue-500/20 bg-[#070d1f] p-6">
                          <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
                            <BookOpen size={17} />
                            {category.title} Guide
                          </div>

                          <div className="mt-5 space-y-3">
                            {category.content.map((item, index) => (
                              <div
                                key={item}
                                className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                              >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-300">
                                  {index + 1}
                                </span>

                                <p className="text-sm leading-6 text-slate-400">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Question Results */}
                {filteredQuestions.map((item) => {
                  const isSelected =
                    selectedQuestion === item.question;

                  return (
                    <div key={item.question}>
                      <button
                        type="button"
                        onClick={() => toggleQuestion(item.question)}
                        className={`group flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                          isSelected
                            ? "border-purple-500/40 bg-[#0a1026]"
                            : "border-white/10 bg-[#080d1f] hover:border-purple-500/30 hover:bg-[#0a1026]"
                        }`}
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
                          <MessageCircle size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white">
                            {item.question}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {item.category}
                          </p>
                        </div>

                        {isSelected ? (
                          <ChevronDown
                            size={18}
                            className="shrink-0 text-purple-400"
                          />
                        ) : (
                          <ChevronRight
                            size={18}
                            className="shrink-0 text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-purple-400"
                          />
                        )}
                      </button>

                      {isSelected && (
                        <div className="mt-3 rounded-2xl border border-purple-500/20 bg-[#070d1f] p-6">
                          <div className="flex gap-3">
                            <CircleHelp
                              size={18}
                              className="mt-1 shrink-0 text-purple-400"
                            />

                            <div>
                              <p className="text-sm font-semibold text-purple-300">
                                Answer
                              </p>

                              <p className="mt-2 text-sm leading-7 text-slate-400">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Help Categories */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <CircleHelp size={24} className="text-blue-400" />

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Browse Help Topics
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Find helpful guides and answers by category.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HELP_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isSelected =
                selectedCategory === category.title;

              return (
                <div key={category.title}>
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.title)}
                    className={`group w-full rounded-2xl border p-6 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-blue-500/40 bg-[#0a1026] shadow-2xl shadow-blue-950/20"
                        : "border-white/10 bg-[#080d1f] hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#0a1026] hover:shadow-2xl hover:shadow-blue-950/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                          isSelected
                            ? "border-blue-500/40 bg-blue-500/15 text-blue-300"
                            : "border-blue-500/20 bg-blue-500/10 text-blue-300 group-hover:border-blue-500/40 group-hover:bg-blue-500/15"
                        }`}
                      >
                        <Icon size={22} />
                      </div>

                      {isSelected ? (
                        <ChevronDown
                          size={19}
                          className="mt-1 text-blue-400"
                        />
                      ) : (
                        <ChevronRight
                          size={19}
                          className="mt-1 text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400"
                        />
                      )}
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-white transition-colors duration-300 group-hover:text-blue-300">
                      {category.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {category.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-500">
                      <FileText size={14} />
                      {category.articles}
                    </div>
                  </button>

                  {isSelected && (
                    <div className="mt-3 rounded-2xl border border-blue-500/20 bg-[#070d1f] p-6">
                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
                        <BookOpen size={17} />
                        {category.title} Guide
                      </div>

                      <div className="mt-5 space-y-3">
                        {category.content.map((item, index) => (
                          <div
                            key={item}
                            className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-300">
                              {index + 1}
                            </span>

                            <p className="text-sm leading-6 text-slate-400">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="border-t border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 text-purple-300">
              <Zap size={21} />
            </div>

            <h2 className="text-2xl font-bold text-white">
              Popular Questions
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Click a question to view the answer.
            </p>
          </div>

          <div className="grid gap-3">
            {POPULAR_QUESTIONS.map((item) => {
              const isSelected =
                selectedQuestion === item.question;

              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => toggleQuestion(item.question)}
                    className={`group flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-purple-500/30 bg-[#0a1026]"
                        : "border-white/10 bg-[#080d1f] hover:border-purple-500/30 hover:bg-[#0a1026]"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300 sm:flex">
                        <MessageCircle size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-200 transition-colors duration-300 group-hover:text-white">
                          {item.question}
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    {isSelected ? (
                      <ChevronDown
                        size={17}
                        className="shrink-0 text-purple-400"
                      />
                    ) : (
                      <ChevronRight
                        size={17}
                        className="shrink-0 text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-purple-400"
                      />
                    )}
                  </button>

                  {isSelected && (
                    <div className="mt-2 rounded-xl border border-purple-500/20 bg-[#070d1f] p-5">
                      <div className="flex gap-3">
                        <CircleHelp
                          size={18}
                          className="mt-0.5 shrink-0 text-purple-400"
                        />

                        <div>
                          <p className="text-sm font-semibold text-purple-300">
                            Answer
                          </p>

                          <p className="mt-2 text-sm leading-7 text-slate-400">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="border-t border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent p-8 text-center shadow-2xl shadow-blue-950/10 sm:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-300">
            <LifeBuoy size={27} />
          </div>

          <h2 className="text-3xl font-bold text-white">
            Still need help?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Can't find what you're looking for? Our support team is here to
            help you with your RYNOVIX experience.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
            >
              Contact Support
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/tutorials"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              View Tutorials
              <BookOpen size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/10 px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#070d1f] p-6 text-center sm:p-8 md:flex-row md:text-left">
          <div className="flex items-center gap-4">
            <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300 sm:flex">
              <Wand2 size={21} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Ready to create something amazing?
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Explore the RYNOVIX AI tools and start creating today.
              </p>
            </div>
          </div>

          <Link
            href="/#all-tools"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-600/20"
          >
            Explore AI Tools
            <ArrowRight size={16} />
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