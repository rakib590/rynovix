
"use client";

import {
  ArrowRight,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function UpgradeCTA() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#0B1220] to-purple-600/10 p-6 shadow-2xl sm:p-8 lg:p-10">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative">
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
          <Sparkles size={26} className="text-blue-400" />
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
          <a
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.98]"
          >
            View Pricing Plans
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Trust Features */}
        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#050814]/60 px-4 py-3">
            <Lock size={16} className="text-green-400" />
            <span className="text-xs font-medium text-gray-400">
              Secure Checkout
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#050814]/60 px-4 py-3">
            <ShieldCheck size={16} className="text-blue-400" />
            <span className="text-xs font-medium text-gray-400">
              Secure Payment Processing
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#050814]/60 px-4 py-3">
            <CreditCard size={16} className="text-purple-400" />
            <span className="text-xs font-medium text-gray-400">
              Payment Options at Checkout
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mx-auto mt-8 max-w-3xl border-t border-white/5 pt-6">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
            Payment Information
          </p>

          <p className="mt-4 text-center text-sm leading-6 text-gray-400">
            Payments for eligible plans are processed through
            Lemon Squeezy's checkout. Available payment methods
            are displayed on the checkout page and may vary by
            location and subscription.
          </p>
        </div>

        {/* Bottom Trust Message */}
        <div className="mt-7 flex items-center justify-center gap-2 text-center">
          <ShieldCheck size={15} className="shrink-0 text-green-500" />

          <span className="text-xs text-gray-500">
            Payment details are handled by the checkout payment
            provider.
          </span>
        </div>
      </div>
    </section>
  );
}