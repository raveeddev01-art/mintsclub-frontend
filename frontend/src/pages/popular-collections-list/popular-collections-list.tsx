import { useState, useEffect, FC } from "react";
import CollectionsCard from "../../components/collections-cards/CollectionsCard";
import { connect } from "react-redux";
import { ENV } from "../../config/config";
import {
  beforePopularCollection,
  getPopularCollections,
  toggleLikeDislike,
  beforeCategory,
  getCategories,
} from "../collections/collections.actions";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
import { Images } from "../../assets/assets";
import Banner from "../../components/banner/banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg.png";
import OwnCollectionToday from "../../components/own-collection-today/own-collection-today";
import { popularBanner } from "../../utils/exportData";
import { PopularCollectionlistInt } from "../../interfaces/PopularCollectionsList/interface";

const Populars: FC<PopularCollectionlistInt> = (props) => {
  const [popular, setpopular] = useState([]);
  const [isActive, setIsActive] = useState("All");
  const [collections, setCollections] = useState(null);
  const [categoryId, setCategoryId] = useState("all");
  const [categoriesLoader, setCatLoader] = useState(true);
  const [collectionsLoader, setColLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<any[] | null>(null);
  const [empty, setEmpty] = useState(false);
  const [loader, setLoader] = useState(true);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    window.scroll(0, 0);

    if (props.setLoader) props.setLoader(false);

    getPopularCollections(null, 1, null);
    const qs = ENV.objectToQueryString({
      myFilter: "all",
    });

    props.getPopularCollections(qs);
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.getPopularAuth) {
      const collectionListing = props.popularCollections.collectionsList;
      const pagination = props.popularCollections.pagination;

      if (collectionListing) {
        collectionListing.forEach((element: any, i: number) => {
          if (element.likesCount.length > 0) {
            var sumLikes = element.likesCount.reduce(function (
              a: number,
              b: number
            ) {
              return a + b;
            },
            0);
            collectionListing[i].likesCount = sumLikes;
          }
          collectionListing[i].likesCount = 0;

          collectionListing[i].totalNfts = element.nfts[0].image
            ? element.nfts?.length
            : 0;
          if (element.soldCopies.length > 0) {
            var soldCopiesSum = element.soldCopies.reduce(function (
              a: number,
              b: number
            ) {
              return a + b;
            },
            0);
            collectionListing[i].soldCopies = soldCopiesSum;
          }

          collectionListing[i].soldCopies = 0;
        });
      }

      const finalCollectionListing = collectionListing.sort(
        (a: any, b: any) =>
          b.likesCount - a.likesCount || b.soldCopies - a.soldCopies
      );

      setPagination(pagination);
      const userId = ENV.getUserKeys("_id")._id;
      if (props.finalCollectionListing) {
        let finalCollectionListing = props.finalCollectionListing.filter(
          (item: any) => item.userId === userId
        );
        setpopular(finalCollectionListing);
      } else {
        if (finalCollectionListing === null) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
        setpopular(finalCollectionListing);

        setColLoader(false);
        setLoader(false);
      }
      props.beforePopularCollection();
    }
  }, [props.getPopularAuth]);

  useEffect(() => {
    if (props.getPopularAuth) {
      setCategories(props.collection.categories);

      props.beforeCategory();
      setCatLoader(false);
    }
  }, [props.getPopularAuth]);

  const getPopularCollections = (
    category: string | null,
    page: number | null,
    pageLimit: number | null
  ) => {
    const filter: any = {
      page,
    };

    if (props.userId) filter.userId = props.userId;
    if (props.popular) filter.popular = true;
    if (category) filter.myFilter = category;
    if (!props.all) filter.limit = pageLimit ? pageLimit : 10;
    else filter.all = true;

    const qs = ENV.objectToQueryString(filter);

    props.getPopularCollections(qs);
  };

  const handlePagination = () => {
    window.scroll(0, 500);
    setPage(page);
    setLimit(limit + 10);
    getPopularCollections(selectedCategory, page, limit + 10);
  };

  const handleFilterCategory = (category: string) => {
    setCategoryId(category);
    setLoader(true);
    setPage(1);
    setLimit(10);
    getPopularCollections(category, 1, 10);
  };

  const handleImage = (item: any, index: number) => {
    if (item?.nfts[index]?.image) {
      let result = item.nfts.filter((nft: any) => nft.fileType === "image");
      if (result.length >= index) {
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
      <Banner
        subHeading={popularBanner.subHeading}
        heading={popularBanner.heading}
        content={popularBanner.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      {categoriesLoader && collectionsLoader ? (
        <FullPageLoader />
      ) : (
        <>
          {" "}
          <section className="explore-collection-section padding-wrapper">
            <div className="container">
              <div className="row mb-5">
                <div className="col-12 explore-collection-nav">
                  <div className="d-none d-xxl-flex justify-content-lg-end text-end align-items-center">
                    {categoryId === "all" &&
                    popular &&
                    popular?.length == 0 &&
                    !loader
                      ? ""
                      : categories &&
                        categories.length > 0 &&
                        categories.map((item: any, index: number) => {
                          return (
                            <button
                              onClick={() => {
                                setIsActive(item.name);
                                setSelectedCategory(item.description);
                                handleFilterCategory(item.description);
                              }}
                              key={index}
                              className={`${
                                item.name === isActive
                                  ? "active-explore-nav"
                                  : ""
                              } me-2 me-xl-3`}
                            >
                              {item.name}
                            </button>
                          );
                        })}
                  </div>
                  <div className="row justify-content-center justify-content-sm-start align-items-center text-center d-xxl-none">
                    {categoryId === "all" &&
                    popular &&
                    popular?.length == 0 &&
                    !loader
                      ? ""
                      : categories &&
                        categories.length > 0 &&
                        categories.map((item: any, index: number) => {
                          return (
                            <div className="col-6 col-sm-3" key={index}>
                              <button
                                onClick={() => {
                                  setIsActive(item.name);
                                  setSelectedCategory(item.description);
                                  handleFilterCategory(item.description);
                                }}
                                className={
                                  isActive === item.name
                                    ? "active-explore-nav"
                                    : ""
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
                {loader ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : popular && popular.length > 0 ? (
                  popular.map((item: any, index: number) => {
                    return (
                      <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
                        <CollectionsCard
                          CardImg={item.featuredImg}
                          Subimg1={handleImage(item, 0)}
                          Subimg2={handleImage(item, 1)}
                          Subimg3={handleImage(item, 2)}
                          name={item.name}
                          id={item._id}
                          collection={item}
                          userName={item.username[0]}
                          NFTCount={item.totalNfts}
                          profileImage={item.profileImage[0]}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center  not-found-title mt-5">
                    No Popular Collections Found
                  </p>
                )}

                <div className="col-12">
                  <div className="mt-5 text-center">
                    {!empty &&
                      popular?.length === 10 &&
                      pagination.totalRecords > popular.length && (
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
          </section>
          <OwnCollectionToday />
        </>
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
  popularCollections: state.collection.popularCollections,
  getPopularAuth: state.collection.getPopularAuth,
});

export default connect(
  mapStateToProps,
  {
    beforePopularCollection,
    getPopularCollections,
    beforeCategory,
    getCategories,
    toggleLikeDislike,
  },
  null,
  { forwardRef: true }
)(Populars);
