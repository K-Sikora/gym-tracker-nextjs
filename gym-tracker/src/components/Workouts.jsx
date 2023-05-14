import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import WorkoutCard from "./WorkoutCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";

import Loader from "./Loader";
import WorkoutLoader from "./WorkoutLoader";
const Workouts = (props) => {
  const { status, data } = useSession();

  const getWorkouts = async () => {
    const id = data.user.name;
    const response = await axios.get(`/api/getworkouts/${id}`);
    return response.data;
  };

  const { data: workouts, isLoading } = useQuery({
    queryKey: "workouts",
    queryFn: getWorkouts,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="md:pb-8 ">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="min-h-screen md:border-2   rounded-sm  md:mt-10 border-primary/5"
        >
          {workouts && workouts.length === 0 ? (
            <div className="flex items-center justify-center flex-col gap-4">
              <h2 className=" text-2xl pt-10 text-white font-semibold">
                You don&apos;t have any workouts
              </h2>
              <Link href="/add">
                <button className="text-xl  duration-1000 flex items-center group hover:text-dark justify-center gap-2 font-medium">
                  <FaPlusCircle className=" text-primary" />
                  <span className="text-white effect-shine hover:text-primary transition-colors duration-1000">
                    Add a workout
                  </span>
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex md:py-4 md:rounded-lg flex-col md:gap-4 md:from-transparent md:bg-transparent min-h-screen bg-gradient-to-r from-secondary to-dark">
              {workouts ? (
                workouts.map((workout, index) => (
                  <WorkoutCard
                    key={index}
                    workout={workout}
                  />
                ))
              ) : (
                <>
                  <WorkoutLoader />
                </>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Workouts;
