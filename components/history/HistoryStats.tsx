"use client";

import { useEffect, useState } from "react";
import {
  History,
  Star,
  CalendarDays,
  Bot,
} from "lucide-react";

type DashboardStats = {
  totalGenerations: number;
  totalSEOChecks: number;
  averageSEOScore: number;
  creditsUsed: number;
  creditsRemaining: number;
  currentPlan: string;
};

export default function HistoryStats() {
  const [stats, setStats] =
    useState<DashboardStats>({
      totalGenerations: 0,
      totalSEOChecks: 0,
      averageSEOScore: 0,
      creditsUsed: 0,
      creditsRemaining: 0,
      currentPlan: "Free",
    });

  const [loading, setLoading] =
    useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/dashboard",
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setStats({
          totalGenerations:
            data.statistics
              ?.totalGenerations ?? 0,

          totalSEOChecks:
            data.statistics
              ?.totalSEOChecks ?? 0,

          averageSEOScore:
            data.statistics
              ?.averageSEOScore ?? 0,

          creditsUsed:
            data.statistics
              ?.creditsUsed ?? 0,

          creditsRemaining:
            data.statistics
              ?.creditsRemaining ?? 0,

          currentPlan:
            data.statistics
              ?.currentPlan ?? "Free",
        });
      }
    } catch (error) {
      console.error(
        "Dashboard Stats Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();

    /*
     * HistoryTable delete করার পর
     * এই event পাঠাবে।
     */
    function handleHistoryUpdated() {
      loadDashboard();
    }

    window.addEventListener(
      "history-updated",
      handleHistoryUpdated
    );

    return () => {
      window.removeEventListener(
        "history-updated",
        handleHistoryUpdated
      );
    };
  }, []);

  const cards = [
    {
      title: "Total History",
      value: stats.totalGenerations,
      icon: History,
      color: "blue",
    },
    {
      title: "SEO Checks",
      value: stats.totalSEOChecks,
      icon: Star,
      color: "yellow",
    },
    {
      title: "Credits Used",
      value: stats.creditsUsed,
      icon: CalendarDays,
      color: "green",
    },
    {
      title: "Credits Left",
      value: stats.creditsRemaining,
      icon: Bot,
      color: "purple",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => {
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
                  {loading
                    ? "..."
                    : item.value}
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