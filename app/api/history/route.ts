import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// ======================================================
// GET USER HISTORY
// ======================================================

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("ai_history")
      .select(
        `
        id,
        user_id,
        tool_id,
        tool_name,
        title,
        prompt,
        result,
        credits_used,
        created_at,
        favorite
        `
      )
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      history: data ?? [],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Failed to load history.",
      },
      {
        status: 500,
      }
    );
  }
}