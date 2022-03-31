import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import CardImg from "../../assets/images/cl-cr-mainimg.png";
import AvatarImg from "../../assets/images/seller-avatar.png";
import HeartIcon from "../../assets/images/heart-icon.svg";
import ThreeDots from "../../assets/images/threeDots.svg";
import ArrowUp from "../../assets/images/arrowUp.svg";
import Bucket from "../../assets/images/bucket.png";
import Countdown from "react-countdown";
import { ENV } from "../../config/config";
import useVideoPlayer from "../test-video-card/components/useVideoPlayer";

import { connect } from "react-redux";

import "./AuctionsCard.css";
import { propTypes } from "react-recaptcha";

const AuctionsCards = (props) => {
  const { countDownRenderer } = ENV;
  const history = useHistory();
  const { userId, ownerId } = props;
  const videoElement = React.useRef(null);
  const { playerState, togglePlay, handleOnTimeUpdate } =
    useVideoPlayer(videoElement);
  return (
    <Card className="auction-card mx-2">
      <div className="auction-img-wrapper">
        <Card.Img variant="top" src={props.image} alt="AuctionTopImg" />

        {/* InCaseOfVideoCard */}
        {/* <div className="card-img-top">
          <div className="video-wrapper">
            <video
              src={props.image}
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
                    <i className="fa fa-pause"></i>
                  ) : (
                    <i className="fa fa-play"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <div className="auction-countdown">
          <Countdown date={props.endDate} renderer={countDownRenderer} />
        </div>
      </div>
      <Card.Body>
        <div className="auction-card-avatar-container d-flex align-items-center justify-content-between">
          <div className="auction-card-avatar d-flex align-items-center">
            <img src={AvatarImg} alt="AvatarImg" />
            <img src={AvatarImg} alt="AvatarImg" className="avatar-above-img" />
            <img src={AvatarImg} alt="AvatarImg" className="avatar-above-img" />
            <span className="ms-4">9+ Place Bit</span>
          </div>

          <div className="options-icon">
            <img src={ThreeDots} alt="OptionsIcon" />
          </div>
        </div>
        <Card.Title onClick={() => history.push(`nftdetail/${props.id}`)}>
          {props.name}
        </Card.Title>
        <div className="auction-card-owner-container d-flex justify-content-between align-items-center mb-2">
          <div className="auction-owner-name">
            <p>
              {"Owned by "}
              {props.ownerName.length > 8
                ? props.ownerName.substring(0, 6) + "..."
                : props.ownerName}
            </p>
          </div>
          <div className="auction-owner-price d-flex align-items-center">
            <img src={ArrowUp} alt="" className="me-1" />
            <span>68.4 ETH</span>
          </div>
        </div>
        <button
          className="auction-bit-btn d-flex align-items-center justify-content-center"
          onClick={() => history.push(`nftdetail/${props.id}`)}
        >
          <img src={Bucket} alt="" className="me-1" />

          <p>{userId === ownerId ? "View" : "Place a Bid"}</p>
        </button>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) =>
  // console.log(state, "state in nfts"),
  ({});

export default connect(mapStateToProps, {})(AuctionsCards);
