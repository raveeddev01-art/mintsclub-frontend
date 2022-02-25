import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { beforeAuction, getLiveAuctions } from "./auctions.action";
import FullPageLoader from "../full-page-loader/full-page-loader";
import { ENV } from "../../config/config";
import "slick-carousel";
import "../../assets/slick/slick.min.css";
import "../../assets/slick/slick-theme.min.css";
import $ from "jquery";
import moment from "moment";
import Countdown from "react-countdown";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
} from "swiper/core";
import "swiper/swiper-bundle.css";
import "./auction.css";
import { useTimer } from "react-timer-hook";
import { getCreators, beforeUser } from "./../user/user.action";
import image from "../../assets/images/placeholder.png";
import DemoImg from "../../assets/images/cl-cr-mainimg.png";
import ViewAllIcon from "../../assets/images/view-all-arrow.svg";
//CardSliders
import CardSlider from "../card-slider/CardSlider";
import AuctionsCards from "../auctions-cards/AuctionsCards";
import {
  beforeCategory,
  getCategories,
} from "../collections/collections.actions";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);
// Swiper.use([Navigation, Pagination]);
const { globalPlaceholderImage, countDownRenderer } = ENV;
const initData = {
  pre_heading: "Auctions",
  heading: "Live Auctions",
  btnText: "View All",
};
function AuctionsOne(props) {
  const [auctions, setAuctions] = useState(null);
  const [loader, setLoader] = useState(false); // auctions loader
  const [creators, setCreator] = useState([]);
  const [categories, setCategories] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
    // get live auctions
    const qs = ENV.objectToQueryString({
      myFilter: "all",
    });
    props.getLiveAuctions(qs);
    props.getCreators();
  }, []);
  useEffect(() => {
    // console.log('auth', props.user.topSellersAuth)
    if (props.user.topSellersAuth) {
      setCreator(props.user.sellers);
      setLoader(false);
    }
  }, [props.user.topSellersAuth]);
  // set live auctions
  useEffect(() => {
    if (props.auction.auctionsAuth) {
      const { auctions, pagination } = props.auction;

      setAuctions(auctions);
      props.beforeAuction();
    }
  }, [props.auction.auctionsAuth]);
  // ready slides when auctions data is received
  useEffect(() => {
    if (auctions && auctions.length) {
      $(".swiper-wrapper").slick(ENV.slickSettings);
    }
  }, [auctions]);
  const filterCreator = (nft, field) => {
    // console.log('creators', creators)
    // console.log('nft owner', nft)
    const result = creators.find((item) => item._id === nft.nftOwnerId);
    // console.log('reuslt',result
    if (result) {
      if (field === "userName") {
        if (result?.username) {
          return result?.username;
        } else {
          return "no username found";
        }
      } else if (field == "profileImage") {
        if (result.profileImage) {
          return result?.profileImage;
        } else {
          return image;
        }
      }
    }
  };

  useEffect(() => {
    props.getCategories();
  }, []);
  useEffect(() => {
    if (props.collectionFlag) {
      setCategories(props.categories);
    }
  }, [props.collectionFlag]);

  const auctionDemoData = [
    {
      _id: 1,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 2,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 3,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 4,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 5,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 6,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 7,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 8,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
  ];
  const handleCategoryFilter = (desc) => {
    setCategoryId(desc);
    const qs = ENV.objectToQueryString({ myFilter: desc });
    props.getLiveAuctions(qs);
  };

  console.log(auctions, "auctions");

  return (
    <section className="live-auctions-area padding-wrapper">
      {loader ? (
        <FullPageLoader />
      ) : (
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <span>{initData.pre_heading}</span>
                  <h3 className="mb-0">{initData.heading}</h3>
                  <p>
                    Explore on the world's best & largest NFT marketplace with
                    our beautiful NFT products. We want to be a part of your
                    smile, success and future growth.
                  </p>
                </div>
                {/* {auctions && auctions.length > 0 && (
                  <div className="intro-btn">
                    <Link className="btn content-btn" to="/auctions">
                      {initData.btnText}
                    </Link>
                  </div>
                )} */}
              </div>
            </div>
            <div className="col-12 col-lg-7 col-xl-8 mt-3 mt-lg-0">
              <div className="popular-collections-content-right mt-lg-4 d-flex justify-content-center justify-content-sm-end align-content-xxl-start text-end">
                {categories &&
                  categories.length > 0 &&
                  categories.map((item) => {
                    return (
                      <button
                        className="me-1 me-sm-2"
                        onClick={() => handleCategoryFilter(item.description)}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                {/* <button className="me-1 me-sm-2">Music</button>
                <button className="me-1 me-sm-2">Game</button>
                <button className="me-1 me-sm-5">Sport</button> */}
                <div className="intro-btn">
                  {auctions && auctions?.length > 4 && (
                    <Link
                      className="btn btn-rounded-bordered btn-viewAll"
                      to="/authors"
                    >
                      View All
                      <img
                        src={ViewAllIcon}
                        alt="arrow-left"
                        className="ms-2"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* //replace arraySample to auctions */}
          {auctionDemoData && auctionDemoData.length > 0 ? (
            <div className="auctions-slides">
              <div className="">
                {/* <div className="swiper-wrapper row"> */}
                {/* <Swiper
                  id="swiper"
                  modules={[Navigation, Pagination, Autoplay, Virtual]}
                  virtual
                  spaceBetween={50}
                  slidesPerView={3}
                  onSlideChange={() => console.log("")}
                  onSwiper={(swiper) => console.log(swiper)}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                >
                  {auctionDemoData.map((item, idx) => {
                    return (
                      <>
                        <SwiperSlide>
                          <div
                            key={`auc_${idx}`}
                            className="swiper-slide item"
                            id={`#auc-${idx}`}
                          >
                            <div className="card m-3 ">
                              <div className="image-over">
                                <Link
                                  to={`/item-details?item=${window.btoa(
                                    item._id
                                  )}`}
                                >
                                  <img
                                    className="card-img-top"
                                    src={item.image}
                                    alt="NFT image"
                                    width="600"
                                    height="600"
                                    style={{ borderRadius: "none" }}
                                  />
                                </Link>
                              </div>
                              <div className="card-caption col-12 p-0">
                                <div className="card-body">
                                  <div className="mb-3">
                                    <Countdown
                                      date={
                                        new Date(item.auctionEndDate) + 10000
                                      }
                                      renderer={countDownRenderer}
                                    />
                                  </div>
                                  <Link
                                    to={`/item-details?item=${window.btoa(
                                      item._id
                                    )}`}
                                  >
                                    <h5 className="mb-0">{item.name}</h5>
                                  </Link>
                                  <Link
                                    className="seller d-flex align-items-center my-3"
                                    to={`/author`}
                                  >
                                    <img
                                      className="avatar-sm rounded-circle"
                                      // src={"https://gateway.ipfs.io/ipfs/QmR8ye93PSLCQXppDUwtBChXNXavCj1HbFCs2DDac5KRnQ"}
                                      src={filterCreator(item, "profileImage")}
                                      alt="User Avatar"
                                    />
                                    <span className="ml-2">
                                      {filterCreator(item, "userName")}
                                    </span>
                                  </Link>
                                  <div className="card-bottom d-flex justify-content-between">
                                    <span>
                                      {item.currentPrice} {ENV.currency}
                                    </span>
                                    <span>
                                      {item.sold} of {item.copies}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>

                      </>
                    );
                  })}
                </Swiper> */}
                <CardSlider
                  settings={ENV.auctionCollectionsSettings}
                  data={auctions}
                  homeAuction
                >
                  {auctions && auctions.length > 0 ? (
                    auctions.map((item) => {
                      return (
                        <AuctionsCards
                          endDate={item.auctionEndDate}
                          image={item.image}
                          ownerName={item.owner.username}
                          name={item.name}
                          id={item._id}
                        />
                      );
                    })
                  ) : (
                    <p className="text-white text-center">
                      No Live Auctions Found
                    </p>
                  )}
                </CardSlider>
              </div>
            </div>
          ) : (
            <p className="text-center ml-3">No Live Auctions Found</p>
          )}
        </div>
      )}
    </section>
  );
}
const mapStateToProps = (state) => ({
  auction: state.auction,
  user: state.user,
  collectionFlag: state.collection.collectionFlag,
  categories: state.collection.categories,
});
export default connect(mapStateToProps, {
  beforeAuction,
  getLiveAuctions,
  getCreators,
  getCategories,
  beforeCategory,
})(AuctionsOne);
