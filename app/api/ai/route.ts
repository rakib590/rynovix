import { NextResponse } from "next/server";
import { ai } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prompt, json = false } = body;

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          error: "Prompt is required.",
        },
        { status: 400 }
      );
    }

    const completion = await ai.chat.completions.create({
      model: process.env.AI_MODEL!,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,

      ...(json
        ? {
            response_format: {
              type: "json_object",
            },
          }
        : {}),
    });

    const result = completion.choices[0]?.message?.content;

    if (!result) {
      throw new Error("AI returned an empty response.");
    }

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error("AI API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "AI request failed.",
      },
      { status: 500 }
    );
  }
}