import React from "react";
import NavbarMain from "../../Screens/rough/navbar-main/NavbarMain";
import "./explore-collections.css";
import { CollectionImages } from "../../assets/assets.js";
import CollectionsCard from "../../Screens/rough/collections-cards/CollectionsCard";
import Footer from "../footer/footer";

const ExploreCollections = () => {
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
  return (
    <>
      <NavbarMain />
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
                <button className="me-2 me-xl-3">Trending</button>
                <button className="me-2 me-xl-3">Top</button>
                <button className="me-2 me-xl-3">Art</button>
                <button className="me-2 me-xl-3 active-explore-nav">
                  Collections
                </button>
                <button className="me-2 me-xl-3">DomainNames</button>
                <button className="me-2 me-xl-3">Music</button>
                <button className="me-2 me-xl-3">Photography</button>
                <button className="me-2 me-xl-3"> Sports </button>
                <button className="me-2 me-xl-3">TradingCards</button>
                <button className="me-2 me-xl-3">Utility</button>
                <button className="">Virtual Worlds</button>
              </div>
              <div className="row justify-content-center justify-content-sm-start align-items-center text-center d-lg-none">
                <div className="col-6 col-sm-3">
                  <button className="">Trending</button>
                </div>
                <div className="col-6 col-sm-3">
                  <button className="">Top</button>
                </div>
                <div className="col-6 col-sm-3">
                  <button className="">Art</button>
                </div>
                <div className="col-6 col-sm-3">
                  <button className="active-explore-nav">Colllections</button>
                </div>
                <div className="col-6 col-sm-3">
                  <button className="">DomainNames</button>
                </div>
                <div className="col-6 col-sm-3">
                  <button className="">Music</button>
                </div>
                <div className="col-6 col-sm-3">
                  <button className="">Photography</button>
                </div>
                <div className="col-6 col-sm-3">
                  <button className=""> Sports </button>
                </div>
                <div className="col-6 col-sm-3">
                  <button className="">TradingCards</button>
                </div>
                <div className="col-6 col-sm-3">
                  <button className="">Utility</button>
                </div>
                <div className="col-6 col-sm-3">
                  <button className="">Virtual Worlds</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4 align-items-center justify-content-center">
            {collectionData.map((collectionData) => {
              return (
                <div className="col-sm-6 col-lg-4">
                  <CollectionsCard
                    CardImg={collectionData.mainImg}
                    Subimg1={collectionData.subImg1}
                    Subimg2={collectionData.subImg2}
                    Subimg3={collectionData.subImg3}
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
      <Footer />
    </>
  );
};

export default ExploreCollections;
