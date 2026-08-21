"use client"

import { Users, Zap, Sparkles, ShieldCheck, type LucideIcon } from "lucide-react"

interface Stat {
  icon: LucideIcon
  value: string
  label: string
  iconColor: string
  tileClass: string
  glowClass: string
}

const stats: Stat[] = [
  {
    icon: Users,
    value: "15K+",
    label: "Happy Creators",
    iconColor: "text-blue-400",
    tileClass: "bg-blue-500/10 border-blue-500/20",
    glowClass: "group-hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)]",
  },
  {
    icon: Zap,
    value: "50K+",
    label: "Content Generated",
    iconColor: "text-blue-400",
    tileClass: "bg-purple-500/15 border-purple-500/25",
    glowClass: "group-hover:shadow-[0_0_25px_-5px_rgba(147,51,234,0.6)]",
  },
  {
    icon: Sparkles,
    value: "10+",
    label: "Powerful AI Tools",
    iconColor: "text-amber-400",
    tileClass: "bg-amber-500/10 border-amber-500/20",
    glowClass: "group-hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.6)]",
  },
  {
    icon: ShieldCheck,
    value: "24/7",
    label: "Support Available",
    iconColor: "text-blue-400",
    tileClass: "bg-blue-500/10 border-blue-500/20",
    glowClass: "group-hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)]",
  },
]

export default function Stats() {
  return (
    <section className="w-full bg-[#0a0e1f] py-10 px-4">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/5 bg-[#0d1225]/60 px-6 py-8 shadow-[0_0_60px_-20px_rgba(37,99,235,0.35)]">
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="group flex items-center gap-4 px-4 py-4 transition-transform duration-300 hover:-translate-y-1 sm:justify-center lg:justify-start"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-shadow duration-300 ${stat.tileClass} ${stat.glowClass}`}
                >
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold leading-none text-white">{stat.value}</span>
                  <span className="mt-1.5 text-sm text-slate-400">{stat.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
