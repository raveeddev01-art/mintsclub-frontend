import { Fragment, useEffect, useState } from "react";

import PageTitle from "../../../../layouts/PageTitle";
import UsersListingTable from "../../../listingTable/UsersListing";
import PageLoader from "../../../common/pageLoader";
import SearchField from "../../../common/searchFiled";
import SelectOptionField from "../../../common/selectOptionField";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../../../store/reducers/userReducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { alert } from '../../../../../store/reducers/alertSlice'
import Pagination from "../../../common/pagination";
import { sleep } from "../../../../../utils/helper";

const ProductGrid = () => {
   const dispatch = useDispatch();
   const [loader, setLoader] = useState({ data: true, filter: false });
   const [users, setUsers] = useState(null)
   const [searchText, setSearchText] = useState('')
   const [filter, setFilter] = useState('');
   const [sort, setSort] = useState('Ascending');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [page, setPage] = useState(0);
   const limit = 20;
   const options = [
      {
         label: 'Select Option',
         value: ''
      },
      {
         label: 'Verified',
         value: true
      },
      {
         label: 'Unverified',
         value: false
      },
      {
         label: 'Blocked',
         value: 'blocked'
      },
   ]

   const sortOptions = [
      {
         label: 'Ascending',
         value: 'Ascending'
      },
      {
         label: 'Descending',
         value: 'Descending'
      }
   ]


   const getUsersListing = (async ({ search, isVerified, startDate, endDate, sort, page }) => {
      const usersListing = await dispatch(getAllUsers({ search, isVerified, startDate, endDate, sort, page, limit }));
      setUsers(usersListing)
      setLoader({ data: false, filter: false })
   })

   const handleSearch = () => {
      setLoader({ data: true, filter: true })
      setStartDate(null)

      getUsersListing({ search: searchText, isVerified: filter || undefined, startDate, endDate, sort, page: 1 })
   }

   const handleChange = (e) => {
      if (!e.target.value || e.target.value.trim() === null) {
         setLoader({ data: true, filter: true })
         setSearchText(e.target.value)
         setStartDate(null)
         return getUsersListing({ search: '', isVerified: filter || undefined, startDate, endDate, sort, page: 1 })
      }
      setSearchText(e.target.value)
   }

   const ApplyFilter = (e) => {
      setLoader({ data: true, filter: true });
      setFilter(e.target.value);
      setStartDate(null);
      setUsers(null)
      setEndDate(null);
      return getUsersListing({ search: searchText, isVerified: (!e.target.value || e.target.value === '') ? undefined : e.target.value, startDate: null, endDate: null, sort, page: 1 });
   }

   const applySorting = (e) => {
      setLoader({ data: true, filter: true });
      setSort(e.target.value);
      getUsersListing({ search: '', isVerified: filter || undefined, startDate, endDate, sort: e.target.value, page: 1 });
   }

   const handleChangeStatus = (_data) => {
      setUsers(_data)
   }

   const onStartDateChange = async (date) => {
      setSearchText('')
      setSort('Ascending')
      setFilter('')
      setStartDate(date)
      await sleep(3000)
      getUsersListing({ search: searchText, isVerified: filter || undefined, startDate: date, endDate: new Date(), sort })
   }

   const onEndDateChange = async (date) => {
      if (startDate !== "") {
         if (new Date(date) > new Date(startDate)) {

            setSearchText('')
            setSort('Ascending')
            setFilter('')
            setEndDate(date)
            setLoader({ data: true, filter: true })
            getUsersListing({ search: searchText, isVerified: filter || undefined, startDate, endDate: date, sort, page: 1 })
         }
         else {
            dispatch(alert({
               title: `Failure`,
               message: `Please Select End Date Greater than Start Date`,
               severity: "Info",
            }))
         }
      }
      else {
         dispatch(alert({
            title: `Failure`,
            message: `Please Select Start Date First`,
            severity: "Info",
         }))
      }
   }

   const handlePageClick = (e) => {
      setPage(e.selected)
      return getUsersListing({ search: searchText, isVerified: filter || undefined, page: e.selected + 1, startDate, endDate, sort })
   }

   useEffect(() => {
      getUsersListing({ search: searchText, isVerified: undefined, date: undefined, sort, page: 1 })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Fragment>
         <PageTitle activeMenu="listing" motherMenu="Users" />
         {loader.data ? <PageLoader /> : <div className="row justify-content-end align-items-center">

            <div className="d-flex align-items-center startEndDate">
            <DatePicker className="form-control bg-white mb-3" selected={startDate} onChange={(date) => onStartDateChange(date)} placeholderText={'Start Date'} style={{ marginRight: 15 }}/>
               <DatePicker className="form-control bg-white mb-3" selected={endDate} onChange={(date) => onEndDateChange(date)} placeholderText={'End Date'} />

            </div>
            <SelectOptionField onChange={applySorting} filter={sort} options={sortOptions} />
            <SelectOptionField onChange={ApplyFilter} filter={filter} options={options} />
            <SearchField onChange={handleChange} searchText={searchText} handleSearch={handleSearch} />
            <UsersListingTable limit={limit} page={page} tabledata={users?.docs || users} handleChangeStatus={handleChangeStatus} />
         </div>}
         {(users?.totalDocs && !loader?.filter) && <div>
            Showing {(limit * page) + 1} to{" "}
            {users?.totalDocs < limit ? users?.totalDocs : limit * (page + 1)} {""}
            of {users?.totalDocs} entries
            {<Pagination handlePageClick={handlePageClick} totalDocs={users?.totalDocs} />}
         </div>
         }
      </Fragment>
   );
};

export default ProductGrid;
