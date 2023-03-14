import React, { useState } from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className="font-epilogue mx-[1rem] my-4 lg:mx-[8rem]">
      <div className="flex justify-between">
        <div className="flex space-x-20">
          <div>
            <Image
              src={Logo}
              alt="zkDelx"
              width={"55"}
              height={""}
              className="mt-2"
            />
          </div>
          <div className="hidden xl:flex space-x-2 text-xl font-kanit mt-3 ">
            <p className="hover:bg-[#1E2132] hover:cursor-pointer py-3 px-4 rounded-[15px]">
              Find an offer
            </p>
            <p className="hover:bg-[#1E2132] hover:cursor-pointer py-3 px-4 rounded-[15px] text-gray-400  ">
              Create an offer
            </p>
            <p className="hover:bg-[#1E2132] hover:cursor-pointer py-3 px-4 rounded-[15px] text-gray-400  ">
              Transactions History
            </p>
            <p className="hover:bg-[#1E2132] hover:cursor-pointer py-3 px-4 rounded-[15px] text-gray-400  ">
              $DELX Token
            </p>
          </div>
        </div>
        <div className="mt-3 flex">
          <div className="py-3 px-4 rounded-[15px] hover:cursor-pointer font-kanit font-bold text-xl bg-[#26365A] text-blue-400 hover:text-[#5285F6]">
            <p>Connect Wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
