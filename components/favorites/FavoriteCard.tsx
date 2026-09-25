"use client";

import Link from "next/link";
import {
  Star,
  Clock3,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

interface FavoriteCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;

  badge?: string;
  color?: string;
  lastUsed?: string;

  onRemoveFavorite?: (id: string) => void;
}

export default function FavoriteCard({
  id,
  title,
  description,
  icon,
  badge = "Favorite",
  color = "blue",
  lastUsed = "Today",
  onRemoveFavorite,
}: FavoriteCardProps) {
  const [removing, setRemoving] =
    useState(false);

  const badgeColor =
    color === "blue"
      ? "bg-blue-500/10 text-blue-400"
      : color === "green"
      ? "bg-green-500/10 text-green-400"
      : color === "purple"
      ? "bg-purple-500/10 text-purple-400"
      : color === "yellow"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-cyan-500/10 text-cyan-400";

  async function handleRemoveFavorite(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();

    if (removing) return;

    setRemoving(true);

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
            favorite: false,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(
          data.error ||
            "Failed to remove favorite."
        );

        return;
      }

      onRemoveFavorite?.(id);
    } catch (error) {
      console.error(
        "Failed to remove favorite:",
        error
      );

      alert("Something went wrong.");
    } finally {
      setRemoving(false);
    }
  }

  const savedResultHref =
    `/dashboard/history/${id}`;

  return (
    <div className="group relative rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10">

      {/* Remove Favorite */}
      <button
        type="button"
        onClick={handleRemoveFavorite}
        disabled={removing}
        aria-label="Remove from favorites"
        className={`absolute right-5 top-5 z-10 rounded-xl p-2 text-yellow-400 transition ${
          removing
            ? "cursor-wait bg-yellow-500/10 opacity-60"
            : "bg-yellow-500/10 hover:bg-red-500/10 hover:text-red-400"
        }`}
      >
        <Trash2
          size={16}
          className={
            removing
              ? "animate-pulse"
              : ""
          }
        />
      </button>

      {/* Saved Generation */}
      <Link
        href={savedResultHref}
        className="block"
      >
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050814] text-blue-400 transition group-hover:bg-blue-500/10">
          {icon}
        </div>

        {/* Category + Favorite */}
        <div className="mt-5 flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
          >
            {badge}
          </span>

          <div className="flex items-center gap-1 text-yellow-400">
            <Star
              size={14}
              fill="currentColor"
            />

            <span className="text-xs font-medium">
              Favorite
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-xl font-bold text-white transition group-hover:text-blue-400">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-gray-400">
          {description}
        </p>

        {/* Saved Time */}
        <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
          <Clock3 size={16} />

          <span>
            Saved: {lastUsed}
          </span>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-400">
            View Saved Result
          </span>

          <ArrowRight
            size={18}
            className="text-blue-400 transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </Link>
    </div>
  );
}