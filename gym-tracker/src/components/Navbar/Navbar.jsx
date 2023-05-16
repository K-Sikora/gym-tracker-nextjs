import React, { useState } from "react";
import { MdSportsGymnastics } from "react-icons/md";
import { useRouter } from "next/router";
import { FaCalendarCheck, FaUser, FaDumbbell } from "react-icons/fa";

import { FaCalendarPlus } from "react-icons/fa";
import Link from "next/link";
import UserButton from "./UserButton";
const Navbar = () => {
  const router = useRouter();
  return (
    <header className="md:h-20 h-16 md:px-8 px-4 text-white flex w-full items-center justify-between bg-dark">
      <div className="max-w-5xl mx-auto w-full  flex gap-6 md:gap-7 items-center justify-between">
        <nav className="hidden md:flex items-center">
          <ul className="flex gap-7 text-base font-medium">
            <Link href="/">
              <li
                className={`flex cursor-pointer justify-center items-center gap-2 hover:border-primary ${
                  router.pathname === "/"
                    ? "border-primary "
                    : "border-transparent"
                } duration-300 text-base border-b-[3px] px-2 py-2`}
              >
                <FaCalendarCheck />
                Workouts
              </li>
            </Link>
            <Link href="/add">
              <li
                className={`flex cursor-pointer hover:border-primary duration-300 justify-center items-center gap-2 text-base border-b-[3px] ${
                  router.pathname === "/add"
                    ? "border-primary "
                    : "border-transparent"
                } px-2 py-2`}
              >
                <FaCalendarPlus />
                Add
              </li>
            </Link>
            <Link href="/exercises">
              <li
                className={`flex cursor-pointer hover:border-primary duration-300 justify-center items-center gap-2 text-base border-b-[3px] ${
                  router.pathname === "/exercises"
                    ? "border-primary "
                    : "border-transparent"
                } px-2 py-2`}
              >
                <FaDumbbell />
                Exercises
              </li>
            </Link>
            <Link href="/profile">
              <li
                className={`flex cursor-pointer ${
                  router.pathname === "/profile"
                    ? "border-primary "
                    : "border-transparent"
                } hover:border-primary  duration-300 justify-center items-center gap-2 text-base border-b-[3px]  px-2 py-2`}
              >
                <FaUser />
                Profile
              </li>
            </Link>
          </ul>
        </nav>

        <nav className="flex items-center  md:hidden">
          <ul className="flex items-center gap-5 text-base font-medium">
            <Link
              className="hover:text-primary duration-300"
              href="/"
            >
              <li
                className={`flex cursor-pointer justify-center items-center gap-2 text-base  px-2 py-2`}
              >
                <FaCalendarCheck
                  className={`
                duration-300
              ${router.pathname === "/" ? "text-primary " : ""}
              
              `}
                />
              </li>
            </Link>

            <Link
              className="hover:text-primary duration-300"
              href="/add"
            >
              <li className="flex cursor-pointer  duration-300 justify-center items-center gap-2 text-base   px-2 py-2">
                <FaCalendarPlus
                  className={`
                  duration-300
                  ${router.pathname === "/add" ? "text-primary " : ""}
                  
                  `}
                />
              </li>
            </Link>
            <Link
              className="hover:text-primary duration-300"
              href="/exercises"
            >
              <li className="flex cursor-pointer  duration-300 justify-center items-center gap-2 text-base   px-2 py-2">
                <FaDumbbell
                  className={`
                  duration-300
                  ${router.pathname === "/exercises" ? "text-primary " : ""}
                  
                  `}
                />
              </li>
            </Link>
            <Link
              className="hover:text-primary duration-300"
              href="/profile"
            >
              <li
                className="flex cursor-pointer 
                            justify-center items-center gap-2 text-lg px-2 py-2"
              >
                <FaUser
                  className={`
                      duration-300
                    ${router.pathname === "/profile" ? "text-primary " : ""}
                    
                    `}
                />
              </li>
            </Link>
          </ul>
        </nav>
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
