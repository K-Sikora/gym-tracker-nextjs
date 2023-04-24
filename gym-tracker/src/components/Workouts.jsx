import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import WorkoutCard from "./WorkoutCard";
const Workouts = (props) => {
  const [noWorkouts, setnoWorkouts] = useState(false);
  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="min-h-screen border-4 rounded-xl mt-10 border=[#4A1942]"
        >
          {noWorkouts ? (
            <div className="flex items-center justify-center flex-col gap-4">
              <h2 className=" text-2xl pt-10 font-semibold">
                You don't have any workouts
              </h2>
              <button className="text-xl flex items-center group text-[#4A1942] justify-center gap-2 font-medium">
                <FaPlusCircle className=" group-hover:scale-125 " />
                Add a workout
              </button>
            </div>
          ) : (
            <div>
              <WorkoutCard />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Workouts;
