import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaUserAlt } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { RiDashboardFill } from "react-icons/ri";

const Navbar = () => {
  const [panelVisible, setpanelVisible] = useState(false);

  const { data, status } = useSession();
  return (
    <header className="h-20 text-white flex w-full items-center justify-between bg-[#2E1C2B]">
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <button
          onBlur={() => {
            setpanelVisible(false);
          }}
          onClick={() => {
            setpanelVisible(!panelVisible);
          }}
          className="w-12 h-12  relative shadow-lg shadow-[#893168]/20  flex items-center justify-center  rounded-full bg-[#893168]"
        >
          <p className="pointer-events-none font-bold text-base flex items-center justify-center">
            {data.user.email.slice(0, 1).toUpperCase()}
          </p>

          <AnimatePresence>
            {panelVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute -bottom-28 py-1  text-base rounded-md items-start font-medium  left-0 flex flex-col bg-black px-3 "
              >
                <span className="flex group  items-center py-1 justify-center gap-2">
                  <FaUserAlt className=" group-hover:text-[#893168] duration-500" />
                  {data.user.email}
                </span>
                <a
                  href="/dashboard"
                  className="flex py-1 items-center  group justify-center gap-2"
                >
                  <RiDashboardFill className=" group-hover:text-[#893168] duration-500" />{" "}
                  Dashboard
                </a>
                <a
                  onClick={signOut}
                  className="flex group py-1  items-center justify-center gap-2"
                >
                  <GoSignOut className=" group-hover:text-[#893168] duration-500" />
                  Sign out
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <div>s</div>
      </div>
    </header>
  );
};

export default Navbar;
