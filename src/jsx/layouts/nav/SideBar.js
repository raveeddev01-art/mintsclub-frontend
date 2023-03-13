import React, { Component } from "react";

/// Link
import { Link, NavLink } from "react-router-dom";


/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

// import HomeIcon from "@material-ui/icons/Home";
// import List from "@material-ui/icons/List";
// import AttachMoney from "@material-ui/icons/AttachMoney";
// import SwapVerticalCircle from "@material-ui/icons/SwapVerticalCircle";
// import Collections from "@material-ui/icons/Collections";
// import People from "@material-ui/icons/People";
// import Comment from "@material-ui/icons/Comment";
// import MonetizationOn from "@material-ui/icons/MonetizationOn";
// import ListAlt from "@material-ui/icons/ListAlt";
// import MenuBook from "@material-ui/icons/MenuBook";
// import PaidIcon from "@material-ui/icons/Payment";
import SettingsApplicationsIcon from "@material-ui/icons/Settings";
// import LogoutIcon from '@mui/icons-material/Logout';
// import Trending from "@material-ui/icons/TrendingUp";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import TagFacesSharp from "@material-ui/icons/TagFacesSharp";
///
// import drump from "../../../images/card/drump.png";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {
    // this.mm("dispose");
    // console.log(this.mm);
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class SideBar extends Component {
  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");

    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }

    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");

    // function heartBlast() {
    //    return handleheartBlast.classList.toggle("heart-blast");
    // }

    // handleheartBlast.addEventListener('click', heartBlast);
  }
  render() {
    /// Path
    var path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    return (
      <div className="deznav wrapper">
        <div className="deznav-scroll sidebar">
          <ul>
            {/* <li>
              <NavLink
                exact
                className="has-arrow ai-icon"
                to="/"
                aria-expanded="false"
                activeClassName="selected"
              >
                <HomeIcon className="mr-1 pb-1" />
                <span className="item">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={`${path === "nft-listing" ? "mm-active" : ""}`}
                to="/nft-listing"
                aria-expanded="false"
                activeClassName="selected"
              >
                <List className="mr-1 pb-1" />
                <span className="item">NFT Listing</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={`${path === "nft-sales" ? "mm-active" : ""}`}
                to="/nft-sales"
                aria-expanded="false"
                activeClassName="selected"
              >
                <ArrowUpward className="mr-1 pb-1" />
                <span className="item">NFT Sales</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/collection-listing"
                className={`${
                  path === "collection-listing" ? "mm-active" : ""
                }`}
                aria-expanded="false"
                activeClassName="selected"
              >
                <Collections className="mr-1 pb-1" />
                <span className="item">Collection Listing</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/featured-collection-listing"
                className={`${
                  path === "collection-listing" ? "mm-active" : ""
                }`}
                aria-expanded="false"
                activeClassName="selected"
              >
                <Collections className="mr-1 pb-1" />
                <span className="item">Featured Listing</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/launchers-collection-listing"
                className={`${
                  path === "collection-listing" ? "mm-active" : ""
                }`}
                aria-expanded="false"
                activeClassName="selected"
              >
                <Collections className="mr-1 pb-1" />
                <span className="item">Requested Launchers</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                exact
                to="/collection-importing"
                className={`${
                  path === "collection-listing" ? "mm-active" : ""
                }`}
                aria-expanded="false"
                activeClassName="selected"
              >
                <Collections className="mr-1 pb-1" />
                <span className="item">Collection Importing</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                exact
                to="/auctions-listing"
                className={`${path === "auctions-listing" ? "mm-active" : ""}`}
                aria-expanded="false"
                activeClassName="selected"
              >
                <ListAlt className="mr-1 pb-1" />
                <span className="item">Auction Listing</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/swapping-revenue"
                className={`${path === "swapping-revenue" ? "mm-active" : ""}`}
                aria-expanded="false"
                activeClassName="selected"
              >
                <SwapVerticalCircle className="mr-1 pb-1" />
                <span className="item">Swapping</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={`${path === "users-listing" ? "mm-active" : ""}`}
                to="/users-listing"
                aria-expanded="false"
                activeClassName="selected"
              >
                <People className="mr-1 pb-1" />
                <span className="item">Users Listing</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={`${path === "blogs-listing" ? "mm-active" : ""}`}
                to="/blogs-listing"
                aria-expanded="false"
                activeClassName="selected"
              >
                <MenuBook className="mr-1 pb-1" />
                <span className="item">Blogs Listing</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={`${path === "blogs-listing" ? "mm-active" : ""}`}
                to="/news-listing"
                aria-expanded="false"
                activeClassName="selected"
              >
                <MenuBook className="mr-1 pb-1" />
                <span className="item">News Listing</span>
              </NavLink>
            </li> */}
            <li>
              <NavLink
                exact
                className={`${path === "system-setting" ? "mm-active" : ""}`}
                to="/system-setting"
                aria-expanded="false"
                activeClassName="selected"
              >
                <SettingsApplicationsIcon className="mr-1 pb-1" />
                <span className="item">System Setting</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={()=>{localStorage.removeItem('authToken')}}
                exact
                // className={`${path === "system-setting" ? "mm-active" : ""}`}
                to="/page-login"
                aria-expanded="false"
                activeClassName="selected"
              >
                <SettingsApplicationsIcon className="mr-1 pb-1" sx={{mt:3}}/>
                <span className="item">Log Out</span>

              </NavLink>
            </li>
            {/* <li>
              <NavLink
                exact
                className={`${path === "tax-payment" ? "mm-active" : ""}`}
                to="/tax-payment"
                aria-expanded="false"
                activeClassName="selected"
              >
                <AttachMoney className="mr-1 pb-1" />
                <span className="item">Tax Payment</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={`${path === "faq-listing" ? "mm-active" : ""}`}
                to="/faq-listing"
                aria-expanded="false"
                activeClassName="selected"
              >
                <PaidIcon className="mr-1 pb-1" />
                <span className="item">FAQ Listing</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={`${path === "revenue" ? "mm-active" : ""}`}
                to="/revenue"
                aria-expanded="false"
                activeClassName="selected"
              >
                <MonetizationOn className="mr-1 pb-1" />
                <span className="item">Revenue</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={`${path === "week-trending" ? "mm-active" : ""}`}
                to="/week-trending"
                aria-expanded="false"
                activeClassName="selected"
              >
                <Trending className="mr-1 pb-1" />
                <span className="item">Week Trending</span>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
