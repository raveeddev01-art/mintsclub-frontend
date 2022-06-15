import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { ReactComponent as AudioIcon } from "../../../assets/images/audio-icon.svg";
import { WaveformContianer, Wave, PlayButton } from "./Waveform.styled";
import BackgroundImg from "../../../assets/images/audio-bg.svg";

import "./WaveForm.css";

class Waveform extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    playing: false,
  };
  componentDidMount() {
    const track = document.querySelector("#track");

    this.waveform = WaveSurfer.create({
      barWidth: 2,
      cursorWidth: 1,
      container: "#waveform",
      backend: "WebAudio",
      height: 80,
      progressColor: "#FFFFFF",
      responsive: true,
      waveColor: "#838383",
      cursorColor: "transparent",
    });

    this.waveform.load(track);
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  render() {
    return (
      <WaveformContianer
        className="wave-container px-4 px-xl-5"
        style={{ background: `rgba(0, 0, 0, 0.79)` }}
      >
        <PlayButton className="audio-btn" onClick={this.handlePlay}>
          {this.state.playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </PlayButton>
        <div
          className={`${
            this.props.auction ? "d-none" : ""
          } audio-icon-wrapper mt-5`}
        >
          <AudioIcon />
        </div>

        <Wave
          className={`${this.props.auction ? "mt-5" : ""} waves mb-3`}
          id="waveform"
        />
        <audio id="track" src={this.props.url} />
      </WaveformContianer>
    );
  }
}

export default Waveform;
