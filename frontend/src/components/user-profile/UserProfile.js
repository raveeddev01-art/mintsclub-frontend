import React, { useState, useEffect } from "react";
import NavbarMain from "../../Screens/rough/navbar-main/NavbarMain";
import Footer from "../footer/footer";
import { connect } from "react-redux";
import "./UserProfile.css";
import { ENV } from "../../config/config";
import Avatar from "../../assets/images/detail-avatar.png";
import FlagIcon from "../../assets/images/detail-flag.svg";
import ShareIcon from "../../assets/images/detail-share.svg";
import TickIcon from "../../assets/images/seller-tick-icon.svg";
import SearchIcon from "../../assets/images/nav-search-icon.svg";
import ListingCards from "../../Screens/rough/listing-cards/ListingCards";
import { ListingImg } from "../../assets/assets";
import FilterComponent from "../filter-component/FilterComponent";
import BannerImg from "../../assets/images/collection-detailBg.png";
import { getProfileNfts, beforeNFT, getMyLikedNfts } from "../nfts/nfts.action";
import { toggleLikeDislike } from "../explore/explore.action";

const UserProfile = (props) => {
  const [isActive, setIsActive] = useState(0);
  const [isAddressCopied, setAddressCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const [nftPagination, setNFTPagination] = useState(null);
  const [nfts, setNFTs] = useState([]); // NFTs for explore section
  const [nftsCopy, setNFTsCopy] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [intro, setIntro] = useState(false);
  const [creators, setCreator] = useState([]);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
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
  const [menuFilter, setMenuFilter] = useState("");
  const itemoptions = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
  ];

  const priceoptions = [
    { value: "lowtohigh", label: "Low To High" },
    { value: "hightolow", label: "High To Low" },
    { value: "oldest", label: "Oldest" },
    { value: "newest", label: "Recantly Created" },
  ];

  useEffect(() => {
    let qs = { ownerId: ENV.getUserKeys("_id")._id };
    console.log(qs, "qs for user profile");
    qs = ENV.objectToQueryString(qs);
    props.getProfileNfts(qs);
    let likedNftsQs = { userId: ENV.getUserKeys("_id")._id };
    likedNftsQs = ENV.objectToQueryString(likedNftsQs);
    props.getMyLikedNfts(likedNftsQs);
  }, []);

  useEffect(() => {
    if (props.profileNFTsStatus) {
      if (!menuFilter) {
        const Nfts = props.profileNFTs.nfts.filter(
          (item) => item.creatorId !== ENV.getUserKeys("_id")._id
        );
        setNFTs(Nfts);
        setNFTsCopy(props.profileNFTs.nfts);
        setLoader(false);
        setFilterationLoader(false);
      } else {
        setNFTsCopy(props.profileNFTs.nfts);
        handleNftFilter(menuFilter);
        setLoader(false);
        setFilterationLoader(false);
      }
    }
  }, [props.profileNFTsStatus]);
  useEffect(() => {
    if (props.myLikedNftsStatus) {
      setLikedNfts(props.myLikedNfts);
    }
  }, [props.myLikedNftsStatus]);
  const ChangeTooltip = () =>
    setTimeout(() => {
      setAddressCopied(false);
    }, 1000);
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
    props.beforeNFT();
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
    nftQS.ownerId = ENV.getUserKeys("_id")._id;

    const qs = ENV.objectToQueryString(nftQS);
    console.log(qs, "qs indknf");
    props.getProfileNfts(qs);
  };
  const handleSortOptions = (e) => {
    setFilterationLoader(true);

    const { value } = e.target;
    console.log(value, "value");

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

  const handleNftFilter = (id) => {
    if (id === "Collected") {
      const Nfts = nftsCopy.filter(
        (item) => item.creatorId !== ENV.getUserKeys("_id")._id
      );
      setNFTs(Nfts);
    } else if (id === "Created") {
      const Nfts = nftsCopy.filter(
        (item) =>
          item.ownerId === ENV.getUserKeys("_id")._id &&
          item.creatorId === ENV.getUserKeys("_id")._id
      );
      setNFTs(Nfts);
    } else {
      handleFavFilter();
    }
  };

  const handleFavFilter = () => {
    let favNfts = [];
    nftsCopy.map((item) => {
      let foundNft = likedNfts.find((liked) => liked.nftId === item._id);
      if (foundNft) {
        favNfts.push(item);
      }
    });

    setNFTs(favNfts);
  };

  const accountAddress = "0xe0106f010067b130e4c96f119c214c30c94cead1";
  const menuData = ["Collected", "Created", "Favourited"];
  console.log(likedNfts, "likedNfts");

  return (
    <>
      <NavbarMain />
      <div className="collection-detail-hero">
        <img src={BannerImg} alt="BannerImg" />
      </div>
      <div className="collection-detail-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="collection-owner-avatar text-center">
                <img src={Avatar} alt="owner-avatar" />
              </div>
              <div className="collection-owner-detail text-center mt-3">
                <div className="collection-owner-name">
                  <h3>User Name</h3>
                </div>
                <div
                  className="user-address mt-4 d-flex align-items-center "
                  onClick={() => {
                    navigator.clipboard.writeText(accountAddress);
                    setAddressCopied(true);
                    ChangeTooltip();
                  }}
                >
                  <i className="fab fa-ethereum"></i>
                  <span>{isAddressCopied ? "Copied" : "Copy"}</span>
                  <p className="acc-adress">
                    {accountAddress.slice(0, 10) +
                      "..." +
                      accountAddress.slice(-10)}
                  </p>
                </div>
                <p>
                  Joined <span>February 2022</span>
                </p>
              </div>
            </div>
          </div>
          <div className="collections-listing padding-wrapper">
            <div className="row g-3 align-items-center justify-content-center justify-content-lg-start ">
              <div className="col-12">
                <div className="explore-collection-section">
                  <div className="explore-collection-nav">
                    <div className="d-flex justify-content-center justify-content-md-end align-items-center">
                      {menuData.map((item, id) => {
                        return (
                          <button
                            onClick={() => {
                              setIsActive(id);
                              handleNftFilter(item);
                              setMenuFilter(item);
                            }}
                            className={`${
                              id === isActive ? "active-explore-nav" : ""
                            } me-2 me-xl-3`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
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
                    {priceoptions &&
                      priceoptions.map((collection, index) => {
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
                      Chains={filterData.chains}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-10 col-sm-4 col-md-3 col-lg-3 d-none d-sm-block">
                <FilterComponent
                  Status={filterData.status}
                  Chains={filterData.chains}
                  collectionsLabel={"Collections"}
                  onChangeMinPrice={onChangeMinPrice}
                  onChangeMaxPrice={onChangeMaxPrice}
                  minValue={minValue}
                  maxValue={maxValue}
                  applyMinMaxFilter={applyMinMaxFilter}
                  handleCollectionsFilter={handleCollectionsFilter}
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
                          <ListingCards
                            CardImg={listing.image}
                            name={listing.name}
                            price={listing.currentPrice}
                            handleLikesTogleApi={handleLikesTogleApi}
                            id={listing._id}
                            likesCount={listing.likeCount}
                            likedNfts={likedNfts}
                            ownerId={listing.ownerId}
                            // userProfile
                          />
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-white text-center mt-5">No NFTs Found</p>
                  )}
                </div>
                <div className="col-12">
                  <div className="mt-5 text-center">
                    {nfts &&
                      props.profileNFTs.pagination > nfts.length &&
                      nfts.length > 10 && (
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
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  profileNFTs: state.nft.profileNFTs,
  profileNFTsStatus: state.nft.profileNFTsStatus,
  myLikedNfts: state.nft.myLikedNfts,
  myLikedNftsStatus: state.nft.myLikedNftsStatus,
});

export default connect(mapStateToProps, {
  getProfileNfts,
  beforeNFT,
  toggleLikeDislike,
  getMyLikedNfts,
})(UserProfile);
