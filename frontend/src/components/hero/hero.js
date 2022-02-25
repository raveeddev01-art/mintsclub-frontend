import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connectMetamaskCopy } from "../../utils/web3";
import { ENV } from "./../../config/config";
import "./hero.css";
import CreateIcon from "../../assets/images/create-icon.svg";
import ExploreIcon from "../../assets/images/explore-icon.svg";
import PlayIcon from "../../assets/images/play-icon.svg";
import Slider from "./component/slider";

const Hero = (props) => {
  const [connectedAddress, setConnectedAddress] = useState("");

  useEffect(async () => {
    let connectedAddress = await connectMetamaskCopy();
    setConnectedAddress(connectedAddress);
  }, []);

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
  const setHandler = (id) => {
    setSliderChecked(id);
  };
  return (
    <section className="hero-section padding-wrapper">
      {/* <Particles id="tsparticles" options={{ ...particlesData }} /> */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 col-xl-5">
            <h1 className="mt-4">
              Discover, collect, and sell extraordinary NFTs
            </h1>
            <p className="mp-explore-text">
              Explore on the world's best & largest NFT marketplace
            </p>
            {/* Buttons */}
            <div className="button-group mt-lg-5 d-flex">
              <Link
                className="btn btn-linear-gradient "
                to={connectedAddress ? "/create" : "/login"}
              >
                {/* <i className="icon-note mr-2" /> */}
                <img src={CreateIcon} alt="createIcon" className="me-2" />
                Create
              </Link>
              <Link
                className="btn btn-rounded-bordered btn-hero-explore"
                to="/explore-all"
              >
                {/* <i className="icon-rocket mr-2" /> */}
                <img src={ExploreIcon} alt="exploreIcon" className="me-2" />
                <p>Explore</p>
              </Link>
            </div>
            <div className="d-lg-none d-flex watch-video align-items-center mt-5 mb-4">
              <img src={PlayIcon} alt="playIcon" className="me-2" />
              <span>Watch video to learn more</span>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-7 ">
            <Slider
              setHandler={setHandler}
              sliderRadioButtons={sliderRadioButtons}
              handleRadioInputs={handleRadioInputs}
              sliderChecked={sliderChecked}
            />
          </div>
          <div className="d-none d-lg-block col-12 col-lg-7">
            <div className="watch-video d-flex align-items-center">
              <img src={PlayIcon} alt="playIcon" className="me-2" />
              <span>Watch video to learn more</span>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="btn-container mx-auto mx-lg-0">
              <button
                className="hero-slider-btn card-slider-btn me-3"
                onClick={prevBtnHandler}
              >
                <i class="fas fa-arrow-left"></i>
              </button>
              <button
                className="hero-slider-btn card-slider-btn"
                onClick={nextBtnHandler}
              >
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
