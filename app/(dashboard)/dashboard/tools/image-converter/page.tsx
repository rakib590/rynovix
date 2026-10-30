"use client";

import { useState } from "react";

import {
  Upload,
  Download,
  RefreshCcw,
  ImageIcon,
  Check,
  ChevronDown,
  Zap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import ToolLayout from "@/components/ai-tools/ToolLayout";


const formats = [
  "PNG",
  "JPG",
  "WEBP",
  "BMP",
  "GIF",
];


const benefits = [
  {
    title: "No API Required",
    description:
      "Convert images directly inside your browser without external services.",
    icon: Zap,
  },

  {
    title: "Secure Conversion",
    description:
      "Your images stay on your device and are not uploaded.",
    icon: ShieldCheck,
  },

  {
    title: "Fast Processing",
    description:
      "Convert images quickly with simple browser technology.",
    icon: Sparkles,
  },
];



const relatedTools = [
  {
    title: "AI Image Compressor",
    desc: "Reduce image size while keeping quality.",
    href: "/tools/ai-image-compressor",
  },

  {
    title: "AI Background Remover",
    desc: "Remove image backgrounds instantly.",
    href: "/tools/ai-background-remover",
  },

  {
    title: "AI Image Upscaler",
    desc: "Enhance image quality with AI technology.",
    href: "/tools/ai-image-upscaler",
  },

  {
    title: "AI Image Editor",
    desc: "Edit and improve images using AI.",
    href: "/tools/ai-image-editor",
  },
];



export default function ImageConverterPage() {


  const [image,setImage] =
    useState<File | null>(null);


  const [preview,setPreview] =
    useState("");



  const [format,setFormat] =
    useState("PNG");



  const [converted,setConverted] =
    useState("");



  const [loading,setLoading] =
    useState(false);



  const [openFAQ,setOpenFAQ] =
    useState<number | null>(null);





  function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {


    const file =
      e.target.files?.[0];


    if(!file) return;



    setImage(file);



    const url =
      URL.createObjectURL(file);



    setPreview(url);


    setConverted("");

  }







  function convertImage(){


    if(!image)
      return;



    setLoading(true);



    const img =
      new Image();



    img.src =
      preview;



    img.onload = ()=>{


      const canvas =
        document.createElement("canvas");



      canvas.width =
        img.width;



      canvas.height =
        img.height;



      const ctx =
        canvas.getContext("2d");



      ctx?.drawImage(
        img,
        0,
        0
      );



      let mime =
        "image/png";



      if(format==="JPG")
        mime="image/jpeg";


      if(format==="WEBP")
        mime="image/webp";


      if(format==="BMP")
        mime="image/bmp";


      if(format==="GIF")
        mime="image/gif";



      const result =
        canvas.toDataURL(
          mime,
          0.9
        );



      setConverted(result);


      setLoading(false);


    };


  }







  function downloadImage(){


    if(!converted)
      return;



    const link =
      document.createElement("a");



    link.href =
      converted;



    link.download =
      `rynovix-image.${format.toLowerCase()}`;



    link.click();


  }







  return (

<ToolLayout

title="Free Image Converter Online"

description="Convert JPG, PNG, WEBP, BMP and GIF images instantly with RYNOVIX free online image converter."

>


{/* HERO */}

<section className="mb-10 rounded-3xl border border-white/10 bg-[#050814] p-6 text-center sm:p-10">


<h1 className="text-3xl font-bold text-white sm:text-5xl">

Free Image Converter Online

</h1>



<p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">

Convert images between JPG, PNG, WEBP, BMP and GIF formats.
Fast browser based image conversion without installing software.

</p>


</section>





{/* TOOL AREA */}

<div className="grid gap-6 lg:grid-cols-2">



{/* LEFT PANEL */}


<div className="rounded-3xl border border-white/10 bg-[#050814] p-5 sm:p-6">


<div className="mb-6 flex items-center gap-3">


<div className="rounded-xl bg-blue-500/10 p-3">


<ImageIcon

size={24}

className="text-blue-400"

/>


</div>



<div>


<h2 className="text-xl font-bold text-white">

Image Converter

</h2>



<p className="text-sm text-slate-400">

Convert without API

</p>


</div>


</div>





<label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-[#0B1220] p-8 text-center">


<Upload

size={38}

className="text-blue-400"

/>



<p className="mt-3 text-white">

Upload Image

</p>



<p className="mt-1 text-xs text-slate-400">

JPG PNG WEBP BMP GIF

</p>



<input

type="file"

accept="image/*"

onChange={uploadImage}

className="hidden"

/>


</label>





{preview && (

<div className="mt-5 overflow-hidden rounded-2xl border border-white/10">


<img

src={preview}

alt="Uploaded preview"

className="max-h-72 w-full object-contain"

/>


</div>

)}



<div className="mt-5">


<label className="text-sm text-slate-300">

Convert To

</label>



<select

value={format}

onChange={(e)=>setFormat(e.target.value)}

className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white"

>


{formats.map(item=>(

<option key={item}>

{item}

</option>

))}


</select>


</div>





<button

onClick={convertImage}

disabled={!image || loading}

className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"

>


{

loading ?

<>

<RefreshCcw className="animate-spin"/>

Converting...

</>


:

<>

<ImageIcon size={18}/>

Convert Image

</>

}



</button>



</div>





{/* RIGHT PANEL */}


<div className="rounded-3xl border border-white/10 bg-[#050814] p-5 sm:p-6">


<div className="mb-5 flex items-center justify-between">


<h2 className="text-xl font-bold text-white">

Converted Image

</h2>



<button

onClick={convertImage}

disabled={!image || loading}

className="rounded-xl border border-white/10 bg-[#0B1220] p-3 text-slate-300 disabled:opacity-50"

>


<RefreshCcw size={18}/>


</button>


</div>

{/* CONTINUE RIGHT PANEL */}


{

converted ? (

<div className="space-y-5">


<div className="rounded-2xl border border-white/10 bg-[#0B1220] p-4">


<img

src={converted}

alt="Converted image"

className="max-h-[420px] w-full object-contain"

/>


</div>




<div className="flex items-center justify-center gap-2 rounded-xl bg-green-500/10 py-3 text-sm text-green-400">


<Check size={18}/>

Image converted successfully


</div>





<button

onClick={downloadImage}

className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"

>


<Download size={18}/>

Download {format}


</button>



</div>


)

:

(

<div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center">


<ImageIcon

size={45}

className="text-blue-400"

/>



<h3 className="mt-4 text-lg font-semibold text-white">

No Converted Image

</h3>



<p className="mt-2 text-sm text-slate-400">

Upload an image and convert your file.

</p>


</div>


)

}


</div>


</div>





{/* BENEFITS */}


<section className="mt-12">


<h2 className="text-2xl font-bold text-white">

Why Use RYNOVIX Image Converter?

</h2>



<div className="mt-6 grid gap-4 md:grid-cols-3">


{benefits.map((item)=>{


const Icon =
item.icon;


return (

<div

key={item.title}

className="rounded-2xl border border-white/10 bg-[#050814] p-5"

>


<div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3">


<Icon

size={22}

className="text-blue-400"

/>


</div>



<h3 className="font-semibold text-white">

{item.title}

</h3>



<p className="mt-2 text-sm leading-6 text-slate-400">

{item.description}

</p>


</div>


)


})}


</div>


</section>







{/* SUPPORTED FORMATS */}


<section className="mt-12 rounded-3xl border border-white/10 bg-[#050814] p-6 sm:p-8">


<h2 className="text-2xl font-bold text-white">

Supported Image Formats

</h2>



<p className="mt-3 text-slate-400">

Convert images into popular formats used for websites, apps and creative projects.

</p>




<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">


{formats.map((item)=>(


<div

key={item}

className="rounded-xl border border-white/10 bg-[#0B1220] p-4 text-center font-semibold text-white"

>


{item}


</div>


))}



</div>


</section>







{/* HOW IT WORKS */}


<section className="mt-12">


<h2 className="text-2xl font-bold text-white">

How Image Converter Works

</h2>




<div className="mt-6 grid gap-4 md:grid-cols-3">


{[

{
number:"01",
title:"Upload Image",
text:"Choose your image from your device."
},

{
number:"02",
title:"Select Format",
text:"Choose PNG, JPG, WEBP or another format."
},

{
number:"03",
title:"Download",
text:"Convert and download instantly."
}

].map(step=>(


<div

key={step.number}

className="rounded-2xl border border-white/10 bg-[#050814] p-5"

>


<div className="text-3xl font-bold text-blue-400">

{step.number}

</div>



<h3 className="mt-3 font-semibold text-white">

{step.title}

</h3>



<p className="mt-2 text-sm text-slate-400">

{step.text}

</p>


</div>


))}



</div>


</section>







{/* SEO CONTENT */}


<section className="mt-12 space-y-5">


<h2 className="text-2xl font-bold text-white">

Free Online Image Converter Tool

</h2>




<p className="leading-8 text-slate-400">

RYNOVIX Image Converter helps creators,
designers and businesses convert images between
different formats including PNG, JPG, WEBP, BMP
and GIF.

</p>



<p className="leading-8 text-slate-400">

The conversion happens directly in your browser.
Your images remain private because files are not
stored on external servers.

</p>


</section>







{/* FAQ */}


<section className="mt-12">


<h2 className="text-2xl font-bold text-white">

Frequently Asked Questions

</h2>




<div className="mt-6 space-y-3">


{[

{
q:"Is RYNOVIX Image Converter free?",
a:"Yes. You can convert images completely free without any subscription."
},

{
q:"Which formats are supported?",
a:"JPG, JPEG, PNG, WEBP, BMP and GIF formats are supported."
},

{
q:"Does this tool require an API?",
a:"No. Image conversion happens directly inside your browser."
},

{
q:"Are my images stored?",
a:"No. Your images are processed locally and are not stored."
}

].map((faq,index)=>(


<div

key={index}

className="overflow-hidden rounded-2xl border border-white/10 bg-[#050814]"

>


<button

onClick={()=>setOpenFAQ(
openFAQ===index ? null : index
)}

className="flex w-full items-center justify-between gap-4 p-5 text-left"

>


<span className="font-semibold text-white">

{faq.q}

</span>



<ChevronDown

size={20}

className={`transition ${
openFAQ===index
?"rotate-180 text-blue-400"
:"text-slate-400"
}`}

/>


</button>





<div

className={`grid transition-all duration-300 ${
openFAQ===index
?"grid-rows-[1fr]"
:"grid-rows-[0fr]"
}`}

>


<div className="overflow-hidden">


<p className="px-5 pb-5 text-sm leading-7 text-slate-400">

{faq.a}

</p>


</div>


</div>



</div>


))}


</div>


</section>







{/* RELATED TOOLS */}


<section className="mt-12">


<h2 className="text-2xl font-bold text-white">

Related Image Tools

</h2>



<p className="mt-2 text-slate-400">

Explore more image related tools from RYNOVIX.

</p>




<div className="mt-6 grid gap-4 sm:grid-cols-2">


{relatedTools.map((tool)=>(


<a

href={tool.href}

key={tool.title}

className="rounded-2xl border border-white/10 bg-[#050814] p-5 transition hover:border-blue-500/40"

>


<h3 className="font-semibold text-white">

{tool.title}

</h3>



<p className="mt-2 text-sm text-slate-400">

{tool.desc}

</p>


</a>


))}



</div>


</section>




</ToolLayout>

);

}