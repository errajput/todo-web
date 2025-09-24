"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-200 text-blue-800 shadow-md  p-2 flex justify-between items-center  sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <img src="/todoIcon.png" alt="Todo APP" className="w-12 h-12" />{" "}
        <Link href="/">
          <h1
            className="text-2xl font-bold tracking-wide 
                     bg-blue-800
                     bg-clip-text text-transparent 
                     animate-pulse hover:scale-110 hover:rotate-1 
                     transition-transform duration-500 ease-in-out font-[Orbitron]"
          >
            Todo APP
          </h1>
        </Link>
      </div>
      <nav className="hidden md:flex space-x-9">
        <>
          <Link
            href="/register"
            className="cursor-pointer relative transition duration-300 hover:text-blue-600  font-bold
                         after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600  after:left-0 after:-bottom-1
                         hover:after:w-full after:transition-all after:duration-300"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="cursor-pointer relative transition duration-300 hover:text-blue-600  font-bold
                         after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600  after:left-0 after:-bottom-1
                         hover:after:w-full after:transition-all after:duration-300"
          >
            Login
          </Link>
        </>

        <>
          <Link
            href="/profile"
            className="cursor-pointer relative transition duration-300 hover:text-blue-600  font-bold
                         after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600  after:left-0 after:-bottom-1
                         hover:after:w-full after:transition-all after:duration-300"
          >
            Profile
          </Link>
        </>
      </nav>
      <button
        className="md:hidden text-2xl focus:outline-none cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-50 bg-blue-300/50 text-blue-800  flex flex-col items-center space-y-4 py-4 shadow-md md:hidden ">
          <>
            <Link
              href="/register"
              className="nav-link cursor-pointer hover:text-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              href="/login"
              className="nav-link cursor-pointer hover:text-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </>

          <>
            <Link
              href="/profile"
              className="nav-link cursor-pointer "
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
          </>
        </div>
      )}
    </header>
  );
}

/* Tailwind helper styles */
const navLinkClasses =
  "cursor-pointer relative transition duration-300 hover:text-green-700 font-bold after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300";
