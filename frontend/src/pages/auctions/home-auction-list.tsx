import { useState, useEffect, FC } from "react";
import AuctionsCards from "../../Components/AuctionsCards/AuctionsCards";
import { connect } from "react-redux";
import { beforeAuction, getLiveAuctions } from "./auctions.action";
import { getCreators } from "../../Components/User/user.action";
import {
  beforeCategory,
  getCategories,
} from "../collections/collections.actions";
import { ENV } from "../../config/config";
import Banner from "../../Components/Banner/Banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg.png";
import OwnCollectionToday from "../../Components/OwnCollectionToday/OwnCollectionToday";
import { AuctionsListInt } from "../../interfaces/auctions-list/interface";

const AuctionsList: FC<AuctionsListInt> = (props) => {
  const [isActive, setIsActive] = useState(0);
  const [auctions, setAuctions] = useState<Array<object> | null>(null);
  const [loader, setLoader] = useState(true); // auctions loader
  const [categories, setCategories] = useState<Array<object> | null>(null);
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
      setLoader(false);
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

  const handleCategoryFilter = (desc: string) => {
    setLoader(true);
    setCategoryId(desc);
    const qs = ENV.objectToQueryString({ myFilter: desc });
    props.getLiveAuctions(qs);
  };
  const bannerData = {
    subHeading: "Auctions",
    heading: "Live Auctions",
    content:
      " Explore on the world’s best & largest NFT marketplace with our beautiful NFT products. We want to be a part of your smile, success and future growth.",
  };
  return (
    <>
      <Banner
        subHeading={bannerData.subHeading}
        heading={bannerData.heading}
        content={bannerData.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />

      <section className="explore-collection-section home-auction-list padding-wrapper">
        {
          // loader ? (
          //   <FullPageLoader />
          // ) : (
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 explore-collection-nav">
                <div className="d-none d-xxl-flex justify-content-lg-end text-end align-items-center">
                  {categoryId === "all" &&
                  (!auctions || (auctions && auctions?.length <= 1)) &&
                  !loader
                    ? ""
                    : categories &&
                      categories.length > 0 &&
                      categories.map((item: any, id: any) => {
                        return (
                          <button
                            onClick={() => {
                              setIsActive(id);
                              handleCategoryFilter(item.description);
                            }}
                            key={id}
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
                  {categoryId === "all" &&
                  (!auctions || (auctions && auctions?.length <= 1)) &&
                  !loader
                    ? ""
                    : categories &&
                      categories.length > 0 &&
                      categories.map((item: any, id: any) => {
                        return (
                          <div className="col-6 col-sm-3" key={id}>
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
            <div className="row g-3 align-items-center justify-content-center">
              {loader ? (
                <div className="spinner-border" role="status"></div>
              ) : auctions && auctions.length > 0 ? (
                auctions.map((item: any, index: number) => {
                  return (
                    <div className="col-sm-6 col-md-4 col-xl-3" key={index}>
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
                <p className="text-center mt-5">No Live Auctions Found</p>
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
        <OwnCollectionToday />
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => ({
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
