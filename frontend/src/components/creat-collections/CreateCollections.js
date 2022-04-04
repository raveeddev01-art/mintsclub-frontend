import React, { Component } from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import Breadcrumb from "../breadcrumb/breadcrumb";
import "./CreateCollections.css";
import { editImages } from "../../assets/assets";
import { ReactComponent as ProfileEditSVG } from "../../assets/images/edit-pen.svg";
import CollectionUploadIcon from "../../assets/images/collection-upload-icon.svg";
import { connect } from "react-redux";
import {
  beforeCollection,
  upsertCollection,
} from "../collections/collections.actions";
import { beforeCategory, getCategories } from "../categories/categories.action";
import { emptyError } from "../../redux/shared/error/error.action";
import SimpleReactValidator from "simple-react-validator";
import { ENV } from "../../config/config";
import $ from "jquery";
import { toast } from "react-toastify";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
import UploadIcon from "../../assets/images/uploadIcon.png";
import { MdClose } from "react-icons/md";

class CreateCollections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      formValid: true,
      loader: true,
      errors: "",
      collection: {
        userId: ENV.getUserKeys("_id")._id,
        categoryId: "",
        logo: "",
        featuredImg: "",
        banner: "",
        name: "",
        url: "",
        logoUrl: "",
        bannerUrl: "",
        featuredImgUrl: "",
        description: "",
      },
      categories: null,
    };
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      messages: {
        required: "This field is required.", // will override all messages
      },
    });
  }

  componentDidMount() {
    window.scroll(0, 0);
    this.props.getCategories();
    // this.props.getUser()
  }

  componentDidUpdate() {
    if (this.props.error) {
      this.setState({ loader: false }, () => {
        this.props.emptyError();
      });
    }

    if (this.props.collection.upsertAuth) {
      this.props.beforeCollection();
      this.props.history.push("/explore/exploreAll");
    }
    if (this.props.category.getAuth) {
      const { categories } = this.props.category;
      this.setState({ categories, loader: false }, () => {
        this.props.beforeCategory();
      });
    }
  }

  onFileChange(e) {
    let file = e.target.files[0];
    if (file)
      if (file.type.includes("image")) {
        let { collection } = this.state;
        collection = { ...collection, [e.target.name]: file };
        if (e.target.name) {
          collection[`${e.target.name}Url`] = URL.createObjectURL(
            e.target.files[0]
          );
          $(`#collection-${e.target.name}-label`).html("File selected");
        }
        this.setState({ collection });
      }
  }

  onChange(e) {
    let { name, value } = e.target;
    const userId = ENV.getUserKeys("_id")._id;
    let { collection } = this.state;
    collection = { ...collection, [name]: value, userId: userId };
    console.log(collection, "collection input");
    this.setState({ collection });
  }

  reset = () => {
    const collection = {
      userId: "",
      categoryId: "",
      logo: "",
      featuredImg: "",
      banner: "",
      name: "",
      url: "",
      description: "",
    };
    this.setState({ collection, isSubmitted: false });
  };

  submit = (e) => {
    e.preventDefault();
    const userId = ENV.getUserKeys("_id")._id;
    this.setState(
      {
        isSubmitted: true,
        formValid: this.validator.allValid() ? true : false,
      },
      () => {
        const { formValid } = this.state;
        if (formValid) {
          this.setState(
            {
              loader: true,
            },
            async () => {
              const { collection } = this.state;

              var formData = new FormData();
              for (var val in collection) {
                if (collection[val]) {
                  formData.append(val, collection[val]);
                }
              }

              this.props.upsertCollection("collection/create", formData);
            }
          );
        } else {
          this.validator.showMessages();
          this.setState(
            {
              errors: "Please fill all required fields in valid format.",
              formValid: false,
            },
            () => {
              $("#create-collection").scrollTop(0, 0);
            }
          );
        }
      }
    );
  };

  clearData = () => {
    let { collection } = this.state;
    collection = { ...collection, featuredImg: "", featuredImgUrl: "" };
    this.setState({ collection });
  };

  render() {
    const { collection, errors, loader, isSubmitted, categories } = this.state;
    if (!ENV.getUserKeys("_id")._id) {
      toast.error("Please login to create Collection");
      this.props.history.push("/");
      return " ";
    } else {
      return (
        <>
          <NavbarMain />
          <Breadcrumb title1={"Collections"} title2={"CreateCollections"} />
          <section className="edit-profile padding-wrapper create-collection-container">
            {loader && <FullPageLoader />}
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="intro">
                    <div className="intro-content">
                      <span>Create Now</span>
                      <h3 className="mb-0">Create New Collection</h3>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-10 col-md-8 col-lg-4 col-xl-3">
                  <div className="edit-inp-subheading">
                    <h6>Logo Image</h6>
                    <span className="text-danger">
                      {this.validator.message(
                        "logo",
                        collection.logo,
                        "required"
                      )}
                    </span>
                  </div>
                  <div className="collection-logo-container pt-2">
                    {collection && collection.logo ? (
                      <img
                        src={collection.logoUrl}
                        className="colection-avatar-img"
                      />
                    ) : (
                      <div className="colection-avatar"></div>
                    )}
                    <label>
                      <div className="avatar-btn-pen">
                        <ProfileEditSVG />
                      </div>
                      <input
                        id="logo"
                        type="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => this.onFileChange(e)}
                        style={{ display: "none" }}
                        name="logo"
                      />
                    </label>
                  </div>
                  <div className="">
                    <div className="edit-inp-subheading">
                      <h6>Featured Image</h6>
                      <span className="text-danger">
                        {this.validator.message(
                          "logo",
                          collection.featuredImg,
                          "required"
                        )}
                      </span>
                    </div>
                    <div className="upload-featured-container">
                      {collection && collection.featuredImg ? (
                        <div className="uploaded-featured-container">
                          <img
                            src={collection.featuredImgUrl}
                            className="uploaded-featured-img"
                          />
                          <div className="uploaded-featured-hover w-100">
                            <div className="uploaded-featured-cross">
                              <MdClose
                                color="#e33d0bc2"
                                className="uploaded-cross-icon"
                                onClick={() => this.clearData()}
                              />
                            </div>
                            <label>
                              <div className="text-center">
                                <img src={UploadIcon} alt="upload-icon" />
                              </div>
                              <input
                                id="featuredImg"
                                type="file"
                                accept=".png,.jpeg,.jpg"
                                style={{ display: "none" }}
                                name="featuredImg"
                                onChange={(e) => this.onFileChange(e)}
                              />
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="upload-featured-img">
                          <label>
                            <div className="text-center">
                              <img
                                src={CollectionUploadIcon}
                                alt="upload-icon"
                              />
                            </div>
                            <div className="upload-featured-img-content pt-2">
                              <h6 className="pb-1">Browse Files</h6>
                              <p>PNG, GIF, WEBP, MP4 or MP3 Max 100mb.</p>
                            </div>
                            <input
                              id="featuredImg"
                              type="file"
                              accept=".png,.jpeg,.jpg"
                              style={{ display: "none" }}
                              name="featuredImg"
                              onChange={(e) => this.onFileChange(e)}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-8 col-xl-9 pt-5 pt-lg-0">
                  <div className="row g-4">
                    <div className="col-md-4 col-lg-4">
                      <div className="edit-inp-subheading position-relative">
                        <h6>Name</h6>
                        <span className="text-danger position-absolute top-0">
                          {this.validator.message(
                            "name",
                            collection.name,
                            "required"
                          )}
                        </span>
                      </div>
                      <div className="edit-inp pt-4">
                        <input
                          id="name"
                          type="text"
                          name="name"
                          onChange={(e) => this.onChange(e)}
                          value={collection.name}
                          placeholder="Name"
                          maxLength="55"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-4">
                      <div className="edit-inp-subheading position-relative">
                        <h6>URL</h6>
                        <span className="text-danger position-absolute top-0">
                          {this.validator.message("url", collection.url, "url")}
                        </span>
                      </div>
                      <div className="edit-inp pt-4">
                        <input
                          id="url"
                          type="text"
                          name="url"
                          placeholder="URL"
                          onChange={(e) => this.onChange(e)}
                          value={collection.url}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-4">
                      <div className="edit-inp-subheading position-relative">
                        <h6>Select Category</h6>
                        <span className="text-danger position-absolute top-0">
                          {this.validator.message(
                            "category",
                            collection.categoryId,
                            "required"
                          )}
                        </span>
                      </div>
                      <div className="edit-inp pt-4">
                        <select
                          id="category"
                          name="categoryId"
                          onChange={(e) => this.onChange(e)}
                        >
                          <option value="" className="d-none">
                            Select Collection
                          </option>
                          {categories &&
                            categories.map((category, index) => {
                              return (
                                <option key={index} value={category._id}>
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="edit-inp-subheading pt-4">
                        <h6>Discription</h6>
                      </div>
                      <div className="edit-inp pt-4">
                        <textarea
                          name="description"
                          placeholder="Discription"
                          onChange={(e) => this.onChange(e)}
                          value={collection.description}
                          maxLength="230"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-4 mt-md-5 text-center">
                  <div className="">
                    <button
                      type="button"
                      className="btn btn-linear-gradient"
                      onClick={(e) => this.submit(e)}
                    >
                      Create Collections
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  collection: state.collection,
  // user: state.user,
  error: state.error,
  category: state.category,
});

export default connect(mapStateToProps, {
  beforeCollection,
  upsertCollection,
  emptyError,
  beforeCategory,
  getCategories,
})(CreateCollections);
