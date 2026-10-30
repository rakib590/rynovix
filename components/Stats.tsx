
import {
  Sparkles,
  WandSparkles,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  iconColor: string;
  tileClass: string;
  glowClass: string;
}

const stats: Stat[] = [
  {
    icon: Sparkles,
    value: "32",
    label: "AI Creator Tools",
    iconColor: "text-blue-400",
    tileClass: "bg-blue-500/10 border-blue-500/20",
    glowClass:
      "group-hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)]",
  },
  {
    icon: WandSparkles,
    value: "AI",
    label: "Content Generation",
    iconColor: "text-purple-400",
    tileClass: "bg-purple-500/10 border-purple-500/20",
    glowClass:
      "group-hover:shadow-[0_0_25px_-5px_rgba(147,51,234,0.5)]",
  },
  {
    icon: Target,
    value: "SEO",
    label: "Creator-Focused Tools",
    iconColor: "text-amber-400",
    tileClass: "bg-amber-500/10 border-amber-500/20",
    glowClass:
      "group-hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.5)]",
  },
  {
    icon: Zap,
    value: "Flexible",
    label: "Plans for Different Needs",
    iconColor: "text-cyan-400",
    tileClass: "bg-cyan-500/10 border-cyan-500/20",
    glowClass:
      "group-hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)]",
  },
];

export default function Stats() {
  return (
    <section
      id="platform-stats"
      className="relative isolate w-full overflow-hidden bg-[#0a0e1f] px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      aria-label="RYNOVIX platform features"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-10 h-56 w-56 rounded-full bg-blue-500/[0.07] blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-56 w-56 rounded-full bg-fuchsia-500/[0.06] blur-[100px]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0d1225]/95 via-[#0b1122]/95 to-[#101329]/95 shadow-[0_0_60px_-25px_rgba(37,99,235,0.3)]">
          {/* Top accent */}
          <div
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
          />

          <div className="grid grid-cols-1 divide-y divide-white/[0.08] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/[0.08]">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group relative flex items-center gap-4 px-5 py-6 transition-all duration-300 hover:bg-white/[0.025] sm:justify-center sm:px-4 lg:justify-start lg:px-6 xl:px-7"
                >
                  {/* Hover accent */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent transition-all duration-300 group-hover:via-cyan-400/40"
                  />

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105 sm:h-14 sm:w-14 ${stat.tileClass} ${stat.glowClass}`}
                  >
                    <Icon
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
                      {stat.value}
                    </div>

                    <div className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
