import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import profileImage from "../../images/profile/profile.png";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../../store/reducers/userReducer";
import { Avatar } from "@material-ui/core";

function ProfileSidebar({ addClass, hideProfile }) {
   const history = useHistory();
   const dispatch = useDispatch();
   const user = useSelector(state => state?.userReducer?.user)
   const logout = () => {
      // localStorage.removeItem('authToken');
      history.push("/page-login");
   }

   const getLoggedInUserDetail = async () => {
      await dispatch(getLoggedInUser());
   }

   useEffect(() => {
      getLoggedInUserDetail()

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <PerfectScrollbar
         className={`profile-sidebar dz-scroll ${addClass}`}
         id="DZ_W_Sidebar"
         style={{ display: window.location.pathname !== '/' && 'none' }}
      >
         <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="text-black">Profile</h5>
            <Link
               to="/edit-profile"
               className="text-red text-primary edit-profile-link"
            >
               Edit
            </Link>
            <Link
               to="#"
               className="text-red d-none close-side"
               onClick={() => hideProfile()}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x-circle"
               >
                  <circle cx={12} cy={12} r={10} />
                  <line x1={15} y1={9} x2={9} y2={15} />
                  <line x1={9} y1={9} x2={15} y2={15} />
               </svg>
            </Link>
         </div>
         <div className="profile-img mb-4 d-flex justify-content-center">
            <Avatar src={user?.avatar} className={'adminAvatar'} />
         </div>
         <div className="profile-info-bx mb-4">
            <h4 className="mb-1 fs-22">{user?.fullName}</h4>
            <span>Admin</span>
         </div>
         <div className="text-center mb-5">
            {/* <Link to="#" className="btn text-left light btn-dark d-block mb-3 ">
               <i className="fa fa-instagram scale5 mr-3" />
               /samuelanderson.404
            </Link>
            <Link to="#" className="btn text-left light btn-dark d-block mb-3 ">
               <i className="fa fa-twitter scale5 mr-3" />
               /samuel.404nderson
            </Link>
            <Link to="#" className="btn text-left light btn-dark d-block mb-4 ">
               <i className="fa fa-facebook scale5 mr-3" />
               /talksamuel.404
            </Link> */}
            <Link
               to="/edit-profile"
               className="btn btn-outline-dark d-block btn-lg mb-2"
            >
               Edit Profile
            </Link>

            <div onClick={() => logout()} className="btn btn-outline-dark d-block btn-lg"
            >
               Logout
            </div>

         </div>
         <hr />
         {/* <div className="card-campaign mt-5">
            <h5>Ad Campaign Tutorials Video</h5>
            <Link to="#" className="fa fa-play" />
         </div> */}
      </PerfectScrollbar>
   );
}

export default ProfileSidebar;
