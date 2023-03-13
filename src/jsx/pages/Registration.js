import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Registeration } from '../../store/reducers/authReducer'
import ButtonLoader from "../components/common/buttonLoader";
import { toast } from "react-toastify";

const Register = ({ history }) => {
   const [loading, setLoading] = useState(false)
   const [registrationData, setRegistrationData] = useState({});
   const dispatch = useDispatch()
   const handleBlur = (e) => {
      const newRegistrationData = { ...registrationData };
      newRegistrationData[e.target.name] = e.target.value;
      setRegistrationData(newRegistrationData);
   };
   const submitHandler = async (e) => {
      e.preventDefault();
      if (!registrationData.email || !registrationData.password || !registrationData.fullName) {
         // alert('please fill all the required fields and the try again');
         toast.error('please fill all the required fields and the try again')
      }
      try {

         setLoading(true)
         const data = await dispatch(Registeration(registrationData));

         if (data) {
            history.push("/page-login");
         } else {
            // alert('Failed to register user');
            toast.error('please fill all the required fields and the try again')

         }
         setLoading(false)

      } catch (error) {
      }

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
                                 Sign up your account
                              </h4>
                              <form
                                 action=""
                                 onSubmit={(e) => submitHandler(e)}
                              >
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Username</strong>
                                    </label>
                                    <input
                                       type="text"
                                       className="form-control"
                                       placeholder="username"
                                       name="fullName"
                                       onChange={handleBlur}
                                    />
                                 </div>
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Email</strong>
                                    </label>
                                    <input
                                       type="email"
                                       className="form-control"
                                       placeholder="hello@example.com"
                                       name="email"
                                       onChange={handleBlur}
                                    />
                                 </div>
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Password</strong>
                                    </label>
                                    <input
                                       type="password"
                                       className="form-control"
                                       defaultValue=""
                                       name="password"
                                       onChange={handleBlur}
                                    />
                                 </div>
                                 <div className="text-center mt-4">
                                 <ButtonLoader loader={loading} title={'Sign me up'} classes="btn btn-primary btn-block" />

                                    {/* <input
                                       type="submit"
                                       value=" Sign me up"
                                       className="btn btn-primary btn-block"
                                    /> */}
                                 </div>
                              </form>
                              <div className="new-account mt-3">
                                 <p>
                                    Already have an account?{" "}
                                    <Link
                                       className="text-primary"
                                       to="/page-login"
                                    >
                                       Sign in
                                    </Link>
                                 </p>
                              </div>
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

export default Register;
