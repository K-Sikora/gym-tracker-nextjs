import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import Layout from "@/components/Layout";
import Workouts from "./Workouts";
const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div className="w-full">
      <Navbar />
      <Layout>
        <div>
          <Workouts />
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
