import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

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

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json().catch(() => ({}));

    const loginMethod =
      typeof body?.loginMethod === "string" &&
      body.loginMethod.trim()
        ? body.loginMethod.trim()
        : "email";

    const userAgent = request.headers.get("user-agent") || "";

    const deviceType = getDeviceType(userAgent);
    const browser = getBrowser(userAgent);
    const operatingSystem = getOperatingSystem(userAgent);
    const ipAddress = getClientIp(request);

    const { data, error } = await supabase
      .from("login_activity")
      .insert({
        user_id: user.id,
        login_method: loginMethod,
        device_type: deviceType,
        browser,
        operating_system: operatingSystem,
        user_agent: userAgent || null,
        ip_address: ipAddress,
        last_active_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("LOGIN ACTIVITY INSERT ERROR:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      activity: data,
    });
  } catch (error) {
    console.error("LOGIN ACTIVITY API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to record login activity.",
      },
      {
        status: 500,
      }
    );
  }
}