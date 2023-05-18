import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import WorkoutCardExercise from "./WorkoutCardExercise";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";
const WorkoutCard = (props) => {
  function getEmailUsername(email) {
    const username = email.split("@")[0];
    return username;
  }
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }
  const { width } = useWindowDimensions();

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength) + "...";
  }
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
    <div className="w-full text-white">
      <div className=" bg-primary/20 border-b-2 md:border-none border-primary/30 md:rounded-md p-4 py-7 md:p-5">
        <span className=" font-semibold text-xl">{props.workout.name}</span>
        <div className="flex mt-4 justify-between">
          <div className="flex gap-2 sm:gap-4 items-center">
            <span className="h-8 w-8 sm:h-9 sm:w-9 relative shadow-md shadow-primary/10  flex items-center justify-center  rounded-full bg-primary">
              <p className="pointer-events-none font-semibold text-sm md:text-base flex items-center justify-center">
                {data && data.user.email.slice(0, 1).toUpperCase()}
              </p>
            </span>
            <div className="flex gap-1 flex-col">
              <span className=" text-sm  font-medium">
                {data && width < 350
                  ? truncateText(getEmailUsername(data.user.email), 13)
                  : getEmailUsername(data.user.email)}
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
            <span>Volume: {calculateTotalVolume(props.workout)} kg</span>
          </div>
        </div>
        <div className="mt-2 pt-2 md:border-t-2 gap-4 flex flex-col md:border-gray-300/5">
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
                  {showAllExercises ? (
                    <>
                      <FiChevronUp className="text-2xl" />
                      <span>See less</span>
                    </>
                  ) : (
                    <>
                      <FiChevronDown className="text-2xl" />
                      <span>See more</span>
                    </>
                  )}
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
