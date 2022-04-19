import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ModalClose from "../../assets/images/modal-close.svg";
import InputClose from "../../assets/images/inp-close.svg";
import "./PropertiesModal.css";

const PropertiesModal = (props) => {
  const { show, onHide } = props;
  const [numbOfInp, setNumbOfInp] = useState(1);

  return (
    <Modal
      {...props}
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="buy-modal-dialog"
      contentClassName="buy-modal-content"
      className="buy-modal properties-modal"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Properties
        </Modal.Title>
        <div className="modal-close-container">
          <button onClick={onHide}>
            <img src={ModalClose} alt="closemodal" />
          </button>
        </div>
        <div className="buy-modal-subheadings-container d-flex align-items-center">
          <div className="buy-modal-subheadings">
            <p>Item</p>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-2 align-items-center justify-content-between">
          <div className="col-sm-5 order-1 order-sm-0">
            <div className="bid-inp-container d-flex align-items-center">
              <div className="ps-2">
                <h6>Type:</h6>
              </div>
              <div className="inp-container">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="col-sm-5 order-2 order-sm-1">
            <div className="bid-inp-container d-flex align-items-center">
              <div className="ps-2">
                <h6>Name:</h6>
              </div>
              <div className="inp-container">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="col-sm-1 order-0 order-sm-2">
            <div className="inp-close text-end">
              <button>
                <img src={InputClose} alt="closemodal" />
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-nft-footer d-flex align-items-center">
          <button className="btn btn-linear-gradient mt-2">Add more</button>
          <button className="btn btn-linear-gradient mt-2 ms-3">Save</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PropertiesModal;
