import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { WaveformContianer, Wave, PlayButton } from "./Waveform.styled";
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
      progressColor: "#000",
      responsive: true,
      waveColor: "#9c9c9c",
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
      <div className="create-nft-audio-container">
        <WaveformContianer>
          <PlayButton className="audio-btn" onClick={this.handlePlay}>
            {this.state.playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
          </PlayButton>
          <Wave id="waveform" />
          <audio id="track" src={this.props.url} />
        </WaveformContianer>
      </div>
    );
  }
}

export default Waveform;
