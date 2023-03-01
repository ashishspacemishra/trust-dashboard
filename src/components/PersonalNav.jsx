import { useState } from 'react';
import { Link } from "react-router-dom";

export default function PersonalNav() {
	const [userConnectWallet, setUserConnectWallet] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

	const connectWallet = () => {}

	return (
		<nav class="navbar navbar-expand-lg bg-white">
			<div class="container-fluid">
				<div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
					<ul class="navbar-nav">
						<Link to="/" className="text-decoration-none">
							<li class="nav-item">
								<a class="nav-link fw-semibold">
									Add Income
								</a>
							</li>
						</Link>
						<li class="nav-item">
							<a class="nav-link fw-semibold">
								Pay or Request
							</a>
						</li>
						<li class="nav-item">
							{
								!userConnectWallet && <button className="btn btn-primary" disabled={currentAccount} onClick={connectWallet}>Connected</button>
							}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
