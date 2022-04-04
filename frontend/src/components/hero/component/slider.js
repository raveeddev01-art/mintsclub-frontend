import "./slider.css";
import React, { useState, useEffect } from "react";
import HeroCards from "../../hero-cards/HeroCards";
import { map } from "jquery";
import { ListingImg, CollectionImages } from "../../../assets/assets";
import { connect } from "react-redux";
import { beforeAuction, getLiveAuctions } from "../../auctions/auctions.action";
import { beforeNFT, getNFTs } from "../../nfts/nfts.action";
import { ENV } from "../../../config/config";

const Slider = (props) => {
  const [auctions, setAuctions] = useState(null);
  const [loader, setLoader] = useState(true);
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
    // get live auctions
    const qs = ENV.objectToQueryString({
      myFilter: "all",
    });
    props.getLiveAuctions(qs);
    props.getNFTs();
  }, []);

  // set live auctions
  useEffect(() => {
    if (props.auction.auctionsAuth) {
      const { auctions } = props.auction;
      setAuctions(auctions);
      props.beforeAuction();
    }
  }, [props.auction.auctionsAuth]);

  //Get NFt's
  useEffect(() => {
    if (props.nft.nftsAuth) {
      const { nfts } = props.nft.nftsData;
      setNFTs(nfts);
      props.beforeNFT();
    }
  }, [props.nft.nftsAuth]);

  console.log("nfts", nfts);

  return (
    <section id="slider">
      {props.sliderRadioButtons.map((item) => {
        return (
          <input
            type="radio"
            name="slider"
            value={item.value}
            checked={props.sliderChecked === item.value}
            onChange={(e) => props.handleRadioInputs(e)}
            id={item.id}
          />
        );
      })}
      {auctions && auctions.length >= 7 ? (
        auctions.map((item, id) => {
          if (id <= 6) {
            return (
              <label
                for={`s${id + 1}`}
                id={`slide${id + 1}`}
                onClick={() => props.setHandler(id + 1)}
              >
                <HeroCards
                  CardImg={item.image}
                  NftName={item.name}
                  OwnerName={item.owner.username}
                  className="slide"
                />
              </label>
            );
          }
        })
      ) : nfts && nfts.length >= 7 ? (
        nfts.map((item, id) => {
          if (id <= 6) {
            return (
              <label
                for={`s${id + 1}`}
                id={`slide${id + 1}`}
                onClick={() => props.setHandler(id + 1)}
              >
                <HeroCards
                  CardImg={item.image}
                  NftName={item.name}
                  OwnerName={item.name}
                  className="slide"
                />
              </label>
            );
          }
        })
      ) : (
        <>
          <label for="s1" id="slide1" onClick={() => props.setHandler(1)}>
            <HeroCards CardImg={ListingImg.listingImg1} className="slide" />
          </label>
          <label for="s2" id="slide2" onClick={() => props.setHandler(2)}>
            <HeroCards CardImg={ListingImg.listingImg2} className="slide" />
          </label>
          <label for="s3" id="slide3" onClick={() => props.setHandler(3)}>
            <HeroCards CardImg={ListingImg.listingImg3} className="slide" />
          </label>
          <label for="s4" id="slide4" onClick={() => props.setHandler(4)}>
            <HeroCards CardImg={ListingImg.listingImg4} className="slide" />
          </label>
          <label foCopiesr="s5" id="slide5" onClick={() => props.setHandler(5)}>
            <HeroCards CardImg={CollectionImages.mainImg1} className="slide" />
          </label>
          <label for="s6" id="slide6" onClick={() => props.setHandler(6)}>
            <HeroCards CardImg={CollectionImages.mainImg2} className="slide" />
          </label>
          <label for="s7" id="slide7" onClick={() => props.setHandler(7)}>
            <HeroCards CardImg={CollectionImages.mainImg3} className="slide" />
          </label>
        </>
      )}
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
  beforeNFT,
  getNFTs,
})(Slider);
