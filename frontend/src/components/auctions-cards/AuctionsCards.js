import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import ThreeDots from "../../assets/images/threeDots.svg";
import ArrowUp from "../../assets/images/arrowUp.svg";
import Bucket from "../../assets/images/bucket.png";
import Countdown from "react-countdown";
import { ENV } from "../../config/config";
import useVideoPlayer from "../test-video-card/components/useVideoPlayer";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { connect } from "react-redux";
import "./AuctionsCard.css";
import { Images } from "../../assets/assets";

const AuctionsCards = ({ ownerName, userId, ownerId, bidsProfile, item }) => {
  const { countDownRenderer } = ENV;
  const history = useHistory();
  const videoElement = React.useRef(null);
  const { playerState, togglePlay, handleOnTimeUpdate } =
    useVideoPlayer(videoElement);
  const {
    image,
    auctionEndDate,
    name,
    _id,
    highestBid,
    totalBids,
    currentPrice,
    fileType,
  } = item;
  return (
    <Card className="auction-card mx-2">
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

        <div className="auction-countdown">
          <Countdown date={auctionEndDate} renderer={countDownRenderer} />
        </div>
      </div>
      <Card.Body>
        <div className="auction-card-avatar-container d-flex align-items-center justify-content-between">
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
                ? totalBids + " People Place Bid"
                : totalBids - 1 + "+ People Place Bid"}
            </span>
          </div>

          {/* <div className="options-icon">
            <img src={ThreeDots} alt="OptionsIcon" />
          </div> */}
        </div>
        <Card.Title onClick={() => history.push(`nftdetail/${_id}`)}>
          {name}
        </Card.Title>
        <div className="auction-card-owner-container d-flex justify-content-between align-items-center mb-2">
          <div className="auction-owner-name">
            <p>
              {"Owned by "}
              {ownerName.length > 8
                ? ownerName.substring(0, 6) + "..."
                : ownerName}
            </p>
          </div>
          <div className="auction-owner-price d-flex align-items-center">
            <img src={ArrowUp} alt="" className="me-1" />
            <span>{totalBids > 0 ? highestBid : currentPrice}</span>
          </div>
        </div>
        <button
          className="auction-bit-btn d-flex align-items-center justify-content-center"
          onClick={() => history.push(`nftdetail/${_id}`)}
        >
          <img src={Images.placeBid} alt="" className="me-2" />

          <p >{userId === ownerId ? "View" : "Place a Bid"}</p>
        </button>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) =>
  // console.log(state, "state in nfts"),
  ({});

export default connect(mapStateToProps, {})(AuctionsCards);
