import React from "react";
import "./nftinfo.css";

const PropertiesInfo = ({ name, type }) => {
  return (
    <>
      <div className="nft-propinfo-container">
        <div className="properties-content">
          <h6>{name.length>5?name.slice(0,5)+"...":name}:</h6>
          <p>{type.length>5?type.slice(0,5)+"...":type}</p>
        </div>
      </div>
    </>
  );
};
export default PropertiesInfo;
