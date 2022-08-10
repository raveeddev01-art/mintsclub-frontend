import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";

import { ENV } from "../../config/config";
import useVideoPlayer from "../test-video-card/components/useVideoPlayer";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import placeholderImg from "../../assets/images/placeholder.png";

import { connect } from "react-redux";
import "./nft-card.css";
import { Images } from "../../assets/assets";
import ImageLoader from "../contentLoader/imageLoader";
import Audio from "../audio/audio";
const NFTCard = (props) => {
  const history = useHistory();
  const videoElement = React.useRef(null);
  const { playerState, togglePlay, handleOnTimeUpdate } =
    useVideoPlayer(videoElement);
  const [loader, setLoader] = useState(true);
  const {
    image,
    name,
    _id,
    fileType,
    cardBg,
    ownerId,
    likeCount,
    currentPrice,
    copies,
    remainingCopies,
    ownerAddress,
  } = props.data;
  const { username, profileImage, profilePhoto } = props?.owner;
  const user = ENV.getUserKeys("_id")?._id;
  const { likedNfts } = props;
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
    <Card className={`auction-card nft-card ${cardBg} m-1 mx-auto mx-sm-1`}>
      <div className="auction-img-wrapper">
        {fileType === "image" ? (
          <>
            <div style={{ display: `${loader ? "block" : "none"}` }}>
              <ImageLoader />
            </div>
            <Card.Img
              variant="top"
              onLoad={() => setLoader(false)}
              onClick={() => history.push(`${props.path}${_id}`)}
              src={image}
              alt="AuctionTopImg"
              style={{ display: `${!loader ? "block" : "none"}` }}
            />
          </>
        ) : fileType === "video" ? (
          <div className="card-img-top">
            <div className="video-wrapper">
              <div style={{ display: `${loader ? "block" : "none"}` }}>
                <ImageLoader />
              </div>
              <video
                id="video1"
                src={image}
                ref={videoElement}
                onTimeUpdate={handleOnTimeUpdate}
                onEnded={() => {
                  togglePlay();
                }}
                onCanPlay={() => {
                  setLoader(false);
                }}
                style={{ display: `${!loader ? "block" : "none"}` }}
              />

              <div className="controls">
                <div className="actions">
                  <button
                    className="play-pause-btn d-flex align-items-center justify-content-center"
                    onClick={togglePlay}
                  >
                    {playerState.isPlaying ? (
                      <BsFillPauseFill />
                    ) : (
                      <BsFillPlayFill />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : fileType === "audio" ? (
          <>
            <div style={{ display: `${loader ? "block" : "none"}` }}>
              <ImageLoader />
            </div>
            <Audio
              src={image}
              onLoadCallback={() => setLoader(false)}
              loader={loader}
              fileType={fileType}
            />
          </>
        ) : (
          " "
        )}
      </div>
      <Card.Body>
        <Card.Title>
          <div>
            {name && name.length > 25 ? name.slice(0, 25) + "..." : name}
          </div>
          <div className="auction-owner-price d-flex align-items-center">
            <span className="me-2">{likeCount ? likeCount : 0}</span>
            {!validateIfLiked(likedNfts, _id) ? (
              <img
                src={Images.whiteEmptyHeart}
                alt=""
                onClick={() => {
                  props.handleLikesTogleApi(_id, "like", likeCount);
                }}
              />
            ) : (
              <img
                src={Images.whiteFillHeart}
                alt=""
                onClick={() => {
                  props.handleLikesTogleApi(_id, "dislike", likeCount);
                }}
              />
            )}
          </div>
        </Card.Title>
        <div className="nft-status ">
          <div className="status-info status-sold">
            <span className="status">
              Sold:{" "}
              <span className="status-count">{copies - remainingCopies}</span>{" "}
            </span>
          </div>
          <div className="status-info status-remaining">
            <span className="status">
              Remaining: <span className="status-count">{remainingCopies}</span>{" "}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <span className="nft-price mt-2">
            <img className="me-2" src={Images.nftPriceTag} />
            Price:<a className="price ms-1">{currentPrice} ETH</a>
          </span>
        </div>
        <div className="auction-card-owner-container d-flex align-items-center mb-2 mt-3">
          <div className="auction-owner-avatar">
            <img
              src={
                !profilePhoto && !profileImage
                  ? placeholderImg
                  : profilePhoto
                  ? profilePhoto
                  : profileImage
              }
              alt="avatar"
            />
          </div>
          <div className="ms-2 auction-owner-name">
            <p>
              {"Owned by:"}
              <span className="text-capitalize ms-1">
                {ownerAddress?.toUpperCase() ===
                props.connectedAddress?.toUpperCase()
                  ? "You"
                  : username && username?.length > 25
                  ? username.substring(0, 25) + "..."
                  : username?.length <= 25
                  ? username
                  : "unnamed"}
              </span>
            </p>
          </div>
        </div>
        <button
          className="auction-bit-btn"
          onClick={() => history.push(`${props.path}${_id}`)}
        >
          {"View Detail"}
        </button>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(NFTCard);
