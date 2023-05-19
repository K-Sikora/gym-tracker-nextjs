import React from "react";
import { useRouter } from "next/router";
import { FaCalendarCheck, FaUser, FaDumbbell } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaCalendarPlus } from "react-icons/fa";
import Link from "next/link";
import UserButton from "./UserButton";
const Navbar = () => {
  const router = useRouter();
  return (
    <header className="md:h-20 h-16 md:px-8 px-4 text-white flex w-full items-center  justify-between bg-[#030918]">
      <div className="max-w-5xl mx-auto w-full  flex gap-6 md:gap-7 items-center justify-between">
        <nav className="hidden md:flex items-center">
          <ul className="flex gap-7 text-base font-medium">
            <Link href="/">
              <motion.li
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`flex cursor-pointer justify-center items-center gap-2 hover:border-primary ${
                  router.pathname === "/"
                    ? "border-primary "
                    : "border-transparent"
                } duration-300 transition-[border] text-base border-b-[3px] px-2 py-2`}
              >
                <FaCalendarCheck />
                Workouts
              </motion.li>
            </Link>
            <Link href="/add">
              <motion.li
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={`flex cursor-pointer hover:border-primary duration-300 transition-[border] justify-center items-center gap-2 text-base border-b-[3px] ${
                  router.pathname === "/add"
                    ? "border-primary "
                    : "border-transparent"
                } px-2 py-2`}
              >
                <FaCalendarPlus />
                Add
              </motion.li>
            </Link>
            <Link href="/exercises">
              <motion.li
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`flex cursor-pointer hover:border-primary duration-300 transition-[border] justify-center items-center gap-2 text-base border-b-[3px] ${
                  router.pathname === "/exercises"
                    ? "border-primary "
                    : "border-transparent"
                } px-2 py-2`}
              >
                <FaDumbbell />
                Exercises
              </motion.li>
            </Link>
            <Link href="/profile">
              <motion.li
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className={`flex cursor-pointer ${
                  router.pathname === "/profile"
                    ? "border-primary "
                    : "border-transparent"
                } hover:border-primary  duration-300 transition-[border] justify-center items-center gap-2 text-base border-b-[3px]  px-2 py-2`}
              >
                <FaUser />
                Profile
              </motion.li>
            </Link>
          </ul>
        </nav>

        <nav className="flex items-center  md:hidden">
          <ul className="flex items-center gap-5 text-base font-medium">
            <Link
              className="hover:text-primary duration-300 transition-[border]"
              href="/"
            >
              <motion.li
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`flex cursor-pointer justify-center items-center gap-2 text-base  px-2 py-2`}
              >
                <FaCalendarCheck
                  className={`
                duration-300 transition-[color]
              ${router.pathname === "/" ? "text-primary " : ""}
              
              `}
                />
              </motion.li>
            </Link>

            <Link
              className="hover:text-primary duration-300 transition-[color]"
              href="/add"
            >
              <motion.li
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex cursor-pointer  duration-300 transition-[color] justify-center items-center gap-2 text-base   px-2 py-2"
              >
                <FaCalendarPlus
                  className={`
                  duration-300 transition-[color]
                  ${router.pathname === "/add" ? "text-primary " : ""}
                  
                  `}
                />
              </motion.li>
            </Link>
            <Link
              className="hover:text-primary duration-300 transition-[color]"
              href="/exercises"
            >
              <motion.li
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex cursor-pointer  duration-300 transition-[border] justify-center items-center gap-2 text-base   px-2 py-2"
              >
                <FaDumbbell
                  className={`
                  duration-300 transition-[border]
                  ${router.pathname === "/exercises" ? "text-primary " : ""}
                  
                  `}
                />
              </motion.li>
            </Link>
            <Link
              className="hover:text-primary duration-300 transition-[border]"
              href="/profile"
            >
              <motion.li
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex cursor-pointer 
                            justify-center items-center gap-2 text-lg px-2 py-2"
              >
                <FaUser
                  className={`
                      duration-300 transition-[border]
                    ${router.pathname === "/profile" ? "text-primary " : ""}
                    
                    `}
                />
              </motion.li>
            </Link>
          </ul>
        </nav>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <UserButton />
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
