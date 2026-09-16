"use client";

import {
  HardDrive,
  Image,
  Video,
  Music2,
  Database,
  Trash2,
} from "lucide-react";

export default function StorageSettings() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
          <HardDrive size={28} className="text-cyan-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Storage Management
          </h2>

          <p className="mt-1 text-gray-400">
            Monitor and manage your AI generated files.
          </p>
        </div>
      </div>

      <div className="space-y-6">

        {/* Total Storage */}
        <div className="rounded-2xl border border-white/10 bg-[#050814] p-6">

          <div className="mb-5 flex items-center gap-3">
            <Database
              size={24}
              className="text-blue-400"
            />

            <h3 className="text-lg font-semibold text-white">
              Total Storage Usage
            </h3>
          </div>

          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Used Storage
            </span>

            <span className="font-medium text-white">
              2.8 GB / 10 GB
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-[#0B1220]">
            <div className="h-full w-[28%] rounded-full bg-cyan-500"></div>
          </div>

        </div>

        {/* Files */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* Images */}
          <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">

            <div className="mb-4 flex items-center gap-3">
              <Image
                size={24}
                className="text-purple-400"
              />

              <h3 className="font-semibold text-white">
                Generated Images
              </h3>
            </div>

            <p className="text-sm text-gray-400">
              245 Images
            </p>

            <p className="mt-1 text-sm text-gray-500">
              1.2 GB Used
            </p>

          </div>

          {/* Videos */}
          <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">

            <div className="mb-4 flex items-center gap-3">
              <Video
                size={24}
                className="text-red-400"
              />

              <h3 className="font-semibold text-white">
                Generated Videos
              </h3>
            </div>

            <p className="text-sm text-gray-400">
              36 Videos
            </p>

            <p className="mt-1 text-sm text-gray-500">
              1.1 GB Used
            </p>

          </div>

          {/* Audio */}
          <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">

            <div className="mb-4 flex items-center gap-3">
              <Music2
                size={24}
                className="text-green-400"
              />

              <h3 className="font-semibold text-white">
                Audio Files
              </h3>
            </div>

            <p className="text-sm text-gray-400">
              89 Files
            </p>

            <p className="mt-1 text-sm text-gray-500">
              520 MB Used
            </p>

          </div>

          {/* Cache */}
          <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">

            <div className="mb-4 flex items-center gap-3">
              <Trash2
                size={24}
                className="text-orange-400"
              />

              <h3 className="font-semibold text-white">
                Temporary Cache
              </h3>
            </div>

            <p className="text-sm text-gray-400">
              180 MB
            </p>

            <button className="mt-4 rounded-xl bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400 transition hover:bg-orange-500/20">
              Clear Cache
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}