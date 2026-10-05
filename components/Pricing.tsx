"use client";

import { Check, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import {
  plans,
  getPlanPrice,
  type BillingCycle,
} from "@/lib/billing/plans";

export default function Pricing() {
  const [billingCycle, setBillingCycle] =
    useState<BillingCycle>("monthly");

  return (
    <section
      id="pricing"
      className="w-full bg-[#060B1A] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-3 flex justify-center">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 to-fuchsia-500 bg-clip-text text-lg font-bold uppercase tracking-[0.2em] text-transparent">
            <Sparkles size={18} />
            Simple Pricing
          </span>
        </div>

        <p className="text-center text-lg text-slate-400">
          Start free. Upgrade anytime.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-sm">

            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                billingCycle === "yearly"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Yearly

              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-400">
                SAVE 20%
              </span>
            </button>

          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 items-center gap-6 lg:grid-cols-3">

          {plans.map((plan) => {
            const price = getPlanPrice(plan, billingCycle);

            return (
              <div
                key={plan.id}
                className={`group relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${
                  plan.popular
                    ? "border-blue-500/60 bg-[#0B1024]/80 shadow-[0_0_80px_-15px_rgba(79,70,229,0.6)] lg:scale-105"
                    : "border-[#252B45] bg-[#0A1024]/50 hover:border-blue-500/40 hover:shadow-[0_0_50px_-15px_rgba(99,102,241,0.4)]"
                }`}
              >

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold text-white">
                      <Zap size={13} />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-100">
                    {plan.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-400">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    ${price}
                  </span>

                  {plan.id !== "free" && (
                    <span className="text-base text-slate-400">
                      /month
                    </span>
                  )}
                </div>

                {/* Yearly Billing Note */}
                {plan.id !== "free" && billingCycle === "yearly" && (
                  <p className="mt-2 text-xs text-green-400">
                    Billed annually • Save 20%
                  </p>
                )}

                {plan.id !== "free" && billingCycle === "monthly" && (
                  <p className="mt-2 text-xs text-green-400">
                    Cancel anytime • Secure payment
                  </p>
                )}

                {/* Divider */}
                <div className="my-7 h-px bg-white/10" />

                {/* Features */}
                <ul className="flex flex-1 flex-col gap-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                        <Check
                          size={13}
                          className="text-green-400"
                        />
                      </span>

                      <span className="text-sm text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Link
                  href={
                    plan.id === "free"
                      ? "/signup"
                      : "/pricing"
                  }
                  className={`mt-10 flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-[#252B45] bg-transparent text-slate-200 hover:border-blue-500/50 hover:bg-[#0E1730]/60"
                  }`}
                >
                  {plan.id === "free"
                    ? "Get Started Free"
                    : `Upgrade to ${plan.name}`}
                </Link>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}