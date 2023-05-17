import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import Workouts from "./Workouts";
import Layout from "./Layout";
const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div className="w-full">
      <Navbar />
      <Layout>
        <Workouts />
      </Layout>
    </div>
  );
};

export default Dashboard;
