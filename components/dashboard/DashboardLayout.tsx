"use client";

import { ReactNode, useState } from "react";

import { ProfileProvider } from "@/components/providers/ProfileProvider";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <ProfileProvider>
      <div className="flex h-screen overflow-hidden bg-[#050814] text-white">
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Topbar
            onMenuClick={() => setMobileSidebarOpen(true)}
          />

          <main className="min-w-0 flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProfileProvider>
  );
}