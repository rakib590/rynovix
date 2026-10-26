import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { isIP } from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


// -----------------------------
// Device Type
// -----------------------------

function getDeviceType(userAgent: string) {

  if (/ipad|tablet|kindle/i.test(userAgent)) {
    return "Tablet";
  }

  if (/mobile|android|iphone|ipod/i.test(userAgent)) {
    return "Mobile";
  }

  return "Desktop";
}



// -----------------------------
// Browser
// -----------------------------

function getBrowser(userAgent: string) {

  if (/edg/i.test(userAgent)) {
    return "Microsoft Edge";
  }

  if (/opr|opera/i.test(userAgent)) {
    return "Opera";
  }

  if (/firefox/i.test(userAgent)) {
    return "Mozilla Firefox";
  }

  if (/chrome|crios/i.test(userAgent)) {
    return "Google Chrome";
  }

  if (/safari/i.test(userAgent)) {
    return "Safari";
  }

  return "Unknown Browser";
}



// -----------------------------
// Operating System
// -----------------------------

function getOperatingSystem(userAgent: string) {

  if (/windows/i.test(userAgent)) {
    return "Windows";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iphone|ipad|ipod/i.test(userAgent)) {
    return "iOS";
  }

  if (/mac/i.test(userAgent)) {
    return "macOS";
  }

  if (/linux/i.test(userAgent)) {
    return "Linux";
  }

  return "Unknown OS";
}



// -----------------------------
// Get IP
// -----------------------------

function getClientIp(request: Request) {

  const headers = [
    "x-vercel-forwarded-for",
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
  ];


  for (const header of headers) {

    const value =
      request.headers.get(header);


    if (!value) continue;


    const ip =
      value.split(",")[0].trim();


    if (isIP(ip)) {
      return ip;
    }

  }


  return null;
}



// =============================
// POST Create Session
// =============================

export async function POST(
  request: Request
) {

  try {

    const supabase =
      await createClient();



    // -----------------------------
    // Get Logged User
    // -----------------------------

    const {
      data:{
        user
      },

      error:userError

    } =
      await supabase.auth.getUser();



    if (
      userError ||
      !user
    ) {

      return NextResponse.json(
        {
          error:
          "Unauthorized"
        },
        {
          status:401
        }
      );

    }



    const body =
      await request.json();



    const userAgent =
      request.headers.get(
        "user-agent"
      ) || "";



    const device =
      body.device ||
      getDeviceType(userAgent);



    const browser =
      body.browser ||
      getBrowser(userAgent);



    const operatingSystem =
      body.operating_system ||
      getOperatingSystem(userAgent);



    const ip =
      getClientIp(request);





    // -----------------------------
    // Insert Session
    // -----------------------------

    const {
      error
    } =
      await supabase
        .from("user_sessions")
        .insert({

          user_id:
          user.id,


          device,


          browser,


          operating_system:
          operatingSystem,


          ip_address:
          ip,


          user_agent:
          userAgent,


          last_active_at:
          new Date()
          .toISOString(),


          status:
          "active",

        });




    if(error){

      console.error(
        "USER SESSION INSERT ERROR:",
        error.message
      );


      return NextResponse.json(
        {
          error:
          error.message
        },
        {
          status:500
        }
      );

    }




    return NextResponse.json(
      {
        success:true
      },
      {
        status:200
      }
    );



  } catch(error){


    console.error(
      "USER SESSION API ERROR:",
      error
    );


    return NextResponse.json(
      {
        error:
        "Server error"
      },
      {
        status:500
      }
    );


  }

}