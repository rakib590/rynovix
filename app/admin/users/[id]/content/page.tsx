import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";



export default async function GeneratedContentPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {


  const { id } = await params;


  const supabase = await createClient();



  const {
    data: contents,
  } = await supabase
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
        ascending:false,
      }
    );





  function renderResult(
    tool:string,
    result:any
  ) {


    if(!result){

      return (
        <p className="text-gray-500">
          No result data
        </p>
      );

    }




    // Title Generator

    if(
      tool === "Title Generator" ||
      tool === "Thumbnail Title"
    ){

      const items =
        result.titles || [];


      return (

        <div className="space-y-3">

        {
          items.map(
            (
              item:any,
              index:number
            )=>(

              <div
                key={index}
                className="
                rounded-lg
                bg-black/30
                p-4
                "
              >

                <p
                  className="
                  font-medium
                  text-white
                  "
                >
                  {item.title}
                </p>


                <div
                  className="
                  mt-2
                  flex
                  gap-4
                  text-xs
                  text-gray-400
                  "
                >

                  {
                    item.score &&
                    <span>
                      Score {item.score}
                    </span>
                  }


                  {
                    item.seo &&
                    <span>
                      SEO {item.seo}
                    </span>
                  }


                  {
                    item.ctr &&
                    <span>
                      CTR {item.ctr}
                    </span>
                  }


                </div>


              </div>

            )
          )
        }

        </div>

      );

    }







    // Description Generator

    if(
      tool === "Description Generator"
    ){

      const data =
        result.descriptions?.[0];


      return (

        <div
          className="
          rounded-lg
          bg-black/30
          p-4
          "
        >

          <p
            className="
            text-gray-300
            leading-relaxed
            "
          >

            {
              data?.description ||
              "No description"
            }

          </p>


          <div
            className="
            mt-3
            flex
            gap-4
            text-xs
            text-gray-400
            "
          >

            <span>
              Score {data?.score ?? "-"}
            </span>


            <span>
              SEO {data?.seo ?? "-"}
            </span>


            <span>
              Engagement {data?.engagement ?? "-"}
            </span>


          </div>


        </div>

      );

    }







    // Shorts Ideas

    if(
      tool === "Shorts Ideas"
    ){

      const items =
        result.results || [];


      return (

        <div className="space-y-3">


        {
          items.map(
            (
              item:any,
              index:number
            )=>(


              <div
                key={index}
                className="
                rounded-lg
                bg-black/30
                p-4
                space-y-2
                "
              >


                <h3
                  className="
                  font-semibold
                  text-white
                  "
                >
                  {item.title}
                </h3>



                <p className="text-sm text-gray-400">

                  Hook:
                  {" "}
                  {item.hook}

                </p>



                <p className="text-sm text-gray-400">

                  Concept:
                  {" "}
                  {item.concept}

                </p>



                <div
                  className="
                  text-xs
                  text-green-400
                  "
                >

                  Viral:
                  {" "}
                  {item.viral}
                  {" | "}
                  Engagement:
                  {" "}
                  {item.engagement}

                </div>


              </div>


            )
          )
        }


        </div>

      );

    }







    // Generic text tools

    if(
      tool === "Tags Generator" ||
      tool === "Hashtag Generator" ||
      tool === "Keyword Generator"
    ){

      return (

        <div
          className="
          rounded-lg
          bg-black/30
          p-4
          text-gray-300
          "
        >

          {
            JSON.stringify(
              result,
              null,
              2
            )
          }

        </div>

      );

    }








    // Script / SEO / Upload Time

    return (

      <pre
        className="
        rounded-lg
        bg-black/40
        p-4
        text-xs
        text-gray-300
        overflow-auto
        max-h-96
        "
      >

{
JSON.stringify(
  result,
  null,
  2
)
}

      </pre>

    );


  }








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
        justify-between
        items-center
        "
      >


        <div>

          <h1
            className="
            flex
            items-center
            gap-2
            text-2xl
            font-bold
            text-white
            "
          >

            <Sparkles
              size={24}
              className="text-purple-400"
            />

            Generated Content

          </h1>


          <p className="text-gray-400">

            User AI generated results

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










      {
        contents?.map(
          (item)=>(


          <div
            key={item.id}
            className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-6
            space-y-5
            "
          >




            {/* Header Card */}

            <div
              className="
              flex
              justify-between
              "
            >


              <div>

                <h2
                  className="
                  text-lg
                  font-semibold
                  text-white
                  "
                >

                  {item.tool_name}

                </h2>


                <p
                  className="
                  text-sm
                  text-gray-400
                  "
                >

                  {item.title}

                </p>


              </div>



              <div
                className="
                text-right
                "
              >

                <p
                  className="
                  text-green-400
                  font-bold
                  "
                >

                  Score:
                  {" "}
                  {item.score ?? "-"}

                </p>


                <p
                  className="
                  text-xs
                  text-gray-500
                  "
                >

                  Credits:
                  {" "}
                  {item.credits_used}

                </p>


              </div>


            </div>







            {/* Prompt */}

            <div>


              <p
                className="
                mb-2
                text-sm
                text-gray-400
                "
              >

                Prompt Preview

              </p>


              <div
                className="
                rounded-xl
                bg-black/30
                p-4
                text-sm
                text-gray-300
                max-h-40
                overflow-auto
                "
              >

                {item.prompt}


              </div>


            </div>








            {/* Result */}

            <div>


              <p
                className="
                mb-2
                text-sm
                text-gray-400
                "
              >

                Result Preview

              </p>


              {
                renderResult(
                  item.tool_name,
                  item.result
                )
              }


            </div>








            <div
              className="
              text-xs
              text-gray-500
              "
            >

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







      {
        !contents?.length && (

          <div
            className="
            rounded-xl
            border
            border-white/10
            p-10
            text-center
            text-gray-500
            "
          >

            No generated content found

          </div>

        )
      }





    </div>

  );

}