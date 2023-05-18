import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiChevronDown } from "react-icons/fi";
const WorkoutLoader = () => {
  return (
    <div className="w-full text-white">
      <div className=" h-screen md:h-auto bg-primary/20 border-b-2 md:border-none border-primary/30 md:rounded-md  p-4 py-7 md:p-5">
        <span className=" font-semibold text-xl">
          <SkeletonTheme
            baseColor="#030c20"
            highlightColor="#5C95FF"
          >
            <Skeleton />
          </SkeletonTheme>
        </span>
        <div className="flex mt-4 w-full justify-between">
          <div className="flex gap-4 items-center w-full">
            <SkeletonTheme
              baseColor="#030c20"
              highlightColor="#5C95FF"
            >
              <Skeleton
                circle
                width={32}
                height={32}
              />
            </SkeletonTheme>
            <div className="flex  gap-1 w-full flex-col">
              <span className=" text-sm w-full font-medium">
                <SkeletonTheme
                  baseColor="#030c20"
                  highlightColor="#5C95FF"
                >
                  <Skeleton />
                </SkeletonTheme>
              </span>
              <p className=" text-xs w-full font-medium">
                <SkeletonTheme
                  baseColor="#030c20"
                  highlightColor="#5C95FF"
                >
                  <Skeleton />
                </SkeletonTheme>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2  pt-2 md:border-t-2 gap-4 flex flex-col md:border-gray-300/10">
          <div className="text-sm font-medium flex justify-between">
            <span className="">Workout summary</span>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap gap-4 ">
            <div className="flex flex-grow basis-1/4 bg-gradient-to-r from-transparent/60 to-transparent/70 shadow-md shadow-black/40 px-4 py-3 rounded-lg gap-4 ">
              <SkeletonTheme
                baseColor="#030c20"
                highlightColor="#5C95FF"
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
                  highlightColor="#5C95FF"
                >
                  <Skeleton
                    width={100}
                    count={4}
                  />
                </SkeletonTheme>
              </div>
            </div>

            <div className="flex flex-grow basis-1/4 bg-gradient-to-r shadow-sm   px-4 py-3 rounded-lg gap-4">
              <div className="flex flex-col text-xs  font-medium justify-center  "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLoader;
