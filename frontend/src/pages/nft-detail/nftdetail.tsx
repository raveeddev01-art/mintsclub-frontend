import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './nftdetail.scss';

import {
	getNFT,
	getNFTsByCollection,
	getMyLikedNfts,
	beforeNFT,
	createActivity,
	getActivities,
	getItemsListing,
	beforeNFTByCollection,
} from '../../Components/Nfts/nfts.action.js';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';
import { connect, useDispatch } from 'react-redux';
import { ENV } from '../../config/config';
import { decimalnumbervalidator, handleRequest } from '../../utils/functions';
import {
	toggleLikeDislike,
	beforeTogleLikeDislike,
} from '../all-nfts/explore.action';
import moment from 'moment';
import axios from 'axios';
import {
	placeABid,
	BuyFixedPriceNFT,
	getBalance,
	claimNFTfromContract,
	endAuctionFromContract,
	lazyMint,
	redeemVoucher,
	cancelNFTListing,
} from '../../utils/web3';
import {
	placeBid,
	getBids,
	getBidSByNftId,
	beforeBid,
	deleteBid,
} from '../../Components/Bids/bids.action';
import {
	makeOffer,
	getOffers,
	beforeOffer,
	deleteOffer,
	buyNow,
} from '../../Components/Offers/offers.action';
import { toast } from 'react-toastify';
import BuyModal from '../../Components/Modals/BuyModal/BuyModal';
import BidModal from '../../Components/Modals/BidModal/BidModal';
import useVideoPlayer from '../../Components/TestVideoCard/Components/UseVideoPlayer';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg.png';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
import { Images, blockchainIcons } from '../../assets/assets';
import { getBannerData, nftBanner, currency } from '../../utils/exportData';
import { useGetData, useDeleteData, useInsertData } from '../../hooks/Common';
import MetaData from '../../Components/MetaData/MetaData';
import MetaDataSmall from '../../Components/MetaData/MetaDataSmall';
import FileDetail from '../../Components/FileDetail/FileDetail';
import MoreNFTs from './components/MoreNFTs/MoreNFTs';
import Offers from './components/Offers';
import Activities from './components/Activities';
import FileViewer from './components/FileViewer';
import {
	CHAIN_LOGOS,
	CHAIN_TITLE,
	internetSpeedCheck,
	mintingContractAddress,
} from '../../utils/helpers/helpers';
import { isUserLoggedIn } from '../../utils/helpers/ethereum';
import { CHAINS_INTERFACE } from '../../interfaces/components';
import {
	bidForLiveAuction,
	buyNowFixedPriceAuction,
	cancelItemFromListing,
	cancelListingForLiveAuction,
	claimBidsForLiveAuction,
	executeSaleForLiveAuction,
	getSolanaBalance,
	singleLazyMint,
	uploadDataOnIpfs,
} from '../../utils/solana/helper';
import {
	buyFixedPriceNFT,
	cancelItemForFixPriceListing,
	cancelListForLiveAuction,
	checkAlgoBalance,
	closeAuction,
	createNFT,
	getAlgoBalance,
	placeBidOnAlgorand,
} from '../../utils/algorand';
import { useWallet } from '@solana/wallet-adapter-react';
import darkModeContext from '../../context/darkmode/DarkModeContext';
import { Wallet } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import SocketContext from '../../contexts/SocketContext';
import { sliderClasses } from '@mui/material';
import algosdk from 'algosdk';

