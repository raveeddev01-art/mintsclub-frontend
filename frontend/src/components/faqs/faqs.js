import React, { useEffect } from "react";
import "./faqs.css";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg2.png";
import { Accordion, Card } from "react-bootstrap";

const bannerData = {
  subHeading: "Ask",
  heading: "FAQ",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

const faqsData = [
  {
    question: "What is MintsClub?",
    ans: "MintsClub is a revolutionary 21st Century blockchain product that brings users one step closer to experiencing Metaverse. The users can mint their digital assets such as images, GIFs, games, sports accessories and more into the cryptomarket and establish a stable revenue stream.",
  },
  {
    question: "What is a MintsClub token?",
    ans: "MintsClub token, famously known as Non-fungible Token (NFT) is a distinct cryptographic token that exists on the blockchain platform and cannot be replicated. Tokenization of digital assets has made it easier to buy and sell while reducing the threat of fraudulent acts.",
  },
  {
    question: "What is the total supply of MINT?",
    ans: "The total supply of 1-inch Mint tokens is 1.5 billion.",
  },
  {
    question: "Where can I buy/sell MINT?",
    ans: "You can sell your NFTs on blockchain marketplaces such as Binance, Cardano, Solana and Algoran and now, MintsClub.",
  },
];

const Faqs = () => {
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
      <div className="padding-wrapper faqs">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12">
              <div
                className="faqs-accordion accordion accordion-flush mx-auto"
                id="accordionFlushExample"
              >
                {faqsData.map((faq, id) => {
                  return (
                    <div className="accordion-item mb-4">
                      <h2 className="accordion-header" id={`${id}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target={`#c${id}`}
                          aria-expanded="false"
                          aria-controls={`c${id}`}
                        >
                          <span>Q{`${id + 1}.`}</span>
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`c${id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`${id}`}
                      >
                        <div className="accordion-body">
                          <p>{faq.ans}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
