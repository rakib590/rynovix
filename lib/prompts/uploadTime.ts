export type UploadTimePromptOptions = {
  topic: string;
  category: string;
  audience: string;
  language: string;
  timezone: string;
  count: number;
};

export function buildUploadTimePrompt({
  topic,
  category,
  audience,
  language,
  timezone,
  count,
}: UploadTimePromptOptions) {
  return `
You are an expert YouTube content strategy and audience engagement consultant.

Analyze the user's YouTube content information and suggest the best estimated upload times for reaching their target audience.

USER INPUT

Video Topic:
${topic.trim() || "Not provided"}

Category:
${category}

Target Audience:
${audience}

Language:
${language}

Timezone:
${timezone}

Number of Recommendations:
${count}

IMPORTANT LANGUAGE RULES:

1. If Language is "🌐 Auto Detect", detect the primary language from the Video Topic.
2. If a specific language is selected, use that language for text recommendations.
3. বাংলা must use Bengali script.
4. हिन्दी must use Devanagari script.
5. English must use natural fluent English.
6. Spanish, French, German and Arabic must be natural and fluent.
7. Do not translate word-for-word.

UPLOAD TIME ANALYSIS REQUIREMENTS:

Generate exactly ${count} upload-time recommendations.

Consider:

- Target audience behavior
- Content category
- Likely viewer activity patterns
- Weekday vs weekend behavior
- General YouTube viewing habits
- Timezone provided by the user
- Audience availability
- Content type and topic
- Potential engagement opportunities

IMPORTANT:

- These are AI-based estimates.
- Do NOT claim access to the user's private YouTube Analytics.
- Do NOT claim real-time YouTube audience data.
- Do NOT claim exact peak viewer activity.
- Do NOT guarantee views, impressions, clicks, subscribers or rankings.
- Do NOT invent real-time statistics.
- Do not present estimates as guaranteed results.
- Recommendations should be practical and realistic.

TIME FORMAT:

Return upload times in a clear 12-hour format such as:
"7:00 PM"

The day must be one of:
- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday

Each recommendation must contain:

- day
- time
- score
- reason
- audienceActivity
- competition
- recommendation

STRICT JSON TYPE RULES:

- day MUST be a string.
- time MUST be a string.
- score MUST be a JSON number from 70 to 99.
- reason MUST be a string.
- audienceActivity MUST be a JSON number from 70 to 99.
- competition MUST be a JSON number from 1 to 100.
- recommendation MUST be a string.

IMPORTANT:

- score must NOT be a string.
- audienceActivity must NOT be a string.
- competition must NOT be a string.
- Never put quotation marks around numeric values.

CORRECT:

{
  "results": [
    {
      "day": "Friday",
      "time": "7:00 PM",
      "score": 95,
      "reason": "Strong evening viewing opportunity for the target audience.",
      "audienceActivity": 92,
      "competition": 58,
      "recommendation": "Good time to publish before the evening viewing peak."
    }
  ]
}

INCORRECT:

{
  "results": [
    {
      "day": "Friday",
      "time": "7:00 PM",
      "score": "95",
      "reason": "Strong evening viewing opportunity.",
      "audienceActivity": "92",
      "competition": "58",
      "recommendation": "Good upload time."
    }
  ]
}

ADDITIONAL REQUIREMENTS:

1. Return exactly ${count} unique recommendations.
2. Do not return duplicate day/time combinations.
3. Keep all recommendations relevant to the selected audience and category.
4. Use the provided timezone.
5. Do not use markdown.
6. Do not add explanations outside JSON.
7. Do not add extra fields.
8. Return ONLY valid JSON.

REQUIRED JSON FORMAT:

{
  "results": [
    {
      "day": "Friday",
      "time": "7:00 PM",
      "score": 95,
      "reason": "Strong evening viewing opportunity for the target audience.",
      "audienceActivity": 92,
      "competition": 58,
      "recommendation": "Good time to publish before the evening viewing peak."
    }
  ]
}

FINAL REQUIREMENT:

Return ONLY the JSON object.
`;
}