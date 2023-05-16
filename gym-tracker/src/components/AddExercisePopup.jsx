import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import DownloadDoneSharpIcon from "@mui/icons-material/DownloadDoneSharp";
import DropdownExercises from "./DropdownExercises";

const AddExercisePopup = (props) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    const regex = /^[A-Za-z\s]{0,50}$/;

    if (regex.test(e.target.value)) {
      setValue(e.target.value);
    }
  };
  function closeModal() {
    props.setIsOpen(false);
  }

  function openModal() {
    props.setIsOpen(true);
  }
  const handleSubmitNewExercise = async (e) => {
    e.preventDefault();
  };
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
                <Dialog.Panel className="w-full flex items-center justify-center h-[600px]  flex-col  max-w-3xl bg-gradient-to-tr from-white to-light transform overflow-hidden  rounded-2xl  p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2 w-full">
                    <form
                      onSubmit={handleSubmitNewExercise}
                      method="post"
                      action="#"
                      className="flex flex-col w-full rounded-lg  gap-6 items-center justify-center"
                    >
                      <div className="flex flex-col gap-2 items-center">
                        <img
                          src="./logo.png"
                          className="w-16"
                        ></img>
                        <h3 className="text-xl sm:text-2xl">
                          Add new exercise
                        </h3>
                      </div>
                      <div className="flex flex-col w-full gap-3">
                        <DropdownExercises />
                        <input
                          onChange={handleChange}
                          value={value}
                          placeholder="Exercise title"
                          className="w-full focus:shadow-lg appearance-none pl-3 text-base font-medium placeholder:text-gray-400  outline-none bg-white  shadow-md py-2 rounded-lg duration-300 "
                        />
                      </div>
                      <button
                        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-primary to-blue-500 group-hover:from-primary hover:text-white text-black  focus:ring-2 focus:outline-none"
                        type="submit"
                      >
                        <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                          <DownloadDoneSharpIcon fontSize="small" />
                          Submit new exercise
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
    </>
  );
};

export default AddExercisePopup;
