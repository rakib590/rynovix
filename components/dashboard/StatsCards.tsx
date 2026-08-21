"use client";

import {
  Sparkles,
  FolderKanban,
  Users,
  Crown,
} from "lucide-react";

const stats = [
  {
    title: "AI Tools",
    value: "10+",
    icon: Sparkles,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Projects",
    value: "24",
    icon: FolderKanban,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    title: "Users",
    value: "15K+",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    title: "Plan",
    value: "Free",
    icon: Crown,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
];

export default function StatsCards() {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-[#0B1220] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon className={item.color} size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}