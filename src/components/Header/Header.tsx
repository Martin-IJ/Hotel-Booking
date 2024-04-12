"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import ThemeContext from "@/context/themeContext";
import Image from "next/image";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    if (navbarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navbarOpen]);

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  const openNavbar = () => {
    setNavbarOpen(true);
  };

  const { data: session } = useSession();

  return (
    <header className="sticky top-0 left-0 z-50 bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,0,0,0.7)] backdrop-blur-xl">
      <div className="py-7 lg:py-10 px-10 container mx-auto flex gap-5 items-center justify-between flex-wrap md:flex-nowrap text-xl">
        <div className="flex items-center">
          <Link href="/" className="font-black text-tertiary-dark">
            Hotelz
          </Link>

          <ul className="flex items-center ml-5">
            <li className="flex items-center">
              {session?.user ? (
                <Link href={`/users/${session.user.id}`}>
                  {session.user.image ? (
                    <div className="w-8 h-w-8 rounded-full overflow-hidden">
                      <Image
                        src={session.user.image}
                        alt={session.user.name!}
                        width={40}
                        height={40}
                        className="scale-animation img"
                      />
                    </div>
                  ) : (
                    <FaUserCircle />
                  )}
                </Link>
              ) : (
                <Link href="/auth">
                  <FaUserCircle />
                </Link>
              )}
            </li>

            <li className="ml-2">
              {darkTheme ? (
                <MdOutlineLightMode
                  className="cursor-pointer"
                  onClick={() => {
                    setDarkTheme(false);
                    localStorage.removeItem("hotel-theme");
                  }}
                />
              ) : (
                <MdDarkMode
                  className="cursor-pointer"
                  onClick={() => {
                    setDarkTheme(true);
                    localStorage.setItem("hotel-theme", "true");
                  }}
                />
              )}
            </li>
          </ul>
        </div>

        <button onClick={openNavbar} className="md:hidden">
          <GiHamburgerMenu />
        </button>

        {/* Desktop View */}
        <ul className="hidden md:flex items-center justify-between w-full md:w-1/2 lg:w-1/3 mt-4 md:mt-0">
          <li className="hover:border-b-4 border-primary hover:text-primary duration-300 transition-all">
            <Link href="/"> Home </Link>
          </li>

          <li className="hover:border-b-4 border-primary hover:text-primary duration-300 transition-all">
            <Link href="/rooms"> Rooms </Link>
          </li>

          <li className="hover:border-b-4 border-primary hover:text-primary duration-300 transition-all">
            <Link href="/"> Contact </Link>
          </li>
        </ul>

        {/* Mobile View */}
        {navbarOpen && (
          <div className="absolute top-0 right-0 isolate flex justify-end md:hidden w-full h-screen">
            <div className="max-w-[350px] w-full h-full bg-white shadow-xl">
              {/* Mobile Close Btn */}
              <button
                onClick={closeNavbar}
                className="py-7 w-full px-7 text-2xl shadow-lg shadow-slate-100"
              >
                <IoMdClose />
              </button>

              {/* Dark Background */}
              <div
                onClick={closeNavbar}
                className="absolute inset-0 bg-black/70 -z-10"
              />

              {/* Mobile Ul */}
              <ul className="">
                <Link href="/">
                  <li
                    onClick={closeNavbar}
                    className="p-7 hover:bg-slate-100 hover:text-primary hover:border-l-4 border-primary duration-500 transition-all"
                  >
                    Home
                  </li>
                </Link>

                <Link href="/rooms">
                  <li
                    onClick={closeNavbar}
                    className="p-7 hover:bg-slate-100 hover:text-primary hover:border-l-4 border-primary duration-500 transition-all"
                  >
                    Rooms
                  </li>
                </Link>

                <Link href="/">
                  <li
                    onClick={closeNavbar}
                    className="p-7 hover:bg-slate-100 hover:text-primary hover:border-l-4 border-primary duration-500 transition-all"
                  >
                    Contact
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
