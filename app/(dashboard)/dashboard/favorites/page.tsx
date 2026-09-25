"use client";

import { useState } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

import FavoritesHeader from "@/components/favorites/FavoritesHeader";
import FavoritesStats from "@/components/favorites/FavoritesStats";
import FavoritesFilters from "@/components/favorites/FavoritesFilters";
import FavoritesGrid from "@/components/favorites/FavoritesGrid";

export default function FavoritesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recent");

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <FavoritesHeader />

        {/* Stats */}
        <FavoritesStats />

        {/* Filters */}
        <FavoritesFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
        />

        {/* Favorites */}
        <FavoritesGrid
          search={search}
          category={category}
          sort={sort}
        />

      </div>
    </DashboardLayout>
  );
}