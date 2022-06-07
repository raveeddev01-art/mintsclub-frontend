import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./UserProfile.css";
import { ENV } from "../../config/config";
import {
  getProfileNfts,
  getNFTs,
  beforeNFT,
  getMyLikedNfts,
} from "../nfts/nfts.action";
import {
  toggleLikeDislike,
  beforeTogleLikeDislike,
} from "../explore/explore.action";
import { getUserById, beforeUser } from "../user/user.action";
import { Images } from "../../assets/assets";
import { validateNetwork } from "../../utils/web3";
import { toast } from "react-toastify";
import moment from "moment";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/profileBg.png";
import EthIcon from "../../assets/images/eth-icon.svg";
import CopyIcon from "../../assets/images/copy-icon.svg";
import FilterComponent from "../filterComponent/filterComponent";
import {
  beforeCollection,
  getCollections,
} from "../collections/collections.actions";
import { Link } from "react-router-dom";

const UserProfile = (props) => {
  const [isAddressCopied, setAddressCopied] = useState(false);
  const [nfts, setNFTs] = useState([]); // NFTs for explore section
  const [nftsCopy, setNFTsCopy] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filterationLoader, setFilterationLoader] = useState(true);
  const [user, setUser] = useState("");
  const [likedNfts, setLikedNfts] = useState();
  const [likeButtonDisable, setLikeBtnDisable] = useState(null);
  const [initial, setInitial] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [copy, setCopy] = useState(false);
  const [collections, setCollections] = useState(null);
  const [nftPagination, setNFTPagination] = useState(null);
  const [dataLimit, setDataLimit] = useState(10);
  const [menuFilter, setMenuFilter] = useState(false);
  const userId = ENV.getUserKeys("_id")._id;
  console.log(userId, "userId");
  useEffect(() => {
    // let qs = { ownerId: ENV.getUserKeys("_id")._id };
    // qs = ENV.objectToQueryString(qs);

    props.beforeNFT();
    let searchQs = { page: 1, limit: 9999 };
    searchQs = ENV.objectToQueryString(searchQs);
    props.getNFTs(searchQs);
    let likedNftsQs = { userId };
    likedNftsQs = ENV.objectToQueryString(likedNftsQs);
    props.getMyLikedNfts(likedNftsQs);
    props.beforeUser();
    props.getUserById(ENV.getUserKeys("_id")._id);
    props.getCollections();
  }, []);

  useEffect(() => {
    if (props.getAuth) {
      let myCollections = props.collections.filter(
        (item) => item.userId === userId
      );
      setCollections(myCollections);
      props.beforeCollection();
    }
  }, [props.getAuth]);

  useEffect(() => {
    if (props.nft.nftsAuth) {
      setFilterationLoader(false);
      const { nfts, pagination } = props.nft.nftsData;
      
      if (!menuFilter) {
        console.log(props.nft.nftsData, "nfts");

        const Nfts = nfts?.filter(
          (item) =>  item.ownerId === userId
        );
        console.log(Nfts, "nfts123");
        if (Nfts.length > 0) {
          setDisabled(false);
        } else {
          if (initial) {
            setDisabled(true);
          }
        }
        setInitial(false)
        setNFTs(Nfts);
        setNFTsCopy(nfts);
        setNFTPagination({ total: Nfts.length });
        // setNFTPagination(pagination);
        setLoader(false);
      } else {
        // setNFTPagination(pagination);
        setInitial(false)
        setNFTsCopy(nfts);
        setNFTPagination(nfts.length)
        handleNftFilter(menuFilter);
        setLoader(false);
      }
    }
  }, [props.nft.nftsAuth]);

  useEffect(() => {
    if (props.myLikedNftsStatus) {
      console.log(props.myLikedNfts, "myLikedNfts==>");
      setLikedNfts(props.myLikedNfts);
    }
  }, [props.myLikedNftsStatus]);

  useEffect(() => {
    const { individualUserAuth, individualUser } = props;
    if (individualUserAuth) {
      setUser(individualUser);
    }
  }, [props.individualUserAuth]);

  useEffect(() => {
    if (props.togleLikeRes) {
      setLikeBtnDisable(false);
      props.beforeTogleLikeDislike();
    }
  }, [props.togleLikeRes]);

  const ChangeTooltip = () =>
    setTimeout(() => {
      setAddressCopied(false);
    }, 1000);

  const getNFTs = (filter) => {
    props.beforeNFT();
    let nftQS = {};
    if (filter) {
      console.log("inside=====>123",filter)
      const {
        page,
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
      nftQS = { page, limit:99999 };
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
    }
    // nftQS.ownerId = ENV.getUserKeys("_id")._id;
    const qs = ENV.objectToQueryString(nftQS);
    console.log(qs, "query string of all nfts");
    props.getNFTs(qs);
  };

  const handleLikesTogleApi = async (nftId, status, likesCount) => {
    if (await validateNetwork()) {
      if (!likeButtonDisable) {
        setLikeBtnDisable(true);

        let data = {
          userId,
          nftId,
          count: 1,
        };
        if ((status === "dislike") & (likesCount > 0)) {
          let result = likedNfts.filter((item) => item.nftId !== nftId);

          setLikedNfts(result);
          increOrDecreLikes(nftId, "dec");
          props.toggleLikeDislike(data);
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
          props.toggleLikeDislike(data);
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

  const handleNftFilter = (id) => {
    if (id === "Collected") {
      const Nfts = nftsCopy.filter(
        (item) => item.creatorId !== userId && item.ownerId === userId
      );
      setDataLimit(1);
      setNFTPagination({ total: Nfts.length });
      setNFTs(Nfts);
    } else if (id === "Created") {
      const Nfts = nftsCopy.filter(
        (item) => item.ownerId === userId && item.creatorId === userId
      );
      setDataLimit(1);
      setNFTPagination({ total: Nfts.length });
      setNFTs(Nfts);
    } else {
      handleFavFilter();
    }
  };

  const handleFavFilter = () => {
    let favNfts = [];
    for (var item of nftsCopy) {
      let foundNft = likedNfts.find((liked) => liked.nftId === item._id);
      if (foundNft) {
        favNfts.push(item);
      }
    }
    setDataLimit(1);
    setNFTPagination({ total: favNfts.length });
    setNFTs(favNfts);
  };

  const fetchData = (filterObj) => {
    if(!setInitial){

      getNFTs(filterObj);
    }
  };
  const getPaginatedData = () => {
    setDataLimit((prev) => prev + 10);
  };

  const bannerData = {
    subHeading: "Information",
    heading: "User Profile",
  };
  const menuData = ["Collected", "Created", "Favourited"];
  console.log(nftsCopy?.length,"length")
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
                  <div className="user-avatar-edit">
                    <div className="ms-lg-5 collection-owner-avatar user-avatar-container me-3">
                      <img
                        src={
                          user?.profileImage
                            ? user.profileImage
                            : Images.profilePlaceholder
                        }
                        alt="owner-avatar"
                      />
                    </div>
                    <Link to="/editprofile" className="user-edit-icon">
                      <img src={Images.editIconSmall} />
                    </Link>
                  </div>
                  <div className="collection-owner-detail text-center text-sm-start mt-4">
                    {user && (
                      <div className="collection-owner-name">
                        <h3>{user.username ? user.username : "unnamed"}</h3>
                      </div>
                    )}

                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
                      {user.address && (
                        <div className="user-address mt-2 d-flex  align-items-center ">
                          <span className={`${copy ? "d-block" : "d-none"}`}>
                            {isAddressCopied ? "Copied" : "Copy"}
                          </span>
                          {user && (
                            <>
                              <img src={EthIcon} alt="eth-icon" />

                              <p className="acc-adress d-none d-md-block">
                                {user.address}
                              </p>
                              <p className="acc-address d-md-none">
                                {user.address.slice(0, 10) +
                                  "..." +
                                  user.address.slice(-10)}
                              </p>

                              <img
                                onMouseLeave={() => {
                                  setCopy(false);
                                }}
                                onMouseOver={() => {
                                  setCopy(true);
                                }}
                                onClick={() => {
                                  navigator.clipboard.writeText(user.address);
                                  setAddressCopied(true);
                                  ChangeTooltip();
                                }}
                                src={CopyIcon}
                                alt="copy-icon"
                                className="user-address-copy ms-4"
                              />
                            </>
                          )}
                        </div>
                      )}

                      <div className="mt-2 mt-sm-0">
                        {user && (
                          <p>
                            Joined:{" "}
                            <span>
                              {moment(user.createdAt).format("MMMM DD YYYY")}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FilterComponent
          collections={collections}
          disabled={disabled}
          totalItems={nfts && nfts.length}
          filterationLoader={filterationLoader}
          setFilterationLoader={setFilterationLoader}
          nfts={nfts.slice(0, dataLimit)}
          loader={loader}
          likedNfts={likedNfts}
          handleLikesTogleApi={handleLikesTogleApi}
          handleNftFilter={handleNftFilter}
          nftPagination={nftPagination}
          fetchData={fetchData}
          setMenuFilter={setMenuFilter}
          menuData={menuData}
          path="/explore/nftdetail/"
          getPaginatedData={getPaginatedData}
          UserProfile
        />
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  profileNFTs: state.nft.profileNFTs,
  profileNFTsStatus: state.nft.profileNFTsStatus,
  myLikedNfts: state.nft.myLikedNfts,
  myLikedNftsStatus: state.nft.myLikedNftsStatus,
  individualUser: state.user.individualUser,
  individualUserAuth: state.user.individualUserAuth,
  togleLikeRes: state.explore.togleLikeRes,
  collections: state.collection.collections,
  getAuth: state.collection.getAuth,
  nft: state.nft,
});

export default connect(mapStateToProps, {
  getProfileNfts,
  getNFTs,
  beforeNFT,
  toggleLikeDislike,
  getMyLikedNfts,
  getUserById,
  beforeUser,
  beforeTogleLikeDislike,
  getCollections,
  beforeCollection,
})(UserProfile);
