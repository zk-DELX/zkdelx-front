import React, { useState, useEffect } from "react";
import OfferPending from "./Offers/OfferPending";
import OfferCreated from "./Offers/OfferCreated";
import { useAccount } from "wagmi";
import { BsInfoCircleFill } from "react-icons/bs";

function MyOffers() {
  const account = useAccount();

  const [page, setPage] = useState("pending");
  const [offers, setOffers] = useState("");
  const [listings, setListings] = useState("");

  function formatAddress(address) {
    const addressArray = address.split(", ");
    const addressFormatted = `${addressArray[1]}, ${addressArray[2]}`;
    return addressFormatted;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/queryinprocessoffers/" + account.address);
        const data = await response.json();
        setOffers(data.buyOffers);
        setListings(data.sellOffers);
        console.log(data);
      } catch {
        (e) => console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className=" mt-[1rem] 2xl:mt-[6rem] w-[550px] font-epilogue bg-[#0D111C] border-[1px] border-[#1b2133] p-4 rounded-[15px]">
        <div className="flex flex-row justify-between">
          <div className="text-3xl">My Offers</div>
          <div className="hover:cursor-pointer">
            <BsInfoCircleFill />
          </div>
        </div>
        <div className="flex justify-between flex-row mt-8">
          <div
            onClick={() => setPage("pending")}
            className={`w-[50%]  flex text-[17px] md:text-xl p-2 md:p-4 hover:cursor-pointer ${
              page == "pending"
                ? "border-[1px] border-[#5285F6] rounded-md"
                : "text-gray-400"
            } `}
          >
            Pending Offers
            <p className="ml-3 text-[#5285F6] font-bold text-[17px]">
              {offers.length > 0 ? offers.length : <p>0</p>}
            </p>
          </div>
          <div
            onClick={() => setPage("created")}
            className={`w-[50%]  flex text-[17px] md:text-xl p-2 md:p-4 hover:cursor-pointer ${
              page == "created"
                ? "border-[1px] border-[#5285F6] rounded-md"
                : "text-gray-400"
            }  `}
          >
            Created Offers
            <p className="ml-3 text-[#5285F6] font-bold text-[17px]">
              {listings.length > 0 ? listings.length : <p>0</p>}
            </p>
          </div>
        </div>
        {offers == "" && page == "pending" && (
          <div className="p-2 px-4 flex justify-center bg-[#0f1421] mt-6 py-8 rounded-[10px] border-[1px] border-[#26365A]">
            <p className="text-sm md:text-lg">You have no pending offers.</p>
          </div>
        )}

        {offers &&
          page == "pending" &&
          offers.map((offer, index) => (
            <OfferPending
              key={index}
              id={offer.data.id}
              amount={offer.data.acceptAmount}
              price={offer.data.price}
              address={offer.data.location}
            />
          ))}

        {listings &&
          page == "created" &&
          listings.map((offer, index) => (
            <OfferCreated
              key={index}
              id={offer.data.id}
              amount={offer.data.amount}
              price={offer.data.price}
              address={offer.data.location}
            />
          ))}

        {listings == "" && page == "created" && (
          <div className="p-2 px-4 flex justify-center bg-[#0f1421] mt-6 py-8 rounded-[10px] border-[1px] border-[#26365A]">
            <p className="text-sm md:text-lg">
              You haven't created any offers yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOffers;
