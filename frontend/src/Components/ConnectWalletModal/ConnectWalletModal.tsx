import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./ConnectWalletModal.scss";
import { connectModal } from "../../assets/assets";
import ConnectWallet from "../../pages/connect-wallet/connect-wallet";

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

export default function ConnectWalletModal() {
  const [show, setShow] = useState<any>(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="connect-wallet-modal"
      >
        <Modal.Body>
          <ConnectWallet />
        </Modal.Body>
      </Modal>
    </>
  );
}
