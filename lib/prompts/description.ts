// lib/prompts/description.ts

export type DescriptionPromptOptions = {
  topic: string;
  keywords?: string;
  language?: string;
  tone?: string;
  length?: string;
  audience?: string;
  category?: string;
  descriptionCount?: number;
  creativity?: number;
};

export function buildDescriptionPrompt({
  topic,
  keywords = "",
  language = "🌐 Auto Detect",
  tone = "Professional",
  length = "Medium",
  audience = "Everyone",
  category = "Education",
  descriptionCount = 5,
  creativity = 70,
}: DescriptionPromptOptions): string {
  const languageInstruction =
    language === "🌐 Auto Detect"
      ? `
- Detect the language of the Video Topic.
- Generate all descriptions in the same language as the Video Topic.
`
      : `
- Generate all descriptions in this language: ${language}
`;

  return `
You are a professional YouTube SEO, content strategy, and audience engagement expert.

Your task is to generate exactly ${descriptionCount} high-quality YouTube video descriptions.

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

DESCRIPTION REQUIREMENTS:
- Generate exactly ${descriptionCount} unique YouTube video descriptions.
- Every description must be directly relevant to the video topic.
- Write natural, engaging, and useful descriptions.
- Optimize descriptions for YouTube SEO and search intent.
- Naturally include relevant keywords when appropriate.
- Make the opening lines engaging because they are important for viewers and search previews.
- Clearly communicate what the video is about.
- Match the requested tone and target audience.
- Avoid keyword stuffing.
- Avoid misleading claims, fake promises, or deceptive clickbait.
- Avoid unnecessary repetition.
- Keep the writing natural and easy to understand.
- Do not create duplicate or nearly identical descriptions.
- Do not use excessive emojis.
- Do not add numbering such as "1.", "2.", etc.
- Do not use markdown formatting unless it is naturally appropriate for a YouTube description.
- Do not wrap descriptions in quotation marks.
${languageInstruction}

SCORING:
For every description, provide:
- score: overall description quality score from 0 to 100.
- seo: estimated YouTube SEO optimization score from 0 to 100.
- engagement: estimated audience engagement potential from 0 to 10.

SCORING GUIDELINES:
score should consider:
- Relevance
- Clarity
- Readability
- Audience appeal
- Overall content quality
- Natural keyword usage

seo should consider:
- Keyword relevance
- Search intent
- Topic clarity
- Keyword placement
- Natural SEO optimization
- Search-friendly wording

engagement should consider:
- Strong opening
- Viewer interest
- Clarity of value
- Emotional appeal
- Likelihood of encouraging viewers to continue watching

IMPORTANT:
- Do not generate random scores.
- Scores must reflect the actual quality of each generated description.
- engagement must be between 0 and 10.
- score must be between 0 and 100.
- seo must be between 0 and 100.

OUTPUT REQUIREMENTS:
- Return ONLY one valid JSON object.
- Do not return markdown.
- Do not return explanations.
- Do not return comments.
- Do not return text before or after the JSON.
- The JSON must contain exactly one "descriptions" array.
- The "descriptions" array must contain exactly ${descriptionCount} objects.
- Every object must contain exactly these fields:
  "description", "score", "seo", "engagement"

OUTPUT FORMAT:
{
  "descriptions": [
    {
      "description": "Example YouTube video description...",
      "score": 92,
      "seo": 94,
      "engagement": 8.7
    }
  ]
}
`.trim();
}

// ============================================================
// DESCRIPTION REGENERATE PROMPT
// ============================================================

export type DescriptionRegeneratePromptOptions = {
  topic: string;
  keywords?: string;
  language?: string;
  tone?: string;
  length?: string;
  audience?: string;
  category?: string;
  currentDescription: string;
  creativity?: number;
};

export function buildDescriptionRegeneratePrompt({
  topic,
  keywords = "",
  language = "🌐 Auto Detect",
  tone = "Professional",
  length = "Medium",
  audience = "Everyone",
  category = "Education",
  currentDescription,
  creativity = 70,
}: DescriptionRegeneratePromptOptions): string {
  const languageInstruction =
    language === "🌐 Auto Detect"
      ? `
- Detect the language of the Video Topic.
- Generate the new description in the same language as the Video Topic.
`
      : `
- Generate the new description in this language: ${language}
`;

  return `
You are a professional YouTube SEO, content strategy, and audience engagement expert.

Your task is to create ONE improved alternative YouTube video description.

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

CURRENT DESCRIPTION:
${currentDescription}

REGENERATION REQUIREMENTS:
- Generate exactly ONE improved YouTube video description.
- Keep it directly relevant to the video topic.
- Improve the description compared with the current description.
- Do not simply repeat or slightly modify the current description.
- Create a stronger and more engaging opening.
- Clearly explain the value and subject of the video.
- Naturally include relevant keywords when appropriate.
- Optimize for YouTube SEO and search intent.
- Match the requested language, tone, length, audience, and category.
- Avoid keyword stuffing.
- Avoid misleading claims, fake promises, or deceptive clickbait.
- Avoid unnecessary repetition.
- Keep the writing natural and easy to understand.
- Do not use excessive emojis.
- Do not wrap the description in quotation marks.
${languageInstruction}

SCORING:
For the new description, provide:
- score: overall description quality score from 0 to 100.
- seo: estimated YouTube SEO optimization score from 0 to 100.
- engagement: estimated audience engagement potential from 0 to 10.

SCORING GUIDELINES:
score should consider:
- Relevance
- Clarity
- Readability
- Audience appeal
- Overall content quality
- Natural keyword usage

seo should consider:
- Keyword relevance
- Search intent
- Topic clarity
- Keyword placement
- Natural SEO optimization
- Search-friendly wording

engagement should consider:
- Strong opening
- Viewer interest
- Clarity of value
- Emotional appeal
- Likelihood of encouraging viewers to continue watching

IMPORTANT:
- Do not generate random scores.
- Scores must reflect the actual quality of the generated description.
- engagement must be between 0 and 10.
- score must be between 0 and 100.
- seo must be between 0 and 100.

OUTPUT REQUIREMENTS:
- Return ONLY one valid JSON object.
- Do not return markdown.
- Do not return explanations.
- Do not return comments.
- Do not return text before or after the JSON.
- The JSON must contain exactly one "descriptions" array.
- The "descriptions" array must contain exactly ONE object.
- The object must contain exactly these fields:
  "description", "score", "seo", "engagement"

OUTPUT FORMAT:
{
  "descriptions": [
    {
      "description": "Improved YouTube video description...",
      "score": 94,
      "seo": 96,
      "engagement": 8.9
    }
  ]
}
`.trim();
}