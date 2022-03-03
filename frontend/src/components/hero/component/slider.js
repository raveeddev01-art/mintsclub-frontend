import "./slider.css";
import { useState } from "react";
import HeroCards from "../../hero-cards/HeroCards";
import SliderNextIcon from "../../../assets/images/slidernextArrow.png";
import SliderPrevIcon from "../../../assets/images/sliderprevArrow.png";
import AuctionsCards from "../../auctions-cards/AuctionsCards";
import { map } from "jquery";
import { ListingImg, CollectionImages } from "../../../assets/assets";

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
        <HeroCards CardImg={ListingImg.listingImg1} className="slide" />
      </label>
      <label for="s2" id="slide2" onClick={() => setHandler(2)}>
        <HeroCards CardImg={ListingImg.listingImg2} className="slide" />
      </label>
      <label for="s3" id="slide3" onClick={() => setHandler(3)}>
        <HeroCards CardImg={ListingImg.listingImg3} className="slide" />
      </label>
      <label for="s4" id="slide4" onClick={() => setHandler(4)}>
        <HeroCards CardImg={ListingImg.listingImg4} className="slide" />
      </label>
      <label for="s5" id="slide5" onClick={() => setHandler(5)}>
        <HeroCards CardImg={CollectionImages.mainImg1} className="slide" />
      </label>
      <label for="s6" id="slide6" onClick={() => setHandler(6)}>
        <HeroCards CardImg={CollectionImages.mainImg2} className="slide" />
      </label>
      <label for="s7" id="slide7" onClick={() => setHandler(7)}>
        <HeroCards CardImg={CollectionImages.mainImg3} className="slide" />
      </label>
    </section>
  );
};

export default Slider;
