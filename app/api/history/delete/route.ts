import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(req: Request) {
  try {
    const supabase = await createClient();

    // ----------------------------------------------------------
    // AUTHENTICATED USER
    // ----------------------------------------------------------

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("AUTH ERROR:", userError);

      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Please login again.",
        },
        { status: 401 }
      );
    }

    // ----------------------------------------------------------
    // GET HISTORY ID
    // ----------------------------------------------------------

    let body: { id?: string };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const id = body.id?.trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "History id is required.",
        },
        { status: 400 }
      );
    }

    console.log("========== DELETE HISTORY ==========");
    console.log("USER ID:", user.id);
    console.log("HISTORY ID:", id);

    // ----------------------------------------------------------
    // CHECK HISTORY EXISTS
    // ----------------------------------------------------------

    const {
      data: history,
      error: historyError,
    } = await supabase
      .from("ai_history")
      .select("id, user_id")
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (historyError) {
      console.error(
        "HISTORY LOOKUP ERROR:",
        historyError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            historyError.message ||
            "Failed to find history.",
        },
        { status: 500 }
      );
    }

    if (!history) {
      console.error(
        "HISTORY NOT FOUND FOR USER:",
        user.id,
        id
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "History not found or you do not have permission to delete it.",
        },
        { status: 404 }
      );
    }

    // ----------------------------------------------------------
    // DELETE HISTORY
    // ----------------------------------------------------------

    const {
      data: deletedHistory,
      error: deleteError,
    } = await supabase
      .from("ai_history")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)
      .select("id");

    if (deleteError) {
      console.error(
        "HISTORY DELETE ERROR:",
        deleteError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            deleteError.message ||
            "Failed to delete history.",
          code: deleteError.code,
          details: deleteError.details,
          hint: deleteError.hint,
        },
        { status: 500 }
      );
    }

    if (!deletedHistory || deletedHistory.length === 0) {
      console.error(
        "DELETE RETURNED NO ROWS."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "History could not be deleted. Please check your Supabase DELETE policy.",
        },
        { status: 403 }
      );
    }

    console.log(
      "HISTORY DELETED:",
      deletedHistory
    );

    console.log("====================================");

    // ----------------------------------------------------------
    // SUCCESS
    // ----------------------------------------------------------

    return NextResponse.json({
      success: true,
      deletedId: id,
    });
  } catch (error: any) {
    console.error(
      "DELETE HISTORY API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Internal server error.",
      },
      { status: 500 }
    );
  }
}
