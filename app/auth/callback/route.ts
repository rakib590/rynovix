import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const rawNext = searchParams.get("next");

  // --------------------------------
  // Validate redirect destination
  // --------------------------------
  const next =
    rawNext &&
    rawNext.startsWith("/") &&
    !rawNext.startsWith("//")
      ? rawNext
      : "/dashboard";

  console.log("========== AUTH CALLBACK ==========");
  console.log("CODE:", code ? "Received" : "Missing");
  console.log("NEXT:", next);

  // --------------------------------
  // No code
  // --------------------------------
  if (!code) {
    console.error("AUTH CALLBACK ERROR: No code received");

    return NextResponse.json(
      {
        error: "No code received",
      },
      { status: 400 }
    );
  }

  // --------------------------------
  // Create Supabase server client
  // --------------------------------
  const supabase = await createClient();

  // --------------------------------
  // Exchange code for session
  // --------------------------------
  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  console.log(
    "EXCHANGE ERROR:",
    error ? error.message : "None"
  );

  // --------------------------------
  // Exchange failed
  // --------------------------------
  if (error) {
    console.error(
      "AUTH CALLBACK EXCHANGE FAILED:",
      error
    );

    return NextResponse.json(
      {
        message: "Exchange Failed",
        error: error.message,
      },
      { status: 400 }
    );
  }

  // --------------------------------
  // Success
  // --------------------------------
  console.log("AUTH CALLBACK SUCCESS");
  console.log("REDIRECTING TO:", next);

  return NextResponse.redirect(`${origin}${next}`);
}