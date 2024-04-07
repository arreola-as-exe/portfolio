import { cn } from "@/lib/utils"
import React, { FC } from "react"

const LinkButton: FC<{
  url: string
  label?: string
  icon_svg?: string
}> = ({ url, label, icon_svg }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "px-2 h-10 py-2 rounded-lg transition-all border border-[rgba(var(--raw-color)/30%)] hover:border-[rgba(var(--raw-color)/100%)] bg-[rgba(var(--raw-color)/5%)] hover:bg-[rgba(var(--raw-color)/10%)] hover:shadow-lg border-opacity-10 inline-flex items-center group/link overflow-clip"
      )}
    >
      {icon_svg && (
        <div
          className={cn(
            "pointer-events-none inline [&_svg]:w-full [&_svg]:h-full [&_*]:fill-[rgba(var(--raw-color)/100%)] h-6 w-auto aspect-square object-cover transition-all duration-500 opacity-80 hover:opacity-100 filter drop-shadow-md cursor-pointer group-hover/link:scale-110 mr-2 lg:mr-0",
            {
              "group-hover/link:mr-2": label,
            }
          )}
          dangerouslySetInnerHTML={{
            __html: icon_svg,
          }}
        ></div>
      )}
      <span
        className={cn(
          "text-lg leading-[0] transition-all duration-500 lg:max-w-0 group-hover/link:max-w-96 lg:opacity-0 group-hover/link:opacity-100 ",
          {}
        )}
      >
        {label ?? "Show more"}
      </span>
      {/* <FaExternalLinkAlt className="inline-block ml-2 outline-0" /> */}
    </a>
  )
}

export default LinkButton
