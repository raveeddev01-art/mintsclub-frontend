import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import PageLoader from "../common/pageLoader";
// import SearchField from "../common/searchFiled";
import SelectOptionField from "../common/selectOptionField";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../../store/reducers/paymentReducer";
import PaymentListingTable from "../listingTable/PaymentListing";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Pagination from "../common/pagination";
const TaxPaymentListing = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState({ data: true, filter: false });
  const [payments, setPayments] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const limit = 20;
  const options = [
    {
      label: "Select Option",
      value: "",
    },
    {
      label: "Chat",
      value: "chat",
    },
    {
      label: "Buy",
      value: "buy",
    },
    {
      label: "Bid",
      value: "bid",
    },
    {
      label: "Minting",
      value: "minting",
    },
  ];

  const getPaymentListing = async ({ search, paymentType, page }) => {
    await dispatch(getPayments({ search, paymentType, limit, page }));
    setLoader({ data: false, filter: false });
  };

  const ApplyFilter = (e) => {
    setLoader({ data: true, filter: true });
    setFilter(e.target.value);
    return getPaymentListing({
      search: searchText,
      paymentType:
        !e.target.value || e.target.value === "" ? undefined : e.target.value,
      page: 1,
    });
  };

  const handleChangeStatus = (_data) => {
    setPayments(_data);
  };

  useEffect(() => {
    setLoader({ data: true, filter: true });
    getPaymentListing({ search: searchText, paymentType: undefined, page: 1 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageClick = (e) => {
    setLoader({ data: true, filter: false });
    setPage(e.selected);
    return getPaymentListing({
      search: searchText,
      paymentType: filter || undefined,
      page: e.selected + 1,
    });
  };

  const data = useSelector((state) => state.paymentReducer?.Payments);

  return (
    <Fragment>
      <PageTitle activeMenu="Listing" motherMenu="Tax Payment" />
      {loader?.data ? (
        <PageLoader />
      ) : (
        <div className="row align-items-end">
          <div className="col-lg-4 col-sm-8">
            <div className="card widget-stat">
              <div className="card-body p-4 pb-2">
                <div className="media align-items-center">
                  <div className="media-body">
                    <p className="fs-18 mb-2 wspace-no">
                      Total Paid Amount (PQL)
                    </p>
                    <h1 className="fs-36 font-w600 d-flex align-items-center text-black mb-0">
                      {data?.totalAmount?.toFixed(2) || 0}
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
            </div>
          </div>
          {/* <SearchField onChange={handleChange} searchText={searchText} handleSearch={handleSearch} /> */}
          <PaymentListingTable
            limit={limit}
            page={page}
            tabledata={data?.docs}
            handleChangeStatus={handleChangeStatus}
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

export default TaxPaymentListing;
