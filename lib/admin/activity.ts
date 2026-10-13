import { createClient } from "@/lib/supabase/server";


export async function createActivityLog({
  user_id,
  action,
  description,
}:{
  user_id:string;
  action:string;
  description:string;
}){


  const supabase = await createClient();


  const {
    error,
  } = await supabase
    .from("user_activity_logs")
    .insert({

      user_id,

      action,

      description,

    });



  if(error){

    console.log(
      "ACTIVITY LOG ERROR:",
      error
    );

  }


}