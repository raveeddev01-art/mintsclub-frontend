import React from 'react';
import { CHAINS_INTERFACE } from '../../../interfaces/components';
import { CHAIN_CURRENCY } from '../../../utils/helpers/helpers';
import { isUserLoggedIn } from '../../../utils/helpers/ethereum';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { putonsale } from '../../../utils/web3';
import { listItemForFixedPriceSolana } from '../../../utils/solana/helper';
import { useWallet } from '@solana/wallet-adapter-react';
import { ENV } from '../../../config/config';

const FixedPriceListing = ({ data, blockchainType }: any) => {
	const {
		// submit,
		onChange,
		decimalNumberValidator,
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
	} = data;
	const history: any = useHistory();
	const location: any = useLocation();
	const wallet = useWallet();
	const submit = (e: any) => {
		e.preventDefault();
		if (isUserLoggedIn(history, nftDetail?.blockchainType)) {
			if (
				(blockchainType !== 'solana' &&
					!nftDetail?.user?.isApproved &&
					nftDetail?.isApproved) ||
				!nftDetail.isApproved
			) {
				setShow(true);
				return '';
			}

			handleFixedPriceAuction();
		}
	};
	const handleFixedPriceAuction = () => {
		const fixedConfig = { ...fixedPriceConfig };
		const activityPayload = getActivityPayload();

		const price = Number(fixedConfig.price.amount);
		if (price === 0) {
			toast.error('Price should be greater then 0');
			return '';
		}
		const payload = {
			nftId: location.state._id,
			sellingMethod,
			sellingConfig: JSON.stringify(fixedConfig),
			copiesForAuction: copies,
		};
		openForSale(activityPayload, payload, fixedConfig, price);
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
			if (blockchainType?.toLowerCase() === 'solana') {
				res = await listItemForFixedPriceSolana(wallet, price, nftDetail?.mint);
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
				// payload.signature = res.data;
			}
			for (const key in payload) formData.append(key, payload[key]);
			insertActivity(activityPayload);
			insertAuction(payload);
		} catch (err: any) {
			console.log(err, 'error');
			setLoader(false);
			toast.error(err);
		} finally {
			setLoader(false);
		}
	};
	return (
		<form onSubmit={submit}>
			<div className="row g-4 g-xl-5">
				<div className="col-md-6">
					<div className="sell-detail-box">
						<h5>Price:*</h5>
						<hr />
						<div className="sell-inp-container d-flex align-items-center">
							<input
								type="text"
								name="fixedPriceConfig.price.amount"
								placeholder="Amount"
								style={{
									borderRadius: '4px',
								}}
								maxLength={8}
								onChange={(e) => {
									if (e.target.value === '00') {
										return '';
									}
									onChange(e);
								}}
								onKeyDown={(e) => decimalNumberValidator(e)}
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
				<div className="col-md-6">
					<div className="sell-detail-box">
						<h5>
							No of Copies:*{' '}
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
								onKeyDown={(e) => decimalNumberValidator(e)}
								value={copies}
								required
								autoComplete="off"
							/>
							<div className="inp-tag">Copies</div>
						</div>
					</div>
				</div>
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
									<span className="ms-2">2.5%</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="sell-btn-container d-flex justify-content-center justify-content-lg-start">
					<button
						className="btn btn-linear-gradient sell-btn-completed"
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
