import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./nftdetail.scss";
import {
  getNFT,
  getNFTsByCollection,
  getMyLikedNfts,
  beforeNFT,
  createActivity,
  getActivities,
  getItemsListing,
  beforeNFTByCollection,
} from "../../Components/Nfts/nfts.action.js";
import FullPageLoader from "../../Components/FullPageLoader/FullPageLoader";
import { connect } from "react-redux";
import { ENV } from "../../config/config";
import { decimalNumberValidator } from "../../utils/functions";
import {
  toggleLikeDislike,
  beforeTogleLikeDislike,
} from "../all-nfts/explore.action";
import moment from "moment";
import axios from "axios";
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
} from "../../utils/web3";
import {
  placeBid,
  getBids,
  getBidSByNftId,
  beforeBid,
  deleteBid,
} from "../../Components/Bids/bids.action";
import {
  makeOffer,
  getOffers,
  beforeOffer,
  deleteOffer,
  buyNow,
} from "../../Components/Offers/offers.action";
import { toast } from "react-toastify";
import BuyModal from "../../Components/Modals/BuyModal/BuyModal";
import BidModal from "../../Components/Modals/BidModal/BidModal";
import useVideoPlayer from "../../Components/TestVideoCard/Components/UseVideoPlayer";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import StatsInfo from "../create-nft/components/statsinfo";
import LevelsInfo from "../create-nft/components/levelsinfo";
import Banner from "../../Components/Banner/Banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg.png";
import OwnCollectionToday from "../../Components/OwnCollectionToday/OwnCollectionToday";
import errorHandler from "../../context/errorHandler/ErrorHandlerContext";
import { Images } from "../../assets/assets";
import NftCard from "../../Components/NftCard/NftCard";
import NFTDetailLoader from "../../Components/ContentLoader/NftDetailLoader";
import Audio from "../../Components/Audio/Audio";
import { getBannerData, nftBanner } from "../../utils/exportData";
import Table from "../../Components/Table/Table";
import { useGetData } from "../../hooks/Common";

