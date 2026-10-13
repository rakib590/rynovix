import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Monitor,
  Globe,
  Clock,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";


export default async function UserSessionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;


  const supabase =
    await createClient();





  const {
    data:user,
    error:userError,
  } =
    await supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        email
        `
      )
      .eq(
        "id",
        id
      )
      .single();




  if(userError || !user){

    notFound();

  }





  const {
    data:sessions,
    error,
  } =
    await supabase
      .from("user_sessions")
      .select(
        `
        id,
        device,
        browser,
        operating_system,
        ip_address,
        status,
        created_at,
        last_active_at
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
            User Sessions
          </h1>


          <p className="mt-2 text-gray-400">

            {user.email}

          </p>







          <div
            className="
            mt-8
            space-y-4
            "
          >



          {
            !sessions ||
            sessions.length === 0

            ?

            <div
              className="
              rounded-2xl
              border
              border-white/10
              bg-black/30
              p-6
              text-gray-400
              "
            >

              No active sessions found.

            </div>


            :


            sessions.map((session)=>(


              <div
                key={session.id}
                className="
                rounded-2xl
                border
                border-white/10
                bg-black/30
                p-6
                "
              >



                <div
                  className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  "
                >




                  <div
                    className="
                    space-y-3
                    "
                  >



                    <div
                      className="
                      flex
                      items-center
                      gap-2
                      "
                    >

                      <Monitor size={18}/>

                      <span>
                        {session.device || "Unknown Device"}
                      </span>

                    </div>





                    <div
                      className="
                      flex
                      items-center
                      gap-2
                      text-gray-400
                      "
                    >

                      <Globe size={18}/>

                      <span>
                        {session.browser || "Unknown Browser"}
                      </span>

                    </div>





                    <div
                      className="
                      flex
                      items-center
                      gap-2
                      text-gray-400
                      "
                    >

                      <Clock size={18}/>

                      <span>

                        {
                          new Date(
                            session.created_at
                          )
                          .toLocaleString()
                        }

                      </span>

                    </div>



                  </div>








                  <div
                    className="
                    text-sm
                    text-gray-400
                    "
                  >

                    <p>
                      OS:
                      {" "}
                      {session.operating_system || "-"}
                    </p>


                    <p>
                      IP:
                      {" "}
                      {session.ip_address || "-"}
                    </p>


                    <p
                      className="
                      mt-2
                      text-green-400
                      "
                    >

                      {session.status}

                    </p>


                  </div>





                </div>



              </div>


            ))

          }



          </div>






        </div>



      </div>


    </div>

  );

}