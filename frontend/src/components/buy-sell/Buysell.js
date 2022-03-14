import React from "react";
import { Link } from "react-router-dom";
import BuyIcon from "../../assets/images/buy-icon.svg";
import SellIcon from "../../assets/images/sell-icon.svg";
import "./Buysell.css";

const Buysell = () => {
  return (
    <section className="buy-sell-section padding-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="buy-card d-md-flex align-items-center">
              <div className="buy-card-img d-flex">
                <img src={BuyIcon} alt="buy-logo" className="mx-auto" />
              </div>
              <div className="buy-card-content px-2">
                <h5>Buy NFT Products</h5>
                <p>Purchase digital NFT products from the biggest directory.</p>
                <Link
                  className="btn btn-rounded-bordered btn-start-selling"
                  to="/"
                >
                  Start buying
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-5 mt-sm-0 col-sm-6">
            <div className="sell-card d-md-flex align-items-center">
              <div className="buy-card-img d-flex">
                <img src={SellIcon} alt="buy-logo" className="mx-auto" />
              </div>
              <div className="buy-card-content px-2">
                <h5>Sell Your NFT Products</h5>
                <p>Sell one of your NFT products to make a huge profit.</p>
                <Link
                  className="btn btn-rounded-bordered btn-start-selling"
                  to="/"
                >
                  Start selling
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Buysell;
