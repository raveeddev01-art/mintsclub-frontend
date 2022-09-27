import React, { useState, useEffect, useContext, FC } from 'react';
import { Link } from 'react-router-dom';
import CollectionsCard from '../../Components/CollectionsCards/CollectionsCard';
import ViewAllIcon from '../../assets/images/view-all-arrow.svg';
import CardSlider from '../../Components/CardSlider/CardSlider';
import { ENV } from '../../config/config';
import {
  beforeCategory,
  getCategories,
} from '../../Components/Categories/categories.action';
import {
  beforePopularCollection,
  getPopularCollections,
} from './collections.actions';
import { connect } from 'react-redux';
import { Images } from '../../assets/assets';
import { PopularCollectionInt } from '../../interfaces/PopularCollections/interface';
import {
  useGetCategories,
  useGetPopularCollections,
} from '../../hooks/PopularCollections';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
const initData = {
  pre_heading: 'Most Popular',
  heading: 'Popular Collections',
  btnText: 'Explore More',
};

const PopularCollections: FC<PopularCollectionInt> = (props) => {
  const [popular, setpopular] = useState<any>(null);
  const [categories, setCategories] = useState<any>(null);
  const [categoryId, setCategoryId] = useState('all');
  const [popularSettings, settPopularSettings] = useState<object | null>(null);
  const [isActive, setIsActive] = useState(0);
  const [filterationLoader, setFilterationLoader] = useState(true);
  const { setError } = useContext(errorHandler);

  const handleCategoryFilter = (desc: string) => {
    setFilterationLoader(true);
    setCategoryId(desc);
  };

  const handleImage = (item: any, index: number) => {
    if (item?.nftDetail[index]?.image) {
      const result = item.nftDetail.filter(
        (nft: any) => nft.fileType === 'image'
      );
      if (result.length >= index && result.length !== 0) {
        return result[index]?.image;
      } else {
        return Images.imagePlaceholder;
      }
    } else {
      return Images.imagePlaceholder;
    }
  };

  /////get popular collections

  const onSuccessPopular = (data: any) => {
    if (data.data.success) {
      calcualtePopularCollections(data.data?.data);
    } else {
      setError(data.data.message);
    }
  };

  const onErrorPopular = (error: any) => {
    // unexpected empity arrow funciton
  };

  const {
    isFetching: isFetchingPopular,
    isLoading,
    refetch: refetchPopular,
  } = useGetPopularCollections(onErrorPopular, onSuccessPopular, categoryId);

  const calcualtePopularCollections = (data: any) => {
    if (data.collectionsList.length > 0) {
      const collectionListing = data.collectionsList;
      if (collectionListing) {
        collectionListing.forEach((element: any, i: number) => {
          if (element.likesCount.length > 0) {
            const sumLikes = element.likesCount.reduce(function (
              a: number,
              b: number
            ) {
              return a + b;
            },
            0);
            collectionListing[i].likesCount = sumLikes;
          }
          collectionListing[i].likesCount = 0;

          collectionListing[i].totalNfts = element.nftDetail[0].image
            ? element.nftDetail?.length
            : 0;
          if (element.soldCopies.length > 0) {
            const soldCopiesSum = element.soldCopies.reduce(function (
              a: number,
              b: number
            ) {
              return a + b;
            },
            0);
            collectionListing[i].soldCopies = soldCopiesSum;
          }

          collectionListing[i].soldCopies = 0;
        });
      }

      const finalCollectionListing = collectionListing.sort(
        (a: any, b: any) =>
          b.likesCount - a.likesCount || b.soldCopies - a.soldCopies
      );
      const popularCollectionsSettings = ENV.popularCollectionsSettings;
      if (finalCollectionListing.length > 3) {
        popularCollectionsSettings.infinite = true;
      } else {
        popularCollectionsSettings.infinite = false;
      }
      settPopularSettings(popularCollectionsSettings);
      if (finalCollectionListing.length && finalCollectionListing.length > 8) {
        setFilterationLoader(false);
        setpopular(finalCollectionListing.slice(0, 7));
      } else {
        setpopular(finalCollectionListing);

        setFilterationLoader(false);
      }
    } else {
      setFilterationLoader(false);
      setpopular(null);
    }
  };
  const onSuccessCategories = (data: any) => {
    if (data.data.success) {
      setCategories(data.data.categories);
    } else {
      setError(data.data.message);
    }
  };

  const {}: any = useGetCategories(
    (error: any) => console.log(error),
    onSuccessCategories
  );

  useEffect(() => {
    refetchPopular();
  }, [categoryId]);

  return (
    <>
      <section className="popular-collections-area padding-wrapper">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 col-md-8">
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content clr-blue">
                  <span>{initData.pre_heading}</span>
                  <h3 className=" mb-1">{initData.heading}</h3>
                  <p>
                    Explore on the world&aposs best & largest NFT marketplace
                    with our beautiful NFT products.{' '}
                    <br className="d-none d-xxl-block" /> We want to be a part
                    of your smile, success and future growth.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-3 mt-lg-0">
              {categoryId === 'all' && popular && popular?.length === 0 ? (
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
                            className={`collection-category ${
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
                      to="/popular-collections"
                    >
                      View All
                      <img
                        src={ViewAllIcon}
                        alt="arrow-left"
                        className="ms-2 d-none d-sm-none"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          {filterationLoader || isFetchingPopular ? (
            <div className="spinner-loader-wrapper">
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : popular && popular.length && popular.length > 0 ? (
            <CardSlider
              settings={ENV.popularCollectionsSettings}
              data={popular}
              homeAuction
            >
              {popular.map((collection: any, index: number) => {
                return (
                  <CollectionsCard
                    key={index}
                    Subimg1={handleImage(collection, 0)}
                    Subimg2={handleImage(collection, 1)}
                    Subimg3={handleImage(collection, 2)}
                    collection={collection}
                    CardImg={collection.featuredImg}
                    name={collection.name}
                    id={collection._id}
                    userName={collection.username[0]}
                    NFTCount={collection.TotalNfts}
                    profileImage={collection.profileImage[0]}
                    ownerAddress={collection.ownerAddress}
                    connectedAddress={props.connectedAddress}
                  />
                );
              })}
            </CardSlider>
          ) : (
            <p className="text-center not-found-title mt-5 py-5">
              No Popular Collections Found
            </p>
          )}
        </div>
      </section>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  error: state.error,
  category: state.category,
  popularCollections: state.collection.popularCollections,
  getPopularAuth: state.collection.getPopularAuth,
  connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {
  beforePopularCollection,
  beforeCategory,
  getCategories,
  getPopularCollections,
})(PopularCollections);
