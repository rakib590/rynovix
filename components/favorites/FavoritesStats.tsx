"use client";

import {
  Star,
  Sparkles,
  Clock3,
  Crown,
} from "lucide-react";

const stats = [
  {
    title: "Total Favorites",
    value: "12",
    subtitle: "Saved AI Tools",
    icon: Star,
    color: "yellow",
  },
  {
    title: "Most Used",
    value: "Title Generator",
    subtitle: "Used 48 Times",
    icon: Sparkles,
    color: "blue",
  },
  {
    title: "Last Used",
    value: "Today",
    subtitle: "2 Hours Ago",
    icon: Clock3,
    color: "green",
  },
  {
    title: "Premium Saved",
    value: "2",
    subtitle: "Version 2.0",
    icon: Crown,
    color: "purple",
  },
];

export default function FavoritesStats() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        const iconColor =
          item.color === "yellow"
            ? "text-yellow-400 bg-yellow-500/10"
            : item.color === "green"
            ? "text-green-400 bg-green-500/10"
            : item.color === "purple"
            ? "text-purple-400 bg-purple-500/10"
            : "text-blue-400 bg-blue-500/10";

        return (
          <div
            key={item.title}
            className="group rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-400">
                  {item.title}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-2 text-xs text-gray-500">
                  {item.subtitle}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconColor}`}
              >
                <Icon size={28} />
              </div>

            </div>
          </div>
        );
      })}
    </section>
  );
}