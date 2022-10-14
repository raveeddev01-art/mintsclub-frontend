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
	connectMetamask,
	BuyFixedPriceNFT,
	getWalletAddress,
	getBalance,
	validateNetwork,
	claimNFTfromContract,
	endAuctionFromContract,
	redeemVoucher,
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
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg.png';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
import { Images, blockchainIcons } from '../../assets/assets';
import NFTDetailLoader from '../../Components/ContentLoader/NftDetailLoader';
import Audio from '../../Components/Audio/Audio';
import { getBannerData, nftBanner } from '../../utils/exportData';
import Table from '../../Components/Table/Table';
import { useGetData, useDeleteData } from '../../hooks/Common';
import MetaData from '../../Components/MetaData/MetaData';
import MetaDataSmall from '../../Components/MetaData/MetaDataSmall';
import FileDetail from '../../Components/FileDetail/FileDetail';
import MoreNFTs from './components/MoreNFTs/MoreNFTs';
import Offers from './components/Offers';
import Activities from './components/Activities';
import FileViewer from './components/FileViewer';
import { CHAIN_LOGOS, CHAIN_TITLE } from '../../utils/helpers/helpers';
import { CHAINS_INTERFACE } from '../../interfaces/components';
const NFTDetail = (props: any) => {
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [toggle, setToggle] = React.useState<boolean>(true);
  const [likedNfts, setLikedNfts] = useState<any>();
  const [nftDetail, setNftDetail] = useState<any>("");
  const [nfts, setNFTs] = useState<any>([]);
  const [activities, setActivities] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [price, setPrice] = useState<number>(0);
  const [bids, setBids] = useState<any>(null);
  const [offers, setOffers] = useState<any>(null);
  const [modalShow, setModalShow] = useState<any>(false);
  const [likeButtonDisable, setLikeBtnDisable] = useState<any>(null);
  const [modal, setModal] = useState<number>(1);
  const [confirmed, setConfirmed] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [transactionSuccess, setTransactionSuccess] = useState<any>(false);
  const [bidModalShow, setBidModalShow] = useState<any>(false);
  const [balance, setBalance] = useState<any>("");
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
  let nftId = props.match.params.id;
  let userId = ENV.getUserKeys("_id")._id;

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
    "GetNFT",
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
    "GetActivities",
    "activity/get",
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
    "GetOffers",
    "offer/list",
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
    "GetBids",
    "bid/list",
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
      let balance = await getBalance();
      setBalance(balance);
      // setLoader(true);
    };
    getBannerData();
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.createAuth) {
      setLoader(false);
      props.beforeBid();
      history.push("/explore/allNFT");
    }
  }, [props.createAuth]);

  useEffect(() => {
    if (props.buyAuth) {
      setLoader(false);
      setDisabled(false);
      setTransactionSuccess(true);
      props.getNFT(nftId);
      if (ENV.getUserKeys("_id")?._id) {
        let qs: any = { userId: ENV.getUserKeys("_id")._id };
        qs = ENV.objectToQueryString(qs);
        props.getMyLikedNfts(qs);
      }
      validateIfLiked();
      // props.getBids();
      props.beforeOffer();
      toast.success("You have purchased NFT successfully");
      history.push("/userprofile");
    }
  }, [props.buyAuth]);

  useEffect(() => {
    if (props.createAuthOffer) {
      setLoader(false);
      history.push("/explore/allNFT");
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
    let fivePerc: any = "";
    const { highestBid } = data.auction || {};
    const { currentPrice, collectionId } = data;
    if (highestBid === 0 || highestBid === undefined) {
      fivePerc = (5 / 100) * currentPrice;
      fivePerc = fivePerc + currentPrice;
    } else {
      fivePerc = (5 / 100) * highestBid;
      fivePerc = fivePerc + highestBid;
    }
    let result = fivePerc.toString().slice(0, 8);
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

  // useEffect(() => {
  //   if (props.activitiesAuth) {
  //     setActivities(props.activities);
  //   }
  // }, [props.activitiesAuth]);

  const handleRouting = async () => {
    const { ownerAddress } = nftDetail;

    let currentAddress = connectedAddress?.toUpperCase();
    if (
      ENV.getUserKeys("address")?.address?.toUpperCase() ===
      connectedAddress?.toUpperCase()
    ) {
      if (await validateNetwork()) {
        if (
          currentAddress === ownerAddress.toUpperCase() &&
          nftDetail?.auction?.sellingMethod === 2
        ) {
          EndAuction();
        } else if (currentAddress === ownerAddress.toUpperCase()) {
          history.push({
            pathname: `/sell-item/${nftDetail._id}`,
            state: nftDetail,
          });
        } else if (nftDetail?.auction?.sellingMethod === 2) {
          setBidModalShow(true);
        } else if (nftDetail?.auction?.sellingMethod === 1) {
          setModalShow(true);
        } else {
        }
      } else {
        toast.error(
          "Please Connect Your Metamask With Ethereum Rinkby Network"
        );
      }
    } else {
      if (ENV.getUserKeys("address")?.address) {
        toast.info("Please login with new connected account");
      } else {
        toast.info("Please login first to continue");
      }
      history.push({
        pathname: `/connect-wallet`,
        state: `/nftdetail/${props.match.params.id}`,
      });
    }
  };

  const handleLikesTogleApi = async (nftId: string, status: string) => {
    if (await validateNetwork()) {
      if (!likeButtonDisable) {
        setLikeBtnDisable(true);
        setToggle(!toggle);

        let userId = ENV.getUserKeys("_id")._id;

        let data = {
          userId,
          nftId,
          count: 1,
        };

        if (status === "dislike" && nftDetail.likesCount > 0) {
          let nft = nftDetail;
          nft.likesCount = nft.likesCount - 1;

          setNftDetail(nft);
          props.toggleLikeDislike(data);
        } else {
          let nft = nftDetail;
          nft.likesCount = nft.likesCount + 1;

          setNftDetail(nft);

          props.toggleLikeDislike(data);
        }
      }
    } else {
      toast.error("Please Connect Your Metamask With Ethereum Rinkby Network");
    }
  };

  //match if nft liked

  const validateIfLiked = (nfts?: any, nft?: any) => {
    if (nfts && nfts?.length > 0) {
      let result = nfts.find((item: any) => item.nftId == nft._id);

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
    axios
      .get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ETH"
      )
      .then((res) => {
        const currentUSD = res.data.USD;
        setExchangeRate(currentUSD);
      });
  }, []);

  useEffect(() => {
    if (props.togleLikeRes) {
      setLikeBtnDisable(false);
      props.beforeTogleLikeDislike();
    }
  }, [props.togleLikeRes]);

  const onChange = (e: any) => {
    let result = e.target.value.slice(0, 8);

    setPrice(result);
  };
  const handleModalSubmit = async () => {
    if (await validateNetwork()) {
      setLoader(true);

      if (nftDetail?.auction?.sellingMethod === 2) {
        placeBid();
      } else {
        makeOffer();
      }
    } else {
      toast.error("Please Connect Your Metamask With Ethereum Rinkby Network");
    }
  };
  const placeBid = async () => {
    if (await validateNetwork()) {
      try {
        let result = await placeABid(price, nftDetail?.auction?.sellId);
        if (result) {
          const payload = {
            ownerId: nftDetail.ownerId,
            auctionId: nftDetail?.auction?._id,
            bidAmount: price,
            nftId: nftDetail._id,
            bidBy: ENV.getUserKeys("_id")._id,
            isAccepted: false,
            toAddress: nftDetail.ownerAddress,
            fromAddress: props.connectedAddress,
          };
          props.beforeBid();
          props.placeBid(payload);
          createActivity("Bid", price);
        }
      } catch (err: any) {
        setLoader(false);
        toast.error(err);
      }
    } else {
      toast.error("Please Connect Your Metamask With Ethereum Rinkby Network");
    }
  };

  const makeOffer = async () => {
    setLoader(true);
    try {
      let result = true;
      if (result) {
        const payload = {
          toAddress: nftDetail.ownerAddress,
          fromAddress: props.connectedAddress,
          offerBy: ENV.getUserKeys("_id")._id,
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
    var decreaseValue = oldNumber - newNumber;

    return (decreaseValue / oldNumber) * 100;
  };

  const auctionEndTimeConversion = (auctionEndDate: any) => {
    var dateString = moment(new Date(auctionEndDate))
      .utc(true)
      .format("MMMM D, Y");
    var timeString = moment(new Date(auctionEndDate)).utc(true).format("h:mma");
    var totalDateTime = dateString + " at " + timeString + " PKT";
    return totalDateTime;
  };

  const BuyNow = async () => {
    console.log( ENV.getUserKeys("address")?.address," address")
    console.log(connectedAddress,"connectedAddress")
 
    if (
      ENV.getUserKeys("address")?.address?.toUpperCase() ===
      connectedAddress?.toUpperCase()
    ) {
      if (await validateNetwork()) {
        setDisabled(true);
        if (nftDetail.lazyMinted) {
          BuyLazyNft();
        } else {
          try {
            let currentPrice = nftDetail.currentPrice;
            let nftToken = nftDetail?.auction?.sellId;

            const result = await BuyFixedPriceNFT(
              currentPrice,
              nftToken,
              setConfirmed,
              setTransactionHash
            );
            if (result) {
              let payload = {
                userId,
                nftId,
                ownerAddress: props.connectedAddress,
              };
              props.beforeOffer();
              props.buyNow(payload);
              createActivity("Transfer", false, props.connectedAddress);
            }
          } catch (err: any) {
            console.log(err,"err")
            setDisabled(false);
            toast.error(err);
          }
        }
      } else {
        toast.error(
          "Please Connect Your Metamask With Ethereum Rinkby Network"
        );
      }
    } else {
      if (ENV.getUserKeys("address")?.address) {
        toast.info("Please login with new connected account");
      } else {
        toast.info("Please login first to continue");
      }
      history.push({
        pathname: `/connect-wallet`,
        state: `/nftdetail/${props.match.params.id}`,
      });
    }
  };

  const BuyLazyNft = async () => {
    try {
      const { metaData, copies } = nftDetail;
      const { signature, sellId, sellingConfig, copiesForAuction } =
        nftDetail.auction;
      setConfirmed("pending");
      let res = await redeemVoucher(
        {
          uri: metaData,
          signature,
          tokenId: sellId,
          copies: copiesForAuction,
          minPrice: Number(sellingConfig.price.amount),
        },
        setTransactionHash,
        setConfirmed
      );
      let payload = {
        userId,
        nftId,
        ownerAddress: props.connectedAddress,
      };
      createActivity("Transfer", false, props.connectedAddress);
      props.beforeOffer();
      props.buyNow(payload);
    } catch (err: any) {
      setDisabled(false);
      toast.error(err);
    }
  };

  const createActivity = async (type: any, bidPrice: any, address?: any) => {
    const { _id, ownerId, ownerAddress, currentPrice } = nftDetail;
    let price = "";
    let toAddress = "";
    if (bidPrice) {
      price = bidPrice;
    } else {
      price = currentPrice;
    }

    if (type === "Transfer" || type === "Bid") {
      toAddress = address;
    }

    let activityPayload = {
      nftId: _id,
      ownerId,
      fromAddress: type === "Transfer" ? ownerAddress : props.connectedAddress,
      activityType: type,
      toAddress,
      price: price,
    };
    props.createActivity(activityPayload);
  };

  const checkIfAuctionStartedorEnded = (startDate: Date, endDate: Date) => {
    //check if i am owner

    if (
      props.connectedAddress?.toUpperCase() ==
        nftDetail.ownerAddress?.toUpperCase() ||
      nftDetail?.auction?.sellingMethod === 1
    ) {
      return true;
    }
    if (startDate && endDate && nftDetail?.auction?.sellingMethod) {
      let currentDate = new Date();
      let auctionStartDate = new Date(startDate);
      let auctionEndDate = new Date(endDate);

      if (currentDate > auctionStartDate && currentDate < auctionEndDate) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const checkIfAuctionIsStarted = (startDate: Date, endDate: Date) => {
    let currentDate = new Date();
    let auctionStartDate = new Date(startDate);
    let auctionEndDate = new Date(endDate);
    if (currentDate < auctionStartDate) {
      return "Sale will start on " + auctionEndTimeConversion(auctionStartDate);
    } else {
      return "Sale ends " + auctionEndTimeConversion(auctionEndDate);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      isAuctionEnded();
    }, 3000);
    return () => clearInterval(interval);
  }, [nftDetail, initial]);

  const isAuctionEnded = async () => {
    if (nftDetail && nftDetail?.auction?.sellingMethod === 2) {
      let auctionEndDate = new Date(nftDetail?.auction?.auctionEndDate);
      let currentDate = new Date();
      if (currentDate > auctionEndDate) {
        if (!initial) {
          let qs: any = { nftId: nftDetail._id };
          qs = ENV.objectToQueryString(qs);
          let url = `${ENV.url}bid/list`;
          url += `?${qs}`;
          let res = await axios.get(url);
          let newBids = res.data.data.Bids;
          if (!initial) {
            setInitial(true);
          }

          if (newBids?.length > 0) {
            let highestBidByUser = newBids.reduce((max: any, obj: any) =>
              max.bidAmount > obj.bidAmount ? max : obj
            );
            if (highestBidByUser.fromAddress === connectedAddress) {
              if (!claimNFT) {
                setClaimNFT(true);
              }
            }
          }
        }
      }
    }
  };

  const EndAuction = async () => {
    const { ownerId } = nftDetail;
    const { sellingMethod, sellId } = nftDetail?.auction || {};
    try {
      setLoader(true);
      if (userId == ownerId && sellingMethod == 2) {
        let result = await endAuctionFromContract(sellId);
        if (result) {
          EndAuctionFromBackend();
        }
      } else {
        let result = await claimNFTfromContract(sellId);
        if (result) {
          EndAuctionFromBackend();
        }
      }
    } catch (err: any) {
      toast.error(err.message);
      setLoader(false);
    }
  };

  const EndAuctionFromBackend = async () => {
    const headers = {
      Authorization: ENV.Authorization,
      "x-auth-token": ENV.x_auth_token,
      "Access-Control-Allow-Origin": "*",
      "x-access-token":
        ENV.getUserKeys("accessToken") &&
        ENV.getUserKeys("accessToken").accessToken
          ? ENV.getUserKeys("accessToken").accessToken
          : "",
    };
    let res = await axios.post(
      `${ENV.url}auctions/endAuction`,
      {
        auctionId: nftDetail?.auction?._id,
      },
      {
        headers: headers,
      }
    );
    if (res.data.success) {
      if (userId == ownerId) {
        props.beforeBid();
        setBids(null);
        toast.success(res.data.message);
      } else {
        props.beforeBid();
        setBids(null);
        toast.success("You have purchased NFT successfully");
      }
      history.push("/userprofile");
    }
  };
  const { mutate: deleteNFT, isLoading } = useDeleteData(
    `nfts/delete/${props.match.params.id}`,
    (res: any) => {
      if (res.data.success) {
        toast.success("NFT Deleted successfully");
        history.push("/userprofile");
      }
    }
  );

  const handleDelete = () => {
    if (isOwner()) {
      if (isOwnerLoggedIn()) {
        toast.info("Please sign in to delete NFT");
        return history.push("/connect-wallet");
      } else {
        deleteNFT(null);
      }
    }
  };
  const isOwner = () => {
    return (
      nftDetail?.ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase()
    );
  };
  const isOwnerLoggedIn = () => {
    return !userId || (userId && userId !== nftDetail.ownerId);
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
  }: any = nftDetail;
  const {
    sellingMethod,
    auctionStartDate,
    auctionEndDate,
    copiesForAuction,
    auctionEnded,
  }: any = nftDetail?.auction || {};

  const { connectedAddress } = props;
  let nftInfo: any = [
    {
      title: "Contract Address",
      value:
        ENV?.goerliMintingContract &&
        ENV.goerliMintingContract.slice(0, 6) +
          "...." +
          ENV.goerliMintingContract.slice(-6),
    },
    {
      title: blockchainType === "solana" ? "Mint" : "Token ID",
      value: blockchainType === "solana" ? mint : tokenId,
    },
    {
      title: "Token Standard",
      value: "ERC-1155",
    },
    {
      title: "Blockchain",
      value:
        CHAIN_TITLE[blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE] ||
        "Ethereum",
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
            toast.info("Please sign in to edit NFT");
            return history.push("/connect-wallet");
          }
          history.push(`/asset/edit/${props.match.params.id}`);
        }}
        onDelete={() => handleDelete()}
      />
      {loader || (isLoading && <FullPageLoader />)}

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
            <MoreNFTs info={{ nfts, handleLikesTogleApi, likedNfts }} />
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
