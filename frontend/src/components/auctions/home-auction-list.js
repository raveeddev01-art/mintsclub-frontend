import React, { useState, useEffect } from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import DemoImg from "../../assets/images/cl-cr-mainimg.png";
import AuctionsCards from "../auctions-cards/AuctionsCards";
import Breadcrumb from "../breadcrumb/breadcrumb";

import { connect } from "react-redux";
import { beforeAuction, getLiveAuctions } from "./auctions.action";
import { getCreators } from "./../user/user.action";
import {
  beforeCategory,
  getCategories,
} from "../collections/collections.actions";
import { ENV } from "../../config/config";
import FullPageLoader from "../full-page-loader/full-page-loader";

const AuctionsList = (props) => {
  const [isActive, setIsActive] = useState(0);
  const [auctions, setAuctions] = useState(null);
  const [loader, setLoader] = useState(false); // auctions loader
  const [creators, setCreator] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("all");
  const [auctionSettings, setAuctionSettings] = useState();
  useEffect(() => {
    window.scroll(0, 0);
    // get live auctions
    const qs = ENV.objectToQueryString({
      myFilter: "all",
    });
    props.getLiveAuctions(qs);
    props.getCreators();
  }, []);

  // set live auctions
  useEffect(() => {
    if (props.auction.auctionsAuth) {
      const { auctions, pagination } = props.auction;
      setAuctions(auctions);
      props.beforeAuction();
    }
  }, [props.auction.auctionsAuth]);
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
  const menuData = [
    "All",
    "Art",
    "Collectibles",
    " Gaming",
    "Memes",
    "Music",
    "Others",
    "Photography",
    "Punks",
    "Sports",
    "Trading Cards",
  ];
  return (
    <>
      <NavbarMain />
      <Breadcrumb title1={"Auctions"} title2={"LiveAuctions"} />
      <section className="explore-collection-section padding-wrapper">
        {loader ? (
          <FullPageLoader />
        ) : (
          <div className="container">
            <div className="row mb-5">
              <div className="col-12">
                <div className="intro">
                  <div className="intro-content">
                    <span>Auctions</span>
                    <h3 className="mb-0">Live Auctions</h3>
                  </div>
                </div>
              </div>
              <div className="col-12 explore-collection-nav">
                <div className="d-none d-xxl-flex justify-content-lg-end text-end align-items-center">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item, id) => {
                      return (
                        <button
                          onClick={() => {
                            setIsActive(id);
                            handleCategoryFilter(item.description);
                          }}
                          className={`${
                            id === isActive ? "active-explore-nav" : ""
                          } me-2 me-xl-3`}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                </div>
                <div className="row justify-content-center justify-content-sm-start align-items-center text-center d-xxl-none">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item, id) => {
                      return (
                        <div className="col-6 col-sm-3">
                          <button
                            onClick={() => {
                              setIsActive(id);
                              handleCategoryFilter(item.description);
                            }}
                            className={`${
                              id === isActive ? "active-explore-nav" : ""
                            } me-2 me-xl-3`}
                          >
                            {item.name}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="row g-4 align-items-center justify-content-center">
              {auctions && auctions.length > 0 ? (
                auctions.map((item) => {
                  return (
                    <div className="col-11 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                      <AuctionsCards
                        endDate={item.auctionEndDate}
                        image={item.image}
                        ownerName={item.owner.username}
                        name={item.name}
                        id={item._id}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-white text-center">No Live Auctions Found</p>
              )}
              {console.log(auctions, "auctionsssss")}

              <div className="col-12">
                <div className="mt-5 text-center">
                  <button className="btn btn-linear-gradient px-5">
                    Load more
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

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
})(AuctionsList);
