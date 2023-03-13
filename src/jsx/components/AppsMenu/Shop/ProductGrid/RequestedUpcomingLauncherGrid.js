import React, { Fragment, useEffect, useState } from "react";
// import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
/// Data
// import productData from "../productData";
import PageTitle from "../../../../layouts/PageTitle";
import {
  getAllFeaturedCollection,
  getAllRequestedApprovalLaunchers,
} from "../../../../../store/reducers/collectionReducer";
import PageLoader from "../../../common/pageLoader";
import SearchField from "../../../common/searchFiled";
import SelectOptionField from "../../../common/selectOptionField";
import Pagination from "../../../common/pagination";
import FeaturedCollectionListing from "../../../listingTable/FeaturedCollectionListing";
import RequestedApprovalLaunchers from "../../../listingTable/RequestedApprovalLaunchers";

const RequestedUpcomingLauncherGrid = () => {
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
      label: "Verified",
      value: true,
    },
    {
      label: "Unverified",
      value: false,
    },
  ];

  const handleSearch = () => {
    setLoader({ data: true, filter: true });
    getCollectionListing({
      search: searchText,
      isVerified: filter || undefined,
      page: 1,
    });
  };

  const handleChange = (e) => {
    if (!e.target.value || e.target.value.trim() === null) {
      setLoader({ data: true, filter: true });
      setSearchText(e.target.value);
      return getCollectionListing({
        search: "",
        // isVerified: filter || undefined,
        page: 1,
      });
    }
    setSearchText(e.target.value);
  };

  const getCollectionListing = async ({ search, isVerified, page }) => {
    await dispatch(getAllRequestedApprovalLaunchers({ search, page, limit }));
    setLoader({ data: false, filter: false });
  };

  const ApplyFilter = (e) => {
    setLoader({ data: true, filter: true });
    setFilter(e.target.value);
    return getCollectionListing({
      //   search: searchText,
      //   isVerified:
      //     !e.target.value || e.target.value === "" ? undefined : e.target.value,
      page: 1,
    });
  };

  useEffect(() => {
    setLoader({ data: true, filter: true });
    getCollectionListing({
      //   search: searchText,
      //   isVerified: undefined,
      page: 1,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageClick = (e) => {
    setLoader({ data: true, filter: false });
    setPage(e.selected);
    return getCollectionListing({
      search: searchText,
      isVerified: filter || undefined,
      page: e.selected + 1,
    });
  };

  const data = useSelector(
    (state) => state.collectionReducer.launchersCollection
  );

  return (
    <Fragment>
      <PageTitle activeMenu="listing" motherMenu="Featued Collection" />
      {loader.data ? (
        <PageLoader />
      ) : (
        <div className="row justify-content-end">
          {/* <SelectOptionField
            onChange={ApplyFilter}
            filter={filter}
            options={options}
          /> */}
          {/* <SearchField
            onChange={handleChange}
            searchText={searchText}
            handleSearch={handleSearch}
          /> */}
          <RequestedApprovalLaunchers
            limit={limit}
            page={page}
            tabledata={data?.docs}
          />
        </div>
      )}
      {data?.totalDocs && !loader?.filter && (
        <div>
          Showing {limit * page + 1} to{" "}
          {data?.totalDocs < limit ? data?.totalDocs : limit * (page + 1)} {""}
          of {data?.totalDocs} entries
          {
            <Pagination
              handlePageClick={handlePageClick}
              totalDocs={data?.totalDocs}
            />
          }
        </div>
      )}
    </Fragment>
  );
};

export default RequestedUpcomingLauncherGrid;
