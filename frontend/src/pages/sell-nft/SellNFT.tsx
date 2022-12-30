import React, { useState, useContext } from 'react';
import './SellNFT.scss';
import { ENV } from '../../config/config';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import { decimalnumbervalidator } from '../../utils/functions';
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
			toast.success('NFT listed successfully');
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
		}
		else {
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
		const payload: any = {};
		const formData: any = new FormData();
		payload.isApproved = true;
		payload.userId = nftDetail.user._id;
		if (!nftDetail.isApproved) {
			payload.collectionId = nftDetail.collectionId;
			payload.nftId = nftDetail._id;
			// formData.append('collectionId', nftDetail.collectionId);
			// formData.append('nftId', nftDetail._id);
		}
		try {
			const accApproved = await setApprovalForAll(
				setApprovalStatus,
				nftDetail.contractAddress
			);
			if (!nftDetail.isApproved) {
				return approveCollection(payload);
			}

			if (accApproved) {
				const updatedNFTDetail = { ...nftDetail };
				updatedNFTDetail.user.isApproved = true;
				setNftDetail(updatedNFTDetail);
				updateProfile(payload);
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
									decimalnumbervalidator,
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
								blockchainType={nftDetail?.blockchainType}
							/>
						) : (
							<AuctionListing
								data={{
									onChange,
									decimalnumbervalidator,
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
								blockchainType={nftDetail?.blockchainType}
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
