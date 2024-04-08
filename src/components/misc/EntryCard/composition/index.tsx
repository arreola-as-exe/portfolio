"use client"
import React, { useMemo } from "react"
import { cn } from "@/lib/utils"
import { FaChevronDown } from "react-icons/fa6"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/tooltip"
import Image from "next/image"
import { IBadge, IEntryModel } from "@/domain/types"
import { useBadgesContext } from "@/app/data/contexts"
import LinkButton from "../../LinkButton"

const ProjectContext = React.createContext<{
  open: boolean
  toggle: () => void
  isHovered: boolean
  data: IEntryModel
}>({
  data: {
    id: "",
    slug: "Dummy project",
    title: "Dummy project",
    description: "",
    technologies: [],
    // company: null,
    image: "",
    badges: [],
  },
  isHovered: false,
  open: false,
  toggle: () => {},
})

const useProjectData = () => {
  return React.useContext(ProjectContext).data
}

const useIsOpen = () => {
  return React.useContext(ProjectContext).open
}

export const CardContainer: React.FC<{
  children: React.ReactNode
  data: IEntryModel
  index: number
}> = ({ children, data, index }) => {
  const [open, setOpen] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  function toggle() {
    setOpen(!open)
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
          "flex flex-col relative p-6 gap-1 py-10 h-[20rem] sm:transition-all ease-out group opacity-0 group-[.ready]/entriessection:opacity-100 ",
          [open && "h-[40rem]"],
          {
            "my-2": open,
            open: open,
          }
        )}
        style={{
          transitionDelay: `opacity ${index * 0.1}s`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
    </ProjectContext.Provider>
  )
}

const CardBody: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div className="grid grid-cols-[4fr_minmax(10px,1fr)] grid-rows-1 gap-2 z-10 h-full pointer-events-none">
      {children}
    </div>
  )
}

const LeftPanel: React.FC<{
  className?: string
  children: React.ReactNode
}> = ({ children, className }) => {
  return <div className={cn("flex flex-col gap-3", className)}>{children}</div>
}

const RightPanel: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between -translate-y-3 lg:-translate-y-6 row-span-2 items-end h-full gap-5">
      {children}
    </div>
  )
}

const Title: React.FC<{
  className?: string
}> = ({ className }) => {
  const { title } = useProjectData()
  const isOpen = useIsOpen()
  return (
    <h4
      className={cn(
        "text-lg sm:text-xl lg:text-2xl font-semibold",
        {
          "text-2xl sm:text-2xl lg:text-3xl": isOpen,
        },
        className
      )}
    >
      {title}
    </h4>
  )
}

const Description: React.FC<{
  className?: string
}> = ({ className }) => {
  const { description, content, externalLink } = useProjectData()
  const isOpen = useIsOpen()
  return (
    <>
      <div className="flex flex-col">
        <div
          className={cn(
            "text-sm lg:text-lg line-clamp-2 w-fit",
            [isOpen && "line-clamp-none pointer-events-auto overflow-y-auto"],
            className
          )}
        >
          <p className="">{description}</p>
        </div>
        {externalLink && (
          <div
            className={cn("w-fit", [
              isOpen && "pointer-events-auto overflow-y-auto",
            ])}
          >
            <LinkButton
              url={externalLink.url}
              label={externalLink.label}
              icon_svg={externalLink.icon_svg}
            />
          </div>
        )}
      </div>

      <div
        className={cn(
          "text-sm lg:text-lg line-clamp-2",
          [isOpen && "line-clamp-none pointer-events-auto overflow-y-auto"],
          className
        )}
      >
        <div
          className={cn("[&>*]:mb-3", {
            hidden: !isOpen,
          })}
        >
          {content?.map((item, index) => {
            if (item.type === "text") {
              return (
                <p key={index} className="">
                  {item.content}
                </p>
              )
            }
            if (item.type === "link") {
              return (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "px-3 py-2 rounded-lg transition-all border border-[rgba(var(--raw-color)/30%)] hover:border-[rgba(var(--raw-color)/100%)] bg-[rgba(var(--raw-color)/5%)] hover:bg-[rgba(var(--raw-color)/10%)] hover:shadow-lg border-opacity-10 inline-flex items-center group/link"
                  )}
                >
                  <Image
                    width={32}
                    height={32}
                    src={`https://cdn.simpleicons.org/${item.icon}/white`}
                    alt={item.title}
                    className={cn(
                      "h-6 w-auto aspect-square object-cover transition-all duration-500 opacity-80 hover:opacity-100 filter drop-shadow-md cursor-pointer scale-125 group-hover/link:scale-100",
                      {
                        "group-hover/link:mr-2": item.title,
                      }
                    )}
                  />
                  <span
                    className={cn(
                      "text-2xl transition-all duration-500 max-w-0 group-hover/link:max-w-96 opacity-0 group-hover/link:opacity-100 ",
                      {}
                    )}
                  >
                    {item.title}
                  </span>
                  {/* <FaExternalLinkAlt className="inline-block ml-2 outline-0" /> */}
                </a>
              )
            }
          })}
        </div>
      </div>
    </>
  )
}

