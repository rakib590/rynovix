"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type HistoryItem = {
  favorite: boolean;
};

export default function FavoritesHeader() {
  const [favoriteCount, setFavoriteCount] =
    useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavoriteCount();
  }, []);

  async function loadFavoriteCount() {
    try {
      setLoading(true);

      const res = await fetch("/api/history", {
        cache: "no-store",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const count = (data.history ?? []).filter(
          (item: HistoryItem) =>
            item.favorite === true
        ).length;

        setFavoriteCount(count);
      } else {
        setFavoriteCount(0);
      }
    } catch (error) {
      console.error(
        "Failed to load favorite count:",
        error
      );

      setFavoriteCount(0);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10">
            <Star
              size={34}
              className="text-yellow-400"
              fill="currentColor"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Favorite Generations
            </h1>

            <p className="mt-2 text-gray-400">
              Quickly access your saved AI generations and results.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-5 py-3">
          <p className="text-sm text-yellow-300">
            ⭐{" "}
            {loading
              ? "Loading favorites..."
              : `${favoriteCount} Favorite ${
                  favoriteCount === 1
                    ? "Generation"
                    : "Generations"
                }`}
          </p>
        </div>

      </div>
    </section>
  );
}