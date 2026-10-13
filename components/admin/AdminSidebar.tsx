"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Bot,
  Brain,
  Coins,
  CreditCard,
  BarChart3,
  FileText,
  MessageSquare,
  Bell,
  Image,
  Search,
  Shield,
  Settings,
  Wrench,
  Plug,
  ScrollText,
  Rocket,
  Crown,
} from "lucide-react";


const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "AI Tools",
    icon: Bot,
    href: "/admin/ai-tools",
  },
  {
    title: "AI Models",
    icon: Brain,
    href: "/admin/ai-models",
  },
  {
    title: "Credits",
    icon: Coins,
    href: "/admin/credits",
  },
  {
    title: "Billing",
    icon: CreditCard,
    href: "/admin/billing",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    title: "Content",
    icon: FileText,
    href: "/admin/content",
  },
  {
    title: "Support",
    icon: MessageSquare,
    href: "/admin/support",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/admin/notifications",
  },
  {
    title: "Media Library",
    icon: Image,
    href: "/admin/media",
  },
  {
    title: "SEO",
    icon: Search,
    href: "/admin/seo",
  },
  {
    title: "Security",
    icon: Shield,
    href: "/admin/security",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
  {
    title: "Maintenance",
    icon: Wrench,
    href: "/admin/maintenance",
  },
  {
    title: "Integrations",
    icon: Plug,
    href: "/admin/integrations",
  },
  {
    title: "Logs",
    icon: ScrollText,
    href: "/admin/logs",
  },
  {
    title: "Future Features",
    icon: Rocket,
    href: "/admin/future",
  },
  {
    title: "Super Admin",
    icon: Crown,
    href: "/admin/super-admin",
  },
];


export default function AdminSidebar() {

  const pathname = usePathname();


  return (
    <aside className="
      w-72
      min-h-screen
      border-r
      border-white/10
      bg-black/40
      backdrop-blur-xl
      p-5
      hidden
      lg:block
    ">

      {/* Logo */}

      <div className="
        mb-8
        text-2xl
        font-bold
        text-white
      ">
        RYNOVIX
        <span className="text-purple-500">
          Admin
        </span>
      </div>


      {/* Menu */}

      <nav className="space-y-2">

        {menuItems.map((item)=>{

          const Icon = item.icon;

          const active =
            pathname === item.href;


          return (

            <Link
              key={item.title}
              href={item.href}
              className={`
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition
                ${
                  active
                  ?
                  "bg-purple-600 text-white"
                  :
                  "text-gray-400 hover:bg-white/10 hover:text-white"
                }
              `}
            >

              <Icon size={20}/>

              <span>
                {item.title}
              </span>

            </Link>

          );

        })}

      </nav>


    </aside>
  );
}