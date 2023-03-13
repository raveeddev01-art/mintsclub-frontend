import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../../layouts/PageTitle";
// import DataTable from "../../Dashboard/DataTable";
import NftListingTable from "../../listingTable/NftListingTable";
import { useDispatch, useSelector } from 'react-redux'
import { getAllNft, getSearchedNft } from '../../../../store/reducers/nftReducer';
import PageLoader from "../../common/pageLoader";
import SearchField from "../../common/searchFiled";
import SelectOptionField from "../../common/selectOptionField";
import Pagination from '../../common/pagination';

const NftListing = () => {
   const [loader, setLoader] = useState({ data: true, filter: false });
   const [searchText, setSearchText] = useState({ name: '' })
   const [filter, setFilter] = useState('');
   const [page, setPage] = useState(0);
   const [activeSeach, setActiveSearch] = useState(false);
   const filterDefaultState = { status: "active", range: { min: "", max: "" }, value: "All", type: {} }
   const [listingFilter, setListingFilter] = useState({ status: "active", range: { min: "", max: "" }, value: "All", type: {} });
   const limit = 20;
   const dispatch = useDispatch();
   const getNftListing = async ({ search, page, filter }) => {
      await dispatch(getAllNft({ search, limit, page, filter }))
      setLoader({ data: false, filter: false })
   }


   const options = [
      {
         label: 'Select Option',
         value: ''
      },
      {
         label: 'Video',
         value: 'video'
      },
      {
         label: 'Audio',
         value: 'audio'
      },
      {
         label: 'Image',
         value: 'image'
      },
      {
         label: '3D',
         value: '3d'
      },
   ]

   const handleSearch = () => {
      setLoader({ data: true, filter: true });
      setFilter('');
      setListingFilter({
         ...listingFilter,
         type: {}
      })
      searchNft({ search: searchText, page: 1 });
   }

   const searchNft = async ({ search }) => {
      console.log('here ')
      await dispatch(getSearchedNft({ filter: search }))
      setLoader({ false: true, filter: false });
   }

   const handleChange = (e) => {
      let search = {
         ...searchText,
         name: e.target.value
      }
      if (!e.target.value || e.target.value.trim() === null) {
         setLoader({ data: true, filter: true });
         getNftListing({ filter: filterDefaultState, page: 1 });
      }
      setSearchText(search);
   }

   const ApplyFilter = (e) => {
      setFilter(e.target.value);
      setLoader({ data: true, filter: true });
      setActiveSearch(false);
      setSearchText({ name: '' })
      if (e.target.value !== '') {
         let val = e.target.value;
         if (e.target.value === '3d') {
            val = 'vr'
         }

         const filterObj = {
            ...listingFilter, type: { "nftId.properties.category": val }
         };
         setListingFilter(filterObj);
         return getNftListing({ filter: filterObj, page: 1 })
      }
      const filterObj = {
         ...listingFilter, type: {}
      };
      setListingFilter(filterObj);
      return getNftListing({ filter: filterObj, page: 1 })
   }

   useEffect(() => {
      setLoader({ data: true, filter: true })
      getNftListing({ filter: listingFilter, page: 1 });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   const handlePageClick = (e) => {
      setLoader({ data: true, filter: false })
      setPage(e.selected)
      return getNftListing({ filter: listingFilter, page: e.selected + 1 })
   }

   const data = useSelector((state) => state.nftReducer.nfts);
   return (
      <Fragment>
         <PageTitle activeMenu="Listing" motherMenu="NFT" />
         {
            loader?.data ? <PageLoader /> :
               <div className="row justify-content-end">
                  <SelectOptionField onChange={ApplyFilter} filter={filter} options={options} />
                  <SearchField onChange={handleChange} searchText={searchText.name} handleSearch={handleSearch} />
                  {data && <NftListingTable limit={limit} page={page} tabledata={data?.docs || data} />}
               </div>
         }
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

export default NftListing;
