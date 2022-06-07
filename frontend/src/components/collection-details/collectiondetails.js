import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./collectiondetails.css";
import TickIcon from "../../assets/images/seller-tick-icon.svg";
import SearchIcon from "../../assets/images/nav-search-icon.svg";
import ListingCards from "../listing-cards/ListingCards";
import {
  getNFTsByCollection,
  getNFTs,
  beforeNFT,
  getMyLikedNfts,
} from "../nfts/nfts.action";
import { connect } from "react-redux";
import FullPageLoader from "../full-page-loader/full-page-loader";
import { ENV } from "../../config/config";
import {
  toggleLikeDislike,
  beforeTogleLikeDislike,
} from "../explore/explore.action";
import Breadcrumb from "../breadcrumb/breadcrumb";
import VideoCard from "../test-video-card/videoCard";
import BannerPh from "../../assets/images/collection-detailBg.png";
import { validateNetwork } from "../../utils/web3";
import FilterComponent from "../filterComponent/filterComponent";
import { toast } from "react-toastify";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/profileBg.png";
import { Images } from "../../assets/assets";

const CollectionDetailsPage = (props) => {
  const [loader, setLoader] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [filterationLoader, setFilterationLoader] = useState(true);
  const [likedNfts, setLikedNfts] = useState();
  const [likeButtonDisable, setLikeBtnDisable] = useState(null);
  const [nftPagination,setNFTPagination]=useState(null)
  const [initial, setInitial] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const location = useLocation();
 
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    getNFTs();
    let qs = { userId: ENV.getUserKeys("_id")._id };
    qs = ENV.objectToQueryString(qs);
    props.getMyLikedNfts(qs);
  }, []);
  useEffect(() => {
    if (props.myLikedNftsStatus) {
      setLikedNfts(props.myLikedNfts);
    }
  }, [props.myLikedNftsStatus]);

  useEffect(() => {
    if (props.nftsAuth) {
      console.log(props.nfts,"props.nfts")
      if (props?.nfts?.length > 0) {
        setDisabled(false);
      } else {
        if (initial) {
          setDisabled(true);
        }
      }
      setNfts(props.nfts);
      setNFTPagination(props.pagination)
      setLoader(false);

      setFilterationLoader(false);
    }
  }, [props.nftsAuth]);
  useEffect(() => {
    if (props.togleLikeRes) {
      setLikeBtnDisable(false);
      props.beforeTogleLikeDislike();
    }
  }, [props.togleLikeRes]);

  const getNFTs = (filter) => {
    props.beforeNFT();
    let nftQS = {};
    if (filter) {
      const {
        page,
        limit,
        categoryId,
        collectionId,
        oldest,
        lowToHigh,
        highToLow,
        newest,
        buy,
        auction,
        latest,
        gtePrice,
        ltePrice,
        keyword,
      } = filter;
      nftQS.collectionId = location.state._id;

      if (collectionId) nftQS.collectionId = collectionId;
      if (gtePrice) nftQS.gtePrice = gtePrice;
      if (ltePrice) nftQS.ltePrice = ltePrice;
      if (categoryId) nftQS.categoryId = categoryId;
      if (oldest) nftQS.oldest = oldest;
      if (lowToHigh) nftQS.lowToHigh = lowToHigh;
      if (highToLow) nftQS.highToLow = highToLow;
      if (newest) nftQS.newest = newest;
      if (keyword) nftQS.keyword = keyword;
      if (buy) nftQS.buy = buy;
      if (auction) nftQS.auction = auction;
      if (latest) nftQS.latest = latest;
      if (page) {
        nftQS.page = page;
      } else {
        nftQS.page = 1;
      }
      if (limit) {
        nftQS.limit = limit;
      } else {
        nftQS.limit = 10;
      }
    }
    const qs = ENV.objectToQueryString(nftQS);
    console.log(qs, "query string of all nfts");
    props.getNFTs(qs);
  };
  // nftQS.collectionId = location.state._id;

  ///////////Likes
  const handleLikesTogleApi = async (nftId, status, likesCount) => {
    if (await validateNetwork()) {
      if (!likeButtonDisable) {
        setLikeBtnDisable(true);
        let userId = ENV.getUserKeys("_id")._id;

        let body = {
          userId,
          nftId,
          count: 1,
        };

        if (status === "dislike" && likesCount > 0) {
          let result = likedNfts.filter((item) => item.nftId !== nftId);

          setLikedNfts(result);
          increOrDecreLikes(nftId, "dec");

          props.toggleLikeDislike(body);
        }

        if (status === "like") {
          let myLikedNfts = [];
          if (likedNfts && likedNfts.length > 0) {
            myLikedNfts = likedNfts;
          }

          let obj = {
            _id: "1234455",
            nftId,
          };

          myLikedNfts.push(obj);

          setLikedNfts(myLikedNfts);
          increOrDecreLikes(nftId, "inc");
          props.toggleLikeDislike(body);
        }
        // setNFTs(nfts);
      }
    } else {
      toast.error("Please Connect Your Metamask With Ethereum Rinkby Network");
    }
  };

  const increOrDecreLikes = (id, status) => {
    if (status === "dec") {
      let newResult = nfts.map((item) => {
        if (item._id !== id) {
          return item;
        } else {
          if (item?.likeCount > 0) {
            return { ...item, likeCount: item.likeCount - 1 };
          }
        }
      });
      setNfts(newResult);
    } else {
      let final = nfts.map((item) => {
        if (item._id !== id) {
          return item;
        } else {
          return { ...item, likeCount: item.likeCount + 1 };
        }
      });
      setNfts(final);
    }
  };

  const fetchData = (filterObj) => {
    console.log(filterObj, "filterObj");

    getNFTs(filterObj);
  };
  const { name, logo, description, username } = location.state;
  const bannerData = {
    subHeading: "Nfts",
    heading: "Collections Info",
  };
  return (
    <>
     

   
    
      <section className="user-profile padding-wrapper pt-0">
        <Banner
          subHeading={bannerData.subHeading}
          heading={bannerData.heading}
          bgImg={BannerBg}
          className="mb-0"
        />
        <div className="collection-detail-content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="d-flex flex-column flex-md-row align-items-center align-items-sm-start">
                  <div className="ms-lg-5 collection-owner-avatar user-avatar-container me-3 flex-fill">
                    <img src={Images.profilePlaceholder} alt="owner-avatar" />
                  </div>
                  <div className="collection-owner-detail text-center text-sm-start mt-2 mt-sm-4">
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
                      <div className="collection-owner-name">
                        <h3>
                          {name}{" "}
                          <span>
                            <img
                              src={TickIcon}
                              alt="tick-icon"
                              className="ms-2"
                            />
                          </span>
                        </h3>
                      </div>
                      <div>
                        <p>
                          Created By: <span>Adnan</span>
                        </p>
                      </div>
                    </div>
                    <div className="collection-owner-description mt-3">
                      <p>
                        jfhuishdfuhuhfhhfihshfdhdhsfdhdhdshfhfdhsdsfdhdsfhdsfhfdshhfdsjkdsfhjdsfhdfsjkhsdhhdsfsdhhksshkdfhsdfksdfhdfdffshfdfdsfgjfdksfdjkfghfgdkjfdghgfdkhgfd
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-7 col-md-6 col-lg-5"></div>
            </div>
          </div>
        </div>
        {loader && <FullPageLoader />}
      <FilterComponent
        disabled={disabled}
        totalItems={nfts && nfts.length}
        filterationLoader={filterationLoader}
        setFilterationLoader={setFilterationLoader}
        nfts={nfts}
        loader={loader}
        likedNfts={likedNfts}
        nftPagination={nftPagination}
        handleLikesTogleApi={handleLikesTogleApi}
        fetchData={fetchData}
        path="/explore/nftdetail/"
        collectionDetail
      />
      </section>
      {/* {loader && <FullPageLoader />}
      <div className="collection-detail-hero w-100">
        <img className="w-100" src={BannerPh} alt="BannerImg" />
      </div>
      <div className="collection-detail-content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="collection-owner-avatar">
                <img src={logo} alt="owner-avatar" />
              </div>
              <div className="d-md-flex align-items-center justify-content-between mt-5">
                <div className="collection-owner-detail">
                  <div className="collection-owner-name d-flex align-items-center">
                    <h3>
                      {name}{" "}
                      <img src={TickIcon} alt="tick-icon" className="ms-2" />
                    </h3>
                  </div>
                  {username && username?.[0] && (
                    <p>
                      Created by <span>{username?.[0]}</span>
                    </p>
                  )}
                </div>
                <div className=" d-block d-md-none">
                  <div className="collection-owner-detail pe-xl-5 mt-4">
                    <p>{description}</p>
                  </div>
                </div>
             
              </div>
            </div>
            <div className="col-12 col-sm-7 col-md-6 col-lg-5 d-none d-md-block">
              <div className="collection-owner-detail pe-xl-5 mt-4">
                <p>{description}</p>
              </div>
            </div>
       
          </div>
          <div className="collections-listing padding-wrapper">
            <div className="row g-3 align-items-center justify-content-center justify-content-lg-start ">
              <div className="col-12 col-sm-10 col-md-4 col-lg-3">
                <div className="collection-search-bar d-flex align-items-center justify-content-around mx-auto mx-md-0">
                  <img
                    src={SearchIcon}
                    alt="search-icon"
                    className="ms-3"
                    onClick={() => {
                      if (keyword === "") {
                        return false;
                      } else {
                        handleSearchKeyword();
                      }
                    }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    maxLength="50"
                    onChange={(e) => {
                      if (e.target.value.trimStart() === "") {
                        return false;
                      } else if (e.target.value === "") {
                        handleSearchKeyword(false);
                        setKeyword(e.target.value);
                      } else {
                        setKeyword(e.target.value);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (keyword === "") {
                        return false;
                      } else {
                        e.key === "Enter" && handleSearchKeyword();
                      }
                    }}
                  />
                </div>
              </div>
             
              <div className="col-12 col-sm-10 col-md-4 col-lg-3">
                <div className="collection-select-bar d-flex align-items-center justify-content-around mx-auto mx-md-0">
                  <div className="ms-2">
                    <p>Sort:</p>
                  </div>

                  <select name="collection-select" onChange={handleSortOptions}>
                    {sortoptions &&
                      sortoptions.map((collection, index) => {
                        return (
                          <option
                            key={index}
                            value={collection.label}
                            disabled={disabled}
                          >
                            {collection.label}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-12 d-sm-none">
                <div className="sm-filter-btn d-flex align-items-center justify-content-center">
                  <button
                    className={`${
                      activeFilter ? "filter-btn-active" : "filter-btn-inactive"
                    } ps-2`}
                    onClick={() => setActiveFilter(!activeFilter)}
                  >
                    Filters
                  </button>
                </div>
                <div
                  className={`${
                    activeFilter ? "d-block" : "d-none"
                  } sm-filter-options`}
                >
                  <div className="col-10 mx-auto mt-2">
                    <FilterComponent
                      Status={filterData.status}
                      Chains={filterData.chains}
                      onChangeMinPrice={onChangeMinPrice}
                      onChangeMaxPrice={onChangeMaxPrice}
                      minValue={minValue}
                      maxValue={maxValue}
                      applyMinMaxFilter={applyMinMaxFilter}
                      handleStatusFilter={handleStatusFilter}
                      disabled={disabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-10 col-sm-4 col-md-3 col-lg-3 d-none d-sm-block">
              <FilterComponent
                Status={filterData.status}
                Chains={filterData.chains}
                onChangeMinPrice={onChangeMinPrice}
                onChangeMaxPrice={onChangeMaxPrice}
                minValue={minValue}
                maxValue={maxValue}
                applyMinMaxFilter={applyMinMaxFilter}
                handleStatusFilter={handleStatusFilter}
                disabled={disabled}
              />
            </div>
            <div className="col-12 col-sm-8 col-md-9 col-lg-9 mt-5 mt-sm-0">
              <div className="row g-3">
                {filterationLoader ? (
                  <div className="text-center">
                    <div
                      className="spinner-border text-secondary text-white "
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : nfts && nfts.length > 0 ? (
                  nfts.map((listing, index) => {
                    return (
                      <div className="col-6 col-md-4 col-lg-3 px-1" key={index}>
                        {listing.fileType === "image" ? (
                          <ListingCards
                            CardImg={listing.image}
                            name={listing.name}
                            price={listing.currentPrice}
                            handleLikesTogleApi={handleLikesTogleApi}
                            id={listing._id}
                            likesCount={listing.likeCount}
                            likedNfts={likedNfts}
                            ownerId={listing.ownerId}
                            sellingMethod={listing.sellingMethod}
                            fileType={listing.fileType}
                            ownerName={listing.owner.username}
                            copies={listing.copies}
                            remainingCopies={listing.remainingCopies}
                          />
                        ) : (
                          <VideoCard
                            CardImg={listing.image}
                            name={listing.name}
                            price={listing.currentPrice}
                            handleLikesTogleApi={handleLikesTogleApi}
                            id={listing._id}
                            likesCount={listing.likeCount}
                            likedNfts={likedNfts}
                            ownerId={listing.ownerId}
                            fileType={listing.fileType}
                            sellingMethod={listing.sellingMethod}
                            ownerName={listing.owner.username}
                            copies={listing.copies}
                            remainingCopies={listing.remainingCopies}
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-white mt-5 text-center no-nfts-title">
                    No NFT's Found
                  </p>
                )}
              </div>
              <div className="col-12">
                <div className="mt-5 text-center">
                  {nfts && props.pagination > nfts.length && nfts.length > 10 && (
                    <button
                      className="btn btn-linear-gradient px-5"
                      onClick={() => handlePagination()}
                    >
                      Load more
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer /> */}
    </>
  );
};
const mapStateToProps = (state) => ({
  nft: state.nft,
  user: state.user,
  getAuth: state.collection.getAuth,
  collections: state.collection.collections,
  nftsByCollection: state.nft.nftsByCollection,
  nftsByCollectionStatus: state.nft.nftsByCollectionStatus,
  nfts: state.nft.nftsData.nfts,
  pagination: state.nft.nftsData.pagination,
  nftsAuth: state.nft.nftsAuth,
  myLikedNfts: state.nft.myLikedNfts,
  myLikedNftsStatus: state.nft.myLikedNftsStatus,
  togleLikeRes: state.explore.togleLikeRes,
});

export default connect(mapStateToProps, {
  getNFTsByCollection,
  beforeNFT,
  getNFTs,
  getMyLikedNfts,
  toggleLikeDislike,
  beforeTogleLikeDislike,
})(CollectionDetailsPage);
