import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import "./collectiondetails.css";
import FlagIcon from "../../assets/images/detail-flag.svg";
import ShareIcon from "../../assets/images/detail-share.svg";
import TickIcon from "../../assets/images/seller-tick-icon.svg";
import SearchIcon from "../../assets/images/nav-search-icon.svg";
import ListingCards from "../listing-cards/ListingCards";
import FilterComponent from "../filter-component/FilterComponent";
import {
  getNFTsByCollection,
  getNFTs,
  beforeNFT,
  getMyLikedNfts,
} from "../nfts/nfts.action";
import { connect } from "react-redux";
import FullPageLoader from "../full-page-loader/full-page-loader";
import { ENV } from "../../config/config";
import { toggleLikeDislike,  beforeTogleLikeDislike, } from "../explore/explore.action";
import Breadcrumb from "../breadcrumb/breadcrumb";
import VideoCard from "../test-video-card/videoCard";
import BannerPh from "../../assets/images/collection-detailBg.png";
import {
  validateNetwork,
} from "../../utils/web3";
import { toast } from "react-toastify";
const CollectionDetailsPage = (props) => {
  const [activeFilter, setActiveFilter] = useState(false);
  const [loader, setLoader] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [filterationLoader, setFilterationLoader] = useState(true);
  const [likedNfts, setLikedNfts] = useState();
  const [keyword, setKeyword] = useState("");
  const [likeButtonDisable, setLikeBtnDisable] = useState(null);
  const [disabled,setDisabled]=useState(false)
  const [filter, setFilter] = useState({
    collectionId: false,
    gtePrice: false,
    ltePrice: false,
    categoryId: false,
    oldest: false,
    lowToHigh: false,
    highToLow: false,
    newest: false,
    page: 1,
    limit: 10,
    buy: false,
    auction: false,
    latest: false,
  });
  const location = useLocation();

  const itemoptions = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
  ];

  const sortoptions = [
    { value: "lowtohigh", label: "Low To High" },
    { value: "hightolow", label: "High To Low" },
    { value: "oldest", label: "Oldest" },
    { value: "newest", label: "Recantly Created" },
  ];

  const filterData = {
    status: {
      label: "Status",
      option: ["Buy Now", "On Auction", "New", "Has Offer"],
    },
    chains: {
      label: "Chains",
      option: ["Ethereum"],
    },
  };

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
      if(props.nfts.length>0){
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }
      setNfts(props.nfts);
      props.beforeNFT();
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


  const getNFTs = (
    page = 1,
    limit = 40,
    collectionIdFilter,
    gtePriceFilter,
    ltePriceFilter,
    categoryIdFilter,
    oldestFilter,
    lowToHighFilter,
    highToLowFilter,
    newestFilter,
    keyword,
    buy,
    auction,
    latest
  ) => {
    setFilterationLoader(true);

    const nftQS = { page, limit };

    nftQS.collectionId = location.state._id;
    if (gtePriceFilter) nftQS.gtePrice = gtePriceFilter;
    if (gtePriceFilter) nftQS.ltePrice = ltePriceFilter;
    if (categoryIdFilter) nftQS.categoryId = categoryIdFilter;
    if (oldestFilter) nftQS.oldest = oldestFilter;
    if (lowToHighFilter) nftQS.lowToHigh = lowToHighFilter;
    if (highToLowFilter) nftQS.highToLow = highToLowFilter;
    if (newestFilter) nftQS.newest = newestFilter;
    if (keyword) nftQS.keyword = keyword;
    if (buy) nftQS.buy = buy;
    if (auction) nftQS.auction = auction;
    if (latest) nftQS.latest = latest;

    const qs = ENV.objectToQueryString(nftQS);
    console.log(qs, "query string in ");
    props.getNFTs(qs);
  };

  const handleSortOptions = (e) => {
    setFilterationLoader(true);

    const { value } = e.target;

    if (value === "Low To High") {
      setFilter((prev) => ({
        ...prev,
        lowToHigh: true,
        highToLow: false,
        oldest: false,
        newest: false,
      }));
      getNFTs(
        filter.page,
        filter.limit,
        filter.collectionId ? filter.collectionId : false,
        filter.gtePrice,
        filter.ltePrice,
        false,
        false,
        true,
        false,
        false
      );
    } else if (value === "High To Low") {
      setFilter((prev) => ({
        ...prev,
        highToLow: true,
        lowToHigh: false,
        oldest: false,
        newest: false,
      }));
      getNFTs(
        filter.page,
        filter.limit,
        filter.collectionId ? filter.collectionId : false,
        filter.gtePrice,
        filter.ltePrice,
        false,
        false,
        false,
        true,
        false,
        keyword,
        filter.buy,
        filter.auction,
        filter.latest
      );
    } else if (value === "Oldest") {
      setFilter((prev) => ({
        ...prev,
        oldest: true,
        highToLow: false,
        lowToHigh: false,
        newest: false,
      }));
      getNFTs(
        filter.page,
        filter.limit,
        filter.collectionId ? filter.collectionId : false,
        filter.gtePrice,
        filter.ltePrice,
        false,
        true,
        false,
        false,
        false,
        keyword,
        filter.buy,
        filter.auction,
        filter.latest
      );
    } else if (value === "Recantly Created") {
      setFilter((prev) => ({
        ...prev,
        newest: true,
        oldest: false,
        highToLow: false,
        lowToHigh: false,
      }));
      getNFTs(
        filter.page,
        filter.limit,
        filter.collectionId ? filter.collectionId : false,
        filter.gtePrice,
        filter.ltePrice,
        false,
        false,
        false,
        false,
        true,
        keyword,
        filter.buy,
        filter.auction,
        filter.latest
      );
    } else {
    }
  };

  const onChangeMinPrice = (e) => {
    setMinValue(e.target.value);
  };
  const onChangeMaxPrice = (e) => {
    setMaxValue(e.target.value);
  };

  const handlePagination = () => {
    setFilter((prev) => ({ ...prev, limit: filter.limit + 10 }));
    getNFTs(
      filter.page,
      filter.limit ,
      filter.collectionId,
      filter.gtePrice,
      filter.ltePrice,
      filter.categoryId,
      filter.oldest,
      filter.lowToHigh,
      filter.highToLow,
      filter.newest,
      keyword,
      filter.buy,
      filter.auction,
      filter.latest
    );
  };

  const applyMinMaxFilter = () => {
    setFilterationLoader(true);

    setFilter((prev) => ({ ...prev, gtePrice: minValue, ltePrice: maxValue }));
    getNFTs(
      filter.page,
      filter.limit ,
      filter.collectionId,
      minValue,
      maxValue,
      filter.categoryId,
      filter.oldest,
      filter.lowToHigh,
      filter.highToLow,
      filter.newest,
      keyword,
      filter.buy,
      filter.auction,
      filter.latest
    );
  };

  const handleStatusFilter = (id) => {
    getNFTs(
      filter.page,
      filter.limit ,
      filter.collectionId,
      minValue,
      maxValue,
      filter.categoryId,
      filter.oldest,
      filter.lowToHigh,
      filter.highToLow,
      filter.newest,
      keyword,
      id == "Buy Now" ? true : false,
      id == "On Auction" ? true : false,
      id == "New" ? true : false
    );
  };

  const handleSearchKeyword = () => {
    getNFTs(
      filter.page,
      filter.limit ,
      filter.collectionId,
      minValue,
      maxValue,
      filter.categoryId,
      filter.oldest,
      filter.lowToHigh,
      filter.highToLow,
      filter.newest,
      keyword,
      filter.buy,
      filter.auction,
      filter.latest
    );
  };
  ///////////Likes
  const handleLikesTogleApi =async (nftId, status, likesCount) => {
    if (await validateNetwork()) {
    if (!likeButtonDisable) {
      setLikeBtnDisable(true);
      let userId = ENV.getUserKeys("_id")._id;
      console.log(likesCount, "likesCount");
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
  }else {
    toast.error("Please Connect Your Metamask With Ethereum Rinkby Network")
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

  const { name, banner, logo, description } = location.state;
  return (
    <>
      {loader ? (
        <FullPageLoader />
      ) : (
        <>
          <NavbarMain />
          <Breadcrumb title1={"Collections"} title2={"CollectionDetail"} />
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
                          <img
                            src={TickIcon}
                            alt="tick-icon"
                            className="ms-2"
                          />
                        </h3>
                      </div>
                      <p>
                        Created by <span>brendannorth</span>
                      </p>
                    </div>
                    <div className=" d-block d-md-none">
                      <div className="collection-owner-detail pe-xl-5 mt-4">
                        <p>{description}</p>
                      </div>
                    </div>
                    <div className="collection-owner-btns mt-3 mt-md-0 ms-auto">
                      <button className="me-1 me-sm-2 me-lg-3">
                        <img src={FlagIcon} alt="" flag-icon />
                      </button>
                      <button className="me-1 me-sm-1 me-lg-3">
                        <img src={ShareIcon} alt="" flag-icon />
                      </button>
                      <button>+ Add to wishlist</button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-7 col-md-6 col-lg-5 d-none d-md-block">
                  <div className="collection-owner-detail pe-xl-5 mt-4">
                    <p>{description}</p>
                  </div>
                </div>
                <div className="col-12 col-lg-7 mt-3 mt-sm-5">
                  <div className="d-flex align-items-center justify-content-center justify-content-lg-end">
                    <div className="collection-stats d-flex flex-column justify-content-center align-items-center text-center me-1">
                      <span>50</span>
                      <p>items</p>
                    </div>
                    <div className="collection-stats d-flex flex-column justify-content-center align-items-center text-center me-1">
                      <span>50</span>
                      <p>Owner</p>
                    </div>
                    <div className="collection-stats d-flex flex-column justify-content-center align-items-center text-center me-1">
                      <span>50</span>
                      <p>Prize floor</p>
                    </div>
                    <div className="collection-stats d-flex flex-column justify-content-center align-items-center text-center me-1">
                      <span>50</span>
                      <p>Volume trade</p>
                    </div>
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
                        onClick={handleSearchKeyword}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSearchKeyword()
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-10 col-md-4 col-lg-3">
                    <div className="collection-select-bar d-flex align-items-center justify-content-around mx-auto mx-md-0">
                      <div className="ms-2">
                        <p>Item:</p>
                      </div>

                      <select name="collection-select">
                        {itemoptions &&
                          itemoptions.map((collection, index) => {
                            return (
                              <option key={index} value={collection.label} >
                                {collection.label}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-10 col-md-4 col-lg-3">
                    <div className="collection-select-bar d-flex align-items-center justify-content-around mx-auto mx-md-0">
                      <div className="ms-2">
                        <p>Sort:</p>
                      </div>

                      <select
                        name="collection-select"
                        onChange={handleSortOptions}
                      >
                        {sortoptions &&
                          sortoptions.map((collection, index) => {
                            return (
                              <option key={index} value={collection.label }>
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
                          activeFilter
                            ? "filter-btn-active"
                            : "filter-btn-inactive"
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
                          class="spinner-border text-secondary text-white "
                          role="status"
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : nfts && nfts.length > 0 ? (
                      nfts.map((listing) => {
                        return (
                          <div className="col-6 col-md-4 col-lg-3 px-1">
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
                
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
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
  pagination: state.nft.nftAll.pagination,
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
