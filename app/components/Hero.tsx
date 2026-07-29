import HeroLeft from "./HeroLeft";
import HeroDashboard from "./HeroDashboard";

export default function Hero() {
  return (
    <div className="relative flex min-h-screen flex-col">
            <section className="flex flex-1 items-start px-4 pt-6 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-12 lg:flex-row lg:gap-[48px]">
          <div className="w-full lg:w-[35%]">
            <HeroLeft />
          </div>
          <div className="w-full lg:w-[65%]">
            <HeroDashboard />
          </div>
        </div>
      </section>
    </div>
  )
}
