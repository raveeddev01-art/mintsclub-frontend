import React, { useState, useContext } from 'react';
import './SellNFT.scss';
import { ENV } from '../../config/config';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import { decimalNumberValidator } from '../../utils/functions';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { setApprovalForAll } from '../../utils/web3';
import { toast } from 'react-toastify';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';
import useVideoPlayer from '../../Components/TestVideoCard/Components/UseVideoPlayer';
import ApprovalModal from '../../Components/Modals/ApprovalModal/ApprovalModal';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg.png';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import { useHistory } from 'react-router';
import { sellNFTBanner } from '../../utils/exportData';
import { useGetNFTbyId } from '../../hooks/AllNFTs';
import { useInsertData, useEditData } from '../../hooks/Common';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
import FileView from './components/FileView';
import NFTDetail from './components/NFTDetail';
import FixedPriceListing from './components/FixedPriceListing';
import AuctionListing from './components/AuctionListing';
import Buttons from './components/Buttons';

import { useWallet } from '@solana/wallet-adapter-react';
import { CHAIN_CURRENCY } from '../../utils/helpers/helpers';
import { CHAINS_INTERFACE } from '../../interfaces/components';
const { dateRangeInitialSettings } = ENV;
const SellNFT = (props: any) => {
	const [activeBtn, setActiveBtn] = useState<any>(0);
	const [sellingMethod, setSellingMethod] = useState<number>(1); // 1 = Fixed Price, 2 = Timed Auction
	const [fixedPriceConfig, setFixedPriceConfig] = useState<any>({
		price: {
			currency: ENV.currency,
			amount: '',
		},
	});
	const [timedAuctionConfig, setTimedAuctionConfig] = useState<any>({
		startPrice: {
			currency: ENV.currency,
			amount: '',
		},
		duration: {
			startDate: moment(),
			endDate: moment().add(6, 'months'),
			startTime: moment(new Date()).format('HH:mm'),
			endTime: '23:59',
		},
	});

	const [nftDetail, setNftDetail] = useState<any>('');
	const [loader, setLoader] = useState<boolean>(true); // NFT loader
	const location: any = useLocation();
	const [copies, setCopies] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);
	const [approvalStatus, setApprovalStatus] = useState<string>('not-approved');
	const [address, setAddress] = useState<string>(props.connectedAddress);
	const [collectionAddress, setcollectionAddress] = useState<string>('');
	const [collectionId, setcollectionId] = useState<string>('');

	const [copiesError, setCopiesError] = useState<boolean>(false);
	const [contentLoader, setContentLoader] = useState<boolean>(true);
	const { setError } = useContext(errorHandler);
	const history = useHistory();
	const nftId = props.match.params.id;

	const videoElement = React.useRef(null);
	const { playerState, togglePlay } = useVideoPlayer(videoElement);
	//Get NFT
	const onSuccessNFT = (data: any) => {
		if (data.data.success) {
			if (copies === '') {
				setLoader(false);
				setNftDetail(data?.data?.data);
			}
		} else {
			setError(data.data.message);
		}
	};
	const { isLoading: isLoadingNFT } = useGetNFTbyId(nftId, onSuccessNFT);

	//Create Activity
	const onInsertData = () => {
		// unexpected empty arrow function
	};
	const { mutate: insertActivity } = useInsertData(
		'activity/create',
		onInsertData
	);

	const { isLoading: isInsertingAuction, mutate: insertAuction } =
		useInsertData('auctions/create', () => {
			toast.success('Auction created successfully');
			history.push(`/userprofile`);
		});

	//Edit Profile

	const { mutate: updateProfile } = useEditData(
		'users/updateProfile',
		() => console.log(),
		() => console.log()
	);
	const { mutate: approveCollection } = useEditData(
		'collection/edit',
		(data: any) => {
			const updatedNFTDetail = { ...nftDetail };
			updatedNFTDetail.user.isApproved = true;
			updatedNFTDetail.isApproved = true;
			setNftDetail(updatedNFTDetail);
			setApprovalStatus('approved');
		}
	);

	const onChange = (e: any) => {
		const { name, value } = e.target;

		let data = null;

		if (sellingMethod === 1) {
			data = fixedPriceConfig;
		} else {
			data = timedAuctionConfig;
		}

		const keys = name.split('.');

		if (keys && keys[2]) {
			data[keys[1]][keys[2]] = value;
		} else if (keys && keys[1]) data[keys[1]] = value;

		if (sellingMethod === 1) {
			setFixedPriceConfig({
				...data,
				price: {
					...data.price,
					currency:
						CHAIN_CURRENCY[props.blockchainType as keyof CHAINS_INTERFACE],
				},
			});
		} else {
			setTimedAuctionConfig({
				...data,
				startPrice: {
					...data.startPrice,
					currency:
						CHAIN_CURRENCY[props.blockchainType as keyof CHAINS_INTERFACE],
				},
			});
		}
	};

	const getActivityPayload = () => {
		const { _id, ownerId } = nftDetail;
		const activityPayload = {
			nftId: _id,
			ownerId,
			fromAddress: props.connectedAddress,
			activityType: 'List',
		};
		return activityPayload;
	};

	//Open for Bidding/Auction

	const openBidding = async (
		timedAuctionConfig: any,
		payload: any,
		activityPayload: any,
		price: any
	) => {
		try {
			const auctionEndDate = timedAuctionConfig.duration.endDate;
			const auctionStartDate = timedAuctionConfig.duration.startDate;

			const biddingTime = Math.floor(
				new Date(auctionEndDate).getTime() / 1000.0
			);

			const startTime = Math.floor(
				new Date(auctionStartDate).getTime() / 1000.0
			);

			let result = undefined;
			if (ENV.getUserKeys('blockchainType').blockchainType === 'solana') {
				result = await listItemForLiveAuction(
					wallet,
					nftDetail?.mint,
					startTime,
					biddingTime
				);
			}
			if (ENV.getUserKeys('blockchainType').blockchainType !== 'solana') {
				result = await openNFTForBidding(
					startTime,
					biddingTime,
					nftDetail?.tokenId,
					copies,
					+price,
					nftDetail?.contractAddress
				);
			}

			if (result) {
				activityPayload.price = price;
				payload.blockchainType = props.blockchainType.toLowerCase();
				if (props.blockchainType?.toLowerCase() === 'solana') {
					console.log('iffffffff');
					payload.txnHash = result;
					payload.sellerPublicKey = wallet.publicKey?.toBase58();
				} else {
					payload.sellId = Number(result);
				}
				insertActivity(activityPayload);
				insertAuction(payload);
			}
		} catch (err: any) {
			setLoader(false);
			toast.error(err);
		}
	};
	//Open for fixed price
	const openForSale = async (
		activityPayload: any,
		payload: any,
		fixedConfig: any,
		price: any
	) => {
		try {
			let res = null;
			if (props.blockchainType?.toLowerCase() === 'solana') {
				res = await listItemForFixedPriceSolana(wallet, price, nftDetail?.mint);
			}
			if (
				props.blockchainType?.toLowerCase() !== 'solana' &&
				props.blockchainType?.toLowerCase() !== 'algorand' &&
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
			payload.blockchainType = props.blockchainType.toLowerCase();
			if (props.blockchainType?.toLowerCase() === 'solana') {
				payload.sellerTradeState = res;
			}
			if (nftDetail.lazyMinted) {
				payload.sellId = 0;
				// payload.signature = res.data;
			}
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
	const calclateStartOrEndTime = (auctionConfig: any, startOrEndTime: any) => {
		let time = auctionConfig.toString();
		time = time.slice(0, 15) + ' ' + startOrEndTime + ':00' + time.slice(24);
		return time;
	};
	const handleDateChange = (e: any, picker: any) => {
		const { name } = e.target;
		const { startDate, endDate } = picker;

		// set start date
		onChange({
			target: {
				name: `${name}.startDate`,
				value: startDate,
			},
		});

		// set end date
		onChange({
			target: {
				name: `${name}.endDate`,
				value: endDate,
			},
		});
	};

	//Approve account

	const approveAccount = async () => {
		setApprovalStatus('pending');
		const formData: any = new FormData();
		formData.append('isApproved', true);
		formData.append('userId', nftDetail.user._id);

		if (!nftDetail.isApproved) {
			formData.append('collectionId', nftDetail.collectionId);
			formData.append('nftId', nftDetail._id);
		}
		try {
			const accApproved = await setApprovalForAll(
				setApprovalStatus,
				nftDetail.contractAddress
			);
			if (!nftDetail.isApproved) {
				return approveCollection(formData);
			}

			if (accApproved) {
				const updatedNFTDetail = { ...nftDetail };
				updatedNFTDetail.user.isApproved = true;
				setNftDetail(updatedNFTDetail);
				updateProfile(formData);
				setApprovalStatus('approved');
				toast.success('Your Account is Approved!.');
				return '';
			}
		} catch (err) {
			setApprovalStatus('not-approved');
			return '';
		}
	};

	const { image, name, description, remainingCopies, fileType } = nftDetail;
	return (
		<>
			<Banner
				subHeading={sellNFTBanner.subHeading}
				heading={sellNFTBanner.heading}
				content={sellNFTBanner.content}
				bgImg={BannerBg}
				bannerImg={BannerImage}
			/>
			{isLoadingNFT || isInsertingAuction || (loader && <FullPageLoader />)}
			<section className="padding-wrapper sell-nft new-nft-detail ">
				<div className="container">
					<div className="row g-4 g-xl-5">
						<div className="col-12">
							<div className="row g-4">
								<FileView
									info={{
										fileType,
										contentLoader,
										image,
										setContentLoader,
										videoElement,
										togglePlay,
										playerState,
									}}
								/>
								<NFTDetail
									info={{ name, remainingCopies, nftDetail, description }}
								/>
							</div>
						</div>
						<Buttons
							data={{
								activeBtn,
								setActiveBtn,
								setSellingMethod,
								setCopies,
								setCopiesError,
								nftDetail,
							}}
						/>
						{activeBtn === 0 ? (
							<FixedPriceListing
								data={{
									onChange,
									decimalNumberValidator,
									fixedPriceConfig,
									copiesError,
									remainingCopies,
									setCopiesError,
									copies,
									setCopies,
									nftDetail,
									setShow,
									getActivityPayload,
									sellingMethod,
									insertActivity,
									insertAuction,
									setLoader,
								}}
							/>
						) : (
							<AuctionListing
								data={{
									onChange,
									decimalNumberValidator,
									timedAuctionConfig,
									remainingCopies,
									copiesError,
									nftDetail,
									setCopiesError,
									copies,
									setCopies,
									dateRangeInitialSettings,
									handleDateChange,
									setShow,
									getActivityPayload,
									sellingMethod,
									insertActivity,
									insertAuction,
									setLoader,
								}}
							/>
						)}
					</div>
				</div>
				<ApprovalModal
					show={show}
					approveAccount={approveAccount}
					approvalStatus={approvalStatus}
					onHide={async () => setShow(false)}
					address={props.connectedAddress}
				/>
			</section>
			<OwnCollectionToday />
		</>
	);
};

const mapStateToProps = (state: any) => ({
	blockchainType: ENV.getUserKeys('blockchainType')?.blockchainType,
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(SellNFT);
