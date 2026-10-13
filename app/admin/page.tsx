import {
  Users,
  Bot,
  Coins,
  DollarSign,
} from "lucide-react";

import DashboardCard from "@/components/admin/DashboardCard";
import AdminTable from "@/components/admin/AdminTable";

import { createClient } from "@/lib/supabase/server";



async function getDashboardData() {

  const supabase = await createClient();


  const {
    count: totalUsers,
    error: usersError,
  } =
    await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      });



  const {
    count: totalGenerations,
    error: aiError,
  } =
    await supabase
      .from("ai_history")
      .select("*", {
        count: "exact",
        head: true,
      });



  const {
    data: creditData,
    error: creditError,
  } =
    await supabase
      .from("ai_history")
      .select("credits_used");



  if(usersError){
    console.log(
      "Users Error:",
      usersError.message
    );
  }


  if(aiError){
    console.log(
      "AI Error:",
      aiError.message
    );
  }


  if(creditError){
    console.log(
      "Credit Error:",
      creditError.message
    );
  }



  const creditsUsed =
    creditData?.reduce(
      (total,item)=>{

        return (
          total +
          Number(
            item.credits_used || 0
          )
        );

      },
      0
    ) || 0;




  const {
    data: recentUsers,
  } =
    await supabase
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





  const {
    data: recentAI,
  } =
    await supabase
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





  return {


    stats:{


      totalUsers:
        totalUsers || 0,


      totalGenerations:
        totalGenerations || 0,


      creditsUsed,


      revenue:0,


    },


    recentUsers:
      recentUsers || [],


    recentAI:
      recentAI || [],


  };

}






export default async function AdminDashboard(){


  const data =
    await getDashboardData();



  return (

    <div>


      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>


        <p className="mt-2 text-gray-400">
          Control your entire RYNOVIX platform from here.
        </p>


      </div>




      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        "
      >


        <DashboardCard
          title="Total Users"
          value={String(data.stats.totalUsers)}
          description="Registered users"
          icon={Users}
        />


        <DashboardCard
          title="AI Generations"
          value={String(data.stats.totalGenerations)}
          description="Total AI usage"
          icon={Bot}
        />


        <DashboardCard
          title="Credits Used"
          value={String(data.stats.creditsUsed)}
          description="Total credits consumed"
          icon={Coins}
        />


        <DashboardCard
          title="Revenue"
          value={`$${data.stats.revenue}`}
          description="Total earnings"
          icon={DollarSign}
        />


      </div>





      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        mt-8
        "
      >


        <AdminTable title="Recent Users">

          <div className="space-y-4">


          {
            data.recentUsers.length === 0 ? (

              <p className="text-sm text-gray-400">
                No users found
              </p>

            ) : (

              data.recentUsers.map(
                (user,index)=>(

                <div
                  key={index}
                  className="
                  flex
                  justify-between
                  text-sm
                  text-gray-300
                  "
                >

                  <span>
                    {
                      user.full_name ||
                      "Unknown User"
                    }
                  </span>


                  <span>
                    {
                      user.current_plan ||
                      "Free"
                    }
                  </span>


                </div>

                )
              )

            )
          }


          </div>


        </AdminTable>





        <AdminTable title="Recent AI Activity">


          <div className="space-y-4">


          {
            data.recentAI.length === 0 ? (

              <p className="text-sm text-gray-400">
                No AI activity found
              </p>


            ) : (

              data.recentAI.map(
                (item,index)=>(

                <div
                  key={index}
                  className="
                  flex
                  justify-between
                  text-sm
                  text-gray-300
                  "
                >

                  <span>
                    {
                      item.tool_name ||
                      "AI Tool"
                    }
                  </span>


                  <span>
                    {
                      item.status ||
                      "Completed"
                    }
                  </span>


                </div>

                )
              )

            )
          }


          </div>


        </AdminTable>



      </div>


    </div>

  );

}