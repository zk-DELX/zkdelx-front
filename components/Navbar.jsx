import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getAccount, fetchBalance } from "@wagmi/core";
import Balancebtn from "./Buttons/Balancebtn";

function Navbar() {
  const [connected, setConnected] = useState(false);
  const account = getAccount();

  useEffect(() => {
    if (account && account.status === "connected") {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [account.status]);

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
        <div className="mt-4 flex">
          <div className="mr-3">
            <Balancebtn />
          </div>
          <div className="">
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
