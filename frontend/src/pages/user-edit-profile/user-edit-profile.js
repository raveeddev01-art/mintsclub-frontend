import React, { useEffect, useState } from "react";
import "./user-edit-profile.css";
/////////
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import SimpleReactValidator from "simple-react-validator";
import {
  updateProfile,
  setIndividualUserData,
  getUserById,
  beforeUser,
} from "../../components/user/user.action";
import { emptyError } from "../../redux/shared/error/error.action";
import { ENV } from "./../../config/config";
import { Images } from "../../assets/assets";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Banner from "../../components/banner/banner";
import BannerBg from "../../assets/images/profileBg.png";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
import OwnCollectionToday from "../../components/own-collection-today/own-collection-today";
import Compressor from "compressorjs";
import axios from "axios";
const EditProfile = (props) => {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [banner, setBannerImage] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
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
      props.beforeUser();
      setLoader(false);

      setAddress(address ? address : "");
      setEmail(email ? email : "");
      setUserId(_id ? _id : "");
      setDescription(bio ? bio : "");
      setTwitterLink(twitterLink ? twitterLink : "");
      setUsername(username ? username : "");
      setImageUrl(profileImage ? profileImage : "");
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
      toast.success("Profile updated successfully");
      history.push("/userprofile");
    }
  }, [props.user.userAuth]);

  const onFileChange = (e) => {
    let file = e.target.files[0];
    let fileURL = "";
    let sizeBeforeCompress = formatBytes(file.size);
    if (file) {
      if (file.type.includes("image")) {
        fileURL = URL.createObjectURL(file);
      } else {
        file = {};
        fileURL = "";
        return toast.error("Invalid File");
      }
      setImageUrl(fileURL);
      // setImage(file);

      new Compressor(file, {
        quality: 0.2,
        success(result) {
          setImage(result);

          let sizeAfterCompress = formatBytes(result.size);
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const submit = async (e) => {
    e.preventDefault();
    setErrors("");
    setLoader(true);
    // let signature = await signRequest();
    setLoader(true);

    var formData = new FormData();
    formData.append("userId", ENV.getUserKeys("_id")._id);
    if (image) {
      let result = await uploadFileToIpfs(image);
      let url = `https://gateway.pinata.cloud/ipfs/${result.data.IpfsHash}`;
      formData.append("profileImage", url);
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
  const uploadFileToIpfs = async (file) => {
    var data = new FormData();
    data.append("file", file);
    try {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary= ${data._boundary}`,
          Authorization: `Bearer ${ENV.pinataJWT}`,
          // pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          // pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
        },
      });
      return response;
    } catch (err) {
      toast.error(err);
      this.setState({ loader: false });
    }
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

                <div className="col-lg-4 col-md-6 mt-3 mt-lg-0">
                  <label className="create-collection-label">
                    Wallet Address:
                  </label>

                  <input
                    className="create-collection-input mt-2"
                    id="url"
                    type="text"
                    name="url"
                    placeholder={address}
                    required
                    readOnly={true}
                    autoComplete="off"
                    // value={address}
                    disabled={true}
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

                <div className="col-lg-4 col-md-6 mt-3 mt-md-0 mt-3 mt-lg-5">
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

                <div className="col-lg-4 col-md-6 mt-3 mt-lg-0 mt-3 mt-lg-5 ">
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
