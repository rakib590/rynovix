"use client";

import {
  Activity,
  Wand2,
  Clock3,
} from "lucide-react";
import { useEffect, useState } from "react";

type HistoryItem = {
  id: string;
  tool_id: string;
  tool_name: string;
  title: string;
  prompt: string;
  created_at: string;
};

export default function RecentActivity() {
  const [activities, setActivities] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentActivity();
  }, []);

  async function loadRecentActivity() {
    try {
      setLoading(true);

      const res = await fetch("/api/history", {
        cache: "no-store",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setActivities((data.history ?? []).slice(0, 3));
      } else {
        setActivities([]);
      }
    } catch (error) {
      console.error(
        "Failed to load recent activity:",
        error
      );

      setActivities([]);
    } finally {
      setLoading(false);
    }
  }

  function formatToolName(toolName: string) {
    return (
      toolName
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) ||
      "AI Tool"
    );
  }

  function formatTime(date: string) {
    const createdAt = new Date(date);
    const now = new Date();

    const diffMs =
      now.getTime() - createdAt.getTime();

    const diffMinutes = Math.floor(
      diffMs / (1000 * 60)
    );

    if (diffMinutes < 1) {
      return "Just now";
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} ${
        diffMinutes === 1 ? "minute" : "minutes"
      } ago`;
    }

    const diffHours = Math.floor(
      diffMinutes / 60
    );

    if (diffHours < 24) {
      return `${diffHours} ${
        diffHours === 1 ? "hour" : "hours"
      } ago`;
    }

    const diffDays = Math.floor(
      diffHours / 24
    );

    if (diffDays === 1) {
      return "Yesterday";
    }

    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }

    return createdAt.toLocaleDateString();
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-5 shadow-xl">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Activity
              className="text-blue-500"
              size={22}
            />

            <h2 className="text-2xl font-bold text-white">
              Recent Activity
            </h2>
          </div>

          <p className="mt-2 text-gray-400">
            Your latest AI tool usage.
          </p>
        </div>

        <a
          href="/dashboard/history"
          className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500 hover:text-white"
        >
          View All Activity
        </a>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="py-16 text-center">
          <p className="text-sm text-gray-500">
            Loading recent activity...
          </p>
        </div>
      ) : activities.length === 0 ? (
        /* Empty */
        <div className="py-16 text-center">
          <Wand2
            size={40}
            className="mx-auto text-gray-600"
          />

          <h3 className="mt-4 text-lg font-semibold text-white">
            No Recent Activity
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Your latest AI generations will appear here.
          </p>
        </div>
      ) : (
        /* Activity List */
        <div className="relative ml-5 space-y-4 border-l border-white/10 pl-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group relative flex items-start gap-4 rounded-2xl border border-white/5 bg-[#050814] p-5 transition-all duration-300 hover:border-blue-500/30 hover:bg-[#0E1728]"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[53px] top-8 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#0B1220] bg-blue-600">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>

              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Wand2 size={18} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-medium text-blue-400">
                      {formatToolName(
                        activity.tool_name
                      )}
                    </span>

                    <h3 className="mt-1 break-words text-base font-semibold text-white transition group-hover:text-blue-400">
                      {activity.title?.trim() ||
                        "AI Generation"}
                    </h3>
                  </div>

                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    <Clock3 size={12} />

                    {formatTime(
                      activity.created_at
                    )}
                  </span>
                </div>

                <p className="mt-2 break-words text-sm leading-5 text-gray-400">
                  {activity.prompt
                    ? activity.prompt.length > 120
                      ? activity.prompt.slice(0, 120) +
                        "..."
                      : activity.prompt
                    : "AI content generated successfully."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
        <div>
          <p className="text-sm text-gray-500">
            Showing your latest 3 AI generations.
          </p>
        </div>

        <a
          href="/dashboard/history"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
        >
          View History →
        </a>
      </div>
    </section>
  );
}