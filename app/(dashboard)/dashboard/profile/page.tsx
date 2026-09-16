"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/hooks/useProfile";

import AvatarUpload from "@/components/profile/AvatarUpload";
import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import SocialLinksCard from "@/components/profile/SocialLinksCard";
import AccountStatusCard from "@/components/profile/AccountStatusCard";
import SaveButton from "@/components/profile/SaveButton";

interface ProfileData {
  full_name?: string | null;
  username?: string | null;
  website?: string | null;
  bio?: string | null;
  avatar_url?: string | null;

  youtube?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  x?: string | null;
  linkedin?: string | null;

  created_at?: string | null;
}

export default function ProfilePage() {
  const supabase = createClient();

  const { profile, refreshProfile } = useProfile();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [x, setX] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [memberSince, setMemberSince] = useState("2026");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setErrorMessage(
          "Unable to load your account. Please login again."
        );
        setLoading(false);
        return;
      }

      setUid(user.id);
      setEmail(user.email ?? "");

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      const data =
        (profileData as ProfileData) ??
        (user.user_metadata as ProfileData);

      setFullName(data.full_name ?? "");
      setUsername(data.username ?? "");
      setWebsite(data.website ?? "");
      setBio(data.bio ?? "");
      setAvatarUrl(data.avatar_url ?? "");

      setYoutube(data.youtube ?? "");
      setFacebook(data.facebook ?? "");
      setInstagram(data.instagram ?? "");
      setX(data.x ?? "");
      setLinkedin(data.linkedin ?? "");

      if (profileData?.created_at) {
        setMemberSince(
          new Date(profileData.created_at)
            .getFullYear()
            .toString()
        );
      } else if (user.created_at) {
        setMemberSince(
          new Date(user.created_at)
            .getFullYear()
            .toString()
        );
      }

      setLoading(false);
    }

    loadProfile();
  }, [supabase]);
  async function handleSave() {
    if (!uid) {
      setErrorMessage("User not found. Please login again.");
      return;
    }

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

          youtube: youtube || null,
          facebook: facebook || null,
          instagram: instagram || null,
          x: x || null,
          linkedin: linkedin || null,
        },
        {
          onConflict: "id",
        }
      );

    if (error) {
      console.error("Profile save error:", error);
      setErrorMessage(error.message);
      throw error;
    }

    // Refresh Global Profile
    await refreshProfile();

    setSuccessMessage("Profile updated successfully.");

    setIsEditing(false);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-blue-500" />

          <p className="text-sm text-gray-400">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-400 sm:text-base">
          Manage your personal information and account details.
        </p>
      </div>

      <div className="space-y-6">

        <ProfileHeader
          fullName={profile?.full_name ?? fullName}
          username={profile?.username ?? username}
          email={profile?.email ?? email}
          avatarUrl={profile?.avatar_url ?? avatarUrl}
          onEditProfile={() => {
            setIsEditing(true);

            setTimeout(() => {
              document
                .getElementById("personal-information")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
            }, 100);
          }}
        />

        <div className="rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">
              Profile Picture
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Upload a profile picture for your RYNOVIX account.
            </p>
          </div>

          <AvatarUpload
            uid={uid}
            avatarUrl={profile?.avatar_url ?? avatarUrl}
            isEditing={isEditing}
            onUpload={(url) => {
              setAvatarUrl(url);
              refreshProfile();
            }}
          />
        </div>

        <div id="personal-information">
          <PersonalInfoCard
            fullName={fullName}
            username={username}
            email={profile?.email ?? email}
            website={website}
            bio={bio}
            isEditing={isEditing}
            onFullNameChange={setFullName}
            onUsernameChange={setUsername}
            onWebsiteChange={setWebsite}
            onBioChange={setBio}
          />
        </div>

        <SocialLinksCard
          youtube={youtube}
          facebook={facebook}
          instagram={instagram}
          x={x}
          linkedin={linkedin}
          isEditing={isEditing}
          onYoutubeChange={setYoutube}
          onFacebookChange={setFacebook}
          onInstagramChange={setInstagram}
          onXChange={setX}
          onLinkedinChange={setLinkedin}
        />

        <AccountStatusCard
          currentPlan={profile?.current_plan ?? "Free"}
          aiCredits={profile?.ai_credits ?? 100}
          memberSince={profile?.member_since ?? memberSince}
          verified={profile?.verified ?? true}
        />

        {errorMessage && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
            {successMessage}
          </div>
        )}

        {isEditing && (
          <SaveButton onSave={handleSave} />
        )}

      </div>
    </div>
  );
}