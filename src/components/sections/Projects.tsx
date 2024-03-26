"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import SectionHeader from "../misc/SectionHeader";
import { cn } from "@/lib/utils";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import Card, { CardContainer } from "../misc/Project";
import { TailwindConfig } from "@/lib/twConfig";
import { MasonryGrid } from "../misc/MasonryGrid";
import { useWindowDimensions } from "../utils/hooks/windowDimensions";
import { parseNumbers } from "../utils";
import { useMainCategories } from "@/app/hooks/useCategories";
import { ICategory, IProject, ITechnology } from "@/domain/types";
import VisibilitySensor from "react-visibility-sensor";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const maxWidth = parseNumbers(TailwindConfig.theme.screens["xl"]);

const technologies: ITechnology[] = [
  {
    name: "React",
    slug: "react",
  },
  {
    name: "Next.js",
    slug: "nextdotjs",
  },
  {
    name: "TailwindCSS",
    slug: "tailwindcss",
  },
  {
    name: "TypeScript",
    slug: "typescript",
  },
  {
    name: "Vercel",
    slug: "vercel",
  },
  {
    name: "Supabase",
    slug: "supabase",
  },
  {
    name: "PostgreSQL",
    slug: "postgresql",
  },
];

const ProjectsSection = () => {
  const projects: IProject[] = [
    {
      slug: "project-1",
      title: "Project Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      technologies: technologies,
      content: [
        {
          type: "text",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          type: "link",
          title: "Hoori",
          url: "https://hoori.com.mx",
        },
        {
          type: "image",
          title: "Hoori",
          image: `https://source.unsplash.com/random/800x600?sid=project1`,
        },
      ],
      company: {
        name: "Hoori",
        url: "https://hoori.com.mx",
        image: `https://hoori.com.mx/_next/image?url=%2Fhoori-digital_hoori-principal-neg.png&w=384&q=75`,
      },
      image: `https://source.unsplash.com/random/800x600?sid=project1`,
    },
    {
      slug: "project-2",
      title: "Project Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      technologies: technologies,
      content: [
        {
          type: "link",
          title: "Hoori",
          icon: 'github',
          url: "https://hoori.com.mx",
        },
      ],
      company: {
        name: "Where Is My Transport",
        url: "https://hoori.com.mx",
        image: `https://hoori.com.mx/_next/image?url=%2Fhoori-digital_hoori-principal-neg.png&w=384&q=75`,
      },
      image: `https://source.unsplash.com/random/800x600?sid=project2`,
    },
    {
      slug: "project-3",
      title: "Project Title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      technologies: technologies,
      company: {
        name: "Coursera",
        url: "https://https://coursera.org/",
        image: `https://cdn.simpleicons.org/coursera`,
      },
      image: `https://source.unsplash.com/random/800x600?sid=project3`,
    },
  ];

  const { width } = useWindowDimensions();
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    setColumns(width > maxWidth ? 2 : 1);
  }, [width]);

  const categories = useMainCategories();

  return (
    <div className="min-h-svh py-10 ring-green-400 mt-20">
      {categories.map((category) => (
        <Category
          key={category.label}
          category={category}
          projects={projects}
          columns={columns}
        />
      ))}
    </div>
  );
};

export default ProjectsSection;

export const CategoryIcon: React.FC<{
  svg: string;
  className?: string;
}> = ({ className, svg }) => {
  return (
    <div className={cn(" aspect-square relative ", className)}>
      <div
        className="absolute inset-0 fill-[var(--color)] [&_svg]:w-full"
        dangerouslySetInnerHTML={{
          __html: svg || "",
        }}
      ></div>
      <div
        className="absolute inset-0 fill-[var(--color)] [&_svg]:w-full blur-md"
        dangerouslySetInnerHTML={{
          __html: svg || "",
        }}
      ></div>
    </div>
  );
};

