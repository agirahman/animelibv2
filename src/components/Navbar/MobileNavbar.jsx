"use client";

import { useState } from "react";
import Link from "next/link";
import { RiMenu4Fill, RiCloseLine } from "react-icons/ri";
import ThemeSwitch from "@/components/Theme/ThemeSwitch";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="block lg:hidden mr-2 text-2xl cursor-pointer"
        onClick={toggleSidebar}
        aria-label="Open menu"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleSidebar();
        }}
      >
        <RiMenu4Fill />
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0  bg-opacity-10  bg-transparent backdrop-blur-sm z-40"
            onClick={toggleSidebar}
            aria-hidden="true"
          ></div>

          <nav
            className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-black text-gray-900 dark:text-gray-100 z-50 shadow-lg p-6 flex flex-col"
            aria-label="Mobile sidebar"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                onClick={toggleSidebar}
                aria-label="Close menu"
                className="text-2xl focus:outline-none"
              >
                <RiCloseLine />
              </button>
            </div>

            <ul className="flex flex-col gap-4 text-lg">
              <Link
                href="/"
                onClick={toggleSidebar}
                className="hover:text-green-400 hover:bg-zinc-700 transition-colors p-2 rounded-lg dark:text-gray-300 dark:bg-zinc-800 border border-gray-500 text-gray-400 bg-gray-100"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={toggleSidebar}
                className="hover:text-green-400 hover:bg-zinc-700  transition-colors p-2 rounded-lg dark:text-gray-300 dark:bg-zinc-800 border border-gray-500 text-gray-400 bg-gray-100"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={toggleSidebar}
                className="hover:text-green-400 hover:bg-zinc-700  transition-colors p-2 rounded-lg dark:text-gray-300 dark:bg-zinc-800 border border-gray-500 text-gray-400 bg-gray-100"
              >
                Contact
              </Link>
              <ThemeSwitch />
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default MobileNavbar;
