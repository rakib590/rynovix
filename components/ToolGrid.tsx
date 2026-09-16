import {
  Trophy,
  FileText,
  Hash,
  Tags,
  Sparkles,
  Clapperboard,
  Target,
  TrendingUp,
  Globe,
  CalendarDays,
  Grid3x3,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

type Tool = {
  icon: LucideIcon
  title: string
  description: string
  iconColor: string
}

const TOOLS: Tool[] = [
  {
    icon: Trophy,
    title: "Title Generator",
    description: "Generate viral titles that get more clicks.",
    iconColor: "text-amber-400",
  },
  {
    icon: FileText,
    title: "Description Generator",
    description: "Create SEO-optimized descriptions instantly.",
    iconColor: "text-sky-300",
  },
  {
    icon: Hash,
    title: "Hashtag Generator",
    description: "Find the best trending hashtags for videos.",
    iconColor: "text-blue-500",
  },
  {
    icon: Tags,
    title: "Tags Generator",
    description: "Generate high-ranking tags for better reach.",
    iconColor: "text-amber-400",
  },
  {
    icon: Sparkles,
    title: "Script Writer",
    description: "Write engaging scripts for your videos.",
    iconColor: "text-fuchsia-400",
  },
  {
    icon: Clapperboard,
    title: "Shorts Ideas",
    description: "Get viral short video ideas in seconds.",
    iconColor: "text-emerald-400",
  },
  {
    icon: Target,
    title: "Thumbnail Title",
    description: "Create click-worthy thumbnail titles.",
    iconColor: "text-red-500",
  },
  {
    icon: TrendingUp,
    title: "SEO Checker",
    description: "Analyze and improve your video SEO score.",
    iconColor: "text-sky-400",
  },
  {
    icon: Globe,
    title: "Keyword Generator",
    description: "Find high-volume keywords for content.",
    iconColor: "text-green-400",
  },
  {
    icon: CalendarDays,
    title: "Best Upload Time",
    description: "Find the best time to upload for more views.",
    iconColor: "text-blue-400",
  },
]

export default function ToolGrid() {
  return (
    <section className="relative w-full px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-4 max-w-2xl text-center">
          <h2 className="text-balance bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-sky-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            AI Creator Tools
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Everything creators need in one platform. More powerful AI tools are coming soon.
          </p>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TOOLS.map((tool, index) => {
            const Icon = tool.icon

            return (
              <li key={tool.title} className="group relative">
                {/* Gradient glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/40 via-blue-500/20 to-fuchsia-500/40 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative flex min-h-[245px] h-full flex-col rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50">
                  {/* Number badge + icon */}
                  <div className="mb-5 flex items-start justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary text-sm font-semibold text-muted-foreground">
                      {index + 1}
                    </span>

                    <Icon
                      className={`h-8 w-8 ${tool.iconColor}`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>

                  {/* Title + description */}
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {tool.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>

                  {/* Launch link */}
                  <a
                    href="#"
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
                  >
                    Launch Tool
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </li>
            )
          })}
        </ul>

        {/* View All Tools */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-7 py-3.5 text-base font-semibold text-card-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card"
          >
            View All Tools
            <Grid3x3 className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}