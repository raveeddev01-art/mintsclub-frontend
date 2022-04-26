import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Spin } from "react-cssfx-loading";
import ModalClose from "../../assets/images/modal-close.svg";
import MetaImg from "../../assets/images/metamask.png";
import TickImg from "../../assets/images/seller-tick-icon.svg";
import "./ApprovalModal.css";

const ApprovalModal = ({
  approvalStatus,
  approveAccount,
  show,
  onHide,
  address,
}) => {


  return (
    <>
      {approvalStatus === "in-progress" || approvalStatus === "approved" ? (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          dialogClassName="approval-modal-dialog"
          contentClassName="approval-modal-content"
          className="approval-modal"
          centered
        >
          <Modal.Header>
            <Modal.Title>
              {approvalStatus === "approved"  ? "Congratulations" : "We’re on it"}
            </Modal.Title>
            <div className="modal-close-container">
              <button onClick={onHide}>
                <img src={ModalClose} alt="closemodal" />
              </button>
            </div>
            <hr></hr>
          </Modal.Header>
          <Modal.Body>
            <div className="approval-container text-center">
              {approvalStatus === "approved" ? (
                <div className="approval-confirmed">
                  <img src={TickImg} alt="confirmed" />
                </div>
              ) : (
                <div className="approval-spinner">
                  <Spin color="#5666FE" width="60px" height="60px"></Spin>
                </div>
              )}

              <div className="approval-status">
                {approvalStatus === "approved" ? (
                  <h4>Your Account has been approved</h4>
                ) : (
                  <h4>Processing</h4>
                )}
              </div>
              {approvalStatus === "approved" ? (
                ""
              ) : (
                <div className="approval-status-address d-flex align-items-center">
                  <p>Wallet Address</p>
                  <p className="ps-4">
                    {address.slice(0, 6) + "..." + address.slice(-6)}
                  </p>
                </div>
              )}
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          dialogClassName="approval-modal-dialog"
          contentClassName="approval-modal-content"
          className="approval-modal"
          centered
        >
          <Modal.Header>
            <Modal.Title>Your account is not approved yet.</Modal.Title>
            <div className="modal-close-container">
              <button onClick={onHide}>
                <img src={ModalClose} alt="closemodal" />
              </button>
            </div>
            <hr></hr>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <div>
                <img src={MetaImg} alt="metamask" />
              </div>
              <div className="modal-nft-status mt-4">
                <div className="modal-status-subheadings">
                  <p> Please approve your Wallet address to reach us </p>
                </div>
                <hr></hr>
                <div className="modal-status-address">
                  <p>{address}</p>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              className="btn btn-linear-gradient mt-2"
              onClick={() => approveAccount()}
            >
              {approvalStatus === "pending" ? (
                <div class="spinner-border text-white approve-spinner" role="status"></div>
              ) : (
                "Get Approved"
              )}
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
export default ApprovalModal;
