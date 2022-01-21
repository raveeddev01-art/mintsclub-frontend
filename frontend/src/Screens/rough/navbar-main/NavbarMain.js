import React from "react";
import { Link, useHistory } from "react-router-dom";
import MintsClub from "../../../assets/images/main-logo.svg";
import LoginIcon from "../../../assets/images/login-icon.svg";
import SearchIcon from "../../../assets/images/nav-search-icon.svg";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./NavbarMain.css";

const NavbarMain = () => {
  return (
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
          <Nav className="mx-xl-auto" activeKey="/user-dashboard">
            <Nav.Link to="/user-dasboard" className="nav-main-link">
              Home
            </Nav.Link>
            <NavDropdown
              title="Explore"
              id="navbarScrollingDropdown"
              className="nav-main-link dropdown-bg"
            >
              <NavDropdown.Item
                to="/explore-all"
                className="nav-main-link main-nav-dd-items"
              >
                Explore
              </NavDropdown.Item>
              <NavDropdown.Item to="/auctions" className="nav-main-link">
                Live Auctions
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link to="/activity" className="nav-main-link">
              Activity
            </Nav.Link>
            <Nav.Link to="/collections" className="nav-main-link">
              Collections
            </Nav.Link>
            <Nav.Link to="/" className="nav-main-link">
              Conatct
            </Nav.Link>
            <Nav.Link to="/" className="nav-main-link">
              History
            </Nav.Link>

            <Link
              to="/"
              id="wallet-address"
              className="btn ml-lg-auto btn-linear-gradient d-sm-none"
            >
              <img src={LoginIcon} alt="loginIcon" className="me-2" />
              Login
            </Link>
            <div class="search-box d-sm-none">
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
          <div class="search-box">
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
            to="/"
            id="wallet-address"
            className="btn ml-lg-auto btn-linear-gradient"
          >
            <img src={LoginIcon} alt="loginIcon" className="me-2" />
            Login
          </Link>
        </div>
      </Navbar>
    </Container>
  );
};

export default NavbarMain;
