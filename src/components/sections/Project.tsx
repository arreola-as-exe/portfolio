"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FaChevronDown } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Image from "next/image";
import { IProject } from "@/domain/types";

// console.log(SimpleIcons);

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

export const CardContainer: React.FC<{
  children: React.ReactNode;
  data: IProject;
}> = ({ children, data }) => {
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
        data,
      }}
    >
      <div
        className={cn(
          "flex flex-col relative p-6 gap-1 py-10 h-[20rem] transition-all ease-out group",
          [open && "h-[40rem]"],
          {
            "my-2": open,
            open: open,
          }
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
    </ProjectContext.Provider>
  );
};

const CardBody: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="grid grid-cols-[4fr_minmax(10px,1fr)] grid-rows-1 gap-2 z-10 h-full pointer-events-none">
      {children}
    </div>
  );
};

const LeftPanel: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className }) => {
  return <div className={cn("flex flex-col gap-3", className)}>{children}</div>;
};

const RightPanel: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between -translate-y-3 lg:-translate-y-6 row-span-2 items-end h-full gap-5">
      {children}
    </div>
  );
};

const Title: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { title } = useProjectData();
  const isOpen = useIsOpen();
  return (
    <h4
      className={cn(
        "text-lg sm:text-xl lg:text-xl font-semibold",
        {
          "text-2xl sm:text-2xl lg:text-3xl": isOpen,
        },
        className
      )}
    >
      {title}
    </h4>
  );
};

const Description: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { description } = useProjectData();
  const isOpen = useIsOpen();
  return (
    <p
      className={cn(
        "text-sm lg:text-lg line-clamp-2",
        [isOpen && "line-clamp-none"],
        className
      )}
    >
      {description}
    </p>
  );
};

const Technologies: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { technologies } = useProjectData();
  const isOpen = useIsOpen();
  return (
    <div
      className={cn(
        "pointer-events-auto inline-flex flex-wrap gap-3",
        className
      )}
    >
      {technologies.map(({ name, slug, color }, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn("w-6 aspect-square relative", {
                  "w-8": isOpen,
                })}
              >
                <Image
                  width={32}
                  height={32}
                  src={`https://cdn.simpleicons.org/${slug}/white`}
                  alt={name}
                  className="w-full h-full object-cover transition-all opacity-80 hover:opacity-100 filter drop-shadow-md cursor-pointer"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

const Company = () => {
  const { company } = useProjectData();
  if (!company) return null;

  const { name, url, image } = company;
  return (
    <div className=" flex w-full max-w-32 max-h-16 pointer-events-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="">
            {image !== undefined && (
              <Image
                width={100}
                height={25}
                src={image}
                alt={name}
                className=" h-full object-contain"
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

const BackgroundImage = () => {
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

const Card = {
  Container: CardContainer,
  Background: {
    Image: BackgroundImage,
  },
  Body: CardBody,
  LeftPanel,
  RightPanel,
  Title,
  Description,
  Technologies,
  Company,
};

export default Card;
