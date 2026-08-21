"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Bot,
  History,
  Star,
  User,
  Settings,
  LogOut,
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

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-64 h-screen bg-[#0b1220] border-r border-white/10 flex flex-col">

      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-white">
          RYNOVIX
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          AI Creator Platform
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

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
  );
}