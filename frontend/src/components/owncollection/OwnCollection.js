import React from "react";
import { Link } from "react-router-dom";
import "./OwnCollection.css";

//assets
import DiscordIcon from "../../assets/images/discord-dashboard-icon.svg";
import TelegramIcon from "../../assets/images/telegram-dashboard-icon.svg";
import RedditIcon from "../../assets/images/reddit-dashboard-icon.svg";
import SmileyImg from "../../assets/images/own-collection-smiley.svg";

const OwnCollection = () => {
  return (
    <section className="owncollection-section padding-wrapper">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-xl-5">
            <div className="owncollection-left-content">
              <h3>Start your own collection today</h3>
              <p className="mt-1">
                MintsClub is a shared liquidity NFT market smart contract which
                is used by multiple websites to provide the users the best
                possible experience.
              </p>
              <Link
                className="btn btn-rounded-bordered mt-3 mt-xl-5"
                to="/explore/allNFT"
              >
                Start collecting
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-xl-7">
            <div className="owncollection-right-bg">
              <div className="owncollection-right-content mx-auto">
                <img src={SmileyImg} alt="smileyImg" className="smiley-logo" />
                <h5 className=" mt-5">Join the community, Change the world.</h5>
                <p>
                  MintsClub is a shared liquidity NFT market smart contract
                  which is used by multiple websites to provide the users the
                  best possible experience.
                </p>
                <div className="owcollection-icon-container d-flex align-items-center justify-content-center justify-content-lg-start mt-5 mb-1">
                  <div className="owcollection-icon-div me-1 me-md-3">
                    <img src={DiscordIcon} alt="discordIcon" />
                  </div>
                  <div className="owcollection-icon-div me-1 me-md-3">
                    <img src={TelegramIcon} alt="telegramIcon" />
                  </div>
                  <div className="owcollection-icon-div me-1 me-md-3">
                    <img src={RedditIcon} alt="redditIcon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnCollection;
