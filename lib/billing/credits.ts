// lib/billing/credits.ts

// ============================================================
// ALL AI TOOL IDS (32 TOOLS)
// ============================================================

export type AIToolId =

  // Creator Tools
  | "title-generator"
  | "description-generator"
  | "hashtag-generator"
  | "tags-generator"
  | "script-writer"
  | "shorts-ideas"
  | "thumbnail-title"
  | "seo-checker"
  | "keyword-generator"
  | "best-upload-time"


  // AI Platform Tools
  | "ai-chat-assistant"
  | "ai-image-generator"
  | "ai-video-generator"
  | "ai-voice-generator"
  | "ai-image-editor"
  | "ai-background-remover"
  | "ai-photo-enhancer"
  | "ai-clothes-changer"
  | "ai-image-upscaler"
  | "ai-avatar-generator"
  | "ai-ui-mockup-generator"
  | "ai-logo-generator"
  | "ai-color-palette-generator"
  | "image-converter"
  | "video-prompt-enhancer"
  | "video-hook-generator"
  | "ai-b-roll-generator"
  | "ai-video-scene-splitter"
  | "ai-subtitle-generator"
  | "ai-voice-sync-tool"
  | "ai-video-enhancer"
  | "ai-video-workflow-automation";


// ============================================================
// BILLING TYPES
// ============================================================


type FixedRule = {
  type: "fixed";
  cost: number;
};


type CountRule = {
  type: "count";
  costs: Record<number, number>;
};


type UnitRule = {
  type: "unit";
  source: "count" | "words" | "seconds";
  unitSize: number;
  costPerUnit: number;
};


type CreditRule =
  | FixedRule
  | CountRule
  | UnitRule;



export type CreditUsage = {

  words?: number;

  seconds?: number;

};


// ============================================================
// CREDIT RULES
// ============================================================


export const CREDIT_RULES = {



  // ==========================================================
  // YOUTUBE CREATOR TOOLS
  // ==========================================================


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



  "script-writer": {

    type: "fixed",

    cost: 8,

  },



  "shorts-ideas": {

    type: "count",

    costs: {

      5: 3,
      10: 6,
      15: 9,
      20: 12,

    },

  },



  "thumbnail-title": {

    type: "count",

    costs: {

      5: 3,
      10: 6,
      15: 9,
      20: 12,

    },

  },



  "seo-checker": {

    type: "fixed",

    cost: 3,

  },



  "keyword-generator": {

    type: "count",

    costs: {

      10: 2,
      20: 4,
      30: 6,
      50: 10,

    },

  },



  "best-upload-time": {

    type: "count",

    costs: {

      5: 2,
      7: 3,
      10: 5,

    },

  },





  // ==========================================================
  // AI TEXT ENGINE
  // ==========================================================


  // ChatGPT style assistant

  "ai-chat-assistant": {

    type: "unit",

    source: "count",

    unitSize: 1,

    costPerUnit: 1,

  },



  // Video prompt improvement

  "video-prompt-enhancer": {

    type: "fixed",

    cost: 2,

  },



  // Video hook ideas

  "video-hook-generator": {

    type: "fixed",

    cost: 2,

  },



  // ==========================================================
  // IMAGE AI ENGINE
  // ==========================================================



  // Image generation
  // Normal = 15 credits
  // Future HD/Ultra will be added separately

  "ai-image-generator": {

    type: "unit",

    source: "count",

    unitSize: 1,

    costPerUnit: 15,

  },



  // Image editing

  "ai-image-editor": {

    type: "fixed",

    cost: 15,

  },



  // Background remover

  "ai-background-remover": {

    type: "fixed",

    cost: 8,

  },



  // Photo quality improvement

  "ai-photo-enhancer": {

    type: "fixed",

    cost: 10,

  },



  // Clothes changing AI
  // Expensive fashion model processing

  "ai-clothes-changer": {

    type: "fixed",

    cost: 25,

  },

// ==========================================================
// CONTINUED AI TOOL CREDIT RULES
// ==========================================================



  // ==========================================================
  // VIDEO / AUDIO AI ENGINE
  // ==========================================================



  // AI Video Generator
  // 5 seconds = 100 credits
  // Future:
  // 10 sec = 200
  // 30 sec = 500


  "ai-video-generator": {

    type: "unit",

    source: "seconds",

    unitSize: 5,

    costPerUnit: 100,

  },



  // AI Voice Generator

  "ai-voice-generator": {

    type: "unit",

    source: "words",

    unitSize: 100,

    costPerUnit: 5,

  },



  // Image Upscaler

  "ai-image-upscaler": {

    type: "fixed",

    cost: 10,

  },



  // Avatar Generator

  "ai-avatar-generator": {

    type: "fixed",

    cost: 10,

  },



  // UI Mockup Generator

  "ai-ui-mockup-generator": {

    type: "fixed",

    cost: 10,

  },



  // Logo Generator

  "ai-logo-generator": {

    type: "fixed",

    cost: 10,

  },





  // ==========================================================
  // FREE TOOLS
  // ==========================================================


  // Unlimited but protected by daily limits in database


  "ai-color-palette-generator": {

    type: "fixed",

    cost: 0,

  },



  "image-converter": {

    type: "fixed",

    cost: 0,

  },





  // ==========================================================
  // ADVANCED VIDEO TOOLS
  // ==========================================================



  // B-Roll Generator

  "ai-b-roll-generator": {

    type: "unit",

    source: "count",

    unitSize: 1,

    costPerUnit: 50,

  },



  // Scene splitter

  "ai-video-scene-splitter": {

    type: "fixed",

    cost: 20,

  },



  // Subtitle generator

  // 1 minute = 5 credits


  "ai-subtitle-generator": {

    type: "unit",

    source: "seconds",

    unitSize: 60,

    costPerUnit: 5,

  },



  // Voice Sync

  "ai-voice-sync-tool": {

    type: "fixed",

    cost: 50,

  },



  // Video Enhancer

  "ai-video-enhancer": {

    type: "fixed",

    cost: 100,

  },



  // Workflow Automation

  "ai-video-workflow-automation": {

    type: "fixed",

    cost: 20,

  },


} satisfies Record<AIToolId, CreditRule>;





