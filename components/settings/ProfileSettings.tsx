"use client";

import { useEffect, useState } from "react";

import {
  User,
  Camera,
  Save,
} from "lucide-react";

import AvatarUpload from "@/components/profile/AvatarUpload";

import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/hooks/useProfile";

export default function ProfileSettings() {
  const supabase = createClient();

  const {
    profile,
    refreshProfile,
  } = useProfile();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;

    setFullName(profile.full_name ?? "");
    setUsername(profile.username ?? "");
    setEmail(profile.email ?? "");
    setWebsite(profile.website ?? "");
    setBio(profile.bio ?? "");
    setAvatarUrl(profile.avatar_url ?? "");
  }, [profile]);

  async function handleSave() {
    if (!profile) return;

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        username: username,
        website: website,
        bio: bio,
        avatar_url: avatarUrl,
      })
      .eq("id", profile.id);

    if (!error) {
      await refreshProfile();
    }

    setSaving(false);
  }
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-8 shadow-xl">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
          <User size={28} className="text-blue-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Profile Settings
          </h2>

          <p className="mt-1 text-gray-400">
            Update your personal information and creator profile.
          </p>
        </div>
      </div>

      {/* Avatar */}
<div className="mb-10 flex flex-col items-center gap-6 sm:flex-row">

  <AvatarUpload
    uid={profile?.id || ""}
    avatarUrl={avatarUrl}
    isEditing={true}
    onUpload={(url) => {
      setAvatarUrl(url);
      refreshProfile();
    }}
  />

  <div>
    <h3 className="text-lg font-semibold text-white">
      Profile Photo
    </h3>

    <p className="mt-2 text-sm text-gray-400">
      Upload your profile picture.
      <br />
      JPG, PNG or WebP • Max 5MB
    </p>
  </div>

</div>

      {/* Form */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Username */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value.replace(/^@/, ""))
            }
            className="w-full rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            disabled
            className="w-full cursor-not-allowed rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-gray-400 outline-none"
          />
        </div>

        {/* Website */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Website
          </label>

          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-white outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Creator Bio
        </label>

        <textarea
          rows={5}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full resize-none rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />
      </div>
      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={18} />

          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </section>
  );
}