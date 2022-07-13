import React, { useState } from "react";
import { useHistory } from "react-router";
import ImageLoader from "../contentLoader/heroLoader";

import "./HeroCards.css";

const HeroCards = ({ auction }) => {
  const { image, totalBids, owner, _id } = auction;
  const [loader,setLoader]=useState(true)
  const history = useHistory();
  return (
    <div className="hero-new-card">
      <div className="hero-img-container">
      <div style={{ display: `${loader ? "block" : "none"}` }}>
              <ImageLoader />
            </div>
        <img src={image} onLoad={()=>setLoader(false)} alt="heroImg"   style={{ display: `${!loader ? "block" : "none"}` }}/>
        <div className="hero-owner text-center">
          <p>
            Owned by:{" "}
            <span className="text-capitalize">
              {owner?.username ? owner.username : "unnamed"}
            </span>
          </p>
        </div>
        <button
          className="hero-btn-bid cursor-pointer"
          onClick={() => history.push(`/explore/nftdetail/${_id}`)}
        >
          View Detail
        </button>
      </div>
      <div className="hero-placed-bid text-center">
        <h6>
          {totalBids > 0 ? `${totalBids}+ People placed Bid` : "No Bids Found"}
        </h6>
      </div>
    </div>
  );
};

export default HeroCards;
