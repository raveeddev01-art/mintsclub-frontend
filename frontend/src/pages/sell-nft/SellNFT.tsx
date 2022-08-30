import React, { useState, useEffect } from "react";
import "./SellNFT.scss";
import { ENV } from "../../config/config";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { decimalNumberValidator } from "../../utils/functions";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  beforeNFT,
  getNFT,
  upsertNFT,
  createActivity,
} from "../../Components/Nfts/nfts.action";
import {
  openNFTForBidding,
  putonsale,
  getWalletAddress,
  setApprovalForAll,
  validateNetwork,
} from "../../utils/web3";
import { toast } from "react-toastify";
import FullPageLoader from "../../Components/FullPageLoader/FullPageLoader";

import useVideoPlayer from "../../Components/TestVideoCard/Components/UseVideoPlayer";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { updateProfile } from "../../Components/User/user.action";
import ApprovalModal from "../../Components/Modals/ApprovalModal/ApprovalModal";
import { emptyError } from "../../redux/shared/error/error.action";
import Banner from "../../Components/Banner/Banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg.png";
import OwnCollectionToday from "../../Components/OwnCollectionToday/OwnCollectionToday";
import SellNFTLoader from "../../Components/ContentLoader/SellNFTLoader";
import Audio from "../../Components/Audio/Audio";
import { useHistory } from "react-router";
import { sellNFTBanner } from "../../utils/exportData";
import { useGetNFTbyId  } from "../../hooks/AllNFTs";
import { useInsertData,useEditData } from "../../hooks/Common";

