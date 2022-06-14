import { useState } from "react";
import ImageLoader from "../contentLoader/imageLoader";
import { Card } from "react-bootstrap";

const AuctionCardImage = ({ image, index }) => {
  const [loader, setLoader] = useState(true);
console.log(index,"indexauctions")
  return (
    <>
      {index % 2 === 0 ? (
        <ImageLoader />
      ) : (
        <Card.Img variant="top"   onLoad={() => setLoader(false)} src={image} alt="AuctionTopImg" />

      )}
    </>
  );
};
export default AuctionCardImage;
