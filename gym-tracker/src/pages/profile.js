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

const profile = (props) => {
  const { status, data } = useSession();
  const getUserInfo = async () => {
    try {
      const id = data.user.name;
      const response = await axios.get(`/api/getuserinfo/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
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
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
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
    console.log(response.data);
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
      const result = [];
    }
  };
  passToGraph(workoutsInfo, allExercises);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const graphData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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
                <div className="  md:px-8">
                  <div className="max-w-5xl mx-auto flex flex-col gap-4">
                    <div className=" md:border-2 md:py-4 md:mt-10 rounded-sm border-primary/5">
                      <div className="w-full md:px-4 grid grid-cols-1 md:gap-2 md:grid-cols-2 text-white md:rounded-lg border-b-2  md:min-h-0 border-primary/20  md:border-none p-4 pb-7 md:p-0">
                        <div className="flex items-center gap-4 border-2  border-primary/10 rounded-lg p-3 justify-start">
                          <span className="h-14 w-14 relative shadow-lg shadow-primary/10  flex items-center justify-center  rounded-full bg-primary pointer-events-none text-xl">
                            {data && data.user.email.slice(0, 1).toUpperCase()}
                          </span>
                          <div className="flex flex-col  md:text-base font-medium">
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
                        <div className="border-2  border-primary/10 rounded-lg p-3 flex flex-col justify-center md:text-base font-semibold">
                          <p>
                            Finished workouts:{" "}
                            {workoutsInfo && workoutsInfo.length}
                          </p>
                          <p>
                            Average volume:{" "}
                            {workoutsInfo &&
                              averageVolume(workoutsInfo) + " kg"}
                          </p>
                        </div>
                        <div className="col-span-2 p-3 border-2 border-primary/10">
                          <Doughnut data={graphData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )
        )}
      </GradientLayout>
    </div>
  );
};

export default profile;
