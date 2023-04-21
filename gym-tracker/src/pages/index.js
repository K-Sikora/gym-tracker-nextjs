import React, { useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
const index = () => {
  const [isErrorRegister, setIsErrorRegister] = useState(false);
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const handleRegister = async () => {
    try {
      const response = await axios.post("/api/register", {
        emailRegister,
        passwordRegister,
      });
      if (response.status === 201) {
        setIsErrorRegister(false);
        console.log("created successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setIsErrorRegister(true);
      } else {
        console.error("Error ocurred", error);
      }
    }
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", {
        emailLogin,
        passwordLogin,
      });
      if (response.status === 200) {
        console.log("login successfully");
      }
    } catch (error) {
      console.error("Error ocurred", error);
    }
  };
  return (
    <Layout>
      <div className="bg-gray-800">
        <h3>Log in</h3>
      </div>
      <div className="flex gap-4">
        <input
          onChange={(e) => {
            setEmailLogin(e.target.value);
          }}
          className="px-2 py-1"
          type="email"
          placeholder="Email"
        ></input>
        <input
          onChange={(e) => {
            setPasswordLogin(e.target.value);
          }}
          className="px-2 py-1"
          type="password"
          placeholder="Password"
        ></input>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="bg-gray-800">
        <h3>Sign in</h3>
      </div>
      <div className="flex gap-4">
        <input
          onChange={(e) => {
            setEmailRegister(e.target.value);
          }}
          className="px-2 py-1"
          type="email"
          placeholder="Email"
        ></input>
        <input
          onChange={(e) => {
            setPasswordRegister(e.target.value);
          }}
          className="px-2 py-1"
          type="password"
          placeholder="Password"
        ></input>
        <button onClick={handleRegister}>Register</button>
      </div>
      {isErrorRegister && <p>User already exists, change your email</p>}
    </Layout>
  );
};

export default index;
