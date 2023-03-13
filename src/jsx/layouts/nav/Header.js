import React from "react";

import { Link } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Image
import profile from "../../../images/profile/pic1.jpg";
import avatar from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";
// import { useWallet } from "@solana/wallet-adapter-react";
import ProfileSidebar from "../ProfileSidebar";
import { getUserBalance } from "../../../Helper/Balance";
const Header = ({
  onNote,
  toggle,
  onProfile,
  onNotification,
  onBox,
  showProfileSideBar,
  showProfile,
}) => {
  let path = window.location.pathname.split("/");
  path = path[path.length - 1];
  path = path === "";

  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div className="search_bar dropdown show d-none">
                <div className="dropdown-menu p-0 m-0 show">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search Here"
                      aria-label="Search"
                    />
                  </form>
                </div>
                <span
                  className="search_icon p-3 c-pointer"
                  data-toggle="dropdown"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.7871 22.7761L17.9548 16.9437C19.5193 15.145 20.4665 12.7982 20.4665 10.2333C20.4665 4.58714 15.8741 0 10.2333 0C4.58714 0 0 4.59246 0 10.2333C0 15.8741 4.59246 20.4665 10.2333 20.4665C12.7982 20.4665 15.145 19.5193 16.9437 17.9548L22.7761 23.7871C22.9144 23.9255 23.1007 24 23.2816 24C23.4625 24 23.6488 23.9308 23.7871 23.7871C24.0639 23.5104 24.0639 23.0528 23.7871 22.7761ZM1.43149 10.2333C1.43149 5.38004 5.38004 1.43681 10.2279 1.43681C15.0812 1.43681 19.0244 5.38537 19.0244 10.2333C19.0244 15.0812 15.0812 19.035 10.2279 19.035C5.38004 19.035 1.43149 15.0865 1.43149 10.2333Z"
                      fill="#A4A4A4"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
