import React, { Component } from "react";
import "./signup.css";

const initData = {
  pre_heading: "Signup",
  heading: "Create an Account",
  content: "",
};

const socialData = [
  {
    id: "1",
    link: "facebook",
    icon: "fab fa-facebook-f",
  },
  {
    id: "2",
    link: "twitter",
    icon: "fab fa-twitter",
  },
  {
    id: "3",
    link: "google-plus",
    icon: "fab fa-google-plus-g",
  },
];

class Signup extends Component {
  state = {
    initData: {},
    data: [],
  };
  componentDidMount() {
    this.setState({
      initData: initData,
      data: socialData,
    });
  }
  render() {
    return (
      <section className="author-area sign-up-section d-flex flex-column align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{this.state.initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                <p>{this.state.initData.content}</p>
              </div>
              {/* Item Form */}
              <form className="item-form card no-hover">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter Name"
                        required="required"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter Email"
                        required="required"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button
                      className="btn btn-linear-gradient btn-signup"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="col-12 account-span">
                    <hr />
                    <span className="d-block text-center mt-4">
                      Already have an account? <a href="/login">Login</a>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Signup;
