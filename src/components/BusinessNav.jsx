import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useWallet } from '../store';

export default function BusinessNav() {
	const [userConnectWallet, setUserConnectWallet] = useState(false);
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

  const connectWallet = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);

    } catch (e) {
      console.error(e);
    }
  }, []);

	return (
		<nav className="navbar navbar-expand-lg bg-white">
			<div className="container-fluid">
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link fw-semibold" aria-current="page" href="#">
								Send Mass Payment
							</a>
						</li>
						<Link to="/" className="text-decoration-none">
							<li className="nav-item">
								<a className="nav-link fw-semibold">
									Money In
								</a>
							</li>
						</Link>
						<li className="nav-item">
							<a className="nav-link fw-semibold">
								Money Out
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link fw-semibold" href="#">
								Invoicing
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link fw-semibold" href="#">
								Transaction
							</a>
						</li>
						<li className="nav-item mx-3">
							{
								!userConnectWallet && <button className="btn btn-primary" disabled={currentAccount} onClick={connectWallet}>Connect Wallet</button>
							}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
