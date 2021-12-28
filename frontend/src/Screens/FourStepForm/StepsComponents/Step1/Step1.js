import { useState } from "react";
import "./Step1.css";
// import { RiFolderUploadLine} from "react-icons/ri";
import { currentStepAction } from "../../../../redux/actions/actions";
import { BsImageFill } from "react-icons/bs";
import uploadIcon from "../../../../assets/images/uploadIcon.png";
import { connect } from "react-redux";
import { BsUpload } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Grid, IconButton, Typography } from "@mui/material";
import { ProgressBar } from "react-bootstrap";

const Step1 = (props) => {
  const [file, setFile] = useState("");
  const [img, setImage] = useState(props.imageURl);
  const [errorMessage, setErrorMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState(props.videoURL);
  // console.log(process.env,"config.baseurl===>")

  const onFileChange = (event) => {
    setErrorMessage("");

    if (event.target.files[0]) {
      // console.log(event.target.files[0], "event.target.files[0]==>");

      let type = event.target.files[0].type;
      // console.log(type,"typee")
      if (
        type === "image/jpeg" ||
        type === "image/png" ||
        type === "image/gif" ||
        type === "video/mp4"
      ) {
        let fileSize = formatBytes(event.target.files[0].size).split(" ");
        if (+fileSize[0] > 100 && fileSize[1] === "MB") {
          setErrorMessage("File size limit is exceeded");
        } else {
          let url = URL.createObjectURL(event.target.files[0]);
          if (event.target.files[0].type === "video/mp4") {
            setVideoUrl(url);
            setImage("");
          } else {
            setImage(url);
            setVideoUrl("");
            // console.log(formatBytes(event.target.files[0].size).split(' ') ,"event.target.files[0]==>")
            setFile(event.target.files[0]);
          }
        }
        if (
          type === "image/jpeg" ||
          type === "image/png" ||
          type === "image/gif" ||
          type === "video/mp4"
        ) {
          let fileSize = formatBytes(event.target.files[0].size).split(" ");
          if (+fileSize[0] > 100 && fileSize[1] === "MB") {
            setErrorMessage("File size limit is exceeded");
          } else {
            let url = URL.createObjectURL(event.target.files[0]);
            if (event.target.files[0].type === "video/mp4") {
              setVideoUrl(url);
              setImage("");
            } else {
              setImage(url);
              setVideoUrl("");
              // console.log(formatBytes(event.target.files[0].size).split(' ') ,"event.target.files[0]==>")
              setFile(event.target.files[0]);
            }
          }
        } else {
          setErrorMessage("File not supported!");
        }
      } else {
        setErrorMessage("File not supported!");
      }
    }
  };
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // On file upload (click the upload button)
  const onFileUpload = () => {
    if (img === "" && videoUrl === "") {
      setErrorMessage("Please upload a file");
      return "";
    }
    // console.log(file);
    props.handleStep1Info(file, videoUrl, img);
    props.currentStepAction();
  };
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };
  const onDrop = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const files = e.dataTransfer.files[0];
    if (files) {
      const type = e.dataTransfer.files[0].type;
      console.log(files);
      if (
        type === "image/jpeg" ||
        type === "image/png" ||
        type === "image/gif" ||
        type === "video/mp4"
      ) {
        let fileSize = formatBytes(files.size).split(" ");
        if (+fileSize[0] > 100 && fileSize[1] === "MB") {
          setErrorMessage("File size limit is exceeded");
        } else {
          let url = URL.createObjectURL(files);
          if (files.type === "video/mp4") {
            setVideoUrl(url);
            setImage("");
          } else {
            setImage(url);
            setVideoUrl("");
            // console.log(formatBytes(e.target.files[0].size).split(' ') ,"e.target.files[0]==>")
            setFile(files);
          }
        }
      } else {
        setErrorMessage("File not supported!");
      }
    }
  };

  const removeVideo = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setVideoUrl("");
  };

  const removeImage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setImage("");
  };

  // console.log(props,"props==>")
  return (
    <div className="">
      <p className="text-white upload-img-title mb-1">Upload Asset</p>
      <p
        className="text-white testingkkk "
        style={{ fontSize: "14px", padding: "0rem", margin: "0rem" }}
      >
        File type supported:JPEG/PNG/GIF/MP4 max size 100 MB.{" "}
      </p>
      {videoUrl && (
        <div
          className="position-relative"
          style={{ width: "210px" }}
          onDrop={(e) => onDrop(e)}
          onDragOver={(e) => dragOver(e)}
          onDragEnter={(e) => dragEnter(e)}
          onDragLeave={(e) => dragLeave(e)}
        >
          <video
            className="mt-4"
            width="210"
            controls
            onDrop={(e) => onDrop(e)}
            onDragOver={(e) => dragOver(e)}
            onDragEnter={(e) => dragEnter(e)}
            onDragLeave={(e) => dragLeave(e)}
          >
            <source src={videoUrl} />
          </video>
          <MdClose
            color="#e33d0bc2"
            className=""
            onClick={removeVideo}
            style={{
              fontSize: "2.5rem",
              cursor: "pointer",
              top: "28px",
              right: "4px",
              position: "absolute",
              zIndex: 99,
            }}
          />
        </div>
      )}
      <p style={{ color: "red" }}>{errorMessage && errorMessage}</p>
      <Grid container style={{ justifyContent: "space-between" }}>
        <Grid item md={6}>
          {!img ? (
            <>
              {!videoUrl && !img && (
                <>
                  <label
                    className="text-center d-flex mt-2"
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="file-container text-white d-flex justify-content-center align-items-center mt-2 mb-5"
                      onDrop={(e) => onDrop(e)}
                      onDragOver={(e) => dragOver(e)}
                      onDragEnter={(e) => dragEnter(e)}
                      onDragLeave={(e) => dragLeave(e)}
                    >
                      <div
                        className="d-flex h-100 justify-content-center align-items-center "
                        style={{ flexDirection: "column", cursor: "pointer" }}
                      >
                        {/* <RiFolderUploadLine className="upload-icon" /> */}
                        <img className="upload-icon mb-3" src={uploadIcon} />

                        <p
                          style={{
                            color: "#aaabab",
                            fontSize: "14px",
                            margin: "0rem",
                          }}
                        >
                          Add photo or video <br /> or Drag and drop
                        </p>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={onFileChange}
                          accept=".mp4, .png,.jpeg"
                        />
                      </div>
                    </div>
                  </label>
                  <div
                    onDrop={(e) => onDrop(e)}
                    onDragOver={(e) => dragOver(e)}
                    onDragEnter={(e) => dragEnter(e)}
                    onDragLeave={(e) => dragLeave(e)}
                    className="mb-4"
                  >
                    <label>
                      <div
                        className="d-flex align-items-center justify-content-center mb-3"
                        style={{
                          backgroundColor: "#001d43",
                          width: "13.2rem",
                          height: "3rem",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <BsUpload
                          style={{ fontSize: "1.4rem", color: "white" }}
                        />
                      </div>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={onFileChange}
                        accept=".mp4, .png,.jpeg"
                        onDrop={(e) => onFileChange(e)}
                        onDragOver={(e) => onFileChange(e)}
                        onDragEnter={(e) => onFileChange(e)}
                        onDragLeave={(e) => onFileChange(e)}
                      />
                    </label>
                  </div>
                </>
              )}
              {videoUrl && (
                <div
                  onDrop={(e) => onDrop(e)}
                  onDragOver={(e) => dragOver(e)}
                  onDragEnter={(e) => dragEnter(e)}
                  onDragLeave={(e) => dragLeave(e)}
                >
                  <label>
                    <div
                      className="d-flex align-items-center justify-content-center mb-3"
                      style={{
                        backgroundColor: "#001d43",
                        width: "13.2rem",
                        height: "3rem",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <BsUpload
                        style={{ fontSize: "1.4rem", color: "white" }}
                      />
                    </div>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={onFileChange}
                      accept=".mp4, .png,.jpeg"
                      onDrop={(e) => onFileChange(e)}
                      onDragOver={(e) => onFileChange(e)}
                      onDragEnter={(e) => onFileChange(e)}
                      onDragLeave={(e) => onFileChange(e)}
                    />
                  </label>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className="text-white d-flex  mt-4 mb-5"
                style={{ cursor: "pointer" }}
                onDrop={(e) => onDrop(e)}
                onDragOver={(e) => dragOver(e)}
                onDragEnter={(e) => dragEnter(e)}
                onDragLeave={(e) => dragLeave(e)}
              >
                <label className="text-center position-relative label-parent">
                  <MdClose
                    color="#e33d0bc2"
                    className=""
                    onClick={removeImage}
                    style={{
                      fontSize: "2.5rem",
                      cursor: "pointer",
                      top: 0,
                      right: 0,
                      position: "absolute",
                      zIndex: 99,
                    }}
                  />
                  <img
                    className="selected-file "
                    src={img}
                    alt="uploaded image"
                    style={{ cursor: "pointer" }}
                  />

                  <BsImageFill
                    className="position-absolute upload-img-icon"
                    style={{ fontSize: "1.2rem", cursor: "pointer" }}
                  />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={onFileChange}
                    accept=".mp4, .png,.jpeg"
                  />
                </label>
              </div>
              <div
                onDrop={(e) => onDrop(e)}
                onDragOver={(e) => dragOver(e)}
                onDragEnter={(e) => dragEnter(e)}
                onDragLeave={(e) => dragLeave(e)}
                className="mb-4"
              >
                <label>
                  <div
                    className="d-flex align-items-center justify-content-center mb-3"
                    style={{
                      backgroundColor: "#001d43",
                      width: "13.2rem",
                      height: "3rem",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <BsUpload style={{ fontSize: "1.4rem", color: "white" }} />
                  </div>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={onFileChange}
                    accept=".mp4, .png,.jpeg"
                    onDrop={(e) => onFileChange(e)}
                    onDragOver={(e) => onFileChange(e)}
                    onDragEnter={(e) => onFileChange(e)}
                    onDragLeave={(e) => onFileChange(e)}
                  />
                </label>
              </div>
            </>
          )}
        </Grid>
        <Grid item md={5}>
          <Typography className="text-white" textAlign="justify">
            <strong>Do you know? </strong>
            10% of the world’s GDP will be tokenized by 2027. Source: World
            Economic Forum InvoBlox is your biggest cheerleader and empowers you
            to become part of the 24$ trillion token industry for FREE! Let’s be
            partners and create the digital awesomeness the world awaits …
            (What’s your plan?)
          </Typography>
        </Grid>
      </Grid>
      <button
        type="button"
        className="btn btn-secondary start-btn mt-5 mt-md-3 mt-lg-0"
        onClick={() => onFileUpload()}
      >
        Next
      </button>
      <div
        className="progress-bar-custom"
        style={{ width: "64%", margin: "4rem auto 0 auto" }}
      >
        <ProgressBar
          className={`${
            props.currentStep === 4
              ? "progress-bar-green"
              : "progress-bar-yellow"
          }`}
          now={props.currentStep * 25}
        />
        <p className="text-white text-center mt-2">{props.currentStep}/4</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) =>
  // console.log(state, "state"),
  ({
    currentStep: state.dashboard.currentStep,
  });

export default connect(mapStateToProps, {
  currentStepAction,
})(Step1);
