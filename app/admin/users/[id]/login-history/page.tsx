import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Monitor } from "lucide-react";

import { createClient } from "@/lib/supabase/server";


export default async function LoginHistoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;


  const supabase = await createClient();




  const {
    data: user,
    error:userError,
  } = await supabase
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
    data: history,
    error,
  } = await supabase
    .from("login_history")
    .select(
      `
      id,
      login_time,
      logout_time,
      device,
      browser,
      ip_address,
      status
      `
    )
    .eq(
      "user_id",
      id
    )
    .order(
      "login_time",
      {
        ascending:false,
      }
    );




  console.log(
    "LOGIN HISTORY ERROR:",
    error
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
            Login History
          </h1>



          <p
            className="
            mt-2
            text-gray-400
            "
          >
            View user login activity
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


            <p className="text-gray-400 text-sm">
              User
            </p>


            <h2 className="mt-2 text-xl font-semibold">
              {user.full_name || "No Name"}
            </h2>


            <p className="text-gray-400">
              {user.email}
            </p>


          </div>









          <div className="mt-8 space-y-4">



            {
              !history ||
              history.length === 0

              ?


              <div
                className="
                rounded-2xl
                border
                border-white/10
                bg-black/30
                p-6
                text-center
                text-gray-400
                "
              >

                No login history found.

              </div>



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
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    "
                  >




                    <div
                      className="
                      flex
                      items-center
                      gap-3
                      "
                    >

                      <Clock
                        size={20}
                        className="text-blue-400"
                      />



                      <div>

                        <p className="font-semibold">
                          Login
                        </p>


                        <p className="text-sm text-gray-400">

                          {
                            new Date(
                              item.login_time
                            )
                            .toLocaleString()
                          }

                        </p>


                      </div>


                    </div>








                    <div
                      className="
                      flex
                      items-center
                      gap-3
                      "
                    >

                      <Monitor
                        size={18}
                        className="text-gray-400"
                      />

                      <span
                        className="
                        rounded-full
                        bg-green-500/20
                        px-3
                        py-1
                        text-xs
                        text-green-400
                        "
                      >
                        {item.status}
                      </span>


                    </div>



                  </div>






                  <div
                    className="
                    mt-4
                    grid
                    gap-3
                    sm:grid-cols-3
                    "
                  >


                    <Info
                      title="Device"
                      value={
                        item.device ||
                        "Unknown"
                      }
                    />


                    <Info
                      title="Browser"
                      value={
                        item.browser ||
                        "Unknown"
                      }
                    />


                    <Info
                      title="IP"
                      value={
                        item.ip_address ||
                        "-"
                      }
                    />


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





function Info({
  title,
  value,
}:{
  title:string;
  value:string;
}){


return (

<div
className="
rounded-xl
border
border-white/10
bg-white/5
p-4
"
>


<p className="text-xs text-gray-400">
{title}
</p>


<p className="mt-1 text-sm">
{value}
</p>


</div>

);


}