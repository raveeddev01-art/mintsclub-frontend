import React from "react";
import { connect } from "react-redux";
import {
  decimalNumberValidator,
  firstInputCharacterSpace,
  formatBytes,
} from "../../utils/functions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENV } from "../../config/config";
import $ from "jquery";
import SimpleReactValidator from "simple-react-validator";
import FullPageLoader from "../../Components/FullPageLoader/FullPageLoader";
import { getCurrentAddress, mintNFt, validateNetwork } from "../../utils/web3";
import "./createNft.scss";
import AddIcon from "../../assets/images/add-icon.svg";
import PropertiesModal from "../../Components/Modals/PropertiesModal/PropertiesModal";
import LevelsModal from "../../Components/Modals/LevelsModal/LevelsModal";
import StatsModal from "../../Components/Modals/StatsModal/StatsModal";
import StatsInfo from "./components/statsinfo";
import LevelsInfo from "./components/levelsinfo";
import PropertiesInfo from "./components/propertiesinfo";
import Banner from "../../Components/Banner/Banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg2.png";
import Select from "react-select";
import OwnCollectionToday from "../../Components/OwnCollectionToday/OwnCollectionToday";
import UploadIcon from "../../assets/images/upload-icon.png";
import UploadWhiteIcon from "../../assets/images/uploadWhiteIcon.png";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import Audio from "../../Components/Audio/Audio";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { createNFTbanner } from "../../utils/exportData";
import axios from "axios";
import { handleRequest, compressImage } from "../../utils/functions";

const placeholderImg = "";

const MintSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#387fff" : "#387fff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

class CreateNFT extends React.Component<
  {
    history: any;
    match: any;
    connectedAddress: string;
  },
  {
    isSubmitted: boolean;
    formValid: boolean;
    loader: boolean;
    errors: any;
    nft: any;
    properties: any;
    levels: any;
    stats: any;
    imageURL: string;
    videoURL: string;
    collections: any;
    allcollections: any;
    error: boolean;
    errorMessage: string;
    audioUrl: string;
    propertiesmodalShow: boolean;
    levelsmodalShow: boolean;
    statsmodalShow: boolean;
    selectedCollection: any;
    isFreeMint: any;
    playerState: any;
    nftInfo: any;
  }
