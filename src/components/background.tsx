"use client";
import React from "react";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const Background = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const y2 = useSpring(y, {
    stiffness: 0,
    damping: 0,
    restDelta: 0,
  });
  // const cursor =

  return (
    <>
      <div
        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_0_0,transparent_50%,black)] opacity-0 md:opacity-100"
      ></div>

      <motion.div
        style={{
          y: y2,
        }}
        className="fixed inset-0 pointer-events-none -z-50 h-[300vh]  dark:bg-black bg-white  dark:bg-grid-big-white/[0.1] bg-grid-big-black/[0.2] bg-repeat"
      ></motion.div>
    </>
  );
};

export default Background;
