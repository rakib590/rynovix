import Image from "next/image"
import { Star } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  avatar: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: "Alex M.",
    role: "YouTube Creator",
    avatar: "/Avatars/Alex.png",
    quote: "RYNOVIX helped me grow my channel 3x faster!",
    rating: 5,
  },
  {
    name: "Priya S.",
    role: "Content Creator",
    avatar: "/Avatars/Priya.png",
    quote: "The tools are super easy to use and very effective.",
    rating: 5,
  },
  {
    name: "Rakib.",
    role: "Video Producer",
    avatar: "/Avatars/Rakib.png",
    quote: "Best AI platform for YouTube creators!",
    rating: 5,
  },
  {
    name: "Sarah K.",
    role: "Vlogger",
    avatar: "/Avatars/Sarah.png",
    quote: "I save hours every week using RYNOVIX.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="bg-[#060B18] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#1c2540] bg-[#0a1120]/60 p-6 shadow-[0_0_80px_-20px_rgba(59,130,246,0.25)] sm:p-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-2xl font-extrabold uppercase tracking-[0.2em] text-transparent sm:text-3xl">
            Trusted by Creators
          </h2>
          <p className="mt-2 text-sm text-slate-400 sm:text-base text-pretty">
            Join thousands of YouTube creators who love RYNOVIX
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group flex items-start gap-4 rounded-2xl border border-[#1c2540] bg-[#0b1324]/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.45)]"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1c2540] transition-all duration-300 group-hover:ring-blue-500/50">
                <Image
                  src={t.avatar || "/placeholder.svg"}
                  alt={`${t.name} avatar`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-col">
                <p className="text-sm font-medium leading-relaxed text-slate-200 text-pretty">
                  {`"${t.quote}"`}
                </p>
                <span className="mt-2 text-sm text-slate-400">{`— ${t.name}`}</span>
                <span className="text-xs text-slate-500">{t.role}</span>
                <div className="mt-2 flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
