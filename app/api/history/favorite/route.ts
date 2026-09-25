import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(req: Request) {
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

    const body = await req.json();

    const { id, favorite } = body;

    if (!id || typeof favorite !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid favorite request.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("ai_history")
      .update({
        favorite,
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select("id, favorite")
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: "History item not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      favorite: data.favorite,
    });
  } catch (error: any) {
    console.error("Favorite update error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Failed to update favorite.",
      },
      { status: 500 }
    );
  }
}