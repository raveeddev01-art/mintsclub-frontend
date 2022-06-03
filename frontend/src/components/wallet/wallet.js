import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import validator from "validator";
import { connect } from "react-redux";
import { connectMetamaskCopy, signRequest } from "../../utils/web3";
import { beforeWallet, setWalletAddress } from "../wallet/wallet.action";
import { toast } from "react-toastify";
import {
  getCollections,
  beforeCategory,
  beforeCollection,
} from "../collections/collections.actions";
import { ENV } from "../../config/config";
import { login, signup } from "../user/user.action";
import { Images } from "../../assets/assets";
import "./wallet.css";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/hero-bg.png";

const Wallet = (props) => {
  const history = useHistory();
  const [connectedAddress, setConnectedAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignUpComponent, setShowSignUpComponent] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const connectMetamaskCall = async () => {
    setDisabled(true);
    let connectedAddress = await connectMetamaskCopy();
    if (connectedAddress) {
      setDisabled(false);
    }
    setConnectedAddress(connectedAddress);
    setWalletAddress(connectedAddress);
  };

  useEffect(() => {
    props.beforeCategory();
    if (props.error) {
      console.log("errors", props.error);

      setErrorMessage(props.error.message);
      if (props.error.notExist) {
        setDisabled(false);
        setShowSignUp(true);
      } else {
        setShowSignUp(false);
      }
    }
  }, [props.error]);

  useEffect(() => {
    if (props.collection.getAuth === true) {
      let collections = props.collection.collections;

      const userId = ENV.getUserKeys("_id")._id;

      // let myCollections = collections.filter((el) => el.userId === userId);

      // if (myCollections && myCollections.length > 0) {
      props.beforeCollection();
      //   history.push("/");
      // } else {
      // }
      toast.success("User Logged In Successfully");
      history.push("/");
    }
  }, [props.collection.getAuth]);

  const signup = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      if (validator.isEmail(email)) {
        let sign = await signRequest();
        let payload = {
          address: connectedAddress,
          // password: sign,
          email: email,
          username: username,
          isApproved: false,
        };
        // console.log(payload, "payload");
        props.signup(payload);
      } else {
        setErrorMessage("please enter valid email");
      }
    } catch (err) {
      toast.error(err.message);
      setDisabled(false);
    }
  };

  const login = async () => {
    try {
      setDisabled(true);
      setLoader(true);
      let sign = await signRequest();
      let payload = {
        address: connectedAddress,
      };
      props.login(payload);
    } catch (err) {
      setDisabled(false);
      setLoader(false);
      toast.error(err.message);
    }
  };

  const switchSignup = () => {
    setShowSignUpComponent(true);
  };

  // if (props.user.userAuth) {
  //     console.log("@@@@Collection-----@", collections);
  //     if(collections && collections.length>){
  //         console.log("In Upper")
  //         return <Redirect to="/create" />
  //     }
  //     else {
  //         console.log("In Down");
  //         return <Redirect to="/collection/create" />
  //     }
  // }

  const signInbannerData = {
    subHeading: "Login",
    heading: "Login Information",
    content:
      "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
  };

  const signUpbannerData = {
    subHeading: "Sign Up",
    heading: "Sign Up Information",
    content:
      "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
  };

  return (
    <section
      className={
        !showSignUpComponent
          ? `wallet-connect-area wallet-wrapper`
          : `author-area wallet-wrapper`
      }
    >
      <div>
        {connectedAddress && !showSignUpComponent ? (
          <>
            <div className="log-in-banner">
              <Banner
                subHeading={signInbannerData.subHeading}
                heading={signInbannerData.heading}
                content={signInbannerData.content}
                bgImg={BannerBg}
              />
            </div>
            <div className="padding-wrapper">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-8 col-lg-7">
                    {/* Intro */}
                    <div className="intro wallet-intro  text-center">
                      <span>Sign In</span>
                      <h3 className="mt-3 mb-0">SignIn to your account</h3>
                      <p className="mt-3">
                        Please Click to Sing In your Account.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center items mb-5">
                  <div className="col-12 col-sm-9 col-md-7 col-lg-5 col-xl-5 item">
                    <div className="sign-in-card">
                      <span
                        className="sign-content-wrapper text-center"
                        href="/login"
                      >
                        <h4 className="mb-0">Address</h4>
                        <p className="mt-4">{connectedAddress}</p>
                        {errorMessage && (
                          <p className="text-danger">{errorMessage}</p>
                        )}
                        {!showSignUp && (
                          <>
                            <button
                              className="btn btn-linear-gradient btn-signin mt-3 mt-sm-4"
                              type="button"
                              disabled={disabled || loader}
                              onClick={() => login()}
                            >
                              {loader ? (
                                <div className="text-center">
                                  <div
                                    className="spinner-border text-white"
                                    role="status"
                                  >
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </div>
                              ) : (
                                "Sign In"
                              )}
                            </button>
                          </>
                        )}

                        {showSignUp && (
                          <button
                            className="btn btn-linear-gradient btn-signin w-75 mx-auto mt-3 mt-sm-4 text-white"
                            type="button"
                            onClick={() => switchSignup()}
                          >
                            Would you like to Signup?
                          </button>
                        )}
                      </span>
                    </div>
                    <button
                      className="change-wallet-btn mt-5 d-flex mx-auto"
                      onClick={() => setConnectedAddress(null)}
                    >
                      Change Wallet Address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : showSignUpComponent ? (
          <>
            <div className="log-in-banner">
              <Banner
                subHeading={signInbannerData.subHeading}
                heading={signInbannerData.heading}
                content={signInbannerData.content}
                bgImg={BannerBg}
              />
            </div>

            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-7">
                  {/* Intro */}
                  <div className="intro text-center">
                    <span>SIGNUP</span>
                    <h3 className="mt-3 mb-0">Create an Account</h3>
                    <p className="text-gray">
                      Create the account with the address
                    </p>
                  </div>
                  {/* Item Form */}
                  <form
                    className="item-form card no-hover signup-card"
                    onSubmit={(e) => signup(e)}
                  >
                    <div className="row">
                      {errorMessage && (
                        <p className="text-center text-gray">{errorMessage}</p>
                      )}
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <input
                            type="text"
                            className="form-control sign-up-input"
                            name="address"
                            placeholder="Address"
                            required="required"
                            disabled={true}
                            value={connectedAddress}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <input
                            type="email"
                            className="form-control sign-up-input"
                            name="email"
                            placeholder="Enter your Email"
                            required="required"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <input
                            type="text"
                            className="form-control sign-up-input"
                            name="username"
                            placeholder="Enter your Username"
                            required="required"
                            defaultValue={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mt-3 text-center">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              defaultValue="option1"
                              autoComplete="off"
                            />
                            <label
                              className="form-check-label text-center text-gray"
                              htmlFor="inlineRadio1"
                            >
                              I agree to{" "}
                              <a href="/privacy-and-terms">Privacy Policy</a>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="text-center">
                          <button
                            className="btn btn-linear-gradient btn-signin mt-3 mt-sm-4  text-white "
                            type="submit"
                            disabled={disabled}
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="log-in-banner">
              <Banner
                subHeading={signInbannerData.subHeading}
                heading={signInbannerData.heading}
                content={signInbannerData.content}
                bgImg={BannerBg}
              />
            </div>
            <div className="padding-wrapper">
              <div className="container mb-5">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-8 col-lg-7">
                    <div className="intro wallet-intro text-center">
                      <span>Wallet Connect</span>
                      <h3 className="mt-3 mb-0">Connect your Wallet</h3>
                      <p className=" mt-3">
                        Please select the wallet you want to connect to.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="connect-metamask-container text-center mx-auto"
                  onClick={() => connectMetamaskCall()}
                >
                  <img
                    className="avatar-lg mt-4"
                    src={Images.metamaskImg}
                    alt=""
                  />
                  <p className="metamask-title mt-2">Metamask</p>
                  <p className="metamask-desc px-sm-0 px-3">
                    A browser extension with great flexibility.
                    <br className="d-none d-sm-block" /> The web's most popular
                    wallet
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  collection: state.collection,
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps, {
  beforeWallet,
  setWalletAddress,
  login,
  signup,
  beforeCategory,
  beforeCollection,
})(Wallet);
