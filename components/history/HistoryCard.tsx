"use client";

import Link from "next/link";
import {
  Clock3,
  Star,
  Trash2,
  ArrowRight,
} from "lucide-react";

interface HistoryCardProps {
  title: string;
  description: string;
  tool: string;
  date: string;
  href: string;
  favorite?: boolean;
}

export default function HistoryCard({
  title,
  description,
  tool,
  date,
  href,
  favorite = false,
}: HistoryCardProps) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1">

      {/* Top */}
      <div className="flex items-start justify-between">

        <div>
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
            {tool}
          </span>

          <h3 className="mt-4 text-xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            {description}
          </p>
        </div>

        <button className="rounded-xl p-2 text-gray-500 transition hover:bg-white/5 hover:text-yellow-400">
          <Star
            size={20}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>

      </div>

      {/* Date */}
      <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
        <Clock3 size={16} />
        {date}
      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between">

        <button className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20">
          <Trash2 size={16} />
          Delete
        </button>

        <Link
          href={href}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Open
          <ArrowRight size={16} />
        </Link>

      </div>

    </div>
  );
}