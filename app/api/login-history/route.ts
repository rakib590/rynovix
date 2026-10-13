import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isIP } from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GeoResult = {
  success?: boolean;
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

function getClientIp(request: Request): string | null {
  const candidates = [
    request.headers.get("x-real-ip"),
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  ];

  for (const candidate of candidates) {
    const ip = clean(candidate);

    if (!ip || isIP(ip) === 0) continue;

    const lower = ip.toLowerCase();

    const privateIPv4 =
      /^(10\.|127\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(
        lower
      );

    const privateIPv6 =
      lower === "::1" ||
      lower === "::" ||
      lower.startsWith("fc") ||
      lower.startsWith("fd") ||
      lower.startsWith("fe80:");

    if (privateIPv4 || privateIPv6) return null;

    return ip;
  }

  return null;
}

function getDevice(userAgent: string) {
  const ua = userAgent.toLowerCase();

  let deviceType = "Desktop";

  if (/ipad|tablet|kindle|playbook/.test(ua)) {
    deviceType = "Tablet";
  } else if (
    /mobile|iphone|ipod|android|windows phone/.test(ua)
  ) {
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

  return { deviceType, os };
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
    const userAgent =
      clean(request.headers.get("user-agent")) ?? "Unknown";

    const { deviceType, os } = getDevice(userAgent);

    let country = clean(
      request.headers.get("x-vercel-ip-country")
    );

    let city = clean(
      request.headers.get("x-vercel-ip-city")
    );

    let isp: string | null = null;

    if (ipAddress) {
      try {
        const response = await fetch(
          `https://ipwho.is/${encodeURIComponent(ipAddress)}`,
          {
            cache: "no-store",
            signal: AbortSignal.timeout(2500),
          }
        );

        if (response.ok) {
          const geo = (await response.json()) as GeoResult;

          if (geo.success) {
            country = country ?? clean(geo.country);
            city = city ?? clean(geo.city);
            isp =
              clean(geo.connection?.isp) ??
              clean(geo.connection?.org);
          }
        }
      } catch {
        // Geolocation is optional. Never block login because of it.
      }
    }

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
        isp,
        device_type: deviceType,
        os,
        device: deviceType,
        browser: userAgent,
        status: "success",
      });

    if (insertError) {
      console.error(
        "LOGIN HISTORY INSERT ERROR:",
        insertError.message
      );

      return NextResponse.json(
        { error: "Could not save login history." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LOGIN HISTORY API ERROR:", error);

    return NextResponse.json(
      { error: "Unexpected login history error." },
      { status: 500 }
    );
  }
}