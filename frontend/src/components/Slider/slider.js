import React, { useState, useEffect } from "react";
import "./slider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WordsFamousNfts } from "../../utils/exportData";
// import image from "../../assets/images/test.jpg";
import nftBack from "../../assets/images/nftBack.png";
// import nftImage from "../../assets/images/nftImage.png";

const SimpleSlider = (props) => {
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    if (showSlider == false) {
      setTimeout(() => {
        setShowSlider(true);
      }, 300);
    }
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className="position-relative slider-container"
      style={{ backgroundColor: "" }}
    >
      {/* <h2> Single Item</h2> */}

      <img
        src={nftBack}
        style={{ width: "26rem", minWidth: "26rem" }}
        className="slider-bg"
      />

      <div
        className="position-absolute nfts-title-container"
        style={{ top: "-3rem", right: "9rem" }}
      >
        <p
          className="text-white mb-0 worlds-famous"
          style={{
            fontSize: "34px",
            fontWeight: "bold",
            // fontFamily: "Manrope",
          }}
        >
          World's Famous
        </p>
        <p
          className="mb-0 text-white nfts-title"
          style={{
            // fontSize: "165px",
            fontSize: "8.2vw",
            fontWeight: "bold",
            marginTop: "-3rem",
            // fontFamily: "Manrope",
          }}
        >
          NFT's
        </p>
      </div>
      <div
        className="position-relative slider-wrapper"
        style={{
          bottom: "22rem",
          right: "-2rem",
          cursor: "pointer",
          display: showSlider ? "block" : "none",
        }}
      >
        <Slider {...settings}>
          {props.assetList.map((nft, index) => {
            return (
              <div key={index} onClick={() => window.open(nft.link)}>
                <img
                  src={nft.img}
                  className="slider-img"
                  alt={nft}
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
export default SimpleSlider;
