import { useEffect, useState,FC } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFooter, beforeFooter, subscribeUser } from "../Footer/footer.action";
import { firstInputCharacterSpace } from "../../utils/functions";
import EmailIcon from "../../assets/images/mailbox-icon.svg";
import { useLocation } from "react-router-dom";
import "./Footer.css";
import { toast } from "react-toastify";
import { emptyError } from "../../redux/shared/error/error.action";
import {footerInt} from "../../interfaces/components";

const Footer:FC<footerInt> = (props) => {
  const [email, setEmail] = useState<any>("");
  const [loader, setLoader] = useState<any>(false);

  useEffect(() => {
    if (props.subscribeAuth && props.error === null) {
      setLoader(false);
      toast.success("Subscribed successfully");
      props.beforeFooter();
    }
  }, [props.subscribeAuth]);


  useEffect(() => {
    if (props.error !== null) {
      toast.error(props.error.message);
      setLoader(false);

      props.emptyError();
    }
  }, [props.error]);

  const subscribe = () => {
    if (email.trim() === "") {
      return toast.error("Please enter an email to subscribe");
    }
    if (validateEmail(email)) {
      props.beforeFooter();
      setLoader(true);
      props.subscribeUser(email);
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  const validateEmail = (email:any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const location = useLocation();
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
                  {location.pathname !== "/login" &&
                    location.pathname !== "/Signup" && (
                      <>
                        <li>
                          <Link to="/auctions">Live Auction</Link>
                        </li>
                        <li>
                          <Link to="/popular-collections">
                            Popular Collections
                          </Link>
                        </li>
                      </>
                    )}
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
                  <input
                    type="email"
                    maxLength={50}
                    onKeyDown={(e) => firstInputCharacterSpace(e, email)}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="youremail@xyz.com"
                  />
                  <div>
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon1"
                      disabled={loader}
                      onClick={() => subscribe()}
                    >
                      {loader ? (
                        <div className="spinner-border footer-loader" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                </div>
                {/* <p>{data.desc}</p> */}
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
                © 2022 All rights reserved by mintsclub.io
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const mapStateToProps = (state:any) => ({
  error: state.error,
  settings: state.settings,
  subscribeAuth: state.footer.subscribeAuth,
});

export default connect(mapStateToProps, {
  subscribeUser,
  emptyError,
  beforeFooter,
})(Footer);
