import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-6 pb-20 sm:px-8 lg:px-12">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-16 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />

        <div className="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-14 lg:flex-row lg:items-center">
        {/* Left Side */}
        <div className="w-full lg:w-[55%]">
          <HeroLeft />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[45%]">
          <HeroRight />
        </div>
      </div>
    </section>
  );
}