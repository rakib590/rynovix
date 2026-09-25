"use client";

import { Search } from "lucide-react";

interface FavoritesFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;
}

export default function FavoritesFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: FavoritesFiltersProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <div className="relative w-full lg:max-w-xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search favorite generations..."
            className="w-full rounded-2xl border border-white/10 bg-[#050814] py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500 placeholder:text-gray-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Category */}
          <select
            value={category}
            onChange={(e) =>
              onCategoryChange(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option value="all">
              All Categories
            </option>

            <option value="youtube">
              YouTube
            </option>

            <option value="seo">
              SEO
            </option>

            <option value="writing">
              Writing
            </option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) =>
              onSortChange(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
          >
            <option value="recent">
              Recently Added
            </option>

            <option value="most-used">
              Most Favorited
            </option>

            <option value="az">
              A-Z
            </option>
          </select>

        </div>
      </div>
    </div>
  );
}