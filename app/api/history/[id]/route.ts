import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "History ID is required.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
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
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error(
        "Failed to load history item:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to load history item.",
        },
        { status: 500 }
      );
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
      history: data,
    });
  } catch (error: any) {
    console.error(
      "History detail API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Failed to load history item.",
      },
      { status: 500 }
    );
  }
}