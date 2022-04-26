import VideoComponent from "../../videoComponent/videoComponent";
import UploadIcon from "../../../assets/images/uploadIcon.png";
import { MdClose } from "react-icons/md";
import AudioPlayer from "../../audioPlayer/AudioPlayer";
import "./upload.css";
const videoStyles = {
  width: "100%",
  height: "100%",
};

const Upload = ({
  Images,
  onFileChange,
  imageURL,
  onDrop,
  dragOver,
  dragEnter,
  dragLeave,
  videoURL,
  audioSrc,
  clearData,
}) => {
  return (
    <div className="upload-image-border p-4 position-relative">
      <div className="nft-uploaded-img-container">
        {imageURL || videoURL || audioSrc ? (
          <MdClose
            color="#e33d0bc2"
            className="uploaded-cross-icon"
            onClick={() => clearData()}
          />
        ) : (
          ""
        )}
        <label
          className="w-100"
          onDrop={(e) => onDrop(e)}
          onDragOver={(e) => dragOver(e)}
          onDragEnter={(e) => dragEnter(e)}
          onDragLeave={(e) => dragLeave(e)}
        >
          <div className="">
            {imageURL ? (
              <div className="nft-uploaded-img-container">
                {/* <MdClose
                color="#e33d0bc2"
                className="uploaded-cross-icon"
                onClick={() => clearData()}
              /> */}
                <img
                  className="upload-image"
                  src={imageURL}
                  alt="upload-image"
                />
                <img
                  src={UploadIcon}
                  alt="upload-icon"
                  className="nft-upload-icon"
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={onFileChange}
                  accept=".mp4, .png,.jpeg"
                  name="image"
                />
              </div>
            ) : videoURL ? (
              <div className="nft-uploaded-img-container">
                {/* <MdClose color="#e33d0bc2" className="uploaded-cross-icon" /> */}
                <VideoComponent
                  videoUrl={videoURL}
                  videoStyles={videoStyles}
                  videoWidth="300"
                />
                <img
                  src={UploadIcon}
                  alt="upload-icon"
                  className="nft-upload-icon"
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={onFileChange}
                  accept=".mp4, .png,.jpeg"
                  name="image"
                />
              </div>
            ) : audioSrc ? (
              <div className="nft-uploaded-img-container">
                {/* <MdClose color="#e33d0bc2" className="uploaded-cross-icon" /> */}
                <AudioPlayer audioSrc={audioSrc} />
                <img
                  src={UploadIcon}
                  alt="upload-icon"
                  className="nft-upload-icon"
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={onFileChange}
                  accept=".mp4, .png,.jpeg"
                  name="image"
                />
              </div>
            ) : (
              <>
                {" "}
                <img
                  className="upload-image-place-holder"
                  src={Images.uploadImage}
                  alt="upload-image"
                />
                <div className="upload-details text-center mt-2">
                  <p>Drag and drop your file</p>
                  <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
                </div>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => onFileChange(e, "onChange")}
                  accept=".mp4, .png,.jpeg"
                  name="image"
                />
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default Upload;
