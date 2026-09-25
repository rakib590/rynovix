import { NextResponse } from "next/server";
import { ai } from "@/lib/ai";
import { createClient } from "@/lib/supabase/server";
import {
  getCreditCost,
  type AIToolId,
} from "@/lib/billing/credits";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      prompt,
      json = false,
      toolId,
      count,
      action,
    } = body;

    // ----------------------------------------------------------
    // BASIC VALIDATION
    // ----------------------------------------------------------

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Prompt is required.",
        },
        { status: 400 }
      );
    }

    const validToolIds: AIToolId[] = [
      "title-generator",
      "description-generator",
      "hashtag-generator",
      "tags-generator",
      "script-writer",
      "shorts-ideas",
      "thumbnail-title",
      "seo-checker",
      "keyword-generator",
      "best-upload-time",
    ];

    if (
      !toolId ||
      !validToolIds.includes(toolId as AIToolId)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or missing AI tool.",
        },
        { status: 400 }
      );
    }

    const aiToolId = toolId as AIToolId;

    // ----------------------------------------------------------
    // MAX TOKENS
    // ----------------------------------------------------------

    const maxTokensByTool: Record<AIToolId, number> = {
      "title-generator": 1000,
      "description-generator": 1600,
      "hashtag-generator": 500,
      "tags-generator": 500,
      "script-writer": 4000,
      "shorts-ideas": 2000,
      "thumbnail-title": 500,
      "seo-checker": 2000,
      "keyword-generator": 1000,
      "best-upload-time": 1000,
    };

    const maxCompletionTokens =
      maxTokensByTool[aiToolId];

    // ----------------------------------------------------------
    // CREDIT CALCULATION
    // ----------------------------------------------------------

    let creditCost: number;

    try {
      if (
        action === "regenerate" &&
        (
          aiToolId === "shorts-ideas" ||
          aiToolId === "thumbnail-title" ||
          aiToolId === "best-upload-time"
        )
      ) {
        creditCost = 2;
      } else {
        const normalizedCount =
          count !== undefined
            ? Number(count)
            : undefined;

        creditCost = getCreditCost(
          aiToolId,
          normalizedCount
        );
      }
    } catch (error: any) {
      console.error(
        "Credit calculation error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error:
            error?.message ||
            "Invalid credit configuration.",
        },
        { status: 400 }
      );
    }

    // ----------------------------------------------------------
    // SUPABASE USER
    // ----------------------------------------------------------

    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You must be logged in to use AI tools.",
        },
        { status: 401 }
      );
    }

    // ----------------------------------------------------------
    // MONTHLY CREDIT RESET
    // ----------------------------------------------------------
    // The database plan is authoritative.
    //
    // Free    -> 100 credits
    // Pro     -> 2,000 credits
    // Business-> 10,000 credits
    //
    // If a paid subscription ends, the billing/webhook system
    // must change plan back to "free". Then the next reset
    // automatically uses the Free limit.
    // ----------------------------------------------------------

    const { error: resetError } =
      await supabase.rpc(
        "reset_monthly_credits"
      );

    if (resetError) {
      console.error(
        "Monthly credit reset error:",
        resetError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to verify monthly credits.",
        },
        { status: 500 }
      );
    }

    // ----------------------------------------------------------
    // USER PROFILE
    // ----------------------------------------------------------

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select(
        "credits, plan, current_plan, credits_used, credits_reset_at"
      )
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error(
        "Profile error:",
        profileError
      );

      return NextResponse.json(
        {
          success: false,
          error: "User profile not found.",
        },
        { status: 404 }
      );
    }

    // ----------------------------------------------------------
    // CURRENT PLAN
    // ----------------------------------------------------------
    // IMPORTANT:
    // The plan comes from the database.
    // Frontend values are never trusted.
    // ----------------------------------------------------------

    const rawPlan =
      profile.plan ||
      profile.current_plan ||
      "free";

    const normalizedPlan =
      String(rawPlan).toLowerCase();

    const validPlans = [
      "free",
      "pro",
      "business",
    ];

    const currentPlan = validPlans.includes(
      normalizedPlan
    )
      ? normalizedPlan
      : "free";

    // ----------------------------------------------------------
    // PLAN CREDIT LIMIT
    // ----------------------------------------------------------

    const planCreditLimits: Record<
      string,
      number
    > = {
      free: 100,
      pro: 2000,
      business: 10000,
    };

    const monthlyCreditLimit =
      planCreditLimits[currentPlan];

    // ----------------------------------------------------------
    // CURRENT CREDITS
    // ----------------------------------------------------------

    const currentCredits = Number(
      profile.credits ?? 0
    );

    // ----------------------------------------------------------
    // CREDIT VALIDATION
    // ----------------------------------------------------------

    if (currentCredits < 0) {
      console.error(
        "Invalid negative credit balance:",
        {
          userId: user.id,
          currentCredits,
          currentPlan,
        }
      );

      return NextResponse.json(
        {
          success: false,
          error: "Invalid credit balance.",
        },
        { status: 500 }
      );
    }

    if (currentCredits < creditCost) {
      return NextResponse.json(
        {
          success: false,
          error: `Not enough credits. You need ${creditCost} credit${
            creditCost === 1 ? "" : "s"
          }, but you only have ${currentCredits}.`,
          code: "INSUFFICIENT_CREDITS",
          credits: currentCredits,
          requiredCredits: creditCost,
          plan: currentPlan,
          monthlyCreditLimit,
        },
        { status: 402 }
      );
    }

    // ----------------------------------------------------------
    // MODEL DETECTION
    // ----------------------------------------------------------

    const modelName =
      process.env.AI_MODEL?.toLowerCase() || "";

    const isGptOss =
      modelName.includes("gpt-oss-120b") ||
      modelName.includes("gpt-oss-20b");

    // ----------------------------------------------------------
    // MAIN JSON SCHEMAS
    // ----------------------------------------------------------

    const jsonSchemas: Partial<
      Record<AIToolId, any>
    > = {
      "title-generator": {
        name: "title_generator_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            titles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  score: {
                    type: "number",
                  },
                  ctr: {
                    type: "number",
                  },
                  seo: {
                    type: "number",
                  },
                },
                required: [
                  "title",
                  "score",
                  "ctr",
                  "seo",
                ],
                additionalProperties: false,
              },
            },
          },
          required: ["titles"],
          additionalProperties: false,
        },
      },

      "description-generator": {
        name: "description_generator_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            descriptions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  score: {
                    type: "number",
                  },
                  seo: {
                    type: "number",
                  },
                  engagement: {
                    type: "number",
                  },
                },
                required: [
                  "description",
                  "score",
                  "seo",
                  "engagement",
                ],
                additionalProperties: false,
              },
            },
          },
          required: ["descriptions"],
          additionalProperties: false,
        },
      },

      "hashtag-generator": {
        name: "hashtag_generator_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            hashtags: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          required: ["hashtags"],
          additionalProperties: false,
        },
      },

      "tags-generator": {
        name: "tags_generator_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  tags: {
                    type: "string",
                  },
                  score: {
                    type: "number",
                  },
                  ctr: {
                    type: "number",
                  },
                  seo: {
                    type: "number",
                  },
                  trending: {
                    type: "number",
                  },
                  viral: {
                    type: "number",
                  },
                },
                required: [
                  "tags",
                  "score",
                  "ctr",
                  "seo",
                  "trending",
                  "viral",
                ],
                additionalProperties: false,
              },
            },
          },
          required: ["results"],
          additionalProperties: false,
        },
      },

      "script-writer": {
        name: "script_writer_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  hook: {
                    type: "string",
                  },
                  script: {
                    type: "string",
                  },
                  score: {
                    type: "number",
                  },
                  engagement: {
                    type: "number",
                  },
                  structure: {
                    type: "number",
                  },
                },
                required: [
                  "title",
                  "hook",
                  "script",
                  "score",
                  "engagement",
                  "structure",
                ],
                additionalProperties: false,
              },
            },
          },
          required: ["results"],
          additionalProperties: false,
        },
      },

      "shorts-ideas": {
        name: "shorts_ideas_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  hook: {
                    type: "string",
                  },
                  concept: {
                    type: "string",
                  },
                  structure: {
                    type: "string",
                  },
                  cta: {
                    type: "string",
                  },
                  score: {
                    type: "number",
                  },
                  viral: {
                    type: "number",
                  },
                  engagement: {
                    type: "number",
                  },
                },
                required: [
                  "title",
                  "hook",
                  "concept",
                  "structure",
                  "cta",
                  "score",
                  "viral",
                  "engagement",
                ],
                additionalProperties: false,
              },
            },
          },
          required: ["results"],
          additionalProperties: false,
        },
      },

      "thumbnail-title": {
        name: "thumbnail_title_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  score: {
                    type: "number",
                  },
                  ctr: {
                    type: "number",
                  },
                  curiosity: {
                    type: "number",
                  },
                  engagement: {
                    type: "number",
                  },
                },
                required: [
                  "title",
                  "score",
                  "ctr",
                  "curiosity",
                  "engagement",
                ],
                additionalProperties: false,
              },
            },
          },
          required: ["results"],
          additionalProperties: false,
        },
      },

      "seo-checker": {
        name: "seo_checker_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            overallScore: {
              type: "number",
            },
            titleScore: {
              type: "number",
            },
            descriptionScore: {
              type: "number",
            },
            keywordScore: {
              type: "number",
            },
            searchIntentScore: {
              type: "number",
            },
            readabilityScore: {
              type: "number",
            },
            strengths: {
              type: "array",
              items: {
                type: "string",
              },
            },
            improvements: {
              type: "array",
              items: {
                type: "string",
              },
            },
            recommendations: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          required: [
            "overallScore",
            "titleScore",
            "descriptionScore",
            "keywordScore",
            "searchIntentScore",
            "readabilityScore",
            "strengths",
            "improvements",
            "recommendations",
          ],
          additionalProperties: false,
        },
      },

      "keyword-generator": {
        name: "keyword_generator_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  keyword: {
                    type: "string",
                  },
                  score: {
                    type: "number",
                  },
                  searchIntent: {
                    type: "number",
                  },
                  relevance: {
                    type: "number",
                  },
                  opportunity: {
                    type: "number",
                  },
                },
                required: [
                  "keyword",
                  "score",
                  "searchIntent",
                  "relevance",
                  "opportunity",
                ],
                additionalProperties: false,
              },
            },
          },
          required: ["results"],
          additionalProperties: false,
        },
      },

      "best-upload-time": {
        name: "best_upload_time_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: {
                    type: "string",
                  },
                  time: {
                    type: "string",
                  },
                  score: {
                    type: "number",
                  },
                  reason: {
                    type: "string",
                  },
                  audienceActivity: {
                    type: "number",
                  },
                  competition: {
                    type: "number",
                  },
                  recommendation: {
                    type: "string",
                  },
                },
                required: [
                  "day",
                  "time",
                  "score",
                  "reason",
                  "audienceActivity",
                  "competition",
                  "recommendation",
                ],
                additionalProperties: false,
              },
            },
          },
          required: ["results"],
          additionalProperties: false,
        },
      },
    };

    // ----------------------------------------------------------
    // REGENERATE JSON SCHEMAS
    // ----------------------------------------------------------

    const regenerateJsonSchemas: Partial<
      Record<AIToolId, any>
    > = {
      "script-writer": {
        name: "script_writer_regenerate_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            hook: {
              type: "string",
            },
            script: {
              type: "string",
            },
            score: {
              type: "number",
            },
            engagement: {
              type: "number",
            },
            structure: {
              type: "number",
            },
          },
          required: [
            "title",
            "hook",
            "script",
            "score",
            "engagement",
            "structure",
          ],
          additionalProperties: false,
        },
      },

      "shorts-ideas": {
        name: "shorts_ideas_regenerate_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            hook: {
              type: "string",
            },
            concept: {
              type: "string",
            },
            structure: {
              type: "string",
            },
            cta: {
              type: "string",
            },
            score: {
              type: "number",
            },
            viral: {
              type: "number",
            },
            engagement: {
              type: "number",
            },
          },
          required: [
            "title",
            "hook",
            "concept",
            "structure",
            "cta",
            "score",
            "viral",
            "engagement",
          ],
          additionalProperties: false,
        },
      },

      "thumbnail-title": {
        name: "thumbnail_title_regenerate_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            score: {
              type: "number",
            },
            ctr: {
              type: "number",
            },
            curiosity: {
              type: "number",
            },
            engagement: {
              type: "number",
            },
          },
          required: [
            "title",
            "score",
            "ctr",
            "curiosity",
            "engagement",
          ],
          additionalProperties: false,
        },
      },
    };

    // ----------------------------------------------------------
    // AI REQUEST
    // ----------------------------------------------------------

    const aiRequest: any = {
      model: process.env.AI_MODEL!,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_completion_tokens:
        maxCompletionTokens,

      ...(isGptOss
        ? {
            include_reasoning: false,
            reasoning_effort: "low",
          }
        : {}),
    };

    // ----------------------------------------------------------
    // JSON RESPONSE FORMAT
    // ----------------------------------------------------------

    if (json) {
      const schema =
        action === "regenerate"
          ? regenerateJsonSchemas[aiToolId]
          : jsonSchemas[aiToolId];

      if (isGptOss && schema) {
        aiRequest.response_format = {
          type: "json_schema",
          json_schema: schema,
        };
      } else if (isGptOss) {
        aiRequest.response_format = {
          type: "json_object",
        };
      }
    }

    // ----------------------------------------------------------
    // AI GENERATION
    // ----------------------------------------------------------

    const completion =
      await ai.chat.completions.create(
        aiRequest
      );

    const result =
      completion.choices[0]?.message?.content;

    if (!result?.trim()) {
      throw new Error(
        "AI returned an empty response."
      );
    }

    // ----------------------------------------------------------
    // DEDUCT CREDITS
    // ----------------------------------------------------------

    const {
      data: deductionResult,
      error: deductionError,
    } = await supabase.rpc(
      "deduct_credits",
      {
        p_user_id: user.id,
        p_cost: creditCost,
      }
    );

    if (deductionError) {
      console.error(
        "Credit deduction error:",
        deductionError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "AI generation succeeded, but credits could not be updated. Please contact support.",
        },
        { status: 500 }
      );
    }

    if (!deductionResult?.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            deductionResult?.error ||
            "Unable to deduct credits.",
          code:
            deductionResult?.error ===
            "Not enough credits."
              ? "INSUFFICIENT_CREDITS"
              : "CREDIT_DEDUCTION_FAILED",
          credits:
            deductionResult?.credits ??
            currentCredits,
          requiredCredits: creditCost,
          plan: currentPlan,
          monthlyCreditLimit,
        },
        { status: 402 }
      );
    }

    // ----------------------------------------------------------
    // SAVE HISTORY
    // ----------------------------------------------------------

    try {
      let parsedResult: any = null;

      try {
        parsedResult = JSON.parse(result);
      } catch {
        parsedResult = result;
      }

      let score: number | null = null;

      if (
        parsedResult &&
        typeof parsedResult === "object"
      ) {
        if (
          typeof parsedResult.overallScore ===
          "number"
        ) {
          score =
            parsedResult.overallScore;
        }
      }

      const toolNames: Record<
        AIToolId,
        string
      > = {
        "title-generator":
          "Title Generator",
        "description-generator":
          "Description Generator",
        "hashtag-generator":
          "Hashtag Generator",
        "tags-generator":
          "Tags Generator",
        "script-writer":
          "Script Writer",
        "shorts-ideas":
          "Shorts Ideas",
        "thumbnail-title":
          "Thumbnail Title",
        "seo-checker":
          "SEO Checker",
        "keyword-generator":
          "Keyword Generator",
        "best-upload-time":
          "Best Upload Time",
      };

      await supabase
        .from("ai_history")
        .insert({
          user_id: user.id,
          tool_id: aiToolId,
          tool_name:
            toolNames[aiToolId],
          title:
            toolNames[aiToolId],
          prompt,
          result: parsedResult,
          score,
          credits_used: creditCost,
        });
    } catch (historyError) {
      console.error(
        "History save failed:",
        historyError
      );
    }

    // ----------------------------------------------------------
    // SUCCESS RESPONSE
    // ----------------------------------------------------------

    return NextResponse.json({
      success: true,
      result,
      credits:
        deductionResult.credits,
      creditsUsed: creditCost,
      toolId: aiToolId,
      action:
        action || "generate",
      plan: currentPlan,
      monthlyCreditLimit,
      creditsResetAt:
        profile.credits_reset_at ||
        null,
    });
  } catch (error: any) {
    console.error(
      "AI API ERROR:",
      error
    );

    const groqError =
      error?.error || error;

    const failedGeneration =
      groqError?.failed_generation;

    console.error(
      "Groq failed_generation:",
      failedGeneration
    );

    return NextResponse.json(
      {
        success: false,
        error:
          groqError?.message ||
          error?.message ||
          "AI request failed.",

        ...(process.env.NODE_ENV !==
          "production" &&
        failedGeneration
          ? {
              failed_generation:
                failedGeneration,
            }
          : {}),
      },
      { status: 500 }
    );
  }
}