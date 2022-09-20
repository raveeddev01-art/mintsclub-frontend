import { useState } from "react";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg2.png";
import Banner from "../../Components/Banner/Banner";
import UploadIcon from "../../assets/images/upload-icon.png";
import { ReactComponent as BinIcon } from "../../assets/images/bin.svg";
import { ReactComponent as ZipFileIcon } from "../../assets/images/zip-file.svg";
import ProgressBar from "react-bootstrap/ProgressBar";
import Select from "react-select";
import { toast } from "react-toastify";
import { formatBytes } from "../../utils/functions";
import "./createMultipleNFT.scss";
import { Link } from "react-router-dom";
import { uploadToS3Bucket } from "../../utils/s3Bucket";

const options = [
  { value: "Ethereum", label: "Ethereum" },
  { value: "Algorand", label: "Algorand" },
  { value: "Solana", label: "Solana" },
];

const bannerContent = {
  subHeading: "Get Started",
  heading: "Create Multiple NFT",
  content:
    "If you want to share your NFT with a large number of community members",
};
const placeholderImg = "";

function CreateMultipleNFT() {
  const [checkBox, setCheckBox] = useState<any>(false);
  const [fileName, setFileName] = useState<string>("File Name");
  const [uploadStatus, setUploadStatus] = useState<any>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [selectedCollectionType, setSelectedCollectionType] =
    useState<any>(null);
  const [selectedChain, setSelectedChain] = useState<any>(null);
  const [batchFile, setBatchFile] = useState<any>({
    file: "",
    chainType: "",
    collection: "",
    nftCollectionType: "",
  });

  // const dragOver = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  // };

  // const dragEnter = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  // };

  // const dragLeave = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  // };
  // const onDrop = (e: { nativeEvent: { preventDefault: () => void } }) => {
  //   e.nativeEvent.preventDefault();
  //   if (!e) return;
  //   onFileChange(e, "onDrag");
  // };

  const handleFilesValidation = (
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
      if (type === "application/zip") {
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
        toast.error("File not supported!");
      }
    }
  };

  const onFileChange = (e: any, status: any) => {
    if (handleFilesValidation(e, status) === "file matched") {
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
        if (file.type.includes("zip")) {
          setUploadStatus(true);
          setBatchFile({ ...batchFile, file: file });
          setFileName(file.name);
          setError(false);
          setErrorMessage("");
          toast.success("File successfully added");
        }
    } else {
      let message: any = handleFilesValidation(e, status);
      toast.error(message);
      setError(true);
      setErrorMessage(message);
    }
  };
  const submit = async () => {
    let uploadFile = await uploadToS3Bucket(
      batchFile.file,
      batchFile.file.name
    );
    console.log(uploadFile, "uploadFile==>");
  };
  return (
    <div className="create-multiple-nft">
      <Banner
        subHeading={bannerContent.subHeading}
        heading={bannerContent.heading}
        content={bannerContent.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
        bg={true}
      />
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              <label className="w-100 mb-3">Upload</label>
              <div className="upload-icon-container text-center ">
                <img src={UploadIcon} alt="upload" className="mb-2" />
                <h6 className="mb-2">Drag and drop your files</h6>
                <p className="mb-2">PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
                <div className="">
                  <span>|</span>
                  <h6>OR</h6>
                  <span>|</span>
                </div>
                <input
                  type="file"
                  onChange={(e) => onFileChange(e, "onChange")}
                  accept=".zip"
                  name="zip"
                />
                <span className="btn btn-linear-gradient upload-nft-btn text-white mt-3">
                  Browse File
                </span>
                <span className="text-danger text-center mb-3">
                  {/* {this.validator.message("image", nft.image, "required")} */}
                </span>
              </div>
              {uploadStatus && (
                <div className="upload-file-wapper">
                  <div className="d-flex align-items-center">
                    <ZipFileIcon />
                    <div className="ms-4">
                      <p>
                        Uploading Zip File : <span>{fileName}</span>
                      </p>
                      <ProgressBar now={60} />
                    </div>
                  </div>
                  <button onClick={() => setUploadStatus(false)}>
                    <BinIcon />
                  </button>
                </div>
              )}
            </div>
            <div className="col-lg-4 col-md-6 mt-3 mt-lg-0">
              <label className="create-collection-label d-flex">
                Select Chain:*
                <span className="text-danger ms-2"></span>
              </label>
              <Select
                className="react-select-cls"
                classNamePrefix="react-select"
                placeholder="Select Chain"
                isSearchable={false}
                value={selectedChain}
                name="chainType"
                onChange={(value: any) => {
                  setSelectedChain(value);
                  setBatchFile({ ...batchFile, chainType: value.value });
                }}
                options={options}
              />
            </div>
            <div className="col-lg-4 col-md-6 mt-3 mt-lg-0">
              <label className="create-collection-label d-flex">
                Select Collection:*
                <span className="text-danger ms-2"></span>
              </label>
              <Select
                className="react-select-cls"
                classNamePrefix="react-select"
                placeholder="Select Collection"
                isSearchable={false}
                value={selectedCollection}
                name="collection"
                onChange={(value: any) => {
                  setSelectedCollection(value);
                  setBatchFile({
                    ...batchFile,
                    collection: value.value,
                  });
                }}
                options={options}
              />
            </div>
            <div className="col-lg-4 col-md-6 mt-3 mt-lg-0">
              <label className="create-collection-label d-flex">
                NFT Collection Type:*
                <span className="text-danger ms-2"></span>
              </label>
              <Select
                className="react-select-cls"
                classNamePrefix="react-select"
                placeholder="NFT Collection Type"
                isSearchable={false}
                value={selectedCollectionType}
                name="collectionType"
                onChange={(value: any) => {
                  setSelectedCollectionType(value);
                  setBatchFile({
                    ...batchFile,
                    nftCollectionType: value.value,
                  });
                }}
                options={options}
              />
            </div>
            <div className="col-12">
              <div className="second-section">
                <h5>
                  When uploadng your collection please take note of the
                  following:
                </h5>
                <ul>
                  <li>Only png or jpeg image file types</li>
                  <li>All meadata must be in a json format</li>
                  <li>Please make sure you zip the folder and upload</li>
                  <li>
                    Download our sample json file to get the corrrect format of
                    metadata. This will help to prevent any issues thatmay
                    hinder your collectionsdisplay and listing properties.{" "}
                  </li>
                </ul>
                <Link to="/files/test.json" target="_blank" download>
                  <button className="download">
                    Download sample json file
                  </button>
                </Link>
                <div className="checkbox-container d-flex align-items-start mt-5">
                  {checkBox ? (
                    <span
                      className="custom-check-box me-4"
                      onClick={() => setCheckBox(!checkBox)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="10"
                      >
                        <path
                          fill-rule="evenodd"
                          fill="#182338"
                          d="M11.356.624c.034.009-.617.141-.838.368-1.93 1.93-3.692 3.823-5.546 5.712L2.794 4.961h-.001a1.223 1.223 0 0 0-.897-.26c-.321.036-.616.198-.116.45-.904.252-.997.574-.962 1.309.036-.093.342.201.451.403l3.049 2.434a1.218 1.218 0 0 0 1.626-.095C8.138 7.8 10.103 4.854 12.246 2.71A1.22 1.22 0 0 0 12.24.967c.16-.229-.555-.352-.884-.343z"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className="custom-check-box me-4"
                      onClick={() => setCheckBox(!checkBox)}
                    ></span>
                  )}
                  <p>
                    I agree to all terms and conditions of the Mintsclub web
                    platform and duly accept the entire copyright agreement
                    included in the terms and conditions secttion of the
                    platform
                  </p>
                </div>
              </div>
              <button
                className="btn upload btn-linear-gradient mt-5"
                disabled={!checkBox}
                onClick={() => submit()}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMultipleNFT;
