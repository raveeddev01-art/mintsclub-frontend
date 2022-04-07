import React, { useState, useEffect, useRef } from "react";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
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
import { CollectionImages } from "../../assets/assets.js";
import { Images } from "../../assets/assets";
const initData = {
  pre_heading: "Most Popular",
  heading: "Popular Collections",
  btnText: "Explore More",
};

const collectionData = [
  {
    mainImg: CollectionImages.mainImg1,
    subImg1: CollectionImages.subImg1,
    subImg2: CollectionImages.subImg2,
    subImg3: CollectionImages.subImg3,
  },
  {
    mainImg: CollectionImages.mainImg2,
    subImg1: CollectionImages.subImg4,
    subImg2: CollectionImages.subImg5,
    subImg3: CollectionImages.subImg6,
  },
  {
    mainImg: CollectionImages.mainImg3,
    subImg1: CollectionImages.subImg1,
    subImg2: CollectionImages.subImg2,
    subImg3: CollectionImages.subImg3,
  },
  {
    mainImg: CollectionImages.mainImg1,
    subImg1: CollectionImages.subImg4,
    subImg2: CollectionImages.subImg5,
    subImg3: CollectionImages.subImg6,
  },
  {
    mainImg: CollectionImages.mainImg2,
    subImg1: CollectionImages.subImg1,
    subImg2: CollectionImages.subImg2,
    subImg3: CollectionImages.subImg3,
  },
  {
    mainImg: CollectionImages.mainImg3,
    subImg1: CollectionImages.subImg4,
    subImg2: CollectionImages.subImg5,
    subImg3: CollectionImages.subImg6,
  },
  {
    mainImg: CollectionImages.mainImg1,
    subImg1: CollectionImages.subImg1,
    subImg2: CollectionImages.subImg2,
    subImg3: CollectionImages.subImg3,
  },
  {
    mainImg: CollectionImages.mainImg2,
    subImg1: CollectionImages.subImg4,
    subImg2: CollectionImages.subImg5,
    subImg3: CollectionImages.subImg6,
  },
  {
    mainImg: CollectionImages.mainImg3,
    subImg1: CollectionImages.subImg1,
    subImg2: CollectionImages.subImg2,
    subImg3: CollectionImages.subImg3,
  },
  {
    mainImg: CollectionImages.mainImg1,
    subImg1: CollectionImages.subImg4,
    subImg2: CollectionImages.subImg5,
    subImg3: CollectionImages.subImg6,
  },
  {
    mainImg: CollectionImages.mainImg2,
    subImg1: CollectionImages.subImg1,
    subImg2: CollectionImages.subImg2,
    subImg3: CollectionImages.subImg3,
  },
  {
    mainImg: CollectionImages.mainImg3,
    subImg1: CollectionImages.subImg4,
    subImg2: CollectionImages.subImg5,
    subImg3: CollectionImages.subImg6,
  },
];

const PopularCollections = (props) => {
  const [popular, setpopular] = useState([]);
  const [categories, setCategories] = useState(null);
  const [categoryId, setCategoryId] = useState("all");
  const [isActive, setIsActive] = useState(0);

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

          collectionListing[i].totalNfts = element.nfts.length;
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

      setpopular(finalCollectionListing);
      props.beforePopularCollection();
    }
  }, [props.getPopularAuth]);

  const handleCategoryFilter = (desc) => {
    props.beforePopularCollection();
    setCategoryId(desc);
    const qs = ENV.objectToQueryString({ myFilter: desc });
    props.getPopularCollections(qs);
  };

  return (
    <>
      <section className="popular-collections-area padding-wrapper">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <span>{initData.pre_heading}</span>
                  <h3 className=" mb-0">{initData.heading}</h3>
                  <p>
                    Explore on the world's best & largest NFT marketplace with
                    our beautiful NFT products. We want to be a part of your
                    smile, success and future growth.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7 col-xl-8 mt-3 mt-lg-0">
              {categoryId === "all" && popular && popular?.length == 0 ? (
                ""
              ) : (
                <div className="popular-collections-content-right mt-lg-4 d-flex justify-content-center justify-content-sm-end align-content-xxl-start text-end">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item, id) => {
                      if (id <= 3) {
                        return (
                          <button
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
                      to="/popular-collections"
                    >
                      View All
                      <img
                        src={ViewAllIcon}
                        alt="arrow-left"
                        className="ms-2"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <CardSlider
            settings={ENV.popularCollectionsSettings}
            homeAuction={false}
            data={[1, 2, 3, 4]}
          >
            {popular &&
              popular.length > 0 &&
              popular.map((item, i) => {
                if (i < 8) {
                  return (
                    <CollectionsCard
                      CardImg={item.featuredImg}
                      Subimg1={
                        item?.nfts[0]?.image
                          ? item?.nfts[0]?.image
                          : Images.popularCollectionPlaceholder
                      }
                      Subimg2={
                        item?.nfts[1]?.image
                          ? item?.nfts[1]?.image
                          : Images.popularCollectionPlaceholder
                      }
                      Subimg3={
                        item?.nfts[2]?.image
                          ? item?.nfts[2]?.image
                          : Images.popularCollectionPlaceholder
                      }
                      name={item.name}
                      id={item._id}
                      collection={item}
                      userName={item.username[0]}
                      NFTCount={item.totalNfts}
                      profileImage={item.profileImage[0]}
                    />
                  );
                }
              })}
          </CardSlider>
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
