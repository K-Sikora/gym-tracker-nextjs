import React from "react";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
const Set = (props) => {
  return (
    <div
      data-exercise-id={props.exerciseId}
      data-set-id={props.setId}
      className="grid gap-2 grid-cols-4 rounded-lg bg-primary px-3 py-2 items-center "
    >
      <span className=" text-sm font-medium">SET {props.setId}</span>
      <div className=" place-self-center">
        <input
          placeholder="12"
          className="w-12 text-center text-sm placeholder:text-gray-300 pb-1 outline-none bg-transparent border-accent duration-300  border-b-2"
        ></input>
      </div>

      <div className=" place-self-center">
        <input
          placeholder="KG"
          className="w-12 text-center text-sm placeholder:text-gray-300 pb-1 outline-none bg-transparent border-accent duration-300  border-b-2"
        ></input>
      </div>
    </div>
  );
};

export default Set;
