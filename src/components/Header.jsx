"use client";

import { UserContext } from "@/providers";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLogin } = useContext(UserContext);

  if (!isLogin) return;

  return (
    <header className="bg-gradient-to-tr from-purple-200 via-pink-200 to-yellow-200  text-purple-800 shadow-md p-2 flex justify-between items-center sticky top-0 z-50">
      {/* Logo + Title */}
      <div className="flex items-center space-x-3">
        <img src="/iconTodo.png" alt="Todo APP" className="w-12 h-12" />{" "}
        <Link href="/">
          <h1
            className="text-2xl font-bold tracking-wide 
                     bg-purple-800
                     bg-clip-text text-transparent 
                     animate-pulse hover:scale-110 hover:rotate-1 
                     transition-transform duration-500 ease-in-out font-[Orbitron]"
          >
            Todo APP
          </h1>
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="">
        {isLogin ? (
          <Link
            href="/profile"
            className="cursor-pointer relative transition duration-300 hover:text-purple-600 font-bold
                     after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-600 after:left-0 after:-bottom-1
                     hover:after:w-full after:transition-all after:duration-300"
          >
            Profile
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="cursor-pointer relative transition duration-300 hover:text-purple-600 font-bold
                       after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-600 after:left-0 after:-bottom-1
                       hover:after:w-full after:transition-all after:duration-300"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="cursor-pointer relative transition duration-300 hover:text-purple-600 font-bold
                       after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-600 after:left-0 after:-bottom-1
                       hover:after:w-full after:transition-all after:duration-300"
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
