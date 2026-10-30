
"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  FolderKanban,
  Users,
  Crown,
  RefreshCw,
} from "lucide-react";

type DashboardStats = {
  totalGenerations: number;
  currentPlan: string;
};

const statsConfig = [
  {
    title: "AI Tools",
    icon: Sparkles,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    title: "Users",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    title: "Plan",
    icon: Crown,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
];

function formatPlan(plan: string) {
  const normalized = plan.trim().toLowerCase();

  if (!normalized) return "Free";

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export default function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadStats() {
      try {
        setError(false);

        const response = await fetch("/api/dashboard", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to load dashboard stats");
        }

        if (!active) return;

        setStats({
          totalGenerations: Number(
            data.statistics?.totalGenerations ?? 0
          ),
          currentPlan: String(
            data.statistics?.currentPlan || "free"
          ),
        });
      } catch (err) {
        console.error("StatsCards load error:", err);

        if (active) {
          setError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      active = false;
    };
  }, []);

  const values = [
    "32",
    stats ? stats.totalGenerations.toLocaleString() : "—",
    "—",
    stats ? formatPlan(stats.currentPlan) : "—",
  ];

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {statsConfig.map((item, index) => {
        const Icon = item.icon;

        const value = loading
          ? "..."
          : error && index !== 0
            ? "—"
            : values[index];

        return (
          <div
            key={item.title}
            className="group rounded-2xl border border-white/10 bg-[#0B1220] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm text-gray-400">
                  {item.title}
                </p>

                <h2
                  className={`mt-2 break-words text-3xl font-bold ${
                    index === 3 && stats && !loading && !error
                      ? "text-yellow-300"
                      : "text-white"
                  }`}
                >
                  {value}
                </h2>

                {index === 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    Available tools
                  </p>
                )}

                {index === 1 && (
                  <p className="mt-1 text-xs text-gray-500">
                    Total AI generations
                  </p>
                )}

                {index === 2 && (
                  <p className="mt-1 text-xs text-gray-500">
                    Registered accounts
                  </p>
                )}

                {index === 3 && (
                  <p className="mt-1 text-xs text-gray-500">
                    Current subscription
                  </p>
                )}
              </div>

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${item.bg}`}
              >
                {loading && index !== 0 ? (
                  <RefreshCw
                    size={24}
                    className={`${item.color} animate-spin`}
                  />
                ) : (
                  <Icon
                    className={item.color}
                    size={28}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
