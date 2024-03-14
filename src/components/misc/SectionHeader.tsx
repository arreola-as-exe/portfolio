import React from "react";

const SectionHeader: React.FC<{
  title: string;
  description?: string;
}> = ({ title }) => {
  return (
    <div className=" mb-40 ">
      <h2 className=" text-5xl lg:text-6xl font-semibold text-center">
        {"<"}
        <span className="bg-clip-text bg-gradient-to-r text-transparent from-blue-400 to-blue-200">{title}</span>
        {"/>"}
      </h2>
    </div>
  );
};

export default SectionHeader;
