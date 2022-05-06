import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import "./nftdetail.css";
import OfferIcon from "../../assets/images/offer-icon.svg";
import ListingIcon from "../../assets/images/listing-icon.svg";
import ActivityIcon from "../../assets/images/activity.svg";
import MoreCollectionIcon from "../../assets/images/morecollectionicon.svg";

import ListingCards from "../listing-cards/ListingCards";
import { Card } from "react-bootstrap";

import HeartIcon from "../../assets/images/unlike-icon.svg";
import ClockIcon from "../../assets/images/clock-icon.svg";
import DescriptionIcon from "../../assets/images/detail-description-icon.svg";

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
import SimpleReactValidator from "simple-react-validator";
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

const NFTDetail = (props) => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [toggle, setToggle] = React.useState(true);
  const [likedNfts, setLikedNfts] = useState();
  const [nftDetail, setNftDetail] = useState("");
  const [listedItem, setListedItem] = useState([]);
  const [nftsList, setNftList] = useState([]);
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

  const expiryOptions = [
    { label: "5 Days", value: moment().add(5, "days").format("DD/MM/YYYY") },
    { label: "7 Days", value: moment().add(7, "days").format("DD/MM/YYYY") },
    { label: "A Month", value: moment().add(1, "months").format("DD/MM/YYYY") },
    { label: "Custom Date", value: -1 },
  ];

  const config1 = {
    price: {
      currency: ENV.currency,
      amount: "",
    },
    expiry: {
      date: expiryOptions[0].value,
      time: moment(new Date()).format("HH:mm"),
      type: 1, // 1 for time & 2 for datetime-local
      datetime: "", // for payload
    },
  };

  const propertiesData = [
    {
      id: 1,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 2,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 3,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 4,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 5,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 6,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 7,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 8,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
  ];

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
      if (props.nftDetail.highestBid === 0) {
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
      setNftList(moreCollection);
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
      if (ENV.getUserKeys("_id")._id === nftDetail?.ownerId) {
        history.push({
          pathname: `/sell-item/${nftDetail._id}`,
          state: nftDetail,
        });
      } else if (nftDetail.sellingMethod === 2) {
        setBidModalShow(true);
      } else {
        // setLoader(true)
        // makeOffer()
        setModalShow(true);
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
    if (nftDetail.highestBid === 0) {
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

    if (ENV.getUserKeys("_id")._id == nftDetail.ownerId) {
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
  console.log(nftDetail, "nftDetail");
  return (
    <>
      {loader && <FullPageLoader />}
      <>
        <NavbarMain />
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
                        {/* <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="flush-headingOne"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                              >
                                <img
                                  src={PriceHistoy}
                                  alt="price-history"
                                  className="me-2"
                                />
                                Price history
                              </button>
                            </h2>
                            <div
                              id="flush-collapseOne"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingOne"
                            >
                              <div className="accordion-body"></div>
                            </div>
                          </div> */}

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
                                <table class="table table-borderless">
                                  {bids && bids.length > 0 && (
                                    <thead>
                                      <tr>
                                        <th scope="col">Price</th>
                                        <th scope="col">USD Price</th>
                                        <th scope="col">Floor Difference</th>
                                        {/* <th scope="col">Expiration</th> */}
                                        <th scope="col">From</th>
                                        {/* <th scope="col">{""}</th> */}
                                      </tr>
                                    </thead>
                                  )}
                                  <tbody>
                                    {nftDetail?.sellingMethod === 2 ? (
                                      <>
                                        {bids && bids.length > 0 ? (
                                          bids.map((bid) => {
                                            return (
                                              <tr>
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
                                                    nftDetail.lowestNftPrice
                                                  ).toFixed(0)}
                                                  %{" "}
                                                  {bid.bidAmount >
                                                  nftDetail.lowestNftPrice
                                                    ? "above"
                                                    : "below"}
                                                </td>
                                                {/* <td>an hour ago</td> */}
                                                <td>
                                                  {bid.fromAddress.slice(3, 8)}
                                                </td>
                                                {/* {ENV.getUserKeys("_id")._id ===
                                                  bid.bidBy && (
                                                  <td>
                                                    <button
                                                      className="cancel-Bid-btn"
                                                      onClick={() =>
                                                        deleteBid(bid._id)
                                                      }
                                                    >
                                                      Cancel
                                                    </button>
                                                  </td>
                                                )} */}
                                              </tr>
                                            );
                                          })
                                        ) : (
                                          <p className="text-center d-flex justify-content-center align-items-center">
                                            No Offers Found
                                          </p>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {offers && offers.length > 0 ? (
                                          offers.map((offer) => {
                                            return (
                                              <tr>
                                                <th scope="row">
                                                  {offer.price}
                                                </th>
                                                <td>
                                                  $
                                                  {(
                                                    offer.price * exchangeRate
                                                  ).toFixed(2)}
                                                </td>
                                                <td>
                                                  {getPercentageChange(
                                                    offer.price,
                                                    nftDetail.lowestNftPrice
                                                  ).toFixed(0)}
                                                  %{" "}
                                                  {offer.price >
                                                  nftDetail.lowestNftPrice
                                                    ? "above"
                                                    : "below"}
                                                </td>
                                                {/* <td>an hour ago</td> */}
                                                <td>
                                                  {offer.fromAddress.slice(-6)}
                                                </td>
                                                {ENV.getUserKeys("_id")._id ===
                                                  offer.offerBy && (
                                                  <td>
                                                    <button
                                                      className="cancel-Bid-btn"
                                                      onClick={() =>
                                                        deleteBid(offer._id)
                                                      }
                                                    >
                                                      Accept
                                                    </button>
                                                  </td>
                                                )}
                                              </tr>
                                            );
                                          })
                                        ) : (
                                          <p className="text-center d-flex justify-content-center align-items-center">
                                            No Offers Found
                                          </p>
                                        )}
                                      </>
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
                                  <table class="table table-borderless">
                                    {itemsListing &&
                                    itemsListing.length > 0 &&
                                    itemsListing.filter(
                                      (item) =>
                                        item.ownerId !== userId &&
                                        item._id !== nftDetail._id
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
                                                  item._id !== nftDetail._id
                                              )
                                              .map((item) => {
                                                return (
                                                  <tr>
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
                        {/* /// */}
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
                                {nftDetail?.properties &&
                                  nftDetail?.properties.length > 0 &&
                                  nftDetail?.properties.map((item) => {
                                    return (
                                      <div className="col-6 col-sm-4 col-md-6">
                                        <div className="properties-content-container d-flex flex-column justify-content-center align-items-center text-center">
                                          <div className="properties-content">
                                            <span>{item.type}</span>
                                            <h3 className="mb-2">
                                              {item.name}
                                            </h3>
                                            {/* <p>{data.content}</p> */}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
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
                              {nftDetail?.levels &&
                                nftDetail?.stats?.length > 0 &&
                                nftDetail?.stats.map((item) => {
                                  return (
                                    <StatsInfo
                                      name={item.name}
                                      value={item.value}
                                    />
                                  );
                                })}
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
                              {nftDetail?.levels &&
                                nftDetail?.levels.length > 0 &&
                                nftDetail?.levels.map((item) => {
                                  return (
                                    <LevelsInfo
                                      name={item.name}
                                      value={item.value}
                                    />
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                        {/* <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="flush-headingEight"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#flush-collapseEight"
                              aria-expanded="false"
                              aria-controls="flush-collapseEight"
                            >
                              Boosts
                            </button>
                          </h2>
                          <div
                            id="flush-collapseEight"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingEight"
                          >
                            <div className="accordion-body"></div>
                          </div>
                        </div> */}

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
                                <p>{nftDetail.nftToken}</p>
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
                    {nftDetail.fileType === "image" ? (
                      <Card.Img
                        variant="top"
                        src={nftDetail.image}
                        alt="AuctionTopImg"
                      />
                    ) : (
                      <div className="card-img-top">
                        <div className="video-wrapper">
                          <video
                            src={nftDetail.image}
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

                    {/* //InCaseOfVideoCard */}
                  </div>
                  <Card.Body>
                    <div className="detail-card-owner-container d-flex justify-content-between align-items-center mb-2">
                      <div className="detail-nft-owner">
                        <p>Total Copies:{nftDetail.copies}</p>
                      </div>
                      <div className="detail-nft-copies d-flex align-items-center">
                        <p>
                          Sold: {nftDetail?.copies - nftDetail.remainingCopies}{" "}
                        </p>
                        <p className="ps-2">
                          Remaining:{""}
                          {nftDetail?.remainingCopies
                            ? nftDetail?.remainingCopies
                            : nftDetail.copies}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="detail-card-name-container d-flex align-items-center justify-content-between">
                      <div className="detail-nft-name ">
                        <h5>{nftDetail.name}</h5>
                      </div>
                      <div className="likes-container d-flex align-items-center">
                        {toggle ? (
                          <>
                            <AiFillHeart
                              className="heart-fill-icon "
                              onClick={() => {
                                handleLikesTogleApi(nftDetail._id, "dislike");
                              }}
                            />
                            <p className="text-white">
                              {nftDetail.likesCount ? nftDetail.likesCount : 0}{" "}
                            </p>
                          </>
                        ) : (
                          <>
                            <img
                              src={HeartIcon}
                              alt="heart-icon"
                              className="ms-1"
                              onClick={() => {
                                handleLikesTogleApi(nftDetail._id, "like");
                              }}
                            />

                            <span className="ms-1">
                              {nftDetail.likesCount ? nftDetail.likesCount : 0}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      {nftDetail.currentPrice !== null && (
                        <>
                          <h3>
                            {nftDetail.currentPrice}
                            <span>
                              (${" "}
                              {(nftDetail.currentPrice * exchangeRate).toFixed(
                                2
                              )}
                              )
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
                              {nftDetail.ownerId === userId
                                ? "You"
                                : nftDetail.user.username}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className=" d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        {nftDetail.sellingMethod === 2 && (
                          <>
                            {nftDetail.auctionEndDate &&
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
                          {ENV.getUserKeys("_id")._id == nftDetail.ownerId &&
                          nftDetail.sellingMethod
                            ? "Resale"
                            : ENV.getUserKeys("_id")._id == nftDetail.ownerId
                            ? "Sell"
                            : nftDetail?.sellingMethod === 2
                            ? "Place Bid"
                            : nftDetail?.sellingMethod === 1
                            ? "Buy Now"
                            : ""}
                        </button>
                      </>
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
                  <p>{nftDetail.description}</p>
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
                            {activities && activities.length > 0 && (
                              <table class="table table-borderless">
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
                                  {activities.map((activity) => {
                                    return (
                                      <tr>
                                        <th scope="row">
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
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingEleven">
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
                            {nftsList && nftsList.length > 0 ? (
                              nftsList.map((listing, id) => {
                                if (id <= 3) {
                                  return (
                                    <div className="col-10 col-sm-6 col-md-4 col-lg-3 px-1">
                                      {listing.fileType === "image" ? (
                                        <ListingCards
                                          CardImg={listing.image}
                                          name={listing.name}
                                          price={listing.currentPrice}
                                          handleLikesTogleApi={
                                            handleLikesTogleApi
                                          }
                                          id={listing._id}
                                          likesCount={listing.likeCount}
                                          likedNfts={likedNfts}
                                          ownerId={listing.ownerId}
                                          fileType={listing.fileType}
                                          sellingMethod={listing.sellingMethod}
                                          auctionStartDate={
                                            listing?.auctionStartDate
                                          }
                                          auctionEndDate={
                                            listing?.auctionEndDate
                                          }
                                          ownerName={listing.owner[0].username}
                                          copies={listing.copies}
                                          remainingCopies={
                                            listing.remainingCopies
                                          }
                                        />
                                      ) : (
                                        <VideoCard
                                          CardImg={listing.image}
                                          name={listing.name}
                                          price={listing.currentPrice}
                                          handleLikesTogleApi={
                                            handleLikesTogleApi
                                          }
                                          id={listing._id}
                                          likesCount={listing.likeCount}
                                          likedNfts={likedNfts}
                                          ownerId={listing.ownerId}
                                          fileType={listing.fileType}
                                          sellingMethod={listing.sellingMethod}
                                          auctionStartDate={
                                            listing?.auctionStartDate
                                          }
                                          auctionEndDate={
                                            listing?.auctionEndDate
                                          }
                                          ownerName={listing.owner[0].username}
                                          copies={listing.copies}
                                          remainingCopies={
                                            listing.remainingCopies
                                          }
                                        />
                                      )}
                                    </div>
                                  );
                                }
                              })
                            ) : (
                              <p className="text-center mt-4">No NFTs Found</p>
                            )}
                          </div>
                          <div className="mt-4 detail-btn-collection text-center">
                            {nftsList.length > 0 && nftsList.length > 4 && (
                              <button
                                className="btn btn-rounded-bordered"
                                onClick={() =>
                                  history.push({
                                    pathname: `/collection/detailPage/${nftDetail.collectionId}`,
                                    state: nftDetail.collection,
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

          <BuyModal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              setConfirmed(false);
              setModal(1);
              setTransactionSuccess(false);
            }}
            name={nftDetail.name}
            price={nftDetail.currentPrice}
            image={nftDetail.image}
            exchangeRate={exchangeRate}
            tokenId={nftDetail.nftToken}
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
        </section>

        <Footer />
      </>
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
