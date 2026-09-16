"use client";

import {
  Type,
  FileText,
  Hash,
  Search,
  Clock3,
  Image,
} from "lucide-react";

import FavoriteCard from "./FavoriteCard";

const favorites = [
  {
    title: "Title Generator",
    description: "Generate engaging YouTube titles using AI.",
    icon: <Type size={26} />,
    href: "/dashboard/tools/title-generator",
    badge: "YouTube",
    color: "blue",
    lastUsed: "2 hours ago",
  },
  {
    title: "Description Generator",
    description: "Create SEO-friendly YouTube descriptions.",
    icon: <FileText size={26} />,
    href: "/dashboard/tools/description-generator",
    badge: "SEO",
    color: "green",
    lastUsed: "Yesterday",
  },
  {
    title: "Hashtag Generator",
    description: "Generate trending hashtags for your videos.",
    icon: <Hash size={26} />,
    href: "/dashboard/tools/hashtag-generator",
    badge: "SEO",
    color: "purple",
    lastUsed: "3 days ago",
  },
  {
    title: "SEO Checker",
    description: "Analyze and improve your YouTube SEO.",
    icon: <Search size={26} />,
    href: "/dashboard/tools/seo-checker",
    badge: "SEO",
    color: "yellow",
    lastUsed: "Today",
  },
  {
    title: "Best Upload Time",
    description: "Find the best upload time to maximize views.",
    icon: <Clock3 size={26} />,
    href: "/dashboard/tools/best-upload-time",
    badge: "Analytics",
    color: "green",
    lastUsed: "5 hours ago",
  },
  {
    title: "Thumbnail Title",
    description: "Generate catchy thumbnail text instantly.",
    icon: <Image size={26} />,
    href: "/dashboard/tools/thumbnail-title",
    badge: "Thumbnail",
    color: "blue",
    lastUsed: "Last week",
  },
];

export default function FavoritesGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {favorites.map((tool) => (
        <FavoriteCard
          key={tool.title}
          title={tool.title}
          description={tool.description}
          icon={tool.icon}
          href={tool.href}
          badge={tool.badge}
          color={tool.color}
          lastUsed={tool.lastUsed}
        />
      ))}
    </div>
  );
}