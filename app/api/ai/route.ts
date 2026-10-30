import { NextResponse } from "next/server";
import { ai } from "@/lib/ai";
import { createClient } from "@/lib/supabase/server";
import {
  getCreditCost,
  type AIToolId,
} from "@/lib/billing/credits";

export async function POST(req: Request) {
  try {
    
let body: unknown;

try {
  body = await req.json();
} catch {
  return NextResponse.json(
    {
      success: false,
      error: "Invalid JSON request body.",
    },
    { status: 400 }
  );
}

if (
  !body ||
  typeof body !== "object" ||
  Array.isArray(body)
) {
  return NextResponse.json(
    {
      success: false,
      error: "Invalid request body.",
    },
    { status: 400 }
  );
}

const payload = body as Record<string, unknown>;

const prompt = payload.prompt;
const json = payload.json;
const toolId = payload.toolId;
const count = payload.count;
const action = payload.action;
const words = payload.words;
const seconds = payload.seconds;


    // ----------------------------------------------------------
    // BASIC VALIDATION
    // ----------------------------------------------------------


if (
  typeof prompt !== "string" ||
  !prompt.trim()
) {
  return NextResponse.json(
    {
      success: false,
      error: "Prompt is required.",
    },
    { status: 400 }
  );
}

const cleanPrompt = prompt.trim();

if (cleanPrompt.length > 20000) {
  return NextResponse.json(
    {
      success: false,
      error: "Prompt is too long. Maximum 20,000 characters allowed.",
    },
    { status: 400 }
  );
}

if (
  json !== undefined &&
  typeof json !== "boolean"
) {
  return NextResponse.json(
    {
      success: false,
      error: "Invalid JSON response option.",
    },
    { status: 400 }
  );
}

if (
  action !== undefined &&
  action !== "generate" &&
  action !== "regenerate"
) {
  return NextResponse.json(
    {
      success: false,
      error: "Invalid AI action.",
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
      "ai-chat-assistant",
      "ai-image-generator",
      "ai-video-generator",
      "ai-voice-generator",
      "ai-image-editor",
      "ai-background-remover",
      "ai-photo-enhancer",
      "ai-clothes-changer",
      "ai-image-upscaler",
      "ai-avatar-generator",
      "ai-ui-mockup-generator",
      "ai-logo-generator",
      "ai-color-palette-generator",
      "image-converter",
      "video-prompt-enhancer",
      "video-hook-generator",
      "ai-b-roll-generator",
      "ai-video-scene-splitter",
      "ai-subtitle-generator",
      "ai-voice-sync-tool",
      "ai-video-enhancer",
      "ai-video-workflow-automation",
    ];

    if (
  !toolId ||
  typeof toolId !== "string" ||
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

const normalizedCount =
  count !== undefined ? Number(count) : undefined;

const normalizedWords =
  words !== undefined ? Number(words) : undefined;

const normalizedSeconds =
  seconds !== undefined ? Number(seconds) : undefined;

if (
  normalizedCount !== undefined &&
  (!Number.isSafeInteger(normalizedCount) ||
    normalizedCount < 1)
) {
  return NextResponse.json(
    {
      success: false,
      error: "Invalid result count.",
    },
    { status: 400 }
  );
}

if (
  normalizedWords !== undefined &&
  (!Number.isSafeInteger(normalizedWords) ||
    normalizedWords < 1)
) {
  return NextResponse.json(
    {
      success: false,
      error: "Invalid word count.",
    },
    { status: 400 }
  );
}

if (
  normalizedSeconds !== undefined &&
  (!Number.isFinite(normalizedSeconds) ||
    normalizedSeconds <= 0)
) {
  return NextResponse.json(
    {
      success: false,
      error: "Invalid duration.",
    },
    { status: 400 }
  );
}

    // This endpoint uses an OpenAI-compatible TEXT chat model.
    // Image/video/audio processing needs dedicated provider endpoints.
    const mediaTools: AIToolId[] = [
      "ai-image-generator",
      "ai-video-generator",
      "ai-voice-generator",
      "ai-image-editor",
      "ai-background-remover",
      "ai-photo-enhancer",
      "ai-clothes-changer",
      "ai-image-upscaler",
      "ai-avatar-generator",
      "ai-ui-mockup-generator",
      "ai-logo-generator",
      "ai-b-roll-generator",
      "ai-video-scene-splitter",
      "ai-subtitle-generator",
      "ai-voice-sync-tool",
      "ai-video-enhancer",
      "ai-video-workflow-automation",
      "ai-color-palette-generator",
      "image-converter",
    ];

    if (mediaTools.includes(aiToolId)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This tool requires its dedicated image, video, audio, or browser-processing endpoint. It cannot run through the text AI endpoint yet.",
          code: "DEDICATED_TOOL_ENDPOINT_REQUIRED",
          toolId: aiToolId,
        },
        { status: 501 }
      );
    }

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
      "ai-chat-assistant": 3000,
      "video-prompt-enhancer": 2000,
      "video-hook-generator": 1200,
      // Dedicated media/code tools are rejected above.
      "ai-image-generator": 1000,
      "ai-video-generator": 1000,
      "ai-voice-generator": 1000,
      "ai-image-editor": 1000,
      "ai-background-remover": 1000,
      "ai-photo-enhancer": 1000,
      "ai-clothes-changer": 1000,
      "ai-image-upscaler": 1000,
      "ai-avatar-generator": 1000,
      "ai-ui-mockup-generator": 1000,
      "ai-logo-generator": 1000,
      "ai-color-palette-generator": 1000,
      "image-converter": 1000,
      "ai-b-roll-generator": 1000,
      "ai-video-scene-splitter": 1000,
      "ai-subtitle-generator": 1000,
      "ai-voice-sync-tool": 1000,
      "ai-video-enhancer": 1000,
      "ai-video-workflow-automation": 1000,
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
        creditCost = getCreditCost(
          aiToolId,
          normalizedCount,
          {
            words: normalizedWords,
            seconds: normalizedSeconds,
          }
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

    if (
      !Number.isFinite(currentCredits) ||
      currentCredits < 0
    ) {
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
          content: cleanPrompt,
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
      } else {
        aiRequest.response_format = {
          type: "json_object",
        };
      }
    }
    
 // ----------------------------------------------------------
// RESERVE / DEDUCT CREDITS BEFORE AI GENERATION
// ----------------------------------------------------------

let deductionResult: {
  success: boolean;
  credits?: number;
  error?: string;
} = {
  success: true,
  credits: currentCredits,
};

let creditsDeducted = false;

if (creditCost > 0) {
  const {
    data,
    error: deductionError,
  } = await supabase.rpc("deduct_credits", {
    p_user_id: user.id,
    p_cost: creditCost,
  });

  if (deductionError) {
    console.error(
      "Credit deduction error:",
      deductionError
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to reserve credits for this AI request.",
      },
      { status: 500 }
    );
  }

  if (!data?.success) {
    return NextResponse.json(
      {
        success: false,
        error:
          data?.error || "Unable to deduct credits.",
        code:
          data?.error === "Not enough credits."
            ? "INSUFFICIENT_CREDITS"
            : "CREDIT_DEDUCTION_FAILED",
        credits:
          data?.credits ?? currentCredits,
        requiredCredits: creditCost,
        plan: currentPlan,
        monthlyCreditLimit,
      },
      {
        status:
          data?.error === "Not enough credits."
            ? 402
            : 500,
      }
    );
  }

  deductionResult = data;
  creditsDeducted = true;
}

// ----------------------------------------------------------
// AI GENERATION
// ----------------------------------------------------------

let result: string;

try {
  const completion =
    await ai.chat.completions.create(
      aiRequest
    );

  const generatedContent =
    completion.choices[0]?.message?.content;

  if (!generatedContent?.trim()) {
    throw new Error(
      "AI returned an empty response."
    );
  }

  result = generatedContent;
} catch (generationError) {
  // --------------------------------------------------------
  // REFUND CREDITS IF AI GENERATION FAILS
  // --------------------------------------------------------

  if (creditsDeducted && creditCost > 0) {
    const {
      data: refundData,
      error: refundError,
    } = await supabase.rpc(
      "refund_credits",
      {
        p_user_id: user.id,
        p_cost: creditCost,
      }
    );

    if (refundError || !refundData?.success) {
      console.error(
        "Credit refund failed:",
        refundError || refundData
      );

      throw new Error(
        "AI generation failed and the automatic credit refund could not be completed. Please contact support."
      );
    }

    deductionResult = refundData;
    creditsDeducted = false;
  }

  throw generationError;
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
        "ai-chat-assistant": "AI Chat Assistant",
        "ai-image-generator": "AI Image Generator",
        "ai-video-generator": "AI Video Generator",
        "ai-voice-generator": "AI Voice Generator",
        "ai-image-editor": "AI Image Editor",
        "ai-background-remover": "AI Background Remover",
        "ai-photo-enhancer": "AI Photo Enhancer",
        "ai-clothes-changer": "AI Clothes Changer",
        "ai-image-upscaler": "AI Image Upscaler",
        "ai-avatar-generator": "AI Avatar Generator",
        "ai-ui-mockup-generator": "AI UI Mockup Generator",
        "ai-logo-generator": "AI Logo Generator",
        "ai-color-palette-generator": "AI Color Palette Generator",
        "image-converter": "Image Converter",
        "video-prompt-enhancer": "Video Prompt Enhancer",
        "video-hook-generator": "Video Hook Generator",
        "ai-b-roll-generator": "AI B-Roll Generator",
        "ai-video-scene-splitter": "AI Video Scene Splitter",
        "ai-subtitle-generator": "AI Subtitle Generator",
        "ai-voice-sync-tool": "AI Voice Sync Tool",
        "ai-video-enhancer": "AI Video Enhancer",
        "ai-video-workflow-automation": "AI Video Workflow Automation",
      };
      
      const { data: historyData, error: historyError } =
  await supabase
    .from("ai_history")
    .insert({
      user_id: user.id,
      tool_id: aiToolId,
      tool_name: toolNames[aiToolId],
      title: toolNames[aiToolId],
      prompt: cleanPrompt,
      result: parsedResult,
      score,
      credits_used: creditCost,
    })
    .select()
    .single();


if (historyError) {

  console.error(
    "AI HISTORY INSERT ERROR:",
    {
      message: historyError.message,
      details: historyError.details,
      hint: historyError.hint,
      code: historyError.code,
    }
  );

} else {

  console.log("AI HISTORY SAVED:", {
    historyId: historyData?.id,
    toolId: aiToolId,
  });

}
    } catch (historyError) {
      console.error(
        "History save failed:",
        historyError
      );
    }
    
        // ----------------------------------------------------------
    // CREATE AI GENERATION NOTIFICATION
    // ----------------------------------------------------------

    try {
      const { data: notificationPreference } =
        await supabase
          .from("notification_preferences")
          .select("ai_generation_complete")
          .eq("user_id", user.id)
          .maybeSingle();

      // Default to true if preference row does not exist
      const shouldNotify =
        notificationPreference?.ai_generation_complete ??
        true;

      if (shouldNotify) {
        const toolNames: Record<AIToolId, string> = {
          "title-generator": "Title Generator",
          "description-generator":
            "Description Generator",
          "hashtag-generator": "Hashtag Generator",
          "tags-generator": "Tags Generator",
          "script-writer": "Script Writer",
          "shorts-ideas": "Shorts Ideas",
          "thumbnail-title": "Thumbnail Title",
          "seo-checker": "SEO Checker",
          "keyword-generator": "Keyword Generator",
          "best-upload-time":
            "Best Upload Time",
          "ai-chat-assistant": "AI Chat Assistant",
          "ai-image-generator": "AI Image Generator",
          "ai-video-generator": "AI Video Generator",
          "ai-voice-generator": "AI Voice Generator",
          "ai-image-editor": "AI Image Editor",
          "ai-background-remover": "AI Background Remover",
          "ai-photo-enhancer": "AI Photo Enhancer",
          "ai-clothes-changer": "AI Clothes Changer",
          "ai-image-upscaler": "AI Image Upscaler",
          "ai-avatar-generator": "AI Avatar Generator",
          "ai-ui-mockup-generator": "AI UI Mockup Generator",
          "ai-logo-generator": "AI Logo Generator",
          "ai-color-palette-generator": "AI Color Palette Generator",
          "image-converter": "Image Converter",
          "video-prompt-enhancer": "Video Prompt Enhancer",
          "video-hook-generator": "Video Hook Generator",
          "ai-b-roll-generator": "AI B-Roll Generator",
          "ai-video-scene-splitter": "AI Video Scene Splitter",
          "ai-subtitle-generator": "AI Subtitle Generator",
          "ai-voice-sync-tool": "AI Voice Sync Tool",
          "ai-video-enhancer": "AI Video Enhancer",
          "ai-video-workflow-automation": "AI Video Workflow Automation",
        };
        
        const { data: notificationData, error: notificationError } =
        await supabase
    .from("notifications")
    .insert({
      user_id: user.id,
      type: "ai_generation_complete",
      title: "AI Generation Complete",
      message: `${toolNames[aiToolId]} finished generating your content.`,
      link: `/dashboard/tools/${aiToolId}`,
      metadata: {
        tool_id: aiToolId,
        action: action || "generate",
        credits_used: creditCost,
      },
    })
    .select()
    .single();

if (notificationError) {
  console.error(
    "NOTIFICATION INSERT ERROR:",
    {
      message: notificationError.message,
      details: notificationError.details,
      hint: notificationError.hint,
      code: notificationError.code,
    }
  );
} else {
  console.log(
    "AI NOTIFICATION CREATED:",
    notificationData
  );
}
      }
    } catch (notificationError) {
      // Notification failure must never break AI generation
      console.error(
        "AI notification creation failed:",
        notificationError
      );
    }

    // ----------------------------------------------------------
    // SUCCESS RESPONSE
    // ----------------------------------------------------------

    const updatedCredits =
      typeof deductionResult?.credits === "number"
        ? deductionResult.credits
        : currentCredits;

    return NextResponse.json({
      success: true,
      result,
      credits: updatedCredits,
      creditsUsed: creditCost,
      toolId: aiToolId,
      action: action || "generate",
      plan: currentPlan,
      monthlyCreditLimit,
      creditsResetAt: profile.credits_reset_at || null,
    });

  } catch (error: unknown) {
    console.error("AI API ERROR:", error);

    const apiError = error as {
      error?: {
        message?: string;
        failed_generation?: unknown;
      };
      message?: string;
      failed_generation?: unknown;
    };

    const groqError = apiError?.error || apiError;

    const failedGeneration =
      groqError?.failed_generation ||
      apiError?.failed_generation;

    console.error(
      "Groq failed_generation:",
      failedGeneration
    );

    return NextResponse.json(
      {
        success: false,
        error:
          groqError?.message ||
          apiError?.message ||
          "AI request failed.",

        ...(process.env.NODE_ENV !== "production" &&
        failedGeneration
          ? {
              failed_generation: failedGeneration,
            }
          : {}),
      },
      { status: 500 }
    );
  }
}