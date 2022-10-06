import { useEffect, useState, FC } from "react";
import { Link } from "react-router-dom";
import { connectMetamaskCopy } from "../../utils/web3";
import "./Hero.scss";
import Play from "../../assets/images/play.svg";
import CardSlider from "../CardSlider/CardSlider";
import HeroCards from "../HeroCards/HeroCards";
import { ENV } from "../../config/config";
// import {
//   beforeAuction,
//   getLiveAuctions,
// } from "../../pages/auctions/auctions.action";
import { connect } from "react-redux";
import { WordsFamousNfts } from "../../utils/exportData";
import { HeroInt } from "../../interfaces/components";

const Hero: FC<HeroInt> = (props) => {
  const [connectedAddress, setConnectedAddress] = useState<any>("");
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const heroSettings = ENV.heroSettings;

// react query code here
const onSuccessHero = (data: any) => {
  console.log('data',data);
  
  if (data.data.success) {
    setData(data.data.data.auctions);
  } else {
    // setError(data.data.message);
  }
};
const { isLoading: isLoadingCategories } = GetLiveAuctions(onSuccessHero);


  useEffect(() => {
    const setAddress = async () => {
      let connectedAddress = await connectMetamaskCopy();
      setConnectedAddress(connectedAddress);
    };
    setAddress();
  }, []);

  return (
    <section className="hero-section padding-wrapper">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <h1 className="mt-4">
              Discover, Collect, <br /> <span>and sell</span> Rare
              <br />
              Digital Art <span> NFTs </span>
            </h1>
            <p className="mp-explore-text">
              Build the leading platform for cutting-edge and next gen
              Blockchain.
            </p>
            {/* Buttons */}
            <div className="button-group mt-lg-5 d-flex">
              <Link
                className="btn btn-linear-gradient btn-hero-create me-sm-4"
                to={connectedAddress ? "/create" : "/login"}
              >
                Create
              </Link>
              <div className="watch-video d-flex align-items-center">
                <button className="hero-play-btn">
                  <img src={Play} alt="play" />
                </button>
                <span className="ms-4">Watch video to learn more ...</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <CardSlider settings={heroSettings}>
              {data &&
                data.length > 0 &&
                data.map((auction: any, id: any) => {
                  return (
                    <HeroCards
                      key={id}
                      data={auction}
                      status={status}
                      // className="slide"
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

export default Hero