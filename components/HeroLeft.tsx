
export default function HeroLeft() {
  return (
    <div className="mx-auto w-full max-w-[720px] min-w-0">
      {/* Heading */}
      <h1 className="text-balance text-center text-[clamp(2.5rem,6vw,4.875rem)] font-extrabold leading-[1.08] tracking-tight lg:text-left">
        <span className="block text-white">
          One Platform.
        </span>

        <span className="mt-2 block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          32 AI Tools.
        </span>

        <span className="mt-2 block text-white">
          Unlimited Possibilities.
        </span>
      </h1>

      {/* Description */}
      <p className="mx-auto mt-6 max-w-[680px] text-center text-base leading-8 text-slate-300 sm:mt-8 sm:text-lg sm:leading-9 lg:mx-0 lg:text-left lg:text-xl">
        Create smarter and faster with{" "}
        <span className="font-semibold text-white">32 AI-powered tools</span>{" "}
        built for content creators. Generate ideas, write content, optimize
        SEO, and simplify your creative workflow—all in one platform with{" "}
        <span className="font-semibold text-white">RYNOVIX</span>.
      </p>
    </div>
  );
}
