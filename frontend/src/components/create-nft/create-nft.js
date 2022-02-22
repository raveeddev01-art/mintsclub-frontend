import React, { Component } from "react";
import { connect } from "react-redux";
import NFTPreview from "../nft-preview/nft-preview";
import {
  axiosPostFormData,
  decimalNumberValidator,
} from "./../../utils/functions";
import { createNft } from "./../../utils/web3";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENV } from "../../config/config";
import $ from "jquery";
import SimpleReactValidator from "simple-react-validator";
import FullPageLoader from "../../components/full-page-loader/full-page-loader";
// import {ENV} from '../../config/config'
import {
  beforeCollection,
  getCollections,
  myCollections,
} from "../collections/collections.actions";
import { setNftToken, createNFT } from "../nfts/nfts.action";
import { getCurrentAddress } from "../../utils/web3";
import { RiArrowDropDownLine } from "react";
import "./createNft.css";

import { Images } from "../../assets/assets.js";
import Upload from "./components/upload";
import NavbarMain from "../../Screens/rough/navbar-main/NavbarMain";
import Footer from "../footer/footer";
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
        creatorId:ENV.getUserKeys("_id")._id,
        image: "",
        videoURL: "",
        audioUrl: "",
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
    //  let qs= ENV.objectToQueryString(userId:ENV.getUserKeys("_id"))
    this.props.myCollections(ENV.getUserKeys("_id")._id);
    // if(!ENV.getUserKeys("_id")._id){
    //   this.props.history.push('/login')
    // }

    let ownerAddress = await getCurrentAddress();

    let { nft } = this.state;
    nft = { ...nft, ownerAddress: ownerAddress };
    this.setState({
      nft,
    });
  };

  componentDidUpdate(prevProps) {
    // const {collections}=this.state
    if (
      this.props.collection.myCollectionsResult &&
      prevProps.collection.myCollectionsResult !==
        this.props.collection.myCollectionsResult
    ) {
      const collections =
        this.props.collection.myCollections.collections.Collections;

      this.props.beforeCollection();

      if (!collections) {
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

  // onFileChange(e) {
  //   let file = e.target.files[0];
  //   let fileId = e.target.id;
  //   if (file)
  //     if (file.type.includes("image")) {
  //       let { nft } = this.state;
  //       nft = { ...nft, [e.target.name]: file };
  //       this.setState(
  //         {
  //           nft,
  //         },
  //         () => {
  //           if (file) {
  //             var reader = new FileReader();

  //             reader.onload = function (e) {
  //               $(`#nft-${fileId}`).attr("src", e.target.result);
  //               $("#nft-image-label").html("File selected");
  //             };
  //             reader.readAsDataURL(file);
  //           }
  //         }
  //       );
  //     } else {
  //       $(`#nft-${fileId}`).attr("src", placeholderImg);
  //       file = {};
  //     }
  // }

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

    const { nft } = this.state;

    // return ' '
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
              for (const key in nft)
                if (nft[key]) formData.append(key, nft[key]);

              const res = await axiosPostFormData(
                "nfts/create",
                formData,
                true
              );

              if (res) {
                console.log(res,"response")
               
                // this.props.history.push('/user-dashboard')
              }

              // if (res.success) {
              //   // this.reset();
              //   // toast.success(`Success! ${res.message}`)

              //   if (res.nft && res.nft.metaData) {
              //     try {
              //       let nftId = res.nft._id;
              //       let createNftResult = await createNft(
              //         res.nft.metaData,
              //         res.nft._id
              //       );
              //       console.log(createNftResult, "createNftResult");

              //       if (createNftResult.events.Transfer.returnValues.tokenId) {
              //         let data = {
              //           nftToken:
              //             createNftResult.events.Transfer.returnValues.tokenId,
              //           nftId,
              //           data: this.state.nft,
              //           image: res.nft.image,
              //         };
              //         this.props.setNftToken(data);
              //       }
              //     } catch (err) {
              //       // alert(err.message);
              //     }

              //     this.setState({
              //       loader: true,
              //     });
              //     // setTimeout(() => {
              //     //   this.setState({ loader: false });
              //     //   // this.props.history.push("/collections");
              //     // }, 11000);
              //   }
              // } else this.setState({ errors: res.message, loader: false });

              /////for testing purpose
              let nftId = res.nft._id;
              let data = {
                nftToken: "123444",
                nftId,
                data: this.state.nft,
                image: res.nft.image,
              };
              this.props.setNftToken(data);
              toast.success("Nft created successfully");
              this.props.history.push("/explore/allNFT");
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
          nft = { ...nft, videoURL: "" };

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
          nft = { ...nft, videoURL: file };
          nft = { ...nft, image: "" };
          this.setState({
            nft,
            videoURL: url,
            imageURL: "",
            error: false,
            errorMessage: "",
          });
        } else if (file.type.includes("audio")) {
          let { nft } = this.state;
          nft = { ...nft, videoURL: file, audioUrl: file, image: "" };

          this.setState({
            nft,
            videoURL: "",
            imageURL: "",
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
  clearData=()=>{
    this.setState({
      imageURL:'',
      audioUrl:'',
      videoURL:''
    })
  }

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
 
    const { onDrop, dragOver, dragEnter, dragLeave } = this
    console.log(collections,"collections==>")
    console.log(ENV.getUserKeys("_id")._id,"fddf")
 
 

    return (
      <div>
        <NavbarMain />

        <section className="author-area padding-wrapper">
          {loader && <FullPageLoader />}
          {/* <div className="container">
                    <div className="row ">
  
                            <div className="col-12">
                                        <span className="get-started-text">Get Started</span>

                            </div>
                        <div className="col-12 col-md-6 col-sm-12 d-flex flex-column align-items-lg-start align-items-center">
                            <div className="mt-lg-0 mb-1 mb-lg-1">
                               
                                <div className="intro">
                                    <div className="intro-content">
                                        <h3 className="mt-3 mb-0 create-item-heading">Create Item</h3>
                                    </div>
                                </div>
            
                                {
                                    isSubmitted && errors &&
                                    <div className="row">
                                        <div className="col-12">
                                            <span id="create-nft-err" className="form-error-msg text-danger">{errors}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                  
                            <form id="create-nft" className="item-form card preview-nft-form-card no-hover">
                             
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="image" accept=".png,.jpeg,.jpg" onChange={(e) => this.onFileChange(e)} name="image" />
                                                <label id="nft-image-label" className="custom-file-label" htmlFor="image">Choose file *</label>
                                            </div>
                                            <span className="text-danger">{this.validator.message('image', nft.image, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="name" placeholder="Item Name *" required="required" onChange={(e) => this.onChange(e)} defaultValue={nft.name} />
                                            <span className="text-danger">{this.validator.message('name', nft.name, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea className="form-control" name="description" placeholder="Description *" cols={30} rows={3} onChange={(e) => this.onChange(e)} defaultValue={nft.description} />
                                            <span className="text-danger">{this.validator.message('description', nft.description, 'required')}</span>
                                        </div>
                                    </div>


                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="currentPrice" placeholder="Item Price *" required="required" onChange={(e) => this.onChange(e)} onKeyDown={(e) => decimalNumberValidator(e)} defaultValue={nft.currentPrice} />
                                            <span className="text-danger">{this.validator.message('currentPrice', nft.currentPrice, 'required')}</span>
                                        </div>
                                    </div> 
                                     <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="number" className="form-control" min="0"  name="royalty" placeholder="royality" required="required" onChange={(e) => this.onChange(e)} defaultValue={nft.royalty} />
                                            <span className="text-danger">{this.validator.message('royalty', nft.royalty, 'required')}</span>
                                        </div>
                                    </div>
                                 
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="number" className="form-control" min="0"  name="size" placeholder="Size" required="required" onChange={(e) => this.onChange(e)} defaultValue={nft.size} />
                                            <span className="text-danger">{this.validator.message('size', nft.size, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="number" className="form-control" min="0" name="copies" placeholder="No. of Copies *" required="required" onKeyDown={(e) => decimalNumberValidator(e)} onChange={(e) => this.onChange(e)} defaultValue={nft.copies} />
                                            <span className="text-danger">{this.validator.message('copies', nft.copies, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group select-wrapper">
                                         
                                            <select className="form-control select-after" id="collection" name="collectionId" onChange={(e) => this.onChange(e)}>
                                                <option value="">Select Collection</option>
                                                {
                                                    collections && collections.map((collection, index) => {
                                                        return (
                                                            <option key={index} value={collection._id}>{collection.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{this.validator.message('collection', nft.collectionId, 'required')}</span>
                                        </div>
                                    </div>
                                 
                                    <div className="col-12 d-flex align-items-center justify-content-center w-100">
                                        <button disabled={loader} className="btn mt-3 mt-sm-4 create-item-btn" type="button" onClick={(e) => this.submit(e)}>Create Item</button>
                                    </div>
                                </div>
                            </form>
                        </div>


                
                        <div className="col-12  preview-nft-wrapper col-md-6 col-sm-12 ">
                        <span class="Top-Sellers-copy">
  Preview
</span>
                            <NFTPreview {...nft} />
                        </div>
                    </div>
                </div> */}
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
                {/* ffffffffffffffff */}
                {/* <div
                  className="upload-image-container"
                  onDrop={(e) => onDrop(e)}
                  onDragOver={(e) => dragOver(e)}
                  onDragEnter={(e) => dragEnter(e)}
                  onDragLeave={(e) => dragLeave(e)}
                >
                  <Upload
                    onFileChange={(e, status) => this.onFileChange(e, status)}
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
                      <span className="browse-files-btn mt-2">browse file</span>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => this.onFileChange(e, "onChange")}
                        accept=".mp4, .png,.jpeg"
                        name="image"
                      />
                    </label>
                  </div>
                </div> */}
                {/* cccccccccccc */}
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
                          browse file
                        </span>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => this.onFileChange(e, "onChange")}
                          accept=".mp4, .png,.jpeg"
                          name="image"
                        />
                      </label>
                      {/* <label>
                        <span className="browse-files-btn mt-2">
                          browse file
                        </span>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => this.onFileChange(e, "onChange")}
                          accept=".mp4, .png,.jpeg"
                          name="image"
                        />
                      </label> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-8 mt-5 mt-sm-0">
                <p className="upload-title">Create</p>
                <div className="nft-inputs-container p-4">
                  <div className="row g-4">
                    <div className="col-12">
                      {/* <label className="create-nft-form-title mb-3">
                        Title
                      </label> */}
                      <input
                        name="name"
                        placeholder="Title"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        value={nft.name}
                        defaultValue={nft.name}
                        autocomplete="off"
                      />
                      <span className="text-danger">
                        {this.validator.message("name", nft.name, "required")}
                      </span>
                    </div>
                    <div className="col-12">
                      {/* <label className="create-nft-form-title mb-3">
                        Description
                      </label> */}
                      <textarea
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
                      {/* <label className="create-nft-form-title mb-3">
                        Item Price
                      </label> */}
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
                    {/* <div className="col-12 col-md-6">
                    <label className="create-nft-form-title mb-3">
                      Category
                    </label>
                    <select name="cars" id="cars" placeholder="Select Category">
                      <option value="select" className="d-none">
                        Select Category
                      </option>
                      <option value="volvo">Volvo</option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div> */}

                    <div className="col-12 col-lg-6">
                      {/* <label className="create-nft-form-title mb-3">Size</label> */}
                      <input
                        name="size"
                        value=""
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
                      {/* <label className="create-nft-form-title mb-3">
                        No. of Copies
                      </label> */}
                      <input
                        name="copies"
                        value=""
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
                      {/* <label className="create-nft-form-title mb-3">
                        Select Collection
                      </label> */}
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
                        <div className="btn-link my-1 text-white">
                          <a>Preview</a>
                        </div>
                        <div className="d-flex  flex-column flex-md-row justify-content-center align-items-center">
                          <button
                            disabled={loader}
                            className="create-collection-btn mt-2 me-2"
                            typ="submit"
                            onClick={(e) => this.submit(e)}
                          >
                            Create Item
                          </button>
                          <button className="btn btn-rounded-bordered cancel-collection-btn mt-2">
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
    // }
  }
}

const mapStateToProps = (state) => (
  console.log(state, "state in colleciton"),
  {
    error: state.error,
    collection: state.collection,
  }
);

export default connect(mapStateToProps, {
  beforeCollection,
  getCollections,
  setNftToken,
  createNFT,
  myCollections,
})(CreateNFT);
