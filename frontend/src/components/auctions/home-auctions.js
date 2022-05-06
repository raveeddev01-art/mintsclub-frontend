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

import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
} from "swiper/core";
import "swiper/swiper-bundle.css";
import "./auction.css";

import { getCreators } from "./../user/user.action";
import ViewAllIcon from "../../assets/images/view-all-arrow.svg";
//CardSliders
import CardSlider from "../card-slider/CardSlider";
import AuctionsCards from "../auctions-cards/AuctionsCards";
import {
  beforeCategory,
  getCategories,
} from "../collections/collections.actions";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

const initData = {
  pre_heading: "Auctions",
  heading: "Live Auctions",
  btnText: "View All",
};

function AuctionsOne(props) {
  const [auctions, setAuctions] = useState(null);
  const [loader, setLoader] = useState(false); // auctions loader
  // const [creators, setCreator] = useState([]);
  const [categories, setCategories] = useState(null);
  const [categoryId, setCategoryId] = useState("all");
  const [auctionSettings, setAuctionSettings] = useState();
  const [isActive, setIsActive] = useState(0);
  useEffect(() => {
    window.scroll(0, 0);
    // get live auctions
    const qs = ENV.objectToQueryString({
      myFilter: "all",
    });
    props.getLiveAuctions(qs);
    props.getCreators();
  }, []);

  // useEffect(() => {
  //   if (props.user.topSellersAuth) {
  //     setCreator(props.user.sellers);
  //     setLoader(false);
  //   }
  // }, [props.user.topSellersAuth]);

  // set live auctions
  useEffect(() => {
    if (props.auction.auctionsAuth) {
      const { auctions, pagination } = props.auction;
      if (auctions) {
        auctions.forEach((element, i) => {
          auctions[i].totalBids = element.bidInfo?.bidBy?.length;
        });
      }

      setAuctions(auctions);
      let auctionCollectionsSettings = ENV.auctionCollectionsSettings;
      if (auctions.length > 4) {
        auctionCollectionsSettings.infinite = true;
      } else {
        auctionCollectionsSettings.infinite = false;
      }
      setAuctionSettings(auctionCollectionsSettings);
      props.beforeAuction();
    }
  }, [props.auction.auctionsAuth]);

  // ready slides when auctions data is received
  useEffect(() => {
    if (auctions && auctions.length) {
      $(".swiper-wrapper").slick(ENV.slickSettings);
    }
  }, [auctions]);

  useEffect(() => {
    props.getCategories();
  }, []);
  useEffect(() => {
    if (props.collectionFlag) {
      setCategories(props.categories);
    }
  }, [props.collectionFlag]);

  const handleCategoryFilter = (desc) => {
    setCategoryId(desc);
    const qs = ENV.objectToQueryString({ myFilter: desc });
    props.getLiveAuctions(qs);
  };
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
              </div>
            </div>
            <div className="col-12 col-lg-7 col-xl-8 mt-3 mt-lg-0">
              {categoryId === "all" && auctions && auctions?.length == 0 ? (
                ""
              ) : (
                <div className="popular-collections-content-right mt-lg-4 d-flex justify-content-end align-content-xxl-start text-end">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item, id) => {
                      if (id <= 3) {
                        return (
                          <button
                            key={id}
                            className={`${
                              id === isActive ? "home-active-category" : ""
                            } me-1 me-sm-2`}
                            onClick={() => {
                              setIsActive(id);
                              handleCategoryFilter(item.description);
                            }}
                          >
                            {item.name}
                          </button>
                        );
                      }
                    })}
                  <div className="intro-btn">
                    <Link
                      className="btn btn-rounded-bordered btn-viewAll"
                      to="/auctions"
                    >
                      View All
                      <img
                        src={ViewAllIcon}
                        alt="arrow-left"
                        className="ms-2 d-none d-sm-block"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="auctions-slides">
            <div className="">
              {auctions && auctions.length > 0 ? (
                <CardSlider
                  settings={auctionSettings}
                  data={auctions}
                  homeAuction
                >
                  {auctions.map((item, index) => {
                    return (
                      <AuctionsCards
                        key={index}
                        item={item}
                        ownerName={item.owner.username}
                        userId={ENV.getUserKeys("_id")._id}
                        ownerId={item.owner._id}
                        bidsProfile={item.bidInfo.bidByProfile}
                      />
                    );
                  })}
                </CardSlider>
              ) : (
                <p className="text-white text-center">No Live Auctions Found</p>
              )}
            </div>
          </div>
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
