import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./allnft.css";
import { beforeNFT, getNFTs, getMyLikedNfts } from "../../nfts/nfts.action";
import { ENV } from "../../../config/config";
import { getCreators, beforeUser } from "./../../user/user.action";
import FullPageLoader from "../../full-page-loader/full-page-loader";
import { toggleLikeDislike, beforeTogleLikeDislike } from "../explore.action";
import {
  beforeCollection,
  getCollections,
} from "../../collections/collections.actions";
import { validateNetwork } from "../../../utils/web3";
import { toast } from "react-toastify";
import NftCard from "../../nft-card/nft-card";
import FilterHoc from "../../filter-hoc/filterHoc";
import Banner from "../../banner/banner";
import BannerBg from "../../../assets/images/hero-bg.png";
import BannerImage from "../../../assets/images/bannerimg.png";
import OwnCollectionToday from "../../own-collection-today/own-collection-today";
const bannerData = {
  subHeading: "Explore",
  heading: "All NFTs",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

const priceOptions = [
  { value: "lowtohigh", label: "Low To High" },
  { value: "hightolow", label: "High To Low" },
  { value: "oldest", label: "Oldest" },
  { value: "newest", label: "Recantly Created" },
];

const AllNFT = (props) => {
  const [nftPagination, setNFTPagination] = useState(null);
  const [nfts, setNFTs] = useState([]); // NFTs for explore section
  const [loader, setLoader] = useState(true);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
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
  const [statusActive, setStatusActive] = useState(null);
  const [collectionActive, setCollectionActive] = useState(null);
  const [selectedOption, setSelectedOption] = useState();
  const [filterActive, setFilterActive] = useState(false);
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
      window.history.replaceState(null, "");
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
  useEffect(() => {
    getNFTs();
  }, [filter]);

  const getNFTs = () => {
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
    } = filter;
    const nftQS = { page, limit };
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

    const qs = ENV.objectToQueryString(nftQS);
    console.log(qs, "query string of all nfts");
    props.getNFTs(qs);
  };

  const handleSortOptions = (e) => {
    setFilterationLoader(true);
    setInitial(false);

    const { label } = e;
    if (label === "Low To High") {
      setFilter((prev) => ({
        ...prev,
        lowToHigh: true,
        highToLow: false,
        oldest: false,
        newest: false,
      }));
    } else if (label === "High To Low") {
      setFilter((prev) => ({
        ...prev,
        highToLow: true,
        lowToHigh: false,
        oldest: false,
        newest: false,
      }));
    } else if (label === "Oldest") {
      setFilter((prev) => ({
        ...prev,
        oldest: true,
        highToLow: false,
        lowToHigh: false,
        newest: false,
      }));
    } else if (label === "Recantly Created") {
      setFilter((prev) => ({
        ...prev,
        newest: true,
        oldest: false,
        highToLow: false,
        lowToHigh: false,
      }));
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
  };

  const applyMinMaxFilter = () => {
    setInitial(false);
    setFilterationLoader(true);

    setFilter((prev) => ({ ...prev, gtePrice: minValue, ltePrice: maxValue }));
  };

  const handleCollectionsFilter = (id) => {
    setInitial(false);
    setFilterationLoader(true);
    setFilter((prev) => ({ ...prev, collectionId: id }));
  };

  const handleSearchKeyword = (value) => {
    setInitial(false);
    setFilterationLoader(true);
    setFilter((prev) => ({ ...prev, keyword: value }));
  };

  const handleStatusFilter = (id) => {
    setInitial(false);
    setFilterationLoader(true);
    if (id === "Buy Now") {
      setFilter((prev) => ({
        ...prev,
        buy: true,
        auction: false,
        newest: false,
      }));
    } else if (id === "On Auction") {
      setFilter((prev) => ({
        ...prev,
        auction: true,
        buy: false,
        newest: false,
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        newest: true,
        buy: false,
        auction: false,
      }));
    }
  };
  const handleLikesTogleApi = async (nftId, status, likesCount) => {
    if (await validateNetwork()) {
      if (!likeButtonDisable || likeButtonDisable === null) {
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
  const handleClearFilter = (id) => {
    console.log();
    if (id === "status") {
      setFilter((prev) => ({
        ...prev,
        buy: false,
        auction: false,
        new: false,
      }));
    } else if (id === "price") {
      setMinValue("");
      setMaxValue("");
      setFilter((prev) => ({ ...prev, ltePrice: false, gtePrice: false }));
    } else if (id === "collections") {
      setFilter((prev) => ({ ...prev, collectionId: false }));
    } else {
      console.log("else");
      setStatusActive(null);
      setCollectionActive(null);
      setSelectedOption(null);
      setFilterActive(null);

      setFilter({
        collectionId: false,
        gtePrice: false,
        ltePrice: false,
        categoryId: false,
        oldest: false,
        lowToHigh: false,
        highToLow: false,
        newest: false,
        page: filter.page,
        limit: filter.limit,
        buy: false,
        auction: false,
        latest: false,
      });
    }
  };

  return (
    <>
      <section className="explore-collection-section padding-wrapper pt-0">
        <Banner
          subHeading={bannerData.subHeading}
          heading={bannerData.heading}
          content={bannerData.content}
          bgImg={BannerBg}
          bannerImg={BannerImage}
        />

        <FilterHoc
          handleCollectionsFilter={handleCollectionsFilter}
          handleStatusFilter={handleStatusFilter}
          collections={collections}
          onChangeMinPrice={onChangeMinPrice}
          onChangeMaxPrice={onChangeMaxPrice}
          minValue={minValue}
          maxValue={maxValue}
          applyMinMaxFilter={applyMinMaxFilter}
          disabled={disabled}
          totalItems={nfts && nfts.length}
          priceOptions={priceOptions}
          handleSortOptions={handleSortOptions}
          keyword={keyword}
          setKeyword={setKeyword}
          handleSearchKeyword={handleSearchKeyword}
          handleClearFilter={handleClearFilter}
          statusActive={statusActive}
          collectionActive={collectionActive}
          selectedOption={selectedOption}
          filterActive={filterActive}
          setStatusActive={setStatusActive}
          setCollectionActive={setCollectionActive}
          setSelectedOption={setSelectedOption}
          setFilterActive={setFilterActive}
        >
          {loader ? (
            <FullPageLoader />
          ) : (
            <div className="row g-1">
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
                nfts.map((nft, index) => {
                  return (
                    <div
                      key={index}
                      className="col-12 col-sm-6 col-md-4 col-lg-6 col-xl-4"
                    >
                      {
                        <NftCard
                          data={nft}
                          handleLikesTogleApi={handleLikesTogleApi}
                          likedNfts={likedNfts}
                        />
                      }
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
        </FilterHoc>
      </section>
      <OwnCollectionToday />
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