> {
  validator: SimpleReactValidator;
  myRef: any;
  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
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
      selectedCollection: null,
      isFreeMint: false,
      playerState: {
        isPlaying: false,
        progress: 0,
        speed: 1,
        isMuted: false,
      },
      nftInfo: null,
    };
    // const videoElement = this.myRef;

    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      messages: {
        required: "This field is required.", // will override all messages
      },
    });
  }

  componentDidMount = async () => {
    window.scroll(0, 0);
    this.getMyCollections();
    if (!ENV.getUserKeys("_id")._id) {
      this.props.history.push({
        pathname: `/connect-wallet`,
        state: `/create`,
      });
    }

    let ownerAddress = await getCurrentAddress();

    let { nft } = this.state;
    nft = { ...nft, ownerAddress: ownerAddress };
    this.setState({
      nft,
    });
  };

  componentDidUpdate = async (prevProps: any, prevState: any) => {
    const { connectedAddress } = this.props;
   
    if (
      prevProps.connectedAddress !== "" &&
      prevProps.connectedAddress.toUpperCase() !==
        connectedAddress.toUpperCase() &&
      connectedAddress !== ""
    ) {
      toast.info("Please login with new connected account");
      localStorage.clear();
      return this.props.history.push({
        pathname: `/connect-wallet`,
        state: `/create`,
      });
    }
    if (this.state.playerState.isPlaying !== prevState.playerState.isPlaying) {
      this.state.playerState.isPlaying
        ? this.myRef?.current?.play()
        : this.myRef?.current?.pause();
    }
  };
  getMyCollections = async () => {
    const res = await handleRequest(
      "get",
      `collection/myCollectionList?userId=${ENV.getUserKeys("_id")._id}`
    );
    const { Collections: collections } = res.data.data.collections;
    if (!collections.length) {
      toast.info("Please create a collection first");
      // return this.props.history.push("/createcollection");
      this.setState({ loader: false });
    } else {
      let updatedCollections = [];
      for (var item of collections) {
        let obj = {
          value: item._id,
          label: item.name,
          categoryId: item.categoryId,
        };
        updatedCollections.push(obj);
      }
      if (this.props?.match.params.nftId) {
        await this.getNFTInfo(updatedCollections);
      }
      this.setState({
        collections: updatedCollections,
        loader: false,
      });
    }
  };
  getNFTInfo = async (collections: any) => {
    try {
      const res = await handleRequest(
        "get",
        `nfts/get/${this.props?.match.params.nftId}`
      );
      if (res.data.success) {
        const {
          image,
          description,
          name,
          fileType,
          lazyMinted,
          levels,
          properties,
          stats,
          collectionId,
          collection,
          copies,
        } = res?.data.data;

        let selectedCollection = collections.find(
          (item: any) => item.value === collectionId
        );
        let { nft }: any = this.state;
        nft = {
          ...nft,
          name,
          description,
          properties,
          levels,
          stats,
          copies,
          categoryId: collection.categoryId,
          image,
          collectionId: collectionId,
        };
        if (fileType === "image") {
          this.setState({
            isFreeMint: lazyMinted,
            imageURL: image,
            selectedCollection,
            nftInfo: res?.data.data,
          });
        } else if (fileType === "video") {
          this.setState({
            isFreeMint: lazyMinted,
            videoURL: image,
            nftInfo: res?.data.data,
          });
        } else if (fileType === "audio") {
          this.setState({ audioUrl: image, nftInfo: res?.data.data });
        } else {
        }
        this.setState({ nft });
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  insertNFT = async (data: any) => {
    try {
      const res: any = await handleRequest("post", "nfts/storeNFTData", data);
      const { success } = res.data;
      if (success) {
        toast.success("NFT created successfully");
        this.props.history.push("/explore/allNFT");
      } else {
        this.setState({ loader: false });
        toast.error(res.data.message);
      }
    } catch (err: any) {
      this.setState({ loader: false });

      toast.error(err.message);
    }
  };

  togglePlay = () => {
    let test = { ...this.state.playerState };
    test = { ...test, isPlaying: !test.isPlaying };
    this.setState({ playerState: test });
  };

  onChange(e: any, status = null) {
    let { name, value } = e.target;
    if (status) value = status;
    let { nft } = this.state;
    nft = { ...nft, [name]: value };
    this.setState({ nft });
  }
  onChangeSelect = (value: any) => {
    let { nft } = this.state;
    nft = { ...nft, collectionId: value.value, categoryId: value.categoryId };
    this.setState({
      nft,
      selectedCollection: value,
    });
  };

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
      ownerAddress: this.state.nft.ownerAddress,
      status: 1, // 1 = put on sale, 2 = instant sale price, 3 = unlock purchased
    };
    this.setState({ nft });
  };
  capitalize(word: any) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
  submit = async (e: any) => {
    e.preventDefault();
    // if (await validateNetwork()) {
      const { nft, videoURL, audioUrl } = this.state;

      console.log(this.props.connectedAddress);

      let nftInfo: any = { ...nft };
      nftInfo.properties = JSON.stringify(nftInfo.properties);
      nftInfo.levels = JSON.stringify(nftInfo.levels);
      nftInfo.stats = JSON.stringify(nftInfo.stats);
      nftInfo.name = this.capitalize(nftInfo.name);

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
                this.pinFileToIPFS(nft.image, nftInfo);
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
                $("#create-nft").scrollTop(0);
              }
            );
          }
        }
      );
    // } else {
    //   toast.error("Please Connect Your Metamask With Ethereum Goerli Network");
    // }
  };

  mintNFT = async (nftInfo: any, metaData: any, image: any) => {
    
    let data: any = { ...nftInfo };
    data.image = image;
    data.metaData = metaData.metaDataUrl;
    data.remainingCopies = data.copies;
    data.activeAuction = null;

    try {

      let paylaod = {};
      if (!this.state.isFreeMint) {
     //   let createNftResult = await mintNFt(metaData, this.state.nft.copies);


        const { name, copies } = this.state.nft;
        let tokenId = await createNFT({
          assetName: name,
          total: copies,
          metaData,
          
        });
        console.log(tokenId,"tokenId in create nft")

        if (tokenId) {
          paylaod = {
            nftToken: tokenId,
            data,
            image,
            lazyMinted: false,
          };
        }
      } else {
        paylaod = {
          nftToken: (Math.floor(Math.random() * 10000) + 10000)
            .toString()
            .substring(1),
          data,
          image,
          lazyMinted: this.state.isFreeMint,
        };
      }
      this.insertNFT(paylaod);
    } catch (err: any) {
      toast.error(err);
      this.setState({ loader: false });
    }
  };

  editNFT = async (data: any, metaData: any = null, image: any = null) => {
    let payload = { ...data };
    payload.nftId = `${this.props.match.params.nftId}`;
    if (metaData) {
      payload.metaData = metaData;
      payload.image = image;
    }
    let res = await handleRequest("put", "nfts/updateNft", payload);
    if(res.data.success){
      this.props.history.push("/userprofile")
    }
  };

  pinFileToIPFS = async (file: any, nftInfo: any) => {
    let fileUrl: any = "";
    let compressedFileUrl: any = "";
    if (file.name) {
      let originalFile: any = new FormData();
      let compressedFile: any = new FormData();
      let thumbnail = await compressImage(file);
      originalFile.append("file", file);
      compressedFile.append("file", thumbnail);
      console.log(
        formatBytes(thumbnail.size).split(" "),
        "compressed file size"
      );
      const orignalIpfsFile: any = await this.uploadFileToIpfs(originalFile);
      const compressedIpfsFile: any = await this.uploadFileToIpfs(
        compressedFile
      );
      fileUrl = `https://mintsclub.mypinata.cloud/ipfs/${orignalIpfsFile.data.IpfsHash}`;
      compressedFileUrl = `https://mintsclub.mypinata.cloud/ipfs/${compressedIpfsFile.data.IpfsHash}`;
      // const fileOutputData: any = { fileUrl, hash: fileData.data.IpfsHash };
    } else {
      fileUrl = file;
    }
    const metaData: any = await this.uploadJsonToIpfs(fileUrl);
    if (this.props.match.params.nftId) {
      return this.editNFT(
        { ...nftInfo, compressedFile: compressedFileUrl },
        metaData.dataInput.metaDataUrl,
        metaData.image
      );
    }
    this.mintNFT(
      { ...nftInfo, compressedFile: compressedFileUrl },
      metaData.dataInput,
      metaData.image
    );
  };

  uploadFileToIpfs = async (formData: any) => {
    try {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary= ${formData._boundary}`,
          Authorization: `Bearer ${ENV.pinataJWT}`,
        },
      });
      return response;
    } catch (err: any) {
      toast.error(err);
      this.setState({ loader: false });
    }
  };
  uploadJsonToIpfs = async (fileUrl: any) => {
    let dataInput: any = {};
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    let properties = {
      properties: this.state.nft.properties,
      levels: this.state.nft.levels,
      stats: this.state.nft.stats,
    };
    const data = {
      name: this.state.nft.name,
      symbol: "Gamo",
      sellerFeeBasisPoints: 0,
      image: fileUrl,
      description: this.state.nft.description,
      properties: properties,
    };
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${ENV.pinataJWT}`,
        },
      });
      dataInput.ipfsJsonData = data;
      dataInput.metaDataUrl =
        "https://mintsclub.mypinata.cloud/ipfs/" + response.data.IpfsHash;
      dataInput.fileUrl = fileUrl;
      return { dataInput, image: fileUrl };
    } catch (err: any) {
      toast.error(err);
      this.setState({ loader: false });
    }
  };
  deleteNFT = async () => {
    let res = await handleRequest(
      "delete",
      `nfts/delete/${this.props.match.params.nftId}`
    );
  };

  onFileChange = async (e: any, status: any) => {
    if (this.handleFilesValidation(e, status) === "file matched") {
      let file: any = "";
      let url: any = "";
      let fileId: any = "";
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

                reader.onload = function (e: any) {
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
          nft = { ...nft, image: file };

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
      let message: any = this.handleFilesValidation(e, status);
      toast.error(message);
      this.setState({
        error: true,
        errorMessage: message,
      });
    }
  };
  dragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  dragEnter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  dragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  onDrop = (e: { nativeEvent: { preventDefault: () => void } }) => {
    e.nativeEvent.preventDefault();
    if (!e) return;
    this.onFileChange(e, "onDrag");
  };

  handleFilesValidation = (
    e: {
      dataTransfer: { files: { type: string }[] };
      target: { files: { type: string }[] };
    },
    status: string
  ) => {
    let files: any;
    let type: any;
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
        type === "audio/mpeg" ||
        type === "image/webp"
      ) {
        let fileSize = formatBytes(files.size).split(" ");
        if (
          (+fileSize[0] > 100 && fileSize[1] === "MB") ||
          fileSize[1] === "GB"
        ) {
          return "File size limit is exceeded";
        } else {
          return "file matched";
        }
      } else {
        return "File not supported!";
      }
    }
  };

  clearData = () => {
    this.setState({
      imageURL: "",
      audioUrl: "",
      videoURL: "",
    });
  };

  ////property modal handlers

  addMoreValues = (status: string) => {
    if (status === "properties") {
      this.setState({
        properties: [...this.state.properties, { name: "", type: "" }],
      });
    } else if (status === "stats") {
      this.setState({
        stats: [...this.state.stats, { name: "", value: "", total: 5 }],
      });
    } else {
      this.setState({
        levels: [...this.state.levels, { name: "", value: "", total: 5 }],
      });
    }
  };

  handleChange = (
    i: any,
    e: { target: { name: string; value: string } },
    status: string
  ) => {
    if (status === "properties") {
      let newFormValues = [...this.state.properties];
      newFormValues[i][e.target.name] = e.target.value;
      this.setState({
        properties: newFormValues,
      });
    } else if (status === "stats") {
      let newFormValues = [...this.state.stats];
      newFormValues[i][e.target.name] =
        e.target.name === "value" && e.target.value !== ""
          ? +e.target.value
          : e.target.value;
      this.setState({
        stats: newFormValues,
      });
    } else {
      let newFormValues = [...this.state.levels];
      newFormValues[i][e.target.name] =
        e.target.name === "value" && e.target.value !== ""
          ? +e.target.value
          : e.target.value;
      this.setState({
        levels: newFormValues,
      });
    }
  };

  removeFormFields = (i: number, status: string) => {
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

  onSave = (status: string) => {
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
  handleBtnDisable = () => {
    const { image, description, copies, categoryId } = this.state.nft;
    if (!image || !description || !copies || !categoryId) {
      return true;
    } else {
      return false;
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
      selectedCollection,
    } = this.state;
    const { connectedAddress } = this.props;
    console.log(this.props)
    const { onDrop, dragOver, dragEnter, dragLeave } = this;
    if (
      ENV.getUserKeys("address")?.address?.toUpperCase() ===
        connectedAddress?.toUpperCase() ||
      connectedAddress === ""
    ) {
      return (
        <>
          <section className="create-collection create-nft">
            <Banner
              subHeading={createNFTbanner.subHeading}
              heading={createNFTbanner.heading}
              content={createNFTbanner.content}
              bgImg={BannerBg}
              bannerImg={BannerImage}
              bg={true}
            />
            <div className="container">
              {/* <form> */}
              {/* <button onClick={()=>createVoucher()}>create Voucher</button>
              <button onClick={()=>redeemVoucher()}>redeem Voucher</button> */}

              {loader && <FullPageLoader />}

              <div className="row">
                <div className="col-12">
                  <div
                    className="upload-nft-container mb-4 mb-lg-5 mx-auto mx-md-0"
                    onDrop={(e) => onDrop(e)}
                    onDragOver={(e) => dragOver(e)}
                    onDragEnter={(e) => dragEnter(e)}
                    onDragLeave={(e) => dragLeave(e)}
                  >
                    {imageURL ? (
                      <label className="w-100">
                        <div className="uploaded-img-container px-sm-0 px-2 mx-auto">
                          <label>
                            <input
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => this.onFileChange(e, "onChange")}
                              accept=".mp4, .png,.jpeg"
                              name="image"
                            />
                          </label>
                          <img className="uploaded-img" src={imageURL} />
                          <div className="upload-icon-container uploaded-img-content text-center">
                            <img
                              src={UploadWhiteIcon}
                              alt="upload"
                              className="mb-1 mt-4"
                            />
                            <h6 className="mb-1 text-white">
                              Drag and drop your files
                            </h6>
                            <p className="mb-1 text-white">
                              PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                            </p>
                            <div className="mx-3 my-1">
                              <span className="text-white">|</span>
                              <h6 className="text-white">OR</h6>
                              <span className="text-white">|</span>
                            </div>
                            <span className="btn uploaded-img-browse upload-nft-btn ">
                              Browse File
                            </span>
                            <span className="text-danger text-center mt-3">
                              {this.validator.message(
                                "image",
                                nft.image,
                                "required"
                              )}
                            </span>
                          </div>
                        </div>
                      </label>
                    ) : videoURL ? (
                      <>
                        <div className="uploaded-img-container">
                          <div className="create-nft-video-container px-sm-0 px-2 mx-auto">
                            <video
                              src={videoURL}
                              ref={this.myRef}
                              // onTimeUpdate={handleOnTimeUpdate}
                            />
                            <div className="controls">
                              <div className="actions">
                                <button
                                  className="play-pause-btn d-flex align-items-center justify-content-center"
                                  onClick={() => this.togglePlay()}
                                >
                                  {this.state.playerState.isPlaying ? (
                                    <BsFillPauseFill />
                                  ) : (
                                    <BsFillPlayFill />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <label className="video-upload-label">
                            <div className="uploaded-video-container mx-auto">
                              <label>
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={(e) =>
                                    this.onFileChange(e, "onChange")
                                  }
                                  accept=".mp4, .png,.jpeg,.mp3"
                                  name="image"
                                />
                              </label>

                              <div className="upload-icon-container uploaded-video-content text-center">
                                <img
                                  src={UploadWhiteIcon}
                                  alt="upload"
                                  className="mb-1 mt-4"
                                />
                                <h6 className="mb-1 text-white">
                                  Drag and drop your files
                                </h6>
                                <p className="mb-1 text-white">
                                  PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                                </p>
                                <div className="mx-3 my-1">
                                  <span className="text-white">|</span>
                                  <h6 className="text-white">OR</h6>
                                  <span className="text-white">|</span>
                                </div>
                                <span className="btn uploaded-img-browse upload-nft-btn ">
                                  Browse File
                                </span>
                              </div>
                              <span className="text-danger text-center mt-3">
                                {this.validator.message(
                                  "image",
                                  nft.image,
                                  "required"
                                )}
                              </span>
                            </div>
                          </label>
                        </div>
                      </>
                    ) : audioUrl ? (
                      <>
                        <div className="uploaded-img-container">
                          <div className="create-nft-video-container px-sm-0 px-2 mx-auto">
                            {/* <Waveform url={audioUrl} auction={false} /> */}
                            <Audio
                              src={audioUrl}
                              onLoadCallback={function (): {} {
                                throw new Error("Function not implemented.");
                              }}
                              loader={false}
                              fileType={""}
                            />
                          </div>
                          <label className="video-upload-label">
                            <div className="uploaded-video-container mx-auto">
                              <label>
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={(e) =>
                                    this.onFileChange(e, "onChange")
                                  }
                                  accept=".mp4, .png,.jpeg,.mp3"
                                  name="image"
                                />
                              </label>

                              <div className="upload-icon-container uploaded-video-content text-center">
                                <img
                                  src={UploadWhiteIcon}
                                  alt="upload"
                                  className="mb-1 mt-4"
                                />
                                <h6 className="mb-1 text-white">
                                  Drag and drop your files
                                </h6>
                                <p className="mb-1 text-white">
                                  PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                                </p>
                                <div className="mx-3 my-1">
                                  <span className="text-white">|</span>
                                  <h6 className="text-white">OR</h6>
                                  <span className="text-white">|</span>
                                </div>
                                <span className="btn uploaded-img-browse upload-nft-btn ">
                                  Browse File
                                </span>
                              </div>
                              <span className="text-danger text-center mt-3">
                                {this.validator.message(
                                  "image",
                                  nft.image,
                                  "required"
                                )}
                              </span>
                            </div>
                          </label>
                        </div>
                      </>
                    ) : (
                      <label className="w-100">
                        <div className="upload-icon-container text-center ">
                          <img src={UploadIcon} alt="upload" className="mb-2" />
                          <h6 className="mb-2">Drag and drop your files</h6>
                          <p className="mb-2">
                            PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                          </p>
                          <div className="">
                            <span>|</span>
                            <h6>OR</h6>
                            <span>|</span>
                          </div>

                          <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => this.onFileChange(e, "onChange")}
                            accept=".mp4, .png,.jpeg,.mp3"
                            name="image"
                          />
                          <span className="btn btn-linear-gradient upload-nft-btn text-white mt-3">
                            Browse File
                          </span>
                          <span className="text-danger text-center mb-3">
                            {this.validator.message(
                              "image",
                              nft.image,
                              "required"
                            )}
                          </span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="create-collection-label d-flex">
                    Title:*{" "}
                    <span className="text-danger ms-2">
                      {this.validator.message("name", nft.name, "required")}
                    </span>
                  </label>
                  <input
                    className="create-collection-input mt-2"
                    name="name"
                    placeholder="Enter title"
                    required={true}
                    maxLength={100}
                    minLength={3}
                    onKeyDown={(e) =>
                      firstInputCharacterSpace(e, nft.name.length)
                    }
                    onChange={(e) => {
                      if (
                        nft?.name.trim() === "" &&
                        e.target.value.includes(".")
                      ) {
                        return false;
                      }
                      this.onChange(e);
                    }}
                    value={nft.name}
                    autoComplete="off"
                  />
                </div>

                <div className="col-lg-4 col-md-6 mt-3 mt-md-0">
                  <label className="create-collection-label d-flex">
                    No of Copies:* (Max 1M)
                    <span className="text-danger ms-2">
                      {this.validator.message("name", nft.copies, "required")}
                    </span>
                  </label>
                  <input
                    className="create-collection-input mt-2"
                    name="copies"
                    placeholder="No. of Copies"
                    type="text"
                    autoComplete="off"
                    required={true}
                    onKeyDown={(e) => decimalNumberValidator(e)}
                    onChange={(e) => {
                      if (
                        (e.target.value.length && e.target.value === "0") ||
                        e.target.value.includes(".") ||
                        +e.target.value > 1000000
                      ) {
                        return false;
                      } else {
                        this.onChange(e);
                      }
                    }}
                    value={nft.copies}
                  />
                </div>

                <div className="col-lg-4 col-md-6 mt-3 mt-lg-0">
                  <label className="create-collection-label d-flex">
                    Select Collection:*
                    <span className="text-danger ms-2">
                      {this.validator.message(
                        "name",
                        nft.collectionId,
                        "required"
                      )}
                    </span>
                  </label>

                  <Select
                    className="react-select-cls"
                    classNamePrefix="react-select"
                    placeholder="Select Collection"
                    isSearchable={false}
                    value={selectedCollection}
                    name="collectionId"
                    onChange={this.onChangeSelect}
                    options={collections}
                  />
                </div>
                <div className="col-12 mt-3 mt-lg-5">
                  <label className="create-collection-label d-flex">
                    Description:*{" "}
                    <span className="text-danger ms-2">
                      {this.validator.message(
                        "description",
                        nft.description,
                        "required"
                      )}
                    </span>
                  </label>

                  <textarea
                    className="create-collection-area mt-2"
                    name="description"
                    rows={3}
                    placeholder="Max 500 characters"
                    maxLength={500}
                    onChange={(e: any) => {
                      if (
                        nft?.description.trim() === "" &&
                        e.target.value.includes(".")
                      ) {
                        return false;
                      }
                      this.onChange(e);
                    }}
                    onKeyDown={(e) =>
                      firstInputCharacterSpace(e, nft?.description.length)
                    }
                    value={nft.description}
                  ></textarea>
                </div>
                <div className="col-12 col-lg-6 mt-3 mt-lg-5">
                  <label className="create-collection-label">Properties:</label>
                  <div className="create-collection-input mt-2 d-flex align-items-center justify-content-between">
                    <div className="properties-content">
                      <p>Add Properties</p>
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
                  <div className="nft-properties-container mx-2 mt-3">
                    <div className="row g-2">
                      {this.state.nft.properties.map(
                        (item: { name: any; type: any }) => {
                          return (
                            <div className="col-md-6">
                              <PropertiesInfo
                                name={item.name}
                                type={item.type}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-3 mt-lg-5">
                  <label className="create-collection-label">Levels:</label>
                  <div className="create-collection-input mt-2 d-flex align-items-center justify-content-between">
                    <div className="properties-content">
                      <p>Add Levels</p>
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
                  <div className="nft-level-container mx-3 mt-3 ">
                    {this.state.nft.levels.map(
                      (item: { name: any; value: any }) => {
                        return (
                          <LevelsInfo name={item.name} value={item.value} />
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-3 ">
                  <label className="create-collection-label">Stats:</label>
                  <div className="create-collection-input mt-2 d-flex align-items-center justify-content-between">
                    <div className="properties-content">
                      <p>Add Stats</p>
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
                  <div className="nft-stat-container mx-2 mt-3">
                    {this.state.nft.stats.map(
                      (item: { name: any; value: any }) => {
                        return (
                          <StatsInfo name={item.name} value={item.value} />
                        );
                      }
                    )}
                  </div>
                </div>
                {!this.props.match.params.nftId && (
                  <div className="col-12 col-lg-6 mt-3 d-flex align-items-center justify-content-between px-3">
                    <div>
                      <label className="create-collection-label ms-0">
                        Free minting
                      </label>
                      <p>Buyer will pay gas fess for minting</p>
                    </div>
                    <MintSwitch
                      checked={this.state.isFreeMint}
                      onChange={() => {
                        this.setState({ isFreeMint: !this.state.isFreeMint });
                      }}
                      inputProps={{ "aria-label": "mint" }}
                    />
                  </div>
                )}

                <div className="create-collection-btn-container">
                  <button
                    className="btn create-collection-btn btn-linear-gradient mt-5"
                    disabled={this.handleBtnDisable()}
                    onClick={(e) => this.submit(e)}
                  >
                  { !this.props.match.params.nftId?"Create NFT":"Save Changes"}
                  </button>
                </div>
              </div>
              {/* </form> */}
            </div>
          </section>

          {/* <button onClick={() => this.deleteNFT()}>Delete</button> */}
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
          <OwnCollectionToday />
        </>
      );
    } else {
      console.log("breaking here")
      toast.info("Please login with new connected account");
      this.props.history.push({
        pathname: `/connect-wallet`,
        state: `/create`,
      });
      return " ";
    }
  }
}

const mapStateToProps = (state: { wallet: { connectedAddress: any } }) => ({
  connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(CreateNFT);
