import { useState, useEffect, FC } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./collectiondetails.scss";
import TickIcon from "../../assets/images/seller-tick-icon.svg";
import { connect } from "react-redux";
import { ENV } from "../../config/config";
import { validateNetwork } from "../../utils/web3";
import Listing from "../../Components/Listing/Listing";
import { toast } from "react-toastify";
import Banner from "../../Components/Banner/Banner";
import BannerBg from "../../assets/images/profileBg.png";
import { Images } from "../../assets/assets";
import OwnCollectionToday from "../../Components/OwnCollectionToday/OwnCollectionToday";
import { CollectionDetailInt } from "../../interfaces/CollectionDetail/interface";
import {
  useGetMyLikedNFTs,
  useGetNFTs,
} from "../../hooks/CollectionDetails";
import {useInsertData} from "../../hooks/Common"


const CollectionDetailsPage: FC<CollectionDetailInt> = (props) => {
  const [nfts, setNfts] = useState<any>(null);
  const [filterationLoader, setFilterationLoader] = useState<boolean>(true);
  const [likedNfts, setLikedNfts] = useState<Array<any> | null>(null);
  const [likeButtonDisable, setLikeBtnDisable] = useState<boolean | null>(null);
  const [nftPagination, setNFTPagination] = useState<object | null>(null);
  const [disabled, setDisabled] = useState(false);
  const location: any = useLocation();
  const [filter, setFilter] = useState<any>({
    collectionId: location.state.id,
  });
  const history = useHistory();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  ////Get My liked NFTs
  const onSuccessLikedNFTs = (data: any) => {
    setLikedNfts(data.data.data);
  };
  const {} = useGetMyLikedNFTs(
    ENV.objectToQueryString({ userId: ENV.getUserKeys("_id")._id }),
    onSuccessLikedNFTs,
    nfts
  );

  //Get NFTs

  const onSuccessNFTs = (data: any) => {
    setFilterationLoader(false);
    setNFTPagination(data.data.data.pagination);
    setNfts(data.data.data.nfts);
  };

  const { isLoading: isLoadingNFTs } = useGetNFTs(filter, onSuccessNFTs);

  const onSuccessLikeDislike = () => {
    setLikeBtnDisable(false);
  };

  //Like/Dislike
  const { mutate } = useInsertData("nftLikes/likeDislike",onSuccessLikeDislike);

  ///////////Likes
  const handleLikesTogleApi = async (
    nftId: string,
    status: string,
    likesCount: number
  ) => {
    if (ENV.getUserKeys("_id")?._id) {
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
            let result = likedNfts?.filter((item) => item.nftId !== nftId);
            if (result) {
              setLikedNfts(result);
            }
            increOrDecreLikes(nftId, "dec");
            mutate(body);
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
            mutate(body);
          }
          // setNFTs(nfts);
        }
      } else {
        toast.error(
          "Please Connect Your Metamask With Ethereum Rinkby Network"
        );
      }
    } else {
      history.push("/login");
    }
  };

  const increOrDecreLikes = (id: string, status: string) => {
    if (status === "dec") {
      let newResult = nfts?.map((item: any) => {
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
      let final = nfts?.map((item: any) => {
        if (item._id !== id) {
          return item;
        } else {
          return { ...item, likeCount: item.likeCount + 1 };
        }
      });
      setNfts(final);
    }
  };

  const fetchData = (filterObj: object) => {
    setFilter(filterObj);
  };
  const { name, logo, description, username }: any = location.state;

  const bannerData = {
    subHeading: "Nfts",
    heading: "Collections Info",
  };

  return (
    <>
      <section className="user-profile pt-0">
        <Banner
          subHeading={bannerData.subHeading}
          heading={bannerData.heading}
          bgImg={BannerBg}
        />
        <div className="collection-detail-content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="d-flex flex-column flex-md-row align-items-center align-items-sm-start">
                  <div className="ms-lg-5 collection-owner-avatar user-avatar-container me-3 flex-fill">
                    <img
                      src={logo ? logo : Images.profilePlaceholder}
                      alt="owner-avatar"
                    />
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
                      {username?.[0] && (
                        <div>
                          <p>
                            Created By: <span>{username?.[0]}</span>
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="collection-owner-description mt-3">
                      <p>{description && description} </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-7 col-md-6 col-lg-5"></div>
            </div>
          </div>
        </div>
        <Listing
          disabled={disabled}
          totalItems={nfts && nfts.length}
          filterationLoader={filterationLoader}
          setFilterationLoader={setFilterationLoader}
          nfts={nfts}
          loader={isLoadingNFTs}
          likedNfts={likedNfts}
          nftPagination={nftPagination}
          handleLikesTogleApi={handleLikesTogleApi}
          fetchData={fetchData}
          path="/explore/nftdetail/"
          collectionDetail
        />
      </section>
      <OwnCollectionToday />
    </>
  );
};
const mapStateToProps = (state: any) => ({
  nft: state.nft,
  user: state.user,
});

export default connect(mapStateToProps, {})(CollectionDetailsPage);
