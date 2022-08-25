import React, { useState, FC } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import useVideoPlayer from "../TestVideoCard/Components/UseVideoPlayer";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import placeholderImg from "../../assets/images/placeholder.png";
import { connect } from "react-redux";
import "./NftCard.scss";
import { Images } from "../../assets/assets";
import ImageLoader from "../ContentLoader/ImageLoader";
import Audio from "../Audio/Audio";
import { NFTCardInt } from "../../interfaces/components";
const NFTCard: FC<NFTCardInt> = (props) => {
  const history = useHistory();
  const videoElement = React.useRef(null);
  const { playerState, togglePlay } = useVideoPlayer(videoElement);
  const [loader, setLoader] = useState<any>(true);
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
  const { likedNfts } = props;
  const validateIfLiked = (likedNfts1: any, id: string) => {
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
    <Card className={`nft-card ${cardBg} m-1 mx-auto mx-sm-1`}>
      <div className="nft-img-wrapper">
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
              onLoadCallback={() => {
                setLoader(false);
                return false;
              }}
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
            {name && name.length > 15 ? name.slice(0, 10) + "..." : name}
          </div>
          <div className="nft-owner-price d-flex align-items-center">
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
        <div className="nft-card-owner-container d-flex align-items-center mb-2 mt-3">
          <div className="nft-owner-avatar">
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
          <div className="ms-2 nft-owner-name">
            <p>
              {"Owned by:"}
              <span className="text-capitalize ms-1">
                {ownerAddress?.toUpperCase() ===
                props.connectedAddress?.toUpperCase()
                  ? "You"
                  : username && username?.length > 19
                  ? username.substring(0, 19) + "..."
                  : username?.length <= 19
                  ? username
                  : "unnamed"}
              </span>
            </p>
          </div>
        </div>
        <button
          className="nft-bit-btn"
          onClick={() => history.push(`${props.path}${_id}`)}
        >
          {"View Detail"}
        </button>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(NFTCard);
