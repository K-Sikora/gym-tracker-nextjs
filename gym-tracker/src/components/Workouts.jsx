import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import WorkoutCard from "./WorkoutCard";
import Link from "next/link";
const Workouts = (props) => {
  const [noWorkouts, setnoWorkouts] = useState(false);
  return (
    <div className="md:pb-8 ">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="min-h-screen md:border-2 rounded-sm  md:mt-10 border-dark/10"
        >
          {noWorkouts ? (
            <div className="flex items-center justify-center flex-col gap-4">
              <h2 className=" text-2xl pt-10 font-semibold">
                You don't have any workouts
              </h2>
              <Link href="/add">
                <button className="text-xl  duration-1000 flex items-center group hover:text-dark justify-center gap-2 font-medium">
                  <FaPlusCircle className=" text-primary" />
                  <span className=" effect-shine text-secondary hover:text-primary transition-colors duration-1000">
                    Add a workout
                  </span>
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex md:py-4 md:rounded-lg flex-col md:gap-4 md:from-transparent md:bg-transparent  bg-gradient-to-r from-secondary to-dark">
              <WorkoutCard />
              <WorkoutCard />
              <WorkoutCard />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Workouts;
