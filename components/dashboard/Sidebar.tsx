"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Bot,
  History,
  Star,
  User,
  Settings,
  LogOut,
  Rocket,
  Gauge,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "AI Toolbox",
    icon: Bot,
    href: "/dashboard/tools",
  },
  {
    title: "History",
    icon: History,
    href: "/dashboard/history",
  },
  {
    title: "Favorites",
    icon: Star,
    href: "/dashboard/favorites",
  },
  {
    title: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  mobileOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createClient();

  const [credits, setCredits] = useState(100);
  const [plan, setPlan] = useState("Free");

  useEffect(() => {
    async function loadProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data } = await supabase
          .from("profiles")
          .select("credits, current_plan")
          .eq("id", user.id)
          .single();

        if (data) {
          setCredits(data.credits ?? 100);
          setPlan(data.current_plan ?? "Free");
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadProfile();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  function handleNavigation() {
    onClose?.();
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col
          border-r border-white/10 bg-[#0B1220]
          transition-transform duration-300 ease-in-out
          md:static md:z-auto md:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex items-start justify-between px-6 py-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              RYNOVIX
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              AI Creator Platform
            </p>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href === "/dashboard/tools" &&
                pathname.startsWith("/dashboard/tools/"));

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={handleNavigation}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Credits & Plan */}
<div className="px-4 pb-3">
  <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-[#101C38] to-[#0B1220] p-3">
    
    {/* Header */}
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15">
        <Gauge size={16} className="text-blue-400" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">
          AI Credits
        </h3>

        <p className="text-[10px] text-slate-400">
          Monthly Usage
        </p>
      </div>
    </div>

    {/* Credits */}
    <div className="mt-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Credits
        </span>

        <span className="text-xs font-semibold text-white">
          {credits} / 100
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
          style={{
            width: `${Math.min(credits, 100)}%`,
          }}
        />
      </div>
    </div>

    {/* Reset + Plan */}
    <div className="mt-2 grid grid-cols-2 gap-2">
      
      {/* Reset */}
      <div className="rounded-lg bg-white/5 p-2">
        <p className="text-[10px] text-slate-400">
          Reset In
        </p>

        <p className="mt-0.5 text-xs font-semibold text-white">
          18 Days
        </p>
      </div>

      {/* Current Plan */}
      <div className="rounded-lg border border-white/10 bg-[#0B1220] p-2">
        <p className="text-[10px] text-slate-400">
          Current Plan
        </p>

        <div
          className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 ${
            plan.toLowerCase() === "pro"
              ? "bg-yellow-500/10"
              : plan.toLowerCase() === "business"
              ? "bg-purple-500/10"
              : "bg-green-500/10"
          }`}
        >
          <span
            className={`text-[10px] font-semibold ${
              plan.toLowerCase() === "pro"
                ? "text-yellow-400"
                : plan.toLowerCase() === "business"
                ? "text-purple-400"
                : "text-green-400"
            }`}
          >
            {plan.toUpperCase()}
          </span>
        </div>
      </div>

    </div>

    {/* Upgrade */}
    <Link
      href="/dashboard/billing"
      onClick={handleNavigation}
      className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
    >
      <Rocket size={13} />
      Upgrade Now
    </Link>

  </div>
</div>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={20} />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}