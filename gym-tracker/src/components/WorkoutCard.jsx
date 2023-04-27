import React from "react";
import { useSession } from "next-auth/react";
import WorkoutCardExercise from "./WorkoutCardExercise";
import { FiChevronDown } from "react-icons/fi";
const WorkoutCard = () => {
  const { data } = useSession();
  return (
    <div className="w-full md:px-4  text-white">
      <div className="bg-[#271925] md:rounded-lg border-b-2  border-primary/20  md:border-none shadow-md shadow-black/10 p-4 py-7 md:p-5">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <button className="md:w-12 h-10 md:h-12 w-10 relative shadow-lg shadow-primary/20  flex items-center justify-center  rounded-full bg-primary">
              <p className="pointer-events-none font-bold text-sm md:text-base flex items-center justify-center">
                {data && data.user.email.slice(0, 1).toUpperCase()}
              </p>
            </button>
            <div className="flex gap-1 flex-col">
              <span className=" text-sm  font-medium">
                {data && data.user.email}
              </span>
              <p className=" text-xs  font-medium">28.04.2023 17:03</p>
            </div>
          </div>

          <div className="flex  flex-col gap-1 text-sm font-medium items-end ">
            <span>Total volume: 3222kg</span>
            <span className="text-xs font-medium">Duration: 1h 24m</span>
          </div>
        </div>
        <div className="mt-2 pt-2 md:border-t-2 gap-4 flex flex-col md:border-gray-300/10">
          <div className="text-sm font-medium flex justify-between">
            <span className="">Workout summary</span>
          </div>
          <div className="flex flex-wrap gap-4 ">
            <WorkoutCardExercise />
            <WorkoutCardExercise />
            <WorkoutCardExercise />
            <WorkoutCardExercise />
            <WorkoutCardExercise />
            <WorkoutCardExercise />
            <div className="w-full flex items-center justify-center">
              <button className="flex flex-col items-center">
                See more
                <FiChevronDown className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;