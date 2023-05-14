import Link from "next/link";
import React from "react";

const AddedSuccesfully = (props) => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-secondary to-dark gap-4 items-center justify-center w-full h-screen ">
      <h1 className="text-white text-center text-2xl font-semibold">
        Your workout has been added succesfully
      </h1>
      <Link href="/">
        <button className="text-white bg-primary rounded-full font-medium border-2 border-primary py-2 px-10  ">
          Return to dashboard
        </button>
      </Link>
    </div>
  );
};

export default AddedSuccesfully;
