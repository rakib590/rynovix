"use client";

import { History } from "lucide-react";
import Link from "next/link";

export default function EmptyHistory() {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-[#0B1220] py-20 px-8 text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
        <History
          size={40}
          className="text-blue-400"
        />
      </div>

      <h2 className="mt-8 text-3xl font-bold text-white">
        No History Yet
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-gray-400 leading-7">
        You haven't generated any AI content yet.
        Start using the AI Toolbox and every generation
        will automatically appear here.
      </p>

      <Link
        href="/dashboard/tools"
        className="mt-8 inline-flex items-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        Go to AI Toolbox
      </Link>

    </div>
  );
}