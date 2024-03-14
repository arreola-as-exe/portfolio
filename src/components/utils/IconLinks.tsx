import Link from "next/link";
import React from "react";

const IconLinks: React.FC<{
  icons: {
    url: string;
    icon: React.ElementType;
    color: string;
  }[];
}> = ({ icons }) => {
  return (
    <div className="flex gap-10">
      {icons.map(({ url, icon: Icon, color }, index) => (
        <Link
          key={index}
          target="_blank"
          href={url}
          style={
            {
              "--color": color,
            } as React.CSSProperties
          }
        >
          <Icon className=" w-8 h-8 md:w-12 md:h-12 fill-neutral-100 opacity-70 transition-all hover:fill-[var(--color)] hover:opacity-100" />
        </Link>
      ))}
    </div>
  );
};

export default IconLinks;
