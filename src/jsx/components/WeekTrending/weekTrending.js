import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import TrendingNft from "../listingTable/TrendingNftListing";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingNft } from "../../../store/reducers/nftReducer";
import PageLoader from "../common/pageLoader";
import { Pagination } from "@material-ui/lab";

const WeekTrending = () => {
  const [loader, setLoader] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(20);
  const limit = 20;
  const dispatch = useDispatch();

  const trendingNftListing = async ({ search, nftType }) => {
    setLoader(true);
    await dispatch(getTrendingNft());
    setLoader(false);
  };

  useEffect(() => {
    trendingNftListing({ search: searchText, nftType: filter });
  }, []);

  const handlePageClick = (e) => {
    setLoader({ data: true, filter: false });
    setPage(e.selected);
    return trendingNftListing({
      search: searchText,
      isVerified: filter || undefined,
      page: e.selected + 1,
    });
  };

  const data = useSelector((state) => state.nftReducer.trendingNfts);

  return (
    <Fragment>
      <PageTitle activeMenu="Listing" motherMenu="Week Trending" />
      {loader ? (
        <PageLoader />
      ) : (
        <div className="row justify-content-end">
          {/* <SelectOptionField onChange={ApplyFilter} filter={filter} options={options} />
                        <SearchField onChange={handleChange} searchText={searchText} handleSearch={handleSearch} /> */}
          {data && <TrendingNft tabledata={data} />}
          {data?.totalDocs && (
            <div>
              Showing {limit * page + 1} to {limit * (page + 1)} {""}
              of {data?.totalDocs} entries
              {
                <Pagination
                  handlePageClick={handlePageClick}
                  totalDocs={data?.totalDocs}
                />
              }
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default WeekTrending;
