import React from "react";
import { MoonLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <MoonLoader color="#3C91E6" />
    </div>
  );
};

export default Loader;
