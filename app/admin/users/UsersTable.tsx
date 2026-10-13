"use client";

import Link from "next/link";
import { useState } from "react";


type User = {

  id:string;
  full_name:string | null;
  username:string | null;
  email:string;
  avatar_url:string | null;

  role:string;
  status:string;

  plan:string | null;
  current_plan?:string | null;

  credits:number | null;
  total_used:number | null;

  is_online:boolean | null;
  email_verified:boolean | null;

  created_at:string;
  last_login:string | null;

};



type Filter =
| "all"
| "active"
| "suspended"
| "admins"
| "free"
| "pro"
| "business";



export default function UsersTable({
  users,
}:{
  users:User[];
}){


const [search,setSearch] =
useState("");


const [filter,setFilter] =
useState<Filter>("all");




const filteredUsers =
users.filter((user)=>{


const plan =
(
 user.current_plan ||
 user.plan ||
 "free"
)
.toLowerCase();



const searchMatch =
`${user.full_name || ""}
${user.email}
${user.username || ""}`
.toLowerCase()
.includes(
search.toLowerCase()
);



let filterMatch=true;



switch(filter){


case "active":

filterMatch =
user.status==="active";

break;



case "suspended":

filterMatch =
user.status==="suspended";

break;



case "admins":

filterMatch =
user.role==="admin" ||
user.role==="super_admin";

break;



case "free":

filterMatch =
plan==="free";

break;



case "pro":

filterMatch =
plan==="pro";

break;



case "business":

filterMatch =
plan==="business";

break;


}



return searchMatch && filterMatch;


});





const filters=[
{
id:"all",
label:"All"
},
{
id:"active",
label:"Active"
},
{
id:"suspended",
label:"Suspended"
},
{
id:"admins",
label:"Admins"
},
{
id:"free",
label:"Free"
},
{
id:"pro",
label:"Pro"
},
{
id:"business",
label:"Business"
},
];




return (

<div
className="
rounded-2xl
border
border-white/10
bg-white/5
overflow-hidden
"
>


<div className="p-5 space-y-4">


<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="Search name, email or username..."

className="
w-full
rounded-xl
border
border-white/10
bg-black/30
px-4
py-3
text-white
outline-none
"

/>




<div className="flex flex-wrap gap-3">


{
filters.map((item)=>(


<button

key={item.id}

onClick={()=>
setFilter(item.id as Filter)
}

className={`
rounded-full
px-4
py-2
text-sm

${
filter===item.id

?

"bg-purple-500 text-white"

:

"border border-white/10 text-gray-300"

}

`}

>

{item.label}

</button>


))

}


</div>


</div>





<div className="overflow-x-auto">


<table className="w-full text-sm">


<thead
className="
border-b
border-white/10
text-gray-400
"
>

<tr>


<th className="px-6 py-4 text-left">
User
</th>


<th className="px-6 py-4 text-left">
Role
</th>


<th className="px-6 py-4 text-left">
Status
</th>


<th className="px-6 py-4 text-left">
Plan
</th>


<th className="px-6 py-4 text-left">
Credits
</th>


<th className="px-6 py-4 text-left">
Joined
</th>


<th className="px-6 py-4 text-left">
Action
</th>


</tr>

</thead>





<tbody>


{
filteredUsers.length === 0 && (

<tr>

<td
colSpan={7}
className="
px-6
py-10
text-center
text-gray-400
"
>

No users found

</td>

</tr>

)

}






{
filteredUsers.map((user)=>(


<tr
key={user.id}
className="
border-b
border-white/5
hover:bg-white/5
"
>


<td className="px-6 py-4">


<div className="flex items-center gap-3">


{
user.avatar_url ?


<img
src={user.avatar_url}
alt="avatar"
className="
h-10
w-10
rounded-full
object-cover
"
/>


:

<div
className="
h-10
w-10
rounded-full
bg-white/10
flex
items-center
justify-center
font-bold
"
>

{
(user.full_name || user.email)
.charAt(0)
.toUpperCase()
}

</div>


}




<div>

<Link
  href={`/admin/users/${user.id}`}
  className="
  font-medium
  text-white
  hover:text-purple-400
  transition
  "
>
  {user.full_name || "No Name"}
</Link>


<p className="text-xs text-gray-400">

{user.email}

</p>


</div>


</div>


</td>





<td className="px-6 py-4">

<Badge type="role">
{user.role}

</Badge>

</td>





<td className="px-6 py-4">

<Badge type="status">
{user.status}
</Badge>

</td>





<td className="px-6 py-4">

<Badge type="plan">

{
user.current_plan ||
user.plan ||
"free"
}

</Badge>


</td>





<td className="px-6 py-4 text-white">

{user.credits ?? 0}

</td>





<td className="px-6 py-4 text-gray-300">

{
new Date(user.created_at)
.toLocaleDateString()
}

</td>





<td className="px-6 py-4">


<div className="flex gap-2">


<Link

href={`/admin/users/${user.id}`}

className="
rounded-lg
border
border-white/10
px-3
py-2
text-xs
hover:bg-white/10
"

>

View

</Link>




<Link

href={`/admin/users/${user.id}/edit`}

className="
rounded-lg
bg-white
px-3
py-2
text-xs
text-black
"

>

Edit

</Link>


</div>


</td>




</tr>


))

}


</tbody>


</table>


</div>


</div>

);


}







function Badge({
children,
type,
}:{
children:React.ReactNode;
type:"role"|"status"|"plan";
}){


let style =
"bg-purple-500/20 text-purple-300";



if(type==="status"){


if(children==="active")
style =
"bg-green-500/20 text-green-400";


if(children==="suspended")
style =
"bg-red-500/20 text-red-400";


}



if(type==="plan"){


if(children==="pro")
style =
"bg-blue-500/20 text-blue-400";


if(children==="business")
style =
"bg-yellow-500/20 text-yellow-400";


}




return (

<span
className={`
rounded-full
px-3
py-1
text-xs
${style}
`}
>

{children}

</span>

);

}