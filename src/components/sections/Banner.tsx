import React from "react";
import Areas from "../misc/areas";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="h-screewsn relative grid items-center justify-center grid-flow-row lg:grid-cols-2 pb-20 sm:pb-40 md:pb-0 w-full pt-10 sm:pt-0">
      <Left />
      <Right />
    </section>
  );
};

export default Banner;

interface Icon {
  url: string;
  icon: IconType;
  color: string;
}

const icons: Icon[] = [
  {
    url: "https://github.com/JorgeArreolaS",
    icon: FaGithub,
    color: "#ffffff",
  },
  {
    url: "https://www.linkedin.com/in/jorgearreolas/",
    icon: FaLinkedin,
    color: "#0A66C2",
  },
  {
    url: "https://www.instagram.com/jorge.as.exe/",
    icon: FaInstagram,
    color: "#E4405F",
  },
];

export const Left = () => {
  return (
    <div className="flex flex-col justify-center items-center px-10 text-center lg:text-start lg:items-start gap-3 sm:gap-10 h-full lg:pl-32">
      <p className="text-2xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 md:text-start">
        {"Hi, I'm"}
      </p>

      <p className="text-5xl sm:text-9xl font-bold z-30 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 transition-all sm:leading-tight ">
        Jorge ArreolaS
      </p>

      <p className="text-2xl md:text-4xl font-semibold z-20 text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-300">
        Fullstack Developer & System Admin
      </p>

      <div className="flex gap-10">
        {icons.map(({ url, icon: Icon, color }, index) => (
          <Link
            key={index}
            target="_blank"
            href={url}
            style={
              {
                "--color": color,
              } as React.CSSProperties
            }
          >
            <Icon className=" w-8 h-8 md:w-12 md:h-12 fill-neutral-100 opacity-70 transition-all hover:fill-[var(--color)] hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export const Right = () => {
  return (
    <div className=" h-full flex items-center justify-center w-full">
      <Areas />
    </div>
  );
};
