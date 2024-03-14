"use client";
import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useMouseEnter } from "../utils/3dCard";

export const CategoryCircle = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  index,
  total,
  color,
  onSelect,
  onDeselect,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  index: number;
  total: number;
  color?: string;
  onSelect?: () => void;
  onDeselect?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isCardMouseEntered] = useMouseEnter();
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  useEffect(() => {
    handleAnimations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCardMouseEntered, isMouseEntered]);

  const radius = useMemo(() => {
    return isCardMouseEntered ? 160 : 130;
  }, [isCardMouseEntered]);

  const divisions = total;

  const delta = useMemo(() => {
    return -Math.PI / 2;
  }, []);

  const _translateX = useMemo(() => {
    return radius * Math.cos((index / divisions) * 2 * Math.PI + delta);
  }, [radius, index, divisions, delta]);
  const _translateY = useMemo(() => {
    return radius * Math.sin((index / divisions) * 2 * Math.PI + delta);
  }, [radius, index, divisions, delta]);

  const _translateZ = useMemo(() => {
    if (isCardMouseEntered) {
      return 20;
    } else {
      return 0;
    }
  }, [isCardMouseEntered]);

  const scale = useMemo(() => {
    return isMouseEntered ? 1.1 : 1;
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translateX(${_translateX}px) translateY(${_translateY}px) translateZ(${_translateZ}px) scale(${scale})`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
    onSelect?.();
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(false);
    onDeselect?.();
  };

  return (
    <Tag
      style={
        {
          "--itemcolor": color,
        } as React.CSSProperties
      }
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("w-fit transition duration-200 ease-in-out", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};
