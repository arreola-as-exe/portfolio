"use client"
import React from "react"
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

const Background = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -300])

  return (
    <>
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_0_0,transparent_50%,black)] opacity-0 md:opacity-100"></div> */}

      <motion.div
        style={{
          y: y,
        }}
        className="fixed inset-0 pointer-events-none -z-50 h-[300vh] bg-black bg-grid-big-white/[0.15]  bg-repeat"
      ></motion.div>
    </>
  )
}

export default Background
