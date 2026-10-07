"use client";

import { useEffect, useState } from "react";
import { User, Save } from "lucide-react";

import AvatarUpload from "@/components/profile/AvatarUpload";

import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/hooks/useProfile";

export default function ProfileSettings() {
  const supabase = createClient();

  const { profile, refreshProfile } = useProfile();

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
    if (!profile || saving) return;

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        username: username.trim(),
        website: website.trim(),
        bio: bio.trim(),
        avatar_url: avatarUrl,
      })
      .eq("id", profile.id);

    if (!error) {
      await refreshProfile();
    }

    setSaving(false);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0B1220] p-5 shadow-xl sm:p-8">
      {/* Header */}
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 sm:h-14 sm:w-14">
          <User size={26} className="text-blue-400 sm:h-7 sm:w-7" />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Profile Settings
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-400">
            Update your personal information and creator profile.
          </p>
        </div>
      </div>

      {/* Avatar */}
      <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#050814] p-5 sm:flex-row sm:items-center">
        <div className="shrink-0">
          <AvatarUpload
            uid={profile?.id || ""}
            avatarUrl={avatarUrl}
            isEditing={true}
            onUpload={(url) => {
              setAvatarUrl(url);
              refreshProfile();
            }}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white">
            Profile Photo
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Upload your profile picture.
            <br />
            JPG, PNG or WebP • Max 5MB
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className="h-12 w-full rounded-2xl border border-white/10 bg-[#050814] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
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
            placeholder="username"
            className="h-12 w-full rounded-2xl border border-white/10 bg-[#050814] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
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
            className="h-12 w-full cursor-not-allowed rounded-2xl border border-white/10 bg-[#050814] px-4 text-sm text-gray-500 outline-none"
          />

          <p className="mt-2 text-xs text-gray-600">
            Email address cannot be changed here.
          </p>
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
            className="h-12 w-full rounded-2xl border border-white/10 bg-[#050814] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="mt-5 md:mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Creator Bio
        </label>

        <textarea
          rows={5}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us a little about yourself..."
          className="w-full resize-none rounded-2xl border border-white/10 bg-[#050814] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-gray-600 hover:border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
        />
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-stretch sm:justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !profile}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <Save size={18} />

          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </section>
  );
}