import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import "./UserProfile.scss";
import { ENV } from "../../config/config";
import {
  getProfileNfts,
  getNFTs,
  beforeNFT,
  getMyLikedNfts,
} from "../../Components/Nfts/nfts.action";
import {
  toggleLikeDislike,
  beforeTogleLikeDislike,
} from "../all-nfts/explore.action";
import { getUserById, beforeUser } from "../../Components/User/user.action";
import darkModeContext from "../../context/darkmode/DarkModeContext";
import { Images } from "../../assets/assets";
import { validateNetwork } from "../../utils/web3";
import { toast } from "react-toastify";
import moment from "moment";
import Banner from "../../Components/Banner/Banner";
import BannerBg from "../../assets/images/profileBg.png";
import BannerDark from "../../assets/images/bannerbg.png";
import BannerLight from "../../assets/images/bannerbg2.png";
import EthIcon from "../../assets/images/eth-icon.svg";
import CopyIcon from "../../assets/images/copy-icon.svg";
import Listing from "../../Components/Listing/Listing";
import {
  beforeCollection,
  getCollections,
} from "../collections/collections.actions";
import { Link } from "react-router-dom";
import OwnCollectionToday from "../../Components/OwnCollectionToday/OwnCollectionToday";
import { useHistory } from "react-router";

