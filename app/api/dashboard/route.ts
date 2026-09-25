import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // =====================================================
    // AUTH
    // =====================================================

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // =====================================================
    // AUTOMATIC MONTHLY CREDIT RESET
    // =====================================================

    const { error: resetError } =
      await supabase.rpc(
        "reset_monthly_credits",
        {
          p_user_id: user.id,
        }
      );

    if (resetError) {
      console.error(
        "Monthly credit reset error:",
        resetError
      );
    }

    // =====================================================
    // PROFILE
    // =====================================================

    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select(
          "credits, plan, current_plan, credits_used, credits_reset_at"
        )
        .eq("id", user.id)
        .single();

    if (profileError) {
      throw profileError;
    }

    // =====================================================
    // PLAN CREDIT LIMIT
    // =====================================================

    const currentPlan =
      profile.plan ||
      profile.current_plan ||
      "free";

    const planCreditLimits: Record<
      string,
      number
    > = {
      free: 100,
      pro: 2000,
      business: 10000,
    };

    const monthlyCreditLimit =
      planCreditLimits[
        currentPlan.toLowerCase()
      ] ?? 100;

    // =====================================================
    // HISTORY
    // =====================================================

    const {
      data: history,
      error: historyError,
    } = await supabase
      .from("ai_history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (historyError) {
      throw historyError;
    }

    const totalGenerations =
      history?.length ?? 0;

    const totalSEOChecks =
      history?.filter(
        (item) =>
          item.tool_id === "seo-checker"
      ).length ?? 0;

    const creditsUsed =
      history?.reduce(
        (sum, item) =>
          sum +
          Number(
            item.credits_used || 0
          ),
        0
      ) ?? 0;

    const seoScores =
      history
        ?.filter(
          (item) =>
            item.tool_id ===
              "seo-checker" &&
            typeof item.score ===
              "number"
        )
        .map((item) =>
          Number(item.score)
        ) ?? [];

    const averageSEOScore =
      seoScores.length > 0
        ? Math.round(
            seoScores.reduce(
              (a, b) => a + b,
              0
            ) /
              seoScores.length
          )
        : 0;

    const recentActivity =
      history?.slice(0, 10) ?? [];

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json({
      success: true,

      statistics: {
        totalGenerations,
        totalSEOChecks,
        averageSEOScore,

        creditsUsed,

        creditsRemaining: Number(
          profile.credits || 0
        ),

        monthlyCreditLimit,

        currentPlan,

        creditsResetAt:
          profile.credits_reset_at ||
          null,
      },

      recentActivity,
    });
  } catch (error: any) {
    console.error(
      "Dashboard API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Failed to load dashboard.",
      },
      {
        status: 500,
      }
    );
  }
}