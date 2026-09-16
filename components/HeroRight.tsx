import { Zap, Check } from "lucide-react";

const FEATURES = [
  {
    title: "YouTube AI",
    status: "Available Now",
  },
  {
    title: "Image & Video AI",
    status: "Coming Soon",
  },
  {
    title: "Everything AI",
    status: "Future Updates",
  },
];

export default function HeroRight() {
  return (
    <div className="flex w-full flex-col items-center justify-center lg:items-start">
      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-sky-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.03]">
          <Zap className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          Get Started Free
        </button>

        <button className="rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/[0.06]">
          Explore Tools
        </button>
      </div>

      {/* Features */}
      <div className="mt-12 flex flex-wrap items-start gap-10">
        {FEATURES.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/25 bg-cyan-500/5">
              <Check className="h-6 w-6 text-cyan-400" />
            </div>

            {/* Text */}
            <div>
              <h4 className="text-lg font-semibold text-white leading-tight">
                {item.title}
              </h4>

              <p className="text-sm text-slate-400 leading-tight">
                {item.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}