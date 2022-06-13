import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CollectionsCard from "../collections-cards/CollectionsCard";
import ViewAllIcon from "../../assets/images/view-all-arrow.svg";
import CardSlider from "../card-slider/CardSlider";
import { ENV } from "../../config/config";
import { beforeCategory, getCategories } from "../categories/categories.action";
import {
  beforePopularCollection,
  getPopularCollections,
} from "../collections/collections.actions";
import { connect } from "react-redux";
import { Images } from "../../assets/assets";
const initData = {
  pre_heading: "Most Popular",
  heading: "Popular Collections",
  btnText: "Explore More",
};

const PopularCollections = (props) => {
  const [popular, setpopular] = useState([]);
  const [categories, setCategories] = useState(null);
  const [categoryId, setCategoryId] = useState("all");
  const [popularSettings, settPopularSettings] = useState();
  const [isActive, setIsActive] = useState(0);
  const [filterationLoader, setFilterationLoader] = useState(true);

  useEffect(() => {
    const qs = ENV.objectToQueryString({
      myFilter: "all",
    });
    props.getPopularCollections(qs);
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.category.getAuth) {
      setCategories(props.category.categories);
    }
  }, [props.category.getAuth]);

  useEffect(() => {
    if (props.getPopularAuth) {
      const collectionListing = props.popularCollections.collectionsList;
      if (collectionListing) {
        collectionListing.forEach((element, i) => {
          if (element.likesCount.length > 0) {
            var sumLikes = element.likesCount.reduce(function (a, b) {
              return a + b;
            }, 0);
            collectionListing[i].likesCount = sumLikes;
          }
          collectionListing[i].likesCount = 0;

          collectionListing[i].totalNfts = element.nfts[0].image
            ? element.nfts?.length
            : 0;
          if (element.soldCopies.length > 0) {
            var soldCopiesSum = element.soldCopies.reduce(function (a, b) {
              return a + b;
            }, 0);
            collectionListing[i].soldCopies = soldCopiesSum;
          }

          collectionListing[i].soldCopies = 0;
        });
      }

      const finalCollectionListing = collectionListing.sort(
        (a, b) => b.likesCount - a.likesCount || b.soldCopies - a.soldCopies
      );
      let popularCollectionsSettings = ENV.popularCollectionsSettings;
      if (finalCollectionListing.length > 3) {
        popularCollectionsSettings.infinite = true;
      } else {
        popularCollectionsSettings.infinite = false;
      }
      settPopularSettings(popularCollectionsSettings);
      if (finalCollectionListing.length && finalCollectionListing.length > 8) {
        setFilterationLoader(false);
        setpopular(finalCollectionListing.slice(0, 7));
      } else {
        setpopular(finalCollectionListing);

        setFilterationLoader(false);
      }
      props.beforePopularCollection();
    }
  }, [props.getPopularAuth]);

  const handleCategoryFilter = (desc) => {
    setFilterationLoader(true);
    props.beforePopularCollection();
    setCategoryId(desc);
    const qs = ENV.objectToQueryString({ myFilter: desc });
    props.getPopularCollections(qs);
  };

  const handleImage = (item, index) => {
    if (item?.nfts[index]?.image) {
      let result = item.nfts.filter((nft) => nft.fileType === "image");
      if (result.length >= index) {
        return result[index]?.image;
      } else {
        return Images.imagePlaceholder;
      }
    } else {
      return Images.imagePlaceholder;
    }
  };

  return (
    <>
      <section className="popular-collections-area padding-wrapper">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 col-md-8">
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content clr-yellow">
                  <span>{initData.pre_heading}</span>
                  <h3 className=" mb-1">{initData.heading}</h3>
                  <p>
                    Explore on the world's best & largest NFT marketplace with
                    our beautiful NFT products.{" "}
                    <br className="d-none d-xl-block" /> We want to be a part of
                    your smile, success and future growth.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-3 mt-lg-0">
              {categoryId === "all" && popular && popular?.length == 0 ? (
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
                            className={`collection-category ${
                              id === isActive ? "home-active-category" : ""
                            } me-1 me-sm-3 me-lg-4`}
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
                      to="/popular-collections"
                    >
                      View All
                      <img
                        src={ViewAllIcon}
                        alt="arrow-left"
                        className="ms-2 d-none d-sm-none"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          {filterationLoader ? (
            <div className="spinner-loader-wrapper">
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : popular && popular.length && popular.length > 0 ? (
            <CardSlider
              settings={ENV.popularCollectionsSettings}
              data={popular}
              homeAuction
            >
              {popular.map((item, i) => {
<<<<<<< HEAD
                // if (i < 8) {
=======
>>>>>>> ee12a6779e5ff6fecee255cf6b0706685894effe
                return (
                  <CollectionsCard
                    key={i}
                    Subimg1={handleImage(item, 0)}
                    Subimg2={handleImage(item, 1)}
                    Subimg3={handleImage(item, 2)}
                    collection={item}
                    CardImg={item.featuredImg}
                    name={item.name}
                    id={item._id}
                    userName={item.username[0]}
                    NFTCount={item.totalNfts}
                    profileImage={item.profileImage[0]}
                  />
                );
<<<<<<< HEAD
                // }
=======
>>>>>>> ee12a6779e5ff6fecee255cf6b0706685894effe
              })}
            </CardSlider>
          ) : (
            <p className="text-center not-found-title mt-5">
              No popular collections Found
            </p>
          )}
        </div>
      </section>
    </>
  );
};
const mapStateToProps = (state) => ({
  error: state.error,
  category: state.category,
  popularCollections: state.collection.popularCollections,
  getPopularAuth: state.collection.getPopularAuth,
});

export default connect(mapStateToProps, {
  beforePopularCollection,
  beforeCategory,
  getCategories,
  getPopularCollections,
})(PopularCollections);
