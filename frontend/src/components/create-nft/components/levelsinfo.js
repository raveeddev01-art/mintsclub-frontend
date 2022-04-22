import React from "react";
import "./nftinfo.css";

const LevelsInfo = ({ name, value }) => {
  return (
    <>
      <div className="nft-info-container">
        <div className="content-heading">
          <h6>{name}</h6>
        </div>
        <div className="levels-info-container">
          <div className="levels-content">
            <div className="level-filled"></div>
            <div className="level-filled"></div>
            <div className="level-filled"></div>
            <div className="level-unfilled"></div>
            <div className="level-unfilled"></div>
          </div>
          <div className="stats-content">
            <h6>{value} of 5</h6>
          </div>
        </div>
      </div>
    </>
  );
};
export default LevelsInfo;
