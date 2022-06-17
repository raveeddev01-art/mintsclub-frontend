import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./allnft.css";
import { beforeNFT, getNFTs, getMyLikedNfts } from "../../nfts/nfts.action";
import { ENV } from "../../../config/config";
import { getCreators, beforeUser } from "./../../user/user.action";
import { toggleLikeDislike, beforeTogleLikeDislike } from "../explore.action";
import {
  beforeCollection,
  getCollections,
} from "../../collections/collections.actions";
import { validateNetwork } from "../../../utils/web3";
import { toast } from "react-toastify";
import FilterComponent from "../../filterComponent/filterComponent";
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


const AllNFT = (props) => {
  const [nftPagination, setNFTPagination] = useState(null);
  const [nfts, setNFTs] = useState([]); // NFTs for explore section
  const [loader, setLoader] = useState(true);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [collections, setCollections] = useState([]);
  const [filterationLoader, setFilterationLoader] = useState(true);
  const [likedNfts, setLikedNfts] = useState();
  const [likeButtonDisable, setLikeBtnDisable] = useState(null);
  const [initial, setInitial] = useState(true);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    props.getCreators();
    props.getCollections();
    if (props?.location?.state) {
      props.beforeNFT();
      let searchQs = { keyword: props.location.state, page: 1, limit: 10 };
      window.history.replaceState(null, "");
      searchQs = ENV.objectToQueryString(searchQs);
      console.log(searchQs, "searchQs");
      setFilterationLoader(true);
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
      if(page){
        nftQS.page=page;
      } else {
        nftQS.page=1;
      }
      if(limit){
        nftQS.limit=limit;
      } else {
        nftQS.limit=10;
      }
    }
    const qs = ENV.objectToQueryString(nftQS);
    console.log(qs, "query string of all nfts");
    props.getNFTs(qs);
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
  const fetchData = (filterObj) => {
  
      getNFTs(filterObj);
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

        <FilterComponent
          collections={collections}
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
          initialKeyword={props?.location?.state}
          path="/explore/nftdetail/"
        />
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
