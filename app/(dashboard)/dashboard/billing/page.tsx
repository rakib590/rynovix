import DashboardLayout from "@/components/dashboard/DashboardLayout";

import UpgradeHero from "@/components/upgrade/UpgradeHero";
import PricingCards from "@/components/upgrade/PricingCards";
import ComparisonTable from "@/components/upgrade/ComparisonTable";
import UpgradeCTA from "@/components/upgrade/UpgradeCTA";
import UpgradeFAQ from "@/components/upgrade/UpgradeFAQ";

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-8">

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Billing & Subscription
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Upgrade your RYNOVIX plan to unlock more AI credits,
            premium creator tools, faster AI generation,
            and all future AI features.
          </p>
        </div>

        {/* Hero + Current Plan */}
        <UpgradeHero />

        {/* Pricing Cards */}
        <PricingCards currentPlan="Free" />

        {/* Feature Comparison */}
        <ComparisonTable />

        {/* Upgrade CTA */}
        <UpgradeCTA />

        {/* FAQ */}
        <UpgradeFAQ />

      </div>
    </DashboardLayout>
  );
}