"use client";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeader from "../misc/SectionHeader";
import { cn } from "@/lib/utils";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import { ProjectCard } from "./Project";
import { TailwindConfig } from "@/lib/twConfig";
import { MasonryGrid } from "./MasonryGrid";

function getWindowDimensions() {
  if (typeof window === "undefined") return { width: 0, height: 0 };

  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function parseNumbers(str: string) {
  const numbersList = str.match(/\d+/g)?.map(Number) ?? [];
  const number = Number(numbersList.join(""));
  return number;
}

const maxWidth = parseNumbers(TailwindConfig.theme.screens["xl"]);

const ProjectsSection = () => {
  const projects = [
    "Página web",
    "Cochilorios",
    "Invitados.xyz",
    "Wappify",
    "Online Video Editor",
  ];

  const { width } = useWindowDimensions();
  // const columns = useMemo(() => (width > maxWidth ? 2 : 1), [width]);
  const [columns, setColumns] = useState(1);
  useEffect(() => {
    setColumns(width > maxWidth ? 2 : 1);
  }, [width]);

  return (
    <div className="min-h-svh py-10ring ring-green-400 mt-20">
      <div className="px-10">
        <SectionHeader title="Projects" />
      </div>
      <MasonryGrid
        columns={columns}
        className="lg:max-w-[120rem] mx-auto mt-16"
      >
        {projects.map((project) => (
          <ProjectCard key={project} slug={project} />
        ))}
      </MasonryGrid>
    </div>
  );
};

export default ProjectsSection;

export const Categories = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[
        "Frontend",
        "Backend",
        "Fullstack",
        "DevOps",
        "Mobile",
        "Desktop",
        "Web",
        "API",
      ].map((category) => (
        <Category key={category} title={category} />
      ))}
    </div>
  );
};

const Category: React.FC<{
  key?: string;
  title?: string;
  onClick?: () => void;
}> = ({ key, title = "title", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "row-span-1 rounded-md group/card hover:shadow-xl transition duration-200 shadow-input   justify-between flex items-center gap-4 relative border-white/[0.2] border cursor-pointer py-6 "
      )}
    >
      <div className="absolute inset-0 -z-10 rounded-md overflow-clip">
        <Image
          src={"https://source.unsplash.com/random/"}
          alt={title}
          width={200}
          height={50}
          className=" w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l transition-all from-black  via-black/80 to-black/60 group-hover/card:to-black/20 group-hover/card:via-black/60"></div>
      </div>
      <div className="group-hover/card:translate-x-2 transition duration-200 flex flex-col grow gap-1 items-end">
        <div className=" text-lg font-bold leading-none dark:text-neutral-200 font-mono select-none">
          {title}
        </div>
      </div>
      <div className="flex items-center pr-5 group-hover/card:translate-x-1 group-hover/card:scale-110 transition duration-200">
        <FaChevronRight />
      </div>
    </div>
  );
};
