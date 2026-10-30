
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#050814] px-4 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-12 lg:pb-24 lg:pt-12">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-10 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[90px] sm:top-16 sm:h-[450px] sm:w-[450px] sm:blur-[120px]" />

        <div className="absolute bottom-0 left-1/2 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[80px] sm:h-[350px] sm:w-[350px] sm:blur-[100px]" />
      </div>

      {/* Hero Content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
        {/* Left Side */}
        <div className="w-full min-w-0 lg:w-[55%] lg:flex-none">
          <HeroLeft />
        </div>

        {/* Right Side */}
        <div className="w-full min-w-0 lg:w-[45%] lg:flex-none">
          <HeroRight />
        </div>
      </div>
    </section>
  );
}
