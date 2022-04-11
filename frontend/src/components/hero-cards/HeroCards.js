import React from 'react';
import { Card } from 'react-bootstrap';
import AvatarImg from '../../assets/images/seller-avatar.png';
import ThreeDots from '../../assets/images/threeDots.svg';
import ArrowUp from '../../assets/images/arrowUp.png';
import Bucket from '../../assets/images/bucket.png';
import './HeroCards.css';
import { Images } from '../../assets/assets';

const HeroCards = ({
  CardImg,
  NftName,
  OwnerName,
  HighestBid,
  BidsProfile,
  TotalBids,
}) => {
  return (
    <Card className='auction-card hero-card mx-2'>
      <div className='auction-img-wrapper'>
        <Card.Img variant='top' src={CardImg} alt='AuctionTopImg' />
      </div>
      <Card.Body className='d-flex flex-column'>
        <div className='hero-card-title-container d-flex align-items-center justify-content-between'>
          <Card.Title>{NftName}</Card.Title>
          <div className='options-icon'>
            <img src={ThreeDots} alt='OptionsIcon' />
          </div>
        </div>
        <div className='auction-card-avatar d-flex align-items-center mb-4'>
          {BidsProfile &&
            BidsProfile.length > 0 &&
            BidsProfile.map((item, i) => {
              if (i <= 2) {
                return (
                  <img
                    src={item === null ? Images.profilePic : item}
                    alt='AvatarImg'
                  />
                );
              }
            })}
          <span className='ms-4'>
            {TotalBids > 0 ? TotalBids + '+ People Place Bid' : 'No Bid Found'}
          </span>
        </div>

        <div className='auction-card-owner-container d-flex justify-content-between align-items-center mb-2'>
          <div className='auction-owner-name'>
            <p>
              {'Owned by '}
              {OwnerName && OwnerName.length > 8
                ? OwnerName.substring(0, 6) + '...'
                : OwnerName}
            </p>
          </div>
          <div className='d-flex align-items-center'>
            <img src={ArrowUp} alt='' className='me-1' />
            <span>{HighestBid}</span>
          </div>
        </div>
        <button className='auction-bit-btn d-flex align-items-center justify-content-center'>
          <img src={Bucket} alt='' className='me-1' />
          <p>Place a Bid</p>
        </button>
      </Card.Body>
    </Card>
  );
};

export default HeroCards;
