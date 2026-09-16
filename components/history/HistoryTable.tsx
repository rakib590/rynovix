"use client";

import HistoryCard from "./HistoryCard";

const historyItems = [
  {
    title: "10 Viral YouTube Title Ideas",
    description:
      "Generate 10 catchy titles for a Tech YouTube channel.",
    tool: "Title Generator",
    date: "2 minutes ago",
    href: "/dashboard/tools/title-generator",
    favorite: true,
  },
  {
    title: "SEO Optimized Description",
    description:
      "Created an optimized YouTube description with keywords.",
    tool: "Description Generator",
    date: "25 minutes ago",
    href: "/dashboard/tools/description-generator",
    favorite: false,
  },
  {
    title: "Best Upload Time Result",
    description:
      "Recommended upload time: 7:00 PM (GMT+6).",
    tool: "Best Upload Time",
    date: "Yesterday",
    href: "/dashboard/tools/best-upload-time",
    favorite: false,
  },
  {
    title: "YouTube Keyword Research",
    description:
      "Generated high-volume keywords for AI content.",
    tool: "Keyword Generator",
    date: "2 days ago",
    href: "/dashboard/tools/keyword-generator",
    favorite: true,
  },
];

export default function HistoryTable() {
  if (historyItems.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#0B1220] py-20 text-center">
        <h3 className="text-2xl font-bold text-white">
          No History Found
        </h3>

        <p className="mt-3 text-gray-400">
          Your generated AI content will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {historyItems.map((item, index) => (
        <HistoryCard
          key={index}
          title={item.title}
          description={item.description}
          tool={item.tool}
          date={item.date}
          href={item.href}
          favorite={item.favorite}
        />
      ))}
    </div>
  );
}