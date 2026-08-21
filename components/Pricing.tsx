import { Check } from "lucide-react"

type Plan = {
  name: string
  price: string
  features: string[]
  cta: string
  featured?: boolean
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    features: ["5 AI Generations / day", "Access to 10 Tools", "Community Support"],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$9",
    features: [
      "Unlimited AI Generations",
      "All Version 1.0 Tools",
      "Early Access to New Features",
      "Priority Support",
    ],
    cta: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Business",
    price: "$29",
    features: ["Everything in Pro", "Team Access", "Future AI Tools Included", "Priority Support"],
    cta: "Get Started",
  },
]

export default function Pricing() {
  return (
    <section className="w-full bg-[#060B1A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Badge + heading */}
        <div className="mb-3 flex justify-center">
          <span className="text-lg font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-400 to-fuchsia-500 bg-clip-text text-transparent">
            Simple Pricing
          </span>
        </div>
        <p className="mb-12 text-center text-lg text-slate-400">Start for free. Upgrade anytime.</p>

        {/* Cards */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const isFeatured = plan.featured
            return (
              <div
                key={plan.name}
                className={`group relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${
                  isFeatured
                    ? "border-blue-500/60 bg-[#0B1024]/80 shadow-[0_0_80px_-15px_rgba(79,70,229,0.6)] lg:scale-105"
                    : "border-[#252B45] bg-[#0A1024]/50 hover:border-blue-500/40 hover:shadow-[0_0_50px_-15px_rgba(99,102,241,0.4)]"
                }`}
              >
                {/* Plan name + badge */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-100">{plan.name}</h3>
                  {isFeatured && (
                    <span className="rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-[0_0_20px_-4px_rgba(79,70,229,0.8)]">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-50">{plan.price}</span>
                  <span className="text-base text-slate-400">/month</span>
                </div>

                {/* Features */}
                <ul className="mt-8 flex flex-col gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 shrink-0 text-green-400" strokeWidth={2.5} />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  className={`mt-10 w-full rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    isFeatured
                      ? "bg-gradient-to-r from-indigo-600 to-blue-400 text-white shadow-[0_0_30px_-6px_rgba(79,70,229,0.8)] hover:brightness-110"
                      : "border border-[#252B45] bg-transparent text-slate-200 hover:border-blue-500/50 hover:bg-[#0E1730]/60"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
