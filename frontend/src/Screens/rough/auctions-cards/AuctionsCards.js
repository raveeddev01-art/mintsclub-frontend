import React from "react";
import { Card } from "react-bootstrap";
import CardImg from "../../../assets/images/cl-cr-mainimg.png";
import AvatarImg from "../../../assets/images/seller-avatar.png";
import HeartIcon from "../../../assets/images/heart-icon.svg";
import ThreeDots from "../../../assets/images/threeDots.svg";
import ArrowUp from "../../../assets/images/arrowUp.png";
import Bucket from "../../../assets/images/bucket.png";
import Countdown from "react-countdown";
import { ENV } from "../../../config/config";

import "./AuctionsCard.css";

const AuctionsCards = () => {
  const { countDownRenderer } = ENV;
  return (
    <Card className="auction-card mx-1">
      <Card.Img variant="top" src={CardImg} alt="AuctionTopImg" />
      <Card.Body>
        <div className="mb-3">
          <Countdown date="2022/1/26 13:10:12" renderer={countDownRenderer} />
        </div>
        <div className="auction-card-avatar-container d-flex align-items-center justify-content-between">
          <div className="auction-card-avatar d-flex align-items-center">
            <img src={AvatarImg} alt="AvatarImg" />
            <img src={AvatarImg} alt="AvatarImg" className="avatar-img1" />
            <img src={AvatarImg} alt="AvatarImg" className="avatar-img2" />
            <span className="ms-4">9+ Place Bit</span>
          </div>

          <div className="options-icon">
            <img src={ThreeDots} alt="OptionsIcon" />
          </div>
        </div>
        <Card.Title>Music</Card.Title>
        <div className="auction-card-owner-container d-flex justify-content-between align-items-center mb-2">
          <div className="auction-owner-name">
            <p>Owend by Jecica</p>
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

export default AuctionsCards;
