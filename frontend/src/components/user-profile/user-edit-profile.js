import React, { useEffect, useState } from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import Breadcrumb from "../breadcrumb/breadcrumb";
import "./user-edit-profile.css";
import { editImages } from "../../assets/assets";
import { ReactComponent as ProfileEditSVG } from "../../assets/images/edit-pen.svg";
/////////

import { connect } from "react-redux";
import AuthorProfile from "../author-profile/author-profile";
import { SET_INDIVIDUAL_USER } from "../../redux/types";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import SimpleReactValidator from "simple-react-validator";
import {
  updateProfile,
  setIndividualUserData,
  getUserById,
  beforeUser,

} from "./../user/user.action";
import { signRequest } from "./../../utils/web3";
import { ENV } from "./../../config/config";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import FullPageLoader from "../full-page-loader/full-page-loader";

const EditProfile = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState("");
  const [connectedAddress, setConnectedAddress] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [banner, setBannerImage] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [facebookLink, setFbLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [gPlusLink, setgPlusLink] = useState("");
  const [vineLink, setVineLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [webLink, setWebLink] = useState("");
  const [_id, setUserId] = useState("");
  const history = useHistory();
  let validator = new SimpleReactValidator({
    autoForceUpdate: this,
    messages: {
      required: "This field is required.", // will override all messages
    },
  });
  useEffect(() => {
    let user = ENV.getUserKeys("");
  
    props.getUserById(ENV.getUserKeys("_id")._id);
  }, []);

  useEffect(() => {
    if (props.user.individualUserAuth) {

      const {
        address,
        email,
        bio,
        twitterLink,
        username,
        profileImage,
        bannerImage,
        instaLink,
        webLink,
      } = props.user.individualUser;
      props.beforeUser();
      setLoader(false);

      setConnectedAddress(address ? address : "");
      setAddress(address ? address : "");
      setEmail(email ? email : "");
      setUserId(_id ? _id : "");
      setDescription(bio ? bio : "");
      setTwitterLink(twitterLink ? twitterLink : "");
      setUsername(username ? username : "");
      setImageUrl(profileImage ? profileImage : "");
      setBannerUrl(bannerImage ? bannerImage : "");
      setImage(profileImage?profileImage:'');
      setBannerImage(bannerImage?bannerImage:"");
      setInstaLink(instaLink ? instaLink : "");
      setWebLink(webLink ? webLink : "");
    }
  }, [props.user.individualUserAuth]);

  useEffect(() => {
    if (props.user.userAuth) {
  
      setLoader(false);
      props.beforeUser()
      history.push("/userprofile");
    }
  }, [props.user.userAuth]);

  useEffect(() => {
    if (props.error) {
      setErrors(props.error.message);
      goToTop();
    }
  }, [props.error]);

  const goToTop = () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      600
    );
  };

  const onFileChange = (e) => {
    let file = e.target.files[0];
    let fileURL = "";
    if (file) {
      if (file.type.includes("image")) {
        fileURL = URL.createObjectURL(file);
      } else {
        file = {};
        fileURL = "";
      }
      setImageUrl(fileURL);
      setImage(file);
    }
  };

  const onBannerChange = (e) => {
    let file = e.target.files[0];
    let fileURL = "";
    if (file) {
      if (file.type.includes("image")) {
        fileURL = URL.createObjectURL(file);
      } else {
        file = {};
        fileURL = "";
      }
      setBannerUrl(fileURL);
      setBannerImage(file);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    let obj = {
      image,
      banner,
      username,
      instaLink,
      webLink,
      description,
      email,
      address,
      instaLink,
      twitterLink,
    };

    setErrors("");
    setLoader(true);
    setIsSubmitted(true);
    let isFormValid = validator.allValid() ? true : false;
    if (isFormValid) {
      try {
        // let signature = await signRequest();
        setLoader(true);
        console.log(ENV.getUserKeys("_id")._id, "id");
        var formData = new FormData();
        formData.append("userId", ENV.getUserKeys("_id")._id);
        if (image) {
          formData.append("profileImage", image);
        }
        if (banner) {
          formData.append("bannerImage", banner);
        }
        formData.append("bio", description);
        formData.append("twitterLink", twitterLink);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("webLink", webLink);
        formData.append("instaLink", instaLink);
        console.log("sending request");
        // return ''
        props.updateProfile(formData);
      } catch (e) {}
    } else {
      validator.showMessages();
      setErrors("Please fill all required fields in valid format.");
      goToTop();
    }
  };

  return (
    <>
      {loader && <FullPageLoader />}
      <NavbarMain />
      <Breadcrumb title1={"Profile"} title2={"EditProfile"} />
      <section className="edit-profile padding-wrapper">
        <form onSubmit={submit}>
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
                  <img
                    src={imageUrl ? imageUrl : editImages.EditAvatar}
                    alt="editavatar"
                  />

                  <label>
                    <div className="avatar-btn-pen">
                      <ProfileEditSVG />
                    </div>
                    <input
                      type="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => onFileChange(e)}
                      style={{ display: "none" }}
                      name="image"
                    />
                  </label>
                </div>
                <div className="edit-banner-container">
                  <div className="edit-inp-subheading">
                    <h6>Profile Banner</h6>
                  </div>
                  <div className="edit-banner pt-4">
                    <img
                      src={bannerUrl ? bannerUrl : editImages.EditBanner}
                      alt="editavatar"
                    />
                    <label>
                      <div className="banner-btn-pen">
                        <ProfileEditSVG />
                      </div>
                      <input
                        type="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => onBannerChange(e)}
                        style={{ display: "none" }}
                        name="banner"
                      />
                    </label>
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
                        onChange={(e) => setUsername(e.target.value)}
                        defaultValue={username}
                      />
                      <span className="text-danger">
                        {validator.message("username", username, "required")}
                      </span>
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
                        readOnly
                        value={email}
                      />
                      <span className="text-danger">
                        {validator.message("email", email, "required")}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <div className="edit-inp-subheading">
                      <h6>Wallet Address</h6>
                    </div>
                    <div className="edit-inp pt-4">
                      <input
                        name="address"
                        placeholder="Wallet Address"
                        required="required"
                        autocomplete="off"
                        value={address}
                      />
                      <span className="text-danger">
                        {validator.message("address", address, "required")}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-8">
                    <div className="edit-inp-subheading">
                      <h6>Bio</h6>
                    </div>
                    <div className="edit-inp pt-4">
                      <textarea
                        name="bio"
                        placeholder="Bio"
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue={description}
                      ></textarea>
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
                          autocomplete="off"
                          ype="url"
                          onChange={(e) => setTwitterLink(e.target.value)}
                          defaultValue={twitterLink}
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
                          type="url"
                          autocomplete="off"
                          onChange={(e) => setInstaLink(e.target.value)}
                          defaultValue={instaLink}
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
                          ype="url"
                          autocomplete="off"
                          onChange={(e) => setWebLink(e.target.value)}
                          defaultValue={webLink}
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
        </form>
      </section>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => (
  {
    wallet: state.wallet,
    user: state.user,
    error: state.error,
  }
);

export default connect(mapStateToProps, {
  updateProfile,
  setIndividualUserData,
  beforeUser,
  getUserById,
})(EditProfile);
