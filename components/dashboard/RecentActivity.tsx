"use client";

import {
  Sparkles,
  User,
  ImageIcon,
  Lock,
  LogIn,
  Wand2,
  Activity,
} from "lucide-react";

const activities = [
  {
    title: "Welcome to RYNOVIX",
    description:
      "Your AI Creator journey has started. Let's create something amazing!",
    time: "Just now",
    icon: Sparkles,
    color: "bg-blue-600",
    badge: "bg-green-500/20 text-green-400",
  },
  {
    title: "Profile Updated",
    description:
      "You updated your profile information successfully.",
    time: "2 hours ago",
    icon: User,
    color: "bg-green-600",
    badge: "bg-blue-500/20 text-blue-400",
  },
  {
    title: "Avatar Changed",
    description:
      "Your profile photo was updated successfully.",
    time: "Yesterday",
    icon: ImageIcon,
    color: "bg-pink-600",
    badge: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Password Updated",
    description:
      "You changed your account password.",
    time: "2 days ago",
    icon: Lock,
    color: "bg-orange-600",
    badge: "bg-orange-500/20 text-orange-400",
  },
  {
    title: "Login Successful",
    description:
      "You signed into your account.",
    time: "3 days ago",
    icon: LogIn,
    color: "bg-cyan-600",
    badge: "bg-cyan-500/20 text-cyan-400",
  },
  {
    title: "AI Tool Ready",
    description:
      "All AI tools are ready to use. Start creating now!",
    time: "Today",
    icon: Wand2,
    color: "bg-violet-600",
    badge: "bg-violet-500/20 text-violet-400",
  },
];

export default function RecentActivity() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-5 shadow-xl">

      <div className="mb-2 flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <Activity className="text-blue-500" size={22} />

            <h2 className="text-2xl font-bold text-white">
              Recent Activity
            </h2>

          </div>

          <p className="mt-2 text-gray-400">
            Your latest account activities and AI tool usage.
          </p>

        </div>

        <button className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500 hover:text-white">
          View All Activity
        </button>

      </div>

      <div className="relative ml-5 border-l border-white/10 pl-8 space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="group relative flex items-start gap-4 rounded-2xl border border-white/5 bg-[#050814] p-5 transition-all duration-300 hover:border-blue-500/30 hover:bg-[#0E1728]"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[53px] top-8 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#0B1220] ${activity.color}`}
              >
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>

              {/* Icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${activity.color}`}
              >
                <Icon size={18} />
              </div>

              {/* Content */}
              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3 className="text-base font-semibold text-white transition group-hover:text-blue-400">
                    {activity.title}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${activity.badge}`}
                  >
                    {activity.time}
                  </span>

                </div>

                <p className="mt-1 text-sm leading-5 text-gray-400">
                  {activity.description}
                </p>

              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-5">

        <div>
          <p className="text-sm text-gray-500">
            Showing your latest account activities.
          </p>
        </div>

        <button className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30">
          View History →
        </button>

      </div>

    </section>
  );
}