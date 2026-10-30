
import {
  Layers,
  Zap,
  ShieldCheck,
  Sparkles,
  Globe,
  Cloud,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  glow: string;
};

const features: Feature[] = [
  {
    icon: Layers,
    title: "All-in-One Platform",
    description: "Everything you need in one powerful platform.",
    color: "text-fuchsia-400",
    glow: "group-hover:shadow-fuchsia-500/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get results in seconds, not minutes.",
    color: "text-blue-400",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "We take your data privacy and security seriously.",
    color: "text-yellow-400",
    glow: "group-hover:shadow-yellow-500/10",
  },
  {
    icon: Sparkles,
    title: "Easy to Use",
    description: "An intuitive interface for beginners and pros.",
    color: "text-pink-400",
    glow: "group-hover:shadow-pink-500/10",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Create content for audiences around the world.",
    color: "text-cyan-400",
    glow: "group-hover:shadow-cyan-500/10",
  },
  {
    icon: Cloud,
    title: "Cloud Based",
    description: "Access your tools wherever you have internet.",
    color: "text-amber-400",
    glow: "group-hover:shadow-amber-500/10",
  },
];

export default function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="relative isolate w-full overflow-hidden bg-[#060B1A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-64 w-64 rounded-full bg-fuchsia-600/[0.07] blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-72 w-72 rounded-full bg-blue-500/[0.08] blur-[110px]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#0A1024] via-[#090E20] to-[#0B1226] p-5 shadow-[0_0_80px_-30px_rgba(59,130,246,0.25)] sm:p-8 lg:p-10">
          {/* Subtle decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
          />

          {/* Section heading */}
          <div className="relative mb-9 text-center sm:mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-fuchsia-300 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Why Choose RYNOVIX?
            </span>

            <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                Create More
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Powerful AI tools, a simple workflow, and a platform designed
              to help bring your creative ideas to life.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className={`group relative flex min-h-[132px] items-start gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B1226]/75 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-[#101A32] hover:shadow-xl ${feature.glow}`}
                >
                  {/* Hover accent */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent transition-colors duration-300 group-hover:via-cyan-400/50"
                  />

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#080D1C] transition-all duration-300 group-hover:scale-105 group-hover:border-white/15">
                    <Icon
                      className={`h-5 w-5 ${feature.color}`}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold leading-5 text-slate-100 transition-colors group-hover:text-white sm:text-base">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom accent */}
          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-slate-500 sm:mt-10">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400/50" />
            BUILT FOR CREATORS
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-fuchsia-400/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
