// lib/billing/credits.ts

export type AIToolId =
  | "title-generator"
  | "description-generator"
  | "hashtag-generator"
  | "tags-generator"
  | "script-writer"
  | "shorts-ideas"
  | "thumbnail-title"
  | "seo-checker"
  | "keyword-generator"
  | "best-upload-time";

// ============================================================
// CREDIT RULES
// ============================================================

export const CREDIT_RULES = {
  // Title Generator
  "title-generator": {
    type: "count",
    costs: {
      1: 1,
      5: 5,
      10: 10,
      15: 15,
      20: 20,
    },
  },

  // Description Generator
  "description-generator": {
    type: "count",
    costs: {
      1: 1,
      5: 5,
      10: 10,
      15: 15,
      20: 20,
    },
  },

  // Hashtag Generator
  "hashtag-generator": {
    type: "count",
    costs: {
      1: 1,
      10: 2,
      20: 4,
      30: 6,
      50: 10,
    },
  },

  // Tags Generator
  "tags-generator": {
    type: "count",
    costs: {
      10: 2,
      20: 4,
      30: 6,
      40: 8,
      50: 10,
    },
  },

  // Script Writer
  "script-writer": {
    type: "fixed",
    cost: 8,
  },

  // Shorts Ideas
  //
  // Generate / Generate Again:
  // 5  = 3 credits
  // 10 = 6 credits
  // 15 = 9 credits
  // 20 = 12 credits
  //
  // Individual Regenerate = 2 credits
  // Individual regenerate is handled separately
  // in /api/ai/route.ts using action === "regenerate".
  "shorts-ideas": {
    type: "count",
    costs: {
      5: 3,
      10: 6,
      15: 9,
      20: 12,
    },
  },

  // Thumbnail Title
  //
  // Generate / Generate Again:
  // 5  = 3 credits
  // 10 = 6 credits
  // 15 = 9 credits
  // 20 = 12 credits
  //
  // Individual Regenerate = 2 credits
  // Individual regenerate is handled separately
  // in /api/ai/route.ts using action === "regenerate".
  "thumbnail-title": {
    type: "count",
    costs: {
      5: 3,
      10: 6,
      15: 9,
      20: 12,
    },
  },

  // SEO Checker
  "seo-checker": {
    type: "fixed",
    cost: 3,
  },

  // Keyword Generator
  "keyword-generator": {
    type: "count",
    costs: {
      10: 2,
      20: 4,
      30: 6,
      50: 10,
    },
  },

  // Best Upload Time
  "best-upload-time": {
    type: "count",
    costs: {
      5: 2,
      7: 3,
      10: 5,
    },
  },
} as const;

// ============================================================
// GET CREDIT COST
// ============================================================

export function getCreditCost(
  toolId: AIToolId,
  count?: number
): number {
  const rule = CREDIT_RULES[toolId];

  // Fixed-cost tools
  if (rule.type === "fixed") {
    return rule.cost;
  }

  // Count-based tools
  if (!count) {
    throw new Error(
      `A result count is required for ${toolId}.`
    );
  }

  const cost =
    rule.costs[
      count as keyof typeof rule.costs
    ];

  if (typeof cost !== "number") {
    throw new Error(
      `Invalid result count "${count}" for ${toolId}.`
    );
  }

  return cost;
}

// ============================================================
// CHECK WHETHER USER CAN AFFORD THE GENERATION
// ============================================================

export function hasEnoughCredits(
  availableCredits: number,
  toolId: AIToolId,
  count?: number
): boolean {
  const requiredCredits = getCreditCost(
    toolId,
    count
  );

  return availableCredits >= requiredCredits;
}

// ============================================================
// GET REMAINING CREDITS AFTER GENERATION
// ============================================================

export function getRemainingCredits(
  availableCredits: number,
  toolId: AIToolId,
  count?: number
): number {
  const requiredCredits = getCreditCost(
    toolId,
    count
  );

  return Math.max(
    0,
    availableCredits - requiredCredits
  );
}