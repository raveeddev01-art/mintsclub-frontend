import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import NavbarMain from "../../Screens/rough/navbar-main/NavbarMain";
import "./explore-collections.css";
import { CollectionImages } from "../../assets/assets.js";
import CollectionsCard from "../../Screens/rough/collections-cards/CollectionsCard";
import Footer from "../footer/footer";
import { connect } from "react-redux";
import { ENV } from "../../config/config";
import { beforeCollection, getCollections } from "./collections.actions";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";

const ExploreCollections = forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState(0);
  const [collections, setCollections] = useState(null);
  const [categoriesLoader, setCatLoader] = useState(true); // categories loader
  const [collectionsLoader, setColLoader] = useState(true); // collections loader
  const [source, setSource] = useState(1); // 1 for my collections, 2 for popular collections

  useEffect(() => {
    window.scroll(0, 0);
    if (props.source) setSource(props.source);

    if (props.setLoader) props.setLoader(false); //to be changed

    getCollections();
  }, []);

  useEffect(() => {
    if (props.collection.getAuth) {
      const { collections } = props.collection;
      const userId = ENV.getUserKeys("_id")._id;
      if (props.mycollections) {
        let myCollections = collections.filter(
          (item) => item.userId === userId
        );
        setCollections(myCollections);
      } else {
        setCollections(collections);
        setColLoader(false);
      }
      props.beforeCollection();
      if (props.setLoader) props.setLoader(false);
    }
  }, [props.collection.getAuth]);

  const getCollections = (categoryId = null) => {
    const filter = {
      page: 1,
    };
    if (categoryId) filter.categoryId = categoryId;

    if (props.userId) filter.userId = props.userId;

    if (props.popular) filter.popular = true;

    // if not all then apply limit
    if (!props.all) filter.limit = props.limit ? props.limit : 8;
    else filter.all = true;

    const qs = ENV.objectToQueryString(filter);
    props.getCollections(qs);
  };

  useImperativeHandle(ref, () => ({
    getCatCollections: (catId) => {
      if (props.setLoader) props.setLoader(true);

      getCollections(catId);
    },
    colCount: collections?.length || 0,
  }));

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
  ];
  const menuData = [
    "Trending",
    "Top",
    "Art",
    " Collectibles",
    "Domain Names",
    "Music",
    "Photography",
    "Sports",
    "Trading Cards",
    "Utility",
    "Virtual Worlds",
  ];
  console.log("collections-console:", collections);
  return (
    <>
      <NavbarMain />
      {collectionsLoader ? (
        <FullPageLoader />
      ) : (
        <section className="explore-collection-section padding-wrapper">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12">
                {/* Intro */}
                <div className="intro">
                  <div className="intro-content">
                    <span>Collections</span>
                    <h3 className="mb-0">Explore all</h3>
                  </div>
                </div>
              </div>
              <div className="col-12 explore-collection-nav">
                <div className="d-none d-lg-flex justify-content-lg-end text-end align-items-center">
                  {menuData.map((item, id) => {
                    return (
                      <button
                        onClick={() => {
                          setIsActive(id);
                        }}
                        className={`${
                          id === isActive ? "active-explore-nav" : ""
                        } me-2 me-xl-3`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                <div className="row justify-content-center justify-content-sm-start align-items-center text-center d-lg-none">
                  {menuData.map((item, id) => {
                    return (
                      <div className="col-6 col-sm-3">
                        <button
                          onClick={() => {
                            setIsActive(id);
                          }}
                          className={
                            isActive === id ? "active-explore-nav" : ""
                          }
                        >
                          {item}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="row g-4 align-items-center justify-content-center">
              {collections.map((collections) => {
                return (
                  <div className="col-sm-6 col-lg-4">
                    <CollectionsCard
                      CardImg={collections.featuredImg}
                      Subimg1={collections.logo}
                      Subimg2={collections.featuredImg}
                      Subimg3={collections.logo}
                    />
                  </div>
                );
              })}
              <div className="col-12">
                <div className="mt-5 text-center">
                  <button className="btn btn-linear-gradient px-5">
                    Load more
                  </button>
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
});

export default connect(
  mapStateToProps,
  { beforeCollection, getCollections },
  null,
  { forwardRef: true }
)(ExploreCollections);
