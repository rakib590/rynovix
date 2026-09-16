"use client";

import { useState } from "react";

import {
  Check,
  Crown,
  Loader2,
  Sparkles,
  Zap,
} from "lucide-react";

import {
  plans,
  getPlanPrice,
  getPlanPriceId,
  type BillingCycle,
} from "@/lib/billing/plans";

interface PricingCardsProps {
  currentPlan?: string;
}

export default function PricingCards({
  currentPlan = "Free",
}: PricingCardsProps) {
  const [billingCycle, setBillingCycle] =
    useState<BillingCycle>("monthly");

  const [loadingPlan, setLoadingPlan] =
    useState<string | null>(null);

  function handleUpgrade(planId: string) {
    const plan = plans.find(
      (item) => item.id === planId
    );

    if (!plan) return;

    if (
      plan.name.toLowerCase() ===
      currentPlan.toLowerCase()
    ) {
      return;
    }

    if (plan.id === "free") {
      return;
    }

    setLoadingPlan(plan.id);

    const priceId = getPlanPriceId(
      plan,
      billingCycle
    );

    console.log("Upgrade request:", {
      planId: plan.id,
      priceId,
      billingCycle,
    });

    /*
      Future Payment Gateway

      Stripe
      bKash
      SSLCommerz
      Paddle

      Checkout logic will be added here.
    */

    setTimeout(() => {
      setLoadingPlan(null);
    }, 1200);
  }

  return (
    <section
      id="pricing"
      className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8 lg:p-10"
    >
      {/* Header */}

      <div className="text-center">

        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-400">
          <Sparkles size={14} />

          Simple & Flexible Pricing
        </div>

        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Choose the plan that fits you
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
          Start free and upgrade whenever you need more AI
          power, credits and premium features.
        </p>

      </div>

      {/* Billing Toggle */}

      <div className="mt-8 flex justify-center">

        <div className="inline-flex rounded-2xl border border-white/10 bg-[#050814] p-1.5">

          <button
            type="button"
            onClick={() =>
              setBillingCycle("monthly")
            }
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              billingCycle === "monthly"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>

          <button
            type="button"
            onClick={() =>
              setBillingCycle("yearly")
            }
            className={`relative rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              billingCycle === "yearly"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly

            <span className="ml-2 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-400">
              SAVE 20%
            </span>

          </button>

        </div>

      </div>

      {/* Pricing Cards */}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">

        {plans.map((plan) => {

          const price = getPlanPrice(
            plan,
            billingCycle
          );

          const isCurrent =
            plan.name.toLowerCase() ===
            currentPlan.toLowerCase();

          const isLoading =
            loadingPlan === plan.id;

          return (

            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border p-6 transition-all duration-300 sm:p-7 ${
                plan.popular
                  ? "border-blue-500/50 bg-blue-500/[0.04] shadow-xl shadow-blue-500/10"
                  : "border-white/10 bg-[#050814]"
              }`}
            >

              {/* Most Popular */}

              {plan.popular && (

                <div className="absolute -top-3 left-1/2 -translate-x-1/2">

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1.5 text-[11px] font-bold text-white shadow-lg">

                    <Zap size={12} />

                    MOST POPULAR

                  </span>

                </div>

              )}

              {/* Top */}

              <div className="flex items-center justify-between">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    plan.id === "business"
                      ? "bg-purple-500/10 text-purple-400"
                      : plan.id === "pro"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-white/5 text-gray-400"
                  }`}
                >

                  {plan.id === "business" ? (

                    <Crown size={22} />

                  ) : plan.id === "pro" ? (

                    <Zap size={22} />

                  ) : (

                    <Sparkles size={22} />

                  )}

                </div>

                {isCurrent && (

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-[10px] font-bold uppercase text-green-400">

                    Current Plan

                  </span>

                )}

              </div>

              {/* Name */}

              <div className="mt-6">

                <h3 className="text-2xl font-bold text-white">
                  {plan.name}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                  {plan.description}
                </p>

              </div>

              {/* Price */}

              <div className="mt-6">

                <div className="flex items-end gap-1">

                  <span className="text-4xl font-bold text-white">
                    ${price}
                  </span>

                  {plan.id !== "free" && (

                    <span className="mb-1 text-sm text-gray-500">

                      {billingCycle === "monthly"
                        ? "/ month"
                        : "/ month (yearly)"}

                    </span>

                  )}

                </div>

                {billingCycle === "yearly" &&
                  plan.id !== "free" && (

                  <p className="mt-2 text-xs font-medium text-green-400">

                    Billed yearly • Save 20%

                  </p>

                )}

                {plan.id === "free" && (

                  <p className="mt-2 text-xs text-gray-500">

                    No credit card required

                  </p>

                )}

              </div>

              <div className="my-7 h-px bg-white/10" />
              {/* Features */}

              <div className="flex-1">

                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  What's included
                </p>

                <ul className="space-y-3">

                  {plan.features.map((feature) => (

                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >

                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10">

                        <Check
                          size={13}
                          className="text-green-400"
                        />

                      </span>

                      <span>{feature}</span>

                    </li>

                  ))}

                </ul>

              </div>

              {/* Upgrade Button */}

              <button
                type="button"
                onClick={() => handleUpgrade(plan.id)}
                disabled={
                  isCurrent ||
                  plan.id === "free" ||
                  isLoading
                }
                className={`mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  isCurrent
                    ? "cursor-not-allowed border border-green-500/20 bg-green-500/10 text-green-400"
                    : plan.id === "free"
                    ? "cursor-not-allowed border border-white/10 bg-white/5 text-gray-500"
                    : plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
                    : "border border-white/10 bg-white/5 text-white hover:border-blue-500/40 hover:bg-blue-500/10"
                }`}
              >

                {isLoading ? (
                  <>

                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Preparing Checkout...

                  </>
                ) : isCurrent ? (
                  <>

                    <Check size={17} />

                    Your Current Plan

                  </>
                ) : plan.id === "free" ? (
                  "Free Plan"
                ) : (
                  <>

                    Upgrade to {plan.name}

                    <Zap size={16} />

                  </>
                )}

              </button>

            </div>

          );

        })}

      </div>
      {/* Secure Checkout */}

      <div className="mt-10 border-t border-white/10 pt-8">

        <div className="flex flex-col items-center justify-center gap-2 text-center">

          <p className="text-xs font-medium text-gray-500">
            Secure checkout • Cancel anytime • No hidden fees
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">

            <div className="rounded-lg border border-white/10 bg-[#050814] px-3 py-2 text-xs text-gray-400">
              Visa
            </div>

            <div className="rounded-lg border border-white/10 bg-[#050814] px-3 py-2 text-xs text-gray-400">
              Mastercard
            </div>

            <div className="rounded-lg border border-white/10 bg-[#050814] px-3 py-2 text-xs text-gray-400">
              bKash
            </div>

            <div className="rounded-lg border border-white/10 bg-[#050814] px-3 py-2 text-xs text-gray-400">
              SSLCommerz
            </div>

          </div>

          <p className="mt-3 text-[11px] text-gray-600">
            Payment gateway integration will be connected
            before production launch.
          </p>

        </div>

      </div>

    </section>

  );

}