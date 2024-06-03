"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { PiMegaphoneSimpleLight } from "react-icons/pi";

export default function Header() {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Search triggered");
    }
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
        <PiMegaphoneSimpleLight className="text-3xl" href="./activity"/>
      </div>
      <div className="mt-6 w-full h-0.5 bg-gray-400">
      </div>
    </div>
  );
} 