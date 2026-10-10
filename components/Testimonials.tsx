import {
Lightbulb,
WandSparkles,
FileText,
Search,
} from "lucide-react"

const creatorFeatures = [
{
icon: Lightbulb,
title: "Generate Content Ideas",
description:
"Explore ideas for videos and Shorts to help plan your next piece of content.",
},
{
icon: WandSparkles,
title: "Create Titles",
description:
"Use AI-powered title suggestions to explore different ways to present your videos.",
},
{
icon: FileText,
title: "Write Content",
description:
"Get assistance with scripts, descriptions, and other parts of your content workflow.",
},
{
icon: Search,
title: "Explore SEO Tools",
description:
"Use creator-focused tools for keywords, tags, hashtags, and YouTube content optimization.",
},
]

export default function Testimonials() {
return ( <section className="bg-[#060B18] px-4 py-20 sm:px-6 lg:px-8"> <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#1c2540] bg-[#0a1120]/60 p-6 shadow-[0_0_80px_-20px_rgba(59,130,246,0.25)] sm:p-10">
{/* Header */} <div className="mb-10 text-center"> <h2 className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-2xl font-extrabold uppercase tracking-[0.15em] text-transparent sm:text-3xl">
What You Can Do with RYNOVIX </h2>

```
      <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-7 text-slate-400 sm:text-base">
        Explore AI-powered tools designed to assist with content
        ideas, writing, video titles, and creator-focused workflows.
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {creatorFeatures.map((feature) => {
        const Icon = feature.icon

        return (
          <div
            key={feature.title}
            className="group rounded-2xl border border-[#1c2540] bg-[#0b1324]/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.3)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-500/15">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-base font-semibold text-white">
              {feature.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {feature.description}
            </p>
          </div>
        )
      })}
    </div>
  </div>
</section>

)
}
