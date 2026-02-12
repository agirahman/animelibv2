"use client"

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";

const InputSearch = () => {
  const searchRef = useRef();
  const router = useRouter()

  const handleSearchInput = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault()
      const keyword = searchRef.current.value
      router.push(`/search/${keyword}`);
    }
  };

  const handleValidationInput = (event) => {
    const keyword = searchRef.current.value.trim();
    if (keyword === "") {
      return;
    } else {
      handleSearchInput(event);
    }
  }

  return (
    <div className="relative flex items-center w-full max-w-[200px] sm:max-w-[250px] group">
      <input
        type="search"
        className="block w-full px-4 py-2 pr-10 text-sm md:text-base text-gray-900 bg-gray-100 rounded-full border border-transparent focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 dark:bg-zinc-800 dark:text-white dark:focus:bg-zinc-800 dark:focus:border-green-400 dark:focus:ring-green-900 transition-all duration-300 outline-none shadow-sm group-hover:shadow-md"
        placeholder="Search anime..."
        ref={searchRef}
        onKeyDown={handleValidationInput}
        required
      />
      <button
        aria-label="search button"
        type="button"
        className="absolute right-1 p-1.5 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors rounded-full"
        onClick={handleValidationInput}
      >
        <RiSearchLine size={20} />
      </button>
    </div>
  );
};

export default InputSearch;
