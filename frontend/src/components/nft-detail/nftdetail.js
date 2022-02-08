import React from "react";
import NavbarMain from "../../Screens/rough/navbar-main/NavbarMain";
import Footer from "../footer/footer";
import "./nftdetail.css";
import PriceHistoy from "../../assets/images/pricehistoryicon.svg";
import OfferIcon from "../../assets/images/offer-icon.svg";
import ListingIcon from "../../assets/images/listing-icon.svg";
import ActivityIcon from "../../assets/images/activity.svg";
import MoreCollectionIcon from "../../assets/images/morecollectionicon.svg";
import { ListingImg } from "../../assets/assets";
import ListingCards from "../../Screens/rough/listing-cards/ListingCards";
import { Card } from "react-bootstrap";
import CardImg from "../../assets/images/detailnftimg.png";
import HeartIcon from "../../assets/images/unlike-icon.svg";
import ClockIcon from "../../assets/images/clock-icon.svg";
import DescriptionIcon from "../../assets/images/detail-description-icon.svg";
const NFTDetail = () => {
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
  ];
  return (
    <>
      <NavbarMain />
      <section className="padding-wrapper nft-detail">
        <div className="container">
          <div className="row g-3">
            <div className="col-12 order-2 order-md-1 col-md-6 col-lg-7 col-xl-8 ">
              <div className="row">
                <div className="col-12 order-2 order-md-1">
                  <div className="nftDetail-accordion">
                    <div
                      className="accordion accordion-flush "
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            <img
                              src={PriceHistoy}
                              alt="price-history"
                              className="me-2"
                            />
                            Price history
                          </button>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingOne"
                        >
                          <div className="accordion-body">
                            {/* <div className="d-flex flex-column ">
                          <div className="filter-min-max d-flex align-items-center justify-content-center">
                            <p>Min:</p>
                            <input type="number" />
                          </div>
                          <span className="text-center my-1">To</span>
                          <div className="filter-min-max d-flex align-items-center justify-content-center">
                            <p>Max:</p>
                            <input type="number" />
                          </div>
                        </div> */}
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                          >
                            <img
                              src={OfferIcon}
                              alt="price-history"
                              className="me-2"
                            />
                            Offers
                          </button>
                        </h2>
                        <div
                          id="flush-collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingTwo"
                        >
                          <div className="accordion-body">
                            {/* <div className="d-flex flex-column">
                          <button>ETH</button>
                        </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id="flush-headingThree"
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#flush-collapseThree"
                            aria-expanded="false"
                            aria-controls="flush-collapseThree"
                          >
                            <img
                              src={ListingIcon}
                              alt="price-history"
                              className="me-2"
                            />
                            Item listing
                          </button>
                        </h2>
                        <div
                          id="flush-collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingThree"
                        >
                          <div className="accordion-body">
                            {/* <div className="d-flex flex-column">
                          <button>ETH</button>
                        </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-11 col-md-12 col-lg-6 col-xl-5 order-1 order-md-2 mx-auto mb-5 mb-md-0  mx-md-0">
                  <div className="collection-filter-accordion nft-stats-accordion">
                    <div
                      className="accordion accordion-flush "
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingFour">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#flush-collapseFour"
                            aria-expanded="false"
                            aria-controls="flush-collapseFour"
                          >
                            Properties
                          </button>
                        </h2>
                        <div
                          id="flush-collapseFour"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingFour"
                        >
                          <div className="accordion-body"></div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingSix">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#flush-collapseSix"
                            aria-expanded="false"
                            aria-controls="flush-collapseSix"
                          >
                            Stats
                          </button>
                        </h2>
                        <div
                          id="flush-collapseSix"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingSix"
                        >
                          <div className="accordion-body"></div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id="flush-headingSeven"
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#flush-collapseSeven"
                            aria-expanded="false"
                            aria-controls="flush-collapseSeven"
                          >
                            Levels
                          </button>
                        </h2>
                        <div
                          id="flush-collapseSeven"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingSeven"
                        >
                          <div className="accordion-body"></div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id="flush-headingEight"
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#flush-collapseEight"
                            aria-expanded="false"
                            aria-controls="flush-collapseEight"
                          >
                            Boosts
                          </button>
                        </h2>
                        <div
                          id="flush-collapseEight"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingEight"
                        >
                          <div className="accordion-body"></div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingNine">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#flush-collapseNine"
                            aria-expanded="false"
                            aria-controls="flush-collapseNine"
                          >
                            Details
                          </button>
                        </h2>
                        <div
                          id="flush-collapseNine"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingNine"
                        >
                          <div className="accordion-body">
                            <div className="contact-address d-flex justify-content-between">
                              <p>Contract Address</p>
                              <span>0x7227...3335</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Token ID</p>
                              <p>1584563428....</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Token Standard </p>
                              <p>ERC-721</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Blockchain </p>
                              <p>Polygon</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-11 col-sm-8 order-1 order-md-2 col-md-6 col-lg-5 col-xl-4 mx-auto">
              <Card className="auction-card detail-card">
                <div className="auction-img-wrapper">
                  <Card.Img variant="top" src={CardImg} alt="AuctionTopImg" />
                </div>
                <Card.Body>
                  <div>
                    <span>Current price</span>
                    <h3>
                      0.0006 <span>($2.28)</span>
                    </h3>
                  </div>
                  <div className=" d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <img src={ClockIcon} alt="clock-icon" className="me-1" />
                      <span>Sale ends March 8, 2022 at 7:40am PKT </span>
                    </div>
                    <div className="likes-container d-flex align-items-center">
                      <span>125</span>
                      <img src={HeartIcon} alt="heart-icon" className="ms-1" />
                    </div>
                  </div>
                  <button className="btn btn-linear-gradient d-flex align-items-center justify-content-center w-75 mx-auto">
                    <p>Buy now</p>
                  </button>
                </Card.Body>
              </Card>
              <div className="detail-description-content mt-5">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={DescriptionIcon}
                    alt="descriptionIcon"
                    className="me-1"
                  />
                  <h6>Discription</h6>
                </div>
                <p>
                  A Neon District: Season One game item, playable on
                  https://portal.neondistrict.io. <br></br> Neon District is a
                  free-to-play cyberpunk role-playing game. Collect characters
                  and gear, craft and level up teams, and battle against other
                  players through competitive multiplayer and in turn-based
                  combat.
                </p>
              </div>
            </div>
            <div className="col-12 mt-0 mt-md-4 order-3">
              <div className="nftDetail-accordion">
                <div
                  className="accordion accordion-flush "
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTen">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#flush-collapseTen"
                        aria-expanded="false"
                        aria-controls="flush-collapseTen"
                      >
                        <img
                          src={ActivityIcon}
                          alt="price-history"
                          className="me-2"
                        />
                        Activity
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTen"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingTen"
                    >
                      <div className="accordion-body">
                        {/* <div className="d-flex flex-column ">
                          <div className="filter-min-max d-flex align-items-center justify-content-center">
                            <p>Min:</p>
                            <input type="number" />
                          </div>
                          <span className="text-center my-1">To</span>
                          <div className="filter-min-max d-flex align-items-center justify-content-center">
                            <p>Max:</p>
                            <input type="number" />
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingEleven">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#flush-collapseEleven"
                        aria-expanded="false"
                        aria-controls="flush-collapseEleven"
                      >
                        <img
                          src={MoreCollectionIcon}
                          alt="price-history"
                          className="me-2"
                        />
                        More from this collection
                      </button>
                    </h2>
                    <div
                      id="flush-collapseEleven"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingEleven"
                    >
                      <div className="accordion-body">
                        <div className="row justify-content-center align-items-center g-3">
                          {CardsData &&
                            CardsData.map((listing) => {
                              return (
                                <div className="col-6 col-sm-6 col-md-4 col-lg-2 px-1">
                                  <ListingCards CardImg={listing.img} />
                                </div>
                              );
                            })}
                        </div>
                        <div className="mt-4 detail-btn-collection text-center">
                          <button className="btn btn-rounded-bordered">
                            View collection
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NFTDetail;
