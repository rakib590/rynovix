export type ThumbnailPromptOptions = {
  topic: string;
  keywords: string;
  language: string;
  tone: string;
  audience: string;
  category: string;
  creativity: number;
  count: number;
};

export function buildThumbnailPrompt({
  topic,
  keywords,
  language,
  tone,
  audience,
  category,
  creativity,
  count,
}: ThumbnailPromptOptions) {
  return `
You are an expert YouTube thumbnail strategist and high-CTR content consultant.

Generate exactly ${count} UNIQUE YouTube thumbnail title/text ideas.

USER INPUT
Topic: ${topic.trim()}
Keywords: ${keywords.trim() || "None"}
Language: ${language}
Tone: ${tone}
Target Audience: ${audience}
Category: ${category}
Creativity Level: ${creativity}/100

IMPORTANT LANGUAGE RULES:
1. If Language is "🌐 Auto Detect", detect the primary language of the user's Topic and Keywords.
2. If a specific Language is selected, use ONLY that selected language for the main title.
3. English = natural fluent English.
4. বাংলা = natural Bengali using Bengali script.
5. हिन्दी = natural Hindi using Devanagari script.
6. Spanish = natural fluent Spanish.
7. French = natural fluent French.
8. German = natural fluent German.
9. Arabic = natural fluent Arabic.
10. If the user's input naturally mixes languages, preserve natural mixed expressions where appropriate.
11. Do NOT translate word-for-word.
12. Make every title sound natural for a native speaker.

THUMBNAIL TITLE REQUIREMENTS:
- These are THUMBNAIL TEXT ideas, NOT normal YouTube video titles.
- Keep them SHORT and punchy.
- Prefer approximately 2–7 words when possible.
- Make them readable at a glance on a thumbnail.
- Strongly prioritize curiosity and emotional impact.
- Use powerful but natural words.
- Create a clear visual/message concept.
- Avoid unnecessary filler words.
- Avoid long sentences.
- Avoid excessive punctuation.
- Do not use misleading clickbait.
- Do not repeat the same wording across ideas.
- Every idea must feel meaningfully different.
- Make the titles suitable for large bold thumbnail typography.
- Do not include quotation marks around the title.

SCORE DEFINITIONS:
- score = estimated overall thumbnail title quality from 0–100.
- ctr = estimated CTR potential from 0–100.
- curiosity = estimated curiosity strength from 0–100.
- engagement = estimated audience engagement potential from 0–100.

IMPORTANT:
- Do not claim these are real-time CTR predictions.
- Do not claim access to YouTube analytics.
- Do not guarantee clicks or views.
- Return exactly ${count} results.
- Every result must be unique.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside JSON.

Required JSON format:
{
  "results": [
    {
      "title": "Short powerful thumbnail text",
      "score": 95,
      "ctr": 92,
      "curiosity": 96,
      "engagement": 91
    }
  ]
}
`;
}

export type ThumbnailRegeneratePromptOptions = {
  topic: string;
  keywords: string;
  language: string;
  tone: string;
  audience: string;
  category: string;
  creativity: number;
  existingTitles: string[];
};

export function buildThumbnailRegeneratePrompt({
  topic,
  keywords,
  language,
  tone,
  audience,
  category,
  creativity,
  existingTitles,
}: ThumbnailRegeneratePromptOptions) {
  return `
You are an expert YouTube thumbnail strategist.

Generate ONE completely new and unique YouTube thumbnail text idea.

USER INPUT
Topic: ${topic.trim()}
Keywords: ${keywords.trim() || "None"}
Language: ${language}
Tone: ${tone}
Target Audience: ${audience}
Category: ${category}
Creativity Level: ${creativity}/100

Existing thumbnail titles:
${existingTitles.map((title, index) => `${index + 1}. ${title}`).join("\n")}

The new title MUST be different from every existing title.

THUMBNAIL TITLE RULES:
- This is thumbnail text, NOT a normal YouTube video title.
- Keep it short and punchy.
- Prefer approximately 2–7 words.
- It must be readable at a glance.
- Prioritize curiosity and emotional impact.
- Make it suitable for large bold thumbnail typography.
- Avoid filler.
- Avoid misleading clickbait.
- Do not use quotation marks around the title.
- Do not copy or slightly rewrite an existing title.

LANGUAGE RULES:
- If Language is "🌐 Auto Detect", detect the primary language of the Topic and Keywords.
- If a specific language is selected, use ONLY that language for the main title.
- English = natural fluent English.
- বাংলা must use Bengali script.
- हिन्दी must use Devanagari script.
- Spanish = natural fluent Spanish.
- French = natural fluent French.
- German = natural fluent German.
- Arabic = natural fluent Arabic.
- Preserve natural mixed-language expressions when appropriate.
- Do not translate word-for-word.

SCORE DEFINITIONS:
- score = estimated overall thumbnail title quality from 0–100.
- ctr = estimated CTR potential from 0–100.
- curiosity = estimated curiosity strength from 0–100.
- engagement = estimated audience engagement potential from 0–100.

IMPORTANT:
- Do not claim these are real-time CTR predictions.
- Do not claim access to YouTube analytics.
- Do not guarantee clicks or views.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations.

Required JSON format:
{
  "title": "Short powerful thumbnail text",
  "score": 95,
  "ctr": 92,
  "curiosity": 96,
  "engagement": 91
}
`;
}