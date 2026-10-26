import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { isIP } from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


// -----------------------------
// Device Type
// -----------------------------

function getDeviceType(ua: string) {
  if (/ipad|tablet|kindle|playbook/i.test(ua)) {
    return "Tablet";
  }

  if (/mobile|android|iphone|ipod/i.test(ua)) {
    return "Mobile";
  }

  return "Desktop";
}


// -----------------------------
// Browser
// -----------------------------

function getBrowser(ua: string) {

  if (/edg/i.test(ua)) {
    return "Microsoft Edge";
  }

  if (/opr|opera/i.test(ua)) {
    return "Opera";
  }

  if (/firefox/i.test(ua)) {
    return "Mozilla Firefox";
  }

  if (/chrome|crios/i.test(ua)) {
    return "Google Chrome";
  }

  if (/safari/i.test(ua)) {
    return "Safari";
  }

  return "Unknown Browser";
}


// -----------------------------
// Operating System
// -----------------------------

function getOperatingSystem(ua: string) {

  if (/cros/i.test(ua)) {
    return "ChromeOS";
  }

  if (/windows nt/i.test(ua)) {
    return "Windows";
  }

  if (/android/i.test(ua)) {
    return "Android";
  }

  if (/iphone|ipad|ipod/i.test(ua)) {
    return "iOS";
  }

  if (/macintosh|mac os x/i.test(ua)) {
    return "macOS";
  }

  if (/linux/i.test(ua)) {
    return "Linux";
  }

  return "Unknown OS";
}


// -----------------------------
// Public IP Check
// -----------------------------

