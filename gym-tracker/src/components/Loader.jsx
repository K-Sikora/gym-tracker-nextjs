import React from "react";
import { MoonLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <MoonLoader color="#005fa7" />
    </div>
  );
};

export default Loader;
