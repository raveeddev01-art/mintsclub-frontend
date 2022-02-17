import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import MintsClub from "../../../assets/images/main-logo.svg";
import LoginIcon from "../../../assets/images/login-icon.svg";
import SearchIcon from "../../../assets/images/nav-search-icon.svg";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ENV } from "../../../config/config";
import "./NavbarMain.css";

const NavbarMain = () => {
  let userId = ENV.getUserKeys("_id")._id;
  const [path, setPath] = React.useState(null);
  const history = useHistory();
  const location = useLocation();

  const clearLocalStorage = () => {
    if (userId) {
      localStorage.clear();
    }
    console.log("clicked");
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
          variant="dark"
          className="navbar-main-custom align-items-center px-0 py-4"
        >
          <Navbar.Brand href="#" className="navbar-brand-logo">
            <img src={MintsClub} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-xl-auto" defaultActiveKey="/user-dashboard">
              <Nav.Link href="/user-dashboard" className="nav-main-link">
                Home
              </Nav.Link>
              <NavDropdown
                title="Explore"
                id="navbarScrollingDropdown"
                className="nav-main-link dropdown-bg"
              >
                <NavDropdown.Item
                  to="/collection/explorecollections"
                  href="/explore/exploreAll"
                  className="nav-main-link main-nav-dd-items"
                >
                  Explore All
                </NavDropdown.Item>
                <NavDropdown.Item
                  to="/collection/explorecollections"
                  href="/explore/allNFT"
                  className="nav-main-link main-nav-dd-items"
                >
                  All NFT
                </NavDropdown.Item>
                {/* <NavDropdown.Item to="/auctions" className="nav-main-link">
                  Live Auctions
                </NavDropdown.Item> */}
              </NavDropdown>
        
              {/* <Nav.Link
                href="/collection/detailPage"
                className={`nav-main-link${
                  path === "/collection/detailPage"
                    ? "active-className-link"
                    : ""
                }`}
              >
                Collections
              </Nav.Link> */}
              <Nav.Link to="/create" href="/create" className="nav-main-link">
                Create
              </Nav.Link>
              <Nav.Link to="/collection/detailPage" href="/userprofile" className="nav-main-link">
                Profile
              </Nav.Link>
              {/* <Nav.Link to="/" className="nav-main-link">
                History
              </Nav.Link> */}

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
              <div class="search-box mt-1 mt-sm-0 d-sm-none">
                <input
                  class="search-txt "
                  type="text"
                  name=""
                  placeholder="Type to Search"
                />
                <a class="search-btn" href="#">
                  <img src={SearchIcon} alt="search-icon" />
                </a>
              </div>
            </Nav>
          </Navbar.Collapse>
          <div className="main-nav-right d-none d-sm-flex justify-content-around align-items-center">
            <div class="search-box ">
              <input
                class="search-txt"
                type="text"
                name=""
                placeholder="Type to Search"
              />
              <a class="search-btn me-1 mt-1" href="#">
                <img src={SearchIcon} alt="search-icon" />
              </a>
            </div>
            <Link
              to="/login"
              id="wallet-address"
              className="btn ml-lg-auto btn-linear-gradient"
            >
              <div onClick={() => clearLocalStorage()}>
                <img src={LoginIcon} alt="loginIcon" className="me-2" />
                {ENV.getUserKeys("_id")._id ? "Logout" : "Login"}
              </div>
            </Link>
          </div>
        </Navbar>
      </Container>
    </div>
  );
};

export default NavbarMain;
