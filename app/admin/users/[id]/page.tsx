import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Mail,
  User,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { createActivityLog } from "@/lib/admin/activity";




async function updateUserStatus(
  id: string,
  status: string
) {

  "use server";


  const supabase =
    await createClient();



  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();




  if(!user){

    redirect("/login");

  }






  const {
    data: adminProfile,
  } = await supabase
    .from("profiles")
    .select("role")
    .eq(
      "id",
      user.id
    )
    .single();







  if(
    adminProfile?.role !== "admin" &&
    adminProfile?.role !== "super_admin"
  ){

    redirect("/dashboard");

  }








  const {
    error,
  } = await supabase
    .from("profiles")
    .update({

      status,

      updated_at:
        new Date().toISOString(),

    })
    .eq(
      "id",
      id
    );





  if(error){

    console.log(
      "STATUS UPDATE ERROR:",
      error
    );

    return;

  }




  await createActivityLog({
  user_id: id,
  action:
    status === "suspended"
      ? "User Suspended"
      : "User Activated",
  description:
    status === "suspended"
      ? "Admin suspended this account"
      : "Admin activated this account",
});






  redirect(
    `/admin/users/${id}`
  );


}









export default async function UserDetailsPage({
  params,
}:{
  params: Promise<{id:string}>;
}) {



  const {id} =
    await params;



  const supabase =
    await createClient();





  const {
    data: profile,
    error,
  } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      username,
      avatar_url,
      email,
      role,
      status,
      plan,
      current_plan,
      credits,
      total_used,
      created_at,
      updated_at
      `
    )
    .eq(
      "id",
      id
    )
    .maybeSingle();







  if(error || !profile){

    notFound();

  }








  const initials =
    profile.full_name
    ?
    profile.full_name
      .split(" ")
      .map(
        (name:string)=>
          name.charAt(0)
      )
      .join("")
      .toUpperCase()
    :
    "U";






  const activePlan =
    profile.current_plan ||
    profile.plan ||
    "free";





  const isSuspended =
    profile.status === "suspended";









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
          href="/admin/users"
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

          Back to Users

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








          <div
            className="
            flex
            flex-col
            gap-6
            sm:flex-row
            sm:items-center
            "
          >




            {
              profile.avatar_url
              ?

              <img
                src={profile.avatar_url}
                alt="User Avatar"
                className="
                h-24
                w-24
                rounded-full
                object-cover
                "
              />

              :

              <div
                className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-3xl
                font-bold
                "
              >
                {initials}
              </div>

            }







            <div>


              <h1
                className="
                text-3xl
                font-bold
                "
              >
                {profile.full_name || "No Name"}
              </h1>





              <p
                className="
                mt-2
                flex
                items-center
                gap-2
                text-gray-400
                "
              >

                <Mail size={16}/>

                {profile.email || "No Email"}

              </p>



            </div>




          </div>









          <div
            className="
            mt-10
            grid
            gap-5
            md:grid-cols-2
            "
          >




            <InfoCard
              icon={<User size={18}/>}
              title="Username"
              value={
                profile.username ||
                "Not Set"
              }
            />



            <InfoCard
              icon={<User size={18}/>}
              title="Role"
              value={
                profile.role ||
                "user"
              }
            />



            <InfoCard
              icon={<CreditCard size={18}/>}
              title="Plan"
              value={activePlan}
            />



            <InfoCard
              icon={<CreditCard size={18}/>}
              title="Credits"
              value={
                String(
                  profile.credits ?? 0
                )
              }
            />



            <InfoCard
              icon={<Calendar size={18}/>}
              title="Status"
              value={
                profile.status ||
                "active"
              }
            />



            <InfoCard
              icon={<Calendar size={18}/>}
              title="Joined"
              value={
                profile.created_at
                ?
                new Date(
                  profile.created_at
                )
                .toLocaleDateString()
                :
                "-"
              }
            />




          </div>









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
              User ID
            </p>


            <p
              className="
              mt-2
              break-all
              text-sm
              "
            >
              {profile.id}
            </p>


          </div>









          <div
  className="
  mt-8
  flex
  flex-wrap
  gap-4
  "
>


<Link
  href={`/admin/users/${profile.id}/edit`}
  className="
  rounded-xl
  bg-white
  px-5
  py-3
  text-sm
  font-semibold
  text-black
  hover:opacity-90
  "
>
  Edit User
</Link>




<Link
  href={`/admin/users/${profile.id}/plan`}
  className="
  rounded-xl
  border
  border-white/20
  px-5
  py-3
  text-sm
  hover:bg-white/10
  "
>
  Change Plan
</Link>





<Link
  href={`/admin/users/${profile.id}/activity`}
  className="
  rounded-xl
  border
  border-purple-500/30
  px-5
  py-3
  text-sm
  text-purple-400
  hover:bg-purple-500/10
  "
>
  Activity
</Link>





<Link
  href={`/admin/users/${profile.id}/credits`}
  className="
  rounded-xl
  border
  border-blue-500/30
  px-5
  py-3
  text-sm
  text-blue-400
  hover:bg-blue-500/10
  "
>
  Credits
</Link>





<Link
  href={`/admin/users/${profile.id}/sessions`}
  className="
  rounded-xl
  border
  border-green-500/30
  px-5
  py-3
  text-sm
  text-green-400
  hover:bg-green-500/10
  "
>
  Sessions
</Link>




<Link
  href={`/admin/users/${profile.id}/login-history`}
  className="
  rounded-xl
  border
  border-yellow-500/30
  px-5
  py-3
  text-sm
  text-yellow-400
  hover:bg-yellow-500/10
  "
>
  Login History
</Link>





<Link
  href={`/admin/users/${profile.id}/ai-usage`}
  className="
  rounded-xl
  border
  border-pink-500/30
  px-5
  py-3
  text-sm
  text-pink-400
  hover:bg-pink-500/10
  "
>
  AI Usage
</Link>





<Link
  href={`/admin/users/${profile.id}/content`}
  className="
  rounded-xl
  border
  border-cyan-500/30
  px-5
  py-3
  text-sm
  text-cyan-400
  hover:bg-cyan-500/10
  "
>
  Generated Content
</Link>





<Link
  href={`/admin/users/${profile.id}/export`}
  className="
  rounded-xl
  border
  border-white/20
  px-5
  py-3
  text-sm
  hover:bg-white/10
  "
>
  Export Data
</Link>






<form
  action={async()=>{

    "use server";


    await updateUserStatus(
      profile.id,
      isSuspended
      ?
      "active"
      :
      "suspended"
    );


  }}
>


<button
className={`
rounded-xl
border
px-5
py-3
text-sm

${
isSuspended

?

"border-green-500/30 text-green-400 hover:bg-green-500/10"

:

"border-red-500/30 text-red-400 hover:bg-red-500/10"

}

`}
>


{
isSuspended
?
"Activate User"
:
"Suspend User"
}


</button>


</form>




</div>






        </div>





      </div>



    </div>


  );

}









function InfoCard({
  icon,
  title,
  value,
}:{
  icon:React.ReactNode;
  title:string;
  value:string;
}){


  return (

    <div
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
        gap-2
        text-gray-400
        "
      >

        {icon}


        <span className="text-sm">
          {title}
        </span>


      </div>



      <p
        className="
        mt-3
        text-lg
        font-semibold
        capitalize
        "
      >
        {value}
      </p>



    </div>

  );


}