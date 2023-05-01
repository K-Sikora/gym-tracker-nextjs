import React, { useState } from "react";
const ExerciseSet = (props) => {
  const [repsAmount, setRepsAmount] = useState(0);
  const [weight, setWeight] = useState(0);
  return (
    <div className="grid gap-2 grid-cols-4 rounded-lg bg-primary px-3 py-2 items-center ">
      <span className=" text-sm font-medium">SET {props.setId}</span>
      <div className=" place-self-center">
        <input
          onChange={(e) => {
            setRepsAmount(e.target.value);
          }}
          placeholder="12"
          className="w-12 text-center text-sm placeholder:text-gray-300 pb-1 outline-none bg-transparent border-accent duration-300  border-b-2"
        ></input>
      </div>

      <div className=" place-self-center">
        <input
          onChange={(e) => {
            setWeight(e.target.value);
          }}
          placeholder="KG"
          className="w-12 text-center text-sm placeholder:text-gray-300 pb-1 outline-none bg-transparent border-accent duration-300  border-b-2"
        ></input>
      </div>
    </div>
  );
};

export default ExerciseSet;
