import UpgradeHero from "@/components/upgrade/UpgradeHero";
import PricingCards from "@/components/upgrade/PricingCards";
import ComparisonTable from "@/components/upgrade/ComparisonTable";
import UpgradeCTA from "@/components/upgrade/UpgradeCTA";
import UpgradeFAQ from "@/components/upgrade/UpgradeFAQ";

import { createClient } from "@/lib/supabase/server";



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
        plan,
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






  const currentPlan =
    (
      profile?.current_plan ||
      profile?.plan ||
      "free"
    )
    .toLowerCase();





  const credits =
    profile?.credits ?? 0;






  const totalCredits =
    currentPlan === "pro"
      ? 2000
      : currentPlan === "business"
      ? 10000
      : 100;







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







      <ComparisonTable />



      <UpgradeCTA />



      <UpgradeFAQ />





    </div>

  );

}