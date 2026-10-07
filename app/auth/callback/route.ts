import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

function getDeviceType(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (/ipad|tablet/.test(ua)) {
    return "Tablet";
  }

  if (/mobile|android|iphone|ipod/.test(ua)) {
    return "Mobile";
  }

  return "Desktop";
}

function getBrowser(userAgent: string) {
  if (/edg\//i.test(userAgent)) {
    return "Microsoft Edge";
  }

  if (/opr\//i.test(userAgent) || /opera/i.test(userAgent)) {
    return "Opera";
  }

  if (/chrome\//i.test(userAgent) && !/edg\//i.test(userAgent)) {
    return "Google Chrome";
  }

  if (/firefox\//i.test(userAgent)) {
    return "Mozilla Firefox";
  }

  if (/safari\//i.test(userAgent) && !/chrome\//i.test(userAgent)) {
    return "Safari";
  }

  return "Unknown Browser";
}

function getOperatingSystem(userAgent: string) {
  if (/windows nt/i.test(userAgent)) {
    return "Windows";
  }

  if (/macintosh|mac os x/i.test(userAgent)) {
    return "macOS";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iphone|ipad|ipod/i.test(userAgent)) {
    return "iOS";
  }

  if (/linux/i.test(userAgent)) {
    return "Linux";
  }

  return "Unknown OS";
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    null
  );
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");
  const rawNext = requestUrl.searchParams.get("next");

  const next =
    rawNext &&
    rawNext.startsWith("/") &&
    !rawNext.startsWith("//")
      ? rawNext
      : "/dashboard";

  if (!code) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Google authentication failed. No authorization code received."
        )}`,
        requestUrl.origin
      )
    );
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error(
      "AUTH CALLBACK EXCHANGE FAILED:",
      error.message
    );

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(error.message)}`,
        requestUrl.origin
      )
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Login succeeded but the user session could not be created."
        )}`,
        requestUrl.origin
      )
    );
  }

  const userAgent = request.headers.get("user-agent") || "";

  const { error: activityError } = await supabase
    .from("login_activity")
    .insert({
      user_id: user.id,
      login_method: "google",
      device_type: getDeviceType(userAgent),
      browser: getBrowser(userAgent),
      operating_system: getOperatingSystem(userAgent),
      user_agent: userAgent || null,
      ip_address: getClientIp(request),
      last_active_at: new Date().toISOString(),
    });

  if (activityError) {
    console.error(
      "GOOGLE LOGIN ACTIVITY ERROR:",
      activityError.message
    );
  }

  return NextResponse.redirect(
    new URL(next, requestUrl.origin)
  );
}