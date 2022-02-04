import React, { useState } from "react";
import NavbarMain from "../../Screens/rough/navbar-main/NavbarMain";
import "./explore-collections.css";
import { CollectionImages } from "../../assets/assets.js";
import CollectionsCard from "../../Screens/rough/collections-cards/CollectionsCard";
import Footer from "../footer/footer";

const ExploreCollections = () => {
  const [isActive, setIsActive] = useState(0);
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
                        className={isActive === id ? "active-explore-nav" : ""}
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
