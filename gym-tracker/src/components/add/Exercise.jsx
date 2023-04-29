import React, { useState } from "react";
import ExerciseSet from "./ExerciseSet";
const Exercise = (props) => {
  const [currentSets, setcurrentSets] = useState(1);

  const sets = [];
  for (let i = 0; i < currentSets; i++) {
    sets.push(
      <ExerciseSet
        currentSets={currentSets}
        setcurrentSets={setcurrentSets}
        exerciseId={props.exerciseNumber}
        setId={i + 1}
        key={i}
      />
    );
  }
  const [currentSetsValue, setcurrentSetsValue] = useState();
  return (
    <div
      data-exercise-id={props.exerciseNumber}
      className="flex flex-col "
    >
      <span className="text-base mb-4 font-medium">
        Exercise {props.exerciseNumber}
      </span>
      <div className="flex gap-1 mb-2 justify-center items-center">
        <input
          onChange={(e) => {
            setcurrentSetsValue(e.target.value);
          }}
          placeholder="1"
          className="  w-12 rounded-md text-sm placeholder:text-gray-300 p-1  border-primary border-2 bg-transparent"
        ></input>
        <button
          onClick={() => {
            setcurrentSets(currentSetsValue);
          }}
          className="bg-primary rounded-md px-2 py-1 text-sm"
        >
          Update sets
        </button>
      </div>

      <div className="flex flex-col gap-3  py-4 bg-secondary/60  rounded-md px-2">
        <select className=" p-2 bg-secondary text-base font-medium">
          <option>Bench Press</option>
          <option>Squat</option>
        </select>
        <div className="grid grid-cols-4 gap-2 mt-2 px-2 text-sm font-medium ">
          <span></span>
          <span className="place-self-center">Reps</span>
          <span className="place-self-center">Weight</span>
          <span></span>
        </div>
        {sets}
      </div>
    </div>
  );
};

export default Exercise;
