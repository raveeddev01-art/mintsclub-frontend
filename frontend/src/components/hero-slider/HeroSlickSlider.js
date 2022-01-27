import React, { Component } from "react";
import Slider from "react-slick";
import HeroCards from "../../Screens/rough/hero-cards/HeroCards";
import "./HeroSlickSlider.css";

export default class HeroSlickSlider extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      centerPadding: "200px",
      slidesToShow: 1,
      focusOnSelect: true,
      dots: false,
      infinite: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 1,
          },
        },
      ],
    };
    return (
      <div>
        <h2>Center Mode</h2>
        <Slider {...settings}>
          <div>
            <HeroCards />
          </div>
          <div>
            <HeroCards />
          </div>
          <div>
            <HeroCards />
          </div>
          <div>
            <HeroCards />
          </div>
          <div>
            <HeroCards />
          </div>
          <div>
            <HeroCards />
          </div>
        </Slider>
      </div>
    );
  }
}
