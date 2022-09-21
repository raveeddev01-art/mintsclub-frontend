import React from 'react';
import { Link } from "react-router-dom";
import { Images } from "../../assets/assets";
import "./BuySell.scss";

const Buysell = () => {
  return (
    <section className="buy-sell-section padding-wrapper">
      <div className="container">
        <div className="row ">
          <div className="col-sm-6">
            <div className="buy-card d-md-flex align-items-center">
              <div className="buy-card-img d-flex">
                <img src={Images.buyNft} alt="buy-logo" className="mx-auto" />
              </div>
              <div className="buy-card-content">
                <h5>Buy NFT Products</h5>
                <p>Purchase digital NFT products from the biggest directory.</p>
                <div className="d-flex justify-content-lg-end justify-content-center">
                  <Link
                    className="btn btn-rounded-bordered btn-start-selling text-right"
                    to="/explore/allNFT"
                  >
                    Start buying
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="sell-card d-md-flex align-items-center">
              <div className="buy-card-img d-flex">
                <img src={Images.sellNft} alt="buy-logo" className="mx-auto" />
              </div>
              <div className="buy-card-content ">
                <h5>Sell Your NFT Products</h5>
                <p>Sell one of your NFT products to make a huge profit.</p>
                <div className="d-flex justify-content-lg-end justify-content-center">
                  <Link
                    className="btn btn-rounded-bordered btn-start-selling"
                    to="/userprofile"
                  >
                    Start selling
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Buysell;
