
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Monitor,
  Globe,
  MapPin,
  Wifi,
  Laptop,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type LoginHistoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LoginHistoryPage({
  params,
}: LoginHistoryPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Get user profile
  const {
    data: user,
    error: userError,
  } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .eq("id", id)
    .single();

  if (userError || !user) {
    notFound();
  }

  // Fetch real login history from Supabase
  const {
    data: history,
    error: historyError,
  } = await supabase
    .from("login_history")
    .select(`
      id,
      login_time,
      logout_time,
      device,
      device_type,
      browser,
      os,
      ip_address,
      country,
      city,
      isp,
      status
    `)
    .eq("user_id", id)
    .order("login_time", { ascending: false });

  if (historyError) {
    console.error("ADMIN LOGIN HISTORY ERROR:", historyError);
  }

  const records = history ?? [];
  const successfulLogins = records.filter(
    (item) => item.status?.toLowerCase() === "success"
  ).length;

  const latestLogin = records[0]?.login_time;

  return (
    <main className="min-h-screen bg-[#060B1A] px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/admin/users/${id}`}
          className="mb-7 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to User
        </Link>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                <ShieldCheck size={25} />
              </div>

              <h1 className="text-2xl font-bold sm:text-3xl">
                Login History
              </h1>

              <p className="mt-2 text-sm text-gray-400">
                Real authentication records and login locations.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Live database records
            </span>
          </div>

          {/* User information */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              User account
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              {user.full_name || "No Name"}
            </h2>

            <p className="mt-1 break-all text-sm text-gray-400">
              {user.email || "No email"}
            </p>

            <p className="mt-3 break-all text-xs text-gray-500">
              User ID: {user.id}
            </p>
          </div>

          {/* Summary cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <SummaryCard
              title="Total Records"
              value={String(records.length)}
              icon={<Clock size={20} />}
            />

            <SummaryCard
              title="Successful Logins"
              value={String(successfulLogins)}
              icon={<ShieldCheck size={20} />}
            />

            <SummaryCard
              title="Latest Login"
              value={latestLogin ? formatDate(latestLogin) : "No login"}
              icon={<LogOut size={20} />}
            />
          </div>

          {/* Error message */}
          {historyError && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              Failed to load login history. Check Supabase permissions
              and the server logs.
            </div>
          )}

          {/* History records */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Login records</h2>

              <span className="text-sm text-gray-400">
                {records.length} record{records.length === 1 ? "" : "s"}
              </span>
            </div>

            {records.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-12 text-center">
                <Clock className="mx-auto mb-3 text-gray-500" size={32} />

                <h3 className="font-medium">No login history found</h3>

                <p className="mt-2 text-sm text-gray-500">
                  No records are available for this user, or the database
                  query could not return any records.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {records.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-white/20 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          <Clock size={20} />
                        </div>

                        <div>
                          <h3 className="font-semibold">Login event</h3>

                          <p className="mt-1 text-sm text-gray-400">
                            {formatDate(item.login_time)}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {item.logout_time
                              ? `Logout: ${formatDate(item.logout_time)}`
                              : "Logout time not recorded"}
                          </p>
                        </div>
                      </div>

                      <StatusBadge status={item.status} />
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <Info
                        title="Device"
                        value={item.device || "Unknown"}
                        icon={<Laptop size={17} />}
                      />

                      <Info
                        title="Device Type"
                        value={item.device_type || "Unknown"}
                        icon={<Monitor size={17} />}
                      />

                      <Info
                        title="Browser"
                        value={item.browser || "Unknown"}
                        icon={<Globe size={17} />}
                      />

                      <Info
                        title="Operating System"
                        value={item.os || "Unknown"}
                        icon={<Monitor size={17} />}
                      />

                      <Info
                        title="IP Address"
                        value={item.ip_address || "Unavailable"}
                        icon={<Wifi size={17} />}
                      />

                      <Info
                        title="Country"
                        value={item.country || "Unavailable"}
                        icon={<Globe size={17} />}
                      />

                      <Info
                        title="City"
                        value={item.city || "Unavailable"}
                        icon={<MapPin size={17} />}
                      />

                      <Info
                        title="Internet Provider (ISP)"
                        value={item.isp || "Unavailable"}
                        icon={<Wifi size={17} />}
                      />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function formatDate(value: string | null) {
  if (!value) return "Unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center gap-2 text-blue-400">
        {icon}
        <span className="text-sm text-gray-400">{title}</span>
      </div>

      <p className="mt-3 break-words text-xl font-bold">{value}</p>
    </div>
  );
}

function Info({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <p className="text-xs">{title}</p>
      </div>

      <p className="mt-2 break-words text-sm font-medium text-gray-200">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string | null }) {
  const normalizedStatus = status?.toLowerCase() || "unknown";
  const isSuccess = normalizedStatus === "success";

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
        isSuccess
          ? "bg-green-500/10 text-green-400"
          : "bg-yellow-500/10 text-yellow-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isSuccess ? "bg-green-400" : "bg-yellow-400"
        }`}
      />
      {status || "unknown"}
    </span>
  );
}
