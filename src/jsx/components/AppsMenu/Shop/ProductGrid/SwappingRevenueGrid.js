import { Fragment, useEffect, useState } from "react";
// import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
/// Data
// import productData from "../productData";
import PageTitle from "../../../../layouts/PageTitle";
import SwappingRevenueListing from "../../../listingTable/SwappingRevenueListing";
import PageLoader from "../../../common/pageLoader";
import SearchField from "../../../common/searchFiled";
import SelectOptionField from "../../../common/selectOptionField";
import { getAllSwappingRevenues } from "../../../../../store/reducers/swappingRevenueReducer";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Pagination from "../../../common/pagination";

const SwappingRevenueGrid = () => {
  const [loader, setLoader] = useState({ data: true, filter: false });
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const limit = 20;
  const dispatch = useDispatch();

  const options = [
    {
      label: "Select Option",
      value: "",
    },
    {
      label: "Success",
      value: "success",
    },
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Failed",
      value: "failed",
    },
  ];

  const handleSearch = () => {
    setLoader({ data: true, filter: true });
    getSwappingRevenueListing({
      search: searchText,
      status: filter || undefined,
      page: 1,
    });
  };

  const handleChange = (e) => {
    if (!e.target.value || e.target.value.trim() === null) {
      setLoader({ data: true, filter: true });
      setSearchText(e.target.value);
      return getSwappingRevenueListing({
        search: "",
        status: filter || undefined,
        page: 1,
      });
    }
    setSearchText(e.target.value);
  };

  const getSwappingRevenueListing = async ({ search, status, page }) => {
    await dispatch(getAllSwappingRevenues({ search, status, page, limit }));
    setLoader({ data: false, filter: false });
  };

  const ApplyFilter = (e) => {
    setLoader({ data: true, filter: true });
    setFilter(e.target.value);
    return getSwappingRevenueListing({
      search: searchText,
      status:
        !e.target.value || e.target.value === "" ? undefined : e.target.value,
      page: 1,
    });
  };

  const handlePageClick = (e) => {
    setPage(e.selected);
    return getSwappingRevenueListing({
      search: searchText,
      status: filter || undefined,
      page: e.selected + 1,
    });
  };

  useEffect(() => {
    getSwappingRevenueListing({
      search: searchText,
      status: undefined,
      page: 1,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useSelector((state) => state.revenueReducer?.transactions);
  return (
    <Fragment>
      <PageTitle activeMenu="listing" motherMenu="Swapping Revenue" />
      {loader.data ? (
        <PageLoader />
      ) : (
        <div className="row align-items-end">
          <div className="col-lg-4 col-sm-8">
            <div className="card widget-stat">
              <div className="card-body p-4 pb-2">
                <div className="media align-items-center">
                  <div className="media-body">
                    <p className="fs-18 mb-2 wspace-no">
                      Total Paid Amount (Sol)
                    </p>
                    <h1 className="fs-36 font-w600 d-flex align-items-center text-black mb-0">
                      {data?.totalPaidAmountSol?.toFixed(2) || 0}
                    </h1>
                  </div>
                  <span className="ml-3 bg-warning text-white">
                    <MonetizationOn />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-8">
            <div className="card widget-stat">
              <div className="card-body p-4 pb-2">
                <div className="media align-items-center">
                  <div className="media-body">
                    <p className="fs-18 mb-2 wspace-no">
                      Total Paid Amount (MATIC)
                    </p>
                    <h1 className="fs-36 font-w600 d-flex align-items-center text-black mb-0">
                      {data?.totalPaidAmountMatic?.toFixed(2) || 0}
                    </h1>
                  </div>
                  <span className="ml-3 bg-warning text-white">
                    <MonetizationOn />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-8">
            <div className="card widget-stat">
              <div className="card-body p-4 pb-2">
                <div className="media align-items-center">
                  <div className="media-body">
                    <p className="fs-18 mb-2 wspace-no">
                      Total Paid Amount (BNB)
                    </p>
                    <h1 className="fs-36 font-w600 d-flex align-items-center text-black mb-0">
                      {data?.totalPaidAmountBNB?.toFixed(2) || 0}
                    </h1>
                  </div>
                  <span className="ml-3 bg-warning text-white">
                    <MonetizationOn />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-sm-8 ">
            <div className="row justify-content-end">
              <SelectOptionField
                onChange={ApplyFilter}
                filter={filter}
                options={options}
              />
              <SearchField
                onChange={handleChange}
                searchText={searchText}
                handleSearch={handleSearch}
              />
            </div>
          </div>

          <SwappingRevenueListing
            page={page}
            limit={limit}
            tabledata={data?.data?.docs}
            totalPaidAmount={data?.totalPaidAmount}
          />
        </div>
      )}

      {data?.data?.totalDocs && !loader?.filter && (
        <div>
          Showing {limit * page + 1} to{" "}
          {data?.totalDocs < limit ? data?.totalDocs : limit * (page + 1)} {""}
          of {data?.totalDocs} entries
          {
            <Pagination
              handlePageClick={handlePageClick}
              totalDocs={data?.data?.totalDocs}
            />
          }
        </div>
      )}
    </Fragment>
  );
};

export default SwappingRevenueGrid;
