"use client";

import {
  User,
  Mail,
  Globe,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function UserProfileCard() {
  const supabase = createClient();

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    }

    loadProfile();
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">
{/* Header */}
<div className="mb-5 flex items-center justify-between">
  <h2 className="text-xl font-bold text-white">
    User Profile
  </h2>

  <button className="rounded-lg p-2 transition hover:bg-white/5">
    <MoreHorizontal size={18} className="text-gray-400" />
  </button>
</div>

{/* Profile */}
<div className="flex items-center gap-4">

  <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-blue-500 shadow-lg">

    {profile?.avatar_url ? (
      <img
        src={profile.avatar_url}
        alt="Avatar"
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-blue-600 text-2xl font-bold text-white">
        {profile?.full_name?.charAt(0)?.toUpperCase() || "R"}
      </div>
    )}

  </div>

  <div className="flex-1">

    <h3 className="text-xl font-bold text-white">
      {profile?.full_name || "Rakib"}
    </h3>

    <p className="mt-1 text-sm text-gray-400">
      @{profile?.username || "creator"}
    </p>

    <span className="mt-3 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
      AI Creator
    </span>

  </div>

</div>

{/* Stats */}
<div className="mt-6 grid grid-cols-3 border-t border-white/10 pt-5">

  <div className="text-center">
    <h3 className="text-2xl font-bold text-white">
      42
    </h3>

    <p className="mt-1 text-xs text-gray-400">
      Tools Used
    </p>
  </div>

  <div className="border-x border-white/10 text-center">
    <h3 className="text-2xl font-bold text-white">
      156
    </h3>

    <p className="mt-1 text-xs text-gray-400">
      Generations
    </p>
  </div>

  <div className="text-center">
    <h3 className="text-2xl font-bold text-white">
      28
    </h3>

    <p className="mt-1 text-xs text-gray-400">
      Favorites
    </p>
  </div>

</div>


      {/* Edit Button */}
      <button
        onClick={() => {
          window.location.href = "/dashboard/profile";
        }}
        className="mt-8 w-full rounded-xl border border-blue-500/40 bg-blue-500/10 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-600 hover:text-white"
      >
        Edit Profile
      </button>

    </div>
  );
}