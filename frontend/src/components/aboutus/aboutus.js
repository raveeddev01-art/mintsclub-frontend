import React, { useEffect } from "react";
import "./aboutus.css";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg2.png";
import { aboutusImages } from "../../assets/assets";

const bannerData = {
  subHeading: "Who we are",
  heading: "Company Profile",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

const services = [
  {
    name: "Blockchain Consultancy",
    img: aboutusImages.consultancy,
  },
  {
    name: "Token Development",
    img: aboutusImages.development,
  },
  {
    name: "NFT Marketplace",
    img: aboutusImages.marketplace,
  },
  {
    name: "DApp Development",
    img: aboutusImages.dapp,
  },
  {
    name: "DeFi Development",
    img: aboutusImages.defi,
  },
  {
    name: "Crypto Exchange Development",
    img: aboutusImages.crypto,
  },
];

const comingsoon = [
  {
    name: "Binance",
    img: aboutusImages.binance,
  },
  {
    name: "Cardano",
    img: aboutusImages.cardano,
  },
  {
    name: "Solana",
    img: aboutusImages.solana,
  },
  {
    name: "Algoran",
    img: aboutusImages.algoran,
  },
];

const AboutUs = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Banner
        subHeading={bannerData.subHeading}
        heading={bannerData.heading}
        content={bannerData.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      <div className="padding-wrapper aboutus">
        <div className="container">
          <div className="aboutus-content mb-lg-5">
            <h5>Hello! We are MintsClub,</h5>
            <p>
              MintsClub is a 21st-century entry in the open trading world of
              NFT, token, DApp, and Defi development. Minting and marketplace
              development are two forte of MintsClub enabling easy converting of
              your digital assets into non-fungible tokens or NFTs. These
              intangible assets possess high value and are revolutionizing the
              crypto market and we are thrilled to explore its depths from a new
              angle!
            </p>
          </div>
          <div className="aboutus-content">
            <h5>A Game-changing Minting Wizard!</h5>
            <p>
              A virtual ecosystem springs from the open marketplace of
              MintsClub, introducing a value to your digital assets such as
              images, GIFs, sports accessories and more.
              <br />
              We take resolved and strategic steps to expand the freedom of the
              stable revenue streams by fortifying futuristic development
              solutions on Blockchain platforms like Ethereum.
              <br />
              Hence, MintsClub is our Metaverse gateway that attracts
              enthusiastic creators to launch their awesome artwork — while also
              allowing passionate developers to build spectacular marketplaces
              and customers for seamless trading.
            </p>
          </div>
          <div className="aboutus-content">
            <h5>A Game-changing Minting Wizard!</h5>
            <ol>
              <li>
                {" "}
                Upload your artwork or other digital assets that you want to
                mint.
              </li>
              <li>
                {" "}
                Enter details about your NFT (i.e. Name, Symbol, External Link,
                and Description, if any).
              </li>
              <li>
                {" "}
                You are set to explore the virtual marketplace and reinvent top
                currencies with distinctive digital goods!
              </li>
            </ol>
          </div>
          <div className="aboutus-content">
            <h5>Vision</h5>
            <span>Creating A Perfect World Beyond The One We Live In!</span>
          </div>
          <div className="aboutus-content">
            <h5>Mission</h5>
            <span>
              Capitalize on your artistic work and help humanity through
              unrivaled ownership and trading of the novel NFTs.
            </span>
          </div>
          <div className="aboutus-content">
            <h5>
              Revolutionizing Towards A Smarter And Safer Blockchain Environment
            </h5>
            <h6>A Game-changing Minting Wizard!</h6>
          </div>
          <div className="aboutus-box-container">
            <div className="row g-4">
              {services.map((service, id) => {
                return (
                  <div className="col-sm-6 col-lg-4 col-xxl-3" key={id}>
                    <div className="aboutus-box">
                      <img src={service.img} alt="services" />
                      <p>{service.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-5">
              <button className="btn btn-linear-gradient about-btn-explore">
                Explore More
              </button>
            </div>
          </div>
          <div className="aboutus-content">
            <h5>Coming Soon!</h5>
            <h6>
              MintsClub will be spreading its spotlight to the open multi-chains
              in the future!
            </h6>
          </div>
          <div className="aboutus-box-container">
            <div className="row g-4">
              {comingsoon.map((comingsoon, id) => {
                return (
                  <div className="col-sm-6 col-lg-4 col-xl-3" key={id}>
                    <div className="aboutus-box">
                      <img src={comingsoon.img} alt="services" />
                      <p>{comingsoon.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
