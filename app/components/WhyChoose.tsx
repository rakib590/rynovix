import { Layers, Zap, ShieldCheck, Sparkles, Globe, Cloud, type LucideIcon } from "lucide-react"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: Layers,
    title: "All-in-One Platform",
    description: "Everything you need in one powerful platform.",
    color: "text-fuchsia-400",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get results in seconds, not minutes.",
    color: "text-blue-400",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "Your data is encrypted and 100% secure.",
    color: "text-yellow-400",
  },
  {
    icon: Sparkles,
    title: "Easy to Use",
    description: "Simple interface for beginners & pros.",
    color: "text-pink-400",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Supports 100+ languages worldwide.",
    color: "text-blue-400",
  },
  {
    icon: Cloud,
    title: "Cloud Based",
    description: "Access your tools anywhere, anytime.",
    color: "text-amber-400",
  },
]

export default function WhyChoose() {
  return (
    <section className="w-full bg-[#060B1A] py-16 px-6 sm:px-6 lg:px-6">
      <div className="mx-auto max-w-7xl rounded-3x1 border border-[#252B45] bg-[#0A1024]/60 p-6 sm:p-10 shadow-[0_0_80px_-20px_rgba(59,130,246,0.25)]">
        {/* Badge */}
        <div className="mb-10 flex justify-center">
          <span className="text-lg font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-400 to-fuchsia-500 bg-clip-text text-transparent">
            Why Choose RYNOVIX?
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group flex items-start gap-3 rounded-2xl border border-[#252B45] bg-[#0B1226]/60 p-4 transition-all duration-300 hover:border-blue-500/40 hover:bg-[#0E1730]/80 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#252B45] bg-[#0A1024] transition-transform duration-300 group-hover:scale-110">
                  <Icon className={`h-5 w-5 ${feature.color}`} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-100">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
