"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FaArrowRight, FaChevronDown } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Image from "next/image";
import { BackgroundGradient } from "../utils/background-gradiant";

interface ICompany {
  name: string;
  url?: string;
  image?: string;
}

interface IProject {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  company?: ICompany;
  image: string;
}

const ProjectContext = React.createContext<{
  open: boolean;
  toggle: () => void;
  isHovered: boolean;
  data: IProject;
}>({
  data: {
    slug: "Dummy project",
    title: "Dummy project",
    description: "",
    technologies: [],
    // company: null,
    image: "",
  },
  isHovered: false,
  open: false,
  toggle: () => {},
});

const useProjectData = () => {
  return React.useContext(ProjectContext).data;
};

const useIsOpen = () => {
  return React.useContext(ProjectContext).open;
};

export const ProjectCard: React.FC<{
  slug: string;
}> = ({ slug }) => {
  const [open, setOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  function toggle() {
    setOpen(!open);
  }

  return (
    <ProjectContext.Provider
      value={{
        open,
        toggle,
        isHovered,
        data: {
          slug,
          title: "Project Title",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          technologies: [
            "React",
            "Next.js",
            "TailwindCSS",
            "TypeScript",
            "Vercel",
            "Supabase",
            "PostgreSQL",
          ],
          company: {
            name: "Hoori",
            url: "https://hoori.com.mx",
            image: `https://hoori.com.mx/_next/image?url=%2Fhoori-digital_hoori-principal-neg.png&w=384&q=75`,
          },
          image: `https://source.unsplash.com/random/800x600?sid=${slug}`,
        },
      }}
    >
      <div
        className={cn({
          "my-2": open,
        })}
      >
        <div
          className={cn(
            "flex flex-col relative p-6 gap-1 py-10 h-[20rem] transition-all ease-out ",
            [open && "h-[40rem]"]
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Background />
          <div
            className="grid grid-cols-[3fr_minmax(10px,1fr)] grid-rows-1 gap-2 z-10 h-full pointer-events-none"
            // onClick={toggle}
          >
            <div className="">
              <Information />
              {/* {JSON.stringify(isHovered)} */}
            </div>
            <div className="flex flex-col justify-between -translate-y-3 lg:-translate-y-6 row-span-2 ">
              <div className="flex flex-col justify-between items-end h-full gap-5">
                <div
                  className={cn(
                    "flex flex-wrap justify-end gap-2 align-end overflow-auto pointer-events-auto",
                    { "flex-col": open }
                  )}
                >
                  <Technologies />
                </div>
                <Company />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProjectContext.Provider>
  );
};

const Information = () => {
  const { title, description } = useProjectData();
  const isOpen = useIsOpen();

  return (
    <div className="pointer-events-auto">
      <h4 className="text-lg sm:text-2xl lg:text-3xl font-semibold mb-3">{title}</h4>
      <p
        className={cn("text-sm sm:text-lg lg:text-2xl line-clamp-2", [
          isOpen && "line-clamp-none",
        ])}
      >
        {description}
      </p>
    </div>
  );
};

const Technologies = () => {
  const { technologies } = useProjectData();
  const isOpen = useIsOpen();
  return technologies.map((e, index) => (
    <TooltipProvider key={index}>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "w-8 border border-dashed border-neutral-300 aspect-square",
              {
                "w-12": isOpen,
              }
            )}
          ></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{e}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ));
};

const Company = () => {
  const { company } = useProjectData();
  if (!company) return null;

  const { name, url, image } = company;
  return (
    <div className="w-full max-w-32 pointer-events-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full">
            {image !== undefined && (
              <Image
                width={100}
                height={25}
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                onClick={(e) => {
                  alert("clicked");
                }}
              />
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const Background = () => {
  const { open, toggle, isHovered } = React.useContext(ProjectContext);
  const { image, slug } = useProjectData();

  return (
    <div
      className="absolute inset-0 h-full w-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] flex items-center align-center cursor-pointer"
      style={{
        transform: `rotateX(-20deg) rotateY(10deg) translateY(-0.8rem) scale(1.01,1.10)`,
      }}
      onClick={toggle}
    >
      <div className="absolute inset-0 -z-10 overflow-clip">
        <img
          loading="lazy"
          className={cn(
            "w-full h-full object-cover transition-all brightness-75 motion-reduce:transition-none motion-reduce:hover:transform-none",
            {
              "brightness-50": open,
            },
            [isHovered ? "scale-125" : "scale-100"]
          )}
          src={`https://source.unsplash.com/random/800x600?sid=${slug}`}
        ></img>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_0_0,black,transparent_50%,black)]"></div>
      </div>
      <div className="absolute bottom-8 left-8">
        <FaChevronDown
          size={24}
          className={cn("transition-all", {
            "rotate-180": open,
          })}
        />
      </div>
    </div>
  );
};
