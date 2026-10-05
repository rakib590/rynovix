import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

const BLOG_POSTS = [
  {
    slug: "youtube-title-generator-ai",
    title: "How to Generate YouTube Titles with AI",
    description:
      "Learn how to create engaging, SEO-friendly YouTube titles with AI and improve your chances of getting more clicks.",
    category: "YouTube Growth",
  },
  {
    slug: "youtube-description-generator-ai",
    title: "How to Write YouTube Descriptions with AI",
    description:
      "Discover how AI can help you write clear, engaging, and SEO-optimized YouTube descriptions in less time.",
    category: "YouTube SEO",
  },
  {
    slug: "youtube-hashtag-generator-ai",
    title: "How to Generate YouTube Hashtags with AI",
    description:
      "Learn how to find relevant YouTube hashtags with AI and use them effectively to improve content discoverability.",
    category: "YouTube Growth",
  },
  {
    slug: "youtube-tags-generator",
    title: "How to Generate YouTube Tags for Better Reach",
    description:
      "Understand how YouTube tags work and how AI can help you generate relevant tags for your videos.",
    category: "YouTube SEO",
  },
  {
    slug: "youtube-script-writer-ai",
    title: "How to Write YouTube Scripts with AI",
    description:
      "Learn how to use AI to create engaging YouTube scripts with better structure, hooks, and audience-focused storytelling.",
    category: "Content Creation",
  },
  {
    slug: "youtube-shorts-ideas",
    title: "50 YouTube Shorts Ideas You Can Generate with AI",
    description:
      "Looking for Shorts ideas? Explore creative video concepts and learn how AI can help you generate new ideas faster.",
    category: "YouTube Shorts",
  },
  {
    slug: "thumbnail-title-generator",
    title: "How to Create Click-Worthy Thumbnail Titles",
    description:
      "Learn how to create short, compelling thumbnail titles that grab attention and support better YouTube click-through rates.",
    category: "YouTube CTR",
  },
  {
    slug: "youtube-seo-checker",
    title: "How to Improve Your YouTube SEO Score",
    description:
      "Learn the key factors behind YouTube SEO and practical ways to improve your video's overall optimization.",
    category: "SEO Guide",
  },
  {
    slug: "youtube-keyword-generator-ai",
    title: "How to Find YouTube Keywords with AI",
    description:
      "Discover how AI-powered keyword research can help you find relevant search terms and better content opportunities.",
    category: "Keyword Research",
  },
  {
    slug: "best-time-to-upload-youtube-videos",
    title: "How to Find the Best Time to Upload YouTube Videos",
    description:
      "Learn which factors matter when choosing an upload time and how to build a consistent publishing schedule.",
    category: "YouTube Growth",
  },
];

export default function BlogPage() {
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
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            <BookOpen size={16} />
            RYNOVIX Blog
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI & YouTube Creator
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Growth Guides
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Learn practical strategies for YouTube growth, AI content
            creation, SEO, keywords, titles, scripts, and more with RYNOVIX.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center gap-3">
            <Sparkles className="text-blue-400" size={22} />

            <div>
              <h2 className="text-2xl font-bold text-white">
                Latest Creator Guides
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Practical guides to help you create better content with AI.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-white/10 bg-[#080d1f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#0a1026] hover:shadow-2xl hover:shadow-blue-950/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <div className="mb-5 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                  {post.category}
                </div>

                <h3 className="text-xl font-bold leading-7 text-white transition-colors duration-300 group-hover:text-blue-300">
                  {post.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {post.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors group-hover:text-blue-400">
                  Read Article

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent p-8 text-center sm:p-12">
          <Sparkles className="mx-auto mb-5 text-blue-400" size={30} />

          <h2 className="text-3xl font-bold text-white">
            Create Better Content with AI
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Explore RYNOVIX AI creator tools and turn your content ideas into
            optimized titles, descriptions, hashtags, tags, scripts, keywords,
            and more.
          </p>

          <Link
            href="/#all-tools"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
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