"use client";

import {
  CreditCard,
  Crown,
  Receipt,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

export default function BillingSettings() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
          <CreditCard size={28} className="text-yellow-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Subscription & Billing
          </h2>

          <p className="mt-1 text-gray-400">
            Manage your subscription, payment methods and usage.
          </p>
        </div>
      </div>

      <div className="space-y-6">

        {/* Current Plan */}
        <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/5 p-6">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-yellow-500/10 p-4">
                <Crown size={28} className="text-yellow-400" />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Current Plan
                </p>

                <h3 className="mt-1 text-2xl font-bold text-white">
                  Free Plan
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Upgrade anytime for unlimited AI generation.
                </p>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400">
              Upgrade Plan
              <ArrowUpRight size={18} />
            </button>

          </div>

        </div>

        {/* Payment Method */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3">
              <CreditCard
                size={22}
                className="text-blue-400"
              />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Payment Method
              </h3>

              <p className="text-sm text-gray-400">
                No payment method added.
              </p>
            </div>
          </div>

          <button className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20">
            Add Card
          </button>

        </div>

        {/* Billing History */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-500/10 p-3">
              <Receipt
                size={22}
                className="text-green-400"
              />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Billing History
              </h3>

              <p className="text-sm text-gray-400">
                View all invoices and payment history.
              </p>
            </div>
          </div>

          <button className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition hover:bg-green-500/20">
            View
          </button>

        </div>

        {/* Usage Limits */}
        <div className="rounded-2xl border border-white/10 bg-[#050814] p-6">

          <div className="mb-5 flex items-center gap-3">
            <BarChart3
              size={24}
              className="text-purple-400"
            />

            <h3 className="text-lg font-semibold text-white">
              Usage Limits
            </h3>
          </div>

          <div className="space-y-6">

            {/* AI Credits */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-300">
                  AI Credits
                </span>

                <span className="text-white">
                  120 / 500
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#0B1220]">
                <div className="h-full w-[24%] rounded-full bg-blue-500"></div>
              </div>
            </div>

            {/* Storage */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-300">
                  Storage
                </span>

                <span className="text-white">
                  2.3 GB / 10 GB
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#0B1220]">
                <div className="h-full w-[23%] rounded-full bg-green-500"></div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}