import React, { useEffect, useState } from "react";

import "./user-edit-profile.css";

/////////

import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import SimpleReactValidator from "simple-react-validator";
import {
  updateProfile,
  setIndividualUserData,
  getUserById,
  beforeUser,
} from "./../user/user.action";
import { emptyError } from "../../redux/shared/error/error.action";
import { ENV } from "./../../config/config";
import { Images } from "../../assets/assets";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/profileBg.png";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
import OwnCollectionToday from "../own-collection-today/own-collection-today";

const EditProfile = (props) => {
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
  const [twitterLink, setTwitterLink] = useState("");
  const [copy, setCopy] = useState(false);
  const [instaLink, setInstaLink] = useState("");
  const [webLink, setWebLink] = useState("");
  const [_id, setUserId] = useState("");
  const [bioError, setBioError] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [user, setUser] = useState(null);
  const [isAddressCopied, setAddressCopied] = useState(false);

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
    if (props.error !== null) {
      setLoader(false);
      toast.error(props.error.messasge);
      props.emptyError();
    }
  }, [props.error]);

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
      setUser(props.user.individualUser);
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
      setImage(profileImage ? profileImage : "");
      setBannerImage(bannerImage ? bannerImage : "");
      setInstaLink(instaLink ? instaLink : "");
      setWebLink(webLink ? webLink : "");
    }
  }, [props.user.individualUserAuth]);

  useEffect(() => {
    if (props.user.userAuth) {
      setLoader(false);
      props.beforeUser();
      toast.success("Profile Updated SuccessFully");
      history.push("/userprofile");
    }
  }, [props.user.userAuth]);

  const onFileChange = (e) => {
    let file = e.target.files[0];
    let fileURL = "";
    if (file) {
      if (file.type.includes("image")) {
        fileURL = URL.createObjectURL(file);
      } else {
        file = {};
        fileURL = "";
        return toast.error("Invalid File");
      }
      setImageUrl(fileURL);
      setImage(file);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (description && description.length < 3) {
      setBioError(true);
      return "";
    } else {
      setBioError(false);
    }
    setErrors("");
    setLoader(true);
    // let signature = await signRequest();
    setLoader(true);

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

    // return ''
    props.updateProfile(formData);
  };
  const bannerData = {
    subHeading: "Information",
    heading: "User Profile",
  };

  return (
    <>
      <section className="user-profile padding-wrapper pt-0">
        <Banner
          subHeading={bannerData.subHeading}
          heading={bannerData.heading}
          bgImg={BannerBg}
          className="mb-0"
        />
        {loader && <FullPageLoader />}
        <div className="collection-detail-content">
          <div className="container">
            <form onSubmit={submit}>
              <div className="row">
                <div className="col-12 mt-5">
                  <div className="logo-wrapper">
                    <div className="logo-image">
                      {image && image ? (
                        <img
                          className="uploaded-logo-img"
                          src={imageUrl ? imageUrl : Images.logoImage}
                        />
                      ) : (
                        <label>
                          <input
                            id="logo"
                            type="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => onFileChange(e)}
                            style={{ display: "none" }}
                            name="logo"
                          />
                          <span className="logo-img-round">
                            <img
                              className="upload-icon"
                              src={imageUrl ? imageUrl : Images.logoImage}
                            />
                          </span>
                        </label>
                      )}
                    </div>

                    <div className="upload-feature-icon-logo">
                      <label>
                        <input
                          id="logo"
                          type="file"
                          accept=".png,.jpeg,.jpg"
                          onChange={(e) => onFileChange(e)}
                          style={{ display: "none" }}
                          name="logo"
                        />
                        <img src={Images.editIconSmall} />
                      </label>
                    </div>
                    <p className="feature-img-title mt-3 mx-2">
                      Profile Image*
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="create-collection-label">Username:*</label>
                  <input
                    className="create-collection-input mt-2"
                    id="name"
                    type="text"
                    name="name"
                    required
                    onChange={(e) => {
                      if (e.target.value.trim() === "" && username === "") {
                        return false;
                      } else {
                        setUsername(e.target.value);
                      }
                    }}
                    value={username}
                    placeholder="Username"
                    maxLength="55"
                    minLength="3"
                    autoComplete="off"
                  />
                </div>

                <div className="col-lg-4 col-md-6 mt-3 mt-md-0">
                  <label className="create-collection-label">
                    Email Address:*
                  </label>

                  <input
                    className="create-collection-input mt-2"
                    id="url"
                    type="text"
                    name="url"
                    placeholder="Email Address"
                    required
                    onChange={(e) => {
                      if (e.target.value.trim() === "" && email === "") {
                        return "";
                      } else {
                        setEmail(e.target.value);
                      }
                    }}
                    value={email}
                    maxLength="55"
                    autoComplete="off"
                  />
                </div>

                <div className="col-lg-4 col-md-6  mt-3 mt-lg-0">
                  <label className="create-collection-label">
                    Wallet Address:
                  </label>

                  <input
                    className="create-collection-input mt-2"
                    id="url"
                    type="text"
                    name="url"
                    placeholder="URL"
                    required
                    readOnly={true}
                    autoComplete="off"
                    value={address}
                  />
                </div>

                <div className="col-12 mt-3 mt-lg-5">
                  <label className="create-collection-label">BioData:</label>

                  <textarea
                    className="create-collection-area mt-2"
                    name="description"
                    placeholder="Enter BioData"
                    maxLength="500"
                    minLength="3"
                    onChange={(e) => {
                      if (e.target.value.trim() === "" && description === "") {
                        return false;
                      } else {
                        setDescription(e.target.value);
                      }
                    }}
                    value={description}
                  ></textarea>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12 mt-3 mt-lg-5">
                  <label className="create-collection-label">
                    Twitter Link:
                  </label>
                  <input
                    className="create-collection-input mt-2"
                    id="name"
                    type="text"
                    name="name"
                    onChange={(e) => {
                      if (e.target.value.trim() === "" && twitterLink === "") {
                        return false;
                      } else {
                        setTwitterLink(e.target.value);
                      }
                    }}
                    value={twitterLink}
                    placeholder="Twitter Link"
                    maxLength="55"
                    autoComplete="off"
                  />
                </div>

                <div className="col-lg-4 col-md-6 mt-3 mt-md-0  mt-3 mt-lg-5">
                  <label className="create-collection-label">
                    Instagram Link:
                  </label>

                  <input
                    className="create-collection-input mt-2"
                    id="url"
                    type="text"
                    name="url"
                    placeholder="Instagram Link"
                    onChange={(e) => {
                      if (e.target.value.trim() === "" && instaLink === "") {
                        return false;
                      } else {
                        setInstaLink(e.target.value);
                      }
                    }}
                    value={instaLink}
                    maxLength="55"
                    autoComplete="off"
                  />
                </div>

                <div className="col-lg-4 col-md-6  mt-3 mt-lg-0  mt-3 mt-lg-5 ">
                  <label className="create-collection-label">
                    Website Link:
                  </label>
                  <input
                    className="create-collection-input mt-2"
                    id="url"
                    type="text"
                    name="url"
                    placeholder="Website Link"
                    onChange={(e) => {
                      if (e.target.value.trim() === "" && webLink === "") {
                        return false;
                      } else {
                        setWebLink(e.target.value);
                      }
                    }}
                    value={webLink}
                    maxLength="55"
                    autoComplete="off"
                  />
                </div>
                <div className="create-collection-btn-container">
                  <button
                    className="btn create-collection-btn btn-linear-gradient mt-5"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <OwnCollectionToday />
      {/* {loader && <FullPageLoader />}
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
                        type="text"
                        placeholder="User Name"
                        maxLength="50"
                        required="required"
                        autocomplete="off"
                        onChange={(e) => {
                          if (e.target.value.trim() === "" && username === "") {
                            return false;
                          } else {
                            console.log("else");
                            setUsername(e.target.value);
                          }
                        }}
                        required={true}
                        value={username}
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
                        type="email"
                        placeholder="Email Address"
                        required="required"
                        autocomplete="off"
                        onChange={(e) => {
                          if (e.target.value.trim() === "" && email === "") {
                            return "";
                          } else {
                            setEmail(e.target.value);
                          }
                        }}
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
                      {bioError && (
                        <p className="text-danger ">Minimum 3 words required</p>
                      )}
                      <textarea
                        name="bio"
                        placeholder="Bio"
                        maxLength="500"
                        onChange={(e) => {
                          if (
                            e.target.value.trim() === "" &&
                            description === ""
                          ) {
                            return false;
                          } else {
                            console.log("else");
                            setDescription(e.target.value);
                          }
                        }}
                        value={description}
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
                          type="url"
                          onChange={(e) => {
                            if (
                              e.target.value.trim() === "" &&
                              twitterLink === ""
                            ) {
                              return false;
                            } else {
                              console.log("else");
                              setTwitterLink(e.target.value);
                            }
                          }}
                          value={twitterLink}
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
                          onChange={(e) => {
                            if (
                              e.target.value.trim() === "" &&
                              instaLink === ""
                            ) {
                              return false;
                            } else {
                              setInstaLink(e.target.value);
                            }
                          }}
                          value={instaLink}
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
                          onChange={(e) => {
                            if (
                              e.target.value.trim() === "" &&
                              webLink === ""
                            ) {
                              return false;
                            } else {
                              setWebLink(e.target.value);
                            }
                          }}
                          value={webLink}
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
      <Footer /> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps, {
  updateProfile,
  setIndividualUserData,
  beforeUser,
  getUserById,
  emptyError,
})(EditProfile);
