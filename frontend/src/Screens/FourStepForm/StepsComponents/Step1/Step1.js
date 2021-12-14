import { useState } from "react";
import "./Step1.css";
// import { RiFolderUploadLine} from "react-icons/ri";
import { currentStepAction } from "../../../../redux/actions/actions";
import {BsImageFill} from 'react-icons/bs'
import uploadIcon from "../../../../assets/images/uploadIcon.png";
import { connect } from "react-redux";
import { BsUpload } from "react-icons/bs";

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
        }  if (
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
}

const dragEnter = (e) => {
    e.preventDefault();
}

const dragLeave = (e) => {
    e.preventDefault();
}
const onDrop=(e)=>{
  e.preventDefault();
  setErrorMessage("");
  const files = e.dataTransfer.files[0];
  if(files){

    const type=e.dataTransfer.files[0].type;
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
}

  // console.log(props,"props==>")
  return (
    <div className="">
      <p className="text-white upload-img-title mb-1" >Upload Image</p>

      <p className="text-white testingkkk " style={{fontSize:"14px",padding:"0rem",margin:"0rem"}}>
        File type supported:JPEG/PNG/GIF/MP4 max size 100 MB.{" "}
      </p>
      {videoUrl && (
        <video width="210" controls>
          <source src={videoUrl} />
        </video>
      )}
      <p style={{ color: "red" }}>{errorMessage && errorMessage}</p>
      {!img ? (
        <>
          {!videoUrl && !img && (
            <label className="text-center d-flex mt-2" style={{cursor:"pointer",width:"14vw"}}>
            <div className="file-container text-white d-flex justify-content-center align-items-center mt-2 mb-5"
            onDrop={(e) => onDrop(e)}
            onDragOver={(e) => dragOver(e)}
            onDragEnter={(e) => dragEnter(e)}
            onDragLeave={(e) => dragLeave(e)}
            >
              <div
                className="d-flex h-100 justify-content-center align-items-center "
                style={{ flexDirection: "column",cursor:"pointer" }}
                
              >
                  {/* <RiFolderUploadLine className="upload-icon" /> */}
                  <img className="upload-icon mb-3" src={uploadIcon} />

                  <p style={{ color: "#aaabab",fontSize:"14px",margin:"0rem" }}>
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
          )}
          {videoUrl && (
            <div     onDrop={(e) => onDrop(e)}
            onDragOver={(e) => dragOver(e)}
            onDragEnter={(e) => dragEnter(e)}
            onDragLeave={(e) => dragLeave(e)}>
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
          )}
        </>
      ) : (
        <div className="text-white d-flex  mt-4 mb-5" style={{cursor:"pointer"}}     onDrop={(e) => onDrop(e)}
        onDragOver={(e) => dragOver(e)}
        onDragEnter={(e) => dragEnter(e)}
        onDragLeave={(e) => dragLeave(e)}>
          <label className="text-center position-relative label-parent">
            <img className="selected-file " src={img} alt="uploaded image" style={{cursor:"pointer"}}     />
               <BsImageFill className="position-absolute upload-img-icon" style={{fontSize:"1.2rem",cursor:"pointer"}}/>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={onFileChange}
              accept=".mp4, .png,.jpeg"
            />
          </label>
        </div>
      )}

      <button
        type="button"
        className="btn btn-secondary start-btn mt-5 mb-5"
        onClick={() => onFileUpload()}
      >
        Next
      </button>
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
