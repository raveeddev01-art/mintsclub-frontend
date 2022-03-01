import React from "react";
import { useHistory } from "react-router";
import { Card } from "react-bootstrap";
import CardImg from "../../assets/images/cl-cr-mainimg.png";
import HeartIcon from "../../assets/images/unlike-icon.svg";
import { AiFillHeart } from "react-icons/ai";
import "./ListingCards.css";
import { ENV } from "../../config/config";

const ListingCards = ({
  CardImg,
  handleLikesTogleApi,
  id,
  name,
  price,
  likesCount,
  liked,
  likedNfts,
  userProfile,
  ownerId
}) => {
  const history = useHistory();
  const [toggle, setToggle] = React.useState(true);
  React.useEffect(() => {
    return () => "";
  }, [toggle]);

  const validateIfLiked = (likedNfts1, id) => {
    if (likedNfts && likedNfts?.length > 0) {
      let result = likedNfts.find((item) => item.nftId == id);
      if (result) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <Card className="auction-card listing-card">
      <div
        className="auction-img-wrapper"
        onClick={() => history.push(`/nftdetail/${id}`)}
      >
        <Card.Img variant="top" src={CardImg} alt="AuctionTopImg" />
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="listing-card-title-container hero-card-title-container d-flex align-items-center justify-content-between">
          <Card.Title onClick={() => history.push(`/nftdetail/${id}`)}>
            {name ? name : "item name"}
          </Card.Title>
          {!userProfile &&
          <div className="options-icon like-icon text-white">
          
            { validateIfLiked(likedNfts, id) ? (
              <div className="heart-filled-container d-flex align-items-end">
                <AiFillHeart
                  className="heart-fill-icon "
                  onClick={() => {
                    handleLikesTogleApi(id, "dislike");
                    setToggle(!toggle);
                  }}
                />{" "}
                <p> {likesCount ? likesCount : 0} </p>
              </div>
            ) : (
              <img
                src={HeartIcon}
                alt="OptionsIcon"
                onClick={() => {
                  handleLikesTogleApi(id, "like");
                  setToggle(!toggle);
                }}
              />
            )}
          </div>
          }
        </div>

        <div
          className="auction-card-owner-container d-flex justify-content-between align-items-center mb-2"
          onClick={() => history.push(`/nftdetail/${id}`)}
        >
          <div className="auction-owner-name">
            <p>Price</p>
          </div>
          <div className="d-flex align-items-center">
            <span>{price} ETH</span>
          </div>
        </div>
        <button className="auction-bit-btn listing-buy-btn d-flex align-items-center justify-content-center">
          <p>{ownerId===ENV.getUserKeys("_id")._id?"View":"Buy Now"}</p>
        </button>
      </Card.Body>
    </Card>
  );
};

export default ListingCards;
