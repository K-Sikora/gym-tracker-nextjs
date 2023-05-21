import React, { useState } from "react";
import InputMask from "react-input-mask";
const ExerciseSet = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    if (numericValue.length <= 2) {
      setValue(numericValue);

      const index = props.setId - 1;
      if (index !== -1) {
        props.setReps([
          ...props.reps.slice(0, index),
          { id: props.id, value: numericValue },
          ...props.reps.slice(index + 1),
        ]);
      } else {
        props.setReps([...props.reps, { id: props.id, value: numericValue }]);
      }
    }
  };
  const [weight, setWeight] = useState("");

  const handleWeightChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    if (numericValue.length <= 3) {
      setWeight(numericValue);

      const index = props.setId - 1;
      if (index !== -1) {
        props.setWeight([
          ...props.weight.slice(0, index),
          { id: props.id, value: numericValue },
          ...props.weight.slice(index + 1),
        ]);
      } else {
        props.setWeight([
          ...props.weight,
          { id: props.id, value: numericValue },
        ]);
      }
    }
  };
  return (
    <div className="grid gap-2 grid-cols-4 rounded-lg  shadow-sm shadow-primary/20 from-[#052651] to-secondary bg-gradient-to-bl px-3 py-2 items-center ">
      <span className=" text-sm font-medium">SET {props.setId}</span>
      <div className=" place-self-center">
        <InputMask
          maskChar=""
          mask="99"
          value={value}
          onChange={handleChange}
          placeholder="12"
          className="w-12 appearance-none rounded-none text-center text-sm placeholder:text-gray-400 placeholder:font-normal font-semibold pb-1 outline-none bg-transparent 
          border-gray-300
focus:border-primary
          
          duration-300 border-b-2"
        />
      </div>

      <div className=" place-self-center ">
        <InputMask
          maskChar=""
          mask="999"
          value={weight}
          onChange={handleWeightChange}
          placeholder="KG"
          className="w-12 appearance-none rounded-none text-center text-sm placeholder:text-gray-400 placeholder:font-normal font-semibold pb-1 outline-none bg-transparent border-gray-300
          focus:border-primary duration-300 border-b-2"
        />
      </div>
    </div>
  );
};

export default ExerciseSet;
