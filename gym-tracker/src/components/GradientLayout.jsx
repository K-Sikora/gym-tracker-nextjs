import React from "react";

const GradientLayout = ({ children }) => {
  return (
    <div className="min-h-screen  md:px-8 bg-gradient-to-r from-secondary to-dark">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default GradientLayout;
