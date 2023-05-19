import React from "react";
import { PuffLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="w-full h-screen flex bg-bgblack items-center justify-center">
      <PuffLoader color="#755ffa" />
    </div>
  );
};

export default Loader;
