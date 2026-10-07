"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  LogOut,
  Monitor,
  ShieldCheck,
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

export default function ConnectedDevicesPage() {
  const supabase = createClient();

  const [devices, setDevices] = useState<LoginActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadDevices();
  }, []);

  async function loadDevices() {
    setLoading(true);
    setErrorMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "You must be signed in to manage connected devices."
        );
      }

      const { data, error } = await supabase
        .from("login_activity")
        .select(
          "id, login_method, device_type, browser, operating_system, ip_address, last_active_at, created_at"
        )
        .eq("user_id", user.id)
        .order("last_active_at", {
          ascending: false,
        })
        .limit(20);

      if (error) {
        throw new Error(error.message);
      }

      setDevices(data ?? []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to load connected devices."
      );
    } finally {
      setLoading(false);
    }
  }

  async function signOutOtherDevices() {
    if (signingOut) return;

    setSigningOut(true);
    setErrorMessage("");
    setMessage("");

    try {
      const { error } = await supabase.auth.signOut({
        scope: "others",
      });

      if (error) {
        throw new Error(error.message);
      }

      setMessage(
        "Other active sessions have been signed out successfully."
      );

      await loadDevices();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to sign out other devices."
      );
    } finally {
      setSigningOut(false);
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
              Connected Devices
            </h1>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220] shadow-xl">
          <div className="border-b border-white/10 p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10">
                  <ShieldCheck
                    size={28}
                    className="text-purple-400"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Manage your sessions
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                    Review devices that have recently accessed your
                    RYNOVIX account and sign out other sessions when
                    needed.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={signOutOtherDevices}
                disabled={signingOut || loading}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {signingOut ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut size={18} />
                    Sign Out Other Devices
                  </>
                )}
              </button>
            </div>
          </div>

          {(message || errorMessage) && (
            <div className="px-6 pt-6 sm:px-8">
              {errorMessage && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                  {errorMessage}
                </div>
              )}

              {message && !errorMessage && (
                <div className="flex items-start gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                  />
                  <span>{message}</span>
                </div>
              )}
            </div>
          )}

          <div className="p-6 sm:p-8">
            {loading && (
              <div className="flex min-h-52 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
              </div>
            )}

            {!loading && !errorMessage && devices.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#050814] p-10 text-center">
                <Monitor
                  size={40}
                  className="mx-auto text-gray-600"
                />

                <h3 className="mt-4 font-semibold text-white">
                  No connected device activity
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Devices will appear here after successful logins.
                </p>
              </div>
            )}

            {!loading && devices.length > 0 && (
              <div className="space-y-4">
                {devices.map((device, index) => {
                  const DeviceIcon = getDeviceIcon(
                    device.device_type
                  );

                  const isLatest = index === 0;

                  return (
                    <div
                      key={device.id}
                      className="rounded-2xl border border-white/10 bg-[#050814] p-5 transition hover:border-white/20"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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
                                {device.browser ||
                                  "Unknown Browser"}
                              </h3>

                              {isLatest && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-[11px] font-semibold text-green-400">
                                  <CheckCircle2 size={12} />
                                  Recent
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-sm text-gray-400">
                              {device.operating_system ||
                                "Unknown OS"}{" "}
                              ·{" "}
                              {device.device_type ||
                                "Desktop"}
                            </p>

                            <p className="mt-2 text-xs text-gray-500">
                              IP:{" "}
                              {device.ip_address ||
                                "Unavailable"}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-left sm:text-right">
                          <p className="text-xs uppercase tracking-wider text-gray-600">
                            Last active
                          </p>

                          <p className="mt-1 text-sm text-gray-400">
                            {formatDate(device.last_active_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <p className="text-sm leading-6 text-yellow-300">
            Signing out other devices will invalidate your other
            Supabase Auth sessions. Your current session will remain
            active.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}