import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  toolName: string;
  toolLink: string;
  content: string[];
};

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "youtube-title-generator-ai",
    title: "How to Generate YouTube Titles with AI",
    description:
      "Learn how to create engaging, SEO-friendly YouTube titles with AI and improve your chances of getting more clicks.",
    category: "YouTube Growth",
    toolName: "Title Generator",
    toolLink: "/dashboard/tools/title-generator",
    content: [
      "A strong YouTube title can make a major difference in whether someone decides to click on your video. Your title should clearly communicate the value of the video while creating enough curiosity to encourage viewers to learn more.",
      "AI can help creators generate multiple title ideas quickly. Instead of spending a long time thinking about different variations, you can use AI to explore different angles, keywords, tones, and audience-focused ideas.",
      "When creating a YouTube title, focus on clarity first. Include the main topic naturally, avoid misleading clickbait, and make sure the title accurately represents the video.",
      "Testing several title ideas can also help you identify stronger options. RYNOVIX Title Generator is designed to help creators generate SEO-friendly YouTube title ideas faster.",
    ],
  },
  {
    slug: "youtube-description-generator-ai",
    title: "How to Write YouTube Descriptions with AI",
    description:
      "Discover how AI can help you write clear, engaging, and SEO-optimized YouTube descriptions in less time.",
    category: "YouTube SEO",
    toolName: "Description Generator",
    toolLink: "/dashboard/tools/description-generator",
    content: [
      "A good YouTube description helps viewers understand what your video is about and can provide useful context for search engines and your audience.",
      "Writing descriptions manually for every video can take time. AI can help creators create structured descriptions based on their video topic, keywords, audience, and content.",
      "For better results, keep your primary topic clear and use relevant keywords naturally. Avoid filling the description with repetitive keywords because readability should remain the priority.",
      "RYNOVIX Description Generator can help creators produce optimized YouTube descriptions quickly so they can spend more time creating content.",
    ],
  },
  {
    slug: "youtube-hashtag-generator-ai",
    title: "How to Generate YouTube Hashtags with AI",
    description:
      "Learn how to find relevant YouTube hashtags with AI and use them effectively to improve content discoverability.",
    category: "YouTube Growth",
    toolName: "Hashtag Generator",
    toolLink: "/dashboard/tools/hashtag-generator",
    content: [
      "Relevant hashtags can help organize your content around specific topics and make it easier for viewers to understand what your video is about.",
      "AI can generate hashtag ideas based on your video topic, niche, and audience. This can save time when you need several relevant hashtag suggestions.",
      "The most useful hashtags are closely related to your actual video. Avoid using unrelated or overly broad hashtags simply because they appear popular.",
      "RYNOVIX Hashtag Generator helps creators quickly discover relevant hashtag ideas for their videos.",
    ],
  },
  {
    slug: "youtube-tags-generator",
    title: "How to Generate YouTube Tags for Better Reach",
    description:
      "Understand how YouTube tags work and how AI can help you generate relevant tags for your videos.",
    category: "YouTube SEO",
    toolName: "Tags Generator",
    toolLink: "/dashboard/tools/tags-generator",
    content: [
      "YouTube tags can provide additional context about your video. They are especially useful for helping identify common misspellings and variations of a topic.",
      "AI can make the tag research process faster by generating related keywords, phrases, and topic variations from a video subject.",
      "When creating tags, relevance matters more than simply generating a very large list. Your tags should accurately describe the video's subject.",
      "RYNOVIX Tags Generator helps creators generate relevant tag ideas based on their content topic.",
    ],
  },
  {
    slug: "youtube-script-writer-ai",
    title: "How to Write YouTube Scripts with AI",
    description:
      "Learn how to use AI to create engaging YouTube scripts with better structure, hooks, and audience-focused storytelling.",
    category: "Content Creation",
    toolName: "Script Writer",
    toolLink: "/dashboard/tools/script-writer",
    content: [
      "A well-structured script can make a YouTube video easier to produce and more engaging to watch. It can help creators organize their introduction, main points, examples, and conclusion.",
      "AI can help generate script outlines and first drafts based on a topic and desired tone. Creators can then edit the draft and add their own experience, opinions, examples, and personality.",
      "A strong script usually starts with a clear hook. The introduction should quickly tell viewers why the topic is worth watching while keeping the content natural and useful.",
      "RYNOVIX Script Writer helps creators turn video topics into structured script ideas faster.",
    ],
  },
  {
    slug: "youtube-shorts-ideas",
    title: "50 YouTube Shorts Ideas You Can Generate with AI",
    description:
      "Looking for Shorts ideas? Explore creative video concepts and learn how AI can help you generate new ideas faster.",
    category: "YouTube Shorts",
    toolName: "Shorts Ideas",
    toolLink: "/dashboard/tools/shorts-ideas",
    content: [
      "Coming up with fresh Shorts ideas consistently can be challenging. AI can help creators brainstorm different concepts based on their niche, audience, and content style.",
      "Good Shorts ideas are usually focused on one clear concept. A quick tip, surprising fact, short tutorial, comparison, challenge, or question can become the foundation of a useful Short.",
      "Instead of copying trends exactly, use AI to adapt popular content formats to your own niche and audience.",
      "RYNOVIX Shorts Ideas helps creators generate new short-form video concepts whenever they need inspiration.",
    ],
  },
  {
    slug: "thumbnail-title-generator",
    title: "How to Create Click-Worthy Thumbnail Titles",
    description:
      "Learn how to create short, compelling thumbnail titles that grab attention and support better YouTube click-through rates.",
    category: "YouTube CTR",
    toolName: "Thumbnail Title",
    toolLink: "/dashboard/tools/thumbnail-title",
    content: [
      "Thumbnail text should complement your video title rather than simply repeat it. A short and clear phrase can help communicate the video's main promise quickly.",
      "AI can generate different thumbnail title variations based on the topic and desired style. This gives creators more options to test during the design process.",
      "Keep thumbnail text easy to read and avoid overcrowding the design with too many words. The goal is to communicate the idea quickly.",
      "RYNOVIX Thumbnail Title helps creators generate concise and attention-focused thumbnail text ideas.",
    ],
  },
  {
    slug: "youtube-seo-checker",
    title: "How to Improve Your YouTube SEO Score",
    description:
      "Learn the key factors behind YouTube SEO and practical ways to improve your video's overall optimization.",
    category: "SEO Guide",
    toolName: "SEO Checker",
    toolLink: "/dashboard/tools/seo-checker",
    content: [
      "YouTube SEO involves more than adding keywords. Titles, descriptions, content relevance, viewer satisfaction, and overall presentation all contribute to how effectively a video can reach its intended audience.",
      "An SEO checker can help creators review important optimization areas and identify potential improvements before publishing.",
      "Start by making sure your main topic is clear in the title and description. Then review your keywords and ensure they are relevant to the actual content.",
      "RYNOVIX SEO Checker helps creators analyze their video optimization and identify areas that may need improvement.",
    ],
  },
  {
    slug: "youtube-keyword-generator-ai",
    title: "How to Find YouTube Keywords with AI",
    description:
      "Discover how AI-powered keyword research can help you find relevant search terms and better content opportunities.",
    category: "Keyword Research",
    toolName: "Keyword Generator",
    toolLink: "/dashboard/tools/keyword-generator",
    content: [
      "Keyword research helps creators understand the words and phrases people may use when searching for content. Good keyword ideas can also help shape future video topics.",
      "AI can generate keyword variations from a main topic, making it easier to explore related phrases and content angles.",
      "The best keywords should match your content and audience. Search volume alone should not determine whether a keyword is appropriate for your video.",
      "RYNOVIX Keyword Generator helps creators discover relevant keyword ideas for their content planning process.",
    ],
  },
  {
    slug: "best-time-to-upload-youtube-videos",
    title: "How to Find the Best Time to Upload YouTube Videos",
    description:
      "Learn which factors matter when choosing an upload time and how to build a consistent publishing schedule.",
    category: "YouTube Growth",
    toolName: "Best Upload Time",
    toolLink: "/dashboard/tools/best-upload-time",
    content: [
      "Choosing an upload time can be useful when building a consistent publishing schedule. However, there is no single universal best time that works for every YouTube channel.",
      "Your audience location, viewing habits, content type, and historical analytics can all influence when your viewers are most active.",
      "Consistency is often more useful than constantly changing your schedule. Use your channel analytics when available and experiment with different times to understand your audience.",
      "RYNOVIX Best Upload Time helps creators explore potential publishing windows and build a more consistent upload strategy.",
    ],
  },
];

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | RYNOVIX",
    };
  }

  return {
    title: `${post.title} | RYNOVIX`,
    description: post.description,
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050814] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#070d1f]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-wide text-white transition-colors hover:text-blue-400"
          >
            RYNOVIX
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white sm:flex"
            >
              <BookOpen size={16} />
              Blog
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

      {/* Article */}
      <article className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          {/* Category */}
          <div className="mt-10">
            <span className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-xs font-semibold text-blue-400">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-8 text-slate-400">
            {post.description}
          </p>

          {/* Article Content */}
          <div className="mt-12 space-y-7">
            {post.content.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-slate-300"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tool CTA */}
          <div className="mt-14 rounded-3xl border border-blue-500/20 bg-[#0A1024]/80 p-8 shadow-[0_0_60px_-25px_rgba(79,70,229,0.6)]">
            <h2 className="text-2xl font-bold text-white">
              Try RYNOVIX {post.toolName}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Use the RYNOVIX AI tool to speed up your content creation
              workflow.
            </p>

            <Link
              href={post.toolLink}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
            >
              Try {post.toolName}
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Back to Blog */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} />
              More Articles
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#070d1f] px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} RYNOVIX. All rights reserved.
          </span>

          <div className="flex items-center gap-5">
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

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}