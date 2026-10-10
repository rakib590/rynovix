"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  Loader2,
  Circle,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

interface TopbarProps {
  onMenuClick?: () => void;
}

type Notification = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  read: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
};

type Profile = {
  full_name?: string | null;
  username?: string | null;
  avatar_url?: string | null;
};

export default function Topbar({
  onMenuClick,
}: TopbarProps) {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [notificationsLoading, setNotificationsLoading] =
    useState(true);

  const [markingAllRead, setMarkingAllRead] =
    useState(false);

  const [markingId, setMarkingId] =
    useState<string | null>(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const menuRef =
    useRef<HTMLDivElement>(null);

  const notificationRef =
    useRef<HTMLDivElement>(null);

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

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted || !user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (mounted) {
        setProfile(data);
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  useEffect(() => {
    let mounted = true;

    async function loadNotifications() {
      setNotificationsLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (!user) {
        setNotifications([]);
        setNotificationsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("notifications")
        .select(
          "id, user_id, type, title, message, link, read, metadata, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(30);

      if (!mounted) return;

      if (error) {
        console.error(
          "Notification loading error:",
          error
        );

        setNotifications([]);
      } else {
        setNotifications(
          (data || []) as Notification[]
        );
      }

      setNotificationsLoading(false);
    }

    loadNotifications();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  useEffect(() => {
    let channel:
      | ReturnType<typeof supabase.channel>
      | null = null;

    let mounted = true;

    async function setupRealtime() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted || !user) return;

      channel = supabase
        .channel(`notifications-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newNotification =
              payload.new as Notification;

            setNotifications((current) => {
              const exists = current.some(
                (notification) =>
                  notification.id ===
                  newNotification.id
              );

              if (exists) {
                return current;
              }

              return [
                newNotification,
                ...current,
              ].slice(0, 30);
            });
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const updatedNotification =
              payload.new as Notification;

            setNotifications((current) =>
              current.map((notification) =>
                notification.id ===
                updatedNotification.id
                  ? updatedNotification
                  : notification
              )
            );
          }
        )
        .subscribe((status) => {
          if (status === "CHANNEL_ERROR") {
            console.error(
              "Notification realtime channel error."
            );
          }
        });
    }

    setupRealtime();

    return () => {
      mounted = false;

      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [supabase]);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
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

  async function markAsRead(
    notification: Notification
  ) {
    if (notification.read || markingId) {
      return;
    }

    setMarkingId(notification.id);

    const { error } = await supabase
      .from("notifications")
      .update({
        read: true,
      })
      .eq("id", notification.id)
      .eq("user_id", notification.user_id);

    if (error) {
      console.error(
        "Mark notification as read error:",
        error
      );

      setMarkingId(null);
      return;
    }

    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );

    setMarkingId(null);

    if (notification.link) {
      setNotificationOpen(false);
      router.push(notification.link);
    }
  }

  async function markAllAsRead() {
    if (markingAllRead || unreadCount === 0) {
      return;
    }

    setMarkingAllRead(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMarkingAllRead(false);
      return;
    }

    const { error } = await supabase
      .from("notifications")
      .update({
        read: true,
      })
      .eq("user_id", user.id)
      .eq("read", false);

    if (error) {
      console.error(
        "Mark all notifications as read error:",
        error
      );

      setMarkingAllRead(false);
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

    setMarkingAllRead(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  function formatNotificationTime(
    dateString: string
  ) {
    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor(
      (now.getTime() - date.getTime()) / 1000
    );

    if (seconds < 60) {
      return "Just now";
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
      return `${days}d ago`;
    }

    return date.toLocaleDateString();
  }

  function getNotificationIcon(
    type: string
  ) {
    if (
      type === "ai_generation" ||
      type === "ai_generation_complete"
    ) {
      return (
        <Sparkles
          size={15}
          className="text-blue-400"
        />
      );
    }

    if (type === "billing") {
      return (
        <Sparkles
          size={15}
          className="text-green-400"
        />
      );
    }

    if (type === "new_feature") {
      return (
        <Bell
          size={15}
          className="text-purple-400"
        />
      );
    }

    if (type === "email_update") {
      return (
        <Bell
          size={15}
          className="text-cyan-400"
        />
      );
    }

    return (
      <Bell
        size={15}
        className="text-blue-400"
      />
    );
  }

  return (
    <header className="sticky top-0 z-30 flex min-h-20 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#050814]/80 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Menu */}
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

        {/* Notifications */}
        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setNotificationOpen(
                (previous) => !previous
              );
              setMenuOpen(false);
            }}
            className="relative rounded-xl border border-white/10 bg-[#0B1220] p-2.5 text-gray-300 transition hover:border-blue-500 hover:text-white sm:p-3"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <>
                <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#050814] bg-blue-500 px-1 text-[9px] font-bold text-white">
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-400" />
              </>
            )}
          </button>

          {/* Notification Dropdown */}
          {notificationOpen && (
            <div className="absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] max-w-96 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220] shadow-2xl shadow-black/40">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {unreadCount > 0
                      ? `${unreadCount} unread`
                      : "All caught up"}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close notifications"
                  onClick={() =>
                    setNotificationOpen(false)
                  }
                  className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="max-h-[22rem] overflow-y-auto p-2">
                {notificationsLoading ? (
                  <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-gray-400">
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Loading notifications...
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-4 py-10 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                      <Bell
                        size={20}
                        className="text-gray-500"
                      />
                    </div>

                    <p className="mt-3 text-sm font-medium text-gray-300">
                      No notifications
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      You're all caught up.
                    </p>
                  </div>
                ) : (
                  notifications.map(
                    (notification) => (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          markAsRead(
                            notification
                          )
                        }
                        disabled={
                          markingId ===
                          notification.id
                        }
                        className={`group flex w-full gap-3 rounded-xl p-3 text-left transition hover:bg-white/5 ${
                          notification.read
                            ? "opacity-70"
                            : "bg-blue-500/[0.04]"
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                            notification.read
                              ? "bg-white/5"
                              : "bg-blue-500/10"
                          }`}
                        >
                          {markingId ===
                          notification.id ? (
                            <Loader2
                              size={15}
                              className="animate-spin text-gray-400"
                            />
                          ) : (
                            getNotificationIcon(
                              notification.type
                            )
                          )}
                        </div>

                        {/* Text */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-white">
                              {notification.title}
                            </p>

                            {!notification.read && (
                              <Circle
                                size={7}
                                fill="currentColor"
                                className="mt-1.5 shrink-0 text-blue-400"
                              />
                            )}
                          </div>

                          <p className="mt-1 text-xs leading-5 text-gray-400">
                            {notification.message}
                          </p>

                          <p className="mt-1 text-[11px] text-gray-500">
                            {formatNotificationTime(
                              notification.created_at
                            )}
                          </p>
                        </div>
                      </button>
                    )
                  )
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="border-t border-white/10 p-2">
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    disabled={
                      markingAllRead ||
                      unreadCount === 0
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {markingAllRead ? (
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                    ) : (
                      <Check size={14} />
                    )}

                    {unreadCount === 0
                      ? "All notifications read"
                      : "Mark all as read"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div
          ref={menuRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (previous) => !previous
              )
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
                {profile?.full_name ||
                  "Creator"}
              </p>

              <p className="text-xs text-gray-400">
                @{profile?.username ||
                  "creator"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`hidden text-gray-400 transition-transform md:block ${
                menuOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {/* User Dropdown */}
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
                          ?.toUpperCase() ||
                          "R"}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {profile?.full_name ||
                        "Creator"}
                    </p>

                    <p className="truncate text-xs text-gray-400">
                      @{profile?.username ||
                        "creator"}
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