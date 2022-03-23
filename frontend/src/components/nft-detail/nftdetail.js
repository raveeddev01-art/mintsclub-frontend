import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import "./nftdetail.css";
import PriceHistoy from "../../assets/images/pricehistoryicon.svg";
import OfferIcon from "../../assets/images/offer-icon.svg";
import ListingIcon from "../../assets/images/listing-icon.svg";
import ActivityIcon from "../../assets/images/activity.svg";
import MoreCollectionIcon from "../../assets/images/morecollectionicon.svg";
import { ListingImg } from "../../assets/assets";
import ListingCards from "../listing-cards/ListingCards";
import { Card } from "react-bootstrap";
import CardImg from "../../assets/images/detailnftimg.png";
import HeartIcon from "../../assets/images/unlike-icon.svg";
import ClockIcon from "../../assets/images/clock-icon.svg";
import DescriptionIcon from "../../assets/images/detail-description-icon.svg";
import {
  getNFT,
  getNFTsByCollection,
  getMyLikedNfts,
  beforeNFT,
} from "../nfts/nfts.action.js";
import FullPageLoader from "../full-page-loader/full-page-loader.js";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { ENV } from "../../config/config";
import { decimalNumberValidator } from "../../utils/functions";
import {
  toggleLikeDislike,
  beforeTogleLikeDislike,
} from "../explore/explore.action";
import moment from "moment";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import {
  placeABid,
  connectMetamask,
  BuyFixedPriceNFT,
  getWalletAddress,
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
// import  {}

const NFTDetail = (props) => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [toggle, setToggle] = React.useState(true);
  const [likedNfts, setLikedNfts] = useState();
  const [nftDetail, setNftDetail] = useState("");
  const [nftsList, setNftList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bids, setBids] = useState(null);
  const [offers, setOffers] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [likeButtonDisable, setLikeBtnDisable] = useState(null);
  const [modal, setModal] = useState(1);
  const [confirmed, setConfirmed] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const history = useHistory();

  let nftId = props.match.params.id;
  let userId = ENV.getUserKeys("_id")._id;
  console.log(userId, "userId");
  const initData = {
    itemImg: "/img/auction_2.jpg",
    date: "2022-03-30",
    price_2: "$500.89",
    bidBtn: "Place a Bid",
    offerBtn: "Buy Now",
    sellBtn: "Sell",
  };
  const { currencies } = ENV;
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
  const [nftConfig, setNftConfig] = useState(config1);
  const validator = new SimpleReactValidator({
    autoForceUpdate: this,
    messages: {
      required: "This field is required.", // will override all messages
    },
  });

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
    props.getNFT(nftId);
    let qs = { userId: ENV.getUserKeys("_id")._id };
    qs = ENV.objectToQueryString(qs);
    props.getMyLikedNfts(qs);
    validateIfLiked();
    props.getBids();
  }, []);

  useEffect(() => {
    if (props.createAuth) {
      setLoader(false);
      history.push("/");
    }
  }, [props.createAuth]);
  useEffect(() => {
    if (props.buyAuth) {
      setLoader(false);
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
      history.push("/");
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
      // props.beforeBid();
      setBids(props.bids);
    }
  }, [props.getAuth]);

  useEffect(() => {
    if (props.nftsAuth) {
      setNftDetail(props.nftDetail);
      setLoader(false)

      if (props.nftDetail.sellingMethod === 1) {
        let qs = { offerBy: ENV.getUserKeys("_id")._id };
        qs = ENV.objectToQueryString(qs);
        props.getOffers(qs);
      }

      if (nftDetail.sellingMethod === 2) {
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

      setPrice(fivePerc);
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

  const handleRouting = () => {
    if (ENV.getUserKeys("_id")._id === nftDetail?.ownerId) {
      history.push({
        pathname: `/sell-item/${nftDetail._id}`,
        state: nftDetail,
      });
    } else {
      setIsOpen(true);
      // setModalShow(true);
    }
  };
  //toggleLikes
  React.useEffect(() => {
    return () => "";
  }, [toggle]);

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
  const onChangeModal = (e) => {
    const { name, value } = e.target;
    let data = nftConfig;

    const keys = name.split("."); // nftConfig, price, currency
    if (keys && keys[2]) data[keys[1]][keys[2]] = value;
    else if (keys && keys[1]) data[keys[1]] = value;

    if (keys && keys[1] === "price" && keys[2] === "amount")
      data[keys[1]]["amount"] = Number(value);

    if (keys && keys[1] === "expiry" && keys[2] === "date")
      data[keys[1]]["type"] = Number(value) === -1 ? 2 : 1;

    // set datetime for days / months
    if (data.expiry.type === 1)
      data.expiry.datetime = moment(
        data.expiry.date + " " + data.expiry.time,
        "DD/MM/YYYY HH:mm"
      );
    // set datetime for custom date
    else if (data.expiry.type === 2) {
      data.expiry.datetime = moment(data.expiry.time, "DD/MM/YYYY HH:mm");
      data.expiry.date = moment(data.expiry.time, "DD/MM/YYYY");
    }

    setNftConfig(data);
    console.log(data, "data");
  };

  const calculatePricePercantage = () => {
    let fivePerc = "";
    if (nftDetail.highestBid === 0) {
      fivePerc = (5 / 100) * nftDetail.currentPrice;
      return fivePerc + nftDetail.currentPrice;
    } else {
      fivePerc = (5 / 100) * nftDetail.highestBid;
      return fivePerc + nftDetail.highestBid;
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

  const closeModal = () => {
    setIsOpen(false);
  };
  const onChange = (e) => {
    setPrice(e.target.value);
  };
  const handleModalSubmit = async () => {
    setLoader(true);
    setIsOpen(false);
    if (nftDetail.sellingMethod === 2) {
      placeBid();
    } else {
      makeOffer();
    }
  };
  const placeBid = async () => {
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
      }
    } catch (err) {
      setLoader(false);
      setIsOpen(false);
      toast.error(err);
    }
  };
  const makeOffer = async () => {
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
          expiryDate: nftConfig.expiry.datetime,
          isAccepted: false,
          isExpired: false,
        };
        console.log(payload, "payload");

        props.makeOffer(payload);
      }
    } catch (err) {
      setLoader(false);
      setIsOpen(false);
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
  };

  const deleteOffer = (id) => {
    let result = offers.filter((offer) => offer._id !== id);
    setOffers(result);
    props.deleteOffer(id);
  };
  const auctionEndTimeConversion = (auctionEndDate) => {
    var dateString = moment.utc(auctionEndDate).format("MMMM D, Y");
    var timeString = moment.utc(auctionEndDate).format("h:mma");
    var totalDateTime = dateString + " at " + timeString + " PKT";
    return totalDateTime;
  };

  const BuyNow = async () => {
    try {
      const result = await BuyFixedPriceNFT(
        nftDetail.currentPrice,
        nftDetail.nftToken,
        setConfirmed,
        setTransactionHash
      );
      if (result) {
        let payload = {
          userId,
          nftId,
          ownerAddress: await getWalletAddress(),
        };
        props.buyNow(payload);
      }
    } catch (err) {}
  };
  // console.log(nftDetail,"NFTdetail")
  // console.log(bids,"bids")
  console.log(loader,"loader")

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
                                  {((bids && bids.length > 0) ||
                                    (offers && offers.length > 0)) && (
                                    <thead>
                                      <tr>
                                        <th scope="col">Price</th>
                                        <th scope="col">USD Price</th>
                                        <th scope="col">Floor Difference</th>
                                        {/* <th scope="col">Expiration</th> */}
                                        <th scope="col">From</th>
                                        <th scope="col">{""}</th>
                                      </tr>
                                    </thead>
                                  )}
                                  <tbody>
                                    {nftDetail.sellingMethod === 2 ? (
                                      <>
                                        {bids && bids.length > 0 ? (
                                          bids
                                            .filter(
                                              (item) =>
                                                item.nftId === nftDetail._id
                                            )
                                            .map((bid) => {
                                              return (
                                                <tr>
                                                  <th scope="row">
                                                    {bid.bidAmount}
                                                  </th>
                                                  <td>
                                                    $
                                                    {(
                                                      bid.bidAmount *
                                                      exchangeRate
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
                                                    {bid.fromAddress.slice(
                                                      3,
                                                      8
                                                    )}
                                                  </td>
                                                  {ENV.getUserKeys("_id")
                                                    ._id === bid.bidBy && (
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
                                    ) : (
                                      <>
                                        {offers && offers.length > 0 ? (
                                          offers.map((offer) => {
                                            return (
                                              <tr>
                                                <th scope="row">
                                                  {offer.price} ETH
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
                                                  {offer.fromAddress.slice(
                                                    3,
                                                    8
                                                  )}
                                                </td>
                                                {ENV.getUserKeys("_id")._id ===
                                                  offer.ownerId && (
                                                  <td>
                                                    <button
                                                      className="cancel-Bid-btn"
                                                      onClick={() =>
                                                        deleteOffer(offer._id)
                                                      }
                                                    >
                                                      Cancel
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
                                  <thead>
                                    <tr>
                                      <th scope="col">Price</th>
                                      <th scope="col">USD Price</th>
                                      <th scope="col">Expiration</th>
                                      <th scope="col">From</th>
                                      <th scope="col">{""}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th scope="row">0.025</th>
                                      <td>$77.50</td>
                                      <td>in a day</td>
                                      <td>BBC1B3</td>
                                      <td>
                                        <button>Buy</button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
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
                                {propertiesData &&
                                  propertiesData.map((data) => {
                                    return (
                                      <div className="col-6 col-sm-4 col-md-6">
                                        <div className="properties-content-container d-flex flex-column justify-content-center align-items-center text-center">
                                          <div className="properties-content">
                                            <span>{data.subTitle}</span>
                                            <h3>{data.title}</h3>
                                            <p>{data.content}</p>
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
                            <div className="accordion-body"></div>
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
                            <div className="accordion-body"></div>
                          </div>
                        </div>
                        <div className="accordion-item">
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
                                <span>0x7227...3335</span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p>Token ID</p>
                                <p>1584563428....</p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p>Token Standard </p>
                                <p>ERC-721</p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p>Blockchain </p>
                                <p>Polygon</p>
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
                    <Card.Img
                      variant="top"
                      src={nftDetail.image}
                      alt="AuctionTopImg"
                    />
                  </div>
                  <Card.Body>
                    <div>
                      {nftDetail.currentPrice !== null && (
                        <>
                          <span>Current price</span>
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
                    </div>
                    <div className=" d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        {nftDetail.sellingMethod && (
                          <>
                            <img
                              src={ClockIcon}
                              alt="clock-icon"
                              className="me-1"
                            />
                            <span>
                              Sale ends{" "}
                              {auctionEndTimeConversion(
                                nftDetail.auctionEndDate
                              )}{" "}
                            </span>
                          </>
                        )}
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
                    {(nftDetail?.sellingMethod ||
                      ENV.getUserKeys("_id")._id == nftDetail.ownerId) && (
                      <>
                        <button
                          className="btn btn-linear-gradient d-flex align-items-center justify-content-center w-75 mx-auto"
                          onClick={() => handleRouting()}
                        >
                          {ENV.getUserKeys("_id")._id == nftDetail.ownerId
                            ? "Sell"
                            : nftDetail?.sellingMethod === 2
                            ? "Place Bid"
                            : nftDetail?.sellingMethod === 1
                            ? "Make Offer"
                            : ""}
                        </button>
                        {nftDetail?.sellingMethod===1 && ENV.getUserKeys("_id")._id !== nftDetail.ownerId &&(
                          <button
                            className="btn buy-now-btn d-flex align-items-center justify-content-center w-75 mx-auto mt-3"
                            onClick={() => setModalShow(true)}
                          >
                            Buy Now
                          </button>
                        )}
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
                                <tr>
                                  <th scope="row">List</th>
                                  <td>0.025</td>
                                  <td>BBC1B3</td>
                                  <td> </td>
                                  <td>an hour ago</td>
                                </tr>
                                <tr>
                                  <th scope="row">List</th>
                                  <td>0.025</td>
                                  <td>BBC1B3</td>
                                  <td> </td>
                                  <td>an hour ago</td>
                                </tr>
                                <tr>
                                  <th scope="row">List</th>
                                  <td>0.025</td>
                                  <td>BBC1B3</td>
                                  <td> </td>
                                  <td>an hour ago</td>
                                </tr>
                                <tr>
                                  <th scope="row">List</th>
                                  <td>0.025</td>
                                  <td>BBC1B3</td>
                                  <td> </td>
                                  <td>an hour ago</td>
                                </tr>
                                <tr>
                                  <th scope="row">List</th>
                                  <td>0.025</td>
                                  <td>BBC1B3</td>
                                  <td> </td>
                                  <td>an hour ago</td>
                                </tr>
                                <tr>
                                  <th scope="row">List</th>
                                  <td>0.025</td>
                                  <td>BBC1B3</td>
                                  <td> </td>
                                  <td>an hour ago</td>
                                </tr>
                                <tr>
                                  <th scope="row">List</th>
                                  <td>0.025</td>
                                  <td>BBC1B3</td>
                                  <td> </td>
                                  <td>an hour ago</td>
                                </tr>
                                <tr>
                                  <th scope="row">List</th>
                                  <td>0.025</td>
                                  <td>BBC1B3</td>
                                  <td> </td>
                                  <td>an hour ago</td>
                                </tr>
                              </tbody>
                            </table>
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
                              nftsList.map((listing) => {
                                return (
                                  <div className="col-6 col-sm-6 col-md-4 col-lg-2 px-1">
                                    <ListingCards
                                      CardImg={listing.image}
                                      name={listing.name}
                                      price={listing.currentPrice}
                                      // usd={
                                      //   listing.currentPrice * exchangeRate
                                      // }
                                      id={listing._id}
                                    />
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-center mt-4">No NFTs Found</p>
                            )}
                          </div>
                          <div className="mt-4 detail-btn-collection text-center">
                            {nftsList.length > 0 && (
                              <button className="btn btn-rounded-bordered">
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
          {/* ///////////////////////////////////// Modal */}
          <div className="modal-wrapper">
            <Modal
              centered
              size="lg"
              className="place-bid-modal"
              show={isOpen}
              onHide={closeModal}
              contentClassName="bid-modal-content"
            >
              <Modal.Header className="bid-modal-header text-center text-white">
                <Modal.Title>
                  {nftDetail.sellingMethod === 2
                    ? "Place A Bid"
                    : "Make An Offer"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="price-wrapper d-flex">
                  <div className="price-text position-relative">
                    <div className="text-white mb-2 absolute-wrapper">
                      <b>Price</b>
                    </div>
                    <div className="text-right mb-2">
                      <i className="fas fa-exclamation-circle ml-2 text-white" />
                    </div>
                    <div className="d-flex">
                      <select
                        className="form-control currency-options"
                        id="currency"
                        name="nftConfig.price.currency"
                        onChange={(e) => onChange(e)}
                        disabled={true}
                      >
                        {currencies &&
                          currencies.map((currency, index) => {
                            return (
                              <option key={index} value={currency.symbol}>
                                {currency.symbol}
                              </option>
                            );
                          })}
                      </select>
                      <input
                        type="text"
                        placeholder="Amount"
                        className="amount-btn ml-3"
                        name="nftConfig.price.amount"
                        style={{ borderRadius: "4px" }}
                        onChange={(e) => onChange(e)}
                        onKeyDown={(e) => decimalNumberValidator(e)}
                        defaultValue={calculatePricePercantage()}
                        required
                      />
                      <div className="text-right mb-2 dollar-wrapper">
                        ${(price * exchangeRate).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Body className="text-danger">
                {validator.message(
                  "amount",
                  nftConfig.price.amount,
                  "required"
                )}
              </Modal.Body>
              {nftDetail.sellingMethod === 1 && (
                <Modal.Body
                  className=""
                  style={{
                    flexDirection: "column",
                    display: "block",
                    height: "200px",
                  }}
                >
                  <div className="offer-expiration-wrapper text-white">
                    <b>Offer Expiration</b>
                  </div>
                  <div>
                    <div className="d-flex">
                      <select
                        className="form-control"
                        id="expiryDate"
                        name="nftConfig.expiry.date"
                        onChange={(e) => onChangeModal(e)}
                        style={{
                          padding: "7px 55px 7px 55px",
                          border: "none",
                          outline: "none",
                          borderRadius: "4px",
                          background: "#808080",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          height: "51px",
                          color: "#000",
                        }}
                      >
                        {expiryOptions &&
                          expiryOptions.map((expiry, index) => {
                            return (
                              <option key={index} value={expiry.value}>
                                {expiry.label}
                              </option>
                            );
                          })}
                      </select>
                      <div>
                        <div className="mr-auto budle-wrapper">
                          <input
                            type={
                              nftConfig.expiry.type === 1
                                ? "time"
                                : "datetime-local"
                            }
                            style={{ marginLeft: "1rem", width: "552px" }}
                            name="nftConfig.expiry.time"
                            value={nftConfig.expiry.time}
                            onChange={(e) => onChangeModal(e)}
                            required
                          />
                        </div>
                        <span className="text-danger message">
                          {validator.message(
                            "amount",
                            nftConfig.price.amount,
                            "required"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              )}
              <Modal.Body className="justify-content-center align-items-center">
                <div className="d-flex justify-content-around place-bid-btn">
                  <button
                    className={`ethereum-btn  place-bid-ethereum-btn ${
                      price <= nftDetail.highestBid
                        ? "place-btn-disable-btn"
                        : "place-bid-gradient-btn"
                    }`}
                    disabled={loader || price < calculatePricePercantage()}
                    onClick={() => handleModalSubmit()}
                  >
                    {2 === 2 ? initData.bidBtn : initData.bidBtn}
                  </button>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn banner-btn btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <BuyModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            name={nftDetail.name}
            price={nftDetail.currentPrice}
            image={nftDetail.image}
            exchangeRate={exchangeRate}
            tokenId={nftDetail.nftToken}
            modal={modal}
            setModal={setModal}
            BuyNow={BuyNow}
            confirmed={confirmed}
            transactionHash={transactionHash}
            transactionSuccess={transactionSuccess}
          />
        </section>
        <Footer />
      </>
    </>
  );
};

const mapStateToProps = (state) => (
console.log(state,"state"),
  {
    nftDetail: state.nft.nftsData,
    nftsAuth: state.nft.nftsAuth,
    nftsByCollection: state.nft.nftsByCollection,
    nftsByCollectionStatus: state.nft.nftsByCollectionStatus,
    myLikedNfts: state.nft.myLikedNfts,
    myLikedNftsStatus: state.nft.myLikedNftsStatus,
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
  }
);

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
})(NFTDetail);
