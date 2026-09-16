"use client";

import {
  Bell,
  Sparkles,
  CreditCard,
  Mail,
} from "lucide-react";

export default function NotificationSettings() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
          <Bell size={28} className="text-yellow-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Notifications
          </h2>

          <p className="mt-1 text-gray-400">
            Choose which notifications you'd like to receive.
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {/* AI Generation */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3">
              <Sparkles size={22} className="text-blue-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                AI Generation Complete
              </h3>

              <p className="text-sm text-gray-400">
                Notify when AI finishes generating content.
              </p>
            </div>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              defaultChecked
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-5"></div>
          </label>
        </div>

        {/* New Features */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-500/10 p-3">
              <Bell size={22} className="text-purple-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                New Features
              </h3>

              <p className="text-sm text-gray-400">
                Receive updates when new AI tools are released.
              </p>
            </div>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              defaultChecked
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-purple-500 peer-checked:after:translate-x-5"></div>
          </label>
        </div>

        {/* Billing */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-500/10 p-3">
              <CreditCard size={22} className="text-green-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Billing Alerts
              </h3>

              <p className="text-sm text-gray-400">
                Payment receipts and subscription notifications.
              </p>
            </div>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              defaultChecked
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-green-500 peer-checked:after:translate-x-5"></div>
          </label>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-cyan-500/10 p-3">
              <Mail size={22} className="text-cyan-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Email Updates
              </h3>

              <p className="text-sm text-gray-400">
                Receive newsletters, tips and platform updates.
              </p>
            </div>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-cyan-500 peer-checked:after:translate-x-5"></div>
          </label>
        </div>

      </div>

    </section>
  );
}