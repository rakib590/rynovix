"use client";

import { useEffect, useMemo, useState } from "react";
import HistoryCard from "./HistoryCard";
import EmptyHistory from "./EmptyHistory";
import HistoryFilters from "./HistoryFilters";

type HistoryItem = {
  id: string;
  tool_id: string;
  tool_name: string;
  title: string;
  prompt: string;
  result: any;
  created_at: string;
  favorite: boolean;
};

export default function HistoryTable() {
  const [historyItems, setHistoryItems] =
    useState<HistoryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [tool, setTool] =
    useState("all");

  const [sort, setSort] =
    useState("newest");

  const [favorite, setFavorite] =
    useState("all");

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/history",
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setHistoryItems(
          data.history ?? []
        );
      } else {
        setHistoryItems([]);
      }
    } catch (error) {
      console.error(
        "Failed to load history:",
        error
      );

      setHistoryItems([]);
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(id: string) {
    setHistoryItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    /*
     * Notify HistoryStats that
     * history has changed.
     */
    window.dispatchEvent(
      new Event("history-updated")
    );
  }

  function handleFavoriteChange(
    id: string,
    favorite: boolean
  ) {
    setHistoryItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              favorite,
            }
          : item
      )
    );
  }

  const filteredHistory = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    let filtered =
      historyItems.filter((item) => {
        const matchesSearch =
          !query ||
          item.title
            ?.toLowerCase()
            .includes(query) ||
          item.prompt
            ?.toLowerCase()
            .includes(query) ||
          item.tool_name
            ?.toLowerCase()
            .includes(query);

        const matchesTool =
          tool === "all" ||
          item.tool_id === tool;

        const matchesFavorite =
          favorite === "all" ||
          (favorite ===
            "favorites" &&
            item.favorite === true);

        return (
          matchesSearch &&
          matchesTool &&
          matchesFavorite
        );
      });

    filtered = [...filtered].sort(
      (a, b) => {
        if (sort === "newest") {
          return (
            new Date(
              b.created_at
            ).getTime() -
            new Date(
              a.created_at
            ).getTime()
          );
        }

        if (sort === "oldest") {
          return (
            new Date(
              a.created_at
            ).getTime() -
            new Date(
              b.created_at
            ).getTime()
          );
        }

        if (sort === "az") {
          return (
            (a.title || "").localeCompare(
              b.title || ""
            )
          );
        }

        if (sort === "za") {
          return (
            (b.title || "").localeCompare(
              a.title || ""
            )
          );
        }

        return 0;
      }
    );

    return filtered;
  }, [
    historyItems,
    search,
    tool,
    sort,
    favorite,
  ]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#0B1220] py-20 text-center">
        <p className="text-lg text-gray-400">
          Loading history...
        </p>
      </div>
    );
  }

  if (historyItems.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <div className="space-y-6">
      <HistoryFilters
        search={search}
        onSearchChange={setSearch}
        tool={tool}
        onToolChange={setTool}
        sort={sort}
        onSortChange={setSort}
        favorite={favorite}
        onFavoriteChange={
          setFavorite
        }
      />

      {filteredHistory.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#0B1220] py-16 text-center">
          <h3 className="text-lg font-semibold text-white">
            No History Found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {favorite ===
            "favorites"
              ? "You haven't added any favorites yet."
              : "Try a different search or filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredHistory.map(
            (item) => (
              <HistoryCard
                key={item.id}
                id={item.id}
                title={
                  item.title?.trim() ||
                  item.tool_name ||
                  "Untitled"
                }
                description={
                  item.prompt
                    ? item.prompt
                        .length > 160
                      ? item.prompt.slice(
                          0,
                          160
                        ) + "..."
                      : item.prompt
                    : "No prompt available."
                }
                tool={
                  item.tool_name
                    ?.replace(
                      /-/g,
                      " "
                    )
                    .replace(
                      /\b\w/g,
                      (c) =>
                        c.toUpperCase()
                    ) ||
                  "AI Tool"
                }
                date={new Date(
                  item.created_at
                ).toLocaleString()}
                href={`/dashboard/history/${item.id}`}
                favorite={
                  item.favorite
                }
                onDelete={
                  handleDelete
                }
                onFavoriteChange={
                  handleFavoriteChange
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}