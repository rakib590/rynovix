"use client";


import {
  Trash2
} from "lucide-react";

import {
  useState
} from "react";



export default function DeleteUserButton({

action,

}:{

action:()=>Promise<void>;

}){


const [loading,setLoading] =
useState(false);





async function handleDelete(){


const confirmDelete =
window.confirm(
"Are you sure you want to permanently delete this user?"
);



if(!confirmDelete){

return;

}




try{


setLoading(true);


await action();


}catch(error){


console.log(
"DELETE ERROR:",
error
);


setLoading(false);


}


}






return (

<button

onClick={handleDelete}

disabled={loading}

className="
rounded-xl
border
border-red-500/30
px-5
py-3
text-sm
text-red-400
hover:bg-red-500/10
flex
items-center
gap-2
disabled:opacity-50
"

>


<Trash2 size={16}/>


{
loading
?
"Deleting..."
:
"Delete User"
}


</button>


);


}