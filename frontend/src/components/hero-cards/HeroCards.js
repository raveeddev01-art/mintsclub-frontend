import React from "react";
import "./HeroCards.css";


const HeroCards = ({auction}) => {
  const {image,totalBids,owner}=auction;
  console.log(auction,"image")
  return (
    <div className="hero-new-card">
      <div className="hero-img-container">
        <img src={image} alt="heroImg" />
        <div className="hero-owner text-center">
          <p>Owned by:{owner?.username?owner.username:"unnamed"}</p>
        </div>
        <button className="hero-btn-bid">Place a bid</button>
      </div>
      <div className="hero-placed-bid text-center">
        <h6>{totalBids}+ People Place Bid</h6>
      </div>
    </div>
  );
};

export default HeroCards;
