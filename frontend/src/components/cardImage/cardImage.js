import { useState } from "react";
import ImageLoader from "../contentLoader/imageLoader";
import { Card, Image } from "react-bootstrap";

const CardImage = ({ image, index }) => {
  const [loader, setLoader] = useState(true);
  return (
    <>
      {
        <>
          {/* <div style={{ display: `${loader ? "block" : "none"}` }}> */}
          {index % 2 == 0 ? (
            <ImageLoader />
          ) : (
            <Card.Img
              variant="top"
              onLoad={() => setLoader(false)}
              src={image}
              alt="AuctionTopImg"
              style={{ display: `${!loader ? "block" : "none"}` }}
            />
          )}
          {/* </div> */}
          {/* <Card.Img
            variant="top"
            onLoad={() => setLoader(false)}
            src={image}
            alt="AuctionTopImg"
            style={{ display: `${!loader ? "block" : "none"}` }}
          /> */}
        </>
      }
    </>
  );
};
export default CardImage;