// ============================================================
// GET CREDIT COST
// ============================================================


export function getCreditCost(

  toolId: AIToolId,

  count?: number,

  usage?: CreditUsage

): number {


  const rule = CREDIT_RULES[toolId];



  // Fixed cost tools

  if (rule.type === "fixed") {

    return rule.cost;

  }





  // Count based tools

if (rule.type === "count") {

  if (
    count === undefined ||
    !Number.isInteger(count) ||
    count < 1
  ) {
    throw new Error(
      `Valid count required for ${toolId}`
    );
  }


  const costs = rule.costs as Record<number, number>;

  const cost = costs[count];


  if (cost === undefined) {
    throw new Error(
      `Invalid count ${count} for ${toolId}`
    );
  }


  return cost;

}




  // Unit based tools


  let quantity:number | undefined;



  if (rule.source === "count") {

    quantity = count ?? 1;

  }



  if (rule.source === "words") {

    quantity = usage?.words;

  }



  if (rule.source === "seconds") {

    quantity = usage?.seconds;

  }




  if (

    typeof quantity !== "number" ||

    !Number.isFinite(quantity) ||

    quantity <= 0

  ) {

    throw new Error(

      `Valid ${rule.source} required for ${toolId}`

    );

  }




  const units = Math.ceil(

    quantity / rule.unitSize

  );



  return units * rule.costPerUnit;

}





// ============================================================
// CHECK USER CREDIT
// ============================================================


export function hasEnoughCredits(

  availableCredits:number,

  toolId:AIToolId,

  count?:number,

  usage?:CreditUsage

):boolean {


  const required = getCreditCost(

    toolId,

    count,

    usage

  );


  return availableCredits >= required;

}





// ============================================================
// REMAINING CREDIT AFTER USE
// ============================================================


export function getRemainingCredits(

  availableCredits:number,

  toolId:AIToolId,

  count?:number,

  usage?:CreditUsage

):number {


  const cost = getCreditCost(

    toolId,

    count,

    usage

  );


  return Math.max(

    0,

    availableCredits - cost

  );

}