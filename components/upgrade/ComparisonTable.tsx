"use client";

import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";

interface FeatureRow {
  name: string;
  free: string | boolean;
  pro: string | boolean;
  business: string | boolean;
}

const features: FeatureRow[] = [
  {
    name: "AI Credits / Month",
    free: "100",
    pro: "5,000",
    business: "20,000",
  },
  {
    name: "YouTube Creator Tools",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "Title Generator",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "Description Generator",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "Hashtag Generator",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "Tags Generator",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "Script Writer",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "Shorts Ideas",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "Thumbnail Title",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "SEO Checker",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "Keyword Generator",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "Best Upload Time",
    free: true,
    pro: true,
    business: true,
  },
  {
    name: "AI Generation Speed",
    free: "Standard",
    pro: "Fast",
    business: "Priority",
  },
  {
    name: "Premium AI Features",
    free: false,
    pro: true,
    business: true,
  },
  {
    name: "Advanced SEO",
    free: false,
    pro: true,
    business: true,
  },
  {
    name: "Team Workspace",
    free: false,
    pro: false,
    business: true,
  },
  {
    name: "Priority Support",
    free: false,
    pro: true,
    business: true,
  },
  {
    name: "Business Support",
    free: false,
    pro: false,
    business: true,
  },
  {
    name: "Early Access to New Features",
    free: false,
    pro: true,
    business: true,
  },
];

function FeatureValue({
  value,
}: {
  value: string | boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-500/10">
        <Check
          size={16}
          className="text-green-400"
        />
      </span>
    ) : (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5">
        <X
          size={15}
          className="text-gray-600"
        />
      </span>
    );
  }

  return (
    <span className="text-sm font-medium text-gray-300">
      {value}
    </span>
  );
}

export default function ComparisonTable() {
  const [showAll, setShowAll] = useState(false);

  const visibleFeatures = showAll
    ? features
    : features.slice(0, 8);

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8 lg:p-10">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-400">
          Compare Plans
        </div>

        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Find the right plan for you
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
          Compare features and choose the plan that gives
          you the right amount of AI power.
        </p>
      </div>

      {/* Table */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-white/10 bg-[#050814]">
                <th className="w-[40%] px-5 py-5 text-left text-sm font-semibold text-gray-400">
                  Features
                </th>

                <th className="w-[20%] px-5 py-5 text-center text-sm font-bold text-white">
                  Free
                </th>

                <th className="relative w-[20%] px-5 py-5 text-center text-sm font-bold text-blue-400">
                  <div className="flex flex-col items-center gap-1">
                    <span>Pro</span>

                    <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-400">
                      Most Popular
                    </span>
                  </div>
                </th>

                <th className="w-[20%] px-5 py-5 text-center text-sm font-bold text-purple-400">
                  Business
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {visibleFeatures.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={`border-b border-white/5 transition hover:bg-white/[0.02] ${
                    index % 2 === 0
                      ? "bg-white/[0.01]"
                      : "bg-transparent"
                  }`}
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-300">
                    {feature.name}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <FeatureValue value={feature.free} />
                  </td>

                  <td className="px-5 py-4 text-center">
                    <FeatureValue value={feature.pro} />
                  </td>

                  <td className="px-5 py-4 text-center">
                    <FeatureValue
                      value={feature.business}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View More */}
      {features.length > 8 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp size={17} />
              </>
            ) : (
              <>
                View All Features
                <ChevronDown size={17} />
              </>
            )}
          </button>
        </div>
      )}

      {/* Bottom Note */}
      <div className="mt-8 rounded-2xl border border-white/5 bg-[#050814] px-5 py-4">
        <p className="text-center text-xs leading-5 text-gray-500">
          Feature availability may change as RYNOVIX
          continues to add new AI tools and capabilities.
        </p>
      </div>
    </section>
  );
}