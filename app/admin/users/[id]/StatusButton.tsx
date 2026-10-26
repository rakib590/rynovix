"use client";



export default function StatusButton({

action,

children,

}:{

action:()=>Promise<void>;

children:React.ReactNode;

}){



async function handleStatus(){


const confirmed =
window.confirm(
`Are you sure you want to ${children}?`
);



if(!confirmed){

return;

}



await action();



}




return (

<button

onClick={handleStatus}

className="
rounded-xl
border
border-red-500/30
px-5
py-3
text-sm
text-red-400
hover:bg-red-500/10
"

>

{children}


</button>


);


}