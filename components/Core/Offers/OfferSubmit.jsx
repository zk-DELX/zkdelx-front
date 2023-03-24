import { 
  usePrepareContractWrite, 
  useContractWrite, 
  useWaitForTransaction,
  useNetwork,
  useAccount 
} from 'wagmi'
import { BsInfoCircleFill } from "react-icons/bs";
import Submitbtn from "../../Buttons/Submitbtn";
import Tokens from "../../../utils/TokensBalance";
import ABI from "../../../src/abi.json";
import useDebounce from "../../../utils/useDebounce";

function OfferSubmit(props) {
  const account = useAccount();
  const {chain, chains} = useNetwork();
  const debouncedOfferid = useDebounce(props.offerid, 500);
  const debouncedAmountco = useDebounce(+props.amountco, 500);
  const debouncedPriceco = useDebounce(parseInt(+props.priceco * 100), 500);
  const debouncedAddress = useDebounce(props.address, 500);

  const contractAddress = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS;
  const obtainTokenContractAddress = () => {
    var tokenAddress = "";
    if (account.status == "connected" && chain.id == 534353) {
      switch (props.token) {
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
  const tokenAddress = obtainTokenContractAddress();
  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: ABI,
    chainId: chain.id,
    functionName: 'submitOffer',
    args: [debouncedOfferid, debouncedAmountco, debouncedPriceco, tokenAddress, debouncedAddress],
    enabled: Boolean(debouncedAmountco),
  });


  const { data, write, isError } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
  hash: data?.hash,
  }) 
  
  // submit to Polybase
  const handleSubmitOffer = async () => {
    const currentTime = new Date().getTime();
    const offerObj = {
      offerID: props.offerid,
      sellerAccount: account.address,
      amount: +props.amountco,
      price: +props.priceco,
      location: props.address,
      submitTime: currentTime,
      status: props.status,
    };
    console.log(offerObj);
    const response = await fetch("/api/storeoffer", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(offerObj),
    });
  
    if (response.status == 201) {
      props.funcnotify("submitToPolybaseSuccess");
    } else if (response.status == 409) {
      props.funcnotify("submitToPolybaseConflict");
    }
  }
  
  const handlebacktoCreate = () => {
    console.log("go back to create!");
    props.func(0);
  };

  return (
    <div className="mt-[1rem] 2xl:mt-[6rem] w-[550px] font-epilogue bg-[#0D111C] border-[1px] border-[#1b2133] p-4 rounded-[15px]">
      <div className="flex flex-row justify-between">
        <div className="text-3xl">Offer Summary</div>
        <div className="hover:cursor-pointer">
          <BsInfoCircleFill />
        </div>
      </div>

      <div className="mt-8 flex justify-between ">
        <div>
          <div className="md:px-4 py-1">Offer ID</div>
        </div>
        <div className="md:mr-4">{props.offerid}</div>
      </div>
      <div className="mt-4 flex justify-between ">
        <div>
          <div className="md:px-4 py-1">Seller ID</div>
        </div>
        <div
          className="md:mr-4"
          dangerouslySetInnerHTML={{ __html: props.sellerid }}
        />
      </div>

      <div className="mt-4 flex justify-between ">
        <div className="flex md:block">
          <div className="md:px-4">Price Rate</div>
        </div>
        <div className="md:mr-4">
          <p>${props.priceco} per KWH</p>
        </div>
      </div>
      <div className="mt-6 flex justify-between ">
        <div className="flex md:block">
          <div className="md:px-4">Max Amount</div>
        </div>
        <div className=" md:mr-4">
          <p>{props.amountco} KWH</p>
        </div>
      </div>

      <div className="mt-6 md:px-4 ">
        <div>Offer Location : </div>
        <div className=" text-[#5285F6] mt-2 md:mt-2">{props.address}</div>
      </div>
      <div className="mt-4 md:px-4 md:flex">
        <div>Estimated Revenue : </div>
        <div className="md:ml-2 text-[#5285F6] mt-2 md:mt-0">
          {props.revenue} <>USD</>
        </div>
      </div>
      <div>
        <div className="mt-6 text-center md:px-4 pb-2 flex justify-evenly space-x-4">
          <div
            onClick={handlebacktoCreate}
            className="py-3 px-4 rounded-[10px] hover:cursor-pointer font-kanit font-bold text-xl bg-[#26365A] text-blue-400 hover:text-[#5285F6] w-full"
          >
            Back
          </div>
          <div
            disabled={!write}
            onClick={() => {write?.(); handleSubmitOffer();}}
            className="py-3 px-4 rounded-[10px] hover:cursor-pointer font-kanit font-bold text-xl text-white bg-[#3b5dae] hover:text-[#5285F6] w-full"
          >
            <Submitbtn />           
          </div>
        </div>
      </div>
      <div>
        {isSuccess && (
          <div>
            {props.funcnotify("submitedToChain")}
            Successfully submitted !
            <a 
              href={`${chain.blockExplorers.etherscan.url}tx/${data?.hash}` } 
              target="_blank"
              className=" text-[#5285F6] mt-2 md:mt-2"
              > Explore TX</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfferSubmit;