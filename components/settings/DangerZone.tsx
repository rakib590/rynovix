"use client";

import {
  AlertTriangle,
  Download,
  Trash2,
} from "lucide-react";

export default function DangerZone() {
  return (
    <section className="rounded-3xl border border-red-500/20 bg-[#0B1220] p-8 shadow-xl">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
          <AlertTriangle
            size={28}
            className="text-red-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Danger Zone
          </h2>

          <p className="mt-1 text-gray-400">
            These actions are permanent and cannot be undone.
          </p>
        </div>
      </div>

      <div className="space-y-6">

        {/* Export Data */}
        <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#050814] p-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-blue-500/10 p-4">
              <Download
                size={24}
                className="text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Export Your Data
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Download all your generated content, history,
                favorites and account information.
              </p>
            </div>
          </div>

          <button className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-6 py-3 font-medium text-blue-400 transition hover:bg-blue-500/20">
            Export Data
          </button>

        </div>

        {/* Delete Account */}
        <div className="flex flex-col gap-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-red-500/10 p-4">
              <Trash2
                size={24}
                className="text-red-400"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Delete Account
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Permanently delete your RYNOVIX account,
                AI history, generated files and all stored
                data. This action cannot be reversed.
              </p>
            </div>
          </div>

          <button className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500">
            Delete Account
          </button>

        </div>

        {/* Warning */}
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

          <div className="flex items-start gap-3">
            <AlertTriangle
              size={22}
              className="mt-0.5 text-yellow-400"
            />

            <div>
              <h4 className="font-semibold text-yellow-300">
                Important Notice
              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Before deleting your account, we recommend
                exporting your data. Once your account is
                deleted, all AI generations, uploaded files,
                favorites, billing history and personal data
                will be permanently removed and cannot be
                recovered.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}