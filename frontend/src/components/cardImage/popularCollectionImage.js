import { useState } from "react";
import ImageLoader from "../contentLoader/imageLoader";
const PopularCollectionImg = ({ image, index }) => {
  const [loader, setLoader] = useState(true);
  return (
    <>
      {index % 2 === 0 ? (
        <ImageLoader />
      ) : (
        <div className="col-12 collection-mainImg">
          <img src={image}   onLoad={() => setLoader(false)} alt="card-img" />
        </div>
      )}
    </>
  );
};
export default PopularCollectionImg
