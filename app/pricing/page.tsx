import Link from "next/link";

import UpgradeHero from "@/components/upgrade/UpgradeHero";
import PricingCards from "@/components/upgrade/PricingCards";
import ComparisonTable from "@/components/upgrade/ComparisonTable";
import UpgradeCTA from "@/components/upgrade/UpgradeCTA";
import UpgradeFAQ from "@/components/upgrade/UpgradeFAQ";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#060B1A] text-white">
      {/* Public Pricing Header */}
      <section className="border-b border-white/10 bg-[#070d1f]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-wide text-white transition-colors hover:text-blue-400"
          >
            RYNOVIX
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-600/10 hover:text-white"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Pricing Content */}
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <UpgradeHero />

        <PricingCards currentPlan="Free" />

        <ComparisonTable />

        <UpgradeCTA />

        <UpgradeFAQ />
      </div>
    </main>
  );
}