"use client";

import { useState } from "react";

import {
  Copy,
  Download,
  RefreshCcw,
  Palette,
  Check,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

import ToolLayout from "@/components/ai-tools/ToolLayout";


const styles = [
  "Modern",
  "Luxury",
  "Minimal",
  "Creative",
  "Dark",
  "Pastel",
];


const industries = [
  "Technology",
  "Fashion",
  "Business",
  "Food",
  "Education",
  "Personal Brand",
];


const basePalettes = [
  [
    "#2563EB",
    "#0F172A",
    "#38BDF8",
    "#22C55E",
    "#F8FAFC",
  ],

  [
    "#7C3AED",
    "#EC4899",
    "#F97316",
    "#111827",
    "#FFFFFF",
  ],

  [
    "#059669",
    "#064E3B",
    "#10B981",
    "#D1FAE5",
    "#FFFFFF",
  ],

  [
    "#DC2626",
    "#991B1B",
    "#FCA5A5",
    "#171717",
    "#FAFAFA",
  ],
];



const relatedTools = [
  {
    title:"AI Logo Generator",
    description:
    "Create professional AI logos for your brand.",
    href:"/dashboard/tools/ai-logo-generator",
  },

  {
    title:"AI Image Generator",
    description:
    "Generate creative AI images from text prompts.",
    href:"/dashboard/tools/ai-image-generator",
  },

  {
    title:"AI UI Mockup Generator",
    description:
    "Create modern website and app UI concepts.",
    href:"/dashboard/tools/ai-ui-mockup-generator",
  },

  {
    title:"Image Converter",
    description:
    "Convert images into different formats easily.",
    href:"/dashboard/tools/image-converter",
  },
];



export default function AIColorPaletteGeneratorPage(){


const [brand,setBrand]=useState("");

const [industry,setIndustry]=
useState("Technology");


const [style,setStyle]=
useState("Modern");


const [palette,setPalette]=
useState<string[]>([]);


const [copied,setCopied]=
useState<string | null>(null);




function generatePalette(){

const random =
basePalettes[
Math.floor(
Math.random()*basePalettes.length
)
];


setPalette(random);

}





function copyColor(color:string){

navigator.clipboard.writeText(color);


setCopied(color);


setTimeout(()=>{

setCopied(null);

},1500);


}





function downloadPalette(){

const data={

brand,

industry,

style,

colors:palette,

};


const blob =
new Blob(
[
JSON.stringify(
data,
null,
2
)
],
{
type:"application/json"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;


link.download=
"rynovix-color-palette.json";


link.click();


URL.revokeObjectURL(url);


}



return (

<ToolLayout

title="Free AI Color Palette Generator"

description="Create beautiful AI color palettes for branding, websites, UI design and creative projects with RYNOVIX."

>


<div className="grid gap-6 lg:grid-cols-2">



{/* Generator */}


<div className="rounded-3xl border border-white/10 bg-[#050814] p-5 sm:p-6">


<div className="mb-6 flex items-center gap-3">


<div className="rounded-xl bg-blue-500/10 p-3">

<Palette
size={22}
className="text-blue-400"
/>

</div>


<div>

<h2 className="text-xl font-bold text-white">

Palette Generator

</h2>


<p className="text-sm text-slate-400">

Create professional colors instantly

</p>


</div>


</div>





<div className="space-y-5">



<div>

<label className="text-sm text-slate-300">

Brand or Project Name

</label>


<input

value={brand}

onChange={(e)=>
setBrand(e.target.value)
}

placeholder="Example: RYNOVIX"

className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none focus:border-blue-500"

/>

</div>




<div>

<label className="text-sm text-slate-300">

Industry

</label>


<select

value={industry}

onChange={(e)=>
setIndustry(e.target.value)
}

className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white"

>


{industries.map(item=>(

<option key={item}>
{item}
</option>

))}


</select>


</div>



<div>

<label className="text-sm text-slate-300">

Design Style

</label>


<select

value={style}

onChange={(e)=>
setStyle(e.target.value)
}

className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white"

>


{styles.map(item=>(

<option key={item}>
{item}
</option>

))}


</select>


</div>




<button

onClick={generatePalette}

className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700"

>

<Palette size={18}/>

Generate Palette

</button>



</div>


</div>

{/* RESULT SECTION */}


<div className="rounded-3xl border border-white/10 bg-[#050814] p-5 sm:p-6">


<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


<div>

<h2 className="text-xl font-bold text-white">

Generated Color Palette

</h2>


<p className="mt-1 text-sm text-slate-400">

AI inspired colors for your creative project

</p>


</div>



<button

onClick={generatePalette}

className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-slate-300 transition hover:border-blue-500 hover:text-white"

>

<RefreshCcw size={17}/>

Refresh

</button>


</div>





{
palette.length === 0 ?


<div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 text-center">


<Sparkles
size={42}
className="text-blue-400"
/>


<h3 className="mt-5 text-xl font-semibold text-white">

No Palette Generated

</h3>


<p className="mt-2 text-sm text-slate-400">

Enter your details and generate your first professional AI color palette.

</p>


</div>


:


<div className="space-y-4">


{
palette.map((color)=>(


<div

key={color}

className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0B1220] p-4 sm:flex-row sm:items-center sm:justify-between"

>



<div className="flex items-center gap-4">


<div

className="h-14 w-14 shrink-0 rounded-xl border border-white/10"

style={{
backgroundColor:color
}}

/>



<div>


<h3 className="font-semibold text-white">

{color}

</h3>


<p className="text-xs text-slate-400">

HEX Color

</p>


</div>


</div>





<button

onClick={()=>
copyColor(color)
}

className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500 hover:text-white"

>


{
copied===color ?

<>

<Check size={16}/>

Copied

</>


:

<>

<Copy size={16}/>

Copy

</>

}



</button>



</div>


))


}




<button

onClick={downloadPalette}

className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700"

>


<Download size={18}/>

Download Palette JSON


</button>



</div>


}



</div>





</div>






{/* SEO CONTENT */}



<section className="mt-12 space-y-10 text-slate-300">



<div>


<h2 className="text-3xl font-bold text-white">

Free AI Color Palette Generator Online

</h2>


<p className="mt-4 leading-8">

RYNOVIX AI Color Palette Generator helps designers,
developers, creators, and businesses create beautiful
color combinations for branding, websites, applications,
UI design, and creative projects.

</p>


</div>







<div>


<h2 className="text-3xl font-bold text-white">

What is an AI Color Palette Generator?

</h2>


<p className="mt-4 leading-8">

An AI Color Palette Generator uses artificial intelligence
to create professional color combinations based on your
project style, industry, and creative requirements.

</p>


</div>







<div>


<h2 className="text-3xl font-bold text-white">

How It Works

</h2>



<div className="mt-5 grid gap-4 sm:grid-cols-3">



<div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">

<h3 className="font-semibold text-white">

1. Choose Style

</h3>

<p className="mt-2 text-sm">

Select your industry and design style.

</p>

</div>




<div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">

<h3 className="font-semibold text-white">

2. Generate Colors

</h3>

<p className="mt-2 text-sm">

AI creates professional color combinations.

</p>

</div>




<div className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">

<h3 className="font-semibold text-white">

3. Use Your Palette

</h3>

<p className="mt-2 text-sm">

Copy HEX colors for your projects.

</p>

</div>


</div>


</div>







{/* FAQ */}


<div>


<h2 className="text-3xl font-bold text-white">

Frequently Asked Questions

</h2>



<div className="mt-5 space-y-4">



<details className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">

<summary className="cursor-pointer font-semibold text-white">

Is RYNOVIX AI Color Palette Generator free?

</summary>


<p className="mt-3 text-sm leading-7 text-slate-400">

Yes, you can create AI inspired color palettes using RYNOVIX tools.

</p>


</details>





<details className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">

<summary className="cursor-pointer font-semibold text-white">

Can I use generated colors for branding?

</summary>


<p className="mt-3 text-sm leading-7 text-slate-400">

Yes. Generated colors can be used as inspiration for logos,
websites, apps, and marketing designs.

</p>


</details>





<details className="rounded-2xl border border-white/10 bg-[#0B1220] p-5">

<summary className="cursor-pointer font-semibold text-white">

Do I need design experience?

</summary>


<p className="mt-3 text-sm leading-7 text-slate-400">

No. Anyone can create professional color combinations easily.

</p>


</details>




</div>


</div>






{/* RELATED TOOLS */}



<div>


<h2 className="text-3xl font-bold text-white">

Related AI Tools

</h2>


<p className="mt-3 text-slate-400">

Explore more AI powered creative tools from RYNOVIX.

</p>





<div className="mt-6 grid gap-4 sm:grid-cols-2">



{
relatedTools.map((tool)=>(


<Link

key={tool.title}

href={tool.href}

className="rounded-2xl border border-white/10 bg-[#0B1220] p-5 transition hover:border-blue-500/50"

>


<h3 className="font-semibold text-white">

{tool.title}

</h3>


<p className="mt-2 text-sm text-slate-400">

{tool.description}

</p>


</Link>


))


}



</div>


</div>



</section>


</ToolLayout>

);

}