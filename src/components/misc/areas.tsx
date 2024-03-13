"use client";
import { cn } from "@/lib/utils";
import { useTime, useTransform } from "framer-motion";
import Image from "next/image";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  useMemo,
} from "react";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
  style,
  onLeave,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  style: React.CSSProperties;
  onLeave?: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    onLeave?.();
  };
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{
          perspective: "1000px",
          ...style,
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

type IItemSingleValue = number | string;
type IItemArrayValue = [IItemSingleValue, IItemSingleValue];
type IItemValue = IItemSingleValue | IItemArrayValue;

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  scale,
  opacity = [1, 1] as IItemValue,
  ...rest
}: {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  scale?: IItemValue;
  opacity?: IItemValue;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    const [startOpacity, endOpacity] = Array.isArray(opacity)
      ? opacity
      : [0, opacity];

    const [startScale, endScale] = Array.isArray(scale) ? scale : [1, scale];

    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${endScale})`;
      ref.current.style.opacity = String(endOpacity);
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${startScale})`;
      ref.current.style.opacity = String(startOpacity);
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

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

interface ICategory {
  label: string;
  color: string;
  svg?: string;
}

const categories: ICategory[] = [
  {
    label: "Fullstack Development",
    color: "rgb(14, 169, 78)",
    svg: `
      <svg  viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M919.113143 325.485714H104.813714v-67.803428h814.299429v-133.12a36.571429 36.571429 0 0 0-36.571429-36.571429H141.385143a36.571429 36.571429 0 0 0-36.571429 36.571429L103.862857 865.645714a36.425143 36.425143 0 0 0 36.571429 36.571429h673.865143a33.938286 33.938286 0 1 1 0 67.876571h-705.097143-0.146286a73.142857 73.142857 0 0 1-73.069714-73.142857L36.937143 93.184a73.142857 73.142857 0 0 1 73.142857-73.142857h803.693714a73.142857 73.142857 0 0 1 73.142857 73.142857v703.268571a33.938286 33.938286 0 0 1-67.803428 0V325.485714zM206.628571 215.844571a33.938286 33.938286 0 1 1 0-67.803428 33.938286 33.938286 0 0 1 0 67.803428z m203.556572 0a33.938286 33.938286 0 1 1 0-67.803428 33.938286 33.938286 0 0 1 0 67.803428z m-101.814857 0a33.938286 33.938286 0 1 1 0-67.803428 33.938286 33.938286 0 0 1 0 67.803428z m34.889143 250.148572c7.168-7.094857 26.112-7.094857 33.28 0 7.168 7.094857 7.168 29.476571 0 37.156571L265.874286 610.742857 373.76 712.923429c7.168 7.094857 8.118857 27.355429 0 35.328-9.801143 9.728-29.842286 8.192-36.571429 1.609142l-126.025142-125.805714a18.432 18.432 0 0 1 0-25.965714l132.096-132.096z m343.478857 0l132.096 132.096a18.432 18.432 0 0 1 0 26.038857l-126.098286 125.732571c-6.656 6.582857-25.6 10.752-36.571429 0-10.313143-10.24-7.094857-31.305143 0-38.4l108.397715-100.717714-111.908572-108.690286c-7.168-7.68-9.508571-26.624 0-36.059428 9.289143-9.142857 26.916571-7.094857 34.084572 0z m-135.68-26.331429c3.657143-9.508571 21.430857-15.506286 32.768-11.264 10.825143 4.022857 17.188571 19.017143 14.189714 28.525715l-119.808 329.947428c-3.657143 9.508571-20.699429 13.238857-30.281143 9.728-10.166857-3.584-21.211429-17.554286-17.554286-27.062857l120.685715-329.874286z" /></svg>
    `,
  },
  {
    label: "Data Processing",
    color: "rgb(240, 43, 43)",
    svg: `
    <svg
   viewBox="0 0 1024 1024"
   class="icon"
   version="1.1">
    <path
       d="m 775.68138,236.76343 c 31.08571,-10.82514 55.00343,-23.11314 69.92457,-35.328 10.24,-8.33829 13.45828,-13.824 13.45828,-16.01829 0,-2.19428 -3.21828,-7.68 -13.45828,-16.09143 C 830.6848,157.184 806.84023,144.896 775.68138,134.07086 707.51223,110.44571 613.15795,96.621715 512.00138,96.621715 c -101.15657,0 -195.51086,13.897145 -263.68,37.449145 -31.08572,10.82514 -55.00343,23.11314 -69.92458,35.328 -10.24,8.33828 -13.45828,13.75085 -13.45828,16.01828 0,2.19429 3.21829,7.68 13.45828,16.09143 14.92115,12.14172 38.76572,24.42972 69.92458,35.25486 68.16914,23.62514 162.52343,37.44914 263.68,37.44914 101.15657,0 195.51085,-13.89714 263.68,-37.44914 z m -633.05143,246.272 V 611.84 c 37.96114,40.00914 140.06857,88.72229 264.77714,103.27771 182.85714,21.28458 355.98629,-18.65142 473.52686,-98.304 l 0.43885,-131.65714 c -125.22057,73.65486 -301.49485,104.59429 -479.744,83.74857 -110.37257,-12.8 -204.36114,-46.08 -259.072,-85.86971 z m 0,-80.45714 c 38.03428,39.936 140.06857,88.64914 264.77714,103.13142 183.22286,21.35772 356.71771,-18.72457 474.25829,-98.74285 l 0.512,-145.99315 c -74.82515,43.88572 -212.55315,73.28915 -370.176,73.28915 -156.96457,0 -294.25372,-29.25715 -369.152,-72.77715 a 132116.33,132116.33 0 0 0 -0.21943,141.01943 z m 0.14628,289.86514 0.29257,108.10514 -1.09714,-7.46057 c 22.38172,74.02057 165.30286,133.48571 378.14857,133.48571 115.93143,0 206.77486,-17.55428 276.62629,-52.07771 19.60229,-9.728 34.52343,-17.92 49.152,-28.59886 9.728,-7.09485 16.09143,-11.41028 26.55086,-20.62628 10.82514,-9.58172 27.50171,-7.24115 37.15657,3.65714 9.58171,10.752 10.82514,28.30629 0,37.96114 -11.70286,10.24 -17.18857,14.848 -28.59886,23.18629 -17.04229,12.43428 -36.42514,25.38057 -58.80686,36.49828 -77.09257,38.10743 -155.648,60.85486 -302.08,60.85486 -243.93143,0 -405.21143,-77.16571 -436.077709,-179.2 l -1.097143,-3.65714 V 800.768 L 82.506521,646.36343 a 116682.53,116682.53 0 0 1 0.365714,-455.68 52.662857,52.662857 0 0 1 -0.292571,-5.26629 C 82.652806,103.20457 274.87223,36.571429 512.00138,36.571429 c 237.12914,0 429.34857,66.633141 429.34857,148.845711 a 53.028571,53.028571 0 0 1 -0.80457,9.58172 23.405714,23.405714 0 0 1 1.024,7.09485 l -1.68229,520.41143 c -0.0731,14.48229 -13.38514,26.18515 -29.76914,26.112 -16.384,0 -29.62286,-11.776 -29.54972,-26.33143 V 694.93029 C 755.49395,768.14629 579.51223,799.01257 401.6288,778.31314 291.40252,765.44 197.41395,732.23314 142.70309,692.44343 Z M 811.30195,401.48114 a 25.746286,25.746286 0 0 1 -25.96572,-25.45371 c 0,-14.04343 11.70286,-25.38057 26.03886,-25.38057 14.336,0 26.03886,11.33714 26.03886,25.38057 0,14.11657 -11.70286,25.45371 -26.03886,25.45371 z m 0,209.408 a 25.746286,25.746286 0 0 1 -25.96572,-25.45371 c 0,-14.04343 11.70286,-25.45372 26.03886,-25.45372 14.336,0 26.03886,11.41029 26.03886,25.45372 0,14.04343 -11.70286,25.45371 -26.03886,25.45371 z m 0,212.11429 a 25.746286,25.746286 0 0 1 -25.96572,-25.52686 c 0,-14.04343 11.70286,-25.45371 26.03886,-25.45371 14.336,0 26.03886,11.41028 26.03886,25.45371 0,14.04343 -11.70286,25.45372 -26.03886,25.45372 z" id="path1" />
</svg>

    `,
  },
  {
    label: "Random Stuff",
    color: "rgb(216, 208, 52)",
    svg: `
      <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="icon" transform="translate(46.976875, 46.976875)">
            <path d="M379.689791,38.3564581 L379.689791,379.689791 L38.3564581,379.689791 L38.3564581,38.3564581 L379.689791,38.3564581 Z M337.023125,81.0231247 L81.0231247,81.0231247 L81.0231247,337.023125 L337.023125,337.023125 L337.023125,81.0231247 Z M283.689791,251.689791 C301.362903,251.689791 315.689791,266.016679 315.689791,283.689791 C315.689791,301.362903 301.362903,315.689791 283.689791,315.689791 C266.016679,315.689791 251.689791,301.362903 251.689791,283.689791 C251.689791,266.016679 266.016679,251.689791 283.689791,251.689791 Z M209.023125,177.023125 C226.696237,177.023125 241.023125,191.350013 241.023125,209.023125 C241.023125,226.696237 226.696237,241.023125 209.023125,241.023125 C191.350013,241.023125 177.023125,226.696237 177.023125,209.023125 C177.023125,191.350013 191.350013,177.023125 209.023125,177.023125 Z M134.356458,102.356458 C152.02957,102.356458 166.356458,116.683346 166.356458,134.356458 C166.356458,152.02957 152.02957,166.356458 134.356458,166.356458 C116.683346,166.356458 102.356458,152.02957 102.356458,134.356458 C102.356458,116.683346 116.683346,102.356458 134.356458,102.356458 Z" id="Combined-Shape" transform="translate(209.023125, 209.023125) rotate(-345.000000) translate(-209.023125, -209.023125) ">

</path>
        </g>
</svg>
    `,
  },
  {
    label: "Cybersecurity",
    color: "rgb(25, 235, 235)",
    svg: `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.15,5.89A11,11,0,1,0,23,12,11,11,0,0,0,21.15,5.89ZM19.48,17A9,9,0,1,1,21,12,9,9,0,0,1,19.48,17ZM15,11V9A3,3,0,0,0,9,9v2a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V12a1,1,0,0,0-1-1Zm-1.5,0h-3V9a1.5,1.5,0,0,1,3,0Z" />
              <path
                d="M19.29,15.06a.93.93,0,0,0,.18-.26.78.78,0,0,0,.07-.31.78.78,0,0,0-.07-.3.93.93,0,0,0-.18-.26.76.76,0,0,0-.28-.15.8.8,0,0,0-.31,0,.7.7,0,0,0-.37.11.77.77,0,0,0-.26.28H16v.7h2.05a.69.69,0,0,0,.27.29.73.73,0,0,0,.38.11.8.8,0,0,0,.31,0A.76.76,0,0,0,19.29,15.06ZM19,14.49a.27.27,0,0,1-.28.28.22.22,0,0,1-.11,0,.28.28,0,0,1-.15-.15.22.22,0,0,1,0-.11.27.27,0,0,1,.28-.28.2.2,0,0,1,.11,0,.21.21,0,0,1,.1.06.18.18,0,0,1,.06.09.2.2,0,0,1,0,.11Zm.26-3.94,1.32-1.32q.12.39.21.78l-1.25,1.24H17.79V12h-.7v-1.4ZM9.8,19h.69v1.14l-.55.56c-.26-.06-.52-.13-.77-.21l.63-.63Zm2.56-.61V17h-.7v1.43a.8.8,0,0,0-.29.26.7.7,0,0,0-.11.37.75.75,0,0,0,.75.75.87.87,0,0,0,.28,0,.82.82,0,0,0,.25-.16.78.78,0,0,0,.16-.24.67.67,0,0,0,.06-.28.74.74,0,0,0-.4-.65Zm-.15.83a.28.28,0,0,1-.48-.2.27.27,0,0,1,.28-.28.28.28,0,0,1,.2.48ZM21,12a1.49,1.49,0,0,1,0,.21l-1,1H16v-.7h3.7L21,11.25C21,11.5,21,11.75,21,12ZM14.84,8.09l3-3a5.8,5.8,0,0,1,.52.47L15,8.93A2.65,2.65,0,0,0,14.84,8.09ZM5.3,13.75a.82.82,0,0,0-.31,0,.76.76,0,0,0-.28.15.93.93,0,0,0-.18.26.78.78,0,0,0-.07.3.78.78,0,0,0,.07.31.93.93,0,0,0,.18.26.76.76,0,0,0,.28.15.82.82,0,0,0,.31,0,.74.74,0,0,0,.65-.4H8v-.7H6a.76.76,0,0,0-.3-.29A.79.79,0,0,0,5.3,13.75Zm.18.92a.27.27,0,0,1-.19.08l-.1,0a.21.21,0,0,1-.1-.06A.18.18,0,0,1,5,14.58a.2.2,0,0,1,0-.11.43.43,0,0,1,0-.11l.06-.09.09-.06.11,0a.28.28,0,0,1,.2.48Zm11.61,1.76L18.69,18c-.16.17-.33.32-.5.48l-1.38-1.37H15.65v1.54l1,1c-.21.12-.43.22-.65.33L15,19V17.13H14v1.44h-.7V17H15a.92.92,0,0,0,.89-.57ZM12,4.1a.75.75,0,0,0-.53.22.71.71,0,0,0-.22.52.81.81,0,0,0,.12.38.78.78,0,0,0,.29.28V6L12,6a2.2,2.2,0,0,1,.36,0V5.5a.78.78,0,0,0,.29-.28.7.7,0,0,0,.11-.38.79.79,0,0,0-.24-.52A.82.82,0,0,0,12,4.1Zm.23.9a.29.29,0,0,1-.12.1.22.22,0,0,1-.16,0,.24.24,0,0,1-.22-.22.22.22,0,0,1,0-.16.29.29,0,0,1,.1-.12A.3.3,0,0,1,12,4.56l.11,0,.09.06.06.09a.43.43,0,0,1,0,.11A.3.3,0,0,1,12.23,5ZM9,17h.05v1.94L8,20c-.22-.11-.42-.23-.63-.35l1-1V17.52l-.81.82H5.93v.28a3.58,3.58,0,0,1-.29-.26c-.15-.14-.27-.31-.41-.47v-.25h2l1-1a.56.56,0,0,0,0,.08A1,1,0,0,0,9,17ZM4.18,13.21,3,12.05c0-.33,0-.65,0-1l1.44,1.43H8v.7Zm1-4.8a.73.73,0,0,0,.2.35.72.72,0,0,0,1,0,.75.75,0,0,0,0-1,.75.75,0,0,0-.72-.19l-.9-.93c-.14.18-.27.36-.39.55L5.23,8A.71.71,0,0,0,5.22,8.41ZM5.74,8a.29.29,0,0,1,.38,0,.28.28,0,0,1,.08.2.27.27,0,0,1-.08.19.29.29,0,0,1-.38,0,.35.35,0,0,1-.06-.19A.36.36,0,0,1,5.74,8Zm2.35,8.41H4.43l-.16.16c-.12-.21-.24-.41-.34-.63l.23-.23H8V16A1.16,1.16,0,0,0,8.09,16.41ZM14,19.25,15,20.3v.15c-.23.08-.46.17-.7.23V20.6l-.86-.86ZM17.67,8a.68.68,0,0,0-.35.17.75.75,0,0,0,0,1,.75.75,0,0,0,1,0,.79.79,0,0,0,.18-.72l1.15-1.15c-.12-.19-.24-.38-.37-.56L18.05,8A.7.7,0,0,0,17.67,8Zm.46.68a.22.22,0,0,1,0,.11.41.41,0,0,1-.05.09.24.24,0,0,1-.09.06.31.31,0,0,1-.22,0,.24.24,0,0,1-.09-.06.29.29,0,0,1,0-.38.32.32,0,0,1,.19-.07.31.31,0,0,1,.18.07.27.27,0,0,1,.07.08A.38.38,0,0,1,18.13,8.66Zm1.36,7.17.42.42c-.12.21-.23.43-.36.63L19,16.32ZM4.72,11,3.33,9.63c.07-.24.15-.49.24-.73L5,10.32H6.44V9.67h.7V11Zm9.62-6.71h-.7V3.16c.24,0,.47.1.7.16Zm.56,1.51a.53.53,0,0,0,.28.07.72.72,0,0,0,.32-.08.67.67,0,0,0,.26-.21.73.73,0,0,0,.14-.31.74.74,0,0,0,0-.33l.7-.7-.65-.35-.54.54a.74.74,0,0,0-.39,0,.63.63,0,0,0-.33.2.75.75,0,0,0,0,1A.58.58,0,0,0,14.9,5.82ZM15,5a.29.29,0,0,1,.38,0,.24.24,0,0,1,.06.09.31.31,0,0,1,0,.22.24.24,0,0,1-.06.09.29.29,0,0,1-.38,0A.29.29,0,0,1,15,5ZM9.36,3.4l1.46,1.47V6.25a3,3,0,0,0-.7.43V5.15L8.65,3.67A7.46,7.46,0,0,1,9.36,3.4ZM8.12,5.51l-1-1c.2-.13.41-.24.63-.36l.9.9ZM6.19,5.15l3,3A3.36,3.36,0,0,0,9,9L5.68,5.62C5.84,5.46,6,5.3,6.19,5.15Z"
                opacity="0.5"
              />
            </svg>
    `,
  },
  {
    label: "API & Automation",
    color: "rgb(192, 48, 194)",
    svg: `
      <svg viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title>api</title><path d="M26,22a3.86,3.86,0,0,0-2,.57l-3.09-3.1a6,6,0,0,0,0-6.94L24,9.43A3.86,3.86,0,0,0,26,10a4,4,0,1,0-4-4,3.86,3.86,0,0,0,.57,2l-3.1,3.09a6,6,0,0,0-6.94,0L9.43,8A3.86,3.86,0,0,0,10,6a4,4,0,1,0-4,4,3.86,3.86,0,0,0,2-.57l3.09,3.1a6,6,0,0,0,0,6.94L8,22.57A3.86,3.86,0,0,0,6,22a4,4,0,1,0,4,4,3.86,3.86,0,0,0-.57-2l3.1-3.09a6,6,0,0,0,6.94,0L22.57,24A3.86,3.86,0,0,0,22,26a4,4,0,1,0,4-4ZM26,4a2,2,0,1,1-2,2A2,2,0,0,1,26,4ZM4,6A2,2,0,1,1,6,8,2,2,0,0,1,4,6ZM6,28a2,2,0,1,1,2-2A2,2,0,0,1,6,28Zm10-8a4,4,0,1,1,4-4A4,4,0,0,1,16,20Zm10,8a2,2,0,1,1,2-2A2,2,0,0,1,26,28Z" transform="translate(0 0)"/><rect class="cls-1" width="32" height="32"/></svg>
    `,
  },
];

