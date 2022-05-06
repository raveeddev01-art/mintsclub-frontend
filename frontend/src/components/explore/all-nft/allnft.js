import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./allnft.css";
import { beforeNFT, getNFTs, getMyLikedNfts } from "../../nfts/nfts.action";
import { ENV } from "../../../config/config";
import NavbarMain from "../../navbar-main/NavbarMain";
import Footer from "../../footer/footer";
import SearchIcon from "../../../assets/images/nav-search-icon.svg";
import ListingCards from "../../listing-cards/ListingCards";
import FilterComponent from "../../filter-component/FilterComponent";
import { getCreators, beforeUser } from "./../../user/user.action";
import FullPageLoader from "../../full-page-loader/full-page-loader";
import { toggleLikeDislike, beforeTogleLikeDislike } from "../explore.action";
import {
  beforeCollection,
  getCollections,
} from "../../collections/collections.actions";
import Breadcrumb from "../../breadcrumb/breadcrumb";
import VideoCard from "../../test-video-card/videoCard";
import { validateNetwork } from "../../../utils/web3";
import { toast } from "react-toastify";
const AllNFT = (props) => {
  const [activeFilter, setActiveFilter] = useState(false);
  const [nftPagination, setNFTPagination] = useState(null);
  const [nfts, setNFTs] = useState([]); // NFTs for explore section
  const [loader, setLoader] = useState(true);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [creators, setCreator] = useState([]);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [collections, setCollections] = useState([]);
  const [filterationLoader, setFilterationLoader] = useState(true);
  const [keyword, setKeyword] = useState(
    props?.location?.state ? props.location.state : ""
  );
  const [likedNfts, setLikedNfts] = useState();
  const [likeButtonDisable, setLikeBtnDisable] = useState(null);
  const [initial, setInitial] = useState(true);
  const [disabled, setDisabled] = useState(false);
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
  useEffect(() => {
    if (props?.location?.state) {
      setKeyword(props?.location?.state);
      handleSearchKeyword(props?.location?.state);
    }
  }, [props?.location?.state]);

  useEffect(() => {
    window.scroll(0, 0);
    props.getCreators();
    props.getCollections();
    if (props?.location?.state) {
      let searchQs = { keyword: props.location.state };
      searchQs = ENV.objectToQueryString(searchQs);
      props.getNFTs(searchQs);
    } else {
      getNFTs();
    }

    let qs = { userId: ENV.getUserKeys("_id")._id };
    qs = ENV.objectToQueryString(qs);
    props.getMyLikedNfts(qs);
  }, []);

  // Get Liked Nfts
  useEffect(() => {
    if (props.myLikedNftsStatus) {
      setLikedNfts(props.myLikedNfts);
      // props.beforeUser()
      props.beforeNFT();
    }
  }, [props.myLikedNftsStatus]);

  //Get Top Sellers
  useEffect(() => {
    if (props.user.topSellersAuth) {
      setCreator(props.user.sellers);
      props.beforeUser();
    }
  }, [props.user.topSellersAuth]);

  useEffect(() => {
    if (props.user.creatorsAuth) {
      setCreator(props.user.creators);
      props.beforeUser();
      setLoader(false);
    }
  }, [props.user.creatorsAuth]);

  //Get NFt's
  useEffect(() => {
    if (props.nft.nftsAuth) {
      const { nfts, pagination } = props.nft.nftsData;
      if (nfts) {
        if (nfts.length > 0) {
          setDisabled(false);
        } else {
          if (initial) {
            setDisabled(true);
          }
        }
        setNFTs(nfts);
        setNFTPagination(pagination);
        setFilterationLoader(false);
        props.beforeNFT();

        setLoader(false);
      }
      setLoader(false);
    }
  }, [props.nft.nftsAuth]);

  //pagination
  useEffect(() => {
    if (nftPagination)
      setLoadMoreBtn(
        nftPagination.total > 0 &&
          nftPagination.total > nfts.length &&
          nfts.length > 0
      );
  }, [nftPagination]);

  useEffect(() => {
    if (props.getAuth) {
      setCollections(props.collections);
      props.beforeCollection();
    }
  }, [props.getAuth]);

  useEffect(() => {
    if (props.togleLikeRes) {
      setLikeBtnDisable(false);
      props.beforeTogleLikeDislike();
    }
  }, [props.togleLikeRes]);

  const getNFTs = (
    page = 1,
    limit = 10,
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
    const nftQS = { page, limit };
    if (collectionIdFilter) nftQS.collectionId = collectionIdFilter;
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
    console.log(qs, "query string of all nfts");
    props.getNFTs(qs);
  };

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

  const handleSortOptions = (e) => {
    setFilterationLoader(true);
    setInitial(false);

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
        false,
        keyword,
        filter.buy,
        filter.auction,
        filter.latest
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

  const filterData = {
    status: {
      label: "Status",
      option: ["Buy Now", "On Auction", "New"],
    },
    collections: {
      label: "Collections",
      option: ["Art", "Music"],
    },
  };

  const handlePagination = () => {
    setInitial(false);
    setFilterationLoader(true);
    setFilter((prev) => ({ ...prev, limit: filter.limit + 10 }));
    getNFTs(
      filter.page,
      filter.limit + 10,
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
    setInitial(false);
    setFilterationLoader(true);

    setFilter((prev) => ({ ...prev, gtePrice: minValue, ltePrice: maxValue }));

    getNFTs(
      filter.page,
      filter.limit,
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

  const handleCollectionsFilter = (id) => {
    setInitial(false);
    setFilterationLoader(true);
    setFilter((prev) => ({ ...prev, collectionId: id }));
    getNFTs(
      filter.page,
      filter.limit,
      id,
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

  const handleSearchKeyword = (value) => {
    setInitial(false);
    setFilterationLoader(true);
    getNFTs(
      filter.page,
      filter.limit,
      filter.collectionId,
      minValue,
      maxValue,
      filter.categoryId,
      filter.oldest,
      filter.lowToHigh,
      filter.highToLow,
      filter.newest,
      value ? value : keyword,
      filter.buy,
      filter.auction,
      filter.latest
    );
  };

  const handleStatusFilter = (id) => {
    setInitial(false);
    setFilterationLoader(true);
    getNFTs(
      filter.page,
      filter.limit,
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
      setNFTs(newResult);
    } else {
      let final = nfts.map((item) => {
        if (item._id !== id) {
          return item;
        } else {
          return { ...item, likeCount: item.likeCount + 1 };
        }
      });
      setNFTs(final);
    }
  };
  console.log(nfts, "nfts=>");
  return (
    <>
      <NavbarMain />
      <Breadcrumb title1={"Explore"} title2={"All NFT"} />
      <div className="collection-detail-content all-nft-content">
        <div className="container padding-wrapper pb-1">
          <div className="collections-listing">
            <div className="row g-3 align-items-center justify-content-center justify-content-lg-start ">
              <div className="col-12 col-sm-10 col-md-4 col-lg-3">
                <div className="collection-search-bar d-flex align-items-center justify-content-around mx-auto mx-md-0 position-relative">
                  <img
                    src={SearchIcon}
                    alt="search-icon"
                    className="ms-3 search-icon"
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
                      if (e.target.value === " ") {
                        return false;
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
                    value={keyword}
                  />
                  {/* <IoCloseSharp className="position-absolute input-clear"/> */}
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
                      Collections={collections}
                      collectionsLabel={"Collections"}
                      onChangeMinPrice={onChangeMinPrice}
                      onChangeMaxPrice={onChangeMaxPrice}
                      minValue={minValue}
                      maxValue={maxValue}
                      applyMinMaxFilter={applyMinMaxFilter}
                      handleCollectionsFilter={handleCollectionsFilter}
                      handleStatusFilter={handleStatusFilter}
                      disabled={disabled}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12">
                <div className="no-of-items text-end mb-3">
                  <p>
                    {nfts?.length}
                    {"  items"}
                  </p>
                </div>
              </div>
              <div className="col-10 col-sm-4 col-md-3 col-lg-3 d-none d-sm-block">
                <FilterComponent
                  Status={filterData.status}
                  Collections={collections}
                  collectionsLabel={"Collections"}
                  onChangeMinPrice={onChangeMinPrice}
                  onChangeMaxPrice={onChangeMaxPrice}
                  minValue={minValue}
                  maxValue={maxValue}
                  applyMinMaxFilter={applyMinMaxFilter}
                  handleCollectionsFilter={handleCollectionsFilter}
                  handleStatusFilter={handleStatusFilter}
                  disabled={disabled}
                />
              </div>
              <div className="col-12 col-sm-8 col-md-9 col-lg-9">
                {loader ? (
                  <FullPageLoader />
                ) : (
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
                          <div
                            key={index}
                            className="col-6 col-md-4 col-lg-3 px-1"
                          >
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
                                fileType={listing.fileType}
                                sellingMethod={listing?.sellingMethod}
                                auctionStartDate={listing?.auctionStartDate}
                                auctionEndDate={listing?.auctionEndDate}
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
                                sellingMethod={listing?.sellingMethod}
                                auctionStartDate={listing?.auctionStartDate}
                                auctionEndDate={listing?.auctionEndDate}
                                ownerName={listing.owner.username}
                                copies={listing.copies}
                                remainingCopies={listing.remainingCopies}
                              />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-white text-center mt-5 no-nft-title">
                        No NFTs Found
                      </p>
                    )}
                    <div className="col-12">
                      <div className="mt-5 text-center">
                        {nftPagination?.total === nfts?.length
                          ? ""
                          : !filterationLoader && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="all-nft-footer">
        <Footer />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  nft: state.nft,
  myLikedNfts: state.nft.myLikedNfts,
  myLikedNftsStatus: state.nft.myLikedNftsStatus,
  user: state.user,
  getAuth: state.collection.getAuth,
  collections: state.collection.collections,
  togleLikeRes: state.explore.togleLikeRes,
});

export default connect(mapStateToProps, {
  beforeNFT,
  getNFTs,
  getCreators,
  toggleLikeDislike,
  getCollections,
  getMyLikedNfts,
  beforeCollection,
  beforeUser,
  beforeTogleLikeDislike,
})(AllNFT);
