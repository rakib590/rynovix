"use client";

import Link from "next/link";
import {
  Clock3,
  Star,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

interface HistoryCardProps {
  id: string;
  title: string;
  description: string;
  tool: string;
  date: string;
  href: string;
  favorite?: boolean;
  onDelete?: (id: string) => void;
  onFavoriteChange?: (
    id: string,
    favorite: boolean
  ) => void;
}

export default function HistoryCard({
  id,
  title,
  description,
  tool,
  date,
  href,
  favorite = false,
  onDelete,
  onFavoriteChange,
}: HistoryCardProps) {
  const [isFavorite, setIsFavorite] =
    useState(favorite);

  const [favoriteLoading, setFavoriteLoading] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  async function handleFavorite() {
    if (
      favoriteLoading ||
      deleteLoading
    ) {
      return;
    }

    const nextFavorite = !isFavorite;

    // Instant UI update
    setIsFavorite(nextFavorite);

    // Update parent immediately
    onFavoriteChange?.(
      id,
      nextFavorite
    );

    setFavoriteLoading(true);

    try {
      const res = await fetch(
        "/api/history/favorite",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            favorite: nextFavorite,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Rollback UI
        setIsFavorite(!nextFavorite);

        // Rollback parent
        onFavoriteChange?.(
          id,
          !nextFavorite
        );

        alert(
          data.error ||
            "Failed to update favorite."
        );

        return;
      }

      // Sync with database
      setIsFavorite(
        data.favorite
      );

      onFavoriteChange?.(
        id,
        data.favorite
      );
    } catch (error) {
      console.error(
        "Failed to update favorite:",
        error
      );

      // Rollback UI
      setIsFavorite(!nextFavorite);

      // Rollback parent
      onFavoriteChange?.(
        id,
        !nextFavorite
      );

      alert(
        "Something went wrong."
      );
    } finally {
      setFavoriteLoading(false);
    }
  }

  async function handleDelete() {
    if (
      deleteLoading ||
      favoriteLoading
    ) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this history?"
      );

    if (!confirmed) {
      return;
    }

    setDeleteLoading(true);

    try {
      const res = await fetch(
        "/api/history/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(
          data.error ||
            "Failed to delete history."
        );

        return;
      }

      onDelete?.(id);
    } catch (error) {
      console.error(
        "Failed to delete history:",
        error
      );

      alert(
        "Something went wrong."
      );
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="group rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30">

      {/* Top */}
      <div className="flex items-start justify-between">

        <div className="min-w-0 flex-1 pr-4">

          {/* Tool */}
          <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
            {tool}
          </span>

          {/* Title */}
          <h3 className="mt-4 break-words text-xl font-bold text-white">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-2 break-words text-sm leading-6 text-gray-400">
            {description}
          </p>
        </div>

        {/* Favorite */}
        <button
          type="button"
          onClick={handleFavorite}
          disabled={
            favoriteLoading ||
            deleteLoading
          }
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          className={`shrink-0 rounded-xl p-2 transition-all duration-200 ${
            favoriteLoading
              ? "cursor-wait bg-yellow-400/10 text-yellow-400 opacity-60"
              : isFavorite
              ? "bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20"
              : "text-gray-500 hover:bg-white/5 hover:text-yellow-400"
          }`}
        >
          <Star
            size={20}
            fill={
              isFavorite
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>

      {/* Date */}
      <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
        <Clock3 size={16} />

        <span>
          {date}
        </span>
      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between gap-4">

        {/* Delete */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={
            deleteLoading ||
            favoriteLoading
          }
          className={`flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition ${
            deleteLoading
              ? "cursor-wait opacity-60"
              : "hover:bg-red-500/20"
          }`}
        >
          <Trash2
            size={16}
            className={
              deleteLoading
                ? "animate-pulse"
                : ""
            }
          />

          {deleteLoading
            ? "Deleting..."
            : "Delete"}
        </button>

        {/* Open */}
        <Link
          href={href}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Open

          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}