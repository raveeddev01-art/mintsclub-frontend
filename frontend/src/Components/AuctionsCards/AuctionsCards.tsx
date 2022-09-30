import React, { useState, FC } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ArrowUp from '../../assets/images/arrowUp.svg';
import Countdown from 'react-countdown';
import { ENV } from '../../config/config';
import useVideoPlayer from '../TestVideoCard/Components/UseVideoPlayer';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import './AuctionsCard.scss';
import { Images } from '../../assets/assets';
import ImageLoader from '../ContentLoader/ImageLoader';
import AuctionAudio from '../AuctionAudio/AuctionAudio';
import { AuctionCardInterface } from '../../interfaces/components';

const AuctionsCards: FC<AuctionCardInterface> = ({
  ownerName,
  userId,
  bidsProfile,
  item,
  cardBg,
  key,
  connectedAddress
}) => {
  const { countDownRenderer } = ENV;
  const history = useHistory();
  const videoElement = React.useRef(null);
  const { playerState, togglePlay } = useVideoPlayer(videoElement);
  const [loader, setLoader] = useState<any>(true);
  const {
    nftImage,
    auctionEndDate,
    nftName,
    _id,
    nftId,
    highestBid,
    Totalbids,
    currentPrice,
    fileType,
    ownerAddress,
    username,
    profilePhoto
  } = item;

  return (
    <Card key={key} className={`auction-card ${cardBg} mx-auto mx-sm-2`}>
      <div className='auction-img-wrapper'>
        {fileType === 'image' ? (
          <>
            <div style={{ display: `${loader ? 'block' : 'none'}` }}>
              <ImageLoader />
            </div>
            <Card.Img
              variant='top'
              onLoad={() => setLoader(false)}
              onClick={() => history.push(`explore/nftdetail/${nftId}`)}
              src={nftImage}
              alt='AuctionTopImg'
              style={{ display: `${!loader ? 'block' : 'none'}` }}
            />
          </>
        ) : fileType === 'video' ? (
          <div className='card-img-top'>
            <div className='video-wrapper'>
              <div style={{ display: `${loader ? 'block' : 'none'}` }}>
                <ImageLoader />
              </div>

              <video
                src={nftImage}
                onEnded={() => {
                  togglePlay();
                }}
                onCanPlay={() => {
                  setLoader(false);
                }}
                ref={videoElement}
                // onTimeUpdate={handleOnTimeUpdate}
                style={{ display: `${!loader ? 'block' : 'none'}` }}
                onClick={() => history.push(`explore/nftdetail/${nftId}`)}
              />

              <div className='controls'>
                <div className='actions'>
                  <button
                    className='play-pause-btn d-flex align-items-center justify-content-center'
                    onClick={togglePlay}
                  >
                    {playerState.isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : fileType === 'audio' ? (
          <>
            <div style={{ display: `${loader ? 'block' : 'none'}` }}>
              <ImageLoader />
            </div>

            <AuctionAudio src={nftImage} onLoadCallback={() => setLoader(false)} loader={loader} onClick={() => history.push(`explore/nftdetail/${nftId}`)}
            />
          </>
        ) : (
          ' '
        )}
        <div className='auction-countdown d-flex flex-column justify-content-center align-items-center'>
          <Countdown date={auctionEndDate} renderer={countDownRenderer} />
          <div className='auction-card-avatar-container d-flex align-items-center justify-content-between'>
            <div className='auction-card-avatar d-flex align-items-center'>
              {bidsProfile &&
                bidsProfile.length > 0 &&
                bidsProfile.map((item: any, i: any) => {
                  return (
                    <img
                      src={item.bidByProfile === null ? Images.placeholderImg : !item.bidByProfile ? Images.placeholderImg : item.bidByProfile}
                      alt='Avatar'
                      key={i}
                    />
                  );
                })}
              <span className={`${Totalbids === 0 ? '' : 'ms-4'}`}>
                {Totalbids === 0
                  ? 'No Bids Found'
                  : Totalbids < 4
                  ? Totalbids + ' People Placed Bid'
                  : Totalbids - 1 + '+ People Placed Bid'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Card.Body>
        <Card.Title onClick={() => history.push(`explore/nftdetail/${nftId}`)}>
          <div>{nftName && nftName.length > 10 ? nftName.slice(0, 10) + '...' : nftName}</div>
          <div className='auction-owner-price d-flex align-items-center'>
            <img src={ArrowUp} alt='' className='me-1' />
            <span>{Totalbids > 0 ? highestBid : currentPrice}</span>
          </div>
        </Card.Title>
        <div className='auction-card-owner-container d-flex align-items-center mb-2'>
          <div className='auction-owner-avatar'>
            <img src={profilePhoto ? profilePhoto : Images.placeholderImg} alt='avatar' />
          </div>
          <div className='ms-2 auction-owner-name'>
            <p>
              {'Owned by:'}
              <span className='text-capitalize ms-1'>
                {!username
                  ? 'unnamed'
                  : connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase()
                  ? 'You'
                  : username && username.length > 12
                  ? username.substring(0, 12) + '....'
                  : username}
              </span>
            </p>
          </div>
        </div>
        <button className='auction-bit-btn' onClick={() => history.push(`explore/nftdetail/${nftId}`)}>
          {connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase() || !userId ? 'View' : 'Place a Bid'}
        </button>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state: any) => ({
  connectedAddress: state.wallet.connectedAddress
});

export default connect(mapStateToProps, {})(AuctionsCards);
