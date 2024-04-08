"use client"
import React from "react"

const ContactSection = () => {
  return (
    <div className="h-svh p-10 mt-32 flex justify-center items-center relative">
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_0_0,black,transparent_50%,#0008)] opacity-0 md:opacity-100"></div> */}
      <EvervaultCard text="hover" />
    </div>
  )
}

export default ContactSection
import { useMotionValue } from "framer-motion"
import { useState, useEffect } from "react"
import { useMotionTemplate, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const EvervaultCard = ({
  text,
  className,
}: {
  text?: string
  className?: string
}) => {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  const [randomString, setRandomString] = useState("")

  useEffect(() => {
    let str = generateRandomString(1500)
    setRandomString(str)
  }, [])

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)

    const str = generateRandomString(1500)
    setRandomString(str)
  }

  return (
    <div
      className={cn(
        "  bg-transparent aspect-square flex items-center justify-center relative",
        className
      )}
    >
      <div className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full">
        <div
          className="relative z-10 flex items-center justify-center  p-8 rounded-2xl"
          onMouseMove={onMouseMove}
        >
          <CardPattern
            mouseX={mouseX}
            mouseY={mouseY}
            randomString={randomString}
          />
            <span className="text-white z-20 flex flex-col justify-center gap-3">
              <h3 className="text-center select-none text-lg sm:text-4xl text-gray-400 font-semibold">Contact me at:</h3>
              <div className="text-center text-2xl  md:text-6xl lg:text-7xl bg-black bg-opacity-60 py-5 px-5 rounded-2xl select-all">
                jorge@arreola.studio
              </div>
            </span>
        </div>
      </div>
    </div>
  )
}

export function CardPattern({ mouseX, mouseY, randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(500px at ${mouseX}px ${mouseY}px, #fff4, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none -z-10">
      <div className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500 text-3xl">
          {randomString}
          {randomString}
        </p>
      </motion.div>
    </div>
  )
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
export const generateRandomString = (length: number) => {
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
