import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../../../layouts/PageTitle";
import {
  getAllAuctions,
  getAllCollectionsName,
} from "../../../../../store/reducers/auctionsReducer";
import AuctionListingTable from "../../../listingTable/AuctionsListing";
import PageLoader from "../../../common/pageLoader";
import SearchField from "../../../common/searchFiled";
import SelectOptionField from "../../../common/selectOptionField";
import axios from "axios";
import Pagination from "../../../common/pagination";

const BlogsGrid = () => {
  const [loader, setLoader] = useState({ data: true, filter: false });
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");
  const [collection, setCollection] = useState("");
  const [collectionOptions, setCollectionOptions] = useState([]);
  const [collectionListing, setCollectionListing] = useState([]);
  const [fractions, setFractionValues] = useState([]);
  const [fraction, setSelectedFraction] = useState("");
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const limit = 20;
  const options = [
    {
      label: "Select Type",
      value: "",
    },
    {
      label: "Fractional",
      value: "fractional",
    },
    {
      label: "Fixed Price",
      value: "fixedPrice",
    },
    {
      label: "Highest Bid",
      value: "highestBid",
    },
  ];

  const getAuctionListing = async ({ search, auctionType, page, fraction }) => {
    await dispatch(
      getAllAuctions({
        search: search || "",
        auctionType,
        page,
        fraction,
        limit,
      })
    );
    setLoader({ data: false, filter: false });
  };

  const getCollectionNames = async () => {
    const collectionNames = await dispatch(getAllCollectionsName());
    const collectioNamesOptions = [];
    collectionNames.map((item) => {
      collectioNamesOptions.push({
        label: item.name,
        value: item.name,
      });
    });
    collectioNamesOptions.unshift({
      label: "Select Collection",
      value: "",
    });

    setCollectionListing(collectionNames);
    setCollectionOptions(collectioNamesOptions);
    // setCollection(collectioNamesOptions)
  };

  const getFractionsListing = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}systemSetting/getAllSystemSetting`,
      });

      const fractionsArray = [
        {
          label: "Select Fractions",
          value: "",
        },
      ];
      res.data?.franctionValues &&
        res.data?.franctionValues.map((fraction) => {
          fractionsArray.push({
            label: fraction,
            value: fraction,
          });
        });
      setFractionValues(fractionsArray);
    } catch (error) {
      console.log("error ====>", error);
    }
  };

  useEffect(() => {
    setLoader({ data: true, filter: true });
    getAuctionListing({
      search: searchText,
      auctionType: filter || undefined,
      page: 1,
      fraction,
    });
    getCollectionNames();
    getFractionsListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    setLoader({ data: true, filter: true });
    getAuctionListing({
      search: searchText,
      auctionType: filter || undefined,
      page: 1,
      fraction,
    });
  };

  const handleChange = (e) => {
    if (!e.target.value || e.target.value.trim() === null) {
      setLoader({ data: true, filter: true });
      setSearchText(e.target.value);
      return getAuctionListing({
        search: "",
        auctionType: filter,
        page: 1,
        fraction,
      });
    }
    setSearchText(e.target.value);
  };

  const ApplyFilter = (e) => {
    setFilter(e.target.value);
    setCollection("");
    setLoader({ data: true, filter: true });
    return getAuctionListing({
      search: searchText,
      auctionType:
        !e.target.value || e.target.value === "" ? undefined : e.target.value,
      page: 1,
      fraction,
    });
  };

  const applyCollectionFilter = (e) => {
    setCollection(e.target.value);
    const val = collectionListing.find((item) => item.name === e.target.value);
    if (val) {
      setLoader({ data: true, filter: true });
      return getAuctionListing({
        search: val.id,
        auctionType: undefined,
        page: 1,
        fraction,
      });
    }
  };

  const applyFractionFilter = (e) => {
    setSelectedFraction(e.target.value);
    setLoader({ data: true, filter: true });
    return getAuctionListing({
      search: searchText,
      auctionType: undefined,
      page: 1,
      fraction: e.target.value,
    });
  };

  const handlePageClick = (e) => {
    setCollection("");
    setLoader({ data: true, filter: false });
    setPage(e.selected);
    return getAuctionListing({
      search: searchText,
      auctionType: filter,
      page: e.selected + 1,
      fraction,
    });
  };

  const data = useSelector((state) => state.AuctionReducer.auctions);
  return (
    <Fragment>
      <PageTitle activeMenu="listing" motherMenu="Auction" />
      {loader?.data ? (
        <PageLoader />
      ) : (
        <div className="row justify-content-end">
          <SelectOptionField
            onChange={applyFractionFilter}
            filter={fraction}
            options={fractions}
          />
          <SelectOptionField
            onChange={applyCollectionFilter}
            filter={collection}
            options={collectionOptions}
          />
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
          <AuctionListingTable
            page={page}
            limit={limit}
            tabledata={data?.docs}
            totalDocs={data?.totalDocs}
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

export default BlogsGrid;
