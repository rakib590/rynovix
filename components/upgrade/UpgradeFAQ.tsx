"use client";

import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel your subscription at any time. Your current plan will remain active until the end of your paid billing period, and you will not be charged for the next period.",
  },
  {
    question: "Can I switch between Monthly and Yearly billing?",
    answer:
      "Yes. You can change your billing cycle when upgrading or managing your subscription. Yearly billing is designed to give you better overall value compared with paying month to month.",
  },
  {
    question: "What happens to my AI credits when I upgrade?",
    answer:
      "When your upgrade is successfully completed, your account will receive the AI credits associated with the selected plan according to the active billing and credit policy.",
  },
  {
    question: "Do unused AI credits roll over to the next month?",
    answer:
      "AI credit rollover depends on the plan and the final RYNOVIX billing policy. The exact rollover rules will be shown before you complete your purchase.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes. Payment processing will be handled through a secure payment provider. RYNOVIX will not directly store your full card details. Secure checkout and payment-provider protections will be used when payments are enabled.",
  },
  {
    question: "Which payment methods will RYNOVIX support?",
    answer:
      "RYNOVIX is being designed to support international card payments as well as suitable local payment methods such as bKash and other supported gateways. Available methods will depend on your location and the payment providers connected at launch.",
  },
  {
    question: "Can I get a refund after purchasing a plan?",
    answer:
      "Refund eligibility will depend on the final RYNOVIX refund policy and the payment provider used for the transaction. The applicable refund terms will be clearly displayed before checkout.",
  },
  {
    question: "What happens if my payment fails?",
    answer:
      "If a payment fails, your subscription upgrade will not be completed. You can retry the payment using an available payment method. Your existing plan will remain unchanged until the upgrade succeeds.",
  },
  {
    question: "Can I upgrade from Free directly to Business?",
    answer:
      "Yes. You can choose the Business plan directly if you need higher AI credit limits, faster generation, and additional business-focused features.",
  },
  {
    question: "Will I be charged automatically every month or year?",
    answer:
      "Paid subscriptions are intended to renew automatically according to the billing cycle you select. You can cancel before the next renewal if you do not want the subscription to continue.",
  },
];

export default function UpgradeFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  function toggleFAQ(index: number) {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8 lg:p-10">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-400">
          <HelpCircle size={14} />
          Frequently Asked Questions
        </div>

        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Questions before upgrading?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
          Everything you need to know about RYNOVIX plans,
          billing, AI credits, payments, and subscriptions.
        </p>
      </div>

      {/* FAQ List */}
      <div className="mx-auto mt-10 max-w-4xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openItems.includes(index);

          return (
            <div
              key={faq.question}
              className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                isOpen
                  ? "border-blue-500/30 bg-blue-500/[0.03]"
                  : "border-white/10 bg-[#050814] hover:border-white/20"
              }`}
            >
              {/* Question */}
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span className="text-sm font-semibold leading-6 text-white sm:text-base">
                  {faq.question}
                </span>

                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                    isOpen
                      ? "rotate-180 border-blue-500/30 bg-blue-500/10 text-blue-400"
                      : "border-white/10 bg-white/5 text-gray-400"
                  }`}
                >
                  <ChevronDown size={17} />
                </span>
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-200 ${
                  isOpen
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-white/5 px-5 pb-5 pt-4 sm:px-6">
                    <p className="text-sm leading-7 text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Trust Box */}
      <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-4 rounded-2xl border border-green-500/10 bg-green-500/[0.03] p-5 sm:flex-row sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
          <ShieldCheck
            size={22}
            className="text-green-400"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            Secure & transparent billing
          </h3>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Pricing, billing cycle, payment method, and applicable
            refund terms will be shown clearly before checkout.
          </p>
        </div>
      </div>
    </section>
  );
}