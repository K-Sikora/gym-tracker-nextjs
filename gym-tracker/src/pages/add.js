import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiPlus } from "react-icons/bi";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Exercise from "@/components/add/Exercise";
import { MdDownloadDone } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddedSuccesfully from "@/components/AddedSuccesfully";
const Add = (props) => {
  const { status, data } = useSession();

  const getWorkoutsInfo = async () => {
    try {
      const id = data.user.name;

      const response = await axios.get(`/api/getworkouts/${id}`);
      return response.data;
    } catch (err) {}
  };
  const { data: workoutsInfo, isFetchedAfterMount } = useQuery({
    queryKey: "workoutsInfo",
    queryFn: getWorkoutsInfo,
    refetchOnWindowFocus: false,
    enabled: !!(status === "authenticated"),
  });
  const getExercises = async () => {
    const results = await axios.get("/api/getexercises");
    return results.data;
  };
  const { data: exercisesToComp } = useQuery({
    queryKey: "exercisesToComp",
    queryFn: getExercises,
    refetchOnWindowFocus: false,
  });
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const router = useRouter();
  let exercises = [];
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [currentExercises, setcurrentExercises] = useState(1);
  for (let i = 0; i < currentExercises; i++) {
    exercises.push(
      <Exercise
        exercises={exercisesToComp}
        selectedExercise={selectedExercise}
        setSelectedExercise={setSelectedExercise}
        key={i}
        exerciseNumber={i + 1}
      />
    );
  }
  if (status === "unauthenticated") {
    router.push("/");
  }

  const [workoutTitle, setworkoutTitle] = useState("");
  useEffect(() => {
    if (workoutsInfo) {
      if (workoutsInfo.length > 0) {
        setworkoutTitle(`Workout #${workoutsInfo.length + 1}`);
      } else {
        setworkoutTitle("Workout #1");
      }
    }
  }, [workoutsInfo]);

  const handleSubmitWorkout = async (e) => {
    e.preventDefault();
    if (workoutTitle.length > 0) {
      const userId = data.user.name;
      const postData = {
        workoutTitle,
        userId,
        selectedExercise,
      };
      let hasInvalidValue = false;

      selectedExercise.forEach((exercise, exerciseIndex) => {
        exercise.sets.forEach((set, index) => {
          if (
            set.reps &&
            set.reps.value > 0 &&
            set.weight &&
            set.weight.value > 0
          ) {
          } else {
            hasInvalidValue = true;
            toast.error(
              `Invalid value in set ${index + 1}, exercise ${
                exerciseIndex + 1
              }`,
              {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          }
        });
      });
      if (!hasInvalidValue) {
        try {
          setloadingSubmit(true);

          const response = await axios.post("/api/addworkout", postData);
          if (response.status === 200) {
            router.push("/");
          }
        } catch (error) {
          setloadingSubmit(false);
          toast.error("Something went wrong, please try again later", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } else {
      toast.error(`Invalid value for workout title`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="md:pb-8 bg-gradient-to-r from-secondary to-dark">
      {status === "authenticated" && (
        <>
          {!loadingSubmit ? (
            <>
              <Navbar />
              <Layout>
                {props.isLoading || !exercisesToComp ? (
                  <Loader />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-screen md:border-2 md:py-4 md:mt-10 rounded-sm border-primary/5"
                  >
                    <div className="w-full md:px-4  text-white">
                      <div className="md:rounded-lg border-b-2 min-h-screen md:min-h-0 border-primary/20  md:border-none p-4 pb-7 md:p-0">
                        <form
                          action="#"
                          method="POST"
                          className="mt-2 pt-2  gap-7 flex flex-col "
                        >
                          <input
                            value={workoutTitle}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              const regex = /^[a-zA-Z0-9\s#]*$/;
                              if (regex.test(newValue)) {
                                setworkoutTitle(newValue);
                              }
                            }}
                            className="bg-transparent caret-white text-white placeholder:text-gray-500 text-lg border-b-2 duration-300 outline-none font-semibold border-gray-400 focus:outline-none focus:border-primary py-1"
                          ></input>
                          {exercises}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setcurrentExercises(currentExercises + 1);
                            }}
                            className="text-base font-medium gap-2 text-white self-center flex justify-center items-center"
                          >
                            Add next exercise
                            <BiPlus className="text-lg" />
                          </button>
                          <button
                            onClick={handleSubmitWorkout}
                            className="bg-primary hidden md:flex gap-2 self-center  items-center justify-center text-white py-2 px-4 rounded-lg"
                          >
                            Submit workout
                            <MdDownloadDone className="text-xl" />
                          </button>
                          <button
                            onClick={handleSubmitWorkout}
                            className="bg-primary shadow-lg shadow-primary/20 flex items-center justify-center fixed md:hidden right-3 bottom-3 gap-2 self-center text-white h-12 w-12 rounded-full"
                          >
                            <MdDownloadDone className="text-2xl" />
                          </button>
                        </form>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Layout>
            </>
          ) : (
            <AddedSuccesfully workoutTitle={workoutTitle} />
          )}
        </>
      )}
      {status === "unauthenticated" && <Loader />}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Add;
