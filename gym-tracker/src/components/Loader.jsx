import React from "react";
import { PuffLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <PuffLoader color="#5C95FF" />
    </div>
  );
};

export default Loader;
