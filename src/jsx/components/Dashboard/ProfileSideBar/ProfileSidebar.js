import React from "react";
import { Link } from "react-router-dom";

function ProfileSidebar() {
   return (
      <div className="profile-sidebar dz-scroll" id="DZ_W_Sidebar">
         <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="text-black">Profile</h5>
            <Link
               to="/Linkpp-profile"
               className="text-red text-primary edit-profile-link"
            >
               Edit
            </Link>
            <Link to="#" className="text-red d-none close-side">
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
         <div className="profile-img mb-4">
            <img
               src="images/profile/profile.png"
               width={140}
               height={140}
               alt=""
            />
         </div>
         <div className="profile-info-bx mb-4">
            <h4 className="mb-1 fs-22">Samuel Anderson</h4>
            <span>Admin</span>
         </div>
         <div className="text-center mb-5">
            <Link to="#" className="btn text-left light btn-dark d-block mb-3 ">
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
            </Link>
            <Link
               to="app-profile.html"
               className="btn btn-outline-dark d-block btn-lg"
            >
               Edit Profile
            </Link>
         </div>
         <hr />
         <div className="card-campaign mt-5">
            <h5>Ad Campaign Tutorials Video</h5>
            <Link to="#" className="fa fa-play" />
         </div>
      </div>
   );
}

export default ProfileSidebar;
