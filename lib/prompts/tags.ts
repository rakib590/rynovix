export type TagsPromptOptions = {
  topic: string;
  keywords: string;
  language: string;
  tone: string;
  length: string;
  audience: string;
  category: string;
  tagCount: number;
  creativity: number;
};

export function buildTagsPrompt({
  topic,
  keywords,
  language,
  tone,
  length,
  audience,
  category,
  tagCount,
  creativity,
}: TagsPromptOptions) {
  const languageInstruction =
    language === "🌐 Auto Detect"
      ? "Automatically detect the language from the Video Topic and generate YouTube tags in the same language."
      : `Generate tags in ${language}.`;

  return `
You are an expert YouTube SEO specialist, keyword strategist, and YouTube search optimization expert.

Generate 5 high-quality YouTube tag sets.

VIDEO INFORMATION

Video Topic:
${topic}

Keywords:
${keywords || "None"}

Language:
${language}

Language Instruction:
${languageInstruction}

Tone:
${tone}

Length:
${length}

Audience:
${audience}

Category:
${category}

Tags Per Set:
${tagCount}

Creativity:
${creativity}%

Number of Tag Sets:
5

TAG REQUIREMENTS:

- Generate exactly 5 unique tag sets.
- Each tag set MUST contain exactly ${tagCount} YouTube tags.
- Tags MUST be comma separated.
- Do NOT use hashtags.
- Do NOT start tags with #.
- Do NOT number tags.
- Do NOT add explanations.
- Do NOT return markdown.
- Every tag must be unique within each set.
- Make every tag highly relevant to the Video Topic.
- Naturally use the provided Keywords when relevant.
- Mix broad, niche, specific, long-tail, and search-intent tags.
- Optimize every tag set for YouTube SEO.
- Follow the requested language.
- Follow the requested audience.
- Follow the requested category.
- Respect the requested creativity level.
- Avoid irrelevant keywords.
- Avoid keyword stuffing.
- Do not make misleading claims.
- Each tag set should be meaningfully different from the others.
- Do not return any text outside the JSON object.

SCORING REQUIREMENTS:

For every tag set calculate:

1. score

Estimated overall tag quality score from 0 to 100.

Consider:
- Relevance
- Keyword quality
- Topic coverage
- Search discoverability
- Variety
- Audience relevance
- Overall SEO quality

2. ctr

Estimated CTR potential from 0.0 to 10.0.

IMPORTANT:
This is an AI estimate, NOT actual YouTube Analytics CTR.

Consider:
- Topic relevance
- Search intent
- Audience appeal
- Discoverability

3. seo

Estimated SEO optimization score from 0 to 100.

Consider:
- Keyword relevance
- Search intent
- Topic coverage
- Search-friendly tags
- Natural keyword usage

4. trending

Estimated trend potential from 0 to 100.

IMPORTANT:
This is an AI estimate based on topic relevance and general trend potential. It is NOT real-time platform trend data.

Consider:
- Topic relevance
- Popularity potential
- Broad audience interest
- Timeliness

5. viral

Estimated viral potential from 0 to 100.

IMPORTANT:
This is an AI estimate, NOT a guarantee of virality.

Consider:
- Broad appeal
- Shareability
- Curiosity
- Audience reach
- Potential interest

IMPORTANT:

Do NOT give random scores.

Scores must reflect the actual quality of each individual tag set.

A stronger tag set should receive higher scores than a weaker tag set.

Return ONLY this JSON structure:

{
  "results": [
    {
      "tags": "youtube seo, youtube growth, ai tools",
      "score": 94,
      "ctr": 8.7,
      "seo": 96,
      "trending": 91,
      "viral": 89
    }
  ]
}

IMPORTANT RULES:

- The "results" array MUST contain exactly 5 objects.
- Every object must contain tags, score, ctr, seo, trending, and viral.
- Each tags string MUST contain exactly ${tagCount} tags.
- Tags must be comma separated.
- Tags must not contain #.
- score must be a number between 0 and 100.
- ctr must be a number between 0 and 10.
- seo must be a number between 0 and 100.
- trending must be a number between 0 and 100.
- viral must be a number between 0 and 100.
- Return valid JSON only.
`;
}

