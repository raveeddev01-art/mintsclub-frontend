import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalClose from "../../assets/images/modal-close.svg";
import "./BuyModal.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TickIcon from "../../assets/images/tick-checkbox.svg";
import { ReactComponent as FbIcon } from "../../assets/images/fb-blue.svg";
import { ReactComponent as TwitterIcon } from "../../assets/images/twitter-blue.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/images/linkedin-blue.svg";
import { ReactComponent as InstaIcon } from "../../assets/images/insta-blue.svg";
import ModalSmiley from "../../assets/images/model-smiley.svg";

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
    buyNow,
    confirmed,
    transactionHash,
    transactionSuccess,
    onHide,
    disabled,
    balance
  } = props;

  return confirmed === "" || confirmed === false||confirmed==="pending" ? (
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
        <p className="text-danger text-center mt-1 mb-0 insufienct-funds">
          {+price > +balance && "Insufficient funds to buy this NFT"}
        </p>
        <div className="modal-close-container">
          <Button onClick={onHide}>
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
        <div className="row w-100 align-items-center justify-content-center g-4">
          <div className="col-md-3">
            <div className="modal-nft-container mx-auto mx-md-0">
              <div className="modal-nft-img">
                <img src={image} alt="nft-img" />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="modal-nft-content">
              <div className="row align-items-center justify-content-between">
                <div className="col-12 mb-3">
                  <div className="modal-nft-detail-heading">
                    <p>
                      {name && name.length > 10
                        ? name.slice(0, 10) + "..."
                        : name}
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="modal-nft-detail">
                    <span>
                      {name && name.length > 10
                        ? name.slice(0, 10) + "..."
                        : name}{" "}
                      # {tokenId}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="modal-nft-detail text-end">
                    <p>
                      {price} <span>ETH</span>
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="modal-nft-detail">
                    <h6>
                      Creator Fees: <span>5%</span>
                    </h6>
                  </div>
                </div>
                <div className="col-6">
                  <div className="modal-nft-detail text-end">
                    <p>${(price * exchangeRate).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100 align-items-center total-row mt-3">
          <div className="col-4">
            <div className="modal-nft-detail">
              <p>Total</p>
            </div>
          </div>
          <div className="col-8">
            <div className="modal-nft-detail text-end">
              <h6>
                {price} <span>ETH</span>
              </h6>
              <span>${(price * exchangeRate).toFixed(2)}</span>
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
        <button
          onClick={() => {
            buyNow();
          }}
          disabled={!checkBox ||disabled||+price > +balance }
          className="btn btn-linear-gradient btn-bid-modal mt-2"
        >
          {
            confirmed==="pending"?
            <div
                      class="spinner-border approve-spinner"
                      role="status"
                    ></div>:" Confirm Checkout"
          }
         
        </button>
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
        <div className="modal-nft-purchased  mt-3">
          {!transactionSuccess ? (
            <p>
              <span className="me-4">
                <img src={ModalSmiley} alt="smiley" />
              </span>
              {`  Woo! You just Purchased ${
                name && name.length > 10 ? name.slice(0, 10) + "..." : name
              }. It should be confirmed on the
              blockchain shortly`}
            </p>
          ) : (
            <p>
              {" "}
              {`  Woo! You just Purchased ${
                name && name.length > 10 ? name.slice(0, 10) + "..." : name
              }. It's been confirmed on the
              blockchain shortly`}
            </p>
          )}
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
        <div className="row w-100 align-items-center justify-content-center g-4">
          <div className="col-md-3">
            <div className="modal-nft-container mx-auto mx-md-0">
              <div className="modal-nft-img">
                <img src={image} alt="nft-img" />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="modal-nft-content">
              <div className="row align-items-center justify-content-between">
                <div className="col-12 mb-3">
                  <div className="modal-nft-detail-heading">
                    <p>
                      {name && name.length > 10
                        ? name.slice(0, 10) + "..."
                        : name}
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="modal-nft-detail">
                    <span>
                      {name && name.length > 10
                        ? name.slice(0, 10) + "..."
                        : name}{" "}
                      # {tokenId}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="modal-nft-detail text-end">
                    <p>
                      {price} <span>ETH</span>
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="modal-nft-detail">
                    <h6>
                      Creator Fees: <span>5%</span>
                    </h6>
                  </div>
                </div>
                <div className="col-6">
                  <div className="modal-nft-detail text-end">
                    <p>${(price * exchangeRate).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100 align-items-center total-row mt-3">
          <div className="col-4">
            <div className="modal-nft-detail">
              <p>Total</p>
            </div>
          </div>
          <div className="col-8">
            <div className="modal-nft-detail text-end">
              <h6>
                {price} <span>ETH</span>
              </h6>
              <span>${(price * exchangeRate).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="buy-modal-subheadings-container buy-modal-status w-100 d-flex justify-content-between align-items-center">
          <div className="buy-modal-subheadings">
            <p>Status</p>
          </div>
          <div className="buy-modal-subheadings">
            <p>Transaction Hash</p>
          </div>
        </div>
        <div className="modal-status-content d-flex align-items-center justify-content-between mt-2 pb-5">
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
          <div
            className="status-address"
            onClick={() =>
              window.open(
                `https://rinkeby.etherscan.io/tx/${transactionHash}`,
                "_blank"
              )
            }
          >
            <p>
              {transactionHash.slice(0, 6) +
                "....." +
                transactionHash.slice(-6)}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-nft-footer">
          <p>Share</p>
        </div>
        <div className="social-icons d-flex justify-content-center justify-content-lg-start">
          <FbIcon />
          <TwitterIcon />
          <LinkedinIcon />
          <InstaIcon />
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default BuyModal;
