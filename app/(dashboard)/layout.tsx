import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import DashboardGuard from "@/components/dashboard/DashboardGuard";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

import OnlineTracker from "@/components/dashboard/OnlineTracker";


export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const supabase = await createClient();


  const {
    data:{
      user,
    },
  } = await supabase.auth.getUser();



  if(!user){

    redirect("/login");

  }



  return (

    <DashboardGuard>

      <OnlineTracker />

      <DashboardLayout>

        {children}

      </DashboardLayout>

    </DashboardGuard>

  );

}