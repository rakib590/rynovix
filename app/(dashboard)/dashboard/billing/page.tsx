import UpgradeHero from "@/components/upgrade/UpgradeHero";
import PricingCards from "@/components/upgrade/PricingCards";
import ComparisonTable from "@/components/upgrade/ComparisonTable";
import UpgradeCTA from "@/components/upgrade/UpgradeCTA";
import UpgradeFAQ from "@/components/upgrade/UpgradeFAQ";

import { createClient } from "@/lib/supabase/server";

import {
  getPlan,
  type PlanId,
} from "@/lib/billing/plans";





export default async function BillingPage() {


  const supabase = await createClient();



  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();





  let profile = null;





  if (user) {


    const {
      data,
    } = await supabase

      .from("profiles")

      .select(
        `
        current_plan,
        credits
        `
      )

      .eq(
        "id",
        user.id
      )

      .single();



    profile = data;


  }







  const currentPlan = (

    profile?.current_plan ||

    "free"

  ).toLowerCase();







  // Get plan information from plans.ts

  const plan = getPlan(

    currentPlan as PlanId

  );







  // Total monthly credit allowance

  const totalCredits =

    plan?.credits ?? 300;







  // Current user remaining credits

  // If profile has no credit data,
  // use plan default credits

  const credits =

    profile?.credits ?? totalCredits;








  return (

    <div
      className="
      mx-auto
      w-full
      max-w-7xl
      space-y-8
      "
    >





      {/* Page Header */}


      <div>


        <h1
          className="
          text-3xl
          font-bold
          text-white
          "
        >

          Billing & Subscription

        </h1>





        <p
          className="
          mt-2
          text-sm
          text-slate-400
          "
        >

          Upgrade your RYNOVIX plan to unlock more AI credits,
          premium creator tools, faster AI generation,
          and all future AI features.

        </p>



      </div>








      {/* Current Plan + Credits */}


      <UpgradeHero

        currentPlan={currentPlan}

        credits={credits}

        totalCredits={totalCredits}

      />









      {/* Pricing */}


      <PricingCards

        currentPlan={currentPlan}

      />









      {/* Plan Comparison */}


      <ComparisonTable />





      {/* Upgrade CTA */}


      <UpgradeCTA />





      {/* FAQ */}


      <UpgradeFAQ />






    </div>

  );


}