import moment from 'moment';
import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { CHAINS_INTERFACE } from '../../../interfaces/components';
import { CHAIN_CURRENCY } from '../../../utils/helpers/helpers';
import { isUserLoggedIn } from '../../../utils/helpers/ethereum';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { ENV } from '../../../config/config';
import { openNFTForBidding } from '../../../utils/web3';
import { connect } from 'react-redux';
import { createAuctionApp } from '../../../utils/algorand';
import { listItemForLiveAuction } from '../../../utils/solana/helper';
import { useWallet } from '@solana/wallet-adapter-react';

const AuctionListing = ({ data, blockchainType, connectedAddress }: any) => {
	const {
		// submit,
		onChange,
		decimalNumberValidator,
		timedAuctionConfig,
		remainingCopies,
		copiesError,
		nftDetail,
		setCopiesError,
		copies,
		setCopies,
		setShow,
		dateRangeInitialSettings,
		handleDateChange,
		getActivityPayload,
		sellingMethod,
		insertActivity,
		insertAuction,
		setLoader,
	} = data;
	const history: any = useHistory();
	const location: any = useLocation();
	const wallet: any = useWallet();
	const submit = (e: any) => {
		e.preventDefault();
		if (isUserLoggedIn(history, nftDetail?.blockchainType)) {
			const [hours, minutes] = timedAuctionConfig.duration.startTime.split(':');
			if (
				moment().unix() >
				timedAuctionConfig.duration.startDate
					.set('hours', hours)
					.set('minutes', minutes)
					.unix()
			) {
				toast.error('Time Should be in future');
				return;
			}
			if (
				(nftDetail?.blockchainType !== 'solana' &&
					!nftDetail?.user?.isApproved &&
					nftDetail?.isApproved) ||
				!nftDetail.isApproved
			) {
				setShow(true);
				return '';
			}
			setLoader(true);

			handleAuction();
		}
	};
	const handleAuction = () => {
		const timedConfig = JSON.parse(JSON.stringify(timedAuctionConfig));
		const activityPayload = getActivityPayload();
		const timedAuctionStartTime = new Date(timedConfig.duration.startDate);
		const timedAuctionEndTime = new Date(timedConfig.duration.endDate);
		//calculate end time
		timedConfig.duration.endDate = calclateStartOrEndTime(
			timedAuctionEndTime,
			timedConfig.duration.endTime
		);

		//calculate start time
		timedConfig.duration.startDate = calclateStartOrEndTime(
			timedAuctionStartTime,
			timedConfig.duration.startTime
		);
		setUpAuction(timedConfig, activityPayload);
	};
	const setUpAuction = (timedConfig: any, activityPayload: any) => {
		const auctionConfig = JSON.parse(JSON.stringify(timedConfig));
		delete auctionConfig.duration.startTime;
		delete auctionConfig.duration.endTime;
		delete auctionConfig.method;
		const price = Number(auctionConfig.startPrice.amount);
		auctionConfig.startPrice.amount = price;
		const payload = {
			nftId: location.state._id,
			userId: ENV.getUserKeys('_id')._id,
			sellingMethod,
			sellingConfig: JSON.stringify(auctionConfig),
			copiesForAuction: copies,
		};
		openBidding(auctionConfig, payload, activityPayload, price);
	};

	//Open for Bidding/Auction
	const openBidding = async (
		timedAuctionConfig: any,
		payload: any,
		activityPayload: any,
		price: any
	) => {
		const formData = new FormData();
		try {
			const auctionEndDate = timedAuctionConfig.duration.endDate;
			const auctionStartDate = timedAuctionConfig.duration.startDate;

			const biddingTime = Math.floor(
				new Date(auctionEndDate).getTime() / 1000.0
			);

			const startTime = Math.floor(
				new Date(auctionStartDate).getTime() / 1000.0
			);
			let result: any = null;
			if (
				blockchainType?.toLowerCase() !== 'solana' &&
				blockchainType?.toLowerCase() !== 'algorand' &&
				!nftDetail?.lazyMinted
			) {
				result = await openNFTForBidding(
					startTime,
					biddingTime,
					nftDetail?.tokenId,
					+copies,
					+price,
					nftDetail?.contractAddress
				);
			} else if (blockchainType === 'algorand') {
				result = await createAuctionApp(
					startTime,
					biddingTime,
					nftDetail?.tokenId,
					+copies,
					+price,
					connectedAddress
				);
			} else if (blockchainType === 'solana') {
				result = await listItemForLiveAuction(
					wallet,
					nftDetail?.mint,
					startTime,
					biddingTime
				);

				if (!result?.success) {
					setLoader(false);
					toast.error(result?.message);
					return;
				}
			}

			if (result) {
				activityPayload.price = price;
				// payload.sellId = Number(result);
				payload.blockchainType = blockchainType;
				if (blockchainType?.toLowerCase() === 'solana') {
					payload.txnHash = result?.txnHash;
					payload.sellerPublicKey = wallet.publicKey?.toBase58();
				} else {
					payload.sellId = Number(result);
				}
				for (const key in payload) formData.append(key, payload[key]);
				insertActivity(activityPayload);
				insertAuction(payload);
			}
		} catch (err: any) {
			setLoader(false);
			toast.error(err);
		}
	};
	const calclateStartOrEndTime = (auctionConfig: any, startOrEndTime: any) => {
		let time = auctionConfig.toString();
		time = time.slice(0, 15) + ' ' + startOrEndTime + ':00' + time.slice(24);
		return time;
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
								type="text"
								name="timedAuctionConfig.startPrice.amount"
								placeholder="Amount"
								maxLength={8}
								style={{
									borderRadius: '4px',
								}}
								onChange={(e: any) => {
									if (e.target.value === '00') {
										return false;
									} else {
										onChange(e);
									}
								}}
								onKeyDown={(e) => decimalNumberValidator(e)}
								value={timedAuctionConfig.startPrice.amount}
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
				{blockchainType !== 'solana' && (
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
									maxLength={3}
									style={{
										borderRadius: '4px',
									}}
									min={'1'}
									max={`${nftDetail.copies}`}
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
				)}

				<div className="col-md-6">
					<div className="sell-detail-box">
						<h5>Duration:</h5>
						<hr />
						<div className="sell-date-picker">
							{/* @ts-ignore */}
							<DateRangePicker
								initialSettings={dateRangeInitialSettings}
								minDate={moment().toDate()}
								onApply={handleDateChange}
							>
								<button
									name="timedAuctionConfig.duration"
									className="calender-btn"
									type="button"
								>
									{moment(timedAuctionConfig.duration.startDate).format(
										'MMMM D, YYYY'
									)}{' '}
									-{' '}
									{moment(timedAuctionConfig.duration.endDate).format(
										'MMMM D, YYYY'
									)}
									&nbsp;&nbsp;&nbsp;
									<svg
										width="21"
										height="17"
										viewBox="0 0 21 17"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M21 1.54739V16.5821C20.8581 16.8395 20.6576 17 20.3179 17C15.0009 16.9966 9.68439 16.9956 4.3682 16.997C3.94412 16.997 3.69482 16.7648 3.69318 16.3732C3.69318 15.8887 3.69318 15.4043 3.69318 14.9193V14.7311H3.4395C2.51682 14.7311 1.59413 14.7311 0.671455 14.7311C0.36079 14.7311 0.139436 14.5973 0.0430038 14.3622C-0.0534283 14.127 0.0123195 13.9024 0.24025 13.7172C0.775972 13.2754 1.23759 12.7628 1.61002 12.1962C3.00993 10.1145 3.62742 7.82482 3.68769 5.39843C3.71783 4.19078 3.69427 2.98162 3.69591 1.77297C3.69591 1.35764 3.94083 1.13306 4.39285 1.13256C5.32905 1.13256 6.26525 1.13256 7.20144 1.13256H7.42773C7.42773 0.94886 7.42773 0.791913 7.42773 0.635469C7.42773 0.254957 7.68251 -0.00342589 8.04851 0.000106718C8.41451 0.00363932 8.65504 0.258494 8.65778 0.627399C8.65778 0.793936 8.65778 0.960974 8.65778 1.12196H11.7338C11.7338 0.948862 11.7338 0.786868 11.7338 0.624368C11.7338 0.256977 11.9874 0.00162069 12.3458 0.000106718C12.7041 -0.00140725 12.96 0.252436 12.9633 0.619322C12.9633 0.786869 12.9633 0.953911 12.9633 1.11792H16.0803C16.0803 0.933724 16.0803 0.764664 16.0803 0.594595C16.0858 0.255465 16.3406 0.00616261 16.683 0.000106718C17.0255 -0.00594917 17.3027 0.246379 17.3087 0.592574C17.312 0.767186 17.3087 0.94129 17.3087 1.13256H17.5504C18.427 1.13256 19.2998 1.14416 20.1743 1.12751C20.5556 1.11893 20.8373 1.21936 21 1.54739ZM19.7793 5.67548H4.91666C4.77146 8.56213 3.95946 11.2398 2.02643 13.5986H2.19081C6.89297 13.5986 11.5953 13.5969 16.2978 13.5936C16.4011 13.5868 16.4983 13.5462 16.5718 13.479C17.1097 12.9678 17.5737 12.3948 17.9525 11.7743C18.8253 10.3774 19.3448 8.86846 19.5963 7.28282C19.6812 6.75243 19.7168 6.22001 19.7793 5.67548ZM4.9309 4.5178H19.759V2.27611H17.3076C17.3076 2.44971 17.3076 2.61221 17.3076 2.77471C17.3044 3.1416 17.0518 3.39695 16.6934 3.39746C16.3351 3.39796 16.0809 3.14211 16.0776 2.77623C16.0776 2.60919 16.0776 2.44164 16.0776 2.28065H12.9605C12.9605 2.46586 12.9605 2.63391 12.9605 2.8055C12.9539 3.14412 12.6975 3.39292 12.3545 3.39746C12.0115 3.402 11.737 3.14968 11.731 2.80247C11.731 2.62836 11.731 2.45375 11.731 2.27763H8.6545C8.6545 2.45325 8.6545 2.61625 8.6545 2.77925C8.65066 3.14412 8.39424 3.39948 8.03536 3.39746C7.67648 3.39544 7.42718 3.13958 7.42444 2.77169C7.42444 2.60515 7.42444 2.43811 7.42444 2.2751H4.93145L4.9309 4.5178ZM19.7601 10.9895C19.7053 11.0935 19.6741 11.1525 19.6439 11.2121C19.0336 12.4177 18.2862 13.5375 17.2435 14.4737C17.1503 14.5606 17.0386 14.6286 16.9153 14.6735C16.792 14.7184 16.6599 14.7392 16.5274 14.7346C12.7414 14.7289 8.9553 14.7277 5.16924 14.7311H4.93145V15.8539H19.7601V10.9895Z"
											fill="#387FFF"
										/>
									</svg>
								</button>
							</DateRangePicker>
						</div>

						<div className="sell-time-inp mx-auto my-3">
							<input
								type="time"
								name="timedAuctionConfig.duration.startTime"
								placeholder="Start Time"
								className="py-1"
								onChange={(e) => onChange(e)}
								defaultValue={timedAuctionConfig.duration.startTime}
								required
								autoComplete="off"
							/>
						</div>
						<div className="sell-time-inp mx-auto my-3">
							<input
								type="time"
								name="timedAuctionConfig.duration.endTime"
								placeholder="End Time"
								className="py-1"
								onChange={(e) => onChange(e)}
								defaultValue={timedAuctionConfig.duration.endTime}
								required
								autoComplete="off"
							/>
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

export default connect(mapStateToProps, {})(AuctionListing);
