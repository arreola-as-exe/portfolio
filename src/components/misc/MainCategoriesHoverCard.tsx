"use client"
import { useMainCategories } from "@/app/hooks/useCategories"
import { ICategory } from "@/domain/types"
import { cn } from "@/lib/utils"
import React, { createContext, useState, useContext } from "react"
import { HoverBody, HoverContainer, HoverItem } from "../utils/3dCard"
import { CategoryCircle } from "./CategoryCircle"
import Image from "next/image"

export const MainCategoriesHoverCard: React.FC<{
  classname?: string
}> = ({ classname }) => {
  const categories = useMainCategories()
  const [hoveredCategory, setHoveredCategory] = useState<ICategory | null>(null)

  const isMobile = useMobileDetect().isMobile()
  const isDesktop = useMobileDetect().isDesktop()

  const scrollToCategory = (category: ICategory) => {
    document?.querySelector(`section#${category.slug}`)?.scrollIntoView({
      behavior: "smooth",
    })
  }

  const handleCategoryClick = (category: ICategory) => {
    console.log(category, {
      isMobile,
      isDesktop,
      hoveredCategory,
    })
    if (isMobile) {
      if (category === hoveredCategory) {
        scrollToCategory(category)
      } else {
        setHoveredCategory(category)
      }

    } else {
      scrollToCategory(category)
    }
  }

  return (
    <HoverContainer
      className={cn("inter-var")}
      style={
        {
          "--selectedcolor": `rgb(${hoveredCategory?.color})` || "#454c51",
        } as React.CSSProperties
      }
      onLeave={() => {
        setHoveredCategory(null)
      }}
    >
      <HoverBody
        className={cn(
          ` relative group/card w-full aspect-square rounded-full p-3 
          scale-[80%]
      sm:scale-[100%]
      md:scale-[110%] 
      lg:scale-[130%] 
      2xl:scale-[160%]  
          `
        )}
      >
        <HoverItem
          className={cn(
            " absolute inset-0 w-full h-full opacity-70 rounded-full border-2 border-[var(--selectedcolor)] border-dashed ",
            {
              "border-solid": hoveredCategory !== null,
            }
          )}
          translateZ={-10}
          scale={[1.2, 1]}
          opacity={[0.8, 1]}
        >
          <div
            className={cn(
              " absolute inset-0 w-full h-full opacity-50 rounded-full ring-2 ring-[var(--selectedcolor)] scale-110  ",
              {
                "opacity-20": hoveredCategory !== null,
              }
            )}
          ></div>
        </HoverItem>
        <HoverItem
          className=" absolute inset-0 w-full h-full opacity-70 rounded-full ring-1 ring-[var(--selectedcolor)] "
          translateZ={-120}
          scale={0.8}
          opacity={[0, 1]}
        />
        <HoverItem
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          translateZ={-50}
          scale={0.85}
          opacity={[0, 1]}
        >
          <div className="w-32 bg-red-300">
            <div
              className="absolute inset-0 fill-[var(--selectedcolor)] [&_svg]:w-full"
              dangerouslySetInnerHTML={{
                __html: hoveredCategory?.svg || "",
              }}
            ></div>
            <div
              className="absolute inset-0 fill-[var(--selectedcolor)] [&_svg]:w-full blur-md"
              dangerouslySetInnerHTML={{
                __html: hoveredCategory?.svg || "",
              }}
            ></div>
          </div>
        </HoverItem>
        <div className="absolute w-32 aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ">
          {categories.map((item, index, list) => (
            <CategoryCircle
              onClick={() => {
                handleCategoryClick(item)
              }}
              total={list.length}
              key={index}
              color={item.color}
              as="div"
              onSelect={() => {
                setHoveredCategory(item)
              }}
              onDeselect={() => {
                // setSelectedCategory(null);
              }}
              index={index}
              translateZ="60"
              className="absolute text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 border aspect-square w-full rounded-full flex items-center justify-center cursor-pointer ring-[var(--itemcolor)]/70 hover:border-[var(--itemcolor)] hover:backdrop-blur-sm hover:ring-1 ring-[var(--itemcolor)] bg-black bg-opacity-10 z-50"
            >
              <p className="select-none font-bold max-w-[80%] text-center">
                {item.label}
              </p>
              <div
                className={cn(
                  "absolute inset-0 w-full h-full rounded-full ring ring-[var(--itemcolor)] blur-md",
                  {
                    "ring-0": hoveredCategory !== null,
                  }
                )}
              ></div>
            </CategoryCircle>
          ))}
        </div>
      </HoverBody>
    </HoverContainer>
  )
}

const getMobileDetect = (userAgent: string) => {
  const isAndroid = (): boolean => Boolean(userAgent.match(/Android/i))
  const isIos = (): boolean => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isOpera = (): boolean => Boolean(userAgent.match(/Opera Mini/i))
  const isWindows = (): boolean => Boolean(userAgent.match(/IEMobile/i))
  const isSSR = (): boolean => Boolean(userAgent.match(/SSR/i))

  const isMobile = (): boolean =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindows())
  const isDesktop = (): boolean => Boolean(!isMobile() && !isSSR())
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  }
}
const useMobileDetect = () => {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent
  return getMobileDetect(userAgent)
}