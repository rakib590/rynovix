import {
  ImageIcon,
  Film,
  Video,
  Mic,
  Bot,
  Camera,
  Clapperboard,
  Palette,
  Globe,
  Rocket,
  type LucideIcon,
} from "lucide-react"

type Feature = {
  title: string
  description: string
  Icon: LucideIcon
  iconColor: string
  iconGlow: string
}

const FEATURES: Feature[] = [
  {
    title: "Text to Image",
    description: "Generate stunning images from text.",
    Icon: ImageIcon,
    iconColor: "text-amber-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(251,191,36,0.6)]",
  },
  {
    title: "Image to Video",
    description: "Turn images into engaging videos.",
    Icon: Film,
    iconColor: "text-sky-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(56,189,248,0.6)]",
  },
  {
    title: "Text to Video",
    description: "Create videos from text instantly.",
    Icon: Video,
    iconColor: "text-cyan-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]",
  },
  {
    title: "AI Voice",
    description: "Realistic AI voices for your content.",
    Icon: Mic,
    iconColor: "text-purple-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(192,132,252,0.6)]",
  },
  {
    title: "AI Chat",
    description: "Chat with AI for ideas, answers & more.",
    Icon: Bot,
    iconColor: "text-blue-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(96,165,250,0.6)]",
  },
  {
    title: "Photo Enhancer",
    description: "Enhance and improve your photos.",
    Icon: Camera,
    iconColor: "text-emerald-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]",
  },
  {
    title: "Video Enhancer",
    description: "Improve video quality like never before.",
    Icon: Clapperboard,
    iconColor: "text-fuchsia-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(232,121,249,0.6)]",
  },
  {
    title: "AI Design",
    description: "Create amazing designs in seconds.",
    Icon: Palette,
    iconColor: "text-orange-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(251,146,60,0.6)]",
  },
  {
    title: "AI Website Builder",
    description: "Build professional websites with AI.",
    Icon: Globe,
    iconColor: "text-blue-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(96,165,250,0.6)]",
  },
  {
    title: "Everything AI",
    description: "All-in-one AI tools in one platform.",
    Icon: Rocket,
    iconColor: "text-pink-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(244,114,182,0.6)]",
  },
]

export default function Features() {
  return (
    <section className="w-full px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-4 max-w-3xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h2 className="text-balance bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-sky-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
              The Future of RYNOVIX
            </h2>
            <span className="rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fuchsia-300">
              Coming Soon
            </span>
          </div>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {
              "We're building one platform where creators can generate images, videos, voice, websites, designs and much more with AI."
            }
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FEATURES.map(({ title, description, Icon, iconColor, iconGlow }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              {/* Gradient glow on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10" />
              </div>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-shadow duration-300 group-hover:${iconGlow}`}
                  >
                    <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">{title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
