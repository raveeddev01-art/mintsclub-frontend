import React, { Component } from "react";
import Slider from "react-slick";
// import CollectionsCard from "../collections-cards/CollectionsCard";
import SliderNextIcon from "../../assets/images/slidernextArrow.png";
import SliderPrevIcon from "../../assets/images/sliderprevArrow.png";
import AuctionsCards from "../auctions-cards/AuctionsCards";
import "./CardSlider.css";
import TwitchPlayer from "react-player/twitch";
import { data } from "jquery";

export default class CardSlider extends Component {
  // const CardSlider = () => {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  handleArrows = () => {
    const { data, homeAuctions } = this.props;
    if (data && data.length > 0) {
      if (homeAuctions && data.length > 4) {
        return true;
      } else if (!homeAuctions && data.length > 3) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  render() {
    const { settings, data, homeAuction } = this.props;
 

    return (
      <div className="container">
        {this.handleArrows() && (
          <div className="text-end">
            <button
              className="card-slider-btn mb-4 me-3"
              onClick={this.previous}
            >
              {/* <img src={SliderPrevIcon} alt="SliderPrevButton" /> */}
              <i class="fas fa-arrow-left"></i>
            </button>
            <button className="card-slider-btn mb-4" onClick={this.next}>
              {/* <img src={SliderNextIcon} alt="SliderNextButton" /> */}
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        )}
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          {this.props.children}
        </Slider>
      </div>
    );
  }
}
