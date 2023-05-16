import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
export default function Example() {
  function getEmailUsername(email) {
    const username = email.split("@")[0];
    return username;
  }
  const { data } = useSession();
  return (
    <Menu
      as="div"
      className="relative inline-block z-10 text-left"
    >
      <div>
        <Menu.Button className="h-9 w-9 md:h-10  md:w-10 relative shadow-lg shadow-primary/20  flex items-center justify-center  rounded-full bg-primary">
          {data && data.user.email.slice(0, 1).toUpperCase()}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Link href="/profile">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`group flex ${
                      active ? "bg-primary text-white" : ""
                    } w-full items-center text-black rounded-md px-2 py-2 text-sm hover:bg-primary hover:text-white duration-150`}
                  >
                    <AiOutlineUser
                      className="mr-2  h-5 w-5"
                      aria-hidden="true"
                    />
                    {data && getEmailUsername(data.user.email)}
                  </button>
                )}
              </Menu.Item>
            </Link>
            <Link href="/">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`group flex ${
                      active ? "bg-primary text-white " : ""
                    } w-full items-center text-black rounded-md px-2 py-2 text-sm hover:bg-primary hover:text-white duration-150`}
                  >
                    <RxDashboard
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Dashboard
                  </button>
                )}
              </Menu.Item>
            </Link>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={signOut}
                  className={`group ${
                    active ? "bg-primary text-white" : ""
                  } flex w-full items-center text-black rounded-md px-2 py-2 text-sm hover:bg-primary hover:text-white duration-150`}
                >
                  <HiOutlineLogout
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