export const Areas = () => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  return (
    <CardContainer
      className="inter-var "
      style={
        {
          "--selectedcolor": selectedCategory?.color || "#454c51",
        } as React.CSSProperties
      }
      onLeave={() => {
        setSelectedCategory(null);
      }}
    >
      <CardBody className=" relative group/car scale-75 sm:scale-[1.5] lg:scale-[1.75] w-full aspect-square rounded-full p-3">
        <CardItem
          className={cn(
            " absolute inset-0 w-full h-full opacity-70 rounded-full border-2 border-[var(--selectedcolor)] border-dashed ",
            {
              "border-solid": selectedCategory !== null,
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
                "opacity-20": selectedCategory !== null,
              }
            )}
          ></div>
        </CardItem>
        <CardItem
          className=" absolute inset-0 w-full h-full opacity-70 rounded-full ring-1 ring-[var(--selectedcolor)] "
          translateZ={-120}
          scale={0.8}
          opacity={[0, 1]}
        />
        <CardItem
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          translateZ={-50}
          scale={0.85}
          opacity={[0, 1]}
        >
          <div className="w-32 bg-red-300">
            <div
              className="absolute inset-0 fill-[var(--selectedcolor)] [&_svg]:w-full"
              dangerouslySetInnerHTML={{
                __html: selectedCategory?.svg || "",
              }}
            ></div>
            <div
              className="absolute inset-0 fill-[var(--selectedcolor)] [&_svg]:w-full blur-md"
              dangerouslySetInnerHTML={{
                __html: selectedCategory?.svg || "",
              }}
            ></div>
          </div>
        </CardItem>
        <div className="absolute w-32 aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ">
          {categories.map((item, index, list) => (
            <CategoryCircle
              total={list.length}
              key={index}
              color={item.color}
              as="div"
              onSelect={() => {
                setSelectedCategory(item);
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
                    "ring-0": selectedCategory !== null,
                  }
                )}
              ></div>
            </CategoryCircle>
          ))}
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default Areas;
