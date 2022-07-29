import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connectMetamaskCopy } from "../../utils/web3";
import "./hero.css";
import Play from "../../assets/images/play.svg";
import CardSlider from "../card-slider/CardSlider";
import HeroCards from "../hero-cards/HeroCards";
import { ENV } from "../../config/config";
import { beforeAuction, getLiveAuctions } from "../auctions/auctions.action";
import { connect } from "react-redux";
import { WordsFamousNfts } from "../../utils/exportData";
const Hero = (props) => {
  const [connectedAddress, setConnectedAddress] = useState("");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
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
      let updatedAuctions = [];
      if (auctions&&auctions.length>1) {
        props.beforeAuction();
        setStatus("auctions");
        updatedAuctions = auctions.filter((item) => item.fileType === "image");
        if (updatedAuctions?.length > 6) {
          updatedAuctions = updatedAuctions.slice(0, 6);
        }
        setData(updatedAuctions);
      } else {
        setStatus("nfts");
        setData(WordsFamousNfts);
      }
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
              Extraordinary <span> NFTs </span>
            </h1>
            <p className="mp-explore-text">
              Explore on the world's best & largest NFT marketplace
            </p>
            {/* Buttons */}
            <div className="button-group mt-lg-5 d-flex">
              <Link
                className="btn btn-linear-gradient btn-hero-create me-sm-4"
                to={connectedAddress ? "/create" : "/login"}
              >
                Create
              </Link>
              <Link
                className="btn btn-blue-bordered btn-hero-explore"
                to="/explore/exploreAll"
              >
                Explore
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
              {data &&
                data.length > 0 &&
                data.map((auction, id) => {
                  return (
                    <HeroCards
                      key={id}
                      data={auction}
                      status={status}
                      className="slide"
                    />
                  );
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
  nft: state.nft,
});
export default connect(mapStateToProps, {
  beforeAuction,
  getLiveAuctions,
})(Hero);
