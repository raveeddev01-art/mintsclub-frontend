import React from "react";
import "./nftinfo.css";

const StatsInfo = ({ name, value }) => {
  return (
    <>
      <div className="nft-info-container">
        <div className="stats-info-container">
          <div className="stats-content">
            <h6>{name}</h6>
          </div>
          <div className="stats-content">
            <h6>{value} of 5</h6>
          </div>
        </div>
      </div>
    </>
  );
};
export default StatsInfo;
