import React, { Fragment, useEffect, useState } from "react";
import Products from "./Products";
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from "formik";
import PricingTable from '../../../listingTable/PricingsListing'
/// Data
// import productData from "../productData";
// import PageTitle from "../../../../layouts/PageTitle";
// import DataTable from "../../../Dashboard/DataTable";
import { addPricing, getPricing } from "../../../../../store/reducers/pricingReducer";

import { Row, Card, Col, Alert, Button, Badge, Media, Dropdown, SplitButton, ButtonGroup } from "react-bootstrap";
import ButtonLoader from "../../../common/buttonLoader";
import PageLoader from "../../../common/pageLoader";
import SearchField from "../../../common/searchFiled";
const PricingForm = () => {
   const [formValues, setFormValues] = useState({
      title: '',
      price: ''
   })

   const [showAlert, setAlert] = useState(false);
   const [loader, setLoader] = useState(false);
   const [loading, setLoading] = useState(true);
   const [searchText, setSearchText] = useState('')
   const [selectedCurrency, setCurrency] = useState(null);
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

   // const handleSubmit = async (e) => {
   //    e.preventDefault();

   //    let data = {
   //       name: e.target.name.value,
   //       price: e.target.price.value
   //    }
   //    setLoader(true)
   //    await dispatch(addPricing(data));
   //    fetchPricingList();
   //    setLoader(false)

   // }
   const fetchPricingList = async ({ search }) => {
      await dispatch(getPricing(search || ''));
      setLoading(false)
   }
   useEffect(() => {
      fetchPricingList({ search: searchText });
   }, [])

   // const handleChange = (e) => {
   //    const { name, value } = e.target;
   //    setFormValues((prevState) => ({
   //       ...prevState,
   //       [name]: value,
   //    }));
   // };

   const data = useSelector((store) => store.PricingReducer.pricing);

   const initialValues = {
      name: "",
      price: ""
   };

   const validate = (values) => {
      let errors = {};

      if (!values.name) {
         errors.name = "Name is required";
      }

      if (!values.price) {
         errors.price = "Price is required";
      }

      return errors;
   };

   const submitForm = async(values, { resetForm }) => {
      setLoader(true)
      await dispatch(addPricing({...values}));
      fetchPricingList({ search: searchText });
      setLoader(false)
      resetForm()
   };


   return (
      <Fragment>
         <div>
            <div className="col-xl-6 col-lg-6">
               {showAlert && (<Alert

                  variant={'light'}
                  className="alert-dismissible fade show"
               >
                  {/* {data.emoji} */}
                  <strong>Blog Added Successfully</strong>
                  {/* {btn(i, setBasicData, basicData, true)} */}
               </Alert>)}

               <div className="card">
                  <div className="card-header">
                     <h4 className="card-title">Add Pricing</h4>
                  </div>
                  <Formik
                     initialValues={initialValues}
                     validate={validate}
                     onSubmit={submitForm}
                  >
                     {(formik) => {
                        const {
                           values,
                           handleChange,
                           handleSubmit,
                           errors,
                           touched,
                           handleBlur,
                           isValid,
                           dirty
                        } = formik;
                        return (
                           <form onSubmit={handleSubmit}>
                              <div className="card-body">
                                 <div className="basic-form">
                                    {/* <form id="create-blog-form" onSubmit={e => { handleSubmit(e) }}> */}
                                    <div className="form-group">
                                       <input
                                          type="text"
                                          className={`form-control input-default ${errors.email && touched.email ? "input-error" : null}`}
                                          name="name"
                                          placeholder="Name"
                                          value={values.name}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                       />
                                       {errors.name && touched.name && (
                                          <span className="error">{errors.name}</span>
                                       )}
                                    </div>
                                    <input
                                       type="number"
                                       className="form-control input-default "
                                       name="price"
                                       placeholder="Price"
                                       value={values.price}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                    />
                                    {errors.price && touched.price && (
                                       <span className="error">{errors.price}</span>
                                    )}
                                    <div className="mt-3 mt-sm-10">
                                       <ButtonLoader classes="btn btn-primary mb-2" title={'Add Price'} loader={loader}
                                          disabled={!(dirty && isValid) || loader}
                                       />
                                       {/* <button
                              type="submit"
                              className="btn btn-primary mb-2"
                           >
                           Add Price
                           </button> */}
                                    </div>
                                    {/* </form> */}
                                 </div>
                              </div>
                           </form>
                        )
                     }}
                  </Formik>
               </div>
            </div>

            <div className="col-xl-12 col-lg-12">
               {loading ? <PageLoader /> :
                  <>
                     <div className="row">
                        <div className="col-xl-12 col-lg-12  justify-content-end d-flex">
                           <SearchField onChange={handleChangeSearch} searchText={searchText} handleSearch={handleSearch} />
                        </div>
                     </div>
                     <PricingTable tabledata={data} />
                  </>
               }
            </div>
         </div>
      </Fragment>
   );
};

export default PricingForm;
