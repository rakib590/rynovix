// lib/prompts/title.ts

export type TitlePromptOptions = {
  topic: string;
  keywords?: string;
  language?: string;
  tone?: string;
  length?: string;
  audience?: string;
  category?: string;
  titleCount?: number;
  creativity?: number;
};

export function buildTitlePrompt({
  topic,
  keywords = "",
  language = "🌐 Auto Detect",
  tone = "Professional",
  length = "Medium",
  audience = "Everyone",
  category = "Education",
  titleCount = 5,
  creativity = 70,
}: TitlePromptOptions): string {
  const languageInstruction =
    language === "🌐 Auto Detect"
      ? `
- Detect the language of the Video Topic.
- Generate all titles in the same language as the Video Topic.
`
      : `
- Generate all titles in this language: ${language}
`;

  return `
You are a professional YouTube SEO and content strategy expert.

Your task is to generate exactly ${titleCount} high-quality YouTube video titles.

VIDEO TOPIC:
${topic}

ADDITIONAL KEYWORDS:
${keywords || "None provided"}

CONTENT SETTINGS:
- Language: ${language}
- Tone: ${tone}
- Length: ${length}
- Target Audience: ${audience}
- Category: ${category}
- Creativity Level: ${creativity}/100

TITLE REQUIREMENTS:
- Generate exactly ${titleCount} titles.
- Every title must be directly relevant to the video topic.
- Make titles engaging and optimized for YouTube search and click-through rate.
- Use natural curiosity and strong wording without misleading clickbait.
- Do not make false claims or promises.
- Avoid unnecessary repetition.
- Avoid duplicate or nearly identical titles.
- Keep titles natural and easy to understand.
- Match the requested tone and target audience.
- Consider the provided keywords naturally when relevant.
- Do not use excessive punctuation.
- Do not add numbering such as "1.", "2.", etc.
- Do not use markdown.
- Do not wrap titles in quotation marks.
${languageInstruction}

SCORING:
For every title, provide:
- score: overall title quality score from 0 to 100.
- ctr: estimated click-through potential from 0 to 10.
- seo: estimated YouTube SEO score from 0 to 100.

IMPORTANT:
- Return ONLY one valid JSON object.
- Do not return markdown.
- Do not return explanations.
- Do not return comments.
- Do not return text before or after the JSON.
- The JSON must contain exactly one "titles" array.
- The "titles" array must contain exactly ${titleCount} objects.
- Every object must contain exactly these fields:
  "title", "score", "ctr", "seo"

OUTPUT FORMAT:
{
  "titles": [
    {
      "title": "Example title",
      "score": 90,
      "ctr": 8.5,
      "seo": 92
    }
  ]
}
`.trim();
}

// ============================================================
// TITLE REGENERATE PROMPT
// ============================================================

export type TitleRegeneratePromptOptions = {
  topic: string;
  keywords?: string;
  language?: string;
  tone?: string;
  length?: string;
  audience?: string;
  category?: string;
  currentTitle: string;
  creativity?: number;
};

export function buildTitleRegeneratePrompt({
  topic,
  keywords = "",
  language = "🌐 Auto Detect",
  tone = "Professional",
  length = "Medium",
  audience = "Everyone",
  category = "Education",
  currentTitle,
  creativity = 70,
}: TitleRegeneratePromptOptions): string {
  const languageInstruction =
    language === "🌐 Auto Detect"
      ? `
- Detect the language of the Video Topic.
- Generate the new title in the same language as the Video Topic.
`
      : `
- Generate the new title in this language: ${language}
`;

  return `
You are a professional YouTube SEO and content strategy expert.

Your task is to create ONE improved YouTube video title.

VIDEO TOPIC:
${topic}

ADDITIONAL KEYWORDS:
${keywords || "None provided"}

CONTENT SETTINGS:
- Language: ${language}
- Tone: ${tone}
- Length: ${length}
- Target Audience: ${audience}
- Category: ${category}
- Creativity Level: ${creativity}/100

CURRENT TITLE:
${currentTitle}

REGENERATION REQUIREMENTS:
- Generate exactly ONE new title.
- The new title must remain directly relevant to the video topic.
- Improve the title compared with the current title.
- Do not simply repeat or slightly modify the current title.
- Use natural curiosity and strong wording without misleading clickbait.
- Do not make false claims or promises.
- Make it engaging and optimized for YouTube search and click-through rate.
- Consider the provided keywords naturally when relevant.
- Match the requested tone, length, audience, and category.
- Avoid unnecessary repetition.
- Avoid excessive punctuation.
- Do not use numbering.
- Do not use markdown.
- Do not wrap the title in quotation marks.
${languageInstruction}

SCORING:
For the new title, provide:
- score: overall title quality score from 0 to 100.
- ctr: estimated click-through potential from 0 to 10.
- seo: estimated YouTube SEO score from 0 to 100.

IMPORTANT:
- Return ONLY one valid JSON object.
- Do not return markdown.
- Do not return explanations.
- Do not return comments.
- Do not return text before or after the JSON.
- The JSON must contain exactly one "titles" array.
- The "titles" array must contain exactly ONE object.
- The object must contain exactly these fields:
  "title", "score", "ctr", "seo"

OUTPUT FORMAT:
{
  "titles": [
    {
      "title": "Example title",
      "score": 90,
      "ctr": 8.5,
      "seo": 92
    }
  ]
}
`.trim();
}