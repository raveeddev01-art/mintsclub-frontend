import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";

import PageTitle from "../../layouts/PageTitle";
import { getFaqs, deleteFaq } from '../../../store/reducers/faq.Reducer'
import FaqListingTable from "../listingTable/FaqListing";

import PageLoader from "../common/pageLoader";
import SearchField from "../common/searchFiled";
import { alert } from '../../../store/reducers/alertSlice'
import Pagination from "../common/pagination";
const FaqGrid = () => {
    const data = useSelector(state => state.faq.faqs);
    const [loader, setLoader] = useState({ data: true, filter: false });
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const limit = 20;

    const getNftListing = (async ({ search, page }) => {
        await dispatch(getFaqs({ search, limit, page }));
        setLoader({ data: false, filter: false })
    })

    useEffect(() => {
        getNftListing({ search: searchText, page: 1 });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = () => {
        setLoader({ data: true, filter: true })
        getNftListing({ search: searchText, page: 1 })
    }

    const handleChange = (e) => {
        if (!e.target.value || e.target.value.trim() === null) {
            setSearchText(e.target.value)
            setLoader({ data: true, filter: true })
            return getNftListing({ search: '', page: 1 })
        }
        setSearchText(e.target.value)
    }

    const onDeleteConfirm = async (id) => {
        try {
            let deletedBlog = await dispatch(deleteFaq(id));
            if (deletedBlog) {
                dispatch(alert({
                    title: `Success`,
                    message: `FAQ deleted Successfully`,
                    severity: "success",
                }))
                setLoader({ data: true, filter: true })
                getNftListing({ search: searchText, page: data?.page });
            }
        } catch (error) {
            dispatch(alert({
                title: `failed`,
                message: `failed to delete FAQ`,
                severity: "error",
            }))
        }

    }

    const handlePageClick = (e) => {
        setLoader({ data: true, filter: false })
        setPage(e.selected);
        return getNftListing({ search: searchText, page: e.selected + 1 })
    }


    return (
        <Fragment>
            <PageTitle activeMenu="listing" motherMenu="Blogs" />
            {loader.data ? <PageLoader /> :
                <div className="row justify-content-end">
                    <div className="d-flex align-items-center mr-5">
                  <SearchField onChange={handleChange} searchText={searchText} handleSearch={handleSearch} />
                  <NavLink
                        exact
                        to="/faq-form"
                        aria-expanded="false"
                        activeClassName="selected"
                        className="btn btn-primary mb-3 ml-3"
                     >
                        <span className="item">Create FAQ</span>
                     </NavLink>
                  </div>
                    <FaqListingTable tabledata={data?.docs} deleteBlog={(id) => onDeleteConfirm(id)} />
                </div>}
            {(data?.totalDocs && !loader?.filter) && <div>
                Showing {(limit * page) + 1} to{" "}
                {data?.totalDocs < limit ? data?.totalDocs : limit * (page + 1)} {""}
                of {data?.totalDocs} entries
                {<Pagination handlePageClick={handlePageClick} totalDocs={data?.totalDocs} />}
            </div>
            }
        </Fragment>
    );
};

export default FaqGrid;
