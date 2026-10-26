import { createClient } from "@/lib/supabase/server";

import UsersTable from "./UsersTable";
import OnlineUsersCount from "./OnlineUsersCount";


export default async function UsersPage() {


  const supabase = await createClient();



  const {
    data: users,
    error,
  } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      username,
      email,
      avatar_url,
      role,
      status,
      plan,
      current_plan,
      credits,
      total_used,
      is_online,
      email_verified,
      created_at,
      last_login
      `
    )
    .order(
      "created_at",
      {
        ascending:false,
      }
    );





  if(error){

    console.error(
      "USERS FETCH ERROR:",
      error
    );

  }





  const userList = users || [];





  const totalUsers =
    userList.length;




  const activeUsers =
    userList.filter(
      (user)=>
        user.status === "active"
    ).length;





  const suspendedUsers =
    userList.filter(
      (user)=>
        user.status === "suspended"
    ).length;





  const adminUsers =
    userList.filter(
      (user)=>
        user.role === "admin" ||
        user.role === "super_admin"
    ).length;





  const proUsers =
    userList.filter(
      (user)=>
        (
          user.current_plan ||
          user.plan ||
          "free"
        )
        === "pro"
    ).length;





    const businessUsers =
  userList.filter(
    (user) =>
      (
        user.current_plan ||
        user.plan ||
        "free"
      ).toLowerCase() === "business"
  ).length;





  
  return (

    <div
      className="
      space-y-8
      "
    >



      {/* Header */}


      <div>


        <h1
          className="
          text-3xl
          font-bold
          text-white
          "
        >
          Users Management
        </h1>



        <p
          className="
          mt-2
          text-gray-400
          "
        >
          Manage RYNOVIX users, plans, credits and account status.
        </p>


      </div>







      {/* Stats */}


      <div
        className="
        grid
        gap-5
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-6
        "
      >


        <StatCard
          title="Total Users"
          value={totalUsers}
        />


        <StatCard
          title="Active Users"
          value={activeUsers}
        />


        <StatCard
          title="Suspended"
          value={suspendedUsers}
        />


        <StatCard
          title="Admins"
          value={adminUsers}
        />


        <StatCard
          title="Pro Users"
          value={proUsers}
        />

        <StatCard
          title="Business Users"
          value={businessUsers}
        />


        <OnlineUsersCount />


      </div>







      {/* Table */}



      {
        userList.length > 0

        ?

        <UsersTable
          users={userList}
        />


        :

        <div
          className="
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-8
          text-center
          text-gray-400
          "
        >

          No users found.

        </div>

      }




    </div>

  );

}







function StatCard({
  title,
  value,
}:{
  title:string;
  value:number;
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


      <p
        className="
        text-sm
        text-gray-400
        "
      >
        {title}
      </p>




      <h2
        className="
        mt-3
        text-3xl
        font-bold
        text-white
        "
      >

        {value}

      </h2>



    </div>

  );

}