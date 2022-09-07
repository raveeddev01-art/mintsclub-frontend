import React, { useState, FC } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./ConnectWalletModal.scss";
import { connectModal } from "../../assets/assets";
import { ConnectWallModal } from "../../interfaces/components";
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

const ConnectWalletModal: FC<ConnectWallModal> = ({
  showModal,
  setShowModal,
}) => {
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <>
      <Modal
        show={showModal}
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
};
export default ConnectWalletModal;
