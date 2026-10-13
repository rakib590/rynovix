import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isIP } from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GeoResult = {
  success?: boolean;
  message?: string;
  country?: string;
  city?: string;
  connection?: {
    isp?: string;
    org?: string;
  };
};

function clean(value: string | null | undefined): string | null {
  if (!value) return null;

  const result = value.trim();
  return result && result.length <= 200 ? result : null;
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

function getHeaderValue(value: string | null): string | null {
  const raw = clean(value);
  if (!raw) return null;

  try {
    return clean(decodeURIComponent(raw)) ?? raw;
  } catch {
    return raw;
  }
}

function getDevice(userAgent: string) {
  const ua = userAgent.toLowerCase();

  let deviceType = "Desktop";

  if (/ipad|tablet|kindle|playbook/.test(ua)) {
    deviceType = "Tablet";
  } else if (/mobile|iphone|ipod|android|windows phone/.test(ua)) {
    deviceType = "Mobile";
  }

  let os = "Unknown";

  if (/cros/.test(ua)) {
    os = "ChromeOS";
  } else if (/windows nt/.test(ua)) {
    os = "Windows";
  } else if (/android/.test(ua)) {
    os = "Android";
  } else if (/iphone|ipad|ipod/.test(ua)) {
    os = "iOS";
  } else if (/macintosh|mac os x/.test(ua)) {
    os = "macOS";
  } else if (/linux/.test(ua)) {
    os = "Linux";
  }

  let browser = "Unknown Browser";

  if (/edg/i.test(userAgent)) {
    browser = "Microsoft Edge";
  } else if (/opr|opera/i.test(userAgent)) {
    browser = "Opera";
  } else if (/firefox/i.test(userAgent)) {
    browser = "Mozilla Firefox";
  } else if (/chrome|crios/i.test(userAgent)) {
    browser = "Google Chrome";
  } else if (/safari/i.test(userAgent)) {
    browser = "Safari";
  }

  return { deviceType, os, browser };
}

async function getIpDetails(ip: string | null) {
  const details = {
    country: null as string | null,
    city: null as string | null,
    isp: null as string | null,
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

    if (!response.ok) {
      console.error("IP LOOKUP HTTP ERROR:", response.status);
      return details;
    }

    const geo = (await response.json()) as GeoResult;

    if (geo.success === false) {
      console.error("IP LOOKUP FAILED:", geo.message ?? "Unknown error");
      return details;
    }

    details.country = clean(geo.country);
    details.city = clean(geo.city);
    details.isp = clean(geo.connection?.isp) ?? clean(geo.connection?.org);
  } catch (error) {
    console.error("IP LOOKUP ERROR:", error);
  }

  return details;
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase environment variables are missing." },
        { status: 500 }
      );
    }

    const authorization = request.headers.get("authorization");
    const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const authClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const {
      data: { user },
      error: authError,
    } = await authClient.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired session." },
        { status: 401 }
      );
    }

    const ipAddress = getClientIp(request);
    const userAgent = clean(request.headers.get("user-agent")) ?? "";
    const { deviceType, os, browser } = getDevice(userAgent);

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
      getHeaderValue(request.headers.get("x-vercel-ip-country")) ??
      ipDetails.country;

    const city =
      getHeaderValue(request.headers.get("x-vercel-ip-city")) ??
      ipDetails.city;

    const userClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { error: insertError } = await userClient
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

    if (insertError) {
      console.error("LOGIN HISTORY INSERT ERROR:", insertError.message);

      return NextResponse.json(
        { error: "Could not save login history." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      ipFound: Boolean(ipAddress),
      countryFound: Boolean(country),
      cityFound: Boolean(city),
      ispFound: Boolean(ipDetails.isp),
    });
  } catch (error) {
    console.error("LOGIN HISTORY API ERROR:", error);

    return NextResponse.json(
      { error: "Unexpected login history error." },
      { status: 500 }
    );
  }
}