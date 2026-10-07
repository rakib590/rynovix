"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Clock3,
  Globe2,
  Loader2,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createClient } from "@/lib/supabase/client";

type LoginActivity = {
  id: string;
  login_method: string;
  device_type: string | null;
  browser: string | null;
  operating_system: string | null;
  ip_address: string | null;
  last_active_at: string;
  created_at: string;
};

function getDeviceIcon(deviceType: string | null) {
  switch (deviceType) {
    case "Mobile":
      return Smartphone;

    case "Tablet":
      return Tablet;

    default:
      return Monitor;
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function LoginActivityPage() {
  const supabase = createClient();

  const [activities, setActivities] = useState<LoginActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadActivity();
  }, []);

  async function loadActivity() {
    setLoading(true);
    setErrorMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("You must be signed in to view login activity.");
      }

      const { data, error } = await supabase
        .from("login_activity")
        .select(
          "id, login_method, device_type, browser, operating_system, ip_address, last_active_at, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(50);

      if (error) {
        throw new Error(error.message);
      }

      setActivities(data ?? []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to load login activity."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/settings"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0B1220] text-gray-400 transition hover:border-white/20 hover:text-white"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <p className="text-sm text-gray-500">
              Settings / Security
            </p>

            <h1 className="text-2xl font-bold text-white">
              Login Activity
            </h1>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] shadow-xl">
          <div className="border-b border-white/10 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10">
                <Activity size={28} className="text-blue-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Recent login sessions
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                  Review recent sign-ins to your RYNOVIX account.
                  If you notice something unfamiliar, secure your
                  account immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {loading && (
              <div className="flex min-h-52 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
              </div>
            )}

            {!loading && errorMessage && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-300">
                {errorMessage}
              </div>
            )}

            {!loading && !errorMessage && activities.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#050814] p-10 text-center">
                <Activity
                  size={40}
                  className="mx-auto text-gray-600"
                />

                <h3 className="mt-4 font-semibold text-white">
                  No login activity yet
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Your future successful login sessions will appear here.
                </p>
              </div>
            )}

            {!loading && !errorMessage && activities.length > 0 && (
              <div className="space-y-4">
                {activities.map((activity, index) => {
                  const DeviceIcon = getDeviceIcon(
                    activity.device_type
                  );

                  return (
                    <div
                      key={activity.id}
                      className="rounded-2xl border border-white/10 bg-[#050814] p-5 transition hover:border-white/20"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                            <DeviceIcon
                              size={22}
                              className="text-blue-400"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-white">
                                {activity.browser ||
                                  "Unknown Browser"}
                              </h3>

                              {index === 0 && (
                                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-[11px] font-semibold text-green-400">
                                  Latest
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-sm text-gray-400">
                              {activity.operating_system ||
                                "Unknown OS"}{" "}
                              ·{" "}
                              {activity.device_type ||
                                "Desktop"}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                              <span className="inline-flex items-center gap-1.5">
                                <Globe2 size={14} />
                                {activity.ip_address || "IP unavailable"}
                              </span>

                              <span className="inline-flex items-center gap-1.5">
                                <Clock3 size={14} />
                                {formatDate(activity.created_at)}
                              </span>

                              <span>
                                Login:{" "}
                                {activity.login_method === "google"
                                  ? "Google"
                                  : "Email"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-400">
                            Last active{" "}
                            {formatDate(activity.last_active_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}