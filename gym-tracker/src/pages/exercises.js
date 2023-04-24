import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoonLoader } from "react-spinners";

const exercises = (props) => {
  return (
    <div>
      <Navbar />
      <Layout>
        {props.isLoading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <MoonLoader color="#893168" />
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              exercises
            </motion.div>
          </AnimatePresence>
        )}
      </Layout>
    </div>
  );
};

export default exercises;
