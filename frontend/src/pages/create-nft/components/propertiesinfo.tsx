import React ,{FC} from "react";
import "./nftinfo.scss";
import { PropertiesInfoInterface } from "../../../interfaces/components";
const PropertiesInfo:FC<PropertiesInfoInterface>  = ({ name, type }) => {
  return (
    <>
      <div className="nft-propinfo-container mx-1">
        <div className="properties-content">
          <p>
            <span>Type: </span>
            {type.length > 5 ? type.slice(0, 5) + "..." : type}
          </p>
          <p>
            <span>Name: </span>
            {name.length > 5 ? name.slice(0, 5) + "..." : name}
          </p>
        </div>
      </div>
    </>
  );
};
export default PropertiesInfo;
