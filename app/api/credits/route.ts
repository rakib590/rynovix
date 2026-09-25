import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be logged in.",
        },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Credits profile error:", profileError);

      return NextResponse.json(
        {
          success: false,
          error: "User profile not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      credits: Number(profile.credits ?? 0),
    });
  } catch (error: any) {
    console.error("Credits API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to load credits.",
      },
      { status: 500 }
    );
  }
}