const UserProfile = (props:any) => {
  const [isAddressCopied, setAddressCopied] = useState<boolean>(false);
  const [nfts, setNFTs] = useState<any>([]); // NFTs for explore section
  const [nftsCopy, setNFTsCopy] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [filterationLoader, setFilterationLoader] = useState<boolean>(true);
  const [user, setUser] = useState<any>("");
  const [likedNfts, setLikedNfts] = useState<any>();
  const [likeButtonDisable, setLikeBtnDisable] = useState<any>(null);
  const [initial, setInitial] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [copy, setCopy] = useState<boolean>(false);
  const [collections, setCollections] = useState<any>(null);
  const [nftPagination, setNFTPagination] = useState<any>(null);
  const [dataLimit, setDataLimit] = useState<number>(10);
  const [menuFilter, setMenuFilter] = useState<any>(false);
  const [accAddress, setAccountAddress] = useState<string>(props.connectedAddress);
  const { darkMode } = useContext(darkModeContext);
  const userId = ENV.getUserKeys("_id")._id;
  const history = useHistory();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const {
      getProfileNfts,
      getMyLikedNfts,
      beforeUser,
      getUserById,
      getCollections,
    } = props;
    let searchQs:any = { page: 1, limit: 99999 };
    searchQs = ENV.objectToQueryString(searchQs);
    getProfileNfts(searchQs);
    let likedNftsQs:any = { userId };
    likedNftsQs = ENV.objectToQueryString(likedNftsQs);
    getMyLikedNfts(likedNftsQs);
    beforeUser();
    getUserById(ENV.getUserKeys("_id")._id);
    getCollections();
  }, []);

  useEffect(() => {
    if (props.getAuth) {
      let myCollections = props.collections.filter(
        (item:any) => item.userId === userId
      );
      setCollections(myCollections);
      props.beforeCollection();
    }
  }, [props.getAuth]);

  useEffect(() => {
    if (accAddress === "") {
      setAccountAddress(props.connectedAddress);
    }
    if (
      accAddress !== "" &&
      props.connectedAddress !== "" &&
      ENV.getUserKeys("address")?.address?.toUpperCase() !==
        props.connectedAddress.toUpperCase()
    ) {
      // toast.info("Please login with new connected Account user");
      localStorage.clear();
      history.push("/login");
    }
  }, [props.connectedAddress]);

  useEffect(() => {
    const { profileNFTsStatus, profileNFTs } = props;
    if (profileNFTsStatus) {
      const data = profileNFTs.nfts;
      if (!menuFilter) {
        const Nfts = data?.filter((item:any) => item.ownerId === userId);
        if (Nfts?.length > 0) {
          setDisabled(false);
        } else {
          if (initial) {
            setDisabled(true);
          }
        }
        setNFTs(Nfts);
        setNFTPagination({ total: Nfts?.length });
      } else {
        setNFTPagination(data.length);
        handleNftFilter(menuFilter, data);
      }
      setInitial(false);
      setNFTsCopy(data);
      setLoader(false);
      setFilterationLoader(false);
    }
  }, [props.profileNFTsStatus]);

  useEffect(() => {
    if (props.myLikedNftsStatus) {
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
    }, 3000);

  const getNFTs = (filter:any) => {
    props.beforeNFT();
    let nftQS:any={};
    if (filter) {
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
      nftQS = { page, limit: 99999 };
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
    const qs = ENV.objectToQueryString(nftQS);
    props.getProfileNfts(qs);
  };

  const handleLikesTogleApi = async (nftId:string, status:string, likesCount:number) => {
    if (await validateNetwork()) {
      if (!likeButtonDisable) {
        setLikeBtnDisable(true);

        let data = {
          userId,
          nftId,
          count: 1,
        };
        if ((status === "dislike") && (likesCount > 0)) {
          let result = likedNfts.filter((item:any) => item.nftId !== nftId);
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
      }
    } else {
      toast.error("Please Connect Your Metamask With Ethereum Rinkby Network");
    }
  };

  const increOrDecreLikes = (id:string, status:string) => {
    if (status === "dec") {
      let newResult = nfts.map((item:any) => {
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
      let final = nfts.map((item:any) => {
        if (item._id !== id) {
          return item;
        } else {
          return { ...item, likeCount: item.likeCount + 1 };
        }
      });
      setNFTs(final);
    }
  };

  const handleNftFilter = (id:string, data = false) => {
    let itemsToFilter = data ? data : nftsCopy;
    setInitial(false);
    if (id === "Collected") {
      const Nfts = itemsToFilter.filter(
        (item:any) => item.creatorId !== userId && item.ownerId === userId
      );
      setDataLimit(10);
      setNFTPagination({ total: Nfts.length });
      setNFTs(Nfts);
    } else if (id === "Created") {
      const Nfts = itemsToFilter.filter(
        (item:any) => item.ownerId === userId && item.creatorId === userId
      );

      setDataLimit(10);
      setNFTPagination({ total: Nfts.length });
      setNFTs(Nfts);
    } else {
      handleFavFilter(itemsToFilter);
    }
  };

  const handleFavFilter = (data = false) => {
    let itemToFilter = data ? data : nftsCopy;
    let favNfts = [];
    for (var item of itemToFilter) {
      let foundNft = likedNfts.find((liked:any) => liked.nftId === item._id);
      if (foundNft) {
        favNfts.push(item);
      }
    }
    setDataLimit(10);
    setNFTPagination({ total: favNfts.length });
    setNFTs(favNfts);
  };

  const fetchData = (filterObj:any) => {
    getNFTs(filterObj);
  };
  const getPaginatedData = () => {
    setDataLimit((prev) => prev + 10);
  };

  const bannerData = {
    subHeading: "Information",
    heading: "User Profile",
  };
  const menuData = ["Collected", "Created", "Favourited"];
  if (
    props.connectedAddress === "" ||
    ENV.getUserKeys("address")?.address?.toUpperCase() ===
      props.connectedAddress?.toUpperCase()
  ) {
    return (
      <>
        <section className="user-profile pt-0">
          <Banner
            subHeading={bannerData.subHeading}
            heading={bannerData.heading}
            bgImg={darkMode ? BannerDark : BannerLight}
            userprofile={true}
            // className="mb-0"
          />
          <div className="user-detail-content">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex flex-column flex-md-row align-items-center align-items-sm-start">
                    <div className="user-avatar-edit">
                      <div className="ms-lg-5 user-owner-avatar user-avatar-container me-3">
                        <img
                          src={
                            user?.profileImage
                              ? user.profileImage
                              : Images.placeholderImg
                          }
                          alt="owner-avatar"
                        />
                      </div>
                      <Link to="/editprofile" className="user-edit-icon">
                        <img src={Images.editIconSmall} />
                      </Link>
                    </div>
                    <div className="user-owner-detail text-center text-sm-start mt-4">
                      {user && (
                        <div className="user-owner-name">
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
                                <img
                                  src={EthIcon}
                                  alt="eth-icon"
                                  className="me-1"
                                />

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
                            <p className="join-date">
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
          <Listing
            collections={collections}
            disabled={disabled}
            totalItems={nfts && nfts.length}
            filterationLoader={filterationLoader}
            setFilterationLoader={setFilterationLoader}
            nfts={nfts?.slice(0, dataLimit)}
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
        <OwnCollectionToday />
      </>
    );
  } else {
    toast.info("Please login with new connected account");
    localStorage.clear();
    history.push("/login");
    return <React.Fragment>{" "}</React.Fragment> ;
  }
};

const mapStateToProps = (state:any) => ({
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
  connectedAddress: state.wallet.connectedAddress,
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
