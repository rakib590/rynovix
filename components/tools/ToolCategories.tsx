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
    <div className="flex min-w-max items-center gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
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
  );
}