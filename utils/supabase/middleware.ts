import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";


export async function updateSession(request: NextRequest) {

  let response = NextResponse.next({
    request,
  });


  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {

      cookies: {

        getAll() {
          return request.cookies.getAll();
        },


        setAll(cookiesToSet) {

          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });


          response = NextResponse.next({
            request,
          });


          cookiesToSet.forEach(({ name, value, options }) => {

            response.cookies.set(
              name,
              value,
              options
            );

          });

        },

      },

    }
  );


  const {
    data: {
      user
    },
  } = await supabase.auth.getUser();



  const { pathname } = request.nextUrl;



  // ================================
  // Dashboard Protection
  // ================================

  if (
    pathname.startsWith("/dashboard")
    &&
    !user
  ) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );

  }



  // ================================
  // Admin Protection
  // ================================

  if (
    pathname.startsWith("/admin")
  ) {


    // Not Logged In

    if (!user) {

      return NextResponse.redirect(
        new URL("/login", request.url)
      );

    }



    // Get User Role

    const {
      data: profile,
    } = await supabase
      .from("profiles")
      .select("role,status")
      .eq("id", user.id)
      .single();
      console.log("PROFILE DATA:", profile);



    // No Profile

    if (!profile) {

      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );

    }



    // Banned User

    if (
      profile.status !== "active"
    ) {

      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );

    }



    // Role Check

    if (
      profile.role !== "admin"
      &&
      profile.role !== "super_admin"
    ) {

      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );

    }


  }





  // ================================
  // Prevent Auth Pages
  // ================================

  if (

    user

    &&

    (
      pathname.startsWith("/login")
      ||
      pathname.startsWith("/signup")
      ||
      pathname.startsWith("/forgot-password")
      ||
      pathname.startsWith("/verify-email")
    )

  ) {


    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );


  }



  return response;

}