import GradientLayout from "@/components/GradientLayout";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar/Navbar";
import axios from "axios";
import React, { useState } from "react";
import AddToPhotosSharpIcon from "@mui/icons-material/AddToPhotosSharp";
import AddExercisePopup from "@/components/AddExercisePopup";
import { useQuery } from "react-query";

const Exercises = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const getStandardExercises = async () => {
    try {
      const response = await axios.get("/api/getexercises");
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: standardExercises, isLoading: loadingStandardExercises } =
    useQuery({
      queryKey: "standardExercises",
      queryFn: getStandardExercises,
      refetchOnWindowFocus: false,
    });

  return (
    <div>
      <Navbar />
      <GradientLayout>
        {props.isLading || loadingStandardExercises ? (
          <Loader />
        ) : (
          <div className="max-w-5xl mx-auto flex flex-col w-full gap-4">
            <div className=" md:border-2 md:py-4 w-full md:mt-10 rounded-sm border-primary/5">
              <div className="w-full md:px-4 flex flex-col  gap-3 text-white md:rounded-lg md:border-b-2  md:min-h-0 border-primary/20  md:border-none p-4 pb-7 md:p-0">
                <div className="border-2 rounded-lg border-primary/10 flex justify-between p-3 items-center">
                  <p className="text-lg md:text-xl font-semibold">
                    Available exercises
                  </p>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-primary to-blue-500 group-hover:from-primary hover:text-white text-white focus:ring-2 focus:outline-none "
                  >
                    <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-dark rounded-md group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                      <AddToPhotosSharpIcon fontSize="small" />
                      New exercise
                    </span>
                  </button>
                </div>
                <div className="p-3 flex flex-col gap-2 rounded-t-lg border-2 border-primary/10 rounded-b-lg  ">
                  <ul className="grid text-base md:text-xl gap-1 font-semibold grid-cols-4 place-items-start  py-2 px-4  justify-between">
                    <li>ID</li>
                    <li className="col-span-2">Name</li>
                    <li>Muscle</li>
                  </ul>
                  {standardExercises &&
                    standardExercises.map((exercise, index) => (
                      <ul
                        key={index}
                        className="py-2 px-4 rounded-lg text-sm md:text-base font-medium odd:bg-dark/10 place-items-start  even:bg-dark/80 grid grid-cols-4 hover:bg-dark duration-150 gap-1 justify-between"
                      >
                        <li>{index + 1}</li>
                        <li className="col-span-2">{exercise.exercise_name}</li>
                        <li>{exercise.muscle_group}</li>
                      </ul>
                    ))}
                </div>
              </div>
            </div>
            {isOpen && (
              <AddExercisePopup
                standardExercises={standardExercises}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
        )}
      </GradientLayout>
    </div>
  );
};

export default Exercises;