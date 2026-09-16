"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { createClient } from "@/lib/supabase/client";

export interface ProfileData {
  id: string;

  full_name: string;
  username: string;
  email: string;

  website: string;
  bio: string;
  avatar_url: string;

  youtube: string;
  facebook: string;
  instagram: string;
  x: string;
  linkedin: string;

  current_plan: string;
  ai_credits: number;
  verified: boolean;
  member_since: string;
}

interface ProfileContextType {
  profile: ProfileData | null;

  loading: boolean;

  refreshProfile: () => Promise<void>;

  updateProfile: (
    data: Partial<ProfileData>
  ) => Promise<void>;
}

export const ProfileContext =
  createContext<ProfileContextType | null>(null);

export function ProfileProvider({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();

  const [profile, setProfile] =
    useState<ProfileData | null>(null);

  const [loading, setLoading] = useState(true);

  async function refreshProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile({
        id: user.id,

        full_name: data.full_name ?? "",
        username: data.username ?? "",
        email: user.email ?? "",

        website: data.website ?? "",
        bio: data.bio ?? "",
        avatar_url: data.avatar_url ?? "",

        youtube: data.youtube ?? "",
        facebook: data.facebook ?? "",
        instagram: data.instagram ?? "",
        x: data.x ?? "",
        linkedin: data.linkedin ?? "",

        current_plan: data.current_plan ?? "Free",
        ai_credits: data.ai_credits ?? 100,
        verified: data.verified ?? true,

        member_since: data.created_at
          ? new Date(data.created_at)
              .getFullYear()
              .toString()
          : "2026",
      });
    }

    setLoading(false);
  }

  async function updateProfile(
    updates: Partial<ProfileData>
  ) {
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      ...updates,
    };

    setProfile(updatedProfile);

    await supabase.from("profiles").upsert({
      id: updatedProfile.id,

      full_name: updatedProfile.full_name,
      username: updatedProfile.username,
      website: updatedProfile.website,
      bio: updatedProfile.bio,
      avatar_url: updatedProfile.avatar_url,

      youtube: updatedProfile.youtube,
      facebook: updatedProfile.facebook,
      instagram: updatedProfile.instagram,
      x: updatedProfile.x,
      linkedin: updatedProfile.linkedin,
    });
  }

  useEffect(() => {
    refreshProfile();
  }, []);

  const value = useMemo(
    () => ({
      profile,
      loading,
      refreshProfile,
      updateProfile,
    }),
    [profile, loading]
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}
