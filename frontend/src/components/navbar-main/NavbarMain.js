import React, { useState } from "react";
import { Link, useHistory, useLocation, NavLink } from "react-router-dom";
import MintsClub from "../../assets/images/main-logo.svg";
import LoginIcon from "../../assets/images/login-icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/nav-search-icon.svg";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ENV } from "../../config/config";
import "./NavbarMain.css";
import { connect } from "react-redux";
import { beforeCollection } from "../../components/collections/collections.actions";

const NavbarMain = (props) => {
  let userId = ENV.getUserKeys("_id")._id;
  const [path, setPath] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(null);
  const [searchactive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();
  const location = useLocation();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    e.target.value ? setSearchActive(true) : setSearchActive(false);
  };
  const handleSearchKeyword = () => {
    console.log("keyword", searchValue);
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
          bg="light"
          expand="xl"
          variant="light"
          className="navbar-main-custom align-items-center px-0 py-4"
        >
          <NavLink to="/" className="navbar-brand-logo">
            <img src={MintsClub} alt="logo" />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={"mx-xl-auto"}>
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
              <Nav.Link className="nav-main-link">
                <NavLink to="/userprofile" className="nav-main-link">
                  Profile
                </NavLink>
              </Nav.Link>
              <Link
                to={`/login`}
                onClick={() => clearLocalStorage()}
                id="wallet-address"
                className="btn ml-lg-auto btn-linear-gradient d-sm-none"
              >
                <div onClick={() => clearLocalStorage()}>
                  <img src={LoginIcon} alt="loginIcon" className="me-2" />
                  {ENV.getUserKeys("_id")._id ? "Logout" : "Login"}
                </div>
              </Link>
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
            <Link
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
                  <svg
                    width="16"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2568_54)">
                      <path
                        d="M0.000712005 10.4766C0.000712005 7.78907 0.000712005 5.10179 0.000712005 2.41471C0.000712005 0.944311 1.00823 0.000976562 2.57859 0.000976562C5.16023 0.000976562 7.74188 0.000976562 10.3235 0.000976562C10.9511 0.000976562 11.3531 0.509888 11.1388 1.02318C11.0159 1.31801 10.7255 1.49767 10.3516 1.49955C9.61714 1.49955 8.8827 1.49955 8.15228 1.49955H2.52917C1.9049 1.49955 1.59444 1.78937 1.59444 2.3759C1.59444 7.78928 1.59444 13.2031 1.59444 18.6173C1.59444 19.2069 1.90089 19.4936 2.52917 19.4936C5.12818 19.4936 7.72741 19.4936 10.3269 19.4936C10.9525 19.4936 11.3544 20.0063 11.1381 20.5183C11.0146 20.8126 10.7235 20.991 10.3489 20.9922C9.50764 20.9922 8.66571 20.9922 7.82445 20.9922C6.05824 20.9922 4.29204 20.9922 2.52584 20.9922C1.02492 20.9922 -0.00128546 20.0313 -0.00195312 18.6248C-0.00150801 15.9114 -0.000623331 13.1953 0.000712005 10.4766Z"
                        fill="white"
                      />
                      <path
                        d="M13.2677 11.2499H12.7229C10.366 11.2499 8.00933 11.2499 5.65291 11.2499C5.03131 11.2499 4.62804 10.7216 4.86239 10.2146C5.01462 9.88408 5.30105 9.74886 5.68162 9.74949C7.61297 9.75241 9.54475 9.75241 11.477 9.74949H13.2403C13.1689 9.67187 13.1275 9.61992 13.0787 9.57422C12.549 9.07637 12.0194 8.57914 11.4897 8.08254C11.1258 7.73888 11.1011 7.29069 11.4229 6.97833C11.7447 6.66597 12.2441 6.67536 12.618 7.02465C13.6498 7.98989 14.68 8.95618 15.7087 9.92351C16.0952 10.2872 16.0946 10.7129 15.7087 11.0778C14.6805 12.0455 13.65 13.0116 12.6174 13.976C12.2515 14.3184 11.7721 14.3391 11.4403 14.0349C11.1084 13.7307 11.1198 13.2656 11.4923 12.9144C12.0665 12.3742 12.6427 11.8358 13.2677 11.2499Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2568_54">
                        <rect width="16" height="21" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                {ENV.getUserKeys("_id")._id ? "Logout" : "Login"}
              </div>
            </Link>
          </div>
        </Navbar>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { beforeCollection })(NavbarMain);
