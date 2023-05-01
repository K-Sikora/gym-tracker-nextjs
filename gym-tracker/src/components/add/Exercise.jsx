import React, { useState, Fragment, useEffect } from "react";
import ExerciseSet from "./ExerciseSet";
import { Combobox, Transition } from "@headlessui/react";

import { BiCheck, BiChevronUp } from "react-icons/bi";
const exercises = [
  { name: "Bench Press" },
  { name: `Squat` },
  { name: "Deadlift" },
  { name: "Overhead Press" },
  { name: "Barbell Row" },
  { name: "Bent Over Row" },
  { name: "Lateral Raises" },
  { name: "Pull Ups" },
  { name: "Push Ups" },
  { name: "Dips" },
  { name: "Tricep Dips" },
  { name: "Lunges" },
  { name: "Calf Raises" },
  { name: "Leg Press" },
  { name: "Leg Extension" },
  { name: "Leg Curls" },
  { name: "Hamstring Curls" },
  { name: "Sit Ups" },
];
const Exercise = (props) => {
  const [selected, setSelected] = useState(exercises[0]);

  const [query, setQuery] = useState("");
  const filteredExercises =
    query === ""
      ? exercises
      : exercises.filter((exercise) =>
          exercise.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const [currentSets, setcurrentSets] = useState(1);
  useEffect(() => {
    const id = props.exerciseNumber;
    props.setSelectedExercise((prevSelectedExercise) => {
      const exerciseIndex = prevSelectedExercise.findIndex(
        (exercise) => exercise.id === id
      );

      if (exerciseIndex === -1) {
        return [...prevSelectedExercise, { id, selected, sets: currentSets }];
      }

      const updatedExercise = {
        ...prevSelectedExercise[exerciseIndex],
        selected,
        sets: currentSets,
      };
      const updatedSelectedExercise = [...prevSelectedExercise];
      updatedSelectedExercise[exerciseIndex] = updatedExercise;
      return updatedSelectedExercise;
    });
  }, [selected, currentSets]);
  const sets = [];
  for (let i = 0; i < currentSets; i++) {
    sets.push(
      <ExerciseSet
        currentSets={currentSets}
        setcurrentSets={setcurrentSets}
        exerciseId={props.exerciseNumber}
        setId={i + 1}
        key={i}
      />
    );
  }
  const [currentSetsValue, setcurrentSetsValue] = useState();
  return (
    <div
      data-exercise-id={props.exerciseNumber}
      className="flex flex-col rounded-md p-2 py-4 bg-secondary shadow-md shadow-dark/20  "
    >
      <span className="text-base mb-4 font-medium  text-center">
        Exercise {props.exerciseNumber}
      </span>

      <div className="flex flex-col gap-3  rounded-md px-2">
        <Combobox
          value={selected}
          onChange={setSelected}
        >
          <div className="relative mb-4">
            <div className="relative w-full rounded-lg bg-primary cursor-default overflow-hidden  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2  pl-3 pr-10 text-sm leading-5 bg-transparent  text-white font-medium focus:ring-0"
                displayValue={(exercise) => exercise.name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <BiChevronUp
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredExercises.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredExercises.map((exercise) => (
                    <Combobox.Option
                      key={exercise.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-secondary text-white" : "text-gray-900"
                        }`
                      }
                      value={exercise}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {exercise.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-dark"
                              }`}
                            >
                              <BiCheck
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        <div className="flex gap-1 mb-2 justify-center items-center">
          <input
            onChange={(e) => {
              setcurrentSetsValue(e.target.value);
            }}
            placeholder="1"
            className="outline-none text-center focus:border-primary duration-300 w-12 rounded-md text-sm placeholder:text-gray-300 p-1 border-primary/90 border-2 bg-transparent"
          ></input>
          <button
            onClick={() => {
              if (currentSetsValue > 0 && currentSetsValue < 20) {
                setcurrentSets(currentSetsValue);
              }
            }}
            className="bg-primary font-medium rounded-md px-4 py-1 text-sm"
          >
            Update sets
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2 px-3 text-sm font-medium ">
          <span></span>
          <span className="place-self-center">Reps</span>
          <span className="place-self-center">Weight</span>
          <span></span>
        </div>
        {sets}
      </div>
    </div>
  );
};

export default Exercise;
