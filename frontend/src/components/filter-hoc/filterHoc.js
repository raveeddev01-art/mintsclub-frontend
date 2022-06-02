import React, { useState } from "react";
import "./filterHoc.css";
import SearchIcon from "../../assets/images/search-inp.svg";
import Select from "react-select";

const FilterHoc = (props) => {

  const options = [
    { value: "lowtohigh", label: "Low To High" },
    { value: "hightolow", label: "High To Low" },
    { value: "oldest", label: "Oldest" },
    { value: "newest", label: "Recantly Created" },
  ];
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const selectCustomStyles = {};

  const statusData = ["Buy Now", "On Auction", "New"];
  const handleFilters = () => {
    setFilterActive(!filterActive);
  };
  const isHideCollection=()=>{
    if(props.userProfile){
      if(props.isActive===1){
        return true
      }else {
        return false
      }
    }else {
      return true
    }

  }
  const {
    collections,
    handleCollectionsFilter,
    handleStatusFilter,
    minValue,
    maxValue,
    onChangeMinPrice,
    onChangeMaxPrice,
    applyMinMaxFilter,
    disabled,
    menuData,
    totalItems,
    priceOptions,
    handleSortOptions,
    keyword,
    handleSearchKeyword,
    setKeyword,
    handleClearFilter,
    isActive,
    setIsActive,
    handleNftFilter,
    setMenuFilter,
    statusActive,
    collectionActive,
    selectedOption,
    filterActive,
    setStatusActive,
    setCollectionActive,
    setSelectedOption,
    setFilterActive
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
                  onKeyPress={(e) => e.key === "Enter" && handleSearchKeyword()}
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
                  defaultValue={options[3]}
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
                {
                  statusActive&&
                <button
                  className="filter-clear-btn"
                  onClick={() => {
                    setStatusActive();
                    handleClearFilter("status");
                  }}
                >
                  Clear
                </button>
                }
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
                {minValue&&maxValue&&
                <button
                  className="filter-clear-btn"
                  onClick={() => handleClearFilter("price")}
                >
                  Clear
                </button>
                }
              </div>
            </div>
            {isHideCollection()&& (
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
                  {
                    collectionActive!==null&&
                  <button
                    className="filter-clear-btn"
                    onClick={() => {
                      setCollectionActive(null);
                      handleClearFilter("collections");
                    }}
                  >
                    Clear
                  </button>
                  }
                </div>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-center btn-clear-all">
              <button  onClick={()=>handleClearFilter()}>Clear All Filters</button>
            </div>
          </div>
          <div className="col-lg-8 col-xl-9 order-3">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default FilterHoc;
