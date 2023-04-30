import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/Loader";
const profile = (props) => {
  return (
    <div>
      <Navbar />
      <Layout>
        {props.isLoading ? (
          <Loader />
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              profile
            </motion.div>
          </AnimatePresence>
        )}
      </Layout>
    </div>
  );
};

export default profile;
