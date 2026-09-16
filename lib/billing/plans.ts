export type BillingCycle = "monthly" | "yearly";

export type PlanId = "free" | "pro" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  description: string;

  monthlyPrice: number;
  yearlyPrice: number;

  monthlyPriceId: string;
  yearlyPriceId: string;

  popular?: boolean;

  features: string[];
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description:
      "Perfect for getting started with RYNOVIX.",

    monthlyPrice: 0,
    yearlyPrice: 0,

    // Replace with real payment gateway IDs later
    monthlyPriceId: "price_free_monthly",
    yearlyPriceId: "price_free_yearly",

    features: [
      "100 AI Credits / month",
      "Access to 10 AI Creator Tools",
      "Standard AI Generation Speed",
      "History Access",
      "Community Support",
    ],
  },

  {
    id: "pro",
    name: "Pro",
    description:
      "For creators who need more AI power and higher limits.",

    monthlyPrice: 9,
    yearlyPrice: 7,

    monthlyPriceId: "price_pro_monthly",
    yearlyPriceId: "price_pro_yearly",

    popular: true,

    features: [
      "1,000 AI Credits / month",
      "All Version 1.0 AI Tools",
      "Fast AI Generation",
      "Priority Processing",
      "Unlimited History",
      "Priority Support",
    ],
  },

  {
    id: "business",
    name: "Business",
    description:
      "Best for teams, agencies, and high-volume creators.",

    monthlyPrice: 29,
    yearlyPrice: 23,

    monthlyPriceId: "price_business_monthly",
    yearlyPriceId: "price_business_yearly",

    features: [
      "5,000 AI Credits / month",
      "Everything in Pro",
      "Highest AI Generation Priority",
      "Future AI Tools Included",
      "Team Workspace",
      "Priority Business Support",
    ],
  },
];

export function getPlan(planId: PlanId) {
  return plans.find((plan) => plan.id === planId);
}

export function getPlanPrice(
  plan: Plan,
  billingCycle: BillingCycle
) {
  return billingCycle === "yearly"
    ? plan.yearlyPrice
    : plan.monthlyPrice;
}

export function getPlanPriceId(
  plan: Plan,
  billingCycle: BillingCycle
) {
  return billingCycle === "yearly"
    ? plan.yearlyPriceId
    : plan.monthlyPriceId;
}