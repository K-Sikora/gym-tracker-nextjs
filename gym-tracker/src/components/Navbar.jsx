import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { GoSignOut } from "react-icons/go";
import { RiDashboardFill } from "react-icons/ri";
import { MdSportsGymnastics } from "react-icons/md";
import { useRouter } from "next/router";
import { BiDumbbell } from "react-icons/bi";
import { FaCalendarPlus, FaUserAlt } from "react-icons/fa";
import Link from "next/link";
const Navbar = () => {
  const [panelVisible, setpanelVisible] = useState(false);

  const { data, status } = useSession();
  const router = useRouter();
  return (
    <header className="h-20 px-8 text-white flex w-full items-center justify-between bg-[#2E1C2B]">
      <div className="max-w-5xl mx-auto w-full flex gap-14 items-center justify-start">
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
            {data && data.user.email.slice(0, 1).toUpperCase()}
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
                  href="/"
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
        <nav className="hidden md:block">
          <ul className="flex gap-10 text-base font-medium">
            <Link href="/">
              <li
                className={`flex cursor-pointer justify-center items-center gap-2 hover:border-[#FFF07C] ${
                  router.pathname === "/"
                    ? "border-[#FFF07C] "
                    : "border-transparent"
                } duration-300 text-base border-b-[3px] px-2 py-2`}
              >
                <FaCalendarPlus />
                Workouts
              </li>
            </Link>
            <Link href="/exercises">
              <li
                className={`flex cursor-pointer ${
                  router.pathname === "/exercises"
                    ? "border-[#FFF07C] "
                    : "border-transparent"
                } hover:border-[#FFF07C]  duration-300 justify-center items-center gap-2 text-base border-b-[3px]  px-2 py-2`}
              >
                <MdSportsGymnastics />
                Exercises
              </li>
            </Link>
            <Link href="/schemas">
              <li
                className={`flex cursor-pointer hover:border-[#FFF07C] duration-300 justify-center items-center gap-2 text-base border-b-[3px] ${
                  router.pathname === "/schemas"
                    ? "border-[#FFF07C] "
                    : "border-transparent"
                } px-2 py-2`}
              >
                <BiDumbbell />
                Schemas
              </li>
            </Link>
            <Link href="/profile">
              <li
                className={`flex cursor-pointer hover:border-[#FFF07C] duration-300 justify-center items-center gap-2 text-base border-b-[3px] ${
                  router.pathname === "/profile"
                    ? "border-[#FFF07C] "
                    : "border-transparent"
                } px-2 py-2`}
              >
                <FaUserAlt />
                Profile
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
