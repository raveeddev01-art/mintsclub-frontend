import React, { Component } from "react";
import { connect } from "react-redux";
import {
  axiosPostFormData,
  decimalNumberValidator,
  firstInputCharacterSpace,
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
import { addNFTRecord, createNFT, createActivity } from "../nfts/nfts.action";
import { getCurrentAddress, mintNFt, validateNetwork } from "../../utils/web3";
import { emptyError } from "../../redux/shared/error/error.action";
import "./createNft.css";
import { Images } from "../../assets/assets.js";
import Upload from "./components/upload";
import Footer from "../footer/footer";
import NavbarMain from "../navbar-main/NavbarMain";
import Breadcrumb from "../breadcrumb/breadcrumb";
import AddIcon from "../../assets/images/add-icon.svg";
import PropertiesModal from "../modals/PropertiesModal";
import LevelsModal from "../modals/LevelsModal";
import StatsModal from "../modals/StatsModal";
import StatsInfo from "./components/statsinfo";
import LevelsInfo from "./components/levelsinfo";
import PropertiesInfo from "./components/propertiesinfo";

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
        properties: [],
        levels: [],
        stats: [],
        image: "",
        name: "",
        description: "",
        copies: "",
        collectionId: "",
        ownerAddress: "",
        categoryId: "",
        status: 1, // 1 = put on sale, 2 = instant sale price, 3 = unlock purchased
      },
      properties: [{ name: "", type: "" }],
      levels: [{ name: "", value: "", total: 5 }],
      stats: [{ name: "", value: "", total: 5 }],
      imageURL: "",
      videoURL: "",
      collections: [],
      allcollections: null,
      error: false,
      errorMessage: "",
      audioUrl: "",
      propertiesmodalShow: false,
      levelsmodalShow: false,
      statsmodalShow: false,
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

    if (this.props.error) {
      this.setState({ loader: false }, () => {
        this.props.emptyError();
      });
    }


    if (
      this.props.collection.myCollectionsResult &&
      prevProps.collection.myCollectionsResult !==
        this.props.collection.myCollectionsResult
    ) {
      const collections =
        this.props.collection.myCollections.collections.Collections;

      if (!collections.length) {
        toast.info("Please create a collection first");
        return this.props.history.push("/createcollection");
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
      royalty: "",
      size: "",
      copies: "",
      collectionId: "",
      ownerAddress: this.state.ownerAddress,
      status: 1, // 1 = put on sale, 2 = instant sale price, 3 = unlock purchased
    };
    this.setState({ nft });
  };

  submit = async (e) => {
    e.preventDefault();
   
    if (await validateNetwork()) {
      const { nft, videoURL, audioUrl } = this.state;

      let nftInfo = { ...nft };

      nftInfo.properties = JSON.stringify(nftInfo.properties);

      nftInfo.levels = JSON.stringify(nftInfo.levels);

      nftInfo.stats = JSON.stringify(nftInfo.stats);
     
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
          formValid:
            this.validator.allValid() && nft.collectionId ? true : false,
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
              

                if (res.success) {
               
                  // this.reset();

                  nft.remainingCopies = nft.copies;
                  if (res.nft && res.nft.metaData) {
                    try {
                      let createNftResult = await mintNFt(
                        res.nft.metaData,
                        res.nft._id,
                        this.state.nft.copies,
                        2
                      );

                      if (
                        createNftResult.events.TransferSingle.returnValues.id
                      ) {
                        let data = {
                          nftToken:
                            createNftResult.events.TransferSingle.returnValues
                              .id,
                          data: res.nft,
                          image: res.nft.image,
                        };

                        this.props.addNFTRecord(data);

                        this.props.history.push("/explore/allNFT");
                      }
                    } catch (err) {
                      toast.error(err);
                      this.setState({ loader: false });
                    }
                  }
                } else {
                  toast.error(res.response.data.message)
                  this.setState({ errors: res.message, loader: false })};
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
    } else {
      toast.error("Please Connect Your Metamask With Ethereum Rinkeby Network");
    }
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

  ////property modal handlers

  addMoreValues = (status) => {
    if (status === "properties") {
      this.setState({
        properties: [...this.state.properties, { name: "", type: "" }],
      });
    } else if (status === "stats") {
      this.setState({
        stats: [...this.state.stats, { name: "", value: "" ,total:5}],
      });
    } else {
      this.setState({
        levels: [...this.state.levels, { name: "",value: "" ,total:5 }],
      });
    }
  };

  handleChange = (i, e, status) => {
    if (status === "properties") {
      let newFormValues = [...this.state.properties];
      newFormValues[i][e.target.name] = e.target.value;
      this.setState({
        properties: newFormValues,
      });
    } else if (status === "stats") {
      let newFormValues = [...this.state.stats];
      newFormValues[i][e.target.name] =
        e.target.name === "value"&&e.target.value!=='' ? +e.target.value : e.target.value;
      this.setState({
        stats: newFormValues,
      });
    } else {
      let newFormValues = [...this.state.levels];
      newFormValues[i][e.target.name] =
        e.target.name === "value"&&e.target.value!==''  ? +e.target.value : e.target.value;
      this.setState({
        levels: newFormValues,
      });
    }
  };

  removeFormFields = (i, status) => {
    let { nft } = this.state;
    if (status === "properties") {
      let newFormValues = [...this.state.properties];
      newFormValues.splice(i, 1);
      let newNFTValues = [...this.state.nft.properties];
      newNFTValues.splice(i, 1);
      nft = { ...nft, properties: newNFTValues };
      this.setState({
        properties: newFormValues,
        nft,
      });
    } else if (status === "stats") {
      let newFormValues = [...this.state.stats];
      newFormValues.splice(i, 1);
      let newNFTValues = [...this.state.nft.stats];
      newNFTValues.splice(i, 1);
      nft = { ...nft, stats: newNFTValues };
      this.setState({
        stats: newFormValues,
        nft,
      });
    } else {
      let newFormValues = [...this.state.levels];
      newFormValues.splice(i, 1);
      let newNFTValues = [...this.state.nft.levels];
      newNFTValues.splice(i, 1);
      nft = { ...nft, levels: newNFTValues };
      this.setState({
        levels: newFormValues,
        nft,
      });
    }
  };

  onSave = (status) => {
    let { nft } = this.state;
    if (status === "properties") {
      nft = { ...nft, properties: this.state.properties };
      this.setState({
        nft,
        propertiesmodalShow: false,
      });
    } else if (status === "stats") {
      nft = { ...nft, stats: this.state.stats };
      this.setState({
        nft,
        statsmodalShow: false,
      });
    } else {
      nft = { ...nft, levels: this.state.levels };
      this.setState({
        nft,
        levelsmodalShow: false,
      });
    }
  };
  render() {
    const {
      nft,
      loader,
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
        <Breadcrumb title1={"NFT"} title2={"Create NFT"} />
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
                        placeholder="Title*"
                        required="required"
                        maxLength="100"
                        minLength="3"
                        onKeyDown={(e) =>
                          firstInputCharacterSpace(e, nft.name.length)
                        }
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
                        maxLength="500"
                        onChange={(e) => this.onChange(e)}
                        onKeyDown={(e) =>
                          firstInputCharacterSpace(e, nft.description.length)
                        }
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
                    <div className="col-12 col-lg-6">
                      <input
                        name="copies"
                        placeholder="No. of Copies*"
                        type="text"
                        maxLength={"3"}
                        autoComplete="off"
                        required="required"
                        onKeyDown={(e) => decimalNumberValidator(e)}
                        onChange={(e) => {
                          if (e.target.value.length && e.target.value === "0") {
                            return false;
                          } else {
                            this.onChange(e);
                          }
                        }}
                        value={nft.copies}
                        defaultValue={nft.copies}
                      />
                      <span className="text-danger">
                        {this.validator.message("name", nft.copies, "required")}
                      </span>
                    </div>

                    <div className="col-12 col-lg-6">
                      <select
                        id="collectionId"
                        name="collectionId"
                        onChange={(e) => this.onChange(e)}
                      >
                        <option value="" className="d-none">
                          Select Collection
                        </option>
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
                      <div className="create-properties-container d-flex align-items-center justify-content-between">
                        <div className="properties-content">
                          <p>Properties</p>
                        </div>
                        <div className="properties-btn">
                          <button
                            onClick={() => {
                              this.setState({
                                propertiesmodalShow: true,
                              });
                            }}
                          >
                            <img src={AddIcon} alt="add" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {this.state.nft.properties.length > 0 && (
                      <div className="col-12">
                        <div className="nft-properties-container">
                          <div className="row g-2">
                            {this.state.nft.properties.map((item) => {
                              return (
                                <div className="col-md-6 col-lg-4">
                                  <PropertiesInfo
                                    name={item.name}
                                    type={item.type}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="col-12">
                      <div className="create-properties-container d-flex align-items-center justify-content-between">
                        <div className="properties-content">
                          <p>Levels</p>
                        </div>
                        <div className="properties-btn">
                          <button
                            onClick={() => {
                              this.setState({
                                levelsmodalShow: true,
                              });
                            }}
                          >
                            <img src={AddIcon} alt="add" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {this.state.nft.levels.length > 0 && (
                      <div className="col-12">
                        <div className="nft-level-container">
                          {this.state.nft.levels.map((item) => {
                            return (
                              <LevelsInfo name={item.name} value={item.value} />
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div className="col-12">
                      <div className="create-properties-container d-flex align-items-center justify-content-between">
                        <div className="properties-content">
                          <p>Stats</p>
                        </div>
                        <div className="properties-btn">
                          <button
                            onClick={() => {
                              this.setState({
                                statsmodalShow: true,
                              });
                            }}
                          >
                            <img src={AddIcon} alt="add" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {this.state.nft.stats.length > 0 && (
                      <div className="col-12">
                        <div className="nft-stat-container">
                          {this.state.nft.stats.map((item) => {
                            return (
                              <StatsInfo name={item.name} value={item.value} />
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {/* <div className="col-12">
                        <select
                          id="collectionId"
                          name="collectionId"
                          onChange={(e) => this.onChange(e)}
                        >
                          <option value="" className="d-none">
                            Blockchain
                          </option>
                        </select>
                      </div> */}
                    <div className="col-12">
                      <div className="nft-form-btns text-center ">
                        <div className="d-flex  flex-column flex-md-row justify-content-center align-items-center">
                          <button
                            disabled={loader}
                            className="create-collection-btn mt-2 me-md-2"
                            typ="submit"
                            onClick={(e) => this.submit(e)}
                          >
                            Create NFT
                          </button>
                          {/* <button className="cancel-collection-btn mt-2">
                              Cancel
                            </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PropertiesModal
            show={this.state.propertiesmodalShow}
            addMoreValues={this.addMoreValues}
            handleChange={this.handleChange}
            removeFormFields={this.removeFormFields}
            properties={this.state.properties}
            onSave={this.onSave}
            onHide={() => {
              this.setState({
                propertiesmodalShow: false,
              });
            }}
          />

          <LevelsModal
            show={this.state.levelsmodalShow}
            addMoreValues={this.addMoreValues}
            handleChange={this.handleChange}
            removeFormFields={this.removeFormFields}
            levels={this.state.levels}
            onSave={this.onSave}
            onHide={() => {
              this.setState({
                levelsmodalShow: false,
              });
            }}
          />
          <StatsModal
            show={this.state.statsmodalShow}
            addMoreValues={this.addMoreValues}
            handleChange={this.handleChange}
            removeFormFields={this.removeFormFields}
            stats={this.state.stats}
            onSave={this.onSave}
            onHide={() => {
              this.setState({
                statsmodalShow: false,
              });
            }}
          />
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
  addNFTRecord,
  createNFT,
  myCollections,
  createActivity,
  emptyError
})(CreateNFT);
