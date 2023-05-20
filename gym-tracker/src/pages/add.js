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
  const [addSuccess, setAddSuccess] = useState(false);
  const { status, data } = useSession();
  const getUserExercises = async () => {
    try {
      const id = data.user.name;

      const response = await axios.get(`/api/getuserexercises/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data: userExercises } = useQuery({
    queryKey: "userExercises",
    queryFn: getUserExercises,
    enabled: !!(status === "authenticated"),
    refetchOnWindowFocus: false,
  });
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
        userExercises={userExercises}
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
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
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
            setAddSuccess(true);
            setTimeout(() => {
              router.push("/");
            }, 2500);
          }
        } catch (error) {
          setloadingSubmit(false);
          toast.error("Something went wrong, please try again later", {
            position: "bottom-left",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } else {
      toast.error(`Invalid workout title`, {
        position: "bottom-left",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : status === "unauthenticated" ? (
        ""
      ) : (
        <>
          <div className="md:pb-8 bg-bgblack">
            {status === "authenticated" && (
              <>
                {!loadingSubmit ? (
                  <>
                    <Navbar />
                    <Layout>
                      {props.isLoading || !exercisesToComp || !userExercises ? (
                        <Loader />
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="min-h-screen  md:py-4 md:mt-4 rounded-sm "
                        >
                          <div className="w-full text-white">
                            <div className="md:rounded-lg border-b-2 min-h-screen md:min-h-0 border-primary/20 md:border-none  pb-7 md:p-0">
                              <form
                                action="#"
                                method="POST"
                                className="mt-4 md:mt-0 gap-7 flex flex-col "
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
                                  className="bg-transparent mx-4 md:mx-0 caret-white text-white placeholder:text-gray-500 text-lg border-b-2 duration-300 outline-none font-semibold border-gray-400 focus:outline-none focus:border-primary py-1"
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
                                  className="relative md:inline-flex  p-0.5  overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-primary to-blue-500 group-hover:from-primary hover:text-white text-white focus:ring-2 focus:outline-none bg-primary hidden  gap-2 self-center  items-center justify-center  "
                                >
                                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-dark rounded-md group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                                    Submit workout
                                    <MdDownloadDone className="text-xl" />
                                  </span>
                                </button>
                                <button
                                  onClick={handleSubmitWorkout}
                                  className="bg-gradient-to-br shadow-md shadow-primary/20 flex items-center justify-center fixed md:hidden right-4 bottom-4 gap-2 self-center text-white group group-hover:from-primary from-primary to-blue-500 h-16 w-16 rounded-full"
                                >
                                  <span className="relative p-4 transition-all ease-in duration-75 bg-dark rounded-full group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                                    <MdDownloadDone className="text-2xl" />
                                  </span>
                                </button>
                              </form>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </Layout>
                  </>
                ) : (
                  <AddedSuccesfully
                    addSuccess={addSuccess}
                    workoutTitle={workoutTitle}
                  />
                )}
              </>
            )}
            {status === "unauthenticated" && <Loader />}
            <ToastContainer
              position="bottom-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Add;