const { dateRangeInitialSettings } = ENV;
const SellNFT = (props: any) => {
  const [activeBtn, setActiveBtn] = useState<any>(0);
  const [toggle, setToggle] = React.useState<boolean>(true);
  const [sellingMethod, setSellingMethod] = useState<number>(1); // 1 = Fixed Price, 2 = Timed Auction
  const [fixedPriceConfig, setFixedPriceConfig] = useState<any>({
    price: {
      currency: ENV.currency,
      amount: "",
    },
    reserveFor: "", // if user selects reserve buyer
  });
  const [timedAuctionConfig, setTimedAuctionConfig] = useState<any>({
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
  });
  const [nftDetail, setNftDetail] = useState<any>("");
  const [loader, setLoader] = useState<boolean>(true); // NFT loader
  const location: any = useLocation();
  const [likedNfts, setLikedNfts] = useState<number>();
  const [copies, setCopies] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [approvalStatus, setApprovalStatus] = useState<string>("not-approved");
  const [address, setAddress] = useState<string>(props.connectedAddress);
  const [copiesError, setCopiesError] = useState<boolean>(false);
  const [contentLoader, setContentLoader] = useState<boolean>(true);
  const history = useHistory();
  let nftId = props.match.params.id;

  const videoElement = React.useRef(null);
  const { playerState, togglePlay } = useVideoPlayer(videoElement);

  const onSuccessNFT = (data: any) => {
    setNftDetail(data?.data?.data);
  };
  const { isLoading: isLoadingNFT } = useGetNFTbyId(nftId, onSuccessNFT);
  const onEditNFT = () => {
    setLoader(false);
    setFixedPriceConfig(null);
    setTimedAuctionConfig(null);
    setCopies("");
    props.history.push("/");
  };
  const { isLoading, mutate: editNFT } = useEditData(onEditNFT);
  const onInsertData = () => {};
  const {} = useInsertData(
    "activity/create",
    onInsertData
  );

  useEffect(() => {
    if (address === "") {
      setAddress(props.connectedAddress);
    }
    if (
      props.connectedAddress !== "" &&
      address !== "" &&
      ENV.getUserKeys("address")?.address?.toUpperCase() !==
        props.connectedAddress.toUpperCase()
    ) {
      toast.info("Please login with new connected account");
      return  history.push({
        pathname: `/connect-wallet`,
        state: `/sellnft`,
      });
    }
  }, [props.connectedAddress]);

  useEffect(() => {
    if (props.error !== null) {
      toast.error(props.error.message);
      setLoader(false);
      props.emptyError();
    }
  }, [props.error]);

  // when NFT data is updated
  useEffect(() => {
    if (props.nft.upsertAuth) {
      const pathname = "/";
      setLoader(false);
      props.beforeNFT();
      setFixedPriceConfig(null);
      setTimedAuctionConfig(null);
      setCopies("");
      props.history.push(pathname);
    }
  }, [props.nft.upsertAuth]);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    let data = null;

    if (sellingMethod === 1) {
      data = fixedPriceConfig;
    } else {
      data = timedAuctionConfig;
    }

    const keys = name.split(".");

    if (keys && keys[2]) {
      data[keys[1]][keys[2]] = value;
    } else if (keys && keys[1]) data[keys[1]] = value;

    if (sellingMethod === 1) {
      setFixedPriceConfig({ ...data });
    } else {
      setTimedAuctionConfig({ ...data });
    }
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (copies > nftDetail.copies) {
      if (Number(nftDetail.copies) === 1) {
        toast.info(`Copies should be equal to ${nftDetail.copies}`);
      } else {
        toast.info(
          `Copies should be less than or equal to ${nftDetail.copies}`
        );
      }
      return "";
    }
    if (await validateNetwork()) {
      if (!nftDetail.user.isApproved) {
        setShow(true);
        return "";
      }

      let price: any = "";
      let payload: object = {};

      let timedConfig = { ...timedAuctionConfig };

      let fixedConfig = { ...fixedPriceConfig };
      const { _id, ownerId } = nftDetail;

      let activityPayload = {
        nftId: _id,
        ownerId,
        fromAddress: await getWalletAddress(),
        activityType: "List",
      };

      if (sellingMethod === 2) {
        if (Number(timedConfig.startPrice.amount) === 0) {
          toast.error("Price should be greater then 0");
          return "";
        }
        let timedAuctionStartTime = new Date(timedConfig.duration.startDate);
        let timedAuctionEndTime = new Date(timedConfig.duration.endDate);
        //calculate end time
        timedConfig.duration.endDate = calclateStartOrEndTime(
          timedAuctionEndTime,
          timedConfig.duration.endTime
        );

        //calculate start time
        timedConfig.duration.startDate = calclateStartOrEndTime(
          timedAuctionStartTime,
          timedConfig.duration.startTime
        );

        //Deleting unused data from payload
        let auctionConfig = timedConfig;
        delete auctionConfig.duration.startTime;
        delete auctionConfig.duration.endTime;
        delete auctionConfig.method;
        price = Number(auctionConfig.startPrice.amount);
        auctionConfig.startPrice.amount = Number(
          auctionConfig.startPrice.amount
        );
        payload = {
          _id: location.state._id,
          sellingMethod,
          sellingConfig: JSON.stringify(auctionConfig),
          copiesForAuction: copies,
        };
      } else {
        price = Number(fixedConfig.price.amount);
        if (price === 0) {
          toast.error("Price should be greater then 0");
          return "";
        }
        payload = {
          _id: location.state._id,
          sellingMethod,
          sellingConfig: JSON.stringify(fixedConfig),
          copiesForAuction: copies,
        };
      }

      setLoader(true);

      if (sellingMethod === 2) {
        openBidding(timedAuctionConfig, payload, activityPayload, price);
      } else {
        openForSale(activityPayload, payload, fixedConfig, price);
      }
    } else {
      toast.error("Please Connect Your Metamask With Ethereum Rinkby Network");
    }
  };

  const openBidding = async (
    timedAuctionConfig: any,
    payload: any,
    activityPayload: any,
    price: any
  ) => {
    var formData = new FormData();
    try {
      let auctionEndDate = timedAuctionConfig.duration.endDate;
      let auctionStartDate = timedAuctionConfig.duration.startDate;

      const biddingTime = new Date(auctionEndDate).getTime();
      const startTime = new Date(auctionStartDate).getTime();

      let result = await openNFTForBidding(
        biddingTime,
        startTime,
        location.state.nftToken,
        copies
      );
      if (result) {
        activityPayload.price = price;
        payload.sellId = Number(result);
        for (const key in payload) formData.append(key, payload[key]);
        props.createActivity(activityPayload);
        editNFT(formData);
        // props.upsertNFT("edit", formData, "PUT");
      }
    } catch (err: any) {
      setLoader(false);
      toast.error(err);
    }
  };

  const openForSale = async (
    activityPayload: any,
    payload: any,
    fixedConfig: any,
    price: any
  ) => {
    var formData = new FormData();
    try {
      let result = await putonsale(
        nftDetail.nftToken,
        copies,
        fixedConfig.price.amount
      );
      if (result) {
        activityPayload.price = price;
        payload.sellId = Number(result);
        for (const key in payload) formData.append(key, payload[key]);
        props.createActivity(activityPayload);
        editNFT(formData);
        // props.upsertNFT("edit", formData, "PUT");
      }
    } catch (err: any) {
      setLoader(false);
      toast.error(err);
    }
  };

  const calclateStartOrEndTime = (auctionConfig: any, startOrEndTime: any) => {
    let time = auctionConfig.toString();
    time = time.slice(0, 15) + " " + startOrEndTime + ":00" + time.slice(24);
    return time;
  };
  //match if nft liked

  const approveAccount = async () => {
    setApprovalStatus("pending");
    var formData: any = new FormData();
    formData.append("isApproved", true);
    formData.append("userId", nftDetail.user._id);
    try {
      let accApproved = await setApprovalForAll(setApprovalStatus);
      if (accApproved) {
        let updatedNFTDetail = { ...nftDetail };
        updatedNFTDetail.user.isApproved = true;
        setNftDetail(updatedNFTDetail);
        props.updateProfile(formData);
        setApprovalStatus("approved");
        toast.success("Your Account is Approved!.");
        return "";
      }
    } catch (err) {
      setApprovalStatus("not-approved");
      return "";
    }
  };

  const { image, name, description, remainingCopies, fileType } = nftDetail;
  return (
    <>
      <Banner
        subHeading={sellNFTBanner.subHeading}
        heading={sellNFTBanner.heading}
        content={sellNFTBanner.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      {isLoadingNFT && <FullPageLoader />}
      <section className="padding-wrapper sell-nft new-nft-detail ">
        <div className="container">
          <div className="row g-4 g-xl-5">
            <div className="col-12">
              <div className="row g-4">
                <div className=" col-lg-6 col-xl-5">
                  {fileType === "image" ? (
                    <div className="nft-img-container mx-auto mx-lg-0">
                      <div
                        style={{
                          display: `${contentLoader ? "block" : "none"}`,
                        }}
                      >
                        <SellNFTLoader />
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
                    <div className="card-img-top">
                      <div className="nft-img-container nft-video-container mx-auto mx-lg-0">
                        <div
                          style={{
                            display: `${contentLoader ? "block" : "none"}`,
                          }}
                        >
                          <SellNFTLoader />
                        </div>
                        <video
                          src={image}
                          ref={videoElement}
                          // onTimeUpdate={handleOnTimeUpdate}
                          onEnded={() => {
                            togglePlay();
                          }}
                          onCanPlay={() => {
                            setContentLoader(false);
                          }}
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
                    </div>
                  ) : fileType === "audio" ? (
                    <>
                      <div
                        style={{
                          display: `${contentLoader ? "block" : "none"}`,
                        }}
                      >
                        <SellNFTLoader />
                      </div>
                      <Audio
                        src={image}
                        onLoadCallback={async () => setContentLoader(false)}
                        loader={contentLoader}
                        fileType={""}
                      />
                    </>
                  ) : (
                    " "
                  )}
                </div>
                <div className="col-lg-6 col-xl-7">
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
                      <div className="col-6 col-sm-4 col-lg-6 col-xl-4">
                        <div className="nft-detail-rounded-box mb-0">
                          <p>
                            Total Copies: <span>{nftDetail?.copies}</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-6 col-sm-4 col-lg-6 col-xl-4 ">
                        <div className="nft-detail-rounded-box mb-0">
                          <p>
                            Sold:{" "}
                            <span>{nftDetail?.copies - remainingCopies}</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-6 col-sm-4 col-lg-6 col-xl-4">
                        <div className="nft-detail-rounded-box mb-0">
                          <p>
                            Remaining: <span>{remainingCopies}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="detail-bg-box nft-img-detail">
                      <h5>Descriptions:</h5>
                      <hr />
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="sale-btn-container mt-5">
                <button
                  className={` ${
                    activeBtn === 0 ? "sell-btn-active" : "sell-btn-not-active"
                  }  me-3 `}
                  onClick={() => {
                    setActiveBtn(0);
                    setSellingMethod(1);
                    setCopies("");
                    setCopiesError(false);
                  }}
                >
                  Fixed Prize
                </button>
                <button
                  className={` ${
                    activeBtn === 1 ? "sell-btn-active" : "sell-btn-not-active"
                  } `}
                  onClick={() => {
                    setActiveBtn(1);
                    setSellingMethod(2);
                    setCopies("");
                    setCopiesError(false);
                  }}
                >
                  Timed Auction
                </button>
              </div>
            </div>
            {activeBtn === 0 ? (
              <form onSubmit={submit}>
                <div className="row g-4 g-xl-5">
                  <div className="col-md-6">
                    <div className="sell-detail-box">
                      <h5>Price:*</h5>
                      <hr />
                      <div className="sell-inp-container d-flex align-items-center">
                        <input
                          type="text"
                          name="fixedPriceConfig.price.amount"
                          placeholder="Amount"
                          style={{
                            borderRadius: "4px",
                          }}
                          maxLength={8}
                          onChange={(e) => {
                            if (e.target.value == "00") {
                              return "";
                            }
                            onChange(e);
                          }}
                          onKeyDown={(e) => decimalNumberValidator(e)}
                          value={fixedPriceConfig.price.amount}
                          required
                          autoComplete="off"
                        />
                        <div className="inp-tag">ETH</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sell-detail-box">
                      <h5>
                        No of Copies:*{" "}
                        {copiesError && (
                          <span className="text-danger ms-2 error-msg">{`This NFT has only ${remainingCopies} copies`}</span>
                        )}
                      </h5>
                      <hr />
                      <div className="sell-inp-container d-flex align-items-center">
                        <input
                          type="number"
                          name="copies"
                          placeholder="Copies"
                          style={{
                            borderRadius: "4px",
                          }}
                          min={"1"}
                          onChange={(e: any) => {
                            if (+e.target.value > remainingCopies) {
                              setCopiesError(true);
                              return false;
                            }
                            if (
                              (e.target.value == 0 && copies === "") ||
                              e.target.value.includes(".")
                            ) {
                              return false;
                            }
                            setCopiesError(false);
                            setCopies(e.target.value);
                          }}
                          onKeyDown={(e) => decimalNumberValidator(e)}
                          value={copies}
                          required
                          autoComplete="off"
                        />
                        <div className="inp-tag">Copies</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sell-detail-box">
                      <h5>Fees:</h5>
                      <hr />
                      <div className="fee-details d-flex align-items-center justify-content-between">
                        <div>
                          <p>
                            Service Fees:
                            <span className="ms-2">2.5%</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            Creator Royalty:
                            <span className="ms-2">2.5%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sell-btn-container d-flex justify-content-center justify-content-lg-start">
                    <button
                      className="btn btn-linear-gradient sell-btn-completed"
                      type="submit"
                    >
                      Complete Listing
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={submit}>
                <div className="row g-4 g-xl-5">
                  <div className="col-md-6">
                    <div className="sell-detail-box">
                      <h5>Price:*</h5>
                      <hr />
                      <div className="sell-inp-container d-flex align-items-center">
                        <input
                          type="text"
                          name="timedAuctionConfig.startPrice.amount"
                          placeholder="Amount"
                          maxLength={8}
                          style={{
                            borderRadius: "4px",
                          }}
                          onChange={(e: any) => {
                            if (e.target.value === "00") {
                              return false;
                            } else {
                              onChange(e);
                            }
                          }}
                          onKeyDown={(e) => decimalNumberValidator(e)}
                          value={timedAuctionConfig.startPrice.amount}
                          required
                          autoComplete="off"
                        />
                        <div className="inp-tag">ETH</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sell-detail-box">
                      <h5>
                        No of Copies:*{" "}
                        {copiesError && (
                          <span className="text-danger ms-2 error-msg">{`This NFT has only ${remainingCopies} copies`}</span>
                        )}
                      </h5>
                      <hr />
                      <div className="sell-inp-container d-flex align-items-center">
                        <input
                          type="number"
                          name="copies"
                          placeholder="Copies"
                          maxLength={3}
                          style={{
                            borderRadius: "4px",
                          }}
                          min={"1"}
                          max={`${nftDetail.copies}`}
                          onChange={(e: any) => {
                            if (+e.target.value > remainingCopies) {
                              setCopiesError(true);
                              return false;
                            }
                            if (
                              (e.target.value == 0 && copies === "") ||
                              e.target.value.includes(".")
                            ) {
                              return false;
                            }
                            setCopiesError(false);

                            setCopies(e.target.value);
                          }}
                          onKeyDown={(e) => decimalNumberValidator(e)}
                          value={copies}
                          required
                          autoComplete="off"
                        />
                        <div className="inp-tag">Copies</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sell-detail-box">
                      <h5>Duration:</h5>
                      <hr />
                      {/* <div className="sell-date-picker">
                    
                      </div> */}

                      <div className="sell-time-inp mx-auto my-3">
                        <input
                          type="time"
                          name="timedAuctionConfig.duration.startTime"
                          placeholder="Start Time"
                          className="py-1"
                          onChange={(e) => onChange(e)}
                          defaultValue={timedAuctionConfig.duration.startTime}
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
                          defaultValue={timedAuctionConfig.duration.endTime}
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="sell-detail-box">
                      <h5>Fees:</h5>
                      <hr />
                      <div className="fee-details d-flex align-items-center justify-content-between">
                        <div>
                          <p>
                            Service Fees:
                            <span className="ms-2">2.5%</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            Creator Royalty:
                            <span className="ms-2">2.5%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sell-btn-container d-flex justify-content-center justify-content-lg-start">
                    <button
                      className="btn btn-linear-gradient sell-btn-completed"
                      type="submit"
                    >
                      Complete Listing
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        <ApprovalModal
          show={show}
          approveAccount={approveAccount}
          approvalStatus={approvalStatus}
          onHide={async () => setShow(false)}
          address={address}
        />
      </section>
      <OwnCollectionToday />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  nft: state.nft,
  error: state.error,
  nftDetail: state.nft.nftsData,
  nftsAuth: state.nft.nftsAuth,
  connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {
  beforeNFT,
  getNFT,
  upsertNFT,
  createActivity,
  updateProfile,
  emptyError,
})(SellNFT);
