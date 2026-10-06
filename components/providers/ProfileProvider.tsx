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
  const supabase = useMemo(() => createClient(), []);

  const [profile, setProfile] =
    useState<ProfileData | null>(null);

  const [loading, setLoading] = useState(true);

  // --------------------------------
  // Load / Create Profile
  // --------------------------------
  async function refreshProfile() {
    setLoading(true);

    try {
      // --------------------------------
      // Get authenticated user
      // --------------------------------
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(
          "PROFILE AUTH ERROR:",
          userError.message
        );

        setProfile(null);
        return;
      }

      // --------------------------------
      // No authenticated user
      // --------------------------------
      if (!user) {
        console.log(
          "PROFILE: No authenticated user"
        );

        setProfile(null);
        return;
      }

      console.log(
        "PROFILE USER:",
        user.email ?? user.id
      );

      // --------------------------------
      // Get existing profile
      // --------------------------------
      const {
        data,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      // --------------------------------
      // Profile does not exist
      // --------------------------------
      if (!data) {
        console.log(
          "PROFILE: No profile found. Creating profile..."
        );

        const metadata =
          user.user_metadata ?? {};

        const fullName =
          metadata.full_name ??
          metadata.name ??
          "";

        const avatarUrl =
          metadata.avatar_url ??
          metadata.picture ??
          "";

        // IMPORTANT:
        // Use "credits", not "ai_credits".
        const newProfile = {
          id: user.id,

          full_name: fullName,
          username: "",
          website: "",
          bio: "",
          avatar_url: avatarUrl,

          youtube: "",
          facebook: "",
          instagram: "",
          x: "",
          linkedin: "",

          current_plan: "Free",
          credits: 100,

          email: user.email ?? "",
        };

        const {
          data: createdProfile,
          error: createError,
        } = await supabase
          .from("profiles")
          .insert(newProfile)
          .select("*")
          .single();

        if (createError) {
          console.error(
            "PROFILE CREATE ERROR:",
            createError.message
          );

          console.error(
            "PROFILE CREATE DETAILS:",
            createError
          );

          setProfile(null);
          return;
        }

        console.log(
          "PROFILE CREATED SUCCESSFULLY"
        );

        setProfile({
          id: user.id,

          full_name:
            createdProfile.full_name ?? "",

          username:
            createdProfile.username ?? "",

          email:
            createdProfile.email ??
            user.email ??
            "",

          website:
            createdProfile.website ?? "",

          bio:
            createdProfile.bio ?? "",

          avatar_url:
            createdProfile.avatar_url ?? "",

          youtube:
            createdProfile.youtube ?? "",

          facebook:
            createdProfile.facebook ?? "",

          instagram:
            createdProfile.instagram ?? "",

          x:
            createdProfile.x ?? "",

          linkedin:
            createdProfile.linkedin ?? "",

          current_plan:
            createdProfile.current_plan ??
            createdProfile.plan ??
            "Free",

          // Database column = credits
          // UI state property = ai_credits
          ai_credits:
            Number(
              createdProfile.credits ?? 100
            ),

          member_since:
            createdProfile.created_at
              ? new Date(
                  createdProfile.created_at
                )
                  .getFullYear()
                  .toString()
              : new Date()
                  .getFullYear()
                  .toString(),
        });

        return;
      }

      // --------------------------------
      // Existing profile
      // --------------------------------
      if (profileError) {
        console.error(
          "PROFILE FETCH ERROR:",
          profileError.message
        );

        console.error(
          "PROFILE FETCH DETAILS:",
          profileError
        );

        setProfile(null);
        return;
      }

      console.log(
        "PROFILE FOUND:",
        data.id
      );

      // --------------------------------
      // Set profile state
      // --------------------------------
      setProfile({
        id: user.id,

        full_name:
          data.full_name ?? "",

        username:
          data.username ?? "",

        email:
          data.email ??
          user.email ??
          "",

        website:
          data.website ?? "",

        bio:
          data.bio ?? "",

        avatar_url:
          data.avatar_url ?? "",

        youtube:
          data.youtube ?? "",

        facebook:
          data.facebook ?? "",

        instagram:
          data.instagram ?? "",

        x:
          data.x ?? "",

        linkedin:
          data.linkedin ?? "",

        current_plan:
          data.current_plan ??
          data.plan ??
          "Free",

        // Database column = credits
        // UI state property = ai_credits
        ai_credits:
          Number(data.credits ?? 100),

        member_since:
          data.created_at
            ? new Date(
                data.created_at
              )
                .getFullYear()
                .toString()
            : new Date()
                .getFullYear()
                .toString(),
      });
    } catch (error) {
      console.error(
        "PROFILE UNEXPECTED ERROR:",
        error
      );

      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  // --------------------------------
  // Update Profile
  // --------------------------------
  async function updateProfile(
    updates: Partial<ProfileData>
  ) {
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      ...updates,
    };

    // Update UI immediately
    setProfile(updatedProfile);

    const {
      error,
    } = await supabase
      .from("profiles")
      .update({
        full_name:
          updatedProfile.full_name,

        username:
          updatedProfile.username,

        website:
          updatedProfile.website,

        bio:
          updatedProfile.bio,

        avatar_url:
          updatedProfile.avatar_url,

        youtube:
          updatedProfile.youtube,

        facebook:
          updatedProfile.facebook,

        instagram:
          updatedProfile.instagram,

        x:
          updatedProfile.x,

        linkedin:
          updatedProfile.linkedin,
      })
      .eq("id", updatedProfile.id);

    if (error) {
      console.error(
        "PROFILE UPDATE ERROR:",
        error.message
      );

      // Reload actual database state
      await refreshProfile();
    }
  }

  // --------------------------------
  // Initial Profile Load
  // --------------------------------
  useEffect(() => {
    let mounted = true;

    const loadInitialProfile = async () => {
      if (!mounted) return;

      await refreshProfile();
    };

    loadInitialProfile();

    // --------------------------------
    // Listen for Auth Changes
    // --------------------------------
    const {
      data: {
        subscription,
      },
    } = supabase.auth.onAuthStateChange(
      (event) => {
        console.log(
          "AUTH STATE CHANGE:",
          event
        );

        if (
          event === "SIGNED_IN" ||
          event === "INITIAL_SESSION" ||
          event === "TOKEN_REFRESHED"
        ) {
          setTimeout(() => {
            if (mounted) {
              refreshProfile();
            }
          }, 100);
        }

        if (event === "SIGNED_OUT") {
          setProfile(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  // --------------------------------
  // Context Value
  // --------------------------------
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

// --------------------------------
// useProfile Hook
// --------------------------------
export function useProfile() {
  const context =
    useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfile must be used inside ProfileProvider"
    );
  }

  return context;
}