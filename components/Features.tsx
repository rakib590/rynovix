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
  Star,
  BadgePlus,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  title: string
  description: string
  Icon: LucideIcon
  iconColor: string
  iconGlow: string
}

const FEATURES: Feature[] = [
  {
    title: "Image Generator",
    description: "Generate stunning AI images from text prompts.",
    Icon: ImageIcon,
    iconColor: "text-amber-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(251,191,36,0.6)]",
  },
  {
    title: "Video Generator",
    description: "Create AI videos in just a few clicks.",
    Icon: Video,
    iconColor: "text-cyan-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]",
  },
  {
    title: "AI Voice Generator",
    description: "Generate realistic AI voices instantly.",
    Icon: Mic,
    iconColor: "text-purple-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(192,132,252,0.6)]",
  },
  {
    title: "Photo Enhancer",
    description: "Enhance image quality with AI.",
    Icon: Camera,
    iconColor: "text-emerald-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]",
  },
  {
    title: "Video Enhancer",
    description: "Improve video quality automatically.",
    Icon: Clapperboard,
    iconColor: "text-fuchsia-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(232,121,249,0.6)]",
  },
  {
    title: "AI Website Builder",
    description: "Build websites using AI in minutes.",
    Icon: Globe,
    iconColor: "text-blue-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(96,165,250,0.6)]",
  },
  {
  title: "AI Logo Generator",
  description: "Create professional logos with AI in seconds.",
  Icon: BadgePlus,
  iconColor: "text-indigo-400",
  iconGlow: "shadow-[0_0_20px_-4px_rgba(129,140,248,0.6)]",
},
  {
    title: "Remove Background",
    description: "Remove image backgrounds instantly.",
    Icon: Palette,
    iconColor: "text-pink-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(244,114,182,0.6)]",
  },
  {
    title: "Image Converter",
    description: "Convert images into multiple formats.",
    Icon: Film,
    iconColor: "text-sky-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(56,189,248,0.6)]",
  },
  {
    title: "AI Makeup Try On",
    description: "Try virtual makeup powered by AI.",
    Icon: Bot,
    iconColor: "text-rose-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(251,113,133,0.6)]",
  },
  {
    title: "AI Clothes",
    description: "Try different outfits using AI.",
    Icon: Rocket,
    iconColor: "text-orange-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(251,146,60,0.6)]",
  },
  {
    title: "AI Hairstyle Generator",
    description: "Preview hairstyles with AI instantly.",
    Icon: Star,
    iconColor: "text-violet-400",
    iconGlow: "shadow-[0_0_20px_-4px_rgba(167,139,250,0.6)]",
  },
];
export default function Features() {
  return (
    <section className="w-full px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-sky-400 bg-clip-text text-4xl font-bold text-transparent">
            The Future of RYNOVIX
          </h2>

          <p className="mt-4 text-muted-foreground">
            Powerful AI tools coming soon.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES.map(
            ({ title, description, Icon, iconColor, iconGlow }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${iconGlow}`}
                >
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}