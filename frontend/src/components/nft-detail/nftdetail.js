import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
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
import { getNFT, getNFTsByCollection } from "../nfts/nfts.action.js";
import FullPageLoader from "../full-page-loader/full-page-loader.js";
import { connect } from "react-redux";
import {Modal } from "react-bootstrap";
import { ENV } from '../../config/config';
import { decimalNumberValidator } from "../../utils/functions";
import moment from 'moment';
import SimpleReactValidator from 'simple-react-validator'

const NFTDetail = (props) => {
  const history=useHistory()
  let nftId = props.match.params.id;
  const initData = {
    itemImg: "/img/auction_2.jpg",
    date: "2022-03-30",
    price_2: "$500.89",
    bidBtn: "Place a Bid",
    offerBtn: "Buy Now",
    sellBtn: "Sell"
}
const { currencies } = ENV;
const expiryOptions = [
  { label: '5 Days', value: moment().add(5, "days").format('DD/MM/YYYY') },
  { label: '7 Days', value: moment().add(7, "days").format('DD/MM/YYYY') },
  { label: 'A Month', value: moment().add(1, "months").format('DD/MM/YYYY') },
  { label: 'Custom Date', value: -1 },
]

const config1 = {
  price: {
      currency: ENV.currency,
      amount: "",
  },
  expiry: {
      date: expiryOptions[0].value,
      time: moment(new Date()).format("HH:mm"),
      type: 1, // 1 for time & 2 for datetime-local
      datetime: '' // for payload 
  }
};
  const [nftDetail, setNftDetail] = useState("");
  const [nftsList, setNftList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [nftConfig,setNftConfig]=useState(config1)
  const validator = new SimpleReactValidator({
    autoForceUpdate: this,
    messages: {
        required: 'This field is required.'  // will override all messages
    },
});

 

  const propertiesData = [
    {
      id: 1,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 2,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 3,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 4,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 5,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 6,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 7,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
    {
      id: 8,
      subTitle: "ACCESSORIES1",
      title: "Rings",
      content: "30% have this trait",
    },
  ];
  useEffect(() => {
    props.getNFT(nftId);
  }, []);

  useEffect(() => {
    if (props.nftsAuth) {
      setNftDetail(props.nftDetail);
      setLoader(false);

      props.getNFTsByCollection(props.nftDetail.collectionId);
    }
  }, [props.nftsAuth]);

  useEffect(() => {
    if (props.nftsByCollectionStatus) {
      setNftList(props.nftsByCollection);
    }
  }, [props.nftsByCollectionStatus]);


  const handleRouting=()=>{
    if(ENV.getUserKeys("_id")._id ===nftDetail?.ownerId){
      history.push(
        {
          pathname:`/sell-item/${nftDetail._id}`,
          state:nftDetail
        }
        
        )
    }
  }

  console.log(ENV.getUserKeys("_id")._id ,"user id")
  console.log(nftDetail,"nftDetail")
  return (
    <>
      {loader ? (
        <FullPageLoader />
      ) : (
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
                            <h2
                              className="accordion-header"
                              id="flush-headingOne"
                            >
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
                              <div className="accordion-body"></div>
                            </div>
                          </div>

                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="flush-headingTwo"
                            >
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
                                <div className="table-container">
                                  <table class="table table-borderless">
                                    <thead>
                                      <tr>
                                        <th scope="col">Price</th>
                                        <th scope="col">USD Price</th>
                                        <th scope="col">Floor Difference</th>
                                        <th scope="col">Expiration</th>
                                        <th scope="col">From</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">1,250.009</th>
                                        <td>$1,500.01</td>
                                        <td>80% below</td>
                                        <td>an hour ago</td>
                                        <td>D2FB2D</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1,250.009</th>
                                        <td>$1,500.01</td>
                                        <td>80% below</td>
                                        <td>an hour ago</td>
                                        <td>D2FB2D</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1,250.009</th>
                                        <td>$1,500.01</td>
                                        <td>80% below</td>
                                        <td>an hour ago</td>
                                        <td>D2FB2D</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1,250.009</th>
                                        <td>$1,500.01</td>
                                        <td>80% below</td>
                                        <td>an hour ago</td>
                                        <td>D2FB2D</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1,250.009</th>
                                        <td>$1,500.01</td>
                                        <td>80% below</td>
                                        <td>an hour ago</td>
                                        <td>D2FB2D</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1,250.009</th>
                                        <td>$1,500.01</td>
                                        <td>80% below</td>
                                        <td>an hour ago</td>
                                        <td>D2FB2D</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1,250.009</th>
                                        <td>$1,500.01</td>
                                        <td>80% below</td>
                                        <td>an hour ago</td>
                                        <td>D2FB2D</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1,250.009</th>
                                        <td>$1,500.01</td>
                                        <td>80% below</td>
                                        <td>an hour ago</td>
                                        <td>D2FB2D</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
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
                                <div className="table-container listing-table">
                                  <table class="table table-borderless">
                                    <thead>
                                      <tr>
                                        <th scope="col">Price</th>
                                        <th scope="col">USD Price</th>
                                        <th scope="col">Expiration</th>
                                        <th scope="col">From</th>
                                        <th scope="col">{""}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">0.025</th>
                                        <td>$77.50</td>
                                        <td>in a day</td>
                                        <td>BBC1B3</td>
                                        <td>
                                          <button>Buy</button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-11 col-md-12 col-lg-7 col-xl-5 order-1 order-md-2 mx-auto mb-5 mb-md-0  mx-md-0">
                      <div className="collection-filter-accordion nft-stats-accordion">
                        <div
                          className="accordion accordion-flush "
                          id="accordionFlushExample"
                        >
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="flush-headingFour"
                            >
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
                              <div className="accordion-body">
                                <div className="row g-2 justify-content-center align-items-center">
                                  {propertiesData &&
                                    propertiesData.map((data) => {
                                      return (
                                        <div className="col-6 col-sm-4 col-md-6">
                                          <div className="properties-content-container d-flex flex-column justify-content-center align-items-center text-center">
                                            <div className="properties-content">
                                              <span>{data.subTitle}</span>
                                              <h3>{data.title}</h3>
                                              <p>{data.content}</p>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="flush-headingSix"
                            >
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
                            <h2
                              className="accordion-header"
                              id="flush-headingNine"
                            >
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
                      <Card.Img
                        variant="top"
                        src={nftDetail.image}
                        alt="AuctionTopImg"
                      />
                    </div>
                    <Card.Body>
                      <div>
                        <span>Current price</span>
                        <h3>
                          {nftDetail.currentPrice}
                          <span>($2.28)</span>
                        </h3>
                      </div>
                      <div className=" d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                          <img
                            src={ClockIcon}
                            alt="clock-icon"
                            className="me-1"
                          />
                          <span>Sale ends March 8, 2022 at 7:40am PKT </span>
                        </div>
                        <div className="likes-container d-flex align-items-center">
                          <span>{nftDetail.likeCount?nftDetail.likeCount:0}</span>
                          <img
                            src={HeartIcon}
                            alt="heart-icon"
                            className="ms-1"
                          />
                        </div>
                      </div>
                      <button className="btn btn-linear-gradient d-flex align-items-center justify-content-center w-75 mx-auto" onClick={()=>handleRouting()}>
                        <p>{ENV.getUserKeys("_id")._id ===nftDetail?.ownerId?"Sell":"Buy Now"}</p>
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
                    <p>{nftDetail.description}</p>
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
                            <div className="table-container">
                              <table class="table table-borderless">
                                <thead>
                                  <tr>
                                    <th scope="col">Event</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">From</th>
                                    <th scope="col">To</th>
                                    <th scope="col">Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">List</th>
                                    <td>0.025</td>
                                    <td>BBC1B3</td>
                                    <td> </td>
                                    <td>an hour ago</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">List</th>
                                    <td>0.025</td>
                                    <td>BBC1B3</td>
                                    <td> </td>
                                    <td>an hour ago</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">List</th>
                                    <td>0.025</td>
                                    <td>BBC1B3</td>
                                    <td> </td>
                                    <td>an hour ago</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">List</th>
                                    <td>0.025</td>
                                    <td>BBC1B3</td>
                                    <td> </td>
                                    <td>an hour ago</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">List</th>
                                    <td>0.025</td>
                                    <td>BBC1B3</td>
                                    <td> </td>
                                    <td>an hour ago</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">List</th>
                                    <td>0.025</td>
                                    <td>BBC1B3</td>
                                    <td> </td>
                                    <td>an hour ago</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">List</th>
                                    <td>0.025</td>
                                    <td>BBC1B3</td>
                                    <td> </td>
                                    <td>an hour ago</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">List</th>
                                    <td>0.025</td>
                                    <td>BBC1B3</td>
                                    <td> </td>
                                    <td>an hour ago</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id="flush-headingEleven"
                        >
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
                              {nftsList &&
                                nftsList.length > 0 ?
                                nftsList.map((listing) => {
                                  return (
                                    <div className="col-6 col-sm-6 col-md-4 col-lg-2 px-1">
                                      <ListingCards
                                        CardImg={listing.image}
                                        name={listing.name}
                                        price={listing.currentPrice}
                                        id={listing._id}
                                      />
                                    </div>
                                  );
                                }):<p className="text-center mt-4">No NFTs Found</p>
                              }
                            </div>
                            <div className="mt-4 detail-btn-collection text-center">
                              {nftsList.length > 0 && (
                                <button className="btn btn-rounded-bordered">
                                  View collection
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        {/* ///////////////////////////////////// Modal */}
        <div className="modal-wrapper">
                    {
                        false &&
                        <Modal
                            centered
                            size="lg"
                            // className="place-bid-modal"
                            show={true}
                            // onHide={this.closeModal}
                        >
                            <Modal.Header className="text-center modal-title-wrapper text-white">
                                <Modal.Title>
                                    { 2=== 2 ? 'Place A Bid' : 'Make An Offer'}
                                </Modal.Title>
                            </Modal.Header>
                            {/* {
                                isSubmitted && errors &&
                                <Modal.Body className="row pt-2 pb-0">
                                    <div className="col-12">
                                        <span id="nft-err" className="form-error-msg text-danger">{errors}</span>
                                    </div>
                                </Modal.Body>
                            } */}
                            <Modal.Body >
                                <div className="price-wrapper d-flex">
                                    <div className="price-text position-relative">
                                        <div className="text-white mb-2 absolute-wrapper">
                                            <b>Price</b>
                                        </div>
                                        <div className="text-right mb-2">
                                            <i className="fas fa-exclamation-circle ml-2 text-white" />
                                        </div>
                                        <div className="d-flex">
                                            <select className="form-control currency-options" id="currency" name="nftConfig.price.currency" onChange={(e) => this.onChange(e)}>
                                                {
                                                    currencies && currencies.map((currency, index) => {
                                                        return (
                                                            <option key={index} value={currency.symbol}>{currency.symbol}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <input type="text" placeholder="Amount" className="amount-btn ml-3" name="nftConfig.price.amount" placeholder="Amount" className="amount-btn ml-3" style={{ borderRadius: "4px" }} onChange={(e) => this.onChange(e)} onKeyDown={(e) => decimalNumberValidator(e)} defaultValue={nftConfig.price.amount} required />
                                            <div className="text-right mb-2 dollar-wrapper">
                                                $ 0.00
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Body className="text-danger">{validator.message('amount', nftConfig.price.amount, 'required')}</Modal.Body>
                            {/* <Modal.Body className="" style={{ flexDirection: "column", display: "block", height: "200px" }}>
                                <div className="offer-expiration-wrapper text-white">
                                    <b>Offer Expiration</b>
                                </div>
                                <div>
                                    <div className="d-flex">
                                        <select className="form-control" id="expiryDate" name="nftConfig.expiry.date" onChange={(e) => this.onChange(e)}
                                            style={{
                                                padding: "7px 55px 7px 55px",
                                                border: "none",
                                                outline: "none",
                                                borderRadius: "4px",
                                                background: "#808080",
                                                display: "flex",
                                                alignItems: "center",
                                                cursor: "pointer",
                                                height: "51px",
                                                color: "#000"
                                            }}
                                        >
                                            {
                                                expiryOptions && expiryOptions.map((expiry, index) => {
                                                    return (
                                                        <option key={index} value={expiry.value}>{expiry.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <div>
                                            <div className="mr-auto budle-wrapper">
                                                <input type={nftConfig.expiry.type === 1 ? "time" : "datetime-local"} style={{ marginLeft: "1rem", width: "552px" }} name="nftConfig.expiry.time" value={nftConfig.expiry.time} onChange={(e) => this.onChange(e)} required />
                                            </div>
                                            <span className="text-danger message">{validator.message('amount', nftConfig.price.amount, 'required')}</span>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body> */}
                            <Modal.Body className="justify-content-center align-items-center">
                                <div className="d-flex justify-content-around place-bid-btn">
                                    <button className="ethereum-btn mr-3 place-bid-ethereum-btn"
                                     disabled={loader} 
                                    // onClick={() => this.submit()}
                                    >{2 === 2 ? initData.bidBtn : initData.bidBtn}</button>
                                    {/* <button className="ethereum-btn">Add funds</button> */}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    className="btn banner-btn btn-primary"
                                    // onClick={this.closeModal}
                                >
                                    Close
                                </button>
                            </Modal.Footer>
                        </Modal>
                    }
                </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => (
  console.log(state, "state in nft detail=>"),
  {
    nftDetail: state.nft.nftsData,
    nftsAuth: state.nft.nftsAuth,
    nftsByCollection: state.nft.nftsByCollection,
    nftsByCollectionStatus: state.nft.nftsByCollectionStatus,
  }
);

export default connect(mapStateToProps, {
  getNFT,
  getNFTsByCollection,
})(NFTDetail);
