import React, { useState } from "react";
import NavbarMain from "../../Screens/rough/navbar-main/NavbarMain";
import Footer from "../footer/footer";
import "./collectiondetails.css";
import Avatar from "../../assets/images/detail-avatar.png";
import FlagIcon from "../../assets/images/detail-flag.svg";
import ShareIcon from "../../assets/images/detail-share.svg";
import TickIcon from "../../assets/images/seller-tick-icon.svg";
import SearchIcon from "../../assets/images/nav-search-icon.svg";
import ListingCards from "../../Screens/rough/listing-cards/ListingCards";
import { ListingImg } from "../../assets/assets";
import FilterComponent from "../filter-component/FilterComponent";

const CollectionDetailsPage = () => {
  const [activeFilter, setActiveFilter] = useState(false);
  const itemoptions = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
  ];

  const priceoptions = [
    { value: "lowtohigh", label: "Low To High" },
    { value: "hightolow", label: "High To Low" },
  ];

  const CardsData = [
    {
      id: 1,
      img: ListingImg.listingImg1,
    },
    {
      id: 2,
      img: ListingImg.listingImg2,
    },
    {
      id: 3,
      img: ListingImg.listingImg3,
    },
    {
      id: 4,
      img: ListingImg.listingImg4,
    },
    {
      id: 5,
      img: ListingImg.listingImg1,
    },
    {
      id: 6,
      img: ListingImg.listingImg2,
    },
    {
      id: 7,
      img: ListingImg.listingImg3,
    },
    {
      id: 8,
      img: ListingImg.listingImg4,
    },
    {
      id: 9,
      img: ListingImg.listingImg1,
    },
    {
      id: 10,
      img: ListingImg.listingImg2,
    },
    {
      id: 11,
      img: ListingImg.listingImg3,
    },
    {
      id: 12,
      img: ListingImg.listingImg4,
    },
  ];

  const filterData = {
    status: {
      label: "Status",
      option: ["Buy Now", "On Auction", "New", "Has Offer"],
    },
    chains: {
      label: "Chains",
      option: ["Ethereum"],
    },
  };

  return (
    <>
      <NavbarMain />
      <div className="collection-detail-hero"></div>
      <div className="collection-detail-content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="collection-owner-avatar">
                <img src={Avatar} alt="owner-avatar" />
              </div>
              <div className="d-sm-flex align-items-center justify-content-between mt-5">
                <div className="collection-owner-detail">
                  <div className="collection-owner-name d-flex align-items-center">
                    <h3>Painted Poetry</h3>
                    <img src={TickIcon} alt="tick-icon" className="ms-2" />
                  </div>
                  <p>
                    Created by <span>brendannorth</span>
                  </p>
                </div>
                <div className="collection-owner-btns mt-3 mt-sm-0 ms-auto">
                  <button className="me-1 me-sm-2 me-lg-3">
                    <img src={FlagIcon} alt="" flag-icon />
                  </button>
                  <button className="me-1 me-sm-1 me-lg-3">
                    <img src={ShareIcon} alt="" flag-icon />
                  </button>
                  <button>+ Add to wishlist</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-7 col-md-6 col-lg-5">
              <div className="collection-owner-detail pe-xl-5 mt-4">
                <p>
                  Explore on the world's best & largest NFT marketplace with our
                  beautiful NFT products. We want to be a part of your smile,
                  success and future growth.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-7 mt-3 mt-sm-5">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-end">
                <div className="collection-stats d-flex flex-column justify-content-center align-items-center text-center me-1">
                  <span>50</span>
                  <p>items</p>
                </div>
                <div className="collection-stats d-flex flex-column justify-content-center align-items-center text-center me-1">
                  <span>50</span>
                  <p>Owner</p>
                </div>
                <div className="collection-stats d-flex flex-column justify-content-center align-items-center text-center me-1">
                  <span>50</span>
                  <p>Prize floor</p>
                </div>
                <div className="collection-stats d-flex flex-column justify-content-center align-items-center text-center me-1">
                  <span>50</span>
                  <p>Volume trade</p>
                </div>
              </div>
            </div>
          </div>
          <div className="collections-listing padding-wrapper">
            <div className="row g-3 align-items-center justify-content-center justify-content-lg-start ">
              <div className="col-12 col-sm-10 col-md-4 col-lg-3">
                <div className="collection-search-bar d-flex align-items-center justify-content-around mx-auto mx-md-0">
                  <img src={SearchIcon} alt="search-icon" className="ms-3" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-10 col-md-4 col-lg-3">
                <div className="collection-select-bar d-flex align-items-center justify-content-around mx-auto mx-md-0">
                  <div className="ms-2">
                    <p>Item:</p>
                  </div>

                  <select name="collection-select">
                    {itemoptions &&
                      itemoptions.map((collection, index) => {
                        return (
                          <option key={index} value={collection.label}>
                            {collection.label}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-12 col-sm-10 col-md-4 col-lg-3">
                <div className="collection-select-bar d-flex align-items-center justify-content-around mx-auto mx-md-0">
                  <div className="ms-2">
                    <p>Price:</p>
                  </div>

                  <select name="collection-select">
                    {priceoptions &&
                      priceoptions.map((collection, index) => {
                        return (
                          <option key={index} value={collection.label}>
                            {collection.label}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-12 d-sm-none">
                <div className="sm-filter-btn d-flex align-items-center justify-content-center">
                  <button
                    className={`${
                      activeFilter ? "filter-btn-active" : "filter-btn-inactive"
                    } ps-2`}
                    onClick={() => setActiveFilter(!activeFilter)}
                  >
                    Filters
                  </button>
                </div>
                <div
                  className={`${
                    activeFilter ? "d-block" : "d-none"
                  } sm-filter-options`}
                >
                  <div className="col-10 mx-auto mt-2">
                    <FilterComponent
                      Status={filterData.status}
                      Chains={filterData.chains}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-10 col-sm-4 col-md-3 col-lg-3 d-none d-sm-block">
                <FilterComponent
                  Status={filterData.status}
                  Chains={filterData.chains}
                />
              </div>
              <div className="col-12 col-sm-8 col-md-9 col-lg-9 mt-5 mt-sm-0">
                <div className="row g-3">
                  {CardsData &&
                    CardsData.map((listing) => {
                      return (
                        <div className="col-6 col-md-4 col-lg-3 px-1">
                          <ListingCards CardImg={listing.img} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollectionDetailsPage;
