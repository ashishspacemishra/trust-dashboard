import { useCallback, useState } from "react";
import Logo from "../assets/logo.png"
import { useWallet } from "../store";

export default function HomeNavbar({ currentAccount }) {
	return (
		<nav className="navbar bg-white">
			<div className="container-fluid">
				<a className="navbar-brand ms-3">
					<img src={Logo} width={100} />
				</a>
				<div className="d-flex">
          <div className="d-flex align-items-center">
			{
				currentAccount ? <button className="btn btn-success">Connected</button> : <button className="btn btn-secondary">Not Connected</button>
			}
          </div>
        </div>
			</div>
		</nav>
	);
}
