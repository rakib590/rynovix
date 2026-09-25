import DashboardLayout from "@/components/dashboard/DashboardLayout";

import HistoryHeader from "@/components/history/HistoryHeader";
import HistoryStats from "@/components/history/HistoryStats";
import HistoryTable from "@/components/history/HistoryTable";

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <HistoryHeader />

        {/* Stats */}
        <HistoryStats />

        {/* History List + Search + Filters */}
        <HistoryTable />

      </div>
    </DashboardLayout>
  );
}