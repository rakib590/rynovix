import {
  LayoutDashboard,
  Grid3x3,
  Sparkles,
  Star,
  Clock,
  Settings,
  Trophy,
  FileText,
  Hash,
  Tag,
  PenLine,
  Clapperboard,
  Target,
  TrendingUp,
  Globe,
  CalendarDays,
  BarChart3,
  Award,
  Flame,
} from "lucide-react"
import Image from "next/image"

type NavItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  active?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "All Tools", icon: Grid3x3 },
  { label: "My Creations", icon: Sparkles },
  { label: "Favorites", icon: Star },
  { label: "History", icon: Clock },
  { label: "Settings", icon: Settings },
]

type Tab = {
  label: string
  soon?: boolean
  active?: boolean
}

const TABS: Tab[] = [
  { label: "YouTube Tools", active: true },
  { label: "Image AI", soon: true },
  { label: "Video AI", soon: true },
  { label: "Voice AI", soon: true },
  { label: "AI Chat", soon: true },
]

type Tool = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const TOOLS: Tool[] = [
  { label: "Title Generator", icon: Trophy, color: "text-amber-400" },
  { label: "Description Generator", icon: FileText, color: "text-slate-200" },
  { label: "Hashtag Generator", icon: Hash, color: "text-blue-400" },
  { label: "Tags Generator", icon: Tag, color: "text-amber-400" },
  { label: "Script Writer", icon: PenLine, color: "text-fuchsia-400" },
  { label: "Shorts Ideas", icon: Clapperboard, color: "text-cyan-400" },
  { label: "Thumbnail Title", icon: Target, color: "text-red-400" },
  { label: "SEO Checker", icon: TrendingUp, color: "text-blue-400" },
  { label: "Keyword Generator", icon: Globe, color: "text-emerald-400" },
  { label: "Best Upload Time", icon: CalendarDays, color: "text-red-400" },
]

type Activity = {
  label: string
  time: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const ACTIVITY: Activity[] = [
  { label: "How to Grow on YouTube Fast (2024)", time: "2 min ago", icon: BarChart3, color: "text-amber-400" },
  { label: "Best YouTube Tools for Creators", time: "15 min ago", icon: Award, color: "text-amber-400" },
  { label: "YouTube SEO Tips for More Views", time: "1 hour ago", icon: Flame, color: "text-red-400" },
]

function UsageRing() {
  const used = 23
  const total = 50
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const progress = (used / total) * circumference

  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="oklch(1 0 0 / 10%)" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#usage-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
        <defs>
          <linearGradient id="usage-grad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="RYNOVIX Logo"
      width={46}
      height={46}
      priority
      className="h-12 w-12 shrink-0"
    />
  )
}

export default function HeroDashboard() {
  return (
    <div className="w-full max-w-6xl rounded-2xl border border-white/10 bg-[#0a0f1f] p-4 shadow-2xl shadow-blue-950/50 ring-1 ring-white/5 sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <aside className="shrink-0 lg:w-56">
          <div className="mb-6 flex items-center gap-2">
            <Logo />
            <span className="text-base font-semibold text-white">RYNOVIX Dashboard</span>
          </div>
          <nav className="flex flex-row flex-wrap gap-1 lg:flex-col">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 space-y-5">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-2">
            {TABS.map((tab) => (
              <button
                key={tab.label}
                className={`flex flex-col items-start rounded-xl px-4 py-2 text-left transition-colors ${
                  tab.active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <span className="text-sm font-semibold">{tab.label}</span>
                {tab.soon && <span className="text-xs text-slate-500">Coming Soon</span>}
              </button>
            ))}
          </div>

          {/* Quick Access */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Quick Access (10 Tools)</h3>
              <button className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-white/5">
                View All Tools
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {TOOLS.map((tool) => {
                const Icon = tool.icon
                return (
                  <button
                    key={tool.label}
                    className="flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center transition-colors hover:border-white/20 hover:bg-white/5"
                  >
                    <Icon className={`h-8 w-8 ${tool.color}`} />
                    <span className="text-sm font-medium leading-tight text-slate-200">{tool.label}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Bottom row */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Recent Activity */}
            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">Recent Activity</h3>
              <ul className="space-y-2">
                {ACTIVITY.map((item) => {
                  const Icon = item.icon
                  return (
                    <li
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-3"
                    >
                      <Icon className={`h-5 w-5 shrink-0 ${item.color}`} />
                      <span className="min-w-0 flex-1 truncate text-sm text-slate-200">{item.label}</span>
                      <span className="shrink-0 text-xs text-slate-500">{item.time}</span>
                    </li>
                  )
                })}
              </ul>
            </section>

            {/* Usage */}
            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">Usage This Week</h3>
              <div className="flex items-center gap-6">
                <UsageRing />
                <div>
                  <p className="text-3xl font-bold text-white">
                    23 <span className="text-slate-500">/ 50</span>
                  </p>
                  <p className="text-sm text-slate-400">Generations Used</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">Resets in 3 days</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
