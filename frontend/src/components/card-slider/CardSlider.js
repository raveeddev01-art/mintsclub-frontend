import React, { Component } from "react";
import Slider from "react-slick";
import "./CardSlider.css";

export default class CardSlider extends Component {
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
    const { settings } = this.props;

    return (
      <div className="container">
        {this.handleArrows() && (
          <div className="text-end">
            <button
              className="card-slider-btn mb-4 me-3"
              onClick={this.previous}
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <button className="card-slider-btn mb-4" onClick={this.next}>
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
