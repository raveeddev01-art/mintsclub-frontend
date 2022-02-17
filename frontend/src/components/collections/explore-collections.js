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
import {
  beforeCollection,
  getCollections,
  toggleLikeDislike,
} from "./collections.actions";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
import { beforeCategory, getCategories } from "./collections.actions";
import { SiTruenas } from "react-icons/si";

const ExploreCollections = forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState("Art");
  const [collections, setCollections] = useState(null);
  const [categoriesLoader, setCatLoader] = useState(true); // categories loader
  const [collectionsLoader, setColLoader] = useState(true); // collections loader
  const [source, setSource] = useState(1); // 1 for my collections, 2 for popular collections
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("music");
  const [categories, setCategories] = useState();
  const [empty,setEmpty]=useState(false)
  const [loader,setLoader]=useState(true)

  useEffect(() => {
    window.scroll(0, 0);
    if (props.source) setSource(props.source);

    if (props.setLoader) props.setLoader(false); //to be changed

    getCollections(null, 1);
    props.getCategories();
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
        console.log(collections,"collections")
        if(collections===null){
          setEmpty(true)
        }
        else {
          setEmpty(false)
        }
        setCollections(collections);
        console.log("stting coll loader false")
        setColLoader(false);
        setLoader(false)
      }
      props.beforeCollection();
      // if (props.setLoader) props.setLoader(false);
    }
  }, [props.collection.getAuth]);

  useEffect(() => {
    if (props.collection.collectionFlag) {
      setCategories(props.collection.categories);
      console.log("stting cat loader false")
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

    // if not all then apply limit
    if (!props.all) filter.limit = pageLimit ? pageLimit : 10;
    else filter.all = true;

    const qs = ENV.objectToQueryString(filter);
    console.log("query string in the frontend", qs);
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
    setLoader(true)
    setPage(1)
    setLimit(10);
    getCollections(category, 1, 10);
  };

  // const handleLikesTogleApi = (collectionId) => {
  //   let userId=ENV.getUserKeys("_id")._id;
  //   let obj={
  //     userId,
  //     collectionId,
  //     count:1,
  //   }
  //   props.toggleLikeDislike(obj);
  // };

 
console.log(collections,"collections 123")
  return (
    <>
      <NavbarMain />
      {categoriesLoader && collectionsLoader ? (
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
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item) => {
                      return (
                        <button
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
                <div className="row justify-content-center justify-content-sm-start align-items-center text-center d-lg-none">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item) => {
                    return (
                      <div className="col-6 col-sm-3">
                        <button
                          onClick={() => {
                            setIsActive(item.name);
                            setSelectedCategory(item.description);
                            handleFilterCategory(item.description);
                          }}
                          className={
                            isActive === item.name  ? "active-explore-nav" : ""
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
              {loader?
                <div class="spinner-border text-white" role="status">
                <span class="sr-only">Loading...</span>
              </div>:
              collections && collections.length > 0 ? (
                collections.map((collection) => {
                  return (
                    <div className="col-sm-6 col-lg-4">
                      <CollectionsCard
                        CardImg={collection.banner}
                        Subimg1={collection.logo}
                        Subimg2={collection.featuredImg}
                        Subimg3={collection.banner}
                        name={collection.name}
                        id={collection._id}
                        collection={collection}
                        userName={collection?.user[0]?.username?collection?.user[0]?.username:""}
                        NFTCount={collection.NFTCount}
                        // handleLikesTogle={handleLikesTogleApi}
                      />
                    </div>
                  );
                })
              ):(
                  
                  <p className="text-center text-white not-found-title mt-5">No Collections found</p>

              )}
              <div className="col-12">
                <div className="mt-5 text-center">
                  {
                    !empty &&
                  <button
                    className="btn btn-linear-gradient px-5"
                    onClick={() => handlePagination()}
                  >
                    Load more
                  </button>
                  }
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
const mapStateToProps = (state) => (
  console.log(state, "state of collecions"),
  {
    collection: state.collection,
    error: state.error,
    category: state.category,
    categories: state.collection,
  }
);

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
