import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WorkoutCard from "./WorkoutCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";

import WorkoutLoader from "./WorkoutLoader";
import { PostAddSharp } from "@mui/icons-material";
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
          className="min-h-screen   md:mt-10 "
        >
          {workouts && workouts.length === 0 ? (
            <div className="flex items-center justify-center flex-col gap-4">
              <h2 className=" text-2xl pt-10 text-white font-semibold">
                You don&apos;t have any workouts
              </h2>
              <Link href="/add">
                <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-primary to-blue-500 group-hover:from-primary hover:text-white text-white focus:ring-2 focus:outline-none ">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75  bg-dark rounded-md group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                    <PostAddSharp fontSize="medium" />
                    New workout
                  </span>
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex md:py-4 md:rounded-lg flex-col md:gap-4  min-h-screen md:bg-transparent">
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
