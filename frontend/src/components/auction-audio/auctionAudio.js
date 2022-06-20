import { ReactComponent as AudioIcon } from "../../assets/images/audio-icon.svg";
import "./auctionAudio.css";
<<<<<<< HEAD
const AuctionAudio = ({ src, onLoadCallback, loader }) => {
=======

const AuctionAudio = ({ src, onLoadCallback,loader }) => {
>>>>>>> 9658a75e3b09e057542327905fc4b3ba2083f6bc
  return (
    <div
      className="w-100 h-100 auction-audio-container p-4"
      style={{ display: `${!loader ? "flex" : "none"}` }}
    >
      <div className="w-100 audio-wrapper">
        <div className="auction-audio-icon">
          <AudioIcon />
        </div>

        <audio
          className="w-100 mt-4 auction-audio-tag"
          onCanPlay={() => {
            onLoadCallback();
          }}
          controls
          controlsList="nodownload noplaybackrate"
        >
          <source src={src} />
        </audio>
      </div>
      <div></div>
    </div>
  );
};
export default AuctionAudio;
