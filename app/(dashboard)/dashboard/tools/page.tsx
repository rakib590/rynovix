import DashboardLayout from "@/components/dashboard/DashboardLayout";

import ToolboxHeader from "@/components/tools/ToolboxHeader";
import ToolCategories from "@/components/tools/ToolCategories";
import ToolGrid from "@/components/tools/ToolGrid";

export default function AIToolboxPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <ToolboxHeader />
       {/* Search + Tool Grid */}
        <ToolGrid />
      </div>
    </DashboardLayout>
  );
}