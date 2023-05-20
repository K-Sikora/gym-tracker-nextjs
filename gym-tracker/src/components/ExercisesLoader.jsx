import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ExercisesLoader = () => {
  const ulSkeletons = [];
  for (let i = 0; i < 49; i++) {
    ulSkeletons.push(
      <ul
        key={i}
        className="py-2 px-4 rounded-lg text-sm md:text-base font-medium odd:bg-dark/10 place-items-start  even:bg-dark/80 grid grid-cols-4 hover:bg-dark duration-150 gap-1 justify-between"
      >
        <li className="w-1/2">
          <SkeletonTheme
            baseColor="#030c20"
            highlightColor="#755ffa"
          >
            <Skeleton />
          </SkeletonTheme>
        </li>
        <li className="col-span-2 w-1/2">
          <SkeletonTheme
            baseColor="#030c20"
            highlightColor="#755ffa"
          >
            <Skeleton />
          </SkeletonTheme>
        </li>
        <li className="w-1/2">
          <SkeletonTheme
            baseColor="#030c20"
            highlightColor="#755ffa"
          >
            <Skeleton />
          </SkeletonTheme>
        </li>
      </ul>
    );
  }

  return <>{ulSkeletons}</>;
};

export default ExercisesLoader;
