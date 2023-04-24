import React from "react";
import { useSession } from "next-auth/react";
const WorkoutCard = () => {
  const { data } = useSession();
  return (
    <div className="w-full px-2 mt-4 text-white">
      <div className="bg-[#271925] rounded-lg h-96 px-4 pt-5">
        <div className="flex justify-center items-start gap-4">
          <div>
            <span>
              <button className="w-12 h-12 relative shadow-lg shadow-[#893168]/20  flex items-center justify-center  rounded-full bg-[#893168]">
                <p className="pointer-events-none font-bold text-base flex items-center justify-center">
                  {data && data.user.email.slice(0, 1).toUpperCase()}
                </p>
              </button>
            </span>
          </div>
          <div className="flex  gap-1 flex-col">
            <span className=" text-base font-medium">
              {data && data.user.email}
            </span>
            <p className="text-sm font-medium">28.04.2023 17:03</p>
          </div>
          <div className="flex flex-col gap-1 w-full text-base font-medium items-end ">
            <span>Total volume: 3222kg</span>
            <span className="text-sm font-medium">Duration: 1h 24m</span>
          </div>
        </div>
        <div className="mt-10 pt-5 border-t-2 flex flex-col border-gray-300/10">
          <span className="text-base font-medium">Workout summary</span>
          <div className="flex">
            <div className="flex">
              zdjecie
              <div className="flex flex-col bg-[#893168]">
                <span>Title</span>
                <span>Sets</span>
                <span>Reps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
