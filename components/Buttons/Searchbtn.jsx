import React, { useState, useEffect } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { getAccount } from "@wagmi/core";

function Searchbtn() {
  const [connected, setConnected] = useState(false);
  const account = getAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    if (account.status == "connected") {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [account.status]);

  return (
    <div>
      {connected ? (
        <p>Search</p>
      ) : (
        <div onClick={openConnectModal}>Connect Wallet</div>
      )}
    </div>
  );
}

export default Searchbtn;
