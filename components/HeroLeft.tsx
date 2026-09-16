export default function HeroLeft() {
  return (
    <div className="w-full max-w-[720px]">
      {/* Heading */}
      <h1 className="text-center lg:text-left text-[56px] leading-[1.05] font-extrabold tracking-tight sm:text-[64px] lg:text-[78px]">
        <span className="block text-white">
          One Platform.
        </span>

        <span className="block bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Unlimited AI Possibilities.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-10 max-w-[680px] text-center lg:text-left text-[20px] leading-[1.9] text-slate-300">
        All-in-one AI platform for creators. Start with powerful YouTube AI
        tools today, and unlock Image, Video, Voice, Website, and many more AI
        tools as{" "}
        <span className="font-semibold text-white">
          RYNOVIX
        </span>{" "}
        continues to grow.
      </p>
    </div>
  );
}