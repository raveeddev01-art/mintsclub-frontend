import React, { useState } from "react";
import NavbarMain from "../../Screens/rough/navbar-main/NavbarMain";
import Footer from "../footer/footer";
import "./UserProfile.css";
import Avatar from "../../assets/images/detail-avatar.png";
import FlagIcon from "../../assets/images/detail-flag.svg";
import ShareIcon from "../../assets/images/detail-share.svg";
import TickIcon from "../../assets/images/seller-tick-icon.svg";
import SearchIcon from "../../assets/images/nav-search-icon.svg";
import ListingCards from "../../Screens/rough/listing-cards/ListingCards";
import { ListingImg } from "../../assets/assets";
import FilterComponent from "../filter-component/FilterComponent";
import BannerImg from "../../assets/images/collection-detailBg.png";

const UserProfile = () => {
  const [isActive, setIsActive] = useState(0);
  const [isAddressCopied, setAddressCopied] = useState(false);
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

  const ChangeTooltip = () =>
    setTimeout(() => {
      setAddressCopied(false);
    }, 1000);

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
  const accountAddress = "0xe0106f010067b130e4c96f119c214c30c94cead1";
  const menuData = ["Collected", "Created", "Favourited"];
  return (
    <>
      <NavbarMain />
      <div className="collection-detail-hero">
        <img src={BannerImg} alt="BannerImg" />
      </div>
      <div className="collection-detail-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="collection-owner-avatar text-center">
                <img src={Avatar} alt="owner-avatar" />
              </div>
              <div className="collection-owner-detail text-center mt-3">
                <div className="collection-owner-name">
                  <h3>User Name</h3>
                </div>
                <div
                  className="user-address mt-4"
                  onClick={() => {
                    navigator.clipboard.writeText(accountAddress);
                    setAddressCopied(true);
                    ChangeTooltip();
                  }}
                >
                  <span>{isAddressCopied ? "Copied" : "Copy"}</span>
                  <p>
                    {accountAddress.slice(0, 10) +
                      "..." +
                      accountAddress.slice(-10)}
                  </p>
                </div>
                <p>
                  Joined <span>February 2022</span>
                </p>
              </div>
            </div>
          </div>
          <div className="collections-listing padding-wrapper">
            <div className="row g-3 align-items-center justify-content-center justify-content-lg-start ">
              <div className="col-12">
                <div className="explore-collection-section">
                  <div className="explore-collection-nav">
                    <div className="d-flex justify-content-center justify-content-md-end align-items-center">
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
                  </div>
                </div>
              </div>
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

export default UserProfile;
