"use client";
import React from "react";
import Logo from "./reuseable/Logo";
import Link from "next/link";
import { useMainContext } from "@/context/MainContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { setIsToggle } from "@/redux/slice/slidebarSlice";
function Navbar() {
  const { user, logOutHandler } = useMainContext();
  const dispatch = useDispatch();
  return (
    <>
      <header className="w-full border-b rounded-b-md">
        <nav className="w-[98%] lg:w-[80%] mx-auto py-3 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <button
              onClick={() => dispatch(setIsToggle())}
              className="bg-gray-100 rounded-full sm:hidden p-2 text-xl hover:bg-gray-200 cursor-pointer"
            >
              <GiHamburgerMenu />
            </button>
            <Logo />
          </div>
          <ul className="flex items-center justify-center gap-x-2">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/services"}>Service</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            {user ? (
              <button
                className="bg-rose-700 text-white px-4 py-1 font-medium rounded cursor-pointer"
                onClick={logOutHandler}
              >
                Logout
              </button>
            ) : (
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
