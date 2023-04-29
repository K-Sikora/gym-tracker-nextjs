import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiPlus } from "react-icons/bi";

import Exercise from "@/components/add/Exercise";
const add = () => {
  let exercises = [];
  const [currentExercises, setcurrentExercises] = useState(1);
  for (let i = 0; i < currentExercises; i++) {
    exercises.push(
      <Exercise
        key={i}
        exerciseNumber={i + 1}
      />
    );
  }
  return (
    <div className="md:pb-8 ">
      <Navbar />
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="min-h-screen md:border-2 rounded-sm md:py-4 md:mt-10 border-secondary/10"
        >
          <div className="w-full md:px-4  text-white">
            <div className="bg-[#271925] md:rounded-lg border-b-2 min-h-screen md:min-h-0 border-primary/20  md:border-none shadow-md shadow-black/10 p-4 py-7 md:p-5">
              <div className="flex items-center justify-between pb-4">
                <h2 className="text-lg font-medium">Add new workout</h2>
              </div>
              <div className="mt-2 pt-2 md:border-t-2 gap-4 flex flex-col md:border-gray-300/10">
                <input
                  placeholder="Workout #1"
                  className="bg-transparent placeholder:text-gray-300 text-lg border-b-2 duration-300 outline-none font-semibold border-gray-400 focus:outline-none focus:border-accent py-1"
                ></input>
                {exercises}
                <button
                  onClick={() => {
                    setcurrentExercises(currentExercises + 1);
                  }}
                  className="text-base font-medium gap-2 self-center flex justify-center items-center"
                >
                  Add next exercise
                  <BiPlus className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Layout>
    </div>
  );
};

export default add;
