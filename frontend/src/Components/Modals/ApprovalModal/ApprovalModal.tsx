import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import { Spin } from "react-cssfx-loading";
import ModalClose from "../../../assets/images/modal-close.svg";
import { Images } from "../../../assets/assets";
import { ApprovalModalInt } from "../../../interfaces/components";
import "./ApprovalModal.scss";

const ApprovalModal: FC<ApprovalModalInt> = ({
  approvalStatus,
  approveAccount,
  show,
  onHide,
  address,
}) => {
  return (
    <>
      {
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
            <Modal.Title className="acc-title mt-lg-3 mt-5">
              {approvalStatus === "approved"
                ? "Congratulations"
                : approvalStatus === "in-progress"
                ? "We’re on it"
                : "Your account if not approved yet."}
            </Modal.Title>
            <div className="modal-close-container" onClick={onHide}>
              <button>
                <img src={ModalClose} alt="closemodal" />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            {approvalStatus === "approved" ? (
              <>
                <img src={Images.sellerTickIcon} className="success-icon" />
                <div className="w-100 px-4 mb-2">
                  <div className="acc-approved-container mt-5 mb-5">
                    <p className="acc-approved ms-4 mb-0">
                      Your Account has been approved.
                    </p>
                    <img src={Images.smile} className="smile-img" />
                  </div>
                </div>
              </>
            ) : approvalStatus === "in-progress" ? (
              <>
                <div className="approval-spinner mb-4">
                  <Spin color="#5666FE" width="60px" height="60px"></Spin>
                </div>
                <p className="processing-title text-center w-100">
                  Processing...
                </p>
                <div className="w-100 px-3">
                  <p className="approve-msg text-start ms-3 mt-3 ">
                    Wallet Address
                  </p>
                  <input
                    className="input-common mb-5"
                    value={address}
                    readOnly
                  />
                </div>
              </>
            ) : (
              <>
                <img
                  src={Images.metamaskImg}
                  className="approve-metamask-img"
                />
                <div className=" w-100 px-3">
                  <p className="approve-msg w-100 text-start ms-3 mt-3 ">
                    Please approve your wallet address to reach us
                  </p>
                  <input className="input-common" value={address} readOnly />
                </div>
                <button
                  className="btn btn-linear-gradient mt-4 my-4 get-approved-btn"
                  disabled={approvalStatus === "pending"}
                  onClick={() => approveAccount()}
                >
                  {approvalStatus === "pending" ? (
                    <div
                      className="spinner-border approve-spinner"
                      role="status"
                    ></div>
                  ) : (
                    "Get Approved"
                  )}
                </button>
              </>
            )}
          </Modal.Body>
        </Modal>
      }
    </>
  );
};
export default ApprovalModal;
