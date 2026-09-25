// lib/prompts/hashtags.ts

export type HashtagPromptOptions = {
  topic: string;
  keywords?: string;
  language?: string;
  tone?: string;
  category?: string;
  hashtagCount?: number;
  creativity?: number;
};

export function buildHashtagPrompt({
  topic,
  keywords = "",
  language = "🌐 Auto Detect",
  tone = "Professional",
  category = "Education",
  hashtagCount = 10,
  creativity = 70,
}: HashtagPromptOptions): string {
  const languageInstruction =
    language === "🌐 Auto Detect"
      ? `
- Detect the language of the Video Topic.
- Generate hashtags that are naturally relevant to the language and audience of the Video Topic.
- Hashtags may use commonly recognized English terms when they are widely used for YouTube discovery.
`
      : `
- Generate hashtags primarily for this language: ${language}
- Use natural and relevant hashtags for the selected language and audience.
`;

  return `
You are a professional YouTube SEO, content strategy, and social media discovery expert.

Your task is to generate exactly ${hashtagCount} high-quality YouTube hashtags for the provided video topic.

VIDEO TOPIC:
${topic}

ADDITIONAL KEYWORDS:
${keywords || "None provided"}

CONTENT SETTINGS:
- Language: ${language}
- Tone: ${tone}
- Category: ${category}
- Creativity Level: ${creativity}/100

HASHTAG REQUIREMENTS:
- Generate exactly ${hashtagCount} unique hashtags.
- Every hashtag must be directly relevant to the video topic.
- Focus on hashtags that can help with YouTube content discovery.
- Use a balanced mix of:
  - Broad relevant hashtags
  - Niche/topic-specific hashtags
  - Search-intent hashtags
  - Audience-relevant hashtags
- Prioritize relevance over generic popularity.
- Naturally consider the provided keywords when relevant.
- Avoid unrelated hashtags.
- Avoid misleading or deceptive hashtags.
- Avoid duplicate hashtags.
- Avoid nearly identical hashtags.
- Avoid excessive repetition of the same keyword.
- Keep hashtags concise and natural.
- Do not use spaces inside a hashtag.
- Every hashtag must begin with "#".
- Do not add punctuation after hashtags.
- Do not number the hashtags.
- Do not use markdown bullets.
- Do not wrap hashtags in quotation marks.
${languageInstruction}

QUALITY GUIDELINES:
- Hashtags should match the actual topic of the video.
- Avoid extremely broad hashtags when a more relevant specific hashtag is available.
- Avoid spammy hashtag combinations.
- Avoid hashtags that imply claims not supported by the video topic.
- Prefer useful, searchable, audience-relevant hashtag phrases.
- Make the hashtag set varied instead of repeating the same word pattern.

IMPORTANT:
- Return ONLY one valid JSON object.
- Do not return markdown.
- Do not return explanations.
- Do not return comments.
- Do not return text before or after the JSON.
- The JSON must contain exactly one "hashtags" array.
- The "hashtags" array must contain exactly ${hashtagCount} strings.
- Every string must be a valid hashtag beginning with "#".
- Do not include duplicate hashtags.

OUTPUT FORMAT:
{
  "hashtags": [
    "#YouTubeSEO",
    "#YouTubeGrowth",
    "#ContentCreation"
  ]
}
`.trim();
}

// ============================================================
// HASHTAG REGENERATE PROMPT
// ============================================================

export type HashtagRegeneratePromptOptions = {
  topic: string;
  keywords?: string;
  language?: string;
  tone?: string;
  category?: string;
  hashtagCount?: number;
  currentHashtag: string;
  creativity?: number;
};

export function buildHashtagRegeneratePrompt({
  topic,
  keywords = "",
  language = "🌐 Auto Detect",
  tone = "Professional",
  category = "Education",
  hashtagCount = 10,
  currentHashtag,
  creativity = 70,
}: HashtagRegeneratePromptOptions): string {
  const languageInstruction =
    language === "🌐 Auto Detect"
      ? `
- Detect the language of the Video Topic.
- Generate the new hashtag based on the language and audience of the Video Topic.
- English may be used when it is the natural or commonly searched form for the topic.
`
      : `
- Generate the new hashtag primarily for this language: ${language}
`;

  return `
You are a professional YouTube SEO, content strategy, and social media discovery expert.

Your task is to create ONE improved alternative YouTube hashtag.

VIDEO TOPIC:
${topic}

ADDITIONAL KEYWORDS:
${keywords || "None provided"}

CONTENT SETTINGS:
- Language: ${language}
- Tone: ${tone}
- Category: ${category}
- Total Hashtag Set Size: ${hashtagCount}
- Creativity Level: ${creativity}/100

CURRENT HASHTAG:
${currentHashtag}

REGENERATION REQUIREMENTS:
- Generate exactly ONE new hashtag.
- The new hashtag must be directly relevant to the video topic.
- Do not simply repeat the current hashtag.
- Do not create a minor spelling variation of the current hashtag.
- Choose a useful alternative with strong topical relevance.
- Consider YouTube discovery and search intent.
- Naturally consider the provided keywords when relevant.
- Match the requested language and audience.
- Avoid unrelated or misleading hashtags.
- Avoid generic spammy hashtags when a more specific relevant hashtag is possible.
- Keep the hashtag concise and natural.
- Do not use spaces inside the hashtag.
- The hashtag must begin with "#".
- Do not add punctuation after the hashtag.
- Do not use numbering.
- Do not use markdown.
- Do not wrap the hashtag in quotation marks.
${languageInstruction}

IMPORTANT:
- Return ONLY one valid JSON object.
- Do not return markdown.
- Do not return explanations.
- Do not return comments.
- Do not return text before or after the JSON.
- The JSON must contain exactly one "hashtags" array.
- The "hashtags" array must contain exactly ONE string.
- The string must be a valid hashtag beginning with "#".
- The new hashtag must be different from the current hashtag.

OUTPUT FORMAT:
{
  "hashtags": [
    "#ExampleHashtag"
  ]
}
`.trim();
}