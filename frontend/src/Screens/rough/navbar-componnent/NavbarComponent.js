import React from "react";
import { useHistory } from "react-router-dom";
import MintsClub from "../../../assets/images/MintsClub-White.png";

import { BsTwitter } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
import { GrReddit } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";

import { ENV } from "../../../config/config";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./NavbarComponent.css";

const NavbarComponent = () => {
  const history = useHistory();
  const twitter = ENV.twitterLink;
  const discordLink = ENV.discordLink;
  const telegramLink = ENV.telegramLink;
  const redditLink = ENV.redditLink;
  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        variant="dark"
        className="navbar-custom align-items-center navbar-sticky"
      >
        <Navbar.Brand href="#" className="navbar-brand-logo">
          <img src={MintsClub} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#" className="active">
              <AiFillHome className="home-icon " /> Home
            </Nav.Link>
            <Nav.Link href={twitter}>
              <BsTwitter className="home-icon " /> Twitter
            </Nav.Link>
            <Nav.Link href={discordLink}>
              <SiDiscord className="home-icon " />
              Discord
            </Nav.Link>
            <Nav.Link href={telegramLink}>
              <FaTelegramPlane className="home-icon " />
              Telegram
            </Nav.Link>
            <Nav.Link href={redditLink}>
              <GrReddit className="home-icon " />
              Reddit
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
