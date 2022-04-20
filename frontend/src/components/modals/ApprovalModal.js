import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Spin } from "react-cssfx-loading";
import ModalClose from "../../assets/images/modal-close.svg";
import MetaImg from "../../assets/images/metamask.png";
import TickImg from "../../assets/images/seller-tick-icon.svg";
import "./ApprovalModal.css";

const ApprovalModal = (props) => {
  const [approval, setApproval] = useState(false);
  const [approved, setApproved] = useState(false);
  const address = "0xe0106f010067B130e4C96f119C214c30c94Cead1";

  return (
    <>
      {approval ? (
        <Modal
          {...props}
          size="lg"
          dialogClassName="approval-modal-dialog"
          contentClassName="approval-modal-content"
          className="approval-modal"
          centered
        >
          <Modal.Header>
            <Modal.Title>
              {approved ? "Congratulations" : "We’re on it"}
            </Modal.Title>
            <div className="modal-close-container">
              <button onClick={props.onHide}>
                <img src={ModalClose} alt="closemodal" />
              </button>
            </div>
            <hr></hr>
          </Modal.Header>
          <Modal.Body>
            <div className="approval-container text-center">
              {approved ? (
                <div className="approval-confirmed">
                  <img src={TickImg} alt="confirmed" />
                </div>
              ) : (
                <div className="approval-spinner">
                  <Spin color="#5666FE" width="60px" height="60px"></Spin>
                </div>
              )}

              <div className="approval-status">
                {approved ? (
                  <h4>Your Account has been approved</h4>
                ) : (
                  <h4>Processing</h4>
                )}
              </div>
              {approved ? (
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
          {...props}
          size="lg"
          dialogClassName="approval-modal-dialog"
          contentClassName="approval-modal-content"
          className="approval-modal"
          centered
        >
          <Modal.Header>
            <Modal.Title>Your account is not approved yet.</Modal.Title>
            <div className="modal-close-container">
              <button onClick={props.onHide}>
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
              onClick={() => setApproval(true)}
            >
              Get Approved
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>

    //   ) : (
    //     <Modal
    //       {...props}
    //       size="lg"
    //       dialogClassName="buy-modal-dialog"
    //       contentClassName="buy-modal-content"
    //       className="buy-modal purchase-modal"
    //       centered
    //     >
    //       <Modal.Header>
    //         <Modal.Title id="contained-modal-title-vcenter">
    //           {!transactionSuccess
    //             ? "Your Purchase is Processing"
    //             : "Your Purchase has processed!"}
    //         </Modal.Title>
    //         <div className="modal-close-container">
    //           <button onClick={props.onHide}>
    //             <img src={ModalClose} alt="closemodal" />
    //           </button>
    //         </div>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <div className="modal-nft-container">
    //           <div className="modal-nft-img">
    //             <img src={image} alt="nft-img" />
    //           </div>
    //         </div>
    //         <div className="modal-nft-purchased mt-3">
    //           {!transactionSuccess ? (
    //             <p>
    //               Woo! You just Purchased FancyLaday. It should be confirmed on the
    //               blockchain shortly
    //             </p>
    //           ) : (
    //             <p>
    //               {" "}
    //               Woo! You just Purchased FancyLaday. It's been confirmed on the
    //               blockchain shortly
    //             </p>
    //           )}
    //         </div>
    //         <div className="modal-nft-status mt-4">
    //           <div className="modal-status-subheadings d-flex align-items-center justify-content-between">
    //             <p> Status </p>
    //             <p> Transaction Hash </p>
    //           </div>
    //           <div className="modal-status-content d-flex align-items-center justify-content-between">
    //             <div className="status-process d-flex align-items-center">
    //               {!transactionSuccess ? (
    //                 <>
    //                   <Spinner
    //                     animation="border"
    //                     role="status"
    //                     size="sm"
    //                     variant="primary"
    //                     className="me-1"
    //                   ></Spinner>
    //                   <p>Processing</p>
    //                 </>
    //               ) : (
    //                 <>
    //                   <CheckCircleIcon />
    //                 </>
    //               )}
    //             </div>
    //             <div
    //               className="status-address"
    //             >
    //               <p>
    //                 {transactionHash.slice(0, 6) +
    //                   "....." +
    //                   transactionHash.slice(-6)}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </Modal.Body>
    //     </Modal>
  );
};
export default ApprovalModal;
