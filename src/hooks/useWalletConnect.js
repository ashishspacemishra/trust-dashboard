import { useCallback, useEffect, useState } from "react";
import { useWallet } from "../store";


export default function useWalletCheck() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [walletAddress, setWalletAddress] = useWallet(state => [state.walletAddress, state.setWalletAddress]);

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have a metamask");
        return;
      } else {
        console.log("We have the ethereum object ", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        setWalletAddress(account);
      } else {
        console.log("No authorized account found");
      }
    } catch(e) {
      console.error(e);
    }
  }, []);

	useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  
  return [ currentAccount, walletAddress, { setCurrentAccount, setWalletAddress } ]

}
