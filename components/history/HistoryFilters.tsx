"use client";

import { Search, Star } from "lucide-react";

interface HistoryFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  tool: string;
  onToolChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;

  favorite: string;
  onFavoriteChange: (value: string) => void;
}

export default function HistoryFilters({
  search,
  onSearchChange,
  tool,
  onToolChange,
  sort,
  onSortChange,
  favorite,
  onFavoriteChange,
}: HistoryFiltersProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-4 shadow-xl sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full flex-1">
          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search history..."
            className="h-12 w-full rounded-2xl border border-white/10 bg-[#050814] pl-12 pr-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Filters */}
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          {/* Tool */}
          <select
            value={tool}
            onChange={(e) =>
              onToolChange(e.target.value)
            }
            className="h-12 w-full cursor-pointer rounded-2xl border border-white/10 bg-[#050814] px-4 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:w-52"
          >
            <option value="all">
              All Tools
            </option>

            <option value="title-generator">
              Title Generator
            </option>

            <option value="description-generator">
              Description Generator
            </option>

            <option value="hashtag-generator">
              Hashtag Generator
            </option>

            <option value="tags-generator">
              Tags Generator
            </option>

            <option value="script-writer">
              Script Writer
            </option>

            <option value="shorts-ideas">
              Shorts Ideas
            </option>

            <option value="thumbnail-title">
              Thumbnail Title
            </option>

            <option value="seo-checker">
              SEO Checker
            </option>

            <option value="keyword-generator">
              Keyword Generator
            </option>

            <option value="best-upload-time">
              Best Upload Time
            </option>
          </select>

          {/* Favorite */}
          <div className="relative w-full sm:w-40">
            <Star
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-yellow-400"
            />

            <select
              value={favorite}
              onChange={(e) =>
                onFavoriteChange(e.target.value)
              }
              className="h-12 w-full cursor-pointer appearance-none rounded-2xl border border-white/10 bg-[#050814] pl-11 pr-9 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="all">
                All History
              </option>

              <option value="favorites">
                Favorites
              </option>
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

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) =>
              onSortChange(e.target.value)
            }
            className="h-12 w-full cursor-pointer rounded-2xl border border-white/10 bg-[#050814] px-4 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:w-40"
          >
            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>

            <option value="az">
              A → Z
            </option>

            <option value="za">
              Z → A
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}