export type BillingCycle = "monthly" | "yearly";

export type PlanId = "free" | "pro" | "business";


// ============================================================
// PLAN TYPE
// ============================================================

export interface Plan {

  id: PlanId;

  name: string;

  description: string;


  monthlyPrice: number;

  yearlyPrice: number;


  monthlyPriceId: string;

  yearlyPriceId: string;


  // Monthly AI credit allowance

  credits: number;


  popular?: boolean;


  features: string[];

}





// ============================================================
// RYNOVIX PLANS
// ============================================================


export const plans: Plan[] = [



  // ==========================================================
  // FREE PLAN
  // ==========================================================


  {
    id: "free",

    name: "Free",

    description:
      "Perfect for beginners who want to explore RYNOVIX AI.",


    monthlyPrice: 0,

    yearlyPrice: 0,


    monthlyPriceId:
      "price_free_monthly",

    yearlyPriceId:
      "price_free_yearly",


    credits: 300,



    features: [

      "300 AI Credits / month",

      "Access to all 32 AI Tools with limits",

      "10 Creator AI Tools Included",

      "AI Color Palette Generator Included",

      "Image Converter Included",

      "Limited AI Image Generation",

      "Limited AI Video Generation",

      "Standard AI Processing Speed",

      "AI History Access",

      "Community Support",

    ],

  },






  // ==========================================================
  // PRO PLAN
  // ==========================================================


  {
    id: "pro",

    name: "Pro",


    description:
      "For creators who need more AI power and higher generation limits.",



    monthlyPrice: 9,

    yearlyPrice: 7,



    monthlyPriceId:
      "2170309",


    yearlyPriceId:
      "2170323",



    credits: 5000,



    popular: true,



    features: [


      "5,000 AI Credits / month",

      "Full Access to all 32 AI Tools",

      "Higher AI Generation Limits",

      "AI Image Generation",

      "AI Video Generation",

      "AI Voice Generation",

      "Fast AI Processing",

      "Priority Generation Queue",

      "HD Export Quality",

      "Unlimited AI History",

      "Creator Commercial Usage",

      "Priority Support",

    ],

  },







  // ==========================================================
  // BUSINESS PLAN
  // ==========================================================


  {

    id: "business",


    name: "Business",



    description:
      "For agencies, teams and professional AI creators.",



    monthlyPrice: 29,


    yearlyPrice: 23,



    monthlyPriceId:
      "2170366",


    yearlyPriceId:
      "2170369",



    credits: 15000,



    features: [


      "15,000 AI Credits / month",

      "Everything in Pro Plan",

      "Maximum AI Generation Priority",

      "Higher Usage Capacity",

      "Advanced AI Features",

      "Team Workspace",

      "Future AI Models Access",

      "Future API Access",

      "Business Priority Support",

    ],

  },


];








// ============================================================
// GET PLAN
// ============================================================


export function getPlan(planId: PlanId) {


  return plans.find(

    (plan) =>

      plan.id === planId

  );


}








// ============================================================
// GET PLAN PRICE
// ============================================================


export function getPlanPrice(

  plan: Plan,

  billingCycle: BillingCycle

) {


  return billingCycle === "yearly"

    ? plan.yearlyPrice

    : plan.monthlyPrice;


}








// ============================================================
// GET PAYMENT PRICE ID
// ============================================================


export function getPlanPriceId(

  plan: Plan,

  billingCycle: BillingCycle

) {


  return billingCycle === "yearly"

    ? plan.yearlyPriceId

    : plan.monthlyPriceId;


}