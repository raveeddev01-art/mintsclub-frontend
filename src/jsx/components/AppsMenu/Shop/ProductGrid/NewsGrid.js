import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import Products from "./Products";

/// Data
// import productData from "../productData";
import PageTitle from "../../../../layouts/PageTitle";
import BlogListingTable from "../../../listingTable/BlogListing";

import PageLoader from "../../../common/pageLoader";
import SearchField from "../../../common/searchFiled";
import { alert } from "../../../../../store/reducers/alertSlice";
import Pagination from "../../../common/pagination";
import { deleteNews, getNews } from "../../../../../store/reducers/newReducer";
import NewsListingsTable from "../../../listingTable/NewListings";
const BlogsGrid = () => {
  const [loader, setLoader] = useState({ data: true, filter: false });
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const limit = 20;

  const getNewsListings = async ({ search, page }) => {
    await dispatch(getNews({ search, limit, page }));
    setLoader({ data: false, filter: false });
  };

  useEffect(() => {
    // setLoader({ data: true, filter: true })
    getNewsListings({ search: searchText, page: 1 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    setLoader({ data: true, filter: true });
    getNewsListings({ search: searchText, page: 1 });
  };

  const handleChange = (e) => {
    if (!e.target.value || e.target.value.trim() === null) {
      setSearchText(e.target.value);
      setLoader({ data: true, filter: true });
      return getNewsListings({ search: "", page: 1 });
    }
    setSearchText(e.target.value);
  };

  const onDeleteConfirm = async (id) => {
    console.log("🚀 ~ file: NewsGrid.js ~ line 51 ~ onDeleteConfirm ~ id", id);
    try {
      let deletedNews = await dispatch(deleteNews(id));
      if (deletedNews) {
        dispatch(
          alert({
            title: `Success`,
            message: `News deleted Successfully`,
            severity: "success",
          })
        );
        setLoader({ data: true, filter: true });
        getNewsListings({ search: searchText, page: data?.page });
      }
    } catch (error) {
      dispatch(
        alert({
          title: `failed`,
          message: `failed to delete Blog`,
          severity: "error",
        })
      );
    }
  };

  const handlePageClick = (e) => {
    setLoader({ data: true, filter: false });
    setPage(e.selected);
    return getNewsListings({ search: searchText, page: e.selected + 1 });
  };

  const data = useSelector((state) => state.news.news);
  return (
    <Fragment>
      <PageTitle activeMenu="listing" motherMenu="News" />
      {loader?.data ? (
        <PageLoader />
      ) : (
        <div className="row justify-content-end">
          <div className="d-flex align-items-center mr-5">
            <SearchField
              onChange={handleChange}
              searchText={searchText}
              handleSearch={handleSearch}
            />
            <NavLink
              exact
              to="/news-form"
              aria-expanded="false"
              activeClassName="selected"
              className="btn btn-primary mb-3 ml-3"
            >
              <span className="item">Create News</span>
            </NavLink>
          </div>
          <NewsListingsTable
            limit={limit}
            page={page}
            tabledata={data?.docs}
            deleteBlog={(id) => onDeleteConfirm(id)}
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
