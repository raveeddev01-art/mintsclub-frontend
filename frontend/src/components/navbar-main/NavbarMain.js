import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import MintsClub from "../../assets/images/main-logo.svg";
import LoginIcon from "../../assets/images/login-icon.svg";
import SearchIcon from "../../assets/images/nav-search-icon.svg";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ENV } from "../../config/config";
import "./NavbarMain.css";
import { connect } from "react-redux";
import { beforeCollection } from "../../components/collections/collections.actions";

const NavbarMain = (props) => {
  let userId = ENV.getUserKeys("_id")._id;
  const [path, setPath] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(null);
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
          <Navbar.Brand to="/" href="/" className="navbar-brand-logo">
            <img src={MintsClub} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mx-xl-auto"
              defaultActiveKey={`${location.pathname}`}
            >
              <Nav.Link to="/" href="/" className="nav-main-link">
                Home
              </Nav.Link>
              <NavDropdown
                title="Explore"
                id="navbarScrollingDropdown"
                active={activeTab === 1}
                defaultActiveKey={activeTab}
                className={`nav-main-link dropdown-bg`}
              >
                <NavDropdown.Item
                  to="/explore/exploreAll"
                  href="/explore/exploreAll"
                  active={activeTab === 1}
                  eventKey={1}
                  className={`nav-main-link main-nav-dd-items ${
                    location.pathname === "/explore/exploreAll"
                      ? "active-item"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveTab(1);
                  }}
                >
                  Explore All
                </NavDropdown.Item>
                <NavDropdown.Item
                  to="/explore/allNFT"
                  href="/explore/allNFT"
                  className={`nav-main-link main-nav-dd-items ${
                    location.pathname === "/explore/allNFT" ? "active-item" : ""
                  }`}
                  eventKey={2}
                  active={activeTab === 2}
                  onClick={() => {
                    setActiveTab(2);
                  }}
                >
                  All NFT
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link to="/create" href="/create" className="nav-main-link">
                Create
              </Nav.Link>
              <Nav.Link
                to="/userprofile"
                href="/userprofile"
                className="nav-main-link"
              >
                Profile
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
              <div
                onClick={() => {
                  props.beforeCollection();
                  clearLocalStorage();
                }}
              >
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { beforeCollection })(NavbarMain);
