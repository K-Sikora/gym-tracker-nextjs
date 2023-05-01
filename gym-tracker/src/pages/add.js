import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar/Navbar";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiPlus } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Exercise from "@/components/add/Exercise";
import { MdDownloadDone } from "react-icons/md";
const add = (props) => {
  const { status, data } = useSession();
  const router = useRouter();
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
  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div className="md:pb-8 ">
      {status === "authenticated" && (
        <>
          <Navbar />
          <Layout>
            {props.isLoading ? (
              <Loader />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="min-h-screen md:border-2 md:py-4 md:mt-10 rounded-sm border-dark/10"
              >
                <div className="w-full md:px-4  text-white">
                  <div className="md:rounded-lg border-b-2 min-h-screen md:min-h-0 border-primary/20  md:border-none p-4 pb-7 md:p-0">
                    <div className="mt-2 pt-2  gap-7 flex flex-col ">
                      <input
                        placeholder="Workout #1"
                        className="bg-transparent caret-black placeholder:text-gray-500 text-lg border-b-2 duration-300 outline-none font-semibold border-gray-400 focus:outline-none focus:border-primary py-1"
                      ></input>
                      {exercises}
                      <button
                        onClick={() => {
                          setcurrentExercises(currentExercises + 1);
                        }}
                        className="text-base font-medium gap-2 text-black self-center flex justify-center items-center"
                      >
                        Add next exercise
                        <BiPlus className="text-lg" />
                      </button>
                      <button className="bg-primary hidden md:flex gap-2 self-center  items-center justify-center text-white py-2 px-4 rounded-lg">
                        Submit workout
                        <MdDownloadDone className="text-xl" />
                      </button>
                      <button className="bg-primary shadow-lg shadow-accent/20 flex items-center justify-center fixed md:hidden right-3 bottom-3 gap-2 self-center text-white h-12 w-12 rounded-full">
                        <MdDownloadDone className="text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </Layout>
        </>
      )}
      {status === "unauthenticated" && <Loader />}
    </div>
  );
};

export default add;
