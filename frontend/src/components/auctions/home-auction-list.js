import React, { useState, useEffect } from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";

import DemoImg from "../../assets/images/cl-cr-mainimg.png";
import AuctionsCards from "../auctions-cards/AuctionsCards";
import Breadcrumb from "../breadcrumb/breadcrumb";

const AuctionsList = () => {
  const [isActive, setIsActive] = useState(0);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const auctionDemoData = [
    {
      _id: 1,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 2,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 3,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 4,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 5,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 6,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 7,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
    {
      _id: 8,
      image: DemoImg,
      auctionEndDate: new Date("2022/1/26 13:10:12"),
      name: "Art",
    },
  ];
  const menuData = [
    "All",
    "Art",
    "Collectibles",
    " Gaming",
    "Memes",
    "Music",
    "Others",
    "Photography",
    "Punks",
    "Sports",
    "Trading Cards",
  ];
  return (
    <>
      <NavbarMain />
      <Breadcrumb title1={"Auctions"} title2={"LiveAuctions"} />
      <section className="explore-collection-section padding-wrapper">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <div className="intro">
                <div className="intro-content">
                  <span>Auctions</span>
                  <h3 className="mb-0">Live Auctions</h3>
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
                        className={`${
                          id === isActive ? "active-explore-nav" : ""
                        } me-2 me-xl-3`}
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
            {auctionDemoData && auctionDemoData.length > 0 ? (
              auctionDemoData.map((item) => {
                return (
                  <div className="col-11 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                    <AuctionsCards
                      endDate={item.auctionEndDate}
                      image={item.image}
                      ownerName={item.name}
                      name={item.name}
                      id={item._id}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-white text-center">No Live Auctions Found</p>
            )}

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

export default AuctionsList;
