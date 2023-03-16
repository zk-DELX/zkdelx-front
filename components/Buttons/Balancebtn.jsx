import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { getAccount } from "@wagmi/core";
import { FaCoins } from "react-icons/fa";
import Tokens from "../../utils/TokensBalance";
import { fetchBalance, getNetwork } from "@wagmi/core";

import USDT from "../../assets/USDT.png";
import USDC from "../../assets/USDC.png";
import DAI from "../../assets/DAI.png";

function balancebtn() {
  const { chain, chains } = getNetwork();
  const [connected, setConnected] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const account = getAccount();
  const [balances, setBalances] = useState({
    dai: "0",
    usdt: "0",
    usdc: "0",
  });

  useEffect(() => {
    const intervalId = setInterval(async () => {
      async function checkBalance() {
        // For Scroll
        if (account.status == "connected" && chain.id == 534353) {
          try {
            const DAIBalance = await fetchBalance({
              address: account.address,
              token: Tokens[0][0][0].address,
            });
            const USDTBalance = await fetchBalance({
              address: account.address,
              token: Tokens[0][1][0].address,
            });
            const USDCBalance = await fetchBalance({
              address: account.address,
              token: Tokens[0][2][0].address,
            });
            setBalances({
              dai: DAIBalance,
              usdt: USDTBalance,
              usdc: USDCBalance,
            });
          } catch (e) {
            console.log("fetching balance");
          }
          console.log(balances);
        }

        // For PolyZK
        if (account.status == "connected" && chain.id == 1442) {
          try {
            const DAIBalance = await fetchBalance({
              address: account.address,
              token: Tokens[1][0][0].address,
            });
            const USDTBalance = await fetchBalance({
              address: account.address,
              token: Tokens[1][1][0].address,
            });
            const USDCBalance = await fetchBalance({
              address: account.address,
              token: Tokens[1][2][0].address,
            });
            setBalances({
              dai: DAIBalance,
              usdt: USDTBalance,
              usdc: USDCBalance,
            });
            console.log(balances);
          } catch (e) {
            console.log("fetching balance");
          }
        }
      }
      checkBalance();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [account.status, chain]);

  useEffect(() => {
    if (account.status == "connected") {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [account.status]);

  return (
    <div>
      {connected && (
        <div className=" font-epilogue">
          <div
            className="p-2 bg-[#1A1B1F] rounded-[12px] flex  hover:cursor-pointer border-[1px] border-[#1b2133]"
            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
          >
            <FaCoins className="mr-2 mt-1" />
            <p className="">Balances</p>
          </div>
          {isBalanceVisible && (
            <div
              className="fixed z-10 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-md flex justify-center items-center"
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
            >
              <div className="p-4 bg-[#1A1B1F] rounded-[15px] text-white  border-[0.1px] border-[#28292e] min-w-[340px]">
                <div className="flex justify-between">
                  <p className="text-xl font-bold font-kanit">
                    Stable Coins Balances
                  </p>
                  <AiFillCloseCircle className="text-[22px] mt-[-1px] hover:cursor-pointer" />
                </div>
                <div className="flex mt-4 ">
                  <Image
                    src={DAI}
                    alt={"dai"}
                    width={35}
                    height={35}
                    className="mr-4"
                  />
                  <p className="text-xl font-bold mt-2">
                    {balances.dai.formatted} DAI
                  </p>
                </div>
                <div className="flex mt-4 ">
                  <Image
                    src={USDT}
                    alt={"usdt"}
                    width={35}
                    height={35}
                    className="mr-4"
                  />
                  <p className="text-xl font-bold mt-2">
                    {balances.usdt.formatted} USDT
                  </p>
                </div>
                <div className="flex mt-4 ">
                  <Image
                    src={USDC}
                    alt={"usdc"}
                    width={35}
                    height={35}
                    className="mr-4"
                  />
                  <p className="text-xl font-bold mt-2">
                    {balances.usdc.formatted} USDC
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default balancebtn;
