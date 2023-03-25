import React, { useState } from "react";
import {
  MdElectricCar,
  MdAttachMoney,
  MdOutlineElectricBolt,
} from "react-icons/md";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { BiCurrentLocation } from "react-icons/bi";

function Offer(props) {
  const [isopen, setIsopen] = useState(false);

  function totalCalc(price, amount) {
    return amount * price ;
  }

  return (
    <div>
      {!isopen && (
        <div
          onClick={() => setIsopen(!isopen)}
          className="p-2 flex justify-between bg-[#0f1421] rounded-[10px] border-[1px] border-[#26365A] text-[15px] md:text-[18px] font-kanit hover:cursor-pointer mt-3"
        >
          <div className="flex">
            <MdElectricCar className="mt-[4px] text-[24px] mr-1 md:mr-2 text-blue-500" />
            <p className="mr-1 md:mr-2 ">Amount : ~{props.amount} KWH</p>
          </div>
          <div className="flex">
            <p className="mr-1 md:mr-2">${props.price.toFixed(2)} / KWH</p>
            <BsChevronDown className="text-blue-500 text-[24px] mt-[3px]" />
          </div>
        </div>
      )}
      {isopen && (
        <div className="p-2 justify-between bg-[#0f1421] rounded-[10px] border-[1px] border-[#26365A] text-[15px] md:text-[18px] font-kanit hover:cursor-pointer mt-3">
          <div>
            <div
              className="flex justify-between "
              onClick={() => setIsopen(!isopen)}
            >
              <div className="flex">
                <MdElectricCar className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
                <p className="text-[18px] flex mt-[2px]">
                  <p className="font-bold mr-2 underline">Offer:</p> {props.id}
                </p>
              </div>
              <BsChevronUp className="text-blue-500 mt-[1px]  text-[24px]" />
            </div>
          </div>
          <div className="flex mt-2">
            <MdAttachMoney className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="font-bold mr-2 underline">Price Rate:</p> $
              {props.price} per KWH
            </p>
          </div>
          <div className="flex mt-2">
            <MdOutlineElectricBolt className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="font-bold mr-2 underline">Max Amount:</p>
              {props.amount} KWH
            </p>
          </div>
          <div className="flex mt-2">
            <BiCurrentLocation className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="font-bold mr-2 underline">Location:</p>
            </p>
          </div>
          <p className="mt-2 ml-2 truncate">{props.address}</p>
          <div className="flex justify-between px-1 mt-4">
            <div className="flex mt-2">
              <p className="text-xl font-bold flex ">Total Paid:</p>
              <p className="text-xl font-bold text-blue-500 ml-2 ">
                {totalCalc(props.price, props.amount).toFixed(2)} USD
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Offer;
