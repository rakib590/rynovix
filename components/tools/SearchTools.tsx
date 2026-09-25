"use client";

import { Search, ArrowDownUp } from "lucide-react";

interface SearchToolsProps {
  search: string;
  onSearchChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;
}

export default function SearchTools({
  search,
  onSearchChange,
  sort,
  onSortChange,
}: SearchToolsProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-4 shadow-xl sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
        {/* Search */}
        <div className="relative w-full flex-1">
          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search AI tools..."
            className="h-12 w-full rounded-2xl border border-white/10 bg-[#050814] pl-12 pr-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Sort */}
        <div className="relative w-full lg:w-52">
          <ArrowDownUp
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-blue-400"
          />

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-12 w-full cursor-pointer appearance-none rounded-2xl border border-white/10 bg-[#050814] pl-11 pr-10 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          >
            <option value="popular">Most Popular</option>
            <option value="az">A → Z</option>
            <option value="newest">Newest</option>
          </select>

          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}