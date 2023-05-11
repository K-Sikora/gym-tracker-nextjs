import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import GradientLayout from "@/components/GradientLayout";
import Workouts from "./Workouts";
const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div className="w-full">
      <Navbar />
      <GradientLayout>
        <Workouts />
      </GradientLayout>
    </div>
  );
};

export default Dashboard;
