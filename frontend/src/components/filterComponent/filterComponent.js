import React, { useState, useEffect } from "react";
import "./filterComponent.css";
import SearchIcon from "../../assets/images/search-inp.svg";
import NftCard from "../nft-card/nft-card";
import FullPageLoader from "../full-page-loader/full-page-loader";
import Select from "react-select";

const FilterHoc = (props) => {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [statusActive, setStatusActive] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [initial, setInitial] = useState(true);
  const [selectedOption, setSelectedOption] = useState();
  const [collectionActive, setCollectionActive] = useState(null);
  const [isActive, setIsActive] = useState(1);
  const [keyword, setKeyword] = useState(
    props.initialKeyword ? props.initialKeyword : ""
  );
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
    keyword: props.initialKeyword ? props.initialKeyword : "",
  });

  const priceOptions = [
    { value: "lowtohigh", label: "Low To High" },
    { value: "hightolow", label: "High To Low" },
    { value: "oldest", label: "Oldest" },
    { value: "newest", label: "Recantly Created" },
  ];
  useEffect(() => {
    const { initialKeyword } = props;
    if (initialKeyword) {
      setKeyword(initialKeyword);
      handleSearchKeyword(initialKeyword);
    }
  }, [props.initialKeyword]);

  useEffect(() => {
    fetchData(filter);
  }, [filter]);
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const selectCustomStyles = {};

  const statusData = ["Buy Now", "On Auction", "New"];
  const handleFilters = () => {
    setFilterActive(!filterActive);
  };
  const isHideCollection = () => {
    if (props.UserProfile || props.collectionDetail) {
      if (isActive === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
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

  const handlePagination = () => {
    if (!UserProfile) {
      setInitial(false);
      setFilterationLoader(true);
      setFilter((prev) => ({ ...prev, limit: filter.limit + 10 }));
    } else {
      getPaginatedData();
    }
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
  const handleClearFilter = (id) => {
    if (id === "status") {
      setFilterationLoader(true);
      setFilter((prev) => ({
        ...prev,
        buy: false,
        auction: false,
        new: false,
      }));
    } else if (id === "price") {
      setFilterationLoader(true);
      setMinValue("");
      setMaxValue("");
      setFilter((prev) => ({ ...prev, ltePrice: false, gtePrice: false }));
    } else if (id === "collections") {
      setFilterationLoader(true);
      setFilter((prev) => ({ ...prev, collectionId: false }));
    } else {
      setMinValue("");
      setMaxValue("");
      setStatusActive(null);
      setCollectionActive(null);
      setSelectedOption(null);
      setFilterActive(null);
      setKeyword("");
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

  const {
    collections,
    disabled,
    menuData,
    totalItems,
    handleNftFilter,
    setMenuFilter,
    filterationLoader,
    setFilterationLoader,
    nfts,
    loader,
    likedNfts,
    nftPagination,
    handleLikesTogleApi,
    fetchData,
    path,
    getPaginatedData,
    UserProfile,
  } = props;
  return (
    <div className="filterhoc-wrapper padding-wrapper">
      <div className="container">
        <div className="row justify-content-center justify-content-lg-start">
          <div className="col-12 order-0">
            <div
              className={`d-flex flex-column flex-md-row align-items-center justify-content-md-between`}
            >
              <div className="search-input mb-4 mb-md-0">
                <input
                  type="text"
                  placeholder="Type here to Search..."
                  maxLength="50"
                  onChange={(e) => {
                    if (keyword.trim() === "" && e.target.value.trim() === "") {
                      return false;
                    } else if (e.target.value === "") {
                      handleSearchKeyword(false);
                      setKeyword(e.target.value);
                    } else {
                      setKeyword(e.target.value);
                    }
                  }}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleSearchKeyword(keyword)
                  }
                  value={keyword}
                />
                <img src={SearchIcon} alt="search-input" />
              </div>
              <div className="sort-by-select mb-4 mb-md-0">
                <p className="me-3">Sort by:</p>
                <Select
                  className="react-select-cls"
                  classNamePrefix="react-select"
                  styles={selectCustomStyles}
                  // defaultValue={priceOptions[3]}
                  value={selectedOption}
                  isSearchable={false}
                  onChange={(value) => {
                    handleSelectChange(value);
                    handleSortOptions(value);
                  }}
                  options={priceOptions}
                />
              </div>
              <div className="mob-filters-btn d-flex d-lg-none align-items-center justify-content-center">
                <button
                  className={`${filterActive ? "mob-active-filter" : ""}`}
                  onClick={handleFilters}
                >
                  Filters
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 my-5 order-2 order-lg-1 ">
            <div className="hero-nav d-flex flex-column flex-sm-row align-items-center justify-content-between">
              <div>
                {" "}
                {menuData &&
                  menuData.length > 0 &&
                  menuData.map((item, id) => {
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          setIsActive(id);
                          handleNftFilter(item);
                          setMenuFilter(item);
                        }}
                        className={`${
                          id === isActive ? "active-hero-nav" : ""
                        } me-2 me-xl-3`}
                      >
                        {item}
                      </button>
                    );
                  })}
              </div>
              <div className="total-items mt-3 mt-sm-0">
                <p>
                  Total items: <span>{totalItems ? totalItems : 0}</span>
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${
              filterActive ? "d-block d-lg-block" : "d-none d-lg-block"
            } col-md-5 col-lg-4 col-xl-3 order-1 order-lg-2 mt-4 mt-lg-0`}
          >
            <div className="filter-container mb-4">
              <h6>Status</h6>
              <hr />
              <div className="d-flex flex-wrap align-items-center ">
                {statusData &&
                  statusData.map((status, id) => {
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          handleStatusFilter(status);
                          setStatusActive(id);
                        }}
                        className={`${
                          id === statusActive ? "active-filter-btn" : ""
                        } filter-btn me-3`}
                      >
                        {status}
                      </button>
                    );
                  })}
              </div>
              <div className="d-flex align-items-end justify-content-end">
                {statusActive && (
                  <button
                    className="filter-clear-btn"
                    onClick={() => {
                      setStatusActive();
                      handleClearFilter("status");
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="filter-container mb-4">
              <h6>Price</h6>
              <hr />
              <div className="min-max-inp d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-between mb-2">
                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                  <input
                    type="number"
                    placeholder="Min"
                    className="me-sm-2"
                    value={minValue}
                    onChange={onChangeMinPrice}
                  ></input>
                  <input
                    type="number"
                    placeholder="Max"
                    className="mt-3 mt-sm-0"
                    value={maxValue}
                    onChange={onChangeMaxPrice}
                  ></input>
                </div>
                <button
                  className="mt-3 mt-sm-0"
                  onClick={() => applyMinMaxFilter()}
                  disabled={disabled || minValue === "" || maxValue === ""}
                >
                  Apply
                </button>
              </div>
              <div className="d-flex align-items-end justify-content-end">
                {minValue && maxValue && (
                  <button
                    className="filter-clear-btn"
                    onClick={() => handleClearFilter("price")}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            {isHideCollection() && (
              <div className="filter-container mb-4">
                <h6>Collections</h6>
                <hr />
                <div className="d-flex flex-wrap align-items-center ">
                  {collections &&
                    collections.map((collection, id) => {
                      return (
                        <button
                          key={id}
                          onClick={() => {
                            handleCollectionsFilter(collection._id);
                            setCollectionActive(id);
                          }}
                          className={`${
                            id === collectionActive ? "active-filter-btn" : ""
                          } filter-btn me-2 me-xl-3`}
                        >
                          {collection.name}
                        </button>
                      );
                    })}
                </div>
                <div className="d-flex align-items-end justify-content-end">
                  {collectionActive !== null && (
                    <button
                      className="filter-clear-btn"
                      onClick={() => {
                        setCollectionActive(null);
                        handleClearFilter("collections");
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-center btn-clear-all">
              <button onClick={() => handleClearFilter()}>
                Clear All Filters
              </button>
            </div>
          </div>
          <div className="col-lg-8 col-xl-9 order-3">
            {loader ? (
              <FullPageLoader />
            ) : (
              <div className="row g-1">
                {filterationLoader ? (
                  <div className="text-center">
                    <div
                      className="spinner-border text-secondary"
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
                            owner={nft.owner}
                            path={path}
                          />
                        }
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center mt-5 no-nft-title">No NFTs Found</p>
                )}
                <div className="col-12">
                  <div className="mt-5 text-center">
                    {nfts &&
                      nftPagination?.total > nfts.length &&
                      !filterationLoader && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterHoc;
