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
    <div className="flex item-center sm:w-50 w-40">
      <input
        type="search"
        className="block px-2 py-1 w-full text-md text-black bg-zinc-100 rounded-s-lg border border-zinc-500 border-e-0 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-500 dark:placeholder-zinc-400 dark:text-white dark:focus:border-blue-400 "
        placeholder="Search..."
        ref={searchRef}
        onKeyDown={handleValidationInput}
        required
      />
      <button aria-label="seacrh button" type="button" className=" p-1 rounded-e-lg border border-s-0 border-zinc-500 dark:border-zinc-600 text-zinc-400 bg-zinc-100 dark:bg-zinc-800 cursor-pointer" 
        onClick={handleValidationInput}>
        <RiSearchLine />
      </button>
    </div>
  );
};

export default InputSearch;