const NFTDetail = (props: any) => {
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [toggle, setToggle] = React.useState<boolean>(true);
  const [likedNfts, setLikedNfts] = useState<any>();
  const [nftDetail, setNftDetail] = useState<any>("");
  const [listedItem, setListedItem] = useState<any>([]);
  const [nfts, setNFTs] = useState<any>([]);
  const [activities, setActivities] = useState<any>([]);
  // const [itemsListing, setItemsListing] = useState([]);
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
    refetch()
  }, []);

  // Get NFT
  const onSuccessGetNFT = (data: any) => {
    console.log(data,"data==>")
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
      setNextBidFivePercHigh( data.data.data)
    } else {
      setError(data.data.message);
    }
  };

  const { isLoading: isLoadingNFT ,refetch} = useGetData(
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
      let qs: any = { userId: ENV.getUserKeys("_id")._id };
      qs = ENV.objectToQueryString(qs);
      props.getMyLikedNfts(qs);
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

  // useEffect(() => {
  //   if (props.getAuthOffer) {
  //     setOffers(props.offers);
  //   }
  // }, [props.getAuthOffer]);

  // useEffect(() => {
  //   if (props.getAuth) {
  //     setBids(props.bids);
  //   }
  // }, [props.getAuth]);

  // useEffect(() => {
  //   if (props.nftsAuth) {
  //     setNftDetail(props.nftDetail);
  //     setLoader(false);
  //     props.beforeNFT();

  //     //get activities
  //     let activityQs: any = { nftId: props.nftDetail._id };
  //     activityQs = ENV.objectToQueryString(activityQs);
  //     props.getActivities(activityQs);

  //     //get offers
  //     if (props.nftDetail?.auction?.sellingMethod) {
  //       if (props.nftDetail?.auction?.sellingMethod === 1) {
  //         let qs: any = { nftId: props.nftDetail._id };
  //         qs = ENV.objectToQueryString(qs);
  //         props.getOffers(qs);
  //       } else {
  //         let qs: any = { nftId: props.nftDetail._id };
  //         qs = ENV.objectToQueryString(qs);
  //         props.getBids(qs);
  //       }
  //     }

  //     // Set Next bid to 5%
  //     setNextBidFivePercHigh();
  //   }
  // }, [props.nftsAuth]);

  const setNextBidFivePercHigh = (data:any) => {
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
            fromAddress: await connectMetamask(),
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
          fromAddress: await connectMetamask(),
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
              let ownerAddress = await getWalletAddress();
              let payload = {
                userId,
                nftId,
                ownerAddress,
              };
              props.beforeOffer();
              props.buyNow(payload);
              createActivity("Transfer", false, ownerAddress);
            }
          } catch (err: any) {
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
      let ownerAddress = await getWalletAddress();
      let payload = {
        userId,
        nftId,
        ownerAddress,
      };
      createActivity("Transfer", false, ownerAddress);
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
      fromAddress:
        type === "Transfer" ? ownerAddress : await getWalletAddress(),
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
    description,
    currentPrice,
    ownerAddress,
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
        ENV?.mintsClubContractAddress &&
        ENV.mintsClubContractAddress.slice(0, 6) +
          "...." +
          ENV.mintsClubContractAddress.slice(-6),
    },
    {
      title: "Token ID",
      value: tokenId,
    },
    {
      title: "Token Standard",
      value: "ERC-1155",
    },
    {
      title: "Blockchain",
      value: "Ethereum",
    },
  ];
  console.log(nftDetail,"nftDetail")
  return (
    <>
      <Banner
        subHeading={nftBanner.subHeading}
        heading={nftBanner.heading}
        content={nftBanner.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      {loader && <FullPageLoader />}

      <div className="new-nft-detail padding-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xl-3 order-1 order-lg-0 d-none d-lg-block">
              {/* <button onClick={() => BuyLazyNft()}>buyNOw</button> */}
              <div className="detail-box">
                <h6>Properties</h6>
                <hr />
                {properties && properties.length > 0 ? (
                  properties.map((detail: any, i: any) => {
                    return (
                      <div
                        className="detail-rounded-type d-flex align-items-center"
                        key={i}
                      >
                        <div className="detail-rounded-name">
                          <p>{detail.name}:</p>
                        </div>
                        <div className="detail-content">
                          <p>{detail.type}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center npf-text">No Properties Found</p>
                )}
              </div>
              <div className="detail-box">
                <h6>Stats</h6>
                <hr />
                <div>
                  {stats && stats?.length > 0 ? (
                    stats.map((item: any) => {
                      return <StatsInfo name={item.name} value={item.value} />;
                    })
                  ) : (
                    <p className="text-center npf-text">No Stats Found</p>
                  )}
                </div>
              </div>
              <div className="detail-box">
                <h6>Levels</h6>
                <hr />
                <div>
                  {levels && levels.length > 0 ? (
                    levels.map((item: any) => {
                      return (
                        <LevelsInfo
                          name={item.name}
                          value={item.value}
                          i={undefined}
                        />
                      );
                    })
                  ) : (
                    <p className=" text-center npf-text">No Levels Found</p>
                  )}
                </div>
              </div>
              <div className="detail-box">
                <h6>Details</h6>
                <hr />
                {nftInfo.map((item: any) => {
                  return (
                    <div
                      className={`detail-rounded-type d-flex align-items-center ${
                        item.title === "Contract Address"
                          ? "text-highlighted"
                          : ""
                      }`}
                      onClick={() => {
                        item.title === "Contract Address" &&
                          window.open(
                            "https://rinkeby.etherscan.io/address/0x328106925e0e5721725ec92fc256b7e6cbdd8e43",
                            "_blank"
                          );
                      }}
                    >
                      <div className={`detail-rounded-name `}>
                        <p>{item.title}:</p>
                      </div>
                      <div className={`detail-content`}>
                        <p> {item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-lg-8 col-xl-9 order-0 order-lg-1">
              <div className="row g-4 g-lg-5 g-xl-4">
                <div className="col-xl-6">
                  {fileType === "image" ? (
                    <div className="nft-img-container mx-auto mx-lg-0">
                      <div
                        style={{
                          display: `${contentLoader ? "block" : "none"}`,
                        }}
                      >
                        <NFTDetailLoader />
                      </div>
                      <img
                        src={image}
                        alt="nft-image"
                        onLoad={() => setContentLoader(false)}
                        style={{
                          display: `${!contentLoader ? "block" : "none"}`,
                        }}
                      />
                    </div>
                  ) : fileType === "video" ? (
                    <div className="nft-img-container nft-video-container mx-auto mx-lg-0">
                      <div
                        style={{
                          display: `${contentLoader ? "block" : "none"}`,
                        }}
                      >
                        <NFTDetailLoader />
                      </div>
                      <video
                        src={image}
                        ref={videoElement}
                        onEnded={() => {
                          togglePlay();
                        }}
                        onCanPlay={() => {
                          setContentLoader(false);
                        }}
                        // onTimeUpdate={handleOnTimeUpdate}
                        style={{
                          display: `${!contentLoader ? "block" : "none"}`,
                        }}
                      />
                      <div className="controls">
                        <div className="actions">
                          <button
                            className="play-pause-btn d-flex align-items-center justify-content-center"
                            onClick={togglePlay}
                          >
                            {playerState.isPlaying ? (
                              <BsFillPauseFill />
                            ) : (
                              <BsFillPlayFill />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : fileType === "audio" ? (
                    <>
                      <div
                        style={{
                          display: `${contentLoader ? "block" : "none"}`,
                        }}
                      >
                        <NFTDetailLoader />
                      </div>
                      <Audio
                        src={image}
                        onLoadCallback={async () => setContentLoader(false)}
                        loader={contentLoader}
                        fileType={""}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-xl-6">
                  <div className="nft-img-detail">
                    <h5>NFT Details:</h5>
                  </div>
                  <div className="nft-img-detail-box">
                    <div className="nft-detail-rounded-box">
                      <p>
                        {name && name.length > 30
                          ? name.slice(0, 30) + "..."
                          : name}
                      </p>
                    </div>
                    <div className="row g-2 g-sm-4">
                      <div className="col-6 col-sm-4 col-xl-6 col-xxl-4">
                        <div className="nft-detail-rounded-box">
                          <p>
                            Total Copies: <span>{copies}</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-6 col-sm-4 col-xl-6 col-xxl-4">
                        <div className="nft-detail-rounded-box">
                          <p>
                            Sold: <span>{copies - remainingCopies}</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-6 col-sm-4 col-xl-6 col-xxl-4">
                        <div className="nft-detail-rounded-box">
                          <p>
                            Remaining: <span>{remainingCopies}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="nft-detail-price d-flex align-items-center  mb-3">
                      <div className="d-flex align-items-center me-2">
                        <img src={Images.onsale} className="me-3" />
                        <h2>{currentPrice}</h2>
                      </div>
                      <div className="price-in-dollar">
                        <p> ($ {(currentPrice * exchangeRate).toFixed(2)})</p>
                      </div>
                    </div>
                    <div className="nft-detail-rounded-box on-sale">
                      <p>
                        Copies On Sale:{" "}
                        <span> {copiesForAuction ? copiesForAuction : 0}</span>
                      </p>
                    </div>
                    <div className="nft-detail-date d-flex align-items-center">
                      <p>
                        {sellingMethod && sellingMethod === 2 && (
                          <>
                            {auctionEndDate &&
                              checkIfAuctionStartedorEnded(
                                auctionStartDate,
                                auctionEndDate
                              ) && (
                                <>
                                  <img
                                    src={Images.ClockIcon}
                                    alt="clock-icon"
                                    className="me-1"
                                  />
                                  <span>
                                    {checkIfAuctionIsStarted(
                                      auctionStartDate,
                                      auctionEndDate
                                    )}{" "}
                                    {/* {auctionEndTimeConversion(
                                      new Date(auctionEndDate)
                                    )}{" "} */}
                                  </span>
                                </>
                              )}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="nft-detail-owner d-flex align-items-center">
                    <img
                      src={
                        user?.profileImage
                          ? user?.profileImage
                          : Images.placeholderImg
                      }
                      alt="avatar"
                      className="me-2"
                    />
                    <p>
                      Owned by:
                      <span className="text-capitalize ms-1">
                        {" "}
                        {ownerAddress?.toUpperCase() ===
                        connectedAddress?.toUpperCase()
                          ? "You"
                          : user?.username
                          ? user.username
                          : "unnamed"}
                      </span>
                    </p>
                  </div>
                  <div className="nft-detail-btn">
                    {checkIfAuctionStartedorEnded(
                      auctionStartDate,
                      auctionEndDate
                    ) &&
                      !claimNFT && (
                        <button
                          // disabled={disabled}
                          onClick={() => handleRouting()}
                        >
                          {" "}
                          {ownerAddress?.toUpperCase() ==
                            connectedAddress.toUpperCase() && sellingMethod == 2 && auctionEnded == false
                            ? "End Auction"
                            : ownerAddress?.toUpperCase() ==
                                connectedAddress.toUpperCase() &&
                              sellingMethod == 1 && auctionEnded == false
                            ? "Resale"
                            : ownerAddress?.toUpperCase() ==
                              connectedAddress.toUpperCase()
                            ? "Sell"
                            : sellingMethod === 2 && auctionEnded == false
                            ? "Place A Bid"
                            : sellingMethod === 1  && auctionEnded == false
                            ? "Buy Now"
                            : ""}
                        </button>
                      )}

                    {claimNFT && (
                      <button onClick={() => EndAuction()}>
                        {"Claim NFT"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-12 d-block d-lg-none">
                  <div className="detail-box">
                    <h6>Properties</h6>
                    <hr />
                    {properties && properties.length > 0 ? (
                      properties.map((detail: any, key: any) => {
                        return (
                          <div
                            className="detail-rounded-type d-flex align-items-center"
                            key={key}
                          >
                            <div className="detail-rounded-name">
                              <p>{detail.name}:</p>
                            </div>
                            <div className="detail-content">
                              <p>{detail.type}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center">No Properties Foud</p>
                    )}
                  </div>
                  <div className="detail-box">
                    <h6>Stats</h6>
                    <hr />
                    {stats && stats?.length > 0 ? (
                      stats.map((item: any) => {
                        return (
                          <StatsInfo name={item.name} value={item.value} />
                        );
                      })
                    ) : (
                      <p className="text-center">No Stats Foud</p>
                    )}
                  </div>

                  <div className="detail-box">
                    <h6>Levels</h6>
                    <hr />
                    <div>
                      {levels && levels.length > 0 ? (
                        levels.map((item: any, i: any) => {
                          return (
                            <LevelsInfo
                              name={item.name}
                              value={item.value}
                              i={i}
                            />
                          );
                        })
                      ) : (
                        <p className="text-center">No Levels Foud</p>
                      )}
                    </div>
                  </div>
                  <div className="detail-box">
                    <h6>Details</h6>
                    <hr />
                    {nftInfo.map((detail: any, i: any) => {
                      return (
                        <div
                          className="detail-rounded-type d-flex align-items-center"
                          key={i}
                        >
                          <div className="detail-rounded-name">
                            <p>{detail.title}:</p>
                          </div>
                          <div className="detail-content">
                            <p>{detail.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-12 mt-lg-5">
                  <div className="detail-bg-box">
                    <h5>Descriptions:</h5>
                    <hr />
                    <p>{description}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="detail-bg-box">
                    <h5>Offers:</h5>
                    <hr />
                    <Table
                      data={bids}
                      titles={[
                        "Price",
                        "USD Price",
                        "Floor Difference",
                        "From",
                      ]}
                      exchangeRate={exchangeRate}
                      lowestNftPrice={lowestNftPrice}
                      status="Offers"
                      show={sellingMethod === 2}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="detail-bg-box">
                    <h5>Activity:</h5>
                    <hr />
                    {activities && activities.length > 0 && (
                      <Table
                        data={activities}
                        titles={["Event", "Price", "From", "To", "Date"]}
                        status="Activities"
                        lowestNftPrice={0}
                        exchangeRate={0}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 order-2 mt-5">
              <div className="detail-more-collection">
                <h6>More from this collection</h6>
              </div>
              <div className="row align-items-center g-3">
                {nfts && nfts.length > 0 ? (
                  nfts.map((nft: any, id: any) => {
                    if (id <= 3) {
                      return (
                        <div
                          className="col-10 col-sm-6 col-md-4 col-lg-3 px-1"
                          key={id}
                        >
                          {
                            <NftCard
                              data={nft}
                              handleLikesTogleApi={handleLikesTogleApi}
                              likedNfts={likedNfts}
                              owner={nft?.owner[0]}
                              path="/explore/nftdetail/"
                            />
                          }
                        </div>
                      );
                    }
                  })
                ) : (
                  <p className="text-center mt-4 text">No NFTs Found</p>
                )}
              </div>
            </div>
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
