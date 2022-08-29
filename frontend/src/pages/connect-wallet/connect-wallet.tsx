import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./connect-wallet.scss";
import { connectModal } from "../../assets/assets";

const walletButtons = [
  {
    name: "MetaMask",
    img: connectModal.metaImg,
  },
  {
    name: "Coinbase Wallet",
    img: connectModal.coinBaseImg,
  },
  {
    name: "WalletConnect",
    img: connectModal.wcImg,
  },
  {
    name: "Glow",
    img: connectModal.glowImg,
  },
  {
    name: "Phantom",
    img: connectModal.phantomImg,
  },
];

export default function connectWallet() {
  return (
    <>
      <Container>
        <div className="connect-wallet-container">
          <h3 className="modal-title">Connect Your Wallet</h3>
          <p className="modal-description">
            Select what network and wallet you want to connect
          </p>
          <div className="model-tabs">
            <Tabs defaultActiveKey="ethereum" id="uncontrolled-tab-example">
              <Tab eventKey="ethereum" title="Ethereum">
                <div className="tab-inner-content">
                  {walletButtons.map((button: any) => {
                    return (
                      <button className="wallet-button">
                        <img src={button.img} alt="services" />
                        {button.name}
                      </button>
                    );
                  })}
                </div>
              </Tab>
              <Tab eventKey="polygon" title="Polygon">
                2
              </Tab>
              <Tab eventKey="cardano" title="Cardano">
                3
              </Tab>
              <Tab eventKey="bsc" title="BSC">
                3
              </Tab>
            </Tabs>
            <button className="show-more-btn">Show More</button>
          </div>
        </div>
      </Container>
    </>
  );
}
