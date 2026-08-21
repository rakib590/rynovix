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
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ===== DEBUG LOGS =====
  console.log("====================================");
  console.log("PATH:", pathname);
  console.log("USER:", user?.email ?? "NO USER");
  console.log(
    "SUPABASE COOKIES:",
    request.cookies
      .getAll()
      .filter((cookie) => cookie.name.startsWith("sb-"))
      .map((cookie) => cookie.name)
  );
  console.log("====================================");

  // Protect Dashboard
  if (pathname.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent logged-in users from visiting auth pages
  if (
    user &&
    (
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/forgot-password") ||
      pathname.startsWith("/verify-email")
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}