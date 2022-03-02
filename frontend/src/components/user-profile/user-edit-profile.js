import React from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import Breadcrumb from "../breadcrumb/breadcrumb";
import "./user-edit-profile.css";
import { editImages } from "../../assets/assets";
import { ReactComponent as ProfileEditSVG } from "../../assets/images/edit-pen.svg";

const EditProfile = () => {
  return (
    <>
      <NavbarMain />
      <Breadcrumb title1={"Profile"} title2={"EditProfile"} />
      <section className="edit-profile padding-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="intro">
                <div className="intro-content">
                  <span>Set Up Your Profile</span>
                  <h3 className="mb-0">Profile Setting</h3>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-10 col-md-8 col-lg-4 col-xl-3">
              <div className="edit-inp-subheading">
                <h6>Profile Image</h6>
              </div>
              <div className="edit-avatar pt-4">
                <img src={editImages.EditAvatar} alt="editavatar" />
                <button className="avatar-btn-pen">
                  <ProfileEditSVG />
                </button>
              </div>
              <div className="edit-banner-container">
                <div className="edit-inp-subheading">
                  <h6>Profile Banner</h6>
                </div>
                <div className="edit-banner pt-4">
                  <img src={editImages.EditBanner} alt="editavatar" />
                  <button className="banner-btn-pen">
                    <ProfileEditSVG />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-8 col-xl-9 pt-5 pt-lg-0">
              <div className="row g-4">
                <div className="col-md-4 col-lg-4">
                  <div className="edit-inp-subheading">
                    <h6>Username</h6>
                  </div>
                  <div className="edit-inp pt-4">
                    <input
                      name="username"
                      placeholder="User Name"
                      required="required"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <div className="edit-inp-subheading">
                    <h6>Email Address</h6>
                  </div>
                  <div className="edit-inp pt-4">
                    <input
                      name="email"
                      placeholder="Email Address"
                      required="required"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <div className="edit-inp-subheading">
                    <h6>Wallet Address</h6>
                  </div>
                  <div className="edit-inp pt-4">
                    <input
                      name="walletaddress"
                      placeholder="Wallet Address"
                      required="required"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-8">
                  <div className="edit-inp-subheading">
                    <h6>Bio</h6>
                  </div>
                  <div className="edit-inp pt-4">
                    <textarea name="bio" placeholder="Bio"></textarea>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-4">
                  <div className="edit-inp-subheading">
                    <h6>Links</h6>
                  </div>
                  <div className="edit-inp pt-4">
                    <div className="edit-link-inp d-flex align-items-center">
                      <img
                        className="ps-3"
                        src={editImages.Twitter}
                        alt="twitterlink"
                      />
                      <input
                        name="twitterlink"
                        placeholder="Twitter Link"
                        required="required"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div className="edit-inp pt-3">
                    <div className="edit-link-inp d-flex align-items-center">
                      <img
                        className="ps-3"
                        src={editImages.Insta}
                        alt="instalink"
                      />
                      <input
                        name="instagramlink"
                        placeholder="Instagram Link"
                        required="required"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div className="edit-inp pt-3">
                    <div className="edit-link-inp d-flex align-items-center">
                      <img
                        className="ps-3"
                        src={editImages.Website}
                        alt="websitelink"
                      />
                      <input
                        name="websitelink"
                        placeholder="Website Link"
                        required="required"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-4 mt-md-5 text-center">
              <div className="">
                <button className="btn btn-linear-gradient">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EditProfile;
