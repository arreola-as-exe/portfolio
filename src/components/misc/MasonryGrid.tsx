import React from "react";
import { cn } from "@/lib/utils";

const MasonryGrid: React.FC<{
  columns: number;
  className: string;
  children: Iterable<React.ReactNode>;
}> = ({ columns, className, children }) => {
  // console.log("Rerender");
  return (
    <div
      className={cn("grid gap-x-4", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {Array(columns)
        .fill(0)
        .map((_, i) => (
          <div className="flex flex-col gap-y-8" key={i}>
            {Array.from(children)
              .filter((_, j) => j % columns === i)
              .map((Item) => Item)}
          </div>
        ))}
    </div>
  );
};

const MasonryGridMomoized = React.memo(MasonryGrid, (prev, next) => {
  return prev.columns === next.columns && prev.className === next.className;
});

export {
  MasonryGridMomoized as MasonryGrid
}