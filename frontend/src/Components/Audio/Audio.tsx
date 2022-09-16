import { FC } from "react";
import { ReactComponent as AudioIcon } from "../../assets/images/audio-icon.svg";
import { AudioInterface } from "../../interfaces/components";
import "./Audio.scss";
const Audio: FC<AudioInterface> = ({ src, onLoadCallback, loader }) => {
  return (
    <div
      className={`w-100 h-100 audio-container py-4 px-3 ${
        !loader ? "d-flex" : ""
      } `}
      style={{ display: `${loader ? "none" : "flex"}` }}
    >
      <div className="audio-icon d-flex align-items-center justify-content-center h-50">
        <AudioIcon />
      </div>

      <audio
        className="w-100 mt-5"
        onCanPlay={() => {
          onLoadCallback();
        }}
        controls
        controlsList="nodownload noplaybackrate"
      >
        <source src={src} />
      </audio>
    </div>
  );
};
export default Audio;
