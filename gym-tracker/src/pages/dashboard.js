import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
const dashboard = () => {
  const { data: session } = useSession({
    required: true,
  });
  if (!session) {
    return <></>;
  }
  console.log(session);
  return (
    <>
      <Navbar />
      <Layout>
        <div>CONTENT</div>
      </Layout>
    </>
  );
};

export default dashboard;
