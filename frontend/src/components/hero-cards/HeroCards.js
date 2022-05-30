import React from "react";
import { Card } from "react-bootstrap";
import AvatarImg from "../../assets/images/seller-avatar.png";
import ThreeDots from "../../assets/images/threeDots.svg";
import ArrowUp from "../../assets/images/arrowUp.png";
import Bucket from "../../assets/images/bucket.png";
import "./HeroCards.css";
import { Images } from "../../assets/assets";
import OwnerBg from "../../assets/images/heroownerbg.png";

const HeroCards = ({
  CardImg,
  NftName,
  OwnerName,
  HighestBid,
  BidsProfile,
  TotalBids,
}) => {
  return (
    <div className="hero-new-card">
      <div className="hero-img-container">
        <img src={CardImg} alt="heroImg" />
        <div className="hero-owner text-center">
          <p>Owned by: Steve Jackson</p>
        </div>
        <button className="hero-btn-bid">Place a bid</button>
      </div>
      <div className="hero-placed-bid text-center">
        <h6>9+ People Place Bid</h6>
      </div>
    </div>
  );
};

export default HeroCards;
