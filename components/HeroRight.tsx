
"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Sparkles, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const FEATURES = [
  {
    title: "32 AI Creator Tools",
    status: "Available Now",
  },
  {
    title: "Content & SEO AI",
    status: "Ready to Use",
  },
  {
    title: "All-in-One Platform",
    status: "Explore RYNOVIX",
  },
];

export default function HeroRight() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let active = true;

    const checkUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (active) {
          setLoggedIn(Boolean(user));
        }
      } catch (error) {
        console.error("Unable to check authentication:", error);

        if (active) {
          setLoggedIn(false);
        }
      } finally {
        if (active) {
          setCheckingAuth(false);
        }
      }
    };

    void checkUser();

    return () => {
      active = false;
    };
  }, []);

  const handleGetStarted = () => {
    router.push(
      loggedIn ? "/dashboard" : "/signup"
    );
  };

  const handleExploreTools = () => {
    router.push(
      loggedIn ? "/dashboard/tools" : "/login?next=%2Fdashboard%2Ftools"
    );
  };

  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center lg:items-start">
      {/* Action Buttons */}
      <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start">
        <button
          type="button"
          onClick={handleGetStarted}
          disabled={checkingAuth}
          className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-sky-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-8 sm:text-lg"
        >
          {checkingAuth ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Zap
              className="h-5 w-5 fill-yellow-400 text-yellow-400"
              aria-hidden="true"
            />
          )}
          Get Started Free
        </button>

        <button
          type="button"
          onClick={handleExploreTools}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 text-base font-semibold text-white transition-colors duration-300 hover:border-blue-400/40 hover:bg-white/[0.06] sm:w-auto sm:px-8 sm:text-lg"
        >
          <Sparkles className="h-5 w-5 text-blue-400" aria-hidden="true" />
          Explore Tools
        </button>
      </div>

      {/* Platform Features */}
      <div className="mt-10 grid w-full grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {FEATURES.map((item) => (
          <div
            key={item.title}
            className="flex min-w-0 items-center gap-3 sm:gap-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-500/25 bg-cyan-500/5 sm:h-12 sm:w-12">
              <Check
                className="h-5 w-5 text-cyan-400 sm:h-6 sm:w-6"
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <h4 className="text-base font-semibold leading-snug text-white sm:text-lg">
                {item.title}
              </h4>

              <p className="mt-1 text-sm leading-snug text-slate-400">
                {item.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
