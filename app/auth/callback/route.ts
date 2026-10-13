import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { isIP } from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getDeviceType(ua: string) {
  if (/ipad|tablet|kindle|playbook/i.test(ua)) return "Tablet";
  if (/mobile|android|iphone|ipod/i.test(ua)) return "Mobile";
  return "Desktop";
}

function getBrowser(ua: string) {
  if (/edg/i.test(ua)) return "Microsoft Edge";
  if (/opr|opera/i.test(ua)) return "Opera";
  if (/firefox/i.test(ua)) return "Mozilla Firefox";
  if (/chrome|crios/i.test(ua)) return "Google Chrome";
  if (/safari/i.test(ua)) return "Safari";
  return "Unknown Browser";
}

function getOperatingSystem(ua: string) {
  if (/cros/i.test(ua)) return "ChromeOS";
  if (/windows nt/i.test(ua)) return "Windows";
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/macintosh|mac os x/i.test(ua)) return "macOS";
  if (/linux/i.test(ua)) return "Linux";
  return "Unknown OS";
}

function isPublicIp(value: string): boolean {
  const version = isIP(value);
  if (!version) return false;

  if (version === 4) {
    const [a, b, c] = value.split(".").map(Number);

    if (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0 && c === 0) ||
      (a === 198 && (b === 18 || b === 19)) ||
      (a === 198 && b === 51 && c === 100) ||
      (a === 203 && b === 0 && c === 113)
    ) {
      return false;
    }

    return true;
  }

  const ip = value.toLowerCase();

  if (
    ip === "::" ||
    ip === "::1" ||
    ip.startsWith("fc") ||
    ip.startsWith("fd") ||
    ip.startsWith("fe8") ||
    ip.startsWith("fe9") ||
    ip.startsWith("fea") ||
    ip.startsWith("feb")
  ) {
    return false;
  }

  // Convert IPv4-mapped IPv6 addresses to IPv4.
  const mapped = ip.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/i);

  if (mapped) return isPublicIp(mapped[1]);

  return true;
}

function getClientIp(request: Request): string | null {
  const headers = [
    "x-vercel-forwarded-for",
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
  ];

  for (const header of headers) {
    const value = request.headers.get(header);
    if (!value) continue;

    for (const candidate of value.split(",")) {
      const ip = candidate.trim();

      if (isPublicIp(ip)) return ip;
    }
  }

  return null;
}

function cleanHeader(value: string | null): string | null {
  if (!value) return null;

  try {
    const decoded = decodeURIComponent(value).trim();
    return decoded && decoded.length <= 200 ? decoded : null;
  } catch {
    const trimmed = value.trim();
    return trimmed && trimmed.length <= 200 ? trimmed : null;
  }
}

type IpDetails = {
  country: string | null;
  city: string | null;
  isp: string | null;
};

async function getIpDetails(ip: string | null): Promise<IpDetails> {
  const details: IpDetails = {
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
        signal: AbortSignal.timeout(4000),
      }
    );

    if (!response.ok) return details;

    const data = await response.json();

    if (data.success === false) {
      console.error("IP LOOKUP FAILED:", data.message ?? "Unknown error");
      return details;
    }

    details.country =
      typeof data.country === "string" ? data.country : null;

    details.city =
      typeof data.city === "string" ? data.city : null;

    details.isp =
      typeof data.connection?.isp === "string"
        ? data.connection.isp
        : typeof data.connection?.org === "string"
          ? data.connection.org
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
    rawNext?.startsWith("/") && !rawNext.startsWith("//")
      ? rawNext
      : "/dashboard";

  const loginUrl = (message: string) =>
    NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(message)}`, requestUrl.origin)
    );

  if (!code) {
    return loginUrl("Google authentication failed.");
  }

  const supabase = await createClient();

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    console.error("AUTH CALLBACK ERROR:", exchangeError.message);
    return loginUrl(exchangeError.message);
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return loginUrl("User session failed");
  }

  const { data: profile, error: profileError } = await supabase
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
    return loginUrl("Unable to verify account");
  }

  if (profile.status === "suspended") {
    await supabase.auth.signOut();
    return loginUrl("Account suspended");
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const deviceType = getDeviceType(userAgent);
  const browser = getBrowser(userAgent);
  const os = getOperatingSystem(userAgent);
  const ipAddress = getClientIp(request);

  console.info("LOGIN HISTORY DIAGNOSTICS:", {
    ipFound: Boolean(ipAddress),
    ipVersion: ipAddress ? isIP(ipAddress) : 0,
    vercelCountryPresent: Boolean(
      request.headers.get("x-vercel-ip-country")
    ),
    vercelCityPresent: Boolean(request.headers.get("x-vercel-ip-city")),
  });

  const ipDetails = await getIpDetails(ipAddress);

  const country =
    cleanHeader(request.headers.get("x-vercel-ip-country")) ??
    ipDetails.country;

  const city =
    cleanHeader(request.headers.get("x-vercel-ip-city")) ??
    ipDetails.city;

  const { error: historyError } = await supabase
    .from("login_history")
    .insert({
      user_id: user.id,
      ip_address: ipAddress,
      country,
      city,
      isp: ipDetails.isp,
      device_type: deviceType,
      os,
      device: deviceType,
      browser,
      status: "success",
    });

  if (historyError) {
    console.error("GOOGLE LOGIN HISTORY ERROR:", historyError.message);
  }

  const { error: activityError } = await supabase
    .from("login_activity")
    .insert({
      user_id: user.id,
      login_method: "google",
      device_type: deviceType,
      browser,
      operating_system: os,
      user_agent: userAgent || null,
      ip_address: ipAddress,
      last_active_at: new Date().toISOString(),
    });

  if (activityError) {
    console.error("GOOGLE LOGIN ACTIVITY ERROR:", activityError.message);
  }

  if (
    profile.status === "active" &&
    (profile.role === "admin" || profile.role === "super_admin")
  ) {
    return NextResponse.redirect(new URL("/admin", requestUrl.origin));
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}