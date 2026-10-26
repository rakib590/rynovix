import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileJson,
} from "lucide-react";


export const dynamic = "force-dynamic";



export default async function ExportUserDataPage({
  params,
}: {
  params: Promise<{
    id:string;
  }>;
}) {


  const { id } = await params;


  const supabase = await createClient();





  // User Data

  const {
    data:user
  } =
    await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      username,
      email,
      role,
      plan,
      credits,
      status,
      avatar_url,
      created_at
      `
    )
    .eq(
      "id",
      id
    )
    .single();







  // AI History

  const {
    data:aiHistory
  } =
    await supabase
    .from("ai_history")
    .select(
      `
      id,
      tool_name,
      title,
      prompt,
      result,
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
        ascending:false
      }
    );







  const exportData = {

    user,

    ai_history:
      aiHistory || [],


    exported_at:
      new Date()
      .toISOString()

  };









  return (

    <div
      className="
      space-y-6
      "
    >






      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        "
      >


        <div>


          <h1
            className="
            text-2xl
            font-bold
            text-white
            "
          >

            Export User Data

          </h1>


          <p
            className="
            text-gray-400
            "
          >

            Download complete user information

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












      {/* User Preview */}


      <div
        className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
        "
      >


        <h2
          className="
          mb-4
          text-lg
          font-semibold
          text-white
          "
        >

          User Information

        </h2>




        <div
          className="
          grid
          gap-4
          md:grid-cols-3
          "
        >


          <Info
            label="Name"
            value={user?.full_name}
          />


          <Info
            label="Username"
            value={user?.username}
          />


          <Info
            label="Role"
            value={user?.role}
          />


          <Info
            label="Plan"
            value={user?.plan}
          />


          <Info
            label="Credits"
            value={
              user?.credits
            }
          />


          <Info
            label="Status"
            value={
              user?.status
            }
          />



        </div>



      </div>













      {/* Export Cards */}


      <div
        className="
        grid
        gap-5
        md:grid-cols-3
        "
      >





        <ExportCard
          title="User JSON"
          description="Export basic profile information"
          filename="user-data.json"
          data={user}
        />




        <ExportCard
          title="AI History JSON"
          description="Export all generated AI content"
          filename="ai-history.json"
          data={aiHistory}
        />





        <ExportCard
          title="Full Export"
          description="Export complete user dataset"
          filename="full-user-export.json"
          data={exportData}
        />



      </div>






    </div>

  );

}










function Info({
  label,
  value
}:{
  label:string;
  value:any;
}){


  return (

    <div>

      <p
        className="
        text-xs
        text-gray-500
        "
      >

        {label}

      </p>


      <p
        className="
        mt-1
        text-white
        "
      >

        {value || "-"}

      </p>


    </div>

  );


}









function ExportCard({
  title,
  description,
  filename,
  data
}:{
  title:string;
  description:string;
  filename:string;
  data:any;
}){


  const json =
    JSON.stringify(
      data,
      null,
      2
    );



  const href =
    `data:application/json;charset=utf-8,${encodeURIComponent(json)}`;





  return (

    <div
      className="
      rounded-2xl
      border
      border-white/10
      bg-white/5
      p-6
      "
    >


      <div
        className="
        flex
        items-center
        gap-3
        "
      >

        <FileJson
          className="text-purple-400"
        />


        <h3
          className="
          font-semibold
          text-white
          "
        >

          {title}

        </h3>


      </div>





      <p
        className="
        mt-3
        text-sm
        text-gray-400
        "
      >

        {description}

      </p>






      <a
        href={href}
        download={filename}
        className="
        mt-5
        flex
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-purple-600
        px-4
        py-2
        text-sm
        font-medium
        text-white
        hover:bg-purple-700
        "
      >

        <Download size={16}/>

        Export JSON

      </a>



    </div>

  );

}