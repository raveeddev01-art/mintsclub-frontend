import React from "react";
import "./banner.css";
import BannerImage from "../../assets/images/bannerimg.png";

const Banner = ({ subHeading, heading, content, bgImg, bannerImg }) => {
  return (
    <>
      <div
        className="banner-wrapper padding-wrapper"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-9 col-lg-7">
              <div className="intro">
                <div className="intro-content clr-blue">
                  {subHeading && <span>{subHeading}</span>}
                  {heading && <h3 className="mb-0">{heading}</h3>}
                  {content && <p className="pt-4">{content}</p>}
                </div>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="banner-img">
                {bannerImg && <img src={bannerImg} alt="banner-img" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
