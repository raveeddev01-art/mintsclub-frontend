import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalClose from "../../assets/images/modal-close.svg";
import NftImg from "../../assets/images/listingImg3.png";
import "./BuyModal.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TickIcon from "../../assets/images/tick-checkbox.svg";
const BuyModal = (props) => {

  const [purchase, setPurchase] = useState(true);
  const [checkBox, setCheckBox] = useState(false);
  const {
    name,
    image,
    price,
    exchangeRate,
    tokenId,
    modal,
    setModal,
    BuyNow,
    confirmed,
    transactionHash,
    transactionSuccess,
  } = props;

  return confirmed === "" ? (
    <Modal
      {...props}
      size="lg"
      dialogClassName="buy-modal-dialog"
      contentClassName="buy-modal-content"
      className="buy-modal"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Complete Checkout
        </Modal.Title>
        <div className="modal-close-container">
          <Button onClick={props.onHide}>
            <img src={ModalClose} alt="closemodal" />
          </Button>
        </div>
        <div className="buy-modal-subheadings-container d-flex justify-content-between align-items-center">
          <div className="buy-modal-subheadings">
            <p>Item</p>
          </div>
          <div className="buy-modal-subheadings">
            <p>Subtotal</p>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="row w-100 align-items-center">
          <div className="col-md-8">
            <div className="d-flex align-items-center">
              <div className="modal-nft-container">
                <div className="modal-nft-img">
                  <img src={image} alt="nft-img" />
                </div>
              </div>
              <div className="modal-nft-conntent ms-2">
                <p>{name}</p>
                <p>
                  {name} # {tokenId}
                </p>
                <p>Creator Fees: 5%</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="modal-nft-detail text-end">
              <p>{price} ETH</p>
              <p>${(price * exchangeRate).toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="row w-100 align-items-center total-row mt-3">
          <div className="col-6 col-md-8">
            <div className="modal-nft-detail">
              <p>Total</p>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="modal-nft-detail text-end">
              <h6>{price} ETH</h6>
              <p>${(price * exchangeRate).toFixed(2)}</p>
            </div>
          </div>
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
        <Button
          onClick={() => {
            BuyNow();
          }}
          className="btn btn-linear-gradient mt-2"
        >
          Confirm Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <Modal
      {...props}
      size="lg"
      dialogClassName="buy-modal-dialog"
      contentClassName="buy-modal-content"
      className="buy-modal purchase-modal"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {!transactionSuccess
            ? "Your Purchase is Processing"
            : "Your Purchase has processed!"}
        </Modal.Title>
        <div className="modal-close-container">
          <Button onClick={props.onHide}>
            <img src={ModalClose} alt="closemodal" />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-nft-container">
          <div className="modal-nft-img">
            <img src={image} alt="nft-img" />
          </div>
        </div>
        <div className="modal-nft-purchased mt-3">
          {!transactionSuccess ? (
            <p>
              Woo! You just Purchased FancyLaday. It should be confirmed on the
              blockchain shortly
            </p>
          ) : (
            <p>
              {" "}
              Woo! You just Purchased FancyLaday. It's been confirmed on the
              blockchain shortly
            </p>
          )}
        </div>
        <div className="modal-nft-status mt-4">
          <div className="modal-status-subheadings d-flex align-items-center justify-content-between">
            <p> Status </p>
            <p> Transaction Hash </p>
          </div>
          <div className="modal-status-content d-flex align-items-center justify-content-between">
            <div className="status-process d-flex align-items-center">
              {!transactionSuccess ? (
                <>
                  <Spinner
                    animation="border"
                    role="status"
                    size="sm"
                    variant="primary"
                    className="me-1"
                  ></Spinner>
                  <p>Processing</p>
                </>
              ) : (
                <>
                  <CheckCircleIcon />
                </>
              )}
            </div>
            <div className="status-address">
              <p>
                {
                  (transactionHash.slice(0, 6)+
                  "....."+
                  transactionHash.slice(-6)
                  )
                }
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-nft-footer">
          <p>Share</p>
        </div>
        <div className="social-icons d-flex justify-content-center justify-content-lg-start">
          <a href="#" target="_blank">
            <i className={"fab fa-linkedin-in"} />
          </a>
          <a href="#" target="_blank">
            <i className={"fab fa-facebook-f"} />
          </a>
          <a href="#" target="_blank">
            <i className={"fab fa-instagram"} />
          </a>
          <a href="#" target="_blank">
            <i className={"fab fa-twitter"} />
          </a>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyModal;
