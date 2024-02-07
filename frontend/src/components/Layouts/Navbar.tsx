"use client";
import React, { FC, useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { MyContext } from "@/store/context";


const Navbar : FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {isLoggedIn, setIsLoggedIn} = useContext(MyContext);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Books" },
    { href: "orders", label: "Orders" }
  ];

  return (
    <>
      <header className="px-4 sm:px-32  py-2 z-10 w-full bg-[#0F131FB2] fixed">
        <nav className="flex justify-between items-center max-container h-[68px] text-[white] text-sm">
          <a href="/" className="text-3xl font-bold">
            BS
          </a>

          <ul className="flex-1 flex justify-end items-center gap-16 max-lg:hidden">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-montserrat leading-normal text-sm text-slate-gray"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <RxHamburgerMenu className="text-4xl" />
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <div>
          <nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100  ">
            <div
              className="hidden max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <AiOutlineClose className="text-4xl" />
            </div>
            <ul className=" lg:hidden flex flex-col items-center justify-center h-full ">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-montserrat leading-normal text-lg text-slate-gray"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

    </>
  );
};
export default Navbar;
