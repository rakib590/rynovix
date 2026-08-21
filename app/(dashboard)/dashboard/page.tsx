import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import ToolGrid from "@/components/dashboard/ToolGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";

import UserProfileCard from "@/components/dashboard/right-sidebar/UserProfileCard";
import PlanCard from "@/components/dashboard/right-sidebar/PlanCard";
import QuickActions from "@/components/dashboard/right-sidebar/QuickActions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardLayout>
      <div>

  {/* AI Toolbox */}
  <ToolGrid />

  {/* Stats */}
  <div className="mt-8">
    <StatsCards />
  </div>

  {/* Bottom Section */}
<div className="mt-8 grid gap-6 xl:grid-cols-3">

  {/* Left Side */}
  <div className="flex flex-col gap-6">
    <UserProfileCard />
    <PlanCard />
  </div>

  {/* Center */}
  <div>
    <RecentActivity />
  </div>

  {/* Right Side */}
  <div>
    <QuickActions />
  </div>

</div>

</div>
    </DashboardLayout>
  );
}