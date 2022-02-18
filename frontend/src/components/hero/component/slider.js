import "./slider.css";
import { useState } from "react";
import HeroCards from "../../../Screens/rough/hero-cards/HeroCards";
import SliderNextIcon from "../../../assets/images/slidernextArrow.png";
import SliderPrevIcon from "../../../assets/images/sliderprevArrow.png";
import AuctionsCards from "../../../Screens/rough/auctions-cards/AuctionsCards";
import { map } from "jquery";

const Slider = () => {
  const sliderRadioButtons = [
    {
      id: "s1",
      value: 1,
    },
    {
      id: "s2",
      value: 2,
    },
    {
      id: "s3",
      value: 3,
    },
    {
      id: "s4",
      value: 4,
    },
    {
      id: "s5",
      value: 5,
    },
    {
      id: "s6",
      value: 6,
    },
    {
      id: "s7",
      value: 7,
    },
  ];

  const [sliderChecked, setSliderChecked] = useState(1);
  const length = sliderRadioButtons.length;
  const handleRadioInputs = (e) => {
    setSliderChecked(e.target.value);
  };

  const nextBtnHandler = () => {
    if (sliderChecked < length) {
      setSliderChecked(sliderChecked + 1);
    } else {
      setSliderChecked(1);
    }
  };

  const prevBtnHandler = () => {
    if (sliderChecked === 1) {
      setSliderChecked(7);
    } else {
      setSliderChecked(sliderChecked - 1);
    }
  };

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

      {/* <input type="radio" name="slider" id="s2" />
      <input type="radio" name="slider" id="s3" />
      <input type="radio" name="slider" id="s4" />
      <input type="radio" name="slider" id="s5" />  */}

      <label for="s1" id="slide1" onClick={() => setSliderChecked(1)}>
        <HeroCards className="slide" />
        {/* <img
          src="https://i.pinimg.com/originals/2b/de/de/2bdede0647e3cdf75b44ea33723201d9.jpg"
          alt=""
        /> */}
      </label>
      <label for="s2" id="slide2" onClick={() => setSliderChecked(2)}>
        <HeroCards className="slide" />
        {/* <AuctionsCards className="slide" /> */}
        {/* <img
          src="https://images6.alphacoders.com/462/thumb-1920-462371.jpg"
          alt=""
        /> */}
      </label>
      <label for="s3" id="slide3" onClick={() => setSliderChecked(3)}>
        <HeroCards className="slide" />
        {/* <img src="https://wallpaperaccess.com/full/1154341.jpg" alt="" /> */}
      </label>
      <label for="s4" id="slide4" onClick={() => setSliderChecked(4)}>
        {/* <AuctionsCards className="slide" /> */}
        {/* <img src="https://wallpapercave.com/wp/wp2634222.jpg" alt="" /> */}
        <HeroCards className="slide" />
      </label>
      <label for="s5" id="slide5" onClick={() => setSliderChecked(5)}>
        <HeroCards className="slide" />
        {/* <img
          src="https://images5.alphacoders.com/343/thumb-1920-343645.jpg"
          alt=""
        /> */}
      </label>
      <label for="s6" id="slide6" onClick={() => setSliderChecked(6)}>
        <HeroCards className="slide" />
      </label>
      <label for="s7" id="slide7" onClick={() => setSliderChecked(7)}>
        {/* <AuctionsCards className="slide" /> */}
        <HeroCards className="slide" />
      </label>

      <div className="btn-container">
        <button className="card-slider-btn mb-4 me-3" onClick={prevBtnHandler}>
          {/* <img src={SliderPrevIcon} alt="SliderPrevButton" /> */}
          <i class="fas fa-arrow-left"></i>
        </button>
        <button className="card-slider-btn mb-4" onClick={nextBtnHandler}>
          {/* <img src={SliderNextIcon} alt="SliderNextButton" /> */}
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </section>
  );
};

export default Slider;
