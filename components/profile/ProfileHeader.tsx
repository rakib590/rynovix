"use client";

import { BadgeCheck } from "lucide-react";

interface ProfileHeaderProps {
  fullName?: string | null;
  username?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  verified?: boolean;
  onEditProfile?: () => void;
}

export default function ProfileHeader({
  fullName,
  username,
  email,
  avatarUrl,
  verified = true,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* Profile Info */}
        <div className="flex items-center gap-5">

          {/* Avatar */}
          <div className="h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-[#050814]">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-400">
                {fullName?.charAt(0) || "U"}
              </div>
            )}
          </div>


          <div>
            <div className="flex flex-wrap items-center gap-3">

              <h1 className="text-3xl font-bold text-white">
                {fullName || "My Profile"}
              </h1>


              {verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                  <BadgeCheck size={14} />
                  Verified
                </span>
              )}

            </div>


            <p className="mt-2 text-gray-400">
              @{username || "creator"}
            </p>


            <p className="mt-1 text-sm text-gray-500">
              {email}
            </p>

          </div>

        </div>


        {/* Actions */}
        <div className="flex flex-wrap gap-4">

          <button
            type="button"
            onClick={onEditProfile}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Edit Profile
          </button>


          <button
            type="button"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
            className="rounded-xl border border-white/10 bg-[#050814] px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-blue-500 hover:text-white"
          >
            View Dashboard
          </button>


          <button
            type="button"
            className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-6 py-3 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
          >
            Upgrade Plan
          </button>

        </div>

      </div>
    </div>
  );
}