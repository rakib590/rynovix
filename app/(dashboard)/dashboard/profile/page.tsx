"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AvatarUpload from "@/components/profile/AvatarUpload";

export default function ProfilePage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [uid, setUid] = useState("");

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUid(user.id);
      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        setFullName(profile.full_name ?? "");
        setUsername(profile.username ?? "");
        setWebsite(profile.website ?? "");
        setBio(profile.bio ?? "");
        setAvatarUrl(profile.avatar_url ?? "");
      } else {
        setFullName(user.user_metadata?.full_name ?? "");
        setUsername(user.user_metadata?.username ?? "");
        setWebsite(user.user_metadata?.website ?? "");
        setBio(user.user_metadata?.bio ?? "");
        setAvatarUrl(user.user_metadata?.avatar_url ?? "");
      }

      setLoading(false);
    }

    loadProfile();
  }, [supabase]);
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    if (!uid) {
      setErrorMessage("User not found. Please login again.");
      return;
    }

    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: uid,
          full_name: fullName,
          username: username,
          website: website,
          bio: bio,
          avatar_url: avatarUrl || null,
        },
        {
          onConflict: "id",
        }
      );

    setSaving(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage("Profile updated successfully.");
  }
  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg text-gray-400">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">
          My Profile
        </h1>

        <p className="mt-3 text-gray-400">
          Manage your personal information and account details.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-3xl border border-white/10 bg-[#0B1220] p-10 shadow-2xl"
      >
        {/* Avatar */}
        <div className="mb-10 flex justify-center">
          <AvatarUpload
            uid={uid}
            avatarUrl={avatarUrl}
            onUpload={setAvatarUrl}
          />
        </div>

        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-gray-400"
            />
          </div>

          {/* Website */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Website
            </label>

            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>
          {/* Bio */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Bio
            </label>

            <textarea
              rows={5}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="w-full rounded-xl border border-white/10 bg-[#050814] px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
              {successMessage}
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}