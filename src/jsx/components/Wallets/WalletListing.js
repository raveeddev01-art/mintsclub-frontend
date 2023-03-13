import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import PageTitle from "../../layouts/PageTitle";
import { getFaqs, deleteFaq } from '../../../store/reducers/faq.Reducer'
import FaqListingTable from "../listingTable/FaqListing";

import PageLoader from "../common/pageLoader";
import SearchField from "../common/searchFiled";
import { alert } from '../../../store/reducers/alertSlice'
const WalletListing = () => {
    const [loader, setLoader] = useState(true);
    const [searchText, setSearchText] = useState('')
    const dispatch = useDispatch();

    const getNftListing = (async ({ search }) => {
        await dispatch(getFaqs(search || ''));
        setLoader(false)
    })

    useEffect(() => {
        getNftListing({ search: searchText })
    }, []);

    const handleSearch = () => {
        getNftListing({ search: searchText })
    }

    const handleChange = (e) => {
        if (!e.target.value || e.target.value.trim() === null) {
            setSearchText(e.target.value)
            return getNftListing({ search: '' })
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
                getNftListing({ search: searchText });
            }
        } catch (error) {
            dispatch(alert({
                title: `failed`,
                message: `failed to delete FAQ`,
                severity: "error",
            }))
        }

    }

    const data = useSelector(state => state.faq.faqs);

    return (
        <Fragment>
            <PageTitle activeMenu="Listing" motherMenu="Wallet" />
            {/* {loader ? <PageLoader /> :
                <div className="row justify-content-end">
                    <SearchField onChange={handleChange} searchText={searchText} handleSearch={handleSearch} />
                    <FaqListingTable tabledata={data} deleteBlog={(id) => onDeleteConfirm(id)} />
                </div>} */}
        </Fragment>
    );
};

export default WalletListing;
