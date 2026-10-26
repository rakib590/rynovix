"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";


export default function PresenceProvider({
  children,
}:{
  children:React.ReactNode;
}){


useEffect(()=>{


const supabase = createClient();


let interval:NodeJS.Timeout;



async function updateOnline(){


const {
data:{
user
}
}
=
await supabase.auth.getUser();



if(!user) return;



await supabase
.from("profiles")
.update({

is_online:true,

last_activity:
new Date().toISOString(),

})
.eq(
"id",
user.id
);



interval =
setInterval(async()=>{


await supabase
.from("profiles")
.update({

is_online:true,

last_activity:
new Date().toISOString(),

})
.eq(
"id",
user.id
);


},30000);



const handleUnload = async()=>{


await supabase
.from("profiles")
.update({

is_online:false,

last_activity:
new Date().toISOString(),

})
.eq(
"id",
user.id
);


};



window.addEventListener(
"beforeunload",
handleUnload
);



}



updateOnline();



return ()=>{


clearInterval(interval);


};


},[]);



return children;


}