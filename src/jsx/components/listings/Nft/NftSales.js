import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../../layouts/PageTitle";
// import DataTable from "../../Dashboard/DataTable";
import NftListingTable from "../../listingTable/NftListingTable";
import { useDispatch, useSelector } from 'react-redux'
import { getAllNft, getNftsSalesActivities } from '../../../../store/reducers/nftReducer';
import PageLoader from "../../common/pageLoader";
import SearchField from "../../common/searchFiled";
import SelectOptionField from "../../common/selectOptionField";
import Pagination from '../../common/pagination';

const NftSales = () => {
   const [loader, setLoader] = useState({ data: true, filter: false })
   const [searchText, setSearchText] = useState('')
   const [filter, setFilter] = useState('');
   const [page, setPage] = useState(0)
   const limit = 20;
   const dispatch = useDispatch();
   const getNftListing = async ({ search, nftType, page }) => {
      await dispatch(getNftsSalesActivities({ search, nftType, limit, page }));
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
      getNftListing({ search: searchText, nftType: null, page: 1 })
   }

   const handleChange = (e) => {
      if (!e.target.value || e.target.value.trim() === null) {
         setSearchText(e.target.value);
         setLoader({ data: true, filter: true });
         return getNftListing({ search: '', nftType: filter, page: 1 })
      }
      setSearchText(e.target.value)
   }

   const ApplyFilter = (e) => {
      setFilter(e.target.value)
      setLoader({ data: true, filter: true });
      setSearchText('');
      return getNftListing({ search: '', nftType: (!e.target.value || e.target.value === '') ? undefined : e.target.value, page: 1 })
   }

   useEffect(() => {
      setLoader({ data: true, filter: true })
      getNftListing({ search: searchText, nftType: filter, page: 1 });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   const handlePageClick = (e) => {
      setLoader({ data: true, filter: false })
      setPage(e.selected)
      return getNftListing({ search: searchText, nftType: filter, page: e.selected + 1 })
   }

   const data = useSelector((state) => state.nftReducer.nftsSales);
   console.log('data =====>', data)
   return (
      <Fragment>
         <PageTitle activeMenu="Sales" motherMenu="NFT" />
         {
            loader?.data ? <PageLoader /> :
               <div className="row justify-content-end">
                  <SelectOptionField onChange={ApplyFilter} filter={filter} options={options} />
                  <SearchField onChange={handleChange} searchText={searchText} handleSearch={handleSearch} />
                  {data && <NftListingTable limit={limit} page={page} tabledata={data?.docs} />}
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

export default NftSales;
