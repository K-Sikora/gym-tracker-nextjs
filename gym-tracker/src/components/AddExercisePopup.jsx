import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DownloadDoneSharpIcon from "@mui/icons-material/DownloadDoneSharp";
import DropdownExercises from "./DropdownExercises";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Lottie from "lottie-react";
import pushups from "../../public/pushups.json";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const AddExercisePopup = (props) => {
  const { data } = useSession();

  const [loadingResult, setLoadingResult] = useState(false);
  const [exerciseName, setexerciseName] = useState("");
  const [exerciseMuscle, setExerciseMuscle] = useState("Chest");

  const postNewExercise = async (e) => {
    e.preventDefault();
    const id = data.user.name;
    const lettersOnly = exerciseName.replace(/\s/g, "");
    const containsMinimumLetters = lettersOnly.length >= 3;
    if (containsMinimumLetters && exerciseName.length <= 50) {
      try {
        setLoadingResult(true);
        const result = await axios.post("/api/adduserexercise", {
          exerciseName,
          exerciseMuscle,
          id,
        });
        if (result.status === 200) {
          setLoadingResult(false);
          props.refetch();
          toast.success("Added exercise successfully", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (err) {
        console.log(err);

        if (err.response.status === 400) {
          setLoadingResult(false);

          toast.error(`Exercise with this title already exists`, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setLoadingResult(false);

          toast.error(`Something went wrong`, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } else {
      toast.error(`Invalid exercise title.`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const [value, setValue] = useState("");
  const handleChange = (e) => {
    const regex = /^[A-Za-z\s]{0,50}$/;

    if (regex.test(e.target.value) && e.target.value.length < 50) {
      setValue(e.target.value);
      setexerciseName(e.target.value);
    }
  };
  function closeModal() {
    props.setIsOpen(false);
  }

  function openModal() {
    props.setIsOpen(true);
  }

  return (
    <>
      <Transition
        appear
        show={props.isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full flex items-center justify-center h-[600px]  flex-col  max-w-3xl bg-bgblack transform overflow-hidden relative rounded-2xl border-2 border-gray-200/20 p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    onClick={closeModal}
                    className="absolute top-5 text-white right-5"
                  >
                    <CloseSharpIcon fontSize="medium" />
                  </button>
                  <div className="mt-2 w-full">
                    <form
                      onSubmit={postNewExercise}
                      method="post"
                      action="#"
                      className="flex relative p-4 py-4 -mt-10 border- flex-col w-full rounded-lg  gap-6 items-center justify-center"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-40">
                          <Lottie
                            animationData={pushups}
                            loop={true}
                          />
                        </div>
                        <h3 className="text-xl font-bold text-white sm:text-2xl">
                          Add new exercise
                        </h3>
                      </div>
                      <div className="flex flex-col w-full gap-3">
                        <DropdownExercises
                          setExerciseMuscle={setExerciseMuscle}
                        />
                        <input
                          onChange={handleChange}
                          value={value}
                          placeholder="Exercise title"
                          className="w-full appearance-none pl-3 text-base font-medium placeholder:text-gray-400 border-2 outline-none bg-white py-2 rounded-lg "
                        />
                      </div>
                      <button
                        disabled={loadingResult}
                        className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-primary to-blue-500 group-hover:from-primary ${
                          loadingResult ? "pointer-events-none" : ""
                        } hover:text-white text-black  focus:ring-2 focus:outline-none`}
                        type="submit"
                      >
                        <span className="relative px-4 py-2  transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                          {loadingResult ? (
                            <span className="h-5 w-44 flex items-center justify-center">
                              <ClipLoader
                                size={15}
                                color="#010102"
                              />
                            </span>
                          ) : (
                            <span className="h-5 w-44 flex items-center justify-center">
                              <DownloadDoneSharpIcon fontSize="small" />
                              Add exercise
                            </span>
                          )}
                        </span>
                      </button>
                    </form>
                  </div>

                  <div className="mt-4 flex justify-center items-center"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default AddExercisePopup;
