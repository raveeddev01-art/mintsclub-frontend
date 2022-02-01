import "./AudioPlayer.css";
import ReactAudioPlayer from "react-audio-player";

const AudioPlayer = ({audioSrc}) => {

  return <ReactAudioPlayer src={audioSrc}  controlsList="nodownload" preload="auto"  controls />;
};
export default AudioPlayer;

