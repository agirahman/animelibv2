
import Link from "next/link";
import ThemeSwitch from "../utils/ThemeSwitch";
import InputSearch from "./InputSearch";
import MobileNavbar from "@/utils/MobileNavbar";

const Navbar = () => {
  return (
    <header className=" flex justify-center py-4 ">
      <div className="flex justify-between items-center lg:w-16/20 md:w-17/20 sm:w-18/20 w-19/20 ">
        <div className="flex items-center">
          <MobileNavbar />
          <Link
            href="/"
            className="md:text-4xl text-3xl text-green-400 font-bold"
          >
            animelib.
          </Link>
        </div>

        <div className="flex items-center gap-8 ">
          <div className="lg:flex hidden font-semibold items-center gap-4 ml-auto ">
            <Link href={""} className="hover:text-green-400 transition-all">
              Home
            </Link>
            <Link href={""} className="hover:text-green-400 transition-all">
              About
            </Link>
            <Link href={""} className="hover:text-green-400 transition-all">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="hidden lg:block">
              <ThemeSwitch />
            </div>
            <InputSearch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
