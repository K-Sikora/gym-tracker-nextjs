import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiChevronDown } from "react-icons/fi";
const WorkoutLoader = () => {
  return (
    <div className="w-full md:px-4  text-white">
      <div className=" md:bg-gradient-to-tr h-screen md:h-auto from-dark to-secondary md:rounded-lg border-b-2  border-primary/20  md:border-none shadow-md shadow-black/10 p-4 py-7 md:p-5">
        <span className=" font-semibold text-xl">
          <SkeletonTheme
            baseColor="#030c20"
            highlightColor="#005fa7"
          >
            <Skeleton />
          </SkeletonTheme>
        </span>
        <div className="flex mt-4 w-full justify-between">
          <div className="flex gap-4 items-center w-full">
            <SkeletonTheme
              baseColor="#030c20"
              highlightColor="#005fa7"
            >
              <Skeleton
                circle
                width={32}
                height={32}
              />
            </SkeletonTheme>
            <div className="flex gap-1 w-full flex-col">
              <span className=" text-sm w-full font-medium">
                <SkeletonTheme
                  baseColor="#030c20"
                  highlightColor="#005fa7"
                >
                  <Skeleton />
                </SkeletonTheme>
              </span>
              <p className=" text-xs w-full font-medium">
                <SkeletonTheme
                  baseColor="#030c20"
                  highlightColor="#005fa7"
                >
                  <Skeleton />
                </SkeletonTheme>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 pt-2 md:border-t-2 gap-4 flex flex-col md:border-gray-300/10">
          <div className="text-sm font-medium flex justify-between">
            <span className="">Workout summary</span>
          </div>
          <div className="flex flex-wrap gap-4 ">
            <div className="flex flex-grow basis-1/4 bg-gradient-to-r shadow-sm shadow-primary/60 from-secondary to-dark md:bg-gradient-to-br px-4 py-3 rounded-lg gap-4">
              <SkeletonTheme
                baseColor="#030c20"
                highlightColor="#005fa7"
              >
                <Skeleton
                  circle
                  width={60}
                  height={60}
                />
              </SkeletonTheme>

              <div className="flex flex-col text-xs  font-medium justify-center  ">
                <SkeletonTheme
                  baseColor="#030c20"
                  highlightColor="#005fa7"
                >
                  <Skeleton
                    width={100}
                    count={4}
                  />
                </SkeletonTheme>
              </div>
            </div>

            <div className="flex flex-grow basis-1/4 bg-gradient-to-r shadow-sm shadow-primary/60 from-secondary to-dark md:bg-gradient-to-br px-4 py-3 rounded-lg gap-4">
              <SkeletonTheme
                baseColor="#030c20"
                highlightColor="#005fa7"
              >
                <Skeleton
                  circle
                  width={60}
                  height={60}
                />
              </SkeletonTheme>

              <div className="flex flex-col text-xs  font-medium justify-center  ">
                <SkeletonTheme
                  baseColor="#030c20"
                  highlightColor="#005fa7"
                >
                  <Skeleton
                    width={100}
                    count={4}
                  />
                </SkeletonTheme>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLoader;
