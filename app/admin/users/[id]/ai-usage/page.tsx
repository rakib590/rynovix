import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";


export default async function AIUsagePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {


  const { id } = await params;


  const supabase = await createClient();



  const {
    data: usage,
  } =
    await supabase
      .from("ai_history")
      .select(
        `
        id,
        tool_name,
        title,
        prompt,
        score,
        credits_used,
        created_at
        `
      )
      .eq(
        "user_id",
        id
      )
      .order(
        "created_at",
        {
          ascending:false,
        }
      );





  // Live Total Generations

  const {
    count: totalGenerations,
  } =
    await supabase
      .from("ai_history")
      .select(
        "*",
        {
          count:"exact",
          head:true,
        }
      )
      .eq(
        "user_id",
        id
      );





  // Live Total Credits Used

  const {
    data: creditData,
  } =
    await supabase
      .from("ai_history")
      .select(
        "credits_used"
      )
      .eq(
        "user_id",
        id
      );



  const totalCreditsUsed =
    creditData?.reduce(
      (
        total,
        item
      ) =>
        total +
        (
          item.credits_used || 0
        ),
      0
    ) || 0;





  // Last AI Activity

  const lastActivity =
    usage && usage.length > 0
      ? usage[0].created_at
      : null;






  return (

    <div className="space-y-6">



      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        "
      >


        <div>

          <h1 className="text-2xl font-bold text-white">
            AI Usage
          </h1>


          <p className="text-gray-400">
            User AI generation history
          </p>


        </div>



        <Link
          href={`/admin/users/${id}`}
          className="
          flex
          items-center
          gap-2
          rounded-lg
          border
          border-white/10
          bg-white/5
          px-4
          py-2
          text-sm
          text-white
          hover:bg-white/10
          "
        >

          <ArrowLeft size={16}/>

          Back

        </Link>


      </div>







      {/* Live Stats */}

      <div
        className="
        grid
        gap-4
        md:grid-cols-3
        "
      >



        {/* Total Generations */}

        <div
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-5
          "
        >

          <p className="text-sm text-gray-400">
            Total Generations
          </p>


          <h2
            className="
            mt-2
            text-3xl
            font-bold
            text-white
            "
          >

            {totalGenerations || 0}

          </h2>


          <p className="mt-2 text-xs text-gray-500">
            Total AI generations by user
          </p>


        </div>







        {/* Credits Used */}

        <div
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-5
          "
        >

          <p className="text-sm text-gray-400">
            Credits Used
          </p>


          <h2
            className="
            mt-2
            text-3xl
            font-bold
            text-white
            "
          >

            {totalCreditsUsed}

          </h2>


          <p className="mt-2 text-xs text-gray-500">
            Total credits consumed
          </p>


        </div>







        {/* Last AI Activity */}

        <div
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-5
          "
        >

          <p className="text-sm text-gray-400">
            Last AI Activity
          </p>


          <h2
            className="
            mt-2
            text-lg
            font-bold
            text-green-400
            "
          >

          {
            lastActivity
            ? new Date(lastActivity).toLocaleDateString()
            : "No Activity"
          }

          </h2>


          <p className="mt-2 text-xs text-gray-500">

          {
            lastActivity
            ? new Date(lastActivity).toLocaleTimeString()
            : "User has not used AI yet"
          }

          </p>


       </div>
    
    
    </div>







      {/* Table */}

      <div
        className="
        overflow-hidden
        rounded-xl
        border
        border-white/10
        "
      >


        <table
          className="
          w-full
          text-left
          "
        >


          <thead
            className="
            bg-white/5
            "
          >

            <tr
              className="
              text-sm
              text-gray-400
              "
            >

              <th className="px-5 py-4">
                Tool
              </th>


              <th className="px-5 py-4">
                Title
              </th>


              <th className="px-5 py-4">
                Credits
              </th>


              <th className="px-5 py-4">
                Score
              </th>


              <th className="px-5 py-4">
                Date
              </th>


            </tr>

          </thead>





          <tbody>


          {
            usage?.map(
              (item)=>(

                <tr
                  key={item.id}
                  className="
                  border-t
                  border-white/10
                  text-sm
                  text-gray-300
                  "
                >


                  <td
                    className="
                    px-5
                    py-4
                    text-white
                    "
                  >
                    {item.tool_name || "AI Tool"}
                  </td>



                  <td className="px-5 py-4">
                    {item.title || "-"}
                  </td>



                  <td className="px-5 py-4">
                    {item.credits_used || 0}
                  </td>



                  <td className="px-5 py-4">
                    {item.score ?? "-"}
                  </td>



                  <td className="px-5 py-4">

                    {
                      new Date(
                        item.created_at
                      ).toLocaleDateString()
                    }

                  </td>



                </tr>

              )
            )
          }






          {
            !usage?.length && (

              <tr>

                <td
                  colSpan={5}
                  className="
                  px-5
                  py-10
                  text-center
                  text-gray-500
                  "
                >
                  No AI usage found
                </td>

              </tr>

            )
          }



          </tbody>


        </table>


      </div>



    </div>

  );

}