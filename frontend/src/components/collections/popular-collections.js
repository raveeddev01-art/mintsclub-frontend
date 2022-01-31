import React, { useState, useEffect, useRef } from "react";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
import { Link } from "react-router-dom";
import Collections from "./collections";
import CollectionsCard from "../../Screens/rough/collections-cards/CollectionsCard";
import ViewAllIcon from "../../assets/images/view-all-arrow.svg";
import CardSlider from "../card-slider/CardSlider";
import { ENV } from "../../config/config";
import { beforeCategory, getCategories } from "../categories/categories.action";
import { connect } from "react-redux";
const initData = {
  pre_heading: "Most Popular",
  heading: "Popular Collections",
  btnText: "Explore More",
};

const PopularCollections = (props) => {
  const [categories, setCategories] = useState(null);
  const [categoriesLoader, setCatLoader] = useState(true); // categories loader
  const [collectionsLoader, setColLoader] = useState(true); // collections loader
  const collectionsRef = useRef(null);

  useEffect(() => {
    window.scroll(0, 0);
    props.getCategories();
  }, []);

  // when categories data is received
  useEffect(() => {
    if (props.category.getAuth) {
      const { categories } = props.category;
      // const allCat = { active: true, name: 'all' }
      // setCategories([allCat, ...categories])
      setCategories(categories);
      props.beforeCategory();
      setCatLoader(false);
      setColLoader(false);
    }
  }, [props.category.getAuth]);

  const getCatCollections = (catId) => {
    collectionsRef.current?.getCatCollections(catId);
  };
  const getColLoader = (loader) => {
    setColLoader(loader);
  };

  console.log(categories, "categories123");

  return (
    <>
      {collectionsLoader ? (
        <FullPageLoader />
      ) : (
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
                  {/* {collectionsRef.current?.colCount > 0 && (
                  <div className="intro-btn">
                    <Link
                      className="btn content-btn text-left"
                      to="/collections"
                    >
                      {initData.btnText}
                    </Link>
                  </div>
                )} */}
                </div>
              </div>
              <div className="col-12 col-lg-7 col-xl-8 mt-3 mt-lg-0">
                <div className="popular-collections-content-right mt-lg-4 d-flex justify-content-end align-content-xxl-start text-end">
                  <button className="me-1 me-sm-2 active">Arts</button>
                  <button className="me-1 me-sm-2">Music</button>
                  <button className="me-1 me-sm-2">Game</button>
                  <button className="me-1 me-sm-5">Sport</button>
                  <div className="intro-btn">
                    <Link
                      className="btn btn-rounded-bordered btn-viewAll"
                      to="/authors"
                    >
                      View Alll
                      <img
                        src={ViewAllIcon}
                        alt="arrow-left"
                        className="ms-2"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <CardSlider settings={ENV.popularCollectionsSettings}>
              {categories.map((category) => {
                return (
                  <>
                    <CollectionsCard category={category} />
                  </>
                );
              })}
            </CardSlider>
            {/* <CollectionsCard /> */}
            {/* <Collections
            popular={true}
            userId="61408000cef27850fdea272b"
            setLoader={getColLoader}
            ref={collectionsRef}
          /> */}
          </div>
        </section>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  error: state.error,
  category: state.category,
});

export default connect(mapStateToProps, { beforeCategory, getCategories })(
  PopularCollections
);
