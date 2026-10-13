import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";


export async function GET() {

  try {


    const supabase = await createClient();



    // =====================================
    // TOTAL USERS
    // =====================================

    const {
      count: totalUsers,
      error: userCountError,
    } = await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      });


    if (userCountError) {
      console.error(
        "USER COUNT ERROR:",
        userCountError
      );
    }




    // =====================================
    // TOTAL AI GENERATIONS
    // =====================================

    const {
      count: totalGenerations,
      error: aiCountError,
    } = await supabase
      .from("ai_history")
      .select("*", {
        count: "exact",
        head: true,
      });


    if (aiCountError) {
      console.error(
        "AI COUNT ERROR:",
        aiCountError
      );
    }




    // =====================================
    // TOTAL CREDITS USED
    // =====================================

    const {
      data: creditData,
      error: creditError,
    } = await supabase
      .from("ai_history")
      .select(
        "credits_used"
      );


    if (creditError) {

      console.error(
        "CREDIT SUM ERROR:",
        creditError
      );

    }



    const creditsUsed =
      creditData?.reduce(
        (
          total,
          item
        ) =>
          total +
          Number(
            item.credits_used || 0
          ),
        0
      ) || 0;




    // =====================================
    // RECENT USERS
    // =====================================

    const {
      data: recentUsers,
      error: recentUserError,
    } = await supabase
      .from("profiles")
      .select(
        `
        full_name,
        current_plan,
        created_at
        `
      )
      .order(
        "created_at",
        {
          ascending:false,
        }
      )
      .limit(5);



    if (recentUserError) {

      console.error(
        "RECENT USERS ERROR:",
        recentUserError
      );

    }




    // =====================================
    // RECENT AI ACTIVITY
    // =====================================

    const {
      data: recentAI,
      error: recentAIError,
    } = await supabase
      .from("ai_history")
      .select(
        `
        tool_name,
        status,
        created_at
        `
      )
      .order(
        "created_at",
        {
          ascending:false,
        }
      )
      .limit(5);



    if (recentAIError) {

      console.error(
        "RECENT AI ERROR:",
        recentAIError
      );

    }





    return NextResponse.json({

      success:true,


      stats:{

        totalUsers:
          totalUsers || 0,


        totalGenerations:
          totalGenerations || 0,


        creditsUsed,


        // Billing system তৈরি না হওয়া পর্যন্ত
        revenue:0,

      },



      recentUsers:
        recentUsers || [],



      recentAI:
        recentAI || [],


    });



  } catch(error:any){


    console.error(
      "ADMIN DASHBOARD ERROR:",
      error
    );



    return NextResponse.json(

      {
        success:false,
        error:
          error.message ||
          "Dashboard error",
      },

      {
        status:500,
      }

    );


  }

}