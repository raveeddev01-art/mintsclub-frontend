import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connectMetamaskCopy } from "../../utils/web3";
import { ENV } from "./../../config/config";
import "./hero.css";
import CreateIcon from "../../assets/images/create-icon.svg";
import ExploreIcon from "../../assets/images/explore-icon.svg";
import PlayIcon from "../../assets/images/play-icon.svg";

const Hero = (props) => {
  const [connectedAddress, setConnectedAddress] = useState("");

  useEffect(async () => {
    let connectedAddress = await connectMetamaskCopy();
    setConnectedAddress(connectedAddress);
  }, []);

  return (
    <section className="hero-section padding-wrapper">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-10 col-xl-5">
            <h1 className="mt-4">
              Discover, collect, and sell extraordinary NFTs
            </h1>
            <p className="mp-explore-text">
              Explore on the world's best & largest NFT marketplace
            </p>
            {/* Buttons */}
            <div className="button-group">
              <Link
                className="btn btn-linear-gradient "
                to={connectedAddress ? "/create" : "/login"}
              >
                {/* <i className="icon-note mr-2" /> */}
                <img src={CreateIcon} alt="createIcon" className="me-2" />
                Create
              </Link>
              <Link className="btn btn-rounded-bordered" to="/explore-all">
                {/* <i className="icon-rocket mr-2" /> */}
                <img src={ExploreIcon} alt="exploreIcon" className="me-2" />
                Explore
              </Link>
            </div>
            <div className="watch-video mt-5">
              <span>
                <img src={PlayIcon} alt="playIcon" className="me-2" /> Watch
                video to learn more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
