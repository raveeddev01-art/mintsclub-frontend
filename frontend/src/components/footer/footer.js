import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFooter } from "./footer.action";
import EmailIcon from "../../assets/images/mailbox-icon.svg";
import "./footer.css";

const Footer = (props) => {
  const [data, setData] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    vine: "",
    desc: "",
  });

  useEffect(() => {
    props.getFooter();
  }, []);

  return (
    <footer className="footer-area">
      <div className="footer-top">
        <div className="container">
          <div className="row justify-content-center justify-content-lg-between">
            <div className="col-12 col-md-3 col-lg-2 res-margin  text-center  text-md-start">
              <div className="footer-items">
                <h4 className="footer-title">{"Who Are We?"}</h4>
                <ul>
                  <li>
                    <Link to="/aboutus">About Us</Link>
                  </li>
                  <li>
                    <Link to="/faqs">FAQs</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-3 col-lg-2 res-margin text-center  text-md-start">
              <div className="footer-items">
                <h4 className="footer-title">{"Join MintsClub"}</h4>
                <ul>
                  <li>
                    <Link to="/login">Sign In</Link>
                  </li>
                  <li>
                    <Link to="/Signup">Sign Up</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-3 col-lg-2 res-margin text-center  text-md-start">
              <div className="footer-items">
                <h4 className="footer-title">{"Quick Links"}</h4>
                <ul>
                  <li>
                    <Link to="/auctions">Live Auction</Link>
                  </li>
                  <li>
                    <Link to="/popular-collections">Popular Collections</Link>
                  </li>
                  <li>
                    <Link to="/privacypolicy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/termsandconditions">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 res-margin">
              <div className="footer-items footer-notify-item text-center text-lg-end">
                <h4 className="footer-title">
                  Never Miss The NFT Beat! <br /> Subscribe To Our Latest News
                </h4>
                <div className="notify-form">
                  <div className="email-icon">
                    <img src={EmailIcon} alt="mail-box" />
                  </div>
                  <input type="email" placeholder="youremail@xyz.com" />
                  <div>
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon1"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
                <p>{data.desc}</p>
                <div className="social-icons d-flex justify-content-center justify-content-lg-end">
                  <a
                    href={"https://www.linkedin.com/showcase/mints-club"}
                    target="_blank"
                  >
                    <i className={"fab fa-linkedin-in"} />
                  </a>
                  <a
                    href={"https://www.facebook.com/MintsClub.io/"}
                    target="_blank"
                  >
                    <i className={"fab fa-facebook-f"} />
                  </a>
                  <a
                    href={"https://www.instagram.com/mintsclub/"}
                    target="_blank"
                  >
                    <i className={"fab fa-instagram"} />
                  </a>
                  <a href={"https://twitter.com/MintsClub"} target="_blank">
                    <i className={"fab fa-twitter"} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="copyright-text">
                © 2022 All Rights Reserved By MintsClub.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
  settings: state.settings,
});

export default connect(mapStateToProps, { getFooter })(Footer);
