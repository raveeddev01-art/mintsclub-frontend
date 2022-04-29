import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFooter } from "./footer.action";

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
      {/* Footer Top */}
      <div className="footer-top">
        <div className="container">
          <div className="row justify-content-center justify-content-lg-between">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 res-margin order-5 order-lg-0">
              {/* Footer Items */}
              <div className="footer-items footer-notify-item">
                {/* Footer Title */}
                <h4 className="footer-title">
                  {"Want to get notify and product updates from us?"}
                </h4>
                {/* Subscribe Form */}
                <div className="input-group notify-form">
                  <div className="input-group-prepend">
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon1"
                    >
                      Notify
                    </button>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="yourname@gmail.com"
                    aria-label="yourname@gmail.com"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <p>{data.desc}</p>
                {/* Social Icons */}
                <div className="social-icons d-flex justify-content-center justify-content-lg-start">
                  <a href={data.linkedin} target="_blank">
                    <i className={"fab fa-linkedin-in"} />
                  </a>
                  <a href={data.facebook} target="_blank">
                    <i className={"fab fa-facebook-f"} />
                  </a>
                  <a href={data.instagram} target="_blank">
                    <i className={"fab fa-instagram"} />
                  </a>
                  <a href={data.twitter} target="_blank">
                    <i className={"fab fa-twitter"} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-2 res-margin  text-center  text-lg-start">
              {/* Footer Items */}
              <div className="footer-items">
                {/* Footer Title */}
                <h4 className="footer-title">{"Company"}</h4>
                <ul>
                  <li>
                    <Link to="/explore-all">About</Link>
                  </li>
                  <li>
                    <Link to="/how-it-works">Team</Link>
                  </li>
                  <li>
                    <Link to="/create">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/privacy-and-terms">Blog</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-2 res-margin text-center  text-lg-start">
              {/* Footer Items */}
              <div className="footer-items">
                {/* Footer Title */}
                <h4 className="footer-title">{"Resource"}</h4>
                <ul>
                  <li>
                    <Link to="/help-center">Authors</Link>
                  </li>
                  <li>
                    <Link to="/contact">Affiliate Program</Link>
                  </li>
                  <li>
                    <Link to="/contact">FAQS</Link>
                  </li>
                  <li>
                    <Link to="/contact">News & Press</Link>
                  </li>
                  <li>
                    <Link to="/contact">Testimonials</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-2 res-margin text-center  text-lg-start">
              {/* Footer Items */}
              <div className="footer-items">
                {/* Footer Title */}
                <h4 className="footer-title">{"Need Help ?"}</h4>
                <ul>
                  <li>
                    <Link to="/help-center">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/contact">Sign up</Link>
                  </li>
                  <li>
                    <Link to="/contact">Sign in</Link>
                  </li>
                  <li>
                    <Link to="/contact">Pre-sale Questions</Link>
                  </li>
                  <li>
                    <Link to="/contact">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6  col-lg-2 res-margin text-center  text-lg-start">
              {/* Footer Items */}
              <div className="footer-items">
                {/* Footer Title */}
                <h4 className="footer-title">{"Marketplace"}</h4>
                <ul>
                  <li>
                    <Link to="/help-center">Live Auction</Link>
                  </li>
                  <li>
                    <Link to="/contact">NFT Product</Link>
                  </li>
                  <li>
                    <Link to="/contact">Virtual World</Link>
                  </li>
                  <li>
                    <Link to="/contact">Popular Art</Link>
                  </li>
                  <li>
                    <Link to="/contact">Domain Names</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Copyright Left */}
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
