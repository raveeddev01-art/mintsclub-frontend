import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalClose from "../../assets/images/modal-close.svg";
import NftImg from "../../assets/images/listingImg3.png";
import "./BuyModal.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TickIcon from "../../assets/images/tick-checkbox.svg";
import axios from "axios";

const BidModal = (props) => {
  const [bid, setBid] = useState();
  const [checkBox, setCheckBox] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0);
  useEffect(() => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ETH"
      )
      .then((res) => {
        const currentUSD = res.data.USD;
        setExchangeRate(currentUSD);
      });
  }, []);
  return (
    <Modal
      {...props}
      size="lg"
      dialogClassName="buy-modal-dialog"
      contentClassName="buy-modal-content"
      className="buy-modal bid-modal"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Place a Bid
        </Modal.Title>
        <div className="modal-close-container">
          <Button onClick={props.onHide}>
            <img src={ModalClose} alt="closemodal" />
          </Button>
        </div>
        <div className="buy-modal-subheadings-container d-flex align-items-center">
          <div className="buy-modal-subheadings">
            <p>Price</p>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="bid-inp-container d-flex align-items-center">
          <div className="inp-container">
            <input
              type="number"
              placeholder="Place Your Bid"
              onChange={(e) => setBid(e.target.value)}
              value={bid}
            />
            <div className="dollar-rate text-end">
              <p className="">${bid ? (bid * exchangeRate).toFixed(2) : 0}</p>
            </div>
          </div>
          <div className="inp-currency">
            <h6>ETH</h6>
          </div>
        </div>
        <div className="bid-balance">
          <p>Balance: 0.09783009 ETH</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-nft-footer">
          <div className="checkbox-container">
            {checkBox ? (
              <div
                className="custom-checked-box"
                onClick={() => setCheckBox(!checkBox)}
              >
                <img src={TickIcon} alt="checked" />
              </div>
            ) : (
              <div
                className="custom-uncheck-box"
                onClick={() => setCheckBox(!checkBox)}
              ></div>
            )}
            <p>
              By checking this box,I agree to MintsClub{" "}
              <Link>Terms of Services</Link>
            </p>
          </div>
        </div>
        <Button className="btn btn-linear-gradient mt-2" onClick={props.onHide}>
          Confirm Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BidModal;
