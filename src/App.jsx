import HomeBody from './components/HomeBody';
import HomeNavbar from './components/HomeNavbar';
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import useWalletCheck from './hooks/useWalletCheck';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

function App() {
  
  const [ currentAccount, _, actions ] = useWalletCheck();
  
  const navigate = useNavigate();

  const connectWallet = useCallback( async (destination) => {
    try {

      //  Create WalletConnect Provider
      const provider = new WalletConnectProvider({
        infuraId: "8c0b7dedc04f4035a217cc1dc82b5426",
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();

      const web3 = new Web3(provider);

      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      // const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      actions.setCurrentAccount(accounts[0]);
      actions.setWalletAddress(accounts[0]);

      navigate(`/${destination}/dashboard`);

    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <HomeNavbar currentAccount={currentAccount} />
      <HomeBody handleWalletConnect={connectWallet} />
    </>
  )
}

export default App;
