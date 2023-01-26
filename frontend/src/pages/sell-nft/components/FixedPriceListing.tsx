import React, { useState } from 'react';
import { CHAINS_INTERFACE } from '../../../interfaces/components';
import { CHAIN_CURRENCY } from '../../../utils/helpers/helpers';
import { isUserLoggedIn } from '../../../utils/helpers/ethereum';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { checkIsApprovedForAll, putonsale } from '../../../utils/web3';
import {
	getSolanaBalance,
	listItemForFixedPriceSolana,
} from '../../../utils/solana/helper';
import { useWallet } from '@solana/wallet-adapter-react';
import { ENV } from '../../../config/config';
import {
	checkAlgoBalance,
	createFixedPriceApp,
	setupSale,
} from '../../../utils/algorand';
import algosdk from 'algosdk';

const FixedPriceListing = ({ data, blockchainType, connectedAddress }: any) => {
	const {
		// submit,
		onChange,
		decimalnumbervalidator,
		fixedPriceConfig,
		copiesError,
		nftDetail,
		remainingCopies,
		setCopiesError,
		copies,
		setCopies,
		setShow,
		getActivityPayload,
		sellingMethod,
		insertActivity,
		insertAuction,
		setLoader,
		approvalStatus,
		setIsButtonDisabled,
		isButtonDisabled,
	} = data;
	const history: any = useHistory();
	const location: any = useLocation();
	const wallet = useWallet();
	const submit = async (e: any) => {
		setIsButtonDisabled(true);
		e.preventDefault();
		if (isUserLoggedIn(history, nftDetail?.blockchainType)) {
			if (blockchainType !== 'solana' && blockchainType !== 'algorand') {
				const isApproved = await checkIsApprovedForAll(
					ENV.getUserKeys('address')?.address
				);

				if (!isApproved) {
					setShow(true);
					return '';
				}
			}

			handleFixedPriceAuction();
		}
	};
	const handleFixedPriceAuction = () => {
		setLoader(true);
		const fixedConfig = { ...fixedPriceConfig };
		const activityPayload = getActivityPayload();

		const price = Number(fixedConfig.price.amount);
		if ( blockchainType=== 'algorand' && price < 0.005) {
			toast.error('Price should be greater than 0.005');
			setLoader(false);
			setIsButtonDisabled(false);
			return '';
		}
		if ((blockchainType !=='algorand') && price === 0) {
			toast.error('Price should be greater than 0');
			setLoader(false);
			setIsButtonDisabled(false);
			return '';
		}
		if (nftDetail?.blockchainType === 'solana') {
			setCopies(0);
		}
		const payload = {
			nftId: location.state._id,
			sellingMethod,
			sellingConfig: JSON.stringify(fixedConfig),
			copiesForAuction: copies,
		};
		openForSale(activityPayload, payload, fixedConfig, price);
		if (nftDetail.lazyMinted === false) {
			toast.warning("Please don't refresh/switch page during transaction.", {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'light',
				closeButton: false,
			});
		}
	};

	const openForSale = async (
		activityPayload: any,
		payload: any,
		fixedConfig: any,
		price: any
	) => {
		const formData = new FormData();
		try {
			let res = null;
			if (
				blockchainType?.toLowerCase() === 'solana' &&
				!nftDetail?.lazyMinted
			) {
				const walletBalance = await getSolanaBalance(wallet);

				const gasFee: any = process.env.REACT_APP_SOLANA_MIN_BALANCE;

				if (walletBalance < gasFee) {
					toast.error(
						'Insufficeint funds for this transaction. Please recharge your wallet.'
					);
					setLoader(false);
					setIsButtonDisabled(false);
					return;
				}
				res = await listItemForFixedPriceSolana(wallet, price, nftDetail?.mint);
			}
			if (
				blockchainType?.toLowerCase() === 'algorand' &&
				!nftDetail?.lazyMinted
			) {
				if (nftDetail?.appId === 0) {
					const response: any = await createFixedPriceApp(
						nftDetail?.tokenId,
						nftDetail?.creator?.address,
						connectedAddress,
						price,
						nftDetail?.algoLazyMinted,
						setLoader
					);

					if (response?.success) {
						payload.sellId = response.appID;
						payload.sellerTradeState = connectedAddress;
					} else {
						const res = await checkAlgoBalance(
							connectedAddress,
							response?.message
						);
						setLoader(false);
						toast.error(res?.err);
						setIsButtonDisabled(false);
						return;
					}
				} else {
					const txnsArray: any = [];
					res = await setupSale(
						price,
						nftDetail?.appId,
						nftDetail?.tokenId,
						connectedAddress,
						txnsArray,
						nftDetail?.algoLazyMinted,
						setLoader
					);

					if (res.txId) {
						payload.sellId = nftDetail?.appId;
						payload.sellerTradeState = connectedAddress;
					} else {
						const response = await checkAlgoBalance(
							connectedAddress,
							res?.message
						);
						setLoader(false);
						toast.error(response?.err);
						setIsButtonDisabled(false);
						return;
					}
				}
			}
			if (
				blockchainType?.toLowerCase() !== 'solana' &&
				blockchainType?.toLowerCase() !== 'algorand' &&
				!nftDetail?.lazyMinted
			) {
				res = await putonsale(
					nftDetail.tokenId,
					copies,
					fixedConfig.price.amount,
					nftDetail.contractAddress
				);
				payload.sellId = res;
			}

			activityPayload.price = price;
			payload.blockchainType = blockchainType.toLowerCase();
			if (blockchainType?.toLowerCase() === 'solana') {
				payload.sellerTradeState = res;
			}

			if (nftDetail.lazyMinted) {
				payload.sellId = 0;
				if (blockchainType?.toLowerCase() === 'solana') {
					payload.sellerTradeState = 'null';
				}
				// payload.signature = res.data;
			}
			for (const key in payload) formData.append(key, payload[key]);
			insertActivity(activityPayload);
			insertAuction(payload);
		} catch (err: any) {
			console.log(err, 'error');
			setIsButtonDisabled(false);
			setLoader(false);
			toast.error(err.message);
		} finally {
			setLoader(false);
			setIsButtonDisabled(false);
		}
	};

	return (
		<form onSubmit={submit}>
			<div className="row g-4 g-xl-5">
				<div
					className={` ${
						blockchainType === 'solana' ? 'col-md-12' : 'col-md-6'
					}`}
				>
					<div className="sell-detail-box">
						<h5>Price:*</h5>
						<hr />
						<div className="sell-inp-container d-flex align-items-center">
							<input
								type="number"
								name="fixedPriceConfig.price.amount"
								placeholder="Amount"
								style={{
									borderRadius: '4px',
								}}
								min={0}
								step={0.000001}
								onChange={(e) => {
									if (
										e.target.value === '00' ||
										e.target.value.length > 8 ||
										(e.target.value.includes('.') &&
											e.target.value.toString().split('.')[1].length > 6)
									) {
										return '';
									}
									onChange(e);
								}}
								onKeyDown={(e) => decimalnumbervalidator(e)}
								value={fixedPriceConfig.price.amount}
								required
								autoComplete="off"
							/>
							<div className="inp-tag">
								{
									CHAIN_CURRENCY[
										nftDetail?.blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
									]
								}
							</div>
						</div>
					</div>
				</div>
				{blockchainType !== 'solana' && blockchainType !== 'algorand' && (
					<div className="col-md-6">
						<div className="sell-detail-box">
							<h5>
								No. of Copies:*{' '}
								{copiesError && (
									<span className="text-danger ms-2 error-msg">{`This NFT has only ${remainingCopies} copies`}</span>
								)}
							</h5>
							<hr />
							<div className="sell-inp-container d-flex align-items-center">
								<input
									type="number"
									name="copies"
									placeholder="Copies"
									style={{
										borderRadius: '4px',
									}}
									min={'1'}
									onChange={(e: any) => {
										if (+e.target.value > remainingCopies) {
											setCopiesError(true);
											return false;
										}
										if (
											(e.target.value === 0 && copies === '') ||
											e.target.value.includes('.')
										) {
											return false;
										}
										setCopiesError(false);
										setCopies(e.target.value);
									}}
									onKeyDown={(e) => decimalnumbervalidator(e)}
									value={copies}
									required
									autoComplete="off"
								/>
								<div className="inp-tag">Copies</div>
							</div>
						</div>
					</div>
				)}
				<div className="col-md-6">
					<div className="sell-detail-box">
						<h5>Fees:</h5>
						<hr />
						<div className="fee-details d-flex align-items-center justify-content-between">
							<div>
								<p>
									Service Fee:
									<span className="ms-2">2.5%</span>
								</p>
							</div>
							<div>
								<p>
									Creator Royalty:
									<span className="ms-2">1.5%</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="sell-btn-container d-flex justify-content-center justify-content-lg-start">
					<button
						className="btn btn-linear-gradient sell-btn-completed"
						disabled={
							approvalStatus === 'pending' ||
							approvalStatus === 'in-progress' ||
							isButtonDisabled
						}
						type="submit"
					>
						Complete Listing
					</button>
				</div>
			</div>
		</form>
	);
};
const mapStateToProps = (state: any) => ({
	blockchainType: ENV.getUserKeys('blockchainType')?.blockchainType,
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(FixedPriceListing);
