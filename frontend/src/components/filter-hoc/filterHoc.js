import React, { useState } from "react";
import "./filterHoc.css";
import SearchIcon from "../../assets/images/search-inp.svg";
import Select from "react-select";

const FilterHoc = (props) => {
  const [isActive, setIsActive] = useState(0);
  const [statusActive, setStatusActive] = useState(0);
  const [collectionActive, setCollectionActive] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [filterActive, setFilterActive] = useState(false);

  const options = [
    { value: "lowtohigh", label: "Low To Hight" },
    { value: "hightolow", label: "High To Low" },
    { value: "oldest", label: "Oldest" },
    { value: "recentlyCreated", label: "Recently Created" },
  ];
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const selectCustomStyles = {};
  const menuData = ["Collected", "Created", "Favourited"];
  const statusData = ["Buy Now", "On Auction", "New"];
  const collectionData = [
    "Leo",
    "New Collection",
    "Fish",
    "Latest Collection",
    "Latest Collection",
  ];
  const handleFilters = () => {
    setFilterActive(!filterActive);
  };
  return (
    <div className="filterhoc-wrapper padding-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12 order-0">
            <div
              className={`d-flex flex-column flex-md-row align-items-center justify-content-md-between mb-4 mb-md-0`}
            >
              <div className="search-input mb-4 mb-md-0">
                <input type="text" placeholder="Type here to Search..." />
                <img src={SearchIcon} alt="search-input" />
              </div>
              <div className="sort-by-select">
                <p className="me-3">Sort by:</p>
                <Select
                  className="react-select-cls"
                  classNamePrefix="react-select"
                  styles={selectCustomStyles}
                  defaultValue={options[0]}
                  value={selectedOption}
                  isSearchable={false}
                  onChange={handleSelectChange}
                  options={options}
                />
              </div>
            </div>
            <div className="mob-filters-btn d-flex d-md-none align-items-center justify-content-center">
              <button
                className={`${filterActive ? "mob-active-filter" : ""}`}
                onClick={handleFilters}
              >
                Filters
              </button>
            </div>
          </div>
          <div className="col-12 my-5 order-2 order-md-1 ">
            <div className="hero-nav d-flex flex-column flex-sm-row align-items-center justify-content-between">
              <div>
                {" "}
                {menuData.map((item, id) => {
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setIsActive(id);
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
                  Total items: <span>{" 7854"}</span>
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${
              filterActive ? "d-block d-md-block" : "d-none d-md-block"
            } col-md-5 col-lg-4 col-xl-3 order-1 order-md-2 mt-4 mt-md-0`}
          >
            <div className="filter-container mb-4">
              <h6>Status</h6>
              <hr />
              <div className="d-flex flex-wrap align-items-center ">
                {statusData.map((item, id) => {
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setStatusActive(id);
                      }}
                      className={`${
                        id === statusActive ? "active-filter-btn" : ""
                      } filter-btn me-3`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              <div className="d-flex align-items-end justify-content-end">
                <button
                  className="filter-clear-btn"
                  onClick={() => {
                    setStatusActive();
                  }}
                >
                  Clear
                </button>
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
                  ></input>
                  <input
                    type="number"
                    placeholder="Max"
                    className="mt-3 mt-sm-0"
                  ></input>
                </div>
                <button className="mt-3 mt-sm-0">Apply</button>
              </div>
              <div className="d-flex align-items-end justify-content-end">
                <button className="filter-clear-btn">Clear</button>
              </div>
            </div>
            <div className="filter-container mb-4">
              <h6>Collections</h6>
              <hr />
              <div className="d-flex flex-wrap align-items-center ">
                {collectionData.map((item, id) => {
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setCollectionActive(id);
                      }}
                      className={`${
                        id === collectionActive ? "active-filter-btn" : ""
                      } filter-btn me-2 me-xl-3`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              <div className="d-flex align-items-end justify-content-end">
                <button
                  className="filter-clear-btn"
                  onClick={() => {
                    setCollectionActive();
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center btn-clear-all">
              <button>Clear All Filters</button>
            </div>
          </div>
          <div className="col-md-7 col-lg-8 col-xl-9 order-3">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterHoc;
