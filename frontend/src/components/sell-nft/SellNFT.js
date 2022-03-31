import React, { useState, useEffect } from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import "./SellNFT.css";
import { Card } from "react-bootstrap";
import HeartIcon from "../../assets/images/unlike-icon.svg";
import ClockIcon from "../../assets/images/clock-icon.svg";
import PriceIcon from "../../assets/images/priceIcon.svg";
import DollarIcon from "../../assets/images/dollarIcon.svg";
import FeeIcon from "../../assets/images/feeIcon.svg";
import { ENV } from "../../config/config";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { decimalNumberValidator } from "../../utils/functions";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  beforeNFT,
  getNFT,
  upsertNFT,
  getMyLikedNfts,
  createActivity,
} from "../nfts/nfts.action";
import {
  openNFTForBidding,
  putonsale,
  getWalletAddress,
} from "../../utils/web3";
import { toast } from "react-toastify";
import FullPageLoader from "../full-page-loader/full-page-loader";
import { AiFillHeart } from "react-icons/ai";
import {
  toggleLikeDislike,
  beforeTogleLikeDislike,
} from "../explore/explore.action";
import axios from "axios";
import useVideoPlayer from "../test-video-card/components/useVideoPlayer";

const { currencies, dateRangeInitialSettings, serviceFee } = ENV;
const config1 = {
  price: {
    currency: ENV.currency,
    amount: "",
  },
  listingSchedule: {
    startDate: moment(),
    endDate: moment().add(6, "months"),
    startTime: moment(new Date()).format("HH:mm"),
    endTime: "23:59",
  },
  reserveFor: "", // if user selects reserve buyer
};

const config2 = {
  method: 1, // 1 = Sell to the highest bidder or 2 = Sell with the declining price
  startPrice: {
    currency: ENV.currency,
    amount: "",
  },
  duration: {
    startDate: moment(),
    endDate: moment().add(6, "months"),
    startTime: moment(new Date()).format("HH:mm"),
    endTime: "23:59",
  },
  // if user includes reserve price
  reservePrice: {
    currency: ENV.currency,
    amount: "",
  },
};

