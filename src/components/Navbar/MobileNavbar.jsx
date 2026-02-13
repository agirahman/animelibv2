"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenu4Fill, RiCloseLine } from "react-icons/ri";
import ThemeSwitch from "@/components/Theme/ThemeSwitch";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Ongoing Anime", path: "/ongoing" },
    { name: "Upcoming Anime", path: "/upcoming" },
    { name: "Popular Anime", path: "/popular" },
  ];

  return (
    <>
      <div
        className="lg:hidden text-2xl cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
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

      {/* Overlay with blur */}
      <div
        className={`fixed inset-0 bg-black/60  backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={toggleSidebar}
        aria-hidden="true"
      ></div>

      {/* Sidebar Content */}
      <nav
        className={`fixed top-0 left-0 h-full  w-[280px] bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        aria-label="Mobile sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex  justify-between items-center p-4 border-b border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-green-500">Menu</h2>
            <button
              onClick={toggleSidebar}
              aria-label="Close menu"
              className="text-2xl p-1  rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <RiCloseLine />
            </button>
          </div>

          {/* Links */}
          <ul className="flex flex-col p-4 w-full gap-2 bg-white dark:bg-zinc-900">
            {menuItems.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    onClick={toggleSidebar}
                    className={`flex items-center w-full p-3 rounded-lg text-lg font-medium transition-all border ${isActive
                      ? "bg-green-500/10 text-green-500 border-green-500/20 shadow-sm"
                      : "text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-zinc-800 hover:text-green-600 dark:hover:text-green-400 border-transparent hover:border-green-100 dark:hover:border-zinc-700"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Footer / Extra Actions */}
          <div className="mt-auto p-6 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <span className="font-medium">Theme</span>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileNavbar;
