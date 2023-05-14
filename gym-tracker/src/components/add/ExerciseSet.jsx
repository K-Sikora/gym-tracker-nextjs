import React, { useState } from "react";
const ExerciseSet = (props) => {
  return (
    <div className="grid gap-2 grid-cols-4 rounded-lg  shadow-sm shadow-primary/20 from-[#052651] to-secondary bg-gradient-to-bl px-3 py-2 items-center ">
      <span className=" text-sm font-medium">SET {props.setId}</span>
      <div className=" place-self-center">
        <input
          onChange={(e) => {
            const value = e.target.value;
            const index = props.setId - 1;

            if (index !== -1) {
              props.setReps([
                ...props.reps.slice(0, index),
                { id: props.id, value },
                ...props.reps.slice(index + 1),
              ]);
            } else {
              props.setReps([...props.reps, { id: props.id, value }]);
            }
          }}
          placeholder="12"
          className="w-12 appearance-none rounded-none text-center text-sm placeholder:text-gray-300 pb-1 outline-none bg-transparent border-primary duration-300  border-b-2"
        ></input>
      </div>

      <div className=" place-self-center ">
        <input
          onChange={(e) => {
            const value = e.target.value;
            const index = props.setId - 1;

            if (index !== -1) {
              props.setWeight([
                ...props.weight.slice(0, index),
                { id: props.id, value },
                ...props.weight.slice(index + 1),
              ]);
            } else {
              props.setWeight([...props.weight, { id: props.id, value }]);
            }
          }}
          placeholder="KG"
          className="w-12 appearance-none rounded-none text-center text-sm placeholder:text-gray-300 pb-1 outline-none bg-transparent border-primary duration-300  border-b-2"
        ></input>
      </div>
    </div>
  );
};

export default ExerciseSet;
