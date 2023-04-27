import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { GoSignOut } from "react-icons/go";
import { RiDashboardFill } from "react-icons/ri";
import { MdSportsGymnastics } from "react-icons/md";
import { useRouter } from "next/router";
import { FaCalendarCheck } from "react-icons/fa";

import { BiMenuAltLeft } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { FaCalendarPlus, FaUserAlt } from "react-icons/fa";
import Link from "next/link";
const Navbar = () => {
  const [panelVisible, setpanelVisible] = useState(false);

  const { data, status } = useSession();
  const router = useRouter();
  return (
    <header className="md:h-20 h-16 md:px-8 px-4 text-white flex w-full items-center justify-between bg-dark">
      <div className="max-w-5xl mx-auto w-full  flex gap-6 md:gap-7 items-center justify-start">
        <button
          onBlur={() => {
            setpanelVisible(false);
          }}
          onClick={() => {
            setpanelVisible(!panelVisible);
          }}
          className=" hidden md:flex  w-10 h-10 z-50 relative shadow-lg shadow-primary/20   items-center justify-center  rounded-full bg-primary"
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
                  <FaUserAlt className=" group-hover:text-primary duration-500" />
                  {data.user.email}
                </span>
                <a
                  href="/"
                  className="flex py-1 items-center  group justify-center gap-2"
                >
                  <RiDashboardFill className=" group-hover:text-primary duration-500" />{" "}
                  Dashboard
                </a>
                <a
                  onClick={signOut}
                  className="flex group py-1  items-center justify-center gap-2"
                >
                  <GoSignOut className=" group-hover:text-primary duration-500" />
                  Sign out
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <nav className="hidden md:flex items-center">
          <ul className="flex gap-7 text-base font-medium">
            <Link href="/">
              <li
                className={`flex cursor-pointer justify-center items-center gap-2 hover:border-accent ${
                  router.pathname === "/"
                    ? "border-accent "
                    : "border-transparent"
                } duration-300 text-base border-b-[3px] px-2 py-2`}
              >
                <FaCalendarCheck />
                Workouts
              </li>
            </Link>
            <Link href="/exercises">
              <li
                className={`flex cursor-pointer ${
                  router.pathname === "/exercises"
                    ? "border-accent "
                    : "border-transparent"
                } hover:border-accent  duration-300 justify-center items-center gap-2 text-base border-b-[3px]  px-2 py-2`}
              >
                <MdSportsGymnastics className="text-lg" />
                Exercises
              </li>
            </Link>
            <Link href="/schemas">
              <li
                className={`flex cursor-pointer hover:border-accent duration-300 justify-center items-center gap-2 text-base border-b-[3px] ${
                  router.pathname === "/schemas"
                    ? "border-accent "
                    : "border-transparent"
                } px-2 py-2`}
              >
                <CgGym className="text-lg" />
                Schemas
              </li>
            </Link>
            <Link href="/add">
              <li
                className={`flex cursor-pointer hover:border-accent duration-300 justify-center items-center gap-2 text-base border-b-[3px] ${
                  router.pathname === "/add"
                    ? "border-accent "
                    : "border-transparent"
                } px-2 py-2`}
              >
                <FaCalendarCheck />
                Add
              </li>
            </Link>
            <Link href="/profile">
              <li
                className={`flex cursor-pointer hover:border-accent duration-300 justify-center items-center gap-2 text-base border-b-[3px] ${
                  router.pathname === "/profile"
                    ? "border-accent "
                    : "border-transparent"
                } px-2 py-2`}
              >
                <FaUserAlt />
                Profile
              </li>
            </Link>
          </ul>
        </nav>
        <button className="md:hidden">
          <BiMenuAltLeft className="text-3xl" />
        </button>
        <nav className="flex items-center  md:hidden">
          <ul className="flex items-center gap-5 text-base font-medium">
            <Link
              className="hover:text-accent duration-300"
              href="/"
            >
              <li
                className={`flex cursor-pointer justify-center items-center gap-2 text-base  px-2 py-2`}
              >
                <FaCalendarCheck
                  className={`
                duration-300
              ${router.pathname === "/" ? "text-accent " : ""}
              
              `}
                />
              </li>
            </Link>
            <Link
              className="hover:text-accent duration-300"
              href="/exercises"
            >
              <li
                className="flex cursor-pointer 
                      justify-center items-center gap-2 text-lg px-2 py-2"
              >
                <MdSportsGymnastics
                  className={`
                duration-300
              ${router.pathname === "/exercises" ? "text-accent " : ""}
              
              `}
                />
              </li>
            </Link>
            <Link
              className="hover:text-accent duration-300"
              href="/schemas"
            >
              <li
                className={`flex cursor-pointer    duration-300 justify-center items-center gap-2 text-lg   px-2 py-2`}
              >
                <CgGym
                  className={`
                duration-300
              ${router.pathname === "/schemas" ? "text-accent " : ""}
              
              `}
                />
              </li>
            </Link>
            <Link
              className="hover:text-accent duration-300"
              href="/add"
            >
              <li className="flex cursor-pointer  duration-300 justify-center items-center gap-2 text-base   px-2 py-2">
                <FaCalendarPlus
                  className={`
                  duration-300
                ${router.pathname === "/add" ? "text-accent " : ""}
                
                `}
                />
              </li>
            </Link>
            <Link
              className="hover:text-accent duration-300"
              href="/profile"
            >
              <li className="flex cursor-pointer  duration-300 justify-center items-center gap-2 text-base   px-2 py-2">
                <FaUserAlt
                  className={`
                  duration-300
                ${router.pathname === "/profile" ? "text-accent " : ""}
                
                `}
                />
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
