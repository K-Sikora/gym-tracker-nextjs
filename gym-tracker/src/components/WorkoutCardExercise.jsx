import React from "react";
import { motion } from "framer-motion";
const WorkoutCardExercise = (props) => {
  return (
    <div className="flex flex-grow bg-gradient-to-r shadow-sm shadow-primary/60 from-secondary to-dark md:bg-gradient-to-br px-4 py-3 rounded-lg gap-4">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        src="./exercises/barbell-bench-press.jpg"
        className="rounded-full w-14 h-14"
      ></motion.img>

      <div className="flex  flex-col text-xs font-medium justify-center  ">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-sm "
        >
          {props.exercise.name}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {props.exercise.sets.length} sets
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Reps: {props.exercise.sets.map((set) => set.repetitions).join(", ")}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Weight: {props.exercise.sets.map((set) => set.weight).join(", ")}
        </motion.span>
      </div>
    </div>
  );
};

export default WorkoutCardExercise;
