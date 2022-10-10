import { useState, FC, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.scss";
import Play from "../../assets/images/play.svg";
import CardSlider from "../CardSlider/CardSlider";
import HeroCards from "../HeroCards/HeroCards";
import { ENV } from "../../config/config";
import { useGetData } from "../../hooks/Common";
import { WordsFamousNfts } from "../../utils/exportData";
import { HeroInt } from "../../interfaces/components";
import qs from "qs";
import { useWallet } from "@solana/wallet-adapter-react";
import { connectMetamaskCopy } from "../../utils/web3";

const Hero: FC<HeroInt> = (props) => {
  const [connectedAddress, setConnectedAddress] = useState<any>("");

  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const heroSettings = ENV.heroSettings;

  // react query code here

  const wallet = useWallet();
  const setAddress = async () => {
    if (wallet.connected) {
      setConnectedAddress(wallet.publicKey?.toBase58());
      return;
    }
    let connectedAddress = await connectMetamaskCopy();
    setConnectedAddress(connectedAddress);
    return;
  };
  useEffect(() => {
    setAddress();
  }, []);
  // react query code here
  const onSuccessHero = (data: any) => {
    if (data.data.success) {
      const { auctions } = data.data.data;
      let updatedAuctions = [];
      if (auctions && auctions.length > 1) {
        setStatus("auctions");
        updatedAuctions = auctions.filter(
          (item: any) => item.fileType === "image"
        );
        if (updatedAuctions?.length > 6) {
          updatedAuctions = updatedAuctions.slice(0, 6);
        }
        setData(updatedAuctions);
      } else {
        setStatus("nfts");
        setData(WordsFamousNfts);
      }
    } else {
      // setError(data.data.message);
    }
  };

  const { refetch } = useGetData(
    "heroAuctions",
    "auctions/live",
    ENV.objectToQueryString({
      myFilter: "all",
    }),
    onSuccessHero
  );

  useEffect(() => {
    props.beforeAuction();
    const qs = ENV.objectToQueryString({
      myFilter: "all",
    });
    props.getLiveAuctions(qs);
  }, []);

  useEffect(() => {
    if (props.auction.auctionsAuth) {
      const { auctions } = props.auction;
      let updatedAuctions = [];
      if (auctions && auctions.length > 1) {
        setStatus("auctions");
        updatedAuctions = auctions.filter(
          (item: any) => item.fileType === "image"
        );
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
                to={"/create"}
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

export default Hero;
