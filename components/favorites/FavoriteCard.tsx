"use client";

import Link from "next/link";
import { Star, Clock3, Trash2, ArrowRight } from "lucide-react";

interface FavoriteCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;

  badge?: string;
  color?: string;

  lastUsed?: string;
}

export default function FavoriteCard({
  title,
  description,
  icon,
  href,
  badge = "Favorite",
  color = "blue",
  lastUsed = "Today",
}: FavoriteCardProps) {
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

  return (
    <Link
      href={href}
      className="group relative block rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10"
    >
      {/* Favorite Icon */}
      <button
        onClick={(e) => e.preventDefault()}
        className="absolute right-5 top-5 rounded-xl bg-yellow-500/10 p-2 text-yellow-400 transition hover:bg-red-500/10 hover:text-red-400"
      >
        <Trash2 size={16} />
      </button>

      {/* Tool Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050814] text-blue-400 transition group-hover:bg-blue-500/10">
        {icon}
      </div>

      {/* Badge */}
      <div className="mt-5 flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {badge}
        </span>

        <div className="flex items-center gap-1 text-yellow-400">
          <Star size={14} fill="currentColor" />
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

      {/* Last Used */}
      <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
        <Clock3 size={16} />
        Last Used: {lastUsed}
      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-blue-400">
          Open Tool
        </span>

        <ArrowRight
          size={18}
          className="text-blue-400 transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}