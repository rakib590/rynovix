import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Activity } from "lucide-react";

import { createClient } from "@/lib/supabase/server";


export default async function UserActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;


  const supabase = await createClient();



  const {
    data: user,
    error: userError,
  } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      email
      `
    )
    .eq("id", id)
    .single();



  if(userError || !user){
    notFound();
  }





  const {
    data: activities,
    error,
  } = await supabase
    .from("user_activity_logs")
    .select(
      `
      id,
      action,
      description,
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
        max-w-4xl
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



          <div>

            <h1
              className="
              text-3xl
              font-bold
              "
            >
              User Activity
            </h1>


            <p
              className="
              mt-2
              text-gray-400
              "
            >
              Activity history of {user.full_name || user.email}
            </p>


          </div>







          <div
            className="
            mt-8
            space-y-4
            "
          >



          {
            !activities ||
            activities.length === 0

            ?

            <div
              className="
              rounded-2xl
              border
              border-white/10
              bg-black/30
              p-8
              text-center
              text-gray-400
              "
            >

              No activity found.

            </div>


            :


            activities.map(
              (item)=>(


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
                  items-center
                  gap-3
                  "
                >

                  <div
                    className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-purple-500/20
                    "
                  >

                    <Activity
                      size={18}
                      className="text-purple-400"
                    />

                  </div>




                  <div>


                    <h3
                      className="
                      font-semibold
                      "
                    >
                      {item.action}
                    </h3>


                    <p
                      className="
                      mt-1
                      text-sm
                      text-gray-400
                      "
                    >
                      {item.description || "No description"}
                    </p>


                  </div>



                </div>





                <div
                  className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-gray-500
                  "
                >

                  <Clock size={14}/>


                  {
                    new Date(
                      item.created_at
                    )
                    .toLocaleString()
                  }


                </div>



              </div>


              )
            )

          }



          </div>




        </div>


      </div>


    </div>

  );

}