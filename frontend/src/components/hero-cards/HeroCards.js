import React from "react";
import { Card } from "react-bootstrap";
import AvatarImg from "../../assets/images/seller-avatar.png";
import ThreeDots from "../../assets/images/threeDots.svg";
import ArrowUp from "../../assets/images/arrowUp.png";
import Bucket from "../../assets/images/bucket.png";
import "./HeroCards.css";

const HeroCards = ({ CardImg, NftName, OwnerName }) => {
  return (
    <Card className="auction-card hero-card mx-2">
      <div className="auction-img-wrapper">
        <Card.Img variant="top" src={CardImg} alt="AuctionTopImg" />
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="hero-card-title-container d-flex align-items-center justify-content-between">
          <Card.Title>{NftName}</Card.Title>
          <div className="options-icon">
            <img src={ThreeDots} alt="OptionsIcon" />
          </div>
        </div>
        <div className="auction-card-avatar d-flex align-items-center mb-4">
          <img src={AvatarImg} alt="AvatarImg" />
          <img src={AvatarImg} alt="AvatarImg" className="avatar-above-img" />
          <img src={AvatarImg} alt="AvatarImg" className="avatar-above-img" />
          <span className="ms-4">9+ People Place Bit</span>
        </div>

        <div className="auction-card-owner-container d-flex justify-content-between align-items-center mb-2">
          <div className="auction-owner-name">
            <p>Owend by {OwnerName}</p>
          </div>
          <div className="d-flex align-items-center">
            <img src={ArrowUp} alt="" className="me-1" />
            <span>68.4 ETH</span>
          </div>
        </div>
        <button className="auction-bit-btn d-flex align-items-center justify-content-center">
          <img src={Bucket} alt="" className="me-1" />
          <p>Place a Bit</p>
        </button>
      </Card.Body>
    </Card>
  );
};

export default HeroCards;