const NFTDetail = (props: any) => {
	const params: any = useParams();

	const socket = useContext(SocketContext);
	const currencyData: any = currency;
	const wallet = useWallet();
	const [exchangeRate, setExchangeRate] = useState<number>(0);
	const [toggle, setToggle] = React.useState<boolean>(true);
	const [likedNfts, setLikedNfts] = useState<any>();
	const [nftDetail, setNftDetail] = useState<any>('');

	const [nfts, setNFTs] = useState<any>([]);
	const [activities, setActivities] = useState<any>([]);
	const [loader, setLoader] = useState<boolean>(true);
	const [price, setPrice] = useState<number>(0);
	const [bids, setBids] = useState<any>(null);
	const [settings, setSettings] = useState<any>(null);
	const [offers, setOffers] = useState<any>(null);
	const [modalShow, setModalShow] = useState<any>(false);
	const [likeButtonDisable, setLikeBtnDisable] = useState<any>(null);
	const [modal, setModal] = useState<number>(1);
	const [confirmed, setConfirmed] = useState<string>('');
	const [transactionHash, setTransactionHash] = useState<string>('');
	const [transactionSuccess, setTransactionSuccess] = useState<any>(false);
	const [bidModalShow, setBidModalShow] = useState<any>(false);
	const [balance, setBalance] = useState<any>('');
	const [balanceLoader, setBalanceLoader] = useState<boolean>(true);
	const [disabled, setDisabled] = useState<boolean>(false);
	const history = useHistory();
	const videoElement = React.useRef(null);
	const [claimNFT, setClaimNFT] = useState<boolean>(false);
	const [initial, setInitial] = useState<boolean>(false);
	const [contentLoader, setContentLoader] = useState<boolean>(true);
	const { playerState, togglePlay } = useVideoPlayer(videoElement);
	const { setError } = useContext(errorHandler);
	const [beforeGetActivities, setBeforeGetActivities] =
		useState<boolean>(false);
	const [beforeGetOffers, setBeforeGetOffers] = useState<boolean>(false);
	const [beforeGetBids, setBeforeGetBids] = useState<boolean>(false);

	const [nftId, setNftId] = useState<string>(params.id);
	const userId = ENV.getUserKeys('_id')._id;
	const { darkMode } = useContext(darkModeContext);
	const [currentBidder, setCurrentBidder] = useState<string>('');
	const [bidStatus, setBidStatus] = useState<string>('pending');
	const [claimBidPrice, setClaimBidPrice] = useState<number>(0);
	const [claimBidId, setClaimBidId] = useState<string>('');
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

	useEffect(() => {
		window.scroll(0, 600);
		refetch();
	}, []);
	useEffect(() => {
		if (balance !== '') {
			setBalanceLoader(false);
		}
	}, [balance]);

	const refetch = async (loader = true) => {
		try {
			if (loader) {
				setLoader(true);
			}

			const nftDetailsResponse = await handleRequest(
				'get',
				`nfts/get/${nftId}`,
				null,
				null
			);

			const nftDetailsData = nftDetailsResponse?.data?.data;

			setNftDetail(nftDetailsData);

			setBeforeGetActivities(true);

			// Get Offers and Bids
			if (nftDetailsData?.activeAuction?.sellingMethod) {
				if (nftDetailsData?.activeAuction?.sellingMethod === 1) {
					setBeforeGetOffers(true);
				} else {
					setBeforeGetBids(true);
				}
			}
			setNextBidFivePercHigh(nftDetailsData);
		} catch (err) {
			console.log('🚀 ~ file: nftdetail.tsx:171 ~ refetch ~ err', err);
		} finally {
			if (loader) {
				setLoader(false);
			}
		}
	};

	//get activities
	const onSuccessGetActivities = (data: any) => {
		if (data.data.success) {
			setActivities(data.data.data);
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading: isLoadingActivity, refetch: getLatestActivities } =
		useGetData(
			'GetActivities',
			'activity/get',
			ENV.objectToQueryString({ nftId: nftDetail._id }),
			onSuccessGetActivities,
			null,
			beforeGetActivities
		);

	//get offers
	const onSuccessGetOffers = (data: any) => {
		if (data.data.success) {
			setOffers(data.offers);
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading: isLoadingOffers, refetch: getLatestOffers } = useGetData(
		'GetOffers',
		'offer/list',
		ENV.objectToQueryString({ nftId: nftDetail._id }),
		onSuccessGetOffers,
		null,
		beforeGetOffers
	);

	//get Bids
	const onSuccessGetBids = (data: any) => {
		if (data.data.success) {
			setBids(data.data.data.Bids);
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading: isLoadingBids, refetch: getLatestBids } = useGetData(
		'GetBids',
		'bid/list',
		ENV.objectToQueryString({ auctionId: nftDetail?.activeAuction?._id }),
		onSuccessGetBids,
		null,
		beforeGetBids
	);
	//get system Settings
	const onSuccessGetSettings = (data: any) => {
		if (data?.data) {
			setSettings(data?.data);
			return data?.data;
		} else {
			setError(data?.data?.message);
		}
	};

	const { refetch: getSettingsData } = useGetData(
		'GET_SYSTEM_SETTINGS',
		'systemSetting/getAllSystemSetting',
		ENV.objectToQueryString({
			userId: ENV.getUserKeys('_id')._id,
		}),
		onSuccessGetSettings
	);

	useEffect(() => {
		setNftId(params?.id);
		const getBannerData = async () => {
			// props.beforeNFT();
			// props.getNFT(nftId);
			props.beforeNFTByCollection();
			let qs: any = { userId };
			qs = ENV.objectToQueryString(qs);
			props.getMyLikedNfts(qs);
			validateIfLiked();
			let balance = undefined;
			if (ENV.getUserKeys('blockchainType').blockchainType === 'solana') {
				balance = await getSolanaBalance(wallet);
			} else if (
				ENV.getUserKeys('blockchainType').blockchainType === 'algorand'
			) {
				const accountInfo = await getAlgoBalance(connectedAddress);
				balance = await algosdk.microalgosToAlgos(accountInfo?.amount);
			} else {
				balance = await getBalance();
			}
			setBalance(balance);
			// setLoader(true);
		};
		getBannerData();
	}, [params.id]);
	useEffect(() => {
		if (props.createAuth) {
			setLoader(false);
			setIsButtonDisabled(false);
			props.beforeBid();
			window.scrollTo({
				top: 1400,
				behavior: 'smooth',
			});
		}
	}, [props.createAuth]);

	useEffect(() => {
		if (props.buyAuth) {
			setLoader(false);
			setIsButtonDisabled(false);
			setDisabled(false);
			setTransactionSuccess(true);
			props.getNFT(nftId);
			if (ENV.getUserKeys('_id')?._id) {
				let qs: any = { userId: ENV.getUserKeys('_id')._id };
				qs = ENV.objectToQueryString(qs);
				props.getMyLikedNfts(qs);
			}
			validateIfLiked();
			// props.getBids();
			props.beforeOffer();
			toast.success('You have purchased NFT successfully');
			history.push('/userprofile');
		}
	}, [props.buyAuth]);

	useEffect(() => {
		if (props.createAuthOffer) {
			setLoader(false);
			setIsButtonDisabled(false);
			history.push('/explore/allNFT');
		}
	}, [props.createAuthOffer]);

	// Get Liked Nfts
	useEffect(() => {
		if (props.myLikedNftsStatus) {
			setLikedNfts(props.myLikedNfts);
			props.beforeNFT();
		}
	}, [props.myLikedNftsStatus]);
	const setNextBidFivePercHigh = (data: any) => {
		let result: any = '';
		const { currentPrice, collectionId } = data;

		if (ENV.getUserKeys('blockchainType').blockchainType === 'algorand') {
			let bidAmount: any = '';
			const { highestBid } = data.activeAuction || {};

			if (highestBid === 0 || highestBid === undefined) {
				bidAmount = currentPrice + 0.1;
			} else {
				bidAmount = 0.1 + highestBid;
			}
			result = bidAmount.toFixed(8);
		} else {
			let fivePerc: any = '';
			const { highestBid } = data.activeAuction || {};
			if (highestBid === 0 || highestBid === undefined) {
				fivePerc = (5 / 100) * currentPrice;
				fivePerc = fivePerc + currentPrice;
			} else {
				fivePerc = (5 / 100) * highestBid;
				fivePerc = fivePerc + highestBid;
			}
			result = fivePerc.toFixed(8);
		}
		setPrice(result);
		validateIfLiked(likedNfts, data);
		props.beforeNFTByCollection();
		props.getNFTsByCollection(collectionId);
	};

	useEffect(() => {
		if (props.nftsByCollectionStatus) {
			props.beforeNFTByCollection();

			let moreCollection = [];
			if (props.nftsByCollection && props.nftsByCollection?.length) {
				moreCollection = props.nftsByCollection.filter(
					(item: any) =>
						item._id !== nftDetail._id && item.activeAuction !== null
				);
			}
			setNFTs(moreCollection);
		}
	}, [props.nftsByCollectionStatus]);

	useEffect(() => {
		if (props.togleLikeRes) {
			setLikeBtnDisable(false);
			props.beforeTogleLikeDislike();
		}
	}, [props.togleLikeRes]);

	const handleRouting = async () => {
		//Validate if i am owner
		//Todo for solana and algorand
		setIsButtonDisabled(true);
		if (isUserLoggedIn(history, nftDetail?.blockchainType)) {
			if (
				(blockchainType === 'polygon' ||
					blockchainType === 'ethereum' ||
					blockchainType === 'bsc') &&
				nftDetail?.activeAuction?.auctionEnded === false &&
				connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase() &&
				bidCount.length === 0
			) {
				let result = null;
				if (!nftDetail?.lazyMinted) {
					setLoader(true);

					result = await cancelNFTListing(
						nftDetail?.activeAuction?.sellId,
						nftDetail?.activeAuction?.sellingMethod,
						setLoader,
						setIsButtonDisabled
					);
				}
				if (result || nftDetail?.lazyMinted) {
					try {
						cancelAuction({ auctionId: nftDetail?.activeAuction?._id });
						setIsButtonDisabled(false);
					} catch (error) {
						toast.success('Something went wrong while cancel listing');
						setIsButtonDisabled(false);
					}
				}
				return;
			}
			if (
				blockchainType === 'algorand' &&
				nftDetail?.activeAuction?.sellingMethod === 2 &&
				nftDetail?.activeAuction?.auctionEnded === false &&
				nftDetail?.activeAuction?.status === 'claimNft' &&
				nftDetail.activeAuction !== null
			) {
				const result: any = await closeAuction(
					nftDetail?.activeAuction?.sellId,
					nftDetail?.activeAuction?.sellerPublicKey,
					nftDetail?.tokenId,
					nftDetail?.activeAuction?.globalState,
					nftDetail?.activeAuction?.highestBidder
				);

				if (result?.success) {
					EndAuctionFromBackend();
					setIsButtonDisabled(false);
				} else {
					setLoader(false);
					setIsButtonDisabled(false);
					toast.error(result?.message);
				}
				return;
			}
			if (
				blockchainType === 'solana' &&
				nftDetail?.activeAuction?.sellingMethod === 2 &&
				nftDetail?.activeAuction?.auctionEnded === false &&
				nftDetail?.activeAuction?.status === 'claimNft' &&
				connectedAddress?.toUpperCase() === highestBidder?.toUpperCase() &&
				nftDetail.activeAuction !== null
			) {
				const result: any = await executeSaleForLiveAuction(
					nftDetail?.activeAuction?.sellerPublicKey,
					nftDetail?.mint,
					wallet,
					nftDetail?.activeAuction?.highestBid
				);
				if (!result?.success) {
					toast.error(result?.message);
					setLoader(false);
					setIsButtonDisabled(false);
					return;
				}
				if (result) {
					EndAuctionFromBackend();
				}
				return;
			}
			if (
				blockchainType?.toLowerCase() === 'solana' &&
				nftDetail?.activeAuction?.sellingMethod === 1 &&
				nftDetail.lazyMinted === false &&
				nftDetail?.activeAuction?.status === 'active' &&
				connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase()
			) {
				setLoader(true);

				const { sellerTradeState } = nftDetail.activeAuction || {};
				if (sellerTradeState) {
					const response: any = await cancelItemFromListing(
						wallet,
						sellerTradeState
					);

					if (response?.response?.signature) {
						try {
							await cancelAuction({
								auctionId: nftDetail?.activeAuction?._id,
								txnHash: response?.response?.signature,
							});
							setLoader(false);
							setIsButtonDisabled(false);
						} catch (error) {
							setLoader(false);
							toast.error('Something went wrong while cancel listing');
							setIsButtonDisabled(false);
						}
					} else {
						setLoader(false);
						toast.error(response?.message);
						setIsButtonDisabled(false);
					}
				}
				return;
			}
			if (
				blockchainType?.toLowerCase() === 'algorand' &&
				nftDetail?.activeAuction?.sellingMethod === 1 &&
				nftDetail.lazyMinted === false &&
				nftDetail?.activeAuction?.status === 'active' &&
				connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase()
			) {
				setLoader(true);

				const { sellerTradeState } = nftDetail.activeAuction || {};

				if (sellerTradeState) {
					const response: any = await cancelItemForFixPriceListing(
						nftDetail?.activeAuction?.sellId,
						nftDetail?.activeAuction?.sellerTradeState,
						nftDetail?.tokenId
					);

					if (response?.success) {
						try {
							await cancelAuction({
								auctionId: nftDetail?.activeAuction?._id,
								txnHash: response?.response?.txId,
							});
							setLoader(false);
							setIsButtonDisabled(false);
						} catch (error) {
							setLoader(false);
							toast.error('Something went wrong while cancel listing');
							setIsButtonDisabled(false);
						}
					} else {
						setLoader(false);
						toast.error(response?.message);
						setIsButtonDisabled(false);
					}
				}
				return;
			}

			if (
				(blockchainType?.toLowerCase() === 'solana' ||
					blockchainType?.toLowerCase() === 'algorand') &&
				nftDetail?.activeAuction?.sellingMethod === 1 &&
				nftDetail.lazyMinted === true &&
				nftDetail?.activeAuction?.status === 'active' &&
				connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase()
			) {
				setLoader(true);
				try {
					await cancelAuction({
						auctionId: nftDetail?.activeAuction?._id,
					});
					setLoader(false);
					setIsButtonDisabled(false);
				} catch (error) {
					setLoader(false);
					toast.error('Something went wrong while cancel listing');
					setIsButtonDisabled(false);
				}

				return;
			}

			if (
				blockchainType === 'solana' &&
				nftDetail?.activeAuction?.sellingMethod === 2 &&
				nftDetail?.activeAuction?.auctionEnded === false &&
				nftDetail?.activeAuction?.status === 'reclaimNft'
			) {
				try {
					cancelAuction({
						auctionId: nftDetail?.activeAuction?._id,
					});
					setIsButtonDisabled(false);
				} catch (error) {
					toast.success('Something went wrong while reclaiming nft');
					setIsButtonDisabled(false);
				}

				return;
			}
			if (
				blockchainType === 'solana' &&
				nftDetail?.activeAuction?.sellingMethod === 2 &&
				nftDetail?.activeAuction?.auctionEnded === false &&
				connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase() &&
				bidCount.length === 0
			) {
				setLoader(true);
				const result: any = await cancelListingForLiveAuction(
					wallet,
					nftDetail?.mint
				);

				if (result?.success) {
					try {
						await cancelAuction({
							auctionId: nftDetail?.activeAuction?._id,
							txnHash: result?.txnHash,
						});
						setLoader(false);
						setIsButtonDisabled(false);
					} catch (error) {
						setLoader(false);
						toast.error('Something went wrong while cancel listing');
						setIsButtonDisabled(false);
					}
				} else {
					setLoader(false);
					toast.error(result?.message);
					setIsButtonDisabled(false);
				}
				return;
			}
			if (
				blockchainType === 'algorand' &&
				nftDetail?.activeAuction?.sellingMethod === 2 &&
				nftDetail?.activeAuction?.auctionEnded === false &&
				connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase() &&
				bidCount.length === 0
			) {
				setLoader(true);
				const result: any = await cancelListForLiveAuction(
					nftDetail?.activeAuction?.sellId,
					nftDetail?.activeAuction?.sellerPublicKey,
					nftDetail?.tokenId,
					nftDetail?.activeAuction?.globalState
				);

				if (result?.success) {
					try {
						await cancelAuction({
							auctionId: nftDetail?.activeAuction?._id,
							txnHash: result?.response?.txId,
						});
						setLoader(false);
						setIsButtonDisabled(false);
					} catch (error) {
						setLoader(false);
						toast.error('Something went wrong while cancel listing');
						setIsButtonDisabled(false);
					}
				} else {
					setLoader(false);
					toast.error(result?.message);
					setIsButtonDisabled(false);
				}
				return;
			}
			if (
				blockchainType === 'solana' &&
				nftDetail?.activeAuction?.sellingMethod === 2 &&
				bidStatus === 'claimable' &&
				connectedAddress?.toUpperCase() !== highestBidder?.toUpperCase()
			) {
				const result = await claimBidsForLiveAuction(wallet, claimBidPrice);
				if (result) {
					try {
						const bidData = {
							bidId: claimBidId,
							status: 'refunded',
						};
						const res = await axios({
							method: 'post',
							url: `${ENV.url}bid/updateBid`,
							data: bidData,
							headers: {
								'x-auth-token': ENV.x_auth_token,
							},
						});
						if (res.data) {
							toast.success('You have claimed bid successfully');
							history.push('/explore/allNFT');
							setIsButtonDisabled(false);
						}
					} catch (error) {
						toast.success('Something went wrong while claiming');
						setIsButtonDisabled(false);
					}
				}
				return;
			}
			if (
				isOwner() &&
				nftDetail?.activeAuction?.sellingMethod === 2 &&
				blockchainType !== 'solana' &&
				nftDetail?.activeAuction !== null
			) {
				EndAuction();
				return;
			}
			if (isOwner()) {
				history.push({
					pathname: `/sell-item/${nftDetail._id}`,
					state: nftDetail,
				});
				return;
			}

			//If i am not owner
			return openModals();
		}
	};

	const openModals = () => {
		if (
			nftDetail?.activeAuction?.sellingMethod === 2 &&
			nftDetail?.activeAuction?.status === 'active'
		) {
			setBidModalShow(true);
			setIsButtonDisabled(false);
		}
		if (nftDetail?.activeAuction?.sellingMethod === 1) {
			setModalShow(true);
			setIsButtonDisabled(false);
		}
	};

	//match if nft liked

	const validateIfLiked = (nfts?: any, nft?: any) => {
		if (nfts && nfts?.length > 0) {
			const result = nfts.find((item: any) => item.nftId === nft._id);

			if (result) {
				return setToggle(true);
			} else {
				return setToggle(false);
			}
		} else {
			return setToggle(false);
		}
	};

	const calculatepricepercantage = () => {
		let fivePerc: any;
		let result: any;
		const { highestBid } = nftDetail?.activeAuction || {};
		const { currentPrice } = nftDetail;
		if (highestBid === 0 || highestBid === undefined) {
			fivePerc = (10 / 100) * currentPrice;

			result = fivePerc + currentPrice;

			return result;
		} else {
			fivePerc = (10 / 100) * highestBid;
			result = fivePerc + highestBid;
			return result.toFixed(8);
		}
	};
	useEffect(() => {
		const bct: any = nftDetail?.blockchainType;
		const coin = currencyData[bct];
		axios
			.get(
				`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${coin},USD`
			)
			.then((res) => {
				const currentUSD = res.data.USD;
				setExchangeRate(currentUSD);
			});
	}, [currency, nftId, nftDetail?.blockchainType]);
	useEffect(() => {
		getBidsListOfAuction();
	}, [nftDetail?.activeAuction]);

	useEffect(() => {
		if (props.togleLikeRes) {
			setLikeBtnDisable(false);
			props.beforeTogleLikeDislike();
		}
	}, [props.togleLikeRes]);

	const onChange = (e: any) => {
		const result = e.target.value.slice(0, 8);

		setPrice(result);
	};
	const handlemodalsubmit = async () => {
		if (socket) {
			socket.emit('placingBid', {
				walletAddress: ENV.getUserKeys('address').address,
			});
		}
		internetSpeedCheck();
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
		if (isUserLoggedIn(history, nftDetail?.blockchainType)) {
			setLoader(true);
			if (nftDetail?.activeAuction?.sellingMethod === 2) {
				placeBid();
			} else {
				makeOffer();
			}
		}
		setIsButtonDisabled(false);
	};
	const placeBid = async () => {
		const { connectedAddress } = props;
		const { activeAuction, ownerAddress, _id, ownerId, tokenId, mint } =
			nftDetail;
		try {
			let result: any = undefined;
			if (ENV.getUserKeys('blockchainType').blockchainType === 'solana') {
				result = await bidForLiveAuction(
					wallet,
					activeAuction?.sellerPublicKey,
					mint,
					price
				);
				if (!result.success) {
					toast.error(result?.message);
					setLoader(false);
					setIsButtonDisabled(false);
					return;
				}
			} else if (
				ENV.getUserKeys('blockchainType').blockchainType !== 'algorand'
			) {
				result = await placeABid(price, activeAuction?.sellId);
			} else {
				result = await placeBidOnAlgorand(
					+price,
					connectedAddress,
					ownerAddress,
					activeAuction?.sellId,
					tokenId,
					activeAuction?.globalState,
					setLoader
				);

				if (!result?.success) {
					const response = await checkAlgoBalance(
						connectedAddress,
						result?.message
					);
					setLoader(false);
					toast.error(response?.err);
					setIsButtonDisabled(false);
					return;
				}
			}
			if (result) {
				const payload: any = {
					ownerId: ownerId,
					auctionId: activeAuction?._id,
					bidAmount: price,
					nftId: _id,
					bidBy: ENV.getUserKeys('_id')._id,
					isAccepted: false,
					toAddress: ownerAddress,
					fromAddress: connectedAddress,
					blockchainType: ENV.getUserKeys('blockchainType').blockchainType,
				};
				if (ENV.getUserKeys('blockchainType').blockchainType === 'algorand') {
					payload.globalState = result?.new_global_state;
				}

				props.beforeBid();
				props.placeBid(payload);
			}
		} catch (err: any) {
			setLoader(false);
			toast.error(err);
			setIsButtonDisabled(false);
		}
	};

	const makeOffer = async () => {
		setLoader(true);
		try {
			const result = true;
			if (result) {
				const payload = {
					toAddress: nftDetail.ownerAddress,
					fromAddress: props.connectedAddress,
					offerBy: ENV.getUserKeys('_id')._id,
					ownerId: nftDetail.ownerId,
					nftId: nftDetail._id,
					price: price,
					// expiryDate: nftConfig.expiry.datetime,
					isAccepted: false,
					isExpired: false,
				};

				props.makeOffer(payload);
			}
		} catch (err: any) {
			setLoader(false);

			toast.error(err);
			setIsButtonDisabled(false);
		}
	};

	const auctionEndTimeConversion = (auctionEndDate: any) => {
		const dateString = moment(new Date(auctionEndDate))
			.utc(true)
			.format('MMMM D, Y');
		const timeString = moment(new Date(auctionEndDate))
			.utc(true)
			.format('h:mma');
		const totalDateTime = dateString + ' at ' + timeString + ' PKT';
		return totalDateTime;
	};

	const BuyNow = async () => {
		try {
			if (isUserLoggedIn(history, nftDetail?.blockchainType)) {
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
				setDisabled(true);
				internetSpeedCheck();
				if (nftDetail.lazyMinted) {
					BuyLazyNft();
				} else {
					// try {

					if (blockchainType === 'solana') {
						const { mint } = nftDetail;
						const { sellerTradeState, sellingConfig } = nftDetail.activeAuction;
						const buyFixedPriceResponse: any = await buyNowFixedPriceAuction(
							wallet,
							mint,
							sellerTradeState,
							sellingConfig?.price?.amount,
							setConfirmed
						);

						if (buyFixedPriceResponse?.buyerTradeState) {
							const payload = {
								userId,
								nftId,
								ownerAddress: props.connectedAddress,
							};
							props.beforeOffer();
							props.buyNow(payload);
							createActivity('Transfer', false, props.connectedAddress);
							return;
						} else {
							setLoader(false);
							toast.error(buyFixedPriceResponse?.message);
							setIsButtonDisabled(false);
						}

						return;
					}
					if (blockchainType === 'algorand') {
						const { tokenId } = nftDetail;
						const { sellerTradeState, sellingConfig } = nftDetail.activeAuction;
						const buyFixedPriceResponse = await buyFixedPriceNFT(
							sellingConfig?.price?.amount,
							tokenId,
							nftDetail?.activeAuction?.sellId,
							connectedAddress,
							nftDetail?.creator?.address,
							sellerTradeState,
							nftDetail?.algoLazyMinted
						);

						if (buyFixedPriceResponse?.txId) {
							const payload = {
								userId,
								nftId,
								ownerAddress: props.connectedAddress,
								algoLazyMinted: false,
							};
							props.beforeOffer();
							props.buyNow(payload);
							createActivity('Transfer', false, props.connectedAddress);
						} else {
							const response = await checkAlgoBalance(
								props.connectedAddress,
								buyFixedPriceResponse?.message
							);
							setLoader(false);
							toast.error(response?.err);
							setIsButtonDisabled(false);
						}

						return;
					}
					if (blockchainType !== 'algorand' && blockchainType !== 'solana') {
						const currentPrice = nftDetail.currentPrice;
						const nftToken = nftDetail?.activeAuction?.sellId;

						const result = await BuyFixedPriceNFT(
							currentPrice,
							nftToken,
							setConfirmed,
							setTransactionHash
						);

						if (result) {
							const payload = {
								userId,
								nftId,
								ownerAddress: props.connectedAddress,
							};
							props.beforeOffer();
							props.buyNow(payload);
							createActivity('Transfer', false, props.connectedAddress);
						}

						// TODO: Show Error for Ethereum Chain
						return;
						// } catch (err: any) {
						// 	setDisabled(false);
						// 	toast.error(err);
						// }
					}
				}
			}
		} catch (err: any) {
			toast.error(err);
		} finally {
			setDisabled(false);
			setIsButtonDisabled(false);
		}
	};

	const BuyLazyNft = async () => {
		try {
			const {
				metaData,
				copies,
				tokenId,
				ownerAddress,
				currentPrice,
				contractAddress,
			} = nftDetail;
			let payload: any = '';
			setConfirmed('pending');
			if (
				nftDetail.blockchainType === 'solana' ||
				nftDetail.blockchainType === 'algorand'
			) {
				const settingsData = await getSettingsData();
				let creators: any = '';
				if (nftDetail.blockchainType === 'solana') {
					creators = [
						{
							address: new PublicKey(ownerAddress),
							share: 100,
						},
						{
							address: wallet.publicKey,
							share: 0,
						},
					];
				} else {
					creators = [
						{
							address: ownerAddress,
							share: 100,
						},
						{
							address: props.connectedAddress,
							share: 0,
						},
					];
				}

				const nftInfo = {
					name: nftDetail?.name,
					image: nftDetail?.image,
					description: nftDetail?.description,

					properties: JSON.stringify(nftDetail?.properties),
					levels: JSON.stringify(nftDetail?.levels),
					stats: JSON.stringify(nftDetail?.stats),
					creators: JSON.stringify(creators),

					collection: JSON.stringify({
						name: nftDetail?.collection?.name,
						id: nftDetail?.collection?._id,
						categoryId: nftDetail?.collection?.categoryId,
					}),
					blockchainType: nftDetail?.blockchainType,
					ownerId: nftDetail?.ownerId,
					userId: nftDetail?.userId,
					collectionId: nftDetail?.collectionId,
					isApproved: nftDetail?.isApproved,
					sellerFeeBasisPoints:
						nftDetail?.blockchainType === 'solana'
							? settingsData?.data.data?.sellerFeeBasisPoints
							: 0,
				};

				const res = await uploadDataOnIpfs(nftInfo);
				if (res?.data?.data) {
					const tokenUri = res.data.data.dataInput.metaDataUrl;

					if (nftDetail?.blockchainType === 'solana') {
						const response = await singleLazyMint(
							wallet,
							tokenUri,
							nftDetail?.name,
							creators,
							settingsData?.data.data?.sellerFeeBasisPoints
						);
						if (response?.response.signature) {
							payload = {
								userId,
								nftId,
								ownerAddress: props.connectedAddress,
								mint: response?.mintAddress.toBase58(),
								metaData: tokenUri,
							};
						}
					} else {
						const assetId = await createNFT({
							assetName: nftDetail?.name,
							total: copies,
							metaData: tokenUri,
							connectedAddress: props.connectedAddress,
						});
						if (assetId) {
							payload = {
								userId,
								nftId,
								ownerAddress: props.connectedAddress,
								assetId,
								metaData: tokenUri,
							};
						}
					}
				}
			} else {
				const res = await lazyMint(
					tokenId,
					copies,
					ownerAddress,
					metaData,
					currentPrice,
					contractAddress,
					setTransactionHash,
					setConfirmed,
					props?.royalityFee || 150
				);
				payload = {
					userId,
					nftId,
					ownerAddress: props.connectedAddress,
					tokenId: res,
				};
			}

			createActivity('Transfer', false, props.connectedAddress);
			props.beforeOffer();
			props.buyNow(payload);
		} catch (err: any) {
			setDisabled(false);
			toast.error(err);
		}
	};

	const createActivity = async (type: any, bidPrice: any, address?: any) => {
		const { _id, ownerId, ownerAddress, currentPrice } = nftDetail;
		let price = '';
		let toAddress = '';
		if (bidPrice) {
			price = bidPrice;
		} else {
			price = currentPrice;
		}

		if (type === 'Transfer' || type === 'Bid') {
			toAddress = address;
		}

		const activityPayload = {
			nftId: _id,
			ownerId,
			fromAddress: type === 'Transfer' ? ownerAddress : props.connectedAddress,
			activityType: type,
			toAddress,
			price: price,
		};
		props.createActivity(activityPayload);
	};

	const checkIfAuctionStartedorEnded = (
		startDate: Date,
		endDate: Date,
		blockchainType: string
	) => {
		//check if i am owner

		if (isOwner() || nftDetail?.activeAuction?.sellingMethod === 1) {
			return true;
		}
		if (startDate && endDate && nftDetail?.activeAuction?.sellingMethod) {
			const currentDate = new Date();
			const auctionStartDate = new Date(startDate);
			const auctionEndDate = new Date(endDate);
			if (
				currentDate > auctionStartDate &&
				currentDate < auctionEndDate &&
				blockchainType !== 'solana' &&
				blockchainType !== 'algorand'
			) {
				return true;
			} else if (
				currentDate > auctionStartDate &&
				// currentDate > auctionEndDate &&
				(blockchainType === 'solana' || blockchainType === 'algorand')
			) {
				return true;
			}
			{
				return false;
			}
		} else {
			return false;
		}
	};

	const checkIfAuctionIsStarted = (startDate: Date, endDate: Date) => {
		const currentDate = new Date();
		const auctionStartDate = new Date(startDate);
		const auctionEndDate = new Date(endDate);
		if (currentDate < auctionStartDate) {
			return 'Sale will start on ' + auctionEndTimeConversion(auctionStartDate);
		}
		if (currentDate > auctionEndDate) {
			return (
				<span style={{ fontWeight: 'bold' }}>
					{'Sale ended ' + auctionEndTimeConversion(auctionEndDate)}
				</span>
			);
		}
		if (currentDate < auctionEndDate) {
			return (
				<span style={{ fontWeight: 'bold' }}>
					{'Sale ends ' + auctionEndTimeConversion(auctionEndDate)}
				</span>
			);
		}
	};
	const getBidsListOfAuction = async () => {
		if (!nftDetail?.activeAuction) {
			return;
		}

		const auctionEndDate = new Date(nftDetail?.activeAuction?.auctionEndDate);
		const currentDate = new Date();
		if (currentDate > auctionEndDate) {
			// if (!initial) {
			let queryString: any = {
				// nftId: nftDetail._id,
				auctionId: nftDetail?.activeAuction?._id,
			};
			queryString = ENV.objectToQueryString(queryString);
			let url = `${ENV.url}bid/list`;
			url += `?${queryString}`;
			const res = await axios.get(url);
			const newBids = res.data.data.Bids;

			const getBidDataOfCurrentUser = newBids.filter(function (bid: {
				fromAddress: any;
			}) {
				return bid?.fromAddress === connectedAddress;
			});

			if (getBidDataOfCurrentUser.length > 0) {
				setCurrentBidder(getBidDataOfCurrentUser[0]?.fromAddress);
				setBidStatus(getBidDataOfCurrentUser[0]?.status);
				setClaimBidPrice(getBidDataOfCurrentUser[0]?.bidAmount);
				setClaimBidId(getBidDataOfCurrentUser[0]?._id);
			}

			if (newBids?.length > 0) {
				const highestBidByUser = newBids.reduce((max: any, obj: any) =>
					max.bidAmount > obj.bidAmount ? max : obj
				);
				const blockChainType =
					ENV.getUserKeys('blockchainType')?.blockchainType;

				if (
					highestBidByUser.fromAddress === connectedAddress &&
					blockChainType !== 'solana' &&
					blockChainType !== 'algorand'
				) {
					//
					if (!claimNFT) {
						setClaimNFT(true);
					}
				}
			}
			// }
		}
	};

	useEffect(() => {
		if (socket && nftDetail?._id) {
			socket.emit('join', nftDetail?._id);

			socket.on('bidPlaced', ({ price }: any) => {
				refetch(false);
				refetch(false);
				getLatestActivities();
				if (nftDetail?.activeAuction?._id) {
					getLatestBids();
				}
				getLatestOffers();
				setPrice(price);
			});
			socket.on('auctionCancelled', (auctionCancelledInformation: any) => {
				refetch(false);
				getLatestActivities();
			});

			socket.on('auctionCreated', (auctionCreatedInformation: any) => {
				refetch(false);
			});

			socket.on('auctionStarted', (auctionStartedInformation: any) => {
				refetch(false);
			});
			socket.on('auctionEnded', (auctionEndedInformation: any) => {
				refetch(false);
			});

			// auctionTimeEnded

			socket.on('auctionTimeEnded', (auctionEndedInformation: any) => {
				refetch(false);
				getBidsListOfAuction();
			});
			socket.on('newNftAdded', (newNftAdded: any) => {
				refetch(false);
			});
			socket.on('auctionUpdated', (auctionUpdated: any) => {
				refetch(false);
				getLatestActivities();
			});
		}

		return () => {
			socket.emit('leave', nftDetail?._id);
		};
	}, [nftDetail?._id, socket]);

	const EndAuction = async () => {
		try {
			setLoader(true);
			setIsButtonDisabled(true);
			const { ownerId } = nftDetail;
			const { sellingMethod, sellId } = nftDetail?.activeAuction || {};
			if (userId === ownerId && sellingMethod === 2) {
				const result = await endAuctionFromContract(sellId);
				if (result) {
					EndAuctionFromBackend();
				}
			} else {
				const result = await claimNFTfromContract(sellId);
				if (result) {
					EndAuctionFromBackend();
				}
			}
		} catch (err: any) {
			toast.error(err.message);
		} finally {
			setLoader(false);
			setIsButtonDisabled(false);
		}
	};

	const EndAuctionFromBackend = async () => {
		const headers = {
			Authorization: ENV.Authorization,
			'x-auth-token': ENV.x_auth_token,
			'Access-Control-Allow-Origin': '*',
			'x-access-token':
				ENV.getUserKeys('accessToken') &&
				ENV.getUserKeys('accessToken').accessToken
					? ENV.getUserKeys('accessToken').accessToken
					: '',
		};
		const res = await axios.post(
			`${ENV.url}auctions/endAuction`,
			{
				auctionId: nftDetail?.activeAuction?._id,
			},
			{
				headers: headers,
			}
		);
		if (res.data.success) {
			if (userId === ownerId) {
				props.beforeBid();
				setBids(null);
				toast.success(res.data.message);
			} else {
				props.beforeBid();
				setBids(null);
				toast.success('You have purchased NFT successfully');
			}
			history.push('/userprofile');
		}
	};
	const { mutate: deleteNFT, isLoading } = useDeleteData(
		`nfts/delete/${nftId}`,
		(res: any) => {
			if (res.data.success) {
				toast.success('NFT Deleted successfully');
				history.push('/userprofile');
			}
		}
	);

	const handleDelete = () => {
		if (isOwner()) {
			if (isOwnerLoggedIn()) {
				toast.info('Please sign in to delete NFT');
				return history.push('/connect-wallet');
			} else {
				deleteNFT(null);
			}
		}
	};

	const { mutate: cancelAuction } = useInsertData('auctions/cancelList', () => {
		toast.success('You have cancelled Listing successfully');
		history.push('/userprofile');
	});

	const isOwnerLoggedIn = () => {
		return !userId || (userId && userId !== nftDetail.ownerId);
	};
	const isOwner = () => {
		const blockChainType = ENV.getUserKeys('blockchainType')?.blockchainType;

		return (
			nftDetail?.ownerAddress?.toUpperCase() ===
				connectedAddress?.toUpperCase() && blockChainType === blockchainType
		);
	};

	const {
		name,
		copies,
		remainingCopies,
		properties,
		levels,
		stats,
		nftToken,
		collectionFloorPriceNft,
		fileType,
		image,
		user,
		ownerId,
		tokenId,
		mint,
		description,
		currentPrice,
		ownerAddress,
		blockchainType,
		activeAuction,
	}: any = nftDetail;
	const {
		sellingMethod,
		auctionStartDate,
		auctionEndDate,
		copiesForAuction,
		auctionEnded,
		highestBidder,
		status,
	}: any = nftDetail?.activeAuction || {};
	const { connectedAddress } = props;
	const bidCount = nftDetail?.activeAuction?.bids;
	const nftInfo: any = [
		{
			title: 'Contract Address',
			value:
				blockchainType === 'solana'
					? ''
					: mintingContractAddress(blockchainType),
		},
		{
			title: blockchainType === 'solana' ? 'Mint' : 'Token ID',
			value: blockchainType === 'solana' ? mint : tokenId,
		},
		{
			title: 'Token Standard',
			value: 'ERC-1155',
		},
		{
			title: 'Blockchain',
			value:
				CHAIN_TITLE[blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE] ||
				'Ethereum',
		},
	];
	return (
		<>
			<Banner
				subHeading={nftBanner.subHeading}
				heading={nftBanner.heading}
				content={nftBanner.content}
				bgImg={BannerBg}
				bannerImg={BannerImage}
				nftDetail={nftDetail}
				btns={
					isOwner() && !sellingMethod && copies - remainingCopies === 0
						? true
						: false
				}
				onEdit={() => {
					if (isOwnerLoggedIn()) {
						toast.info('Please sign in to edit NFT');
						return history.push('/connect-wallet');
					}
					history.push(`/asset/edit/${nftId}`);
				}}
				onDelete={() => handleDelete()}
			/>
			{(loader || isLoading) && <FullPageLoader />}

			<div className="new-nft-detail padding-wrapper">
				<div className="container">
					<div className="row">
						<MetaData
							properties={properties}
							stats={stats}
							levels={levels}
							nftInfo={nftInfo}
						/>

						<div className="col-lg-8 col-xl-9 order-0 order-lg-1">
							<div className="row g-4 g-lg-5 g-xl-4">
								<FileViewer
									data={{
										nftDetail,
										blockchainIcons,
										fileType,
										contentLoader,
										image,
										setContentLoader,
										videoElement,
										togglePlay,
										playerState,
									}}
								/>
								<FileDetail
									info={{
										name,
										copies,
										remainingCopies,
										currentPrice,
										copiesForAuction,
										sellingMethod,
										exchangeRate,
										auctionEndDate,
										auctionStartDate,
										checkIfAuctionIsStarted,
										checkIfAuctionStartedorEnded,
										user,
										ownerAddress,
										handleRouting,
										claimNFT,
										connectedAddress,
										auctionEnded,
										EndAuction,
										Images,
										blockchainType,
										highestBidder,
										activeAuction,
										currentBidder,
										bidStatus,
										status,
										bidCount,
										isButtonDisabled,
									}}
								/>
								<MetaDataSmall
									properties={properties}
									stats={stats}
									levels={levels}
									nftInfo={nftInfo}
								/>

								<div className="col-12 mt-lg-5">
									<div className="detail-bg-box">
										<h5>Description:</h5>
										<hr />
										<p>{description}</p>
									</div>
								</div>
								{nftDetail?.activeAuction?.sellingMethod === 2 && (
									<Offers
										data={{
											bids,
											exchangeRate,
											lowestNftPrice: collectionFloorPriceNft?.currentPrice,
											sellingMethod,
										}}
									/>
								)}
								<Activities activities={activities} />
							</div>
						</div>
						<MoreNFTs info={{ nfts, likedNfts }} />
					</div>
				</div>
			</div>
			<OwnCollectionToday />
			<BuyModal
				show={modalShow}
				onHide={() => {
					setModalShow(false);
					setIsButtonDisabled(false);
					// setConfirmed(false);
					// setModal(1);
					// setTransactionSuccess(false);
				}}
				name={name}
				price={currentPrice}
				image={image}
				exchangeRate={exchangeRate}
				tokenId={tokenId}
				modal={modal}
				setModal={setModal}
				buyNow={BuyNow}
				confirmed={confirmed}
				transactionHash={transactionHash}
				transactionSuccess={transactionSuccess}
				disabled={disabled}
				balance={balance}
				fileType={fileType}
				blockchainType={blockchainType}
				balanceLoader={balanceLoader}
			/>

			<BidModal
				show={bidModalShow}
				calculatepricepercantage={calculatepricepercantage}
				handlemodalsubmit={handlemodalsubmit}
				onChange={onChange}
				decimalnumbervalidator={decimalnumbervalidator}
				balance={Number(balance).toFixed(4)}
				balanceLoader={balanceLoader}
				price={price}
				onHide={async () => setBidModalShow(false)}
				blockchaintype={blockchainType}
				nftDetail={nftDetail}
			/>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	nftDetails: state.nft.nftsData,
	nftsAuth: state.nft.nftsAuth,
	nftsByCollection: state.nft.nftsByCollection,
	nftsByCollectionStatus: state.nft.nftsByCollectionStatus,
	myLikedNfts: state.nft.myLikedNfts,
	myLikedNftsStatus: state.nft.myLikedNftsStatus,
	activities: state.nft.itemActivities,
	activitiesAuth: state.nft.activitiesAuth,
	itemsListing: state.nft.itemsListing,
	itemsListingAuth: state.nft.itemsListingAuth,
	createAuth: state.bid.createAuth,
	createAuthOffer: state.offer.createAuth,
	buyAuth: state.offer.buyAuth,
	getAuth: state.bid.getAuth,
	getAuthOffer: state.offer.getAuth,
	offers: state.offer.offers,
	bids: state.bid.bids,
	bidsByNft: state.bid.bidsByNft,
	bidsByNftAuth: state.bid.bidsBYNftAuth,
	togleLikeRes: state.explore.togleLikeRes,
	connectedAddress: state.wallet.connectedAddress,
	royalityFee: state.systemFee.royalityFee,
});

export default connect(mapStateToProps, {
	getNFT,
	beforeNFT,
	getNFTsByCollection,
	toggleLikeDislike,
	getMyLikedNfts,
	placeBid,
	getBids,
	getBidSByNftId,
	beforeBid,
	deleteBid,
	beforeTogleLikeDislike,
	makeOffer,
	beforeOffer,
	getOffers,
	deleteOffer,
	buyNow,
	createActivity,
	getActivities,
	getItemsListing,
	beforeNFTByCollection,
})(NFTDetail);
