import React, { useState, useEffect } from "react";
import MapModal from "./MapModal";
import Select, { components } from "react-select";
import { BsInfoCircleFill } from "react-icons/bs";
import Image from "next/image";
import Searchbtn from "../Buttons/Searchbtn";
import Tokens from "../../utils/TokensList";

function FindOffer() {
  //step-1
  const [priceinp, setPriceinp] = useState("0");
  const [amount, setAmount] = useState("0");
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState("");
  const [location, setLocation] = useState("--");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState("--");

  async function getAddressFromLatLng(latitude, longitude) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      setAddress(data.results[0].formatted_address);
      return data.results[0].formatted_address;
    } else {
      throw new Error(
        `Unable to retrieve address for (${latitude}, ${longitude})`
      );
    }
  }

  const handleClickModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setTotal(amount * priceinp + amount * priceinp * 0.015);
    if (location != "--") {
      getAddressFromLatLng(location.split(" ")[0], location.split(" ")[1]);
      console.log(location);
    }
  }, [priceinp, amount, location]);

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div className="flex">
          <Image
            src={props.data.image}
            alt={props.data.value}
            width="30"
            height="30"
            style={{ marginRight: "10px" }}
          />
          <div className="mt-1">{props.data.label}</div>
        </div>
      </components.Option>
    );
  };

  const SingleValue = ({ children, data }) => (
    <div className="flex text-white mt-[-36px] p-1">
      <Image
        src={data.image}
        alt={data.value}
        width="30"
        height="30"
        style={{ marginRight: "10px", color: "#fff" }}
      />
      <div className="mt-1">{children}</div>
    </div>
  );

  return (
    <div className="flex justify-center text-xl px-3 lg:px-0 pb-6">
      <div className="mt-[1rem] lg:mt-[5%] w-[550px] font-epilogue bg-[#0D111C] border-[1px] border-[#1b2133] p-4 rounded-[15px]">
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
            <Select
              options={Tokens}
              className="w-full min-w-[160px] text-gray-700 border border-[#1b2133] shadow-sm mt-2 md:mt-0"
              classNamePrefix="Select"
              components={{ Option, SingleValue }}
              onChange={() => setToken}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#131A2A",
                  cursor: "pointer",
                }),
                option: (provided) => ({
                  ...provided,
                  color: "#000",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "#fff",
                }),
              }}
            />
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
            <p className="px-[3.2rem]">Select Location</p>
          </div>
        </div>
        <div className="mt-6 md:px-4 ">
          <div>Selected Location : </div>
          <div className=" text-[#5285F6] mt-2 md:mt-2">{address}</div>
        </div>
        <div className="mt-4 md:px-4 md:flex">
          <div>Estimated Total : </div>
          <div className="md:ml-2 text-[#5285F6] mt-2 md:mt-0">
            {total.toFixed(2)} <>USD</>
          </div>
        </div>
        <div className="text-gray-500 font-bold text-sm md:px-4">
          Including 1.5% Platform fees.
        </div>
        <div>
          <div className="mt-6 text-center md:px-4 pb-2">
            <div className="py-3 px-4 rounded-[10px] hover:cursor-pointer font-kanit font-bold text-xl bg-[#26365A] text-blue-400 hover:text-[#5285F6]">
              <Searchbtn />
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
