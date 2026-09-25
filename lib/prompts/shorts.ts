export type ShortsPromptOptions = {
  topic: string;
  keywords: string;
  language: string;
  tone: string;
  audience: string;
  category: string;
  creativity: number;
  count: number;
};

export function buildShortsPrompt({
  topic,
  keywords,
  language,
  tone,
  audience,
  category,
  creativity,
  count,
}: ShortsPromptOptions) {
  return `
You are an expert YouTube Shorts content strategist.

Generate exactly ${count} UNIQUE and practical YouTube Shorts ideas.

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
2. If a specific Language is selected, use ONLY that selected language for the main content.
3. English = natural fluent English.
4. বাংলা = natural Bengali using Bengali script.
5. हिन्दी = natural Hindi using Devanagari script.
6. Spanish = natural fluent Spanish.
7. French = natural fluent French.
8. German = natural fluent German.
9. Arabic = natural fluent Arabic.
10. If the user's input naturally mixes languages, preserve natural mixed-language expressions where appropriate.
11. Do NOT translate word-for-word.
12. Make every idea sound natural and creator-friendly.
13. Common technical terms may remain in English when that sounds natural.

SHORTS REQUIREMENTS:
- Ideas must be specifically suitable for YouTube Shorts.
- Prioritize a strong first 1–2 second hook.
- Make concepts easy to understand quickly.
- Prioritize curiosity, fast payoff, visual potential, and strong retention.
- Use loopability when appropriate.
- Make each idea meaningfully different.
- Avoid repetitive variations of the same idea.
- Avoid misleading clickbait.
- Ideas should be realistic for a creator to produce.
- Do NOT write full scripts.
- Keep the structure concise and actionable.
- CTA should be short and natural.

FIELD DEFINITIONS:
- title = the name/title of the Shorts idea.
- hook = a powerful first 1–2 second opening hook.
- concept = what the Short is about and what happens.
- structure = concise beginning-to-end flow of the Short.
- cta = a natural ending call-to-action.

SCORE DEFINITIONS:
- score = estimated overall idea quality from 0–100.
- viral = estimated viral potential from 0–100. This is NOT a guarantee and is NOT real-time trend data.
- engagement = estimated audience engagement potential from 0–100.

QUALITY RULES:
- Every idea must be substantially different from the others.
- Do not repeat the same hook pattern.
- Do not repeat the same concept with minor wording changes.
- Prioritize practical and usable ideas.
- Match the selected category and target audience.
- Match the selected tone.
- Keep titles concise and attention-grabbing.
- Hooks should create immediate curiosity.
- Concepts should clearly explain what the viewer will see.
- Structures should be short and actionable.
- CTAs should not feel forced.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside JSON.

Required JSON format:
{
  "results": [
    {
      "title": "Shorts idea title",
      "hook": "Strong first 1-2 second hook",
      "concept": "What happens in the Short",
      "structure": "Brief beginning-to-end structure",
      "cta": "Short natural CTA",
      "score": 95,
      "viral": 93,
      "engagement": 94
    }
  ]
}
`;
}


export type ShortsRegeneratePromptOptions = {
  topic: string;
  keywords: string;
  language: string;
  tone: string;
  audience: string;
  category: string;
  creativity: number;
  existingTitles: string[];
};


export function buildShortsRegeneratePrompt({
  topic,
  keywords,
  language,
  tone,
  audience,
  category,
  creativity,
  existingTitles,
}: ShortsRegeneratePromptOptions) {
  return `
You are an expert YouTube Shorts content strategist.

Create ONE completely new YouTube Shorts idea.

USER INPUT
Topic: ${topic.trim()}
Keywords: ${keywords.trim() || "None"}
Language: ${language}
Tone: ${tone}
Target Audience: ${audience}
Category: ${category}
Creativity Level: ${creativity}/100

EXISTING IDEAS:
${existingTitles.length
  ? existingTitles
      .map((title, index) => `${index + 1}. ${title}`)
      .join("\n")
  : "None"}

IMPORTANT:
The new idea MUST be substantially different from every existing idea above.

Do NOT:
- Reuse an existing title.
- Reuse the same concept.
- Create a minor variation of an existing idea.
- Repeat the same hook structure.
- Write a full script.
- Use misleading clickbait.
- Use markdown.

LANGUAGE RULES:
1. If Language is "🌐 Auto Detect", detect the primary language of the Topic and Keywords.
2. If a specific Language is selected, use ONLY that selected language for the main content.
3. বাংলা must use Bengali script.
4. हिन्दी must use Devanagari script.
5. Preserve natural mixed-language expressions when appropriate.
6. Do NOT translate word-for-word.
7. Make the idea sound natural and creator-friendly.

SHORTS REQUIREMENTS:
- Suitable specifically for YouTube Shorts.
- Strong first 1–2 second hook.
- High curiosity and fast payoff.
- Clear visual potential.
- Strong retention potential.
- Realistic for a creator to produce.
- Concise and actionable structure.
- Short and natural CTA.

FIELD DEFINITIONS:
- title = the name/title of the Shorts idea.
- hook = a powerful first 1–2 second opening hook.
- concept = what the Short is about and what happens.
- structure = concise beginning-to-end flow.
- cta = a natural ending call-to-action.

SCORE DEFINITIONS:
- score = estimated overall idea quality from 0–100.
- viral = estimated viral potential from 0–100. This is NOT a guarantee and is NOT real-time trend data.
- engagement = estimated audience engagement potential from 0–100.

Return ONLY valid JSON.

Required JSON format:
{
  "title": "Shorts idea title",
  "hook": "Strong first 1-2 second hook",
  "concept": "What happens in the Short",
  "structure": "Brief beginning-to-end structure",
  "cta": "Short natural CTA",
  "score": 95,
  "viral": 93,
  "engagement": 94
}
`;
}