import React, { useState } from "react";
import HeroCards from "../../Screens/rough/hero-cards/HeroCards";
import AuctionsCards from "../../Screens/rough/auctions-cards/AuctionsCards";
import SliderNextIcon from "../../assets/images/slidernextArrow.png";
import SliderPrevIcon from "../../assets/images/sliderprevArrow.png";
import "./CustomSlider.css";

const sliderData = [
  {
    id: 1,
    content: <HeroCards />,
  },
  {
    id: 2,
    content: <AuctionsCards />,
  },
  {
    id: 3,
    content: <HeroCards />,
  },
  {
    id: 4,
    content: <AuctionsCards />,
  },
  {
    id: 5,
    content: <HeroCards />,
  },
  {
    id: 6,
    content: <HeroCards />,
  },
];

const CustomSlider = () => {
  const [current, setCurrent] = useState(0);
  const [prevSlide, setPreviousSlide] = useState(null);
  const [nextSlide, setNextSlide] = useState(current + 1);
  const [secondNextSlide, setSecondNextSlide] = useState(current + 2);
  const length = sliderData.length;

  const nextSlideMove = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlideMove = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  return (
    <section className="customHeroSlider">
      {sliderData.map((slide, id) => {
        return (
          <div>
            <div className={id === current ? "slide active" : "slide"} key={id}>
              {slide.content}
            </div>
          </div>
        );
      })}
      <div className="text-end">
        <button className="card-slider-btn mb-4 me-3" onClick={nextSlideMove}>
          <img src={SliderPrevIcon} alt="SliderPrevButton" />
        </button>
        <button className="card-slider-btn mb-4" onClick={prevSlideMove}>
          <img src={SliderNextIcon} alt="SliderNextButton" />
        </button>
      </div>
    </section>
  );
};

export default CustomSlider;
