import React, { Component } from "react";
import { connect } from "react-redux";
import {
  beforeCollection,
  upsertCollection,
} from "../collections/collections.actions";
import { beforeCategory, getCategories } from "../categories/categories.action";
import { getUser } from "../user/user.action";
import { emptyError } from "../../redux/shared/error/error.action";
import $ from "jquery";
import { ENV } from "../../config/config";
import SimpleReactValidator from "simple-react-validator";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
import { toast } from "react-toastify";
import "./create-collection.css";
import { Images } from "../../assets/assets.js";
class CreateCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      formValid: true,
      loader: true,
      errors: "",
      collection: {
        userId: "",
        categoryId: "",
        logo: "",
        featuredImg: "",
        banner: "",
        name: "",
        url: "",
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
      this.props.history.push("/collections");
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

  render() {
    const { collection, errors, loader, isSubmitted, categories } = this.state;
    if (!ENV.getUserKeys("_id")._id) {
      toast.error("Please login to create Collection");
      this.props.history.push("/");
      return " ";
    } else {
      return (
        <section className="author-area padding-wrapper">
          <div className="container">
            <div className="row d-flex jusfity-content-center ">
              <div className="col-lg-4 col-md-12 left-container ">
                <p className="upload-title">Upload</p>
                <div className="p-3">
                  <div className="upload-image-container">
                    <div className="upload-image-border p-4">
                      <img
                        className="upload-image"
                        src={Images.uploadImage}
                        alt="upload-image"
                      />

                      <div className="upload-details text-center mt-2">
                        <p>Drag and drop you file</p>
                        <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
                      </div>
                    </div>

                    <div className="choose-file text-center mt-5 ">
                      <p>or choose a file</p>
                      <button className="browse-files-btn">Browse Files</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 col-md-12 create-collection-form-container mt-5 mt-lg-0 d-flex   flex-column justify-content-center align-items-center align-items-lg-start">
                <p className="upload-title">Upload</p>
                <div className="form-inputs-container ">
                  <div className="row  p-3">
                    <div className="col-12">
                      <label className="create-collection-form-title mb-3">
                        Title
                      </label>
                      <input
                        className="create-collection-form-input "
                        name="title"
                        value=""
                        placeholder="Type here"
                      />
                    </div>
                  </div>

                  <div className="row p-3">
                    <div className="col-12">
                      <label className="create-collection-form-title mb-3">
                        Description
                      </label>
                      <input
                        className="create-collection-form-input form-input-description"
                        name="title"
                        value=""
                        placeholder="Type here"
                      />
                    </div>
                  </div>

                  <div className="row p-3">
                    <div className="col-6">
                      <label className="create-collection-form-title mb-3">
                        Item Price
                      </label>
                      <input
                        className="create-collection-form-input"
                        name="title"
                        value=""
                        placeholder="Type here"
                      />
                    </div>
                    <div className="col-6">
                      <label className="create-collection-form-title mb-3">
                        Category
                      </label>
                      <select
                        className="create-collection-form-input"
                        name="cars"
                        id="cars"
                      >
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                      </select>
                    </div>
                  </div>

                  <div className="row p-3">
                    <div className="col-6">
                      <label className="create-collection-form-title mb-3">
                        Size
                      </label>
                      <input
                        className="create-collection-form-input"
                        name="title"
                        value=""
                        placeholder="Type here"
                      />
                    </div>
                    <div className="col-6">
                      <label className="create-collection-form-title mb-3">
                        No. of Copies
                      </label>
                      <input
                        className="create-collection-form-input"
                        name="title"
                        value=""
                        placeholder="Type here"
                      />
                    </div>
                  </div>

                  <div className="row  p-3">
                    <div className="col-12">
                      <label className="create-collection-form-title mb-3">
                        Title
                      </label>
                      <select
                        className="create-collection-form-input"
                        name="cars"
                        id="cars"
                      >
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="mb-3">
                      <a className="preview text-underline">Preview</a>
                    </div>
                    <button className="create-collection-btn">
                      Create Collection
                    </button>
                    <div className="mt-3 mb-5">
                      <a className="cancel text-white mt-4 text-underline">
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {loader && <FullPageLoader />}
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-md-12">
                            <div className="mt-5 mt-lg-0 mb-4 mb-lg-5">
                                <div className="intro">
                                    <div className="intro-content">
                                        <span>Get Started</span>
                                        <h3 className="mt-3 mb-0">Create Collection</h3>
                                    </div>
                                </div>
                                {
                                    isSubmitted && errors &&
                                    <div className="row">
                                        <div className="col-12">
                                            <span id="create-collection-err" className="text-danger">{errors}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                            <form id="create-collection" className="item-form card no-hover">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="logo" accept=".png,.jpeg,.jpg" onChange={(e) => this.onFileChange(e)} name="logo" />
                                                <label id="collection-logo-label" className="custom-file-label" htmlFor="logo">Choose Logo *</label>
                                            </div>
                                            <span className="text-danger">{this.validator.message('logo', collection.logo, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-2">
                                        <div className="card no-hover text-center">
                                            <div className="image-over">
                                                <img id="logo-placeholder" className="card-img-top create-collection-placeholder" src={collection.logoUrl ? collection.logoUrl : "/img/placeholder.png"} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="featuredImg" accept=".png,.jpeg,.jpg" onChange={(e) => this.onFileChange(e)} name="featuredImg" />
                                                <label id="collection-featuredImg-label" className="custom-file-label" htmlFor="featuredImg"> Choose Featured Image</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <div className="card no-hover text-center">
                                            <div className="image-over">
                                                <img id="featuredImg-placeholder" className="card-img-top create-collection-placeholder" src={collection.featuredImgUrl ? collection.featuredImgUrl : "/img/placeholder.png"} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="banner" accept=".png,.jpeg,.jpg" onChange={(e) => this.onFileChange(e)} name="banner" />
                                                <label id="collection-banner-label" className="custom-file-label" htmlFor="banner">Choose Banner</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="card no-hover text-center">
                                            <div className="image-over">
                                                <img id="banner-placeholder" className="card-img-top create-collection-placeholder" src={collection.bannerUrl ? collection.bannerUrl : "/img/placeholder.png"} alt="" />
                                           
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="name" placeholder="Name *" onChange={(e) => this.onChange(e)} defaultValue={collection.name} maxLength="55" />
                                            <span className="text-danger">{this.validator.message('name', collection.name, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="url" placeholder="URL" onChange={(e) => this.onChange(e)} defaultValue={collection.url}  maxLength="70" />
                                            <span className="text-danger">{this.validator.message('url', collection.url, 'url')}</span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="category" className="pos-rel">Select Category *</label>
                                            <select className="form-control p-0" id="category" name="categoryId" onChange={(e) => this.onChange(e)}>
                                                <option value="">Select Category</option>
                                                {
                                                    categories && categories.map((category, index) => {
                                                        return (
                                                            <option key={index} value={category._id}>{category.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.validator.message('category', collection.categoryId, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea className="form-control" name="description" placeholder="Description" cols={30} rows={3} onChange={(e) => this.onChange(e)} defaultValue={collection.description} maxLength="230"/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button disabled={loader} className="btn w-100 mt-3 mt-sm-4" type="button" onClick={(e) => this.submit(e)}>Create Collection</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div > */}
        </section>
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
})(CreateCollection);
