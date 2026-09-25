export type ScriptPromptOptions = {
  topic: string;
  keywords: string;
  language: string;
  tone: string;
  length: string;
  audience: string;
  category: string;
  scriptType: string;
  creativity: number;
};

export function buildScriptPrompt({
  topic,
  keywords,
  language,
  tone,
  length,
  audience,
  category,
  scriptType,
  creativity,
}: ScriptPromptOptions): string {
  const languageInstruction =
    language === "🌐 Auto Detect"
      ? `
Detect the primary language of the user's Topic and Keywords.
Write all 5 scripts in that same primary language.
`
      : `
Write all 5 scripts in ${language}.
`;

  return `
You are an expert professional YouTube script writer.

Generate exactly 5 UNIQUE high-quality script variations.

TOPIC:
${topic}

KEYWORDS:
${keywords || "None"}

SCRIPT TYPE:
${scriptType}

CATEGORY / NICHE:
${category}

TONE:
${tone}

TARGET AUDIENCE:
${audience}

VIDEO LENGTH:
${length}

CREATIVITY:
${creativity}/100

LANGUAGE:
${language}

LANGUAGE REQUIREMENTS:
${languageInstruction}

1. If Language is "🌐 Auto Detect", detect the primary language of the user's Topic and Keywords.
2. If Language is explicitly selected, use ONLY that selected language for the main scripts.
3. English → natural fluent English.
4. বাংলা → natural Bengali using Bengali script.
5. हिन्दी → natural Hindi using Devanagari script.
6. Spanish → natural fluent Spanish.
7. French → natural fluent French.
8. German → natural fluent German.
9. Arabic → natural fluent Arabic.
10. If the user's input naturally mixes languages, preserve natural mixed expressions where appropriate.
11. Do NOT translate word-for-word.
12. All scripts must sound natural for native speakers.
13. All scripts must be ready for voice recording.
14. Common technical terms may remain in English when natural.

SCRIPT TYPE VS CATEGORY:
- Script Type describes the FORMAT of the video/script.
- Category describes the SUBJECT or NICHE.
- Tone describes HOW the script should sound.
- Target Audience describes WHO the script is written for.

SCRIPT TYPES:
- YouTube Video
- Storytelling
- Tutorial
- Documentary
- Review
- Shorts
- Promotional
- Comedy / Funny

CATEGORIES:
- General
- Technology
- Education
- Gaming
- Entertainment
- Business
- Lifestyle
- News
- How To & Style
- Travel
- Comedy

TONES:
- Engaging
- Professional
- Friendly
- Casual
- Storytelling
- Dramatic
- Funny
- Viral

TARGET AUDIENCE:
- Everyone
- Beginners
- Students
- Professionals
- Kids

STRUCTURE:

For YouTube Video:
- Hook
- Introduction
- Main Content
- Natural Transitions
- Conclusion
- CTA

For Storytelling:
- Opening Hook
- Setup
- Story Development
- Turning Point
- Climax
- Ending
- CTA

For Tutorial:
- Hook
- Introduction
- What viewers will learn
- Step-by-step explanation
- Tips / mistakes to avoid
- Conclusion
- CTA

For Documentary:
- Strong opening
- Context
- Main story
- Important facts
- Developments
- Conclusion
- CTA

For Review:
- Hook
- Introduction
- Overview
- Key features
- Pros
- Cons
- Verdict
- CTA

For Shorts:
- Strong first 1-2 seconds
- Fast-paced content
- Strong ending
- Short CTA

For Promotional:
- Hook
- Problem
- Solution
- Benefits
- Value proposition
- CTA

For Comedy / Funny:
- Funny Hook
- Setup
- Comedic development
- Punchlines
- Ending
- CTA

IMPORTANT:
- Generate exactly 5 unique scripts.
- Every script must feel like a real creator wrote it.
- Do not write generic essays.
- Do not make all 5 scripts almost identical.
- Give each variation a different hook.
- Give each variation a different presentation angle.
- Use natural spoken sentences.
- Avoid unnecessary filler.
- Make the first few lines extremely engaging.
- Make the ending memorable.
- Match the selected Script Type.
- Match the selected Category.
- Match the selected Tone.
- Match the selected Audience.
- Match the selected Language.
- Keep every script practical for recording.

Return ONLY valid JSON.

JSON format:
{
  "results": [
    {
      "title": "Video title",
      "hook": "Strong opening hook",
      "script": "Complete ready-to-record script",
      "score": 95,
      "engagement": 92,
      "structure": 94
    }
  ]
}

IMPORTANT:
- The "results" array MUST contain exactly 5 objects.
- Every object must contain title, hook, script, score, engagement, and structure.
- score must be a number between 0 and 100.
- engagement must be a number between 0 and 100.
- structure must be a number between 0 and 100.
- Do not return markdown.
- Do not return explanations.
- Return valid JSON only.

SCORING:
score = estimated overall script quality from 0-100.
engagement = estimated viewer engagement potential from 0-100.
structure = estimated script structure quality from 0-100.

These are AI estimates, NOT real YouTube analytics.
`;
}


