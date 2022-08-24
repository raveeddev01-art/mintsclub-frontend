import "./VideoComponent.css";

const VideoComponent = ({ videoUrl, videoStyles, videoWidth }:any) => {
  return (
    <>
      {videoUrl && (
        <video
          className={`mt-2 ${videoStyles ? "" : "video-view"}`}
          style={{ ...videoStyles }}
          width={videoWidth ? videoWidth : "400"}
          src={videoUrl}
          controls
        ></video>
      )}
    </>
  );
};

export default VideoComponent;
