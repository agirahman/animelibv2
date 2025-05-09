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

  return (
    <div className="flex item-center sm:w-50 w-40">
      <input
        type="search"
        className="block px-2 py-1 w-full text-md text-black bg-gray-100 rounded-s-lg border border-gray-500 border-e-0 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-400 "
        placeholder="Search..."
        ref={searchRef}
        onKeyDown={handleSearchInput}
        required
      />
      <button type="button" className=" p-1 rounded-e-lg border border-s-0 border-gray-500 dark:border-gray-600 text-gray-400 bg-gray-100 dark:bg-gray-800 cursor-pointer" 
        onClick={handleSearchInput}>
        <RiSearchLine />
      </button>
    </div>
  );
};

export default InputSearch;
