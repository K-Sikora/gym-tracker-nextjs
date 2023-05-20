import React, { useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import Dashboard from "@/components/Dashboard";
const Index = () => {
  const inputRef = useRef(null);
  const router = useRouter();
  const { status, data } = useSession();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [isErrorRegister, setIsErrorRegister] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordRegister2, setPasswordRegister2] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const handleRegister = async () => {
    if (passwordRegister2 === passwordRegister) {
      setLoadingRegister(true);
      try {
        const response = await axios.post("/api/register", {
          emailRegister,
          passwordRegister,
        });
        if (response.status === 201) {
          setLoadingRegister(false);

          setIsErrorRegister(false);
          router.reload();
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setLoadingRegister(false);

          setIsErrorRegister(true);
        } else {
        }
      }
    } else {
      setLoadingRegister(false);
    }
  };

  const handleLogin = async (e) => {
    setLoadingLogin(true);

    const result = await signIn("credentials", {
      username: emailLogin,
      password: passwordLogin,
      redirect: false,
    })
      .then((response) => {
        if (response.ok) {
          //authenticate user

          router.push("/");
        }
        if (response.error === "Invalid Password") {
          setLoadingLogin(false);
          setIsWrongEmail(false);
          setIsWrongPassword(true);
        }
        if (response.error === "Invalid E-mail") {
          setLoadingLogin(false);
          setIsWrongEmail(true);
          setIsWrongPassword(false);
        }
      })
      .catch((error) => {
        // handle errors
      });
  };
  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;

  return (
    <section className="flex min-h-screen w-full items-stretch ">
      {status === "unauthenticated" && (
        <div className="flex min-h-screen w-full cover items-stretch relative">
          <div className="absolute top-0 left-0 w-full h-full bg-black/80"></div>
          <div className="lg:w-1/2 text-white relative hidden lg:block flex-grow">
            <div className="z-50 absolute top-1/2 w-full font-semibold text-center   -translate-y-1/2 text-3xl ">
              <Typewriter
                options={{
                  strings: [
                    "Save your workouts",
                    "Track your progress",
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
                type="button"
                onClick={() => {
                  setRegisterVisible(true);

                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
                class="text-white bg-gradient-to-r from-primary to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-purple-800 shadow-lg shadow-primary/50 font-semibold  rounded-lg text-sm py-2 mt-10 w-52 text-center"
              >
                Join now
              </button>
            </div>
          </div>
          <div className="md:w-1/2 text-white w-full flex items-center justify-center min-h-[800px] flex-grow flex-col">
            <AnimatePresence>
              {!registerVisible && (
                <motion.div
                  className="absolute flex flex-col w-full md:w-auto px-6 md:px-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="./logo.png"
                    className="w-16 mb-4 self-center"
                  ></img>
                  <h2 className="mb-6 text-center font-medium text-3xl">
                    Login
                  </h2>
                  <form
                    action="#"
                    method="POST"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                    className="flex flex-col items-end gap-6 md:w-[440px] w-full justify-center border-b-[1px] border-white/30 pb-8"
                  >
                    <input
                      required
                      onChange={(e) => {
                        setEmailLogin(e.target.value);
                      }}
                      className="px-3 bg-white/95  duration-150 text-black border-[2px] outline-none focus:outline-primary -outline-offset-2 font-medium text-base border-primary py-2 w-full rounded-sm"
                      type="email"
                      placeholder="E-mail"
                    ></input>
                    <input
                      required
                      onChange={(e) => {
                        setPasswordLogin(e.target.value);
                      }}
                      className="px-3 bg-white/95  duration-150 text-black border-[2px] outline-none focus:outline-primary -outline-offset-2 font-medium text-base border-primary py-2 w-full rounded-sm"
                      type="password"
                      placeholder="Password"
                    ></input>
                    {isWrongPassword && (
                      <p className="w-full text-base font-medium text-red-500">
                        Invalid password.
                      </p>
                    )}
                    {isWrongEmail && (
                      <p className="w-full text-base font-medium text-red-500">
                        User not found.
                      </p>
                    )}

                    <button
                      disabled={loadingLogin}
                      type="submit"
                      className={`text-white ${
                        loadingLogin ? "pointer-events-none" : ""
                      } bg-gradient-to-br from-primary to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm h-10 w-40 md:w-1/2 text-center flex items-center justify-center `}
                    >
                      {loadingLogin ? (
                        <ClipLoader
                          size={15}
                          color="#eeeff1"
                        />
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </form>
                  <div className="md:w-[440px] w-full flex items-center justify-between pt-8">
                    <span className="font-normal text-base">
                      Need an account?
                    </span>

                    <button
                      onClick={() => {
                        setRegisterVisible(true);
                        setPasswordRegister("");
                      }}
                      className="relative inline-flex md:w-1/2 items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-primary to-blue-500 group-hover:from-primary hover:text-white text-white focus:ring-2 focus:outline-none "
                    >
                      <span className="relative md:px-4 px-3 py-1.5 md:py-2 md:w-full w-40 h-10 transition-all ease-in duration-75 bg-dark rounded-md group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                        Sign up
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {registerVisible && (
                <motion.div
                  className="absolute w-full flex flex-col md:w-auto px-6 md:px-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="./logo.png"
                    className="w-16 mb-4 self-center"
                  ></img>
                  <h2 className="mb-6 text-center font-medium text-3xl">
                    Register
                  </h2>
                  <form
                    method="POST"
                    action="#"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleRegister();
                    }}
                    className="flex flex-col items-end gap-6 md:w-[440px] w-full justify-center border-b-[1px] border-white/30 pb-8"
                  >
                    <input
                      ref={inputRef}
                      autoFocus
                      required
                      onChange={(e) => {
                        setEmailRegister(e.target.value);
                      }}
                      className="px-3 bg-white/95  duration-150 text-black border-[2px] outline-none focus:outline-primary -outline-offset-2 font-medium text-base border-primary py-2 w-full rounded-sm"
                      type="email"
                      placeholder="E-mail"
                    ></input>
                    <input
                      required
                      pattern="^(?=.*\d)(?=.*[A-Z]).{6,}$"
                      title="The password must contain at least one number, one capital letter and be at least 6 characters long"
                      onChange={(e) => {
                        setPasswordRegister(e.target.value);
                      }}
                      className="px-3 bg-white/95  duration-150 text-black border-[2px] outline-none focus:outline-primary -outline-offset-2 font-medium text-base border-primary py-2 w-full rounded-sm"
                      type="password"
                      placeholder="Password"
                    ></input>
                    <input
                      required
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      onChange={(e) => {
                        setPasswordRegister2(e.target.value);
                      }}
                      className="px-3 bg-white/95  duration-150 text-black border-[2px] outline-none focus:outline-primary -outline-offset-2 font-medium text-base border-primary py-2 w-full rounded-sm"
                      type="password"
                      placeholder="Re-enter password"
                    ></input>
                    {passwordRegister.length > 0 && (
                      <div className="w-full flex gap-2 items-start text-sm flex-col">
                        {passwordRegister.match(lowerCaseLetters) ? (
                          <span className="flex text-green-400 font-medium gap-1 items-center justify-center">
                            <AiOutlineCheck />
                            Lowercase letters
                          </span>
                        ) : (
                          <span className="flex gap-1 text-red-400 font-medium items-center justify-center">
                            <AiOutlineClose />
                            Lowercase letters
                          </span>
                        )}
                        {passwordRegister.match(upperCaseLetters) ? (
                          <span className="flex text-green-400 font-medium gap-1 items-center justify-center">
                            <AiOutlineCheck />
                            Uppercase letters
                          </span>
                        ) : (
                          <span className="flex gap-1 text-red-400 font-medium items-center justify-center">
                            <AiOutlineClose />
                            Uppercase letters
                          </span>
                        )}
                        {passwordRegister.match(numbers) ? (
                          <span className="flex text-green-400 font-medium gap-1 items-center justify-center">
                            <AiOutlineCheck />
                            Numbers
                          </span>
                        ) : (
                          <span className="flex gap-1 text-red-400 font-medium items-center justify-center">
                            <AiOutlineClose />
                            Numbers
                          </span>
                        )}
                        {passwordRegister.length > 6 ? (
                          <span className="flex text-green-400 font-medium gap-1 items-center justify-center">
                            <AiOutlineCheck />
                            6+ characters
                          </span>
                        ) : (
                          <span className="flex gap-1 text-red-400 font-medium items-center justify-center">
                            <AiOutlineClose />
                            6+ characters
                          </span>
                        )}
                        {passwordRegister === passwordRegister2 ? (
                          <span className="flex text-green-400 font-medium gap-1 items-center justify-center">
                            <AiOutlineCheck />
                            Passwords matching
                          </span>
                        ) : (
                          <span className="flex gap-1 text-red-400 font-medium items-center justify-center">
                            <AiOutlineClose />
                            Passwords matching
                          </span>
                        )}
                      </div>
                    )}

                    {isErrorRegister && (
                      <p className="w-full text-sm font-medium text-red-500">
                        This e-mail is taken.
                      </p>
                    )}

                    <div className="w-full items-center justify-end flex ">
                      <button
                        disabled={loadingRegister}
                        type="submit"
                        className={`text-white ${
                          loadingRegister ? "pointer-events-none" : ""
                        } bg-gradient-to-br from-primary to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm h-10 w-40 md:w-1/2 text-center flex items-center justify-center`}
                      >
                        {loadingRegister ? (
                          <ClipLoader
                            size={15}
                            color="#eeeff1"
                          />
                        ) : (
                          "Sign Up"
                        )}
                      </button>
                    </div>
                  </form>
                  <div className="md:w-[440px] w-full flex items-center justify-between pt-8">
                    <span className="font-normal text-base">
                      Have an account?
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setRegisterVisible(false);
                        setPasswordRegister("");
                      }}
                      className="relative inline-flex md:w-1/2 items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-primary to-blue-500 group-hover:from-primary hover:text-white text-white focus:ring-2 focus:outline-none "
                    >
                      <span className="relative md:px-4 px-3 py-1.5 md:py-2 md:w-full w-40 h-10 transition-all ease-in duration-75 bg-dark rounded-md group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                        Sign in
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
      {status === "authenticated" && <Dashboard />}
    </section>
  );
};

export default Index;
