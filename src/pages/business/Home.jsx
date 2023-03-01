import React, { useEffect, useState } from 'react';
import BusinessNav from '../../components/BusinessNav';
import HelpLogo from '../../assets/images/help.png';
import AnnouncementLogo from '../../assets/images/announcement.png';
import TrustCFA from '../../utils/TrustCFA.json';
import { ethers } from 'ethers';
import { useForm } from 'react-hook-form';
import useWalletCheck from '../../hooks/useWalletCheck';
import ContractAddresses from "../../utils/contractAddresses.json";

export default function BusinessHome() {
  const [numberOfEmployees, setNumberOfEmployees] = useState(null);
  const [moneyIn, setMoneyIn] = useState(null);

	const [ , walletAddress, ] = useWalletCheck();

	useEffect(() => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const _contract = new ethers.Contract(
					ContractAddresses[80001].TrustCFA[0],
					TrustCFA.abi,
					signer
				);
				contract = _contract;
			}
		} catch (e) {
			console.error(e);
		}
	}, []);

  useEffect(() => {
		if (!walletAddress) return;
    const getTotal = async () => {
			try {
				const { ethereum } = window;
	
				if (ethereum) {
					const provider = new ethers.providers.Web3Provider(ethereum);
					const signer = provider.getSigner();
					const contract = new ethers.Contract(
						ContractAddresses[80001].TrustCFA[0],
						TrustCFA.abi,
						signer
					);
					const totalCompanyEmployees = await contract.getTotalCompanyEmployees(walletAddress);
          const totalPaying = await contract.getTotalPaying(walletAddress);
					console.log('totalCompanyEmployees :>> ', totalCompanyEmployees);
					console.log('totalPaying :>> ', totalPaying);
          setNumberOfEmployees(Number(totalCompanyEmployees));
          setMoneyIn(Number(totalPaying));
				}
			} catch (e) {
				console.error(e);
			}
    }
    getTotal();
  }, [walletAddress]);

	const { register, handleSubmit } = useForm();

  const convertIntervalToInt = (interval) => {
    const day = 60 * 60 * 24;
    if (interval === "Daily") return Number(day);
    if (interval === "Weekly") return Number(day * 7);
    if (interval === "Monthly") return Number(day * 30);
  }

	const submitForm = async ({ employeeAddress, interval, salary }) => {
    const amount = Number(salary * 10**18);
    const _interval = convertIntervalToInt(interval);
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const _contract = new ethers.Contract(
					ContractAddresses[80001].TrustCFA[0],
					TrustCFA.abi,
					signer
				);
				const response = await _contract._addemployee(employeeAddress, BigInt(amount), _interval);
				console.log("Add Employee ==>", response);
				alert("Employee created successfully");
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<BusinessNav />
			<section className="m-4">
				<div class="row">
					<div class="col-8">
						<div className="row">
							<div className="col">
								<div class="card border-0 card_shadow bg-primary">
									<div class="card-body p-4 text-white">
										<div>Account Balance</div>
										<p className="h3 fw-normal mt-2 mb-4">${moneyIn}</p>
										<div>
											<button type="button" className="btn btn-light px-4 text-primary">
												Add Money
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="col">
								<div class="card border-0 card_shadow">
									<div class="card-body p-4 text-dark">
										<div>Money In</div>
										<p className="h3 fw-normal mt-2 mb-4">${moneyIn}</p>
										<div className="d-flex justify-content-between gap-3">
											<button
												type="button"
												className="btn btn-primary px-3 text-nowrap text-white"
											>
												View Transactions
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card border-0 card_shadow">
							<div class="card-body p-4 text-dark">
								<div>Money Out</div>
								<p className="h3 fw-normal mt-2 mb-4">$15,000</p>
								<div className="d-flex justify-content-between">
									<button type="button" className="btn btn-primary text-white">
										View Transactions
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* SEND MONEY */}
				<div class="row mt-4">
					<div className="col-12">
						<div class="card border-0 card_shadow">
							<div class="card-body">
								<div className="row">
									<div className="col-6">
										<p>Create Payment Plan</p>
										<div>
											<div class="mb-3 row">
												<label for="staticEmail" class="col-sm-4 col-form-label">
													Recepient 1
												</label>
												<div class="col-sm-8">
													<input
														type="text"
														class="form-control"
														id="staticEmail"
														placeholder="Add wallet address, email, mobile number"
														{...register('employeeAddress')}
													/>
												</div>
											</div>
											<div class="mb-3 row">
												<label for="inputPassword" class="col-sm-4 col-form-label">
													Recepient 2
												</label>
												<div class="col-sm-8">
													<input
														type="text"
														class="form-control"
														id="inputPassword"
														placeholder="Add wallet address, email, mobile number"
														// { ...register("recepientTwo") }
													/>
												</div>
											</div>
										</div>
										<div className="mx-auto">
											<div className="d-flex justify-content-between">
												<button
													type="button"
													className="btn btn-primary px-3 text-white ms-auto"
												>
													Add Recepient
												</button>
												<button
													type="button"
													className="btn btn-primary px-3 text-white ms-4 w-25"
													onClick={handleSubmit((data) => submitForm(data))}
												>
													Next
												</button>
											</div>
										</div>
									</div>
									<div className="col-2">
										<p>&nbsp;</p>
										<div className="">
											<div className="mb-3 row">
												<div className="col-12">
													<input
														type="text"
														class="form-control text-center"
														id="recepientOneAmount"
														placeholder="Amount"
														{...register('salary')}
													/>
												</div>
											</div>
											<div class="mb-3 row">
												<div className="col-12">
													<input
														type="text"
														class="form-control text-center"
														id="recepientTwoAmount"
														placeholder="Amount"
														// { ...register("recepientTwoAmount") }
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-2">
										<p>&nbsp;</p>
										<div className="">
											<div className="mb-3 row">
												<div className="col-12">
													<select
														class="form-select"
														{...register('reasonOne')}
														aria-label="select reason"
													>
														<option selected>Reason</option>
														<option value="1">Payroll</option>
														<option value="2">Travel</option>
														<option value="3">Subscriptions</option>
														<option value="3">Professional Fees</option>
														<option value="3">Utilities</option>
													</select>
												</div>
											</div>
											<div class="mb-3 row">
												<div className="col-12">
													<select class="form-select" aria-label="select reason">
														<option selected>Reason</option>
														<option value="1">Payroll</option>
														<option value="2">Travel</option>
														<option value="3">Subscriptions</option>
														<option value="3">Professional Fees</option>
														<option value="3">Utilities</option>
													</select>
												</div>
											</div>
										</div>
									</div>
									<div className="col-2">
										<p>&nbsp;</p>
										<div className="">
											<div className="mb-3 row">
												<div className="col-12">
													<select class="form-select" {...register('interval')}>
														<option selected>Interval</option>
														<option value="Daily">Daily</option>
														<option value="Weekly">Weekly</option>
														<option value="Monthly">Monthly</option>
													</select>
												</div>
											</div>
											<div class="mb-3 row">
												<div className="col-12">
													<select class="form-select">
														<option selected>Interval</option>
														<option value="Daily">Daily</option>
														<option value="Weekly">Weekly</option>
														<option value="Monthly">Monthly</option>
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="col-4">
            <div className="card border-0 h-100">
              <div className="card-body card_shadow">
              <p>Announcement</p>
              <div className="d-flex justify-content-center">
                <img src={AnnouncementLogo} width={80} />
              </div>
              </div>
            </div>
          </div> */}
				</div>
				{/* CREATE AN INVOICE  */}
				<div class="row mt-4">
					<div className="col-8">
						<div class="card border-0 card_shadow">
							<div class="card-body">
								<div className="row">
									<p>Manage Payment Plan</p>
									<div className="col-2"></div>
									<div className="col-6">
										<div>
											<div class="mb-3 row">
												<input
													type="text"
													class="form-control"
													id="invoiceName"
													placeholder="Customer wallet address"
												/>
											</div>
											<div class="mb-3 row">
												<input
													type="text"
													class="form-control"
													id="invoiceName"
													placeholder="Customer wallet address"
												/>
											</div>
										</div>
										<div className="mx-auto">
											<div className="d-flex justify-content-between">
												<button
													type="button"
													className="btn btn-primary px-5 text-white ms-auto"
												>
													Remove
												</button>
												<button
													type="button"
													className="btn btn-primary px-3 text-white ms-4"
												>
													Update
												</button>
											</div>
										</div>
									</div>
                  <div className="col-4">
                    <div className="text-center">
                      <p className="h5">Employees</p>
                      <p className="lead fw-bold">
                        {numberOfEmployees}
                      </p>
                    </div>
                  </div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-4">
						<div className="card border-0 h-100">
							<div className="card-body card_shadow">
								<p>Help Center</p>
								<div className="d-flex justify-content-center">
									<img src={HelpLogo} width={250} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
