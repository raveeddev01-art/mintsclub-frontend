import React, { useRef } from "react";
import { useHistory } from "react-router";
import { Card } from "react-bootstrap";
import HeartIcon from "../../assets/images/unlike-icon.svg";
import { AiFillHeart } from "react-icons/ai";
import "./videoCard.css";
import useVideoPlayer from "./components/useVideoPlayer";
import { ENV } from "../../config/config";

const VideoCards = ({
  CardImg,
  handleLikesTogleApi,
  id,
  name,
  price,
  likesCount,
  liked,
  likedNfts,
  ownerId,
  sellingMethod,
  userProfile,
  auctionStartDate,
  auctionEndDate
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
 
 
   
  const checkIfAuctionStartedorEnded = (startDate, endDate) => {
    if (startDate !== null || endDate !== null) {
      let currentDate = new Date();
      let auctionStartDate = new Date(startDate);
      let auctionEndDate = new Date(endDate);

      if (
        auctionStartDate.setHours(0, 0, 0, 0) <=
          currentDate.setHours(0, 0, 0, 0) &&
        auctionEndDate.setHours(0, 0, 0, 0) >= currentDate.setHours(0, 0, 0, 0)
      ) {
        return true;
      }
    } else {
      return false;
    }
  };
  const videoElement = useRef(null);
  const { playerState, togglePlay, handleOnTimeUpdate } =
    useVideoPlayer(videoElement);

  return (
    <Card className="auction-card listing-card">
      <div className="auction-img-wrapper">
        <div className="card-img-top">
          <div className="video-wrapper">
            <video
              src={CardImg}
              ref={videoElement}
              onTimeUpdate={handleOnTimeUpdate}
            />
            <div className="controls">
              <div className="actions">
                <button className="play-pause-btn" onClick={togglePlay}>
                  {playerState.isPlaying ? (
                    <i className="fa fa-play"></i>
                  ) : (
                    <i className="fa fa-pause"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="listing-card-title-container d-flex align-items-center justify-content-between">
          <Card.Title onClick={() => history.push(`/nftdetail/${id}`)}>
            {name ? name : "item name"}
          </Card.Title>
          {!userProfile && (
            <div className="options-icon like-icon text-white">
              {validateIfLiked(likedNfts, id) ? (
                <div className="heart-filled-container d-flex align-items-end">
                  <AiFillHeart
                    className="heart-fill-icon "
                    onClick={() => {
                      handleLikesTogleApi(id, "dislike", likesCount);
                      setToggle(!toggle);
                    }}
                  />{" "}
                  <p> {likesCount ? likesCount : 0} </p>
                </div>
              ) : (
                <div className="heart-filled-container d-flex align-items-end">
                  <img
                    src={HeartIcon}
                    alt="OptionsIcon"
                    onClick={() => {
                      handleLikesTogleApi(id, "like", likesCount);
                      setToggle(!toggle);
                    }}
                  />
                  <p className="ms-1"> {likesCount ? likesCount : 0} </p>
                </div>
              )}
            </div>
          )}
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
        <button
          className="auction-bit-btn listing-buy-btn d-flex align-items-center justify-content-center"
          onClick={() => history.push(`/nftdetail/${id}`)}
        >
           <p>
            {ownerId === ENV.getUserKeys("_id")._id || !sellingMethod || !checkIfAuctionStartedorEnded(auctionStartDate,auctionEndDate)
              ? "View"
              : sellingMethod === 2
              ? "Place Bid"
              : "Buy Now"}
          </p>
        </button>
      </Card.Body>
    </Card>
  );
};

export default VideoCards;
