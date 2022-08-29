import { useEffect, useState, useContext, FC } from "react";
import { Link, useHistory, useLocation, NavLink } from "react-router-dom";
import MintsClub from "../../assets/images/main-logo.svg";
import { ReactComponent as LoginIcon } from "../../assets/images/login-icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/nav-search-icon.svg";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ENV } from "../../config/config";
import "./NavbarMain.scss";
import { connect } from "react-redux";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import { beforeCollection } from "../../pages/collections/collections.actions";
import { headerImages } from "../../assets/assets";
import darkModeContext from "../../context/darkmode/DarkModeContext";

const NavbarMain = () => {
  const [searchactive, setSearchActive] = useState<any>(false);
  const [searchValue, setSearchValue] = useState<any>("");
  const history = useHistory();
  const { darkMode, setDarkMode } = useContext(darkModeContext);

  const handleChange = (e: any) => {
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
    if (ENV?.getUserKeys("_id")?._id) {
      localStorage.clear();
      history.push("/login");
    }
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };
  const storedTheme = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  const toggleTheme = (e: any) => {
    if (e.target.checked) {
      setDark();
      setDarkMode(true);
    } else {
      setLight();
      setDarkMode(false);
    }
  };

  useEffect(() => {
    if (defaultDark) {
      setDark();
      setDarkMode(true);
    }
  }, []);
  console.log(ENV?.getUserKeys("_id"));

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
                <DarkModeButton
                  toggleTheme={toggleTheme}
                  defaultDark={defaultDark}
                />
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

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { beforeCollection })(NavbarMain);
