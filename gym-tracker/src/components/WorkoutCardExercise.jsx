import React from "react";
import { motion } from "framer-motion";
const WorkoutCardExercise = (props) => {
  return (
    <div className="flex flex-grow   bg-gradient-to-r from-transparent/20 to-transparent/30 shadow-md shadow-black/40 px-4 py-3 rounded-lg gap-4">
      <div className="rounded-full bg-gradient-to-bl from-gray-50 to-white  w-14 h-14 flex items-center justify-center">
        <img
          src="./exercise.png"
          className=" w-10 h-10 "
        ></img>
      </div>

      <div className="flex  flex-col text-xs font-medium justify-center  ">
        <span className="text-sm ">{props.exercise.name}</span>
        <span>{props.exercise.sets.length} sets</span>
        <span>
          Reps: {props.exercise.sets.map((set) => set.repetitions).join(", ")}
        </span>
        <span>
          Weight: {props.exercise.sets.map((set) => set.weight).join(", ")}
        </span>
      </div>
    </div>
  );
};

export default WorkoutCardExercise;
