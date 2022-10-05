import React, { useState, useEffect, useContext } from 'react';
import './SellNFT.scss';
import { ENV } from '../../config/config';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import { decimalNumberValidator } from '../../utils/functions';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  openNFTForBidding,
  putonsale,
  getWalletAddress,
  setApprovalForAll,
  validateNetwork,
  createVoucher,
} from '../../utils/web3';
import { toast } from 'react-toastify';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import useVideoPlayer from '../../Components/TestVideoCard/Components/UseVideoPlayer';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import ApprovalModal from '../../Components/Modals/ApprovalModal/ApprovalModal';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg.png';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import SellNFTLoader from '../../Components/ContentLoader/SellNFTLoader';
import Audio from '../../Components/Audio/Audio';
import { useHistory } from 'react-router';
import { sellNFTBanner } from '../../utils/exportData';
import { useGetNFTbyId } from '../../hooks/AllNFTs';
import { useInsertData, useEditData } from '../../hooks/Common';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';

const { dateRangeInitialSettings } = ENV;
const SellNFT = (props: any) => {
  const [activeBtn, setActiveBtn] = useState<any>(0);
  const [toggle, setToggle] = React.useState<boolean>(true);
  const [sellingMethod, setSellingMethod] = useState<number>(1); // 1 = Fixed Price, 2 = Timed Auction
  const [fixedPriceConfig, setFixedPriceConfig] = useState<any>({
    price: {
      currency: ENV.currency,
      amount: '',
    },
  });
  const [timedAuctionConfig, setTimedAuctionConfig] = useState<any>({
    startPrice: {
      currency: ENV.currency,
      amount: '',
    },
    duration: {
      startDate: moment(),
      endDate: moment().add(6, 'months'),
      startTime: moment(new Date()).format('HH:mm'),
      endTime: '23:59',
    },
  });

  const [nftDetail, setNftDetail] = useState<any>('');
  const [loader, setLoader] = useState<boolean>(true); // NFT loader
  const location: any = useLocation();
  const [copies, setCopies] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [approvalStatus, setApprovalStatus] = useState<string>('not-approved');
  const [address, setAddress] = useState<string>(props.connectedAddress);
  const [copiesError, setCopiesError] = useState<boolean>(false);
  const [contentLoader, setContentLoader] = useState<boolean>(true);
  const { setError } = useContext(errorHandler);
  const history = useHistory();
  let nftId = props.match.params.id;

  const videoElement = React.useRef(null);
  const { playerState, togglePlay } = useVideoPlayer(videoElement);
  //Get NFT
  const onSuccessNFT = (data: any) => {
    if (data.data.success) {
      if (copies === '') {
        setLoader(false);
        setNftDetail(data?.data?.data);
      }
    } else {
      setError(data.data.message);
    }
  };
  const { isLoading: isLoadingNFT } = useGetNFTbyId(nftId, onSuccessNFT);

  //Create Activity
  const onInsertData = () => {};
  const { mutate: insertActivity } = useInsertData(
    'activity/create',
    onInsertData
  );

  const { isLoading: isInsertingAuction, mutate: insertAuction } =
    useInsertData('auctions/create', () => {
      toast.success('Auction created successfully');
      history.push(`/userprofile`);
    });

  //Edit Profile

  const { mutate: updateProfile } = useEditData(
    'users/updateProfile',
    () => console.log(),
    () => console.log()
  );

  useEffect(() => {
    if (address === '') {
      setAddress(props.connectedAddress);
    }
    if (
      props.connectedAddress !== '' &&
      address !== '' &&
      ENV.getUserKeys('address')?.address?.toUpperCase() !==
        props.connectedAddress.toUpperCase()
    ) {
      toast.info('Please login with new connected account');
      return history.push({
        pathname: `/connect-wallet`,
        state: `/sellnft`,
      });
    }
  }, [props.connectedAddress]);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    let data = null;

    if (sellingMethod === 1) {
      data = fixedPriceConfig;
    } else {
      data = timedAuctionConfig;
    }

    const keys = name.split('.');

    if (keys && keys[2]) {
      data[keys[1]][keys[2]] = value;
    } else if (keys && keys[1]) data[keys[1]] = value;

    if (sellingMethod === 1) {
      setFixedPriceConfig({ ...data });
    } else {
      setTimedAuctionConfig({ ...data });
    }
  };
  //onSubmit
  const submit = async (e: any) => {
    e.preventDefault();
    if (copies > nftDetail.copies) {
      if (Number(nftDetail.copies) === 1) {
        toast.info(`Copies should be equal to ${nftDetail.copies}`);
      } else {
        toast.info(
          `Copies should be less than or equal to ${nftDetail.copies}`
        );
      }
      return '';
    }
    if (await validateNetwork()) {
      if (!nftDetail?.user?.isApproved) {
        setShow(true);
        return "";
      }

      let price: any = '';
      let payload: object = {};

      let timedConfig = { ...timedAuctionConfig };

      let fixedConfig = { ...fixedPriceConfig };
      const { _id, ownerId } = nftDetail;

      let activityPayload = {
        nftId: _id,
        ownerId,
        fromAddress: await getWalletAddress(),
        activityType: 'List',
      };

      if (sellingMethod === 2) {
        if (Number(timedConfig.startPrice.amount) === 0) {
          toast.error('Price should be greater then 0');
          return '';
        }
        let timedAuctionStartTime = new Date(timedConfig.duration.startDate);
        let timedAuctionEndTime = new Date(timedConfig.duration.endDate);
        //calculate end time
        timedConfig.duration.endDate = calclateStartOrEndTime(
          timedAuctionEndTime,
          timedConfig.duration.endTime
        );

        //calculate start time
        timedConfig.duration.startDate = calclateStartOrEndTime(
          timedAuctionStartTime,
          timedConfig.duration.startTime
        );

        //Deleting unused data from payload
        let auctionConfig = timedConfig;
        delete auctionConfig.duration.startTime;
        delete auctionConfig.duration.endTime;
        delete auctionConfig.method;
        price = Number(auctionConfig.startPrice.amount);
        auctionConfig.startPrice.amount = Number(
          auctionConfig.startPrice.amount
        );
        payload = {
          nftId: location.state._id,
          userId: ENV.getUserKeys('_id')._id,
          sellingMethod,
          sellingConfig: JSON.stringify(auctionConfig),
          copiesForAuction: copies,
        };
      } else {
        price = Number(fixedConfig.price.amount);
        if (price === 0) {
          toast.error('Price should be greater then 0');
          return '';
        }
        payload = {
          nftId: location.state._id,
          sellingMethod,
          sellingConfig: JSON.stringify(fixedConfig),
          copiesForAuction: copies,
        };
      }

      setLoader(true);

      if (sellingMethod === 2) {
        openBidding(timedAuctionConfig, payload, activityPayload, price);
      } else {
        openForSale(activityPayload, payload, fixedConfig, price);
      }
    } else {
      toast.error('Please Connect Your Metamask With Ethereum Rinkby Network');
    }
  };

  //Open for Bidding/Auction

  const openBidding = async (
    timedAuctionConfig: any,
    payload: any,
    activityPayload: any,
    price: any
  ) => {
    var formData = new FormData();
    try {
      let auctionEndDate = timedAuctionConfig.duration.endDate;
      let auctionStartDate = timedAuctionConfig.duration.startDate;

      const biddingTime = new Date(auctionEndDate).getTime();
      const startTime = new Date(auctionStartDate).getTime();

      let result = await openNFTForBidding(
        biddingTime,
        startTime,
        nftDetail?.tokenId,
        copies
      );
      if (result) {
        activityPayload.price = price;
        payload.sellId = Number(result);
        for (const key in payload) formData.append(key, payload[key]);
        insertActivity(activityPayload);
        insertAuction(payload);
      }
    } catch (err: any) {
      setLoader(false);
      toast.error(err);
    }
  };
  //Open for fixed price
  const openForSale = async (
    activityPayload: any,
    payload: any,
    fixedConfig: any,
    price: any
  ) => {
    var formData = new FormData();
    try {
      let res = null;
      if (nftDetail?.lazyMinted) {
        res = await createVoucher(
          nftDetail.tokenId,
          copies,
          nftDetail.metaData,
          price
        );
        if (!res.success) {
          setLoader(false);
          toast.error(res.data.message);
          return false;
        }
      } else {
        res = await putonsale(
          nftDetail.tokenId,
          copies,
          fixedConfig.price.amount
        );
      }

      if (res) {
        activityPayload.price = price;
        payload.sellId = Number(nftDetail.lazyMinted ? nftDetail.tokenId : res);
        if (nftDetail.lazyMinted) {
          payload.signature = res.data;
        }
        for (const key in payload) formData.append(key, payload[key]);
        insertActivity(activityPayload);
        insertAuction(formData);
      }
    } catch (err: any) {
      console.log(err, 'error');
      setLoader(false);
      toast.error(err);
    }
  };
  const calclateStartOrEndTime = (auctionConfig: any, startOrEndTime: any) => {
    let time = auctionConfig.toString();
    time = time.slice(0, 15) + ' ' + startOrEndTime + ':00' + time.slice(24);
    return time;
  };
  const handleDateChange = (e: any, picker: any) => {
    const { name } = e.target;
    const { startDate, endDate } = picker;

    // set start date
    onChange({
      target: {
        name: `${name}.startDate`,
        value: startDate,
      },
    });

    // set end date
    onChange({
      target: {
        name: `${name}.endDate`,
        value: endDate,
      },
    });
  };

  //Approve account

  const approveAccount = async () => {
    setApprovalStatus('pending');
    var formData: any = new FormData();
    formData.append('isApproved', true);
    formData.append('userId', nftDetail.user._id);
    try {
      let accApproved = await setApprovalForAll(setApprovalStatus);
      if (accApproved) {
        let updatedNFTDetail = { ...nftDetail };
        updatedNFTDetail.user.isApproved = true;
        setNftDetail(updatedNFTDetail);
        updateProfile(formData);
        setApprovalStatus('approved');
        toast.success('Your Account is Approved!.');
        return '';
      }
    } catch (err) {
      setApprovalStatus('not-approved');
      return '';
    }
  };

  const { image, name, description, remainingCopies, fileType } = nftDetail;
  return (
    <>
      <Banner
        subHeading={sellNFTBanner.subHeading}
        heading={sellNFTBanner.heading}
        content={sellNFTBanner.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      {isLoadingNFT || isInsertingAuction || (loader && <FullPageLoader />)}
      <section className='padding-wrapper sell-nft new-nft-detail '>
        <div className='container'>
          <div className='row g-4 g-xl-5'>
            <div className='col-12'>
              <div className='row g-4'>
                <div className=' col-lg-6 col-xl-5'>
                  {fileType === 'image' ? (
                    <div className='nft-img-container mx-auto mx-lg-0'>
                      <div
                        style={{
                          display: `${contentLoader ? 'block' : 'none'}`,
                        }}
                      >
                        <SellNFTLoader />
                      </div>
                      <img
                        src={image}
                        alt='nft-image'
                        onLoad={() => setContentLoader(false)}
                        style={{
                          display: `${!contentLoader ? 'block' : 'none'}`,
                        }}
                      />
                    </div>
                  ) : fileType === 'video' ? (
                    <div className='card-img-top'>
                      <div className='nft-img-container nft-video-container mx-auto mx-lg-0'>
                        <div
                          style={{
                            display: `${contentLoader ? 'block' : 'none'}`,
                          }}
                        >
                          <SellNFTLoader />
                        </div>
                        <video
                          src={image}
                          ref={videoElement}
                          // onTimeUpdate={handleOnTimeUpdate}
                          onEnded={() => {
                            togglePlay();
                          }}
                          onCanPlay={() => {
                            setContentLoader(false);
                          }}
                          style={{
                            display: `${!contentLoader ? 'block' : 'none'}`,
                          }}
                        />
                        <div className='controls'>
                          <div className='actions'>
                            <button
                              className='play-pause-btn d-flex align-items-center justify-content-center'
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
                  ) : fileType === 'audio' ? (
                    <>
                      <div
                        style={{
                          display: `${contentLoader ? 'block' : 'none'}`,
                        }}
                      >
                        <SellNFTLoader />
                      </div>
                      <Audio
                        src={image}
                        onLoadCallback={async () => setContentLoader(false)}
                        loader={contentLoader}
                        fileType={''}
                      />
                    </>
                  ) : (
                    ' '
                  )}
                </div>
                <div className='col-lg-6 col-xl-7'>
                  <div className='nft-img-detail'>
                    <h5>NFT Details:</h5>
                  </div>
                  <div className='nft-img-detail-box'>
                    <div className='nft-detail-rounded-box'>
                      <p>
                        {name && name.length > 30
                          ? name.slice(0, 30) + '...'
                          : name}
                      </p>
                    </div>
                    <div className='row g-2 g-sm-4'>
                      <div className='col-6 col-sm-4 col-lg-6 col-xl-4'>
                        <div className='nft-detail-rounded-box mb-0'>
                          <p>
                            Total Copies: <span>{nftDetail?.copies}</span>
                          </p>
                        </div>
                      </div>
                      <div className='col-6 col-sm-4 col-lg-6 col-xl-4 '>
                        <div className='nft-detail-rounded-box mb-0'>
                          <p>
                            Sold:{' '}
                            <span>{nftDetail?.copies - remainingCopies}</span>
                          </p>
                        </div>
                      </div>
                      <div className='col-6 col-sm-4 col-lg-6 col-xl-4'>
                        <div className='nft-detail-rounded-box mb-0'>
                          <p>
                            Remaining: <span>{remainingCopies}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='detail-bg-box nft-img-detail'>
                      <h5>Description:</h5>
                      <hr />
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12'>
              <div className='sale-btn-container mt-5'>
                <button
                  className={` ${
                    activeBtn === 0 ? 'sell-btn-active' : 'sell-btn-not-active'
                  }  me-3 `}
                  onClick={() => {
                    setActiveBtn(0);
                    setSellingMethod(1);
                    setCopies('');
                    setCopiesError(false);
                  }}
                >
                  Fixed Price
                </button>
                {nftDetail && !nftDetail?.lazyMinted && (
                  <button
                    className={` ${
                      activeBtn === 1
                        ? 'sell-btn-active'
                        : 'sell-btn-not-active'
                    } `}
                    onClick={() => {
                      setActiveBtn(1);
                      setSellingMethod(2);
                      setCopies('');
                      setCopiesError(false);
                    }}
                  >
                    Timed Auction
                  </button>
                )}
              </div>
            </div>
            {activeBtn === 0 ? (
              <form onSubmit={submit}>
                <div className='row g-4 g-xl-5'>
                  <div className='col-md-6'>
                    <div className='sell-detail-box'>
                      <h5>Price:*</h5>
                      <hr />
                      <div className='sell-inp-container d-flex align-items-center'>
                        <input
                          type='text'
                          name='fixedPriceConfig.price.amount'
                          placeholder='Amount'
                          style={{
                            borderRadius: '4px',
                          }}
                          maxLength={8}
                          onChange={(e) => {
                            if (e.target.value == '00') {
                              return '';
                            }
                            onChange(e);
                          }}
                          onKeyDown={(e) => decimalNumberValidator(e)}
                          value={fixedPriceConfig.price.amount}
                          required
                          autoComplete='off'
                        />
                        <div className='inp-tag'>ETH</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='sell-detail-box'>
                      <h5>
                        No of Copies:*{' '}
                        {copiesError && (
                          <span className='text-danger ms-2 error-msg'>{`This NFT has only ${remainingCopies} copies`}</span>
                        )}
                      </h5>
                      <hr />
                      <div className='sell-inp-container d-flex align-items-center'>
                        <input
                          type='number'
                          name='copies'
                          placeholder='Copies'
                          style={{
                            borderRadius: '4px',
                          }}
                          min={'1'}
                          onChange={(e: any) => {
                            if (+e.target.value > remainingCopies) {
                              setCopiesError(true);
                              return false;
                            }
                            if (
                              (e.target.value == 0 && copies === '') ||
                              e.target.value.includes('.')
                            ) {
                              return false;
                            }
                            setCopiesError(false);
                            setCopies(e.target.value);
                          }}
                          onKeyDown={(e) => decimalNumberValidator(e)}
                          value={copies}
                          required
                          autoComplete='off'
                        />
                        <div className='inp-tag'>Copies</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='sell-detail-box'>
                      <h5>Fees:</h5>
                      <hr />
                      <div className='fee-details d-flex align-items-center justify-content-between'>
                        <div>
                          <p>
                            Service Fee:
                            <span className='ms-2'>2.5%</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            Creator Royalty:
                            <span className='ms-2'>2.5%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='sell-btn-container d-flex justify-content-center justify-content-lg-start'>
                    <button
                      className='btn btn-linear-gradient sell-btn-completed'
                      type='submit'
                    >
                      Complete Listing
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={submit}>
                <div className='row g-4 g-xl-5'>
                  <div className='col-md-6'>
                    <div className='sell-detail-box'>
                      <h5>Price:*</h5>
                      <hr />
                      <div className='sell-inp-container d-flex align-items-center'>
                        <input
                          type='text'
                          name='timedAuctionConfig.startPrice.amount'
                          placeholder='Amount'
                          maxLength={8}
                          style={{
                            borderRadius: '4px',
                          }}
                          onChange={(e: any) => {
                            if (e.target.value === '00') {
                              return false;
                            } else {
                              onChange(e);
                            }
                          }}
                          onKeyDown={(e) => decimalNumberValidator(e)}
                          value={timedAuctionConfig.startPrice.amount}
                          required
                          autoComplete='off'
                        />
                        <div className='inp-tag'>ETH</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='sell-detail-box'>
                      <h5>
                        No of Copies:*{' '}
                        {copiesError && (
                          <span className='text-danger ms-2 error-msg'>{`This NFT has only ${remainingCopies} copies`}</span>
                        )}
                      </h5>
                      <hr />
                      <div className='sell-inp-container d-flex align-items-center'>
                        <input
                          type='number'
                          name='copies'
                          placeholder='Copies'
                          maxLength={3}
                          style={{
                            borderRadius: '4px',
                          }}
                          min={'1'}
                          max={`${nftDetail.copies}`}
                          onChange={(e: any) => {
                            if (+e.target.value > remainingCopies) {
                              setCopiesError(true);
                              return false;
                            }
                            if (
                              (e.target.value == 0 && copies === '') ||
                              e.target.value.includes('.')
                            ) {
                              return false;
                            }
                            setCopiesError(false);

                            setCopies(e.target.value);
                          }}
                          onKeyDown={(e) => decimalNumberValidator(e)}
                          value={copies}
                          required
                          autoComplete='off'
                        />
                        <div className='inp-tag'>Copies</div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='sell-detail-box'>
                      <h5>Duration:</h5>
                      <hr />
                      <div className='sell-date-picker'>
                        {/* @ts-ignore */}
                        <DateRangePicker
                          initialSettings={dateRangeInitialSettings}
                          minDate={moment().toDate()}
                          onApply={handleDateChange}
                        >
                          <button
                            name='timedAuctionConfig.duration'
                            className='calender-btn'
                            type='button'
                          >
                            {moment(
                              timedAuctionConfig.duration.startDate
                            ).format('MMMM D, YYYY')}{' '}
                            -{' '}
                            {moment(timedAuctionConfig.duration.endDate).format(
                              'MMMM D, YYYY'
                            )}
                            &nbsp;&nbsp;&nbsp;
                            <svg
                              width='21'
                              height='17'
                              viewBox='0 0 21 17'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M21 1.54739V16.5821C20.8581 16.8395 20.6576 17 20.3179 17C15.0009 16.9966 9.68439 16.9956 4.3682 16.997C3.94412 16.997 3.69482 16.7648 3.69318 16.3732C3.69318 15.8887 3.69318 15.4043 3.69318 14.9193V14.7311H3.4395C2.51682 14.7311 1.59413 14.7311 0.671455 14.7311C0.36079 14.7311 0.139436 14.5973 0.0430038 14.3622C-0.0534283 14.127 0.0123195 13.9024 0.24025 13.7172C0.775972 13.2754 1.23759 12.7628 1.61002 12.1962C3.00993 10.1145 3.62742 7.82482 3.68769 5.39843C3.71783 4.19078 3.69427 2.98162 3.69591 1.77297C3.69591 1.35764 3.94083 1.13306 4.39285 1.13256C5.32905 1.13256 6.26525 1.13256 7.20144 1.13256H7.42773C7.42773 0.94886 7.42773 0.791913 7.42773 0.635469C7.42773 0.254957 7.68251 -0.00342589 8.04851 0.000106718C8.41451 0.00363932 8.65504 0.258494 8.65778 0.627399C8.65778 0.793936 8.65778 0.960974 8.65778 1.12196H11.7338C11.7338 0.948862 11.7338 0.786868 11.7338 0.624368C11.7338 0.256977 11.9874 0.00162069 12.3458 0.000106718C12.7041 -0.00140725 12.96 0.252436 12.9633 0.619322C12.9633 0.786869 12.9633 0.953911 12.9633 1.11792H16.0803C16.0803 0.933724 16.0803 0.764664 16.0803 0.594595C16.0858 0.255465 16.3406 0.00616261 16.683 0.000106718C17.0255 -0.00594917 17.3027 0.246379 17.3087 0.592574C17.312 0.767186 17.3087 0.94129 17.3087 1.13256H17.5504C18.427 1.13256 19.2998 1.14416 20.1743 1.12751C20.5556 1.11893 20.8373 1.21936 21 1.54739ZM19.7793 5.67548H4.91666C4.77146 8.56213 3.95946 11.2398 2.02643 13.5986H2.19081C6.89297 13.5986 11.5953 13.5969 16.2978 13.5936C16.4011 13.5868 16.4983 13.5462 16.5718 13.479C17.1097 12.9678 17.5737 12.3948 17.9525 11.7743C18.8253 10.3774 19.3448 8.86846 19.5963 7.28282C19.6812 6.75243 19.7168 6.22001 19.7793 5.67548ZM4.9309 4.5178H19.759V2.27611H17.3076C17.3076 2.44971 17.3076 2.61221 17.3076 2.77471C17.3044 3.1416 17.0518 3.39695 16.6934 3.39746C16.3351 3.39796 16.0809 3.14211 16.0776 2.77623C16.0776 2.60919 16.0776 2.44164 16.0776 2.28065H12.9605C12.9605 2.46586 12.9605 2.63391 12.9605 2.8055C12.9539 3.14412 12.6975 3.39292 12.3545 3.39746C12.0115 3.402 11.737 3.14968 11.731 2.80247C11.731 2.62836 11.731 2.45375 11.731 2.27763H8.6545C8.6545 2.45325 8.6545 2.61625 8.6545 2.77925C8.65066 3.14412 8.39424 3.39948 8.03536 3.39746C7.67648 3.39544 7.42718 3.13958 7.42444 2.77169C7.42444 2.60515 7.42444 2.43811 7.42444 2.2751H4.93145L4.9309 4.5178ZM19.7601 10.9895C19.7053 11.0935 19.6741 11.1525 19.6439 11.2121C19.0336 12.4177 18.2862 13.5375 17.2435 14.4737C17.1503 14.5606 17.0386 14.6286 16.9153 14.6735C16.792 14.7184 16.6599 14.7392 16.5274 14.7346C12.7414 14.7289 8.9553 14.7277 5.16924 14.7311H4.93145V15.8539H19.7601V10.9895Z'
                                fill='#387FFF'
                              />
                            </svg>
                          </button>
                        </DateRangePicker>
                      </div>

                      <div className='sell-time-inp mx-auto my-3'>
                        <input
                          type='time'
                          name='timedAuctionConfig.duration.startTime'
                          placeholder='Start Time'
                          className='py-1'
                          onChange={(e) => onChange(e)}
                          defaultValue={timedAuctionConfig.duration.startTime}
                          required
                          autoComplete='off'
                        />
                      </div>
                      <div className='sell-time-inp mx-auto my-3'>
                        <input
                          type='time'
                          name='timedAuctionConfig.duration.endTime'
                          placeholder='End Time'
                          className='py-1'
                          onChange={(e) => onChange(e)}
                          defaultValue={timedAuctionConfig.duration.endTime}
                          required
                          autoComplete='off'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='sell-detail-box'>
                      <h5>Fees:</h5>
                      <hr />
                      <div className='fee-details d-flex align-items-center justify-content-between'>
                        <div>
                          <p>
                            Service Fee:
                            <span className='ms-2'>2.5%</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            Creator Royalty:
                            <span className='ms-2'>2.5%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='sell-btn-container d-flex justify-content-center justify-content-lg-start'>
                    <button
                      className='btn btn-linear-gradient sell-btn-completed'
                      type='submit'
                    >
                      Complete Listing
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        <ApprovalModal
          show={show}
          approveAccount={approveAccount}
          approvalStatus={approvalStatus}
          onHide={async () => setShow(false)}
          address={address}
        />
      </section>
      <OwnCollectionToday />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {
})(SellNFT);
