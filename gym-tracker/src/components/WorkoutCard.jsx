import React, { useState } from "react";
import { useSession } from "next-auth/react";
import WorkoutCardExercise from "./WorkoutCardExercise";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
const WorkoutCard = (props) => {
  function calculateTotalVolume(workout) {
    let totalVolume = 0;

    workout.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        totalVolume += set.repetitions * set.weight;
      });
    });

    return totalVolume;
  }
  const [showAllExercises, setShowAllExercises] = useState(false);
  const toggleShowAllExercises = () => {
    setShowAllExercises(!showAllExercises);
  };

  const exercisesToShow = showAllExercises
    ? props.workout.exercises
    : props.workout.exercises.slice(0, 2);
  const { data } = useSession();
  return (
    <div className="w-full md:px-4   text-white">
      <div className=" md:bg-gradient-to-tr from-dark to-secondary md:rounded-lg border-b-2  border-primary/20  md:border-none shadow-md shadow-black/10 p-4 py-7 md:p-5">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className=" font-semibold text-xl"
        >
          {props.workout.name}
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex mt-4 justify-between"
        >
          <div className="flex gap-4 items-center">
            <button className="h-8 w-8 relative shadow-lg shadow-primary/20  flex items-center justify-center  rounded-full bg-primary">
              <p className="pointer-events-none font-bold text-xs md:text-sm flex items-center justify-center">
                {data && data.user.email.slice(0, 1).toUpperCase()}
              </p>
            </button>
            <div className="flex gap-1 flex-col">
              <span className=" text-sm  font-medium">
                {data && data.user.email}
              </span>
              <p className=" text-xs  font-medium">
                {props.workout.date.slice(8, 10)}.
                {props.workout.date.slice(5, 7)}.
                {props.workout.date.slice(0, 4)}{" "}
                {props.workout.date.slice(11, 16)}
              </p>
            </div>
          </div>

          <div className="flex  flex-col gap-1 text-sm font-medium items-end ">
            <span>Total volume: {calculateTotalVolume(props.workout)} kg</span>
          </div>
        </motion.div>
        <div className="mt-2 pt-2 md:border-t-2 gap-4 flex flex-col md:border-gray-300/10">
          <div className="text-sm font-medium flex justify-between">
            <span className="">Workout summary</span>
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
            {exercisesToShow.map((exercise, index) => (
              <WorkoutCardExercise
                key={index}
                exercise={exercise}
              />
            ))}
            {props.workout.exercises.length > 2 && (
              <div className="w-full flex items-center justify-center md:col-span-2">
                <button
                  className="flex flex-col  items-center"
                  onClick={toggleShowAllExercises}
                >
                  {showAllExercises ? "See less" : "See more"}
                  <FiChevronDown className="text-2xl" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
