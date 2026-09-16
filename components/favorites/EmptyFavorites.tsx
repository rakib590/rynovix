"use client";

import Link from "next/link";
import { Star, Bot } from "lucide-react";

export default function EmptyFavorites() {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-[#0B1220] px-8 py-20 text-center">

      {/* Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10">
        <Star
          size={40}
          className="text-yellow-400"
        />
      </div>

      {/* Title */}
      <h2 className="mt-6 text-2xl font-bold text-white">
        No Favorite Tools Yet
      </h2>

      {/* Description */}
      <p className="mx-auto mt-3 max-w-lg text-gray-400">
        You haven't added any AI tools to your favorites yet.
        Start exploring the AI Toolbox and save your most-used
        tools for quick access.
      </p>

      {/* Button */}
      <Link
        href="/dashboard/tools"
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <Bot size={20} />
        Explore AI Toolbox
      </Link>

    </div>
  );
}