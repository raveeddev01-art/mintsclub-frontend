import React, { useEffect, useState, useContext, FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ENV } from '../../config/config';
import 'slick-carousel';
import '../../assets/slick/slick.min.css';
import '../../assets/slick/slick-theme.min.css';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
} from 'swiper/core';
import 'swiper/swiper-bundle.css';
import './auction.scss';
//CardSliders
import CardSlider from '../../Components/CardSlider/CardSlider';
import AuctionsCards from '../../Components/AuctionsCards/AuctionsCards';
import { HomeAuction } from '../../interfaces/home-auctions/interface';
import { useGetCategories } from '../../hooks/PopularCollections';
import { useGetLiveAuctions } from '../../hooks/HomeAuctions';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);
const initData = {
  pre_heading: 'Auctions',
  heading: 'Live Auctions',
  btnText: 'View All',
};

const AuctionsOne: FC<HomeAuction> = () => {
  const [auctions, setAuctions] = useState<Array<object> | null>(null);
  const [categories, setCategories] = useState<any | null>(null);
  const [categoryId, setCategoryId] = useState('all');
  const [auctionSettings, setAuctionSettings] = useState<object | null>(null);
  const [isActive, setIsActive] = useState(0);
  const [filterationLoader, setFilterationLoader] = useState(true);
  const { setError } = useContext(errorHandler);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  //Get categories
  const onSuccessCategories = (data: any) => {
    if (data.data.success) {
      setCategories(data.data.categories);
    } else {
      setError(data.data.message);
    }
  };
  const { isLoading: isLoadingCategories } = useGetCategories(
    null,
    onSuccessCategories
  );

  //get LiveAuctions

  const onSuccessLiveAuctions = (data: any) => {
    if (data.data.success) {
      setLiveAuctions(data.data.data.auctions);
    } else {
      setError(data.data.message);
    }
  };

  const setLiveAuctions = (auctions: any) => {
    if (auctions) {
      auctions.forEach((element: any, i: number) => {
        auctions[i].totalBids = element.bidInfo?.bidBy?.length;
      });
    }
    setAuctions(auctions);
    setFilterationLoader(false);
    const auctionCollectionsSettings = ENV.auctionCollectionsSettings;
    if (auctions.length > 4) {
      auctionCollectionsSettings.infinite = true;
    } else {
      auctionCollectionsSettings.infinite = false;
    }
    setAuctionSettings(auctionCollectionsSettings);
  };
  const { isLoading: isLoadingLiveAuctions } = useGetLiveAuctions(
    categoryId,
    onSuccessLiveAuctions
  );

  useEffect(() => {
    const interval = setInterval(() => {
      checkIfAuctionEnded();
    }, 3000);
    return () => clearInterval(interval);
  }, [auctions]);

  const checkIfAuctionEnded = () => {
    if (auctions && auctions?.length > 0) {
      auctions.forEach((item: any, index: number) => {
        const auctionEndDate = new Date(item.auctionEndDate);
        const currentDate = new Date();
        if (currentDate > auctionEndDate) {
          const updatedAuctions = [...auctions];
          updatedAuctions.splice(index, 1);
          setAuctions(updatedAuctions);
        }
      });
    }
  };

  const handleCategoryFilter = (desc: string) => {
    setFilterationLoader(true);
    setCategoryId(desc);
  };

  return (
    <section className="live-auctions-area padding-wrapper">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-md-8">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content clr-blue">
                <span>{initData.pre_heading}</span>
                <h3 className="mb-0">{initData.heading}</h3>
                <p>
                  Explore on the world&aposs best & largest NFT marketplace with
                  our beautiful NFT products.{' '}
                  <br className="d-none d-xxl-block" />
                  We want to be a part of your smile, success and future growth.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-3 mt-lg-0">
            {categoryId === 'all' &&
            (!auctions || (auctions && auctions?.length <= 1)) &&
            !filterationLoader ? (
              ''
            ) : (
              <div className="popular-collections-content-right mt-lg-4 d-flex justify-content-end align-content-xxl-start text-end">
                {categories &&
                  categories.length > 0 &&
                  categories.map((item: any, id: number) => {
                    if (id <= 3) {
                      return (
                        <button
                          key={id}
                          className={`${
                            id === isActive ? 'home-active-category' : ''
                          } me-1 me-sm-3 me-lg-4`}
                          onClick={() => {
                            setIsActive(id);
                            handleCategoryFilter(item.description);
                          }}
                        >
                          {item.name}
                        </button>
                      );
                    }
                  })}
                <div className="intro-btn">
                  <Link
                    className="btn btn-rounded-bordered btn-viewAll"
                    to="/auctions"
                  >
                    View All
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="auctions-slides">
          <>
            {filterationLoader ||
            isLoadingLiveAuctions ||
            isLoadingCategories ? (
              <div className="spinner-loader-wrapper">
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : auctions && auctions.length > 0 ? (
              <CardSlider
                settings={auctionSettings}
                data={auctions}
                homeAuction
              >
                {auctions.map((item: any, index: number) => {
                  return (
                    <AuctionsCards
                      cardBg={'card-bg-gray'}
                      key={index}
                      item={item}
                      ownerName={item?.owner?.username}
                      userId={ENV.getUserKeys('_id')?._id}
                      ownerId={item.owner?._id}
                      bidsProfile={item?.bidDetail}
                      index={index}
                    />
                  );
                })}
              </CardSlider>
            ) : (
              <p className="text-center py-5 no-auction-msg">
                No Live Auctions Found
              </p>
            )}
          </>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = () => ({});
export default connect(mapStateToProps, {})(AuctionsOne);
