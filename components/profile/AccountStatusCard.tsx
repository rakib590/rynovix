"use client";

import {
  CreditCard,
  Coins,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";

interface AccountStatusCardProps {
  currentPlan?: string;
  aiCredits?: number;
  memberSince?: string;
  verified?: boolean;
}

export default function AccountStatusCard({
  currentPlan = "Free",
  aiCredits = 100,
  memberSince = "2026",
  verified = true,
}: AccountStatusCardProps) {
  const statusItems = [
    {
      label: "Current Plan",
      value: currentPlan,
      description:
        currentPlan === "Free"
          ? "Upgrade anytime"
          : "Subscription Active",
      icon: CreditCard,
      color: "text-blue-400",
      border: "hover:border-blue-500/30",
    },
    {
      label: "AI Credits",
      value: aiCredits.toLocaleString(),
      description: "Available this month",
      icon: Coins,
      color: "text-purple-400",
      border: "hover:border-purple-500/30",
    },
    {
      label: "Member Since",
      value: memberSince,
      description: "RYNOVIX Creator",
      icon: CalendarDays,
      color: "text-cyan-400",
      border: "hover:border-cyan-500/30",
    },
    {
      label: "Verification",
      value: verified ? "Verified" : "Not Verified",
      description: verified
        ? "Identity confirmed"
        : "Verification required",
      icon: BadgeCheck,
      color: verified
        ? "text-green-400"
        : "text-gray-500",
      border: verified
        ? "hover:border-green-500/30"
        : "hover:border-white/20",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-xl font-bold text-white">
          Account Status
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          View your account details and subscription information.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statusItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`rounded-2xl border border-white/10 bg-[#050814] p-5 transition ${item.border}`}
            >
              {/* Icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon
                    size={19}
                    className={item.color}
                  />
                </div>

                {item.label === "Verification" &&
                  verified && (
                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-semibold text-green-400">
                      ACTIVE
                    </span>
                  )}
              </div>

              {/* Label */}
              <p className="mt-5 text-xs font-medium uppercase tracking-wider text-gray-500">
                {item.label}
              </p>

              {/* Value */}
              <h3
                className={`mt-2 text-2xl font-bold ${
                  item.label === "Verification" &&
                  verified
                    ? "text-green-400"
                    : "text-white"
                }`}
              >
                {item.value}
              </h3>

              {/* Description */}
              <p className="mt-1 text-xs text-gray-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-green-500/10 bg-green-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Account Health
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Your account is secure and operating normally.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Active
        </span>
      </div>
    </section>
  );
}