"use client";

import {
  ArrowRight,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
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
          <Sparkles
            size={26}
            className="text-blue-400"
          />
        </div>



        {/* Heading */}
        <div className="mt-6 text-center">

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Unlock the full power of RYNOVIX AI
          </h2>


          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Upgrade your plan to get more AI credits,
            faster generation speed, premium AI tools,
            and future RYNOVIX features.
          </p>

        </div>




        {/* CTA Button */}
        <div className="mt-8 flex justify-center">

          <a
            href="/dashboard/billing"
            className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-7
            py-3.5
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-blue-500/20
            transition-all
            duration-200
            hover:bg-blue-500
            hover:shadow-blue-500/30
            active:scale-[0.98]
            "
          >
            Upgrade Your Plan

            <ArrowRight size={18} />

          </a>

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
              Protected Payments
            </span>

          </div>




          <div className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#050814]/60 px-4 py-3">

            <CreditCard
              size={16}
              className="text-purple-400"
            />

            <span className="text-xs font-medium text-gray-400">
              Flexible Plans
            </span>

          </div>


        </div>







        {/* Plan Highlights */}
        <div className="mx-auto mt-8 grid max-w-3xl gap-3 border-t border-white/5 pt-6 sm:grid-cols-3">


          <div className="rounded-xl bg-[#050814]/60 px-4 py-3 text-center">

            <Zap
              size={16}
              className="mx-auto mb-2 text-blue-400"
            />

            <p className="text-xs text-gray-400">
              Pro
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              5,000 Credits
            </p>

          </div>




          <div className="rounded-xl bg-[#050814]/60 px-4 py-3 text-center">

            <Sparkles
              size={16}
              className="mx-auto mb-2 text-purple-400"
            />

            <p className="text-xs text-gray-400">
              Business
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              15,000 Credits
            </p>

          </div>




          <div className="rounded-xl bg-[#050814]/60 px-4 py-3 text-center">

            <ShieldCheck
              size={16}
              className="mx-auto mb-2 text-green-400"
            />

            <p className="text-xs text-gray-400">
              Secure
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              Trusted Checkout
            </p>

          </div>


        </div>







        {/* Payment Information */}
        <div className="mt-8 border-t border-white/5 pt-6">


          <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
            Payment Information
          </p>



          <p className="mt-4 text-center text-sm leading-6 text-gray-400">
            Payments are securely processed through Lemon
            Squeezy checkout. Available payment methods may
            vary depending on your location.
          </p>


        </div>







        {/* Bottom Trust */}
        <div className="mt-7 flex items-center justify-center gap-2 text-center">

          <ShieldCheck
            size={15}
            className="shrink-0 text-green-500"
          />


          <span className="text-xs text-gray-500">
            Your payment information is handled securely by
            the payment provider.
          </span>


        </div>


      </div>


    </section>
  );
}