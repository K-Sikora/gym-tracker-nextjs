import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default Layout;
