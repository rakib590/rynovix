"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";


export default function OnlineTracker() {

  useEffect(() => {

    const updateOnlineStatus = async () => {

      try {

        const supabase = createClient();


        const {
          data:{
            user,
          },
        } = await supabase.auth.getUser();



        if(!user) return;



        await supabase
          .from("profiles")
          .update({
            is_online: true,
            last_activity: new Date().toISOString(),
          })
          .eq(
            "id",
            user.id
          );


      } catch(error){

        console.error(
          "ONLINE STATUS ERROR:",
          error
        );

      }

    };



    // first update
    updateOnlineStatus();



    // every 1 minute
    const interval =
      setInterval(
        updateOnlineStatus,
        30000
      );



    return () => {
      clearInterval(interval);
    };


  }, []);



  return null;

}