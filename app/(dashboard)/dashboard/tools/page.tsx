import DashboardLayout from "@/components/dashboard/DashboardLayout";

import ToolboxHeader from "@/components/tools/ToolboxHeader";
import SearchTools from "@/components/tools/SearchTools";
import ToolCategories from "@/components/tools/ToolCategories";
import ToolGrid from "@/components/tools/ToolGrid";

export default function AIToolboxPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ToolboxHeader />

        <SearchTools />

        <ToolCategories />

        <ToolGrid />
      </div>
    </DashboardLayout>
  );
}