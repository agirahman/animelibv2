
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../../Theme/ThemeSwitch";
import InputSearch from "./InputSearch";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Ongoing", href: "/ongoing" },
    { name: "Upcoming", href: "/upcoming" },
    { name: "Popular", href: "/popular" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-3">
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
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 group overflow-hidden ${isActive
                      ? "text-green-500 bg-green-500/10 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                      : "text-gray-600 dark:text-gray-400 hover:text-green-500 hover:bg-green-500/5"
                    }`}
                >
                  {link.name}
                  {/* Subtle Glow Indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full blur-[2px]" />
                  )}
                  {/* Hover Slide Effect */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  )}
                </Link>
              );
            })}
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
