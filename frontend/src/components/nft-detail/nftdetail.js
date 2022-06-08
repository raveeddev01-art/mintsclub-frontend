import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./nftdetail.css";

import ListingCards from "../listing-cards/ListingCards";

import {
  getNFT,
  getNFTsByCollection,
  getMyLikedNfts,
  beforeNFT,
  createActivity,
  getActivities,
  getItemsListing,
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
  AiFillHeart,
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
  endAuction,
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
import VideoCard from "../test-video-card/videoCard";
import StatsInfo from "../create-nft/components/statsinfo";
import LevelsInfo from "../create-nft/components/levelsinfo";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg.png";
import OwnCollectionToday from "../own-collection-today/own-collection-today";
import NFTImg from "../../assets/images/nft-detail.png";
import { Images } from "../../assets/assets";
import NftCard from "../nft-card/nft-card";

const NFTDetail = (props) => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [toggle, setToggle] = React.useState(true);
  const [likedNfts, setLikedNfts] = useState();
  const [nftDetail, setNftDetail] = useState("");
  const [listedItem, setListedItem] = useState([]);
  const [nfts, setNFTs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [itemsListing, setItemsListing] = useState([]);
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
  const { playerState, togglePlay, handleOnTimeUpdate } =
    useVideoPlayer(videoElement);

  let nftId = props.match.params.id;
  let userId = ENV.getUserKeys("_id")._id;

  // const expiryOptions = [
  //   { label: "5 Days", value: moment().add(5, "days").format("DD/MM/YYYY") },
  //   { label: "7 Days", value: moment().add(7, "days").format("DD/MM/YYYY") },
  //   { label: "A Month", value: moment().add(1, "months").format("DD/MM/YYYY") },
  //   { label: "Custom Date", value: -1 },
  // ];

  // const config1 = {
  //   price: {
  //     currency: ENV.currency,
  //     amount: "",
  //   },
  //   expiry: {
  //     date: expiryOptions[0].value,
  //     time: moment(new Date()).format("HH:mm"),
  //     type: 1, // 1 for time & 2 for datetime-local
  //     datetime: "", // for payload
  //   },
  // };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(async () => {
    props.getNFT(nftId);
    let qs = { userId: ENV.getUserKeys("_id")._id };
    qs = ENV.objectToQueryString(qs);
    props.getMyLikedNfts(qs);
    validateIfLiked();

    let balance = await getBalance();
    setBalance(balance);
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.createAuth) {
      setLoader(false);
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
      props.getBids();
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
      // validateIfLiked(props.myLikedNfts);
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
      // props.beforeBid();
    }
  }, [props.getAuth]);

  useEffect(() => {
    if (props.nftsAuth) {
      setNftDetail(props.nftDetail);
      setLoader(false);

      //get activities
      let activityQs = { nftId: props.nftDetail._id };
      activityQs = ENV.objectToQueryString(activityQs);
      props.getActivities(activityQs);

      //getItemsListing
      let itemsListingQS = { collectionId: props.nftDetail.collectionId };
      itemsListingQS = ENV.objectToQueryString(itemsListingQS);
      props.getItemsListing(itemsListingQS);

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
      //get bids
      if (nftDetail?.sellingMethod === 2) {
        let nftBidsQs = { nftId };
        nftBidsQs = ENV.objectToQueryString(nftBidsQs);
        props.getBidSByNftId(nftBidsQs);
      }

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

      props.getNFTsByCollection(props.nftDetail.collectionId);
    }
  }, [props.nftsAuth]);

  useEffect(() => {
    if (props.nftsByCollectionStatus) {
      let moreCollection = [];
      if (props.nftsByCollection && props.nftsByCollection?.length) {
        moreCollection = props.nftsByCollection.filter(
          (item) => item._id !== nftDetail._id
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

  useEffect(() => {
    if (props.activitiesAuth) {
      setActivities(props.activities);
    }
  }, [props.activitiesAuth]);
  useEffect(() => {
    if (props.itemsListingAuth) {
      setItemsListing(props.itemsListing);
    }
  }, [props.itemsListingAuth]);

  const handleRouting = async () => {
    if (await validateNetwork()) {
      if (
        ENV.getUserKeys("_id")._id === nftDetail?.ownerId &&
        nftDetail.sellingMethod === 2
      ) {
        EndAuction();
      } else if (ENV.getUserKeys("_id")._id === nftDetail?.ownerId) {
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
      toast.error("Please Connect Your Metamask With Ethereum Rinkby Network");
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
        console.log("inside");
        setLikeBtnDisable(true);
        let userId = ENV.getUserKeys("_id")._id;

        let body = {
          userId,
          nftId,
          count: 1,
        };

        if (status === "dislike" && likesCount > 0) {
          console.log("dislike");
          let result = likedNfts.filter((item) => item.nftId !== nftId);

          setLikedNfts(result);
          increOrDecreLikes(nftId, "dec");

          props.toggleLikeDislike(body);
        }

        if (status === "like") {
          console.log("like");
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
      // setLoader(false);
      let result = nfts.find((item) => item.nftId == nft._id);

      if (result) {
        return setToggle(true);
      } else {
        return setToggle(false);
      }
    } else {
      // setLoader(false);
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
        let result = await placeABid(price, nftDetail.nftToken);
        if (result) {
          const payload = {
            ownerId: nftDetail.ownerId,
            bidAmount: price,
            nftId: nftDetail._id,
            bidBy: ENV.getUserKeys("_id")._id,
            isAccepted: false,
            // expiryDate: nftConfig.expiry.datetime,
            toAddress: nftDetail.ownerAddress,
            fromAddress: await connectMetamask(),
          };

          props.placeBid(payload);
          createActivity("Bid", price);
        }
      } catch (err) {
        console.log(err, "error");
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
      // let result = await placeABid(price, nftDetail.nftToken);
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

  // const deleteOffer = (id) => {
  //   let result = offers.filter((offer) => offer._id !== id);
  //   setOffers(result);
  //   props.deleteOffer(id);
  // };

  const auctionEndTimeConversion = (auctionEndDate) => {
    var dateString = moment(new Date(auctionEndDate))
      .utc(true)
      .format("MMMM D, Y");
    var timeString = moment(new Date(auctionEndDate)).utc(true).format("h:mma");
    var totalDateTime = dateString + " at " + timeString + " PKT";
    return totalDateTime;
  };

  const BuyNow = async () => {
    alert("buy now")
    if (await validateNetwork()) {
      setDisabled(true);
      try {
        let currentPrice = "";
        let nftToken = "";

        if (modalShow1) {
          currentPrice = listedItem.currentPrice;
          nftToken = listedItem.tokenId;
          nftId = listedItem._id;
        } else {
          currentPrice = nftDetail.currentPrice;
          nftToken = nftDetail.nftToken;
        }

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
      toast.error("Please Connect Your Metamask With Ethereum Rinkby Network");
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
      ENV.getUserKeys("_id")._id == nftDetail.ownerId ||
      nftDetail.sellingMethod === 1
    ) {
      return true;
    }
    if (startDate && endDate && nftDetail.sellingMethod) {
      let currentDate = new Date();
      let auctionStartDate = new Date(startDate);
      let auctionEndDate = new Date(endDate);
      // if (
      //  ( auctionStartDate.setHours(0, 0, 0, 0) <=
      //     currentDate.setHours(0, 0, 0, 0) )&&
      //  ( auctionEndDate.setHours(0, 0, 0, 0) >= currentDate.setHours(0, 0, 0, 0))
      // )
      if (currentDate > auctionStartDate && currentDate < auctionEndDate) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const EndAuction = async () => {
    try {
      setLoader(true);
      let result = await endAuction(nftDetail.tokenId);
      if (result) {
        let res = await axios.patch(
          `${ENV.url}nfts/endAuction/${nftDetail._id}`
        );
        if (res.data.success) {
          toast.success(res.data.message);
          history.push("/explore/allNFT");
        }
      }
    } catch (err) {
      toast.error(err);
      setLoader(false);
    }
  };

  const {
    name,
    _id,
    copies,
    remainingCopies,
    likesCount,
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
    auctionEndDate,
    description,
    currentPrice,
    collectionId,
    collection,
    tokenId
  } = nftDetail;
  const bannerData = {
    subHeading: "NFT",
    heading: "NFT Details",
    content:
      "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
  };


  const detailWallet = [
    {
      title: "Contract Address",
      content: "0xe90.........4BcAc06",
    },
    {
      title: "Token ID",
      content: "452",
    },
    {
      title: "Token Standard",
      content: "ERC - 1155",
    },
    {
      title: "Blockchain",
      content: "Ethereum",
    },
  ];
  let nftInfo=[
    {
      title:"Contract Address",
      value:ENV.mintsClubContractAddress.slice(0, 6) +
      "...." +
      ENV.mintsClubContractAddress.slice(-6),

    },
    {
      title:"Token ID",
      value:tokenId
    },
    {
      title:"Token Standard",
      value:"ERC-1155"
    },
    {
      title:"Blockchain",
      value:"Ethereum"
    }
  ]
  console.log(nftDetail, "nftDetail");

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
                  properties.map((detail) => {
                    return (
                      <div className="detail-rounded-type d-flex align-items-center">
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
                <div>
                  {stats && stats?.length > 0 ? (
                    stats.map((item) => {
                      return <StatsInfo name={item.name} value={item.value} />;
                    })
                  ) : (
                    <p className="text-center">No Stats Foud</p>
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
                    <p className=" text-center">No Levels Foud</p>
                  )}
                </div>
              </div>
              <div className="detail-box">
                <h6>Details</h6>
                <hr />
                {
                  nftInfo.map((item)=>{
                    return (
                      <div className="detail-rounded-type d-flex align-items-center">
                      <div className="detail-rounded-name">
                        <p>{item.title}:</p>
                      </div>
                      <div className="detail-content">
                        <p>
                          {" "}
                          {item.value}
                        </p>
                      </div>
                    </div>
                    )
                  })
                }

              </div>
            </div>

            <div className="col-lg-8 col-xl-9 order-0 order-lg-1">
              <div className="row g-4 g-lg-5 g-xl-4">
                <div className="col-xl-6">
                  <div className="nft-img-container mx-auto mx-lg-0">
                    <img src={image} alt="nft-image" />
                  </div>
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
                                nftDetail?.auctionStartDate,
                                nftDetail?.auctionEndDate
                              ) && (
                                <>
                                  <img
                                    src={Images.ClockIcon}
                                    alt="clock-icon"
                                    className="me-1"
                                  />
                                  <span>
                                    Sale ends{" "}
                                    {auctionEndTimeConversion(
                                      new Date(nftDetail?.auctionEndDate)
                                    )}{" "}
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
                      src={Images.profilePlaceholder}
                      alt="avatar"
                      className="me-2"
                    />
                    <p>
                      Owned by:{" "}
                      <span className="ms-1">
                        {" "}
                        {ownerId === userId
                          ? "You"
                          : user?.username
                          ? user.username
                          : "unnamed"}
                      </span>
                    </p>
                  </div>
                  <div className="nft-detail-btn">
                    {checkIfAuctionStartedorEnded(
                      nftDetail?.auctionStartDate,
                      nftDetail?.auctionEndDate
                    ) && (
                      <button
                        disabled={disabled}
                        onClick={() => handleRouting()}
                      >
                        {" "}
                        {ENV.getUserKeys("_id")._id == ownerId &&
                        sellingMethod == 2
                          ? "End Auction"
                          : ENV.getUserKeys("_id")._id == ownerId &&
                            sellingMethod == 1
                          ? "Resale"
                          : ENV.getUserKeys("_id")._id == ownerId
                          ? "Sell"
                          : nftDetail?.sellingMethod === 2
                          ? "Place A Bid"
                          : nftDetail?.sellingMethod === 1
                          ? "Buy Now"
                          : ""}
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-12 d-block d-lg-none">
                  <div className="detail-box">
                    <h6>Properties</h6>
                    <hr />
                    {properties && properties.length > 0 ? (
                      properties.map((detail) => {
                        return (
                          <div className="detail-rounded-type d-flex align-items-center">
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
                      stats.map((item) => {
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
                        levels.map((item) => {
                          return (
                            <LevelsInfo name={item.name} value={item.value} />
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
                    {detailWallet.map((detail) => {
                      return (
                        <div className="detail-rounded-type d-flex align-items-center">
                          <div className="detail-rounded-name">
                            <p>{detail.title}:</p>
                          </div>
                          <div className="detail-content">
                            <p>{detail.content}</p>
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
                    <div className="table-container">
                      <table className="table table-borderless">
                        {bids && bids.length > 0 && (
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
                          {nftDetail?.sellingMethod === 2 &&
                          bids &&
                          bids.length > 0 ? (
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
                                    <td>{bid.fromAddress.slice(3, 8)}</td>
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
                                      ? activity.fromAddress.slice(-8)
                                      : "null address"}
                                  </td>
                                  <td>
                                    {activity.toAddress
                                      ? activity.toAddress.slice(-8)
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
              <div className="row align-items-center g-3">
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

      <>
        {/* {loader && <FullPageLoader />}
        <>
          <section className="padding-wrapper nft-detail">
            <div className="container">
              <div className="row g-3">
                <div className="col-12 order-2 order-md-1 col-md-6 col-lg-7 col-xl-8 ">
                  <div className="row">
                    <div className="col-12 order-2 order-md-1">
                      <div className="nftDetail-accordion">
                        <div
                          className="accordion accordion-flush "
                          id="accordionFlushExample"
                        >
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="flush-headingTwo"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#flush-collapseTwo"
                                aria-expanded="false"
                                aria-controls="flush-collapseTwo"
                              >
                                <img
                                  src={OfferIcon}
                                  alt="price-history"
                                  className="me-2"
                                />
                                Offers
                              </button>
                            </h2>
                            <div
                              id="flush-collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingTwo"
                            >
                              <div className="accordion-body">
                                <div className="table-container listing-table">
                                  <table className="table table-borderless">
                                    {bids && bids.length > 0 && (
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
                                      {nftDetail?.sellingMethod === 2 &&
                                      bids &&
                                      bids.length > 0 ? (
                                        <>
                                          {bids.map((bid, index) => {
                                            return (
                                              <tr key={index}>
                                                <th scope="row">
                                                  {bid.bidAmount}
                                                </th>
                                                <td>
                                                  $
                                                  {(
                                                    bid.bidAmount * exchangeRate
                                                  ).toFixed(2)}
                                                </td>
                                                <td>
                                                  {getPercentageChange(
                                                    bid.bidAmount,
                                                    lowestNftPrice
                                                  ).toFixed(0)}
                                                  %{" "}
                                                  {bid.bidAmount >
                                                  lowestNftPrice
                                                    ? "above"
                                                    : "below"}
                                                </td>
                                                <td>
                                                  {bid.fromAddress.slice(3, 8)}
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
                          </div>
                          {nftDetail?.sellingMethod === 1 && (
                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id="flush-headingThree"
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target="#flush-collapseThree"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseThree"
                                >
                                  <img
                                    src={ListingIcon}
                                    alt="price-history"
                                    className="me-2"
                                  />
                                  Item listing
                                </button>
                              </h2>
                              <div
                                id="flush-collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingThree"
                              >
                                <div className="accordion-body">
                                  <div className="table-container listing-table">
                                    <table className="table table-borderless">
                                      {itemsListing &&
                                      itemsListing.length > 0 &&
                                      itemsListing.filter(
                                        (item) =>
                                          item.ownerId !== userId &&
                                          item._id !== _id
                                      ).length > 0 ? (
                                        <>
                                          <thead>
                                            <tr>
                                              <th scope="col">Price</th>
                                              <th scope="col">USD Price</th>

                                              <th scope="col">From</th>
                                              <th scope="col">{""}</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {itemsListing &&
                                              itemsListing.length > 0 &&
                                              itemsListing
                                                .filter(
                                                  (item) =>
                                                    item.ownerId !== userId &&
                                                    item._id !== _id
                                                )
                                                .map((item, index) => {
                                                  return (
                                                    <tr key={index}>
                                                      <th scope="row">
                                                        {item.currentPrice}
                                                      </th>
                                                      <td>
                                                        {" "}
                                                        $
                                                        {(
                                                          item.currentPrice *
                                                          exchangeRate
                                                        ).toFixed(2)}
                                                      </td>

                                                      <td>
                                                        {" "}
                                                        {item.ownerAddress.slice(
                                                          -6
                                                        )}
                                                      </td>
                                                      <td>
                                                        <button
                                                          onClick={() => {
                                                            setModalShow1(true);
                                                            setListedItem(item);
                                                          }}
                                                          disabled={
                                                            disabled &&
                                                            listedItem._id !==
                                                              item._id
                                                          }
                                                        >
                                                          Buy
                                                        </button>
                                                      </td>
                                                    </tr>
                                                  );
                                                })}
                                          </tbody>
                                        </>
                                      ) : (
                                        <p className="text-white text-center">
                                          {"No Items Found"}
                                        </p>
                                      )}
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-11 col-md-12 col-lg-7 col-xl-5 order-1 order-md-2 mx-auto mb-5 mb-md-0  mx-md-0">
                      <div className="collection-filter-accordion nft-stats-accordion">
                        <div
                          className="accordion accordion-flush "
                          id="accordionFlushExample"
                        >
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="flush-headingFour"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#flush-collapseFour"
                                aria-expanded="false"
                                aria-controls="flush-collapseFour"
                              >
                                Properties
                              </button>
                            </h2>
                            <div
                              id="flush-collapseFour"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingFour"
                            >
                              <div className="accordion-body">
                                <div className="row g-2 justify-content-center align-items-center">
                                  {properties && properties.length > 0 ? (
                                    properties.map((item, index) => {
                                      return (
                                        <div
                                          className="col-6 col-sm-4 col-md-6"
                                          key={index}
                                        >
                                          <div className="properties-content-container d-flex flex-column justify-content-center align-items-center text-center">
                                            <div className="properties-content">
                                              <span>
                                                {item.type.length > 5
                                                  ? item.type.slice(0, 5) +
                                                    "..."
                                                  : item.type}
                                              </span>
                                              <h3 className="mb-2">
                                                {item.name.length > 7
                                                  ? item.name.slice(0, 7) +
                                                    "..."
                                                  : item.name}
                                              </h3>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <p className="text-white text-center">
                                      No Properties Foud
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="flush-headingSix"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#flush-collapseSix"
                                aria-expanded="false"
                                aria-controls="flush-collapseSix"
                              >
                                Stats
                              </button>
                            </h2>
                            <div
                              id="flush-collapseSix"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingSix"
                            >
                              <div className="accordion-body">
                                {stats && stats?.length > 0 ? (
                                  stats.map((item) => {
                                    return (
                                      <StatsInfo
                                        name={item.name}
                                        value={item.value}
                                      />
                                    );
                                  })
                                ) : (
                                  <p className="text-white text-center">
                                    No Stats Foud
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="flush-headingSeven"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#flush-collapseSeven"
                                aria-expanded="false"
                                aria-controls="flush-collapseSeven"
                              >
                                Levels
                              </button>
                            </h2>
                            <div
                              id="flush-collapseSeven"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingSeven"
                            >
                              <div className="accordion-body">
                                {levels && levels.length > 0 ? (
                                  levels.map((item) => {
                                    return (
                                      <LevelsInfo
                                        name={item.name}
                                        value={item.value}
                                      />
                                    );
                                  })
                                ) : (
                                  <p className="text-white text-center">
                                    No Levels Foud
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="flush-headingNine"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#flush-collapseNine"
                                aria-expanded="false"
                                aria-controls="flush-collapseNine"
                              >
                                Details
                              </button>
                            </h2>
                            <div
                              id="flush-collapseNine"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingNine"
                            >
                              <div className="accordion-body">
                                <div className="contact-address d-flex justify-content-between">
                                  <p>Contract Address</p>
                                  <span>
                                    {ENV.mintsClubContractAddress.slice(0, 6) +
                                      "...." +
                                      ENV.mintsClubContractAddress.slice(-6)}
                                  </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p>Token ID</p>
                                  <p>{nftToken}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p>Token Standard </p>
                                  <p>ERC-1155</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p>Blockchain </p>
                                  <p>Ethereum</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-11 col-sm-8 order-1 order-md-2 col-md-6 col-lg-5 col-xl-4 mx-auto">
                  <Card className="auction-card detail-card">
                    <div className="auction-img-wrapper">
                      {fileType === "image" ? (
                        <Card.Img
                          variant="top"
                          src={image}
                          alt="AuctionTopImg"
                        />
                      ) : (
                        <div className="card-img-top">
                          <div className="video-wrapper">
                            <video
                              src={image}
                              ref={videoElement}
                              onTimeUpdate={handleOnTimeUpdate}
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
                        </div>
                      )}
                    </div>
                    <Card.Body>
                      <div className="detail-card-owner-container d-flex justify-content-between align-items-center mb-2">
                        <div className="detail-nft-owner">
                          <p>Total Copies:{copies}</p>
                        </div>
                        <div className="detail-nft-copies d-flex align-items-center">
                          <p>Sold: {nftDetail?.copies - remainingCopies} </p>
                          <p className="ps-2">
                            Remaining:{""}
                            {nftDetail?.remainingCopies
                              ? nftDetail?.remainingCopies
                              : copies}{" "}
                          </p>
                        </div>
                      </div>
                      <div className="detail-card-name-container d-flex align-items-center justify-content-between">
                        <div className="detail-nft-name ">
                          <h5>
                            {name && name.length > 14
                              ? name.slice(0, 14) + "..."
                              : name}
                          </h5>
                        </div>
                        <div className="likes-container d-flex align-items-center">
                          {toggle ? (
                            <>
                              <AiFillHeart
                                className="heart-fill-icon "
                                onClick={() => {
                                  handleLikesTogleApi(_id, "dislike");
                                }}
                              />
                              <p className="text-white">
                                {likesCount ? likesCount : 0}{" "}
                              </p>
                            </>
                          ) : (
                            <>
                              <img
                                src={HeartIcon}
                                alt="heart-icon"
                                className="ms-1"
                                onClick={() => {
                                  handleLikesTogleApi(_id, "like");
                                }}
                              />

                              <span className="ms-1">
                                {likesCount ? likesCount : 0}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        {currentPrice !== null && (
                          <>
                            <h3>
                              {currentPrice}
                              <span>
                                ($ {(currentPrice * exchangeRate).toFixed(2)})
                              </span>
                            </h3>
                          </>
                        )}

                        <div>
                          <p className="text-white">
                            Copies On Sale:
                            {nftDetail?.copiesForAuction
                              ? nftDetail?.copiesForAuction
                              : 0}
                          </p>
                        </div>
                      </div>

                      <div className="detail-card-owner-container mb-2">
                        <div className="detail-nft-owner">
                          {nftDetail && (
                            <p>
                              Owned by{" "}
                              <span>
                                {ownerId === userId
                                  ? "You"
                                  : user?.username
                                  ? user.username
                                  : "unnamed"}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className=" d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                          {sellingMethod === 2 && (
                            <>
                              {auctionEndDate &&
                                checkIfAuctionStartedorEnded(
                                  nftDetail?.auctionStartDate,
                                  nftDetail?.auctionEndDate
                                ) && (
                                  <>
                                    <img
                                      src={ClockIcon}
                                      alt="clock-icon"
                                      className="me-1"
                                    />
                                    <span>
                                      Sale ends{" "}
                                      {auctionEndTimeConversion(
                                        new Date(nftDetail?.auctionEndDate)
                                      )}{" "}
                                    </span>
                                  </>
                                )}
                            </>
                          )}
                        </div>
                      </div>
                      {checkIfAuctionStartedorEnded(
                        nftDetail?.auctionStartDate,
                        nftDetail?.auctionEndDate
                      ) && (
                        <>
                          <button
                            className="btn btn-linear-gradient d-flex align-items-center justify-content-center w-75 mx-auto"
                            disabled={disabled}
                            onClick={() => handleRouting()}
                          >
                            {ENV.getUserKeys("_id")._id == ownerId &&
                            sellingMethod
                              ? "Resale"
                              : ENV.getUserKeys("_id")._id == ownerId
                              ? "Sell"
                              : nftDetail?.sellingMethod === 2
                              ? "Place Bid"
                              : nftDetail?.sellingMethod === 1
                              ? "Buy Now"
                              : ""}
                          </button>
                        </>
                      )}
                      {nftDetail?.sellingMethod === 2 &&
                        ENV.getUserKeys("_id")._id == ownerId && (
                          <button
                            className="btn btn-linear-gradient d-flex align-items-center justify-content-center w-75 mx-auto mt-3"
                            onClick={() => {
                              EndAuction();
                            }}
                          >
                            End Auction
                          </button>
                        )}
                    </Card.Body>
                  </Card>
                  <div className="detail-description-content mt-5">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={DescriptionIcon}
                        alt="descriptionIcon"
                        className="me-1"
                      />
                      <h6>Discription</h6>
                    </div>
                    <p>{description}</p>
                  </div>
                </div>
                <div className="col-12 mt-0 mt-md-4 order-3">
                  <div className="nftDetail-accordion">
                    <div
                      className="accordion accordion-flush "
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTen">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#flush-collapseTen"
                            aria-expanded="false"
                            aria-controls="flush-collapseTen"
                          >
                            <img
                              src={ActivityIcon}
                              alt="price-history"
                              className="me-2"
                            />
                            Activity
                          </button>
                        </h2>
                        <div
                          id="flush-collapseTen"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingTen"
                        >
                          <div className="accordion-body">
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
                                            {activity.price
                                              ? activity.price
                                              : ""}
                                          </td>
                                          <td>
                                            {activity.fromAddress
                                              ? activity.fromAddress.slice(-8)
                                              : "null address"}
                                          </td>
                                          <td>
                                            {activity.toAddress
                                              ? activity.toAddress.slice(-8)
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

                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id="flush-headingEleven"
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#flush-collapseEleven"
                            aria-expanded="false"
                            aria-controls="flush-collapseEleven"
                          >
                            <img
                              src={MoreCollectionIcon}
                              alt="price-history"
                              className="me-2"
                            />
                            More from this collection
                          </button>
                        </h2>
                        <div
                          id="flush-collapseEleven"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingEleven"
                        >
                          <div className="accordion-body">
                            <div className="row justify-content-center align-items-center g-3">
                              {nfts && nfts.length > 0 ? (
                                nfts.map((nft, id) => {
                                  if (id <= 3) {
                                    return (
                                      <div
                                        className="col-10 col-sm-6 col-md-4 col-lg-3 px-1"
                                        key={id}
                                      >
                                        {nft.fileType === "image" ? (
                                          <ListingCards
                                            CardImg={nft.image}
                                            name={nft.name}
                                            price={nft.currentPrice}
                                            handleLikesTogleApi={
                                              handleCollectionLikesTogleApi
                                            }
                                            id={nft._id}
                                            likesCount={nft.likeCount}
                                            likedNfts={likedNfts}
                                            ownerId={nft.ownerId}
                                            fileType={nft.fileType}
                                            sellingMethod={nft.sellingMethod}
                                            auctionStartDate={
                                              nft?.auctionStartDate
                                            }
                                            auctionEndDate={nft?.auctionEndDate}
                                            ownerName={nft.owner[0].username}
                                            copies={nft.copies}
                                            remainingCopies={
                                              nft.remainingCopies
                                            }
                                          />
                                        ) : (
                                          <VideoCard
                                            CardImg={nft.image}
                                            name={nft.name}
                                            price={nft.currentPrice}
                                            handleLikesTogleApi={
                                              handleLikesTogleApi
                                            }
                                            id={nft._id}
                                            likesCount={nft.likeCount}
                                            likedNfts={likedNfts}
                                            ownerId={nft.ownerId}
                                            fileType={nft.fileType}
                                            sellingMethod={nft.sellingMethod}
                                            auctionStartDate={
                                              nft?.auctionStartDate
                                            }
                                            auctionEndDate={nft?.auctionEndDate}
                                            ownerName={nft.owner[0].username}
                                            copies={nft.copies}
                                            remainingCopies={
                                              nft.remainingCopies
                                            }
                                          />
                                        )}
                                      </div>
                                    );
                                  }
                                })
                              ) : (
                                <p className="text-center mt-4">
                                  No NFTs Found
                                </p>
                              )}
                            </div>
                            <div className="mt-4 detail-btn-collection text-center">
                              {nfts.length > 0 && nfts.length > 4 && (
                                <button
                                  className="btn btn-rounded-bordered"
                                  onClick={() =>
                                    history.push({
                                      pathname: `/collection/detailPage/${collectionId}`,
                                      state: collection,
                                    })
                                  }
                                >
                                  View collection
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </> */}
      </>
      <OwnCollectionToday />
      <BuyModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setConfirmed(false);
          setModal(1);
          setTransactionSuccess(false);
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
      />
      <BuyModal
        show={modalShow1}
        onHide={() => {
          setModalShow1(false);
          setConfirmed(false);
          setModal(1);
          setTransactionSuccess(false);
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
      />
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
  getAuth: state.bid.getAuth,
  getAuthOffer: state.offer.getAuth,
  offers: state.offer.offers,
  buyAuth: state.offer.buyAuth,
  bids: state.bid.bids,
  bidsByNft: state.bid.bidsByNft,
  bidsByNftAuth: state.bid.bidsBYNftAuth,
  togleLikeRes: state.explore.togleLikeRes,
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
})(NFTDetail);
