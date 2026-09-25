"use client";

interface ToolCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  "All Tools",
  "YouTube",
  "SEO",
  "Writing",
  "Coming Soon",
];

export default function ToolCategories({
  activeCategory,
  onCategoryChange,
}: ToolCategoriesProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-4 shadow-xl sm:p-5">
      <div className="flex flex-wrap gap-2.5">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "border border-white/10 bg-[#050814] text-gray-400 hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}