import DashboardLayout from "@/components/dashboard/DashboardLayout";

import FavoritesHeader from "@/components/favorites/FavoritesHeader";
import FavoritesStats from "@/components/favorites/FavoritesStats";
import FavoritesFilters from "@/components/favorites/FavoritesFilters";
import FavoritesGrid from "@/components/favorites/FavoritesGrid";

export default function FavoritesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <FavoritesHeader />

        <FavoritesStats />

        <FavoritesFilters />

        <FavoritesGrid />

      </div>
    </DashboardLayout>
  );
}