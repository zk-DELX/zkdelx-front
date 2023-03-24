import { 
  usePrepareContractWrite, 
  useContractWrite, 
  useWaitForTransaction,
  useNetwork 
} from 'wagmi'
import Tokens from "../../../utils/TokensBalance";

export function OfferSubmit(props) {

  const contractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS;
  const tokenAddress = obtainTokenContractAddress();
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: [     
      {
      name: 'submitOffer',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        {
          "internalType": "string",
          "name": "_offerID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_paymentToken",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        }
      ],
      outputs: [],
      },
    ],
    functionName: 'submitOffer',
    args: [offerid, amountco, priceco * 100, tokenAddress, location],
    enabled: Boolean(account.address),
  })
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
  hash: data?.hash,
  })
  if (isLoading) notify("SubmittingToChain!");
  if (isSuccess) notify("SubmitedToChain!");
  
  const handleSubmitOffer = async () => {
    // await submitOfferToPolybase();
    await submitOfferToChain();
  }
  // TODO
  
  const submitOfferToChain = async () => {
  
   }
  
  const obtainTokenContractAddress = () => {
    var tokenAddress = "";
    if (account.status == "connected" && chain.id == 534353) {
      switch (token) {
        case "DAI": 
          tokenAddress = Tokens[0][0][0].address;
        case "USDT":
          tokenAddress = Tokens[0][1][0].address;
        case "USDC":
          tokenAddress = Tokens[0][2][0].address;
      }
    }
    // For PolyZK
    if (account.status == "connected" && chain.id == 1442) {
      switch (token) {
        case "DAI": 
          tokenAddress = Tokens[1][0][0].address;
        case "USDT":
          tokenAddress = Tokens[1][1][0].address;
        case "USDC":
          tokenAddress = Tokens[1][2][0].address;
      }
    }
    return tokenAddress;
  }
  
  const submitOfferToPolybase = async () => {
    const currentTime = new Date().getTime();
    const offerObj = {
      offerID: offerid,
      sellerAccount: account.address,
      amount: +amountco,
      price: +priceco,
      location: address,
      submitTime: currentTime,
      status: status,
    };
    console.log(offerObj);
    const response = await fetch("/api/storeoffer", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(offerObj), // body data type must match "Content-Type" header
    });
  
    if (response.status == 201) {
      notify("submitOfferSuccess");
    } else if (response.status == 409) {
      notify("submitOfferConflict");
    }
  };

  return (
    <div className="mt-[1rem] 2xl:mt-[6rem] w-[550px] font-epilogue bg-[#0D111C] border-[1px] border-[#1b2133] p-4 rounded-[15px]">
      <div className="flex flex-row justify-between">
        <div className="text-3xl">Create an offer</div>
        <div className="hover:cursor-pointer">
          <BsInfoCircleFill />
        </div>
      </div>
      <div className="text-center">
        <div className="text-[#5285F6] mt-8">~{avg.toFixed(2)} USD/KWH</div>
        <div className="text-gray-500 font-bold text-sm">{info}</div>
      </div>
      <div className="mt-8 flex justify-between ">
        <div>
          <div className="md:px-4 py-1">User ID</div>
        </div>
        <div
          className="md:mr-4"
          dangerouslySetInnerHTML={{ __html: formattedWallet }}
        />
      </div>
      <div className="md:flex justify-between mt-4 md:px-4">
        <p className="pt-2">Token</p>
        <div>
          <Select
            options={TokensList}
            className="w-full min-w-[160px] text-gray-700 border border-[#1b2133] shadow-sm mt-2 md:mt-0"
            classNamePrefix="Select"
            components={{ Option, SingleValue }}
            onChange={handleSelectChangeToken}
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
            placeholder={priceco}
            className="text-gray-300 bg-[#131A2A] rounded-[5px] border-[1px] border-[#1b2133] w-full md:px-4 py-2 pl-3 pr-10"
            inputMode="numeric"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/,/g, ".");
            }}
            onChange={(e) => setPriceco(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mr-2 mt-1">
            <span className="text-gray-500 ">$</span>
          </div>
        </div>
      </div>
      <div className="mt-6 md:flex justify-between ">
        <div className="flex md:block">
          <div className="md:px-4">Max Amount</div>
          <div className="md:px-4 text-xs text-[#5285F6] ml-2 mt-2 md:ml-0 md:mt-0 pb-2 md:pb-0">
            Amount in KWH
          </div>
        </div>
        <div className="relative md:mr-4">
          <input
            type=""
            placeholder={amountco}
            inputMode="numeric"
            className="text-gray-300 bg-[#131A2A] rounded-[5px] border-[1px] border-[#1b2133] w-full md:px-4 py-2 pl-3 pr-10"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/,/g, ".");
            }}
            onChange={(e) => setAmountco(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mr-2 mt-1">
            <span className="text-gray-500 ">KWH</span>
          </div>
        </div>
      </div>
      <div className="mt-6 md:flex justify-between md:mr-4">
        <p className="md:px-4 py-2">Location</p>
        <div
          onClick={handleClickModal}
          className="text-center bg-[#131A2A] rounded-[5px] border-[1px] border-[#1b2133] md:px-4 py-2 hover:cursor-pointer text-md"
        >
          <p className="">Select Location</p>
        </div>
      </div>
      <div className="mt-6 md:px-4 ">
        <div>Selected Location : </div>
        <div className=" text-[#5285F6] mt-2 md:mt-2">{address}</div>
      </div>
      <div className="mt-4 md:px-4 md:flex">
        <div>Estimated Revenue : </div>
        <div className="md:ml-2 text-[#5285F6] mt-2 md:mt-0">
          {revenue.toFixed(2)} <>USD</>
        </div>
      </div>
      <div>
        <div className="mt-6 text-center md:px-4 pb-2">
          <div
            onClick={handleGoToSummary}
            className="py-3 px-4 rounded-[10px] hover:cursor-pointer font-kanit font-bold text-xl bg-[#26365A] text-blue-400 hover:text-[#5285F6]"
          >
            <Submitbtn />
          </div>
        </div>
      </div>
    </div>
  );
}