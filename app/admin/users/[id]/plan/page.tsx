import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createActivityLog } from "@/lib/admin/activity";



export default async function ChangePlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;


  const supabase =
    await createClient();



  const {
    data: user,
    error,
  } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      email,
      plan,
      current_plan,
      credits
      `
    )
    .eq("id", id)
    .single();



  if(error || !user){

    notFound();

  }






  async function updatePlan(
    formData: FormData
  ){

    "use server";



    const supabase =
      await createClient();



    const plan =
      String(
        formData.get("plan") || "free"
      );



    let credits = 100;



    if(plan === "pro"){

      credits = 2000;

    }



    if(plan === "business"){

      credits = 10000;

    }







    const {
      error,
    } = await supabase
      .from("profiles")
      .update({

        plan,

        current_plan: plan,

        credits,

        updated_at:
          new Date().toISOString(),

      })
      .eq(
        "id",
        id
      );






    if(error){

      console.log(
        "CHANGE PLAN ERROR:",
        error
      );

      return;

    }



    await createActivityLog({

  user_id: id,

  action: "Plan Changed",

  description: `Admin changed user plan to ${plan}`,

});





    redirect(
      `/admin/users/${id}`
    );


  }








  const activePlan =
    user.current_plan ||
    user.plan ||
    "free";






  return (

    <div
      className="
      min-h-screen
      bg-black
      px-6
      py-10
      text-white
      "
    >


      <div
        className="
        mx-auto
        max-w-3xl
        "
      >



        <Link
          href={`/admin/users/${id}`}
          className="
          mb-8
          inline-flex
          items-center
          gap-2
          text-gray-400
          hover:text-white
          "
        >

          <ArrowLeft size={18}/>

          Back

        </Link>







        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
          "
        >




          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Change User Plan
          </h1>



          <p
            className="
            mt-2
            text-gray-400
            "
          >
            Update subscription plan and user credits
          </p>








          <div
            className="
            mt-8
            rounded-2xl
            border
            border-white/10
            bg-black/30
            p-5
            "
          >


            <p className="text-sm text-gray-400">
              User
            </p>



            <h2 className="mt-2 text-xl font-semibold">
              {user.full_name || "No Name"}
            </h2>



            <p className="mt-1 text-gray-400">
              {user.email || "No Email"}
            </p>



          </div>









          <form
            action={updatePlan}
            className="
            mt-8
            space-y-6
            "
          >





            <div>

              <label
                className="
                text-sm
                text-gray-400
                "
              >
                Select Plan
              </label>



              <select
                name="plan"
                defaultValue={activePlan}
                className="
                mt-2
                w-full
                rounded-xl
                border
                border-white/10
                bg-black
                px-4
                py-3
                text-white
                "
              >



                <option value="free">
                  Free - 100 Credits
                </option>



                <option value="pro">
                  Pro - 2000 Credits
                </option>



                <option value="business">
                  Business - 10000 Credits
                </option>



              </select>


            </div>








            <div
              className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-4
              "
            >


              <p className="text-sm text-gray-400">
                Current Credits
              </p>



              <p
                className="
                mt-2
                text-2xl
                font-bold
                "
              >
                {user.credits ?? 0}
              </p>


            </div>









            <button
              type="submit"
              className="
              rounded-xl
              bg-white
              px-6
              py-3
              font-semibold
              text-black
              hover:opacity-90
              "
            >
              Save Plan
            </button>





          </form>





        </div>



      </div>



    </div>

  );

}