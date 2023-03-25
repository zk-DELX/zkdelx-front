import React, { useState } from "react";
import { 
  usePrepareContractWrite, 
  useContractWrite, 
  useWaitForTransaction,
  useNetwork,
  useAccount 
} from 'wagmi'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdElectricCar, MdAttachMoney } from "react-icons/md";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { BiCurrentLocation } from "react-icons/bi";
import ABI from "../../../src/abi.json";
import Tokens from "../../../utils/TokensBalance";
import scrollUSDCabi from "../../../src/scrollUSDCAbi.json";
import scrollDAIabi from "../../../src/scrollDAIAbi.json";
import useDebounce from "../../../utils/useDebounce";

function Offer(props) {
  const [isopen, setIsopen] = useState(false);
  const account = useAccount();
  const {chain, chains} = useNetwork();
  const debouncedOfferid = useDebounce(props.id, 500);
  const debouncedAmount = useDebounce(+props.amount, 500);
  const debouncedPrice = useDebounce(+props.price * 100, 500);
  const debouncedApproveAmount = useDebounce(+props.price * 100 * +props.amount, 500);

  const contractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS;

  function formatAddress(address) {
    const addressArray = address.split(", ");
    const addressFormatted = `${addressArray[1]}, ${addressArray[2]}`;
    return addressFormatted;
  }

  function totalCalc(price, amount) {
    return amount * price ;
  }

  const obtainTokenProps = () => {
    var tokenAddress = "";
    var tokenDecimal = 0;
    var tokenAbi;
    if (account.status == "connected" && chain.id == 534353) {
      switch (props.token) {
        case "DAI": 
          tokenAddress = Tokens[0][0][0].address;
          tokenDecimal = Tokens[0][0][0].decimal;
          tokenAbi = scrollDAIabi;
          break;
        case "USDT":
          tokenAddress = Tokens[0][1][0].address;
          tokenDecimal = Tokens[0][1][0].decimal;
          break;
        case "USDC":
          tokenAddress = Tokens[0][2][0].address;
          tokenDecimal = Tokens[0][2][0].decimal;
          tokenAbi = scrollUSDCabi;
          break;
      }
    }
    // For PolyZK
    if (account.status == "connected" && chain.id == 1442) {
      switch (props.token) {
        case "DAI": 
          tokenAddress = Tokens[1][0][0].address;
          tokenDecimal = Tokens[1][0][0].decimal;
          break;
        case "USDT":
          tokenAddress = Tokens[1][1][0].address;
          tokenDecimal = Tokens[1][1][0].decimal;
          break;
        case "USDC":
          tokenAddress = Tokens[1][2][0].address;
          tokenDecimal = Tokens[1][2][0].decimal;
          break;
      }
    }
    return {tokenAddress, tokenDecimal, tokenAbi};
  }
  const {tokenAddress, tokenDecimal, tokenAbi} = obtainTokenProps();

  const { config: approveConfig, error: approveError } = usePrepareContractWrite({
    address: tokenAddress,
    abi: tokenAbi,
    chainId: chain.id,
    functionName: 'approve',
    args: [contractAddress, +debouncedApproveAmount],
    enabled: Boolean(debouncedApproveAmount),
  });

  console.log({approveConfig});
  console.log({approveError});

  const { data: approveData, write: approveWrite, isError: approveIsError } = useContractWrite(approveConfig);
  const { isLoading: approveIsLoading, isSuccess: approveIsSuccess } = useWaitForTransaction({
  hash: approveData?.hash,
  }) 

  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: ABI,
    chainId: chain.id,
    functionName: 'buyOffer',
    args: [debouncedOfferid, +debouncedAmount],
    enabled: Boolean(debouncedOfferid),
  });

  console.log({config});
  console.log({error});
  
  const { data, write, isError } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
  hash: data?.hash,
  }) 

  const notify = (opt) => {
    const notifyObj = {
      position: "top-center",
      text: "19px",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    };
    switch (opt) {
      case "notFound":
        toast.error(
          "Offer not found !",
          notifyObj
        );
        break;
      case "buySuccessPolybase":
        toast.success("Buy sucess in Polybase!", {
          ...notifyObj,
          theme: "light",
        });
        break;
      case "buySuccessChain":
        toast.success("Bought offer on-chain!", {
          ...notifyObj,
          theme: "light",
        });
        break;
    }
  };

  const handleBuyOffer = async () => {
    const currentTime = new Date().getTime();
    const offerBuyObj = {
      offerID: props.id,
      userAccount: account.address,
      amount: +props.amount,
      price: +props.price,
      location: props.address,
      updateTime: currentTime,
    };
    console.log(offerBuyObj);
    const response = await fetch("/api/acceptoffer", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(offerBuyObj),
    });
  
    if (response.status == 201) {
      notify("buySuccessPolybase");
    } else if (response.status == 404) {
      notify("notFound");
    }
  }

  return (
    <div>
      {!isopen && (
        <div
          onClick={() => setIsopen(true)}
          className="p-2 md:mx-4 flex justify-between bg-[#0f1421] rounded-[10px] border-[1px] border-[#26365A] text-[15px] md:text-[18px] font-kanit hover:cursor-pointer mt-3"
        >
          <div className="flex">
            <MdElectricCar className="mt-[4px] text-[24px] mr-1 md:mr-2 text-blue-500" />
            <p className="mr-1 md:mr-2 ">Offer : ~{props.distance} away</p>
          </div>
          <div className="flex">
            <p className="mr-1 md:mr-2">${props.price.toFixed(2)} / KWH</p>
            <BsChevronDown className="text-blue-500 text-[24px] mt-[3px]" />
          </div>
        </div>
      )}
      {isopen && (
        <div className="p-2 md:mx-4 justify-between bg-[#0f1421] rounded-[10px] border-[1px] border-[#26365A] text-[15px] md:text-[18px] font-kanit hover:cursor-pointer mt-3">
          <div>
            <div
              className="flex justify-between "
              onClick={() => setIsopen(false)}
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
            <GiPathDistance className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="font-bold mr-2 underline">Distance:</p> ~
              {props.distance} away
            </p>
          </div>
          <div className="flex mt-2">
            <BiCurrentLocation className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="font-bold mr-2 underline">Location:</p>{" "}
              {formatAddress(props.address)}
            </p>
          </div>
          <div className="flex justify-between px-1 mt-4">
            <div className="flex mt-2">
              <p className="text-xl font-bold flex ">Total :</p>
              <p className="text-xl font-bold text-blue-500 ml-2 ">
                {totalCalc(props.price, props.amount).toFixed(2)} {props.token}
              </p>
            </div>
            <div 
              disabled={!approveWrite}
              onClick={() => {approveWrite?.();}}
              className="p-2  bg-[#26365A] text-blue-400 hover:text-[#5285F6] rounded-[10px] mb-1">
              Approve
            </div>
            <div 
              disabled={!approveIsSuccess}
              onClick={() => {write?.();}}
              className="p-2  bg-[#26365A] text-blue-400 hover:text-[#5285F6] rounded-[10px] mb-1">
              Buy this offer
            </div>
          </div>
          <div>
            {isSuccess && (
              <div>
                {notify("buySuccessChain")}
                Successfully bought !
                <a 
                  href={`${chain.blockExplorers.etherscan.url}tx/${data?.hash}` } 
                  target="_blank"
                  className=" text-[#5285F6] mt-2 md:mt-2"
                  > Explore TX</a>
            </div>
            )}
          </div>
        </div>
        
      )}
    </div>
  );
}

export default Offer;
