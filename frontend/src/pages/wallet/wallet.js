import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";
import { connect } from "react-redux";
import {
  signRequest,
  connectWithMetamask,
  getChainId,
  switchNetworkToChainId,
} from "../../utils/web3";
import { beforeWallet, setWalletAddress } from "./wallet.action";
import { toast } from "react-toastify";
import {
  beforeCategory,
  beforeCollection,
} from "../collections/collections.actions";
import { login, signup } from "../../Components/User/user.action";
// import {setWalletAddress} from "../../redux/shared/shared/shared.action"
import { Images } from "../../assets/assets";
import "./wallet.css";
import Banner from "../../Components/Banner/Banner";
import BannerBg from "../../assets/images/hero-bg.png";
import { getWalletAddress, validateNetwork } from "../../utils/web3";
import { ENV } from "../../config/config";
const Wallet = (props) => {
  const history = useHistory();
  let walletAddress = false;
  const [connectedAddress, setConnectedAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignUpComponent, setShowSignUpComponent] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(async () => {
    let address = await getWalletAddress();
    if (address) {
      setConnectedAddress(address);
    }
    window.ethereum.on("disconnect", () => setConnectedAddress(null));
  }, []);

  const connectMetamaskCall = async () => {
    if (detectMobile() && !window.ethereum) {
      window.open(
        "https://metamask.app.link/dapp/mintsclub-v2-marketplace.invo.zone/"
      );
    } else {
      // if (await validateNetwork()) {
      if (getChainId !== ENV.chainId) {
        try {
          await switchNetworkToChainId(ENV.chainId);
        } catch (error) {
          return toast.error(error.message);
        }
      }
      let connectedAddress = false;
      setDisabled(true);
      if (detectMobile()) {
        connectedAddress = await getWalletAddress();
      } else {
        connectedAddress = await connectWithMetamask();
      }
      if (connectedAddress) {
        setDisabled(false);
      }
      setConnectedAddress(connectedAddress);
      // } else {
      //   toast.error(
      //     "Please Connect Your Metamask With Ethereum Rinkby Network"
      //   );
      // }
    }
  };
  const detectMobile = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    props.beforeCategory();
    if (props.error) {
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
    if (props.collection.getAuth&&ENV.getUserKeys("_id")?._id) {
      props.beforeCollection();
      toast.success("User logged in successfully");
      history.push("/");
    }
  }, [props.collection.getAuth]);

  const signup = async (e) => {
    e.preventDefault();
    if (getChainId !== ENV.chainId) {
      try {
        let newAcc = await switchNetworkToChainId(ENV.chainId);
        props.setWalletAddress(newAcc);
        setConnectedAddress(newAcc);
      } catch (error) {
        return toast.error(error.message);
      }
    }
    setDisabled(true);
    try {
      if (validator.isEmail(email)) {
        await signRequest();
        let payload = {
          address: connectedAddress,
          email: email,
          username: username,
          isApproved: false,
        };
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
    if (getChainId !== ENV.chainId) {
      try {
        let newAcc = await switchNetworkToChainId(ENV.chainId);
        props.setWalletAddress(newAcc);
        setConnectedAddress(newAcc);
      } catch (error) {
     
      }
    }
    try {
      setDisabled(true);
      setLoader(true);
      await signRequest();
      let payload = {
        address: connectedAddress,
      };
      props.setWalletAddress(connectedAddress)

      props.login(payload);
    } catch (err) {
      setDisabled(false);
      setLoader(false);
      toast.error(err.message);
    }
    // } else {
    //   toast.error("Please Connect Your Metamask With Ethereum Rinkby Network");
    // }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleMetamaskStatus();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleMetamaskStatus = async () => {
    const address = await getWalletAddress();

    if (walletAddress) {
      if (walletAddress !== address) {
        walletAddress = address;
        setShowSignUpComponent(false);
        setShowSignUp(false);
        setErrorMessage(false);
        setConnectedAddress(address);
      }
    } else {
      const address = await getWalletAddress();
      walletAddress = address;
    }
  };

  const signInbannerData = {
    subHeading: "Login",
    heading: "Login Information",
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
                      <span>Sign in</span>
                      <h3 className="mt-3 mb-0">Sign in to your account</h3>
                      <p className="mt-3">
                        Please Click to Sign in your Account.
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
                                    className="spinner-border sign-in-spinner text-white"
                                    role="status"
                                  >
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </div>
                              ) : (
                                "Sign in"
                              )}
                            </button>
                          </>
                        )}

                        {showSignUp && (
                          <button
                            className="btn btn-linear-gradient btn-signin w-75 mx-auto mt-3 mt-sm-4 text-white"
                            type="button"
                            onClick={() => history.push("/signup")}
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

                    <span className="new-member mt-5 d-flex justify-content-center">
                      New Member?
                      {!detectMobile() ? (
                        <a className="register-member mx-1" href={"/signup"}>
                          {" "}
                          Register
                        </a>
                      ) : (
                        <a
                          className="register-member mx-1"
                          onClick={() =>
                            window.open(
                              "https://metamask.app.link/dapp/mintsclub-v2-marketplace.invo.zone/signup"
                            )
                          }
                        >
                          {" "}
                          Register
                        </a>
                      )}
                      here.
                    </span>
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
                      {/* <p className=" mt-3">
                        Please select the wallet you want to connect to.
                      </p> */}
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

                <span className="new-member d-flex  justify-content-center mt-5">
                  Don't have Metamask ? Click
                  <span
                    className="register-member mx-1"
                    onClick={() => window.open("https://metamask.io/download/")}
                  >
                    {" "}
                    Here{" "}
                  </span>
                  to Install.
                </span>
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
