import React, { Component } from "react";
import { connect } from "react-redux";
import {
  axiosPostFormData,
  decimalNumberValidator,
} from "./../../utils/functions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENV } from "../../config/config";
import $ from "jquery";
import SimpleReactValidator from "simple-react-validator";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
import {
  beforeCollection,
  getCollections,
  myCollections,
} from "../collections/collections.actions";
import { setNftToken, createNFT } from "../nfts/nfts.action";
import { getCurrentAddress, mintNFt } from "../../utils/web3";
import { RiArrowDropDownLine } from "react";
import "./createNft.css";
import { Images } from "../../assets/assets.js";
import Upload from "./components/upload";
import Footer from "../footer/footer";
import NavbarMain from "../navbar-main/NavbarMain";
import Breadcrumb from "../breadcrumb/breadcrumb";

const placeholderImg = "";
class CreateNFT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      formValid: true,
      loader: true,
      errors: "",
      nft: {
        userId: ENV.getUserKeys("_id")._id,
        ownerId: ENV.getUserKeys("_id")._id,
        creatorId: ENV.getUserKeys("_id")._id,
        image: "",
        name: "",
        description: "",
        currentPrice: "",
        royalty: "",
        size: "",
        copies: "",
        collectionId: "",
        ownerAddress: "",
        categoryId: "",
        status: 1, // 1 = put on sale, 2 = instant sale price, 3 = unlock purchased
      },
      imageURL: "",
      videoURL: "",
      collections: [],
      allcollections: null,
      error: false,
      errorMessage: "",
      audioUrl: "",
    };
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      messages: {
        required: "This field is required.", // will override all messages
      },
    });
  }

  componentDidMount = async () => {
    window.scroll(0, 0);

    this.props.myCollections(ENV.getUserKeys("_id")._id);
    if (!ENV.getUserKeys("_id")._id) {
      this.props.history.push("/login");
    }

    let ownerAddress = await getCurrentAddress();

    let { nft } = this.state;
    nft = { ...nft, ownerAddress: ownerAddress };
    this.setState({
      nft,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.collection.myCollectionsResult &&
      prevProps.collection.myCollectionsResult !==
        this.props.collection.myCollectionsResult
    ) {
      const collections =
        this.props.collection.myCollections.collections.Collections;

      this.props.beforeCollection();

      if (!collections.length) {
        toast.info("Please add a collection first");
        return this.props.history.push("/collection/create");
      } else {
        this.setState({
          collections: collections,
          loader: false,
        });
      }
    }
  }

  onChange(e, status = null) {
    let { name, value } = e.target;

    // if status is provided
    if (status) value = status;
    let category = this.state.collections.find(
      (item) => item._id === value
    )?.categoryId;

    let { nft } = this.state;
    nft = { ...nft, [name]: value, categoryId: category };
    this.setState({ nft });
  }

  reset = () => {
    const nft = {
      userId: ENV.getUserKeys("_id")._id,
      ownerId: ENV.getUserKeys("_id")._id,
      image: "",
      name: "",
      description: "",
      currentPrice: "",
      royalty: "",
      size: "",
      copies: "",
      collectionId: "",
      ownerAddress: this.state.ownerAddress,
      status: 1, // 1 = put on sale, 2 = instant sale price, 3 = unlock purchased
    };
    this.setState({ nft });
  };

  submit = (e) => {
    e.preventDefault();

    const { nft, videoURL, audioUrl } = this.state;
    console.log(nft, "nft=>");
    let nftInfo = nft;
    if (videoURL) {
      nftInfo.fileType = "video";
    } else if (audioUrl !== "") {
      nftInfo.fileType = "audio";
    } else {
      nftInfo.fileType = "image";
    }

    this.setState(
      {
        isSubmitted: true,
        formValid: this.validator.allValid() && nft.collectionId ? true : false,
      },
      () => {
        const { formValid } = this.state;
        if (formValid) {
          this.setState(
            {
              loader: true,
            },
            async () => {
              var formData = new FormData();
              for (const key in nftInfo)
                if (nftInfo[key]) formData.append(key, nftInfo[key]);

              const res = await axiosPostFormData(
                "nfts/create",
                formData,
                true
              );

              console.log(res, "nft crate");

              if (res.success) {
                // this.reset();
                // toast.success(`Success! ${res.message}`)

                if (res.nft && res.nft.metaData) {
                  try {
                    
                    let createNftResult = await mintNFt(
                      res.nft.metaData,
                      res.nft._id,
                      this.state.nft.copies,
                      
                      2
                    );
                    
                          
                           console.log(createNftResult,"createNftResult")
                    if (createNftResult.events.TransferSingle.returnValues.id) {
                      let data = {
                        nftToken:
                          createNftResult.events.TransferSingle.returnValues.id,
                        data: this.state.nft,
                        image: res.nft.image,
                      };
                      console.log(data, "data==>");
                      this.props.setNftToken(data);
                  
                      this.props.history.push("/explore/allNFT");
                    }
                  } catch (err) {
                    console.log(err,"here")
                    toast.error(err);
                    this.setState({loader:false})
                  }
                }
              } else this.setState({ errors: res.message, loader: false });
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
              $("#create-nft").scrollTop(0, 0);
            }
          );
        }
      }
    );
  };

  onFileChange = (e, status) => {
    if (this.handleFilesValidation(e, status) === "file matched") {
      let file = "";
      let url = "";
      let fileId = "";
      if (status === "onDrag") {
        file = e.dataTransfer.files[0];
        url = URL.createObjectURL(e.dataTransfer.files[0]);
        fileId = e.dataTransfer.id;
      } else {
        file = e.target.files[0];
        url = URL.createObjectURL(e.target.files[0]);
        fileId = e.target.id;
      }
      if (file)
        if (file.type.includes("image")) {
          let { nft } = this.state;
          nft = { ...nft, [e.target.name]: file };

          this.setState(
            {
              nft,
              imageURL: url,
              videoURL: "",
              error: false,
              errorMessage: "",
            },
            () => {
              if (file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                  $(`#nft-${fileId}`).attr("src", e.target.result);
                  $("#nft-image-label").html("File selected");
                };
                reader.readAsDataURL(file);
              }
            }
          );
        } else if (file.type.includes("video")) {
          let { nft } = this.state;
          nft = { ...nft, image: file };
          console.log(nft, "nft setting to the state");
          this.setState({
            nft,
            videoURL: url,
            // image:file,
            imageURL: "",
            error: false,
            errorMessage: "",
          });
        } else if (file.type.includes("audio")) {
          let { nft } = this.state;
          nft = { ...nft, audioUrl: file, image: file };

          this.setState({
            nft,
            videoURL: "",
            imageURL: "",
            // image:file,
            error: false,
            errorMessage: "",
            audioUrl: url,
          });
        } else {
          $(`#nft-${fileId}`).attr("src", placeholderImg);
          file = {};
        }
    } else {
      let message = this.handleFilesValidation(e, status);
      this.setState({
        error: true,
        errorMessage: message,
      });
    }
  };
  dragOver = (e) => {
    e.preventDefault();
  };

  dragEnter = (e) => {
    e.preventDefault();
  };

  dragLeave = (e) => {
    e.preventDefault();
  };
  onDrop = (e) => {
    e.nativeEvent.preventDefault();
    if (!e) return;

    this.onFileChange(e, "onDrag");
  };

  handleFilesValidation = (e, status) => {
    let files = "";
    let type = "";
    if (status === "onDrag") {
      files = e.dataTransfer.files[0];
      type = e.dataTransfer.files[0].type;
    } else {
      files = e.target.files[0];
      type = e.target.files[0].type;
    }
    if (files) {
      if (
        type === "image/jpeg" ||
        type === "image/png" ||
        type === "image/gif" ||
        type === "video/mp4" ||
        type === "audio/mpeg"
      ) {
        let fileSize = this.formatBytes(files.size).split(" ");
        if (+fileSize[0] > 100 && fileSize[1] === "MB") {
          return "File size limit is exceeded";
        } else {
          return "file matched";
        }
      } else {
        return "File not supported!";
      }
    }
  };
  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };
  clearData = () => {
    this.setState({
      imageURL: "",
      audioUrl: "",
      videoURL: "",
    });
  };

  render() {
    const {
      nft,
      errors,
      loader,
      isSubmitted,
      collections,
      imageURL,
      videoURL,
      error,
      errorMessage,
      audioUrl,
    } = this.state;

    const { onDrop, dragOver, dragEnter, dragLeave } = this;

    return (
      <div>
        <NavbarMain />
        <Breadcrumb title1={"NFT"} title2={"CreateNft"} />
        <section className="author-area padding-wrapper">
          {loader && <FullPageLoader />}

          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Intro */}
                <div className="intro">
                  <div className="intro-content">
                    <span>Get started</span>
                    <h3 className="mb-0">Create NFT</h3>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-4 left-container">
                <p className="upload-title">Upload</p>
                <div className="nft-left-upload p-3">
                  <div
                    className="upload-image-container"
                    onDrop={(e) => onDrop(e)}
                    onDragOver={(e) => dragOver(e)}
                    onDragEnter={(e) => dragEnter(e)}
                    onDragLeave={(e) => dragLeave(e)}
                  >
                    <Upload
                      onFileChange={(e, status) => this.onFileChange(e, status)}
                      clearData={this.clearData}
                      Images={Images}
                      imageURL={imageURL}
                      videoURL={videoURL}
                      audioSrc={audioUrl}
                      dragOver={dragOver}
                      onDrop={onDrop}
                      dragEnter={dragEnter}
                      dragLeave={dragLeave}
                    />
                    <span className="text-danger text-center mt-3">
                      {this.validator.message("image", nft.image, "required")}
                    </span>

                    {error && (
                      <p className="text-danger text-center mt-3">
                        {errorMessage}
                      </p>
                    )}

                    <div className="choose-file text-center my-5 ">
                      <p className="mb-4">or choose a file</p>

                      <label>
                        <span className="browse-files-btn mt-2">
                          Browse file
                        </span>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => this.onFileChange(e, "onChange")}
                          accept=".mp4, .png,.jpeg"
                          name="image"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-8 mt-5 mt-sm-0">
                <p className="upload-title">Create</p>
                <div className="nft-inputs-container p-4">
                  <div className="row g-4">
                    <div className="col-12">
                      <input
                        name="name"
                        placeholder="Title"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        value={nft.name}
                        defaultValue={nft.name}
                        autoComplete="off"
                      />
                      <span className="text-danger">
                        {this.validator.message("name", nft.name, "required")}
                      </span>
                    </div>
                    <div className="col-12">
                      <textarea
                        className="create-collection-textarea"
                        name="description"
                        rows="3"
                        placeholder="Description*"
                        onChange={(e) => this.onChange(e)}
                        value={nft.description}
                        defaultValue={nft.description}
                      ></textarea>
                      <span className="text-danger">
                        {this.validator.message(
                          "name",
                          nft.description,
                          "required"
                        )}
                      </span>
                    </div>

                    <div className="col-12">
                      <input
                        name="currentPrice"
                        placeholder="Item Price*"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        onKeyDown={(e) => decimalNumberValidator(e)}
                        value={nft.currentPrice}
                        defaultValue={nft.currentPrice}
                      />
                      <span className="text-danger">
                        {this.validator.message(
                          "name",
                          nft.currentPrice,
                          "required"
                        )}
                      </span>
                    </div>

                    <div className="col-12 col-lg-6">
                      <input
                        name="size"
                        placeholder="Size"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        value={nft.size}
                        defaultValue={nft.size}
                      />
                      <span className="text-danger">
                        {this.validator.message("name", nft.size, "required")}
                      </span>
                    </div>
                    <div className="col-12 col-lg-6">
                      <input
                        name="copies"
                        placeholder="No. of Copies*"
                        required="required"
                        onKeyDown={(e) => decimalNumberValidator(e)}
                        onChange={(e) => this.onChange(e)}
                        value={nft.copies}
                        defaultValue={nft.copies}
                      />
                      <span className="text-danger">
                        {this.validator.message("name", nft.copies, "required")}
                      </span>
                    </div>

                    <div className="col-12">
                      <select
                        id="collectionId"
                        name="collectionId"
                        onChange={(e) => this.onChange(e)}
                      >
                        <option value="">Select Collection</option>
                        {collections &&
                          collections.length > 0 &&
                          collections.map((collection, index) => {
                            return (
                              <option key={index} value={collection._id}>
                                {collection.name}
                              </option>
                            );
                          })}
                      </select>
                      <span className="text-danger">
                        {this.validator.message(
                          "name",
                          nft.collectionId,
                          "required"
                        )}
                      </span>
                    </div>
                    <div className="col-12">
                      <div className="nft-form-btns text-center ">
                        <div className="d-flex  flex-column flex-md-row justify-content-center align-items-center">
                          <button
                            disabled={loader}
                            className="create-collection-btn mt-2 me-md-2"
                            typ="submit"
                            onClick={(e) => this.submit(e)}
                          >
                            Create Item
                          </button>
                          <button className="cancel-collection-btn mt-2">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  collection: state.collection,
});

export default connect(mapStateToProps, {
  beforeCollection,
  getCollections,
  setNftToken,
  createNFT,
  myCollections,
})(CreateNFT);
