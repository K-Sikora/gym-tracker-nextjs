import React from "react";
import { PuffLoader } from "react-spinners";
const AddedSuccesfully = (props) => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-secondary to-dark gap-4 items-center justify-center w-full h-screen ">
      <h1 className="text-white text-center text-2xl font-semibold">
        Your workout is being added...
      </h1>
      <PuffLoader color="#005fa7" />
    </div>
  );
};

export default AddedSuccesfully;
