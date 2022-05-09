import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import NavbarMain from "../navbar-main/NavbarMain";
import "./explore-collections.css";
import CollectionsCard from "../collections-cards/CollectionsCard";
import Footer from "../footer/footer";
import { connect } from "react-redux";
import { ENV } from "../../config/config";
import {
  beforeCollection,
  getCollections,
  toggleLikeDislike,
} from "./collections.actions";
import { Images } from "../../assets/assets";

import FullPageLoader from "../../components/full-page-loader/full-page-loader";
import { beforeCategory, getCategories } from "./collections.actions";
import Breadcrumb from "../breadcrumb/breadcrumb";

const ExploreCollections = forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState("All");
  const [collections, setCollections] = useState(null);
  const [categoriesLoader, setCatLoader] = useState(true); // categories loader
  const [collectionsLoader, setColLoader] = useState(true); // collections loader
  const [source, setSource] = useState(1); // 1 for my collections, 2 for popular collections
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState();
  const [empty, setEmpty] = useState(false);
  const [loader, setLoader] = useState(true);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);
    if (props.source) setSource(props.source);

    if (props.setLoader) props.setLoader(false); //to be changed

    getCollections(null, 1);
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.collection.getAuth) {
      const { collections, pagination } = props.collection;
      setPagination(pagination);
      // console.log('collections', collections.nftDetail);
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
      <NavbarMain />
      <Breadcrumb title1={"Explore"} title2={"Explore All"} />
      {categoriesLoader && collectionsLoader ? (
        <FullPageLoader />
      ) : (
        <section className="explore-collection-section padding-wrapper">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12">
                <div className="intro">
                  <div className="intro-content">
                    <span>Collections</span>
                    <h3 className="mb-0">Explore all</h3>
                  </div>
                </div>
              </div>
              <div className="col-12 explore-collection-nav">
                <div className="d-none d-xxl-flex justify-content-lg-end text-end align-items-center">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item,index) => {
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
                    categories.map((item,index) => {
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
            <div className="row g-4 align-items-center justify-content-center">
              {loader ? (
                <div className="spinner-border text-white" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : collections && collections.length > 0 ? (
                collections.map((collection,index) => {
                  return (
                    <div className="col-sm-6 col-lg-4" key={index}>
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
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-white not-found-title mt-5">
                  No Collections found
                </p>
              )}
              <div className="col-12">
                <div className="mt-5 text-center">
                  {!empty &&
                    collections?.length === 10 &&
                    pagination.totalRecords > collections.length && (
                      <button
                        className="btn btn-linear-gradient px-5"
                        onClick={() => handlePagination()}
                      >
                        Load more
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
});
const mapStateToProps = (state) => ({
  collection: state.collection,
  error: state.error,
  category: state.category,
  categories: state.collection,
  pagination: state.pagination,
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
