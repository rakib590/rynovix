"use client";

import {
  History,
  Star,
  CalendarDays,
  Bot,
} from "lucide-react";

const stats = [
  {
    title: "Total History",
    value: "0",
    icon: History,
    color: "blue",
  },
  {
    title: "Favorites",
    value: "0",
    icon: Star,
    color: "yellow",
  },
  {
    title: "Today",
    value: "0",
    icon: CalendarDays,
    color: "green",
  },
  {
    title: "AI Tools Used",
    value: "0",
    icon: Bot,
    color: "purple",
  },
];

export default function HistoryStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        const iconColor =
          item.color === "blue"
            ? "text-blue-400 bg-blue-500/10"
            : item.color === "green"
            ? "text-green-400 bg-green-500/10"
            : item.color === "yellow"
            ? "text-yellow-400 bg-yellow-500/10"
            : "text-purple-400 bg-purple-500/10";

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h3>
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
    </div>
  );
}