export type TagsRegeneratePromptOptions = {
  topic: string;
  keywords: string;
  language: string;
  tone: string;
  length: string;
  audience: string;
  category: string;
  tagCount: number;
  creativity: number;
  currentTags: string;
};

export function buildTagsRegeneratePrompt({
  topic,
  keywords,
  language,
  tone,
  length,
  audience,
  category,
  tagCount,
  creativity,
  currentTags,
}: TagsRegeneratePromptOptions) {
  const languageInstruction =
    language === "🌐 Auto Detect"
      ? "Automatically detect the language from the Video Topic and generate YouTube tags in the same language."
      : `Generate tags in ${language}.`;

  return `
You are an expert YouTube SEO specialist, keyword strategist, and YouTube search optimization expert.

Create ONE improved YouTube tag set.

Video Topic:
${topic}

Keywords:
${keywords || "None"}

Language:
${language}

Language Instruction:
${languageInstruction}

Tone:
${tone}

Length:
${length}

Audience:
${audience}

Category:
${category}

Tags Per Set:
${tagCount}

Creativity:
${creativity}%

Current Tag Set:
${currentTags}

TAG REQUIREMENTS:

- Generate exactly ${tagCount} YouTube tags.
- Tags must be comma separated.
- Do NOT use hashtags.
- Do NOT start tags with #.
- Do NOT number the tags.
- Do NOT add explanations.
- Do NOT return markdown.
- Every tag must be unique.
- Keep every tag highly relevant to the video topic.
- Mix broad, niche, specific, long-tail, and search-intent keywords.
- Naturally include the provided keywords when relevant.
- Optimize the tag set for YouTube search discoverability.
- Follow the requested language.
- Follow the requested audience.
- Follow the requested category.
- Respect the requested creativity level.
- Avoid irrelevant keywords.
- Avoid keyword stuffing.
- Do not make misleading claims.
- Improve the current tag set instead of simply copying it.

SCORING REQUIREMENTS:

score:
Estimated overall tag quality from 0 to 100.

Consider:
- Relevance
- Keyword quality
- Topic coverage
- Search discoverability
- Variety
- Audience relevance
- Overall SEO quality

ctr:
Estimated CTR potential from 0.0 to 10.0.

IMPORTANT:
This is an AI estimate, NOT actual YouTube Analytics CTR.

Consider:
- Topic relevance
- Search intent
- Audience appeal
- Discoverability

seo:
Estimated SEO optimization score from 0 to 100.

Consider:
- Keyword relevance
- Search intent
- Topic coverage
- Search-friendly tags
- Natural keyword usage

trending:
Estimated trend potential from 0 to 100.

IMPORTANT:
This is an AI estimate based on topic relevance and general trend potential. It is NOT real-time platform trend data.

Consider:
- Topic relevance
- Popularity potential
- Broad audience interest
- Timeliness

viral:
Estimated viral potential from 0 to 100.

IMPORTANT:
This is an AI estimate, NOT a guarantee of virality.

Consider:
- Broad appeal
- Shareability
- Curiosity
- Audience reach
- Potential interest

IMPORTANT:

Do NOT generate random scores.

The scores must reflect the actual quality of the generated tag set.

Return ONLY valid JSON.

Return exactly this JSON structure:

{
  "tags": "youtube seo, youtube growth, ai tools",
  "score": 94,
  "ctr": 8.7,
  "seo": 96,
  "trending": 91,
  "viral": 89
}

Rules:

- tags must contain exactly ${tagCount} tags.
- tags must be comma separated.
- tags must not contain #.
- score must be a number between 0 and 100.
- ctr must be a number between 0 and 10.
- seo must be a number between 0 and 100.
- trending must be a number between 0 and 100.
- viral must be a number between 0 and 100.
- Return valid JSON only.
`;
}