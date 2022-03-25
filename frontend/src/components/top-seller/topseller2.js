import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ENV } from './../../config/config';
import { getTopSellers, beforeUser } from './../user/user.action';
import ViewAllIcon from '../../assets/images/view-all-arrow.svg';
import AvatarImg from '../../assets/images/seller-avatar.png';
import SellerTickIcon from '../../assets/images/seller-tick-icon.svg';
import './topseller.css';

const exmpData = [
  {
    id: 1,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 2,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 3,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 4,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 5,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 6,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 7,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 8,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 9,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 10,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 11,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
  {
    id: 12,
    img: AvatarImg,
    icon: SellerTickIcon,
    authorName: 'Pablo-Shing',
    price: '256.4 ETH',
  },
];

const TopSeller = (props) => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    props.getTopSellers();
  }, []);

  useEffect(() => {
    if (props.user.topSellersAuth) {
      setSellers(props.user.sellers.topSellers);
    }
  }, [props.user.topSellersAuth]);

  return (
    <section className='top-seller-area padding-wrapper'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            {/* Intro */}
            <div className='intro d-flex justify-content-between align-items-end m-0'>
              <div className='intro-content'>
                <span>CREATIVE ARTIST</span>
                <h3 className='mb-0'>Top Sellers</h3>
              </div>
              {props.viewAll ? (
                <div className='intro-btn'>
                  <Link
                    className='btn btn-rounded-bordered btn-viewAll'
                    to='/top-sellers-list'
                  >
                    {props.viewAll}
                    <img src={ViewAllIcon} alt='arrow-left' className='ms-2' />
                  </Link>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className='row items'>
          {sellers && sellers.length ? (
            sellers.map((author, idx) => {
              return (
                <div
                  key={`ts_${idx}`}
                  className='col-12 col-sm-6 col-lg-4 col-xl-3 item top-seller-cards'
                >
                  {/* Single Seller */}
                  <div className='card'>
                    <div className='single-seller d-flex align-items-center'>
                      <Link to={`/author/${author._id}`}>
                        <div className='seller-avatar-container'>
                          <img
                            className='avatar-md rounded-circle'
                            //   src={
                            //     author.profileImage
                            //       ? author.profileImage
                            //       : ENV.globalPlaceholderImage
                            //   }
                            src={AvatarImg}
                            alt=''
                          />
                          <span className='seller-avatar-active'>
                            <img src={SellerTickIcon} alt='tick-icon' />
                          </span>
                        </div>
                      </Link>
                      {/* Seller Info */}
                      <div className='seller-info ml-3 w-100'>
                        <Link
                          className='seller mb-2'
                          to={`/author/${author._id}`}
                        >
                          {author.username}
                        </Link>
                        <span className='text-end'>{'256.6ETH'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Top Sellers not available</p>
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { beforeUser, getTopSellers })(
  TopSeller
);
