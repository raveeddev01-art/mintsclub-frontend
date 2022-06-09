import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/hero-bg.png";
import { Link } from "react-router-dom";
import { ENV } from "../../config/config";
import { connect } from "react-redux";
import { connectMetamaskCopy, signRequest } from "../../utils/web3";
import TickIcon from "../../assets/images/tick-checkbox.svg";
import { toast } from "react-toastify";
import { login, signup } from "../user/user.action";

import "./signup.css";

const initData = {
  pre_heading: "Signup",
  heading: "Create an Account",
  content: "",
};
const SignUp = (props) => {
  const [checkBox, setCheckBox] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false);

  const history = useHistory();
  useEffect(async () => {
    let connectedAddress = await connectMetamaskCopy();

    setConnectedAddress(connectedAddress);
  }, []);
  useEffect(() => {
    if (props.error?.message) {
      toast.error(props.error.message);
      setLoader(false)
    }
  }, [props.error]);
  useEffect(() => {
    if (props.userAuth) {
      toast.success("Signed up successfully");
      history.push("/");
    }
  }, [props.userAuth]);

  const signup = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      let sign = await signRequest();
      let payload = {
        address: connectedAddress,
        email: email,
        username: username,
        isApproved: false,
      };
      props.signup(payload);
    } catch (err) {
      setLoader(false);
      toast.error(err.message);
    }
  };

  const signInbannerData = {
    subHeading: "Sign Up",
    heading: "Create an Account",
    content:
      "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
  };

  return (
    <>
      <Banner
        subHeading={signInbannerData.subHeading}
        heading={signInbannerData.heading}
        content={signInbannerData.content}
        bgImg={BannerBg}
      />
      <section className="signup-section padding-wrapper mb-5">
        <div className="container">
          <form onSubmit={signup}>
            <div className="row">
              <div className="signup-title">
                <p className="create-acc mt-5">Create Account</p>
                <p className="acc-info">
                  There’s no account linked to the address, Please SingUp first.
                </p>
              </div>
              <div className="col-12 mt-5">
                <label className="label-common">Address:*</label>
                <input
                  className="input-common mt-2"
                  id="url"
                  type="text"
                  name="url"
                  placeholder={connectedAddress}
                  readOnly
                />
              </div>
              <div className="col-md-6 col-sm-12 mt-5">
                <label className="label-common ">
                  Enter your email address:*
                </label>
                <input
                  className="input-common mt-2"
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  required
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength="55"
                  autoComplete="off"
                />
              </div>
              <div className="col-md-6 col-sm-12 mt-5">
                <label className="label-common">Enter your username:*</label>
                <input
                  className="input-common mt-2"
                  type="text"
                  name="username"
                  maxLength="55"
                  placeholder="Enter your Username"
                  required
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div>
                <div className="checkbox-container">
                  {checkBox ? (
                    <div
                      className="custom-checked-box "
                      onClick={() => setCheckBox(!checkBox)}
                    >
                      <img src={TickIcon} alt="checked" />
                    </div>
                  ) : (
                    <div
                      className="custom-uncheck-box "
                      onClick={() => setCheckBox(!checkBox)}
                    ></div>
                  )}
                  <p className="mt-5 ms-4 ">
                    By checking this box,I agree to MintsClub{" "}
                    <Link>Terms of Services</Link>
                  </p>
                </div>
              </div>
            </div>

            <button
              disabled={
                !checkBox || email.trim() === "" || username.trim() === ""
              }
              type="submit"
              className="btn btn-linear-gradient sign-up-btn mt-5"
            >
              {loader ? (
                <div className="text-center">
                  <div className="spinner-border text-white sign-up-loader" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => (
  console.log(state, "state"),
  {
    wallet: state.wallet,
    collection: state.collection,
    user: state.user,
    userAuth: state.user.userAuth,
    error: state.error,
  }
);

export default connect(mapStateToProps, {
  signup,
})(SignUp);
