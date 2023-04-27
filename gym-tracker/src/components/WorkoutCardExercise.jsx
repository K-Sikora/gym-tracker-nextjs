import React from "react";
const WorkoutCardExercise = () => {
  return (
    <div className="flex flex-grow bg-secondary  px-4 py-3 rounded-lg gap-4">
      <img
        src="./exercises/barbell-bench-press.jpg"
        className="rounded-full w-14 h-14"
      ></img>
      <div className="flex flex-col text-xs font-medium justify-center  ">
        <span className="text-sm">Barbell bench press</span>
        <span>5 Sets</span>
        <span>Reps: 12, 12, 12, 12, 12</span>
      </div>
    </div>
  );
};

export default WorkoutCardExercise;
