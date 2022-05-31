import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";

import { ENV } from "../../config/config";
import useVideoPlayer from "../test-video-card/components/useVideoPlayer";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { connect } from "react-redux";
import "./nft-card.css";
import { Images } from "../../assets/assets";

const NFTCard = (props) => {

  const history = useHistory();
  const videoElement = React.useRef(null);
  const { playerState, togglePlay, handleOnTimeUpdate } =
    useVideoPlayer(videoElement);
  const {
    image,
    name,
    _id,
    fileType,
    owner,
    cardBg,
    userId,
    ownerId,
    likeCount,
    sellingMethod,
    auctionStartDate,
    auctionEndDate,
    currentPrice
  } = props.data;
  const { username, profilePhoto } = owner;
  const {likedNfts}=props
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
  return (
    <Card className={`auction-card nft-card ${cardBg} mx-2`}>
      <div className="auction-img-wrapper">
        {fileType === "image" ? (
          <Card.Img variant="top" src={image} alt="AuctionTopImg" />
        ) : (
          <div className="card-img-top">
            <div className="video-wrapper">
              <video
                src={image}
                ref={videoElement}
                onTimeUpdate={handleOnTimeUpdate}
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
        )}

        <div className="auction-countdown d-flex flex-column justify-content-center align-items-center">
          {/* <Countdown date={auctionEndDate} renderer={countDownRenderer} /> */}
          {/* <div className="auction-card-avatar-container d-flex align-items-center justify-content-between">
            <div className="auction-card-avatar d-flex align-items-center">
              {bidsProfile &&
                bidsProfile.length > 0 &&
                bidsProfile.map((item, i) => {
                  if (i <= 2) {
                    return (
                      <img
                        src={item === null ? Images.profilePlaceholder : item}
                        alt="AvatarImg"
                      />
                    );
                  }
                })}

              <span className="ms-4">
                {totalBids === 0
                  ? "No Bids Found"
                  : totalBids < 4
                  ? totalBids + " People Placed Bid"
                  : totalBids - 1 + "+ People Placed Bid"}
              </span>
            </div>
          </div> */}
        </div>
      </div>
      <Card.Body>
        <Card.Title>
          <div>
            {name && name.length > 10 ? name.slice(0, 10) + "..." : name}
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
          <div className="status-info mt-2 status-sold">
            <span className="status">
              Sold: <span className="status-count">323</span>{" "}
            </span>
          </div>
          <div className="status-info status-remaining ">
            <span className="status">
              Remaining: <span className="status-count">323</span>{" "}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <span className="nft-price mt-2">
            <img className="me-2" src={Images.nftPriceTag} />
            Price:<a className="price">{currentPrice} ETH</a>
          </span>
        </div>
        <div className="auction-card-owner-container d-flex align-items-center mb-2 mt-3">
          <div className="auction-owner-avatar">
            <img src={profilePhoto} alt="avatar" />
          </div>
          <div className="ms-2 auction-owner-name">
            <p>
              {"Owned by "}
              <span>
                {username && username.length > 8
                  ? username.substring(0, 6) + "..."
                  : username}
              </span>
            </p>
          </div>
        </div>
        <button
          className="auction-bit-btn"
          onClick={() => history.push(`nftdetail/${_id}`)}
        >
           {"View Detail"}
        </button>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) =>
  // console.log(state, "state in nfts"),
  ({});

export default connect(mapStateToProps, {})(NFTCard);
