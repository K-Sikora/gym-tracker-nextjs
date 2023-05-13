import React from "react";
import { MdQueryStats } from "react-icons/md";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileLoader = () => {
  return (
    <div className="md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        <div className=" md:border-2 md:py-4 md:mt-10 rounded-sm border-primary/5">
          <div className="w-full md:px-4 md:grid md:gap-2 md:grid-cols-2 text-white md:rounded-lg md:border-b-2  md:min-h-0 border-primary/20  md:border-none p-4 pb-7 md:p-0">
            <div className="flex items-center gap-4 border-2  border-primary/10 rounded-lg p-3 justify-start">
              <SkeletonTheme
                baseColor="#030c20"
                highlightColor="#005fa7"
              >
                <Skeleton
                  circle
                  width={56}
                  height={56}
                />
              </SkeletonTheme>
              <div className="flex flex-col  md:text-base font-medium">
                <SkeletonTheme
                  baseColor="#030c20"
                  highlightColor="#005fa7"
                >
                  <Skeleton width={140} />
                </SkeletonTheme>
                <SkeletonTheme
                  baseColor="#030c20"
                  highlightColor="#005fa7"
                >
                  <Skeleton width={140} />
                </SkeletonTheme>
              </div>
            </div>
            <div className="border-2  border-primary/10 rounded-lg p-3 gap-4 flex items-center md:text-base font-semibold">
              <MdQueryStats className="text-4xl text-primary" />

              <div className="flex flex-col justify-center ">
                <SkeletonTheme
                  baseColor="#030c20"
                  highlightColor="#005fa7"
                >
                  <Skeleton width={140} />
                </SkeletonTheme>

                <SkeletonTheme
                  baseColor="#030c20"
                  highlightColor="#005fa7"
                >
                  <Skeleton width={180} />
                </SkeletonTheme>
              </div>
            </div>
            <div className="col-span-2 pb-96 items-center justify-center flex  p-3 border-2 border-primary/10">
              <div className="w-full md:w-1/2 flex items-center justify-center gap-2 flex-col ">
                <h3 className="text-2xl font-bold text-center">
                  Your exercises
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoader;
