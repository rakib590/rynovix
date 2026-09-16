"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  Search,
  Bell,
  User,
  Settings,
  Sparkles,
  LogOut,
  ChevronDown,
  Check,
  X,
  Menu,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({
  onMenuClick,
}: TopbarProps) {
  const supabase = createClient();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const tools = [
    {
      name: "Title Generator",
      description:
        "Generate engaging YouTube titles with AI.",
      path: "/dashboard/tools/title-generator",
    },
    {
      name: "Description Generator",
      description:
        "Create SEO-friendly YouTube descriptions.",
      path: "/dashboard/tools/description-generator",
    },
    {
      name: "Hashtag Generator",
      description:
        "Find relevant hashtags for your content.",
      path: "/dashboard/tools/hashtag-generator",
    },
    {
      name: "Tags Generator",
      description:
        "Generate optimized YouTube tags.",
      path: "/dashboard/tools/tags-generator",
    },
    {
      name: "Script Writer",
      description:
        "Write engaging YouTube scripts with AI.",
      path: "/dashboard/tools/script-writer",
    },
    {
      name: "Shorts Ideas",
      description:
        "Get creative YouTube Shorts ideas.",
      path: "/dashboard/tools/shorts-ideas",
    },
    {
      name: "Thumbnail Title",
      description:
        "Generate powerful thumbnail titles.",
      path: "/dashboard/tools/thumbnail-title",
    },
    {
      name: "SEO Checker",
      description:
        "Check and improve your YouTube SEO.",
      path: "/dashboard/tools/seo-checker",
    },
    {
      name: "Keyword Generator",
      description:
        "Discover useful keywords for your videos.",
      path: "/dashboard/tools/keyword-generator",
    },
    {
      name: "Best Upload Time",
      description:
        "Find the best time to publish your videos.",
      path: "/dashboard/tools/best-upload-time",
    },
  ];

  const filteredTools = tools.filter((tool) =>
    tool.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const notifications = [
    {
      id: 1,
      title: "Welcome to RYNOVIX",
      message: "Your creator account is ready.",
      time: "Just now",
    },
    {
      id: 2,
      title: "New AI tools coming soon",
      message:
        "Check the RYNOVIX roadmap for upcoming tools.",
      time: "Recently",
    },
  ];

  const menuRef = useRef<HTMLDivElement>(null);
  const notificationRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(data);
    }

    loadProfile();
  }, [supabase]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex min-h-20 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#050814]/80 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B1220] p-2.5 text-gray-300 transition hover:border-blue-500 hover:text-white md:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-white sm:text-2xl">
            Welcome back,{" "}
            {profile?.full_name || "Creator"} 👋
          </h1>

          <p className="mt-1 hidden text-sm text-gray-400 sm:block">
            Manage your AI Creator Platform
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-5">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search AI tools..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="w-72 rounded-xl border border-white/10 bg-[#0B1220] py-3 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-blue-500"
          />

          {searchQuery.trim() !== "" && (
            <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] shadow-2xl shadow-black/40">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <button
                    key={tool.name}
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      router.push(tool.path);
                    }}
                    className="flex w-full flex-col items-start border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5 last:border-b-0"
                  >
                    <span className="text-sm font-semibold text-white">
                      {tool.name}
                    </span>

                    <span className="mt-1 text-xs text-gray-400">
                      {tool.description}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-4 text-sm text-gray-400">
                  No tools found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notification */}
        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setNotificationOpen((prev) => !prev);
              setMenuOpen(false);
            }}
            className="relative rounded-xl border border-white/10 bg-[#0B1220] p-2.5 text-gray-300 transition hover:border-blue-500 hover:text-white sm:p-3"
          >
            <Bell size={20} />

            {notifications.length > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
            )}
          </button>

          {/* Notification Dropdown */}
          {notificationOpen && (
            <div className="absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] max-w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {notifications.length} new
                    notifications
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setNotificationOpen(false)
                  }
                  className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {notifications.map(
                  (notification) => (
                    <div
                      key={notification.id}
                      className="rounded-xl p-3 transition hover:bg-white/5"
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                          <Bell size={15} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white">
                            {notification.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-gray-400">
                            {notification.message}
                          </p>

                          <p className="mt-1 text-[11px] text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="border-t border-white/10 p-2">
                <button
                  type="button"
                  onClick={() =>
                    setNotificationOpen(false)
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Check size={14} />
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B1220] p-1.5 transition hover:border-blue-500 sm:gap-3 sm:px-4 sm:py-2"
          >
            {/* Avatar */}
            <div className="h-9 w-9 overflow-hidden rounded-full border border-white/20 sm:h-10 sm:w-10">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                  {profile?.full_name
                    ?.charAt(0)
                    ?.toUpperCase() || "R"}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-white">
                {profile?.full_name || "Rakib"}
              </p>

              <p className="text-xs text-gray-400">
                @{profile?.username || "creator"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`hidden text-gray-400 transition-transform md:block ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-3 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] shadow-2xl shadow-black/40">
              {/* Profile Header */}
              <div className="border-b border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-white/20">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                        {profile?.full_name
                          ?.charAt(0)
                          ?.toUpperCase() || "R"}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {profile?.full_name || "Rakib"}
                    </p>

                    <p className="truncate text-xs text-gray-400">
                      @{profile?.username || "creator"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(
                      "/dashboard/profile"
                    );
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  <User size={18} />
                  <span>My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(
                      "/dashboard/settings"
                    );
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(
                      "/dashboard/billing"
                    );
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  <Sparkles size={18} />
                  <span>Upgrade to Pro</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-white/10 p-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                >
                  <LogOut size={18} />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}