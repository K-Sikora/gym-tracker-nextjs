import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import GradientLayout from "@/components/GradientLayout";
import axios from "axios";
import { useQuery } from "react-query";
import ProfileLoader from "@/components/ProfileLoader";
import { MdQueryStats } from "react-icons/md";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";

const Profile = (props) => {
  const { status, data } = useSession();
  const getUserInfo = async () => {
    try {
      const id = data.user.name;
      const response = await axios.get(`/api/getuserinfo/${id}`);
      return response.data;
    } catch (err) {}
  };
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/");
  }

  const { data: userInfo } = useQuery({
    queryKey: "userInfo",
    queryFn: getUserInfo,
    refetchOnWindowFocus: false,
    enabled: !!(status === "authenticated"),
  });
  const getWorkoutsInfo = async () => {
    try {
      const id = data.user.name;

      const response = await axios.get(`/api/getworkouts/${id}`);
      return response.data;
    } catch (err) {}
  };
  const { data: workoutsInfo } = useQuery({
    queryKey: "workoutsInfo",
    queryFn: getWorkoutsInfo,
    refetchOnWindowFocus: false,
    enabled: !!(status === "authenticated"),
  });
  function averageVolume(workouts) {
    let volume = 0;

    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        exercise.sets.forEach((set) => {
          volume += set.weight * set.repetitions;
        });
      });
    });
    return volume / workouts.length;
  }

  const getAllExercises = async () => {
    const response = await axios.get("/api/getexercises");
    return response.data;
  };

  const { data: allExercises } = useQuery({
    queryKey: "allExercises",
    queryFn: getAllExercises,
    refetchOnWindowFocus: false,
  });
  const passToGraph = (workouts, allExercises) => {
    if (
      workouts &&
      workouts.length > 0 &&
      allExercises &&
      allExercises.length > 0
    ) {
      let result = [];
      const workoutExercises = [];
      const everyExercise = [];
      workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          workoutExercises.push(exercise.name);
        });
      });

      allExercises.forEach((exercise) => {
        everyExercise.push(exercise.exercise_name);
      });

      workoutExercises.forEach((exercise) => {
        if (everyExercise.includes(exercise)) {
          const existingExercise = result.find(
            (item) => item.name === exercise
          );
          if (existingExercise) {
            existingExercise.count++;
          } else {
            result.push({ name: exercise, count: 1 });
          }
        }
      });
      const array = [];
      const count = [];
      result.forEach((item) => {
        array.push(item.name);
        count.push(item.count);
      });

      return [array, count];
    }
  };

  const resultLabel = passToGraph(workoutsInfo, allExercises);

  ChartJS.register(ArcElement, Tooltip, Legend);
  const graphData = {
    labels: resultLabel && resultLabel.length > 0 ? resultLabel[0] : [],
    datasets: [
      {
        label: "# in workouts",
        data: resultLabel && resultLabel.length > 0 ? resultLabel[1] : [],
        backgroundColor: [
          "rgba(83, 74, 168, 0.6)",
          "rgba(96, 22, 220, 0.6)",
          "rgba(177, 70, 56, 0.6)",
          "rgba(123, 182, 168, 0.6)",
          "rgba(244, 232, 44, 0.6)",
          "rgba(244, 29, 142, 0.6)",
          "rgba(97, 252, 91, 0.6)",

          "rgba(34, 167, 1, 0.6)",
          "rgba(243, 45, 113, 0.6)",
          "rgba(213, 87, 197, 0.6)",
          "rgba(22, 244, 130, 0.6)",
          "rgba(10, 7, 86, 0.6)",
          "rgba(188, 7, 200, 0.6)",
          "rgba(204, 204, 105, 0.6)",
          "rgba(192, 154, 246, 0.6)",
          "rgba(52, 9, 88, 0.6)",
          "rgba(211, 85, 71, 0.6)",
          "rgba(28, 96, 215, 0.6)",
          "rgba(57, 205, 103, 0.6)",
          "rgba(138, 130, 180, 0.6)",
        ],
        borderColor: [
          "rgba(83, 74, 168, 0.7)",
          "rgba(96, 22, 220, 0.7)",
          "rgba(177, 70, 56, 0.7)",
          "rgba(123, 182, 168, 0.7)",
          "rgba(244, 232, 44, 0.7)",
          "rgba(244, 29, 142, 0.7)",
          "rgba(97, 252, 91, 0.7)",
          "rgba(34, 167, 1, 0.7)",
          "rgba(243, 45, 113, 0.7)",
          "rgba(213, 87, 197, 0.7)",
          "rgba(22, 244, 130, 0.7)",
          "rgba(10, 7, 86, 0.7)",
          "rgba(188, 7, 200, 0.7)",
          "rgba(204, 204, 105, 0.7)",
          "rgba(192, 154, 246, 0.7)",
          "rgba(52, 9, 88, 0.7)",
          "rgba(211, 85, 71, 0.7)",
          "rgba(28, 96, 215, 0.7)",
          "rgba(57, 205, 103, 0.7)",
          "rgba(138, 130, 180, 0.7)",
        ],
        borderWidth: 3,
      },
    ],
  };
  return (
    <div>
      <Navbar />
      <GradientLayout>
        {props.isLoading ? (
          <Loader />
        ) : (
          status === "authenticated" && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {userInfo && workoutsInfo && allExercises ? (
                  <div className="max-w-5xl mx-auto flex flex-col gap-4">
                    <div className=" md:border-2 md:py-4 md:mt-10 rounded-sm border-primary/5">
                      <div className="w-full md:px-4 md:grid  md:gap-2 md:grid-cols-2 text-white md:rounded-lg md:border-b-2  md:min-h-0 border-primary/20  md:border-none p-4 pb-7 md:p-0">
                        <div className="flex items-center gap-4 border-2  border-primary/10 rounded-lg p-3 justify-start">
                          <span className="w-12 h-12 md:h-14 md:w-14 relative shadow-lg shadow-primary/10  flex items-center justify-center  rounded-full bg-primary pointer-events-none text-xl">
                            {data && data.user.email.slice(0, 1).toUpperCase()}
                          </span>
                          <div className="flex flex-col text-sm md:text-base font-medium">
                            <p>{data && data.user.email}</p>
                            {userInfo && (
                              <p>
                                Joined: {userInfo[0].date.slice(8, 10)}.
                                {userInfo[0].date.slice(5, 7)}.
                                {userInfo[0].date.slice(0, 4)}{" "}
                                {userInfo[0].date.slice(11, 16)}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="border-2 border-primary/10 gap-4 rounded-lg p-3 flex items-center text-sm md:text-base font-semibold">
                          <MdQueryStats className="w-12 h-12 md:h-14 md:w-14 text-primary" />
                          <div className="flex flex-col justify-center">
                            <p>
                              Finished workouts:{" "}
                              {workoutsInfo && workoutsInfo.length}
                            </p>
                            <p>
                              Average volume:{" "}
                              {workoutsInfo &&
                                averageVolume(workoutsInfo).toFixed(2) + " kg"}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2 items-center justify-center flex  p-3 border-2 border-primary/10">
                          <div className="w-full justify-center items-center sm:w-1/2 flex gap-2 flex-col ">
                            <h3 className="text-2xl font-bold text-center">
                              Your exercises
                            </h3>
                            {workoutsInfo && workoutsInfo.length > 0 ? (
                              <Doughnut data={graphData} />
                            ) : (
                              <Link href="/add">
                                <button className="text-xl  duration-1000 flex items-center group hover:text-dark justify-center gap-2 font-medium">
                                  <FaPlusCircle className="text-primary" />
                                  <span className="text-white effect-shine hover:text-primary transition-colors duration-1000">
                                    Add your first workout
                                  </span>
                                </button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ProfileLoader />
                )}
              </motion.div>
            </AnimatePresence>
          )
        )}
      </GradientLayout>
    </div>
  );
};

export default Profile;
