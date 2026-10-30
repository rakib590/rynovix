
"use client";

type ToolCategoriesProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

const categories = [
  "All Tools",
  "AI Assistant & Generators",
  "Image & Creative Tools",
  "Video Tools",
  "YouTube SEO Tools",
];

export default function ToolCategories({
  activeCategory,
  onCategoryChange,
}: ToolCategoriesProps) {
  return (
    <div className="flex min-w-max items-center gap-2">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={active}
            className={`whitespace-nowrap rounded-xl border px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
              active
                ? "border-blue-400/40 bg-blue-500/15 text-blue-300"
                : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
