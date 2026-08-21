import { Zap, Check } from "lucide-react"

const FEATURES = [
  ["No Credit Card", "Required"],
  ["Free Trial", "Available"],
  ["Cancel Anytime", "No Risk"],
] as const

export default function HeroLeft() {
  return (
    <div className="flex max-w-2xl flex-col items-start text-left">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 pr-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
          <Zap className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
          New
        </span>
        <span className="text-sm font-medium text-foreground/80">RYNOVIX 1.0 is Live</span>
      </div>

      {/* Headline */}
      <h1 className="mt-8 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        <span className="text-foreground">One Platform.</span>
        <br />
        <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Unlimited AI Possibilities.
        </span>
      </h1>

      {/* Subtext */}
      <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
        All-in-one AI platform for YouTube creators. Generate titles, descriptions, hashtags, scripts and more &mdash;
        everything in one place.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-sky-500 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
        >
          <Zap className="h-5 w-5 fill-amber-400 text-amber-400" aria-hidden="true" />
          Get Started Free
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-7 py-4 text-base font-semibold text-foreground transition-colors hover:bg-white/[0.06]"
        >
          Explore Tools
        </button>
      </div>

      {/* Statistics / features row */}
      <ul className="mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
        {FEATURES.map(([line1, line2]) => (
          <li key={line1} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-500/40 text-sky-400">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium leading-tight text-muted-foreground">
              {line1}
              <br />
              {line2}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
