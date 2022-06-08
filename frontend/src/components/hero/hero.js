import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connectMetamaskCopy } from "../../utils/web3";
import "./hero.css";
import Play from "../../assets/images/play.svg";
import CardSlider from "../card-slider/CardSlider";
import HeroCards from "../hero-cards/HeroCards";
import { ListingImg } from "../../assets/assets";
import { ENV } from "../../config/config";
import { beforeAuction, getLiveAuctions } from "../auctions/auctions.action";
import { connect } from "react-redux";
const Hero = (props) => {
  const [connectedAddress, setConnectedAddress] = useState("");
  const [auctions, setAuctions] = useState(null);
  const heroSettings = ENV.heroSettings;

  useEffect(async () => {
    let connectedAddress = await connectMetamaskCopy();
    setConnectedAddress(connectedAddress);
  }, []);
  useEffect(() => {
    const qs = ENV.objectToQueryString({
      myFilter: "all",
    });
    props.getLiveAuctions(qs);
  }, []);
  useEffect(() => {
    if (props.auction.auctionsAuth) {
      const { auctions } = props.auction;
      let updatedAuctions;
      if (auctions.length > 6) {
        updatedAuctions = auctions.slice(0, 6);
      } else {
        updatedAuctions = auctions;
      }
      setAuctions(updatedAuctions);

      props.beforeAuction();
    }
  }, [props.auction.auctionsAuth]);
  return (
    <section className="hero-section padding-wrapper">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
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
          <div className="col-12 col-lg-6">
            <CardSlider settings={heroSettings}>
              {auctions &&
                auctions.length > 0 &&
                auctions.map((auction) => {
                  return <HeroCards auction={auction} className="slide" />;
                })}
            </CardSlider>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  auction: state.auction,
});
export default connect(mapStateToProps, {
  beforeAuction,
  getLiveAuctions,
})(Hero);
