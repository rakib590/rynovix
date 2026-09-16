"use client";

import {
  PlayCircle,
  Users,
  Camera,
  Globe2,
  BriefcaseBusiness,
} from "lucide-react";

interface SocialLinksCardProps {
  youtube?: string;
  facebook?: string;
  instagram?: string;
  x?: string;
  linkedin?: string;

  isEditing?: boolean;

  onYoutubeChange: (value: string) => void;
  onFacebookChange: (value: string) => void;
  onInstagramChange: (value: string) => void;
  onXChange: (value: string) => void;
  onLinkedinChange: (value: string) => void;
}

export default function SocialLinksCard({
  youtube = "",
  facebook = "",
  instagram = "",
  x = "",
  linkedin = "",
  isEditing = false,
  onYoutubeChange,
  onFacebookChange,
  onInstagramChange,
  onXChange,
  onLinkedinChange,
}: SocialLinksCardProps) {
  const socialLinks = [
    {
      name: "YouTube",
      value: youtube,
      onChange: onYoutubeChange,
      icon: PlayCircle,
      color: "text-red-400",
      border: "focus-within:border-red-500/50",
      placeholder: "https://youtube.com/@username",
    },
    {
      name: "Facebook",
      value: facebook,
      onChange: onFacebookChange,
      icon: Users,
      color: "text-blue-400",
      border: "focus-within:border-blue-500/50",
      placeholder: "https://facebook.com/username",
    },
    {
      name: "Instagram",
      value: instagram,
      onChange: onInstagramChange,
      icon: Camera,
      color: "text-pink-400",
      border: "focus-within:border-pink-500/50",
      placeholder: "https://instagram.com/username",
    },
    {
      name: "X (Twitter)",
      value: x,
      onChange: onXChange,
      icon: Globe2,
      color: "text-gray-300",
      border: "focus-within:border-white/40",
      placeholder: "https://x.com/username",
    },
    {
      name: "LinkedIn",
      value: linkedin,
      onChange: onLinkedinChange,
      icon: BriefcaseBusiness,
      color: "text-cyan-400",
      border: "focus-within:border-cyan-500/50",
      placeholder: "https://linkedin.com/in/username",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8">
      {/* Header */}
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Social Links
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Connect your social media accounts.
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isEditing
              ? "bg-blue-500/10 text-blue-400"
              : "bg-white/5 text-gray-500"
          }`}
        >
          {isEditing ? "Editing" : "View Only"}
        </span>
      </div>

      {/* Links */}
      <div className="space-y-4">
        {socialLinks.map((item) => {
          const Icon = item.icon;
          const connected = item.value.trim() !== "";

          return (
            <div
              key={item.name}
              className={`rounded-2xl border border-white/10 bg-[#050814] p-4 transition ${
                isEditing ? item.border : "hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon
                    size={20}
                    className={item.color}
                  />
                </div>

                {/* Input */}
                <div className="min-w-0 flex-1">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    {item.name}
                  </label>

                  {isEditing ? (
                    <input
                      type="url"
                      value={item.value}
                      onChange={(e) =>
                        item.onChange(e.target.value)
                      }
                      placeholder={item.placeholder}
                      className="mt-1 w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-gray-600"
                    />
                  ) : (
                    <p className="mt-1 truncate text-sm font-medium text-white">
                      {item.value || "Not Connected"}
                    </p>
                  )}
                </div>

                {/* Status */}
                <span
                  className={`hidden rounded-full px-3 py-1 text-xs font-medium sm:inline-flex ${
                    connected
                      ? "bg-green-500/10 text-green-400"
                      : "bg-white/5 text-gray-500"
                  }`}
                >
                  {connected ? "Connected" : "Not Connected"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4">
        <p className="text-xs leading-5 text-gray-400">
          Your social links will appear on your public creator profile.
        </p>
      </div>
    </section>
  );
}