import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalClose from "../../assets/images/modal-close.svg";

import "./BuyModal.css";

import TickIcon from "../../assets/images/tick-checkbox.svg";
import axios from "axios";

const BidModal = (props) => {
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
  const {
    onChange,
    decimalNumberValidator,
    handleModalSubmit,
    calculatePricePercantage,
    onHide,
    balance,
    price,
  } = props;
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

        <p className="text-danger text-center mt-1 mb-0">
          {+price > +balance && "Insufficient funds to place bid!"}
        </p>

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
          <div className="inp-container d-flex align-items-center justify-content-between">
            <div>
              <input
                type="number"
                placeholder="Place Your Bid"
                name="nftConfig.price.amount"
                style={{ borderRadius: "4px" }}
                onChange={(e) => onChange(e)}
                onKeyDown={(e) => decimalNumberValidator(e)}
                defaultValue={calculatePricePercantage()}
                // disabled={balance===0?true:false}

                value={price}
              />
            </div>
            <div className="dollar-rate text-end">
              <p className="">
                ${price ? (price * exchangeRate).toFixed(2) : 0}
              </p>
            </div>
          </div>
          <div className="inp-currency">
            <h6>ETH</h6>
          </div>
        </div>
        <div className="bid-balance text-start">
          <p>Balance: {Number(balance).toFixed(4)} ETH</p>
        </div>
        {balance !== "" && balance === 0 && (
          <p className="text-center insufcient-funds text-danger">
            Please Add Balance to place bid
          </p>
        )}
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
        <button
          className="btn btn-linear-gradient btn-bid-modal mt-2"
          onClick={() => {
            handleModalSubmit();
            onHide();
          }}
          disabled={
            price < calculatePricePercantage() ||
            balance === 0 ||
            !checkBox ||
            price > balance
          }
        >
          Confirm Checkout
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BidModal;
