import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { createActivityLog } from "@/lib/admin/activity";


export default async function UserCreditsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;


  const supabase = await createClient();



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
      credits
      `
    )
    .eq("id", id)
    .single();



  if (error || !user) {
    notFound();
  }





  const {
    data: history,
  } = await supabase
    .from("credit_history")
    .select(
      `
      id,
      tool,
      credits,
      type,
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



    console.log(
  "CREDIT PAGE USER ID:",
  id
);


console.log(
  "CREDIT HISTORY:",
  history
);






  async function updateCredits(
    formData: FormData
  ) {

    "use server";


    const supabase =
      await createClient();



    const amount =
      Number(
        formData.get("credits")
      );



    const type =
      String(
        formData.get("type")
      );



    if(!amount || amount <= 0){
      return;
    }




    const {
      data: profile,
    } = await supabase
      .from("profiles")
      .select("credits")
      .eq(
        "id",
        id
      )
      .single();




    const current =
      profile?.credits || 0;



    let newCredits =
      current;



    if(type === "add"){

      newCredits =
        current + amount;

    }



    if(type === "remove"){

      newCredits =
        Math.max(
          0,
          current - amount
        );

    }






    const {
      error:updateError
    } = await supabase
      .from("profiles")
      .update({

        credits:newCredits,

        updated_at:
          new Date()
          .toISOString(),

      })
      .eq(
        "id",
        id
      );





    if(updateError){

      console.log(
        "CREDIT UPDATE ERROR:",
        updateError
      );

      return;

    }








    const {
      error:historyError
    } = await supabase
      .from("credit_history")
      .insert({

        user_id:id,

        tool:"Admin",

        credits:amount,

        type,

        created_at:
          new Date()
          .toISOString(),

      });





    console.log(
      "CREDIT HISTORY ERROR:",
      historyError
    );








    await createActivityLog({

      user_id:id,

      action:"Credits Updated",

      description:
      `Admin ${
        type === "add"
        ?
        "added"
        :
        "removed"
      } ${amount} credits`

    });





    redirect(
      `/admin/users/${id}/credits`
    );

  }







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
        max-w-5xl
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

          Back to User

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
            Credit Management
          </h1>



          <p className="mt-2 text-gray-400">
            Manage user AI credits
          </p>






          <div
            className="
            mt-8
            rounded-2xl
            border
            border-white/10
            bg-black/30
            p-6
            "
          >

            <p className="text-gray-400">
              Current Credits
            </p>


            <h2
              className="
              mt-2
              text-4xl
              font-bold
              "
            >

              {user.credits ?? 0}

            </h2>


          </div>








          <form
            action={updateCredits}
            className="
            mt-8
            flex
            flex-wrap
            gap-4
            "
          >


            <select
              name="type"
              className="
              rounded-xl
              border
              border-white/10
              bg-black
              px-4
              py-3
              "
            >

              <option value="add">
                Add Credits
              </option>


              <option value="remove">
                Remove Credits
              </option>


            </select>





            <input
              name="credits"
              type="number"
              placeholder="Amount"
              required
              className="
              rounded-xl
              border
              border-white/10
              bg-black
              px-4
              py-3
              "
            />





            <button
              className="
              rounded-xl
              bg-white
              px-6
              py-3
              font-semibold
              text-black
              "
            >

              Update

            </button>


          </form>








          <div className="mt-10">


            <h2 className="text-xl font-bold">
              Credit History
            </h2>




            <div className="mt-5 space-y-4">



              {
                !history || history.length === 0

                ?

                <p className="text-gray-400">
                  No credit history
                </p>


                :


                history.map((item)=>(


                  <div
                    key={item.id}
                    className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/30
                    p-5
                    "
                  >



                    <div
                      className="
                      flex
                      flex-col
                      gap-3
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      "
                    >



                      <div>


                        <p className="font-semibold">
                          {item.tool}
                        </p>



                        <p className="mt-1 text-sm text-gray-400">

                          {
                            new Date(
                              item.created_at
                            )
                            .toLocaleString()
                          }

                        </p>


                      </div>






                      <div
                        className="
                        flex
                        items-center
                        gap-3
                        "
                      >



                        <span
                          className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs

                          ${
                            item.type === "add"

                            ?

                            "bg-green-500/20 text-green-400"

                            :

                            "bg-red-500/20 text-red-400"

                          }

                          `}
                        >

                          {
                            item.type === "add"
                            ?
                            "Added"
                            :
                            "Removed"
                          }

                        </span>





                        <span
                          className={`
                          text-xl
                          font-bold

                          ${
                            item.type === "add"

                            ?

                            "text-green-400"

                            :

                            "text-red-400"

                          }

                          `}
                        >

                          {
                            item.type === "add"
                            ?
                            "+"
                            :
                            "-"
                          }

                          {item.credits}

                        </span>



                      </div>




                    </div>


                  </div>


                ))

              }




            </div>



          </div>





        </div>



      </div>


    </div>

  );

}