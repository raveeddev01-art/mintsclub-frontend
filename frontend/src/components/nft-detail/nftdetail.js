import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./nftdetail.css";
import {
  getNFT,
  getNFTsByCollection,
  getMyLikedNfts,
  beforeNFT,
  createActivity,
  getActivities,
  getItemsListing,
  beforeNFTByCollection,
} from "../nfts/nfts.action.js";
import FullPageLoader from "../full-page-loader/full-page-loader.js";
import { connect } from "react-redux";
import { ENV } from "../../config/config";
import { decimalNumberValidator } from "../../utils/functions";
import {
  toggleLikeDislike,
  beforeTogleLikeDislike,
} from "../explore/explore.action";
import moment from "moment";
import axios from "axios";
import {
  BsTagFill,
  BiTransferAlt,
  MdShoppingCart,
  FaHandPaper,
} from "react-icons/all";
import {
  placeABid,
  connectMetamask,
  BuyFixedPriceNFT,
  getWalletAddress,
  getBalance,
  validateNetwork,
  claimNFTfromContract,
  endAuctionFromContract,
} from "../../utils/web3";
import {
  placeBid,
  getBids,
  getBidSByNftId,
  beforeBid,
  deleteBid,
} from "../bids/bids.action";
import {
  makeOffer,
  getOffers,
  beforeOffer,
  deleteOffer,
  buyNow,
} from "../offers/offers.action";
import { toast } from "react-toastify";
import BuyModal from "../modals/BuyModal";
import BidModal from "../modals/BidModal";
import ReactTimeAgo from "react-time-ago";
import useVideoPlayer from "../test-video-card/components/useVideoPlayer";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import StatsInfo from "../create-nft/components/statsinfo";
import LevelsInfo from "../create-nft/components/levelsinfo";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg.png";
import OwnCollectionToday from "../own-collection-today/own-collection-today";
import { Images } from "../../assets/assets";
import NftCard from "../nft-card/nft-card";
import NFTDetailLoader from "../contentLoader/nftDetailLoader";
import Audio from "../audio/audio";
const NFTDetail = (props) => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [toggle, setToggle] = React.useState(true);
  const [likedNfts, setLikedNfts] = useState();
  const [nftDetail, setNftDetail] = useState("");
  const [listedItem, setListedItem] = useState([]);
  const [nfts, setNFTs] = useState([]);
  const [activities, setActivities] = useState([]);
  // const [itemsListing, setItemsListing] = useState([]);
  const [loader, setLoader] = useState(true);
  const [price, setPrice] = useState(0);
  const [bids, setBids] = useState(null);
  const [offers, setOffers] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [likeButtonDisable, setLikeBtnDisable] = useState(null);
  const [modal, setModal] = useState(1);
  const [confirmed, setConfirmed] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [bidModalShow, setBidModalShow] = useState(false);
  const [balance, setBalance] = useState("");
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const videoElement = React.useRef(null);
  const [claimNFT, setClaimNFT] = useState(false);
  const [initial, setInitial] = useState(false);
  const [contentLoader, setContentLoader] = useState(true);
  const { playerState, togglePlay, handleOnTimeUpdate } =
    useVideoPlayer(videoElement);
  let nftId = props.match.params.id;
  let userId = ENV.getUserKeys("_id")._id;
  useEffect(() => {
    window.scroll(0, 600);
  }, []);

  useEffect(async () => {
    props.beforeNFT();
    props.getNFT(nftId);
    props.beforeNFTByCollection();
    let qs = { userId };
    qs = ENV.objectToQueryString(qs);
    props.getMyLikedNfts(qs);
    validateIfLiked();
    let balance = await getBalance();
    setBalance(balance);
    // setLoader(true);
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
      let qs = { userId: ENV.getUserKeys("_id")._id };
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

  useEffect(() => {
    if (props.getAuthOffer) {
      setOffers(props.offers);
    }
  }, [props.getAuthOffer]);

  useEffect(() => {
    if (props.getAuth) {
      setBids(props.bids);
    }
  }, [props.getAuth]);

  useEffect(() => {
    if (props.nftsAuth) {
      setNftDetail(props.nftDetail);
      setLoader(false);
      props.beforeNFT();

      //get activities
      let activityQs = { nftId: props.nftDetail._id };
      activityQs = ENV.objectToQueryString(activityQs);
      props.getActivities(activityQs);

      //getItemsListing
      // let itemsListingQS = { collectionId: props.nftDetail.collectionId };
      // itemsListingQS = ENV.objectToQueryString(itemsListingQS);
      // props.getItemsListing(itemsListingQS);

      //get offers
      if (props.nftDetail.sellingMethod) {
        if (props.nftDetail.sellingMethod === 1) {
          let qs = { nftId: props.nftDetail._id };
          qs = ENV.objectToQueryString(qs);
          props.getOffers(qs);
        } else {
          let qs = { nftId: props.nftDetail._id };
          qs = ENV.objectToQueryString(qs);
          props.getBids(qs);
        }
      }
      // //get bids
      // if (nftDetail?.sellingMethod === 2) {
      //   let nftBidsQs = { nftId };
      //   nftBidsQs = ENV.objectToQueryString(nftBidsQs);
      //   props.getBidSByNftId(nftBidsQs);
      // }

      //set next bid to 5% greater
      let fivePerc = "";
      if (
        props.nftDetail.highestBid === 0 ||
        props.nftDetail.highestBid === undefined
      ) {
        fivePerc = (5 / 100) * props.nftDetail.currentPrice;
        fivePerc = fivePerc + props.nftDetail.currentPrice;
      } else {
        fivePerc = (5 / 100) * props.nftDetail.highestBid;
        fivePerc = fivePerc + props.nftDetail.highestBid;
      }
      let result = fivePerc.toString().slice(0, 8);

      setPrice(result);
      validateIfLiked(likedNfts, props.nftDetail);
      props.beforeNFTByCollection();
      props.getNFTsByCollection(props.nftDetail.collectionId);
    }
  }, [props.nftsAuth]);

  useEffect(() => {
    if (props.nftsByCollectionStatus) {
      props.beforeNFTByCollection();

      let moreCollection = [];
      if (props.nftsByCollection && props.nftsByCollection?.length) {
        moreCollection = props.nftsByCollection.filter(
          (item) => item._id !== nftDetail._id
        );
      }
      setNFTs(moreCollection);

      // setLoader(false);
    }
  }, [props.nftsByCollectionStatus]);

  useEffect(() => {
    if (props.togleLikeRes) {
      setLikeBtnDisable(false);
      props.beforeTogleLikeDislike();
    }
  }, [props.togleLikeRes]);

  useEffect(() => {
    if (props.activitiesAuth) {
      setActivities(props.activities);
    }
  }, [props.activitiesAuth]);
  // useEffect(() => {
  //   if (props.itemsListingAuth) {
  //     setItemsListing(props.itemsListing);
  //   }
  // }, [props.itemsListingAuth]);

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
          nftDetail.sellingMethod === 2
        ) {
          EndAuction();
        } else if (currentAddress === ownerAddress.toUpperCase()) {
          history.push({
            pathname: `/sell-item/${nftDetail._id}`,
            state: nftDetail,
          });
        } else if (nftDetail.sellingMethod === 2) {
          setBidModalShow(true);
        } else if (nftDetail.sellingMethod === 1) {
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
      history.push("/login");
    }
  };

  //toggleLikes
  React.useEffect(() => {
    return () => "";
  }, [toggle]);

  const handleLikesTogleApi = async (nftId, status) => {
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

        if ((status === "dislike") & (nftDetail.likesCount > 0)) {
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

  const handleCollectionLikesTogleApi = async (nftId, status, likesCount) => {
    if (await validateNetwork()) {
      if (!likeButtonDisable) {
        setLikeBtnDisable(true);
        let userId = ENV.getUserKeys("_id")._id;

        let body = {
          userId,
          nftId,
          count: 1,
        };

        if (status === "dislike" && likesCount > 0) {
          let result = likedNfts.filter((item) => item.nftId !== nftId);

          setLikedNfts(result);
          increOrDecreLikes(nftId, "dec");

          props.toggleLikeDislike(body);
        }

        if (status === "like") {
          let myLikedNfts = [];
          if (likedNfts && likedNfts.length > 0) {
            myLikedNfts = likedNfts;
          }

          let obj = {
            _id: "1234455",
            nftId,
          };

          myLikedNfts.push(obj);

          setLikedNfts(myLikedNfts);
          increOrDecreLikes(nftId, "inc");
          props.toggleLikeDislike(body);
        }
        // setNFTs(nfts);
      }
    } else {
      toast.error("Please Connect Your Metamask With Ethereum Rinkby Network");
    }
  };
  const increOrDecreLikes = (id, status) => {
    let updatedNfts = [];
    if (status === "dec") {
      updatedNfts = nfts.map((item) => {
        if (item._id !== id) {
          return item;
        } else {
          if (item?.likeCount > 0) {
            return { ...item, likeCount: item.likeCount - 1 };
          }
        }
      });
      setNFTs(updatedNfts);
    } else {
      let updatedNfts = nfts.map((item) => {
        if (item._id !== id) {
          return item;
        } else {
          return { ...item, likeCount: item.likeCount + 1 };
        }
      });
      setNFTs(updatedNfts);
    }
  };

  //match if nft liked

  const validateIfLiked = (nfts, nft) => {
    if (nfts && nfts?.length > 0) {
      let result = nfts.find((item) => item.nftId == nft._id);

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
    let fivePerc = "";
    let result = "";
    if (nftDetail.highestBid === 0 || nftDetail.highestBid === undefined) {
      fivePerc = (5 / 100) * nftDetail.currentPrice;

      result = fivePerc + nftDetail.currentPrice;

      return result;
    } else {
      fivePerc = (5 / 100) * nftDetail.highestBid;
      result = fivePerc + nftDetail.highestBid;
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

  const onChange = (e) => {
    let result = e.target.value.slice(0, 8);

    setPrice(result);
  };
  const handleModalSubmit = async () => {
    if (await validateNetwork()) {
      setLoader(true);

      if (nftDetail.sellingMethod === 2) {
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
        let result = await placeABid(price, nftDetail.sellId);
        if (result) {
          const payload = {
            ownerId: nftDetail.ownerId,
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
      } catch (err) {
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
    } catch (err) {
      setLoader(false);

      toast.error(err);
    }
  };
  const getPercentageChange = (oldNumber, newNumber) => {
    var decreaseValue = oldNumber - newNumber;

    return (decreaseValue / oldNumber) * 100;
  };

  const deleteBid = (id) => {
    let result = bids.filter((bid) => bid._id !== id);
    setBids(result);
    props.deleteBid(id);
    createActivity("Cancel Bid");
  };

  const auctionEndTimeConversion = (auctionEndDate) => {
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
        try {
          let currentPrice = nftDetail.currentPrice;
          let nftToken = nftDetail.sellId;

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
        } catch (err) {
          setDisabled(false);
          toast.error(err);
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
      history.push("/login");
    }
  };

  const createActivity = async (type, bidPrice, address) => {
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
  const handleAcitivityIcon = (type) => {
    if (type === "Mint") {
      return <MdShoppingCart />;
    } else if (type === "List") {
      return <BsTagFill />;
    } else if (type === "Bid") {
      return <FaHandPaper />;
    } else {
      return <BiTransferAlt />;
    }
  };

  const checkIfAuctionStartedorEnded = (startDate, endDate) => {
    //check if i am owner

    if (
      props.connectedAddress?.toUpperCase() ==
        nftDetail.ownerAddress?.toUpperCase() ||
      nftDetail.sellingMethod === 1
    ) {
      return true;
    }
    if (startDate && endDate && nftDetail.sellingMethod) {
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

  const checkIfAuctionIsStarted = (startDate, endDate) => {
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
      checkIfAuctionEnded();
    }, 3000);
    return () => clearInterval(interval);
  }, [nftDetail, initial]);

  const checkIfAuctionEnded = async () => {
    if (nftDetail && nftDetail?.sellingMethod === 2) {
      let auctionEndDate = new Date(nftDetail.auctionEndDate);
      let currentDate = new Date();
      if (currentDate > auctionEndDate) {
        if (!initial) {
          let qs = { nftId: nftDetail._id };
          qs = ENV.objectToQueryString(qs);
          let url = `${ENV.url}bid/list`;
          url += `?${qs}`;
          let res = await axios.get(url);
          let newBids = res.data.data.Bids;
          if (!initial) {
            setInitial(true);
          }

          if (newBids?.length > 0) {
            let highestBidByUser = newBids.reduce((max, obj) =>
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
    const { ownerId, sellingMethod } = nftDetail;
    try {
      setLoader(true);
      if (userId == ownerId && sellingMethod == 2) {
        let result = await endAuctionFromContract(nftDetail.sellId);
        if (result) {
          EndAuctionFromBackend();
        }
      } else {
        let result = await claimNFTfromContract(nftDetail.sellId);
        if (result) {
          EndAuctionFromBackend();
        }
      }
    } catch (err) {
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
      `${ENV.url}nfts/endAuction`,
      {
        nft: nftDetail,
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
    sellingMethod,
    properties,
    levels,
    stats,
    nftToken,
    lowestNftPrice,
    fileType,
    image,
    user,
    ownerId,
    auctionStartDate,
    auctionEndDate,
    description,
    currentPrice,
    ownerAddress,
  } = nftDetail;
  const { connectedAddress } = props;
  const bannerData = {
    subHeading: "NFT",
    heading: "NFT Details",
    content:
      "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
  };

  let nftInfo = [
    {
      title: "Contract Address",
      value:
        ENV.mintsClubContractAddress.slice(0, 6) +
        "...." +
        ENV.mintsClubContractAddress.slice(-6),
    },
    {
      title: "Token ID",
      value: nftToken,
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

  return (
    <>
      <Banner
        subHeading={bannerData.subHeading}
        heading={bannerData.heading}
        content={bannerData.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      {loader && <FullPageLoader />}

      <div className="new-nft-detail padding-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xl-3 order-1 order-lg-0 d-none d-lg-block">
              <div className="detail-box">
                <h6>Properties</h6>
                <hr />
                {properties && properties.length > 0 ? (
                  properties.map((detail, i) => {
                    return (
                      <div
                        className="detail-rounded-type d-flex align-items-center"
                        key={i}
                      >
                        <div className="detail-rounded-name">
                          <p>{detail.type}:</p>
                        </div>
                        <div className="detail-content">
                          <p>{detail.name}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center">No Properties Found</p>
                )}
              </div>
              <div className="detail-box">
                <h6>Stats</h6>
                <hr />
                <div>
                  {stats && stats?.length > 0 ? (
                    stats.map((item) => {
                      return <StatsInfo name={item.name} value={item.value} />;
                    })
                  ) : (
                    <p className="text-center">No Stats Found</p>
                  )}
                </div>
              </div>
              <div className="detail-box">
                <h6>Levels</h6>
                <hr />
                <div>
                  {levels && levels.length > 0 ? (
                    levels.map((item) => {
                      return <LevelsInfo name={item.name} value={item.value} />;
                    })
                  ) : (
                    <p className=" text-center">No Levels Found</p>
                  )}
                </div>
              </div>
              <div className="detail-box">
                <h6>Details</h6>
                <hr />
                {nftInfo.map((item) => {
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
                        onTimeUpdate={handleOnTimeUpdate}
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
                        onLoadCallback={() => setContentLoader(false)}
                        loader={contentLoader}
                      />

                      {/* <Waveform
                        url={image}
                        auction={false}
                        onLoadCallback={() => setLoader(false)}
                        loader={contentLoader}
                      /> */}
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
                        <span>
                          {" "}
                          {nftDetail?.copiesForAuction
                            ? nftDetail?.copiesForAuction
                            : 0}
                        </span>
                      </p>
                    </div>
                    <div className="nft-detail-date d-flex align-items-center">
                      <p>
                        {sellingMethod === 2 && (
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
                            connectedAddress.toUpperCase() && sellingMethod == 2
                            ? "End Auction"
                            : ownerAddress?.toUpperCase() ==
                                connectedAddress.toUpperCase() &&
                              sellingMethod == 1
                            ? "Resale"
                            : ownerAddress?.toUpperCase() ==
                              connectedAddress.toUpperCase()
                            ? "Sell"
                            : sellingMethod === 2
                            ? "Place A Bid"
                            : sellingMethod === 1
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
                      properties.map((detail, key) => {
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
                      <p className="text-center">No Properties Found</p>
                    )}
                  </div>
                  <div className="detail-box">
                    <h6>Stats</h6>
                    <hr />
                    {stats && stats?.length > 0 ? (
                      stats.map((item) => {
                        return (
                          <StatsInfo name={item.name} value={item.value} />
                        );
                      })
                    ) : (
                      <p className="text-center">No Stats Found</p>
                    )}
                  </div>

                  <div className="detail-box">
                    <h6>Levels</h6>
                    <hr />
                    <div>
                      {levels && levels.length > 0 ? (
                        levels.map((item, i) => {
                          return (
                            <LevelsInfo
                              name={item.name}
                              value={item.value}
                              i={i}
                            />
                          );
                        })
                      ) : (
                        <p className="text-center">No Levels Found</p>
                      )}
                    </div>
                  </div>
                  <div className="detail-box">
                    <h6>Details</h6>
                    <hr />
                    {nftInfo.map((detail, i) => {
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
                    <h5>Description:</h5>
                    <hr />
                    <p>{description}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="detail-bg-box">
                    <h5>Offers:</h5>
                    <hr />
                    <div className="table-container">
                      <table className="table table-borderless">
                        {sellingMethod === 2 && bids && bids.length > 0 && (
                          <thead>
                            <tr>
                              <th scope="col">Price</th>
                              <th scope="col">USD Price</th>
                              <th scope="col">Floor Difference</th>

                              <th scope="col">From</th>
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {sellingMethod === 2 && bids && bids.length > 0 ? (
                            <>
                              {bids.map((bid, index) => {
                                return (
                                  <tr key={index}>
                                    <th scope="row">{bid.bidAmount}</th>
                                    <td>
                                      $
                                      {(bid.bidAmount * exchangeRate).toFixed(
                                        2
                                      )}
                                    </td>
                                    <td>
                                      {getPercentageChange(
                                        bid.bidAmount,
                                        lowestNftPrice
                                      ).toFixed(0)}
                                      %{" "}
                                      {bid.bidAmount > lowestNftPrice
                                        ? "above"
                                        : "below"}
                                    </td>
                                    <td>
                                      {bid.fromAddress.slice(0, 4) +
                                        "..." +
                                        bid.fromAddress.slice(-4)}
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          ) : (
                            <p className="text-center d-flex justify-content-center align-items-center">
                              No Offers Found
                            </p>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="detail-bg-box">
                    <h5>Activity:</h5>
                    <hr />
                    <div className="table-container">
                      {activities && activities.length > 0 ? (
                        <table className="table table-borderless">
                          <thead>
                            <tr>
                              <th scope="col">Event</th>
                              <th scope="col">Price</th>
                              <th scope="col">From</th>
                              <th scope="col">To</th>
                              <th scope="col">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activities.map((activity, index) => {
                              return (
                                <tr>
                                  <th scope="row" key={index}>
                                    <div className="d-flex align-items-center">
                                      {handleAcitivityIcon(
                                        activity.activityType
                                      )}
                                      <p className="ps-1">
                                        {" "}
                                        {activity.activityType}{" "}
                                      </p>
                                    </div>
                                  </th>
                                  <td>
                                    {activity.price ? activity.price : ""}
                                  </td>
                                  <td>
                                    {activity.fromAddress
                                      ? activity.fromAddress.slice(0, 4) +
                                        "..." +
                                        activity.fromAddress.slice(-6)
                                      : "null address"}
                                  </td>
                                  <td>
                                    {activity.toAddress
                                      ? activity.toAddress.slice(0, 4) +
                                        "..." +
                                        activity.toAddress.slice(-4)
                                      : ""}{" "}
                                  </td>
                                  <td>
                                    <div>
                                      <ReactTimeAgo
                                        date={activity.createdAt}
                                        locale="en-US"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-white d-flex align-items-center justify-content-center w-100 h-100">
                          No Activities Found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 order-2 mt-5">
              <div className="detail-more-collection">
                <h6>More from this collection</h6>
              </div>
              <div className="row align-items-center g-3 justify-content-md-start justify-content-center">
                {nfts && nfts.length > 0 ? (
                  nfts.map((nft, id) => {
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
                  <p className="text-center mt-4">No NFTs Found</p>
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
        tokenId={nftToken}
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
      {/* <BuyModal
        show={modalShow1}
        onHide={() => {
          setModalShow1(false);
          // setConfirmed(false);
          // setModal(1);
          // setTransactionSuccess(false);
        }}
        name={listedItem.name}
        price={listedItem.currentPrice}
        image={listedItem.image}
        exchangeRate={exchangeRate}
        tokenId={listedItem.nftToken}
        modal={modal}
        setModal={setModal}
        buyNow={BuyNow}
        confirmed={confirmed}
        transactionHash={transactionHash}
        transactionSuccess={transactionSuccess}
        disabled={disabled}
        balance={balance}
        fileType={fileType}
      /> */}
      <BidModal
        show={bidModalShow}
        calculatePricePercantage={calculatePricePercantage}
        handleModalSubmit={handleModalSubmit}
        onChange={onChange}
        decimalNumberValidator={decimalNumberValidator}
        balance={balance}
        price={price}
        onHide={() => setBidModalShow(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
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
