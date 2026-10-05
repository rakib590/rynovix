import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");
  const rawNext = requestUrl.searchParams.get("next");

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
  console.log("ORIGIN:", requestUrl.origin);
  console.log("CODE:", code ? "Received" : "Missing");
  console.log("RAW NEXT:", rawNext);
  console.log("FINAL NEXT:", next);

  // --------------------------------
  // No OAuth code
  // --------------------------------
  if (!code) {
    console.error(
      "AUTH CALLBACK ERROR: No OAuth code received"
    );

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Google authentication failed. No authorization code received."
        )}`,
        requestUrl.origin
      )
    );
  }

  // --------------------------------
  // Supabase Server Client
  // --------------------------------
  const supabase = await createClient();

  // --------------------------------
  // Exchange OAuth code for session
  // --------------------------------
  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  // --------------------------------
  // Exchange failed
  // --------------------------------
  if (error) {
    console.error(
      "AUTH CALLBACK EXCHANGE FAILED:",
      error.message
    );

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          error.message
        )}`,
        requestUrl.origin
      )
    );
  }

  // --------------------------------
  // Verify session
  // --------------------------------
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(
      "AUTH CALLBACK SESSION ERROR:",
      userError?.message ?? "User session not found"
    );

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Login succeeded but the user session could not be created."
        )}`,
        requestUrl.origin
      )
    );
  }

  console.log(
    "AUTH CALLBACK SUCCESS:",
    user.email ?? user.id
  );

  console.log(
    "REDIRECTING TO:",
    `${requestUrl.origin}${next}`
  );

  // --------------------------------
  // Redirect after successful login
  // --------------------------------
  return NextResponse.redirect(
    new URL(next, requestUrl.origin)
  );
}