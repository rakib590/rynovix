import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { isIP } from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getDeviceType(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (/ipad|tablet/.test(ua)) return "Tablet";
  if (/mobile|android|iphone|ipod/.test(ua)) return "Mobile";

  return "Desktop";
}

function getBrowser(userAgent: string) {
  if (/edg/i.test(userAgent)) return "Microsoft Edge";
  if (/opera|opr/i.test(userAgent)) return "Opera";
  if (/firefox/i.test(userAgent)) return "Mozilla Firefox";
  if (/chrome/i.test(userAgent)) return "Google Chrome";
  if (/safari/i.test(userAgent)) return "Safari";

  return "Unknown Browser";
}

function getOperatingSystem(userAgent: string) {
  if (/windows nt/i.test(userAgent)) return "Windows";
  if (/android/i.test(userAgent)) return "Android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
  if (/macintosh|mac os x/i.test(userAgent)) return "macOS";
  if (/linux/i.test(userAgent)) return "Linux";

  return "Unknown OS";
}

function isPublicIp(ip: string) {
  const version = isIP(ip);

  if (!version) return false;

  if (version === 4) {
    const parts = ip.split(".").map(Number);
    const [a, b] = parts;

    if (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    ) {
      return false;
    }

    return true;
  }

  const lower = ip.toLowerCase();

  return !(
    lower === "::1" ||
    lower === "::" ||
    lower.startsWith("fc") ||
    lower.startsWith("fd") ||
    lower.startsWith("fe80:") ||
    lower.startsWith("::ffff:127.")
  );
}

function getClientIp(request: Request): string | null {
  const candidates = [
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("x-forwarded-for"),
    request.headers.get("x-real-ip"),
    request.headers.get("cf-connecting-ip"),
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;

    for (const item of candidate.split(",")) {
      const ip = item.trim();

      if (isPublicIp(ip)) {
        return ip;
      }
    }
  }

  return null;
}

function decodeHeader(value: string | null) {
  if (!value) return null;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

async function getIpDetails(ip: string | null) {
  const details: {
    country: string | null;
    city: string | null;
    isp: string | null;
  } = {
    country: null,
    city: null,
    isp: null,
  };

  if (!ip) return details;

  try {
    const response = await fetch(
      `https://ipwho.is/${encodeURIComponent(ip)}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(3000),
      }
    );

    if (!response.ok) return details;

    const data = await response.json();

    if (data.success === false) return details;

    details.country =
      typeof data.country === "string" ? data.country : null;

    details.city =
      typeof data.city === "string" ? data.city : null;

    details.isp =
      typeof data.connection?.isp === "string"
        ? data.connection.isp
        : null;
  } catch (error) {
    console.error("IP LOOKUP ERROR:", error);
  }

  return details;
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
          "Google authentication failed."
        )}`,
        requestUrl.origin
      )
    );
  }

  const supabase = await createClient();

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    console.error(
      "AUTH CALLBACK ERROR:",
      exchangeError.message
    );

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          exchangeError.message
        )}`,
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
        "/login?error=User session failed",
        requestUrl.origin
      )
    );
  }

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("role,status")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    console.error(
      "PROFILE LOOKUP ERROR:",
      profileError?.message ?? "Profile not found"
    );

    await supabase.auth.signOut();

    return NextResponse.redirect(
      new URL(
        "/login?error=Unable to verify account",
        requestUrl.origin
      )
    );
  }

  if (profile.status === "suspended") {
    await supabase.auth.signOut();

    return NextResponse.redirect(
      new URL(
        "/login?error=Account suspended",
        requestUrl.origin
      )
    );
  }

  const userAgent =
    request.headers.get("user-agent") ?? "";

  const deviceType = getDeviceType(userAgent);
  const browser = getBrowser(userAgent);
  const operatingSystem = getOperatingSystem(userAgent);
  const ipAddress = getClientIp(request);

  const country =
    decodeHeader(request.headers.get("x-vercel-ip-country"));

  const city =
    decodeHeader(request.headers.get("x-vercel-ip-city"));

  // IP lookup failure must not prevent login.
  const ipDetails = await getIpDetails(ipAddress);

  const finalCountry = country || ipDetails.country;
  const finalCity = city || ipDetails.city;

  // Save detailed Google login history.
  const { error: loginHistoryError } = await supabase
    .from("login_history")
    .insert({
      user_id: user.id,
      ip_address: ipAddress,
      country: finalCountry,
      city: finalCity,
      isp: ipDetails.isp,
      device_type: deviceType,
      os: operatingSystem,
      device: deviceType,
      browser,
      status: "success",
    });

  if (loginHistoryError) {
    console.error(
      "GOOGLE LOGIN HISTORY ERROR:",
      loginHistoryError.message
    );
  }

  // Preserve existing login activity tracking.
  const { error: activityError } = await supabase
    .from("login_activity")
    .insert({
      user_id: user.id,
      login_method: "google",
      device_type: deviceType,
      browser,
      operating_system: operatingSystem,
      user_agent: userAgent || null,
      ip_address: ipAddress,
      last_active_at: new Date().toISOString(),
    });

  if (activityError) {
    console.error(
      "GOOGLE LOGIN ACTIVITY ERROR:",
      activityError.message
    );
  }

  if (
    profile.status === "active" &&
    (profile.role === "admin" ||
      profile.role === "super_admin")
  ) {
    return NextResponse.redirect(
      new URL("/admin", requestUrl.origin)
    );
  }

  return NextResponse.redirect(
    new URL(next, requestUrl.origin)
  );
}