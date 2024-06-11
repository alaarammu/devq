"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiMegaphoneSimpleLight } from "react-icons/pi";

export default function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Search triggered");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-between items-center mx-4 mt-6">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder=""
            className="border border-gray-600 rounded-full py-2 px-4 outline-none bg-white text-blue-950 pr-10 pl-10 w-full"
            onKeyPress={handleKeyPress}
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-950 text-2xl" />
        </div>
        <div className="relative">
          <PiMegaphoneSimpleLight
            className="text-3xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="flex flex-col items-center">
                <Link href="/my-profile" passHref>
                  <button className="px-4 py-2 text-blue-950  hover:text-red-400" >
                    My Profile 
                  </button>
                </Link>
                <hr className="border-gray-500" />
                <Link href="/" passHref>
                  <button className="px-4 py-2 text-blue-950  hover:text-red-400">
                    Logout
                  </button>
                  </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 w-full h-0.5 bg-gray-400"></div>
    </div>
  );
}