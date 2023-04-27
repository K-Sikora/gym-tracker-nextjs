import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import React from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
const add = () => {
  return (
    <div className="md:pb-8">
      <Navbar />
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="min-h-screen md:border-2 rounded-sm md:py-4 md:mt-10 border-secondary/10"
        >
          <div className="w-full md:px-4  text-white">
            <div className="bg-[#271925] md:rounded-lg border-b-2  border-primary/20  md:border-none shadow-md shadow-black/10 p-4 py-7 md:p-5">
              <div className="flex items-center justify-between pb-4">
                <h2 className="text-lg font-medium">Add new workout</h2>

                <button className="bg-primary px-6 py-1 rounded-md font-medium text-sm">
                  Save as schema
                </button>
              </div>
              <div className="mt-2 pt-2 md:border-t-2 gap-4 flex flex-col md:border-gray-300/10">
                <input
                  placeholder="Workout #1"
                  className="bg-transparent placeholder:text-gray-300 text-base border-b-2 duration-300 outline-none font-medium border-gray-400 focus:outline-none focus:border-accent py-1"
                ></input>
                <div className="flex flex-col">
                  <span>Exercise 1</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Layout>
    </div>
  );
};

export default add;
