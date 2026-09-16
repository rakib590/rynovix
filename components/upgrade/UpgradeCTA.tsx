"use client";

import {
  ArrowRight,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export default function UpgradeCTA() {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    if (loading) return;

    setLoading(true);

    // Payment gateway integration will be added later.
    // Example:
    // Stripe Checkout
    // bKash
    // SSLCommerz

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    setLoading(false);
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#0B1220] to-purple-600/10 p-6 shadow-2xl sm:p-8 lg:p-10">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative">
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
          <Sparkles
            size={26}
            className="text-blue-400"
          />
        </div>

        {/* Heading */}
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to unlock more AI power?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Upgrade your RYNOVIX plan and get more AI credits,
            faster generation, and premium creator features.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleUpgrade}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Preparing Checkout...
              </>
            ) : (
              <>
                Upgrade Your Plan
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>

        {/* Trust Features */}
        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#050814]/60 px-4 py-3">
            <Lock
              size={16}
              className="text-green-400"
            />

            <span className="text-xs font-medium text-gray-400">
              Secure Checkout
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#050814]/60 px-4 py-3">
            <ShieldCheck
              size={16}
              className="text-blue-400"
            />

            <span className="text-xs font-medium text-gray-400">
              Protected Payment
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#050814]/60 px-4 py-3">
            <CreditCard
              size={16}
              className="text-purple-400"
            />

            <span className="text-xs font-medium text-gray-400">
              Flexible Payment
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mx-auto mt-8 max-w-3xl border-t border-white/5 pt-6">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-gray-600">
            Supported payment methods
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400">
              VISA
            </span>

            <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400">
              Mastercard
            </span>

            <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400">
              bKash
            </span>

            <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400">
              SSLCommerz
            </span>
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-gray-600">
            Payment methods and availability may vary depending
            on your location and the payment providers connected
            to RYNOVIX.
          </p>
        </div>

        {/* Bottom Trust Message */}
        <div className="mt-7 flex items-center justify-center gap-2 text-center">
          <ShieldCheck
            size={15}
            className="text-green-500"
          />

          <span className="text-xs text-gray-500">
            Your payment details are handled securely by our
            payment provider.
          </span>
        </div>
      </div>
    </section>
  );
}