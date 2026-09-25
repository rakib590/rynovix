"use client";

import {
  Star,
  Sparkles,
  Clock3,
  Layers3,
} from "lucide-react";
import { useEffect, useState } from "react";

type HistoryItem = {
  id: string;
  tool_id: string;
  tool_name: string;
  title: string;
  created_at: string;
  favorite: boolean;
};

type FavoriteStats = {
  totalFavorites: number;
  mostFavorited: string;
  mostFavoritedCount: number;
  latestFavorite: string;
  toolsRepresented: number;
};

export default function FavoritesStats() {
  const [stats, setStats] =
    useState<FavoriteStats>({
      totalFavorites: 0,
      mostFavorited: "—",
      mostFavoritedCount: 0,
      latestFavorite: "—",
      toolsRepresented: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadFavoriteStats();
  }, []);

  async function loadFavoriteStats() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/history",
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStats({
          totalFavorites: 0,
          mostFavorited: "—",
          mostFavoritedCount: 0,
          latestFavorite: "—",
          toolsRepresented: 0,
        });

        return;
      }

      const history: HistoryItem[] =
        data.history ?? [];

      const favoriteItems =
        history.filter(
          (item) =>
            item.favorite === true
        );

      /*
       * Total favorite generations
       */
      const totalFavorites =
        favoriteItems.length;

      /*
       * Count favorite generations
       * for each tool.
       */
      const favoriteToolCounts: Record<
        string,
        number
      > = {};

      const toolNames: Record<
        string,
        string
      > = {};

      favoriteItems.forEach(
        (item) => {
          favoriteToolCounts[item.tool_id] =
            (favoriteToolCounts[item.tool_id] ||
              0) + 1;

          if (!toolNames[item.tool_id]) {
            toolNames[item.tool_id] =
              item.tool_name;
          }
        }
      );

      /*
       * Count unique tools represented
       * in favorites.
       */
      const toolsRepresented =
        Object.keys(
          favoriteToolCounts
        ).length;

      /*
       * Find most favorited tool.
       */
      let mostFavoritedToolId = "";
      let mostFavoritedCount = 0;

      Object.entries(
        favoriteToolCounts
      ).forEach(
        ([toolId, count]) => {
          if (
            count >
            mostFavoritedCount
          ) {
            mostFavoritedToolId =
              toolId;
            mostFavoritedCount =
              count;
          }
        }
      );

      const mostFavorited =
        mostFavoritedToolId &&
        toolNames[mostFavoritedToolId]
          ? formatToolName(
              toolNames[
                mostFavoritedToolId
              ]
            )
          : "—";

      /*
       * Find latest favorite generation.
       */
      const latestFavorite =
        [...favoriteItems].sort(
          (a, b) =>
            new Date(
              b.created_at
            ).getTime() -
            new Date(
              a.created_at
            ).getTime()
        )[0];

      const latestFavoriteText =
        latestFavorite
          ? formatLastUsed(
              latestFavorite.created_at
            )
          : "—";

      setStats({
        totalFavorites,
        mostFavorited,
        mostFavoritedCount,
        latestFavorite:
          latestFavoriteText,
        toolsRepresented,
      });
    } catch (error) {
      console.error(
        "Failed to load favorite stats:",
        error
      );

      setStats({
        totalFavorites: 0,
        mostFavorited: "—",
        mostFavoritedCount: 0,
        latestFavorite: "—",
        toolsRepresented: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  function formatToolName(
    name: string
  ) {
    return name
      .replace(/-/g, " ")
      .replace(
        /\b\w/g,
        (char) =>
          char.toUpperCase()
      );
  }

  function formatLastUsed(
    date: string
  ) {
    const createdAt =
      new Date(date);

    const now = new Date();

    const diffMs =
      now.getTime() -
      createdAt.getTime();

    const diffMinutes =
      Math.floor(
        diffMs / (1000 * 60)
      );

    if (diffMinutes < 1) {
      return "Just Now";
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} ${
        diffMinutes === 1
          ? "Minute"
          : "Minutes"
      } Ago`;
    }

    const diffHours =
      Math.floor(
        diffMinutes / 60
      );

    if (diffHours < 24) {
      return `${diffHours} ${
        diffHours === 1
          ? "Hour"
          : "Hours"
      } Ago`;
    }

    const diffDays =
      Math.floor(
        diffHours / 24
      );

    if (diffDays === 1) {
      return "Yesterday";
    }

    if (diffDays < 7) {
      return `${diffDays} Days Ago`;
    }

    return createdAt.toLocaleDateString();
  }

  const cards = [
    {
      title: "Total Favorites",
      value: loading
        ? "..."
        : String(
            stats.totalFavorites
          ),
      subtitle:
        "Saved AI Generations",
      icon: Star,
      color: "yellow",
    },

    {
      title: "Most Favorited",
      value: loading
        ? "..."
        : stats.mostFavorited,
      subtitle: loading
        ? "Loading..."
        : stats.mostFavoritedCount >
          0
        ? `${stats.mostFavoritedCount} Favorite ${
            stats.mostFavoritedCount ===
            1
              ? "Generation"
              : "Generations"
          }`
        : "No Favorites Yet",
      icon: Sparkles,
      color: "blue",
    },

    {
      title: "Latest Favorite",
      value: loading
        ? "..."
        : stats.latestFavorite,
      subtitle:
        "Latest Saved Generation",
      icon: Clock3,
      color: "green",
    },

    {
      title: "Tools Represented",
      value: loading
        ? "..."
        : String(
            stats.toolsRepresented
          ),
      subtitle:
        "Different AI Tools",
      icon: Layers3,
      color: "purple",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => {
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
              <div className="min-w-0">
                <p className="text-sm text-gray-400">
                  {item.title}
                </p>

                <h3 className="mt-3 truncate text-2xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-2 text-xs text-gray-500">
                  {item.subtitle}
                </p>
              </div>

              <div
                className={`ml-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconColor}`}
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