import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./explore-collections.css";
import CollectionsCard from "../../components/collections-cards/CollectionsCard";
import { connect } from "react-redux";
import { ENV } from "../../config/config";
import {
  beforeCollection,
  getCollections,
  toggleLikeDislike,
  beforeCategory,
  getCategories
} from "../collections/collections.actions";
import { Images } from "../../assets/assets";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
import OwnCollectionToday from "../../components/own-collection-today/own-collection-today";
import Banner from "../../components/banner/banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg.png";
import { exploreCollectionBanner } from "../../utils/exportData";

const ExploreCollections = forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState("All");
  const [collections, setCollections] = useState(null);
  const [categoriesLoader, setCatLoader] = useState(true); 
  const [collectionsLoader, setColLoader] = useState(true); 
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState();
  const [empty, setEmpty] = useState(false);
  const [loader, setLoader] = useState(true);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);

    if (props.setLoader) props.setLoader(false); 

    getCollections(null, 1);
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.collection.getAuth) {
      const { collections, pagination } = props.collection;
      setPagination(pagination);
      const userId = ENV.getUserKeys("_id")._id;
      if (props.mycollections) {
        let myCollections = collections.filter(
          (item) => item.userId === userId
        );
        setCollections(myCollections);
      } else {
        if (collections === null) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
        setCollections(collections);

        setColLoader(false);
        setLoader(false);
      }
      props.beforeCollection();
    }
  }, [props.collection.getAuth]);

  useEffect(() => {
    if (props.collection.collectionFlag) {
      setCategories(props.collection.categories);

      props.beforeCategory();
      setCatLoader(false);
    }
  }, [props.collection.collectionFlag]);

  const getCollections = (category, page, pageLimit) => {
    const filter = {
      page,
    };

    if (props.userId) filter.userId = props.userId;
    if (props.popular) filter.popular = true;
    if (category) filter.myFilter = category;
    if (!props.all) filter.limit = pageLimit ? pageLimit : 10;
    else filter.all = true;

    const qs = ENV.objectToQueryString(filter);

    props.getCollections(qs);
  };

  useImperativeHandle(ref, () => ({
    getCatCollections: (catId) => {
      if (props.setLoader) props.setLoader(true);

      getCollections(catId, page);
    },
    colCount: collections?.length || 0,
  }));

  const handlePagination = () => {
    window.scroll(0, 500);
    setPage(page);
    setLimit(limit + 10);
    getCollections(selectedCategory, page, limit + 10);
  };
  const handleFilterCategory = (category) => {
    setLoader(true);
    setPage(1);
    setLimit(10);
    getCollections(category, 1, 10);
  };

  const handleImage = (item, index) => {
    if (item?.nftDetail[index]?.image) {
      let result = item.nftDetail.filter((nft) => nft.fileType === "image");
      if (result.length >= index && result.length !== 0) {
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
      {categoriesLoader && collectionsLoader ? (
        <FullPageLoader />
      ) : (
        <section className="explore-collection-section padding-wrapper pt-0">
          <Banner
            subHeading={exploreCollectionBanner.subHeading}
            heading={exploreCollectionBanner.heading}
            content={exploreCollectionBanner.content}
            bgImg={BannerBg}
            bannerImg={BannerImage}
          />
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 explore-collection-nav">
                <div className="d-none d-xxl-flex justify-content-lg-end text-end align-items-center">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setIsActive(item.name);
                            setSelectedCategory(item.description);
                            handleFilterCategory(item.description);
                          }}
                          className={`${
                            item.name === isActive ? "active-explore-nav" : ""
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
                    categories.map((item, index) => {
                      return (
                        <div className="col-6 col-sm-3" key={index}>
                          <button
                            onClick={() => {
                              setIsActive(item.name);
                              setSelectedCategory(item.description);
                              handleFilterCategory(item.description);
                            }}
                            className={
                              isActive === item.name ? "active-explore-nav" : ""
                            }
                          >
                            {item.name}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="row g-1 align-items-center justify-content-center">
              {loader ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : collections && collections.length > 0 ? (
                collections.map((collection, index) => {
                  return (
                    <div className="col-sm-6 col-md-4 col-xl-3" key={index}>
                      <CollectionsCard
                        CardImg={collection.featuredImg}
                        Subimg1={handleImage(collection, 0)}
                        Subimg2={handleImage(collection, 1)}
                        Subimg3={handleImage(collection, 2)}
                        name={collection.name}
                        id={collection._id}
                        collection={collection}
                        userName={
                          collection?.username[0] ? collection.username[0] : ""
                        }
                        NFTCount={
                          collection.nftDetail[0].image
                            ? collection.nftDetail?.length
                            : 0
                        }
                        profileImage={collection?.profileImage[0]}
                        ownerAddress={collection?.ownerAddress}
                        connectedAddress={props.connectedAddress}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-center not-found-title mt-5">
                  No Collections found
                </p>
              )}
              <div className="col-12">
                <div className="mt-5 d-flex justify-content-center align-items-center">
                  {!empty &&
                    collections?.length === 10 &&
                    !loader &&
                    pagination.totalRecords > collections.length && (
                      <button
                        className="btn btn-rounded-bordered px-5"
                        onClick={() => handlePagination()}
                      >
                        Load more...
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
          <OwnCollectionToday />
        </section>
      )}
    </>
  );
});
const mapStateToProps = (state) => ({
  collection: state.collection,
  error: state.error,
  category: state.category,
  categories: state.collection,
  pagination: state.pagination,
  connectedAddress:state.wallet.connectedAddress
});

export default connect(
  mapStateToProps,
  {
    beforeCollection,
    getCollections,
    beforeCategory,
    getCategories,
    toggleLikeDislike,
  },
  null,
  { forwardRef: true }
)(ExploreCollections);
