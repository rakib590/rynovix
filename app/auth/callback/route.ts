import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  console.log("========== CALLBACK ==========");
  console.log("CODE:", code);
  console.log("NEXT:", next);

  if (!code) {
    return NextResponse.json({
      error: "No code received",
    });
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  console.log("EXCHANGE ERROR:", error);

  if (error) {
    return NextResponse.json({
      message: "Exchange Failed",
      error,
    });
  }

  console.log("SUCCESS");

  return NextResponse.redirect(`${origin}${next}`);
}