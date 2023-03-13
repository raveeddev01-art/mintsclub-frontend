import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { login } from '../../store/reducers/authReducer'
import ButtonLoader from "../components/common/buttonLoader";
import { Formik } from "formik";


const Login = ({ history }) => {
   const [loading, setLoading] = useState(false)
   const [loginData, setLoginData] = useState({ email: "", password: "" });
   // admin@123
   // muhammad.adnan@invozone.com

   const dispatch = useDispatch()
   // const handleBlur = (e) => {
   //    const newLoginData = { ...loginData };
   //    newLoginData[e.target.name] = e.target.value;
   //    setLoginData(newLoginData);
   // };
   const submitHandler = async (e) => {
      e.preventDefault();
      setLoading(true)
      let data = await dispatch(login(loginData));
      console.log('data =======>', data)
      if (data) {
         history.push('/');
      }
      setLoading(false)
   };

   const initialValues = {
      email: "",
      password: ""
   };

   const validate = (values) => {
      let errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      if (!values.email) {
         errors.email = "Email is required";
      } else if (!regex.test(values.email)) {
         errors.email = "Invalid Email";
      }

      if (!values.password) {
         errors.password = "Password is required";
      }

      return errors;
   };

   const submitForm = async (values, { resetForm }) => {
      setLoading(true);
      console.log('values ====>')
      let data = await dispatch(login(values));
      if (data) {
         history.push('/system-setting');
      }
      setLoading(false)
      resetForm()
   };


   return (
      <div className="authincation h-100 p-meddle">
         <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
               <div className="col-md-6">
                  <div className="authincation-content">
                     <div className="row no-gutters">
                        <div className="col-xl-12">
                           <div className="auth-form">
                              <h4 className="text-center mb-4">
                                 Sign in your account
                              </h4>
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
                                          <div className="form-group">
                                             <label className="mb-1">
                                                <strong>Email</strong>
                                             </label>
                                             <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                             />
                                             {errors.email && touched.email && (
                                                <span className="error">{errors.email}</span>
                                             )}
                                          </div>
                                          <div className="form-group">
                                             <label className="mb-1">
                                                <strong>Password</strong>
                                             </label>
                                             <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}

                                             />
                                             {errors.password && touched.password && (
                                                <span className="error">{errors.password}</span>
                                             )}
                                          </div>
                                          <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                             <div className="form-group">
                                                <div className="custom-control custom-checkbox ml-1">
                                                   <input
                                                      type="checkbox"
                                                      className="custom-control-input"
                                                      id="basic_checkbox_1"
                                                   />
                                                   <label
                                                      className="custom-control-label"
                                                      htmlFor="basic_checkbox_1"
                                                   >
                                                      Remember my preference
                                                   </label>
                                                </div>
                                             </div>
                                             <div className="form-group">
                                                <Link to="/page-forgot-password">
                                                   Forgot Password?
                                                </Link>
                                             </div>
                                          </div>
                                          <div className="text-center">
                                             <ButtonLoader loader={loading} title={'Sign Me In'} classes="btn btn-primary btn-block"
                                                disabled={!(dirty && isValid) || loading}
                                             />
   
                                              <Link to="/adminRegister">
                                              <ButtonLoader loader={loading} title={'Sign Up'} classes="btn btn-primary btn-block"
                                               
                                               />
                                                </Link>

                                             {/* <input
                                       type="submit"
                                       value="Sign Me In"
                                       className="btn btn-primary btn-block"
                                    /> */}
                                          </div>
                                       </form>)
                                 }}
                              </Formik>
                              {/* <div className="new-account mt-3">
                                 <p>
                                    Don't have an account?{" "}
                                    <Link
                                       className="text-primary"
                                       to="/page-register"
                                    >
                                       Sign up
                                    </Link>
                                 </p>
                              </div> */}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
