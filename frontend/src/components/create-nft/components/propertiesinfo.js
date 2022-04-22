import React from "react";
import "./nftinfo.css";

const PropertiesInfo = ({ name, type }) => {
  return (
    <>
      <div className="nft-propinfo-container">
        <div className="properties-content">
          <h6>{name}:</h6>
          <p>{type}</p>
        </div>
      </div>
    </>
  );
};
export default PropertiesInfo;
