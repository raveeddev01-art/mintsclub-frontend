import React, { useState } from "react";
import { Link, useHistory, useLocation, NavLink } from "react-router-dom";
import MintsClub from "../../assets/images/main-logo.svg";
import { ReactComponent as LoginIcon } from "../../assets/images/login-icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/nav-search-icon.svg";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ENV } from "../../config/config";
import "./NavbarMain.css";
import { connect } from "react-redux";
import DarkModeButton from "../dark-mode-button/darkModeButton";
import { beforeCollection } from "../../pages/collections/collections.actions";
import { headerImages } from "../../assets/assets";

const NavbarMain = (props) => {
  let userId = ENV.getUserKeys("_id")._id;
  const [path, setPath] = React.useState(null);
  const [searchactive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { darkMode } = props.darkMode;

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    e.target.value ? setSearchActive(true) : setSearchActive(false);
  };
  const handleSearchKeyword = () => {
    if (searchValue !== "" && searchValue.length >= 3) {
      history.push({
        pathname: "/explore/allNFT",
        state: searchValue,
      });
    }
  };
  const clearLocalStorage = () => {
    if (userId) {
      localStorage.clear();
    }

    history.push("/login");
  };
  React.useEffect(() => {
    setPath(location.path);
  }, [location.pathname]);

  return (
    <div className="main-nav-section">
      <Container className="main-nav-container">
        <Navbar
          expand="xl"
          className="navbar-main-custom align-items-center px-0 py-4"
        >
          <NavLink to="/" className="navbar-brand-logo">
            <img
              src={darkMode ? headerImages.logoDark : MintsClub}
              alt="logo"
            />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={"ms-xl-auto"}>
              <Nav.Link className="nav-main-link">
                <NavLink to="/">Home</NavLink>
              </Nav.Link>

              <NavDropdown
                title="Explore"
                id="navbarScrollingDropdown"
                className={`nav-main-link dropdown-bg`}
              >
                <NavDropdown.Item>
                  <NavLink
                    to="/explore/exploreAll"
                    className={`nav-main-link main-nav-dd-items`}
                  >
                    Explore All
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink
                    to="/explore/allNFT"
                    className={`nav-main-link main-nav-dd-items`}
                  >
                    All NFT
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Create"
                id="navbarScrollingDropdown"
                className={`nav-main-link dropdown-bg`}
              >
                <NavDropdown.Item>
                  <NavLink
                    to="/create"
                    className={`nav-main-link main-nav-dd-itemss`}
                  >
                    Create NFT
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink
                    to="/createcollection"
                    className={`nav-main-link main-nav-dd-items`}
                  >
                    Create Collection
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Profile"
                id="navbarScrollingDropdown"
                className={`nav-main-link dropdown-bg`}
              >
                <NavDropdown.Item>
                  <NavLink
                    to="/userprofile"
                    className={`nav-main-link main-nav-dd-itemss`}
                  >
                    Profile
                  </NavLink>
                </NavDropdown.Item>
                {/* <NavDropdown.Item> */}
                <DarkModeButton />
                {/* </NavDropdown.Item> */}
                <NavDropdown.Item>
                  <NavLink
                    to="/login"
                    className={`nav-main-link main-nav-dd-items`}
                    onClick={() => clearLocalStorage()}
                  >
                    {ENV.getUserKeys("_id")._id ? "Logout" : "Login"}
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
              {/* <Nav.Link className="nav-main-link">
                <NavLink to="/userprofile" className="nav-main-link">
                  Profile
                </NavLink>
              </Nav.Link> */}
              {/* <Link
                to={`/login`}
                onClick={() => clearLocalStorage()}
                id="wallet-address"
                className="btn ml-lg-auto btn-linear-gradient d-sm-none"
              >
                <div onClick={() => clearLocalStorage()}>
                  <span className="me-2">
                    <LoginIcon />
                  </span>
                  {ENV.getUserKeys("_id")._id ? "Logout" : "Login"}
                </div>
              </Link> */}
              <div className={`search-box mt-1 mt-sm-0 d-sm-none`}>
                <input
                  className={`search-txt ${searchactive ? "activeSearch" : ""}`}
                  type="text"
                  name=""
                  placeholder="Type to Search"
                  onChange={handleChange}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchKeyword()}
                />
                <button
                  className={`search-btn me-1 mt-1 ${
                    searchactive ? "activeSearchBtn" : ""
                  }`}
                  onClick={() => handleSearchKeyword()}
                >
                  <SearchIcon className="search-icon" />
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
          <div className="main-nav-right d-none d-sm-flex justify-content-around align-items-center">
            <div className="search-box ">
              <input
                className={`search-txt ${searchactive ? "activeSearch" : ""}`}
                type="text"
                name=""
                placeholder="Type to Search"
                onChange={handleChange}
                onKeyPress={(e) => e.key === "Enter" && handleSearchKeyword()}
              />
              <button
                className={`search-btn me-1 mt-1 ${
                  searchactive ? "activeSearchBtn" : ""
                }`}
                onClick={() => handleSearchKeyword()}
              >
                <SearchIcon className="search-icon" />
              </button>
            </div>
            {/* <Link
              to="/login"
              id="wallet-address"
              className="btn ml-lg-auto btn-linear-gradient btn-login"
            >
              <div
                onClick={() => {
                  props.beforeCollection();
                  clearLocalStorage();
                }}
              >
                <span className="me-2">
                  <LoginIcon />
                </span>
                {ENV.getUserKeys("_id")._id ? "Logout" : "Login"}
              </div>
            </Link> */}
          </div>
        </Navbar>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps, { beforeCollection })(NavbarMain);
