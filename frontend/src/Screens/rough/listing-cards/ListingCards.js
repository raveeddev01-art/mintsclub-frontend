import React from "react";
import { Card } from "react-bootstrap";
import CardImg from "../../../assets/images/cl-cr-mainimg.png";
import HeartIcon from "../../../assets/images/unlike-icon.svg";
import "./ListingCards.css";

const ListingCards = ({ CardImg ,handleLikesTogleApi,id}) => {
  return (
    <Card className="auction-card listing-card">
      <div className="auction-img-wrapper">
        <Card.Img variant="top" src={CardImg} alt="AuctionTopImg" />
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="hero-card-title-container d-flex align-items-center justify-content-between">
          <Card.Title>Item Name</Card.Title>
          <div className="options-icon like-icon">
            <img src={HeartIcon} alt="OptionsIcon" onClick={()=>handleLikesTogleApi(id)}  />
          </div>
        </div>

        <div className="auction-card-owner-container d-flex justify-content-between align-items-center mb-2">
          <div className="auction-owner-name">
            <p>Price</p>
          </div>
          <div className="d-flex align-items-center">
            <span>68.4 ETH</span>
          </div>
        </div>
        <button className="auction-bit-btn listing-buy-btn d-flex align-items-center justify-content-center">
          <p>Buy now</p>
        </button>
      </Card.Body>
    </Card>
  );
};

export default ListingCards;
