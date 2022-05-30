import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connectMetamaskCopy } from "../../utils/web3";
import "./hero.css";
import Play from "../../assets/images/play.svg";
import CardSlider from "../card-slider/CardSlider";
import HeroCards from "../hero-cards/HeroCards";
import { ListingImg } from "../../assets/assets";
import { ENV } from "../../config/config";

const Hero = (props) => {
  const [connectedAddress, setConnectedAddress] = useState("");

  const heroSettings = ENV.heroSettings;

  useEffect(async () => {
    let connectedAddress = await connectMetamaskCopy();
    setConnectedAddress(connectedAddress);
  }, []);

<<<<<<< HEAD
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
=======
>>>>>>> 0be1e97d33304f82f9e54dfc88ab0fb6ae6b4aa2
  return (
    <section className="hero-section padding-wrapper">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 col-xl-5">
            <h1 className="mt-4">
              Discover, collect, <br /> <span>and sell </span>
              <br />
              extraordinary <span> NFTs </span>
            </h1>
            <p className="mp-explore-text">
              Explore on the world's best & largest NFT marketplace
            </p>
            {/* Buttons */}
            <div className="button-group mt-lg-5 d-flex">
              <Link
                className="btn btn-linear-gradient btn-hero-create"
                to={connectedAddress ? "/create" : "/login"}
              >
                <p>Create</p>
              </Link>
              <Link
                className="btn btn-blue-bordered btn-hero-explore"
                to="/explore/exploreAll"
              >
                <p className="ms-1">Explore</p>
              </Link>
            </div>
            <div className="watch-video d-flex align-items-center mt-5 mb-4">
              <button className="hero-play-btn">
                <img src={Play} alt="play" />
              </button>
              <span className="ms-2">Watch video to learn more</span>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-7 ">
            <CardSlider settings={heroSettings}>
              <HeroCards CardImg={ListingImg.listingImg1} className="slide" />
              <HeroCards CardImg={ListingImg.listingImg2} className="slide" />
              <HeroCards CardImg={ListingImg.listingImg3} className="slide" />
              <HeroCards CardImg={ListingImg.listingImg4} className="slide" />
              <HeroCards CardImg={ListingImg.listingImg2} className="slide" />
              <HeroCards CardImg={ListingImg.listingImg4} className="slide" />
            </CardSlider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
