import SocialLinks from "../misc/SocialLinks";
import { MainCategoriesHoverCard } from "../misc/MainCategoriesHoverCard";

const MainBannerSection = () => {
  return (
    <section
      id="start"
      className="h-svh relative grid items-center justify-center lg:grid-cols-2 pb-20 sm:pb-40 md:pb-0 w-full pt-10 sm:pt-0"
    >
      <Left />
      <Right />
    </section>
  );
};

export default MainBannerSection;

export const Left = () => {
  return (
    <div
      className="flex flex-col

     justify-center items-center

     lg:justify-start lg:items-start lg:p-20 lg:text-start
     2xl:justify-center 2xl:items-start 2xl:pl-32

     px-10 text-center gap-3 sm:gap-10 h-full "
    >
      <p className="text-2xl sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-blue-300">
        {"Hi, I'm"}
      </p>

      <p className="text-5xl sm:text-8xl font-bold z-30 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 transition-all sm:leading-tight ">
        Jorge ArreolaS
      </p>

      <p className="text-2xl md:text-4xl font-semibold z-20 text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-300">
        Fullstack Developer & System Admin
      </p>

      <SocialLinks />
    </div>
  );
};

export const Right = () => {
  return (
    <div
      className=" h-full flex items-center justify-center w-full 
    lg:items-end 2xl:items-center
    "
    >
      <div className="
      md:-translate-y-24 
      lg:-translate-y-80 lg:-translate-x-44
      2xl:translate-y-0 2xl:-translate-x-20
      ">
        <MainCategoriesHoverCard />
      </div>
    </div>
  );
};
