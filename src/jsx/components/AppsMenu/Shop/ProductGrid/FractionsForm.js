import React, { Fragment, useEffect, useState } from "react";
import Products from "./Products";
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../../../Dashboard/DataTable";
/// Data
// import productData from "../productData";
// import PageTitle from "../../../../layouts/PageTitle";
// import DataTable from "../../../Dashboard/DataTable";
import { addFraction, getFractions } from "../../../../../store/reducers/fractionReducer";
import FractionListingTable from "../../../listingTable/FractionsListing";

import { Row, Card, Col, Alert, Button, Badge, Media, Dropdown, SplitButton, ButtonGroup } from "react-bootstrap";
import PageLoader from "../../../common/pageLoader";
import ButtonLoader from "../../../common/buttonLoader";
import SearchField from "../../../common/searchFiled";
const FractionsForm = () => {
   const [loading, setLoading] = useState(false)
   const [formValues, setFormValues] = useState({
      fraction: null
   })
   const [searchText, setSearchText] = useState('')
   const [showAlert, setAlert] = useState(false);
   const dispatch = useDispatch();

   const handleSearch = () => {
      fetchPricingList({ search: searchText })
   }

   const handleChangeSearch = (e) => {
      if (!e.target.value || e.target.value.trim() === null) {
         setSearchText(e.target.value)
         return fetchPricingList({ search: '' })
      }
      setSearchText(e.target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      let data = {
         fraction: e.target.fractions.value
      }
      setLoading('add fraction')
      await dispatch(addFraction(data));
      fetchPricingList();

   }
   const fetchPricingList = async ({ search }) => {
      await dispatch(getFractions( search || ''));
      setLoading(false)
   }
   useEffect(() => {
      setLoading('data')
      fetchPricingList({ search: searchText });
   }, [])

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   const data = useSelector((store) => store.FractionsReducer.Fractions);
   return (
      <Fragment>
         <div>
            <div className="col-xl-6 col-lg-6">
               {showAlert && (<Alert

                  variant={'light'}
                  className="alert-dismissible fade show"
               >
                  {/* {data.emoji} */}
                  <strong>Fractions Added Successfully</strong>
                  {/* {btn(i, setBasicData, basicData, true)} */}
               </Alert>)}

               <div className="card">
                  <div className="card-header">
                     <h4 className="card-title">Add Pricing</h4>
                  </div>
                  <div className="card-body">
                     <div className="basic-form">
                        <form id="create-blog-form" onSubmit={e => { handleSubmit(e) }}>
                           <input
                              type="number"
                              className="form-control input-default "
                              name="fractions"
                              placeholder="Fractions"
                              value={formValues.fractions}
                              onChange={(e) => { handleChange(e) }}
                           />

                           <div className="mt-3 mt-sm-10">
                              <ButtonLoader loader={loading === 'add fraction'} title={'Add Fractions'} classes="btn btn-primary mb-2" />
                              {/* <button
                                 type="submit"
                                 className="btn btn-primary mb-2"
                              >
                                 Add Fractions
                              </button> */}
                           </div>
                        </form>
                     </div>
                  </div>
               </div>


            </div>
            <div className="col-xl-12 col-lg-12">
               {loading === 'data' ? <PageLoader /> :
                  <>
                     <div className="row">
                        <div className="col-xl-12 col-lg-12  justify-content-end d-flex">
                           <SearchField onChange={handleChangeSearch} searchText={searchText} handleSearch={handleSearch} />
                        </div>
                     </div>
                     <FractionListingTable tabledata={data} />
                  </>

               }
            </div>
         </div>
      </Fragment>
   );
};

export default FractionsForm;
