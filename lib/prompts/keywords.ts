export type KeywordPromptOptions = {
  topic: string;
  seedKeywords: string;
  language: string;
  searchIntent: string;
  category: string;
  count: number;
  creativity: number;
};

export function buildKeywordPrompt({
  topic,
  seedKeywords,
  language,
  searchIntent,
  category,
  count,
  creativity,
}: KeywordPromptOptions) {
  return `
You are an expert YouTube SEO keyword research assistant.

Generate exactly ${count} unique YouTube keywords based on the information below.

Topic:
${topic.trim()}

Seed Keywords:
${seedKeywords.trim() || "None"}

Language:
${language}

Search Intent:
${searchIntent}

Category:
${category}

Creativity:
${creativity}/100

IMPORTANT REQUIREMENTS:

1. Return exactly ${count} keyword objects.
2. Every keyword must be unique.
3. Do not create duplicate or nearly identical keywords.
4. Mix broad, niche, specific, long-tail, and search-intent keywords.
5. Keep keywords natural and useful for YouTube content.
6. Never use hashtags.
7. Never number the keywords.
8. Never add explanations.
9. Never claim real-time search volume.
10. Never claim actual YouTube ranking data.
11. Search intent should follow the selected intent when possible.
12. Use the selected language.
13. If Auto Detect is selected, detect the language from the Topic and Seed Keywords.
14. Scores are AI estimates only.
15. score must be a JSON number between 70 and 99.
16. searchIntent must be a JSON number between 70 and 99.
17. relevance must be a JSON number between 70 and 99.
18. opportunity must be a JSON number between 70 and 99.

STRICT JSON TYPE RULES:

- keyword MUST be a string.
- score MUST be a JSON number, NOT a string.
- searchIntent MUST be a JSON number, NOT a string.
- relevance MUST be a JSON number, NOT a string.
- opportunity MUST be a JSON number, NOT a string.
- Never put quotation marks around numeric values.
- Do NOT return "95".
- Return 95.
- Do NOT return "90".
- Return 90.
- Do not add extra fields.
- Do not use markdown.
- Do not add explanations outside JSON.

CORRECT:
{
  "results": [
    {
      "keyword": "example keyword",
      "score": 95,
      "searchIntent": 90,
      "relevance": 96,
      "opportunity": 88
    }
  ]
}

INCORRECT:
{
  "results": [
    {
      "keyword": "example keyword",
      "score": "95",
      "searchIntent": "90",
      "relevance": "96",
      "opportunity": "88"
    }
  ]
}

Return ONLY valid JSON.

Required structure:

{
  "results": [
    {
      "keyword": "example keyword",
      "score": 95,
      "searchIntent": 90,
      "relevance": 96,
      "opportunity": 88
    }
  ]
}
`;
}

export type KeywordRegeneratePromptOptions = {
  topic: string;
  seedKeywords: string;
  language: string;
  searchIntent: string;
  category: string;
  currentKeyword: string;
  existingKeywords: string;
};

export function buildKeywordRegeneratePrompt({
  topic,
  seedKeywords,
  language,
  searchIntent,
  category,
  currentKeyword,
  existingKeywords,
}: KeywordRegeneratePromptOptions) {
  return `
Generate ONE completely new YouTube SEO keyword.

Topic:
${topic.trim()}

Seed Keywords:
${seedKeywords.trim() || "None"}

Language:
${language}

Search Intent:
${searchIntent}

Category:
${category}

Current Keyword:
${currentKeyword}

Other Existing Keywords:
${existingKeywords}

Requirements:

- Generate exactly ONE keyword.
- The new keyword MUST be different from the current keyword.
- Do not duplicate any existing keyword.
- Keep it highly relevant to the topic.
- Prefer niche, specific, long-tail, or useful search-intent keywords.
- Do not use hashtags.
- Do not number the keyword.
- Do not add explanations.
- Do not claim real-time search volume.
- Do not claim real-time ranking data.
- Scores are AI estimates only.
- score must be a JSON number between 70 and 99.
- searchIntent must be a JSON number between 70 and 99.
- relevance must be a JSON number between 70 and 99.
- opportunity must be a JSON number between 70 and 99.

STRICT JSON TYPE RULES:

- keyword MUST be a string.
- score MUST be a JSON number, NOT a string.
- searchIntent MUST be a JSON number, NOT a string.
- relevance MUST be a JSON number, NOT a string.
- opportunity MUST be a JSON number, NOT a string.
- Never put quotation marks around numeric values.
- Do NOT return "95".
- Return 95.
- Do not add extra fields.
- Do not use markdown.
- Do not add explanations outside JSON.

Return ONLY valid JSON.

Required structure:

{
  "keyword": "new keyword",
  "score": 95,
  "searchIntent": 92,
  "relevance": 96,
  "opportunity": 90
}
`;
}