import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connectMetamaskCopy } from "../../utils/web3";
import "./hero.css";
import CreateIcon from "../../assets/images/create-icon.svg";
import PlayIcon from "../../assets/images/play-icon.svg";
import Slider from "./component/slider";

const Hero = (props) => {
  const [connectedAddress, setConnectedAddress] = useState("");

  useEffect(async () => {
    let connectedAddress = await connectMetamaskCopy();
    setConnectedAddress(connectedAddress);
  }, []);

  const [sliderChecked, setSliderChecked] = useState(1);
  const length =0;
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
                {/* <i className="icon-note mr-2" /> */}
                {/* <img src={CreateIcon} alt="createIcon" className="me-2" /> */}
                <p>Create</p>
              </Link>
              <Link
                className="btn btn-blue-bordered btn-hero-explore"
                to="/explore/exploreAll"
              >
                {/* <svg width="22px" height="16px">
                  <path
                    fillRule="evenodd"
                    fill="rgb(255, 255, 255)"
                    d="M10.788,0.151 C10.596,0.153 10.412,0.232 10.279,0.370 C10.145,0.508 10.72,0.694 10.76,0.886 L10.76,3.525 C10.73,3.717 10.148,3.903 10.283,4.40 C10.418,4.177 10.603,4.255 10.795,4.255 C10.988,4.255 11.173,4.177 11.308,4.40 C11.443,3.903 11.518,3.717 11.515,3.525 L11.515,0.886 C11.519,0.691 11.444,0.503 11.307,0.365 C11.170,0.226 10.983,0.149 10.788,0.151 ZM5.53,1.591 C4.878,1.586 4.707,1.646 4.573,1.759 C4.438,1.872 4.350,2.29 4.324,2.203 C4.298,2.376 4.336,2.553 4.430,2.700 L5.630,4.619 C5.725,4.792 5.887,4.919 6.78,4.969 C6.269,5.19 6.472,4.989 6.640,4.884 C6.808,4.780 6.926,4.612 6.966,4.419 C7.6,4.226 6.964,4.24 6.852,3.862 L5.652,1.943 C5.526,1.730 5.300,1.597 5.53,1.591 L5.53,1.591 ZM16.515,1.598 C16.278,1.611 16.61,1.740 15.938,1.943 L14.738,3.862 C14.626,4.24 14.585,4.226 14.625,4.419 C14.665,4.612 14.782,4.780 14.950,4.884 C15.118,4.989 15.321,5.19 15.512,4.969 C15.703,4.919 15.865,4.792 15.960,4.619 L17.160,2.700 C17.254,2.550 17.290,2.372 17.260,2.198 C17.231,2.24 17.139,1.867 17.2,1.756 C16.865,1.646 16.691,1.589 16.515,1.598 L16.515,1.598 ZM8.569,4.964 C8.438,4.978 8.313,5.27 8.209,5.107 L7.377,5.729 L4.670,6.411 L4.655,6.411 C2.79,6.487 0.0,8.608 0.0,11.201 C0.0,13.843 2.156,15.999 4.797,15.999 C5.911,15.999 6.935,15.606 7.751,14.965 C7.757,14.960 7.768,14.962 7.774,14.957 C7.844,14.918 7.908,14.868 7.961,14.808 C8.267,14.532 9.608,14.80 10.795,14.80 C11.982,14.80 13.323,14.532 13.629,14.808 C13.694,14.880 13.773,14.939 13.861,14.980 C14.674,15.611 15.688,15.999 16.792,15.999 C19.433,15.999 21.590,13.843 21.590,11.201 C21.590,8.603 19.503,6.479 16.920,6.411 L14.214,5.729 L13.381,5.107 C13.258,5.15 13.108,4.965 12.954,4.964 L8.636,4.964 C8.613,4.963 8.591,4.963 8.568,4.964 L8.569,4.964 ZM8.868,6.404 L12.722,6.404 L13.479,6.973 C13.555,7.32 13.641,7.76 13.734,7.101 L14.154,7.206 C12.856,8.66 11.995,9.535 11.995,11.201 C11.995,11.747 12.88,12.272 12.257,12.761 C11.786,12.683 11.292,12.641 10.795,12.641 C10.298,12.641 9.805,12.683 9.333,12.761 C9.502,12.272 9.596,11.747 9.596,11.201 C9.596,9.535 8.734,8.66 7.437,7.206 L7.856,7.101 C7.949,7.76 8.36,7.32 8.111,6.973 L8.868,6.404 ZM9.768,7.123 C9.577,7.132 9.398,7.216 9.269,7.358 C9.140,7.499 9.73,7.686 9.82,7.877 C9.91,8.68 9.175,8.247 9.317,8.375 C9.458,8.504 9.645,8.572 9.836,8.562 L11.755,8.562 C11.947,8.565 12.133,8.491 12.270,8.355 C12.407,8.220 12.484,8.36 12.484,7.843 C12.484,7.650 12.407,7.466 12.270,7.330 C12.133,7.195 11.947,7.121 11.755,7.123 L9.836,7.123 C9.813,7.122 9.791,7.122 9.768,7.123 L9.768,7.123 ZM4.798,7.843 C6.661,7.843 8.156,9.338 8.156,11.201 C8.156,13.65 6.661,14.560 4.798,14.560 C2.934,14.560 1.439,13.65 1.439,11.201 C1.439,9.338 2.934,7.843 4.798,7.843 ZM16.793,7.843 C18.656,7.843 20.151,9.338 20.151,11.201 C20.151,13.65 18.656,14.560 16.793,14.560 C14.929,14.560 13.434,13.65 13.434,11.201 C13.434,9.338 14.929,7.843 16.793,7.843 L16.793,7.843 ZM4.798,8.562 C3.349,8.562 2.159,9.753 2.159,11.202 C2.159,12.650 3.349,13.840 4.798,13.840 C6.247,13.840 7.437,12.650 7.437,11.202 C7.437,9.753 6.247,8.562 4.798,8.562 L4.798,8.562 ZM16.793,8.562 C15.344,8.562 14.154,9.753 14.154,11.202 C14.154,12.650 15.344,13.840 16.793,13.840 C18.241,13.840 19.432,12.650 19.432,11.202 C19.432,9.753 18.241,8.562 16.793,8.562 L16.793,8.562 ZM4.798,10.2 C5.469,10.2 5.997,10.531 5.997,11.202 C5.997,11.872 5.469,12.401 4.798,12.401 C4.127,12.401 3.598,11.872 3.598,11.202 C3.598,10.531 4.127,10.2 4.798,10.2 ZM16.793,10.2 C17.464,10.2 17.992,10.531 17.992,11.202 C17.992,11.872 17.464,12.401 16.793,12.401 C16.122,12.401 15.593,11.872 15.593,11.202 C15.593,10.531 16.122,10.2 16.793,10.2 L16.793,10.2 Z"
                  />
                </svg> */}
                <p className="ms-1">Explore</p>
              </Link>
            </div>
            <div className="watch-video align-items-center mt-5 mb-4">
              <img src={PlayIcon} alt="playIcon" className="me-2" />
              <span>Watch video to learn more</span>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-7 ">
            {/* <Slider
              setHandler={setHandler}
              sliderRadioButtons={sliderRadioButtons}
              handleRadioInputs={handleRadioInputs}
              sliderChecked={sliderChecked}
            /> */}
          </div>
          {/* <div className="col-12 col-lg-5">
            <div className="btn-container mx-auto mx-lg-0">
              <button
                className="hero-slider-btn card-slider-btn me-3"
                onClick={prevBtnHandler}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <button
                className="hero-slider-btn card-slider-btn"
                onClick={nextBtnHandler}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
