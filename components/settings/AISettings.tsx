"use client";

import {
  Bot,
  Languages,
  Sparkles,
  History,
  SlidersHorizontal,
} from "lucide-react";

export default function AISettings() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
          <Bot size={28} className="text-cyan-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Preferences
          </h2>

          <p className="mt-1 text-gray-400">
            Customize how RYNOVIX AI works for you.
          </p>
        </div>
      </div>

      <div className="space-y-8">

        {/* Default AI Model */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Default AI Model
          </label>

          <div className="relative">
            <Bot
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
            />

            <select className="w-full rounded-2xl border border-white/10 bg-[#050814] py-3 pl-11 pr-4 text-white outline-none transition focus:border-cyan-500">
              <option>GPT-5.6</option>
              <option>GPT-5.5</option>
              <option>GPT-4.1</option>
            </select>
          </div>
        </div>

        {/* Default Language */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Default Language
          </label>

          <div className="relative">
            <Languages
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400"
            />

            <select className="w-full rounded-2xl border border-white/10 bg-[#050814] py-3 pl-11 pr-4 text-white outline-none transition focus:border-green-500">
              <option>English</option>
              <option>বাংলা</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>

        {/* Generation Quality */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Generation Quality
          </label>

          <div className="relative">
            <Sparkles
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
            />

            <select className="w-full rounded-2xl border border-white/10 bg-[#050814] py-3 pl-11 pr-4 text-white outline-none transition focus:border-yellow-500">
              <option>High Quality</option>
              <option>Balanced</option>
              <option>Fast Generation</option>
            </select>
          </div>
        </div>

        {/* AI History */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-500/10 p-3">
              <History size={22} className="text-purple-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Save AI History
              </h3>

              <p className="text-sm text-gray-400">
                Automatically save generated content history.
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

        {/* Prompt Settings */}
        <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">

          <div className="mb-4 flex items-center gap-3">
            <SlidersHorizontal
              size={22}
              className="text-orange-400"
            />

            <h3 className="font-semibold text-white">
              Prompt Settings
            </h3>
          </div>

          <textarea
            rows={5}
            placeholder="Write your default custom prompt..."
            className="w-full resize-none rounded-2xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-orange-500"
          />
        </div>

      </div>

    </section>
  );
}