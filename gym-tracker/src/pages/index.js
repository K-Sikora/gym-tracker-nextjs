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
    setLoadingRegister(true);
    if (passwordRegister2 === passwordRegister) {
      try {
        const response = await axios.post("/api/register", {
          emailRegister,
          passwordRegister,
        });
        if (response.status === 201) {
          setLoadingRegister(false);

          setIsErrorRegister(false);
          console.log("created successfully");
          router.reload();
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setLoadingRegister(false);

          setIsErrorRegister(true);
        } else {
          console.error("Error ocurred", error);
        }
      }
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
        console.log(response);
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
        console.error(error);
      });
  };
  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;

  return (
    <section className="flex min-h-screen w-full items-stretch ">
      {status === "unauthenticated" && (
        <div className="lg:w-1/2 text-white relative hidden lg:block cover  flex-grow">
          <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>
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
              onClick={() => {
                setRegisterVisible(true);

                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              className="bg-primary text-white shadow-primary/30 rounded-full text-base font-semibold shadow-lg py-2 mt-10 w-52  "
            >
              Join now
            </button>
          </div>
        </div>
      )}
      {status === "authenticated" && <Dashboard />}

      {status === "unauthenticated" && (
        <div className="md:w-1/2 bg-light w-full flex items-center justify-center min-h-[800px] flex-grow flex-col">
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
                <h2 className="mb-6 text-center font-medium text-3xl">Login</h2>
                <form
                  action="#"
                  method="POST"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                  className="flex flex-col items-end gap-6 md:w-96 w-full justify-center border-b-[2px] border-gray-300 pb-8"
                >
                  <input
                    required
                    onChange={(e) => {
                      setEmailLogin(e.target.value);
                    }}
                    className="px-3 bg-gray-50 text-black border-[1px] outline-none focus:outline-primary -outline-offset-2 font-medium text-base border-primary/60 py-2 w-full rounded-sm"
                    type="email"
                    placeholder="E-mail"
                  ></input>
                  <input
                    required
                    onChange={(e) => {
                      setPasswordLogin(e.target.value);
                    }}
                    className="px-3 border-[1px] bg-gray-50 text-black outline-none focus:outline-primary -outline-offset-2 font-medium text-base border-primary/60  py-2 w-full rounded-sm"
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
                    type="submit"
                    className="bg-primary flex items-center justify-center hover:shadow-primary/60 duration-300 cursor-pointer text-white shadow-primary/40 rounded-full font-medium gap-2 h-10 shadow-lg py-2 w-40 md:w-1/2 "
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
                <div className="md:w-96 w-full flex items-center justify-between pt-8">
                  <button className="font-normal text-base">
                    Need an account?
                  </button>
                  <button
                    onClick={() => {
                      setRegisterVisible(true);
                      setPasswordRegister("");
                    }}
                    className="text-black rounded-full font-medium border-2 flex items-center justify-center h-10 border-primary py-2 w-40 md:w-1/2 "
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
                  className="flex flex-col items-end gap-6 md:w-96 w-full justify-center border-b-[2px] border-gray-300 pb-8"
                >
                  <input
                    ref={inputRef}
                    autoFocus
                    required
                    onChange={(e) => {
                      setEmailRegister(e.target.value);
                    }}
                    className="px-3 bg-gray-50 text-black border-[1px] outline-none focus:outline-primary -outline-offset-2 font-medium text-base border-primary/60  py-2 w-full rounded-sm"
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
                    className="px-3 bg-gray-50 text-black border-[1px] outline-none focus:outline-primary -outline-offset-2 font-medium text-base border-primary/60  py-2 w-full rounded-sm"
                    type="password"
                    placeholder="Password"
                  ></input>
                  <input
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    onChange={(e) => {
                      setPasswordRegister2(e.target.value);
                    }}
                    className="px-3 bg-gray-50 text-black border-[1px] outline-none focus:outline-primary -outline-offset-2 font-medium text-base border-primary/60  py-2 w-full rounded-sm"
                    type="password"
                    placeholder="Re-enter password"
                  ></input>
                  {passwordRegister.length > 0 && (
                    <div className="w-full flex gap-2 items-start text-sm flex-col">
                      {passwordRegister.match(lowerCaseLetters) ? (
                        <span className="flex text-green-800 font-medium gap-1 items-center justify-center">
                          <AiOutlineCheck />
                          Lowercase letters
                        </span>
                      ) : (
                        <span className="flex gap-1 text-red-800 font-medium items-center justify-center">
                          <AiOutlineClose />
                          Lowercase letters
                        </span>
                      )}
                      {passwordRegister.match(upperCaseLetters) ? (
                        <span className="flex text-green-800 font-medium gap-1 items-center justify-center">
                          <AiOutlineCheck />
                          Uppercase letters
                        </span>
                      ) : (
                        <span className="flex gap-1 text-red-800 font-medium items-center justify-center">
                          <AiOutlineClose />
                          Uppercase letters
                        </span>
                      )}
                      {passwordRegister.match(numbers) ? (
                        <span className="flex text-green-800 font-medium gap-1 items-center justify-center">
                          <AiOutlineCheck />
                          Numbers
                        </span>
                      ) : (
                        <span className="flex gap-1 text-red-800 font-medium items-center justify-center">
                          <AiOutlineClose />
                          Numbers
                        </span>
                      )}
                      {passwordRegister.length > 6 ? (
                        <span className="flex text-green-800 font-medium gap-1 items-center justify-center">
                          <AiOutlineCheck />
                          6+ characters
                        </span>
                      ) : (
                        <span className="flex gap-1 text-red-800 font-medium items-center justify-center">
                          <AiOutlineClose />
                          6+ characters
                        </span>
                      )}
                      {passwordRegister === passwordRegister2 ? (
                        <span className="flex text-green-800 font-medium gap-1 items-center justify-center">
                          <AiOutlineCheck />
                          Passwords matching
                        </span>
                      ) : (
                        <span className="flex gap-1 text-red-800 font-medium items-center justify-center">
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
                      type="submit"
                      className="bg-primary flex items-center justify-center cursor-pointer hover:shadow-primary/60 duration-300 text-white shadow-primary/40 rounded-full h-10  font-medium shadow-lg py-2 w-40 md:w-1/2 "
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
                <div className="md:w-96 w-full flex items-center justify-between pt-8">
                  <button className="font-normal text-base">
                    Have an account?
                  </button>
                  <button
                    onClick={() => {
                      setRegisterVisible(false);
                      setPasswordRegister("");
                    }}
                    className="text-black rounded-full font-medium border-2 flex items-center justify-center h-10 border-primary py-2 w-40 md:w-1/2 "
                  >
                    Sign in
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default Index;
