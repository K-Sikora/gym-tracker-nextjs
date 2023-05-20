import React from "react";
import Lottie from "lottie-react";
import success from "../../public/success";
import { PuffLoader } from "react-spinners";
const AddedSuccesfully = (props) => {
  return (
    <div className="flex flex-col bg-bgblack gap-4 items-center justify-center w-full h-screen ">
      {props.addSuccess ? (
        <>
          <div className="w-64">
            <Lottie
              animationData={success}
              loop={false}
            />
          </div>
        </>
      ) : (
        <>
          <h1 className="text-white text-center text-2xl font-semibold">
            Your workout is being added...
          </h1>
          <PuffLoader color="#755ffa" />
        </>
      )}
    </div>
  );
};

export default AddedSuccesfully;