const Badges: React.FC<{
  className?: string
}> = ({ className }) => {
  const entryBadges = useProjectData().badges
  const globalBadges = useBadgesContext()

  const badges = useMemo((): IBadge[] => {
    if (!entryBadges) return []
    return entryBadges
      ?.map((badge) => {
        const technology = globalBadges.find((b) => b.id === badge.id)
        return technology ?? null
      })
      .filter((badge) => badge !== null) as IBadge[]
  }, [entryBadges])

  const isOpen = useIsOpen()
  return (
    <div
      className={cn(
        "pointer-events-auto inline-flex flex-wrap gap-3 w-fit",
        className
      )}
    >
      {badges.map((badge, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn(
                  "w-6 aspect-square relative fill-white transition-all opacity-80 hover:opacity-100 filter drop-shadow-md cursor-pointer",
                  {
                    "w-8": isOpen,
                  }
                )}
              >
                <div
                  className="pointer-events-none"
                  dangerouslySetInnerHTML={{
                    __html: badge.svg || "",
                  }}
                  aria-disabled={true}
                ></div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{badge.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

const Brand = () => {
  const { brand: company } = useProjectData()
  if (!company) return null

  const { name, url, image } = company
  return (
    <div className=" flex w-full justify-center max-h-16 pointer-events-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="">
            {image !== undefined && (
              <a href={url} target="_blank">
                <Image
                  width={100}
                  height={25}
                  src={image}
                  alt={name}
                  className=" h-full object-contain"
                />
              </a>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

const Date = () => {
  const { date_string } = useProjectData()
  const isOpen = useIsOpen()

  return (
    <div
      className={cn(
        " flex justify-center min-w-full transition-all opacity-0",
        {
          "opacity-100": isOpen,
        }
      )}
    >
      {date_string && (
        <span className="font-semibold translate-y-[-1.8rem] sm:translate-y-[-1rem] text-2xl text-right lg:text-3xl lg:text-center whitespace-nowrap">
          {date_string}
        </span>
      )}
    </div>
  )
}

const BackgroundImage = () => {
  const { open, toggle, isHovered } = React.useContext(ProjectContext)
  const { image, slug, title } = useProjectData()

  const imgUrl =
    image ?? `https://source.unsplash.com/random/800x600?sid=${title}`
  // return null

  return (
    <div
      className="absolute inset-0 h-full w-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] flex items-center align-center cursor-pointer transition-all border-t-4 md:border-0 border-[rgba(var(--raw-color)/20%)] hover:border-[rgba(var(--raw-color)/40%)]"
      style={{
        transform: `rotateX(-20deg) rotateY(10deg) translateY(-0.8rem) scale(1.01,1.10)`,
      }}
      onClick={toggle}
    >
      <div className="absolute inset-0 -z-10 overflow-clip">
        <Image
          alt={title}
          width={800}
          height={600}
          loading="lazy"
          className={cn(
            "w-full h-full object-cover transition-all brightness-75 motion-reduce:transition-none motion-reduce:hover:transform-none",
            {
              "brightness-50": open,
            },
            [isHovered ? "scale-125" : "scale-100"]
          )}
          src={imgUrl}
        ></Image>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_0_0,black,#0003_50%,black)]"></div>
      </div>
      <div className="absolute bottom-8 left-8">
        <FaChevronDown
          size={24}
          className={cn("transition-all duration-500", {
            "-rotate-180": open,
          })}
        />
      </div>
    </div>
  )
}

export const EntryCardLayoutComponents = {
  Container: CardContainer,
  Background: {
    Image: BackgroundImage,
  },
  Body: CardBody,
  LeftPanel,
  RightPanel,
}

export const EntryCardDataComponents = {
  Title,
  Description,
  Badges,
  Brand,
  BackgroundImage,
  Date,
}
