import "./videoComponent.css";

const VideoComponent = ({ videoUrl, videoStyles, videoWidth }) => {
  return (
    <>
      {videoUrl && (
        <video
          className={`mt-2 ${videoStyles ? "" : "video-view"}`}
          styles={{ ...videoStyles }}
          width={videoWidth ? videoWidth : "400"}
          src={videoUrl}
          controls
        ></video>
      )}
    </>
  );
};

export default VideoComponent;
