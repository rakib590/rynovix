import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createActivityLog } from "@/lib/admin/activity";


export default async function EditUserPage({
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
      username,
      email,
      role,
      status
      `
    )
    .eq("id", id)
    .single();



  if (error || !user) {
    notFound();
  }





  async function updateUser(
    formData: FormData
  ) {

    "use server";


    const supabase =
      await createClient();



    const full_name =
      String(
        formData.get("full_name") || ""
      );


    const username =
      String(
        formData.get("username") || ""
      );


    const role =
      String(
        formData.get("role") || "user"
      );


    const status =
      String(
        formData.get("status") || "active"
      );




    const {
      error,
    } = await supabase
      .from("profiles")
      .update({

        full_name,

        username,

        role,

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
        "EDIT USER ERROR:",
        error
      );

      return;

    }



    await createActivityLog({

  user_id: id,

  action: "Profile Updated",

  description:
    "Admin updated user profile information",

});




    redirect(
      `/admin/users/${id}`
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
            Edit User
          </h1>



          <p
            className="
            mt-2
            text-gray-400
            "
          >
            Update user profile information
          </p>







          <form
            action={updateUser}
            className="
            mt-8
            space-y-6
            "
          >





            <div>

              <label className="text-sm text-gray-400">
                Full Name
              </label>


              <input
                name="full_name"
                defaultValue={
                  user.full_name || ""
                }
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
                outline-none
                "
              />


            </div>







            <div>

              <label className="text-sm text-gray-400">
                Username
              </label>


              <input
                name="username"
                defaultValue={
                  user.username || ""
                }
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
                outline-none
                "
              />

            </div>








            <div>

              <label className="text-sm text-gray-400">
                Role
              </label>


              <select
                name="role"
                defaultValue={
                  user.role || "user"
                }
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

                <option value="user">
                  User
                </option>


                <option value="admin">
                  Admin
                </option>


                <option value="super_admin">
                  Super Admin
                </option>


              </select>


            </div>








            <div>

              <label className="text-sm text-gray-400">
                Status
              </label>


              <select
                name="status"
                defaultValue={
                  user.status || "active"
                }
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

                <option value="active">
                  Active
                </option>


                <option value="suspended">
                  Suspended
                </option>


                <option value="banned">
                  Banned
                </option>


              </select>


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
              Save Changes
            </button>




          </form>



        </div>



      </div>



    </div>

  );

}