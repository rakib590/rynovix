import Link from "next/link";

import {
  Palette,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";



export const metadata = {

  title:
    "Free AI Color Palette Generator - Create Beautiful Color Schemes | RYNOVIX",

  description:
    "Generate beautiful AI color palettes for brands, websites, apps, and creative projects. Create professional color combinations instantly with RYNOVIX AI.",


  keywords: [

    "AI Color Palette Generator",

    "Free AI Color Palette Generator",

    "AI color generator free",

    "Free color palette generator",

    "Brand color generator",

    "Website color palette generator",

    "AI design tools",

  ],

};





const features = [

  "Create professional brand color combinations",

  "Generate modern website and UI color schemes",

  "Explore creative color ideas instantly",

  "Perfect for designers, creators and businesses",

];





const useCases = [

  "Brand identity design",

  "Website color planning",

  "App UI design",

  "Social media graphics",

  "Marketing materials",

];






const relatedTools = [

  {

    title:
      "AI Logo Generator",

    description:
      "Create professional logo concepts using AI.",

    href:
      "/dashboard/tools/ai-logo-generator",

  },


  {

    title:
      "AI UI Mockup Generator",

    description:
      "Generate modern app and website interface ideas.",

    href:
      "/dashboard/tools/ai-ui-mockup-generator",

  },


  {

    title:
      "AI Image Generator",

    description:
      "Create stunning visuals from text prompts.",

    href:
      "/dashboard/tools/ai-image-generator",

  },


  {

    title:
      "Image Converter",

    description:
      "Convert images into different formats easily.",

    href:
      "/dashboard/tools/image-converter",

  },


];







const faqs = [

{

q:
"What is an AI Color Palette Generator?",


a:
"An AI Color Palette Generator creates professional color combinations for brands, websites, apps, and creative projects using artificial intelligence.",

},



{

q:
"Is RYNOVIX AI Color Palette Generator free?",


a:
"You can explore AI-powered color generation features through RYNOVIX tools. Available features may depend on your account plan.",

},



{

q:
"Can I use these colors for my brand?",


a:
"Yes. Generated palettes can help you discover ideas for branding, websites, marketing materials, and design projects.",

},



{

q:
"Do I need design experience to use this tool?",


a:
"No. The tool is designed for beginners, creators, designers, and businesses.",

},


{

q:
"Can I create website color palettes with AI?",


a:
"Yes. AI-generated palettes can help you choose suitable colors for website interfaces and digital products.",

},


];






export default function AIColorPaletteGeneratorSEOPage(){


return (

<main

className="
min-h-screen
bg-[#050814]
px-3
py-8
text-white
sm:px-6
sm:py-10
lg:px-8
"

>





{/* HERO */}



<section

className="
mx-auto
max-w-5xl
text-center
"

>




<div

className="
inline-flex
items-center
gap-2
rounded-full
border
border-blue-500/20
bg-blue-500/10
px-3
py-2
text-xs
text-blue-400
sm:px-4
sm:text-sm
"

>


<Sparkles size={15}/>


Powered by RYNOVIX AI


</div>






<h1

className="
mt-6
text-3xl
font-bold
leading-tight
tracking-tight
sm:text-5xl
lg:text-6xl
"

>


Free AI Color Palette Generator


</h1>






<p

className="
mx-auto
mt-5
max-w-3xl
text-base
leading-7
text-slate-400
sm:text-lg
sm:leading-8
"

>


Create beautiful AI-generated color palettes for your brand,
website, app, and creative projects. Discover professional
color combinations instantly.


</p>







<Link

href="/login?redirect=/dashboard/tools/ai-color-palette-generator"

className="
mt-8
flex
w-full
items-center
justify-center
gap-2
rounded-2xl
bg-blue-600
px-6
py-4
font-semibold
transition
hover:bg-blue-700
sm:mx-auto
sm:w-fit
"

>


Create Your Palette


<ArrowRight size={18}/>


</Link>



</section>







{/* WHAT IS TOOL */}



<section

className="
mx-auto
mt-12
max-w-5xl
sm:mt-20
"

>


<h2

className="
text-2xl
font-bold
sm:text-3xl
"

>

What is an AI Color Palette Generator?

</h2>



<p

className="
mt-4
text-sm
leading-7
text-slate-400
sm:text-base
sm:leading-8
"

>


An AI Color Palette Generator helps you discover
attractive color combinations using artificial intelligence.
It helps designers, creators, and businesses create
better visual identities faster.


</p>



</section>


{/* FEATURES */}


<section

className="
mx-auto
mt-12
max-w-5xl
sm:mt-16
"

>


<h2

className="
text-2xl
font-bold
sm:text-3xl
"

>

AI Color Palette Generator Features

</h2>




<div

className="
mt-6
grid
gap-4
sm:grid-cols-2
"

>


{features.map((item)=>(


<div

key={item}

className="
flex
gap-3
rounded-2xl
border
border-white/10
bg-[#0B1220]
p-4
sm:p-5
"

>


<CheckCircle

className="shrink-0 text-blue-400"

size={20}

/>



<p

className="
text-sm
text-slate-300
sm:text-base
"

>

{item}

</p>



</div>


))}



</div>



</section>








{/* HOW IT WORKS */}



<section

className="
mx-auto
mt-12
max-w-5xl
sm:mt-16
"

>


<h2

className="
text-2xl
font-bold
sm:text-3xl
"

>

How It Works

</h2>




<div

className="
mt-6
grid
gap-4
md:grid-cols-3
"

>


<div

className="
rounded-2xl
border
border-white/10
bg-[#0B1220]
p-5
"

>


<Palette className="text-blue-400"/>


<h3 className="mt-4 font-semibold">

1. Add Your Idea

</h3>


<p className="mt-2 text-sm text-slate-400">

Enter your brand or project details.

</p>


</div>





<div

className="
rounded-2xl
border
border-white/10
bg-[#0B1220]
p-5
"

>


<Sparkles className="text-purple-400"/>


<h3 className="mt-4 font-semibold">

2. Generate Colors

</h3>


<p className="mt-2 text-sm text-slate-400">

AI creates suitable color combinations.

</p>


</div>






<div

className="
rounded-2xl
border
border-white/10
bg-[#0B1220]
p-5
"

>


<CheckCircle className="text-green-400"/>


<h3 className="mt-4 font-semibold">

3. Use Your Palette

</h3>


<p className="mt-2 text-sm text-slate-400">

Apply colors to your designs.

</p>


</div>



</div>


</section>







{/* USE CASES */}



<section

className="
mx-auto
mt-12
max-w-5xl
sm:mt-16
"

>


<h2 className="text-2xl font-bold sm:text-3xl">

Who Can Use AI Color Palette Generator?

</h2>




<div

className="
mt-6
grid
grid-cols-1
gap-4
sm:grid-cols-2
lg:grid-cols-3
"

>


{useCases.map((item)=>(


<div

key={item}

className="
rounded-2xl
border
border-white/10
bg-[#0B1220]
p-5
"

>


<p className="text-slate-300">

{item}

</p>


</div>


))}


</div>


</section>







{/* FAQ */}



<section

className="
mx-auto
mt-12
max-w-5xl
sm:mt-16
"

>


<h2 className="text-2xl font-bold sm:text-3xl">

Frequently Asked Questions

</h2>




<div className="mt-6 space-y-4">


{faqs.map((faq)=>(


<details

key={faq.q}

className="
rounded-2xl
border
border-white/10
bg-[#0B1220]
p-5
"

>


<summary

className="
cursor-pointer
font-semibold
text-white
"

>

{faq.q}

</summary>




<p

className="
mt-3
text-sm
leading-7
text-slate-400
"

>

{faq.a}

</p>



</details>


))}



</div>



</section>








{/* RELATED TOOLS */}



<section

className="
mx-auto
mt-12
max-w-5xl
sm:mt-16
"

>


<h2 className="text-2xl font-bold sm:text-3xl">

Related AI Tools

</h2>



<p className="mt-3 text-slate-400">

Explore more AI-powered creative tools from RYNOVIX.

</p>





<div

className="
mt-6
grid
gap-4
md:grid-cols-2
"

>


{relatedTools.map((tool)=>(


<Link

key={tool.title}

href={`/login?redirect=${tool.href}`}

className="
rounded-2xl
border
border-white/10
bg-[#0B1220]
p-5
transition
hover:border-blue-500/40
"

>


<h3 className="font-semibold">

{tool.title}

</h3>



<p className="mt-2 text-sm text-slate-400">

{tool.description}

</p>



<div className="mt-4 text-sm text-blue-400">

Open Tool →

</div>


</Link>


))}



</div>



</section>








{/* FINAL CTA */}



<section

className="
mx-auto
mt-16
max-w-5xl
rounded-3xl
border
border-blue-500/20
bg-blue-500/10
p-6
text-center
sm:p-10
"

>


<h2 className="text-2xl font-bold sm:text-3xl">

Create Your AI Color Palette Today

</h2>



<p

className="
mx-auto
mt-3
max-w-2xl
text-slate-300
"

>

Generate professional color combinations for your brand,
website, and creative projects with RYNOVIX AI.

</p>





<Link

href="/login?redirect=/dashboard/tools/ai-color-palette-generator"

className="
mt-6
inline-flex
items-center
gap-2
rounded-2xl
bg-blue-600
px-6
py-4
font-semibold
hover:bg-blue-700
"

>


Start Creating


<ArrowRight size={18}/>


</Link>



</section>








{/* STRUCTURED DATA */}



<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html: JSON.stringify({

"@context":"https://schema.org",

"@type":"SoftwareApplication",

name:"RYNOVIX AI Color Palette Generator",

applicationCategory:"DesignApplication",

operatingSystem:"Web",

description:
"AI-powered color palette generator for brands, websites, apps and creative projects.",


offers:{
"@type":"Offer",
price:"0",
priceCurrency:"USD"
}


})

}}

/>





<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html: JSON.stringify({

"@context":"https://schema.org",

"@type":"FAQPage",

mainEntity:faqs.map((faq)=>({


"@type":"Question",

name:faq.q,


acceptedAnswer:{

"@type":"Answer",

text:faq.a

}


}))


})

}}

/>





</main>

);

}