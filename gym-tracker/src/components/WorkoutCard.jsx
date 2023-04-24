import React from "react";
import { useSession } from "next-auth/react";
import WorkoutCardExercise from "./WorkoutCardExercise";
const WorkoutCard = () => {
  const { data } = useSession();
  return (
    <div className="w-full px-4 mt-4  text-white">
      <div className="bg-[#271925] rounded-lg  p-5">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <button className="w-12 h-12 relative shadow-lg shadow-primary/20  flex items-center justify-center  rounded-full bg-primary">
              <p className="pointer-events-none font-bold text-base flex items-center justify-center">
                {data && data.user.email.slice(0, 1).toUpperCase()}
              </p>
            </button>
            <div className="flex gap-1 flex-col">
              <span className=" text-base font-medium">
                {data && data.user.email}
              </span>
              <p className="text-sm font-medium">28.04.2023 17:03</p>
            </div>
          </div>

          <div className="flex  flex-col gap-1  text-base font-medium items-end ">
            <span>Total volume: 3222kg</span>
            <span className="text-sm font-medium">Duration: 1h 24m</span>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t-2 gap-4 flex flex-col border-gray-300/10">
          <div className="text-base font-medium flex justify-between">
            <span className="">Workout summary</span>
            <span>See details</span>
          </div>
          <div className="flex flex-wrap gap-4 ">
            <WorkoutCardExercise />
            <WorkoutCardExercise />
            <WorkoutCardExercise />
            <WorkoutCardExercise />
            <WorkoutCardExercise />
            <WorkoutCardExercise />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
