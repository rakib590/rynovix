"use client";

import {
  Type,
  FileText,
  Hash,
  Tags,
  Search,
  KeyRound,
  PenSquare,
  Clock3,
  Image,
  Lightbulb,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import FavoriteCard from "./FavoriteCard";
import EmptyFavorites from "./EmptyFavorites";

type HistoryItem = {
  id: string;
  tool_id: string;
  tool_name: string;
  title: string;
  prompt: string;
  result: string;
  created_at: string;
  favorite: boolean;
};

interface FavoritesGridProps {
  search?: string;
  category?: string;
  sort?: string;
}

const toolMeta: Record<
  string,
  {
    icon: React.ReactNode;
    badge: string;
    color: string;
    href: string;
    description: string;
  }
> = {
  "title-generator": {
    icon: <Type size={26} />,
    badge: "YouTube",
    color: "blue",
    href: "/dashboard/tools/title-generator",
    description:
      "Generate engaging YouTube titles using AI.",
  },

  "description-generator": {
    icon: <FileText size={26} />,
    badge: "SEO",
    color: "green",
    href: "/dashboard/tools/description-generator",
    description:
      "Create SEO-friendly YouTube descriptions.",
  },

  "hashtag-generator": {
    icon: <Hash size={26} />,
    badge: "SEO",
    color: "purple",
    href: "/dashboard/tools/hashtag-generator",
    description:
      "Generate trending hashtags for your videos.",
  },

  "tags-generator": {
    icon: <Tags size={26} />,
    badge: "SEO",
    color: "blue",
    href: "/dashboard/tools/tags-generator",
    description:
      "Generate optimized YouTube video tags.",
  },

  "script-writer": {
    icon: <PenSquare size={26} />,
    badge: "Writing",
    color: "green",
    href: "/dashboard/tools/script-writer",
    description:
      "Write complete YouTube scripts with AI.",
  },

  "shorts-ideas": {
    icon: <Lightbulb size={26} />,
    badge: "YouTube",
    color: "purple",
    href: "/dashboard/tools/shorts-ideas",
    description:
      "Generate viral YouTube Shorts content ideas.",
  },

  "thumbnail-title": {
    icon: <Image size={26} />,
    badge: "YouTube",
    color: "blue",
    href: "/dashboard/tools/thumbnail-title",
    description:
      "Generate catchy thumbnail text instantly.",
  },

  "seo-checker": {
    icon: <Search size={26} />,
    badge: "SEO",
    color: "yellow",
    href: "/dashboard/tools/seo-checker",
    description:
      "Analyze and improve your YouTube SEO.",
  },

  "keyword-generator": {
    icon: <KeyRound size={26} />,
    badge: "SEO",
    color: "purple",
    href: "/dashboard/tools/keyword-generator",
    description:
      "Find high-ranking keywords for YouTube.",
  },

  "best-upload-time": {
    icon: <Clock3 size={26} />,
    badge: "SEO",
    color: "green",
    href: "/dashboard/tools/best-upload-time",
    description:
      "Find the best upload time to maximize views.",
  },
};

export default function FavoritesGrid({
  search = "",
  category = "all",
  sort = "recent",
}: FavoritesGridProps) {
  const [favorites, setFavorites] = useState<
    HistoryItem[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      setLoading(true);

      const res = await fetch("/api/history", {
        cache: "no-store",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const favoriteItems = (
          data.history ?? []
        ).filter(
          (item: HistoryItem) =>
            item.favorite === true
        );

        setFavorites(favoriteItems);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error(
        "Failed to load favorites:",
        error
      );

      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }

  function handleRemoveFavorite(id: string) {
    setFavorites((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  }

  function formatLastUsed(date: string) {
    const createdAt = new Date(date);
    const now = new Date();

    const diffMs =
      now.getTime() -
      createdAt.getTime();

    const diffMinutes = Math.floor(
      diffMs / (1000 * 60)
    );

    if (diffMinutes < 1) {
      return "Just now";
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} ${
        diffMinutes === 1
          ? "minute"
          : "minutes"
      } ago`;
    }

    const diffHours = Math.floor(
      diffMinutes / 60
    );

    if (diffHours < 24) {
      return `${diffHours} ${
        diffHours === 1
          ? "hour"
          : "hours"
      } ago`;
    }

    const diffDays = Math.floor(
      diffHours / 24
    );

    if (diffDays === 1) {
      return "Yesterday";
    }

    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }

    return createdAt.toLocaleDateString();
  }

  const filteredFavorites = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    let filtered = favorites.filter(
      (item) => {
        const meta =
          toolMeta[item.tool_id];

        if (!meta) {
          return false;
        }

        const title =
          item.title?.trim() || "";

        const toolName =
          item.tool_name?.trim() || "";

        const prompt =
          item.prompt?.trim() || "";

        const description =
          meta.description.toLowerCase();

        const matchesSearch =
          !query ||
          title
            .toLowerCase()
            .includes(query) ||
          toolName
            .toLowerCase()
            .includes(query) ||
          prompt
            .toLowerCase()
            .includes(query) ||
          description.includes(query);

        const matchesCategory =
          category === "all" ||
          meta.badge.toLowerCase() ===
            category.toLowerCase();

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

    filtered = [...filtered].sort(
      (a, b) => {
        if (sort === "recent") {
          return (
            new Date(
              b.created_at
            ).getTime() -
            new Date(
              a.created_at
            ).getTime()
          );
        }

        if (sort === "az") {
          const titleA =
            (
              a.title ||
              a.tool_name ||
              ""
            ).toLowerCase();

          const titleB =
            (
              b.title ||
              b.tool_name ||
              ""
            ).toLowerCase();

          return titleA.localeCompare(
            titleB
          );
        }

        if (sort === "most-used") {
          const countA =
            favorites.filter(
              (item) =>
                item.tool_id ===
                a.tool_id
            ).length;

          const countB =
            favorites.filter(
              (item) =>
                item.tool_id ===
                b.tool_id
            ).length;

          if (countB !== countA) {
            return countB - countA;
          }

          return (
            new Date(
              b.created_at
            ).getTime() -
            new Date(
              a.created_at
            ).getTime()
          );
        }

        return 0;
      }
    );

    return filtered;
  }, [
    favorites,
    search,
    category,
    sort,
  ]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#0B1220] py-16 text-center">
        <p className="text-sm text-gray-500">
          Loading favorites...
        </p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return <EmptyFavorites />;
  }

  if (filteredFavorites.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#0B1220] px-6 py-16 text-center">
        <h3 className="text-xl font-semibold text-white">
          No Favorites Found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try a different search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {filteredFavorites.map((item) => {
        const meta =
          toolMeta[item.tool_id];

        if (!meta) {
          return null;
        }

        return (
          <FavoriteCard
            key={item.id}
            id={item.id}
            title={
              item.title?.trim() ||
              item.tool_name ||
              "AI Tool"
            }
            description={
              item.prompt?.trim()
                ? item.prompt.length > 120
                  ? item.prompt.slice(
                      0,
                      120
                    ) + "..."
                  : item.prompt
                : meta.description
            }
            icon={meta.icon}
            badge={meta.badge}
            color={meta.color}
            lastUsed={formatLastUsed(
              item.created_at
            )}
            onRemoveFavorite={
              handleRemoveFavorite
            }
          />
        );
      })}
    </div>
  );
}