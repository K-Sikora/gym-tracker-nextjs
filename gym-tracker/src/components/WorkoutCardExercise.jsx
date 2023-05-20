import React from "react";
import Lottie from "lottie-react";
import workout from "../../public/workout.json";
const WorkoutCardExercise = (props) => {
  return (
    <div className="flex items-center bg-gradient-to-r from-primary/20 to-primary/30 px-4 py-3 rounded-lg gap-4">
      <div className="rounded-full bg-gradient-to-bl from-gray-50 to-white  w-14 h-14 flex items-center justify-center">
        <Lottie
          animationData={workout}
          loop={true}
        />
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
