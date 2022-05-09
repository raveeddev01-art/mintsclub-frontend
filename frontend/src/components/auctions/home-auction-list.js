import React, { useState, useEffect } from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
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


const AuctionsList = (props) => {
  const [isActive, setIsActive] = useState(0);
  const [auctions, setAuctions] = useState(null);
  const [loader, setLoader] = useState(true); // auctions loader
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("all");

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
      const { auctions } = props.auction;

      setAuctions(auctions);
      setLoader(false)
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
    setLoader(true)
    setCategoryId(desc);
    const qs = ENV.objectToQueryString({ myFilter: desc });
    props.getLiveAuctions(qs);
  };
  return (
    <>
      <NavbarMain />
      <Breadcrumb title1={"Auctions"} title2={"LiveAuctions"} />
      <section className="explore-collection-section padding-wrapper">
        {
        // loader ? (
        //   <FullPageLoader />
        // ) : (
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
              {loader ? (
                <div class="spinner-border text-white" role="status"></div>
              ) : auctions && auctions.length > 0 ? (
                auctions.map((item, index) => {
                  return (
                    <div className="col-11 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                      <AuctionsCards
                        key={index}
                        item={item}
                        ownerName={item.owner.username}
                        userId={ENV.getUserKeys("_id")._id}
                        ownerId={item.owner._id}
                        bidsProfile={item.bidInfo.bidByProfile}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-white text-center mt-5">No Live Auctions Found</p>
              )}

              <div className="col-12">
                <div className="mt-5 text-center">
                  {auctions &&
                    props.auction.pagination.total > auctions.length &&
                    auctions.length > 10 && (
                      <button className="btn btn-linear-gradient px-5">
                        Load more
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        }
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
