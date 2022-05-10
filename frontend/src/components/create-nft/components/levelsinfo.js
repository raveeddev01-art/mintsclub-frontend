import React from "react";
import "./nftinfo.css";

const LevelsInfo = ({ name, value }) => {
  const filled = () => {
    let filledArray=[]
    for (let i = 1; i <= value; i++) {
      filledArray.push( <div className="level-filled"></div>)
    }
    return filledArray
  };

  const unFilled = () => {
    let unFilledArray=[]
    for (let i = 1; i <= 5-value; i++) {
       unFilledArray.push( <div className="level-unfilled"></div>)
    }
    return unFilledArray
  };
  return (
    <>
      <div className="nft-info-container">
        <div className="content-heading">
        <h6>{name.length>8?name.slice(0,8)+"...":name}</h6>
        </div>
        <div className="levels-info-container">
          <div className="levels-content">
            {filled()}
            {unFilled()}
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
