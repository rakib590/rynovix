"use client";

import { useState } from "react";

const categories = [
  "All Tools",
  "YouTube",
  "SEO",
  "Writing",
  "Coming Soon",
];

export default function ToolCategories() {
  const [activeCategory, setActiveCategory] =
    useState("All Tools");

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl">

      <div className="flex flex-wrap gap-3">

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200 ${
              activeCategory === category
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "border border-white/10 bg-[#050814] text-gray-400 hover:border-blue-500 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}

      </div>

    </div>
  );
}