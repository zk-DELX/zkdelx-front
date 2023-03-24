import React, { useState, useEffect } from "react";
import OfferSold from "./Offers/OfferSold";
import OfferBought from "./Offers/OfferSold";
import { useAccount } from "wagmi";
import { BsInfoCircleFill } from "react-icons/bs";

function TXHistory() {
  const account = useAccount();
  const DEFAULT_BACKEND_BASE_URL = "https://zkdelx-backend.vercel.app";
  const baseUrl = process.env.BACKEND_BASE_URL ?? DEFAULT_BACKEND_BASE_URL;

  const [page, setPage] = useState("purchased");
  const [offers, setOffers] = useState("");
  const [listings, setListings] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const test = await fetch(
          baseUrl +
            "/queryhistoricaloffers/0x50aC41266d9D3445c707313873a9DB3be63a5257"
        );
        const response = await fetch(
          baseUrl + "/queryhistoricaloffers/" + account.address
        );
        const data = await response.json();
        setOffers(data.boughtOffers);
        setListings(data.soldOffers);
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
          <div className="text-3xl">Transactions History</div>
          <div className="hover:cursor-pointer">
            <BsInfoCircleFill />
          </div>
        </div>
        <div className="flex justify-between flex-row mt-8">
          <div
            onClick={() => setPage("purchased")}
            className={`w-[50%] flex text-[17px] md:text-xl p-2 md:p-4 hover:cursor-pointer ${
              page == "purchased"
                ? "border-[1px] border-[#5285F6] rounded-md"
                : "text-gray-400"
            } `}
          >
            Offers Purchased
            <p className="ml-3 text-[#5285F6] font-bold text-[17px]">
              {offers.length > 0 ? offers.length : <p>0</p>}
            </p>
          </div>
          <div
            onClick={() => setPage("sold")}
            className={`w-[50%]  flex text-[17px] md:text-xl p-2 md:p-4 hover:cursor-pointer ${
              page == "sold"
                ? "border-[1px] border-[#5285F6] rounded-md"
                : "text-gray-400"
            }  `}
          >
            Offers Sold
            <p className="ml-3 text-[#5285F6] font-bold text-[17px]">
              {listings.length > 0 ? listings.length : <p>0</p>}
            </p>
          </div>
        </div>
        {offers == "" && page == "purchased" && (
          <div className="p-2 px-4 flex justify-center bg-[#0f1421] mt-6 py-8 rounded-[10px] border-[1px] border-[#26365A]">
            <p className="text-sm md:text-lg">
              You haven't purchased any offers yet.
            </p>
          </div>
        )}

        {offers &&
          page == "purchased" &&
          offers.map((offer, index) => (
            <OfferBought
              key={index}
              id={offer.data.id}
              amount={offer.data.amount}
              price={offer.data.price}
              address={offer.data.location}
            />
          ))}

        {listings &&
          page == "sold" &&
          listings.map((offer, index) => (
            <OfferSold
              key={index}
              id={offer.data.id}
              amount={offer.data.acceptAmount}
              price={offer.data.price}
              address={offer.data.location}
            />
          ))}

        {listings == "" && page == "sold" && (
          <div className="p-2 px-4 flex justify-center bg-[#0f1421] mt-6 py-8 rounded-[10px] border-[1px] border-[#26365A]">
            <p className="text-sm md:text-lg">
              You haven't sold any offers yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TXHistory;
