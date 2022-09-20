import { useState, useEffect, useContext, FC } from "react";
import "./explore-collections.scss";
import CollectionsCard from "../../Components/CollectionsCards/CollectionsCard";
import { connect } from "react-redux";
import { ENV } from "../../config/config";
import {
  beforeCollection,
  getCollections,
  toggleLikeDislike,
  beforeCategory,
  getCategories,
} from "../collections/collections.actions";
import { Images } from "../../assets/assets";
import FullPageLoader from "../../Components/FullPageLoader/FullPageLoader";
import OwnCollectionToday from "../../Components/OwnCollectionToday/OwnCollectionToday";
import Banner from "../../Components/Banner/Banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg.png";
import { exploreCollectionBanner } from "../../utils/exportData";
import { ExploreCollectionInt } from "../../interfaces/ExploreCollections/interface";
import { useGetCollections } from "../../hooks/AllNFTs";
import { useGetCategories } from "../../hooks/PopularCollections";
import errorHandler from "../../context/errorHandler/ErrorHandlerContext";

const ExploreCollections: FC<ExploreCollectionInt> = (props) => {
  const [isActive, setIsActive] = useState("All");
  const [collections, setCollections] = useState<any[] | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<any[] | null>(null);
  const [empty, setEmpty] = useState(false);
  const [pagination, setPagination] = useState<any>(null);
  const { setError } = useContext(errorHandler);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const onSuccessCollections = (data: any) => {
    if (data.data.success) {
      const { collections, pagination } = data.data.data;
      if (collections.length > 0) {
        setEmpty(false);
      }
      setCollections(collections);
      setPagination(pagination);
    } else {
      setError(data.data.message);
    }
  };
  const { isLoading: isLoadinCollections } = useGetCollections(
    onSuccessCollections,
    true,
    ENV.objectToQueryString({
      page: page,
      limit: limit,
      myFilter: selectedCategory,
    })
  );
  const onSuccessCategories = (data: any) => {
    if (data.data.success) {
      setCategories(data.data.categories);
    } else {
      setError(data.data.message);
    }
  };

  const {
    isFetching: isFetchingCategories,
    isLoading: isCategoryLoading,
  }: any = useGetCategories(
    (error: any) => console.log(error),
    onSuccessCategories
  );

  const handlePagination = () => {
    window.scroll(0, 500);
    setPage(page);
    setLimit(limit + 10);
  };
  const handleImage = (item: any, index: number) => {
    if (item?.nftDetail[index]?.image) {
      let result = item.nftDetail.filter(
        (nft: any) => nft.fileType === "image"
      );
      if (result.length >= index && result.length !== 0) {
        return result[index]?.image;
      } else {
        return Images.imagePlaceholder;
      }
    } else {
      return Images.imagePlaceholder;
    }
  };

  

  return (
    <>
      {isCategoryLoading && isLoadinCollections ? (
        <FullPageLoader />
      ) : (
        <section className="explore-collection-section padding-wrapper pt-0">
          <Banner
            subHeading={exploreCollectionBanner.subHeading}
            heading={exploreCollectionBanner.heading}
            content={exploreCollectionBanner.content}
            bgImg={BannerBg}
            bannerImg={BannerImage}
          />
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 explore-collection-nav">
                <div className="d-none d-xxl-flex justify-content-lg-end text-end align-items-center">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item: any, index: number) => {
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setIsActive(item.name);
                            setSelectedCategory(item.description);
                          }}
                          className={`${
                            item.name === isActive ? "active-explore-nav" : ""
                          } me-2 me-xl-3`}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                </div>
                <div className="row justify-content-center justify-content-sm-start align-items-center text-center d-xxl-none">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item: any, index: any) => {
                      return (
                        <div className="col-6 col-sm-3" key={index}>
                          <button
                            onClick={() => {
                              setIsActive(item.name);
                              setSelectedCategory(item.description);
                            }}
                            className={
                              isActive === item.name ? "active-explore-nav" : ""
                            }
                          >
                            {item.name}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="row g-1 align-items-center justify-content-center">
              {isLoadinCollections ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : collections && collections.length > 0 ? (
                collections.map((collection: any, index: number) => {
                  return (
                    <div className="col-sm-6 col-md-4 col-xl-3" key={index}>
                      <CollectionsCard
                        CardImg={collection.featuredImg}
                      
                        Subimg1={handleImage(collection, 0)}
                        Subimg2={handleImage(collection, 1)}
                        Subimg3={handleImage(collection, 2)}
                        name={collection.name}
                        id={collection._id}
                        collection={collection}
                        userName={
                          collection?.username[0] ? collection.username[0] : ""
                        }
                        NFTCount={
                          collection.TotalNfts
                            ? collection.TotalNfts
                            : 0
                        }
                        profileImage={collection?.profileImage[0]}
                        ownerAddress={collection?.ownerAddress}
                        connectedAddress={props.connectedAddress}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-center not-found-title mt-5">
                  No Collections found
                </p>
              )}
              <div className="col-12">
                <div className="mt-5 d-flex justify-content-center align-items-center">
                  {!empty &&
                    collections?.length === 10 &&
                    !isLoadinCollections &&
                    pagination.totalRecords > collections.length && (
                      <button
                        className="btn btn-rounded-bordered px-5"
                        onClick={() => handlePagination()}
                      >
                        Load more...
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
          <OwnCollectionToday />
        </section>
      )}
    </>
  );
};
const mapStateToProps = (state: any) => ({
  collection: state.collection,
  error: state.error,
  category: state.category,
  categories: state.collection,
  pagination: state.pagination,
  connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {
  beforeCollection,
  getCollections,
  beforeCategory,
  getCategories,
  toggleLikeDislike,
})(ExploreCollections);
