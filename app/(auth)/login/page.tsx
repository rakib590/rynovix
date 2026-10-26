"use client";

import { Suspense, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Preserve and validate destination
  const rawNext = searchParams.get("next");

  const next =
    rawNext &&
    rawNext.startsWith("/") &&
    !rawNext.startsWith("//")
      ? rawNext
      : "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // --------------------------------
  // Email / Password Login
  // --------------------------------
  const handleLogin = async () => {
    if (loading) return;

    const supabase = createClient();

    setLoading(true);
    setErrorMessage("");

    try {
      // Step 1: Authenticate user
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error || !data.user) {
        setErrorMessage(
          error?.message || "Unable to sign in. Please try again."
        );
        return;
      }

      // Step 2: Record existing login activity
      // Failure here must not prevent login.
      try {
        const activityResponse = await fetch(
          "/auth/login-activity",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              loginMethod: "email",
            }),
          }
        );

        if (!activityResponse.ok) {
          console.error(
            "LOGIN ACTIVITY REQUEST FAILED:",
            activityResponse.status
          );
        }
      } catch (activityError) {
        console.error(
          "LOGIN ACTIVITY REQUEST FAILED:",
          activityError
        );
      }

      // Step 3: Save detailed login history on the server

      // Step 3.5: Save User Session

try {

  const {
    data:{
      session
    },
  } = await supabase.auth.getSession();


  if(session?.access_token){

    const sessionResponse =
      await fetch(
        "/api/user-session",
        {
          method:"POST",

          headers:{
            Authorization:
            `Bearer ${session.access_token}`,

            "Content-Type":
            "application/json",
          },

          body:JSON.stringify({

            device:
            "Desktop",

            browser:
               navigator.userAgent.includes("Chrome")
                ? "Google Chrome"
                 : "Browser",

            operating_system:
            navigator.platform,

          }),

        }
      );


    if(!sessionResponse.ok){

      console.error(
        "SESSION SAVE FAILED"
      );

    }


  }


}catch(error){

 console.error(
  "SESSION ERROR:",
  error
 );

}

      // The API verifies the authenticated user's access token.
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error(
            "LOGIN HISTORY SESSION ERROR:",
            sessionError.message
          );
        } else if (session?.access_token) {
          const historyResponse = await fetch(
            "/api/login-history",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
              cache: "no-store",
            }
          );

          if (!historyResponse.ok) {
            const responseText =
              await historyResponse.text();

            console.error(
              "LOGIN HISTORY REQUEST FAILED:",
              historyResponse.status,
              responseText
            );
          } else {
            console.log("LOGIN HISTORY SAVED");
          }
        }
      } catch (historyError) {
        // History failure must not interrupt authentication.
        console.error(
          "LOGIN HISTORY ERROR:",
          historyError
        );
      }

      // Step 4: Check current user's role and account status
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        await supabase.auth.signOut();

        setErrorMessage(
          "Unable to verify your account. Please sign in again."
        );
        return;
      }

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("role,status")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "PROFILE LOOKUP ERROR:",
          profileError.message
        );

        setErrorMessage(
          "Unable to verify your account status. Please try again."
        );

        // Fail closed: do not redirect without verifying status.
        await supabase.auth.signOut();
        return;
      }

      if (!profile) {
        setErrorMessage(
          "Your account profile could not be found. Please contact support."
        );

        await supabase.auth.signOut();
        return;
      }

      // Step 5: Block suspended users
      if (profile.status === "suspended") {
        await supabase.auth.signOut();

        setErrorMessage(
          "Your account has been suspended. Please contact support."
        );

        return;
      }

      // Step 6: Redirect according to role
      if (
        profile.status === "active" &&
        (
          profile.role === "admin" ||
          profile.role === "super_admin"
        )
      ) {
        router.replace("/admin");
      } else {
        router.replace(next);
      }

      router.refresh();
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setErrorMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Google OAuth Login
  // --------------------------------
  const handleGoogleLogin = async () => {
    if (loading) return;

    const supabase = createClient();

    setErrorMessage("");
    setLoading(true);

    try {
      const redirectTo =
        `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

      const { data, error } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
          },
        });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        setErrorMessage(
          "Unable to start Google login. Please try again."
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error);

      setErrorMessage(
        "Unable to connect to Google. Please try again."
      );

      setLoading(false);
    }
  };

  // Signup URL
  const signupUrl =
    next === "/dashboard"
      ? "/signup"
      : `/signup?next=${encodeURIComponent(next)}`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050814] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
        <h1 className="text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Sign in to your RYNOVIX account
        </p>

        {/* Google Login */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-white py-3 font-semibold text-gray-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.207 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.046 6.053 29.277 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.046 6.053 29.277 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.176 0 9.861-1.977 13.409-5.192l-6.19-5.238C29.158 35.091 26.679 36 24 36c-5.186 0-9.623-3.329-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 01-4.084 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>

            {loading
              ? "Connecting..."
              : "Continue with Google"}
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-white/10" />

          <span className="px-4 text-sm text-gray-500">
            OR
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Email Login Form */}
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            void handleLogin();
          }}
        >
          {/* Email */}
          <div>
            <label
              htmlFor="login-email"
              className="text-sm text-gray-300"
            >
              Email
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
              disabled={loading}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 text-white outline-none transition focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="login-password"
              className="text-sm text-gray-300"
            >
              Password
            </label>

            <div className="relative mt-2">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-700 bg-[#0b1220] px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500 disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                disabled={loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white disabled:opacity-50"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error */}
          {errorMessage && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
            >
              {errorMessage}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        {/* Signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              href={signupUrl}
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#050814] px-4">
          <div className="text-center text-gray-400">
            Loading...
          </div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}