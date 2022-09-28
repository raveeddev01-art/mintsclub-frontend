import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import CollectionsCard from '../collections-cards/CollectionsCard';
import { connect } from 'react-redux';
import { ENV } from '../../config/config';
import {
  beforePopularCollection,
  getPopularCollections,
  toggleLikeDislike,
  beforeCategory,
  getCategories
} from '../collections/collections.actions';
import FullPageLoader from '../full-page-loader/full-page-loader';
import { Images } from '../../assets/assets';
import Banner from '../banner/banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg.png';
import OwnCollectionToday from '../own-collection-today/own-collection-today';

const Populars = forwardRef((props, ref) => {
  const [popular, setpopular] = useState([]);
  const [isActive, setIsActive] = useState('All');
  const [collections, setCollections] = useState(null);
  const [categoryId, setCategoryId] = useState('all');
  const [categoriesLoader, setCatLoader] = useState(true); // categories loader
  const [collectionsLoader, setColLoader] = useState(true); // collections loader
  const [source, setSource] = useState(1); // 1 for my collections, 2 for popular collections
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState();
  const [empty, setEmpty] = useState(false);
  const [loader, setLoader] = useState(true);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);
    if (props.source) setSource(props.source);

    if (props.setLoader) props.setLoader(false); //to be changed

    getPopularCollections(null, 1);
    const qs = ENV.objectToQueryString({
      myFilter: 'all'
    });

    props.getPopularCollections(qs);
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.getPopularAuth) {
      const collectionListing = props.popularCollections.collectionsList;
      const pagination = props.popularCollections.pagination;

      if (collectionListing) {
        collectionListing.forEach((element, i) => {
          if (element.likesCount.length > 0) {
            var sumLikes = element.likesCount.reduce(function (a, b) {
              return a + b;
            }, 0);
            collectionListing[i].likesCount = sumLikes;
          }
          collectionListing[i].likesCount = 0;

          collectionListing[i].totalNfts = element.nfts[0].image ? element.nfts?.length : 0;
          if (element.soldCopies.length > 0) {
            var soldCopiesSum = element.soldCopies.reduce(function (a, b) {
              return a + b;
            }, 0);
            collectionListing[i].soldCopies = soldCopiesSum;
          }

          collectionListing[i].soldCopies = 0;
        });
      }

      const finalCollectionListing = collectionListing.sort(
        (a, b) => b.likesCount - a.likesCount || b.soldCopies - a.soldCopies
      );

      setPagination(pagination);
      const userId = ENV.getUserKeys('_id')._id;
      if (props.finalCollectionListing) {
        let finalCollectionListing = finalCollectionListing.filter((item) => item.userId === userId);
        setpopular(finalCollectionListing);
      } else {
        if (finalCollectionListing === null) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
        setpopular(finalCollectionListing);

        setColLoader(false);
        setLoader(false);
      }
      props.beforePopularCollection();
    }
  }, [props.getPopularAuth]);

  useEffect(() => {
    if (props.getPopularAuth) {
      setCategories(props.collection.categories);

      props.beforeCategory();
      setCatLoader(false);
    }
  }, [props.getPopularAuth]);

  const getPopularCollections = (category, page, pageLimit) => {
    const filter = {
      page
    };

    if (props.userId) filter.userId = props.userId;

    if (props.popular) filter.popular = true;
    if (category) filter.myFilter = category;
    if (!props.all) filter.limit = pageLimit ? pageLimit : 12;
    else filter.all = true;

    const qs = ENV.objectToQueryString(filter);

    props.getPopularCollections(qs);
  };

  useImperativeHandle(ref, () => ({
    getCatCollections: (catId) => {
      if (props.setLoader) props.setLoader(true);

      getPopularCollections(catId, page);
    },
    colCount: collections?.length || 0
  }));

  const handlePagination = () => {
    window.scroll(0, 500);
    setPage(page);
    setLimit(limit + 12);
    getPopularCollections(selectedCategory, page, limit + 12);
  };

  const handleFilterCategory = (category) => {
    setCategoryId(category);
    setLoader(true);
    setPage(1);
    setLimit(12);
    getPopularCollections(category, 1, 12);
  };

  const handleImage = (item, index) => {
    if (item?.nfts[index]?.image) {
      let result = item.nfts.filter((nft) => nft.fileType === 'image');
      if (result.length >= index) {
        return result[index]?.image;
      } else {
        return Images.imagePlaceholder;
      }
    } else {
      return Images.imagePlaceholder;
    }
  };
  const bannerData = {
    subHeading: 'Collections',
    heading: 'Popular Collections',
    content:
      ' Explore on the world’s best & largest NFT marketplace with our beautiful NFT products. We want to be a part of your smile, success and future growth.'
  };
  return (
    <>
      <Banner
        subHeading={bannerData.subHeading}
        heading={bannerData.heading}
        content={bannerData.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      {categoriesLoader && collectionsLoader ? (
        <FullPageLoader />
      ) : (
        <>
          {' '}
          <section className='explore-collection-section padding-wrapper'>
            <div className='container'>
              <div className='row mb-5'>
                <div className='col-12 explore-collection-nav'>
                  <div className='d-none d-xxl-flex justify-content-lg-end text-end align-items-center'>
                    {categoryId === 'all' && popular && popular?.length == 0 && !loader
                      ? ''
                      : categories &&
                        categories.length > 0 &&
                        categories.map((item, index) => {
                          return (
                            <button
                              onClick={() => {
                                setIsActive(item.name);
                                setSelectedCategory(item.description);
                                handleFilterCategory(item.description);
                              }}
                              key={index}
                              className={`${item.name === isActive ? 'active-explore-nav' : ''} me-2 me-xl-3`}
                            >
                              {item.name}
                            </button>
                          );
                        })}
                  </div>
                  <div className='row justify-content-center justify-content-sm-start align-items-center text-center d-xxl-none'>
                    {categoryId === 'all' && popular && popular?.length == 0 && !loader
                      ? ''
                      : categories &&
                        categories.length > 0 &&
                        categories.map((item, index) => {
                          return (
                            <div className='col-6 col-sm-3' key={index}>
                              <button
                                onClick={() => {
                                  setIsActive(item.name);
                                  setSelectedCategory(item.description);
                                  handleFilterCategory(item.description);
                                }}
                                className={isActive === item.name ? 'active-explore-nav' : ''}
                              >
                                {item.name}
                              </button>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
              <div className='row g-1 align-items-center'>
                {loader ? (
                  <div className='d-flex align-items-center justify-content-center'>
                    <div class='spinner-border' role='status'>
                      <span class='sr-only'>Loading...</span>
                    </div>
                  </div>
                ) : popular && popular.length > 0 ? (
                  popular.map((item, index) => {
                    return (
                      <div className='col-sm-6 col-lg-4 col-xl-3' key={index}>
                        <CollectionsCard
                          CardImg={item.featuredImg}
                          Subimg1={handleImage(item, 0)}
                          Subimg2={handleImage(item, 1)}
                          Subimg3={handleImage(item, 2)}
                          name={item.name}
                          id={item._id}
                          collection={item}
                          userName={item.username[0]}
                          NFTCount={item.totalNfts}
                          profileImage={item.profileImage[0]}
                          ownerAddress={item.ownerAddress}
                          connectedAddress={props.connectedAddress}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className='text-center  not-found-title mt-5'>No Popular Collections Found</p>
                )}

                <div className='col-12'>
                  <div className='mt-5 text-center'>
                    {!empty && popular?.length === 12 && pagination.totalRecords > popular.length && (
                      <button className='btn btn-rounded-bordered px-5' onClick={() => handlePagination()}>
                        Load more...
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <OwnCollectionToday />
        </>
      )}
    </>
  );
});
const mapStateToProps = (state) => ({
  collection: state.collection,
  error: state.error,
  category: state.category,
  categories: state.collection,
  pagination: state.pagination,
  popularCollections: state.collection.popularCollections,
  getPopularAuth: state.collection.getPopularAuth,
  connectedAddress: state.wallet.connectedAddress
});

export default connect(
  mapStateToProps,
  {
    beforePopularCollection,
    getPopularCollections,
    beforeCategory,
    getCategories,
    toggleLikeDislike
  },
  null,
  { forwardRef: true }
)(Populars);
