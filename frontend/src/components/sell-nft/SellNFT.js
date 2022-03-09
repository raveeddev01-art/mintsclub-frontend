import React, { useState, useEffect } from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import "./SellNFT.css";
import { Card } from "react-bootstrap";
import CardImg from "../../assets/images/detailnftimg.png";
import HeartIcon from "../../assets/images/unlike-icon.svg";
import ClockIcon from "../../assets/images/clock-icon.svg";
import PriceIcon from "../../assets/images/priceIcon.svg";
import DollarIcon from "../../assets/images/dollarIcon.svg";
import FeeIcon from "../../assets/images/feeIcon.svg";
import { ENV } from "../../config/config";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { decimalNumberValidator } from "../../utils/functions";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { beforeNFT, getNFT, upsertNFT } from "../nfts/nfts.action";
import { openNFTForBidding } from "../../utils/web3";
import { toast } from "react-toastify";
import FullPageLoader from "../full-page-loader/full-page-loader";

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
  const [activeBidBtn, setActiveBidBtn] = useState(false);
  const [sellingMethod, setSellingMethod] = useState(1); // 1 = Fixed Price, 2 = Timed Auction
  const [fixedPriceConfig, setFixedPriceConfig] = useState(config1);
  const [timedAuctionConfig, setTimedAuctionConfig] = useState(config2);
  const [nft, setNft] = useState(null);
  const [loader, setLoader] = useState(true); // NFT loader
  const [tokensData, setTokensData] = useState([]);
  const location = useLocation();
  console.log(location, "location");

  useEffect(() => {
    window.scroll(0, 0);
    const { itemId } = props.match.params;
    // if (itemId) props.getNFT(window.atob(itemId));
    // else props.history.push("/explore-all");
    getTokens();
  }, []);

  // when NFT data is received
  useEffect(() => {
    if (props.nft.nftsAuth) {
      const nft = props.nft.nftsData;
      setNft(nft);
      setLoader(false);
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

  // when an error is received
  useEffect(() => {
    setLoader(false);
  }, [props.error]);

  const onChange = (e) => {
    const { name, value } = e.target;

    let data = null;

    if (sellingMethod === 1) data = fixedPriceConfig;
    else data = timedAuctionConfig;

    const keys = name.split("."); // fixedPriceConfig, price, currency

    if (keys && keys[2]) {
      data[keys[1]][keys[2]] = value;
    } else if (keys && keys[1]) data[keys[1]] = value;

    if (sellingMethod === 1) setFixedPriceConfig({ ...data });
    else setTimedAuctionConfig({ ...data });
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
  const submit = async () => {
    let payload = "";

    if (sellingMethod === 2) {
      payload = {
        _id: location.state._id,
        sellingMethod,
        sellingConfig: JSON.stringify(timedAuctionConfig),
      };
    } else {
      payload = {
        _id: location.state._id,
        sellingMethod,
        sellingConfig: JSON.stringify(fixedPriceConfig),
      };
    }

    let time = timedAuctionConfig.duration.endTime;

    var r = Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]) * 1000;

    setLoader(true);

    var formData = new FormData();
    for (const key in payload) formData.append(key, payload[key]);

    try {
      let auctionEndDate = timedAuctionConfig.duration.endDate;
      let auctionStartDate = timedAuctionConfig.duration.startDate;

      console.log(auctionEndDate,"auctionEndDate")

      const biddingTime = new Date(auctionEndDate).getTime();
      const startTime = new Date(auctionStartDate).getTime();

      console.log(biddingTime,"bidding time")
      console.log(startTime,"startTime")
      let result = await openNFTForBidding(
        biddingTime,
        startTime,
        location.state.nftToken
      );
      console.log(result, "result of bidding");
      if (result) {
        props.upsertNFT("edit", formData, "PUT");
      }
    } catch (err) {
      toast.error(err.message);
    }
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
  return (
    <>
      {loader && <FullPageLoader />}
      <NavbarMain />
      <section className="padding-wrapper nft-detail">
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
                      }}
                    >
                      <img
                        src={DollarIcon}
                        alt="fixedPrize"
                        className="me-1 me-sm-2"
                      />
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
                      }}
                    >
                      <img src={ClockIcon} alt="timeAuction" className="me-2" />
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
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

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
                                <div className="sell-date-picker mx-auto">
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
                          </div>
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
                                      name="timedAuctionConfig.duration.startTime"
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
                                      name="timedAuctionConfig.duration.endTime"
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
                          <p>3 %</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 text-center mt-5">
                      <button
                        className="sell-btn-active px-5"
                        onClick={() => submit()}
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
                  <Card.Img
                    variant="top"
                    src={location.state.image}
                    alt="AuctionTopImg"
                  />
                </div>
                <Card.Body>
                  <div>
                    <span>Current price</span>
                    <h3>
                      {location.state.currentPrice}
                      <span>($2.28)</span>
                    </h3>
                  </div>
                  <div className=" d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <img src={ClockIcon} alt="clock-icon" className="me-1" />
                      <span>Sale ends March 8, 2022 at 7:40am PKT </span>
                    </div>
                    <div className="likes-container d-flex align-items-center">
                      <span>{}</span>
                      <img src={HeartIcon} alt="heart-icon" className="ms-1" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  nft: state.nft,
  error: state.error,
});

export default connect(mapStateToProps, {
  beforeNFT,
  getNFT,
  upsertNFT,
})(SellNFT);