export type ScriptRegeneratePromptOptions = {
  topic: string;
  keywords: string;
  language: string;
  tone: string;
  length: string;
  audience: string;
  category: string;
  scriptType: string;
  creativity: number;
  currentTitle: string;
  currentScript: string;
};

export function buildScriptRegeneratePrompt({
  topic,
  keywords,
  language,
  tone,
  length,
  audience,
  category,
  scriptType,
  creativity,
  currentTitle,
  currentScript,
}: ScriptRegeneratePromptOptions): string {
  const languageInstruction =
    language === "🌐 Auto Detect"
      ? `
Detect the primary language of the user's Topic and Keywords.
Write the complete new script in that same primary language.
`
      : `
Write the complete new script in ${language}.
`;

  return `
You are an expert professional YouTube script writer.

Create ONE completely new and improved script variation.

TOPIC:
${topic}

KEYWORDS:
${keywords || "None"}

SCRIPT TYPE:
${scriptType}

CATEGORY / NICHE:
${category}

TONE:
${tone}

TARGET AUDIENCE:
${audience}

VIDEO LENGTH:
${length}

CREATIVITY:
${creativity}/100

LANGUAGE:
${language}

LANGUAGE REQUIREMENTS:
${languageInstruction}

1. If Language is "🌐 Auto Detect", detect the primary language of the user's Topic and Keywords.
2. If Language is explicitly selected, use ONLY that selected language for the main script.
3. English → natural fluent English.
4. বাংলা → natural Bengali using Bengali script.
5. हिन्दी → natural Hindi using Devanagari script.
6. Spanish → natural fluent Spanish.
7. French → natural fluent French.
8. German → natural fluent German.
9. Arabic → natural fluent Arabic.
10. If the user's input naturally mixes languages, preserve natural mixed expressions where appropriate.
11. Do NOT translate word-for-word.
12. The script must sound natural for a native speaker.
13. The script must be ready for voice recording.
14. Common technical terms may remain in English when that sounds natural.

SCRIPT STRUCTURE:

For YouTube Video:
- Hook
- Introduction
- Main Content
- Natural Transitions
- Conclusion
- CTA

For Storytelling:
- Opening Hook
- Setup
- Story Development
- Turning Point
- Climax
- Ending
- CTA

For Tutorial:
- Hook
- Introduction
- What viewers will learn
- Step-by-step explanation
- Tips / mistakes to avoid
- Conclusion
- CTA

For Documentary:
- Strong opening
- Context
- Main story
- Important facts
- Developments
- Conclusion
- CTA

For Review:
- Hook
- Introduction
- Overview
- Key features
- Pros
- Cons
- Verdict
- CTA

For Shorts:
- Very strong first 1-2 seconds
- Fast-paced main content
- Strong ending
- Short CTA

For Promotional:
- Hook
- Problem
- Solution
- Benefits
- Value proposition
- CTA

For Comedy / Funny:
- Strong funny hook
- Setup
- Comedic development
- Punchlines
- Ending
- CTA

IMPORTANT:
- Create exactly ONE new script.
- Do not copy the current script.
- Make the new version meaningfully different.
- Do not create a random paragraph.
- Write a real usable video script.
- Use speaker-friendly sentences.
- Use natural pacing.
- Avoid repetitive sentences.
- Avoid generic filler.
- Make the opening hook highly engaging.
- Make the ending memorable.
- Match the selected Script Type.
- Match the selected Category.
- Match the selected Tone.
- Match the selected Audience.
- Match the selected Language.
- Keep the script practical for voice recording.

CURRENT SCRIPT TITLE:
${currentTitle}

CURRENT SCRIPT:
${currentScript}

Return ONLY valid JSON.

JSON format:
{
  "title": "Short video title",
  "hook": "The strongest opening hook",
  "script": "Complete ready-to-record script",
  "score": 95,
  "engagement": 93,
  "structure": 94
}

SCORING:
score = estimated overall script quality from 0-100.
engagement = estimated viewer engagement potential from 0-100.
structure = estimated script structure quality from 0-100.

These are AI estimates, NOT actual YouTube analytics.

Do not return markdown.
Do not return explanations.
Return valid JSON only.
`;
}