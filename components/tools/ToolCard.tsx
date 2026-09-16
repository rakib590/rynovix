"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;

  badge?: string;
  color?: string;
  available?: boolean;
  image?: string;
}

export default function ToolCard({
  title,
  description,
  icon,
  href,
  badge = "AI Tool",
  color = "blue",
  available = true,
  image,
}: ToolCardProps) {
  const badgeColor =
    color === "blue"
      ? "bg-blue-500/10 text-blue-400"
      : color === "green"
      ? "bg-green-500/10 text-green-400"
      : color === "purple"
      ? "bg-purple-500/10 text-purple-400"
      : color === "yellow"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-cyan-500/10 text-cyan-400";

  const iconColor =
    color === "purple"
      ? "text-purple-400"
      : color === "green"
      ? "text-green-400"
      : color === "yellow"
      ? "text-yellow-400"
      : "text-blue-400";

  const iconBg =
    color === "purple"
      ? "bg-purple-500/10"
      : color === "green"
      ? "bg-green-500/10"
      : color === "yellow"
      ? "bg-yellow-500/10"
      : "bg-blue-500/10";

  /*
   * Image-based Coming Soon Card
   * Image Generator & Video Generator
   */
  if (!available && image) {
    return (
      <div className="group relative cursor-not-allowed overflow-hidden rounded-3xl border border-purple-500/30 bg-[#0B1220] shadow-xl transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20">
        {/* Coming Soon Badge */}
        <span className="absolute right-4 top-4 z-20 rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
          Coming Soon
        </span>

        {/* Tool Image */}
        <img
          src={image}
          alt={title}
          className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  /*
   * Normal Tool Card Content
   */
  const CardContent = (
    <>
      {/* Icon */}
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      {/* Badge */}
      <div className="mt-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`mt-5 text-xl font-bold transition ${
          available
            ? "text-white group-hover:text-blue-400"
            : "text-white group-hover:text-purple-300"
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-6 text-gray-400">
        {description}
      </p>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between">
        {available ? (
          <>
            <span className="text-sm font-semibold text-blue-400">
              Open Tool
            </span>

            <ArrowRight
              size={18}
              className="text-blue-400 transition-transform duration-300 group-hover:translate-x-1"
            />
          </>
        ) : (
          <span className="text-sm font-semibold text-purple-400">
            Available in Version 2.0
          </span>
        )}
      </div>
    </>
  );

  /*
   * Active Tool
   */
  if (available) {
    return (
      <Link
        href={href}
        className="group block cursor-pointer rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
      >
        {CardContent}
      </Link>
    );
  }

  /*
   * Normal Coming Soon Tool
   * Used when no image is provided
   */
  return (
    <div className="group cursor-not-allowed rounded-3xl border border-purple-500/30 bg-[#0B1220] p-6 shadow-xl transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20">
      {CardContent}
    </div>
  );
}