function isPublicIp(value: string) {

  const version = isIP(value);

  if (!version) return false;


  if (version === 4) {

    const [
      a,
      b,
      c
    ] = value
      .split(".")
      .map(Number);


    if (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
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
    ip.startsWith("fd")
  ) {
    return false;
  }


  const mapped =
    ip.match(
      /::ffff:(\d+\.\d+\.\d+\.\d+)$/i
    );


  if(mapped){
    return isPublicIp(mapped[1]);
  }


  return true;
}


// -----------------------------
// Get Client IP
// -----------------------------

function getClientIp(request: Request) {

  const headers = [
    "x-vercel-forwarded-for",
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
  ];


  for(const header of headers){

    const value =
      request.headers.get(header);


    if(!value) continue;


    for(
      const item of value.split(",")
    ){

      const ip =
        item.trim();


      if(isPublicIp(ip)){
        return ip;
      }

    }

  }


  return null;
}


// -----------------------------
// Header Cleaner
// -----------------------------

function cleanHeader(
  value:string | null
){

  if(!value) return null;


  const clean =
    value.trim();


  return clean.length <= 200
    ? clean
    : null;

}



// -----------------------------
// IP Details
// -----------------------------

type IpDetails = {

  country:string | null;

  city:string | null;

  isp:string | null;

};



async function getIpDetails(
  ip:string | null
):Promise<IpDetails>{


  const result:IpDetails = {

    country:null,

    city:null,

    isp:null,

  };


  if(!ip){
    return result;
  }



  try{


    const response =
      await fetch(
        `https://ipwho.is/${encodeURIComponent(ip)}`,
        {
          cache:"no-store",

          signal:
            AbortSignal.timeout(4000),
        }
      );



    if(!response.ok){
      return result;
    }



    const data =
      await response.json();



    if(data.success === false){
      return result;
    }



    result.country =
      typeof data.country === "string"
      ? data.country
      : null;



    result.city =
      typeof data.city === "string"
      ? data.city
      : null;



    result.isp =
      typeof data.connection?.isp === "string"
      ? data.connection.isp
      : null;



  }catch(error){

    console.error(
      "IP LOOKUP ERROR:",
      error
    );

  }


  return result;

}




// =============================
// Google Callback
// =============================

export async function GET(
  request:Request
){


  const requestUrl =
    new URL(request.url);



  const code =
    requestUrl.searchParams.get("code");



  const rawNext =
    requestUrl.searchParams.get("next");



  const next =
    rawNext &&
    rawNext.startsWith("/") &&
    !rawNext.startsWith("//")

    ? rawNext

    : "/dashboard";




  const loginError =
    (message:string)=>

      NextResponse.redirect(

        new URL(
          `/login?error=${encodeURIComponent(message)}`,
          requestUrl.origin
        )

      );




  if(!code){

    return loginError(
      "Google authentication failed."
    );

  }



  const supabase =
    await createClient();




  const {
    error:exchangeError
  } =
    await supabase.auth.exchangeCodeForSession(
      code
    );



  if(exchangeError){

    console.error(
      exchangeError
    );


    return loginError(
      exchangeError.message
    );

  }




  const {
    data:{
      user
    },

    error:userError

  } =
    await supabase.auth.getUser();




  if(
    userError ||
    !user
  ){

    return loginError(
      "User session failed."
    );

  }





  const {
    data:profile
  } =
    await supabase
      .from("profiles")
      .select(
        "role,status"
      )
      .eq(
        "id",
        user.id
      )
      .maybeSingle();





  if(
    !profile
  ){

    await supabase.auth.signOut();

    return loginError(
      "Profile not found."
    );

  }




  if(
    profile.status === "suspended"
  ){

    await supabase.auth.signOut();


    return loginError(
      "Account suspended."
    );

  }




  const userAgent =
    request.headers.get(
      "user-agent"
    ) || "";



  const ip =
    getClientIp(request);



  const ipDetails =
    await getIpDetails(ip);




  const country =
    cleanHeader(
      request.headers.get(
        "x-vercel-ip-country"
      )
    )
    ??
    ipDetails.country;




  const city =
    cleanHeader(
      request.headers.get(
        "x-vercel-ip-city"
      )
    )
    ??
    ipDetails.city;




  // Login History

  const {
    error:historyError
  } =
    await supabase
      .from("login_history")
      .insert({

        user_id:user.id,

        ip_address:ip,

        country,

        city,

        isp:
          ipDetails.isp,

        device_type:
          getDeviceType(userAgent),

        os:
          getOperatingSystem(userAgent),

        device:
          getDeviceType(userAgent),

        browser:
          getBrowser(userAgent),

        status:"success",

      });



  if(historyError){

    console.error(
      "LOGIN HISTORY ERROR:",
      historyError.message
    );

  }




  // Login Activity

  const {
    error:activityError
  } =
    await supabase
      .from("login_activity")
      .insert({

        user_id:user.id,

        login_method:"google",

        device_type:
          getDeviceType(userAgent),

        browser:
          getBrowser(userAgent),

        operating_system:
          getOperatingSystem(userAgent),

        user_agent:
          userAgent,

        ip_address:
          ip,

        last_active_at:
          new Date().toISOString(),

      });



  if(activityError){

    console.error(
      "LOGIN ACTIVITY ERROR:",
      activityError.message
    );

  }




  // -----------------------------
// Google User Session
// -----------------------------

const {
  error:sessionError
} =
await supabase
  .from("user_sessions")
  .insert({

    user_id:user.id,

    device:
      getDeviceType(userAgent),

    browser:
      getBrowser(userAgent),

    operating_system:
      getOperatingSystem(userAgent),

    ip_address:
      ip,

    user_agent:
      userAgent,

    status:
      "active",

    last_active_at:
      new Date().toISOString(),

  });



if(sessionError){

  console.error(
    "GOOGLE USER SESSION ERROR:",
    sessionError.message
  );

}




  // Admin Redirect

  if(
    profile.status === "active" &&
    (
      profile.role === "admin" ||
      profile.role === "super_admin"
    )
  ){

    return NextResponse.redirect(
      new URL(
        "/admin",
        requestUrl.origin
      )
    );

  }




  return NextResponse.redirect(
    new URL(
      next,
      requestUrl.origin
    )
  );


}