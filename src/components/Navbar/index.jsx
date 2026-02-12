
import Link from "next/link";
import ThemeSwitch from "../Theme/ThemeSwitch";
import InputSearch from "./InputSearch";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2">
          <MobileNavbar />
          <Link
            href="/"
            className="md:text-3xl text-2xl text-green-500 font-bold tracking-tighter hover:scale-105 transition-transform"
          >
            animelib.
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-200">
            <Link href="/" className="hover:text-green-500 hover:underline underline-offset-4 transition-all">
              Home
            </Link>
            <Link href="/season-now" className="hover:text-green-500 hover:underline underline-offset-4 transition-all">
              Ongoing
            </Link>
            <Link href="/season-upcoming" className="hover:text-green-500 hover:underline underline-offset-4 transition-all">
              Upcoming
            </Link>
            <Link href="/top-anime" className="hover:text-green-500 hover:underline underline-offset-4 transition-all">
              Popular
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <InputSearch />
            </div>

            <div className="hidden lg:block">
              <ThemeSwitch />
            </div>
            {/* Mobile Search Icon Placeholder if needed, but InputSearch handles responsiveness */}
            <div className="sm:hidden">
              <InputSearch />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
