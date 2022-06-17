import { ReactComponent as AudioIcon } from "../../assets/images/audio-icon.svg";
import "./audio.css";
const Audio = ({ src, onLoadCallback, loader }) => {

  return (
    <div
      className={`w-100 h-100 audio-container p-3 ${!loader ? "d-flex" : ""} `}
      style={{ display: `${loader ? "none" : "block"}` }}
    >
      <div className="audio-icon">
        <AudioIcon />
      </div>

      <audio
        className="w-100 mt-5"
        onCanPlay={() => {
          onLoadCallback();
        }}
        controls
      >
        <source src={src} />
      </audio>
    </div>
  );
};
export default Audio;
