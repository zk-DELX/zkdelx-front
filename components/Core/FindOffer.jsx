import React, { useState, useEffect } from "react";
import MapModal from "./MapModal";
import { BsInfoCircleFill } from "react-icons/bs";
import Image from "next/image";
import USDT from "../../assets/USDT.png";
import USDC from "../../assets/USDC.png";

function FindOffer() {
  //step-1
  const [priceinp, setPriceinp] = useState("0");
  const [amount, setAmount] = useState("0");
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState(0);
  const [location, setLocation] = useState("--");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClickModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setTotal(amount * priceinp + amount * priceinp * 0.015);
  }, [priceinp, amount]);

  return (
    <div className="flex justify-center text-xl px-3 lg:px-0 pb-6">
      <div className="mt-[10%] lg:mt-[5%] w-[550px] font-epilogue bg-[#0D111C] border-[1px] border-[#1b2133] p-4 rounded-[15px]">
        <div className="flex flex-row justify-between">
          <div className="text-3xl">Find an offer</div>
          <div className="hover:cursor-pointer">
            <BsInfoCircleFill />
          </div>
        </div>
        <div className="text-center">
          <div className="text-[#5285F6] mt-8">~0.43 USD/KWH</div>
          <div className="text-gray-500 font-bold text-sm">
            real-time pool price avg.
          </div>
        </div>
        <div className="mt-8 flex justify-between ">
          <div>
            <div className="md:px-4 py-1">User ID</div>
          </div>
          <div className="md:mr-4">0x12923</div>
        </div>
        <div className="md:flex justify-between mt-4 md:px-4">
          <p className="pt-2">Token</p>
          <div>
            <div className="flex justify-center mt-2 md:mt-0">
              <div
                className={`flex space-x-3 bg-[#131A2A] p-2 border-[2px] ${
                  token == 0 ? "border-[#5285F6]" : "border-[#1b2133]"
                } rounded-l-[5px] hover:cursor-pointer`}
                onClick={() => setToken(0)}
              >
                <Image
                  src={USDT}
                  alt={"USDT"}
                  width={""}
                  height={""}
                  className={"w-6 h-6"}
                />
                <p className="">USDT</p>
              </div>
              <div>
                <div
                  className={` flex space-x-3 bg-[#131A2A] p-2 border-[2px] ${
                    token == 1 ? "border-[#5285F6]" : "border-[#1b2133]"
                  } hover:cursor-pointer `}
                  onClick={() => setToken(1)}
                >
                  <Image
                    src={USDC}
                    alt={"USDC"}
                    width={""}
                    height={""}
                    className={"w-6 h-6"}
                  />
                  <p className="">USDC</p>
                </div>
              </div>
              <div>
                <div
                  className={`flex space-x-3 bg-[#131A2A] p-2 border-[2px] ${
                    token == 2 ? "border-[#5285F6]" : "border-[#1b2133]"
                  } rounded-r-[5px] hover:cursor-pointer`}
                  onClick={() => setToken(2)}
                >
                  <p className="text-center mx-[0.12rem]">BOTH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 md:flex justify-between ">
          <div className="flex md:block">
            <div className="md:px-4">Price Rate</div>
            <div className="md:px-4 text-xs text-[#5285F6] ml-2 mt-2 md:ml-0 md:mt-0 pb-2 md:pb-0">
              USD per KWH
            </div>
          </div>
          <div className="relative md:mr-4">
            <input
              type="text"
              placeholder="0"
              className="text-gray-300 bg-[#131A2A] rounded-[5px] border-[1px] border-[#1b2133] w-full md:px-4 py-2 pl-3 pr-10"
              inputMode="numeric"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/,/g, ".");
              }}
              onChange={(e) => setPriceinp(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mr-2 mt-1">
              <span className="text-gray-500 ">$</span>
            </div>
          </div>
        </div>
        <div className="mt-6 md:flex justify-between ">
          <div className="flex md:block">
            <div className="md:px-4">Amount</div>
            <div className="md:px-4 text-xs text-[#5285F6] ml-2 mt-2 md:ml-0 md:mt-0 pb-2 md:pb-0">
              Amount in KWH
            </div>
          </div>
          <div className="relative md:mr-4">
            <input
              type=""
              placeholder="0"
              inputMode="numeric"
              className="text-gray-300 bg-[#131A2A] rounded-[5px] border-[1px] border-[#1b2133] w-full md:px-4 py-2 pl-3 pr-10"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/,/g, ".");
              }}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mr-2 mt-1">
              <span className="text-gray-500 ">KWH</span>
            </div>
          </div>
        </div>
        <div className="mt-6 md:flex justify-between md:mr-4">
          <p className="md:px-4 py-2">Location Area</p>
          <div
            onClick={handleClickModal}
            className="text-center bg-[#131A2A] rounded-[5px] border-[1px] border-[#1b2133] md:px-2 py-2 hover:cursor-pointer text-md"
          >
            <p className="px-[3.4rem]">Select Location</p>
          </div>
        </div>
        <div className="mt-6 md:px-4 md:flex">
          <div>Selected Location : </div>
          <div className="md:ml-2 text-[#5285F6] mt-2 md:mt-0">{location}</div>
        </div>
        <div className="mt-4 md:px-4 md:flex">
          <div>Estimated Total : </div>
          <div className="md:ml-2 text-[#5285F6] mt-2 md:mt-0">
            {total.toFixed(2)}{" "}
            {token == 0 ? <>USDT</> : token == 1 ? <>USDC</> : <>USD</>}
          </div>
        </div>
        <div className="text-gray-500 font-bold text-sm md:px-4">
          Including 1.5% Platform fees.
        </div>
        <div>
          <div className="mt-6 text-center md:px-4 pb-2">
            <div className="py-3 px-4 rounded-[10px] hover:cursor-pointer font-kanit font-bold text-xl bg-[#26365A] text-blue-400 hover:text-[#5285F6]">
              <div>Search</div>
            </div>
          </div>
        </div>
      </div>
      <MapModal
        location={location}
        setLocation={setLocation}
        isOpen={isModalVisible}
        onClose={handleCloseModal}
        className={isModalVisible ? "active" : ""}
      />
    </div>
  );
}

export default FindOffer;
