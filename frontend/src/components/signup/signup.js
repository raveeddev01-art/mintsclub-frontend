import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/hero-bg.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { connectMetamaskCopy, signRequest } from "../../utils/web3";
import { toast } from "react-toastify";
import { signup } from "../user/user.action";
import "./signup.css";

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
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    if (props.error?.message) {
      toast.error(props.error.message);
      setLoader(false);
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
                <div className="checkbox-container d-flex align-items-center mt-5">
                  {checkBox ? (
                    <span
                      className="custom-checked-box me-2"
                      onClick={() => setCheckBox(!checkBox)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="10"
                      >
                        <path
                          fill-rule="evenodd"
                          fill="#FFF"
                          d="M11.356.624c.034.009-.617.141-.838.368-1.93 1.93-3.692 3.823-5.546 5.712L2.794 4.961h-.001a1.223 1.223 0 0 0-.897-.26c-.321.036-.616.198-.116.45-.904.252-.997.574-.962 1.309.036-.093.342.201.451.403l3.049 2.434a1.218 1.218 0 0 0 1.626-.095C8.138 7.8 10.103 4.854 12.246 2.71A1.22 1.22 0 0 0 12.24.967c.16-.229-.555-.352-.884-.343z"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className="custom-uncheck-box me-2"
                      onClick={() => setCheckBox(!checkBox)}
                    ></span>
                  )}
                  <p>
                    By checking this box, I agree to MintsClub{" "}
                    <Link to="/termsandconditions" target="_blank">{"Terms & Conditions" }</Link>
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
                  <div
                    className="spinner-border text-white sign-up-loader"
                    role="status"
                  >
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
