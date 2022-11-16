import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
import { connect } from 'react-redux';
import { ENV } from '../../config/config';
import { decimalNumberValidator } from '../../utils/functions';
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
import { CHAIN_LOGOS, CHAIN_TITLE } from '../../utils/helpers/helpers';
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
} from '../../utils/solana/helper';
import { placeBidOnAlgorand } from '../../utils/algorand';
import { useWallet } from '@solana/wallet-adapter-react';
import darkModeContext from '../../context/darkmode/DarkModeContext';

const NFTDetail = (props: any) => {
	const curreny1: any = currency;
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
	const [offers, setOffers] = useState<any>(null);
	const [modalShow, setModalShow] = useState<any>(false);
	const [likeButtonDisable, setLikeBtnDisable] = useState<any>(null);
	const [modal, setModal] = useState<number>(1);
	const [confirmed, setConfirmed] = useState<string>('');
	const [transactionHash, setTransactionHash] = useState<string>('');
	const [transactionSuccess, setTransactionSuccess] = useState<any>(false);
	const [bidModalShow, setBidModalShow] = useState<any>(false);
	const [balance, setBalance] = useState<any>('');
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
	const nftId = props.match.params.id;
	const userId = ENV.getUserKeys('_id')._id;
	const { darkMode } = useContext(darkModeContext);
	const [currentBidder, setCurrentBidder] = useState<string>('');
	const [bidStatus, setBidStatus] = useState<string>('pending');
	const [claimBidPrice, setClaimBidPrice] = useState<number>(0);
	const [claimBidId, setClaimBidId] = useState<string>('');

	useEffect(() => {
		window.scroll(0, 600);
		refetch();
	}, []);

	// Get NFT
	const onSuccessGetNFT = (data: any) => {
		if (data.data.success) {
			const nftDetailsData = data.data.data;
			setNftDetail(nftDetailsData);
			setLoader(false);
			// Get Activities
			setBeforeGetActivities(true);
			// Get Offers and Bids
			if (nftDetailsData?.auction?.sellingMethod) {
				if (nftDetailsData?.auction?.sellingMethod === 1) {
					setBeforeGetOffers(true);
				} else {
					setBeforeGetBids(true);
				}
			}
			setNextBidFivePercHigh(data.data.data);
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading: isLoadingNFT, refetch } = useGetData(
		'GetNFT',
		`nfts/get/${nftId}`,
		null,
		onSuccessGetNFT
	);

	//get activities
	const onSuccessGetActivities = (data: any) => {
		if (data.data.success) {
			setActivities(data.data.data);
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading: isLoadingActivity } = useGetData(
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

	const { isLoading: isLoadingOffers } = useGetData(
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

	const { isLoading: isLoadingBids } = useGetData(
		'GetBids',
		'bid/list',
		ENV.objectToQueryString({ nftId: nftDetail._id }),
		onSuccessGetBids,
		null,
		beforeGetBids
	);

	useEffect(() => {
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
			} else {
				balance = await getBalance();
			}
			setBalance(balance);
			// setLoader(true);
		};
		getBannerData();
	}, [props.match.params.id]);

	useEffect(() => {
		if (props.createAuth) {
			setLoader(false);
			props.beforeBid();
			history.push('/explore/allNFT');
		}
	}, [props.createAuth]);

	useEffect(() => {
		if (props.buyAuth) {
			setLoader(false);
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
		let fivePerc: any = '';
		const { highestBid } = data.auction || {};
		const { currentPrice, collectionId } = data;
		if (highestBid === 0 || highestBid === undefined) {
			fivePerc = (5 / 100) * currentPrice;
			fivePerc = fivePerc + currentPrice;
		} else {
			fivePerc = (5 / 100) * highestBid;
			fivePerc = fivePerc + highestBid;
		}
		const result = fivePerc.toString().slice(0, 8);
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
					(item: any) => item._id !== nftDetail._id
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
		if (isUserLoggedIn(history, nftDetail?.blockchainType)) {
			if (
				(blockchainType === 'polygon' ||
					blockchainType === 'ethereum' ||
					blockchainType === 'bsc') &&
				nftDetail?.auction?.auctionEnded === false &&
				connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase() &&
				bidCount.length === 0
			) {
				let result;
				if (!nftDetail?.lazyMinted) {
					const result = await cancelNFTListing(
						nftDetail?.auction?.sellId,
						nftDetail?.auction?.sellingMethod
					);
				} else {
					result = true;
				}
				if (result) {
					try {
						cancelAuction({ auctionId: nftDetail?.auction?._id });
					} catch (error) {
						toast.success('Something went wrong while cancel listing');
					}
				}
				return;
			}
			if (
				blockchainType === 'solana' &&
				nftDetail?.auction?.sellingMethod === 2 &&
				nftDetail?.auction?.auctionEnded === false &&
				nftDetail?.auction?.status === 'claimNft' &&
				nftDetail.activeAuction !== null
			) {
				const result = await executeSaleForLiveAuction(
					nftDetail?.auction?.sellerPublicKey,
					nftDetail?.mint,
					wallet,
					nftDetail?.auction?.highestBid
				);

				if (result) {
					EndAuctionFromBackend();
				}
				return;
			}
			if (
				blockchainType?.toLowerCase() === 'solana' &&
				nftDetail?.auction?.sellingMethod === 1 &&
				nftDetail?.auction?.status === 'active' &&
				connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase()
			) {
				const { sellerTradeState } = nftDetail.auction || {};
				if (sellerTradeState) {
					const response: any = await cancelItemFromListing(
						wallet,
						sellerTradeState
					);
					if (response) {
						try {
							cancelAuction({
								auctionId: nftDetail?.auction?._id,
								txnHash: response?.signature,
							});
						} catch (error) {
							toast.success('Something went wrong while cancel listing');
						}
					}
				}
				return;
			}
			if (
				blockchainType === 'solana' &&
				nftDetail?.auction?.sellingMethod === 2 &&
				nftDetail?.auction?.auctionEnded === false &&
				connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase() &&
				bidCount.length === 0
			) {
				const result = await cancelListingForLiveAuction(
					wallet,
					nftDetail?.mint
				);

				if (result) {
					try {
						cancelAuction({
							auctionId: nftDetail?.auction?._id,
							txnHash: result,
						});
					} catch (error) {
						toast.success('Something went wrong while cancel listing');
					}
				}
				return;
			}
			if (
				blockchainType === 'solana' &&
				nftDetail?.auction?.sellingMethod === 2 &&
				nftDetail?.auction?.auctionEnded === true &&
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
						}
					} catch (error) {
						toast.success('Something went wrong while claiming');
					}
				}
				return;
			}
			if (
				isOwner() &&
				nftDetail?.auction?.sellingMethod === 2 &&
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
		if (nftDetail?.auction?.sellingMethod === 2) {
			setBidModalShow(true);
		}
		if (nftDetail?.auction?.sellingMethod === 1) {
			setModalShow(true);
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

	const calculatePricePercantage = () => {
		let fivePerc: any;
		let result: any;
		const { highestBid } = nftDetail?.auction || {};
		const { currentPrice } = nftDetail;
		if (highestBid === 0 || highestBid === undefined) {
			fivePerc = (5 / 100) * currentPrice;

			result = fivePerc + currentPrice;

			return result;
		} else {
			fivePerc = (5 / 100) * highestBid;
			result = fivePerc + highestBid;
			return result.toString().slice(0, 8);
		}
	};
	useEffect(() => {
		const bct: any = nftDetail.blockchainType;
		const coin = curreny1[bct];
		axios
			.get(
				`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${coin},USD`
			)
			.then((res) => {
				const currentUSD = res.data.USD;
				setExchangeRate(currentUSD);
			});
	}, [currency, nftDetail]);

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
	const handleModalSubmit = async () => {
		if (isUserLoggedIn(history, nftDetail?.blockchainType)) {
			setLoader(true);
			if (nftDetail?.auction?.sellingMethod === 2) {
				placeBid();
			} else {
				makeOffer();
			}
		}
	};
	const placeBid = async () => {
		const { connectedAddress } = props;
		const { auction, ownerAddress, _id, ownerId, tokenId, mint } = nftDetail;
		try {
			let result = undefined;
			if (ENV.getUserKeys('blockchainType').blockchainType === 'solana') {
				result = await bidForLiveAuction(
					wallet,
					auction?.sellerPublicKey,
					mint,
					price
				);
			} else if (
				ENV.getUserKeys('blockchainType').blockchainType !== 'algorand'
			) {
				result = await placeABid(price, auction?.sellId);
			} else {
				result = await placeBidOnAlgorand(
					+price,
					connectedAddress,
					ownerAddress,
					auction?.sellId,
					tokenId
				);
			}
			if (result) {
				const payload = {
					ownerId: ownerId,
					auctionId: auction?._id,
					bidAmount: price,
					nftId: _id,
					bidBy: ENV.getUserKeys('_id')._id,
					isAccepted: false,
					toAddress: ownerAddress,
					fromAddress: connectedAddress,
					blockchainType: ENV.getUserKeys('blockchainType').blockchainType,
				};

				props.beforeBid();
				props.placeBid(payload);
				createActivity('Bid', price);
			}
		} catch (err: any) {
			setLoader(false);
			toast.error(err);
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
		}
	};
	const getPercentageChange = (oldNumber: any, newNumber: any) => {
		const decreaseValue = oldNumber - newNumber;

		return (decreaseValue / oldNumber) * 100;
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
				setDisabled(true);
				if (nftDetail.lazyMinted) {
					BuyLazyNft();
				} else {
					// try {

					if (blockchainType === 'solana') {
						const { mint } = nftDetail;
						const { sellerTradeState, sellingConfig } = nftDetail.auction;
						const buyFixedPriceResponse = await buyNowFixedPriceAuction(
							wallet,
							mint,
							sellerTradeState,
							sellingConfig?.price?.amount
						);

						if (buyFixedPriceResponse) {
							const payload = {
								userId,
								nftId,
								ownerAddress: props.connectedAddress,
							};
							props.beforeOffer();
							props.buyNow(payload);
							createActivity('Transfer', false, props.connectedAddress);
							return;
						}

						// TODO: Show pop-up with errors

						return;
					}

					const currentPrice = nftDetail.currentPrice;
					const nftToken = nftDetail?.auction?.sellId;

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
		} catch (err: any) {
			toast.error(err);
		} finally {
			setDisabled(false);
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

			setConfirmed('pending');
			const res = await lazyMint(
				tokenId,
				copies,
				ownerAddress,
				metaData,
				currentPrice,
				contractAddress,
				setTransactionHash,
				setConfirmed
			);
			const payload = {
				userId,
				nftId,
				ownerAddress: props.connectedAddress,
				tokenId: res,
			};
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

		if (isOwner() || nftDetail?.auction?.sellingMethod === 1) {
			return true;
		}
		if (startDate && endDate && nftDetail?.auction?.sellingMethod) {
			const currentDate = new Date();
			const auctionStartDate = new Date(startDate);
			const auctionEndDate = new Date(endDate);
			if (
				currentDate > auctionStartDate &&
				currentDate < auctionEndDate &&
				blockchainType !== 'solana'
			) {
				return true;
			} else if (
				currentDate > auctionStartDate &&
				// currentDate > auctionEndDate &&
				blockchainType === 'solana'
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
		} else {
			return 'Sale ends ' + auctionEndTimeConversion(auctionEndDate);
		}
	};
	const getBidsListOfAuction = async () => {
		const auctionEndDate = new Date(nftDetail?.auction?.auctionEndDate);
		const currentDate = new Date();
		if (currentDate > auctionEndDate) {
			if (!initial) {
				let queryString: any = {
					nftId: nftDetail._id,
					// auctionId: nftDetail?.auction?._id,
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

				if (!initial) {
					setInitial(true);
				}

				if (newBids?.length > 0) {
					const highestBidByUser = newBids.reduce((max: any, obj: any) =>
						max.bidAmount > obj.bidAmount ? max : obj
					);
					const blockChainType =
						ENV.getUserKeys('blockchainType')?.blockchainType;

					if (
						highestBidByUser.fromAddress === connectedAddress &&
						blockChainType !== 'solana'
					) {
						//
						if (!claimNFT) {
							setClaimNFT(true);
						}
					}
				}
			}
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			isAuctionEnded();
		}, 3000);
		return () => clearInterval(interval);
	}, [nftDetail, initial]);

	const isAuctionEnded = async () => {
		if (
			nftDetail &&
			nftDetail.blockchainType === 'solana' &&
			nftDetail?.auction?.sellingMethod === 2
		) {
			await getBidsListOfAuction();
		} else {
			if (
				nftDetail &&
				nftDetail?.auction?.sellingMethod === 2 &&
				nftDetail?.activeAuction !== null
			) {
				await getBidsListOfAuction();
			}
		}
	};

	const EndAuction = async () => {
		try {
			setLoader(true);
			const { ownerId } = nftDetail;
			const { sellingMethod, sellId } = nftDetail?.auction || {};

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
				auctionId: nftDetail?.auction?._id,
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
		`nfts/delete/${props.match.params.id}`,
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
		history.push('/explore/allNFT');
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
		lowestNftPrice,
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
	}: any = nftDetail?.auction || {};
	const { connectedAddress } = props;
	const bidCount = nftDetail?.auction?.bids;
	const nftInfo: any = [
		{
			title: 'Contract Address',
			value:
				blockchainType === 'solana'
					? ''
					: ENV?.goerliMintingContract &&
					  ENV.goerliMintingContract.slice(0, 6) +
							'....' +
							ENV.goerliMintingContract.slice(-6),
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
				btns={isOwner() ? true : false}
				onEdit={() => {
					if (isOwnerLoggedIn()) {
						toast.info('Please sign in to edit NFT');
						return history.push('/connect-wallet');
					}
					history.push(`/asset/edit/${props.match.params.id}`);
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
								<Offers
									data={{ bids, exchangeRate, lowestNftPrice, sellingMethod }}
								/>
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
			/>

			<BidModal
				show={bidModalShow}
				calculatePricePercantage={calculatePricePercantage}
				handleModalSubmit={handleModalSubmit}
				onChange={onChange}
				decimalNumberValidator={decimalNumberValidator}
				balance={balance}
				price={price}
				onHide={async () => setBidModalShow(false)}
			/>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	nftDetail: state.nft.nftsData,
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
