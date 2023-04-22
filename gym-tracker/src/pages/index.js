import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter();
  const [registerVisible, setRegisterVisible] = useState(false);
  const [isErrorRegister, setIsErrorRegister] = useState(false);
  const [isErrorLogin, setIsErrorLogin] = useState(false);
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
  // try {
  //   const response = await axios.post("/api/login", {
  //     emailLogin,
  //     passwordLogin,
  //   });
  //   if (response.status === 200) {
  //     console.log("login successfully");
  //     setIsErrorLogin(false);
  //   }
  // } catch (error) {
  //   if (error.response && error.response.status === 401) {
  //     setIsErrorLogin(true);
  //   } else {
  //     console.error("Error ocurred", error);
  //   }
  // }
  const handleLogin = async (e) => {
    const result = await signIn("credentials", {
      username: emailLogin,
      password: passwordLogin,
      redirect: false,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          //authenticate user
          console.log("dziala");
          // router.push("/dashboard");
        }
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };
  return (
    <section className="flex h-screen w-full  ">
      <div className="lg:w-1/2  text-white relative hidden lg:block  cover h-full flex-grow">
        <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>
        <div className="z-50 absolute top-1/2 w-full font-semibold text-center   -translate-y-1/2 text-3xl ">
          <Typewriter
            options={{
              strings: [
                "Save your workouts",
                "Monitor your progress",
                "Add your own exercises",
              ],
              autoStart: true,
              loop: true,
              pauseFor: 4000,
            }}
            onInit={(typewriter) => {
              typewriter.start();
            }}
          />
          <button
            onClick={() => {
              setRegisterVisible(true);
            }}
            className="bg-[#8A4FFF] text-white shadow-[#8A4FFF]/30 rounded-full text-base font-semibold shadow-xl py-2 w-52 mt-10 "
          >
            Join now
          </button>
        </div>
      </div>

      <div className="md:w-1/2  w-full flex items-center justify-center h-full flex-grow flex-col ">
        <AnimatePresence>
          {!registerVisible && (
            <motion.div
              className="absolute w-full md:w-auto px-6 md:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-6 text-center font-medium text-3xl">Login</h2>

              <form
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="flex flex-col items-end gap-8 md:w-96 w-full justify-center border-b-[2px] border-gray-300 pb-8"
              >
                <input
                  // required
                  onChange={(e) => {
                    setEmailLogin(e.target.value);
                  }}
                  className="px-3 border-[1px] outline-none focus:outline-[#8A4FFF] -outline-offset-2 font-medium text-base border-[#92817A]/60 py-2 w-full rounded-sm"
                  type="email"
                  placeholder="E-mail"
                ></input>
                <input
                  // required
                  onChange={(e) => {
                    setPasswordLogin(e.target.value);
                  }}
                  className="px-3 border-[1px] outline-none focus:outline-[#8A4FFF] -outline-offset-2 font-medium text-base border-[#92817A]/60  py-2 w-full rounded-sm"
                  type="password"
                  placeholder="Password"
                ></input>
                {isErrorLogin && (
                  <p className="w-full text-base font-medium text-red-500">
                    Invalid password or e-mail address.
                  </p>
                )}

                <div className="w-full items-center justify-between flex ">
                  <button className="font-normal text-base">
                    Forgot password?
                  </button>
                  <input
                    type="submit"
                    value={"Sign in"}
                    className="bg-[#92817A] text-white shadow-[#92817A]/40 rounded-full font-medium shadow-lg py-2 w-40 md:w-1/2 "
                  ></input>
                </div>
              </form>
              <div className="md:w-96 w-full flex items-center justify-between pt-8">
                <button className="font-normal text-base">
                  Need an account?
                </button>
                <button
                  onClick={() => {
                    setRegisterVisible(true);
                  }}
                  className="text-black rounded-full font-medium border-2 border-[#92817A] py-2 w-40 md:w-1/2 "
                >
                  Sign up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {registerVisible && (
            <motion.div
              className="absolute w-full md:w-auto px-6 md:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-6 text-center font-medium text-3xl">
                Register
              </h2>
              <form
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
                className="flex flex-col items-end gap-8 md:w-96 w-full justify-center border-b-[2px] border-gray-300 pb-8"
              >
                <input
                  autoFocus
                  // required
                  onChange={(e) => {
                    setEmailRegister(e.target.value);
                  }}
                  className="px-3 border-[1px] outline-none focus:outline-[#8A4FFF] -outline-offset-2 font-medium text-base border-[#92817A]/60  py-2 w-full rounded-sm"
                  type="email"
                  placeholder="E-mail"
                ></input>
                <input
                  // required
                  onChange={(e) => {
                    setPasswordRegister(e.target.value);
                  }}
                  className="px-3 border-[1px] outline-none focus:outline-[#8A4FFF] -outline-offset-2 font-medium text-base border-[#92817A]/60  py-2 w-full rounded-sm"
                  type="password"
                  placeholder="Password"
                ></input>

                <div className="w-full items-center justify-end flex ">
                  <input
                    type="submit"
                    value={"Sign up"}
                    className="bg-[#92817A]  text-white shadow-[#92817A]/40 rounded-full font-medium shadow-lg py-2 w-40 md:w-1/2 "
                  ></input>
                </div>
              </form>
              <div className="md:w-96 w-full flex items-center justify-between pt-8">
                <button className="font-normal text-base">
                  Have an account?
                </button>
                <button
                  onClick={() => {
                    setRegisterVisible(false);
                  }}
                  className="text-black rounded-full font-medium border-2 border-[#92817A] py-2 w-40 md:w-1/2 "
                >
                  Sign in
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default index;
