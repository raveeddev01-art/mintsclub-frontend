import "./slider.css";
import { useState } from "react";
import HeroCards from "../../hero-cards/HeroCards";
import SliderNextIcon from "../../../assets/images/slidernextArrow.png";
import SliderPrevIcon from "../../../assets/images/sliderprevArrow.png";
import AuctionsCards from "../../auctions-cards/AuctionsCards";
import { map } from "jquery";

const Slider = ({
  setHandler,
  sliderRadioButtons,
  handleRadioInputs,
  sliderChecked,
}) => {
  return (
    <section id="slider">
      {sliderRadioButtons.map((item) => {
        return (
          <input
            type="radio"
            name="slider"
            value={item.value}
            checked={sliderChecked === item.value}
            onChange={(e) => handleRadioInputs(e)}
            id={item.id}
          />
        );
      })}
      <label for="s1" id="slide1" onClick={() => setHandler(1)}>
        <HeroCards className="slide" />
        {/* <img
          src="https://i.pinimg.com/originals/2b/de/de/2bdede0647e3cdf75b44ea33723201d9.jpg"
          alt=""
        /> */}
      </label>
      <label for="s2" id="slide2" onClick={() => setHandler(2)}>
        <HeroCards className="slide" />
        {/* <AuctionsCards className="slide" /> */}
        {/* <img
          src="https://images6.alphacoders.com/462/thumb-1920-462371.jpg"
          alt=""
        /> */}
      </label>
      <label for="s3" id="slide3" onClick={() => setHandler(3)}>
        <HeroCards className="slide" />
        {/* <img src="https://wallpaperaccess.com/full/1154341.jpg" alt="" /> */}
      </label>
      <label for="s4" id="slide4" onClick={() => setHandler(4)}>
        {/* <AuctionsCards className="slide" /> */}
        {/* <img src="https://wallpapercave.com/wp/wp2634222.jpg" alt="" /> */}
        <HeroCards className="slide" />
      </label>
      <label for="s5" id="slide5" onClick={() => setHandler(5)}>
        <HeroCards className="slide" />
        {/* <img
          src="https://images5.alphacoders.com/343/thumb-1920-343645.jpg"
          alt=""
        /> */}
      </label>
      <label for="s6" id="slide6" onClick={() => setHandler(6)}>
        <HeroCards className="slide" />
      </label>
      <label for="s7" id="slide7" onClick={() => setHandler(7)}>
        {/* <AuctionsCards className="slide" /> */}
        <HeroCards className="slide" />
      </label>
    </section>
  );
};

export default Slider;