const SellNFT = (props) => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [toggle, setToggle] = React.useState(true);
  const [activeBidBtn, setActiveBidBtn] = useState(false);
  const [sellingMethod, setSellingMethod] = useState(1); // 1 = Fixed Price, 2 = Timed Auction
  const [fixedPriceConfig, setFixedPriceConfig] = useState(config1);
  const [timedAuctionConfig, setTimedAuctionConfig] = useState(config2);
  const [nftDetail, setNftDetail] = useState("");
  const [liked, setLiked] = useState(false);
  const [nft, setNft] = useState(null);
  const [loader, setLoader] = useState(true); // NFT loader
  const [tokensData, setTokensData] = useState([]);
  const location = useLocation();
  const [likeButtonDisable, setLikeBtnDisable] = useState(null);
  const [likedNfts, setLikedNfts] = useState();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [copies, setCopies] = useState("");
  let nftId = props.match.params.id;

  const videoElement = React.useRef(null);
  const { playerState, togglePlay, handleOnTimeUpdate } =
    useVideoPlayer(videoElement);

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
    window.scroll(0, 0);
    props.getNFT(nftId);
    let qs = { userId: ENV.getUserKeys("_id")._id };
    qs = ENV.objectToQueryString(qs);
    props.getMyLikedNfts(qs);
    validateIfLiked();
    const { itemId } = props.match.params;
    // if (itemId) props.getNFT(window.atob(itemId));
    // else props.history.push("/explore-all");
    getTokens();
  }, []);

  // when NFT data is received
  useEffect(() => {
    if (props.nft.nftsAuth) {
      const nft = props.nft.nftsData;
      setNftDetail(props.nftDetail);
      setNft(nft);
      setLoader(false);
      validateIfLiked(likedNfts, props.nftDetail);
      props.beforeNFT();
    }
  }, [props.nft.nftsAuth]);

  // when NFT data is updated
  useEffect(() => {
    if (props.nft.upsertAuth) {
      const { nft } = props.nft.nftsData;
      // const pathname = nft.sellingMethod === 1 ? '/explore-all' : '/auctions'
      const pathname = "/";
      setLoader(false);
      props.beforeNFT();
      props.history.push(pathname);
    }
  }, [props.nft.upsertAuth]);
  useEffect(() => {
    if (props.togleLikeRes) {
      setLikeBtnDisable(false);
      props.beforeTogleLikeDislike();
    }
  }, [props.togleLikeRes]);
  // Get Liked Nfts
  useEffect(() => {
    if (props.myLikedNftsStatus) {
      setLikedNfts(props.myLikedNfts);
      // validateIfLiked(props.myLikedNfts);
    }
  }, [props.myLikedNftsStatus]);

  // when an error is received
  useEffect(() => {
    setLoader(false);
  }, [props.error]);

  const onChange = (e) => {
  
    const { name, value } = e.target;

    let data = null;

    if (sellingMethod === 1) {
      data = fixedPriceConfig;
    } else {
      data = timedAuctionConfig;
    }

    const keys = name.split("."); // fixedPriceConfig, price, currency

    if (keys && keys[2]) {
      data[keys[1]][keys[2]] = value;
    } else if (keys && keys[1]) data[keys[1]] = value;
  
    if (sellingMethod === 1) {
      setFixedPriceConfig({ ...data });
    } else {
      setTimedAuctionConfig({ ...data });
    }
  };

  const handleDateChange = (e, picker) => {
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

  const submit = async (e) => {
    e.preventDefault();
  
    let price = "";
    let payload = "";

    let timedConfig = { ...timedAuctionConfig };

    let fixedConfig = { ...fixedPriceConfig };
    const { _id, ownerId, ownerAddress } = nftDetail;

    let activityPayload = {
      nftId: _id,
      ownerId,
      fromAddress: await getWalletAddress(),
      activityType: "List",
    };

    if (sellingMethod === 2) {
      let timedAuctionStartTime = new Date(timedConfig.duration.startDate);
      let timedAuctionEndTime = new Date(timedConfig.duration.endDate);

      timedAuctionEndTime = timedAuctionEndTime.toString();
      timedAuctionEndTime =
        timedAuctionEndTime.slice(0, 15) +
        " " +
        timedConfig.duration.endTime +
        ":59" +
        timedAuctionEndTime.slice(24);
      timedConfig.duration.endDate = timedAuctionEndTime;

      timedAuctionStartTime = timedAuctionStartTime.toString();
      timedAuctionStartTime =
        timedAuctionStartTime.slice(0, 15) +
        " " +
        timedConfig.duration.startTime +
        ":59" +
        timedAuctionStartTime.slice(24);
      timedConfig.duration.startDate = timedAuctionStartTime;

      let auctionConfig = timedConfig;
      delete auctionConfig.duration.startTime;
      delete auctionConfig.duration.endTime;
      delete auctionConfig.method;
      price = Number(auctionConfig.startPrice.amount);
      auctionConfig.startPrice.amount = Number(auctionConfig.startPrice.amount);

      payload = {
        _id: location.state._id,
        sellingMethod,
        sellingConfig: JSON.stringify(auctionConfig),
        copiesForAuction: copies,
      };
    } else {
      //  fixedConfig.price.amount;
      delete fixedConfig.listingSchedule.startTime;
      delete fixedConfig.listingSchedule.endTime;
      delete fixedConfig.listingSchedule.startDate;
      delete fixedConfig.listingSchedule.endDate;
      delete fixedConfig.listingSchedule;
      price = Number(fixedConfig.price.amount);

      payload = {
        _id: location.state._id,
        sellingMethod,
        sellingConfig: JSON.stringify(fixedConfig),
        copiesForAuction: copies,
      };
    }

    setLoader(true);

    var formData = new FormData();
    for (const key in payload) formData.append(key, payload[key]);
    if (sellingMethod === 2) {
      try {
        let auctionEndDate = timedAuctionConfig.duration.endDate;
        let auctionStartDate = timedAuctionConfig.duration.startDate;

        const biddingTime = new Date(auctionEndDate).getTime();
        const startTime = new Date(auctionStartDate).getTime();

        let result = await openNFTForBidding(
          biddingTime,
          startTime,
          location.state.nftToken
        );
        if (result) {
          activityPayload.price = price;

          props.createActivity(activityPayload);
          props.upsertNFT("edit", formData, "PUT");
        }
      } catch (err) {
        setLoader(false);
        toast.error(err.message);
      }
    } else {
      try {
        let result = await putonsale(
          nftDetail.nftToken,
          1,
          fixedConfig.price.amount
        );

        if (result) {
          activityPayload.price = price;

          props.createActivity(activityPayload);
          props.upsertNFT("edit", formData, "PUT");
        }
      } catch (err) {
        setLoader(false);
        toast.error(err);
      }
    }
  };

  const handleLikesTogleApi = (nftId, status) => {
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
        setLiked(false);
        setNftDetail(nft);
        props.toggleLikeDislike(data);
      } else {
        let nft = nftDetail;
        nft.likesCount = nft.likesCount + 1;

        setNftDetail(nft);
        setLiked(true);
        props.toggleLikeDislike(data);
      }
    }
  };

  //match if nft liked

  const validateIfLiked = (nfts, nft) => {
    if (nfts && nfts?.length > 0) {
      setLoader(false);
      let result = nfts.find((item) => item.nftId == nft._id);

      if (result) {
        return setToggle(true);
      } else {
        return setToggle(false);
      }
    } else {
      setLoader(false);
      return setToggle(false);
    }
  };
  const auctionEndTimeConversion = (auctionEndDate) => {
    var dateString = moment.utc(auctionEndDate).format("MMMM D, Y");
    var timeString = moment.utc(auctionEndDate).format("h:mma");
    var totalDateTime = dateString + " at " + timeString + " PKT";
    return totalDateTime;
  };

  const getTokens = () => {
    const url = process.env.REACT_APP_BASE_URL + "nftTokens/tokens";

    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: ENV.Authorization,
        "x-auth-token": ENV.x_auth_token,
        "Access-Control-Allow-Origin": "*",
        "x-access-token":
          ENV.getUserKeys("accessToken") &&
          ENV.getUserKeys("accessToken").accessToken
            ? ENV.getUserKeys("accessToken").accessToken
            : "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTokensData(data);
      })
      .catch((error) => {
        console.log(error, "error in catch blcok");
      });
  };
  const { image, currentPrice, likesCount, auctionEndDate } = nftDetail;

  return (
    <>
      {loader && <FullPageLoader />}
      <NavbarMain />
      <section className="padding-wrapper nft-detail">
        <form onSubmit={submit}>
          <div className="container">
            <div className="row g-3">
              <div className="col-12 order-2 order-md-1 col-md-6 col-lg-7 col-xl-8 ">
                <div className="row">
                  <div className="col-12 order-2 order-md-1">
                    <div className="intro mb-5">
                      <div className="intro-content">
                        <span>SellNFTs</span>
                        <h3 className="mb-0">List of bundles for sale</h3>
                      </div>
                    </div>
                    <div className="sale-btn-container mt-5 mb-4">
                      <button
                        className={` ${
                          activeBtn === 0
                            ? "sell-btn-active"
                            : "sell-btn-not-active"
                        } me-3 `}
                        onClick={() => {
                          setActiveBtn(0);
                          setSellingMethod(1);
                          setCopies("");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="14"
                          className="me-1 me-sm-2"
                        >
                          <path
                            fill-rule="evenodd"
                            fill="#FDFDFD"
                            d="M3.974 6.71H3.22c-.939 0-1.527-1.317-1.443-2.098.07-.693.672-1.179 1.329-1.179h1.12c.419 0 .769.31 1.564.722-.683.118-.585.192-.473.192h1.259c.14 0 .266-.133.252.323-.126-1.944-1.161-2.991-2.449-3.079V.265A.256.256 0 0 0 4.128 0h-1.26a.257.257 0 0 0-.252.265v1.341C1.49 1.827.139 3.315.14 5.69c.028 1.03 1.441 2.238 3.008 2.238h.826c.741 0 1.329.678 1.245 1.459-.07 1.413-.671 1.179-1.329 1.179H2.77c-.419 0-.67-.309-.853-.722a.242.242 0 0 0-.238-.191H.42a.262.262 0 0 0-.252.28c.126 1.341 1.161 2.387 2.449 2.475v1.327c0 .147.112.265.251.265h1.26c.14 0 .252-.118.252-.265v-1.356c1.343-.236 2.462-.999 2.602-2.8C7.15 7.678 5.737 6.71 3.974 6.71z"
                          />
                        </svg>
                        Fixed Prize
                      </button>
                      <button
                        className={` ${
                          activeBtn === 1
                            ? "sell-btn-active"
                            : "sell-btn-not-active"
                        } `}
                        onClick={() => {
                          setActiveBtn(1);
                          setSellingMethod(2);
                          setCopies("");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          className="me-1 me-sm-2"
                        >
                          <path
                            fill-rule="evenodd"
                            fill="#FFF"
                            d="M7.999 15.999a7.999 7.999 0 0 1-7.999-8A7.999 7.999 0 0 1 7.999 0c4.419 0 8 3.581 8 7.999a8 8 0 0 1-8 8zm0-14.4a6.4 6.4 0 1 0 .002 12.802 6.4 6.4 0 0 0-.002-12.802zm1.957 8.666L8.268 9.14a.42.42 0 0 0-.022-.015c.664.095-.313-.209-.442-.313a1.581 1.581 0 0 1-.415-.486 1.572 1.572 0 0 1-.174-.615c-.016-.165-.015-.355-.015-.541V3.999a.8.8 0 0 1 .8-.8h-.001a.8.8 0 0 1 .8.8v3.144c0 .224.001.338.009.42v.004l.003.002c.064.052.158.115.345.24l1.687 1.125c.368.245.467.742.807 1.496-.83-.019-1.327.08-1.694-.165z"
                          />
                        </svg>
                        Timed Auction
                      </button>
                    </div>
                    <div className="nftDetail-accordion">
                      <div
                        className="accordion accordion-flush "
                        id="accordionFlushExample"
                      >
                        {activeBtn === 0 ? (
                          <>
                            <div className="accordion-item">
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
                                    src={PriceIcon}
                                    alt="price-history"
                                    className="me-2"
                                  />
                                  Price
                                </button>
                              </h2>
                              <div
                                id="flush-collapseOne"
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne"
                              >
                                <div className="accordion-body">
                                  <div className="sell-price-container mx-auto">
                                    <div className="sell-price-inp d-flex align-items-center">
                                      <div className="sell-price-currency text-center">
                                        <span> ETH </span>
                                      </div>
                                      <input
                                        type="text"
                                        name="fixedPriceConfig.price.amount"
                                        placeholder="Amount"
                                        style={{
                                          borderRadius: "4px",
                                        }}
                                        onChange={(e) => onChange(e)}
                                        onKeyDown={(e) =>
                                          decimalNumberValidator(e)
                                        }
                                        defaultValue={
                                          fixedPriceConfig.price.amount
                                        }
                                        required
                                        autoComplete="off"
                                      />
                                    </div>
                                  </div>
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
                                  <img
                                    src={PriceIcon}
                                    alt="price-history"
                                    className="me-2"
                                  />
                                  No. of Copies
                                </button>
                              </h2>
                              <div
                                id="flush-collapseNine"
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingNine"
                              >
                                <div className="accordion-body">
                                  <div className="sell-price-container mx-auto">
                                    <div className="sell-price-inp d-flex align-items-center">
                                      <div className="sell-price-currency text-center">
                                        <span> Copies </span>
                                      </div>
                                      <input
                                        type="number"
                                        name="timedAuctionConfig.startPrice.amount"
                                        placeholder="Copies"
                                        maxLength={nftDetail.copies >= copies}
                                        style={{
                                          borderRadius: "4px",
                                        }}
                                        min={"1"}
                                        max={`${copies <= nftDetail.copies}`}
                                        onChange={(e) =>
                                          setCopies(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                          decimalNumberValidator(e)
                                        }
                                        value={copies}
                                        required
                                        autoComplete="off"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <div className="accordion-item">
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
                                  src={ClockIcon}
                                  alt="price-history"
                                  className="me-2"
                                />
                                Schedule Listing
                              </button>
                            </h2>
                            <div
                              id="flush-collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingTwo"
                            >
                              <div className="accordion-body">
                                <div className="date-picker sell-date-picker mx-auto">
                                  <DateRangePicker
                                    initialSettings={dateRangeInitialSettings}
                                    onApply={handleDateChange}
                                  >
                                    <button
                                      name="fixedPriceConfig.listingSchedule"
                                      className="calender-btn"
                                    >
                                      {fixedPriceConfig.listingSchedule.startDate.format(
                                        "MMMM D, YYYY"
                                      )}{" "}
                                      -{" "}
                                      {fixedPriceConfig.listingSchedule.endDate.format(
                                        "MMMM D, YYYY"
                                      )}
                                      &nbsp;&nbsp;&nbsp;
                                      <i className="fas fa-calendar-week" />
                                    </button>
                                  </DateRangePicker>
                                </div>
                                <div className="sell-time-container">
                                  <div className="sell-time-inp mx-auto my-3">
                                    <input
                                      type="time"
                                      name="fixedPriceConfig.listingSchedule.startTime"
                                      placeholder="Start Time"
                                      className="py-1"
                                      onChange={(e) => onChange(e)}
                                      defaultValue={
                                        fixedPriceConfig.listingSchedule
                                          .startTime
                                      }
                                      required
                                    />
                                  </div>

                                  <div className="sell-time-inp mx-auto my-3">
                                    <input
                                      type="time"
                                      name="fixedPriceConfig.listingSchedule.endTime"
                                      placeholder="End Time"
                                      className="py-1"
                                      onChange={(e) => onChange(e)}
                                      defaultValue={
                                        fixedPriceConfig.listingSchedule.endTime
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          </>
                        ) : (
                          <>
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
                                    src={PriceIcon}
                                    alt="price-history"
                                    className="me-2"
                                  />
                                  Bid option
                                </button>
                              </h2>
                              <div
                                id="flush-collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingThree"
                              >
                                <div className="accordion-body">
                                  <div className="sell-bid-opt-container mx-auto">
                                    <button
                                      className={`${
                                        activeBidBtn ? "sell-bid-active" : ""
                                      } sell-bid-opt-btn`}
                                      onClick={() =>
                                        setActiveBidBtn(!activeBidBtn)
                                      }
                                    >
                                      Sell To The Highest Bidder
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

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
                                  <img
                                    src={PriceIcon}
                                    alt="price-history"
                                    className="me-2"
                                  />
                                  Price
                                </button>
                              </h2>
                              <div
                                id="flush-collapseFour"
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingFour"
                              >
                                <div className="accordion-body">
                                  <div className="sell-price-container mx-auto">
                                    <div className="sell-price-inp d-flex align-items-center">
                                      <div className="sell-price-currency text-center">
                                        <span> ETH </span>
                                      </div>
                                      <input
                                        type="text"
                                        name="timedAuctionConfig.startPrice.amount"
                                        placeholder="Amount"
                                        style={{
                                          borderRadius: "4px",
                                        }}
                                        onChange={(e) => onChange(e)}
                                        onKeyDown={(e) =>
                                          decimalNumberValidator(e)
                                        }
                                        defaultValue={
                                          fixedPriceConfig.price.amount
                                        }
                                        required
                                        autoComplete="off"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id="flush-headingTen"
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target="#flush-collapseTen"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseTen"
                                >
                                  <img
                                    src={PriceIcon}
                                    alt="price-history"
                                    className="me-2"
                                  />
                                  No. of Copies
                                </button>
                              </h2>
                              <div
                                id="flush-collapseTen"
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingTen"
                              >
                                <div className="accordion-body">
                                  <div className="sell-price-container mx-auto">
                                    <div className="sell-price-inp d-flex align-items-center">
                                      <div className="sell-price-currency text-center">
                                        <span> Copies </span>
                                      </div>
                                      <input
                                        type="number"
                                        name="timedAuctionConfig.startPrice.amount"
                                        placeholder="Copies"
                                        style={{
                                          borderRadius: "4px",
                                        }}
                                        min={"1"}
                                        max={`${copies <= nftDetail.copies}`}
                                        maxLength={3}
                                        onChange={(e) =>
                                          setCopies(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                          decimalNumberValidator(e)
                                        }
                                        value={copies}
                                        required
                                        autoComplete="off"
                                      />
                                    </div>
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
                                  <img
                                    src={ClockIcon}
                                    alt="price-history"
                                    className="me-2"
                                  />
                                  Duration
                                </button>
                              </h2>
                              <div
                                id="flush-collapseSix"
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingSix"
                              >
                                <div className="accordion-body">
                                  <div className="sell-date-picker mx-auto">
                                    <DateRangePicker
                                      initialSettings={dateRangeInitialSettings}
                                      onApply={handleDateChange}
                                    >
                                      <button
                                        name="timedAuctionConfig.duration"
                                        className="calender-btn"
                                        type="button"
                                      >
                                        {moment(
                                          timedAuctionConfig.duration.startDate
                                        ).format("MMMM D, YYYY")}{" "}
                                        -{" "}
                                        {moment(
                                          timedAuctionConfig.duration.endDate
                                        ).format("MMMM D, YYYY")}
                                        &nbsp;&nbsp;&nbsp;
                                        <i className="fas fa-calendar-week" />
                                      </button>
                                    </DateRangePicker>
                                  </div>
                                  <div className="sell-time-container">
                                    <div className="sell-time-inp mx-auto my-3">
                                      <input
                                        type="time"
                                        name="timedAuctionConfig.duration.startTime"
                                        placeholder="Start Time"
                                        className="py-1"
                                        onChange={(e) => onChange(e)}
                                        defaultValue={
                                          timedAuctionConfig.duration.startTime
                                        }
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
                                        defaultValue={
                                          timedAuctionConfig.duration.endTime
                                        }
                                        required
                                        autoComplete="off"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-10 col-sm-6 col-md-8 col-lg-6  col-xl-4">
                        <div className="sell-fee-container">
                          <div className="sell-fee-title d-flex align-items-center mb-2">
                            <img src={FeeIcon} alt="feeIcon" className="me-2" />
                            <h6>Fees</h6>
                          </div>
                          <div className="sell-fee-content d-flex align-items-center justify-content-between mb-1">
                            <p>Service Fee</p>
                            <p>2.5 %</p>
                          </div>
                          <div className="sell-fee-content d-flex align-items-center justify-content-between">
                            <p>Creator Royalty</p>
                            <p>2.5 %</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 text-center mt-5">
                        <button
                          className="complete-btn px-5"
                          type="submit"
                          // onClick={() => submit()}
                        >
                          {" "}
                          Complete Listing{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-11 col-sm-8 order-1 order-md-2 col-md-6 col-lg-5 col-xl-4 mx-auto">
                <Card className="auction-card detail-card">
                  <div className="auction-img-wrapper">
                    {/* <Card.Img variant="top" src={image} alt="AuctionTopImg" /> */}

                    {/* //InCaseOfVideoCard */}
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
                                <i className="fa fa-pause"></i>
                              ) : (
                                <i className="fa fa-play"></i>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Card.Body>
                    <div className="detail-card-name-container d-flex align-items-center justify-content-between">
                      <div className="detail-nft-name">
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
                    {currentPrice !== null && (
                      <div>
                        <h3>
                          {currentPrice}
                          <span>
                            {" "}
                            ($ {(currentPrice * exchangeRate).toFixed(2)})
                          </span>
                        </h3>
                      </div>
                    )}
                    <div className="detail-card-owner-container d-flex justify-content-between align-items-center mb-2">
                      <div className="detail-nft-owner">
                        <p>
                          Owned by <span>XYZ</span>
                        </p>
                      </div>
                      <div className="detail-nft-copies">
                        <p>
                          {nftDetail.copies}{" "}
                          {nftDetail.copies === 1 ? "Copy" : "Copies"}
                        </p>
                      </div>
                    </div>
                    <div className=" d-flex justify-content-between align-items-center mb-2">
                      {nftDetail.sellingMethod === 2 && (
                        <div className="d-flex align-items-center">
                          <img
                            src={ClockIcon}
                            alt="clock-icon"
                            className="me-1"
                          />
                          <span>
                            Sale ends {auctionEndTimeConversion(auctionEndDate)}{" "}
                          </span>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  nft: state.nft,
  error: state.error,
  nftDetail: state.nft.nftsData,
  nftsAuth: state.nft.nftsAuth,
  myLikedNfts: state.nft.myLikedNfts,
  myLikedNftsStatus: state.nft.myLikedNftsStatus,
});

export default connect(mapStateToProps, {
  beforeNFT,
  getNFT,
  upsertNFT,
  toggleLikeDislike,
  getMyLikedNfts,
  beforeTogleLikeDislike,
  createActivity,
})(SellNFT);
