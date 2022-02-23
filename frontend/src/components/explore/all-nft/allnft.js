import React, { useState, useEffect, useHistory } from "react";
import { connect } from "react-redux";
import "./allnft.css";
import { beforeNFT, getNFTs, getMyLikedNfts } from "../../nfts/nfts.action";
import { ENV } from "../../../config/config";
import NavbarMain from "../../../Screens/rough/navbar-main/NavbarMain";
import Footer from "../../footer/footer";
import SearchIcon from "../../../assets/images/nav-search-icon.svg";
import ListingCards from "../../../Screens/rough/listing-cards/ListingCards";
import { ListingImg } from "../../../assets/assets";
import FilterComponent from "../../filter-component/FilterComponent";
import { getCreators, beforeUser } from "./../../user/user.action";
import FullPageLoader from "../../full-page-loader/full-page-loader";
import { toggleLikeDislike } from "../explore.action";
import {
  beforeCollection,
  getCollections,
} from "../../collections/collections.actions";
// import VideoCards from "../../test-video-card/videoCard";

const AllNFT = (props) => {
  const [activeFilter, setActiveFilter] = useState(false);
  const [nftPagination, setNFTPagination] = useState(null);
  const [nfts, setNFTs] = useState([]); // NFTs for explore section
  const [loader, setLoader] = useState(true);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [intro, setIntro] = useState(false);
  const [creators, setCreator] = useState([]);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [collections, setCollections] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [filterationLoader, setFilterationLoader] = useState(true);
  
  const [likedNfts, setLikedNfts] = useState();
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
  });

  // const pathname = useHistory().location.pathname;

  useEffect(() => {
    window.scroll(0, 0);

    // set intro section
    // if (pathname === "/explore-all") setIntro(true);

    // get NFTs for explore section
    props.getCreators();
    props.getCollections();
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
    if (props.user.topSellersAuth) {
      setCreator(props.user.sellers);
    }
  }, [props.user.topSellersAuth]);

  useEffect(() => {
    if (props.user.creatorsAuth) {
      setCreator(props.user.creators);
      setLoader(false);
    }
  }, [props.user.creatorsAuth]);

  // set NFTs for explore section
  useEffect(() => {
    if (props.nft.nftsAuth) {
      const { nfts, pagination } = props.nft.nftsData;
      // console.log(nftsData,"nftsData==>")
      if (nfts) {
        setNFTs(nfts);
        setNFTPagination(pagination);
        setFilterationLoader(false);
        props.beforeNFT();

        setLoader(false);
      }
      setLoader(false);
    }
  }, [props.nft.nftsAuth]);

  // handle show load more button state when pagination is set
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
    }
  }, [props.getAuth]);

  const loadMore = () => {
    const { page, limit } = nftPagination;
    setLoader(true);
    // get more NFTs for explore section
    getNFTs(1, limit * (page + 1));
  };

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
    newestFilter
  ) => {
    const nftQS = { page, limit };

    const {
      collectionId,
      gtePrice,
      ltePrice,
      categoryId,
      oldest,
      lowToHigh,
      newest,
      highToLow,
    } = filter;

    // if (!collectionIdFilter) collectionIdFilter = collectionId;
    // if (!gtePriceFilter) gtePriceFilter = gtePrice;
    // if (!ltePriceFilter) ltePriceFilter = ltePrice;
    // if (!categoryIdFilter) categoryIdFilter = categoryId;
    // if (!oldestFilter) oldestFilter = oldest;
    // if (!lowToHighFilter) lowToHighFilter = lowToHigh;
    // if (!highToLowFilter) highToLowFilter = highToLow;
    // if (!newestFilter) newestFilter = newest;

    if (collectionIdFilter) nftQS.collectionId = collectionIdFilter;
    if (gtePriceFilter) nftQS.gtePrice = gtePriceFilter;
    if (gtePriceFilter) nftQS.ltePrice = ltePriceFilter;
    if (categoryIdFilter) nftQS.categoryId = categoryIdFilter;
    if (oldestFilter) nftQS.oldest = oldestFilter;
    if (lowToHighFilter) nftQS.lowToHigh = lowToHighFilter;
    if (highToLowFilter) nftQS.highToLow = highToLowFilter;
    if (newestFilter) nftQS.newest = newestFilter;

    const qs = ENV.objectToQueryString(nftQS);

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

    const { value } = e.target;
    console.log(value,"value")

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
        false
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
        false
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
        true
      );
    } else {
    }
    // setDetails(prev => ({...prev, name: target.value}))
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
      option: ["Buy Now", "On Auction", "New", "Has Offer"],
    },
    collections: {
      label: "Collections",
      option: ["Art", "Music"],
    },
  };

  const handlePagination = () => {
    setFilterationLoader(true);
    const {
      collectionId,
      gtePrice,
      ltePrice,
      categoryId,
      oldest,
      lowToHigh,
      highToLow,
      newest,
      page,
      limit,
    } = filter;
    setFilter((prev) => ({ ...prev, limit: limit + 10 }));
    getNFTs(
      page,
      limit + 10,
      collectionId,
      gtePrice,
      ltePrice,
      categoryId,
      oldest,
      lowToHigh,
      highToLow,
      newest
    );
  };

  const applyMinMaxFilter = () => {
    setFilterationLoader(true);
    const {
      collectionId,
      gtePrice,
      ltePrice,
      categoryId,
      oldest,
      lowToHigh,
      highToLow,
      newest,
      page,
      limit,
    } = filter;
    setFilter((prev) => ({ ...prev, gtePrice: minValue, ltePrice: maxValue }));
    getNFTs(
      page,
      limit + 10,
      collectionId,
      minValue,
      maxValue,
      categoryId,
      oldest,
      lowToHigh,
      highToLow,
      newest
    );
  };

  const handleCollectionsFilter = (id) => {
    setFilterationLoader(true);
    const {
      collectionId,
      gtePrice,
      ltePrice,
      categoryId,
      oldest,
      lowToHigh,
      highToLow,
      newest,
      page,
      limit,
    } = filter;
    setFilter((prev) => ({ ...prev, collectionId: id }));
    getNFTs(
      page,
      limit,
      id,
      minValue,
      maxValue,
      categoryId,
      oldest,
      lowToHigh,
      highToLow,
      newest
    );
  };

  const handleLikesTogleApi = (nftId, status) => {
    // const {
    //   collectionId,
    //   gtePrice,
    //   ltePrice,
    //   categoryId,
    //   oldest,
    //   lowToHigh,
    //   highToLow,
    //   newest,
    //   page,
    //   limit,
    // } = filter;
    // getNFTs(
    //   page,
    //   limit,
    //   false,
    //   minValue,
    //   maxValue,
    //   categoryId,
    //   oldest,
    //   lowToHigh,
    //   highToLow,
    //   newest
    // );
    // let qs = { userId: ENV.getUserKeys("_id")._id };
    // qs = ENV.objectToQueryString(qs);
    // props.getMyLikedNfts(qs);
    increOrDecreLikes(nftId);
    if (status === "dislike") {
      let result = likedNfts.filter((item) => item.nftId !== nftId);

      setLikedNfts(result);
      increOrDecreLikes(nftId, "dec");
    } else {
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
    }
    // setNFTs(nfts);
    let userId = ENV.getUserKeys("_id")._id;

    let obj = {
      userId,
      nftId,
      count: 1,
    };

    props.toggleLikeDislike(obj);
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
  return (
    <>
      <NavbarMain />
      <div className="collection-detail-content all-nft-content">
        <div className="container padding-wrapper">
          <div className="collections-listing">
            <div className="row g-3 align-items-center justify-content-center justify-content-lg-start ">
              <div className="col-12 col-sm-10 col-md-4 col-lg-3">
                <div className="collection-search-bar d-flex align-items-center justify-content-around mx-auto mx-md-0">
                  <img src={SearchIcon} alt="search-icon" className="ms-3" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
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
                          <option key={index} value={collection.label}>
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
                          <option key={index} value={collection.label}>
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
                      Collections={filterData.collections}
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
                            <ListingCards
                              CardImg={listing.image}
                              name={listing.name}
                              price={listing.currentPrice}
                              handleLikesTogleApi={handleLikesTogleApi}
                              id={listing._id}
                              likesCount={listing.likeCount}
                              likedNfts={likedNfts}
                              ownerId={listing.ownerId}
                            />
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

const mapStateToProps = (state) => (
  
  {
  nft: state.nft,
  myLikedNfts: state.nft.myLikedNfts,
  myLikedNftsStatus: state.nft.myLikedNftsStatus,
  user: state.user,
  getAuth: state.collection.getAuth,
  collections: state.collection.collections,
});

export default connect(mapStateToProps, {
  beforeNFT,
  getNFTs,
  getCreators,
  toggleLikeDislike,
  getCollections,
  getMyLikedNfts,
})(AllNFT);