export const Category: React.FC<{
  category: ICategory;
  projects: IProject[];
  columns?: number;
}> = ({ projects, category, columns = 1 }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    offset: ["end end", "start start"],
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ref.current) return;
    const top = ref.current.offsetTop;
    const height = ref.current.offsetHeight;
    const margin = 100;
    setIsHeaderVisible(top + height + margin > latest);
  });

  return (
    <section
      id={category.slug}
      className="md:px-10 pt-8 mt-52"
      style={
        {
          "--raw-color": category.color,
          "--color": `rgb(${ category.color })`,
          "--itemcolor": `rgb(${ category.color })`,
        } as React.CSSProperties
      }
    >
      <hr className="my-4 h-1 border-t-0 bg-transparent bg-gradient-to-r from-transparent to-transparent opacity-50 via-[var(--color)] relative -rotate-3 lg:rotate-0" />
      <div
        ref={ref}
        className="flex mx-5 sm:mx-10 gap-x-5 sm:gap-x-10 items-center justify-center mb-20 mt-20 lg:mb-32 lg:mt-28  z-20"
      >
        <div className=" w-32 sm:w-48 aspect-square rounded-full flex items-center justify-center z-50 relative">
          <div className=" w-[80%] aspect-square relative ">
            <div
              className="absolute inset-0 fill-[var(--color)] [&_svg]:w-full w-full h-full"
              dangerouslySetInnerHTML={{
                __html: category.svg || "",
              }}
            ></div>
            <div
              className="absolute inset-0 fill-[var(--color)] [&_svg]:w-full blur-md"
              dangerouslySetInnerHTML={{
                __html: category.svg || "",
              }}
            ></div>
            <div
              className={cn(
                "absolute inset-0 w-full h-full rounded-full ring ring-[var(--color)] opacity-25"
              )}
            ></div>
          </div>
          <div
            className={cn(
              "absolute inset-0 w-full h-full rounded-full ring ring-[var(--color)] blur-md opacity-80"
            )}
          ></div>
          <div
            className={cn(
              "absolute inset-0 w-full h-full rounded-full   border border-[var(--color)] opacity-40"
            )}
          ></div>
        </div>
        <h2 className="text-2xl sm:text-5xl font-semibold whitespace-break-spaces max-w-sm ">
          {category.label}
        </h2>
      </div>
      <div className="grid md:grid-cols-[minmax(2rem,20rem)_1fr] gap-x-4 gap-y-8 max-w-screen-[1600px] mx-auto">
        <div className="  col-span-1 sticky top-0 md:flex justify-center h-0 p-8 ">
          {category && (
            <div
              className={cn(
                "flex flex-col gap-2 w-32 sticky top-0 z-50 transition-all duration-1000 opacity-0",
                {
                  "opacity-100": !isHeaderVisible,
                }
              )}
            >
              {category.svg && <CategoryIcon svg={category.svg} />}
              {/* <span>{scrollYProgress.get()}</span> */}
            </div>
          )}
        </div>
        <div className=" "></div>
        {["Projects", "Blogs", "Certificates"].map((label, i) => (
          <CategoryTypeSection
            key={i}
            label={label}
            columns={columns}
            projects={projects}
          />
        ))}
      </div>
    </section>
  );
};

export const CategoryTypeSection: React.FC<{
  label?: string;
  columns: number;
  projects: IProject[];
}> = ({ columns, projects, label }) => {
  return (
    <>
      <div className=" sticky top-0  border-green-400/20 md:relative z-50 bg-gradient-to-l from-black to-black/40 md:bg-none">
        <div className=" sticky md:top-40 flex flex-col items-center">
          <h5 className=" text-3xl ml-auto md:mx-auto text-center p-8 bg-clip-text bg-gradient-to-t text-transparent via-10 from-white to-white filter drop-shadow-xl z-0 ">
            {label}
          </h5>
        </div>

        <div className=" absolute h-full top-0 right-1 w-px bg-[var(--color)] shadow-sm shadow-[var(--color)] "></div>
        <div className=" h-full sticky top-0 right-0 w-px bg-[var(--color)] shadow-sm shadow-[var(--color)] md:hidden"></div>
      </div>
      <MasonryGrid columns={columns} className=" mx-auto">
        {projects.map((project) => (
          <CardContainer key={project.slug} data={project}>
            <Card.Background.Image />
            <Card.Body>
              <Card.LeftPanel>
                <Card.Title className="mb-2" />
                <Card.Description className="mb-2" />
                <Card.Technologies className="group-[.open]:mt-auto group-[.open]:mb-3" />
              </Card.LeftPanel>
              <Card.RightPanel>
                <div></div>
                <Card.Company />
              </Card.RightPanel>
            </Card.Body>
          </CardContainer>
        ))}
      </MasonryGrid>
    </>
  );
};
