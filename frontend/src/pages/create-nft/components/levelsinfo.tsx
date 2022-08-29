import React,{FC} from "react";
import "./nftinfo.scss";
import { LevelsInfoInterface } from "../../../interfaces/components";

const LevelsInfo:FC<LevelsInfoInterface> = ({ name, value,i }) => {
  const filled = () => {
    let filledArray = [];
    for (let i = 1; i <= value; i++) {
      filledArray.push(<div className="level-filled"></div>);
    }
    return filledArray;
  };

  const unFilled = () => {
    let unFilledArray = [];
    for (let i = 1; i <= 5 - value; i++) {
      unFilledArray.push(<div className="level-unfilled"></div>);
    }
    return unFilledArray;
  };
  return (
    <>
      <div className="nft-info-container mx-1 mt-3" key={i}>
        <div className="content-heading  d-flex align-items-center justify-content-between">
          <p>
            <span>Level Name: </span>
            {name.length > 8 ? name.slice(0, 8) + "..." : name}
          </p>
          <div className="stats-content">
            <p>{value} of 5</p>
          </div>
        </div>
        <div className="levels-info-container mt-2">
          <div className="levels-content">
            {filled()}
            {unFilled()}
          </div>
        </div>
      </div>
    </>
  );
};
export default LevelsInfo;
